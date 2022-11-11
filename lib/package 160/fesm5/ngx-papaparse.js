import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable } from '@angular/core';
import * as lib from 'papaparse/papaparse.min.js';

var Papa = /** @class */ (function () {
    function Papa() {
        this._papa = lib;
    }
    /**
     * Parse CSV to an array
     */
    Papa.prototype.parse = function (csv, config) {
        return this._papa.parse(csv, config);
    };
    /**
     * Convert an array into CSV
     */
    Papa.prototype.unparse = function (data, config) {
        return this._papa.unparse(data, config);
    };
    /**
     * Set the size in bytes of each file chunk.
     * Used when streaming files obtained from the DOM that
     * exist on the local computer. Default 10 MB.
     */
    Papa.prototype.setLocalChunkSize = function (value) {
        this._papa.LocalChunkSize = value;
    };
    /**
     * Set the size in bytes of each remote file chunk.
     * Used when streaming remote files. Default 5 MB.
     */
    Papa.prototype.setRemoteChunkSize = function (value) {
        this._papa.RemoteChunkSize = value;
    };
    /**
     * Set the delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
     */
    Papa.prototype.setDefaultDelimiter = function (value) {
        this._papa.DefaultDelimiter = value;
    };
    Object.defineProperty(Papa.prototype, "badDelimiters", {
        /**
         * An array of characters that are not allowed as delimiters.
         */
        get: function () {
            return this._papa.BAD_DELIMITERS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Papa.prototype, "recordSeparator", {
        /**
         * The true delimiter. Invisible. ASCII code 30.
         * Should be doing the job we strangely rely upon commas and tabs for.
         */
        get: function () {
            return this._papa.RECORD_SEP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Papa.prototype, "unitSeparator", {
        /**
         * Also sometimes used as a delimiting character. ASCII code 31.
         */
        get: function () {
            return this._papa.UNIT_SEP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Papa.prototype, "workersSupported", {
        /**
         * Whether or not the browser supports HTML5 Web Workers.
         * If false, worker: true will have no effect.
         */
        get: function () {
            return this._papa.WORKERS_SUPPORTED;
        },
        enumerable: true,
        configurable: true
    });
    Papa.ɵprov = ɵɵdefineInjectable({ factory: function Papa_Factory() { return new Papa(); }, token: Papa, providedIn: "root" });
    Papa = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], Papa);
    return Papa;
}());

/*
 * Public API Surface of papaparse
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Papa };
//# sourceMappingURL=ngx-papaparse.js.map
