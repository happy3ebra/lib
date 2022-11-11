import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable } from '@angular/core';
import * as lib from 'papaparse/papaparse.min.js';

let Papa = class Papa {
    constructor() {
        this._papa = lib;
    }
    /**
     * Parse CSV to an array
     */
    parse(csv, config) {
        return this._papa.parse(csv, config);
    }
    /**
     * Convert an array into CSV
     */
    unparse(data, config) {
        return this._papa.unparse(data, config);
    }
    /**
     * Set the size in bytes of each file chunk.
     * Used when streaming files obtained from the DOM that
     * exist on the local computer. Default 10 MB.
     */
    setLocalChunkSize(value) {
        this._papa.LocalChunkSize = value;
    }
    /**
     * Set the size in bytes of each remote file chunk.
     * Used when streaming remote files. Default 5 MB.
     */
    setRemoteChunkSize(value) {
        this._papa.RemoteChunkSize = value;
    }
    /**
     * Set the delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
     */
    setDefaultDelimiter(value) {
        this._papa.DefaultDelimiter = value;
    }
    /**
     * An array of characters that are not allowed as delimiters.
     */
    get badDelimiters() {
        return this._papa.BAD_DELIMITERS;
    }
    /**
     * The true delimiter. Invisible. ASCII code 30.
     * Should be doing the job we strangely rely upon commas and tabs for.
     */
    get recordSeparator() {
        return this._papa.RECORD_SEP;
    }
    /**
     * Also sometimes used as a delimiting character. ASCII code 31.
     */
    get unitSeparator() {
        return this._papa.UNIT_SEP;
    }
    /**
     * Whether or not the browser supports HTML5 Web Workers.
     * If false, worker: true will have no effect.
     */
    get workersSupported() {
        return this._papa.WORKERS_SUPPORTED;
    }
};
Papa.ɵprov = ɵɵdefineInjectable({ factory: function Papa_Factory() { return new Papa(); }, token: Papa, providedIn: "root" });
Papa = __decorate([
    Injectable({
        providedIn: 'root',
    })
], Papa);

/*
 * Public API Surface of papaparse
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Papa };
//# sourceMappingURL=ngx-papaparse.js.map
