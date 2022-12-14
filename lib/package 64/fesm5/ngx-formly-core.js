import { DOCUMENT, CommonModule } from '@angular/common';
import { TemplateRef, Injectable, InjectionToken, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Inject, Optional, Component, Input, ChangeDetectionStrategy, ComponentFactoryResolver, Injector, ChangeDetectorRef, Directive, EventEmitter, NgZone, Attribute, Output, ViewChild, Renderer2, ElementRef, ViewContainerRef, defineInjectable, inject, INJECTOR } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, switchMap, distinctUntilChanged, take, startWith, filter, map } from 'rxjs/operators';
import { AbstractControl, FormArray, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { isObservable, Subject, of, merge, Observable } from 'rxjs';
import { __extends, __assign, __spread, __rest, __read, __values } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} form
 * @param {?} callback
 * @return {?}
 */
function disableTreeValidityCall(form, callback) {
    /** @type {?} */
    var _updateTreeValidity = form._updateTreeValidity.bind(form);
    form._updateTreeValidity = (/**
     * @return {?}
     */
    function () { });
    callback();
    form._updateTreeValidity = _updateTreeValidity;
}
/**
 * @param {?} formId
 * @param {?} field
 * @param {?} index
 * @return {?}
 */
function getFieldId(formId, field, index) {
    if (field.id)
        return field.id;
    /** @type {?} */
    var type = field.type;
    if (!type && field.template) {
        type = 'template';
    }
    if (isFunction(type)) {
        type = ((/** @type {?} */ (type))).prototype.constructor.name;
    }
    return [formId, type, field.key, index].join('_');
}
/**
 * @param {?} field
 * @return {?}
 */
function getKeyPath(field) {
    if (!field.key) {
        return [];
    }
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!field._keyPath || field._keyPath.key !== field.key) {
        /** @type {?} */
        var path = [];
        if (typeof field.key === 'string') {
            /** @type {?} */
            var key = field.key.indexOf('[') === -1
                ? field.key
                : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = ["" + field.key];
        }
        field._keyPath = { key: field.key, path: path };
    }
    return field._keyPath.path.slice(0);
}
/** @type {?} */
var FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
/**
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
function assignFieldValue(field, value) {
    /** @type {?} */
    var paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    /** @type {?} */
    var root = field;
    while (root.parent) {
        root = root.parent;
        paths = __spread(getKeyPath(root), paths);
    }
    if (value === undefined && field.resetOnHide) {
        /** @type {?} */
        var k = paths.pop();
        /** @type {?} */
        var m = paths.reduce((/**
         * @param {?} model
         * @param {?} path
         * @return {?}
         */
        function (model, path) { return model[path] || {}; }), root.model);
        delete m[k];
        return;
    }
    assignModelValue(root.model, paths, value);
}
/**
 * @param {?} model
 * @param {?} paths
 * @param {?} value
 * @return {?}
 */
function assignModelValue(model, paths, value) {
    for (var i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        var path = paths[i];
        if (!model[path] || !isObject(model[path])) {
            model[path] = /^\d+$/.test(paths[i + 1]) ? [] : {};
        }
        model = model[path];
    }
    model[paths[paths.length - 1]] = clone(value);
}
/**
 * @param {?} field
 * @return {?}
 */
function getFieldValue(field) {
    var e_1, _a;
    /** @type {?} */
    var model = field.parent.model;
    try {
        for (var _b = __values(getKeyPath(field)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var path = _c.value;
            if (!model) {
                return model;
            }
            model = model[path];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return model;
}
/**
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
function reverseDeepMerge(dest) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.forEach((/**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        for (var srcArg in src) {
            if (isNullOrUndefined(dest[srcArg]) || isBlankString(dest[srcArg])) {
                dest[srcArg] = clone(src[srcArg]);
            }
            else if (objAndSameType(dest[srcArg], src[srcArg])) {
                reverseDeepMerge(dest[srcArg], src[srcArg]);
            }
        }
    }));
    return dest;
}
/**
 * @param {?} value
 * @return {?}
 */
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
/**
 * @param {?} value
 * @return {?}
 */
function isUndefined(value) {
    return value === undefined;
}
/**
 * @param {?} value
 * @return {?}
 */
function isBlankString(value) {
    return value === '';
}
/**
 * @param {?} value
 * @return {?}
 */
function isFunction(value) {
    return typeof (value) === 'function';
}
/**
 * @param {?} obj1
 * @param {?} obj2
 * @return {?}
 */
function objAndSameType(obj1, obj2) {
    return isObject(obj1) && isObject(obj2)
        && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)
        && !(Array.isArray(obj1) || Array.isArray(obj2));
}
/**
 * @param {?} x
 * @return {?}
 */
function isObject(x) {
    return x != null && typeof x === 'object';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
/**
 * @param {?} value
 * @return {?}
 */
function clone(value) {
    if (!isObject(value)
        || isObservable(value)
        || (value instanceof TemplateRef)
        || /* instanceof SafeHtmlImpl */ value.changingThisBreaksApplicationSecurity
        || ['RegExp', 'FileList', 'File', 'Blob'].indexOf(value.constructor.name) !== -1) {
        return value;
    }
    if (value instanceof Set) {
        return new Set(value);
    }
    if (value instanceof Map) {
        return new Map(value);
    }
    // https://github.com/moment/moment/blob/master/moment.js#L252
    if (value._isAMomentObject && isFunction(value.clone)) {
        return value.clone();
    }
    if (value instanceof AbstractControl) {
        return null;
    }
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
        return value.slice(0).map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return clone(v); }));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    /** @type {?} */
    var proto = Object.getPrototypeOf(value);
    /** @type {?} */
    var c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((/**
     * @param {?} newVal
     * @param {?} prop
     * @return {?}
     */
    function (newVal, prop) {
        /** @type {?} */
        var propDesc = Object.getOwnPropertyDescriptor(value, prop);
        if (propDesc.get) {
            Object.defineProperty(newVal, prop, propDesc);
        }
        else {
            newVal[prop] = clone(value[prop]);
        }
        return newVal;
    }), c);
}
/**
 * @param {?} field
 * @param {?} prop
 * @param {?} defaultValue
 * @return {?}
 */
function defineHiddenProp(field, prop, defaultValue) {
    Object.defineProperty(field, prop, { enumerable: false, writable: true, configurable: true });
    field[prop] = defaultValue;
}
/**
 * @template T
 * @param {?} o
 * @param {?} prop
 * @param {?} setFn
 * @return {?}
 */
