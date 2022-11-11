/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function FormlyFieldConfig() { }
if (false) {
    /**
     * The model that stores all the data, where the model[key] is the value of the field
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.model;
    /**
     * The parent field.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.parent;
    /** @type {?|undefined} */
    FormlyFieldConfig.prototype.options;
    /** @type {?|undefined} */
    FormlyFieldConfig.prototype.form;
    /**
     * The key that relates to the model. This will link the field value to the model
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.key;
    /**
     * This allows you to specify the `id` of your field. Note, the `id` is generated if not set.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.id;
    /**
     * If you wish, you can specify a specific `name` for your field. This is useful if you're posting the form to a server using techniques of yester-year.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.name;
    /**
     * This is reserved for the templates. Any template-specific options go in here. Look at your specific template implementation to know the options required for this.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.templateOptions;
    /** @type {?|undefined} */
    FormlyFieldConfig.prototype.optionsTypes;
    /**
     * An object with a few useful properties
     * - `validation.messages`: A map of message names that will be displayed when the field has errors.
     * - `validation.show`: A boolean you as the developer can set to force displaying errors whatever the state of field. This is useful when you're trying to call the user's attention to some fields for some reason.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.validation;
    /**
     * Used to set validation rules for a particular field.
     * Should be an object of key - value pairs. The value can either be an expression to evaluate or a function to run.
     * Each should return a boolean value, returning true when the field is valid. See Validation for more information.
     *
     * {
     *   validation?: (string | ValidatorFn)[];
     *   [key: string]: ((control: AbstractControl, field: FormlyFieldConfig) => boolean) | ({ expression: (control: AbstractControl, field: FormlyFieldConfig) => boolean, message: ValidationMessageOption['message'] });
     * }
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.validators;
    /**
     * Use this one for anything that needs to validate asynchronously.
     * Pretty much exactly the same as the validators api, except it must be a function that returns a promise.
     *
     * {
     *   validation?: (string | AsyncValidatorFn)[];
     *   [key: string]: ((control: AbstractControl, field: FormlyFieldConfig) => Promise<boolean> | Observable<boolean>) | ({ expression: (control: AbstractControl, field: FormlyFieldConfig) => Promise<boolean>, message: string });
     * }
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.asyncValidators;
    /**
     * Can be set instead of `type` to render custom html content.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.template;
    /**
     *  It is expected to be the name of the wrappers.
     *  The formly field template will be wrapped by the first wrapper, then the second, then the third, etc.
     *  You can also specify these as part of a type (which is the recommended approach).
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.wrappers;
    /**
     * Whether to hide the field. Defaults to false. If you wish this to be conditional use `hideExpression`
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.hide;
    /**
     * Conditionally hiding Field based on values from other Fields
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.hideExpression;
    /**
     * An object where the key is a property to be set on the main field config and the value is an expression used to assign that property.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.expressionProperties;
    /**
     * This is the [FormControl](https://angular.io/api/forms/FormControl) for the field.
     * It provides you more control like running validators, calculating status, and resetting state.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.formControl;
    /**
     * You can specify your own class that will be applied to the `formly-field` component.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.className;
    /**
     * Specify your own class that will be applied to the `formly-group` component.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.fieldGroupClassName;
    /**
     * A field group is a way to group fields together, making advanced layout very simple.
     * It can also be used to group fields that are associated with the same model (useful if it's different than the model for the rest of the fields).
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.fieldGroup;
    /** @type {?|undefined} */
    FormlyFieldConfig.prototype.fieldArray;
    /**
     * This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.type;
    /**
     * Whether to focus or blur the element field. Defaults to false. If you wish this to be conditional use `expressionProperties`
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.focus;
    /**
     * An object with a few useful properties to control the model changes
     * - `debounce`: integer value which contains the debounce model update value in milliseconds. A value of 0 triggers an immediate update.
     * - `updateOn`: string event value that instructs when the control should be updated
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.modelOptions;
    /** @type {?|undefined} */
    FormlyFieldConfig.prototype.hooks;
    /**
     * @deprecated use `hooks` instead
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.lifecycle;
    /**
     * Use `defaultValue` to initialize it the model. If this is provided and the value of the model at compile-time is undefined, then the value of the model will be assigned to `defaultValue`.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.defaultValue;
    /**
     * Array of functions to execute, as a pipeline, whenever the model updates, usually via user input.
     * @type {?|undefined}
     */
    FormlyFieldConfig.prototype.parsers;
}
/**
 * @record
 */
