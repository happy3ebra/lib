import { __assign, __rest, __read, __spread } from 'tslib';
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
    var e = 1;
    /** @type {?} */
    var p = 0;
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
    var total = field.fieldGroup.reduce((/**
     * @param {?} s
     * @param {?} f
     * @return {?}
     */
    function (s, f) { return totalMatchedFields(f) + s; }), 0);
    if (total === 0 && field.key) {
        /** @type {?} */
        var value = ɵgetFieldValue(field);
        if (value === null
            || ((value !== undefined)
                && ((field.fieldArray && Array.isArray(value))
                    || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
var FormlyJsonschema = /** @class */ (function () {
    function FormlyJsonschema() {
    }
    /**
     * @param {?} schema
     * @param {?=} options
     * @return {?}
     */
    FormlyJsonschema.prototype.toFieldConfig = /**
     * @param {?} schema
     * @param {?=} options
     * @return {?}
     */
    function (schema, options) {
        return this._toFieldConfig(schema, __assign({ schema: schema }, (options || {})));
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} __1
     * @return {?}
     */
    FormlyJsonschema.prototype._toFieldConfig = /**
     * @private
     * @param {?} schema
     * @param {?} __1
     * @return {?}
     */
    function (schema, _a) {
        var _this_1 = this;
        var key = _a.key, options = __rest(_a, ["key"]);
        schema = this.resolveSchema(schema, options);
        /** @type {?} */
        var field = {
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
            options = __assign({}, options, { readOnly: true });
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
            function (c, f) {
                /** @type {?} */
                var value = ɵgetFieldValue(f);
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
                function (_a) {
                    var value = _a.value;
                    return value === null;
                }));
                break;
            }
            case 'number':
            case 'integer': {
                field.parsers = [(/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) { return isEmpty(v) ? (v === '' ? null : v) : Number(v); })];
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
                    function (_a) {
                        var value = _a.value;
                        return isEmpty(value) || (value > schema.exclusiveMinimum);
                    }));
                }
                if (schema.hasOwnProperty('exclusiveMaximum')) {
                    field.templateOptions.exclusiveMaximum = schema.exclusiveMaximum;
                    this.addValidator(field, 'exclusiveMaximum', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var value = _a.value;
                        return isEmpty(value) || (value < schema.exclusiveMaximum);
                    }));
                }
                if (schema.hasOwnProperty('multipleOf')) {
                    field.templateOptions.step = schema.multipleOf;
                    this.addValidator(field, 'multipleOf', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var value = _a.value;
                        if (isEmpty(value) || typeof value !== 'number' || value === 0 || schema.multipleOf <= 0) {
                            return true;
                        }
                        // https://github.com/ajv-validator/ajv/issues/652#issue-283610859
                        /** @type {?} */
                        var multiplier = Math.pow(10, decimalPlaces(schema.multipleOf));
                        return Math.round(value * multiplier) % Math.round(schema.multipleOf * multiplier) === 0;
                    }));
                }
                break;
            }
            case 'string': {
                /** @type {?} */
                var schemaType = (/** @type {?} */ (schema.type));
                if (Array.isArray(schemaType) && (schemaType.indexOf('null') !== -1)) {
                    field.parsers = [(/**
                         * @param {?} v
                         * @return {?}
                         */
                        function (v) { return isEmpty(v) ? null : v; })];
                }
                ['minLength', 'maxLength', 'pattern'].forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                function (prop) {
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
                var _b = __read(this.resolveDependencies(schema), 2), propDeps_1 = _b[0], schemaDeps_1 = _b[1];
                Object.keys(schema.properties || {}).forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                function (property) {
                    /** @type {?} */
                    var f = _this_1._toFieldConfig((/** @type {?} */ (schema.properties[property])), __assign({}, options, { key: property }));
                    field.fieldGroup.push(f);
                    if ((Array.isArray(schema.required) && schema.required.indexOf(property) !== -1)
                        || propDeps_1[property]) {
                        f.expressionProperties = __assign({}, (f.expressionProperties || {}), { 'templateOptions.required': (/**
                             * @param {?} m
                             * @param {?} s
                             * @param {?} f
                             * @return {?}
                             */
                            function (m, s, f) {
                                /** @type {?} */
                                var parent = f.parent;
                                /** @type {?} */
                                var model = f.fieldGroup && f.key != null ? parent.model : f.model;
                                while (parent.key == null && parent.parent) {
                                    parent = parent.parent;
                                }
                                /** @type {?} */
                                var required = parent && parent.templateOptions ? parent.templateOptions.required : false;
                                if (!model && !required) {
                                    return false;
                                }
                                if (Array.isArray(schema.required) && schema.required.indexOf(property) !== -1) {
                                    return true;
                                }
                                return propDeps_1[property] && (m && propDeps_1[property].some((/**
                                 * @param {?} k
                                 * @return {?}
                                 */
                                function (k) { return !isEmpty(m[k]); })));
                            }) });
                    }
                    if (schemaDeps_1[property]) {
                        /** @type {?} */
                        var getConstValue_1 = (/**
                         * @param {?} s
                         * @return {?}
                         */
                        function (s) {
                            return s.hasOwnProperty('const') ? s.const : s.enum[0];
                        });
                        /** @type {?} */
                        var oneOfSchema = schemaDeps_1[property].oneOf;
                        if (oneOfSchema
                            && oneOfSchema.every((/**
                             * @param {?} o
                             * @return {?}
                             */
                            function (o) { return o.properties && o.properties[property] && isConst(o.properties[property]); }))) {
                            oneOfSchema.forEach((/**
                             * @param {?} oneOfSchemaItem
                             * @return {?}
                             */
                            function (oneOfSchemaItem) {
                                var _a = oneOfSchemaItem.properties, _b = property, constSchema = _a[_b], properties = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                field.fieldGroup.push(__assign({}, _this_1._toFieldConfig(__assign({}, oneOfSchemaItem, { properties: properties }), __assign({}, options, { resetOnHide: true })), { hideExpression: (/**
                                     * @param {?} m
                                     * @return {?}
                                     */
                                    function (m) { return !m || getConstValue_1(constSchema) !== m[property]; }) }));
                            }));
                        }
                        else {
                            field.fieldGroup.push(__assign({}, _this_1._toFieldConfig(schemaDeps_1[property], options), { hideExpression: (/**
                                 * @param {?} m
                                 * @return {?}
                                 */
                                function (m) { return !m || isEmpty(m[property]); }) }));
                        }
                    }
                }));
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), __assign({}, options, { shareFormControl: false })));
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
                    function (_a) {
                        var value = _a.value;
                        return isEmpty(value) || (value.length >= schema.minItems);
                    }));
                }
                if (schema.hasOwnProperty('maxItems')) {
                    field.templateOptions.maxItems = schema.maxItems;
                    this.addValidator(field, 'maxItems', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var value = _a.value;
                        return isEmpty(value) || (value.length <= schema.maxItems);
                    }));
                }
                if (schema.hasOwnProperty('uniqueItems')) {
                    field.templateOptions.uniqueItems = schema.uniqueItems;
                    this.addValidator(field, 'uniqueItems', (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var value = _a.value;
                        if (isEmpty(value) || !schema.uniqueItems) {
                            return true;
                        }
                        /** @type {?} */
                        var uniqueItems = Array.from(new Set(value.map((/**
                         * @param {?} v
                         * @return {?}
                         */
                        function (v) { return JSON.stringify(v); }))));
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
                    var _this_2 = this;
                    Object.defineProperty(field, 'fieldArray', {
                        get: (/**
                         * @return {?}
                         */
                        function () {
                            if (schema.items && !Array.isArray(schema.items)) {
                                // When items is a single schema, the additionalItems keyword is meaningless, and it should not be used.
                                return _this_2._toFieldConfig((/** @type {?} */ (schema.items)), options);
                            }
                            /** @type {?} */
                            var length = this.fieldGroup ? this.fieldGroup.length : 0;
                            if (schema.items && schema.items[length]) {
                                /** @type {?} */
                                var f = _this_2._toFieldConfig((/** @type {?} */ (schema.items[length])), __assign({}, options));
                                f.templateOptions.removable = false;
                                return f;
                            }
                            return schema.additionalItems
                                ? _this_2._toFieldConfig((/** @type {?} */ (schema.additionalItems)), options)
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
            function (_a) {
                var value = _a.value;
                return value === schema.const;
            }));
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
                this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), __assign({}, options, { key: key, shareFormControl: false })),
            ];
        }
        // map in possible formlyConfig options from the widget property
        if (schema['widget'] && schema['widget'].formlyConfig) {
            field = this.mergeFields(field, schema['widget'].formlyConfig);
        }
        // if there is a map function passed in, use it to allow the user to
        // further customize how fields are being mapped
        return options.map ? options.map(field, schema) : field;
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    FormlyJsonschema.prototype.resolveSchema = /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    function (schema, options) {
        if (schema && schema.$ref) {
            schema = this.resolveDefinition(schema, options);
        }
        if (schema && schema.allOf) {
            schema = this.resolveAllOf(schema, options);
        }
        return schema;
    };
    /**
     * @private
     * @param {?} __0
     * @param {?} options
     * @return {?}
     */
    FormlyJsonschema.prototype.resolveAllOf = /**
     * @private
     * @param {?} __0
     * @param {?} options
     * @return {?}
     */
    function (_a, options) {
        var _this_1 = this;
        var allOf = _a.allOf, baseSchema = __rest(_a, ["allOf"]);
        if (!allOf.length) {
            throw Error("allOf array can not be empty " + allOf + ".");
        }
        return allOf.reduce((/**
         * @param {?} base
         * @param {?} schema
         * @return {?}
         */
        function (base, schema) {
            schema = _this_1.resolveSchema(schema, options);
            if (base.required && schema.required) {
                base.required = __spread(base.required, schema.required);
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
            function (prop) {
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
            function (prop) {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] > schema[prop] ? base[prop] : schema[prop];
                }
            }));
            return ɵreverseDeepMerge(base, schema);
        }), baseSchema);
    };
    /**
     * @private
     * @param {?} mode
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    FormlyJsonschema.prototype.resolveMultiSchema = /**
     * @private
     * @param {?} mode
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    function (mode, schemas, options) {
        var _this_1 = this;
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
                        function (s, i) { return ({ label: s.title, value: i, disabled: s.readOnly }); })),
                    },
                    hooks: {
                        onInit: (/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.formControl.valueChanges.pipe(tap((/**
                         * @return {?}
                         */
                        function () { return ((/** @type {?} */ (f.options)))._checkField(f.parent); }))); }),
                    },
                },
                {
                    fieldGroup: schemas.map((/**
                     * @param {?} s
                     * @param {?} i
                     * @return {?}
                     */
                    function (s, i) { return (__assign({}, _this_1._toFieldConfig(s, __assign({}, options, { resetOnHide: true })), { hideExpression: (/**
                         * @param {?} m
                         * @param {?} fs
                         * @param {?} f
                         * @param {?=} forceUpdate
                         * @return {?}
                         */
                        function (m, fs, f, forceUpdate) {
                            /** @type {?} */
                            var control = f.parent.parent.fieldGroup[0].formControl;
                            if ((control.value === -1) || forceUpdate) {
                                /** @type {?} */
                                var value = f.parent.fieldGroup
                                    .map((/**
                                 * @param {?} f
                                 * @param {?} i
                                 * @return {?}
                                 */
                                function (f, i) { return (/** @type {?} */ ([f, i, _this_1.isFieldValid(f, i, schemas, options)])); }))
                                    .sort((/**
                                 * @param {?} __0
                                 * @param {?} __1
                                 * @return {?}
                                 */
                                function (_a, _b) {
                                    var _c = __read(_a, 3), f1 = _c[0], i1 = _c[1], f1Valid = _c[2];
                                    var _d = __read(_b, 3), f2 = _d[0], i2 = _d[1], f2Valid = _d[2];
                                    if (f1Valid !== f2Valid) {
                                        return f2Valid ? 1 : -1;
                                    }
                                    /** @type {?} */
                                    var matchedFields1 = totalMatchedFields(f1);
                                    /** @type {?} */
                                    var matchedFields2 = totalMatchedFields(f2);
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
                                function (_a) {
                                    var _b = __read(_a, 2), i = _b[1];
                                    return i;
                                }));
                                if (mode === 'anyOf') {
                                    /** @type {?} */
                                    var definedValue = value.filter((/**
                                     * @param {?} i
                                     * @return {?}
                                     */
                                    function (i) { return totalMatchedFields(f.parent.fieldGroup[i]); }));
                                    value = definedValue.length > 0 ? definedValue : [value[0] || 0];
                                }
                                value = value.length > 0 ? value : [0];
                                control.setValue(mode === 'anyOf' ? value : value[0]);
                            }
                            return Array.isArray(control.value)
                                ? control.value.indexOf(i) === -1
                                : control.value !== i;
                        }) })); })),
                },
            ],
        };
    };
    /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    FormlyJsonschema.prototype.resolveDefinition = /**
     * @private
     * @param {?} schema
     * @param {?} options
     * @return {?}
     */
    function (schema, options) {
        var _a = __read(schema.$ref.split('#/'), 2), uri = _a[0], pointer = _a[1];
        if (uri) {
            throw Error("Remote schemas for " + schema.$ref + " not supported yet.");
        }
        /** @type {?} */
        var definition = !pointer ? null : pointer.split('/').reduce((/**
         * @param {?} def
         * @param {?} path
         * @return {?}
         */
        function (def, path) { return def && def.hasOwnProperty(path) ? def[path] : null; }), options.schema);
        if (!definition) {
            throw Error("Cannot find a definition for " + schema.$ref + ".");
        }
        if (definition.$ref) {
            return this.resolveDefinition(definition, options);
        }
        return __assign({}, definition, ['title', 'description', 'default', 'widget'].reduce((/**
         * @param {?} annotation
         * @param {?} p
         * @return {?}
         */
        function (annotation, p) {
            if (schema.hasOwnProperty(p)) {
                annotation[p] = schema[p];
            }
            return annotation;
        }), {}));
    };
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    FormlyJsonschema.prototype.resolveDependencies = /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var deps = {};
        /** @type {?} */
        var schemaDeps = {};
        Object.keys(schema.dependencies || {}).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            /** @type {?} */
            var dependency = (/** @type {?} */ (schema.dependencies[prop]));
            if (Array.isArray(dependency)) {
                // Property dependencies
                dependency.forEach((/**
                 * @param {?} dep
                 * @return {?}
                 */
                function (dep) {
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
    };
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    FormlyJsonschema.prototype.guessType = /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var type = schema ? (/** @type {?} */ (schema.type)) : null;
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
    };
    /**
     * @private
     * @param {?} field
     * @param {?} name
     * @param {?} validator
     * @return {?}
     */
    FormlyJsonschema.prototype.addValidator = /**
     * @private
     * @param {?} field
     * @param {?} name
     * @param {?} validator
     * @return {?}
     */
    function (field, name, validator) {
        field.validators = field.validators || {};
        field.validators[name] = validator;
    };
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    FormlyJsonschema.prototype.isEnum = /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        return schema.enum
            || (schema.anyOf && schema.anyOf.every(isConst))
            || (schema.oneOf && schema.oneOf.every(isConst))
            || schema.uniqueItems && schema.items && !Array.isArray(schema.items) && this.isEnum((/** @type {?} */ (schema.items)));
    };
    /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    FormlyJsonschema.prototype.toEnumOptions = /**
     * @private
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        if (schema.enum) {
            return schema.enum.map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return ({ value: value, label: value }); }));
        }
        /** @type {?} */
        var toEnum = (/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var value = s.hasOwnProperty('const') ? s.const : s.enum[0];
            /** @type {?} */
            var option = { value: value, label: s.title || value };
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
    };
    /**
     * @private
     * @param {?} root
     * @param {?} i
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    FormlyJsonschema.prototype.isFieldValid = /**
     * @private
     * @param {?} root
     * @param {?} i
     * @param {?} schemas
     * @param {?} options
     * @return {?}
     */
    function (root, i, schemas, options) {
        if (!root['_schemasFields']) {
            Object.defineProperty(root, '_schemasFields', { enumerable: false, writable: true, configurable: true });
            root['_schemasFields'] = {};
        }
        /** @type {?} */
        var field = root['_schemasFields'][i];
        /** @type {?} */
        var model = root.model ? ɵclone(root.model) : (root.fieldArray ? [] : {});
        if (!field) {
            field = root['_schemasFields'][i] = ((/** @type {?} */ (root.options)))._buildField({
                formControl: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [this._toFieldConfig(schemas[i], __assign({}, options, { resetOnHide: true, ignoreDefault: true, map: null, strict: true }))],
                model: model,
                options: {},
            });
        }
        else {
            field.model = model;
            ((/** @type {?} */ (root.options)))._buildField(field);
        }
        return field.formControl.valid;
    };
    /**
     * @private
     * @param {?} f1
     * @param {?} f2
     * @return {?}
     */
    FormlyJsonschema.prototype.mergeFields = /**
     * @private
     * @param {?} f1
     * @param {?} f2
     * @return {?}
     */
    function (f1, f2) {
        for (var prop in f2) {
            if (isObject(f1[prop]) && isObject(f2[prop])) {
                f1[prop] = this.mergeFields(f1[prop], f2[prop]);
            }
            else if (f2[prop] != null) {
                f1[prop] = f2[prop];
            }
        }
        return f1;
    };
    FormlyJsonschema.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ FormlyJsonschema.ngInjectableDef = defineInjectable({ factory: function FormlyJsonschema_Factory() { return new FormlyJsonschema(); }, token: FormlyJsonschema, providedIn: "root" });
    return FormlyJsonschema;
}());

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