function wrapProperty(o, prop, setFn) {
    if (!o._observers) {
        defineHiddenProp(o, '_observers', {});
    }
    if (!o._observers[prop]) {
        o._observers[prop] = [];
    }
    /** @type {?} */
    var fns = o._observers[prop];
    if (fns.indexOf(setFn) === -1) {
        fns.push(setFn);
        setFn({ currentValue: o[prop], firstChange: true });
        if (fns.length === 1) {
            defineHiddenProp(o, "___$" + prop, o[prop]);
            Object.defineProperty(o, prop, {
                configurable: true,
                get: (/**
                 * @return {?}
                 */
                function () { return o["___$" + prop]; }),
                set: (/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                function (currentValue) {
                    if (currentValue !== o["___$" + prop]) {
                        /** @type {?} */
                        var previousValue_1 = o["___$" + prop];
                        o["___$" + prop] = currentValue;
                        fns.forEach((/**
                         * @param {?} changeFn
                         * @return {?}
                         */
                        function (changeFn) { return changeFn({ previousValue: previousValue_1, currentValue: currentValue, firstChange: false }); }));
                    }
                }),
            });
        }
    }
    return (/**
     * @return {?}
     */
    function () { return fns.splice(fns.indexOf(setFn), 1); });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
/**
 * Maintains list of formly field directive types. This can be used to register new field templates.
 */
var FormlyConfig = /** @class */ (function () {
    function FormlyConfig() {
        this.types = {};
        this.validators = {};
        this.wrappers = {};
        this.messages = {};
        this.templateManipulators = {
            preWrapper: [],
            postWrapper: [],
        };
        this.extras = {
            checkExpressionOn: 'changeDetectionCheck',
            lazyRender: false,
            showError: (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                return field.formControl && field.formControl.invalid && (field.formControl.touched || (field.options.parentForm && field.options.parentForm.submitted) || !!(field.field.validation && field.field.validation.show));
            }),
        };
        this.extensions = {};
    }
    /**
     * @param {?} config
     * @return {?}
     */
    FormlyConfig.prototype.addConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        if (config.types) {
            config.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            function (type) { return _this.setType(type); }));
        }
        if (config.validators) {
            config.validators.forEach((/**
             * @param {?} validator
             * @return {?}
             */
            function (validator) { return _this.setValidator(validator); }));
        }
        if (config.wrappers) {
            config.wrappers.forEach((/**
             * @param {?} wrapper
             * @return {?}
             */
            function (wrapper) { return _this.setWrapper(wrapper); }));
        }
        if (config.manipulators) {
            console.warn("NgxFormly: passing 'manipulators' config is deprecated, use custom extension instead.");
            config.manipulators.forEach((/**
             * @param {?} manipulator
             * @return {?}
             */
            function (manipulator) { return _this.setManipulator(manipulator); }));
        }
        if (config.validationMessages) {
            config.validationMessages.forEach((/**
             * @param {?} validation
             * @return {?}
             */
            function (validation) { return _this.addValidatorMessage(validation.name, validation.message); }));
        }
        if (config.extensions) {
            config.extensions.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.extensions[c.name] = c.extension; }));
        }
        if (config.extras) {
            this.extras = __assign({}, this.extras, config.extras);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormlyConfig.prototype.setType = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return _this.setType(option); }));
        }
        else {
            if (!this.types[options.name]) {
                this.types[options.name] = (/** @type {?} */ ({ name: options.name }));
            }
            ['component', 'extends', 'defaultOptions', 'wrappers'].forEach((/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) {
                if (options.hasOwnProperty(prop)) {
                    _this.types[options.name][prop] = options[prop];
                }
            }));
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.getType = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!this.types[name]) {
            throw new Error("[Formly Error] The type \"" + name + "\" could not be found. Please make sure that is registered through the FormlyModule declaration.");
        }
        this.mergeExtendedType(name);
        return this.types[name];
    };
    /**
     * @param {?=} field
     * @return {?}
     */
    FormlyConfig.prototype.getMergedField = /**
     * @param {?=} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field === void 0) { field = {}; }
        /** @type {?} */
        var type = this.getType(field.type);
        if (type.defaultOptions) {
            reverseDeepMerge(field, type.defaultOptions);
        }
        /** @type {?} */
        var extendDefaults = type.extends && this.getType(type.extends).defaultOptions;
        if (extendDefaults) {
            reverseDeepMerge(field, extendDefaults);
        }
        if (field && field.optionsTypes) {
            field.optionsTypes.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                /** @type {?} */
                var defaultOptions = _this.getType(option).defaultOptions;
                if (defaultOptions) {
                    reverseDeepMerge(field, defaultOptions);
                }
            }));
        }
        /** @type {?} */
        var componentRef = this.resolveFieldTypeRef(field);
        if (componentRef && componentRef.instance && componentRef.instance.defaultOptions) {
            reverseDeepMerge(field, componentRef.instance.defaultOptions);
        }
        if (!field.wrappers && type.wrappers) {
            field.wrappers = __spread(type.wrappers);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?=} field
     * @return {?}
     */
    FormlyConfig.prototype.resolveFieldTypeRef = /**
     * \@internal
     * @param {?=} field
     * @return {?}
     */
    function (field) {
        if (field === void 0) { field = {}; }
        if (!field.type) {
            return null;
        }
        /** @type {?} */
        var type = this.getType(field.type);
        if (!type.component || type['_componentRef']) {
            return type['_componentRef'];
        }
        var _a = field.parent.options, _resolver = _a._resolver, _injector = _a._injector;
        /** @type {?} */
        var componentRef = _resolver
            .resolveComponentFactory(type.component)
            .create(_injector);
        defineHiddenProp(type, '_componentRef', componentRef);
        componentRef.destroy();
        return type['_componentRef'];
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormlyConfig.prototype.setWrapper = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        this.wrappers[options.name] = options;
        if (options.types) {
            options.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            function (type) {
                _this.setTypeWrapper(type, options.name);
            }));
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.getWrapper = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!this.wrappers[name]) {
            throw new Error("[Formly Error] The wrapper \"" + name + "\" could not be found. Please make sure that is registered through the FormlyModule declaration.");
        }
        return this.wrappers[name];
    };
    /**
     * @param {?} type
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.setTypeWrapper = /**
     * @param {?} type
     * @param {?} name
     * @return {?}
     */
    function (type, name) {
        if (!this.types[type]) {
            this.types[type] = (/** @type {?} */ ({}));
        }
        if (!this.types[type].wrappers) {
            this.types[type].wrappers = [];
        }
        if (this.types[type].wrappers.indexOf(name) === -1) {
            this.types[type].wrappers.push(name);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormlyConfig.prototype.setValidator = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.validators[options.name] = options;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.getValidator = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!this.validators[name]) {
            throw new Error("[Formly Error] The validator \"" + name + "\" could not be found. Please make sure that is registered through the FormlyModule declaration.");
        }
        return this.validators[name];
    };
    /**
     * @param {?} name
     * @param {?} message
     * @return {?}
     */
    FormlyConfig.prototype.addValidatorMessage = /**
     * @param {?} name
     * @param {?} message
     * @return {?}
     */
    function (name, message) {
        this.messages[name] = message;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.getValidatorMessage = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.messages[name];
    };
    /**
     * @param {?} manipulator
     * @return {?}
     */
    FormlyConfig.prototype.setManipulator = /**
     * @param {?} manipulator
     * @return {?}
     */
    function (manipulator) {
        new manipulator.class()[manipulator.method](this);
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    FormlyConfig.prototype.mergeExtendedType = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!this.types[name].extends) {
            return;
        }
        /** @type {?} */
        var extendedType = this.getType(this.types[name].extends);
        if (!this.types[name].component) {
            this.types[name].component = extendedType.component;
        }
        if (!this.types[name].wrappers) {
            this.types[name].wrappers = extendedType.wrappers;
        }
    };
    FormlyConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ FormlyConfig.ngInjectableDef = defineInjectable({ factory: function FormlyConfig_Factory() { return new FormlyConfig(); }, token: FormlyConfig, providedIn: "root" });
    return FormlyConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyFormBuilder = /** @class */ (function () {
    function FormlyFormBuilder(formlyConfig, componentFactoryResolver, injector) {
        this.formlyConfig = formlyConfig;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * @param {?} formControl
     * @param {?=} fieldGroup
     * @param {?=} model
     * @param {?=} options
     * @return {?}
     */
    FormlyFormBuilder.prototype.buildForm = /**
     * @param {?} formControl
     * @param {?=} fieldGroup
     * @param {?=} model
     * @param {?=} options
     * @return {?}
     */
    function (formControl, fieldGroup, model, options) {
        var _this = this;
        if (fieldGroup === void 0) { fieldGroup = []; }
        if (!this.formlyConfig.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        /** @type {?} */
        var field = { fieldGroup: fieldGroup, model: model, formControl: formControl, options: this._setOptions(options) };
        disableTreeValidityCall(formControl, (/**
         * @return {?}
         */
        function () {
            _this._buildForm(field);
            field.options._checkField(field, true);
        }));
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyFormBuilder.prototype._buildForm = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.prePopulate && extension.prePopulate(field); }));
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.onPopulate && extension.onPopulate(field); }));
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this._buildForm(f); }));
        }
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.postPopulate && extension.postPopulate(field); }));
    };
    /**
     * @private
     * @return {?}
     */
    FormlyFormBuilder.prototype.getExtensions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return Object.keys(this.formlyConfig.extensions).map((/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return _this.formlyConfig.extensions[name]; }));
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    FormlyFormBuilder.prototype._setOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        options = options || {};
        options.formState = options.formState || {};
        if (!options.showError) {
            options.showError = this.formlyConfig.extras.showError;
        }
        if (!options.fieldChanges) {
            defineHiddenProp(options, 'fieldChanges', new Subject());
        }
        if (!options._resolver) {
            defineHiddenProp(options, '_resolver', this.componentFactoryResolver);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options._hiddenFieldsForCheck) {
            options._hiddenFieldsForCheck = [];
        }
        if (!options._markForCheck) {
            options._markForCheck = (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                if (field._componentRefs) {
                    field._componentRefs.forEach((/**
                     * @param {?} ref
                     * @return {?}
                     */
                    function (ref) {
                        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                        /** @type {?} */
                        var changeDetectorRef = ref.injector.get(ChangeDetectorRef);
                        changeDetectorRef.markForCheck();
                    }));
                }
                if (field.fieldGroup) {
                    field.fieldGroup.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return options._markForCheck(f); }));
                }
            });
        }
        if (!options._buildField) {
            options._buildField = (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                _this._setOptions(field.options);
                _this._buildForm(field);
                ((/** @type {?} */ (field.options)))._checkField(field, true);
                return field;
            });
        }
        return options;
    };
    FormlyFormBuilder.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    FormlyFormBuilder.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    /** @nocollapse */ FormlyFormBuilder.ngInjectableDef = defineInjectable({ factory: function FormlyFormBuilder_Factory() { return new FormlyFormBuilder(inject(FormlyConfig), inject(ComponentFactoryResolver), inject(INJECTOR)); }, token: FormlyFormBuilder, providedIn: "root" });
    return FormlyFormBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @param {?=} emitEvent
 * @return {?}
 */
function unregisterControl(field, emitEvent) {
    if (emitEvent === void 0) { emitEvent = false; }
    /** @type {?} */
    var control = field.formControl;
    /** @type {?} */
    var fieldIndex = control['_fields'] ? control['_fields'].indexOf(field) : -1;
    if (fieldIndex !== -1) {
        control['_fields'].splice(fieldIndex, 1);
    }
    /** @type {?} */
    var form = (/** @type {?} */ (control.parent));
    if (!form) {
        return;
    }
    /** @type {?} */
    var opts = { emitEvent: emitEvent };
    if (form instanceof FormArray) {
        /** @type {?} */
        var key_1 = form.controls.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c === control; }));
        if (key_1 !== -1) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            function () { return form.removeAt(key_1); }));
        }
    }
    else if (form instanceof FormGroup) {
        /** @type {?} */
        var paths = getKeyPath(field);
        /** @type {?} */
        var key_2 = paths[paths.length - 1];
        if (form.get([key_2]) === control) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            function () { return form.removeControl(key_2); }));
        }
    }
    control.setParent(null);
}
/**
 * @param {?} field
 * @return {?}
 */
function findControl(field) {
    if (field.formControl) {
        return field.formControl;
    }
    if (field['shareFormControl'] === false) {
        return null;
    }
    /** @type {?} */
    var form = (/** @type {?} */ (field.parent.formControl));
    return form ? form.get(getKeyPath(field)) : null;
}
/**
 * @param {?} field
 * @param {?=} control
 * @param {?=} emitEvent
 * @return {?}
 */
