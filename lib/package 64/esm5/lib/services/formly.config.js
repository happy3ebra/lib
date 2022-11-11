/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, InjectionToken } from '@angular/core';
import { reverseDeepMerge, defineHiddenProp } from './../utils';
import * as i0 from "@angular/core";
/** @type {?} */
export var FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
/**
 * \@experimental
 * @record
 */
export function FormlyExtension() { }
if (false) {
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyExtension.prototype.prePopulate = function (field) { };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyExtension.prototype.onPopulate = function (field) { };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyExtension.prototype.postPopulate = function (field) { };
}
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
            this.extras = tslib_1.__assign({}, this.extras, config.extras);
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
            field.wrappers = tslib_1.__spread(type.wrappers);
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
    /** @nocollapse */ FormlyConfig.ngInjectableDef = i0.defineInjectable({ factory: function FormlyConfig_Factory() { return new FormlyConfig(); }, token: FormlyConfig, providedIn: "root" });
    return FormlyConfig;
}());
export { FormlyConfig };
if (false) {
    /** @type {?} */
    FormlyConfig.prototype.types;
    /** @type {?} */
    FormlyConfig.prototype.validators;
    /** @type {?} */
    FormlyConfig.prototype.wrappers;
    /** @type {?} */
    FormlyConfig.prototype.messages;
    /** @type {?} */
    FormlyConfig.prototype.templateManipulators;
    /** @type {?} */
    FormlyConfig.prototype.extras;
    /** @type {?} */
    FormlyConfig.prototype.extensions;
}
/**
 * @record
 */
export function TypeOption() { }
if (false) {
    /** @type {?} */
    TypeOption.prototype.name;
    /** @type {?|undefined} */
    TypeOption.prototype.component;
    /** @type {?|undefined} */
    TypeOption.prototype.wrappers;
    /** @type {?|undefined} */
    TypeOption.prototype.extends;
    /** @type {?|undefined} */
    TypeOption.prototype.defaultOptions;
}
/**
 * @record
 */
export function WrapperOption() { }
if (false) {
    /** @type {?} */
    WrapperOption.prototype.name;
    /** @type {?} */
    WrapperOption.prototype.component;
    /** @type {?|undefined} */
    WrapperOption.prototype.types;
}
/**
 * @record
 */
export function FieldValidatorFn() { }
/**
 * @record
 */
export function ValidatorOption() { }
if (false) {
    /** @type {?} */
    ValidatorOption.prototype.name;
    /** @type {?} */
    ValidatorOption.prototype.validation;
    /** @type {?|undefined} */
    ValidatorOption.prototype.options;
}
/**
 * @record
 */
export function ExtensionOption() { }
if (false) {
    /** @type {?} */
    ExtensionOption.prototype.name;
    /** @type {?} */
    ExtensionOption.prototype.extension;
}
/**
 * @record
 */
export function ValidationMessageOption() { }
if (false) {
    /** @type {?} */
    ValidationMessageOption.prototype.name;
    /** @type {?} */
    ValidationMessageOption.prototype.message;
}
/**
 * @record
 */
export function ManipulatorOption() { }
if (false) {
    /** @type {?|undefined} */
    ManipulatorOption.prototype.class;
    /** @type {?|undefined} */
    ManipulatorOption.prototype.method;
}
/**
 * @record
 */
export function ManipulatorWrapper() { }
/**
 * @record
 */
export function TemplateManipulators() { }
if (false) {
    /** @type {?|undefined} */
    TemplateManipulators.prototype.preWrapper;
    /** @type {?|undefined} */
    TemplateManipulators.prototype.postWrapper;
}
/**
 * @record
 */
