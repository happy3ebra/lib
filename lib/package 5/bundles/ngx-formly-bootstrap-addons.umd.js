(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/forms'), require('@angular/core'), require('@ngx-formly/core')) :
    typeof define === 'function' && define.amd ? define('@ngx-formly/bootstrap/addons', ['exports', '@angular/common', '@angular/forms', '@angular/core', '@ngx-formly/core'], factory) :
    (factory((global['ngx-formly'] = global['ngx-formly'] || {}, global['ngx-formly'].bootstrap = global['ngx-formly'].bootstrap || {}, global['ngx-formly'].bootstrap.addons = {}),global.ng.common,global.ng.forms,global.ng.core,global.core$1));
}(this, (function (exports,common,forms,core,core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyWrapperAddons = /** @class */ (function (_super) {
        __extends(FormlyWrapperAddons, _super);
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
            { type: core.Component, args: [{
                        selector: 'formly-wrapper-addons',
                        template: "<div class=\"input-group\">\n  <div class=\"input-group-prepend\" *ngIf=\"to.addonLeft\" [ngStyle]=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonLeftClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonLeft.class\" *ngIf=\"to.addonLeft.class\"></i>\n    <span *ngIf=\"to.addonLeft.text\" class=\"input-group-text\">{{ to.addonLeft.text }}</span>\n  </div>\n  <div class=\"input-addons\">\n    <ng-container #fieldComponent></ng-container>\n  </div>\n  <div class=\"input-group-append\" *ngIf=\"to.addonRight\" [ngStyle]=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n    (click)=\"addonRightClick($event)\">\n    <i class=\"input-group-text\" [ngClass]=\"to.addonRight.class\" *ngIf=\"to.addonRight.class\"></i>\n    <span *ngIf=\"to.addonRight.text\" class=\"input-group-text\">{{ to.addonRight.text }}</span>\n  </div>\n</div>\n",
                        styles: [":host ::ng-deep .input-group>:not(:first-child) .form-control{border-top-left-radius:0;border-bottom-left-radius:0}:host ::ng-deep .input-group>:not(:last-child) .form-control{border-top-right-radius:0;border-bottom-right-radius:0}:host ::ng-deep .input-group>.input-addons{position:relative;flex:1 1 auto;width:1%;margin-bottom:0}"]
                    }] }
        ];
        return FormlyWrapperAddons;
    }(core$1.FieldWrapper));

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
            field.wrappers = __spread((field.wrappers || []), ['addons']);
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyBootstrapAddonsModule = /** @class */ (function () {
        function FormlyBootstrapAddonsModule() {
        }
        FormlyBootstrapAddonsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [FormlyWrapperAddons],
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            core$1.FormlyModule.forChild({
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
        return FormlyBootstrapAddonsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.FormlyBootstrapAddonsModule = FormlyBootstrapAddonsModule;
    exports.ɵb = addonsExtension;
    exports.ɵa = FormlyWrapperAddons;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-formly-bootstrap-addons.umd.js.map