function registerControl(field, control, emitEvent) {
    if (emitEvent === void 0) { emitEvent = false; }
    control = control || field.formControl;
    if (!control['_fields']) {
        defineHiddenProp(control, '_fields', []);
    }
    if (control['_fields'].indexOf(field) === -1) {
        control['_fields'].push(field);
    }
    if (!field.formControl && control) {
        defineHiddenProp(field, 'formControl', control);
        control.setValidators(null);
        control.setAsyncValidators(null);
        field.templateOptions.disabled = !!field.templateOptions.disabled;
        wrapProperty(field.templateOptions, 'disabled', (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var firstChange = _a.firstChange, currentValue = _a.currentValue;
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        }));
        if (control.registerOnDisabledChange) {
            control.registerOnDisabledChange((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                field.templateOptions['___$disabled'] = value;
                // TODO remove in V6
                field.options && field.options._markForCheck(field);
            }));
        }
    }
    /** @type {?} */
    var parent = (/** @type {?} */ (field.parent.formControl));
    if (!parent || !field.key) {
        return;
    }
    /** @type {?} */
    var paths = getKeyPath(field);
    /** @type {?} */
    var value = getFieldValue(field);
    if (!(isNullOrUndefined(control.value) && isNullOrUndefined(value))
        && control.value !== value
        && control instanceof FormControl) {
        control.patchValue(value);
    }
    var _loop_1 = function (i) {
        /** @type {?} */
        var path = paths[i];
        if (!parent.get([path])) {
            updateControl(parent, { emitEvent: emitEvent }, (/**
             * @return {?}
             */
            function () { return parent.setControl(path, new FormGroup({})); }));
        }
        parent = (/** @type {?} */ (parent.get([path])));
    };
    for (var i = 0; i < (paths.length - 1); i++) {
        _loop_1(i);
    }
    /** @type {?} */
    var key = paths[paths.length - 1];
    if (!field._hide && parent.get([key]) !== control) {
        updateControl(parent, { emitEvent: emitEvent }, (/**
         * @return {?}
         */
        function () { return parent.setControl(key, control); }));
    }
}
/**
 * @param {?} c
 * @param {?=} onlySelf
 * @return {?}
 */
function updateValidity(c, onlySelf) {
    if (onlySelf === void 0) { onlySelf = false; }
    /** @type {?} */
    var status = c.status;
    /** @type {?} */
    var value = c.value;
    c.updateValueAndValidity({ emitEvent: false, onlySelf: onlySelf });
    if (status !== c.status) {
        ((/** @type {?} */ (c.statusChanges))).emit(c.status);
    }
    if (value !== c.value) {
        ((/** @type {?} */ (c.valueChanges))).emit(c.value);
    }
}
/**
 * @param {?} form
 * @param {?} opts
 * @param {?} action
 * @return {?}
 */
function updateControl(form, opts, action) {
    /**
     *  workaround for https://github.com/angular/angular/issues/27679
     */
    if (form instanceof FormGroup && !form['__patchForEachChild']) {
        defineHiddenProp(form, '__patchForEachChild', true);
        ((/** @type {?} */ (form)))._forEachChild = (/**
         * @param {?} cb
         * @return {?}
         */
        function (cb) {
            Object
                .keys(form.controls)
                .forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return form.controls[k] && cb(form.controls[k], k); }));
        });
    }
    /**
     * workaround for https://github.com/angular/angular/issues/20439
     * @type {?}
     */
    var updateValueAndValidity = form.updateValueAndValidity.bind(form);
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = (/**
         * @param {?} opts
         * @return {?}
         */
        function (opts) {
            updateValueAndValidity(__assign({}, (opts || {}), { emitEvent: false }));
        });
    }
    action();
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = updateValueAndValidity;
    }
}
/**
 * @param {?} form
 * @return {?}
 */
