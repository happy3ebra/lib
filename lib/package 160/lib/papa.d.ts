import { ParseResult } from './interfaces/parse-result';
import { ParseConfig } from './interfaces/parse-config';
import { UnparseConfig } from './interfaces/unparse-config';
export declare class Papa {
    _papa: any;
    /**
     * Parse CSV to an array
     */
    parse(csv: string | Blob, config?: ParseConfig): ParseResult;
    /**
     * Convert an array into CSV
     */
    unparse(data: any, config?: UnparseConfig): string;
    /**
     * Set the size in bytes of each file chunk.
     * Used when streaming files obtained from the DOM that
     * exist on the local computer. Default 10 MB.
     */
    setLocalChunkSize(value: number): void;
    /**
     * Set the size in bytes of each remote file chunk.
     * Used when streaming remote files. Default 5 MB.
     */
    setRemoteChunkSize(value: number): void;
    /**
     * Set the delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
     */
    setDefaultDelimiter(value: string): void;
    /**
     * An array of characters that are not allowed as delimiters.
     */
    get badDelimiters(): any;
    /**
     * The true delimiter. Invisible. ASCII code 30.
     * Should be doing the job we strangely rely upon commas and tabs for.
     */
    get recordSeparator(): any;
    /**
     * Also sometimes used as a delimiting character. ASCII code 31.
     */
    get unitSeparator(): any;
    /**
     * Whether or not the browser supports HTML5 Web Workers.
     * If false, worker: true will have no effect.
     */
    get workersSupported(): boolean;
}