export function ExpressionPropertyCache() { }
if (false) {
    /** @type {?} */
    ExpressionPropertyCache.prototype.expression;
    /** @type {?|undefined} */
    ExpressionPropertyCache.prototype.expressionValue;
    /** @type {?|undefined} */
    ExpressionPropertyCache.prototype.expressionPaths;
}
/**
 * @record
 */
export function FormlyFieldConfigCache() { }
if (false) {
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype.parent;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype.options;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._expressionProperties;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype.resetOnHide;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._hide;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._validators;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._asyncValidators;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._componentRefs;
    /** @type {?|undefined} */
    FormlyFieldConfigCache.prototype._keyPath;
}
/**
 * @record
 */
export function FormlyTemplateOptions() { }
if (false) {
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.type;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.label;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.placeholder;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.disabled;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.options;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.rows;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.cols;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.description;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.hidden;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.max;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.min;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.minLength;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.maxLength;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.pattern;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.required;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.tabindex;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.readonly;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.attributes;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.step;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.focus;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.blur;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.keyup;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.keydown;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.click;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.change;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.keypress;
    /** @type {?|undefined} */
    FormlyTemplateOptions.prototype.templateManipulators;
    /* Skipping unhandled member: [additionalProperties: string]: any;*/
}
/**
 * @record
 */
export function FormlyLifeCycleFn() { }
/**
 * @record
 */
export function FormlyHookFn() { }
/**
 * @record
 * @template T
 */
export function FormlyLifeCycleOptions() { }
if (false) {
    /** @type {?|undefined} */
    FormlyLifeCycleOptions.prototype.onInit;
    /** @type {?|undefined} */
    FormlyLifeCycleOptions.prototype.onChanges;
    /** @type {?|undefined} */
    FormlyLifeCycleOptions.prototype.afterContentInit;
    /** @type {?|undefined} */
    FormlyLifeCycleOptions.prototype.afterViewInit;
    /** @type {?|undefined} */
    FormlyLifeCycleOptions.prototype.onDestroy;
    /**
     * @deprecated
     * @type {?|undefined}
     */
    FormlyLifeCycleOptions.prototype.doCheck;
    /**
     * @deprecated
     * @type {?|undefined}
     */
    FormlyLifeCycleOptions.prototype.afterContentChecked;
    /**
     * @deprecated
     * @type {?|undefined}
     */
    FormlyLifeCycleOptions.prototype.afterViewChecked;
    /* Skipping unhandled member: [additionalProperties: string]: any;*/
}
/**
 * @record
 */
export function FormlyFormOptionsCache() { }
if (false) {
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._checkField;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._markForCheck;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._buildForm;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._buildField;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._resolver;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._injector;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._hiddenFieldsForCheck;
    /** @type {?|undefined} */
    FormlyFormOptionsCache.prototype._initialModel;
}
/**
 * @record
 */
export function FormlyFormOptions() { }
if (false) {
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.updateInitialValue;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.resetModel;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.formState;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.fieldChanges;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.fieldTransform;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.showError;
    /** @type {?|undefined} */
    FormlyFormOptions.prototype.parentForm;
}
/**
 * @record
 */
