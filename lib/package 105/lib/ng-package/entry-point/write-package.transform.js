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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePackageTransform = void 0;
const ora_1 = __importDefault(require("ora"));
const path = __importStar(require("path"));
const node_1 = require("../../graph/node");
const transform_1 = require("../../graph/transform");
const color_1 = require("../../utils/color");
const fs_1 = require("../../utils/fs");
const glob_1 = require("../../utils/glob");
const log = __importStar(require("../../utils/log"));
const path_1 = require("../../utils/path");
const nodes_1 = require("../nodes");
const writePackageTransform = (options) => (0, transform_1.transformFromPromise)(async (graph) => {
    var _a;
    const spinner = (0, ora_1.default)({
        hideCursor: false,
        discardStdin: false,
    });
    const entryPoint = graph.find((0, nodes_1.isEntryPointInProgress)());
    const ngEntryPoint = entryPoint.data.entryPoint;
    const ngPackageNode = graph.find(nodes_1.isPackage);
    const ngPackage = ngPackageNode.data;
    const { destinationFiles } = entryPoint.data;
    const ignorePaths = [
        '.gitkeep',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/node_modules/**',
        `${ngPackage.dest}/**`,
    ];
    if (!ngEntryPoint.isSecondaryEntryPoint) {
        const assetFiles = [];
        // COPY ASSET FILES TO DESTINATION
        spinner.start('Copying assets');
        try {
            for (const asset of [...ngPackage.assets, 'LICENSE', '**/README.md']) {
                let assetFullPath = path.join(ngPackage.src, asset);
                try {
                    const stats = await (0, fs_1.stat)(assetFullPath);
                    if (stats.isFile()) {
                        assetFiles.push(assetFullPath);
                        continue;
                    }
                    if (stats.isDirectory()) {
                        assetFullPath = path.join(assetFullPath, '**/*');
                    }
                }
                catch { }
                if (asset === 'LICENSE') {
                    continue;
                }
                const files = await (0, glob_1.globFiles)(assetFullPath, {
                    ignore: ignorePaths,
                    cache: ngPackageNode.cache.globCache,
                    dot: true,
                    nodir: true,
                });
                if (files.length) {
                    assetFiles.push(...files);
                }
            }
            for (const file of assetFiles) {
                const relativePath = path.relative(ngPackage.src, file);
                const destination = path.resolve(ngPackage.dest, relativePath);
                const nodeUri = (0, nodes_1.fileUrl)((0, path_1.ensureUnixPath)(file));
                let node = graph.get(nodeUri);
                if (!node) {
                    node = new node_1.Node(nodeUri);
                    graph.put(node);
                }
                entryPoint.dependsOn(node);
                await (0, fs_1.copyFile)(file, destination);
            }
        }
        catch (error) {
            spinner.fail();
            throw error;
        }
        spinner.succeed();
    }
    // 6. WRITE PACKAGE.JSON
    try {
        spinner.start('Writing package manifest');
        const relativeUnixFromDestPath = (filePath) => (0, path_1.ensureUnixPath)(path.relative(ngEntryPoint.destinationPath, filePath));
        const { compilationMode } = entryPoint.data.tsConfig.options;
        await writePackageJson(ngEntryPoint, ngPackage, {
            module: relativeUnixFromDestPath(destinationFiles.fesm2015),
            es2020: relativeUnixFromDestPath(destinationFiles.fesm2020),
            esm2020: relativeUnixFromDestPath(destinationFiles.esm2020),
            fesm2020: relativeUnixFromDestPath(destinationFiles.fesm2020),
            fesm2015: relativeUnixFromDestPath(destinationFiles.fesm2015),
            typings: relativeUnixFromDestPath(destinationFiles.declarations),
            exports: ngEntryPoint.isSecondaryEntryPoint ? undefined : generatePackageExports(ngEntryPoint, graph),
            // webpack v4+ specific flag to enable advanced optimizations and code splitting
            sideEffects: (_a = ngEntryPoint.packageJson.sideEffects) !== null && _a !== void 0 ? _a : false,
        }, !!options.watch, compilationMode, spinner);
    }
    catch (error) {
        spinner.fail();
        throw error;
    }
    spinner.succeed();
    spinner.succeed(`Built ${ngEntryPoint.moduleId}`);
    return graph;
});
exports.writePackageTransform = writePackageTransform;
/**
 * Creates and writes a `package.json` file of the entry point used by the `node_module`
 * resolution strategies.
 *
 * #### Example
 *
 * A consumer of the entry point depends on it by `import {..} from '@my/module/id';`.
 * The module id `@my/module/id` will be resolved to the `package.json` file that is written by
 * this build step.
 * The properties `main`, `module`, `typings` (and so on) in the `package.json` point to the
 * flattened JavaScript bundles, type definitions, (...).
 *
 * @param entryPoint An entry point of an Angular package / library
 * @param additionalProperties Additional properties, e.g. binary artefacts (bundle files), to merge into `package.json`
 */
