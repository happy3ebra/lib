import { DOCUMENT, CommonModule } from '@angular/common';
import { TemplateRef, Injectable, InjectionToken, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Inject, Optional, Component, Input, ChangeDetectionStrategy, EventEmitter, Output, Attribute, ViewChild, ElementRef, NgZone, ViewContainerRef, ComponentFactoryResolver, Renderer2, Directive, Injector, ChangeDetectorRef, defineInjectable, inject, INJECTOR } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { __rest } from 'tslib';
import { debounceTime, switchMap, distinctUntilChanged, take, startWith, filter, map } from 'rxjs/operators';
import { AbstractControl, FormArray, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { isObservable, Subject, of, merge, Observable } from 'rxjs';

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
    const _updateTreeValidity = form._updateTreeValidity.bind(form);
    form._updateTreeValidity = (/**
     * @return {?}
     */
    () => { });
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
    let type = field.type;
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
        let path = [];
        if (typeof field.key === 'string') {
            /** @type {?} */
            const key = field.key.indexOf('[') === -1
                ? field.key
                : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = [`${field.key}`];
        }
        field._keyPath = { key: field.key, path };
    }
    return field._keyPath.path.slice(0);
}
/** @type {?} */
const FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
/**
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
function assignFieldValue(field, value) {
    /** @type {?} */
    let paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    /** @type {?} */
    let root = field;
    while (root.parent) {
        root = root.parent;
        paths = [...getKeyPath(root), ...paths];
    }
    if (value === undefined && field.resetOnHide) {
        /** @type {?} */
        const k = paths.pop();
        /** @type {?} */
        const m = paths.reduce((/**
         * @param {?} model
         * @param {?} path
         * @return {?}
         */
        (model, path) => model[path] || {}), root.model);
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
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
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
    /** @type {?} */
    let model = field.parent.model;
    for (const path of getKeyPath(field)) {
        if (!model) {
            return model;
        }
        model = model[path];
    }
    return model;
}
/**
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
function reverseDeepMerge(dest, ...args) {
    args.forEach((/**
     * @param {?} src
     * @return {?}
     */
    src => {
        for (let srcArg in src) {
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
        v => clone(v)));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    /** @type {?} */
    const proto = Object.getPrototypeOf(value);
    /** @type {?} */
    let c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((/**
     * @param {?} newVal
     * @param {?} prop
     * @return {?}
     */
    (newVal, prop) => {
        /** @type {?} */
        const propDesc = Object.getOwnPropertyDescriptor(value, prop);
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
    let fns = o._observers[prop];
    if (fns.indexOf(setFn) === -1) {
        fns.push(setFn);
        setFn({ currentValue: o[prop], firstChange: true });
        if (fns.length === 1) {
            defineHiddenProp(o, `___$${prop}`, o[prop]);
            Object.defineProperty(o, prop, {
                configurable: true,
                get: (/**
                 * @return {?}
                 */
                () => o[`___$${prop}`]),
                set: (/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                currentValue => {
                    if (currentValue !== o[`___$${prop}`]) {
                        /** @type {?} */
                        const previousValue = o[`___$${prop}`];
                        o[`___$${prop}`] = currentValue;
                        fns.forEach((/**
                         * @param {?} changeFn
                         * @return {?}
                         */
                        changeFn => changeFn({ previousValue, currentValue, firstChange: false })));
                    }
                }),
            });
        }
    }
    return (/**
     * @return {?}
     */
    () => fns.splice(fns.indexOf(setFn), 1));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
/**
 * Maintains list of formly field directive types. This can be used to register new field templates.
 */
class FormlyConfig {
    constructor() {
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
    addConfig(config) {
        if (config.types) {
            config.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            type => this.setType(type)));
        }
        if (config.validators) {
            config.validators.forEach((/**
             * @param {?} validator
             * @return {?}
             */
            validator => this.setValidator(validator)));
        }
        if (config.wrappers) {
            config.wrappers.forEach((/**
             * @param {?} wrapper
             * @return {?}
             */
            wrapper => this.setWrapper(wrapper)));
        }
        if (config.manipulators) {
            console.warn(`NgxFormly: passing 'manipulators' config is deprecated, use custom extension instead.`);
            config.manipulators.forEach((/**
             * @param {?} manipulator
             * @return {?}
             */
            manipulator => this.setManipulator(manipulator)));
        }
        if (config.validationMessages) {
            config.validationMessages.forEach((/**
             * @param {?} validation
             * @return {?}
             */
            validation => this.addValidatorMessage(validation.name, validation.message)));
        }
        if (config.extensions) {
            config.extensions.forEach((/**
             * @param {?} c
             * @return {?}
             */
            c => this.extensions[c.name] = c.extension));
        }
        if (config.extras) {
            this.extras = Object.assign({}, this.extras, config.extras);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setType(options) {
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => this.setType(option)));
        }
        else {
            if (!this.types[options.name]) {
                this.types[options.name] = (/** @type {?} */ ({ name: options.name }));
            }
            ['component', 'extends', 'defaultOptions', 'wrappers'].forEach((/**
             * @param {?} prop
             * @return {?}
             */
            prop => {
                if (options.hasOwnProperty(prop)) {
                    this.types[options.name][prop] = options[prop];
                }
            }));
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getType(name) {
        if (!this.types[name]) {
            throw new Error(`[Formly Error] The type "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        this.mergeExtendedType(name);
        return this.types[name];
    }
    /**
     * @param {?=} field
     * @return {?}
     */
    getMergedField(field = {}) {
        /** @type {?} */
        const type = this.getType(field.type);
        if (type.defaultOptions) {
            reverseDeepMerge(field, type.defaultOptions);
        }
        /** @type {?} */
        const extendDefaults = type.extends && this.getType(type.extends).defaultOptions;
        if (extendDefaults) {
            reverseDeepMerge(field, extendDefaults);
        }
        if (field && field.optionsTypes) {
            field.optionsTypes.forEach((/**
             * @param {?} option
             * @return {?}
             */
            option => {
                /** @type {?} */
                const defaultOptions = this.getType(option).defaultOptions;
                if (defaultOptions) {
                    reverseDeepMerge(field, defaultOptions);
                }
            }));
        }
        /** @type {?} */
        const componentRef = this.resolveFieldTypeRef(field);
        if (componentRef && componentRef.instance && componentRef.instance.defaultOptions) {
            reverseDeepMerge(field, componentRef.instance.defaultOptions);
        }
        if (!field.wrappers && type.wrappers) {
            field.wrappers = [...type.wrappers];
        }
    }
    /**
     * \@internal
     * @param {?=} field
     * @return {?}
     */
    resolveFieldTypeRef(field = {}) {
        if (!field.type) {
            return null;
        }
        /** @type {?} */
        const type = this.getType(field.type);
        if (!type.component || type['_componentRef']) {
            return type['_componentRef'];
        }
        const { _resolver, _injector } = field.parent.options;
        /** @type {?} */
        const componentRef = _resolver
            .resolveComponentFactory(type.component)
            .create(_injector);
        defineHiddenProp(type, '_componentRef', componentRef);
        componentRef.destroy();
        return type['_componentRef'];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setWrapper(options) {
        this.wrappers[options.name] = options;
        if (options.types) {
            options.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            (type) => {
                this.setTypeWrapper(type, options.name);
            }));
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getWrapper(name) {
        if (!this.wrappers[name]) {
            throw new Error(`[Formly Error] The wrapper "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.wrappers[name];
    }
    /**
     * @param {?} type
     * @param {?} name
     * @return {?}
     */
    setTypeWrapper(type, name) {
        if (!this.types[type]) {
            this.types[type] = (/** @type {?} */ ({}));
        }
        if (!this.types[type].wrappers) {
            this.types[type].wrappers = [];
        }
        if (this.types[type].wrappers.indexOf(name) === -1) {
            this.types[type].wrappers.push(name);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setValidator(options) {
        this.validators[options.name] = options;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getValidator(name) {
        if (!this.validators[name]) {
            throw new Error(`[Formly Error] The validator "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.validators[name];
    }
    /**
     * @param {?} name
     * @param {?} message
     * @return {?}
     */
    addValidatorMessage(name, message) {
        this.messages[name] = message;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getValidatorMessage(name) {
        return this.messages[name];
    }
    /**
     * @param {?} manipulator
     * @return {?}
     */
    setManipulator(manipulator) {
        new manipulator.class()[manipulator.method](this);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    mergeExtendedType(name) {
        if (!this.types[name].extends) {
            return;
        }
        /** @type {?} */
        const extendedType = this.getType(this.types[name].extends);
        if (!this.types[name].component) {
            this.types[name].component = extendedType.component;
        }
        if (!this.types[name].wrappers) {
            this.types[name].wrappers = extendedType.wrappers;
        }
    }
}
FormlyConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ FormlyConfig.ngInjectableDef = defineInjectable({ factory: function FormlyConfig_Factory() { return new FormlyConfig(); }, token: FormlyConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFormBuilder {
    /**
     * @param {?} formlyConfig
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    constructor(formlyConfig, componentFactoryResolver, injector) {
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
    buildForm(formControl, fieldGroup = [], model, options) {
        if (!this.formlyConfig.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        /** @type {?} */
        const field = { fieldGroup, model, formControl, options: this._setOptions(options) };
        disableTreeValidityCall(formControl, (/**
         * @return {?}
         */
        () => {
            this._buildForm(field);
            field.options._checkField(field, true);
        }));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    _buildForm(field) {
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.prePopulate && extension.prePopulate(field)));
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.onPopulate && extension.onPopulate(field)));
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => this._buildForm(f)));
        }
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.postPopulate && extension.postPopulate(field)));
    }
    /**
     * @private
     * @return {?}
     */
    getExtensions() {
        return Object.keys(this.formlyConfig.extensions).map((/**
         * @param {?} name
         * @return {?}
         */
        name => this.formlyConfig.extensions[name]));
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    _setOptions(options) {
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
            (field) => {
                if (field._componentRefs) {
                    field._componentRefs.forEach((/**
                     * @param {?} ref
                     * @return {?}
                     */
                    ref => {
                        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                        /** @type {?} */
                        const changeDetectorRef = ref.injector.get(ChangeDetectorRef);
                        changeDetectorRef.markForCheck();
                    }));
                }
                if (field.fieldGroup) {
                    field.fieldGroup.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => options._markForCheck(f)));
                }
            });
        }
        if (!options._buildField) {
            options._buildField = (/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                this._setOptions(field.options);
                this._buildForm(field);
                ((/** @type {?} */ (field.options)))._checkField(field, true);
                return field;
            });
        }
        return options;
    }
}
FormlyFormBuilder.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
FormlyFormBuilder.ctorParameters = () => [
    { type: FormlyConfig },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
/** @nocollapse */ FormlyFormBuilder.ngInjectableDef = defineInjectable({ factory: function FormlyFormBuilder_Factory() { return new FormlyFormBuilder(inject(FormlyConfig), inject(ComponentFactoryResolver), inject(INJECTOR)); }, token: FormlyFormBuilder, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @param {?=} emitEvent
 * @return {?}
 */
function unregisterControl(field, emitEvent = false) {
    /** @type {?} */
    const control = field.formControl;
    /** @type {?} */
    const fieldIndex = control['_fields'] ? control['_fields'].indexOf(field) : -1;
    if (fieldIndex !== -1) {
        control['_fields'].splice(fieldIndex, 1);
    }
    /** @type {?} */
    const form = (/** @type {?} */ (control.parent));
    if (!form) {
        return;
    }
    /** @type {?} */
    const opts = { emitEvent };
    if (form instanceof FormArray) {
        /** @type {?} */
        const key = form.controls.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        c => c === control));
        if (key !== -1) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeAt(key)));
        }
    }
    else if (form instanceof FormGroup) {
        /** @type {?} */
        const paths = getKeyPath(field);
        /** @type {?} */
        const key = paths[paths.length - 1];
        if (form.get([key]) === control) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeControl(key)));
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
    const form = (/** @type {?} */ (field.parent.formControl));
    return form ? form.get(getKeyPath(field)) : null;
}
/**
 * @param {?} field
 * @param {?=} control
 * @param {?=} emitEvent
 * @return {?}
 */
function registerControl(field, control, emitEvent = false) {
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
        ({ firstChange, currentValue }) => {
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        }));
        if (control.registerOnDisabledChange) {
            control.registerOnDisabledChange((/**
             * @param {?} value
             * @return {?}
             */
            (value) => {
                field.templateOptions['___$disabled'] = value;
                // TODO remove in V6
                field.options && field.options._markForCheck(field);
            }));
        }
    }
    /** @type {?} */
    let parent = (/** @type {?} */ (field.parent.formControl));
    if (!parent || !field.key) {
        return;
    }
    /** @type {?} */
    const paths = getKeyPath(field);
    /** @type {?} */
    const value = getFieldValue(field);
    if (!(isNullOrUndefined(control.value) && isNullOrUndefined(value))
        && control.value !== value
        && control instanceof FormControl) {
        control.patchValue(value);
    }
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
        if (!parent.get([path])) {
            updateControl(parent, { emitEvent }, (/**
             * @return {?}
             */
            () => parent.setControl(path, new FormGroup({}))));
        }
        parent = (/** @type {?} */ (parent.get([path])));
    }
    /** @type {?} */
    const key = paths[paths.length - 1];
    if (!field._hide && parent.get([key]) !== control) {
        updateControl(parent, { emitEvent }, (/**
         * @return {?}
         */
        () => parent.setControl(key, control)));
    }
}
/**
 * @param {?} c
 * @param {?=} onlySelf
 * @return {?}
 */
function updateValidity(c, onlySelf = false) {
    /** @type {?} */
    const status = c.status;
    /** @type {?} */
    const value = c.value;
    c.updateValueAndValidity({ emitEvent: false, onlySelf });
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
        (cb) => {
            Object
                .keys(form.controls)
                .forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => form.controls[k] && cb(form.controls[k], k)));
        });
    }
    /**
     * workaround for https://github.com/angular/angular/issues/20439
     * @type {?}
     */
    const updateValueAndValidity = form.updateValueAndValidity.bind(form);
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = (/**
         * @param {?} opts
         * @return {?}
         */
        (opts) => {
            updateValueAndValidity(Object.assign({}, (opts || {}), { emitEvent: false }));
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
        (k) => clearControl(form.controls[k])));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyForm {
    /**
     * @param {?} formlyBuilder
     * @param {?} formlyConfig
     * @param {?} ngZone
     * @param {?} immutable
     * @param {?} parentFormGroup
     */
    constructor(formlyBuilder, formlyConfig, ngZone, 
    // tslint:disable-next-line
    immutable, parentFormGroup) {
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
        () => this.ngZone.onStable.asObservable().pipe(take(1))))).subscribe((/**
         * @return {?}
         */
        () => this.ngZone.runGuarded((/**
         * @return {?}
         */
        () => {
            // runGuarded is used to keep the expression changes in-sync
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            this.modelChange.emit(this._modelChangeValue = clone(this.model));
        }))));
        if (immutable !== null) {
            console.warn(`NgxFormly: passing 'immutable' attribute to 'formly-form' component is deprecated since v5.5, enable immutable mode through NgModule declaration instead.`);
        }
        this.immutable = (immutable !== null) || !!formlyConfig.extras.immutable;
    }
    /**
     * @param {?} model
     * @return {?}
     */
    set model(model) { this._model = this.immutable ? clone(model) : model; }
    /**
     * @return {?}
     */
    get model() {
        if (!this._model) {
            this._model = {};
        }
        return this._model;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    set fields(fields) { this._fields = this.immutable ? clone(fields) : fields; }
    /**
     * @return {?}
     */
    get fields() { return this._fields || []; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { this._options = this.immutable ? clone(options) : options; }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @param {?} content
     * @return {?}
     */
    set content(content) {
        if (content) {
            /** @type {?} */
            let hasContent = false;
            /** @type {?} */
            let node = content.nativeElement.nextSibling;
            while (node && !hasContent) {
                if (node.nodeType === Node.ELEMENT_NODE
                    || node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== '') {
                    hasContent = true;
                }
                node = node.nextSibling;
            }
            if (hasContent) {
                console.warn(`NgxFormly: content projection for 'formly-form' component is deprecated since v5.5, you should avoid passing content inside the 'formly-form' tag.`);
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.formlyConfig.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.modelChangeSub.unsubscribe();
        this.clearModelSubscriptions();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    changeModel({ key, value, field }) {
        assignFieldValue(field, value);
        this.modelChange$.next();
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.resetModel) {
            this.options.resetModel = (/**
             * @param {?=} model
             * @return {?}
             */
            (model) => {
                model = clone(isNullOrUndefined(model) ? ((/** @type {?} */ (this.options)))._initialModel : model);
                if (this.model) {
                    Object.keys(this.model).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    k => delete this.model[k]));
                    Object.assign(this.model, model || {});
                }
                ((/** @type {?} */ (this.options)))._buildForm();
                // we should call `NgForm::resetForm` to ensure changing `submitted` state after resetting form
                // but only when the current component is a root one.
                if (this.options.parentForm && this.options.parentForm.control === this.form) {
                    this.options.parentForm.resetForm(this.model);
                }
                else {
                    this.form.reset(this.model);
                }
            });
        }
        if (!this.options.parentForm && this.parentFormGroup) {
            defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
            wrapProperty(this.options.parentForm, 'submitted', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange }) => {
                if (!firstChange) {
                    this.checkExpressionChange();
                    ((/** @type {?} */ (this.options)))._markForCheck({
                        fieldGroup: this.fields,
                        model: this.model,
                        formControl: this.form,
                        options: this.options,
                    });
                }
            }));
        }
        if (!this.options.updateInitialValue) {
            this.options.updateInitialValue = (/**
             * @return {?}
             */
            () => ((/** @type {?} */ (this.options)))._initialModel = clone(this.model));
        }
        if (!((/** @type {?} */ (this.options)))._buildForm) {
            ((/** @type {?} */ (this.options)))._buildForm = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            (emitModelChange = false) => {
                this.clearModelSubscriptions();
                this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
                this.trackModelChanges(this.fields);
                if (emitModelChange) {
                    this.modelChange.emit(this._modelChangeValue = clone(this.model));
                }
            });
        }
        if (!((/** @type {?} */ (this.options)))._trackModelChanges) {
            ((/** @type {?} */ (this.options)))._trackModelChanges = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            (emitModelChange = false) => {
                this.clearModelSubscriptions();
                this.trackModelChanges(this.fields);
                if (emitModelChange) {
                    this.modelChange.emit(this._modelChangeValue = clone(this.model));
                }
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkExpressionChange() {
        if (this.options && ((/** @type {?} */ (this.options)))._checkField) {
            ((/** @type {?} */ (this.options)))._checkField({
                fieldGroup: this.fields,
                model: this.model,
                formControl: this.form,
                options: this.options,
            });
        }
    }
    /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    trackModelChanges(fields, rootKey = []) {
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (field.key && !field.fieldGroup && field.formControl) {
                /** @type {?} */
                const control = field.formControl;
                /** @type {?} */
                let valueChanges = control.valueChanges.pipe(distinctUntilChanged((/**
                 * @param {?} x
                 * @param {?} y
                 * @return {?}
                 */
                (x, y) => {
                    if (x !== y || Array.isArray(x) || isObject(x)) {
                        return false;
                    }
                    return true;
                })));
                const { updateOn, debounce } = field.modelOptions;
                if ((!updateOn || updateOn === 'change') && debounce && debounce.default > 0) {
                    valueChanges = control.valueChanges.pipe(debounceTime(debounce.default));
                }
                this.modelChangeSubs.push(valueChanges.subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    // workaround for https://github.com/angular/angular/issues/13792
                    if (control instanceof FormControl && control['_fields'] && control['_fields'].length > 1) {
                        control.patchValue(value, { emitEvent: false, onlySelf: true });
                    }
                    if (field.parsers && field.parsers.length > 0) {
                        field.parsers.forEach((/**
                         * @param {?} parserFn
                         * @return {?}
                         */
                        parserFn => value = parserFn(value)));
                    }
                    this.changeModel({ key: [...rootKey, ...getKeyPath(field)].join('.'), value, field });
                })));
                // workaround for v5 (https://github.com/ngx-formly/ngx-formly/issues/2061)
                /** @type {?} */
                const observers = control.valueChanges['observers'];
                if (observers && observers.length > 1) {
                    observers.unshift(observers.pop());
                }
            }
            if (field.fieldGroup && field.fieldGroup.length > 0) {
                this.trackModelChanges(field.fieldGroup, field.key ? [...rootKey, ...getKeyPath(field)] : rootKey);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    clearModelSubscriptions() {
        this.modelChangeSubs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.modelChangeSubs = [];
    }
    /**
     * @private
     * @return {?}
     */
    get field() {
        return this.fields && this.fields[0] && this.fields[0].parent;
    }
}
FormlyForm.decorators = [
    { type: Component, args: [{
                selector: 'formly-form',
                template: `
    <formly-field *ngFor="let field of fields"
      hide-deprecation
      [form]="field.form"
      [options]="field.options"
      [model]="field.model"
      [field]="field">
    </formly-field>
    <ng-container #content>
      <ng-content></ng-content>
    </ng-container>
  `,
                providers: [FormlyFormBuilder]
            }] }
];
/** @nocollapse */
FormlyForm.ctorParameters = () => [
    { type: FormlyFormBuilder },
    { type: FormlyConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Attribute, args: ['immutable',] }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] }
];
FormlyForm.propDecorators = {
    form: [{ type: Input }],
    model: [{ type: Input }],
    fields: [{ type: Input }],
    options: [{ type: Input }],
    modelChange: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyField {
    /**
     * @param {?} formlyConfig
     * @param {?} renderer
     * @param {?} resolver
     * @param {?} elementRef
     * @param {?} hideDeprecation
     */
    constructor(formlyConfig, renderer, resolver, elementRef, 
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
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.triggerHook('afterContentInit');
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.triggerHook('afterContentChecked');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.triggerHook('afterViewInit');
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.triggerHook('afterViewChecked');
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.triggerHook('doCheck');
        if (this.detectFieldBuild && (this.field && this.field.options)) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.triggerHook('onInit');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.triggerHook('onChanges', changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resetRefs(this.field);
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.hooksObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.triggerHook('onDestroy');
    }
    /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    renderField(containerRef, f, wrappers = []) {
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field ? this.field.wrappers : [];
        }
        if (wrappers && wrappers.length > 0) {
            const [wrapper, ...wps] = wrappers;
            const { component } = this.formlyConfig.getWrapper(wrapper);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
            wrapProperty(ref.instance, 'fieldComponent', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, previousValue, currentValue }) => {
                if (currentValue) {
                    if (previousValue && previousValue['_lContainer'] === currentValue['_lContainer']) {
                        return;
                    }
                    /** @type {?} */
                    const viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        this.renderField(currentValue, f, wps);
                    }
                    !firstChange && ref.changeDetectorRef.detectChanges();
                }
            }));
        }
        else if (f && f.type) {
            const { component } = this.formlyConfig.getType(f.type);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
        }
    }
    /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    triggerHook(name, changes) {
        if (this.field && this.field.hooks && this.field.hooks[name]) {
            if (!changes || changes.field) {
                /** @type {?} */
                const r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    /** @type {?} */
                    const sub = r.subscribe();
                    this.hooksObservers.push((/**
                     * @return {?}
                     */
                    () => sub.unsubscribe()));
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
    }
    /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    attachComponentRef(ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        Object.assign(ref.instance, { field });
    }
    /**
     * @private
     * @return {?}
     */
    render() {
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
        unsubscribe => unsubscribe()));
        this.hostObservers = [
            wrapProperty(this.field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if (!firstChange || (firstChange && currentValue)) {
                    this.renderer.setStyle(this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                }
                if (!this.formlyConfig.extras.lazyRender) {
                    firstChange && this.renderField(this.containerRef, this.field);
                }
                else {
                    if (currentValue) {
                        this.containerRef.clear();
                        if (this.field.className) {
                            this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        this.renderField(this.containerRef, this.field);
                        if (this.field.className) {
                            this.renderer.setAttribute(this.elementRef.nativeElement, 'class', this.field.className);
                        }
                    }
                }
            })),
            wrapProperty(this.field, 'className', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if ((!firstChange || (firstChange && currentValue))
                    && (!this.formlyConfig.extras.lazyRender || (this.field.hide !== true))) {
                    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', currentValue);
                }
            })),
        ];
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    resetRefs(field) {
        if (field) {
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((/**
                 * @param {?} ref
                 * @return {?}
                 */
                ref => this.componentRefs.indexOf(ref) === -1));
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    }
}
FormlyField.decorators = [
    { type: Component, args: [{
                selector: 'formly-field',
                template: `<ng-template #container></ng-template>`
            }] }
];
/** @nocollapse */
FormlyField.ctorParameters = () => [
    { type: FormlyConfig },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Attribute, args: ['hide-deprecation',] }] }
];
FormlyField.propDecorators = {
    field: [{ type: Input }],
    model: [{ type: Input }],
    form: [{ type: Input }],
    options: [{ type: Input }],
    modelChange: [{ type: Output }],
    containerRef: [{ type: ViewChild, args: ['container', (/** @type {?} */ ({ read: ViewContainerRef, static: true })),] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyAttributes {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(renderer, elementRef, _document) {
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
            (eventName, $event) => {
                switch (eventName) {
                    case 'focus':
                        return this.onFocus($event);
                    case 'blur':
                        return this.onBlur($event);
                    case 'change':
                        return this.onChange($event);
                    default:
                        return this.to[eventName](this.field, $event);
                }
            }),
        };
        this.document = _document;
    }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @private
     * @return {?}
     */
    get fieldAttrElements() { return (this.field && this.field['_elementRefs']) || []; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            (listener) => listener()));
            this.uiEvents.events.forEach((/**
             * @param {?} eventName
             * @return {?}
             */
            (eventName) => {
                if ((this.to && this.to[eventName]) || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (/**
                     * @param {?} e
                     * @return {?}
                     */
                    (e) => this.uiEvents.callback(eventName, e))));
                }
            }));
            if (this.to && this.to.attributes) {
                wrapProperty(this.to, 'attributes', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => this.removeAttribute(attr)));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => {
                            if (currentValue[attr] != null) {
                                this.setAttribute(attr, currentValue[attr]);
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
                ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                }));
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    ngDoCheck() {
        if (!this.uiAttributes) {
            /** @type {?} */
            const element = (/** @type {?} */ (this.elementRef.nativeElement));
            this.uiAttributes = [...FORMLY_VALIDATORS, 'tabindex', 'placeholder', 'readonly', 'disabled', 'step'].filter((/**
             * @param {?} attr
             * @return {?}
             */
            (attr) => !element.hasAttribute || !element.hasAttribute(attr)));
        }
        this.uiAttributes.forEach((/**
         * @param {?} attr
         * @return {?}
         */
        attr => {
            /** @type {?} */
            const value = this.to[attr];
            if (this.uiAttributesCache[attr] !== value
                && (!this.to.attributes || !this.to.attributes.hasOwnProperty(attr.toLowerCase()))) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((/**
         * @param {?} listener
         * @return {?}
         */
        listener => listener()));
        this.detachElementRef(this.field);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toggleFocus(value) {
        /** @type {?} */
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        /** @type {?} */
        const isFocused = !!this.document.activeElement
            && this.fieldAttrElements
                .some((/**
             * @param {?} __0
             * @return {?}
             */
            ({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement)));
        if (value && !isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => element.nativeElement.focus()));
        }
        else if (!value && isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => element.nativeElement.blur()));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFocus($event) {
        this.field['___$focus'] = true;
        if (this.to.focus) {
            this.to.focus(this.field, $event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        this.field['___$focus'] = false;
        if (this.to.blur) {
            this.to.blur(this.field, $event);
        }
    }
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    onHostChange($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
        if (this.field.formControl) {
            this.field.formControl.markAsDirty();
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs'] && f['_elementRefs'].indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    detachElementRef(f) {
        /** @type {?} */
        const index = f && f['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            this.field['_elementRefs'].splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.decorators = [
    { type: Directive, args: [{
                selector: '[formlyAttributes]',
                host: {
                    '(change)': 'onHostChange($event)',
                },
            },] }
];
/** @nocollapse */
FormlyAttributes.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
FormlyAttributes.propDecorators = {
    field: [{ type: Input, args: ['formlyAttributes',] }],
    id: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldType {
    /**
     * @return {?}
     */
    get model() { return this.field.model; }
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) { console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get form() { return (/** @type {?} */ (this.field.parent.formControl)); }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) { console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get options() { return this.field.options; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`); }
    /**
     * @return {?}
     */
    get key() { return this.field.key; }
    /**
     * @return {?}
     */
    get formControl() { return (/** @type {?} */ (this.field.formControl)); }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @return {?}
     */
    get showError() { return this.options.showError(this); }
    /**
     * @return {?}
     */
    get id() { return this.field.id; }
    /**
     * @return {?}
     */
    get formState() { return this.options.formState || {}; }
}
FieldType.propDecorators = {
    field: [{ type: Input }],
    model: [{ type: Input }],
    form: [{ type: Input }],
    options: [{ type: Input }]
};
/**
 * @deprecated use `FieldType` instead
 * @abstract
 */
class Field extends FieldType {
    constructor() {
        super();
        console.warn(`NgxFormly: 'Field' has been renamed to 'FieldType', extend 'FieldType' instead.`);
    }
}

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
class FieldArrayType extends FieldType {
    /**
     * @param {?=} builder
     */
    constructor(builder) {
        super();
        this.defaultOptions = {
            defaultValue: [],
        };
        if (builder instanceof FormlyFormBuilder) {
            console.warn(`NgxFormly: passing 'FormlyFormBuilder' to '${this.constructor.name}' type is not required anymore, you may remove it!`);
        }
    }
    /**
     * @return {?}
     */
    get formControl() {
        return (/** @type {?} */ (this.field.formControl));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.formControl && field.key) {
            /** @type {?} */
            const control = findControl(field);
            registerControl(field, control ? control : new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        /** @type {?} */
        const length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (let i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i], true);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (let i = field.fieldGroup.length; i < length; i++) {
            /** @type {?} */
            const f = Object.assign({}, clone(field.fieldArray), { key: `${i}` });
            field.fieldGroup.push(f);
        }
    }
    /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    add(i, initialModel, { markAsDirty } = { markAsDirty: true }) {
        i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    }
    /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    remove(i, { markAsDirty } = { markAsDirty: true }) {
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((/**
         * @param {?} f
         * @param {?} key
         * @return {?}
         */
        (f, key) => f.key = `${key}`));
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    }
    /**
     * @private
     * @return {?}
     */
    _build() {
        ((/** @type {?} */ (this.options)))._buildField(this.field);
        ((/** @type {?} */ (this.options)))._trackModelChanges(true);
    }
}
FieldArrayType.decorators = [
    { type: Directive, args: [{ selector: '[??fieldArray]' },] }
];
/** @nocollapse */
FieldArrayType.ctorParameters = () => [
    { type: FormlyFormBuilder, decorators: [{ type: Inject, args: [FORMLY_CONFIG,] }, { type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template F
 */
class FieldWrapper extends FieldType {
}
FieldWrapper.propDecorators = {
    fieldComponent: [{ type: ViewChild, args: ['fieldComponent', (/** @type {?} */ ({ read: ViewContainerRef, static: false })),] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyGroup extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            defaultValue: {},
        };
    }
}
FormlyGroup.decorators = [
    { type: Component, args: [{
                selector: 'formly-group',
                template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `,
                host: {
                    '[class]': 'field.fieldGroupClassName || ""',
                }
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyValidationMessage {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const EXPR_VALIDATORS = FORMLY_VALIDATORS.map((/**
         * @param {?} v
         * @return {?}
         */
        v => `templateOptions.${v}`));
        this.errorMessage$ = merge(this.field.formControl.statusChanges, (!this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ field, type, property }) => {
                return (field === this.field)
                    && (type === 'expressionChanges')
                    && ((property.indexOf('validation') !== -1)
                        || (EXPR_VALIDATORS.indexOf(property) !== -1));
            }))))).pipe(startWith(null), switchMap((/**
         * @return {?}
         */
        () => isObservable(this.errorMessage)
            ? this.errorMessage
            : of(this.errorMessage))));
    }
    /**
     * @return {?}
     */
    get errorMessage() {
        /** @type {?} */
        const fieldForm = this.field.formControl;
        for (let error in fieldForm.errors) {
            if (fieldForm.errors.hasOwnProperty(error)) {
                /** @type {?} */
                let message = this.formlyConfig.getValidatorMessage(error);
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
    }
}
FormlyValidationMessage.decorators = [
    { type: Component, args: [{
                selector: 'formly-validation-message',
                template: `{{ errorMessage$ | async }}`,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
FormlyValidationMessage.ctorParameters = () => [
    { type: FormlyConfig }
];
FormlyValidationMessage.propDecorators = {
    field: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyTemplateType extends FieldType {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        super();
        this.sanitizer = sanitizer;
        this.innerHtml = { content: null, template: null };
    }
    /**
     * @return {?}
     */
    get template() {
        if (this.field && (this.field.template !== this.innerHtml.template)) {
            this.innerHtml = {
                template: this.field.template,
                content: this.to.safeHtml
                    ? this.sanitizer.bypassSecurityTrustHtml(this.field.template)
                    : this.field.template,
            };
        }
        return this.innerHtml.content;
    }
}
FormlyTemplateType.decorators = [
    { type: Component, args: [{
                selector: 'formly-template',
                template: `<div [innerHtml]="template"></div>`
            }] }
];
/** @nocollapse */
FormlyTemplateType.ctorParameters = () => [
    { type: DomSanitizer }
];

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
            console.warn(`NgxFormly: using 'this.field' in expressionProperties is deprecated since v5.1, use 'field' instead.`);
        }
        return (/** @type {?} */ (Function(...argNames, `return ${expression};`)));
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
class FieldExpressionExtension {
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        if (field.parent || field.options._checkField) {
            return;
        }
        /** @type {?} */
        let checkLocked = false;
        field.options._checkField = (/**
         * @param {?} f
         * @param {?} ignoreCache
         * @return {?}
         */
        (f, ignoreCache) => {
            if (!checkLocked) {
                checkLocked = true;
                this.checkField(f, ignoreCache);
                checkLocked = false;
            }
        });
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        if (!field.parent || field._expressionProperties) {
            return;
        }
        // cache built expression
        defineHiddenProp(field, '_expressionProperties', {});
        if (field.expressionProperties) {
            for (const key in field.expressionProperties) {
                /** @type {?} */
                const expressionProperty = field.expressionProperties[key];
                if (typeof expressionProperty === 'string' || isFunction(expressionProperty)) {
                    field._expressionProperties[key] = {
                        expression: this._evalExpression(key, expressionProperty, key === 'templateOptions.disabled' && field.parent.expressionProperties && field.parent.expressionProperties.hasOwnProperty('templateOptions.disabled')
                            ? (/**
                             * @return {?}
                             */
                            () => field.parent.templateOptions.disabled)
                            : undefined),
                    };
                    if (key === 'templateOptions.disabled') {
                        Object.defineProperty(field._expressionProperties[key], 'expressionValue', {
                            get: (/**
                             * @return {?}
                             */
                            () => field.templateOptions.disabled),
                            set: (/**
                             * @return {?}
                             */
                            () => { }),
                            enumerable: true,
                            configurable: true,
                        });
                    }
                }
                else if (expressionProperty instanceof Observable) {
                    /** @type {?} */
                    const subscribe = (/**
                     * @return {?}
                     */
                    () => ((/** @type {?} */ (expressionProperty)))
                        .subscribe((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        this.setExprValue(field, key, v);
                        if (field.options && field.options._markForCheck) {
                            field.options._markForCheck(field);
                        }
                    })));
                    /** @type {?} */
                    let subscription = subscribe();
                    /** @type {?} */
                    const onInit = field.hooks.onInit;
                    field.hooks.onInit = (/**
                     * @return {?}
                     */
                    () => {
                        if (subscription === null) {
                            subscription = subscribe();
                        }
                        return onInit && onInit(field);
                    });
                    /** @type {?} */
                    const onDestroy = field.hooks.onDestroy;
                    field.hooks.onDestroy = (/**
                     * @return {?}
                     */
                    () => {
                        onDestroy && onDestroy(field);
                        subscription.unsubscribe();
                        subscription = null;
                    });
                }
            }
        }
        if (field.hideExpression) {
            // delete hide value in order to force re-evaluate it in FormlyFormExpression.
            delete field.hide;
            field.hideExpression = this._evalExpression('hide', field.hideExpression, (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let root = field.parent;
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
            ({ currentValue, firstChange }) => {
                field._hide = currentValue;
                if (!firstChange || (firstChange && currentValue === true)) {
                    field.options._hiddenFieldsForCheck.push(field);
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} prop
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    _evalExpression(prop, expression, parentExpression) {
        return (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => {
            try {
                if (typeof expression === 'string') {
                    expression = evalStringExpression(expression, ['model', 'formState', 'field']);
                }
                if (typeof expression !== 'function') {
                    expression = (/**
                     * @return {?}
                     */
                    () => !!expression);
                }
                return (parentExpression && parentExpression()) || expression(...args);
            }
            catch (error) {
                error.message = `[Formly Error] [Expression "${prop}"] ${error.message}`;
                throw error;
            }
        });
    }
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @return {?}
     */
    _evalExpressionPath(field, prop) {
        if (field._expressionProperties[prop] && field._expressionProperties[prop].expressionPaths) {
            return field._expressionProperties[prop].expressionPaths;
        }
        /** @type {?} */
        let paths = [];
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
            p => p))
                .forEach(((/**
             * @param {?} path
             * @return {?}
             */
            path => {
                /** @type {?} */
                const arrayPath = path.match(/['|"](.*?)['|"]/);
                if (arrayPath) {
                    paths.push(arrayPath[1]);
                }
                else {
                    paths.push(...path.split('.').filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => p)));
                }
            })));
        }
        if (field._expressionProperties[prop]) {
            field._expressionProperties[prop].expressionPaths = paths;
        }
        return paths;
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    checkField(field, ignoreCache = false) {
        /** @type {?} */
        const fieldChanged = this._checkField(field, ignoreCache);
        field.options._hiddenFieldsForCheck
            .sort((/**
         * @param {?} f
         * @return {?}
         */
        f => f.hide ? -1 : 1))
            .forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => this.toggleFormControl(f, !!f.hide, !ignoreCache)));
        field.options._hiddenFieldsForCheck = [];
        if (fieldChanged) {
            this.checkField(field);
            if (field.options && field.options._markForCheck) {
                field.options._markForCheck(field);
            }
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    _checkField(field, ignoreCache = false) {
        /** @type {?} */
        let fieldChanged = false;
        field.fieldGroup.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            if (!f.options) {
                return;
            }
            this.checkFieldExpressionChange(f, ignoreCache) && (fieldChanged = true);
            if (this.checkFieldVisibilityChange(f, ignoreCache)) {
                field.options._hiddenFieldsForCheck.push(f);
                fieldChanged = true;
            }
            if (f.fieldGroup && f.fieldGroup.length > 0) {
                this._checkField(f, ignoreCache) && (fieldChanged = true);
            }
        }));
        return fieldChanged;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    checkFieldExpressionChange(field, ignoreCache) {
        if (!field || !field._expressionProperties) {
            return false;
        }
        /** @type {?} */
        let markForCheck = false;
        /** @type {?} */
        const expressionProperties = field._expressionProperties;
        for (const key in expressionProperties) {
            /** @type {?} */
            let expressionValue = evalExpression(expressionProperties[key].expression, { field }, [field.model, field.options.formState, field, ignoreCache]);
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
    }
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    checkFieldVisibilityChange(field, ignoreCache) {
        if (!field || isNullOrUndefined(field.hideExpression)) {
            return false;
        }
        /** @type {?} */
        const hideExpressionResult = !!evalExpression(field.hideExpression, { field }, [field.model, field.options.formState, field, ignoreCache]);
        /** @type {?} */
        let markForCheck = false;
        if (hideExpressionResult !== field.hide || ignoreCache) {
            markForCheck = true;
            // toggle hide
            field.hide = hideExpressionResult;
            field.templateOptions.hidden = hideExpressionResult;
        }
        return markForCheck;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    setDisabledState(field, value) {
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.expressionProperties || !f.expressionProperties.hasOwnProperty('templateOptions.disabled')))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => this.setDisabledState(f, value)));
        }
        if (field.key && field.templateOptions.disabled !== value) {
            field.templateOptions.disabled = value;
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    toggleFormControl(field, hide, resetOnHide) {
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.hideExpression))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => this.toggleFormControl(f, hide, resetOnHide)));
        }
        if (field.formControl && field.key) {
            defineHiddenProp(field, '_hide', !!(hide || field.hide));
            /** @type {?} */
            const c = field.formControl;
            if (c['_fields'] && c['_fields'].length > 1) {
                updateValidity(c);
            }
            if (hide === true && (!c['_fields'] || c['_fields'].every((/**
             * @param {?} f
             * @return {?}
             */
            f => !!f._hide)))) {
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
            field.options.fieldChanges.next((/** @type {?} */ ({ field, type: 'hidden', value: hide })));
        }
    }
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    setExprValue(field, prop, value) {
        try {
            /** @type {?} */
            let target = field;
            /** @type {?} */
            const paths = this._evalExpressionPath(field, prop);
            /** @type {?} */
            const lastIndex = paths.length - 1;
            for (let i = 0; i < lastIndex; i++) {
                target = target[paths[i]];
            }
            target[paths[lastIndex]] = value;
        }
        catch (error) {
            error.message = `[Formly Error] [Expression "${prop}"] ${error.message}`;
            throw error;
        }
        if (prop === 'templateOptions.disabled' && field.key) {
            this.setDisabledState(field, value);
        }
        if (prop.indexOf('model.') === 0) {
            /** @type {?} */
            const path = prop.replace(/^model\./, '');
            /** @type {?} */
            const control = field.key && prop === path ? field.formControl : field.parent.formControl.get(path);
            if (control
                && !(isNullOrUndefined(control.value) && isNullOrUndefined(value))
                && control.value !== value) {
                control.patchValue(value);
            }
        }
        this.emitExpressionChanges(field, prop, value);
    }
    /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    emitExpressionChanges(field, property, value) {
        if (!field.options.fieldChanges) {
            return;
        }
        field.options.fieldChanges.next({
            field: field,
            type: 'expressionChanges',
            property,
            value,
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class FieldValidationExtension {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        this.initFieldValidation(field, 'validators');
        this.initFieldValidation(field, 'asyncValidators');
    }
    /**
     * @private
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    initFieldValidation(field, type) {
        /** @type {?} */
        const validators = [];
        if (type === 'validators' && !(field.hasOwnProperty('fieldGroup') && !field.key)) {
            validators.push(this.getPredefinedFieldValidation(field));
        }
        if (field[type]) {
            for (const validatorName in field[type]) {
                if (validatorName === 'validation' && !Array.isArray(field[type].validation)) {
                    field[type].validation = [field[type].validation];
                    console.warn(`NgxFormly(${field.key}): passing a non array value to the 'validation' is deprecated, pass an array instead`);
                }
                validatorName === 'validation'
                    ? validators.push(...field[type].validation.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => this.wrapNgValidatorFn(field, v))))
                    : validators.push(this.wrapNgValidatorFn(field, field[type][validatorName], validatorName));
            }
        }
        defineHiddenProp(field, '_' + type, validators);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    getPredefinedFieldValidation(field) {
        /** @type {?} */
        let VALIDATORS = [];
        FORMLY_VALIDATORS.forEach((/**
         * @param {?} opt
         * @return {?}
         */
        opt => wrapProperty(field.templateOptions, opt, (/**
         * @param {?} __0
         * @return {?}
         */
        ({ currentValue, firstChange }) => {
            VALIDATORS = VALIDATORS.filter((/**
             * @param {?} o
             * @return {?}
             */
            o => o !== opt));
            if (currentValue != null && currentValue !== false) {
                VALIDATORS.push(opt);
            }
            if (!firstChange && field.formControl) {
                updateValidity(field.formControl);
            }
        }))));
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (VALIDATORS.length === 0) {
                return null;
            }
            return Validators.compose(VALIDATORS.map((/**
             * @param {?} opt
             * @return {?}
             */
            opt => (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const value = field.templateOptions[opt];
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
            }))))(control);
        });
    }
    /**
     * @private
     * @param {?} field
     * @param {?} validator
     * @param {?=} validatorName
     * @return {?}
     */
    wrapNgValidatorFn(field, validator, validatorName) {
        /** @type {?} */
        let validatorOption = null;
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
            const { expression } = validator, options = __rest(validator, ["expression"]);
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
        (control) => {
            /** @type {?} */
            const errors = validatorOption.validation(control, field, validatorOption.options);
            if (isPromise(errors)) {
                return errors.then((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption)));
            }
            if (isObservable(errors)) {
                return errors.pipe(map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => this.handleAsyncResult(field, validatorName ? !!v : v, validatorOption))));
            }
            return this.handleResult(field, validatorName ? !!errors : errors, validatorOption);
        });
    }
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} options
     * @return {?}
     */
    handleAsyncResult(field, errors, options) {
        // workaround for https://github.com/angular/angular/issues/13200
        if (field.options && field.options._markForCheck) {
            field.options._markForCheck(field);
        }
        return this.handleResult(field, errors, options);
    }
    /**
     * @private
     * @param {?} field
     * @param {?} errors
     * @param {?} __2
     * @return {?}
     */
    handleResult(field, errors, { name, options }) {
        if (typeof errors === 'boolean') {
            errors = errors ? null : { [name]: options ? options : true };
        }
        /** @type {?} */
        const ctrl = field.formControl;
        ctrl['_childrenErrors'] && ctrl['_childrenErrors'][name] && ctrl['_childrenErrors'][name]();
        if (isObject(errors)) {
            Object.keys(errors).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                /** @type {?} */
                const errorPath = errors[name].errorPath
                    ? errors[name].errorPath
                    : (options || {}).errorPath;
                /** @type {?} */
                const childCtrl = errorPath ? field.formControl.get(errorPath) : null;
                if (childCtrl) {
                    const _a = errors[name], opts = __rest(_a, ["errorPath"]);
                    childCtrl.setErrors(Object.assign({}, (childCtrl.errors || {}), { [name]: opts }));
                    !ctrl['_childrenErrors'] && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl['_childrenErrors'][name] = (/**
                     * @return {?}
                     */
                    () => {
                        const _a = childCtrl.errors || {}, _b = name, toDelete = _a[_b], childErrors = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                        childCtrl.setErrors(Object.keys(childErrors).length === 0 ? null : childErrors);
                    });
                }
            }));
        }
        return errors;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class FieldFormExtension {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        if (!this.root) {
            this.root = field;
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.parent) {
            return;
        }
        if (field.fieldGroup && !field.key) {
            defineHiddenProp(field, 'formControl', field.parent.formControl);
        }
        else {
            this.addFormControl(field);
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        if (this.root !== field) {
            return;
        }
        this.root = null;
        this.setValidators(field);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    addFormControl(field) {
        /** @type {?} */
        let control = findControl(field);
        if (!control) {
            /** @type {?} */
            const controlOptions = { updateOn: field.modelOptions.updateOn };
            /** @type {?} */
            const value = field.key ? getFieldValue(field) : field.defaultValue;
            /** @type {?} */
            const ref = this.config ? this.config.resolveFieldTypeRef(field) : null;
            if (ref && ref.componentType && ref.componentType['createControl']) {
                /** @type {?} */
                const component = ref.componentType;
                console.warn(`NgxFormly: '${component.name}::createControl' is deprecated since v5.0, use 'prePopulate' hook instead.`);
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
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    setValidators(field, disabled = false) {
        /** @type {?} */
        let markForCheck = false;
        if (disabled === false && field.key && field.templateOptions && field.templateOptions.disabled) {
            disabled = true;
        }
        (field.fieldGroup || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => this.setValidators(f, disabled) && (markForCheck = true)));
        if (field.key || !field.parent || (!field.key && !field.fieldGroup)) {
            const { formControl: c } = field;
            field.templateOptions = field.templateOptions || {};
            if (field.key && c && c instanceof FormControl) {
                if (disabled && c.enabled) {
                    c.disable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
                if (!disabled && c.disabled) {
                    c.enable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
            }
            if (c && (null === c.validator || null === c.asyncValidator)) {
                c.setValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = Validators.compose(this.mergeValidators(field, '_validators'));
                    return v ? v(c) : null;
                }));
                c.setAsyncValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = Validators.composeAsync(this.mergeValidators(field, '_asyncValidators'));
                    return v ? v(c) : of(null);
                }));
                markForCheck = true;
            }
            if (markForCheck) {
                updateValidity(c, true);
            }
        }
        return markForCheck;
    }
    /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    mergeValidators(field, type) {
        /** @type {?} */
        const validators = [];
        /** @type {?} */
        const c = field.formControl;
        if (c && c['_fields'] && c['_fields'].length > 1) {
            c['_fields']
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f._hide))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => validators.push(...f[type])));
        }
        else if (field[type]) {
            validators.push(...field[type]);
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.key && f.fieldGroup))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => validators.push(...this.mergeValidators(f, type))));
        }
        return validators;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@experimental
 */
