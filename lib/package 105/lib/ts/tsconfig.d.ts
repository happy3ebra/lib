import type { ParsedConfiguration } from '@angular/compiler-cli';
import { EntryPointNode } from '../ng-package/nodes';
export declare const defaultTsConfigPath: string;
/**
 * Initializes TypeScript Compiler options and Angular Compiler options by overriding the
 * default config with entry point-specific values.
 */
export declare function initializeTsConfig(defaultTsConfig: ParsedConfiguration | string | undefined, entryPoints: EntryPointNode[]): Promise<void>;
/**
 * Set the paths for entrypoint dependencies.
 *
 * This doesn't mutate the object.
 *
 * @param parsedTsConfig - A parsed tsconfig
 * @param entryPoints - A list of entryPoints
 * @param pointToSource Point the path mapping to either the source code or emitted declarations.
 * Typically for analysis one should point to the source files while for a compilation once should use the emitted declarations
 */
export declare function setDependenciesTsConfigPaths(parsedTsConfig: ParsedConfiguration, entryPoints: EntryPointNode[], pointToSource?: boolean): ParsedConfiguration;
