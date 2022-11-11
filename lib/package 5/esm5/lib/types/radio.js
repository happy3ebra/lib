/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
var FormlyFieldRadio = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyFieldRadio, _super);
    function FormlyFieldRadio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            templateOptions: {
                options: [],
                formCheck: 'custom',
            },
        };
        return _this;
    }
    FormlyFieldRadio.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field-radio',
                    template: "\n    <div>\n      <div *ngFor=\"let option of to.options | formlySelectOptions:field | async; let i = index;\"\n        [ngClass]=\"{\n          'form-check': to.formCheck.indexOf('custom') === -1,\n          'form-check-inline': to.formCheck === 'inline',\n          'custom-control custom-radio': to.formCheck.indexOf('custom') === 0,\n          'custom-control-inline': to.formCheck === 'custom-inline'\n        }\"\n      >\n        <input type=\"radio\"\n          [id]=\"id + '_' + i\"\n          [class.form-check-input]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-input]=\"to.formCheck.indexOf('custom') === 0\"\n          [name]=\"field.name || id\"\n          [class.is-invalid]=\"showError\"\n          [attr.value]=\"option.value\"\n          [value]=\"option.value\"\n          [formControl]=\"formControl\"\n          [formlyAttributes]=\"field\"\n          [attr.disabled]=\"option.disabled || formControl.disabled ? true : null\">\n        <label\n          [class.form-check-label]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-label]=\"to.formCheck.indexOf('custom') === 0\"\n          [for]=\"id + '_' + i\">\n          {{ option.label }}\n        </label>\n      </div>\n    </div>\n  "
                }] }
    ];
    return FormlyFieldRadio;
}(FieldType));
export { FormlyFieldRadio };
if (false) {
    /** @type {?} */
    FormlyFieldRadio.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU3QztJQWlDc0MsNENBQVM7SUFqQy9DO1FBQUEscUVBd0NDO1FBTkMsb0JBQWMsR0FBRztZQUNmLGVBQWUsRUFBRTtnQkFDZixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsUUFBUTthQUNwQjtTQUNGLENBQUM7O0lBQ0osQ0FBQzs7Z0JBeENBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsb3ZDQTZCVDtpQkFDRjs7SUFRRCx1QkFBQztDQUFBLEFBeENELENBaUNzQyxTQUFTLEdBTzlDO1NBUFksZ0JBQWdCOzs7SUFDM0IsMENBS0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtcmFkaW8nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgdG8ub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnM6ZmllbGQgfCBhc3luYzsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2Zvcm0tY2hlY2snOiB0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xLFxuICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZSc6IHRvLmZvcm1DaGVjayA9PT0gJ2lubGluZScsXG4gICAgICAgICAgJ2N1c3RvbS1jb250cm9sIGN1c3RvbS1yYWRpbyc6IHRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gMCxcbiAgICAgICAgICAnY3VzdG9tLWNvbnRyb2wtaW5saW5lJzogdG8uZm9ybUNoZWNrID09PSAnY3VzdG9tLWlubGluZSdcbiAgICAgICAgfVwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIFtpZF09XCJpZCArICdfJyArIGlcIlxuICAgICAgICAgIFtjbGFzcy5mb3JtLWNoZWNrLWlucHV0XT1cInRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gLTFcIlxuICAgICAgICAgIFtjbGFzcy5jdXN0b20tY29udHJvbC1pbnB1dF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IDBcIlxuICAgICAgICAgIFtuYW1lXT1cImZpZWxkLm5hbWUgfHwgaWRcIlxuICAgICAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICAgICAgW2F0dHIudmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWQgfHwgZm9ybUNvbnRyb2wuZGlzYWJsZWQgPyB0cnVlIDogbnVsbFwiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICBbY2xhc3MuZm9ybS1jaGVjay1sYWJlbF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xXCJcbiAgICAgICAgICBbY2xhc3MuY3VzdG9tLWNvbnRyb2wtbGFiZWxdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwXCJcbiAgICAgICAgICBbZm9yXT1cImlkICsgJ18nICsgaVwiPlxuICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkUmFkaW8gZXh0ZW5kcyBGaWVsZFR5cGUge1xuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcbiAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgZm9ybUNoZWNrOiAnY3VzdG9tJywgLy8gJ2N1c3RvbScgfCAnY3VzdG9tLWlubGluZScgfCAnc3RhY2tlZCcgfCAnaW5saW5lJ1xuICAgIH0sXG4gIH07XG59XG4iXX0=