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
var FormlyValidationMessage = /** @class */ (function () {
    function FormlyValidationMessage(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @return {?}
     */
    FormlyValidationMessage.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var EXPR_VALIDATORS = FORMLY_VALIDATORS.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return "templateOptions." + v; }));
        this.errorMessage$ = merge(this.field.formControl.statusChanges, (!this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var field = _a.field, type = _a.type, property = _a.property;
                return (field === _this.field)
                    && (type === 'expressionChanges')
                    && ((property.indexOf('validation') !== -1)
                        || (EXPR_VALIDATORS.indexOf(property) !== -1));
            }))))).pipe(startWith(null), switchMap((/**
         * @return {?}
         */
        function () { return isObservable(_this.errorMessage)
            ? _this.errorMessage
            : of(_this.errorMessage); })));
    };
    Object.defineProperty(FormlyValidationMessage.prototype, "errorMessage", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var fieldForm = this.field.formControl;
            for (var error in fieldForm.errors) {
                if (fieldForm.errors.hasOwnProperty(error)) {
                    /** @type {?} */
                    var message = this.formlyConfig.getValidatorMessage(error);
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
        },
        enumerable: true,
        configurable: true
    });
    FormlyValidationMessage.decorators = [
        { type: Component, args: [{
                    selector: 'formly-validation-message',
                    template: "{{ errorMessage$ | async }}",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    FormlyValidationMessage.ctorParameters = function () { return [
        { type: FormlyConfig }
    ]; };
    FormlyValidationMessage.propDecorators = {
        field: [{ type: Input }]
    };
    return FormlyValidationMessage;
}());
export { FormlyValidationMessage };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LnZhbGlkYXRpb24tbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2Zvcm1seS52YWxpZGF0aW9uLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQTJCLE1BQU0sMkJBQTJCLENBQUM7QUFFbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlEO0lBU0UsaUNBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQzs7OztJQUVsRCw2Q0FBVzs7O0lBQVg7UUFBQSxpQkEwQkM7O1lBekJPLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxxQkFBbUIsQ0FBRyxFQUF0QixDQUFzQixFQUFDO1FBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQ3BDLENBQ0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbEMsTUFBTTs7OztZQUFD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QUM7aUJBQ2hCO2FBQ0Y7UUFDSCxDQUFDOzs7T0FBQTs7Z0JBMUVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBWFEsWUFBWTs7O3dCQWFsQixLQUFLOztJQXFFUiw4QkFBQztDQUFBLEFBM0VELElBMkVDO1NBdEVZLHVCQUF1Qjs7O0lBQ2xDLHdDQUFrQzs7SUFDbEMsZ0RBQWtDOzs7OztJQUV0QiwrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGT1JNTFlfVkFMSURBVE9SUywgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZScsXG4gIHRlbXBsYXRlOiBge3sgZXJyb3JNZXNzYWdlJCB8IGFzeW5jIH19YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seVZhbGlkYXRpb25NZXNzYWdlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnO1xuICBlcnJvck1lc3NhZ2UkOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZykge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBjb25zdCBFWFBSX1ZBTElEQVRPUlMgPSBGT1JNTFlfVkFMSURBVE9SUy5tYXAodiA9PiBgdGVtcGxhdGVPcHRpb25zLiR7dn1gKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSQgPSBtZXJnZShcbiAgICAgIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcyxcbiAgICAgIChcbiAgICAgICAgIXRoaXMuZmllbGQub3B0aW9uc1xuICAgICAgICA/IG9mKG51bGwpXG4gICAgICAgIDogdGhpcy5maWVsZC5vcHRpb25zLmZpZWxkQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCh7IGZpZWxkLCB0eXBlLCBwcm9wZXJ0eSB9KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoZmllbGQgPT09IHRoaXMuZmllbGQpXG4gICAgICAgICAgICAgICAgJiYgKHR5cGUgPT09ICdleHByZXNzaW9uQ2hhbmdlcycpXG4gICAgICAgICAgICAgICAgJiYgKFxuICAgICAgICAgICAgICAgICAgKHByb3BlcnR5LmluZGV4T2YoJ3ZhbGlkYXRpb24nKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICB8fCAoRVhQUl9WQUxJREFUT1JTLmluZGV4T2YocHJvcGVydHkpICE9PSAtMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIClcbiAgICAgICksXG4gICAgKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IGlzT2JzZXJ2YWJsZSh0aGlzLmVycm9yTWVzc2FnZSlcbiAgICAgICAgPyB0aGlzLmVycm9yTWVzc2FnZVxuICAgICAgICA6IG9mKHRoaXMuZXJyb3JNZXNzYWdlKSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIGdldCBlcnJvck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZmllbGRGb3JtID0gdGhpcy5maWVsZC5mb3JtQ29udHJvbDtcbiAgICBmb3IgKGxldCBlcnJvciBpbiBmaWVsZEZvcm0uZXJyb3JzKSB7XG4gICAgICBpZiAoZmllbGRGb3JtLmVycm9ycy5oYXNPd25Qcm9wZXJ0eShlcnJvcikpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U6IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uWydtZXNzYWdlJ10gPSB0aGlzLmZvcm1seUNvbmZpZy5nZXRWYWxpZGF0b3JNZXNzYWdlKGVycm9yKTtcblxuICAgICAgICBpZiAoaXNPYmplY3QoZmllbGRGb3JtLmVycm9yc1tlcnJvcl0pKSB7XG4gICAgICAgICAgaWYgKGZpZWxkRm9ybS5lcnJvcnNbZXJyb3JdLmVycm9yUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gZmllbGRGb3JtLmVycm9yc1tlcnJvcl0ubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWVsZC52YWxpZGF0aW9uICYmIHRoaXMuZmllbGQudmFsaWRhdGlvbi5tZXNzYWdlcyAmJiB0aGlzLmZpZWxkLnZhbGlkYXRpb24ubWVzc2FnZXNbZXJyb3JdKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZmllbGQudmFsaWRhdGlvbi5tZXNzYWdlc1tlcnJvcl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWVsZC52YWxpZGF0b3JzICYmIHRoaXMuZmllbGQudmFsaWRhdG9yc1tlcnJvcl0gJiYgdGhpcy5maWVsZC52YWxpZGF0b3JzW2Vycm9yXS5tZXNzYWdlKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZmllbGQudmFsaWRhdG9yc1tlcnJvcl0ubWVzc2FnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZpZWxkLmFzeW5jVmFsaWRhdG9ycyAmJiB0aGlzLmZpZWxkLmFzeW5jVmFsaWRhdG9yc1tlcnJvcl0gJiYgdGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnNbZXJyb3JdLm1lc3NhZ2UpIHtcbiAgICAgICAgICBtZXNzYWdlID0gdGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnNbZXJyb3JdLm1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZShmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXSwgdGhpcy5maWVsZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==