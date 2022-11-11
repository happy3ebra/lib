/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormlyConfig } from '../services/formly.config';
import { FORMLY_VALIDATORS, isObject } from '../utils';
import { isObservable, of } from 'rxjs';
import { merge } from 'rxjs';
import { startWith, switchMap, filter } from 'rxjs/operators';
export class FormlyValidationMessage {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const EXPR_VALIDATORS = FORMLY_VALIDATORS.map((/**
         * @param {?} v
         * @return {?}
         */
        v => `templateOptions.${v}`));
        this.errorMessage$ = merge(this.field.formControl.statusChanges, (!this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ field, type, property }) => {
                return (field === this.field)
                    && (type === 'expressionChanges')
                    && ((property.indexOf('validation') !== -1)
                        || (EXPR_VALIDATORS.indexOf(property) !== -1));
            }))))).pipe(startWith(null), switchMap((/**
         * @return {?}
         */
        () => isObservable(this.errorMessage)
            ? this.errorMessage
            : of(this.errorMessage))));
    }
    /**
     * @return {?}
     */
    get errorMessage() {
        /** @type {?} */
        const fieldForm = this.field.formControl;
        for (let error in fieldForm.errors) {
            if (fieldForm.errors.hasOwnProperty(error)) {
                /** @type {?} */
                let message = this.formlyConfig.getValidatorMessage(error);
                if (isObject(fieldForm.errors[error])) {
                    if (fieldForm.errors[error].errorPath) {
                        return;
                    }
                    if (fieldForm.errors[error].message) {
                        message = fieldForm.errors[error].message;
                    }
                }
                if (this.field.validation && this.field.validation.messages && this.field.validation.messages[error]) {
                    message = this.field.validation.messages[error];
                }
                if (this.field.validators && this.field.validators[error] && this.field.validators[error].message) {
                    message = this.field.validators[error].message;
                }
                if (this.field.asyncValidators && this.field.asyncValidators[error] && this.field.asyncValidators[error].message) {
                    message = this.field.asyncValidators[error].message;
                }
                if (typeof message === 'function') {
                    return message(fieldForm.errors[error], this.field);
                }
                return message;
            }
        }
    }
}
FormlyValidationMessage.decorators = [
    { type: Component, args: [{
                selector: 'formly-validation-message',
                template: `{{ errorMessage$ | async }}`,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
FormlyValidationMessage.ctorParameters = () => [
    { type: FormlyConfig }
];
FormlyValidationMessage.propDecorators = {
    field: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FormlyValidationMessage.prototype.field;
    /** @type {?} */
    FormlyValidationMessage.prototype.errorMessage$;
    /**
     * @type {?}
     * @private
     */
    FormlyValidationMessage.prototype.formlyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LnZhbGlkYXRpb24tbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2Zvcm1seS52YWxpZGF0aW9uLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQTJCLE1BQU0sMkJBQTJCLENBQUM7QUFFbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzlELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFJbEMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDOzs7O0lBRWxELFdBQVc7O2NBQ0gsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBQztRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUNwQyxDQUNFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ25CLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2xDLE1BQU07Ozs7WUFBQyxDQUFDLEVB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LENBQUM7OztZQTFFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFYUSxZQUFZOzs7b0JBYWxCLEtBQUs7Ozs7SUFBTix3Q0FBa0M7O0lBQ2xDLGdEQUFrQzs7Ozs7SUFFdEIsK0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnLCBWYWxpZGF0aW9uTWVzc2FnZU9wdGlvbiB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRk9STUxZX1ZBTElEQVRPUlMsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS12YWxpZGF0aW9uLW1lc3NhZ2UnLFxuICB0ZW1wbGF0ZTogYHt7IGVycm9yTWVzc2FnZSQgfCBhc3luYyB9fWAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlWYWxpZGF0aW9uTWVzc2FnZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgZXJyb3JNZXNzYWdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWcpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc3QgRVhQUl9WQUxJREFUT1JTID0gRk9STUxZX1ZBTElEQVRPUlMubWFwKHYgPT4gYHRlbXBsYXRlT3B0aW9ucy4ke3Z9YCk7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UkID0gbWVyZ2UoXG4gICAgICB0aGlzLmZpZWxkLmZvcm1Db250cm9sLnN0YXR1c0NoYW5nZXMsXG4gICAgICAoXG4gICAgICAgICF0aGlzLmZpZWxkLm9wdGlvbnNcbiAgICAgICAgPyBvZihudWxsKVxuICAgICAgICA6IHRoaXMuZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoeyBmaWVsZCwgdHlwZSwgcHJvcGVydHkgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKGZpZWxkID09PSB0aGlzLmZpZWxkKVxuICAgICAgICAgICAgICAgICYmICh0eXBlID09PSAnZXhwcmVzc2lvbkNoYW5nZXMnKVxuICAgICAgICAgICAgICAgICYmIChcbiAgICAgICAgICAgICAgICAgIChwcm9wZXJ0eS5pbmRleE9mKCd2YWxpZGF0aW9uJykgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgfHwgKEVYUFJfVkFMSURBVE9SUy5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApXG4gICAgICApLFxuICAgICkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBpc09ic2VydmFibGUodGhpcy5lcnJvck1lc3NhZ2UpXG4gICAgICAgID8gdGhpcy5lcnJvck1lc3NhZ2VcbiAgICAgICAgOiBvZih0aGlzLmVycm9yTWVzc2FnZSksXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBnZXQgZXJyb3JNZXNzYWdlKCkge1xuICAgIGNvbnN0IGZpZWxkRm9ybSA9IHRoaXMuZmllbGQuZm9ybUNvbnRyb2w7XG4gICAgZm9yIChsZXQgZXJyb3IgaW4gZmllbGRGb3JtLmVycm9ycykge1xuICAgICAgaWYgKGZpZWxkRm9ybS5lcnJvcnMuaGFzT3duUHJvcGVydHkoZXJyb3IpKSB7XG4gICAgICAgIGxldCBtZXNzYWdlOiBWYWxpZGF0aW9uTWVzc2FnZU9wdGlvblsnbWVzc2FnZSddID0gdGhpcy5mb3JtbHlDb25maWcuZ2V0VmFsaWRhdG9yTWVzc2FnZShlcnJvcik7XG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KGZpZWxkRm9ybS5lcnJvcnNbZXJyb3JdKSkge1xuICAgICAgICAgIGlmIChmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXS5lcnJvclBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmllbGRGb3JtLmVycm9yc1tlcnJvcl0ubWVzc2FnZSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IGZpZWxkRm9ybS5lcnJvcnNbZXJyb3JdLm1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmllbGQudmFsaWRhdGlvbiAmJiB0aGlzLmZpZWxkLnZhbGlkYXRpb24ubWVzc2FnZXMgJiYgdGhpcy5maWVsZC52YWxpZGF0aW9uLm1lc3NhZ2VzW2Vycm9yXSkge1xuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmZpZWxkLnZhbGlkYXRpb24ubWVzc2FnZXNbZXJyb3JdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmllbGQudmFsaWRhdG9ycyAmJiB0aGlzLmZpZWxkLnZhbGlkYXRvcnNbZXJyb3JdICYmIHRoaXMuZmllbGQudmFsaWRhdG9yc1tlcnJvcl0ubWVzc2FnZSkge1xuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmZpZWxkLnZhbGlkYXRvcnNbZXJyb3JdLm1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnMgJiYgdGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnNbZXJyb3JdICYmIHRoaXMuZmllbGQuYXN5bmNWYWxpZGF0b3JzW2Vycm9yXS5tZXNzYWdlKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZmllbGQuYXN5bmNWYWxpZGF0b3JzW2Vycm9yXS5tZXNzYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIG1lc3NhZ2UoZmllbGRGb3JtLmVycm9yc1tlcnJvcl0sIHRoaXMuZmllbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=