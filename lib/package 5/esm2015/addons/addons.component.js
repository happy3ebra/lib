/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
export class FormlyWrapperAddons extends FieldWrapper {
    /**
     * @param {?} $event
     * @return {?}
     */
    addonRightClick($event) {
        if (this.to.addonRight.onClick) {
            this.to.addonRight.onClick(this.to, this, $event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    addonLeftClick($event) {
        if (this.to.addonLeft.onClick) {
            this.to.addonLeft.onClick(this.to, this, $event);
        }
    }
}
FormlyWrapperAddons.decorators = [
    { type: Component, args: [{
                selector: 'formly-wrapper-addons',
                template: "<div class=\"input-group\">\n  <div class=\"input-group-prepend\" *ngIf=\"to.addonLeft\" [ngStyle]=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonLeftClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonLeft.class\" *ngIf=\"to.addonLeft.class\"></i>\n    <span *ngIf=\"to.addonLeft.text\" class=\"input-group-text\">{{ to.addonLeft.text }}</span>\n  </div>\n  <div class=\"input-addons\">\n    <ng-container #fieldComponent></ng-container>\n  </div>\n  <div class=\"input-group-append\" *ngIf=\"to.addonRight\" [ngStyle]=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonRightClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonRight.class\" *ngIf=\"to.addonRight.class\"></i>\n    <span *ngIf=\"to.addonRight.text\" class=\"input-group-text\">{{ to.addonRight.text }}</span>\n  </div>\n</div>\n",
                styles: [":host ::ng-deep .input-group>:not(:first-child) .form-control{border-top-left-radius:0;border-bottom-left-radius:0}:host ::ng-deep .input-group>:not(:last-child) .form-control{border-top-right-radius:0;border-bottom-right-radius:0}:host ::ng-deep .input-group>.input-addons{position:relative;flex:1 1 auto;width:1%;margin-bottom:0}"]
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9hZGRvbnMvIiwic291cmNlcyI6WyJhZGRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9oRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsWUFBWTs7Ozs7SUFDbkQsZUFBZSxDQUFDLE1BQVc7UUFDekIsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN4QixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDQ0QkFBc0M7O2FBRXZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXdyYXBwZXItYWRkb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZG9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FkZG9ucy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlXcmFwcGVyQWRkb25zIGV4dGVuZHMgRmllbGRXcmFwcGVyIHtcbiAgYWRkb25SaWdodENsaWNrKCRldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMudG8uYWRkb25SaWdodC5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnRvLmFkZG9uUmlnaHQub25DbGljayh0aGlzLnRvLCB0aGlzLCAkZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZG9uTGVmdENsaWNrKCRldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMudG8uYWRkb25MZWZ0Lm9uQ2xpY2spIHtcbiAgICAgIHRoaXMudG8uYWRkb25MZWZ0Lm9uQ2xpY2sodGhpcy50bywgdGhpcywgJGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==