/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
var FormlyFieldCheckbox = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyFieldCheckbox, _super);
    function FormlyFieldCheckbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            templateOptions: {
                indeterminate: true,
                hideLabel: true,
                formCheck: 'custom',
            },
        };
        return _this;
    }
    FormlyFieldCheckbox.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field-checkbox',
                    template: "\n    <div [ngClass]=\"{\n      'form-check': to.formCheck.indexOf('custom') === -1,\n      'form-check-inline': to.formCheck === 'inline',\n      'custom-control': to.formCheck.indexOf('custom') === 0,\n      'custom-checkbox': to.formCheck === 'custom' || to.formCheck === 'custom-inline',\n      'custom-control-inline': to.formCheck === 'custom-inline',\n      'custom-switch': to.formCheck === 'custom-switch'\n    }\">\n      <input type=\"checkbox\"\n        [class.is-invalid]=\"showError\"\n        [class.form-check-input]=\"to.formCheck.indexOf('custom') === -1\"\n        [class.position-static]=\"to.formCheck === 'nolabel'\"\n        [class.custom-control-input]=\"to.formCheck.indexOf('custom') === 0\"\n        [indeterminate]=\"to.indeterminate && formControl.value === null\"\n        [formControl]=\"formControl\"\n        [formlyAttributes]=\"field\">\n      <label [for]=\"id\"\n        *ngIf=\"to.formCheck !== 'nolabel'\"\n        [class.form-check-label]=\"to.formCheck.indexOf('custom') === -1\"\n        [class.custom-control-label]=\"to.formCheck.indexOf('custom') === 0\"\n      >\n        {{ to.label }}\n        <span *ngIf=\"to.required && to.hideRequiredMarker !== true\" aria-hidden=\"true\">*</span>\n      </label>\n    </div>\n  "
                }] }
    ];
    return FormlyFieldCheckbox;
}(FieldType));
export { FormlyFieldCheckbox };
if (false) {
    /** @type {?} */
    FormlyFieldCheckbox.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU3QztJQThCeUMsK0NBQVM7SUE5QmxEO1FBQUEscUVBc0NDO1FBUEMsb0JBQWMsR0FBRztZQUNmLGVBQWUsRUFBRTtnQkFDZixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLFFBQVE7YUFDcEI7U0FDRixDQUFDOztJQUNKLENBQUM7O2dCQXRDQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLG12Q0EwQlQ7aUJBQ0Y7O0lBU0QsMEJBQUM7Q0FBQSxBQXRDRCxDQThCeUMsU0FBUyxHQVFqRDtTQVJZLG1CQUFtQjs7O0lBQzlCLDZDQU1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ0NsYXNzXT1cIntcbiAgICAgICdmb3JtLWNoZWNrJzogdG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAtMSxcbiAgICAgICdmb3JtLWNoZWNrLWlubGluZSc6IHRvLmZvcm1DaGVjayA9PT0gJ2lubGluZScsXG4gICAgICAnY3VzdG9tLWNvbnRyb2wnOiB0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IDAsXG4gICAgICAnY3VzdG9tLWNoZWNrYm94JzogdG8uZm9ybUNoZWNrID09PSAnY3VzdG9tJyB8fCB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20taW5saW5lJyxcbiAgICAgICdjdXN0b20tY29udHJvbC1pbmxpbmUnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20taW5saW5lJyxcbiAgICAgICdjdXN0b20tc3dpdGNoJzogdG8uZm9ybUNoZWNrID09PSAnY3VzdG9tLXN3aXRjaCdcbiAgICB9XCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgW2NsYXNzLmZvcm0tY2hlY2staW5wdXRdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAtMVwiXG4gICAgICAgIFtjbGFzcy5wb3NpdGlvbi1zdGF0aWNdPVwidG8uZm9ybUNoZWNrID09PSAnbm9sYWJlbCdcIlxuICAgICAgICBbY2xhc3MuY3VzdG9tLWNvbnRyb2wtaW5wdXRdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwXCJcbiAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwidG8uaW5kZXRlcm1pbmF0ZSAmJiBmb3JtQ29udHJvbC52YWx1ZSA9PT0gbnVsbFwiXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCI+XG4gICAgICA8bGFiZWwgW2Zvcl09XCJpZFwiXG4gICAgICAgICpuZ0lmPVwidG8uZm9ybUNoZWNrICE9PSAnbm9sYWJlbCdcIlxuICAgICAgICBbY2xhc3MuZm9ybS1jaGVjay1sYWJlbF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xXCJcbiAgICAgICAgW2NsYXNzLmN1c3RvbS1jb250cm9sLWxhYmVsXT1cInRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gMFwiXG4gICAgICA+XG4gICAgICAgIHt7IHRvLmxhYmVsIH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidG8ucmVxdWlyZWQgJiYgdG8uaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkQ2hlY2tib3ggZXh0ZW5kcyBGaWVsZFR5cGUge1xuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICBoaWRlTGFiZWw6IHRydWUsXG4gICAgICBmb3JtQ2hlY2s6ICdjdXN0b20nLCAvLyAnY3VzdG9tJyB8ICdjdXN0b20taW5saW5lJyB8ICdjdXN0b20tc3dpdGNoJyB8ICdzdGFja2VkJyB8ICdpbmxpbmUnIHwgJ25vbGFiZWwnXG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==