function clearControl(form) {
    form['_fields'] && delete form['_fields'];
    form.setValidators(null);
    form.setAsyncValidators(null);
    if (form instanceof FormGroup || form instanceof FormArray) {
        Object.keys(form.controls)
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return clearControl(form.controls[k]); }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyForm = /** @class */ (function () {
    function FormlyForm(formlyBuilder, formlyConfig, ngZone, 
    // tslint:disable-next-line
    immutable, parentFormGroup) {
        var _this = this;
        this.formlyBuilder = formlyBuilder;
        this.formlyConfig = formlyConfig;
        this.ngZone = ngZone;
        this.parentFormGroup = parentFormGroup;
        this.modelChange = new EventEmitter();
        this.immutable = false;
        this._modelChangeValue = {};
        this.modelChangeSubs = [];
        this.modelChange$ = new Subject();
        this.modelChangeSub = this.modelChange$.pipe(switchMap((/**
         * @return {?}
         */
        function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); }))).subscribe((/**
         * @return {?}
         */
        function () { return _this.ngZone.runGuarded((/**
         * @return {?}
         */
        function () {
            // runGuarded is used to keep the expression changes in-sync
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            _this.checkExpressionChange();
            _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
        })); }));
        if (immutable !== null) {
            console.warn("NgxFormly: passing 'immutable' attribute to 'formly-form' component is deprecated since v5.5, enable immutable mode through NgModule declaration instead.");
        }
        this.immutable = (immutable !== null) || !!formlyConfig.extras.immutable;
    }
    Object.defineProperty(FormlyForm.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._model) {
                this._model = {};
            }
            return this._model;
        },
        set: /**
         * @param {?} model
         * @return {?}
         */
        function (model) { this._model = this.immutable ? clone(model) : model; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields || []; },
        set: /**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { this._fields = this.immutable ? clone(fields) : fields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) { this._options = this.immutable ? clone(options) : options; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "content", {
        set: /**
         * @param {?} content
         * @return {?}
         */
        function (content) {
            if (content) {
                /** @type {?} */
                var hasContent = false;
                /** @type {?} */
                var node = content.nativeElement.nextSibling;
                while (node && !hasContent) {
                    if (node.nodeType === Node.ELEMENT_NODE
                        || node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== '') {
                        hasContent = true;
                    }
                    node = node.nextSibling;
                }
                if (hasContent) {
                    console.warn("NgxFormly: content projection for 'formly-form' component is deprecated since v5.5, you should avoid passing content inside the 'formly-form' tag.");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormlyForm.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.formlyConfig.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyForm.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // https://github.com/ngx-formly/ngx-formly/issues/2294
        if (changes.model && this.field) {
            this.field.model = this.model;
        }
        if (changes.fields && this.form) {
            clearControl(this.form);
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.form = this.form || (new FormGroup({}));
            this.setOptions();
            this.options.updateInitialValue();
            this.clearModelSubscriptions();
            this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
            this.trackModelChanges(this.fields);
        }
    };
    /**
     * @return {?}
     */
    FormlyForm.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modelChangeSub.unsubscribe();
        this.clearModelSubscriptions();
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    FormlyForm.prototype.changeModel = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var key = _a.key, value = _a.value, field = _a.field;
        assignFieldValue(field, value);
        this.modelChange$.next();
    };
    /**
     * @return {?}
     */
    FormlyForm.prototype.setOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.resetModel) {
            this.options.resetModel = (/**
             * @param {?=} model
             * @return {?}
             */
            function (model) {
                model = clone(isNullOrUndefined(model) ? ((/** @type {?} */ (_this.options)))._initialModel : model);
                if (_this.model) {
                    Object.keys(_this.model).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return delete _this.model[k]; }));
                    Object.assign(_this.model, model || {});
                }
                ((/** @type {?} */ (_this.options)))._buildForm();
                // we should call `NgForm::resetForm` to ensure changing `submitted` state after resetting form
                // but only when the current component is a root one.
                if (_this.options.parentForm && _this.options.parentForm.control === _this.form) {
                    _this.options.parentForm.resetForm(_this.model);
                }
                else {
                    _this.form.reset(_this.model);
                }
            });
        }
        if (!this.options.parentForm && this.parentFormGroup) {
            defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
            wrapProperty(this.options.parentForm, 'submitted', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange;
                if (!firstChange) {
                    _this.checkExpressionChange();
                    ((/** @type {?} */ (_this.options)))._markForCheck({
                        fieldGroup: _this.fields,
                        model: _this.model,
                        formControl: _this.form,
                        options: _this.options,
                    });
                }
            }));
        }
        if (!this.options.updateInitialValue) {
            this.options.updateInitialValue = (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (_this.options)))._initialModel = clone(_this.model); });
        }
        if (!((/** @type {?} */ (this.options)))._buildForm) {
            ((/** @type {?} */ (this.options)))._buildForm = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            function (emitModelChange) {
                if (emitModelChange === void 0) { emitModelChange = false; }
                _this.clearModelSubscriptions();
                _this.formlyBuilder.buildForm(_this.form, _this.fields, _this.model, _this.options);
                _this.trackModelChanges(_this.fields);
                if (emitModelChange) {
                    _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
                }
            });
        }
        if (!((/** @type {?} */ (this.options)))._trackModelChanges) {
            ((/** @type {?} */ (this.options)))._trackModelChanges = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            function (emitModelChange) {
                if (emitModelChange === void 0) { emitModelChange = false; }
                _this.clearModelSubscriptions();
                _this.trackModelChanges(_this.fields);
                if (emitModelChange) {
                    _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
                }
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    FormlyForm.prototype.checkExpressionChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.options && ((/** @type {?} */ (this.options)))._checkField) {
            ((/** @type {?} */ (this.options)))._checkField({
                fieldGroup: this.fields,
                model: this.model,
                formControl: this.form,
                options: this.options,
            });
        }
    };
    /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    FormlyForm.prototype.trackModelChanges = /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    function (fields, rootKey) {
        var _this = this;
        if (rootKey === void 0) { rootKey = []; }
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (field.key && !field.fieldGroup && field.formControl) {
                /** @type {?} */
                var control_1 = field.formControl;
                /** @type {?} */
                var valueChanges = control_1.valueChanges.pipe(distinctUntilChanged((/**
                 * @param {?} x
                 * @param {?} y
                 * @return {?}
                 */
                function (x, y) {
                    if (x !== y || Array.isArray(x) || isObject(x)) {
                        return false;
                    }
                    return true;
                })));
                var _a = field.modelOptions, updateOn = _a.updateOn, debounce = _a.debounce;
                if ((!updateOn || updateOn === 'change') && debounce && debounce.default > 0) {
                    valueChanges = control_1.valueChanges.pipe(debounceTime(debounce.default));
                }
                _this.modelChangeSubs.push(valueChanges.subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    // workaround for https://github.com/angular/angular/issues/13792
                    if (control_1 instanceof FormControl && control_1['_fields'] && control_1['_fields'].length > 1) {
                        control_1.patchValue(value, { emitEvent: false, onlySelf: true });
                    }
                    if (field.parsers && field.parsers.length > 0) {
                        field.parsers.forEach((/**
                         * @param {?} parserFn
                         * @return {?}
                         */
                        function (parserFn) { return value = parserFn(value); }));
                    }
                    _this.changeModel({ key: __spread(rootKey, getKeyPath(field)).join('.'), value: value, field: field });
                })));
                // workaround for v5 (https://github.com/ngx-formly/ngx-formly/issues/2061)
                /** @type {?} */
                var observers = control_1.valueChanges['observers'];
                if (observers && observers.length > 1) {
                    observers.unshift(observers.pop());
                }
            }
            if (field.fieldGroup && field.fieldGroup.length > 0) {
                _this.trackModelChanges(field.fieldGroup, field.key ? __spread(rootKey, getKeyPath(field)) : rootKey);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FormlyForm.prototype.clearModelSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        this.modelChangeSubs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.modelChangeSubs = [];
    };
    Object.defineProperty(FormlyForm.prototype, "field", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.fields && this.fields[0] && this.fields[0].parent;
        },
        enumerable: true,
        configurable: true
    });
    FormlyForm.decorators = [
        { type: Component, args: [{
                    selector: 'formly-form',
                    template: "\n    <formly-field *ngFor=\"let field of fields\"\n      hide-deprecation\n      [form]=\"field.form\"\n      [options]=\"field.options\"\n      [model]=\"field.model\"\n      [field]=\"field\">\n    </formly-field>\n    <ng-container #content>\n      <ng-content></ng-content>\n    </ng-container>\n  ",
                    providers: [FormlyFormBuilder]
                }] }
    ];
    /** @nocollapse */
    FormlyForm.ctorParameters = function () { return [
        { type: FormlyFormBuilder },
        { type: FormlyConfig },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Attribute, args: ['immutable',] }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] }
    ]; };
    FormlyForm.propDecorators = {
        form: [{ type: Input }],
        model: [{ type: Input }],
        fields: [{ type: Input }],
        options: [{ type: Input }],
        modelChange: [{ type: Output }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return FormlyForm;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyField = /** @class */ (function () {
    function FormlyField(formlyConfig, renderer, resolver, elementRef, 
    // tslint:disable-next-line
    hideDeprecation) {
        this.formlyConfig = formlyConfig;
        this.renderer = renderer;
        this.resolver = resolver;
        this.elementRef = elementRef;
        this.warnDeprecation = false;
        this.modelChange = new EventEmitter();
        this.hostObservers = [];
        this.componentRefs = [];
        this.hooksObservers = [];
        this.detectFieldBuild = false;
        this.warnDeprecation = hideDeprecation === null;
    }
    Object.defineProperty(FormlyField.prototype, "model", {
        set: /**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'model' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyField.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'form' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyField.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'options' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterContentInit');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterContentChecked');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterViewInit');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterViewChecked');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.triggerHook('doCheck');
        if (this.detectFieldBuild && (this.field && this.field.options)) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('onInit');
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyField.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.triggerHook('onChanges', changes);
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resetRefs(this.field);
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        function (unsubscribe) { return unsubscribe(); }));
        this.hooksObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        function (unsubscribe) { return unsubscribe(); }));
        this.triggerHook('onDestroy');
    };
    /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    FormlyField.prototype.renderField = /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    function (containerRef, f, wrappers) {
        var _this = this;
        if (wrappers === void 0) { wrappers = []; }
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field ? this.field.wrappers : [];
        }
        if (wrappers && wrappers.length > 0) {
            var _a = __read(wrappers), wrapper = _a[0], wps_1 = _a.slice(1);
            var component = this.formlyConfig.getWrapper(wrapper).component;
            /** @type {?} */
            var ref_1 = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref_1, f);
            wrapProperty(ref_1.instance, 'fieldComponent', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, previousValue = _a.previousValue, currentValue = _a.currentValue;
                if (currentValue) {
                    if (previousValue && previousValue['_lContainer'] === currentValue['_lContainer']) {
                        return;
                    }
                    /** @type {?} */
                    var viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        _this.renderField(currentValue, f, wps_1);
                    }
                    !firstChange && ref_1.changeDetectorRef.detectChanges();
                }
            }));
        }
        else if (f && f.type) {
            var component = this.formlyConfig.getType(f.type).component;
            /** @type {?} */
            var ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
        }
    };
    /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    FormlyField.prototype.triggerHook = /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    function (name, changes) {
        if (this.field && this.field.hooks && this.field.hooks[name]) {
            if (!changes || changes.field) {
                /** @type {?} */
                var r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    /** @type {?} */
                    var sub_1 = r.subscribe();
                    this.hooksObservers.push((/**
                     * @return {?}
                     */
                    function () { return sub_1.unsubscribe(); }));
                }
            }
        }
        if (this.field && this.field.lifecycle && this.field.lifecycle[name]) {
            this.field.lifecycle[name](this.field.form, this.field, this.field.model, this.field.options);
        }
        if (name === 'onChanges' && changes.field) {
            this.resetRefs(changes.field.previousValue);
            this.render();
        }
    };
    /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    FormlyField.prototype.attachComponentRef = /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    function (ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        Object.assign(ref.instance, { field: field });
    };
    /**
     * @private
     * @return {?}
     */
    FormlyField.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.field) {
            return;
        }
        // require Formly build
        if (!this.field.options) {
            this.detectFieldBuild = true;
            return;
        }
        this.detectFieldBuild = false;
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        function (unsubscribe) { return unsubscribe(); }));
        this.hostObservers = [
            wrapProperty(this.field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, currentValue = _a.currentValue;
                if (!firstChange || (firstChange && currentValue)) {
                    _this.renderer.setStyle(_this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                }
                if (!_this.formlyConfig.extras.lazyRender) {
                    firstChange && _this.renderField(_this.containerRef, _this.field);
                }
                else {
                    if (currentValue) {
                        _this.containerRef.clear();
                        if (_this.field.className) {
                            _this.renderer.removeAttribute(_this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        _this.renderField(_this.containerRef, _this.field);
                        if (_this.field.className) {
                            _this.renderer.setAttribute(_this.elementRef.nativeElement, 'class', _this.field.className);
                        }
                    }
                }
            })),
            wrapProperty(this.field, 'className', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, currentValue = _a.currentValue;
                if ((!firstChange || (firstChange && currentValue))
                    && (!_this.formlyConfig.extras.lazyRender || (_this.field.hide !== true))) {
                    _this.renderer.setAttribute(_this.elementRef.nativeElement, 'class', currentValue);
                }
            })),
        ];
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyField.prototype.resetRefs = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field) {
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((/**
                 * @param {?} ref
                 * @return {?}
                 */
                function (ref) { return _this.componentRefs.indexOf(ref) === -1; }));
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    };
    FormlyField.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field',
                    template: "<ng-template #container></ng-template>"
                }] }
    ];
    /** @nocollapse */
    FormlyField.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Attribute, args: ['hide-deprecation',] }] }
    ]; };
    FormlyField.propDecorators = {
        field: [{ type: Input }],
        model: [{ type: Input }],
        form: [{ type: Input }],
        options: [{ type: Input }],
        modelChange: [{ type: Output }],
        containerRef: [{ type: ViewChild, args: ['container', (/** @type {?} */ ({ read: ViewContainerRef, static: true })),] }]
    };
    return FormlyField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyAttributes = /** @class */ (function () {
    function FormlyAttributes(renderer, elementRef, _document) {
        var _this = this;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        this.uiAttributes = null;
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: ['click', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],
            callback: (/**
             * @param {?} eventName
             * @param {?} $event
             * @return {?}
             */
            function (eventName, $event) {
                switch (eventName) {
                    case 'focus':
                        return _this.onFocus($event);
                    case 'blur':
                        return _this.onBlur($event);
                    case 'change':
                        return _this.onChange($event);
                    default:
                        return _this.to[eventName](_this.field, $event);
                }
            }),
        };
        this.document = _document;
    }
    Object.defineProperty(FormlyAttributes.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () { return this.field.templateOptions || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyAttributes.prototype, "fieldAttrElements", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return (this.field && this.field['_elementRefs']) || []; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyAttributes.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            function (listener) { return listener(); }));
            this.uiEvents.events.forEach((/**
             * @param {?} eventName
             * @return {?}
             */
            function (eventName) {
                if ((_this.to && _this.to[eventName]) || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    _this.uiEvents.listeners.push(_this.renderer.listen(_this.elementRef.nativeElement, eventName, (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.uiEvents.callback(eventName, e); })));
                }
            }));
            if (this.to && this.to.attributes) {
                wrapProperty(this.to, 'attributes', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var currentValue = _a.currentValue, previousValue = _a.previousValue;
                    if (previousValue) {
                        Object.keys(previousValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        function (attr) { return _this.removeAttribute(attr); }));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        function (attr) {
                            if (currentValue[attr] != null) {
                                _this.setAttribute(attr, currentValue[attr]);
                            }
                        }));
                    }
                }));
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                wrapProperty(this.field, 'focus', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var currentValue = _a.currentValue;
                    _this.toggleFocus(currentValue);
                }));
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    };
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    FormlyAttributes.prototype.ngDoCheck = /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.uiAttributes) {
            /** @type {?} */
            var element_1 = (/** @type {?} */ (this.elementRef.nativeElement));
            this.uiAttributes = __spread(FORMLY_VALIDATORS, ['tabindex', 'placeholder', 'readonly', 'disabled', 'step']).filter((/**
             * @param {?} attr
             * @return {?}
             */
            function (attr) { return !element_1.hasAttribute || !element_1.hasAttribute(attr); }));
        }
        this.uiAttributes.forEach((/**
         * @param {?} attr
         * @return {?}
         */
        function (attr) {
            /** @type {?} */
            var value = _this.to[attr];
            if (_this.uiAttributesCache[attr] !== value
                && (!_this.to.attributes || !_this.to.attributes.hasOwnProperty(attr.toLowerCase()))) {
                _this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    _this.setAttribute(attr, value === true ? attr : "" + value);
                }
                else {
                    _this.removeAttribute(attr);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    FormlyAttributes.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.uiEvents.listeners.forEach((/**
         * @param {?} listener
         * @return {?}
         */
        function (listener) { return listener(); }));
        this.detachElementRef(this.field);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormlyAttributes.prototype.toggleFocus = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        /** @type {?} */
        var isFocused = !!this.document.activeElement
            && this.fieldAttrElements
                .some((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var nativeElement = _a.nativeElement;
                return _this.document.activeElement === nativeElement || nativeElement.contains(_this.document.activeElement);
            }));
        if (value && !isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return element.nativeElement.focus(); }));
        }
        else if (!value && isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return element.nativeElement.blur(); }));
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onFocus = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.field['___$focus'] = true;
        if (this.to.focus) {
            this.to.focus(this.field, $event);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.field['___$focus'] = false;
        if (this.to.blur) {
            this.to.blur(this.field, $event);
        }
    };
    // handle custom `change` event, for regular ones rely on DOM listener
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onHostChange = 
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
        if (this.field.formControl) {
            this.field.formControl.markAsDirty();
        }
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    FormlyAttributes.prototype.attachElementRef = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs'] && f['_elementRefs'].indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    FormlyAttributes.prototype.detachElementRef = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        /** @type {?} */
        var index = f && f['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            this.field['_elementRefs'].splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    FormlyAttributes.prototype.setAttribute = /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    function (attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    };
    /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    FormlyAttributes.prototype.removeAttribute = /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    function (attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    };
    FormlyAttributes.decorators = [
        { type: Directive, args: [{
                    selector: '[formlyAttributes]',
                    host: {
                        '(change)': 'onHostChange($event)',
                    },
                },] }
    ];
    /** @nocollapse */
    FormlyAttributes.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FormlyAttributes.propDecorators = {
        field: [{ type: Input, args: ['formlyAttributes',] }],
        id: [{ type: Input }]
    };
    return FormlyAttributes;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
var FieldType = /** @class */ (function () {
    function FieldType() {
    }
    Object.defineProperty(FieldType.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () { return this.field.model; },
        set: /**
         * @param {?} m
         * @return {?}
         */
        function (m) { console.warn("NgxFormly: passing 'model' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "form", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.field.parent.formControl)); },
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) { console.warn("NgxFormly: passing 'form' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this.field.options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) { console.warn("NgxFormly: passing 'options' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "key", {
        get: /**
         * @return {?}
         */
        function () { return this.field.key; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "formControl", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.field.formControl)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () { return this.field.templateOptions || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "showError", {
        get: /**
         * @return {?}
         */
        function () { return this.options.showError(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () { return this.field.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldType.prototype, "formState", {
        get: /**
         * @return {?}
         */
        function () { return this.options.formState || {}; },
        enumerable: true,
        configurable: true
    });
    FieldType.propDecorators = {
        field: [{ type: Input }],
        model: [{ type: Input }],
        form: [{ type: Input }],
        options: [{ type: Input }]
    };
    return FieldType;
}());
/**
 * @deprecated use `FieldType` instead
 * @abstract
 */
var  /**
 * @deprecated use `FieldType` instead
 * @abstract
 */
Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        var _this = _super.call(this) || this;
        console.warn("NgxFormly: 'Field' has been renamed to 'FieldType', extend 'FieldType' instead.");
        return _this;
    }
    return Field;
}(FieldType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO remove `selector` in V6
// tslint:disable-next-line
/**
 * @abstract
 * @template F
 */
var FieldArrayType = /** @class */ (function (_super) {
    __extends(FieldArrayType, _super);
    function FieldArrayType(builder) {
        var _this = _super.call(this) || this;
        _this.defaultOptions = {
            defaultValue: [],
        };
        if (builder instanceof FormlyFormBuilder) {
            console.warn("NgxFormly: passing 'FormlyFormBuilder' to '" + _this.constructor.name + "' type is not required anymore, you may remove it!");
        }
        return _this;
    }
    Object.defineProperty(FieldArrayType.prototype, "formControl", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.field.formControl));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} field
     * @return {?}
     */
    FieldArrayType.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!field.formControl && field.key) {
            /** @type {?} */
            var control = findControl(field);
            registerControl(field, control ? control : new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        /** @type {?} */
        var length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (var i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i], true);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (var i = field.fieldGroup.length; i < length; i++) {
            /** @type {?} */
            var f = __assign({}, clone(field.fieldArray), { key: "" + i });
            field.fieldGroup.push(f);
        }
    };
    /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    FieldArrayType.prototype.add = /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    function (i, initialModel, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    FieldArrayType.prototype.remove = /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    function (i, _a) {
        var markAsDirty = (_a === void 0 ? { markAsDirty: true } : _a).markAsDirty;
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((/**
         * @param {?} f
         * @param {?} key
         * @return {?}
         */
        function (f, key) { return f.key = "" + key; }));
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    };
    /**
     * @private
     * @return {?}
     */
    FieldArrayType.prototype._build = /**
     * @private
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.options)))._buildField(this.field);
        ((/** @type {?} */ (this.options)))._trackModelChanges(true);
    };
    FieldArrayType.decorators = [
        { type: Directive, args: [{ selector: '[??fieldArray]' },] }
    ];
    /** @nocollapse */
    FieldArrayType.ctorParameters = function () { return [
        { type: FormlyFormBuilder, decorators: [{ type: Inject, args: [FORMLY_CONFIG,] }, { type: Optional }] }
    ]; };
    return FieldArrayType;
}(FieldType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
var FieldWrapper = /** @class */ (function (_super) {
    __extends(FieldWrapper, _super);
    function FieldWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldWrapper.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', (/** @type {?} */ ({ read: ViewContainerRef, static: false })),] }]
    };
    return FieldWrapper;
}(FieldType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyGroup = /** @class */ (function (_super) {
    __extends(FormlyGroup, _super);
    function FormlyGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            defaultValue: {},
        };
        return _this;
    }
    FormlyGroup.decorators = [
        { type: Component, args: [{
                    selector: 'formly-group',
                    template: "\n    <formly-field *ngFor=\"let f of field.fieldGroup\" [field]=\"f\"></formly-field>\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[class]': 'field.fieldGroupClassName || ""',
                    }
                }] }
    ];
    return FormlyGroup;
}(FieldType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyValidationMessage = /** @class */ (function () {
    function FormlyValidationMessage(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @return {?}
     */
    FormlyValidationMessage.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var EXPR_VALIDATORS = FORMLY_VALIDATORS.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return "templateOptions." + v; }));
        this.errorMessage$ = merge(this.field.formControl.statusChanges, (!this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var field = _a.field, type = _a.type, property = _a.property;
                return (field === _this.field)
                    && (type === 'expressionChanges')
                    && ((property.indexOf('validation') !== -1)
                        || (EXPR_VALIDATORS.indexOf(property) !== -1));
            }))))).pipe(startWith(null), switchMap((/**
         * @return {?}
         */
        function () { return isObservable(_this.errorMessage)
            ? _this.errorMessage
            : of(_this.errorMessage); })));
    };
    Object.defineProperty(FormlyValidationMessage.prototype, "errorMessage", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var fieldForm = this.field.formControl;
            for (var error in fieldForm.errors) {
                if (fieldForm.errors.hasOwnProperty(error)) {
                    /** @type {?} */
                    var message = this.formlyConfig.getValidatorMessage(error);
                    if (isObject(fieldForm.errors[error])) {
                        if (fieldForm.errors[error].errorPath) {
                            return;
                        }
                        if (fieldForm.errors[error].message) {
                            message = fieldForm.errors[error].message;
                        }
                    }
                    if (this.field.validation && this.field.validation.messages && this.field.validation.messages[error]) {
                        message = this.field.validation.messages[error];
                    }
                    if (this.field.validators && this.field.validators[error] && this.field.validators[error].message) {
                        message = this.field.validators[error].message;
                    }
                    if (this.field.asyncValidators && this.field.asyncValidators[error] && this.field.asyncValidators[error].message) {
                        message = this.field.asyncValidators[error].message;
                    }
                    if (typeof message === 'function') {
                        return message(fieldForm.errors[error], this.field);
                    }
                    return message;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    FormlyValidationMessage.decorators = [
        { type: Component, args: [{
                    selector: 'formly-validation-message',
                    template: "{{ errorMessage$ | async }}",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    FormlyValidationMessage.ctorParameters = function () { return [
        { type: FormlyConfig }
    ]; };
    FormlyValidationMessage.propDecorators = {
        field: [{ type: Input }]
    };
    return FormlyValidationMessage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyTemplateType = /** @class */ (function (_super) {
    __extends(FormlyTemplateType, _super);
    function FormlyTemplateType(sanitizer) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.innerHtml = { content: null, template: null };
        return _this;
    }
    Object.defineProperty(FormlyTemplateType.prototype, "template", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.field && (this.field.template !== this.innerHtml.template)) {
                this.innerHtml = {
                    template: this.field.template,
                    content: this.to.safeHtml
                        ? this.sanitizer.bypassSecurityTrustHtml(this.field.template)
                        : this.field.template,
                };
            }
            return this.innerHtml.content;
        },
        enumerable: true,
        configurable: true
    });
    FormlyTemplateType.decorators = [
        { type: Component, args: [{
                    selector: 'formly-template',
                    template: "<div [innerHtml]=\"template\"></div>"
                }] }
    ];
    /** @nocollapse */
    FormlyTemplateType.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return FormlyTemplateType;
}(FieldType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} expression
 * @param {?} argNames
 * @return {?}
 */
function evalStringExpression(expression, argNames) {
    try {
        if (expression.indexOf('this.field') !== -1) {
            console.warn("NgxFormly: using 'this.field' in expressionProperties is deprecated since v5.1, use 'field' instead.");
        }
        return (/** @type {?} */ (Function.apply(void 0, __spread(argNames, ["return " + expression + ";"]))));
    }
    catch (error) {
        console.error(error);
    }
}
/**
 * @param {?} expression
 * @param {?} thisArg
 * @param {?} argVal
 * @return {?}
 */
function evalExpression(expression, thisArg, argVal) {
    if (expression instanceof Function) {
        return expression.apply(thisArg, argVal);
    }
    else {
        return expression ? true : false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
var  /**
 * \@experimental
 */
FieldExpressionExtension = /** @class */ (function () {
    function FieldExpressionExtension() {
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldExpressionExtension.prototype.prePopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field.parent || field.options._checkField) {
            return;
        }
        /** @type {?} */
        var checkLocked = false;
        field.options._checkField = (/**
         * @param {?} f
         * @param {?} ignoreCache
         * @return {?}
         */
        function (f, ignoreCache) {
            if (!checkLocked) {
                checkLocked = true;
                _this.checkField(f, ignoreCache);
                checkLocked = false;
            }
        });
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldExpressionExtension.prototype.postPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (!field.parent || field._expressionProperties) {
            return;
        }
        // cache built expression
        defineHiddenProp(field, '_expressionProperties', {});
        if (field.expressionProperties) {
            var _loop_1 = function (key) {
                /** @type {?} */
                var expressionProperty = field.expressionProperties[key];
                if (typeof expressionProperty === 'string' || isFunction(expressionProperty)) {
                    field._expressionProperties[key] = {
                        expression: this_1._evalExpression(key, expressionProperty, key === 'templateOptions.disabled' && field.parent.expressionProperties && field.parent.expressionProperties.hasOwnProperty('templateOptions.disabled')
                            ? (/**
                             * @return {?}
                             */
                            function () { return field.parent.templateOptions.disabled; })
                            : undefined),
                    };
                    if (key === 'templateOptions.disabled') {
                        Object.defineProperty(field._expressionProperties[key], 'expressionValue', {
                            get: (/**
                             * @return {?}
                             */
                            function () { return field.templateOptions.disabled; }),
                            set: (/**
                             * @return {?}
                             */
                            function () { }),
                            enumerable: true,
                            configurable: true,
                        });
                    }
                }
                else if (expressionProperty instanceof Observable) {
                    /** @type {?} */
                    var subscribe_1 = (/**
                     * @return {?}
                     */
                    function () { return ((/** @type {?} */ (expressionProperty)))
                        .subscribe((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        _this.setExprValue(field, key, v);
                        if (field.options && field.options._markForCheck) {
                            field.options._markForCheck(field);
                        }
                    })); });
                    /** @type {?} */
                    var subscription_1 = subscribe_1();
                    /** @type {?} */
                    var onInit_1 = field.hooks.onInit;
                    field.hooks.onInit = (/**
                     * @return {?}
                     */
                    function () {
                        if (subscription_1 === null) {
                            subscription_1 = subscribe_1();
                        }
                        return onInit_1 && onInit_1(field);
                    });
                    /** @type {?} */
                    var onDestroy_1 = field.hooks.onDestroy;
                    field.hooks.onDestroy = (/**
                     * @return {?}
                     */
                    function () {
                        onDestroy_1 && onDestroy_1(field);
                        subscription_1.unsubscribe();
                        subscription_1 = null;
                    });
                }
            };
            var this_1 = this;
            for (var key in field.expressionProperties) {
                _loop_1(key);
            }
        }
        if (field.hideExpression) {
            // delete hide value in order to force re-evaluate it in FormlyFormExpression.
            delete field.hide;
            field.hideExpression = this._evalExpression('hide', field.hideExpression, (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var root = field.parent;
                while (root.parent && !root.hide) {
                    root = root.parent;
                }
                return root.hide;
            }));
        }
        else {
            wrapProperty(field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var currentValue = _a.currentValue, firstChange = _a.firstChange;
                field._hide = currentValue;
                if (!firstChange || (firstChange && currentValue === true)) {
                    field.options._hiddenFieldsForCheck.push(field);
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} prop
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    FieldExpressionExtension.prototype._evalExpression = /**
     * @private
     * @param {?} prop
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    function (prop, expression, parentExpression) {
        return (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                if (typeof expression === 'string') {
                    expression = evalStringExpression(expression, ['model', 'formState', 'field']);
                }
                if (typeof expression !== 'function') {
                    expression = (/**
                     * @return {?}
                     */
                    function () { return !!expression; });
                }
                return (parentExpression && parentExpression()) || expression.apply(void 0, __spread(args));
            }
            catch (error) {
                error.message = "[Formly Error] [Expression \"" + prop + "\"] " + error.message;
                throw error;
            }
        });
    };
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @return {?}
     */
    FieldExpressionExtension.prototype._evalExpressionPath = /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @return {?}
     */
    function (field, prop) {
        if (field._expressionProperties[prop] && field._expressionProperties[prop].expressionPaths) {
            return field._expressionProperties[prop].expressionPaths;
        }
        /** @type {?} */
        var paths = [];
        if (prop.indexOf('[') === -1) {
            paths = prop.split('.');
        }
        else {
            prop
                .split(/[[\]]{1,2}/) // https://stackoverflow.com/a/20198206
                .filter((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p; }))
                .forEach(((/**
             * @param {?} path
             * @return {?}
             */
            function (path) {
                /** @type {?} */
                var arrayPath = path.match(/['|"](.*?)['|"]/);
                if (arrayPath) {
                    paths.push(arrayPath[1]);
                }
                else {
                    paths.push.apply(paths, __spread(path.split('.').filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p; }))));
                }
            })));
        }
        if (field._expressionProperties[prop]) {
            field._expressionProperties[prop].expressionPaths = paths;
        }
        return paths;
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkField = /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        var _this = this;
        if (ignoreCache === void 0) { ignoreCache = false; }
        /** @type {?} */
        var fieldChanged = this._checkField(field, ignoreCache);
        field.options._hiddenFieldsForCheck
            .sort((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.hide ? -1 : 1; }))
            .forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return _this.toggleFormControl(f, !!f.hide, !ignoreCache); }));
        field.options._hiddenFieldsForCheck = [];
        if (fieldChanged) {
            this.checkField(field);
            if (field.options && field.options._markForCheck) {
                field.options._markForCheck(field);
            }
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype._checkField = /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        var _this = this;
        if (ignoreCache === void 0) { ignoreCache = false; }
        /** @type {?} */
        var fieldChanged = false;
        field.fieldGroup.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            if (!f.options) {
                return;
            }
            _this.checkFieldExpressionChange(f, ignoreCache) && (fieldChanged = true);
            if (_this.checkFieldVisibilityChange(f, ignoreCache)) {
                field.options._hiddenFieldsForCheck.push(f);
                fieldChanged = true;
            }
            if (f.fieldGroup && f.fieldGroup.length > 0) {
                _this._checkField(f, ignoreCache) && (fieldChanged = true);
            }
        }));
        return fieldChanged;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkFieldExpressionChange = /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        if (!field || !field._expressionProperties) {
            return false;
        }
        /** @type {?} */
        var markForCheck = false;
        /** @type {?} */
        var expressionProperties = field._expressionProperties;
        for (var key in expressionProperties) {
            /** @type {?} */
            var expressionValue = evalExpression(expressionProperties[key].expression, { field: field }, [field.model, field.options.formState, field, ignoreCache]);
            if (key === 'templateOptions.disabled') {
                expressionValue = !!expressionValue;
            }
            if (ignoreCache || (expressionProperties[key].expressionValue !== expressionValue
                && (!(isObject(expressionValue) || isFunction(expressionValue))
                    || (isFunction(expressionValue)
                        && ('' + expressionProperties[key].expressionValue !== '' + expressionValue))
                    || isObservable(expressionValue)
                    || JSON.stringify(expressionValue) !== JSON.stringify(expressionProperties[key].expressionValue)))) {
                markForCheck = true;
                expressionProperties[key].expressionValue = expressionValue;
                this.setExprValue(field, key, expressionValue);
            }
        }
        return markForCheck;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkFieldVisibilityChange = /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        if (!field || isNullOrUndefined(field.hideExpression)) {
            return false;
        }
        /** @type {?} */
        var hideExpressionResult = !!evalExpression(field.hideExpression, { field: field }, [field.model, field.options.formState, field, ignoreCache]);
        /** @type {?} */
        var markForCheck = false;
        if (hideExpressionResult !== field.hide || ignoreCache) {
            markForCheck = true;
            // toggle hide
            field.hide = hideExpressionResult;
            field.templateOptions.hidden = hideExpressionResult;
        }
        return markForCheck;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.setDisabledState = /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (field, value) {
        var _this = this;
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.expressionProperties || !f.expressionProperties.hasOwnProperty('templateOptions.disabled'); }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this.setDisabledState(f, value); }));
        }
        if (field.key && field.templateOptions.disabled !== value) {
            field.templateOptions.disabled = value;
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    FieldExpressionExtension.prototype.toggleFormControl = /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    function (field, hide, resetOnHide) {
        var _this = this;
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.hideExpression; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this.toggleFormControl(f, hide, resetOnHide); }));
        }
        if (field.formControl && field.key) {
            defineHiddenProp(field, '_hide', !!(hide || field.hide));
            /** @type {?} */
            var c = field.formControl;
            if (c['_fields'] && c['_fields'].length > 1) {
                updateValidity(c);
            }
            if (hide === true && (!c['_fields'] || c['_fields'].every((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !!f._hide; })))) {
                unregisterControl(field, true);
                if (resetOnHide && field.resetOnHide) {
                    field.formControl.reset({ value: undefined, disabled: field.formControl.disabled });
                    if (field.fieldGroup) {
                        assignFieldValue(field, undefined);
                        if (field.formControl instanceof FormArray) {
                            field.fieldGroup.length = 0;
                        }
                    }
                }
            }
            else if (hide === false) {
                if (field.resetOnHide && field.parent && !isUndefined(field.defaultValue) && isUndefined(getFieldValue(field))) {
                    assignFieldValue(field, field.defaultValue);
                }
                registerControl(field, undefined, true);
                if (field.resetOnHide && field.fieldArray && (field.fieldGroup || []).length !== (field.model || []).length) {
                    ((/** @type {?} */ (field.options)))._buildForm(true);
                }
            }
        }
        if (field.options.fieldChanges) {
            field.options.fieldChanges.next((/** @type {?} */ ({ field: field, type: 'hidden', value: hide })));
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.setExprValue = /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    function (field, prop, value) {
        try {
            /** @type {?} */
            var target = field;
            /** @type {?} */
            var paths = this._evalExpressionPath(field, prop);
            /** @type {?} */
            var lastIndex = paths.length - 1;
            for (var i = 0; i < lastIndex; i++) {
                target = target[paths[i]];
            }
            target[paths[lastIndex]] = value;
        }
        catch (error) {
            error.message = "[Formly Error] [Expression \"" + prop + "\"] " + error.message;
            throw error;
        }
        if (prop === 'templateOptions.disabled' && field.key) {
            this.setDisabledState(field, value);
        }
        if (prop.indexOf('model.') === 0) {
            /** @type {?} */
            var path = prop.replace(/^model\./, '');
            /** @type {?} */
            var control = field.key && prop === path ? field.formControl : field.parent.formControl.get(path);
            if (control
                && !(isNullOrUndefined(control.value) && isNullOrUndefined(value))
                && control.value !== value) {
                control.patchValue(value);
            }
        }
        this.emitExpressionChanges(field, prop, value);
    };
    /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.emitExpressionChanges = /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (field, property, value) {
        if (!field.options.fieldChanges) {
            return;
        }
        field.options.fieldChanges.next({
            field: field,
            type: 'expressionChanges',
            property: property,
            value: value,
        });
    };
    return FieldExpressionExtension;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
var  /**
 * \@experimental
 */
FieldValidationExtension = /** @class */ (function () {
    function FieldValidationExtension(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldValidationExtension.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.initFieldValidation(field, 'validators');
        this.initFieldValidation(field, 'asyncValidators');
    };
    /**
     * @private
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    FieldValidationExtension.prototype.initFieldValidation = /**
     * @private
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    function (field, type) {
        var _this = this;
        /** @type {?} */
        var validators = [];
        if (type === 'validators' && !(field.hasOwnProperty('fieldGroup') && !field.key)) {
            validators.push(this.getPredefinedFieldValidation(field));
        }
        if (field[type]) {
            for (var validatorName in field[type]) {
                if (validatorName === 'validation' && !Array.isArray(field[type].validation)) {
                    field[type].validation = [field[type].validation];
                    console.warn("NgxFormly(" + field.key + "): passing a non array value to the 'validation' is deprecated, pass an array instead");
                }
                validatorName === 'validation'
                    ? validators.push.apply(validators, __spread(field[type].validation.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) { return _this.wrapNgValidatorFn(field, v); })))) : validators.push(this.wrapNgValidatorFn(field, field[type][validatorName], validatorName));
            }
        }
        defineHiddenProp(field, '_' + type, validators);
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FieldValidationExtension.prototype.getPredefinedFieldValidation = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var VALIDATORS = [];
        FORMLY_VALIDATORS.forEach((/**
         * @param {?} opt
         * @return {?}
         */
        function (opt) { return wrapProperty(field.templateOptions, opt, (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var currentValue = _a.currentValue, firstChange = _a.firstChange;
            VALIDATORS = VALIDATORS.filter((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o !== opt; }));
            if (currentValue != null && currentValue !== false) {
                VALIDATORS.push(opt);
            }
            if (!firstChange && field.formControl) {
                updateValidity(field.formControl);
            }
        })); }));
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (VALIDATORS.length === 0) {
                return null;
            }
            return Validators.compose(VALIDATORS.map((/**
             * @param {?} opt
             * @return {?}
             */
            function (opt) { return (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var value = field.templateOptions[opt];
                switch (opt) {
                    case 'required':
                        return Validators.required(control);
                    case 'pattern':
                        return Validators.pattern(value)(control);
                    case 'minLength':
                        return Validators.minLength(value)(control);
                    case 'maxLength':
                        return Validators.maxLength(value)(control);
                    case 'min':
                        return Validators.min(value)(control);
                    case 'max':
                        return Validators.max(value)(control);
                }
            }); })))(control);
        });
    };
    /**
     * @private
     * @param {?} field
     * @param {?} validator
     * @param {?=} validatorName
     * @return {?}
     */
    FieldValidationExtension.prototype.wrapNgValidatorFn = /**
     * @private
     * @param {?} field
     * @param {?} validator
     * @param {?=} validatorName
     * @return {?}
     */
    function (field, validator, validatorName) {
        var _this = this;
        /** @type {?} */
        var validatorOption = null;
        if (typeof validator === 'string') {
            validatorOption = clone(this.formlyConfig.getValidator(validator));
        }
        if (typeof validator === 'object' && validator.name) {
            validatorOption = clone(this.formlyConfig.getValidator(validator.name));
            if (validator.options) {
                validatorOption.options = validator.options;
            }
        }
        if (typeof validator === 'object' && validator.expression) {
            var expression = validator.expression, options = __rest(validator, ["expression"]);
            validatorOption = {
                name: validatorName,
                validation: expression,
                options: Object.keys(options).length > 0 ? options : null,
            };
        }
        if (typeof validator === 'function') {
            validatorOption = {
                name: validatorName,
                validation: validator,
            };
        }
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var errors = validatorOption.validation(control, field, validatorOption.options);
            if (isPromise(errors)) {
                return errors.then((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return _this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption); }));
            }
            if (isObservable(errors)) {
                return errors.pipe(map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return _this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption); })));
            }
            return _this.handleResult(field, validatorName ? !!errors : errors, validatorOption);
        });
    };
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} options
     * @return {?}
     */
    FieldValidationExtension.prototype.handleAsyncResult = /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} options
     * @return {?}
     */
    function (field, errors, options) {
        // workaround for https://github.com/angular/angular/issues/13200
        if (field.options && field.options._markForCheck) {
            field.options._markForCheck(field);
        }
        return this.handleResult(field, errors, options);
    };
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} __2
     * @return {?}
     */
    FieldValidationExtension.prototype.handleResult = /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} __2
     * @return {?}
     */
    function (field, errors, _a) {
        var name = _a.name, options = _a.options;
        var _b;
        if (typeof errors === 'boolean') {
            errors = errors ? null : (_b = {}, _b[name] = options ? options : true, _b);
        }
        /** @type {?} */
        var ctrl = field.formControl;
        ctrl['_childrenErrors'] && ctrl['_childrenErrors'][name] && ctrl['_childrenErrors'][name]();
        if (isObject(errors)) {
            Object.keys(errors).forEach((/**
             * @param {?} name
             * @return {?}
             */
            function (name) {
                var _a;
                /** @type {?} */
                var errorPath = errors[name].errorPath
                    ? errors[name].errorPath
                    : (options || {}).errorPath;
                /** @type {?} */
                var childCtrl = errorPath ? field.formControl.get(errorPath) : null;
                if (childCtrl) {
                    var _b = errors[name], errorPath_1 = _b.errorPath, opts = __rest(_b, ["errorPath"]);
                    childCtrl.setErrors(__assign({}, (childCtrl.errors || {}), (_a = {}, _a[name] = opts, _a)));
                    !ctrl['_childrenErrors'] && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl['_childrenErrors'][name] = (/**
                     * @return {?}
                     */
                    function () {
                        var _a = childCtrl.errors || {}, _b = name, toDelete = _a[_b], childErrors = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                        childCtrl.setErrors(Object.keys(childErrors).length === 0 ? null : childErrors);
                    });
                }
            }));
        }
        return errors;
    };
    return FieldValidationExtension;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
