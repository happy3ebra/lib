import { InjectionToken, Provider, ValueProvider } from 'injection-js';
export declare const OPTIONS_TOKEN: InjectionToken<NgPackagrOptions>;
export interface NgPackagrOptions {
    /** Whether or not ng-packagr will watch for file changes and perform an incremental build. */
    watch?: boolean;
    cacheEnabled?: boolean;
    cacheDirectory?: string;
}
export declare const provideOptions: (options?: NgPackagrOptions) => ValueProvider;
export declare const DEFAULT_OPTIONS_PROVIDER: Provider;
