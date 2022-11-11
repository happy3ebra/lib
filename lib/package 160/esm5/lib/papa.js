import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as lib from 'papaparse/papaparse.min.js';
import * as i0 from "@angular/core";
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
    Papa.ɵprov = i0.ɵɵdefineInjectable({ factory: function Papa_Factory() { return new Papa(); }, token: Papa, providedIn: "root" });
    Papa = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], Papa);
    return Papa;
}());
export { Papa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFwYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wYXBhcGFyc2UvIiwic291cmNlcyI6WyJsaWIvcGFwYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEtBQUssR0FBRyxNQUFNLDRCQUE0QixDQUFDOztBQUtsRDtJQUFBO1FBQ1csVUFBSyxHQUFHLEdBQUcsQ0FBQztLQXFFdEI7SUFuRUc7O09BRUc7SUFDSSxvQkFBSyxHQUFaLFVBQWEsR0FBZ0IsRUFBRSxNQUFvQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBTyxHQUFkLFVBQWUsSUFBSSxFQUFFLE1BQXNCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0NBQWlCLEdBQXhCLFVBQXlCLEtBQWE7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBa0IsR0FBekIsVUFBMEIsS0FBYTtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0NBQW1CLEdBQTFCLFVBQTJCLEtBQWE7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUtELHNCQUFJLCtCQUFhO1FBSGpCOztXQUVHO2FBQ0g7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBTUQsc0JBQUksaUNBQWU7UUFKbkI7OztXQUdHO2FBQ0g7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksK0JBQWE7UUFIakI7O1dBRUc7YUFDSDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxrQ0FBZ0I7UUFKcEI7OztXQUdHO2FBQ0g7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7O0lBckVRLElBQUk7UUFIaEIsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztPQUNXLElBQUksQ0FzRWhCO2VBL0VEO0NBK0VDLEFBdEVELElBc0VDO1NBdEVZLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJzZVJlc3VsdCB9IGZyb20gJy4vaW50ZXJmYWNlcy9wYXJzZS1yZXN1bHQnO1xuaW1wb3J0IHsgUGFyc2VDb25maWcgfSBmcm9tICcuL2ludGVyZmFjZXMvcGFyc2UtY29uZmlnJztcbmltcG9ydCB7IFVucGFyc2VDb25maWcgfSBmcm9tICcuL2ludGVyZmFjZXMvdW5wYXJzZS1jb25maWcnO1xuaW1wb3J0ICogYXMgbGliIGZyb20gJ3BhcGFwYXJzZS9wYXBhcGFyc2UubWluLmpzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGFwYSB7XG4gICAgcHVibGljIF9wYXBhID0gbGliO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2UgQ1NWIHRvIGFuIGFycmF5XG4gICAgICovXG4gICAgcHVibGljIHBhcnNlKGNzdjogc3RyaW5nfEJsb2IsIGNvbmZpZz86IFBhcnNlQ29uZmlnKTogUGFyc2VSZXN1bHQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFwYS5wYXJzZShjc3YsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhbiBhcnJheSBpbnRvIENTVlxuICAgICAqL1xuICAgIHB1YmxpYyB1bnBhcnNlKGRhdGEsIGNvbmZpZz86IFVucGFyc2VDb25maWcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFwYS51bnBhcnNlKGRhdGEsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIGluIGJ5dGVzIG9mIGVhY2ggZmlsZSBjaHVuay5cbiAgICAgKiBVc2VkIHdoZW4gc3RyZWFtaW5nIGZpbGVzIG9idGFpbmVkIGZyb20gdGhlIERPTSB0aGF0XG4gICAgICogZXhpc3Qgb24gdGhlIGxvY2FsIGNvbXB1dGVyLiBEZWZhdWx0IDEwIE1CLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRMb2NhbENodW5rU2l6ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhcGEuTG9jYWxDaHVua1NpemUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgaW4gYnl0ZXMgb2YgZWFjaCByZW1vdGUgZmlsZSBjaHVuay5cbiAgICAgKiBVc2VkIHdoZW4gc3RyZWFtaW5nIHJlbW90ZSBmaWxlcy4gRGVmYXVsdCA1IE1CLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRSZW1vdGVDaHVua1NpemUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYXBhLlJlbW90ZUNodW5rU2l6ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZGVsaW1pdGVyIHVzZWQgd2hlbiBpdCBpcyBsZWZ0IHVuc3BlY2lmaWVkIGFuZCBjYW5ub3QgYmUgZGV0ZWN0ZWQgYXV0b21hdGljYWxseS4gRGVmYXVsdCBpcyBjb21tYS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RGVmYXVsdERlbGltaXRlcih2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhcGEuRGVmYXVsdERlbGltaXRlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGFsbG93ZWQgYXMgZGVsaW1pdGVycy5cbiAgICAgKi9cbiAgICBnZXQgYmFkRGVsaW1pdGVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcGEuQkFEX0RFTElNSVRFUlM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHRydWUgZGVsaW1pdGVyLiBJbnZpc2libGUuIEFTQ0lJIGNvZGUgMzAuXG4gICAgICogU2hvdWxkIGJlIGRvaW5nIHRoZSBqb2Igd2Ugc3RyYW5nZWx5IHJlbHkgdXBvbiBjb21tYXMgYW5kIHRhYnMgZm9yLlxuICAgICAqL1xuICAgIGdldCByZWNvcmRTZXBhcmF0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXBhLlJFQ09SRF9TRVA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxzbyBzb21ldGltZXMgdXNlZCBhcyBhIGRlbGltaXRpbmcgY2hhcmFjdGVyLiBBU0NJSSBjb2RlIDMxLlxuICAgICAqL1xuICAgIGdldCB1bml0U2VwYXJhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFwYS5VTklUX1NFUDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBIVE1MNSBXZWIgV29ya2Vycy5cbiAgICAgKiBJZiBmYWxzZSwgd29ya2VyOiB0cnVlIHdpbGwgaGF2ZSBubyBlZmZlY3QuXG4gICAgICovXG4gICAgZ2V0IHdvcmtlcnNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXBhLldPUktFUlNfU1VQUE9SVEVEO1xuICAgIH1cbn1cbiJdfQ==