var  /**
 * \@experimental
 */
FieldFormExtension = /** @class */ (function () {
    function FieldFormExtension(config) {
        this.config = config;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.prePopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!this.root) {
            this.root = field;
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!field.parent) {
            return;
        }
        if (field.fieldGroup && !field.key) {
            defineHiddenProp(field, 'formControl', field.parent.formControl);
        }
        else {
            this.addFormControl(field);
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.postPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (this.root !== field) {
            return;
        }
        this.root = null;
        this.setValidators(field);
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.addFormControl = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var control = findControl(field);
        if (!control) {
            /** @type {?} */
            var controlOptions = { updateOn: field.modelOptions.updateOn };
            /** @type {?} */
            var value = field.key ? getFieldValue(field) : field.defaultValue;
            /** @type {?} */
            var ref = this.config ? this.config.resolveFieldTypeRef(field) : null;
            if (ref && ref.componentType && ref.componentType['createControl']) {
                /** @type {?} */
                var component = ref.componentType;
                console.warn("NgxFormly: '" + component.name + "::createControl' is deprecated since v5.0, use 'prePopulate' hook instead.");
                control = component['createControl'](value, field);
            }
            else if (field.fieldGroup) {
                // TODO: move to postPopulate
                control = new FormGroup({}, controlOptions);
            }
            else {
                control = new FormControl(value, controlOptions);
            }
        }
        registerControl(field, control);
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    FieldFormExtension.prototype.setValidators = /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    function (field, disabled) {
        var _this = this;
        if (disabled === void 0) { disabled = false; }
        /** @type {?} */
        var markForCheck = false;
        if (disabled === false && field.key && field.templateOptions && field.templateOptions.disabled) {
            disabled = true;
        }
        (field.fieldGroup || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return _this.setValidators(f, disabled) && (markForCheck = true); }));
        if (field.key || !field.parent || (!field.key && !field.fieldGroup)) {
            var c_1 = field.formControl;
            field.templateOptions = field.templateOptions || {};
            if (field.key && c_1 && c_1 instanceof FormControl) {
                if (disabled && c_1.enabled) {
                    c_1.disable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
                if (!disabled && c_1.disabled) {
                    c_1.enable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
            }
            if (c_1 && (null === c_1.validator || null === c_1.asyncValidator)) {
                c_1.setValidators((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var v = Validators.compose(_this.mergeValidators(field, '_validators'));
                    return v ? v(c_1) : null;
                }));
                c_1.setAsyncValidators((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var v = Validators.composeAsync(_this.mergeValidators(field, '_asyncValidators'));
                    return v ? v(c_1) : of(null);
                }));
                markForCheck = true;
            }
            if (markForCheck) {
                updateValidity(c_1, true);
            }
        }
        return markForCheck;
    };
    /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    FieldFormExtension.prototype.mergeValidators = /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    function (field, type) {
        var _this = this;
        /** @type {?} */
        var validators = [];
        /** @type {?} */
        var c = field.formControl;
        if (c && c['_fields'] && c['_fields'].length > 1) {
            c['_fields']
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f._hide; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return validators.push.apply(validators, __spread(f[type])); }));
        }
        else if (field[type]) {
            validators.push.apply(validators, __spread(field[type]));
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.key && f.fieldGroup; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return validators.push.apply(validators, __spread(_this.mergeValidators(f, type))); }));
        }
        return validators;
    };
    return FieldFormExtension;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
