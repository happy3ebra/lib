/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵreverseDeepMerge as reverseDeepMerge, ɵgetFieldValue as getFieldValue, ɵclone as clone, } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function FormlyJsonschemaOptions() { }
if (false) {
    /**
     * allows to intercept the mapping, taking the already mapped
     * formly field and the original JSONSchema source from which it
     * was mapped.
     * @type {?|undefined}
     */
    FormlyJsonschemaOptions.prototype.map;
}
// https://stackoverflow.com/a/27865285
/**
 * @param {?} a
 * @return {?}
 */
function decimalPlaces(a) {
    if (!isFinite(a)) {
        return 0;
    }
    /** @type {?} */
    let e = 1;
    /** @type {?} */
    let p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
/**
 * @param {?} v
 * @return {?}
 */
function isEmpty(v) {
    return v === '' || v === undefined || v === null;
}
/**
 * @param {?} v
 * @return {?}
 */
function isObject(v) {
    return v != null && typeof v === 'object' && !Array.isArray(v);
}
/**
 * @param {?} value
 * @return {?}
 */
function isInteger(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && Math.floor(value) === value;
}
/**
 * @param {?} schema
 * @return {?}
 */
function isConst(schema) {
    return schema.hasOwnProperty('const') || (schema.enum && schema.enum.length === 1);
}
/**
 * @param {?} field
 * @return {?}
 */
function totalMatchedFields(field) {
    if (!field.fieldGroup) {
        return field.key && getFieldValue(field) !== undefined ? 1 : 0;
    }
    /** @type {?} */
    const total = field.fieldGroup.reduce((/**
     * @param {?} s
     * @param {?} f
     * @return {?}
     */
    (s, f) => totalMatchedFields(f) + s), 0);
    if (total === 0 && field.key) {
        /** @type {?} */
        const value = getFieldValue(field);
        if (value === null
            || ((value !== undefined)
                && ((field.fieldArray && Array.isArray(value))
                    || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
/**
 * @record
 */
function IOptions() { }
if (false) {
    /** @type {?} */
    IOptions.prototype.schema;
    /** @type {?|undefined} */
    IOptions.prototype.resetOnHide;
    /** @type {?|undefined} */
    IOptions.prototype.shareFormControl;
    /** @type {?|undefined} */
    IOptions.prototype.ignoreDefault;
    /** @type {?|undefined} */
    IOptions.prototype.strict;
    /** @type {?|undefined} */
    IOptions.prototype.readOnly;
    /** @type {?|undefined} */
    IOptions.prototype.key;
}
export class FormlyJsonschema {
    /**
     * @param {?} schema
     * @param {?=} options
     * @return {?}
     */
    toFieldConfig(schema, options) {
        return this._toFieldConfig(schema, Object.assign({ schema }, (options || {})));
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} __1
     * @return {?}
     */
    _toFieldConfig(schema, _a) {
        var { key } = _a, options = tslib_1.__rest(_a, ["key"]);
        schema = this.resolveSchema(schema, options);
        /** @type {?} */
        let field = {
            type: this.guessType(schema),
            defaultValue: schema.default,
            templateOptions: {
                label: schema.title,
                readonly: schema.readOnly,
                description: schema.description,
            },
        };
        if (key != null) {
            field.key = key;
        }
        if (!options.ignoreDefault && (schema.readOnly || options.readOnly)) {
            field.templateOptions.disabled = true;
            options = Object.assign({}, options, { readOnly: true });
        }
        if (options.resetOnHide) {
            field['resetOnHide'] = true;
        }
        if (key && options.strict) {
            this.addValidator(field, 'type', (/**
             * @param {?} c
             * @param {?} f
             * @return {?}
             */
            (c, f) => {
                /** @type {?} */
                const value = getFieldValue(f);
                if (value != null) {
                    switch (field.type) {
                        case 'string': {
                            return typeof value === 'string';
                        }
                        case 'integer': {
                            return isInteger(value);
                        }
                        case 'number': {
                            return typeof value === 'number';
                        }
                        case 'object': {
                            return isObject(value);
                        }
                        case 'array': {
                            return Array.isArray(value);
                        }
                    }
                }
                return true;
            }));
        }
        if (options.shareFormControl === false) {
            field['shareFormControl'] = false;
        }
        if (options.ignoreDefault) {
            delete field.defaultValue;
        }
        switch (field.type) {
            case 'null': {
                this.addValidator(field, 'null', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ value }) => value === null));
                break;
            }
            case 'number':
            case 'integer': {
                field.parsers = [(/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => isEmpty(v) ? (v === '' ? null : v) : Number(v))];
                if (schema.hasOwnProperty('minimum')) {
                    field.templateOptions.min = schema.minimum;
                }
                if (schema.hasOwnProperty('maximum')) {
                    field.templateOptions.max = schema.maximum;
                }
                if (schema.hasOwnProperty('exclusiveMinimum')) {
                    field.templateOptions.exclusiveMinimum = schema.exclusiveMinimum;
                    this.addValidator(field, 'exclusiveMinimum', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => isEmpty(value) || (value > schema.exclusiveMinimum)));
                }
                if (schema.hasOwnProperty('exclusiveMaximum')) {
                    field.templateOptions.exclusiveMaximum = schema.exclusiveMaximum;
                    this.addValidator(field, 'exclusiveMaximum', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => isEmpty(value) || (value < schema.exclusiveMaximum)));
                }
                if (schema.hasOwnProperty('multipleOf')) {
                    field.templateOptions.step = schema.multipleOf;
                    this.addValidator(field, 'multipleOf', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => {
                        if (isEmpty(value) || typeof value !== 'number' || value === 0 || schema.multipleOf <= 0) {
                            return true;
                        }
                        // https://github.com/ajv-validator/ajv/issues/652#issue-283610859
                        /** @type {?} */
                        const multiplier = Math.pow(10, decimalPlaces(schema.multipleOf));
                        return Math.round(value * multiplier) % Math.round(schema.multipleOf * multiplier) === 0;
                    }));
                }
                break;
            }
            case 'string': {
                /** @type {?} */
                const schemaType = (/** @type {?} */ (schema.type));
                if (Array.isArray(schemaType) && (schemaType.indexOf('null') !== -1)) {
                    field.parsers = [(/**
                         * @param {?} v
                         * @return {?}
                         */
                        v => isEmpty(v) ? null : v)];
                }
                ['minLength', 'maxLength', 'pattern'].forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                prop => {
                    if (schema.hasOwnProperty(prop)) {
                        field.templateOptions[prop] = schema[prop];
                    }
                }));
                break;
            }
            case 'object': {
                if (!field.fieldGroup) {
                    field.fieldGroup = [];
                }
                const [propDeps, schemaDeps] = this.resolveDependencies(schema);
                Object.keys(schema.properties || {}).forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                property => {
                    /** @type {?} */
                    const f = this._toFieldConfig((/** @type {?} */ (schema.properties[property])), Object.assign({}, options, { key: property }));
                    field.fieldGroup.push(f);
                    if ((Array.isArray(schema.required) && schema.required.indexOf(property) !== -1)
                        || propDeps[property]) {
                        f.expressionProperties = Object.assign({}, (f.expressionProperties || {}), { 'templateOptions.required': (/**
                             * @param {?} m
                             * @param {?} s
                             * @param {?} f
                             * @return {?}
                             */
                            (m, s, f) => {
                                /** @type {?} */
                                let parent = f.parent;
                                /** @type {?} */
                                const model = f.fieldGroup && f.key != null ? parent.model : f.model;
                                while (parent.key == null && parent.parent) {
                                    parent = parent.parent;
                                }
                                /** @type {?} */
                                const required = parent && parent.templateOptions ? parent.templateOptions.required : false;
                                if (!model && !required) {
                                    return false;
                                }
                                if (Array.isArray(schema.required) && schema.required.indexOf(property) !== -1) {
                                    return true;
                                }
                                return propDeps[property] && (m && propDeps[property].some((/**
                                 * @param {?} k
                                 * @return {?}
                                 */
                                k => !isEmpty(m[k]))));
                            }) });
                    }
                    if (schemaDeps[property]) {
                        /** @type {?} */
                        const getConstValue = (/**
                         * @param {?} s
                         * @return {?}
                         */
                        (s) => {
                            return s.hasOwnProperty('const') ? s.const : s.enum[0];
                        });
                        /** @type {?} */
                        const oneOfSchema = schemaDeps[property].oneOf;
                        if (oneOfSchema
                            && oneOfSchema.every((/**
                             * @param {?} o
                             * @return {?}
                             */
                            o => o.properties && o.properties[property] && isConst(o.properties[property])))) {
                            oneOfSchema.forEach((/**
                             * @param {?} oneOfSchemaItem
                             * @return {?}
                             */
                            oneOfSchemaItem => {
                                const _a = oneOfSchemaItem.properties, _b = property, constSchema = _a[_b], properties = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                field.fieldGroup.push(Object.assign({}, this._toFieldConfig(Object.assign({}, oneOfSchemaItem, { properties }), Object.assign({}, options, { resetOnHide: true })), { hideExpression: (/**
                                     * @param {?} m
                                     * @return {?}
                                     */
                                    m => !m || getConstValue(constSchema) !== m[property]) }));
                            }));
                        }
                        else {
                            field.fieldGroup.push(Object.assign({}, this._toFieldConfig(schemaDeps[property], options), { hideExpression: (/**
                                 * @param {?} m
                                 * @return {?}
                                 */
                                m => !m || isEmpty(m[property])) }));
                        }
                    }
                }));
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), Object.assign({}, options, { shareFormControl: false })));
                }
                if (schema.anyOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('anyOf', (/** @type {?} */ (schema.anyOf)), options));
                }
                break;
            }
            case 'array': {
                if (schema.hasOwnProperty('minItems')) {
                    field.templateOptions.minItems = schema.minItems;
                    this.addValidator(field, 'minItems', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => isEmpty(value) || (value.length >= schema.minItems)));
                }
                if (schema.hasOwnProperty('maxItems')) {
                    field.templateOptions.maxItems = schema.maxItems;
                    this.addValidator(field, 'maxItems', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => isEmpty(value) || (value.length <= schema.maxItems)));
                }
                if (schema.hasOwnProperty('uniqueItems')) {
                    field.templateOptions.uniqueItems = schema.uniqueItems;
                    this.addValidator(field, 'uniqueItems', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    ({ value }) => {
                        if (isEmpty(value) || !schema.uniqueItems) {
                            return true;
                        }
                        /** @type {?} */
                        const uniqueItems = Array.from(new Set(value.map((/**
                         * @param {?} v
                         * @return {?}
                         */
                        (v) => JSON.stringify(v)))));
                        return uniqueItems.length === value.length;
                    }));
                }
                // resolve items schema needed for isEnum check
                if (schema.items && !Array.isArray(schema.items)) {
                    schema.items = this.resolveSchema((/** @type {?} */ (schema.items)), options);
                }
                // TODO: remove isEnum check once adding an option to skip extension
                if (!this.isEnum(schema)) {
                    /** @type {?} */
                    const _this = this;
                    Object.defineProperty(field, 'fieldArray', {
                        get: (/**
                         * @return {?}
                         */
                        function () {
                            if (schema.items && !Array.isArray(schema.items)) {
                                // When items is a single schema, the additionalItems keyword is meaningless, and it should not be used.
                                return _this._toFieldConfig((/** @type {?} */ (schema.items)), options);
                            }
                            /** @type {?} */
                            const length = this.fieldGroup ? this.fieldGroup.length : 0;
                            if (schema.items && schema.items[length]) {
                                /** @type {?} */
                                const f = _this._toFieldConfig((/** @type {?} */ (schema.items[length])), Object.assign({}, options));
                                f.templateOptions.removable = false;
                                return f;
                            }
                            return schema.additionalItems
                                ? _this._toFieldConfig((/** @type {?} */ (schema.additionalItems)), options)
                                : {};
                        }),
                        enumerable: true,
                        configurable: true,
                    });
                }
                break;
            }
        }
        if (schema.hasOwnProperty('const')) {
            field.templateOptions.const = schema.const;
            this.addValidator(field, 'const', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ value }) => value === schema.const));
            if (!field.type) {
                field.defaultValue = schema.const;
            }
        }
        if (this.isEnum(schema)) {
            field.templateOptions.multiple = field.type === 'array';
            field.type = 'enum';
            field.templateOptions.options = this.toEnumOptions(schema);
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), Object.assign({}, options, { key, shareFormControl: false })),
            ];
        }
        // map in possible formlyConfig options from the widget property
        if (schema['widget'] && schema['widget'].formlyConfig) {
            field = this.mergeFields(field, schema['widget'].formlyConfig);
        }
        // if there is a map function passed in, use it to allow the user to
        // further customize how fields are being mapped
        return options.map ? options.map(field, schema) : field;
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    resolveSchema(schema, options) {
        if (schema && schema.$ref) {
            schema = this.resolveDefinition(schema, options);
        }
        if (schema && schema.allOf) {
            schema = this.resolveAllOf(schema, options);
        }
        return schema;
    }
    /**
     * @private
     * @param {?} __0
     * @param {?} options
     * @return {?}
     */
    resolveAllOf(_a, options) {
        var { allOf } = _a, baseSchema = tslib_1.__rest(_a, ["allOf"]);
        if (!allOf.length) {
            throw Error(`allOf array can not be empty ${allOf}.`);
        }
        return allOf.reduce((/**
         * @param {?} base
         * @param {?} schema
         * @return {?}
         */
        (base, schema) => {
            schema = this.resolveSchema(schema, options);
            if (base.required && schema.required) {
                base.required = [...base.required, ...schema.required];
            }
            if (schema.uniqueItems) {
                base.uniqueItems = schema.uniqueItems;
            }
            // resolve to min value
            ['maxLength', 'maximum', 'exclusiveMaximum', 'maxItems', 'maxProperties']
                .forEach((/**
             * @param {?} prop
             * @return {?}
             */
            prop => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] < schema[prop] ? base[prop] : schema[prop];
                }
            }));
            // resolve to max value
            ['minLength', 'minimum', 'exclusiveMinimum', 'minItems', 'minProperties']
                .forEach((/**
             * @param {?} prop
             * @return {?}
             */
            prop => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] > schema[prop] ? base[prop] : schema[prop];
                }
            }));
            return reverseDeepMerge(base, schema);
        }), baseSchema);
    }
    /**
     * @private
     * @param {?} mode
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    resolveMultiSchema(mode, schemas, options) {
        return {
            type: 'multischema',
            fieldGroup: [
                {
                    type: 'enum',
                    defaultValue: -1,
                    templateOptions: {
                        multiple: mode === 'anyOf',
                        options: schemas
                            .map((/**
                         * @param {?} s
                         * @param {?} i
                         * @return {?}
                         */
                        (s, i) => ({ label: s.title, value: i, disabled: s.readOnly }))),
                    },
                    hooks: {
                        onInit: (/**
                         * @param {?} f
                         * @return {?}
                         */
                        f => f.formControl.valueChanges.pipe(tap((/**
                         * @return {?}
                         */
                        () => ((/** @type {?} */ (f.options)))._checkField(f.parent))))),
                    },
                },
                {
                    fieldGroup: schemas.map((/**
                     * @param {?} s
                     * @param {?} i
                     * @return {?}
                     */
                    (s, i) => (Object.assign({}, this._toFieldConfig(s, Object.assign({}, options, { resetOnHide: true })), { hideExpression: (/**
                         * @param {?} m
                         * @param {?} fs
                         * @param {?} f
                         * @param {?=} forceUpdate
                         * @return {?}
                         */
                        (m, fs, f, forceUpdate) => {
                            /** @type {?} */
                            const control = f.parent.parent.fieldGroup[0].formControl;
                            if ((control.value === -1) || forceUpdate) {
                                /** @type {?} */
                                let value = f.parent.fieldGroup
                                    .map((/**
                                 * @param {?} f
                                 * @param {?} i
                                 * @return {?}
                                 */
                                (f, i) => (/** @type {?} */ ([f, i, this.isFieldValid(f, i, schemas, options)]))))
                                    .sort((/**
                                 * @param {?} __0
                                 * @param {?} __1
                                 * @return {?}
                                 */
                                ([f1, i1, f1Valid], [f2, i2, f2Valid]) => {
                                    if (f1Valid !== f2Valid) {
                                        return f2Valid ? 1 : -1;
                                    }
                                    /** @type {?} */
                                    const matchedFields1 = totalMatchedFields(f1);
                                    /** @type {?} */
                                    const matchedFields2 = totalMatchedFields(f2);
                                    if (matchedFields1 === matchedFields2) {
                                        if (f1.templateOptions.disabled === f2.templateOptions.disabled) {
                                            return 0;
                                        }
                                        return f1.templateOptions.disabled ? 1 : -1;
                                    }
                                    return matchedFields2 > matchedFields1 ? 1 : -1;
                                }))
                                    .map((/**
                                 * @param {?} __0
                                 * @return {?}
                                 */
                                ([, i]) => i));
                                if (mode === 'anyOf') {
                                    /** @type {?} */
                                    const definedValue = value.filter((/**
                                     * @param {?} i
                                     * @return {?}
                                     */
                                    i => totalMatchedFields(f.parent.fieldGroup[i])));
                                    value = definedValue.length > 0 ? definedValue : [value[0] || 0];
                                }
                                value = value.length > 0 ? value : [0];
                                control.setValue(mode === 'anyOf' ? value : value[0]);
                            }
                            return Array.isArray(control.value)
                                ? control.value.indexOf(i) === -1
                                : control.value !== i;
                        }) })))),
                },
            ],
        };
    }
    /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    resolveDefinition(schema, options) {
        const [uri, pointer] = schema.$ref.split('#/');
        if (uri) {
            throw Error(`Remote schemas for ${schema.$ref} not supported yet.`);
        }
        /** @type {?} */
        const definition = !pointer ? null : pointer.split('/').reduce((/**
         * @param {?} def
         * @param {?} path
         * @return {?}
         */
        (def, path) => def && def.hasOwnProperty(path) ? def[path] : null), options.schema);
        if (!definition) {
            throw Error(`Cannot find a definition for ${schema.$ref}.`);
        }
        if (definition.$ref) {
            return this.resolveDefinition(definition, options);
        }
        return Object.assign({}, definition, ['title', 'description', 'default', 'widget'].reduce((/**
         * @param {?} annotation
         * @param {?} p
         * @return {?}
         */
        (annotation, p) => {
            if (schema.hasOwnProperty(p)) {
                annotation[p] = schema[p];
            }
            return annotation;
        }), {}));
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    resolveDependencies(schema) {
        /** @type {?} */
        const deps = {};
        /** @type {?} */
        const schemaDeps = {};
        Object.keys(schema.dependencies || {}).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            /** @type {?} */
            const dependency = (/** @type {?} */ (schema.dependencies[prop]));
            if (Array.isArray(dependency)) {
                // Property dependencies
                dependency.forEach((/**
                 * @param {?} dep
                 * @return {?}
                 */
                dep => {
                    if (!deps[dep]) {
                        deps[dep] = [prop];
                    }
                    else {
                        deps[dep].push(prop);
                    }
                }));
            }
            else {
                // schema dependencies
                schemaDeps[prop] = dependency;
            }
        }));
        return [deps, schemaDeps];
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    guessType(schema) {
        /** @type {?} */
        const type = schema ? (/** @type {?} */ (schema.type)) : null;
        if (!type && schema && schema.properties) {
            return 'object';
        }
        if (Array.isArray(type)) {
            if (type.length === 1) {
                return type[0];
            }
            if (type.length === 2 && type.indexOf('null') !== -1) {
                return type[type[0] === 'null' ? 1 : 0];
            }
        }
        return type;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} name
     * @param {?} validator
     * @return {?}
     */
    addValidator(field, name, validator) {
        field.validators = field.validators || {};
        field.validators[name] = validator;
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    isEnum(schema) {
        return schema.enum
            || (schema.anyOf && schema.anyOf.every(isConst))
            || (schema.oneOf && schema.oneOf.every(isConst))
            || schema.uniqueItems && schema.items && !Array.isArray(schema.items) && this.isEnum((/** @type {?} */ (schema.items)));
    }
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    toEnumOptions(schema) {
        if (schema.enum) {
            return schema.enum.map((/**
             * @param {?} value
             * @return {?}
             */
            value => ({ value, label: value })));
        }
        /** @type {?} */
        const toEnum = (/**
         * @param {?} s
         * @return {?}
         */
        (s) => {
            /** @type {?} */
            const value = s.hasOwnProperty('const') ? s.const : s.enum[0];
            /** @type {?} */
            const option = { value: value, label: s.title || value };
            if (s.readOnly) {
                option.disabled = true;
            }
            return option;
        });
        if (schema.anyOf) {
            return schema.anyOf.map(toEnum);
        }
        if (schema.oneOf) {
            return schema.oneOf.map(toEnum);
        }
        return this.toEnumOptions((/** @type {?} */ (schema.items)));
    }
    /**
     * @private
     * @param {?} root
     * @param {?} i
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    isFieldValid(root, i, schemas, options) {
        if (!root['_schemasFields']) {
            Object.defineProperty(root, '_schemasFields', { enumerable: false, writable: true, configurable: true });
            root['_schemasFields'] = {};
        }
        /** @type {?} */
        let field = root['_schemasFields'][i];
        /** @type {?} */
        const model = root.model ? clone(root.model) : (root.fieldArray ? [] : {});
        if (!field) {
            field = root['_schemasFields'][i] = ((/** @type {?} */ (root.options)))._buildField({
                formControl: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [this._toFieldConfig(schemas[i], Object.assign({}, options, { resetOnHide: true, ignoreDefault: true, map: null, strict: true }))],
                model,
                options: {},
            });
        }
        else {
            field.model = model;
            ((/** @type {?} */ (root.options)))._buildField(field);
        }
        return field.formControl.valid;
    }
    /**
     * @private
     * @param {?} f1
     * @param {?} f2
     * @return {?}
     */
    mergeFields(f1, f2) {
        for (let prop in f2) {
            if (isObject(f1[prop]) && isObject(f2[prop])) {
                f1[prop] = this.mergeFields(f1[prop], f2[prop]);
            }
            else if (f2[prop] != null) {
                f1[prop] = f2[prop];
            }
        }
        return f1;
    }
}
FormlyJsonschema.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ FormlyJsonschema.ngInjectableDef = i0.defineInjectable({ factory: function FormlyJsonschema_Factory() { return new FormlyJsonschema(); }, token: FormlyJsonschema, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlL2pzb24tc2NoZW1hLyIsInNvdXJjZXMiOlsiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFDckMsY0FBYyxJQUFJLGFBQWEsRUFDL0IsTUFBTSxJQUFJLEtBQUssR0FDaEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRXJDLDZDQU9DOzs7Ozs7OztJQURDLHNDQUFvRjs7Ozs7OztBQUl0RixTQUFTLGFBQWEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxDQUFDLENBQUM7S0FDVjs7UUFFRyxDQUFDLEdBQUcsQ0FBQzs7UUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQUMsQ0FBQyxFQUFFLENBQUM7S0FBRTtJQUVyRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7Ozs7O0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ25ELENBQUM7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLENBQUMs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YW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBKU09OU2NoZW1hNywgSlNPTlNjaGVtYTdUeXBlTmFtZSB9IGZyb20gJ2pzb24tc2NoZW1hJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICDJtXJldmVyc2VEZWVwTWVyZ2UgYXMgcmV2ZXJzZURlZXBNZXJnZSxcbiAgybVnZXRGaWVsZFZhbHVlIGFzIGdldEZpZWxkVmFsdWUsXG4gIMm1Y2xvbmUgYXMgY2xvbmUsXG59IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUpzb25zY2hlbWFPcHRpb25zIHtcbiAgLyoqXG4gICAqIGFsbG93cyB0byBpbnRlcmNlcHQgdGhlIG1hcHBpbmcsIHRha2luZyB0aGUgYWxyZWFkeSBtYXBwZWRcbiAgICogZm9ybWx5IGZpZWxkIGFuZCB0aGUgb3JpZ2luYWwgSlNPTlNjaGVtYSBzb3VyY2UgZnJvbSB3aGljaCBpdFxuICAgKiB3YXMgbWFwcGVkLlxuICAgKi9cbiAgbWFwPzogKG1hcHBlZEZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgbWFwU291cmNlOiBKU09OU2NoZW1hNykgPT4gRm9ybWx5RmllbGRDb25maWc7XG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzg2NTI4NVxuZnVuY3Rpb24gZGVjaW1hbFBsYWNlcyhhOiBudW1iZXIpIHtcbiAgaWYgKCFpc0Zpbml0ZShhKSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgbGV0IGUgPSAxLCBwID0gMDtcbiAgd2hpbGUgKE1hdGgucm91bmQoYSAqIGUpIC8gZSAhPT0gYSkgeyBlICo9IDEwOyBwKys7IH1cblxuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eSh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgPT09ICcnIHx8IHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyID8gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNDb25zdChzY2hlbWE6IEpTT05TY2hlbWE3KSB7XG4gIHJldHVybiBzY2hlbWEuaGFzT3duUHJvcGVydHkoJ2NvbnN0JykgfHwgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSk7XG59XG5cbmZ1bmN0aW9uIHRvdGFsTWF0Y2hlZEZpZWxkcyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBudW1iZXIge1xuICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICByZXR1cm4gZmllbGQua2V5ICYmIGdldEZpZWxkVmFsdWUoZmllbGQpICE9PSB1bmRlZmluZWQgPyAxIDogMDtcbiAgfVxuXG4gIGNvbnN0IHRvdGFsID0gZmllbGQuZmllbGRHcm91cC5yZWR1Y2UoKHMsIGYpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmKSArIHMsIDApO1xuICBpZiAodG90YWwgPT09IDAgJiYgZmllbGQua2V5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGZpZWxkKTtcbiAgICBpZiAoXG4gICAgICB2YWx1ZSA9PT0gbnVsbFxuICAgICAgfHwgKFxuICAgICAgICAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgJiYgKFxuICAgICAgICAgIChmaWVsZC5maWVsZEFycmF5ICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgIHx8ICghZmllbGQuZmllbGRBcnJheSAmJiBpc09iamVjdCh2YWx1ZSkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b3RhbDtcbn1cblxuaW50ZXJmYWNlIElPcHRpb25zIGV4dGVuZHMgRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMge1xuICBzY2hlbWE6IEpTT05TY2hlbWE3O1xuICByZXNldE9uSGlkZT86IGJvb2xlYW47XG4gIHNoYXJlRm9ybUNvbnRyb2w/OiBib29sZWFuO1xuICBpZ25vcmVEZWZhdWx0PzogYm9vbGVhbjtcbiAgc3RyaWN0PzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBrZXk/OiBGb3JtbHlGaWVsZENvbmZpZ1sna2V5J107XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5SnNvbnNjaGVtYSB7XG4gIHRvRmllbGRDb25maWcoc2NoZW1hOiBKU09OU2NoZW1hNywgb3B0aW9ucz86IEZvcm1seUpzb25zY2hlbWFPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYSwgeyBzY2hlbWEsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvRmllbGRDb25maWcoc2NoZW1hOiBKU09OU2NoZW1hNywgeyBrZXksIC4uLm9wdGlvbnMgfTogSU9wdGlvbnMpOiBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlU2NoZW1hKHNjaGVtYSwgb3B0aW9ucyk7XG5cbiAgICBsZXQgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnID0ge1xuICAgICAgdHlwZTogdGhpcy5ndWVzc1R5cGUoc2NoZW1hKSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogc2NoZW1hLmRlZmF1bHQsXG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcbiAgICAgICAgbGFiZWw6IHNjaGVtYS50aXRsZSxcbiAgICAgICAgcmVhZG9ubHk6IHNjaGVtYS5yZWFkT25seSxcbiAgICAgICAgZGVzY3JpcHRpb246IHNjaGVtYS5kZXNjcmlwdGlvbixcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgZmllbGQua2V5ID0ga2V5O1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5pZ25vcmVEZWZhdWx0ICYmIChzY2hlbWEucmVhZE9ubHkgfHwgb3B0aW9ucy5yZWFkT25seSkpIHtcbiAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCByZWFkT25seTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlc2V0T25IaWRlKSB7XG4gICAgICBmaWVsZFsncmVzZXRPbkhpZGUnXSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGtleSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywgKGMsIGYpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgICAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zaGFyZUZvcm1Db250cm9sID09PSBmYWxzZSkge1xuICAgICAgZmllbGRbJ3NoYXJlRm9ybUNvbnRyb2wnXSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZURlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICBjYXNlICdudWxsJzoge1xuICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ251bGwnLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gbnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgIGZpZWxkLnBhcnNlcnMgPSBbdiA9PiBpc0VtcHR5KHYpID8gKHYgPT09ICcnID8gbnVsbCA6IHYpIDogTnVtYmVyKHYpXTtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1pbiA9IHNjaGVtYS5taW5pbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmV4Y2x1c2l2ZU1pbmltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWluaW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2V4Y2x1c2l2ZU1pbmltdW0nLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUgPiBzY2hlbWEuZXhjbHVzaXZlTWluaW11bSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmV4Y2x1c2l2ZU1heGltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2V4Y2x1c2l2ZU1heGltdW0nLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUgPCBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGVPZicpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ211bHRpcGxlT2YnLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gMCB8fCBzY2hlbWEubXVsdGlwbGVPZiA8PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYWp2LXZhbGlkYXRvci9hanYvaXNzdWVzLzY1MiNpc3N1ZS0yODM2MTA4NTlcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyhzY2hlbWEubXVsdGlwbGVPZikpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAlIE1hdGgucm91bmQoc2NoZW1hLm11bHRpcGxlT2YgKiBtdWx0aXBsaWVyKSA9PT0gMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hVHlwZSA9IHNjaGVtYS50eXBlIGFzIEpTT05TY2hlbWE3VHlwZU5hbWU7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYVR5cGUpICYmIChzY2hlbWFUeXBlLmluZGV4T2YoJ251bGwnKSAhPT0gLTEpKSB7XG4gICAgICAgICAgZmllbGQucGFyc2VycyA9IFt2ID0+IGlzRW1wdHkodikgPyBudWxsIDogdl07XG4gICAgICAgIH1cblxuICAgICAgICBbJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnLCAncGF0dGVybiddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zW3Byb3BdID0gc2NoZW1hW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbcHJvcERlcHMsIHNjaGVtYURlcHNdID0gdGhpcy5yZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgICBjb25zdCBmID0gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSwgeyAuLi5vcHRpb25zLCBrZXk6IHByb3BlcnR5IH0pO1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChmKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpXG4gICAgICAgICAgICB8fCBwcm9wRGVwc1twcm9wZXJ0eV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGYuZXhwcmVzc2lvblByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICAgIC4uLihmLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9KSxcbiAgICAgICAgICAgICAgJ3RlbXBsYXRlT3B0aW9ucy5yZXF1aXJlZCc6IChtLCBzLCBmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGYucGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gZi5maWVsZEdyb3VwICYmIGYua2V5ICE9IG51bGwgPyBwYXJlbnQubW9kZWwgOiBmLm1vZGVsO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQua2V5ID09IG51bGwgJiYgcGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IHBhcmVudCAmJiBwYXJlbnQudGVtcGxhdGVPcHRpb25zID8gcGFyZW50LnRlbXBsYXRlT3B0aW9ucy5yZXF1aXJlZCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghbW9kZWwgJiYgIXJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlcHNbcHJvcGVydHldICYmIChtICYmIHByb3BEZXBzW3Byb3BlcnR5XS5zb21lKGsgPT4gIWlzRW1wdHkobVtrXSkpKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNjaGVtYURlcHNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRDb25zdFZhbHVlID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBzLmhhc093blByb3BlcnR5KCdjb25zdCcpID8gcy5jb25zdCA6IHMuZW51bVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IG9uZU9mU2NoZW1hID0gc2NoZW1hRGVwc1twcm9wZXJ0eV0ub25lT2Y7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG9uZU9mU2NoZW1hXG4gICAgICAgICAgICAgICYmIG9uZU9mU2NoZW1hLmV2ZXJ5KG8gPT4gby5wcm9wZXJ0aWVzICYmIG8ucHJvcGVydGllc1twcm9wZXJ0eV0gJiYgaXNDb25zdChvLnByb3BlcnRpZXNbcHJvcGVydHldKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBvbmVPZlNjaGVtYS5mb3JFYWNoKG9uZU9mU2NoZW1hSXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBbcHJvcGVydHldOiBjb25zdFNjaGVtYSwgLi4ucHJvcGVydGllcyB9ID0gb25lT2ZTY2hlbWFJdGVtLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoeyAuLi5vbmVPZlNjaGVtYUl0ZW0sIHByb3BlcnRpZXMgfSwgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiBtID0+ICFtIHx8IGdldENvbnN0VmFsdWUoY29uc3RTY2hlbWEpICE9PSBtW3Byb3BlcnR5XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoc2NoZW1hRGVwc1twcm9wZXJ0eV0sIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiBtID0+ICFtIHx8IGlzRW1wdHkobVtwcm9wZXJ0eV0pLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh0aGlzLnJlc29sdmVNdWx0aVNjaGVtYShcbiAgICAgICAgICAgICdvbmVPZicsXG4gICAgICAgICAgICA8SlNPTlNjaGVtYTdbXT4gc2NoZW1hLm9uZU9mLFxuICAgICAgICAgICAgeyAuLi5vcHRpb25zLCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9LFxuICAgICAgICAgICkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5hbnlPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh0aGlzLnJlc29sdmVNdWx0aVNjaGVtYShcbiAgICAgICAgICAgICdhbnlPZicsXG4gICAgICAgICAgICA8SlNPTlNjaGVtYTdbXT4gc2NoZW1hLmFueU9mLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1pbkl0ZW1zID0gc2NoZW1hLm1pbkl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWluSXRlbXMnLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUubGVuZ3RoID49IHNjaGVtYS5taW5JdGVtcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heEl0ZW1zJykpIHtcbiAgICAgICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMubWF4SXRlbXMgPSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtYXhJdGVtcycsICh7IHZhbHVlIH0pID0+IGlzRW1wdHkodmFsdWUpIHx8ICh2YWx1ZS5sZW5ndGggPD0gc2NoZW1hLm1heEl0ZW1zKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgndW5pcXVlSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy51bmlxdWVJdGVtcyA9IHNjaGVtYS51bmlxdWVJdGVtcztcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ3VuaXF1ZUl0ZW1zJywgKHsgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpIHx8ICFzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUl0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgbmV3IFNldCh2YWx1ZS5tYXAoKHY6IGFueSkgPT4gSlNPTi5zdHJpbmdpZnkodikpKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVJdGVtcy5sZW5ndGggPT09IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc29sdmUgaXRlbXMgc2NoZW1hIG5lZWRlZCBmb3IgaXNFbnVtIGNoZWNrXG4gICAgICAgIGlmIChzY2hlbWEuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IHRoaXMucmVzb2x2ZVNjaGVtYSg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiByZW1vdmUgaXNFbnVtIGNoZWNrIG9uY2UgYWRkaW5nIGFuIG9wdGlvbiB0byBza2lwIGV4dGVuc2lvblxuICAgICAgICBpZiAoIXRoaXMuaXNFbnVtKHNjaGVtYSkpIHtcbiAgICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZpZWxkLCAnZmllbGRBcnJheScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgICAgICAvLyBXaGVuIGl0ZW1zIGlzIGEgc2luZ2xlIHNjaGVtYSwgdGhlIGFkZGl0aW9uYWxJdGVtcyBrZXl3b3JkIGlzIG1lYW5pbmdsZXNzLCBhbmQgaXQgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpZWxkR3JvdXAgPyB0aGlzLmZpZWxkR3JvdXAubGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgaWYgKHNjaGVtYS5pdGVtcyAmJiBzY2hlbWEuaXRlbXNbbGVuZ3RoXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGYgPSBfdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtc1tsZW5ndGhdLCB7IC4uLm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICBmLnRlbXBsYXRlT3B0aW9ucy5yZW1vdmFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXNcbiAgICAgICAgICAgICAgICA/IF90aGlzLl90b0ZpZWxkQ29uZmlnKDxKU09OU2NoZW1hNz4gc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgb3B0aW9ucylcbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpKSB7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuY29uc3QgPSBzY2hlbWEuY29uc3Q7XG4gICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2NvbnN0JywgKHsgdmFsdWUgfSkgPT4gdmFsdWUgPT09IHNjaGVtYS5jb25zdCk7XG4gICAgICBpZiAoIWZpZWxkLnR5cGUpIHtcbiAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gc2NoZW1hLmNvbnN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRW51bShzY2hlbWEpKSB7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMubXVsdGlwbGUgPSBmaWVsZC50eXBlID09PSAnYXJyYXknO1xuICAgICAgZmllbGQudHlwZSA9ICdlbnVtJztcbiAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5vcHRpb25zID0gdGhpcy50b0VudW1PcHRpb25zKHNjaGVtYSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZiAmJiAhZmllbGQudHlwZSkge1xuICAgICAgZGVsZXRlIGZpZWxkLmtleTtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXG4gICAgICAgIHRoaXMucmVzb2x2ZU11bHRpU2NoZW1hKCdvbmVPZicsIDxKU09OU2NoZW1hN1tdPnNjaGVtYS5vbmVPZiwgeyAuLi5vcHRpb25zLCBrZXksIHNoYXJlRm9ybUNvbnRyb2w6IGZhbHNlIH0pLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBtYXAgaW4gcG9zc2libGUgZm9ybWx5Q29uZmlnIG9wdGlvbnMgZnJvbSB0aGUgd2lkZ2V0IHByb3BlcnR5XG4gICAgaWYgKHNjaGVtYVsnd2lkZ2V0J10gJiYgc2NoZW1hWyd3aWRnZXQnXS5mb3JtbHlDb25maWcpIHtcbiAgICAgIGZpZWxkID0gdGhpcy5tZXJnZUZpZWxkcyhmaWVsZCwgc2NoZW1hWyd3aWRnZXQnXS5mb3JtbHlDb25maWcpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgbWFwIGZ1bmN0aW9uIHBhc3NlZCBpbiwgdXNlIGl0IHRvIGFsbG93IHRoZSB1c2VyIHRvXG4gICAgLy8gZnVydGhlciBjdXN0b21pemUgaG93IGZpZWxkcyBhcmUgYmVpbmcgbWFwcGVkXG4gICAgcmV0dXJuIG9wdGlvbnMubWFwID8gb3B0aW9ucy5tYXAoZmllbGQsIHNjaGVtYSkgOiBmaWVsZDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVNjaGVtYShzY2hlbWE6IEpTT05TY2hlbWE3LCBvcHRpb25zOiBJT3B0aW9ucykge1xuICAgIGlmIChzY2hlbWEgJiYgc2NoZW1hLiRyZWYpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZURlZmluaXRpb24oc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS5hbGxPZikge1xuICAgICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlQWxsT2Yoc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlQWxsT2YoeyBhbGxPZiwgLi4uYmFzZVNjaGVtYSB9OiBKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpIHtcbiAgICBpZiAoIWFsbE9mLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYGFsbE9mIGFycmF5IGNhbiBub3QgYmUgZW1wdHkgJHthbGxPZn0uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsbE9mLnJlZHVjZSgoYmFzZTogSlNPTlNjaGVtYTcsIHNjaGVtYTogSlNPTlNjaGVtYTcpID0+IHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZVNjaGVtYShzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgaWYgKGJhc2UucmVxdWlyZWQgJiYgc2NoZW1hLnJlcXVpcmVkKSB7XG4gICAgICAgIGJhc2UucmVxdWlyZWQgPSBbLi4uYmFzZS5yZXF1aXJlZCwgLi4uc2NoZW1hLnJlcXVpcmVkXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYS51bmlxdWVJdGVtcykge1xuICAgICAgICBiYXNlLnVuaXF1ZUl0ZW1zID0gc2NoZW1hLnVuaXF1ZUl0ZW1zO1xuICAgICAgfVxuXG4gICAgICAvLyByZXNvbHZlIHRvIG1pbiB2YWx1ZVxuICAgICAgWydtYXhMZW5ndGgnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21heEl0ZW1zJywgJ21heFByb3BlcnRpZXMnXVxuICAgICAgICAuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBpZiAoIWlzRW1wdHkoYmFzZVtwcm9wXSkgJiYgIWlzRW1wdHkoc2NoZW1hW3Byb3BdKSkge1xuICAgICAgICAgICAgYmFzZVtwcm9wXSA9IGJhc2VbcHJvcF0gPCBzY2hlbWFbcHJvcF0gPyBiYXNlW3Byb3BdIDogc2NoZW1hW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIHJlc29sdmUgdG8gbWF4IHZhbHVlXG4gICAgICBbJ21pbkxlbmd0aCcsICdtaW5pbXVtJywgJ2V4Y2x1c2l2ZU1pbmltdW0nLCAnbWluSXRlbXMnLCAnbWluUHJvcGVydGllcyddXG4gICAgICAgIC5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgIGlmICghaXNFbXB0eShiYXNlW3Byb3BdKSAmJiAhaXNFbXB0eShzY2hlbWFbcHJvcF0pKSB7XG4gICAgICAgICAgICBiYXNlW3Byb3BdID0gYmFzZVtwcm9wXSA+IHNjaGVtYVtwcm9wXSA/IGJhc2VbcHJvcF0gOiBzY2hlbWFbcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJldmVyc2VEZWVwTWVyZ2UoYmFzZSwgc2NoZW1hKTtcbiAgICB9LCBiYXNlU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU11bHRpU2NoZW1hKFxuICAgIG1vZGU6ICdvbmVPZicgfCAnYW55T2YnLFxuICAgIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sXG4gICAgb3B0aW9uczogSU9wdGlvbnMsXG4gICk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ211bHRpc2NoZW1hJyxcbiAgICAgIGZpZWxkR3JvdXA6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IC0xLFxuICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgICAgICAgbXVsdGlwbGU6IG1vZGUgPT09ICdhbnlPZicsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2hlbWFzXG4gICAgICAgICAgICAgIC5tYXAoKHMsIGkpID0+ICh7IGxhYmVsOiBzLnRpdGxlLCB2YWx1ZTogaSwgZGlzYWJsZWQ6IHMucmVhZE9ubHkgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaG9va3M6IHtcbiAgICAgICAgICAgIG9uSW5pdDogZiA9PiBmLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgICB0YXAoKCkgPT4gKGYub3B0aW9ucyBhcyBhbnkpLl9jaGVja0ZpZWxkKGYucGFyZW50KSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZEdyb3VwOiBzY2hlbWFzLm1hcCgocywgaSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcocywgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiAobSwgZnMsIGYsIGZvcmNlVXBkYXRlPzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gZi5wYXJlbnQucGFyZW50LmZpZWxkR3JvdXBbMF0uZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGlmICgoY29udHJvbC52YWx1ZSA9PT0gLTEpIHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZi5wYXJlbnQuZmllbGRHcm91cFxuICAgICAgICAgICAgICAgICAgLm1hcCgoZiwgaSkgPT4gW2YsIGksIHRoaXMuaXNGaWVsZFZhbGlkKGYsIGksIHNjaGVtYXMsIG9wdGlvbnMpXSBhcyBbRm9ybWx5RmllbGRDb25maWcsIG51bWJlciwgYm9vbGVhbl0pXG4gICAgICAgICAgICAgICAgICAuc29ydCgoW2YxLCBpMSwgZjFWYWxpZF0sIFtmMiwgaTIsIGYyVmFsaWRdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmMVZhbGlkICE9PSBmMlZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYyVmFsaWQgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkRmllbGRzMSA9IHRvdGFsTWF0Y2hlZEZpZWxkcyhmMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWVsZHMyID0gdG90YWxNYXRjaGVkRmllbGRzKGYyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRGaWVsZHMxID09PSBtYXRjaGVkRmllbGRzMikge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmMS50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQgPT09IGYyLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYxLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVkRmllbGRzMiA+IG1hdGNoZWRGaWVsZHMxID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5tYXAoKFssIGldKSA9PiBpKVxuICAgICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdhbnlPZicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmluZWRWYWx1ZSA9IHZhbHVlLmZpbHRlcihpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmLnBhcmVudC5maWVsZEdyb3VwW2ldKSk7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZmluZWRWYWx1ZS5sZW5ndGggPiAwID8gZGVmaW5lZFZhbHVlIDogW3ZhbHVlWzBdIHx8IDBdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogWzBdO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobW9kZSA9PT0gJ2FueU9mJyA/IHZhbHVlIDogdmFsdWVbMF0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICAgICA/IGNvbnRyb2wudmFsdWUuaW5kZXhPZihpKSA9PT0gLTFcbiAgICAgICAgICAgICAgICA6IGNvbnRyb2wudmFsdWUgIT09IGk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZURlZmluaXRpb24oc2NoZW1hOiBKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpOiBKU09OU2NoZW1hNyB7XG4gICAgY29uc3QgW3VyaSwgcG9pbnRlcl0gPSBzY2hlbWEuJHJlZi5zcGxpdCgnIy8nKTtcbiAgICBpZiAodXJpKSB7XG4gICAgICB0aHJvdyBFcnJvcihgUmVtb3RlIHNjaGVtYXMgZm9yICR7c2NoZW1hLiRyZWZ9IG5vdCBzdXBwb3J0ZWQgeWV0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSAhcG9pbnRlciA/IG51bGwgOiBwb2ludGVyLnNwbGl0KCcvJykucmVkdWNlKFxuICAgICAgKGRlZiwgcGF0aCkgPT4gZGVmICYmIGRlZi5oYXNPd25Qcm9wZXJ0eShwYXRoKSA/IGRlZltwYXRoXSA6IG51bGwsXG4gICAgICBvcHRpb25zLnNjaGVtYSxcbiAgICApO1xuXG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke3NjaGVtYS4kcmVmfS5gKTtcbiAgICB9XG5cbiAgICBpZiAoZGVmaW5pdGlvbi4kcmVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGVmaW5pdGlvbihkZWZpbml0aW9uLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgIC4uLlsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnZGVmYXVsdCcsICd3aWRnZXQnXS5yZWR1Y2UoKGFubm90YXRpb24sIHApID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgIGFubm90YXRpb25bcF0gPSBzY2hlbWFbcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5ub3RhdGlvbjtcbiAgICAgIH0sIHt9KSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCBkZXBzID0ge307XG4gICAgY29uc3Qgc2NoZW1hRGVwcyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoc2NoZW1hLmRlcGVuZGVuY2llcyB8fCB7fSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY3kgPSBzY2hlbWEuZGVwZW5kZW5jaWVzW3Byb3BdIGFzIEpTT05TY2hlbWE3O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeSkpIHtcbiAgICAgICAgLy8gUHJvcGVydHkgZGVwZW5kZW5jaWVzXG4gICAgICAgIGRlcGVuZGVuY3kuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgICAgIGlmICghZGVwc1tkZXBdKSB7XG4gICAgICAgICAgICBkZXBzW2RlcF0gPSBbcHJvcF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlcHNbZGVwXS5wdXNoKHByb3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzY2hlbWEgZGVwZW5kZW5jaWVzXG4gICAgICAgIHNjaGVtYURlcHNbcHJvcF0gPSBkZXBlbmRlbmN5O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFtkZXBzLCBzY2hlbWFEZXBzXTtcbiAgfVxuXG4gIHByaXZhdGUgZ3Vlc3NUeXBlKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCB0eXBlID0gc2NoZW1hID8gc2NoZW1hLnR5cGUgYXMgSlNPTlNjaGVtYTdUeXBlTmFtZSA6IG51bGw7XG4gICAgaWYgKCF0eXBlICYmIHNjaGVtYSAmJiBzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbMF07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLmxlbmd0aCA9PT0gMiAmJiB0eXBlLmluZGV4T2YoJ251bGwnKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbdHlwZVswXSA9PT0gJ251bGwnID8gMSA6IDBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRWYWxpZGF0b3IoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBuYW1lOiBzdHJpbmcsIHZhbGlkYXRvcjogKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBib29sZWFuKSB7XG4gICAgZmllbGQudmFsaWRhdG9ycyA9IGZpZWxkLnZhbGlkYXRvcnMgfHwge307XG4gICAgZmllbGQudmFsaWRhdG9yc1tuYW1lXSA9IHZhbGlkYXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbnVtKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICByZXR1cm4gc2NoZW1hLmVudW1cbiAgICAgIHx8IChzY2hlbWEuYW55T2YgJiYgc2NoZW1hLmFueU9mLmV2ZXJ5KGlzQ29uc3QpKVxuICAgICAgfHwgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YuZXZlcnkoaXNDb25zdCkpXG4gICAgICB8fCBzY2hlbWEudW5pcXVlSXRlbXMgJiYgc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykgJiYgdGhpcy5pc0VudW0oPEpTT05TY2hlbWE3PiBzY2hlbWEuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0VudW1PcHRpb25zKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgIHJldHVybiBzY2hlbWEuZW51bS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIGxhYmVsOiB2YWx1ZSB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9FbnVtID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHMuaGFzT3duUHJvcGVydHkoJ2NvbnN0JykgPyBzLmNvbnN0IDogcy5lbnVtWzBdO1xuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7IHZhbHVlOiB2YWx1ZSwgbGFiZWw6IHMudGl0bGUgfHwgdmFsdWUgfTtcbiAgICAgIGlmIChzLnJlYWRPbmx5KSB7XG4gICAgICAgIG9wdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfTtcblxuICAgIGlmIChzY2hlbWEuYW55T2YpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYW55T2YubWFwKHRvRW51bSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgcmV0dXJuIHNjaGVtYS5vbmVPZi5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50b0VudW1PcHRpb25zKDxKU09OU2NoZW1hNz4gc2NoZW1hLml0ZW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGaWVsZFZhbGlkKHJvb3Q6IEZvcm1seUZpZWxkQ29uZmlnLCBpOiBudW1iZXIsIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sIG9wdGlvbnM6IElPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgaWYgKCFyb290Wydfc2NoZW1hc0ZpZWxkcyddKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocm9vdCwgJ19zY2hlbWFzRmllbGRzJywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICAgIHJvb3RbJ19zY2hlbWFzRmllbGRzJ10gPSB7fTtcbiAgICB9XG5cbiAgICBsZXQgZmllbGQgPSByb290Wydfc2NoZW1hc0ZpZWxkcyddW2ldO1xuICAgIGNvbnN0IG1vZGVsID0gcm9vdC5tb2RlbCA/IGNsb25lKHJvb3QubW9kZWwpIDogKHJvb3QuZmllbGRBcnJheSA/IFtdIDoge30pO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGZpZWxkID0gcm9vdFsnX3NjaGVtYXNGaWVsZHMnXVtpXSA9IChyb290Lm9wdGlvbnMgYXMgYW55KS5fYnVpbGRGaWVsZCh7XG4gICAgICAgIGZvcm1Db250cm9sOiBBcnJheS5pc0FycmF5KG1vZGVsKSA/IG5ldyBGb3JtQXJyYXkoW10pIDogbmV3IEZvcm1Hcm91cCh7fSksXG4gICAgICAgIGZpZWxkR3JvdXA6IFt0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYXNbaV0sIHsgLi4ub3B0aW9ucywgcmVzZXRPbkhpZGU6IHRydWUsIGlnbm9yZURlZmF1bHQ6IHRydWUsIG1hcDogbnVsbCwgc3RyaWN0OiB0cnVlIH0pXSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkLm1vZGVsID0gbW9kZWw7XG4gICAgICAocm9vdC5vcHRpb25zIGFzIGFueSkuX2J1aWxkRmllbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZC5mb3JtQ29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VGaWVsZHMoZjE6IEZvcm1seUZpZWxkQ29uZmlnLCBmMjogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIGYyKSB7XG4gICAgICBpZiAoaXNPYmplY3QoZjFbcHJvcF0pICYmIGlzT2JqZWN0KGYyW3Byb3BdKSkge1xuICAgICAgICBmMVtwcm9wXSA9IHRoaXMubWVyZ2VGaWVsZHMoZjFbcHJvcF0sIGYyW3Byb3BdKTtcbiAgICAgIH0gZWxzZSBpZiAoZjJbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICBmMVtwcm9wXSA9IGYyW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmMTtcbiAgfVxufVxuIl19