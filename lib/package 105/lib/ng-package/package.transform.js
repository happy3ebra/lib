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
exports.packageTransformFactory = void 0;
const dependency_graph_1 = require("dependency-graph");
const path = __importStar(require("path"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const file_watcher_1 = require("../file-system/file-watcher");
const node_1 = require("../graph/node");
const color_1 = require("../utils/color");
const fs_1 = require("../utils/fs");
const log = __importStar(require("../utils/log"));
const path_1 = require("../utils/path");
const discover_packages_1 = require("./discover-packages");
const nodes_1 = require("./nodes");
/**
 * A transformation for building an npm package:
 *
 *  - discoverPackages
 *  - options
 *  - initTsConfig
 *  - analyzeTsSources (thereby extracting template and stylesheet files)
 *  - for each entry point
 *    - run the entryPontTransform
 *  - writeNpmPackage
 *
 * @param project Project token, reference to `ng-package.json`
 * @param options ng-packagr options
 * @param initTsConfigTransform Transformation initializing the tsconfig of each entry point.
 * @param analyseSourcesTransform Transformation analyzing the typescript source files of each entry point.
 * @param entryPointTransform Transformation for asset rendering and compilation of a single entry point.
 */
const packageTransformFactory = (project, options, initTsConfigTransform, analyseSourcesTransform, entryPointTransform) => (source$) => {
    const pkgUri = (0, nodes_1.ngUrl)(project);
    const buildTransform = options.watch
        ? watchTransformFactory(project, options, analyseSourcesTransform, entryPointTransform)
        : buildTransformFactory(project, analyseSourcesTransform, entryPointTransform);
    return source$.pipe((0, operators_1.tap)(() => log.info(`Building Angular Package`)), 
    // Discover packages and entry points
    (0, operators_1.switchMap)(graph => {
        const pkg = (0, discover_packages_1.discoverPackages)({ project });
        return (0, rxjs_1.from)(pkg).pipe((0, operators_1.map)(value => {
            const ngPkg = new nodes_1.PackageNode(pkgUri);
            ngPkg.data = value;
            return graph.put(ngPkg);
        }));
    }), 
    // Clean the primary dest folder (should clean all secondary sub-directory, as well)
    (0, operators_1.switchMap)(async (graph) => {
        const { dest, deleteDestPath } = graph.get(pkgUri).data;
        if (deleteDestPath) {
            try {
                await (0, fs_1.rmdir)(dest, { recursive: true });
            }
            catch { }
        }
    }, (graph, _) => graph), 
    // Add entry points to graph
    (0, operators_1.map)(graph => {
        const foundNode = graph.get(pkgUri);
        if (!(0, nodes_1.isPackage)(foundNode)) {
            return graph;
        }
        const ngPkg = foundNode;
        const entryPoints = [ngPkg.data.primary, ...ngPkg.data.secondaries].map(entryPoint => {
            const { destinationFiles, moduleId } = entryPoint;
            const node = new nodes_1.EntryPointNode((0, nodes_1.ngUrl)(moduleId), ngPkg.cache.sourcesFileCache, ngPkg.cache.ngccProcessingCache, ngPkg.cache.moduleResolutionCache);
            node.data = { entryPoint, destinationFiles };
            node.state = 'dirty';
            ngPkg.dependsOn(node);
            return node;
        });
        return graph.put(entryPoints);
    }), 
    // Initialize the tsconfig for each entry point
    initTsConfigTransform, 
    // perform build
    buildTransform);
};
exports.packageTransformFactory = packageTransformFactory;
const watchTransformFactory = (project, _options, analyseSourcesTransform, entryPointTransform) => (source$) => {
    const CompleteWaitingForFileChange = '\nCompilation complete. Watching for file changes...';
    const FileChangeDetected = '\nFile change detected. Starting incremental compilation...';
    const FailedWaitingForFileChange = '\nCompilation failed. Watching for file changes...';
    return source$.pipe((0, operators_1.switchMap)(graph => {
        const { data, cache } = graph.find(nodes_1.isPackage);
        const { onFileChange, watcher } = (0, file_watcher_1.createFileWatch)([], [data.dest]);
        graph.watcher = watcher;
        return onFileChange.pipe((0, operators_1.tap)(fileChange => {
            const { filePath, event } = fileChange;
            const { sourcesFileCache } = cache;
            const cachedSourceFile = sourcesFileCache.get(filePath);
            const { declarationFileName } = cachedSourceFile || {};
            const uriToClean = [filePath, declarationFileName].map(x => (0, nodes_1.fileUrl)((0, path_1.ensureUnixPath)(x)));
            const nodesToClean = graph.filter(node => uriToClean.some(uri => uri === node.url));
            if (!cachedSourceFile) {
                if (event === 'unlink' || event === 'add') {
                    cache.globCache = regenerateGlobCache(sourcesFileCache);
                }
                if (!nodesToClean) {
                    return;
                }
            }
            const allNodesToClean = [
                ...nodesToClean,
                // if a non ts file changes we need to clean up its direct dependees
                // this is mainly done for resources such as html and css
                ...nodesToClean.filter(node => !node.url.endsWith('.ts')).flatMap(node => [...node.dependees]),
            ];
            // delete node that changes
            for (const { url } of allNodesToClean) {
                sourcesFileCache.delete((0, nodes_1.fileUrlPath)(url));
            }
            for (const entryPoint of graph.filter(nodes_1.isEntryPoint)) {
                const isDirty = [...allNodesToClean].some(dependent => entryPoint.dependents.has(dependent));
                if (isDirty) {
                    entryPoint.state = 'dirty';
                    uriToClean.forEach(url => {
                        entryPoint.cache.analysesSourcesFileCache.delete((0, nodes_1.fileUrlPath)(url));
                    });
                }
            }
            // Regenerate glob cache
            if (event === 'unlink' || event === 'add') {
                cache.globCache = regenerateGlobCache(sourcesFileCache);
            }
        }), (0, operators_1.debounceTime)(200), (0, operators_1.tap)(() => log.msg(FileChangeDetected)), (0, operators_1.startWith)(undefined), (0, operators_1.mapTo)(graph));
    }), (0, operators_1.switchMap)(graph => {
        return (0, rxjs_1.of)(graph).pipe(buildTransformFactory(project, analyseSourcesTransform, entryPointTransform), (0, operators_1.tap)(() => log.msg(CompleteWaitingForFileChange)), (0, operators_1.catchError)(error => {
            log.error(error);
            log.msg(FailedWaitingForFileChange);
            return rxjs_1.NEVER;
        }));
    }));
};
const buildTransformFactory = (project, analyseSourcesTransform, entryPointTransform) => (source$) => {
    const startTime = Date.now();
    const pkgUri = (0, nodes_1.ngUrl)(project);
    return source$.pipe(
    // Analyse dependencies and external resources for each entry point
    analyseSourcesTransform, 
    // Next, run through the entry point transformation (assets rendering, code compilation)
    scheduleEntryPoints(entryPointTransform), 
    // Write npm package to dest folder
    writeNpmPackage(pkgUri), (0, operators_1.tap)(graph => {
        const ngPkg = graph.get(pkgUri);
        log.success('\n------------------------------------------------------------------------------');
        log.success(`Built Angular Package
 - from: ${ngPkg.data.src}
 - to:   ${ngPkg.data.dest}`);
        log.success('------------------------------------------------------------------------------');
        const b = color_1.colors.bold;
        const w = color_1.colors.white;
        log.msg(w(`\nBuild at: ${b(new Date().toISOString())} - Time: ${b('' + (Date.now() - startTime))}ms\n`));
    }));
};
const writeNpmPackage = (pkgUri) => (0, rxjs_1.pipe)((0, operators_1.switchMap)(async (graph) => {
    const { data } = graph.get(pkgUri);
    const srcFiles = [`${data.src}/LICENSE`, `${data.src}/README.md`];
    for (const srcFile of srcFiles) {
        let isFile = false;
        try {
            isFile = (await (0, fs_1.stat)(srcFile)).isFile();
        }
        catch { }
        if (isFile) {
            await (0, fs_1.copyFile)(srcFile, path.join(data.dest, path.basename(srcFile)));
        }
    }
    return graph;
}));
const scheduleEntryPoints = (epTransform) => (0, rxjs_1.pipe)((0, operators_1.concatMap)(graph => {
    // Calculate node/dependency depth and determine build order
    const depGraph = new dependency_graph_1.DepGraph({ circular: false });
    const entryPoints = graph.filter(nodes_1.isEntryPoint);
    for (const entryPoint of entryPoints) {
        // Remove `ng://` prefix for better error messages
        const from = entryPoint.url.substring(5);
        depGraph.addNode(from);
        for (const { url } of entryPoint.filter(nodes_1.isEntryPoint)) {
            const to = url.substring(5);
            depGraph.addNode(to);
            depGraph.addDependency(from, to);
        }
    }
    // The array index is the depth.
    const groups = depGraph.overallOrder().map(nodes_1.ngUrl);
    // Build entry points with lower depth values first.
    return (0, rxjs_1.from)(groups).pipe((0, operators_1.map)((epUrl) => graph.find((0, nodes_1.byEntryPoint)().and(ep => ep.url === epUrl))), (0, operators_1.filter)((entryPoint) => entryPoint.state !== 'done'), (0, operators_1.concatMap)(ep => (0, rxjs_1.of)(ep).pipe(
    // Mark the entry point as 'in-progress'
    (0, operators_1.tap)(entryPoint => (entryPoint.state = node_1.STATE_IN_PROGRESS)), (0, operators_1.mapTo)(graph), epTransform)), (0, operators_1.takeLast)(1), // don't use last as sometimes it this will cause 'no elements in sequence',
    (0, operators_1.defaultIfEmpty)(graph));
}));
function regenerateGlobCache(sourcesFileCache) {
    const cache = {};
    sourcesFileCache.forEach((value, key) => {
        // ignore node_modules and file which don't exists as they are not used by globbing in our case
        if (value.exists && !key.includes('node_modules')) {
            cache[key] = 'FILE';
        }
    });
    return cache;
}
//# sourceMappingURL=package.transform.js.map