var  /**
 * \@experimental
 */
CoreExtension = /** @class */ (function () {
    function CoreExtension(formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.formId = 0;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.prePopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.getFieldComponentInstance(field).prePopulate();
        if (field.parent) {
            return;
        }
        /** @type {?} */
        var fieldTransforms = (field.options && field.options.fieldTransform) || this.formlyConfig.extras.fieldTransform;
        (Array.isArray(fieldTransforms) ? fieldTransforms : [fieldTransforms]).forEach((/**
         * @param {?} fieldTransform
         * @return {?}
         */
        function (fieldTransform) {
            if (fieldTransform) {
                console.warn("NgxFormly: fieldTransform is deprecated since v5.0, use custom extension instead.");
                /** @type {?} */
                var fieldGroup = fieldTransform(field.fieldGroup, field.model, (/** @type {?} */ (field.formControl)), field.options);
                if (!fieldGroup) {
                    throw new Error('fieldTransform must return an array of fields');
                }
            }
        }));
    };
    /**
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate();
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @param {?} index
             * @return {?}
             */
            function (f, index) {
                Object.defineProperty(f, 'parent', { get: (/**
                     * @return {?}
                     */
                    function () { return field; }), configurable: true });
                Object.defineProperty(f, 'index', { get: (/**
                     * @return {?}
                     */
                    function () { return index; }), configurable: true });
                _this.formId++;
            }));
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.postPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.getFieldComponentInstance(field).postPopulate();
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.initFieldOptions = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var root = (/** @type {?} */ (field.parent));
        if (!root) {
            return;
        }
        Object.defineProperty(field, 'form', { get: (/**
             * @return {?}
             */
            function () { return root.formControl; }), configurable: true });
        Object.defineProperty(field, 'options', { get: (/**
             * @return {?}
             */
            function () { return root.options; }), configurable: true });
        Object.defineProperty(field, 'model', {
            get: (/**
             * @return {?}
             */
            function () { return field.key && field.fieldGroup ? getFieldValue(field) : root.model; }),
            configurable: true,
        });
        reverseDeepMerge(field, {
            id: getFieldId("formly_" + this.formId, field, field['index']),
            hooks: {},
            modelOptions: {},
            validation: { messages: {} },
            templateOptions: !field.type || !field.key ? {} : {
                label: '',
                placeholder: '',
                focus: false,
                disabled: false,
            },
        });
        if (this.formlyConfig.extras.resetFieldOnHide && field.resetOnHide !== false) {
            field.resetOnHide = true;
        }
        if (field.lifecycle) {
            console.warn("NgxFormly: 'lifecycle' is deprecated since v5.0, use 'hooks' instead.");
        }
        if (field.type !== 'formly-template'
            && (field.template
                || (field.expressionProperties && field.expressionProperties.template))) {
            if (field.type) {
                console.warn("NgxFormly: passing 'type' property is not allowed when 'template' is set.");
            }
            field.type = 'formly-template';
        }
        if (!field.type && field.fieldGroup) {
            field.type = 'formly-group';
        }
        if (field.type) {
            this.formlyConfig.getMergedField(field);
        }
        if (field.parent) {
            /** @type {?} */
            var setDefaultValue = !isUndefined(field.key)
                && !isUndefined(field.defaultValue)
                && isUndefined(getFieldValue(field))
                && (!field.resetOnHide || !(field.hide || field.hideExpression));
            if (setDefaultValue && field.resetOnHide) {
                /** @type {?} */
                var parent_1 = field.parent;
                while (parent_1 && !parent_1.hideExpression && !parent_1.hide) {
                    parent_1 = parent_1.parent;
                }
                setDefaultValue = !parent_1 || !(parent_1.hideExpression || parent_1.hide);
            }
            if (setDefaultValue) {
                assignFieldValue(field, field.defaultValue);
            }
        }
        this.initFieldWrappers(field);
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.initFieldWrappers = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        field.wrappers = field.wrappers || [];
        /** @type {?} */
        var fieldTemplateManipulators = __assign({ preWrapper: [], postWrapper: [] }, (field.templateOptions.templateManipulators || {}));
        field.wrappers = __spread(this.formlyConfig.templateManipulators.preWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(field); })), fieldTemplateManipulators.preWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(field); })), field.wrappers, this.formlyConfig.templateManipulators.postWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(field); })), fieldTemplateManipulators.postWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(field); }))).filter((/**
         * @param {?} el
         * @param {?} i
         * @param {?} a
         * @return {?}
         */
        function (el, i, a) { return el && i === a.indexOf(el); }));
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    CoreExtension.prototype.getFieldComponentInstance = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var componentRef = this.formlyConfig.resolveFieldTypeRef(field);
        /** @type {?} */
        var instance = componentRef ? (/** @type {?} */ (componentRef.instance)) : {};
        return {
            prePopulate: (/**
             * @return {?}
             */
            function () { return instance.prePopulate && instance.prePopulate(field); }),
            onPopulate: (/**
             * @return {?}
             */
            function () { return instance.onPopulate && instance.onPopulate(field); }),
            postPopulate: (/**
             * @return {?}
             */
            function () { return instance.postPopulate && instance.postPopulate(field); }),
        };
    };
    return CoreExtension;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} formlyConfig
 * @return {?}
 */