async function writePackageJson(entryPoint, pkg, additionalProperties, isWatchMode, compilationMode, spinner) {
    var _a, _b, _c;
    log.debug('Writing package.json');
    // set additional properties
    const packageJson = { ...entryPoint.packageJson, ...additionalProperties };
    // read tslib version from `@angular/compiler` so that our tslib
    // version at least matches that of angular if we use require('tslib').version
    // it will get what installed and not the minimum version nor if it is a `~` or `^`
    // this is only required for primary
    if (!entryPoint.isSecondaryEntryPoint) {
        if (isWatchMode) {
            // Needed because of Webpack's 5 `cachemanagedpaths`
            // https://github.com/angular/angular-cli/issues/20962
            packageJson.version = `0.0.0-watch+${Date.now()}`;
        }
        if (!((_a = packageJson.peerDependencies) === null || _a === void 0 ? void 0 : _a.tslib) && !((_b = packageJson.dependencies) === null || _b === void 0 ? void 0 : _b.tslib)) {
            const { peerDependencies: angularPeerDependencies = {}, dependencies: angularDependencies = {}, } = require('@angular/compiler/package.json');
            const tsLibVersion = angularPeerDependencies.tslib || angularDependencies.tslib;
            if (tsLibVersion) {
                packageJson.dependencies = {
                    ...packageJson.dependencies,
                    tslib: tsLibVersion,
                };
            }
        }
        else if ((_c = packageJson.peerDependencies) === null || _c === void 0 ? void 0 : _c.tslib) {
            spinner.warn(color_1.colors.yellow(`'tslib' is no longer recommended to be used as a 'peerDependencies'. Moving it to 'dependencies'.`));
            packageJson.dependencies = {
                ...(packageJson.dependencies || {}),
                tslib: packageJson.peerDependencies.tslib,
            };
            delete packageJson.peerDependencies.tslib;
        }
    }
    // Verify non-peerDependencies as they can easily lead to duplicate installs or version conflicts
    // in the node_modules folder of an application
    const allowedList = pkg.allowedNonPeerDependencies.map(value => new RegExp(value));
    try {
        checkNonPeerDependencies(packageJson, 'dependencies', allowedList, spinner);
    }
    catch (e) {
        await (0, fs_1.rmdir)(entryPoint.destinationPath, { recursive: true });
        throw e;
    }
    // Removes scripts from package.json after build
    if (packageJson.scripts) {
        if (pkg.keepLifecycleScripts !== true) {
            spinner.info(`Removing scripts section in package.json as it's considered a potential security vulnerability.`);
            delete packageJson.scripts;
        }
        else {
            spinner.warn(color_1.colors.yellow(`You enabled keepLifecycleScripts explicitly. The scripts section in package.json will be published to npm.`));
        }
    }
    if (!entryPoint.isSecondaryEntryPoint && compilationMode !== 'partial') {
        const scripts = packageJson.scripts || (packageJson.scripts = {});
        scripts.prepublishOnly =
            'node --eval "console.error(\'' +
                'ERROR: Trying to publish a package that has been compiled by Ivy in full compilation mode. This is not allowed.\\n' +
                'Please delete and rebuild the package with Ivy partial compilation mode, before attempting to publish.\\n' +
                '\')" ' +
                '&& exit 1';
    }
    // keep the dist package.json clean
    // this will not throw if ngPackage field does not exist
    delete packageJson.ngPackage;
    const packageJsonPropertiesToDelete = [
        'stylelint',
        'prettier',
        'browserslist',
        'devDependencies',
        'jest',
        'workspaces',
        'husky',
    ];
    for (const prop of packageJsonPropertiesToDelete) {
        if (prop in packageJson) {
            delete packageJson[prop];
            spinner.info(`Removing ${prop} section in package.json.`);
        }
    }
    packageJson.name = entryPoint.moduleId;
    await (0, fs_1.writeFile)(path.join(entryPoint.destinationPath, 'package.json'), JSON.stringify(packageJson, undefined, 2));
}
function checkNonPeerDependencies(packageJson, property, allowed, spinner) {
    if (!packageJson[property]) {
        return;
    }
    for (const dep of Object.keys(packageJson[property])) {
        if (allowed.some(regex => regex.test(dep))) {
            log.debug(`Dependency ${dep} is allowed in '${property}'`);
        }
        else {
            spinner.warn(color_1.colors.yellow(`Distributing npm packages with '${property}' is not recommended. Please consider adding ${dep}` +
                `to 'peerDependencies' or remove it from '${property}'.`));
            throw new Error(`Dependency ${dep} must be explicitly allowed using the "allowedNonPeerDependencies" option.`);
        }
    }
}
/**
 * Generates the `package.json` package exports following APF v13.
 * This is supposed to match with: https://github.com/angular/angular/blob/e0667efa6eada64d1fb8b143840689090fc82e52/packages/bazel/src/ng_package/packager.ts#L415.
 */
function generatePackageExports({ destinationPath, packageJson }, graph) {
    const exports = packageJson.exports ? JSON.parse(JSON.stringify(packageJson.exports)) : {};
    const insertMappingOrError = (subpath, mapping) => {
        if (exports[subpath] === undefined) {
            exports[subpath] = {};
        }
        const subpathExport = exports[subpath];
        // Go through all conditions that should be inserted. If the condition is already
        // manually set of the subpath export, we throw an error. In general, we allow for
        // additional conditions to be set. These will always precede the generated ones.
        for (const conditionName of Object.keys(mapping)) {
            if (subpathExport[conditionName] !== undefined) {
                throw Error(`Found a conflicting export condition for "${subpath}". The "${conditionName}" ` +
                    `condition would be overridden by ng-packagr. Please unset it.`);
            }
            // **Note**: The order of the conditions is preserved even though we are setting
            // the conditions once at a time (the latest assignment will be at the end).
            subpathExport[conditionName] = mapping[conditionName];
        }
    };
    const relativeUnixFromDestPath = (filePath) => './' + (0, path_1.ensureUnixPath)(path.relative(destinationPath, filePath));
    insertMappingOrError('./package.json', { default: './package.json' });
    const entryPoints = graph.filter(nodes_1.isEntryPoint);
    for (const entryPoint of entryPoints) {
        const { destinationFiles, isSecondaryEntryPoint } = entryPoint.data.entryPoint;
        const subpath = isSecondaryEntryPoint ? `./${destinationFiles.directory}` : '.';
        insertMappingOrError(subpath, {
            types: relativeUnixFromDestPath(destinationFiles.declarations),
            esm2020: relativeUnixFromDestPath(destinationFiles.esm2020),
            es2020: relativeUnixFromDestPath(destinationFiles.fesm2020),
            es2015: relativeUnixFromDestPath(destinationFiles.fesm2015),
            node: relativeUnixFromDestPath(destinationFiles.fesm2015),
            default: relativeUnixFromDestPath(destinationFiles.fesm2020),
        });
    }
    return exports;
}
//# sourceMappingURL=write-package.transform.js.map