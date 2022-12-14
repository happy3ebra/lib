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
exports.compileSourceFiles = void 0;
const typescript_1 = __importDefault(require("typescript"));
const nodes_1 = require("../ng-package/nodes");
const cache_compiler_host_1 = require("../ts/cache-compiler-host");
const ngcc_transform_compiler_host_1 = require("../ts/ngcc-transform-compiler-host");
const log = __importStar(require("../utils/log"));
const ng_compiler_cli_1 = require("../utils/ng-compiler-cli");
async function compileSourceFiles(graph, tsConfig, moduleResolutionCache, extraOptions, stylesheetProcessor, ngccProcessor, watch) {
    const { NgtscProgram, formatDiagnostics } = await (0, ng_compiler_cli_1.ngCompilerCli)();
    const tsConfigOptions = { ...tsConfig.options, ...extraOptions };
    const entryPoint = graph.find((0, nodes_1.isEntryPointInProgress)());
    const ngPackageNode = graph.find(nodes_1.isPackage);
    const inlineStyleLanguage = ngPackageNode.data.inlineStyleLanguage;
    const tsCompilerHost = (0, ngcc_transform_compiler_host_1.ngccTransformCompilerHost)((0, cache_compiler_host_1.cacheCompilerHost)(graph, entryPoint, tsConfigOptions, moduleResolutionCache, stylesheetProcessor, inlineStyleLanguage), tsConfigOptions, ngccProcessor, moduleResolutionCache);
    const cache = entryPoint.cache;
    const sourceFileCache = cache.sourcesFileCache;
    // Create the Angular specific program that contains the Angular compiler
    const angularProgram = new NgtscProgram(tsConfig.rootNames, tsConfigOptions, tsCompilerHost, cache.oldNgtscProgram);
    const angularCompiler = angularProgram.compiler;
    const { ignoreForDiagnostics, ignoreForEmit } = angularCompiler;
    // SourceFile versions are required for builder programs.
    // The wrapped host inside NgtscProgram adds additional files that will not have versions.
    const typeScriptProgram = angularProgram.getTsProgram();
    (0, cache_compiler_host_1.augmentProgramWithVersioning)(typeScriptProgram);
    let builder;
    if (watch) {
        builder = cache.oldBuilder = typescript_1.default.createEmitAndSemanticDiagnosticsBuilderProgram(typeScriptProgram, tsCompilerHost, cache.oldBuilder);
        cache.oldNgtscProgram = angularProgram;
    }
    else {
        // When not in watch mode, the startup cost of the incremental analysis can be avoided by
        // using an abstract builder that only wraps a TypeScript program.
        builder = typescript_1.default.createAbstractBuilder(typeScriptProgram, tsCompilerHost);
    }
    // Update semantic diagnostics cache
    const affectedFiles = new Set();
    // Analyze affected files when in watch mode for incremental type checking
    if ('getSemanticDiagnosticsOfNextAffectedFile' in builder) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const result = builder.getSemanticDiagnosticsOfNextAffectedFile(undefined, sourceFile => {
                // If the affected file is a TTC shim, add the shim's original source file.
                // This ensures that changes that affect TTC are typechecked even when the changes
                // are otherwise unrelated from a TS perspective and do not result in Ivy codegen changes.
                // For example, changing @Input property types of a directive used in another component's
                // template.
                if (ignoreForDiagnostics.has(sourceFile) && sourceFile.fileName.endsWith('.ngtypecheck.ts')) {
                    // This file name conversion relies on internal compiler logic and should be converted
                    // to an official method when available. 15 is length of `.ngtypecheck.ts`
                    const originalFilename = sourceFile.fileName.slice(0, -15) + '.ts';
                    const originalSourceFile = builder.getSourceFile(originalFilename);
                    if (originalSourceFile) {
                        affectedFiles.add(originalSourceFile);
                    }
                    return true;
                }
                return false;
            });
            if (!result) {
                break;
            }
            affectedFiles.add(result.affected);
        }
    }
    // Collect program level diagnostics
    const allDiagnostics = [
        ...angularCompiler.getOptionDiagnostics(),
        ...builder.getOptionsDiagnostics(),
        ...builder.getGlobalDiagnostics(),
    ];
    // Required to support asynchronous resource loading
    // Must be done before creating transformers or getting template diagnostics
    await angularCompiler.analyzeAsync();
    // Collect source file specific diagnostics
    for (const sourceFile of builder.getSourceFiles()) {
        if (!ignoreForDiagnostics.has(sourceFile)) {
            allDiagnostics.push(...builder.getSyntacticDiagnostics(sourceFile), ...builder.getSemanticDiagnostics(sourceFile));
        }
        if (sourceFile.isDeclarationFile) {
            continue;
        }
        // Collect sources that are required to be emitted
        if (!ignoreForEmit.has(sourceFile) && !angularCompiler.incrementalDriver.safeToSkipEmit(sourceFile)) {
            // If required to emit, diagnostics may have also changed
            if (!ignoreForDiagnostics.has(sourceFile)) {
                affectedFiles.add(sourceFile);
            }
        }
        else if (sourceFileCache && !affectedFiles.has(sourceFile) && !ignoreForDiagnostics.has(sourceFile)) {
            // Use cached Angular diagnostics for unchanged and unaffected files
            const angularDiagnostics = sourceFileCache.getAngularDiagnostics(sourceFile);
            if (angularDiagnostics === null || angularDiagnostics === void 0 ? void 0 : angularDiagnostics.length) {
                allDiagnostics.push(...angularDiagnostics);
            }
        }
    }
    // Collect new Angular diagnostics for files affected by changes
    for (const affectedFile of affectedFiles) {
        const angularDiagnostics = angularCompiler.getDiagnosticsForFile(affectedFile, /** OptimizeFor.WholeProgram */ 1);
        allDiagnostics.push(...angularDiagnostics);
        sourceFileCache.updateAngularDiagnostics(affectedFile, angularDiagnostics);
    }
    const otherDiagnostics = [];
    const errorDiagnostics = [];
    for (const diagnostic of allDiagnostics) {
        if (diagnostic.category === typescript_1.default.DiagnosticCategory.Error) {
            errorDiagnostics.push(diagnostic);
        }
        else {
            otherDiagnostics.push(diagnostic);
        }
    }
    if (otherDiagnostics.length) {
        log.msg(formatDiagnostics(errorDiagnostics));
    }
    if (errorDiagnostics.length) {
        throw new Error(formatDiagnostics(errorDiagnostics));
    }
    const transformers = angularCompiler.prepareEmit().transformers;
    for (const sourceFile of builder.getSourceFiles()) {
        if (!ignoreForEmit.has(sourceFile)) {
            builder.emit(sourceFile, undefined, undefined, undefined, transformers);
        }
    }
}
exports.compileSourceFiles = compileSourceFiles;
//# sourceMappingURL=compile-source-files.js.map