function defaultFormlyConfig(formlyConfig) {
    return {
        types: [
            { name: 'formly-group', component: FormlyGroup },
            { name: 'formly-template', component: FormlyTemplateType },
        ],
        extensions: [
            { name: 'core', extension: new CoreExtension(formlyConfig) },
            { name: 'field-validation', extension: new FieldValidationExtension(formlyConfig) },
            { name: 'field-form', extension: new FieldFormExtension(formlyConfig) },
            { name: 'field-expression', extension: new FieldExpressionExtension() },
        ],
    };
}
var FormlyModule = /** @class */ (function () {
    function FormlyModule(configService, configs) {
        if (configs === void 0) { configs = []; }
        if (!configs) {
            return;
        }
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        function (config) { return configService.addConfig(config); }));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    FormlyModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyConfig,
                FormlyFormBuilder,
            ],
        };
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    FormlyModule.forChild = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    };
    FormlyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FormlyForm,
                        FormlyField,
                        FormlyAttributes,
                        FormlyGroup,
                        FormlyValidationMessage,
                        FormlyTemplateType,
                        (/** @type {?} */ (FieldArrayType)),
                    ],
                    entryComponents: [FormlyGroup, FormlyTemplateType],
                    exports: [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
                    imports: [CommonModule],
                },] }
    ];
    /** @nocollapse */
    FormlyModule.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [FORMLY_CONFIG,] }] }
    ]; };
    return FormlyModule;
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

export { FormlyForm, FormlyField, FormlyAttributes, FORMLY_CONFIG, FormlyConfig, FormlyFormBuilder, FieldType, Field, FieldArrayType, FieldWrapper, FormlyModule, defineHiddenProp as ??defineHiddenProp, reverseDeepMerge as ??reverseDeepMerge, getFieldValue as ??getFieldValue, clone as ??clone, wrapProperty as ??wrapProperty, defaultFormlyConfig as ??a, CoreExtension as ??e, FieldExpressionExtension as ??h, FieldFormExtension as ??g, FieldValidationExtension as ??f, FormlyTemplateType as ??d, FormlyGroup as ??b, FormlyValidationMessage as ??c };

//# sourceMappingURL=ngx-formly-core.js.map