export function ConfigOption() { }
if (false) {
    /** @type {?|undefined} */
    ConfigOption.prototype.types;
    /** @type {?|undefined} */
    ConfigOption.prototype.wrappers;
    /** @type {?|undefined} */
    ConfigOption.prototype.validators;
    /** @type {?|undefined} */
    ConfigOption.prototype.extensions;
    /** @type {?|undefined} */
    ConfigOption.prototype.validationMessages;
    /**
     * @deprecated use `extensions` instead
     * @type {?|undefined}
     */
    ConfigOption.prototype.manipulators;
    /** @type {?|undefined} */
    ConfigOption.prototype.extras;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZm9ybWx5LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUd6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7OztBQUloRSxNQUFNLEtBQU8sYUFBYSxHQUFHLElBQUksY0FBYyxDQUFlLGVBQWUsQ0FBQzs7Ozs7QUFHOUUscUNBSUM7Ozs7OztJQUhDLDZEQUE2Qzs7Ozs7SUFDN0MsNERBQTRDOzs7OztJQUM1Qyw4REFBOEM7Ozs7O0FBTWhEO0lBQUE7UUFFRSxVQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUN6QyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQUNyRCxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUNqRCxhQUFRLEdBQTJELEVBQUUsQ0FBQztRQUN0RSx5QkFBb0IsR0FHaEI7WUFDRixVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFDRixXQUFNLEdBQTJCO1lBQy9CLGlCQUFpQixFQUFFLHNCQUFzQjtZQUN6QyxVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTOzs7O1lBQUUsVUFBUyxLQUFnQjtnQkFDbEMsT0FBTyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFD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OztJQUMzQixrQ0FBK0I7O0lBQy9CLGtDQUErQjs7SUFDL0IsMENBQStDOzs7OztJQUcvQyxvQ0FBbUM7O0lBQ25DLDhCQThCRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvcnMsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vdGVtcGxhdGVzL2ZpZWxkLnR5cGUnO1xuaW1wb3J0IHsgcmV2ZXJzZURlZXBNZXJnZSwgZGVmaW5lSGlkZGVuUHJvcCB9IGZyb20gJy4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgRk9STUxZX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxGb3JtbHlDb25maWc+KCdGT1JNTFlfQ09ORklHJyk7XG5cbi8qKiBAZXhwZXJpbWVudGFsICovXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUV4dGVuc2lvbiB7XG4gIHByZVBvcHVsYXRlPyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkO1xuICBvblBvcHVsYXRlPyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkO1xuICBwb3N0UG9wdWxhdGU/KGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQ7XG59XG5cbi8qKlxuICogTWFpbnRhaW5zIGxpc3Qgb2YgZm9ybWx5IGZpZWxkIGRpcmVjdGl2ZSB0eXBlcy4gVGhpcyBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBuZXcgZmllbGQgdGVtcGxhdGVzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZvcm1seUNvbmZpZyB7XG4gIHR5cGVzOiB7W25hbWU6IHN0cmluZ106IFR5cGVPcHRpb259ID0ge307XG4gIHZhbGlkYXRvcnM6IHsgW25hbWU6IHN0cmluZ106IFZhbGlkYXRvck9wdGlvbiB9ID0ge307XG4gIHdyYXBwZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBXcmFwcGVyT3B0aW9uIH0gPSB7fTtcbiAgbWVzc2FnZXM6IHsgW25hbWU6IHN0cmluZ106IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uWydtZXNzYWdlJ10gfSA9IHt9O1xuICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgIHByZVdyYXBwZXI6IE1hbmlwdWxhdG9yV3JhcHBlcltdO1xuICAgIHBvc3RXcmFwcGVyOiBNYW5pcHVsYXRvcldyYXBwZXJbXTtcbiAgfSA9IHtcbiAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICBwb3N0V3JhcHBlcjogW10sXG4gIH07XG4gIGV4dHJhczogQ29uZmlnT3B0aW9uWydleHRyYXMnXSA9IHtcbiAgICBjaGVja0V4cHJlc3Npb25PbjogJ2NoYW5nZURldGVjdGlvbkNoZWNrJyxcbiAgICBsYXp5UmVuZGVyOiBmYWxzZSxcbiAgICBzaG93RXJyb3I6IGZ1bmN0aW9uKGZpZWxkOiBGaWVsZFR5cGUpIHtcbiAgICAgIHJldHVybiBmaWVsZC5mb3JtQ29udHJvbCAmJiBmaWVsZC5mb3JtQ29udHJvbC5pbnZhbGlkICYmIChmaWVsZC5mb3JtQ29udHJvbC50b3VjaGVkIHx8IChmaWVsZC5vcHRpb25zLnBhcmVudEZvcm0gJiYgZmllbGQub3B0aW9ucy5wYXJlbnRGb3JtLnN1Ym1pdHRlZCkgfHwgISEoZmllbGQuZmllbGQudmFsaWRhdGlvbiAmJiBmaWVsZC5maWVsZC52YWxpZGF0aW9uLnNob3cpKTtcbiAgICB9LFxuICB9O1xuICBleHRlbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBGb3JtbHlFeHRlbnNpb24gfSA9IHt9O1xuXG4gIGFkZENvbmZpZyhjb25maWc6IENvbmZpZ09wdGlvbikge1xuICAgIGlmIChjb25maWcudHlwZXMpIHtcbiAgICAgIGNvbmZpZy50eXBlcy5mb3JFYWNoKHR5cGUgPT4gdGhpcy5zZXRUeXBlKHR5cGUpKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy52YWxpZGF0b3JzKSB7XG4gICAgICBjb25maWcudmFsaWRhdG9ycy5mb3JFYWNoKHZhbGlkYXRvciA9PiB0aGlzLnNldFZhbGlkYXRvcih2YWxpZGF0b3IpKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy53cmFwcGVycykge1xuICAgICAgY29uZmlnLndyYXBwZXJzLmZvckVhY2god3JhcHBlciA9PiB0aGlzLnNldFdyYXBwZXIod3JhcHBlcikpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLm1hbmlwdWxhdG9ycykge1xuICAgICAgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ21hbmlwdWxhdG9ycycgY29uZmlnIGlzIGRlcHJlY2F0ZWQsIHVzZSBjdXN0b20gZXh0ZW5zaW9uIGluc3RlYWQuYCk7XG4gICAgICBjb25maWcubWFuaXB1bGF0b3JzLmZvckVhY2gobWFuaXB1bGF0b3IgPT4gdGhpcy5zZXRNYW5pcHVsYXRvcihtYW5pcHVsYXRvcikpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnZhbGlkYXRpb25NZXNzYWdlcykge1xuICAgICAgY29uZmlnLnZhbGlkYXRpb25NZXNzYWdlcy5mb3JFYWNoKHZhbGlkYXRpb24gPT4gdGhpcy5hZGRWYWxpZGF0b3JNZXNzYWdlKHZhbGlkYXRpb24ubmFtZSwgdmFsaWRhdGlvbi5tZXNzYWdlKSk7XG4gICAgfVxuICAgIGlmIChjb25maWcuZXh0ZW5zaW9ucykge1xuICAgICAgY29uZmlnLmV4dGVuc2lvbnMuZm9yRWFjaChjID0+IHRoaXMuZXh0ZW5zaW9uc1tjLm5hbWVdID0gYy5leHRlbnNpb24pO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmV4dHJhcykge1xuICAgICAgdGhpcy5leHRyYXMgPSB7IC4uLnRoaXMuZXh0cmFzLCAuLi5jb25maWcuZXh0cmFzIH07XG4gICAgfVxuICB9XG5cbiAgc2V0VHlwZShvcHRpb25zOiBUeXBlT3B0aW9uIHwgVHlwZU9wdGlvbltdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB0aGlzLnNldFR5cGUob3B0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy50eXBlc1tvcHRpb25zLm5hbWVdKSB7XG4gICAgICAgIHRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXSA9IDxUeXBlT3B0aW9uPnsgbmFtZTogb3B0aW9ucy5uYW1lIH07XG4gICAgICB9XG5cbiAgICAgIFsnY29tcG9uZW50JywgJ2V4dGVuZHMnLCAnZGVmYXVsdE9wdGlvbnMnLCAnd3JhcHBlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIHRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXVtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFR5cGUobmFtZTogc3RyaW5nKTogVHlwZU9wdGlvbiB7XG4gICAgaWYgKCF0aGlzLnR5cGVzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtGb3JtbHkgRXJyb3JdIFRoZSB0eXBlIFwiJHtuYW1lfVwiIGNvdWxkIG5vdCBiZSBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IGlzIHJlZ2lzdGVyZWQgdGhyb3VnaCB0aGUgRm9ybWx5TW9kdWxlIGRlY2xhcmF0aW9uLmApO1xuICAgIH1cblxuICAgIHRoaXMubWVyZ2VFeHRlbmRlZFR5cGUobmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcy50eXBlc1tuYW1lXTtcbiAgfVxuXG4gIGdldE1lcmdlZEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyA9IHt9KTogYW55IHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRUeXBlKGZpZWxkLnR5cGUpO1xuICAgIGlmICh0eXBlLmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbmREZWZhdWx0cyA9IHR5cGUuZXh0ZW5kcyAmJiB0aGlzLmdldFR5cGUodHlwZS5leHRlbmRzKS5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoZXh0ZW5kRGVmYXVsdHMpIHtcbiAgICAgIHJldmVyc2VEZWVwTWVyZ2UoZmllbGQsIGV4dGVuZERlZmF1bHRzKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQgJiYgZmllbGQub3B0aW9uc1R5cGVzKSB7XG4gICAgICBmaWVsZC5vcHRpb25zVHlwZXMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHRoaXMuZ2V0VHlwZShvcHRpb24pLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZUZpZWxkVHlwZVJlZihmaWVsZCk7XG4gICAgaWYgKGNvbXBvbmVudFJlZiAmJiBjb21wb25lbnRSZWYuaW5zdGFuY2UgJiYgY29tcG9uZW50UmVmLmluc3RhbmNlLmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGVmYXVsdE9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghZmllbGQud3JhcHBlcnMgJiYgdHlwZS53cmFwcGVycykge1xuICAgICAgZmllbGQud3JhcHBlcnMgPSBbLi4udHlwZS53cmFwcGVyc107XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZXNvbHZlRmllbGRUeXBlUmVmKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlID0ge30pOiBDb21wb25lbnRSZWY8RmllbGRUeXBlPiB7XG4gICAgaWYgKCFmaWVsZC50eXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRUeXBlKGZpZWxkLnR5cGUpO1xuICAgIGlmICghdHlwZS5jb21wb25lbnQgfHwgdHlwZVsnX2NvbXBvbmVudFJlZiddKSB7XG4gICAgICByZXR1cm4gdHlwZVsnX2NvbXBvbmVudFJlZiddO1xuICAgIH1cblxuICAgIGNvbnN0IHsgX3Jlc29sdmVyLCBfaW5qZWN0b3IgfSA9IGZpZWxkLnBhcmVudC5vcHRpb25zO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IF9yZXNvbHZlclxuICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PEZpZWxkVHlwZT4odHlwZS5jb21wb25lbnQpXG4gICAgICAuY3JlYXRlKF9pbmplY3Rvcik7XG5cbiAgICBkZWZpbmVIaWRkZW5Qcm9wKHR5cGUsICdfY29tcG9uZW50UmVmJywgY29tcG9uZW50UmVmKTtcbiAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xuXG4gICAgcmV0dXJuIHR5cGVbJ19jb21wb25lbnRSZWYnXTtcbiAgfVxuXG4gIHNldFdyYXBwZXIob3B0aW9uczogV3JhcHBlck9wdGlvbikge1xuICAgIHRoaXMud3JhcHBlcnNbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMudHlwZXMpIHtcbiAgICAgIG9wdGlvbnMudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFR5cGVXcmFwcGVyKHR5cGUsIG9wdGlvbnMubmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRXcmFwcGVyKG5hbWU6IHN0cmluZyk6IFdyYXBwZXJPcHRpb24ge1xuICAgIGlmICghdGhpcy53cmFwcGVyc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbRm9ybWx5IEVycm9yXSBUaGUgd3JhcHBlciBcIiR7bmFtZX1cIiBjb3VsZCBub3QgYmUgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBpcyByZWdpc3RlcmVkIHRocm91Z2ggdGhlIEZvcm1seU1vZHVsZSBkZWNsYXJhdGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53cmFwcGVyc1tuYW1lXTtcbiAgfVxuXG4gIHNldFR5cGVXcmFwcGVyKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnR5cGVzW3R5cGVdKSB7XG4gICAgICB0aGlzLnR5cGVzW3R5cGVdID0gPFR5cGVPcHRpb24+e307XG4gICAgfVxuICAgIGlmICghdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycykge1xuICAgICAgdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy50eXBlc1t0eXBlXS53cmFwcGVycy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbGlkYXRvcihvcHRpb25zOiBWYWxpZGF0b3JPcHRpb24pIHtcbiAgICB0aGlzLnZhbGlkYXRvcnNbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gIH1cblxuICBnZXRWYWxpZGF0b3IobmFtZTogc3RyaW5nKTogVmFsaWRhdG9yT3B0aW9uIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdG9yc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbRm9ybWx5IEVycm9yXSBUaGUgdmFsaWRhdG9yIFwiJHtuYW1lfVwiIGNvdWxkIG5vdCBiZSBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IGlzIHJlZ2lzdGVyZWQgdGhyb3VnaCB0aGUgRm9ybWx5TW9kdWxlIGRlY2xhcmF0aW9uLmApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcnNbbmFtZV07XG4gIH1cblxuICBhZGRWYWxpZGF0b3JNZXNzYWdlKG5hbWU6IHN0cmluZywgbWVzc2FnZTogVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb25bJ21lc3NhZ2UnXSkge1xuICAgIHRoaXMubWVzc2FnZXNbbmFtZV0gPSBtZXNzYWdlO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yTWVzc2FnZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlc1tuYW1lXTtcbiAgfVxuXG4gIHNldE1hbmlwdWxhdG9yKG1hbmlwdWxhdG9yOiBNYW5pcHVsYXRvck9wdGlvbikge1xuICAgIG5ldyBtYW5pcHVsYXRvci5jbGFzcygpW21hbmlwdWxhdG9yLm1ldGhvZF0odGhpcyk7XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRXh0ZW5kZWRUeXBlKG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy50eXBlc1tuYW1lXS5leHRlbmRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5kZWRUeXBlID0gdGhpcy5nZXRUeXBlKHRoaXMudHlwZXNbbmFtZV0uZXh0ZW5kcyk7XG4gICAgaWYgKCF0aGlzLnR5cGVzW25hbWVdLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy50eXBlc1tuYW1lXS5jb21wb25lbnQgPSBleHRlbmRlZFR5cGUuY29tcG9uZW50O1xuICAgIH1cblxuICAgIGlmICghdGhpcy50eXBlc1tuYW1lXS53cmFwcGVycykge1xuICAgICAgdGhpcy50eXBlc1tuYW1lXS53cmFwcGVycyA9IGV4dGVuZGVkVHlwZS53cmFwcGVycztcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZU9wdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29tcG9uZW50PzogYW55O1xuICB3cmFwcGVycz86IHN0cmluZ1tdO1xuICBleHRlbmRzPzogc3RyaW5nO1xuICBkZWZhdWx0T3B0aW9ucz86IEZvcm1seUZpZWxkQ29uZmlnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdyYXBwZXJPcHRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogYW55O1xuICB0eXBlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkVmFsaWRhdG9yRm4ge1xuICAoYzogQWJzdHJhY3RDb250cm9sLCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIG9wdGlvbnM/OiB7IFtpZDogc3RyaW5nXTogYW55OyB9KTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdG9yT3B0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWxpZGF0aW9uOiBGaWVsZFZhbGlkYXRvckZuO1xuICBvcHRpb25zPzogeyBbaWQ6IHN0cmluZ106IGFueSB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuc2lvbk9wdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgZXh0ZW5zaW9uOiBGb3JtbHlFeHRlbnNpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZyB8ICgoZXJyb3I6IGFueSwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiBzdHJpbmcgfCBPYnNlcnZhYmxlPHN0cmluZz4pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yT3B0aW9uIHtcbiAgY2xhc3M/OiB7IG5ldyAoKTogYW55IH07XG4gIG1ldGhvZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvcldyYXBwZXIge1xuICAoZjogRm9ybWx5RmllbGRDb25maWcpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVNYW5pcHVsYXRvcnMge1xuICBwcmVXcmFwcGVyPzogTWFuaXB1bGF0b3JXcmFwcGVyW107XG4gIHBvc3RXcmFwcGVyPzogTWFuaXB1bGF0b3JXcmFwcGVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnT3B0aW9uIHtcbiAgdHlwZXM/OiBUeXBlT3B0aW9uW107XG4gIHdyYXBwZXJzPzogV3JhcHBlck9wdGlvbltdO1xuICB2YWxpZGF0b3JzPzogVmFsaWRhdG9yT3B0aW9uW107XG4gIGV4dGVuc2lvbnM/OiBFeHRlbnNpb25PcHRpb25bXTtcbiAgdmFsaWRhdGlvbk1lc3NhZ2VzPzogVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb25bXTtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGBleHRlbnNpb25zYCBpbnN0ZWFkICovXG4gIG1hbmlwdWxhdG9ycz86IE1hbmlwdWxhdG9yT3B0aW9uW107XG4gIGV4dHJhcz86IHtcbiAgICAvKiogQGRlcHJlY2F0ZWQgdXNlIGBleHRlbnNpb25zYCBpbnN0ZWFkICovXG4gICAgZmllbGRUcmFuc2Zvcm0/OiBhbnksXG4gICAgaW1tdXRhYmxlPzogYm9vbGVhbixcbiAgICBzaG93RXJyb3I/OiAoZmllbGQ6IEZpZWxkVHlwZSkgPT4gYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG9wdGlvbiB3aGljaCBmb3JtbHkgcmVseSBvbiB0byBjaGVjayBmaWVsZCBleHByZXNzaW9uIHByb3BlcnRpZXMuXG4gICAgICogLSBgbW9kZWxDaGFuZ2VgOiBwZXJmb3JtIGEgY2hlY2sgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gY29udHJvbCBjaGFuZ2VzIChXaWxsIGJlIHNldCBieSBkZWZhdWx0IGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24pLlxuICAgICAqIC0gYGNoYW5nZURldGVjdGlvbkNoZWNrYDogdHJpZ2dlcnMgYW4gaW1tZWRpYXRlIGNoZWNrIHdoZW4gYG5nRG9DaGVja2AgaXMgY2FsbGVkLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGNoYW5nZURldGVjdGlvbkNoZWNrYC5cbiAgICAgKi9cbiAgICBjaGVja0V4cHJlc3Npb25Pbj86ICdtb2RlbENoYW5nZScgfCAnY2hhbmdlRGV0ZWN0aW9uQ2hlY2snLFxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBsYXppbHkgcmVuZGVyIGZpZWxkIGNvbXBvbmVudHMgb3Igbm90IHdoZW4gbWFya2VkIGFzIGhpZGRlbi5cbiAgICAgKiAtIGB0cnVlYDogbGF6aWx5IHJlbmRlciBmaWVsZCBjb21wb25lbnRzIChXaWxsIGJlIHNldCBieSBkZWZhdWx0IGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24pLlxuICAgICAqIC0gYGZhbHNlYDogcmVuZGVyIGZpZWxkIGNvbXBvbmVudHMgYW5kIHVzZSBDU1MgdG8gY29udHJvbCB0aGVpciB2aXNpYmlsaXR5LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBsYXp5UmVuZGVyPzogYm9vbGVhbixcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgcmVzZXQgdGhlIHZhbHVlIG9mIGhpZGRlbiBmaWVsZHMuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIHJlc2V0RmllbGRPbkhpZGU/OiBib29sZWFuLFxuICB9O1xufVxuIl19