export function FormlyValueChangeEvent() { }
if (false) {
    /** @type {?} */
    FormlyValueChangeEvent.prototype.field;
    /** @type {?} */
    FormlyValueChangeEvent.prototype.type;
    /** @type {?} */
    FormlyValueChangeEvent.prototype.value;
    /* Skipping unhandled member: [meta: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZpZWxkLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mb3JtbHkuZmllbGQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQSx1Q0FxS0M7Ozs7OztJQWpLQyxrQ0FBcUI7Ozs7O0lBS3JCLG1DQUFvQzs7SUFHcEMsb0NBQXFDOztJQUNyQyxpQ0FBMEI7Ozs7O0lBSzFCLGdDQUFpQzs7Ozs7SUFLakMsK0JBQVk7Ozs7O0lBS1osaUNBQWM7Ozs7O0lBS2QsNENBQXdDOztJQUV4Qyx5Q0FBd0I7Ozs7Ozs7SUFPeEIsdUNBTUU7Ozs7Ozs7Ozs7OztJQVlGLHVDQUFpQjs7Ozs7Ozs7Ozs7SUFXakIsNENBQXNCOzs7OztJQUt0QixxQ0FBa0I7Ozs7Ozs7SUFPbEIscUNBQW9COzs7OztJQUtwQixpQ0FBZTs7Ozs7SUFLZiwyQ0FBeUc7Ozs7O0lBS3pHLGlEQUEySTs7Ozs7O0lBTTNJLHdDQUE4Qjs7Ozs7SUFLOUIsc0NBQW1COzs7OztJQUtuQixnREFBNkI7Ozs7OztJQU03Qix1Q0FBaUM7O0lBRWpDLHVDQUErQjs7Ozs7SUFLL0IsaUNBQWM7Ozs7O0lBS2Qsa0NBQWdCOzs7Ozs7O0lBT2hCLHlDQVFFOztJQUVGLGtDQUE2Qzs7Ozs7SUFLN0Msc0NBQW1DOzs7OztJQUtuQyx5Q0FBbUI7Ozs7O0lBS25CLG9DQUFpQzs7Ozs7QUFHbkMsNkNBSUM7OztJQUhDLDZDQUFtRjs7SUFDbkYsa0RBQXNCOztJQUN0QixrREFBMkI7Ozs7O0FBRzdCLDRDQWFDOzs7SUFaQyx3Q0FBZ0M7O0lBQ2hDLHlDQUFpQzs7SUFDakMsdURBQXdFOztJQUN4RSw2Q0FBc0I7O0lBQ3RCLHVDQUFnQjs7SUFDaEIsNkNBQTRCOztJQUM1QixrREFBc0M7O0lBQ3RDLGdEQUEyQzs7SUFDM0MsMENBR0U7Ozs7O0FBS0osMkNBNkJDOzs7SUE1QkMscUNBQWM7O0lBQ2Qsc0NBQWU7O0lBQ2YsNENBQXFCOztJQUNyQix5Q0FBbUI7O0lBQ25CLHdDQUFvQzs7SUFDcEMscUNBQWM7O0lBQ2QscUNBQWM7O0lBQ2QsNENBQXFCOztJQUNyQix1Q0FBaUI7O0lBQ2pCLG9DQUFhOztJQUNiLG9DQUFhOztJQUNiLDBDQUFtQjs7SUFDbkIsMENBQW1COztJQUNuQix3Q0FBd0I7O0lBQ3hCLHlDQUFtQjs7SUFDbkIseUNBQWtCOztJQUNsQix5Q0FBbUI7O0lBQ25CLDJDQUE4Qzs7SUFDOUMscUNBQWM7O0lBQ2Qsc0NBQTZCOztJQUM3QixxQ0FBNEI7O0lBQzVCLHNDQUE2Qjs7SUFDN0Isd0NBQStCOztJQUMvQixzQ0FBNkI7O0lBQzdCLHVDQUE4Qjs7SUFDOUIseUNBQWdDOztJQUNoQyxxREFBNEM7Ozs7OztBQUk5Qyx1Q0FFQzs7OztBQUVELGtDQUVDOzs7OztBQUVELDRDQWdCQzs7O0lBZkMsd0NBQVc7O0lBQ1gsMkNBQWM7O0lBQ2Qsa0RBQXFCOztJQUNyQiwrQ0FBa0I7O0lBQ2xCLDJDQUFjOzs7OztJQUlkLHlDQUFZOzs7OztJQUdaLHFEQUF3Qjs7Ozs7SUFHeEIsa0RBQXFCOzs7Ozs7QUFHdkIsNENBU0M7OztJQVJDLDZDQUE2RTs7SUFDN0UsK0NBQXdEOztJQUN4RCw0Q0FBd0I7O0lBQ3hCLDZDQUF3RTs7SUFDeEUsMkNBQXFDOztJQUNyQywyQ0FBcUI7O0lBQ3JCLHVEQUFpRDs7SUFDakQsK0NBQW9COzs7OztBQUV0Qix1Q0FRQzs7O0lBUEMsK0NBQWdDOztJQUNoQyx1Q0FBbUM7O0lBQ25DLHNDQUFnQjs7SUFDaEIseUNBQStDOztJQUMvQywyQ0FBMkk7O0lBQzNJLHNDQUEwQzs7SUFDMUMsdUNBQXVDOzs7OztBQUd6Qyw0Q0FLQzs7O0lBSkMsdUNBQXlCOztJQUN6QixzQ0FBYTs7SUFDYix1Q0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXBEaXJlY3RpdmUsIEZvcm1BcnJheSwgQXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZmllbGQudHlwZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZU1hbmlwdWxhdG9ycywgVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBtb2RlbCB0aGF0IHN0b3JlcyBhbGwgdGhlIGRhdGEsIHdoZXJlIHRoZSBtb2RlbFtrZXldIGlzIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGRcbiAgICovXG4gIHJlYWRvbmx5IG1vZGVsPzogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyZW50IGZpZWxkLlxuICAgKi9cbiAgcmVhZG9ubHkgcGFyZW50PzogRm9ybWx5RmllbGRDb25maWc7XG5cblxuICByZWFkb25seSBvcHRpb25zPzogRm9ybWx5Rm9ybU9wdGlvbnM7XG4gIHJlYWRvbmx5IGZvcm0/OiBGb3JtR3JvdXA7XG5cbiAgLyoqXG4gICAqIFRoZSBrZXkgdGhhdCByZWxhdGVzIHRvIHRoZSBtb2RlbC4gVGhpcyB3aWxsIGxpbmsgdGhlIGZpZWxkIHZhbHVlIHRvIHRoZSBtb2RlbFxuICAgKi9cbiAga2V5Pzogc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoaXMgYWxsb3dzIHlvdSB0byBzcGVjaWZ5IHRoZSBgaWRgIG9mIHlvdXIgZmllbGQuIE5vdGUsIHRoZSBgaWRgIGlzIGdlbmVyYXRlZCBpZiBub3Qgc2V0LlxuICAgKi9cbiAgaWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIHlvdSB3aXNoLCB5b3UgY2FuIHNwZWNpZnkgYSBzcGVjaWZpYyBgbmFtZWAgZm9yIHlvdXIgZmllbGQuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSdyZSBwb3N0aW5nIHRoZSBmb3JtIHRvIGEgc2VydmVyIHVzaW5nIHRlY2huaXF1ZXMgb2YgeWVzdGVyLXllYXIuXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHJlc2VydmVkIGZvciB0aGUgdGVtcGxhdGVzLiBBbnkgdGVtcGxhdGUtc3BlY2lmaWMgb3B0aW9ucyBnbyBpbiBoZXJlLiBMb29rIGF0IHlvdXIgc3BlY2lmaWMgdGVtcGxhdGUgaW1wbGVtZW50YXRpb24gdG8ga25vdyB0aGUgb3B0aW9ucyByZXF1aXJlZCBmb3IgdGhpcy5cbiAgICovXG4gIHRlbXBsYXRlT3B0aW9ucz86IEZvcm1seVRlbXBsYXRlT3B0aW9ucztcblxuICBvcHRpb25zVHlwZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IHdpdGggYSBmZXcgdXNlZnVsIHByb3BlcnRpZXNcbiAgICogLSBgdmFsaWRhdGlvbi5tZXNzYWdlc2A6IEEgbWFwIG9mIG1lc3NhZ2UgbmFtZXMgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCB3aGVuIHRoZSBmaWVsZCBoYXMgZXJyb3JzLlxuICAgKiAtIGB2YWxpZGF0aW9uLnNob3dgOiBBIGJvb2xlYW4geW91IGFzIHRoZSBkZXZlbG9wZXIgY2FuIHNldCB0byBmb3JjZSBkaXNwbGF5aW5nIGVycm9ycyB3aGF0ZXZlciB0aGUgc3RhdGUgb2YgZmllbGQuIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91J3JlIHRyeWluZyB0byBjYWxsIHRoZSB1c2VyJ3MgYXR0ZW50aW9uIHRvIHNvbWUgZmllbGRzIGZvciBzb21lIHJlYXNvbi5cbiAgICovXG4gIHZhbGlkYXRpb24/OiB7XG4gICAgbWVzc2FnZXM/OiB7XG4gICAgICBbbWVzc2FnZVByb3BlcnRpZXM6IHN0cmluZ106IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uWydtZXNzYWdlJ107XG4gICAgfTtcbiAgICBzaG93PzogYm9vbGVhbjtcbiAgICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcbiAgfTtcblxuICAvKipcbiAgICogVXNlZCB0byBzZXQgdmFsaWRhdGlvbiBydWxlcyBmb3IgYSBwYXJ0aWN1bGFyIGZpZWxkLlxuICAgKiBTaG91bGQgYmUgYW4gb2JqZWN0IG9mIGtleSAtIHZhbHVlIHBhaXJzLiBUaGUgdmFsdWUgY2FuIGVpdGhlciBiZSBhbiBleHByZXNzaW9uIHRvIGV2YWx1YXRlIG9yIGEgZnVuY3Rpb24gdG8gcnVuLlxuICAgKiBFYWNoIHNob3VsZCByZXR1cm4gYSBib29sZWFuIHZhbHVlLCByZXR1cm5pbmcgdHJ1ZSB3aGVuIHRoZSBmaWVsZCBpcyB2YWxpZC4gU2VlIFZhbGlkYXRpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIHtcbiAgICogICB2YWxpZGF0aW9uPzogKHN0cmluZyB8IFZhbGlkYXRvckZuKVtdO1xuICAgKiAgIFtrZXk6IHN0cmluZ106ICgoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IGJvb2xlYW4pIHwgKHsgZXhwcmVzc2lvbjogKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBib29sZWFuLCBtZXNzYWdlOiBWYWxpZGF0aW9uTWVzc2FnZU9wdGlvblsnbWVzc2FnZSddIH0pO1xuICAgKiB9XG4gICAqL1xuICB2YWxpZGF0b3JzPzogYW55O1xuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBvbmUgZm9yIGFueXRoaW5nIHRoYXQgbmVlZHMgdG8gdmFsaWRhdGUgYXN5bmNocm9ub3VzbHkuXG4gICAqIFByZXR0eSBtdWNoIGV4YWN0bHkgdGhlIHNhbWUgYXMgdGhlIHZhbGlkYXRvcnMgYXBpLCBleGNlcHQgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UuXG4gICAqXG4gICAqIHtcbiAgICogICB2YWxpZGF0aW9uPzogKHN0cmluZyB8IEFzeW5jVmFsaWRhdG9yRm4pW107XG4gICAqICAgW2tleTogc3RyaW5nXTogKChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4gUHJvbWlzZTxib29sZWFuPiB8IE9ic2VydmFibGU8Ym9vbGVhbj4pIHwgKHsgZXhwcmVzc2lvbjogKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBQcm9taXNlPGJvb2xlYW4+LCBtZXNzYWdlOiBzdHJpbmcgfSk7XG4gICAqIH1cbiAgICovXG4gIGFzeW5jVmFsaWRhdG9ycz86IGFueTtcblxuICAvKipcbiAgICogQ2FuIGJlIHNldCBpbnN0ZWFkIG9mIGB0eXBlYCB0byByZW5kZXIgY3VzdG9tIGh0bWwgY29udGVudC5cbiAgICovXG4gIHRlbXBsYXRlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiAgSXQgaXMgZXhwZWN0ZWQgdG8gYmUgdGhlIG5hbWUgb2YgdGhlIHdyYXBwZXJzLlxuICAgKiAgVGhlIGZvcm1seSBmaWVsZCB0ZW1wbGF0ZSB3aWxsIGJlIHdyYXBwZWQgYnkgdGhlIGZpcnN0IHdyYXBwZXIsIHRoZW4gdGhlIHNlY29uZCwgdGhlbiB0aGUgdGhpcmQsIGV0Yy5cbiAgICogIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IHRoZXNlIGFzIHBhcnQgb2YgYSB0eXBlICh3aGljaCBpcyB0aGUgcmVjb21tZW5kZWQgYXBwcm9hY2gpLlxuICAgKi9cbiAgd3JhcHBlcnM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBoaWRlIHRoZSBmaWVsZC4gRGVmYXVsdHMgdG8gZmFsc2UuIElmIHlvdSB3aXNoIHRoaXMgdG8gYmUgY29uZGl0aW9uYWwgdXNlIGBoaWRlRXhwcmVzc2lvbmBcbiAgICovXG4gIGhpZGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGhpZGluZyBGaWVsZCBiYXNlZCBvbiB2YWx1ZXMgZnJvbSBvdGhlciBGaWVsZHNcbiAgICovXG4gIGhpZGVFeHByZXNzaW9uPzogYm9vbGVhbiB8IHN0cmluZyB8ICgobW9kZWw6IGFueSwgZm9ybVN0YXRlOiBhbnksIGZpZWxkPzogRm9ybWx5RmllbGRDb25maWcpID0+IGJvb2xlYW4pO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3Qgd2hlcmUgdGhlIGtleSBpcyBhIHByb3BlcnR5IHRvIGJlIHNldCBvbiB0aGUgbWFpbiBmaWVsZCBjb25maWcgYW5kIHRoZSB2YWx1ZSBpcyBhbiBleHByZXNzaW9uIHVzZWQgdG8gYXNzaWduIHRoYXQgcHJvcGVydHkuXG4gICAqL1xuICBleHByZXNzaW9uUHJvcGVydGllcz86IHsgW3Byb3BlcnR5OiBzdHJpbmddOiBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55LCBmaWVsZD86IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBhbnkpIHwgT2JzZXJ2YWJsZTxhbnk+IH07XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIFtGb3JtQ29udHJvbF0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9Gb3JtQ29udHJvbCkgZm9yIHRoZSBmaWVsZC5cbiAgICogSXQgcHJvdmlkZXMgeW91IG1vcmUgY29udHJvbCBsaWtlIHJ1bm5pbmcgdmFsaWRhdG9ycywgY2FsY3VsYXRpbmcgc3RhdHVzLCBhbmQgcmVzZXR0aW5nIHN0YXRlLlxuICAgKi9cbiAgZm9ybUNvbnRyb2w/OiBBYnN0cmFjdENvbnRyb2w7XG5cbiAgLyoqXG4gICAqIFlvdSBjYW4gc3BlY2lmeSB5b3VyIG93biBjbGFzcyB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byB0aGUgYGZvcm1seS1maWVsZGAgY29tcG9uZW50LlxuICAgKi9cbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHlvdXIgb3duIGNsYXNzIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBgZm9ybWx5LWdyb3VwYCBjb21wb25lbnQuXG4gICAqL1xuICBmaWVsZEdyb3VwQ2xhc3NOYW1lPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZpZWxkIGdyb3VwIGlzIGEgd2F5IHRvIGdyb3VwIGZpZWxkcyB0b2dldGhlciwgbWFraW5nIGFkdmFuY2VkIGxheW91dCB2ZXJ5IHNpbXBsZS5cbiAgICogSXQgY2FuIGFsc28gYmUgdXNlZCB0byBncm91cCBmaWVsZHMgdGhhdCBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzYW1lIG1vZGVsICh1c2VmdWwgaWYgaXQncyBkaWZmZXJlbnQgdGhhbiB0aGUgbW9kZWwgZm9yIHRoZSByZXN0IG9mIHRoZSBmaWVsZHMpLlxuICAgKi9cbiAgZmllbGRHcm91cD86IEZvcm1seUZpZWxkQ29uZmlnW107XG5cbiAgZmllbGRBcnJheT86IEZvcm1seUZpZWxkQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBUaGlzIHNob3VsZCBiZSBhIGZvcm1seS1maWVsZCB0eXBlIGFkZGVkIGVpdGhlciBieSB5b3Ugb3IgYSBwbHVnaW4uIE1vcmUgaW5mb3JtYXRpb24gb3ZlciBhdCBDcmVhdGluZyBGb3JtbHkgRmllbGRzLlxuICAgKi9cbiAgdHlwZT86IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0byBmb2N1cyBvciBibHVyIHRoZSBlbGVtZW50IGZpZWxkLiBEZWZhdWx0cyB0byBmYWxzZS4gSWYgeW91IHdpc2ggdGhpcyB0byBiZSBjb25kaXRpb25hbCB1c2UgYGV4cHJlc3Npb25Qcm9wZXJ0aWVzYFxuICAgKi9cbiAgZm9jdXM/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBvYmplY3Qgd2l0aCBhIGZldyB1c2VmdWwgcHJvcGVydGllcyB0byBjb250cm9sIHRoZSBtb2RlbCBjaGFuZ2VzXG4gICAqIC0gYGRlYm91bmNlYDogaW50ZWdlciB2YWx1ZSB3aGljaCBjb250YWlucyB0aGUgZGVib3VuY2UgbW9kZWwgdXBkYXRlIHZhbHVlIGluIG1pbGxpc2Vjb25kcy4gQSB2YWx1ZSBvZiAwIHRyaWdnZXJzIGFuIGltbWVkaWF0ZSB1cGRhdGUuXG4gICAqIC0gYHVwZGF0ZU9uYDogc3RyaW5nIGV2ZW50IHZhbHVlIHRoYXQgaW5zdHJ1Y3RzIHdoZW4gdGhlIGNvbnRyb2wgc2hvdWxkIGJlIHVwZGF0ZWRcbiAgICovXG4gIG1vZGVsT3B0aW9ucz86IHtcbiAgICBkZWJvdW5jZT86IHtcbiAgICAgIGRlZmF1bHQ6IG51bWJlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9BYnN0cmFjdENvbnRyb2wjdXBkYXRlT25cbiAgICAgKi9cbiAgICB1cGRhdGVPbj86ICdjaGFuZ2UnIHwgJ2JsdXInIHwgJ3N1Ym1pdCc7XG4gIH07XG5cbiAgaG9va3M/OiBGb3JtbHlMaWZlQ3ljbGVPcHRpb25zPEZvcm1seUhvb2tGbj47XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBgaG9va3NgIGluc3RlYWRcbiAgICovXG4gIGxpZmVjeWNsZT86IEZvcm1seUxpZmVDeWNsZU9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIFVzZSBgZGVmYXVsdFZhbHVlYCB0byBpbml0aWFsaXplIGl0IHRoZSBtb2RlbC4gSWYgdGhpcyBpcyBwcm92aWRlZCBhbmQgdGhlIHZhbHVlIG9mIHRoZSBtb2RlbCBhdCBjb21waWxlLXRpbWUgaXMgdW5kZWZpbmVkLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgbW9kZWwgd2lsbCBiZSBhc3NpZ25lZCB0byBgZGVmYXVsdFZhbHVlYC5cbiAgICovXG4gIGRlZmF1bHRWYWx1ZT86IGFueTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgZnVuY3Rpb25zIHRvIGV4ZWN1dGUsIGFzIGEgcGlwZWxpbmUsIHdoZW5ldmVyIHRoZSBtb2RlbCB1cGRhdGVzLCB1c3VhbGx5IHZpYSB1c2VyIGlucHV0LlxuICAgKi9cbiAgcGFyc2Vycz86ICgodmFsdWU6IGFueSkgPT4ge30pW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhwcmVzc2lvblByb3BlcnR5Q2FjaGUge1xuICBleHByZXNzaW9uOiAobW9kZWw6IGFueSwgZm9ybVN0YXRlOiBhbnksIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSA9PiBib29sZWFuO1xuICBleHByZXNzaW9uVmFsdWU/OiBhbnk7XG4gIGV4cHJlc3Npb25QYXRocz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gIHBhcmVudD86IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGU7XG4gIG9wdGlvbnM/OiBGb3JtbHlGb3JtT3B0aW9uc0NhY2hlO1xuICBfZXhwcmVzc2lvblByb3BlcnRpZXM/OiB7IFtwcm9wZXJ0eTogc3RyaW5nXTogRXhwcmVzc2lvblByb3BlcnR5Q2FjaGUgfTtcbiAgcmVzZXRPbkhpZGU/OiBib29sZWFuO1xuICBfaGlkZT86IGJvb2xlYW47XG4gIF92YWxpZGF0b3JzPzogVmFsaWRhdG9yRm5bXTtcbiAgX2FzeW5jVmFsaWRhdG9ycz86IEFzeW5jVmFsaWRhdG9yRm5bXTtcbiAgX2NvbXBvbmVudFJlZnM/OiBDb21wb25lbnRSZWY8RmllbGRUeXBlPltdO1xuICBfa2V5UGF0aD86IHtcbiAgICBrZXk6IEZvcm1seUZpZWxkQ29uZmlnWydrZXknXTtcbiAgICBwYXRoOiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgRm9ybWx5QXR0cmlidXRlRXZlbnQgPSAoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBldmVudD86IGFueSkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlUZW1wbGF0ZU9wdGlvbnMge1xuICB0eXBlPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb3B0aW9ucz86IGFueVtdIHwgT2JzZXJ2YWJsZTxhbnlbXT47XG4gIHJvd3M/OiBudW1iZXI7XG4gIGNvbHM/OiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBoaWRkZW4/OiBib29sZWFuO1xuICBtYXg/OiBudW1iZXI7XG4gIG1pbj86IG51bWJlcjtcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBtYXhMZW5ndGg/OiBudW1iZXI7XG4gIHBhdHRlcm4/OiBzdHJpbmd8UmVnRXhwO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIHRhYmluZGV4PzogbnVtYmVyO1xuICByZWFkb25seT86IGJvb2xlYW47XG4gIGF0dHJpYnV0ZXM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXIgfTtcbiAgc3RlcD86IG51bWJlcjtcbiAgZm9jdXM/OiBGb3JtbHlBdHRyaWJ1dGVFdmVudDtcbiAgYmx1cj86IEZvcm1seUF0dHJpYnV0ZUV2ZW50O1xuICBrZXl1cD86IEZvcm1seUF0dHJpYnV0ZUV2ZW50O1xuICBrZXlkb3duPzogRm9ybWx5QXR0cmlidXRlRXZlbnQ7XG4gIGNsaWNrPzogRm9ybWx5QXR0cmlidXRlRXZlbnQ7XG4gIGNoYW5nZT86IEZvcm1seUF0dHJpYnV0ZUV2ZW50O1xuICBrZXlwcmVzcz86IEZvcm1seUF0dHJpYnV0ZUV2ZW50O1xuICB0ZW1wbGF0ZU1hbmlwdWxhdG9ycz86IFRlbXBsYXRlTWFuaXB1bGF0b3JzO1xuICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlMaWZlQ3ljbGVGbiB7XG4gIChmb3JtPzogRm9ybUdyb3VwLCBmaWVsZD86IEZvcm1seUZpZWxkQ29uZmlnLCBtb2RlbD86IGFueSwgb3B0aW9ucz86IEZvcm1seUZvcm1PcHRpb25zKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlIb29rRm4ge1xuICAoZmllbGQ/OiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5TGlmZUN5Y2xlT3B0aW9uczxUID0gRm9ybWx5TGlmZUN5Y2xlRm4+IHtcbiAgb25Jbml0PzogVDtcbiAgb25DaGFuZ2VzPzogVDtcbiAgYWZ0ZXJDb250ZW50SW5pdD86IFQ7XG4gIGFmdGVyVmlld0luaXQ/OiBUO1xuICBvbkRlc3Ryb3k/OiBUO1xuICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgZG9DaGVjaz86IFQ7XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIGFmdGVyQ29udGVudENoZWNrZWQ/OiBUO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xuICBhZnRlclZpZXdDaGVja2VkPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlGb3JtT3B0aW9uc0NhY2hlIGV4dGVuZHMgRm9ybWx5Rm9ybU9wdGlvbnMge1xuICBfY2hlY2tGaWVsZD86IChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgaWdub3JlQ2FjaGU/OiBib29sZWFuKSA9PiB2b2lkO1xuICBfbWFya0ZvckNoZWNrPzogKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSA9PiB2b2lkO1xuICBfYnVpbGRGb3JtPzogKCkgPT4gdm9pZDtcbiAgX2J1aWxkRmllbGQ/OiAoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpID0+IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGU7XG4gIF9yZXNvbHZlcj86IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcbiAgX2luamVjdG9yPzogSW5qZWN0b3I7XG4gIF9oaWRkZW5GaWVsZHNGb3JDaGVjaz86IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGVbXTtcbiAgX2luaXRpYWxNb2RlbD86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5Rm9ybU9wdGlvbnMge1xuICB1cGRhdGVJbml0aWFsVmFsdWU/OiAoKSA9PiB2b2lkO1xuICByZXNldE1vZGVsPzogKG1vZGVsPzogYW55KSA9PiB2b2lkO1xuICBmb3JtU3RhdGU/OiBhbnk7XG4gIGZpZWxkQ2hhbmdlcz86IFN1YmplY3Q8Rm9ybWx5VmFsdWVDaGFuZ2VFdmVudD47XG4gIGZpZWxkVHJhbnNmb3JtPzogKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSwgbW9kZWw6IGFueSwgZm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5LCBvcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9ucykgPT4gRm9ybWx5RmllbGRDb25maWdbXTtcbiAgc2hvd0Vycm9yPzogKGZpZWxkOiBGaWVsZFR5cGUpID0+IGJvb2xlYW47XG4gIHBhcmVudEZvcm0/OiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seVZhbHVlQ2hhbmdlRXZlbnQge1xuICBmaWVsZDogRm9ybWx5RmllbGRDb25maWc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IGFueTtcbiAgW21ldGE6IHN0cmluZ106IGFueTtcbn1cblxuIl19