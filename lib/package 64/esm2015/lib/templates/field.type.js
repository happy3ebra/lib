/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class FieldType {
    /**
     * @return {?}
     */
    get model() { return this.field.model; }
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) { console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get form() { return (/** @type {?} */ (this.field.parent.formControl)); }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) { console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get options() { return this.field.options; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get key() { return this.field.key; }
    /**
     * @return {?}
     */
    get formControl() { return (/** @type {?} */ (this.field.formControl)); }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @return {?}
     */
    get showError() { return this.options.showError(this); }
    /**
     * @return {?}
     */
    get id() { return this.field.id; }
    /**
     * @return {?}
     */
    get formState() { return this.options.formState || {}; }
}
FieldType.propDecorators = {
    field: [{ type: Input }],
    model: [{ type: Input }],
    form: [{ type: Input }],
    options: [{ type: Input }]
};
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
export class Field extends FieldType {
    constructor() {
        super();
        console.warn(`NgxFormly: 'Field' has been renamed to 'FieldType', extend 'FieldType' instead.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2ZpZWxkLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFJdEMscUNBSUM7OztJQUhDLHNDQUFzQzs7SUFDdEMsMENBQW1FOztJQUNuRSxrQ0FBbUQ7Ozs7O0FBRXJELDBDQUlDOzs7SUFIQywyQ0FBb0M7O0lBQ3BDLCtDQUFtRTs7SUFDbkUsdUNBQW1EOzs7Ozs7QUFHckQsTUFBTSxPQUFnQixTQUFTOzs7O0lBSTdCLElBQ0ksS0FBSyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN4QyxJQUFJLEtBQUssQ0FBQyxDQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlEQUF5RCxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTNKLElBQ0ksSUFBSSxLQUFLLE9BQU8sbUJBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFBLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNoRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlEQUF5RCxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXZKLElBQ0ksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1QyxJQUFJLE9BQU8sQ0FBQyxPQUFxQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSx5REFBeUQsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUU5SyxJQUFJLEdBQUcsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztJQUVwQyxJQUFJLFdBQVcsS0FBSyxPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFpQyxDQUFDLENBQUMsQ0FBQzs7OztJQUVyRixJQUFJLEVBQUUsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFckQsSUFBSSxTQUFTLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFakUsSUFBSSxFQUFFLEtBQWEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFMUMsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7b0JBekJ2RCxLQUFLO29CQUdMLEtBQUs7bUJBSUwsS0FBSztzQkFJTCxLQUFLOzs7O0lBWE4sMEJBQWtCOztJQUNsQixtQ0FBNEI7Ozs7OztBQThCOUIsTUFBTSxPQUFnQixLQUFNLFNBQVEsU0FBUztJQUMzQztRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkVHlwZUNvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgZm9ybUNvbnRyb2w6IE5vbk51bGxhYmxlPEZvcm1Db250cm9sPjtcbiAgdGVtcGxhdGVPcHRpb25zOiBOb25OdWxsYWJsZTxGb3JtbHlGaWVsZENvbmZpZ1sndGVtcGxhdGVPcHRpb25zJ10+O1xuICBvcHRpb25zOiBOb25OdWxsYWJsZTxGb3JtbHlGaWVsZENvbmZpZ1snb3B0aW9ucyddPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRHcm91cFR5cGVDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gIGZvcm1Db250cm9sOiBOb25OdWxsYWJsZTxGb3JtR3JvdXA+O1xuICB0ZW1wbGF0ZU9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWyd0ZW1wbGF0ZU9wdGlvbnMnXT47XG4gIG9wdGlvbnM6IE5vbk51bGxhYmxlPEZvcm1seUZpZWxkQ29uZmlnWydvcHRpb25zJ10+O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRUeXBlPEYgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyA9IEZvcm1seUZpZWxkQ29uZmlnPiB7XG4gIEBJbnB1dCgpIGZpZWxkOiBGO1xuICBkZWZhdWx0T3B0aW9ucz86IFBhcnRpYWw8Rj47XG5cbiAgQElucHV0KClcbiAgZ2V0IG1vZGVsKCkgeyByZXR1cm4gdGhpcy5maWVsZC5tb2RlbDsgfVxuICBzZXQgbW9kZWwobTogYW55KSB7IGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdtb2RlbCcgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBmb3JtKCkgeyByZXR1cm4gPEZvcm1Hcm91cD4gdGhpcy5maWVsZC5wYXJlbnQuZm9ybUNvbnRyb2w7IH1cbiAgc2V0IGZvcm0oZm9ybSkgeyBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnZm9ybScgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5maWVsZC5vcHRpb25zOyB9XG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IEZbJ29wdGlvbnMnXSkgeyBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnb3B0aW9ucycgaW5wdXQgdG8gJyR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50IGlzIG5vdCByZXF1aXJlZCBhbnltb3JlLCB5b3UgbWF5IHJlbW92ZSBpdCFgKTsgfVxuXG4gIGdldCBrZXkoKSB7IHJldHVybiB0aGlzLmZpZWxkLmtleTsgfVxuXG4gIGdldCBmb3JtQ29udHJvbCgpIHsgcmV0dXJuIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wgYXMgTm9uTnVsbGFibGU8RlsnZm9ybUNvbnRyb2wnXT47IH1cblxuICBnZXQgdG8oKSB7IHJldHVybiB0aGlzLmZpZWxkLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTsgfVxuXG4gIGdldCBzaG93RXJyb3IoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuc2hvd0Vycm9yKHRoaXMpOyB9XG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmZpZWxkLmlkOyB9XG5cbiAgZ2V0IGZvcm1TdGF0ZSgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5mb3JtU3RhdGUgfHwge307IH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgYEZpZWxkVHlwZWAgaW5zdGVhZFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGQgZXh0ZW5kcyBGaWVsZFR5cGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiAnRmllbGQnIGhhcyBiZWVuIHJlbmFtZWQgdG8gJ0ZpZWxkVHlwZScsIGV4dGVuZCAnRmllbGRUeXBlJyBpbnN0ZWFkLmApO1xuICB9XG59XG4iXX0=