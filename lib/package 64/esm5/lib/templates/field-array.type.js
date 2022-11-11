/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Optional } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { clone, isNullOrUndefined, assignFieldValue } from '../utils';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FORMLY_CONFIG } from '../services/formly.config';
import { registerControl, unregisterControl, findControl } from '../extensions/field-form/utils';
import { Directive } from '@angular/core';
/**
 * @record
 */
export function FieldArrayTypeConfig() { }
if (false) {
    /** @type {?} */
    FieldArrayTypeConfig.prototype.formControl;
    /** @type {?} */
    FieldArrayTypeConfig.prototype.templateOptions;
    /** @type {?} */
    FieldArrayTypeConfig.prototype.options;
}
// TODO remove `selector` in V6
// tslint:disable-next-line
/**
 * @abstract
 * @template F
 */
var FieldArrayType = /** @class */ (function (_super) {
    tslib_1.__extends(FieldArrayType, _super);
    function FieldArrayType(builder) {
        var _this = _super.call(this) || this;
        _this.defaultOptions = {
            defaultValue: [],
        };
        if (builder instanceof FormlyFormBuilder) {
            console.warn("NgxFormly: passing 'FormlyFormBuilder' to '" + _this.constructor.name + "' type is not required anymore, you may remove it!");
        }
        return _this;
    }
    Object.defineProperty(FieldArrayType.prototype, "formControl", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.field.formControl));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} field
     * @return {?}
     */
    FieldArrayType.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!field.formControl && field.key) {
            /** @type {?} */
            var control = findControl(field);
            registerControl(field, control ? control : new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        /** @type {?} */
        var length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (var i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i], true);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (var i = field.fieldGroup.length; i < length; i++) {
            /** @type {?} */
            var f = tslib_1.__assign({}, clone(field.fieldArray), { key: "" + i });
            field.fieldGroup.push(f);
        }
    };
    /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    FieldArrayType.prototype.add = /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    function (i, initialModel, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    FieldArrayType.prototype.remove = /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    function (i, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((/**
         * @param {?} f
         * @param {?} key
         * @return {?}
         */
        function (f, key) { return f.key = "" + key; }));
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    /**
     * @private
     * @return {?}
     */
    FieldArrayType.prototype._build = /**
     * @private
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.options)))._buildField(this.field);
        ((/** @type {?} */ (this.options)))._trackModelChanges(true);
    };
    FieldArrayType.decorators = [
        { type: Directive, args: [{ selector: '[ɵfieldArray]' },] }
    ];
    /** @nocollapse */
    FieldArrayType.ctorParameters = function () { return [
        { type: FormlyFormBuilder, decorators: [{ type: Inject, args: [FORMLY_CONFIG,] }, { type: Optional }] }
    ]; };
    return FieldArrayType;
}(FieldType));
export { FieldArrayType };
if (false) {
    /** @type {?} */
    FieldArrayType.prototype.field;
    /** @type {?} */
    FieldArrayType.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtYXJyYXkudHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2ZpZWxkLWFycmF5LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRTFDLDBDQUlDOzs7SUFIQywyQ0FBdUI7O0lBQ3ZCLCtDQUFtRTs7SUFDbkUsdUNBQW1EOzs7Ozs7OztBQUtyRDtJQUM4RiwwQ0FBYztJQVUxRyx3QkFBK0MsT0FBMkI7UUFBMUUsWUFDRSxpQkFBTyxTQUtSO1FBZEQsb0JBQWMsR0FBUTtZQUNwQixZQUFZLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBU0EsSUFBSSxPQUFPLFlBQVksaUJBQWlCLEVBQUU7WUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBOEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHVEQUFvRCxDQUFDLENBQUM7U0FDdkk7O0lBQ0gsQ0FBQztJQVZELHNCQUFJLHVDQUFXOzs7O1FBQWY7WUFDRSxPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFhLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7Ozs7O0lBVUQsbUNBQVU7Ozs7SUFBVixVQUFXLEtBQXdCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7O2dCQUM3QixPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQyxlQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUc7UUFFRCxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDOztZQUVwQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDMUQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUMvQyxDQUFDLHdCQUFRLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUUsR0FBRyxFQUFFLEtBQUcsQ0FBRyxHQUFFO1lBQ3JELEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Ozs7OztJQUVELDRCQUFHOzs7Ozs7SUFBSCxVQUFJLENBQVUsRUFBRSxZQUFrQixFQUFFLEVBQXVDO1lBQXJDLHNFQUFXO1FBQy9DLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsK0JBQU07Ozs7O0lBQU4sVUFBTyxDQUFTLEVBQUUsRUFBdUM7WUFBckMsc0VBQVc7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLENBQUMsRUFBRSxHQUFHLElBQUssT0FBQSxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUcsR0FBSyxFQUFoQixDQUFnQixFQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFTywrQkFBTTs7OztJQUFkO1FBQ0UsQ0FBQyxtQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsbUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBQSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBbEVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Ozs7Z0JBZC9CLGlCQUFpQix1QkF5QlgsTUFBTSxTQUFDLGFBQWEsY0FBRyxRQUFROztJQXdEOUMscUJBQUM7Q0FBQSxBQW5FRCxDQUM4RixTQUFTLEdBa0V0RztTQWxFcUIsY0FBYzs7O0lBQ2xDLCtCQUFTOztJQUNULHdDQUVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi9maWVsZC50eXBlJztcbmltcG9ydCB7IGNsb25lLCBpc051bGxPclVuZGVmaW5lZCwgYXNzaWduRmllbGRWYWx1ZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZvcm1seUZvcm1CdWlsZGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybWx5LmZvcm0uYnVpbGRlcic7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGT1JNTFlfQ09ORklHLCBGb3JtbHlFeHRlbnNpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29udHJvbCwgdW5yZWdpc3RlckNvbnRyb2wsIGZpbmRDb250cm9sIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9maWVsZC1mb3JtL3V0aWxzJztcbmltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkQXJyYXlUeXBlQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWcge1xuICBmb3JtQ29udHJvbDogRm9ybUFycmF5O1xuICB0ZW1wbGF0ZU9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWyd0ZW1wbGF0ZU9wdGlvbnMnXT47XG4gIG9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWydvcHRpb25zJ10+O1xufVxuXG4vLyBUT0RPIHJlbW92ZSBgc2VsZWN0b3JgIGluIFY2XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1vJtWZpZWxkQXJyYXldJyB9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpZWxkQXJyYXlUeXBlPEYgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyA9IEZvcm1seUZpZWxkQ29uZmlnPiBleHRlbmRzIEZpZWxkVHlwZTxhbnk+IGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgZmllbGQ6IEY7XG4gIGRlZmF1bHRPcHRpb25zOiBhbnkgPSB7XG4gICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgfTtcblxuICBnZXQgZm9ybUNvbnRyb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wgYXMgRm9ybUFycmF5O1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChGT1JNTFlfQ09ORklHKSBAT3B0aW9uYWwoKSBidWlsZGVyPzogRm9ybWx5Rm9ybUJ1aWxkZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKGJ1aWxkZXIgaW5zdGFuY2VvZiBGb3JtbHlGb3JtQnVpbGRlcikge1xuICAgICAgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ0Zvcm1seUZvcm1CdWlsZGVyJyB0byAnJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9JyB0eXBlIGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTtcbiAgICB9XG4gIH1cblxuICBvblBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykge1xuICAgIGlmICghZmllbGQuZm9ybUNvbnRyb2wgJiYgZmllbGQua2V5KSB7XG4gICAgICBjb25zdCBjb250cm9sID0gZmluZENvbnRyb2woZmllbGQpO1xuICAgICAgcmVnaXN0ZXJDb250cm9sKGZpZWxkLCBjb250cm9sID8gY29udHJvbCA6IG5ldyBGb3JtQXJyYXkoW10sIHsgdXBkYXRlT246IGZpZWxkLm1vZGVsT3B0aW9ucy51cGRhdGVPbiB9KSk7XG4gICAgfVxuXG4gICAgZmllbGQuZmllbGRHcm91cCA9IGZpZWxkLmZpZWxkR3JvdXAgfHwgW107XG5cbiAgICBjb25zdCBsZW5ndGggPSBmaWVsZC5tb2RlbCA/IGZpZWxkLm1vZGVsLmxlbmd0aCA6IDA7XG4gICAgaWYgKGZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gZmllbGQuZmllbGRHcm91cC5sZW5ndGggLSAxOyBpID49IGxlbmd0aDsgLS1pKSB7XG4gICAgICAgIHVucmVnaXN0ZXJDb250cm9sKGZpZWxkLmZpZWxkR3JvdXBbaV0sIHRydWUpO1xuICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gZmllbGQuZmllbGRHcm91cC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZiA9IHsgLi4uY2xvbmUoZmllbGQuZmllbGRBcnJheSksIGtleTogYCR7aX1gIH07XG4gICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goZik7XG4gICAgfVxuICB9XG5cbiAgYWRkKGk/OiBudW1iZXIsIGluaXRpYWxNb2RlbD86IGFueSwgeyBtYXJrQXNEaXJ0eSB9ID0geyBtYXJrQXNEaXJ0eTogdHJ1ZSB9KSB7XG4gICAgaSA9IGlzTnVsbE9yVW5kZWZpbmVkKGkpID8gdGhpcy5maWVsZC5maWVsZEdyb3VwLmxlbmd0aCA6IGk7XG4gICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICBhc3NpZ25GaWVsZFZhbHVlKHRoaXMuZmllbGQsIFtdKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVsLnNwbGljZShpLCAwLCBpbml0aWFsTW9kZWwgPyBjbG9uZShpbml0aWFsTW9kZWwpIDogdW5kZWZpbmVkKTtcblxuICAgIHRoaXMuX2J1aWxkKCk7XG4gICAgbWFya0FzRGlydHkgJiYgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICB9XG5cbiAgcmVtb3ZlKGk6IG51bWJlciwgeyBtYXJrQXNEaXJ0eSB9ID0geyBtYXJrQXNEaXJ0eTogdHJ1ZSB9KSB7XG4gICAgdGhpcy5tb2RlbC5zcGxpY2UoaSwgMSk7XG4gICAgdW5yZWdpc3RlckNvbnRyb2wodGhpcy5maWVsZC5maWVsZEdyb3VwW2ldLCB0cnVlKTtcbiAgICB0aGlzLmZpZWxkLmZpZWxkR3JvdXAuc3BsaWNlKGksIDEpO1xuICAgIHRoaXMuZmllbGQuZmllbGRHcm91cC5mb3JFYWNoKChmLCBrZXkpID0+IGYua2V5ID0gYCR7a2V5fWApO1xuXG4gICAgdGhpcy5fYnVpbGQoKTtcbiAgICBtYXJrQXNEaXJ0eSAmJiB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZCgpIHtcbiAgICAoPGFueT4gdGhpcy5vcHRpb25zKS5fYnVpbGRGaWVsZCh0aGlzLmZpZWxkKTtcbiAgICAoPGFueT4gdGhpcy5vcHRpb25zKS5fdHJhY2tNb2RlbENoYW5nZXModHJ1ZSk7XG4gIH1cbn1cbiJdfQ==