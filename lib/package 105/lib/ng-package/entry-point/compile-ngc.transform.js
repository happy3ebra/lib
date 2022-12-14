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
exports.compileNgcTransformFactory = void 0;
const ora_1 = __importDefault(require("ora"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const transform_1 = require("../../graph/transform");
const compile_source_files_1 = require("../../ngc/compile-source-files");
const ngcc_processor_1 = require("../../ngc/ngcc-processor");
const tsconfig_1 = require("../../ts/tsconfig");
const ng_compiler_cli_1 = require("../../utils/ng-compiler-cli");
const nodes_1 = require("../nodes");
const compileNgcTransformFactory = (StylesheetProcessor, options) => {
    return (0, transform_1.transformFromPromise)(async (graph) => {
        var _a;
        var _b;
        const spinner = (0, ora_1.default)({
            hideCursor: false,
            discardStdin: false,
        });
        try {
            const entryPoint = graph.find((0, nodes_1.isEntryPointInProgress)());
            const entryPoints = graph.filter(nodes_1.isEntryPoint);
            // Add paths mappings for dependencies
            const tsConfig = (0, tsconfig_1.setDependenciesTsConfigPaths)(entryPoint.data.tsConfig, entryPoints);
            // Compile TypeScript sources
            const { esm2020, declarations } = entryPoint.data.destinationFiles;
            const { basePath, cssUrl, styleIncludePaths } = entryPoint.data.entryPoint;
            const { moduleResolutionCache, ngccProcessingCache } = entryPoint.cache;
            spinner.start(`Compiling with Angular sources in Ivy ${tsConfig.options.compilationMode || 'full'} compilation mode.`);
            const ngccProcessor = new ngcc_processor_1.NgccProcessor(await (0, ng_compiler_cli_1.ngccCompilerCli)(), ngccProcessingCache, tsConfig.project, tsConfig.options, entryPoints);
            if (!entryPoint.data.entryPoint.isSecondaryEntryPoint) {
                // Only run the async version of NGCC during the primary entrypoint processing.
                await ngccProcessor.process();
            }
            (_a = (_b = entryPoint.cache).stylesheetProcessor) !== null && _a !== void 0 ? _a : (_b.stylesheetProcessor = new StylesheetProcessor(basePath, cssUrl, styleIncludePaths, options.cacheEnabled && options.cacheDirectory));
            await (0, compile_source_files_1.compileSourceFiles)(graph, tsConfig, moduleResolutionCache, {
                outDir: path.dirname(esm2020),
                declarationDir: path.dirname(declarations),
                declaration: true,
                target: typescript_1.default.ScriptTarget.ES2020,
            }, entryPoint.cache.stylesheetProcessor, ngccProcessor, options.watch);
        }
        catch (error) {
            spinner.fail();
            throw error;
        }
        spinner.succeed();
        return graph;
    });
};
exports.compileNgcTransformFactory = compileNgcTransformFactory;
//# sourceMappingURL=compile-ngc.transform.js.map