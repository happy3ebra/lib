/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
/**
 * @record
 */
export function FieldTypeConfig() { }
if (false) {
    /** @type {?} */
    FieldTypeConfig.prototype.formControl;
    /** @type {?} */
    FieldTypeConfig.prototype.templateOptions;
    /** @type {?} */
    FieldTypeConfig.prototype.options;
}
/**
 * @record
 */
export function FieldGroupTypeConfig() { }
if (false) {
    /** @type {?} */
    FieldGroupTypeConfig.prototype.formControl;
    /** @type {?} */
    FieldGroupTypeConfig.prototype.templateOptions;
    /** @type {?} */
    FieldGroupTypeConfig.prototype.options;
}
/**
 * @abstract
 * @template F
 */
var FieldType = /** @class */ (function () {
    function FieldType() {
    }
    Object.defineProperty(FieldType.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () { return this.field.model; },
        set: /**
         * @param {?} m
         * @return {?}
         */
        function (m) { console.warn("NgxFormly: passing 'model' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "form", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.field.parent.formControl)); },
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) { console.warn("NgxFormly: passing 'form' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this.field.options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) { console.warn("NgxFormly: passing 'options' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "key", {
        get: /**
         * @return {?}
         */
        function () { return this.field.key; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "formControl", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.field.formControl)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () { return this.field.templateOptions || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "showError", {
        get: /**
         * @return {?}
         */
        function () { return this.options.showError(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () { return this.field.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "formState", {
        get: /**
         * @return {?}
         */
        function () { return this.options.formState || {}; },
        enumerable: true,
        configurable: true
    });
    FieldType.propDecorators = {
        field: [{ type: Input }],
        model: [{ type: Input }],
        form: [{ type: Input }],
        options: [{ type: Input }]
    };
    return FieldType;
}());
export { FieldType };
if (false) {
    /** @type {?} */
    FieldType.prototype.field;
    /** @type {?} */
    FieldType.prototype.defaultOptions;
}
/**
 * @deprecated use `FieldType` instead
 * @abstract
 */
var /**
 * @deprecated use `FieldType` instead
 * @abstract
 */
Field = /** @class */ (function (_super) {
    tslib_1.__extends(Field, _super);
    function Field() {
        var _this = _super.call(this) || this;
        console.warn("NgxFormly: 'Field' has been renamed to 'FieldType', extend 'FieldType' instead.");
        return _this;
    }
    return Field;
}(FieldType));
/**
 * @deprecated use `FieldType` instead
 * @abstract
 */
export { Field };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2ZpZWxkLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSXRDLHFDQUlDOzs7SUFIQyxzQ0FBc0M7O0lBQ3RDLDBDQUFtRTs7SUFDbkUsa0NBQW1EOzs7OztBQUVyRCwwQ0FJQzs7O0lBSEMsMkNBQW9DOztJQUNwQywrQ0FBbUU7O0lBQ25FLHVDQUFtRDs7Ozs7O0FBR3JEO0lBQUE7SUEyQkEsQ0FBQztJQXZCQyxzQkFDSSw0QkFBSzs7OztRQURULGNBQ2MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3hDLFVBQVUsQ0FBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQXdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw0REFBeUQsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRG5IO0lBR3hDLHNCQUNJLDJCQUFJOzs7O1FBRFIsY0FDYSxPQUFPLG1CQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDaEUsVUFBUyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyx5Q0FBdUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDREQUF5RCxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEdkY7SUFHaEUsc0JBQ0ksOEJBQU87Ozs7UUFEWCxjQUNnQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDNUMsVUFBWSxPQUFxQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTBDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw0REFBeUQsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRGxJO0lBRzVDLHNCQUFJLDBCQUFHOzs7O1FBQVAsY0FBWSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFcEMsc0JBQUksa0NBQVc7Ozs7UUFBZixjQUFvQixPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFpQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckYsc0JBQUkseUJBQUU7Ozs7UUFBTixjQUFXLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckQsc0JBQUksZ0NBQVM7Ozs7UUFBYixjQUEyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFakUsc0JBQUkseUJBQUU7Ozs7UUFBTixjQUFtQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFMUMsc0JBQUksZ0NBQVM7Ozs7UUFBYixjQUFrQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBOzt3QkF6QnZELEtBQUs7d0JBR0wsS0FBSzt1QkFJTCxLQUFLOzBCQUlMLEtBQUs7O0lBZVIsZ0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCcUIsU0FBUzs7O0lBQzdCLDBCQUFrQjs7SUFDbEIsbUNBQTRCOzs7Ozs7QUE4QjlCOzs7OztJQUFvQyxpQ0FBUztJQUMzQztRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQURDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUZBQWlGLENBQUMsQ0FBQzs7SUFDbEcsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBb0MsU0FBUyxHQUs1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkVHlwZUNvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgZm9ybUNvbnRyb2w6IE5vbk51bGxhYmxlPEZvcm1Db250cm9sPjtcbiAgdGVtcGxhdGVPcHRpb25zOiBOb25OdWxsYWJsZTxGb3JtbHlGaWVsZENvbmZpZ1sndGVtcGxhdGVPcHRpb25zJ10+O1xuICBvcHRpb25zOiBOb25OdWxsYWJsZTxGb3JtbHlGaWVsZENvbmZpZ1snb3B0aW9ucyddPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRHcm91cFR5cGVDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gIGZvcm1Db250cm9sOiBOb25OdWxsYWJsZTxGb3JtR3JvdXA+O1xuICB0ZW1wbGF0ZU9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWyd0ZW1wbGF0ZU9wdGlvbnMnXT47XG4gIG9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWydvcHRpb25zJ10+O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRUeXBlPEYgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyA9IEZvcm1seUZpZWxkQ29uZmlnPiB7XG4gIEBJbnB1dCgpIGZpZWxkOiBGO1xuICBkZWZhdWx0T3B0aW9ucz86IFBhcnRpYWw8Rj47XG5cbiAgQElucHV0KClcbiAgZ2V0IG1vZGVsKCkgeyByZXR1cm4gdGhpcy5maWVsZC5tb2RlbDsgfVxuICBzZXQgbW9kZWwobTogYW55KSB7IGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdtb2RlbCcgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBmb3JtKCkgeyByZXR1cm4gPEZvcm1Hcm91cD4gdGhpcy5maWVsZC5wYXJlbnQuZm9ybUNvbnRyb2w7IH1cbiAgc2V0IGZvcm0oZm9ybSkgeyBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnZm9ybScgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5maWVsZC5vcHRpb25zOyB9XG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IEZbJ29wdGlvbnMnXSkgeyBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnb3B0aW9ucycgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIGdldCBrZXkoKSB7IHJldHVybiB0aGlzLmZpZWxkLmtleTsgfVxuXG4gIGdldCBmb3JtQ29udHJvbCgpIHsgcmV0dXJuIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wgYXMgTm9uTnVsbGFibGU8RlsnZm9ybUNvbnRyb2wnXT47IH1cblxuICBnZXQgdG8oKSB7IHJldHVybiB0aGlzLmZpZWxkLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTsgfVxuXG4gIGdldCBzaG93RXJyb3IoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0Vycm9yKHRoaXMpOyB9XG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmZpZWxkLmlkOyB9XG5cbiAgZ2V0IGZvcm1TdGF0ZSgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5mb3JtU3RhdGUgfHwge307IH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgYEZpZWxkVHlwZWAgaW5zdGVhZFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGQgZXh0ZW5kcyBGaWVsZFR5cGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiAnRmllbGQnIGhhcyBiZWVuIHJlbmFtZWQgdG8gJ0ZpZWxkVHlwZScsIGV4dGVuZCAnRmllbGRUeXBlJyBpbnN0ZWFkLmApO1xuICB9XG59XG4iXX0=