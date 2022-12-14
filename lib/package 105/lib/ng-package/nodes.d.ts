import type { NgtscProgram, ParsedConfiguration, Program } from '@angular/compiler-cli';
import { RollupCache } from 'rollup';
import ts from 'typescript';
import { FileCache } from '../file-system/file-cache';
import { ComplexPredicate } from '../graph/build-graph';
import { Node } from '../graph/node';
import { StylesheetProcessor } from '../styles/stylesheet-processor';
import { DestinationFiles, NgEntryPoint } from './entry-point/entry-point';
import { NgccProcessingCache } from './ngcc-cache';
import { NgPackage } from './package';
export declare const TYPE_NG_PACKAGE = "application/ng-package";
export declare const TYPE_NG_ENTRY_POINT = "application/ng-entry-point";
export declare type GlobCache = Record<string, boolean | 'DIR' | 'FILE' | string[]>;
/** A node that can be read through the `fs` api. */
export declare const URL_PROTOCOL_FILE = "file://";
/** A node specific to angular. */
export declare const URL_PROTOCOL_NG = "ng://";
export declare function isEntryPoint(node: Node): node is EntryPointNode;
export declare function isPackage(node: Node): node is PackageNode;
export declare function byEntryPoint(): ComplexPredicate<EntryPointNode>;
export declare function isEntryPointInProgress(): ComplexPredicate<EntryPointNode>;
export declare function isEntryPointDirty(): ComplexPredicate<EntryPointNode>;
export declare function isFileUrl(value: string): boolean;
export declare function fileUrl(path: string): string;
export declare function fileUrlPath(url: string): string;
export declare function ngUrl(path: string): string;
export declare type OutputFileCache = Map<string, {
    version: string;
    content: string;
}>;
export declare class EntryPointNode extends Node {
    readonly url: string;
    readonly type = "application/ng-entry-point";
    constructor(url: string, sourcesFileCache: FileCache, ngccProcessingCache: NgccProcessingCache, moduleResolutionCache: ts.ModuleResolutionCache);
    cache: {
        outputCache: OutputFileCache;
        oldPrograms?: Record<ts.ScriptTarget | 'analysis', Program | ts.Program>;
        sourcesFileCache: FileCache;
        ngccProcessingCache: NgccProcessingCache;
        analysesSourcesFileCache: FileCache;
        moduleResolutionCache: ts.ModuleResolutionCache;
        rollupFESM2020Cache?: RollupCache;
        rollupFESM2015Cache?: RollupCache;
        stylesheetProcessor?: StylesheetProcessor;
        oldNgtscProgram?: NgtscProgram;
        oldBuilder?: ts.EmitAndSemanticDiagnosticsBuilderProgram;
    };
    data: {
        destinationFiles: DestinationFiles;
        entryPoint: NgEntryPoint;
        tsConfig?: ParsedConfiguration;
    };
}
export declare class PackageNode extends Node {
    readonly type = "application/ng-package";
    data: NgPackage;
    cache: {
        globCache: GlobCache;
        sourcesFileCache: FileCache;
        ngccProcessingCache: NgccProcessingCache;
        moduleResolutionCache: ts.ModuleResolutionCache;
    };
}