class CoreExtension {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.formId = 0;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        this.getFieldComponentInstance(field).prePopulate();
        if (field.parent) {
            return;
        }
        /** @type {?} */
        const fieldTransforms = (field.options && field.options.fieldTransform) || this.formlyConfig.extras.fieldTransform;
        (Array.isArray(fieldTransforms) ? fieldTransforms : [fieldTransforms]).forEach((/**
         * @param {?} fieldTransform
         * @return {?}
         */
        fieldTransform => {
            if (fieldTransform) {
                console.warn(`NgxFormly: fieldTransform is deprecated since v5.0, use custom extension instead.`);
                /** @type {?} */
                const fieldGroup = fieldTransform(field.fieldGroup, field.model, (/** @type {?} */ (field.formControl)), field.options);
                if (!fieldGroup) {
                    throw new Error('fieldTransform must return an array of fields');
                }
            }
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate();
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @param {?} index
             * @return {?}
             */
            (f, index) => {
                Object.defineProperty(f, 'parent', { get: (/**
                     * @return {?}
                     */
                    () => field), configurable: true });
                Object.defineProperty(f, 'index', { get: (/**
                     * @return {?}
                     */
                    () => index), configurable: true });
                this.formId++;
            }));
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        this.getFieldComponentInstance(field).postPopulate();
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldOptions(field) {
        /** @type {?} */
        const root = (/** @type {?} */ (field.parent));
        if (!root) {
            return;
        }
        Object.defineProperty(field, 'form', { get: (/**
             * @return {?}
             */
            () => root.formControl), configurable: true });
        Object.defineProperty(field, 'options', { get: (/**
             * @return {?}
             */
            () => root.options), configurable: true });
        Object.defineProperty(field, 'model', {
            get: (/**
             * @return {?}
             */
            () => field.key && field.fieldGroup ? getFieldValue(field) : root.model),
            configurable: true,
        });
        reverseDeepMerge(field, {
            id: getFieldId(`formly_${this.formId}`, field, field['index']),
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
            console.warn(`NgxFormly: 'lifecycle' is deprecated since v5.0, use 'hooks' instead.`);
        }
        if (field.type !== 'formly-template'
            && (field.template
                || (field.expressionProperties && field.expressionProperties.template))) {
            if (field.type) {
                console.warn(`NgxFormly: passing 'type' property is not allowed when 'template' is set.`);
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
            let setDefaultValue = !isUndefined(field.key)
                && !isUndefined(field.defaultValue)
                && isUndefined(getFieldValue(field))
                && (!field.resetOnHide || !(field.hide || field.hideExpression));
            if (setDefaultValue && field.resetOnHide) {
                /** @type {?} */
                let parent = field.parent;
                while (parent && !parent.hideExpression && !parent.hide) {
                    parent = parent.parent;
                }
                setDefaultValue = !parent || !(parent.hideExpression || parent.hide);
            }
            if (setDefaultValue) {
                assignFieldValue(field, field.defaultValue);
            }
        }
        this.initFieldWrappers(field);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldWrappers(field) {
        field.wrappers = field.wrappers || [];
        /** @type {?} */
        const fieldTemplateManipulators = Object.assign({ preWrapper: [], postWrapper: [] }, (field.templateOptions.templateManipulators || {}));
        field.wrappers = [
            ...this.formlyConfig.templateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...field.wrappers,
            ...this.formlyConfig.templateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
        ].filter((/**
         * @param {?} el
         * @param {?} i
         * @param {?} a
         * @return {?}
         */
        (el, i, a) => el && i === a.indexOf(el)));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    getFieldComponentInstance(field) {
        /** @type {?} */
        const componentRef = this.formlyConfig.resolveFieldTypeRef(field);
        /** @type {?} */
        const instance = componentRef ? (/** @type {?} */ (componentRef.instance)) : {};
        return {
            prePopulate: (/**
             * @return {?}
             */
            () => instance.prePopulate && instance.prePopulate(field)),
            onPopulate: (/**
             * @return {?}
             */
            () => instance.onPopulate && instance.onPopulate(field)),
            postPopulate: (/**
             * @return {?}
             */
            () => instance.postPopulate && instance.postPopulate(field)),
        };
    }
}

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
class FormlyModule {
    /**
     * @param {?} configService
     * @param {?=} configs
     */
    constructor(configService, configs = []) {
        if (!configs) {
            return;
        }
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        config => configService.addConfig(config)));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
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
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    }
}
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
FormlyModule.ctorParameters = () => [
    { type: FormlyConfig },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [FORMLY_CONFIG,] }] }
];

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