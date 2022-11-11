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
        return field.key && getFieldValue(field) !== undefined ? 1 : 0;
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
        var value = getFieldValue(field);
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
        return this._toFieldConfig(schema, tslib_1.__assign({ schema: schema }, (options || {})));
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
        var key = _a.key, options = tslib_1.__rest(_a, ["key"]);
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
            options = tslib_1.__assign({}, options, { readOnly: true });
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
                var value = getFieldValue(f);
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
                var _b = tslib_1.__read(this.resolveDependencies(schema), 2), propDeps_1 = _b[0], schemaDeps_1 = _b[1];
                Object.keys(schema.properties || {}).forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                function (property) {
                    /** @type {?} */
                    var f = _this_1._toFieldConfig((/** @type {?} */ (schema.properties[property])), tslib_1.__assign({}, options, { key: property }));
                    field.fieldGroup.push(f);
                    if ((Array.isArray(schema.required) && schema.required.indexOf(property) !== -1)
                        || propDeps_1[property]) {
                        f.expressionProperties = tslib_1.__assign({}, (f.expressionProperties || {}), { 'templateOptions.required': (/**
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
                                var _a = oneOfSchemaItem.properties, _b = property, constSchema = _a[_b], properties = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                field.fieldGroup.push(tslib_1.__assign({}, _this_1._toFieldConfig(tslib_1.__assign({}, oneOfSchemaItem, { properties: properties }), tslib_1.__assign({}, options, { resetOnHide: true })), { hideExpression: (/**
                                     * @param {?} m
                                     * @return {?}
                                     */
                                    function (m) { return !m || getConstValue_1(constSchema) !== m[property]; }) }));
                            }));
                        }
                        else {
                            field.fieldGroup.push(tslib_1.__assign({}, _this_1._toFieldConfig(schemaDeps_1[property], options), { hideExpression: (/**
                                 * @param {?} m
                                 * @return {?}
                                 */
                                function (m) { return !m || isEmpty(m[property]); }) }));
                        }
                    }
                }));
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), tslib_1.__assign({}, options, { shareFormControl: false })));
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
                                var f = _this_2._toFieldConfig((/** @type {?} */ (schema.items[length])), tslib_1.__assign({}, options));
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
                this.resolveMultiSchema('oneOf', (/** @type {?} */ (schema.oneOf)), tslib_1.__assign({}, options, { key: key, shareFormControl: false })),
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
        var allOf = _a.allOf, baseSchema = tslib_1.__rest(_a, ["allOf"]);
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
                base.required = tslib_1.__spread(base.required, schema.required);
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
            return reverseDeepMerge(base, schema);
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
                    function (s, i) { return (tslib_1.__assign({}, _this_1._toFieldConfig(s, tslib_1.__assign({}, options, { resetOnHide: true })), { hideExpression: (/**
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
                                    var _c = tslib_1.__read(_a, 3), f1 = _c[0], i1 = _c[1], f1Valid = _c[2];
                                    var _d = tslib_1.__read(_b, 3), f2 = _d[0], i2 = _d[1], f2Valid = _d[2];
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
                                    var _b = tslib_1.__read(_a, 2), i = _b[1];
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
        var _a = tslib_1.__read(schema.$ref.split('#/'), 2), uri = _a[0], pointer = _a[1];
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
        return tslib_1.__assign({}, definition, ['title', 'description', 'default', 'widget'].reduce((/**
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
        var model = root.model ? clone(root.model) : (root.fieldArray ? [] : {});
        if (!field) {
            field = root['_schemasFields'][i] = ((/** @type {?} */ (root.options)))._buildField({
                formControl: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [this._toFieldConfig(schemas[i], tslib_1.__assign({}, options, { resetOnHide: true, ignoreDefault: true, map: null, strict: true }))],
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
    /** @nocollapse */ FormlyJsonschema.ngInjectableDef = i0.defineInjectable({ factory: function FormlyJsonschema_Factory() { return new FormlyJsonschema(); }, token: FormlyJsonschema, providedIn: "root" });
    return FormlyJsonschema;
}());
export { FormlyJsonschema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlL2pzb24tc2NoZW1hLyIsInNvdXJjZXMiOlsiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFDckMsY0FBYyxJQUFJLGFBQWEsRUFDL0IsTUFBTSxJQUFJLEtBQUssR0FDaEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRXJDLDZDQU9DOzs7Ozs7OztJQURDLHNDQUFvRjs7Ozs7OztBQUl0RixTQUFTLGFBQWEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxDQUFDLENBQUM7S0FDVjs7UUFFRyxDQUFDLEdBQUcsQ0FBQzs7UUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQUMsQ0FBQyxFQUFFLENBQUM7S0FBRTtJQUVyRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7Ozs7O0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ25ELENBQUM7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLENBQUMs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QUFDLENBQUM7YUFDakQ7aUJBQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUMzQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O2dCQXhpQkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OzJCQW5GbEM7Q0E0bkJDLEFBemlCRCxJQXlpQkM7U0F4aUJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBKU09OU2NoZW1hNywgSlNPTlNjaGVtYTdUeXBlTmFtZSB9IGZyb20gJ2pzb24tc2NoZW1hJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICDJtXJldmVyc2VEZWVwTWVyZ2UgYXMgcmV2ZXJzZURlZXBNZXJnZSxcbiAgybVnZXRGaWVsZFZhbHVlIGFzIGdldEZpZWxkVmFsdWUsXG4gIMm1Y2xvbmUgYXMgY2xvbmUsXG59IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUpzb25zY2hlbWFPcHRpb25zIHtcbiAgLyoqXG4gICAqIGFsbG93cyB0byBpbnRlcmNlcHQgdGhlIG1hcHBpbmcsIHRha2luZyB0aGUgYWxyZWFkeSBtYXBwZWRcbiAgICogZm9ybWx5IGZpZWxkIGFuZCB0aGUgb3JpZ2luYWwgSlNPTlNjaGVtYSBzb3VyY2UgZnJvbSB3aGljaCBpdFxuICAgKiB3YXMgbWFwcGVkLlxuICAgKi9cbiAgbWFwPzogKG1hcHBlZEZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgbWFwU291cmNlOiBKU09OU2NoZW1hNykgPT4gRm9ybWx5RmllbGRDb25maWc7XG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzg2NTI4NVxuZnVuY3Rpb24gZGVjaW1hbFBsYWNlcyhhOiBudW1iZXIpIHtcbiAgaWYgKCFpc0Zpbml0ZShhKSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgbGV0IGUgPSAxLCBwID0gMDtcbiAgd2hpbGUgKE1hdGgucm91bmQoYSAqIGUpIC8gZSAhPT0gYSkgeyBlICo9IDEwOyBwKys7IH1cblxuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eSh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgPT09ICcnIHx8IHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyID8gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNDb25zdChzY2hlbWE6IEpTT05TY2hlbWE3KSB7XG4gIHJldHVybiBzY2hlbWEuaGFzT3duUHJvcGVydHkoJ2NvbnN0JykgfHwgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSk7XG59XG5cbmZ1bmN0aW9uIHRvdGFsTWF0Y2hlZEZpZWxkcyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBudW1iZXIge1xuICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICByZXR1cm4gZmllbGQua2V5ICYmIGdldEZpZWxkVmFsdWUoZmllbGQpICE9PSB1bmRlZmluZWQgPyAxIDogMDtcbiAgfVxuXG4gIGNvbnN0IHRvdGFsID0gZmllbGQuZmllbGRHcm91cC5yZWR1Y2UoKHMsIGYpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmKSArIHMsIDApO1xuICBpZiAodG90YWwgPT09IDAgJiYgZmllbGQua2V5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGZpZWxkKTtcbiAgICBpZiAoXG4gICAgICB2YWx1ZSA9PT0gbnVsbFxuICAgICAgfHwgKFxuICAgICAgICAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgJiYgKFxuICAgICAgICAgIChmaWVsZC5maWVsZEFycmF5ICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICAgIHx8ICghZmllbGQuZmllbGRBcnJheSAmJiBpc09iamVjdCh2YWx1ZSkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b3RhbDtcbn1cblxuaW50ZXJmYWNlIElPcHRpb25zIGV4dGVuZHMgRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMge1xuICBzY2hlbWE6IEpTT05TY2hlbWE3O1xuICByZXNldE9uSGlkZT86IGJvb2xlYW47XG4gIHNoYXJlRm9ybUNvbnRyb2w/OiBib29sZWFuO1xuICBpZ25vcmVEZWZhdWx0PzogYm9vbGVhbjtcbiAgc3RyaWN0PzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBrZXk/OiBGb3JtbHlGaWVsZENvbmZpZ1sna2V5J107XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5SnNvbnNjaGVtYSB7XG4gIHRvRmllbGRDb25maWcoc2NoZW1hOiBKU09OU2NoZW1hNywgb3B0aW9ucz86IEZvcm1seUpzb25zY2hlbWFPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYSwgeyBzY2hlbWEsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvRmllbGRDb25maWcoc2NoZW1hOiBKU09OU2NoZW1hNywgeyBrZXksIC4uLm9wdGlvbnMgfTogSU9wdGlvbnMpOiBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlU2NoZW1hKHNjaGVtYSwgb3B0aW9ucyk7XG5cbiAgICBsZXQgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnID0ge1xuICAgICAgdHlwZTogdGhpcy5ndWVzc1R5cGUoc2NoZW1hKSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogc2NoZW1hLmRlZmF1bHQsXG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcbiAgICAgICAgbGFiZWw6IHNjaGVtYS50aXRsZSxcbiAgICAgICAgcmVhZG9ubHk6IHNjaGVtYS5yZWFkT25seSxcbiAgICAgICAgZGVzY3JpcHRpb246IHNjaGVtYS5kZXNjcmlwdGlvbixcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgZmllbGQua2V5ID0ga2V5O1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5pZ25vcmVEZWZhdWx0ICYmIChzY2hlbWEucmVhZE9ubHkgfHwgb3B0aW9ucy5yZWFkT25seSkpIHtcbiAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCByZWFkT25seTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlc2V0T25IaWRlKSB7XG4gICAgICBmaWVsZFsncmVzZXRPbkhpZGUnXSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGtleSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywgKGMsIGYpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgICAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zaGFyZUZvcm1Db250cm9sID09PSBmYWxzZSkge1xuICAgICAgZmllbGRbJ3NoYXJlRm9ybUNvbnRyb2wnXSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZURlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICBjYXNlICdudWxsJzoge1xuICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ251bGwnLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gbnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgIGZpZWxkLnBhcnNlcnMgPSBbdiA9PiBpc0VtcHR5KHYpID8gKHYgPT09ICcnID8gbnVsbCA6IHYpIDogTnVtYmVyKHYpXTtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1pbiA9IHNjaGVtYS5taW5pbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmV4Y2x1c2l2ZU1pbmltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWluaW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2V4Y2x1c2l2ZU1pbmltdW0nLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUgPiBzY2hlbWEuZXhjbHVzaXZlTWluaW11bSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmV4Y2x1c2l2ZU1heGltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2V4Y2x1c2l2ZU1heGltdW0nLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUgPCBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGVPZicpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ211bHRpcGxlT2YnLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gMCB8fCBzY2hlbWEubXVsdGlwbGVPZiA8PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYWp2LXZhbGlkYXRvci9hanYvaXNzdWVzLzY1MiNpc3N1ZS0yODM2MTA4NTlcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyhzY2hlbWEubXVsdGlwbGVPZikpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAlIE1hdGgucm91bmQoc2NoZW1hLm11bHRpcGxlT2YgKiBtdWx0aXBsaWVyKSA9PT0gMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hVHlwZSA9IHNjaGVtYS50eXBlIGFzIEpTT05TY2hlbWE3VHlwZU5hbWU7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYVR5cGUpICYmIChzY2hlbWFUeXBlLmluZGV4T2YoJ251bGwnKSAhPT0gLTEpKSB7XG4gICAgICAgICAgZmllbGQucGFyc2VycyA9IFt2ID0+IGlzRW1wdHkodikgPyBudWxsIDogdl07XG4gICAgICAgIH1cblxuICAgICAgICBbJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnLCAncGF0dGVybiddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zW3Byb3BdID0gc2NoZW1hW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbcHJvcERlcHMsIHNjaGVtYURlcHNdID0gdGhpcy5yZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgICBjb25zdCBmID0gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSwgeyAuLi5vcHRpb25zLCBrZXk6IHByb3BlcnR5IH0pO1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChmKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpXG4gICAgICAgICAgICB8fCBwcm9wRGVwc1twcm9wZXJ0eV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGYuZXhwcmVzc2lvblByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICAgIC4uLihmLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9KSxcbiAgICAgICAgICAgICAgJ3RlbXBsYXRlT3B0aW9ucy5yZXF1aXJlZCc6IChtLCBzLCBmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGYucGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gZi5maWVsZEdyb3VwICYmIGYua2V5ICE9IG51bGwgPyBwYXJlbnQubW9kZWwgOiBmLm1vZGVsO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQua2V5ID09IG51bGwgJiYgcGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IHBhcmVudCAmJiBwYXJlbnQudGVtcGxhdGVPcHRpb25zID8gcGFyZW50LnRlbXBsYXRlT3B0aW9ucy5yZXF1aXJlZCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghbW9kZWwgJiYgIXJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlcHNbcHJvcGVydHldICYmIChtICYmIHByb3BEZXBzW3Byb3BlcnR5XS5zb21lKGsgPT4gIWlzRW1wdHkobVtrXSkpKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNjaGVtYURlcHNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRDb25zdFZhbHVlID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBzLmhhc093blByb3BlcnR5KCdjb25zdCcpID8gcy5jb25zdCA6IHMuZW51bVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IG9uZU9mU2NoZW1hID0gc2NoZW1hRGVwc1twcm9wZXJ0eV0ub25lT2Y7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG9uZU9mU2NoZW1hXG4gICAgICAgICAgICAgICYmIG9uZU9mU2NoZW1hLmV2ZXJ5KG8gPT4gby5wcm9wZXJ0aWVzICYmIG8ucHJvcGVydGllc1twcm9wZXJ0eV0gJiYgaXNDb25zdChvLnByb3BlcnRpZXNbcHJvcGVydHldKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBvbmVPZlNjaGVtYS5mb3JFYWNoKG9uZU9mU2NoZW1hSXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBbcHJvcGVydHldOiBjb25zdFNjaGVtYSwgLi4ucHJvcGVydGllcyB9ID0gb25lT2ZTY2hlbWFJdGVtLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoeyAuLi5vbmVPZlNjaGVtYUl0ZW0sIHByb3BlcnRpZXMgfSwgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiBtID0+ICFtIHx8IGdldENvbnN0VmFsdWUoY29uc3RTY2hlbWEpICE9PSBtW3Byb3BlcnR5XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoc2NoZW1hRGVwc1twcm9wZXJ0eV0sIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiBtID0+ICFtIHx8IGlzRW1wdHkobVtwcm9wZXJ0eV0pLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh0aGlzLnJlc29sdmVNdWx0aVNjaGVtYShcbiAgICAgICAgICAgICdvbmVPZicsXG4gICAgICAgICAgICA8SlNPTlNjaGVtYTdbXT4gc2NoZW1hLm9uZU9mLFxuICAgICAgICAgICAgeyAuLi5vcHRpb25zLCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9LFxuICAgICAgICAgICkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5hbnlPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh0aGlzLnJlc29sdmVNdWx0aVNjaGVtYShcbiAgICAgICAgICAgICdhbnlPZicsXG4gICAgICAgICAgICA8SlNPTlNjaGVtYTdbXT4gc2NoZW1hLmFueU9mLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpKSB7XG4gICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLm1pbkl0ZW1zID0gc2NoZW1hLm1pbkl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWluSXRlbXMnLCAoeyB2YWx1ZSB9KSA9PiBpc0VtcHR5KHZhbHVlKSB8fCAodmFsdWUubGVuZ3RoID49IHNjaGVtYS5taW5JdGVtcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heEl0ZW1zJykpIHtcbiAgICAgICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMubWF4SXRlbXMgPSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtYXhJdGVtcycsICh7IHZhbHVlIH0pID0+IGlzRW1wdHkodmFsdWUpIHx8ICh2YWx1ZS5sZW5ndGggPD0gc2NoZW1hLm1heEl0ZW1zKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgndW5pcXVlSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy51bmlxdWVJdGVtcyA9IHNjaGVtYS51bmlxdWVJdGVtcztcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ3VuaXF1ZUl0ZW1zJywgKHsgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpIHx8ICFzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUl0ZW1zID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgbmV3IFNldCh2YWx1ZS5tYXAoKHY6IGFueSkgPT4gSlNPTi5zdHJpbmdpZnkodikpKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVJdGVtcy5sZW5ndGggPT09IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc29sdmUgaXRlbXMgc2NoZW1hIG5lZWRlZCBmb3IgaXNFbnVtIGNoZWNrXG4gICAgICAgIGlmIChzY2hlbWEuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgIHNjaGVtYS5pdGVtcyA9IHRoaXMucmVzb2x2ZVNjaGVtYSg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiByZW1vdmUgaXNFbnVtIGNoZWNrIG9uY2UgYWRkaW5nIGFuIG9wdGlvbiB0byBza2lwIGV4dGVuc2lvblxuICAgICAgICBpZiAoIXRoaXMuaXNFbnVtKHNjaGVtYSkpIHtcbiAgICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZpZWxkLCAnZmllbGRBcnJheScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgICAgICAvLyBXaGVuIGl0ZW1zIGlzIGEgc2luZ2xlIHNjaGVtYSwgdGhlIGFkZGl0aW9uYWxJdGVtcyBrZXl3b3JkIGlzIG1lYW5pbmdsZXNzLCBhbmQgaXQgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmZpZWxkR3JvdXAgPyB0aGlzLmZpZWxkR3JvdXAubGVuZ3RoIDogMDtcbiAgICAgICAgICAgICAgaWYgKHNjaGVtYS5pdGVtcyAmJiBzY2hlbWEuaXRlbXNbbGVuZ3RoXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGYgPSBfdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+IHNjaGVtYS5pdGVtc1tsZW5ndGhdLCB7IC4uLm9wdGlvbnN9KTtcbiAgICAgICAgICAgICAgICBmLnRlbXBsYXRlT3B0aW9ucy5yZW1vdmFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXNcbiAgICAgICAgICAgICAgICA/IF90aGlzLl90b0ZpZWxkQ29uZmlnKDxKU09OU2NoZW1hNz4gc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgb3B0aW9ucylcbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpKSB7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuY29uc3QgPSBzY2hlbWEuY29uc3Q7XG4gICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ2NvbnN0JywgKHsgdmFsdWUgfSkgPT4gdmFsdWUgPT09IHNjaGVtYS5jb25zdCk7XG4gICAgICBpZiAoIWZpZWxkLnR5cGUpIHtcbiAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gc2NoZW1hLmNvbnN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRW51bShzY2hlbWEpKSB7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMubXVsdGlwbGUgPSBmaWVsZC50eXBlID09PSAnYXJyYXknO1xuICAgICAgZmllbGQudHlwZSA9ICdlbnVtJztcbiAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5vcHRpb25zID0gdGhpcy50b0VudW1PcHRpb25zKHNjaGVtYSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZiAmJiAhZmllbGQudHlwZSkge1xuICAgICAgZGVsZXRlIGZpZWxkLmtleTtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXG4gICAgICAgIHRoaXMucmVzb2x2ZU11bHRpU2NoZW1hKCdvbmVPZicsIDxKU09OU2NoZW1hN1tdPnNjaGVtYS5vbmVPZiwgeyAuLi5vcHRpb25zLCBrZXksIHNoYXJlRm9ybUNvbnRyb2w6IGZhbHNlIH0pLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBtYXAgaW4gcG9zc2libGUgZm9ybWx5Q29uZmlnIG9wdGlvbnMgZnJvbSB0aGUgd2lkZ2V0IHByb3BlcnR5XG4gICAgaWYgKHNjaGVtYVsnd2lkZ2V0J10gJiYgc2NoZW1hWyd3aWRnZXQnXS5mb3JtbHlDb25maWcpIHtcbiAgICAgIGZpZWxkID0gdGhpcy5tZXJnZUZpZWxkcyhmaWVsZCwgc2NoZW1hWyd3aWRnZXQnXS5mb3JtbHlDb25maWcpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgbWFwIGZ1bmN0aW9uIHBhc3NlZCBpbiwgdXNlIGl0IHRvIGFsbG93IHRoZSB1c2VyIHRvXG4gICAgLy8gZnVydGhlciBjdXN0b21pemUgaG93IGZpZWxkcyBhcmUgYmVpbmcgbWFwcGVkXG4gICAgcmV0dXJuIG9wdGlvbnMubWFwID8gb3B0aW9ucy5tYXAoZmllbGQsIHNjaGVtYSkgOiBmaWVsZDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVNjaGVtYShzY2hlbWE6IEpTT05TY2hlbWE3LCBvcHRpb25zOiBJT3B0aW9ucykge1xuICAgIGlmIChzY2hlbWEgJiYgc2NoZW1hLiRyZWYpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZURlZmluaXRpb24oc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS5hbGxPZikge1xuICAgICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlQWxsT2Yoc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlQWxsT2YoeyBhbGxPZiwgLi4uYmFzZVNjaGVtYSB9OiBKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpIHtcbiAgICBpZiAoIWFsbE9mLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYGFsbE9mIGFycmF5IGNhbiBub3QgYmUgZW1wdHkgJHthbGxPZn0uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsbE9mLnJlZHVjZSgoYmFzZTogSlNPTlNjaGVtYTcsIHNjaGVtYTogSlNPTlNjaGVtYTcpID0+IHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZVNjaGVtYShzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgaWYgKGJhc2UucmVxdWlyZWQgJiYgc2NoZW1hLnJlcXVpcmVkKSB7XG4gICAgICAgIGJhc2UucmVxdWlyZWQgPSBbLi4uYmFzZS5yZXF1aXJlZCwgLi4uc2NoZW1hLnJlcXVpcmVkXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYS51bmlxdWVJdGVtcykge1xuICAgICAgICBiYXNlLnVuaXF1ZUl0ZW1zID0gc2NoZW1hLnVuaXF1ZUl0ZW1zO1xuICAgICAgfVxuXG4gICAgICAvLyByZXNvbHZlIHRvIG1pbiB2YWx1ZVxuICAgICAgWydtYXhMZW5ndGgnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21heEl0ZW1zJywgJ21heFByb3BlcnRpZXMnXVxuICAgICAgICAuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBpZiAoIWlzRW1wdHkoYmFzZVtwcm9wXSkgJiYgIWlzRW1wdHkoc2NoZW1hW3Byb3BdKSkge1xuICAgICAgICAgICAgYmFzZVtwcm9wXSA9IGJhc2VbcHJvcF0gPCBzY2hlbWFbcHJvcF0gPyBiYXNlW3Byb3BdIDogc2NoZW1hW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIHJlc29sdmUgdG8gbWF4IHZhbHVlXG4gICAgICBbJ21pbkxlbmd0aCcsICdtaW5pbXVtJywgJ2V4Y2x1c2l2ZU1pbmltdW0nLCAnbWluSXRlbXMnLCAnbWluUHJvcGVydGllcyddXG4gICAgICAgIC5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgIGlmICghaXNFbXB0eShiYXNlW3Byb3BdKSAmJiAhaXNFbXB0eShzY2hlbWFbcHJvcF0pKSB7XG4gICAgICAgICAgICBiYXNlW3Byb3BdID0gYmFzZVtwcm9wXSA+IHNjaGVtYVtwcm9wXSA/IGJhc2VbcHJvcF0gOiBzY2hlbWFbcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJldmVyc2VEZWVwTWVyZ2UoYmFzZSwgc2NoZW1hKTtcbiAgICB9LCBiYXNlU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU11bHRpU2NoZW1hKFxuICAgIG1vZGU6ICdvbmVPZicgfCAnYW55T2YnLFxuICAgIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sXG4gICAgb3B0aW9uczogSU9wdGlvbnMsXG4gICk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ211bHRpc2NoZW1hJyxcbiAgICAgIGZpZWxkR3JvdXA6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IC0xLFxuICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgICAgICAgbXVsdGlwbGU6IG1vZGUgPT09ICdhbnlPZicsXG4gICAgICAgICAgICBvcHRpb25zOiBzY2hlbWFzXG4gICAgICAgICAgICAgIC5tYXAoKHMsIGkpID0+ICh7IGxhYmVsOiBzLnRpdGxlLCB2YWx1ZTogaSwgZGlzYWJsZWQ6IHMucmVhZE9ubHkgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaG9va3M6IHtcbiAgICAgICAgICAgIG9uSW5pdDogZiA9PiBmLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgICB0YXAoKCkgPT4gKGYub3B0aW9ucyBhcyBhbnkpLl9jaGVja0ZpZWxkKGYucGFyZW50KSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZEdyb3VwOiBzY2hlbWFzLm1hcCgocywgaSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcocywgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIGhpZGVFeHByZXNzaW9uOiAobSwgZnMsIGYsIGZvcmNlVXBkYXRlPzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gZi5wYXJlbnQucGFyZW50LmZpZWxkR3JvdXBbMF0uZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGlmICgoY29udHJvbC52YWx1ZSA9PT0gLTEpIHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZi5wYXJlbnQuZmllbGRHcm91cFxuICAgICAgICAgICAgICAgICAgLm1hcCgoZiwgaSkgPT4gW2YsIGksIHRoaXMuaXNGaWVsZFZhbGlkKGYsIGksIHNjaGVtYXMsIG9wdGlvbnMpXSBhcyBbRm9ybWx5RmllbGRDb25maWcsIG51bWJlciwgYm9vbGVhbl0pXG4gICAgICAgICAgICAgICAgICAuc29ydCgoW2YxLCBpMSwgZjFWYWxpZF0sIFtmMiwgaTIsIGYyVmFsaWRdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmMVZhbGlkICE9PSBmMlZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYyVmFsaWQgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkRmllbGRzMSA9IHRvdGFsTWF0Y2hlZEZpZWxkcyhmMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWVsZHMyID0gdG90YWxNYXRjaGVkRmllbGRzKGYyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRGaWVsZHMxID09PSBtYXRjaGVkRmllbGRzMikge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmMS50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQgPT09IGYyLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYxLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVkRmllbGRzMiA+IG1hdGNoZWRGaWVsZHMxID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5tYXAoKFssIGldKSA9PiBpKVxuICAgICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdhbnlPZicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmluZWRWYWx1ZSA9IHZhbHVlLmZpbHRlcihpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmLnBhcmVudC5maWVsZEdyb3VwW2ldKSk7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZmluZWRWYWx1ZS5sZW5ndGggPiAwID8gZGVmaW5lZFZhbHVlIDogW3ZhbHVlWzBdIHx8IDBdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogWzBdO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobW9kZSA9PT0gJ2FueU9mJyA/IHZhbHVlIDogdmFsdWVbMF0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICAgICA/IGNvbnRyb2wudmFsdWUuaW5kZXhPZihpKSA9PT0gLTFcbiAgICAgICAgICAgICAgICA6IGNvbnRyb2wudmFsdWUgIT09IGk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZURlZmluaXRpb24oc2NoZW1hOiBKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpOiBKU09OU2NoZW1hNyB7XG4gICAgY29uc3QgW3VyaSwgcG9pbnRlcl0gPSBzY2hlbWEuJHJlZi5zcGxpdCgnIy8nKTtcbiAgICBpZiAodXJpKSB7XG4gICAgICB0aHJvdyBFcnJvcihgUmVtb3RlIHNjaGVtYXMgZm9yICR7c2NoZW1hLiRyZWZ9IG5vdCBzdXBwb3J0ZWQgeWV0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSAhcG9pbnRlciA/IG51bGwgOiBwb2ludGVyLnNwbGl0KCcvJykucmVkdWNlKFxuICAgICAgKGRlZiwgcGF0aCkgPT4gZGVmICYmIGRlZi5oYXNPd25Qcm9wZXJ0eShwYXRoKSA/IGRlZltwYXRoXSA6IG51bGwsXG4gICAgICBvcHRpb25zLnNjaGVtYSxcbiAgICApO1xuXG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke3NjaGVtYS4kcmVmfS5gKTtcbiAgICB9XG5cbiAgICBpZiAoZGVmaW5pdGlvbi4kcmVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGVmaW5pdGlvbihkZWZpbml0aW9uLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgIC4uLlsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnZGVmYXVsdCcsICd3aWRnZXQnXS5yZWR1Y2UoKGFubm90YXRpb24sIHApID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgIGFubm90YXRpb25bcF0gPSBzY2hlbWFbcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5ub3RhdGlvbjtcbiAgICAgIH0sIHt9KSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCBkZXBzID0ge307XG4gICAgY29uc3Qgc2NoZW1hRGVwcyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoc2NoZW1hLmRlcGVuZGVuY2llcyB8fCB7fSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY3kgPSBzY2hlbWEuZGVwZW5kZW5jaWVzW3Byb3BdIGFzIEpTT05TY2hlbWE3O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeSkpIHtcbiAgICAgICAgLy8gUHJvcGVydHkgZGVwZW5kZW5jaWVzXG4gICAgICAgIGRlcGVuZGVuY3kuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgICAgIGlmICghZGVwc1tkZXBdKSB7XG4gICAgICAgICAgICBkZXBzW2RlcF0gPSBbcHJvcF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlcHNbZGVwXS5wdXNoKHByb3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzY2hlbWEgZGVwZW5kZW5jaWVzXG4gICAgICAgIHNjaGVtYURlcHNbcHJvcF0gPSBkZXBlbmRlbmN5O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFtkZXBzLCBzY2hlbWFEZXBzXTtcbiAgfVxuXG4gIHByaXZhdGUgZ3Vlc3NUeXBlKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCB0eXBlID0gc2NoZW1hID8gc2NoZW1hLnR5cGUgYXMgSlNPTlNjaGVtYTdUeXBlTmFtZSA6IG51bGw7XG4gICAgaWYgKCF0eXBlICYmIHNjaGVtYSAmJiBzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbMF07XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLmxlbmd0aCA9PT0gMiAmJiB0eXBlLmluZGV4T2YoJ251bGwnKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbdHlwZVswXSA9PT0gJ251bGwnID8gMSA6IDBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRWYWxpZGF0b3IoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBuYW1lOiBzdHJpbmcsIHZhbGlkYXRvcjogKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBib29sZWFuKSB7XG4gICAgZmllbGQudmFsaWRhdG9ycyA9IGZpZWxkLnZhbGlkYXRvcnMgfHwge307XG4gICAgZmllbGQudmFsaWRhdG9yc1tuYW1lXSA9IHZhbGlkYXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbnVtKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICByZXR1cm4gc2NoZW1hLmVudW1cbiAgICAgIHx8IChzY2hlbWEuYW55T2YgJiYgc2NoZW1hLmFueU9mLmV2ZXJ5KGlzQ29uc3QpKVxuICAgICAgfHwgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YuZXZlcnkoaXNDb25zdCkpXG4gICAgICB8fCBzY2hlbWEudW5pcXVlSXRlbXMgJiYgc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykgJiYgdGhpcy5pc0VudW0oPEpTT05TY2hlbWE3PiBzY2hlbWEuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0VudW1PcHRpb25zKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgIHJldHVybiBzY2hlbWEuZW51bS5tYXAodmFsdWUgPT4gKHsgdmFsdWUsIGxhYmVsOiB2YWx1ZSB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9FbnVtID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHMuaGFzT3duUHJvcGVydHkoJ2NvbnN0JykgPyBzLmNvbnN0IDogcy5lbnVtWzBdO1xuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7IHZhbHVlOiB2YWx1ZSwgbGFiZWw6IHMudGl0bGUgfHwgdmFsdWUgfTtcbiAgICAgIGlmIChzLnJlYWRPbmx5KSB7XG4gICAgICAgIG9wdGlvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfTtcblxuICAgIGlmIChzY2hlbWEuYW55T2YpIHtcbiAgICAgIHJldHVybiBzY2hlbWEuYW55T2YubWFwKHRvRW51bSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgcmV0dXJuIHNjaGVtYS5vbmVPZi5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50b0VudW1PcHRpb25zKDxKU09OU2NoZW1hNz4gc2NoZW1hLml0ZW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGaWVsZFZhbGlkKHJvb3Q6IEZvcm1seUZpZWxkQ29uZmlnLCBpOiBudW1iZXIsIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sIG9wdGlvbnM6IElPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgaWYgKCFyb290Wydfc2NoZW1hc0ZpZWxkcyddKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocm9vdCwgJ19zY2hlbWFzRmllbGRzJywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICAgIHJvb3RbJ19zY2hlbWFzRmllbGRzJ10gPSB7fTtcbiAgICB9XG5cbiAgICBsZXQgZmllbGQgPSByb290Wydfc2NoZW1hc0ZpZWxkcyddW2ldO1xuICAgIGNvbnN0IG1vZGVsID0gcm9vdC5tb2RlbCA/IGNsb25lKHJvb3QubW9kZWwpIDogKHJvb3QuZmllbGRBcnJheSA/IFtdIDoge30pO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGZpZWxkID0gcm9vdFsnX3NjaGVtYXNGaWVsZHMnXVtpXSA9IChyb290Lm9wdGlvbnMgYXMgYW55KS5fYnVpbGRGaWVsZCh7XG4gICAgICAgIGZvcm1Db250cm9sOiBBcnJheS5pc0FycmF5KG1vZGVsKSA/IG5ldyBGb3JtQXJyYXkoW10pIDogbmV3IEZvcm1Hcm91cCh7fSksXG4gICAgICAgIGZpZWxkR3JvdXA6IFt0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYXNbaV0sIHsgLi4ub3B0aW9ucywgcmVzZXRPbkhpZGU6IHRydWUsIGlnbm9yZURlZmF1bHQ6IHRydWUsIG1hcDogbnVsbCwgc3RyaWN0OiB0cnVlIH0pXSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkLm1vZGVsID0gbW9kZWw7XG4gICAgICAocm9vdC5vcHRpb25zIGFzIGFueSkuX2J1aWxkRmllbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZC5mb3JtQ29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VGaWVsZHMoZjE6IEZvcm1seUZpZWxkQ29uZmlnLCBmMjogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIGYyKSB7XG4gICAgICBpZiAoaXNPYmplY3QoZjFbcHJvcF0pICYmIGlzT2JqZWN0KGYyW3Byb3BdKSkge1xuICAgICAgICBmMVtwcm9wXSA9IHRoaXMubWVyZ2VGaWVsZHMoZjFbcHJvcF0sIGYyW3Byb3BdKTtcbiAgICAgIH0gZWxzZSBpZiAoZjJbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICBmMVtwcm9wXSA9IGYyW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmMTtcbiAgfVxufVxuIl19