import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyWrapperAddons extends FieldWrapper {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function addonsExtension(field) {
    if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
        return;
    }
    if (field.templateOptions.addonLeft || field.templateOptions.addonRight) {
        field.wrappers = [...(field.wrappers || []), 'addons'];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyBootstrapAddonsModule {
}
FormlyBootstrapAddonsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FormlyWrapperAddons],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormlyModule.forChild({
                        wrappers: [
                            { name: 'addons', component: FormlyWrapperAddons },
                        ],
                        extensions: [
                            { name: 'addons', extension: { postPopulate: addonsExtension } },
                        ],
                    }),
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FormlyBootstrapAddonsModule, addonsExtension as ɵb, FormlyWrapperAddons as ɵa };

//# sourceMappingURL=ngx-formly-bootstrap-addons.js.map