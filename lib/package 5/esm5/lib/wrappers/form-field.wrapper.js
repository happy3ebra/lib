/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
var FormlyWrapperFormField = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyWrapperFormField, _super);
    function FormlyWrapperFormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormlyWrapperFormField.decorators = [
        { type: Component, args: [{
                    selector: 'formly-wrapper-form-field',
                    template: "\n    <div class=\"form-group\" [class.has-error]=\"showError\">\n      <label *ngIf=\"to.label && to.hideLabel !== true\" [attr.for]=\"id\">\n        {{ to.label }}\n        <span *ngIf=\"to.required && to.hideRequiredMarker !== true\" aria-hidden=\"true\">*</span>\n      </label>\n\n      <ng-template #fieldComponent></ng-template>\n\n      <div *ngIf=\"showError\" class=\"invalid-feedback\" [style.display]=\"'block'\">\n        <formly-validation-message [field]=\"field\"></formly-validation-message>\n      </div>\n\n      <small *ngIf=\"to.description\" class=\"form-text text-muted\">{{ to.description }}</small>\n    </div>\n  "
                }] }
    ];
    return FormlyWrapperFormField;
}(FieldWrapper));
export { FormlyWrapperFormField };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2Zvcm0tZmllbGQud3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWhEO0lBbUI0QyxrREFBWTtJQW5CeEQ7O0lBb0JBLENBQUM7O2dCQXBCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFLGlvQkFlVDtpQkFDRjs7SUFFRCw2QkFBQztDQUFBLEFBcEJELENBbUI0QyxZQUFZLEdBQ3ZEO1NBRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXdyYXBwZXItZm9ybS1maWVsZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbY2xhc3MuaGFzLWVycm9yXT1cInNob3dFcnJvclwiPlxuICAgICAgPGxhYmVsICpuZ0lmPVwidG8ubGFiZWwgJiYgdG8uaGlkZUxhYmVsICE9PSB0cnVlXCIgW2F0dHIuZm9yXT1cImlkXCI+XG4gICAgICAgIHt7IHRvLmxhYmVsIH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidG8ucmVxdWlyZWQgJiYgdG8uaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZmllbGRDb21wb25lbnQ+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPGRpdiAqbmdJZj1cInNob3dFcnJvclwiIGNsYXNzPVwiaW52YWxpZC1mZWVkYmFja1wiIFtzdHlsZS5kaXNwbGF5XT1cIidibG9jaydcIj5cbiAgICAgICAgPGZvcm1seS12YWxpZGF0aW9uLW1lc3NhZ2UgW2ZpZWxkXT1cImZpZWxkXCI+PC9mb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxzbWFsbCAqbmdJZj1cInRvLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPnt7IHRvLmRlc2NyaXB0aW9uIH19PC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5V3JhcHBlckZvcm1GaWVsZCBleHRlbmRzIEZpZWxkV3JhcHBlciB7XG59XG4iXX0=