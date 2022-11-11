/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { take } from 'rxjs/operators';
var FormlyFieldSelect = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyFieldSelect, _super);
    function FormlyFieldSelect(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.defaultOptions = {
            templateOptions: {
                options: [],
                compareWith: /**
                 * @param {?} o1
                 * @param {?} o2
                 * @return {?}
                 */
                function (o1, o2) {
                    return o1 === o2;
                },
            },
        };
        return _this;
    }
    Object.defineProperty(FormlyFieldSelect.prototype, "selectAccessor", {
        // workaround for https://github.com/angular/angular/issues/10010
        set: 
        // workaround for https://github.com/angular/angular/issues/10010
        /**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            var _this = this;
            if (!s)
                return;
            /** @type {?} */
            var writeValue = s.writeValue.bind(s);
            if (s._getOptionId(s.value) === null) {
                writeValue(s.value);
            }
            s.writeValue = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var id = s._idCounter;
                writeValue(value);
                if (value === null) {
                    _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
                     * @return {?}
                     */
                    function () {
                        if (id !== s._idCounter && s._getOptionId(value) === null && s._elementRef.nativeElement.selectedIndex !== -1) {
                            writeValue(value);
                        }
                    }));
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    FormlyFieldSelect.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field-select',
                    template: "\n    <select *ngIf=\"to.multiple; else singleSelect\" class=\"form-control\"\n      multiple\n      [class.custom-select]=\"to.customSelect\"\n      [formControl]=\"formControl\"\n      [compareWith]=\"to.compareWith\"\n      [class.is-invalid]=\"showError\"\n      [formlyAttributes]=\"field\">\n      <ng-container *ngIf=\"to.options | formlySelectOptions:field | async as opts\">\n        <ng-container *ngIf=\"to._flatOptions else grouplist\">\n          <ng-container *ngFor=\"let opt of opts\">\n            <option [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n          </ng-container>\n        </ng-container>\n\n        <ng-template #grouplist>\n          <ng-container *ngFor=\"let opt of opts\">\n            <option *ngIf=\"!opt.group else optgroup\" [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n            <ng-template #optgroup>\n              <optgroup [label]=\"opt.label\">\n                <option *ngFor=\"let child of opt.group\" [ngValue]=\"child.value\" [disabled]=\"child.disabled\">\n                  {{ child.label }}\n                </option>\n              </optgroup>\n            </ng-template>\n          </ng-container>\n        </ng-template>\n      </ng-container>\n    </select>\n\n    <ng-template #singleSelect>\n      <select class=\"form-control\"\n        [formControl]=\"formControl\"\n        [compareWith]=\"to.compareWith\"\n        [class.custom-select]=\"to.customSelect\"\n        [class.is-invalid]=\"showError\"\n        [formlyAttributes]=\"field\">\n        <option *ngIf=\"to.placeholder\" [ngValue]=\"null\">{{ to.placeholder }}</option>\n        <ng-container *ngIf=\"to.options | formlySelectOptions:field | async as opts\">\n          <ng-container *ngIf=\"to._flatOptions else grouplist\">\n            <ng-container *ngFor=\"let opt of opts\">\n              <option [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n            </ng-container>\n          </ng-container>\n\n          <ng-template #grouplist>\n            <ng-container *ngFor=\"let opt of opts\">\n              <option *ngIf=\"!opt.group else optgroup\" [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n              <ng-template #optgroup>\n                <optgroup [label]=\"opt.label\">\n                  <option *ngFor=\"let child of opt.group\" [ngValue]=\"child.value\" [disabled]=\"child.disabled\">\n                    {{ child.label }}\n                  </option>\n                </optgroup>\n              </ng-template>\n            </ng-container>\n          </ng-template>\n        </ng-container>\n      </select>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    FormlyFieldSelect.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    FormlyFieldSelect.propDecorators = {
        selectAccessor: [{ type: ViewChild, args: [SelectControlValueAccessor,] }]
    };
    return FormlyFieldSelect;
}(FieldType));
export { FormlyFieldSelect };
if (false) {
    /** @type {?} */
    FormlyFieldSelect.prototype.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    FormlyFieldSelect.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibGliL3R5cGVzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDO0lBZ0V1Qyw2Q0FBUztJQWdDOUMsMkJBQW9CLE1BQWM7UUFBbEMsWUFDRSxpQkFBTyxTQUNSO1FBRm1CLFlBQU0sR0FBTixNQUFNLENBQVE7UUEvQmxDLG9CQUFjLEdBQUc7WUFDZixlQUFlLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsV0FBVzs7Ozs7MEJBQUMsRUFBTyxFQUFFLEVBQU87b0JBQzFCLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQzthQUNGO1NBQ0YsQ0FBQzs7SUEwQkYsQ0FBQztJQXZCRCxzQkFBMkMsNkNBQWM7UUFEekQsaUVBQWlFOzs7Ozs7O1FBQ2pFLFVBQTBELENBQU07WUFBaEUsaUJBbUJDO1lBbEJDLElBQUksQ0FBQyxDQUFDO2dCQUFFLE9BQU87O2dCQUVULFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3BDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7WUFFRCxDQUFDLENBQUMsVUFBVTs7OztZQUFHLFVBQUMsS0FBVTs7b0JBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVTtnQkFDdkIsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2xCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7b0JBQUM7d0JBQzFELElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUM3RyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ25CO29CQUNILENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFBLENBQUM7UUFDSixDQUFDOzs7T0FBQTs7Z0JBOUZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsdXBGQTREVDtpQkFDRjs7OztnQkFwRThCLE1BQU07OztpQ0FnRmxDLFNBQVMsU0FBQywwQkFBMEI7O0lBd0J2Qyx3QkFBQztDQUFBLEFBbkdELENBZ0V1QyxTQUFTLEdBbUMvQztTQW5DWSxpQkFBaUI7OztJQUM1QiwyQ0FPRTs7Ozs7SUF3QlUsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWxlY3QgKm5nSWY9XCJ0by5tdWx0aXBsZTsgZWxzZSBzaW5nbGVTZWxlY3RcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICBtdWx0aXBsZVxuICAgICAgW2NsYXNzLmN1c3RvbS1zZWxlY3RdPVwidG8uY3VzdG9tU2VsZWN0XCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICBbY29tcGFyZVdpdGhdPVwidG8uY29tcGFyZVdpdGhcIlxuICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidG8ub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnM6ZmllbGQgfCBhc3luYyBhcyBvcHRzXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0by5fZmxhdE9wdGlvbnMgZWxzZSBncm91cGxpc3RcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHQgb2Ygb3B0c1wiPlxuICAgICAgICAgICAgPG9wdGlvbiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+e3sgb3B0LmxhYmVsIH19PC9vcHRpb24+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBsaXN0PlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdCBvZiBvcHRzXCI+XG4gICAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwiIW9wdC5ncm91cCBlbHNlIG9wdGdyb3VwXCIgW25nVmFsdWVdPVwib3B0LnZhbHVlXCIgW2Rpc2FibGVkXT1cIm9wdC5kaXNhYmxlZFwiPnt7IG9wdC5sYWJlbCB9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNvcHRncm91cD5cbiAgICAgICAgICAgICAgPG9wdGdyb3VwIFtsYWJlbF09XCJvcHQubGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBvcHQuZ3JvdXBcIiBbbmdWYWx1ZV09XCJjaGlsZC52YWx1ZVwiIFtkaXNhYmxlZF09XCJjaGlsZC5kaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgICAge3sgY2hpbGQubGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9vcHRncm91cD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3NlbGVjdD5cblxuICAgIDxuZy10ZW1wbGF0ZSAjc2luZ2xlU2VsZWN0PlxuICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgIFtjb21wYXJlV2l0aF09XCJ0by5jb21wYXJlV2l0aFwiXG4gICAgICAgIFtjbGFzcy5jdXN0b20tc2VsZWN0XT1cInRvLmN1c3RvbVNlbGVjdFwiXG4gICAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCI+XG4gICAgICAgIDxvcHRpb24gKm5nSWY9XCJ0by5wbGFjZWhvbGRlclwiIFtuZ1ZhbHVlXT1cIm51bGxcIj57eyB0by5wbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidG8ub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnM6ZmllbGQgfCBhc3luYyBhcyBvcHRzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvLl9mbGF0T3B0aW9ucyBlbHNlIGdyb3VwbGlzdFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0IG9mIG9wdHNcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+e3sgb3B0LmxhYmVsIH19PC9vcHRpb24+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBsaXN0PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0IG9mIG9wdHNcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXAgZWxzZSBvcHRncm91cFwiIFtuZ1ZhbHVlXT1cIm9wdC52YWx1ZVwiIFtkaXNhYmxlZF09XCJvcHQuZGlzYWJsZWRcIj57eyBvcHQubGFiZWwgfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNvcHRncm91cD5cbiAgICAgICAgICAgICAgICA8b3B0Z3JvdXAgW2xhYmVsXT1cIm9wdC5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygb3B0Lmdyb3VwXCIgW25nVmFsdWVdPVwiY2hpbGQudmFsdWVcIiBbZGlzYWJsZWRdPVwiY2hpbGQuZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY2hpbGQubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvb3B0Z3JvdXA+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc2VsZWN0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkU2VsZWN0IGV4dGVuZHMgRmllbGRUeXBlIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgdGVtcGxhdGVPcHRpb25zOiB7XG4gICAgICBvcHRpb25zOiBbXSxcbiAgICAgIGNvbXBhcmVXaXRoKG8xOiBhbnksIG8yOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG8xID09PSBvMjtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDAxMFxuICBAVmlld0NoaWxkKFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yKSBzZXQgc2VsZWN0QWNjZXNzb3IoczogYW55KSB7XG4gICAgaWYgKCFzKSByZXR1cm47XG5cbiAgICBjb25zdCB3cml0ZVZhbHVlID0gcy53cml0ZVZhbHVlLmJpbmQocyk7XG4gICAgaWYgKHMuX2dldE9wdGlvbklkKHMudmFsdWUpID09PSBudWxsKSB7XG4gICAgICB3cml0ZVZhbHVlKHMudmFsdWUpO1xuICAgIH1cblxuICAgIHMud3JpdGVWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICBjb25zdCBpZCA9IHMuX2lkQ291bnRlcjtcbiAgICAgIHdyaXRlVmFsdWUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoaWQgIT09IHMuX2lkQ291bnRlciAmJiBzLl9nZXRPcHRpb25JZCh2YWx1ZSkgPT09IG51bGwgJiYgcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGVkSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB3cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19