import { __rest } from 'tslib';
import { Injectable, defineInjectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵreverseDeepMerge, ɵgetFieldValue, ɵclone } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return field.key && ɵgetFieldValue(field) !== undefined ? 1 : 0;
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
        const value = ɵgetFieldValue(field);
        if (value === null
            || ((value !== undefined)
                && ((field.fieldArray && Array.isArray(value))
                    || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
class FormlyJsonschema {
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
        var { key } = _a, options = __rest(_a, ["key"]);
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
                const value = ɵgetFieldValue(f);
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
                                const _a = oneOfSchemaItem.properties, _b = property, constSchema = _a[_b], properties = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
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
        var { allOf } = _a, baseSchema = __rest(_a, ["allOf"]);
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
            return ɵreverseDeepMerge(base, schema);
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
        const model = root.model ? ɵclone(root.model) : (root.fieldArray ? [] : {});
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
/** @nocollapse */ FormlyJsonschema.ngInjectableDef = defineInjectable({ factory: function FormlyJsonschema_Factory() { return new FormlyJsonschema(); }, token: FormlyJsonschema, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FormlyJsonschema };

//# sourceMappingURL=ngx-formly-core-json-schema.js.map