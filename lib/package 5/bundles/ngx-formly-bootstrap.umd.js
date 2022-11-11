(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@ngx-formly/core'), require('@ngx-formly/core/select'), require('@ngx-formly/bootstrap/addons')) :
    typeof define === 'function' && define.amd ? define('@ngx-formly/bootstrap', ['exports', 'rxjs/operators', '@angular/core', '@angular/common', '@angular/forms', '@ngx-formly/core', '@ngx-formly/core/select', '@ngx-formly/bootstrap/addons'], factory) :
    (factory((global['ngx-formly'] = global['ngx-formly'] || {}, global['ngx-formly'].bootstrap = {}),global.rxjs.operators,global.ng.core,global.ng.common,global.ng.forms,global.core$1,global.select,global['ngx-formly'].bootstrap.addons));
}(this, (function (exports,operators,core,common,forms,core$1,select,addons) { 'use strict';

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
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
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
    var FormlyFieldCheckbox = /** @class */ (function (_super) {
        __extends(FormlyFieldCheckbox, _super);
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
            { type: core.Component, args: [{
                        selector: 'formly-field-checkbox',
                        template: "\n    <div [ngClass]=\"{\n      'form-check': to.formCheck.indexOf('custom') === -1,\n      'form-check-inline': to.formCheck === 'inline',\n      'custom-control': to.formCheck.indexOf('custom') === 0,\n      'custom-checkbox': to.formCheck === 'custom' || to.formCheck === 'custom-inline',\n      'custom-control-inline': to.formCheck === 'custom-inline',\n      'custom-switch': to.formCheck === 'custom-switch'\n    }\">\n      <input type=\"checkbox\"\n        [class.is-invalid]=\"showError\"\n        [class.form-check-input]=\"to.formCheck.indexOf('custom') === -1\"\n        [class.position-static]=\"to.formCheck === 'nolabel'\"\n        [class.custom-control-input]=\"to.formCheck.indexOf('custom') === 0\"\n        [indeterminate]=\"to.indeterminate && formControl.value === null\"\n        [formControl]=\"formControl\"\n        [formlyAttributes]=\"field\">\n      <label [for]=\"id\"\n        *ngIf=\"to.formCheck !== 'nolabel'\"\n        [class.form-check-label]=\"to.formCheck.indexOf('custom') === -1\"\n        [class.custom-control-label]=\"to.formCheck.indexOf('custom') === 0\"\n      >\n        {{ to.label }}\n        <span *ngIf=\"to.required && to.hideRequiredMarker !== true\" aria-hidden=\"true\">*</span>\n      </label>\n    </div>\n  "
                    }] }
        ];
        return FormlyFieldCheckbox;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyFieldMultiCheckbox = /** @class */ (function (_super) {
        __extends(FormlyFieldMultiCheckbox, _super);
        function FormlyFieldMultiCheckbox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultOptions = {
                templateOptions: {
                    options: [],
                    formCheck: 'custom',
                },
            };
            return _this;
        }
        /**
         * @param {?} value
         * @param {?} checked
         * @return {?}
         */
        FormlyFieldMultiCheckbox.prototype.onChange = /**
         * @param {?} value
         * @param {?} checked
         * @return {?}
         */
            function (value, checked) {
                var _a;
                this.formControl.markAsDirty();
                if (this.to.type === 'array') {
                    this.formControl.patchValue(checked
                        ? __spread((this.formControl.value || []), [value]) : __spread((this.formControl.value || [])).filter(( /**
                 * @param {?} o
                 * @return {?}
                 */function (o) { return o !== value; })));
                }
                else {
                    this.formControl.patchValue(__assign({}, this.formControl.value, (_a = {}, _a[value] = checked, _a)));
                }
                this.formControl.markAsTouched();
            };
        /**
         * @param {?} option
         * @return {?}
         */
        FormlyFieldMultiCheckbox.prototype.isChecked = /**
         * @param {?} option
         * @return {?}
         */
            function (option) {
                /** @type {?} */
                var value = this.formControl.value;
                return value && (this.to.type === 'array'
                    ? (value.indexOf(option.value) !== -1)
                    : value[option.value]);
            };
        FormlyFieldMultiCheckbox.decorators = [
            { type: core.Component, args: [{
                        selector: 'formly-field-multicheckbox',
                        template: "\n    <div>\n      <div *ngFor=\"let option of to.options | formlySelectOptions:field | async; let i = index;\"\n        [ngClass]=\"{\n          'form-check': to.formCheck.indexOf('custom') === -1,\n          'form-check-inline': to.formCheck === 'inline',\n          'custom-control': to.formCheck.indexOf('custom') === 0,\n          'custom-checkbox': to.formCheck === 'custom' || to.formCheck === 'custom-inline',\n          'custom-control-inline': to.formCheck === 'custom-inline',\n          'custom-switch': to.formCheck === 'custom-switch'\n        }\"\n      >\n        <input type=\"checkbox\"\n          [id]=\"id + '_' + i\"\n          [class.form-check-input]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-input]=\"to.formCheck.indexOf('custom') === 0\"\n          [value]=\"option.value\"\n          [checked]=\"isChecked(option)\"\n          [disabled]=\" formControl.disabled || option.disabled\"\n          [formlyAttributes]=\"field\"\n          (change)=\"onChange(option.value, $event.target.checked)\">\n        <label\n          [class.form-check-label]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-label]=\"to.formCheck.indexOf('custom') === 0\"\n          [for]=\"id + '_' + i\">\n          {{ option.label }}\n        </label>\n      </div>\n    </div>\n  "
                    }] }
        ];
        return FormlyFieldMultiCheckbox;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyFieldInput = /** @class */ (function (_super) {
        __extends(FormlyFieldInput, _super);
        function FormlyFieldInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(FormlyFieldInput.prototype, "type", {
            get: /**
             * @return {?}
             */ function () {
                return this.to.type || 'text';
            },
            enumerable: true,
            configurable: true
        });
        FormlyFieldInput.decorators = [
            { type: core.Component, args: [{
                        selector: 'formly-field-input',
                        template: "\n    <input *ngIf=\"type !== 'number' else numberTmp\" [type]=\"type\" [formControl]=\"formControl\" class=\"form-control\" [formlyAttributes]=\"field\" [class.is-invalid]=\"showError\">\n    <ng-template #numberTmp>\n      <input type=\"number\" [formControl]=\"formControl\" class=\"form-control\" [formlyAttributes]=\"field\" [class.is-invalid]=\"showError\">\n    </ng-template>\n  "
                    }] }
        ];
        return FormlyFieldInput;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyFieldRadio = /** @class */ (function (_super) {
        __extends(FormlyFieldRadio, _super);
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
            { type: core.Component, args: [{
                        selector: 'formly-field-radio',
                        template: "\n    <div>\n      <div *ngFor=\"let option of to.options | formlySelectOptions:field | async; let i = index;\"\n        [ngClass]=\"{\n          'form-check': to.formCheck.indexOf('custom') === -1,\n          'form-check-inline': to.formCheck === 'inline',\n          'custom-control custom-radio': to.formCheck.indexOf('custom') === 0,\n          'custom-control-inline': to.formCheck === 'custom-inline'\n        }\"\n      >\n        <input type=\"radio\"\n          [id]=\"id + '_' + i\"\n          [class.form-check-input]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-input]=\"to.formCheck.indexOf('custom') === 0\"\n          [name]=\"field.name || id\"\n          [class.is-invalid]=\"showError\"\n          [attr.value]=\"option.value\"\n          [value]=\"option.value\"\n          [formControl]=\"formControl\"\n          [formlyAttributes]=\"field\"\n          [attr.disabled]=\"option.disabled || formControl.disabled ? true : null\">\n        <label\n          [class.form-check-label]=\"to.formCheck.indexOf('custom') === -1\"\n          [class.custom-control-label]=\"to.formCheck.indexOf('custom') === 0\"\n          [for]=\"id + '_' + i\">\n          {{ option.label }}\n        </label>\n      </div>\n    </div>\n  "
                    }] }
        ];
        return FormlyFieldRadio;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyFieldTextArea = /** @class */ (function (_super) {
        __extends(FormlyFieldTextArea, _super);
        function FormlyFieldTextArea() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.defaultOptions = {
                templateOptions: {
                    cols: 1,
                    rows: 1,
                },
            };
            return _this;
        }
        FormlyFieldTextArea.decorators = [
            { type: core.Component, args: [{
                        selector: 'formly-field-textarea',
                        template: "\n    <textarea [formControl]=\"formControl\" [cols]=\"to.cols\"\n      [rows]=\"to.rows\" class=\"form-control\" [class.is-invalid]=\"showError\"\n      [formlyAttributes]=\"field\">\n    </textarea>\n  "
                    }] }
        ];
        return FormlyFieldTextArea;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyFieldSelect = /** @class */ (function (_super) {
        __extends(FormlyFieldSelect, _super);
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
                     */ function (o1, o2) {
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
                s.writeValue = ( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    /** @type {?} */
                    var id = s._idCounter;
                    writeValue(value);
                    if (value === null) {
                        _this.ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(( /**
                         * @return {?}
                         */function () {
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
            { type: core.Component, args: [{
                        selector: 'formly-field-select',
                        template: "\n    <select *ngIf=\"to.multiple; else singleSelect\" class=\"form-control\"\n      multiple\n      [class.custom-select]=\"to.customSelect\"\n      [formControl]=\"formControl\"\n      [compareWith]=\"to.compareWith\"\n      [class.is-invalid]=\"showError\"\n      [formlyAttributes]=\"field\">\n      <ng-container *ngIf=\"to.options | formlySelectOptions:field | async as opts\">\n        <ng-container *ngIf=\"to._flatOptions else grouplist\">\n          <ng-container *ngFor=\"let opt of opts\">\n            <option [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n          </ng-container>\n        </ng-container>\n\n        <ng-template #grouplist>\n          <ng-container *ngFor=\"let opt of opts\">\n            <option *ngIf=\"!opt.group else optgroup\" [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n            <ng-template #optgroup>\n              <optgroup [label]=\"opt.label\">\n                <option *ngFor=\"let child of opt.group\" [ngValue]=\"child.value\" [disabled]=\"child.disabled\">\n                  {{ child.label }}\n                </option>\n              </optgroup>\n            </ng-template>\n          </ng-container>\n        </ng-template>\n      </ng-container>\n    </select>\n\n    <ng-template #singleSelect>\n      <select class=\"form-control\"\n        [formControl]=\"formControl\"\n        [compareWith]=\"to.compareWith\"\n        [class.custom-select]=\"to.customSelect\"\n        [class.is-invalid]=\"showError\"\n        [formlyAttributes]=\"field\">\n        <option *ngIf=\"to.placeholder\" [ngValue]=\"null\">{{ to.placeholder }}</option>\n        <ng-container *ngIf=\"to.options | formlySelectOptions:field | async as opts\">\n          <ng-container *ngIf=\"to._flatOptions else grouplist\">\n            <ng-container *ngFor=\"let opt of opts\">\n              <option [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n            </ng-container>\n          </ng-container>\n\n          <ng-template #grouplist>\n            <ng-container *ngFor=\"let opt of opts\">\n              <option *ngIf=\"!opt.group else optgroup\" [ngValue]=\"opt.value\" [disabled]=\"opt.disabled\">{{ opt.label }}</option>\n              <ng-template #optgroup>\n                <optgroup [label]=\"opt.label\">\n                  <option *ngFor=\"let child of opt.group\" [ngValue]=\"child.value\" [disabled]=\"child.disabled\">\n                    {{ child.label }}\n                  </option>\n                </optgroup>\n              </ng-template>\n            </ng-container>\n          </ng-template>\n        </ng-container>\n      </select>\n    </ng-template>\n  "
                    }] }
        ];
        /** @nocollapse */
        FormlyFieldSelect.ctorParameters = function () {
            return [
                { type: core.NgZone }
            ];
        };
        FormlyFieldSelect.propDecorators = {
            selectAccessor: [{ type: core.ViewChild, args: [forms.SelectControlValueAccessor,] }]
        };
        return FormlyFieldSelect;
    }(core$1.FieldType));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyWrapperFormField = /** @class */ (function (_super) {
        __extends(FormlyWrapperFormField, _super);
        function FormlyWrapperFormField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormlyWrapperFormField.decorators = [
            { type: core.Component, args: [{
                        selector: 'formly-wrapper-form-field',
                        template: "\n    <div class=\"form-group\" [class.has-error]=\"showError\">\n      <label *ngIf=\"to.label && to.hideLabel !== true\" [attr.for]=\"id\">\n        {{ to.label }}\n        <span *ngIf=\"to.required && to.hideRequiredMarker !== true\" aria-hidden=\"true\">*</span>\n      </label>\n\n      <ng-template #fieldComponent></ng-template>\n\n      <div *ngIf=\"showError\" class=\"invalid-feedback\" [style.display]=\"'block'\">\n        <formly-validation-message [field]=\"field\"></formly-validation-message>\n      </div>\n\n      <small *ngIf=\"to.description\" class=\"form-text text-muted\">{{ to.description }}</small>\n    </div>\n  "
                    }] }
        ];
        return FormlyWrapperFormField;
    }(core$1.FieldWrapper));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FIELD_TYPE_COMPONENTS = [
        // types
        FormlyFieldInput,
        FormlyFieldCheckbox,
        FormlyFieldRadio,
        FormlyFieldSelect,
        FormlyFieldTextArea,
        FormlyFieldMultiCheckbox,
        // wrappers
        FormlyWrapperFormField,
    ];
    /** @type {?} */
    var BOOTSTRAP_FORMLY_CONFIG = {
        types: [
            {
                name: 'input',
                component: FormlyFieldInput,
                wrappers: ['form-field'],
            },
            {
                name: 'checkbox',
                component: FormlyFieldCheckbox,
                wrappers: ['form-field'],
            },
            {
                name: 'radio',
                component: FormlyFieldRadio,
                wrappers: ['form-field'],
            },
            {
                name: 'select',
                component: FormlyFieldSelect,
                wrappers: ['form-field'],
            },
            {
                name: 'textarea',
                component: FormlyFieldTextArea,
                wrappers: ['form-field'],
            },
            {
                name: 'multicheckbox',
                component: FormlyFieldMultiCheckbox,
                wrappers: ['form-field'],
            },
        ],
        wrappers: [
            { name: 'form-field', component: FormlyWrapperFormField },
        ],
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormlyBootstrapModule = /** @class */ (function () {
        function FormlyBootstrapModule() {
        }
        FormlyBootstrapModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            FIELD_TYPE_COMPONENTS,
                        ],
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule,
                            select.FormlySelectModule,
                            core$1.FormlyModule.forChild(BOOTSTRAP_FORMLY_CONFIG),
                            addons.FormlyBootstrapAddonsModule,
                        ],
                    },] }
        ];
        return FormlyBootstrapModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.FormlyBootstrapModule = FormlyBootstrapModule;
    exports.FormlyFieldCheckbox = FormlyFieldCheckbox;
    exports.FormlyFieldMultiCheckbox = FormlyFieldMultiCheckbox;
    exports.FormlyFieldInput = FormlyFieldInput;
    exports.FormlyFieldRadio = FormlyFieldRadio;
    exports.FormlyFieldTextArea = FormlyFieldTextArea;
    exports.FormlyFieldSelect = FormlyFieldSelect;
    exports.FormlyWrapperFormField = FormlyWrapperFormField;
    exports.ɵb = BOOTSTRAP_FORMLY_CONFIG;
    exports.ɵa = FIELD_TYPE_COMPONENTS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-formly-bootstrap.umd.js.map