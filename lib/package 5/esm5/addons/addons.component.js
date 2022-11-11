/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
var FormlyWrapperAddons = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyWrapperAddons, _super);
    function FormlyWrapperAddons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyWrapperAddons.prototype.addonRightClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.to.addonRight.onClick) {
            this.to.addonRight.onClick(this.to, this, $event);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyWrapperAddons.prototype.addonLeftClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.to.addonLeft.onClick) {
            this.to.addonLeft.onClick(this.to, this, $event);
        }
    };
    FormlyWrapperAddons.decorators = [
        { type: Component, args: [{
                    selector: 'formly-wrapper-addons',
                    template: "<div class=\"input-group\">\n  <div class=\"input-group-prepend\" *ngIf=\"to.addonLeft\" [ngStyle]=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonLeftClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonLeft.class\" *ngIf=\"to.addonLeft.class\"></i>\n    <span *ngIf=\"to.addonLeft.text\" class=\"input-group-text\">{{ to.addonLeft.text }}</span>\n  </div>\n  <div class=\"input-addons\">\n    <ng-container #fieldComponent></ng-container>\n  </div>\n  <div class=\"input-group-append\" *ngIf=\"to.addonRight\" [ngStyle]=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonRightClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonRight.class\" *ngIf=\"to.addonRight.class\"></i>\n    <span *ngIf=\"to.addonRight.text\" class=\"input-group-text\">{{ to.addonRight.text }}</span>\n  </div>\n</div>\n",
                    styles: [":host ::ng-deep .input-group>:not(:first-child) .form-control{border-top-left-radius:0;border-bottom-left-radius:0}:host ::ng-deep .input-group>:not(:last-child) .form-control{border-top-right-radius:0;border-bottom-right-radius:0}:host ::ng-deep .input-group>.input-addons{position:relative;flex:1 1 auto;width:1%;margin-bottom:0}"]
                }] }
    ];
    return FormlyWrapperAddons;
}(FieldWrapper));
export { FormlyWrapperAddons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9hZGRvbnMvIiwic291cmNlcyI6WyJhZGRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQ7SUFLeUMsK0NBQVk7SUFMckQ7O0lBaUJBLENBQUM7Ozs7O0lBWEMsNkNBQWU7Ozs7SUFBZixVQUFnQixNQUFXO1FBQ3pCLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7Ozs7O0lBRUQsNENBQWM7Ozs7SUFBZCxVQUFlLE1BQVc7UUFDeEIsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyw0NEJBQXNDOztpQkFFdkM7O0lBYUQsMEJBQUM7Q0FBQSxBQWpCRCxDQUt5QyxZQUFZLEdBWXBEO1NBWlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXdyYXBwZXItYWRkb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZG9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FkZG9ucy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlXcmFwcGVyQWRkb25zIGV4dGVuZHMgRmllbGRXcmFwcGVyIHtcbiAgYWRkb25SaWdodENsaWNrKCRldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMudG8uYWRkb25SaWdodC5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnRvLmFkZG9uUmlnaHQub25DbGljayh0aGlzLnRvLCB0aGlzLCAkZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZG9uTGVmdENsaWNrKCRldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMudG8uYWRkb25MZWZ0Lm9uQ2xpY2spIHtcbiAgICAgIHRoaXMudG8uYWRkb25MZWZ0Lm9uQ2xpY2sodGhpcy50bywgdGhpcywgJGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==