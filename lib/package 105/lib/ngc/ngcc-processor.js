"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgccProcessor = void 0;
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const nodes_1 = require("../ng-package/nodes");
const tsconfig_1 = require("../ts/tsconfig");
const fs_2 = require("../utils/fs");
const log = __importStar(require("../utils/log"));
// Transform a package and its typings when NGTSC is resolving a module.
class NgccProcessor {
    constructor(compilerNgcc, ngccProcessingCache, projectPath, compilerOptions, entryPoints) {
        this.compilerNgcc = compilerNgcc;
        this.ngccProcessingCache = ngccProcessingCache;
        this.projectPath = projectPath;
        this.compilerOptions = compilerOptions;
        this.entryPoints = entryPoints;
        this.propertiesToConsider = ['es2015', 'browser', 'module', 'main'];
        this.skipProcessing = false;
        this._entryPointsUrl = this.entryPoints.map(({ url }) => (0, nodes_1.ngUrl)(url));
        const { baseUrl } = this.compilerOptions;
        this._nodeModulesDirectory = this.findNodeModulesDirectory(baseUrl);
    }
    /** Process the entire node modules tree. */
    async process() {
        // Under Bazel when running in sandbox mode parts of the filesystem is read-only.
        if (process.env.BAZEL_TARGET) {
            return;
        }
        // Only allow running this during the first run.
        if (this.skipProcessing) {
            return;
        }
        // Skip if node_modules are read-only
        const corePackage = this.tryResolvePackage('@angular/core', this._nodeModulesDirectory);
        if (corePackage && isReadOnlyFile(corePackage)) {
            return;
        }
        // Perform a ngcc run check to determine if an initial execution is required.
        // If a run hash file exists that matches the current package manager lock file and the
        // project's tsconfig, then an initial ngcc run has already been performed.
        let runHashFilePath;
        const runHashBasePath = path.join(this._nodeModulesDirectory, '.ng-packagr-ngcc');
        const projectBasePath = path.join(this._nodeModulesDirectory, '..');
        try {
            let lockData;
            let lockFile = 'yarn.lock';
            try {
                lockData = await (0, fs_2.readFile)(path.join(projectBasePath, lockFile));
            }
            catch {
                lockFile = 'package-lock.json';
                lockData = await (0, fs_2.readFile)(path.join(projectBasePath, lockFile));
            }
            let ngccConfigData;
            try {
                ngccConfigData = await (0, fs_2.readFile)(path.join(projectBasePath, 'ngcc.config.js'));
            }
            catch {
                ngccConfigData = '';
            }
            const relativeTsconfigPath = path.relative(projectBasePath, this.projectPath);
            const tsconfigData = await (0, fs_2.readFile)(this.projectPath);
            // Generate a hash that represents the state of the package lock file and used tsconfig
            const runHash = (0, crypto_1.createHash)('sha256')
                .update(lockData)
                .update(lockFile)
                .update(ngccConfigData)
                .update(tsconfigData)
                .update(relativeTsconfigPath)
                .digest('hex');
            // The hash is used directly in the file name to mitigate potential read/write race
            // conditions as well as to only require a file existence check
            runHashFilePath = path.join(runHashBasePath, runHash + '.lock');
            // If the run hash lock file exists, then ngcc was already run against this project state
            if (await (0, fs_2.exists)(runHashFilePath)) {
                this.skipProcessing = true;
                return;
            }
        }
        catch {
            // Any error means an ngcc execution is needed
        }
        const { status, error } = (0, child_process_1.spawnSync)(process.execPath, [
            this.compilerNgcc.ngccMainFilePath,
            '--source' /** basePath */,
            this._nodeModulesDirectory,
            '--properties' /** propertiesToConsider */,
            ...this.propertiesToConsider,
            '--first-only' /** compileAllFormats */,
            '--create-ivy-entry-points' /** createNewEntryPointFormats */,
            '--async',
            '--tsconfig' /** tsConfigPath */,
            path.normalize(this.projectPath) === tsconfig_1.defaultTsConfigPath ? '' : this.projectPath,
            '--use-program-dependencies',
            '--typings-only' /** typingsOnly */,
        ], {
            stdio: ['inherit', process.stderr, process.stderr],
        });
        this.skipProcessing = true;
        if (status !== 0) {
            const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || '';
            throw new Error(errorMessage + `NGCC failed${errorMessage ? ', see above' : ''}.`);
        }
        // ngcc was successful so if a run hash was generated, write it for next time
        if (runHashFilePath) {
            try {
                if (!(0, fs_1.existsSync)(runHashBasePath)) {
                    await (0, fs_2.mkdir)(runHashBasePath, { recursive: true });
                }
                await (0, fs_2.writeFile)(runHashFilePath, '');
            }
            catch {
                // Errors are non-fatal
            }
        }
    }
    /** Process a module and it's depedencies. */
    processModule(moduleName, resolvedModule) {
        const resolvedFileName = resolvedModule.resolvedFileName;
        if (!resolvedFileName ||
            moduleName.startsWith('.') ||
            this.ngccProcessingCache.hasProcessed(moduleName) ||
            this._entryPointsUrl.includes((0, nodes_1.ngUrl)(moduleName))) {
            // Skip when module is unknown, relative, an entrypoint or already processed.
            return;
        }
        const packageJsonPath = this.tryResolvePackage(moduleName, resolvedFileName);
        if (!packageJsonPath) {
            // add it to processed so the second time round we skip this.
            this.ngccProcessingCache.markProcessed(moduleName);
            return;
        }
        // If the package.json is read only we should skip calling NGCC.
        // With Bazel when running under sandbox the filesystem is read-only.
        if (isReadOnlyFile(packageJsonPath)) {
            // add it to processed so the second time round we skip this.
            this.ngccProcessingCache.markProcessed(moduleName);
            return;
        }
        this.compilerNgcc.process({
            basePath: this._nodeModulesDirectory,
            targetEntryPointPath: path.dirname(packageJsonPath),
            compileAllFormats: false,
            typingsOnly: true,
            propertiesToConsider: this.propertiesToConsider,
            createNewEntryPointFormats: true,
            logger: this._logger,
            tsConfigPath: this.projectPath === tsconfig_1.defaultTsConfigPath ? undefined : this.projectPath,
        });
        this.ngccProcessingCache.markProcessed(moduleName);
    }
    /**
     * Try resolve a package.json file from the resolved .d.ts file.
     */
    tryResolvePackage(moduleName, resolvedFileName) {
        try {
            return require.resolve(`${moduleName}/package.json`, {
                paths: [resolvedFileName],
            });
        }
        catch {
            // if it fails this might be a deep import which doesn't have a package.json
            // Ex: @angular/compiler/src/i18n/i18n_ast/package.json
            // or local libraries which don't reside in node_modules
            const packageJsonPath = path.resolve(resolvedFileName, '../package.json');
            return (0, fs_1.existsSync)(packageJsonPath) ? packageJsonPath : undefined;
        }
    }
    findNodeModulesDirectory(startPoint) {
        let current = startPoint;
        while (path.dirname(current) !== current) {
            const nodePath = path.join(current, 'node_modules');
            if ((0, fs_1.existsSync)(nodePath)) {
                return nodePath;
            }
            current = path.dirname(current);
        }
        throw new Error(`Cannot locate the 'node_modules' directory.`);
    }
}
exports.NgccProcessor = NgccProcessor;
class NgccLogger {
    constructor() {
        this.level = 1;
    }
    debug(...args) {
        log.debug(args.join(' '));
    }
    info(...args) {
        log.info(args.join(' '));
    }
    warn(...args) {
        log.warn(args.join(' '));
    }
    error(...args) {
        log.error(args.join(' '));
    }
}
function isReadOnlyFile(fileName) {
    try {
        (0, fs_1.accessSync)(fileName, fs_1.constants.W_OK);
        return false;
    }
    catch {
        return true;
    }
}
//# sourceMappingURL=ngcc-processor.js.map