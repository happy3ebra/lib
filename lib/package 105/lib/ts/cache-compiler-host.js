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
exports.augmentProgramWithVersioning = exports.cacheCompilerHost = void 0;
const crypto_1 = require("crypto");
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const node_1 = require("../graph/node");
const nodes_1 = require("../ng-package/nodes");
const path_1 = require("../utils/path");
function cacheCompilerHost(graph, entryPoint, compilerOptions, moduleResolutionCache, stylesheetProcessor, inlineStyleLanguage, sourcesFileCache = entryPoint.cache.sourcesFileCache) {
    const compilerHost = typescript_1.default.createIncrementalCompilerHost(compilerOptions);
    const getNode = (fileName) => {
        const nodeUri = (0, nodes_1.fileUrl)((0, path_1.ensureUnixPath)(fileName));
        let node = graph.get(nodeUri);
        if (!node) {
            node = new node_1.Node(nodeUri);
            graph.put(node);
        }
        return node;
    };
    const addDependee = (fileName) => {
        const node = getNode(fileName);
        entryPoint.dependsOn(node);
    };
    return {
        ...compilerHost,
        // ts specific
        fileExists: (fileName) => {
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.exists === undefined) {
                cache.exists = compilerHost.fileExists.call(this, fileName);
            }
            return cache.exists;
        },
        getSourceFile: (fileName, languageVersion) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (!cache.sourceFile) {
                cache.sourceFile = compilerHost.getSourceFile.call(this, fileName, languageVersion);
            }
            return cache.sourceFile;
        },
        writeFile: (fileName, data, writeByteOrderMark, onError, sourceFiles) => {
            if (fileName.endsWith('.d.ts')) {
                sourceFiles.forEach(source => {
                    const cache = sourcesFileCache.getOrCreate(source.fileName);
                    if (!cache.declarationFileName) {
                        cache.declarationFileName = (0, path_1.ensureUnixPath)(fileName);
                    }
                });
            }
            else {
                fileName = fileName.replace(/\.js(\.map)?$/, '.mjs$1');
                const outputCache = entryPoint.cache.outputCache;
                outputCache.set(fileName, {
                    content: data,
                    version: (0, crypto_1.createHash)('sha256').update(data).digest('hex'),
                });
            }
            compilerHost.writeFile.call(this, fileName, data, writeByteOrderMark, onError, sourceFiles);
        },
        readFile: (fileName) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.content === undefined) {
                cache.content = compilerHost.readFile.call(this, fileName);
            }
            return cache.content;
        },
        resolveModuleNames: (moduleNames, containingFile) => {
            return moduleNames.map(moduleName => {
                const { resolvedModule } = typescript_1.default.resolveModuleName(moduleName, (0, path_1.ensureUnixPath)(containingFile), compilerOptions, compilerHost, moduleResolutionCache);
                return resolvedModule;
            });
        },
        resourceNameToFileName: (resourceName, containingFilePath) => {
            const resourcePath = path.resolve(path.dirname(containingFilePath), resourceName);
            const containingNode = getNode(containingFilePath);
            const resourceNode = getNode(resourcePath);
            containingNode.dependsOn(resourceNode);
            return resourcePath;
        },
        readResource: async (fileName) => {
            addDependee(fileName);
            const cache = sourcesFileCache.getOrCreate(fileName);
            if (cache.content === undefined) {
                if (/(?:html?|svg)$/.test(path.extname(fileName))) {
                    // template
                    cache.content = compilerHost.readFile.call(this, fileName);
                }
                else {
                    // stylesheet
                    cache.content = await stylesheetProcessor.process({
                        filePath: fileName,
                        content: compilerHost.readFile.call(this, fileName),
                    });
                }
                if (cache.content === undefined) {
                    throw new Error(`Cannot read file ${fileName}.`);
                }
                cache.exists = true;
            }
            return cache.content;
        },
        transformResource: async (data, context) => {
            if (context.resourceFile || context.type !== 'style') {
                return null;
            }
            if (inlineStyleLanguage) {
                const key = (0, crypto_1.createHash)('sha1').update(data).digest('hex');
                const fileName = `${context.containingFile}-${key}.${inlineStyleLanguage}`;
                const cache = sourcesFileCache.getOrCreate(fileName);
                if (cache.content === undefined) {
                    cache.content = await stylesheetProcessor.process({
                        filePath: fileName,
                        content: data,
                    });
                    const virtualFileNode = getNode(fileName);
                    const containingFileNode = getNode(context.containingFile);
                    virtualFileNode.dependsOn(containingFileNode);
                }
                cache.exists = true;
                return { content: cache.content };
            }
            return null;
        },
    };
}
exports.cacheCompilerHost = cacheCompilerHost;
function augmentProgramWithVersioning(program) {
    const baseGetSourceFiles = program.getSourceFiles;
    program.getSourceFiles = function (...parameters) {
        const files = baseGetSourceFiles(...parameters);
        for (const file of files) {
            if (file.version === undefined) {
                file.version = (0, crypto_1.createHash)('sha256').update(file.text).digest('hex');
            }
        }
        return files;
    };
}
exports.augmentProgramWithVersioning = augmentProgramWithVersioning;
//# sourceMappingURL=cache-compiler-host.js.map