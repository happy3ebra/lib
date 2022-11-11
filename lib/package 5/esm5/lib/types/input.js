/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
var FormlyFieldInput = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyFieldInput, _super);
    function FormlyFieldInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormlyFieldInput.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.to.type || 'text';
        },
        enumerable: true,
        configurable: true
    });
    FormlyFieldInput.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field-input',
                    template: "\n    <input *ngIf=\"type !== 'number' else numberTmp\" [type]=\"type\" [formControl]=\"formControl\" class=\"form-control\" [formlyAttributes]=\"field\" [class.is-invalid]=\"showError\">\n    <ng-template #numberTmp>\n      <input type=\"number\" [formControl]=\"formControl\" class=\"form-control\" [formlyAttributes]=\"field\" [class.is-invalid]=\"showError\">\n    </ng-template>\n  "
                }] }
    ];
    return FormlyFieldInput;
}(FieldType));
export { FormlyFieldInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU3QztJQVNzQyw0Q0FBUztJQVQvQzs7SUFhQSxDQUFDO0lBSEMsc0JBQUksa0NBQUk7Ozs7UUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBOztnQkFaRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLHFZQUtUO2lCQUNGOztJQUtELHVCQUFDO0NBQUEsQUFiRCxDQVNzQyxTQUFTLEdBSTlDO1NBSlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLWlucHV0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXQgKm5nSWY9XCJ0eXBlICE9PSAnbnVtYmVyJyBlbHNlIG51bWJlclRtcFwiIFt0eXBlXT1cInR5cGVcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCIgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCI+XG4gICAgPG5nLXRlbXBsYXRlICNudW1iZXJUbXA+XG4gICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIiBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZElucHV0IGV4dGVuZHMgRmllbGRUeXBlIHtcbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudG8udHlwZSB8fCAndGV4dCc7XG4gIH1cbn1cbiJdfQ==