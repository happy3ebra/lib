/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken } from '@angular/core';
import { reverseDeepMerge, defineHiddenProp } from './../utils';
import * as i0 from "@angular/core";
/** @type {?} */
export const FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
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
export class FormlyConfig {
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
/** @nocollapse */ FormlyConfig.ngInjectableDef = i0.defineInjectable({ factory: function FormlyConfig_Factory() { return new FormlyConfig(); }, token: FormlyConfig, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZm9ybWx5LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBR3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7O0FBSWhFLE1BQU0sT0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQWUsZUFBZSxDQUFDOzs7OztBQUc5RSxxQ0FJQzs7Ozs7O0lBSEMsNkRBQTZDOzs7OztJQUM3Qyw0REFBNEM7Ozs7O0lBQzVDLDhEQUE4Qzs7Ozs7QUFPaEQsTUFBTSxPQUFPLFlBQVk7SUFEekI7UUFFRSxVQUFLLEdBQWlDLEVBQUUsQ0FBQztRQUN6QyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQUNyRCxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUNqRCxhQUFRLEdBQTJELEVBQUUsQ0FBQztRQUN0RSx5QkFBb0IsR0FHaEI7WUFDRixVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFDRixXQUFNLEdBQTJCO1lBQy9CLGlCQUFpQixFQUFFLHNCQUFzQjtZQUN6QyxVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTOzs7O1lBQUUsVUFBUyxLQUFnQjtnQkFDbEMsT0FBTyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFL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WUFBWSxDQUFDLFFBQVEsQ0FBQztTQUNuRDtJQUNILENBQUM7OztZQS9MRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7OztJQUVoQyw2QkFBeUM7O0lBQ3pDLGtDQUFxRDs7SUFDckQsZ0NBQWlEOztJQUNqRCxnQ0FBc0U7O0lBQ3RFLDRDQU1FOztJQUNGLDhCQU1FOztJQUNGLGtDQUFxRDs7Ozs7QUE2S3ZELGdDQU1DOzs7SUFMQywwQkFBYTs7SUFDYiwrQkFBZ0I7O0lBQ2hCLDhCQUFvQjs7SUFDcEIsNkJBQWlCOztJQUNqQixvQ0FBbUM7Ozs7O0FBR3JDLG1DQUlDOzs7SUFIQyw2QkFBYTs7SUFDYixrQ0FBZTs7SUFDZiw4QkFBaUI7Ozs7O0FBR25CLHNDQUVDOzs7O0FBRUQscUNBSUM7OztJQUhDLCtCQUFhOztJQUNiLHFDQUE2Qjs7SUFDN0Isa0NBQWdDOzs7OztBQUdsQyxxQ0FHQzs7O0lBRkMsK0JBQWE7O0lBQ2Isb0NBQTJCOzs7OztBQUc3Qiw2Q0FHQzs7O0lBRkMsdUNBQWE7O0lBQ2IsMENBQTBGOzs7OztBQUc1Rix1Q0FHQzs7O0lBRkMsa0NBQXdCOztJQUN4QixtQ0FBZ0I7Ozs7O0FBR2xCLHdDQUVDOzs7O0FBRUQsMENBR0M7OztJQUZDLDBDQUFrQzs7SUFDbEMsMkNBQW1DOzs7OztBQUdyQyxrQ0F3Q0M7OztJQXZDQyw2QkFBcUI7O0lBQ3JCLGdDQUEyQjs7SUFDM0Isa0NBQStCOztJQUMvQixrQ0FBK0I7O0lBQy9CLDBDQUErQzs7Ozs7SUFHL0Msb0NBQW1DOztJQUNuQyw4QkE4QkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JzLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3RlbXBsYXRlcy9maWVsZC50eXBlJztcbmltcG9ydCB7IHJldmVyc2VEZWVwTWVyZ2UsIGRlZmluZUhpZGRlblByb3AgfSBmcm9tICcuLy4uL3V0aWxzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9mb3JtbHkuZmllbGQuY29uZmlnJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNvbnN0IEZPUk1MWV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Rm9ybWx5Q29uZmlnPignRk9STUxZX0NPTkZJRycpO1xuXG4vKiogQGV4cGVyaW1lbnRhbCAqL1xuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlFeHRlbnNpb24ge1xuICBwcmVQb3B1bGF0ZT8oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZDtcbiAgb25Qb3B1bGF0ZT8oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZDtcbiAgcG9zdFBvcHVsYXRlPyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkO1xufVxuXG4vKipcbiAqIE1haW50YWlucyBsaXN0IG9mIGZvcm1seSBmaWVsZCBkaXJlY3RpdmUgdHlwZXMuIFRoaXMgY2FuIGJlIHVzZWQgdG8gcmVnaXN0ZXIgbmV3IGZpZWxkIHRlbXBsYXRlcy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlDb25maWcge1xuICB0eXBlczoge1tuYW1lOiBzdHJpbmddOiBUeXBlT3B0aW9ufSA9IHt9O1xuICB2YWxpZGF0b3JzOiB7IFtuYW1lOiBzdHJpbmddOiBWYWxpZGF0b3JPcHRpb24gfSA9IHt9O1xuICB3cmFwcGVyczogeyBbbmFtZTogc3RyaW5nXTogV3JhcHBlck9wdGlvbiB9ID0ge307XG4gIG1lc3NhZ2VzOiB7IFtuYW1lOiBzdHJpbmddOiBWYWxpZGF0aW9uTWVzc2FnZU9wdGlvblsnbWVzc2FnZSddIH0gPSB7fTtcbiAgdGVtcGxhdGVNYW5pcHVsYXRvcnM6IHtcbiAgICBwcmVXcmFwcGVyOiBNYW5pcHVsYXRvcldyYXBwZXJbXTtcbiAgICBwb3N0V3JhcHBlcjogTWFuaXB1bGF0b3JXcmFwcGVyW107XG4gIH0gPSB7XG4gICAgcHJlV3JhcHBlcjogW10sXG4gICAgcG9zdFdyYXBwZXI6IFtdLFxuICB9O1xuICBleHRyYXM6IENvbmZpZ09wdGlvblsnZXh0cmFzJ10gPSB7XG4gICAgY2hlY2tFeHByZXNzaW9uT246ICdjaGFuZ2VEZXRlY3Rpb25DaGVjaycsXG4gICAgbGF6eVJlbmRlcjogZmFsc2UsXG4gICAgc2hvd0Vycm9yOiBmdW5jdGlvbihmaWVsZDogRmllbGRUeXBlKSB7XG4gICAgICByZXR1cm4gZmllbGQuZm9ybUNvbnRyb2wgJiYgZmllbGQuZm9ybUNvbnRyb2wuaW52YWxpZCAmJiAoZmllbGQuZm9ybUNvbnRyb2wudG91Y2hlZCB8fCAoZmllbGQub3B0aW9ucy5wYXJlbnRGb3JtICYmIGZpZWxkLm9wdGlvbnMucGFyZW50Rm9ybS5zdWJtaXR0ZWQpIHx8ICEhKGZpZWxkLmZpZWxkLnZhbGlkYXRpb24gJiYgZmllbGQuZmllbGQudmFsaWRhdGlvbi5zaG93KSk7XG4gICAgfSxcbiAgfTtcbiAgZXh0ZW5zaW9uczogeyBbbmFtZTogc3RyaW5nXTogRm9ybWx5RXh0ZW5zaW9uIH0gPSB7fTtcblxuICBhZGRDb25maWcoY29uZmlnOiBDb25maWdPcHRpb24pIHtcbiAgICBpZiAoY29uZmlnLnR5cGVzKSB7XG4gICAgICBjb25maWcudHlwZXMuZm9yRWFjaCh0eXBlID0+IHRoaXMuc2V0VHlwZSh0eXBlKSk7XG4gICAgfVxuICAgIGlmIChjb25maWcudmFsaWRhdG9ycykge1xuICAgICAgY29uZmlnLnZhbGlkYXRvcnMuZm9yRWFjaCh2YWxpZGF0b3IgPT4gdGhpcy5zZXRWYWxpZGF0b3IodmFsaWRhdG9yKSk7XG4gICAgfVxuICAgIGlmIChjb25maWcud3JhcHBlcnMpIHtcbiAgICAgIGNvbmZpZy53cmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4gdGhpcy5zZXRXcmFwcGVyKHdyYXBwZXIpKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5tYW5pcHVsYXRvcnMpIHtcbiAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdtYW5pcHVsYXRvcnMnIGNvbmZpZyBpcyBkZXByZWNhdGVkLCB1c2UgY3VzdG9tIGV4dGVuc2lvbiBpbnN0ZWFkLmApO1xuICAgICAgY29uZmlnLm1hbmlwdWxhdG9ycy5mb3JFYWNoKG1hbmlwdWxhdG9yID0+IHRoaXMuc2V0TWFuaXB1bGF0b3IobWFuaXB1bGF0b3IpKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy52YWxpZGF0aW9uTWVzc2FnZXMpIHtcbiAgICAgIGNvbmZpZy52YWxpZGF0aW9uTWVzc2FnZXMuZm9yRWFjaCh2YWxpZGF0aW9uID0+IHRoaXMuYWRkVmFsaWRhdG9yTWVzc2FnZSh2YWxpZGF0aW9uLm5hbWUsIHZhbGlkYXRpb24ubWVzc2FnZSkpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmV4dGVuc2lvbnMpIHtcbiAgICAgIGNvbmZpZy5leHRlbnNpb25zLmZvckVhY2goYyA9PiB0aGlzLmV4dGVuc2lvbnNbYy5uYW1lXSA9IGMuZXh0ZW5zaW9uKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5leHRyYXMpIHtcbiAgICAgIHRoaXMuZXh0cmFzID0geyAuLi50aGlzLmV4dHJhcywgLi4uY29uZmlnLmV4dHJhcyB9O1xuICAgIH1cbiAgfVxuXG4gIHNldFR5cGUob3B0aW9uczogVHlwZU9wdGlvbiB8IFR5cGVPcHRpb25bXSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gdGhpcy5zZXRUeXBlKG9wdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXSkge1xuICAgICAgICB0aGlzLnR5cGVzW29wdGlvbnMubmFtZV0gPSA8VHlwZU9wdGlvbj57IG5hbWU6IG9wdGlvbnMubmFtZSB9O1xuICAgICAgfVxuXG4gICAgICBbJ2NvbXBvbmVudCcsICdleHRlbmRzJywgJ2RlZmF1bHRPcHRpb25zJywgJ3dyYXBwZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICB0aGlzLnR5cGVzW29wdGlvbnMubmFtZV1bcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRUeXBlKG5hbWU6IHN0cmluZyk6IFR5cGVPcHRpb24ge1xuICAgIGlmICghdGhpcy50eXBlc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbRm9ybWx5IEVycm9yXSBUaGUgdHlwZSBcIiR7bmFtZX1cIiBjb3VsZCBub3QgYmUgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBpcyByZWdpc3RlcmVkIHRocm91Z2ggdGhlIEZvcm1seU1vZHVsZSBkZWNsYXJhdGlvbi5gKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lcmdlRXh0ZW5kZWRUeXBlKG5hbWUpO1xuXG4gICAgcmV0dXJuIHRoaXMudHlwZXNbbmFtZV07XG4gIH1cblxuICBnZXRNZXJnZWRGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcgPSB7fSk6IGFueSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0VHlwZShmaWVsZC50eXBlKTtcbiAgICBpZiAodHlwZS5kZWZhdWx0T3B0aW9ucykge1xuICAgICAgcmV2ZXJzZURlZXBNZXJnZShmaWVsZCwgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5kRGVmYXVsdHMgPSB0eXBlLmV4dGVuZHMgJiYgdGhpcy5nZXRUeXBlKHR5cGUuZXh0ZW5kcykuZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKGV4dGVuZERlZmF1bHRzKSB7XG4gICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCBleHRlbmREZWZhdWx0cyk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkICYmIGZpZWxkLm9wdGlvbnNUeXBlcykge1xuICAgICAgZmllbGQub3B0aW9uc1R5cGVzLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB0aGlzLmdldFR5cGUob3B0aW9uKS5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgcmV2ZXJzZURlZXBNZXJnZShmaWVsZCwgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnJlc29sdmVGaWVsZFR5cGVSZWYoZmllbGQpO1xuICAgIGlmIChjb21wb25lbnRSZWYgJiYgY29tcG9uZW50UmVmLmluc3RhbmNlICYmIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5kZWZhdWx0T3B0aW9ucykge1xuICAgICAgcmV2ZXJzZURlZXBNZXJnZShmaWVsZCwgY29tcG9uZW50UmVmLmluc3RhbmNlLmRlZmF1bHRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIWZpZWxkLndyYXBwZXJzICYmIHR5cGUud3JhcHBlcnMpIHtcbiAgICAgIGZpZWxkLndyYXBwZXJzID0gWy4uLnR5cGUud3JhcHBlcnNdO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcmVzb2x2ZUZpZWxkVHlwZVJlZihmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSA9IHt9KTogQ29tcG9uZW50UmVmPEZpZWxkVHlwZT4ge1xuICAgIGlmICghZmllbGQudHlwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0VHlwZShmaWVsZC50eXBlKTtcbiAgICBpZiAoIXR5cGUuY29tcG9uZW50IHx8IHR5cGVbJ19jb21wb25lbnRSZWYnXSkge1xuICAgICAgcmV0dXJuIHR5cGVbJ19jb21wb25lbnRSZWYnXTtcbiAgICB9XG5cbiAgICBjb25zdCB7IF9yZXNvbHZlciwgX2luamVjdG9yIH0gPSBmaWVsZC5wYXJlbnQub3B0aW9ucztcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBfcmVzb2x2ZXJcbiAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxGaWVsZFR5cGU+KHR5cGUuY29tcG9uZW50KVxuICAgICAgLmNyZWF0ZShfaW5qZWN0b3IpO1xuXG4gICAgZGVmaW5lSGlkZGVuUHJvcCh0eXBlLCAnX2NvbXBvbmVudFJlZicsIGNvbXBvbmVudFJlZik7XG4gICAgY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcblxuICAgIHJldHVybiB0eXBlWydfY29tcG9uZW50UmVmJ107XG4gIH1cblxuICBzZXRXcmFwcGVyKG9wdGlvbnM6IFdyYXBwZXJPcHRpb24pIHtcbiAgICB0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgIGlmIChvcHRpb25zLnR5cGVzKSB7XG4gICAgICBvcHRpb25zLnR5cGVzLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlV3JhcHBlcih0eXBlLCBvcHRpb25zLm5hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0V3JhcHBlcihuYW1lOiBzdHJpbmcpOiBXcmFwcGVyT3B0aW9uIHtcbiAgICBpZiAoIXRoaXMud3JhcHBlcnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0Zvcm1seSBFcnJvcl0gVGhlIHdyYXBwZXIgXCIke25hbWV9XCIgY291bGQgbm90IGJlIGZvdW5kLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgaXMgcmVnaXN0ZXJlZCB0aHJvdWdoIHRoZSBGb3JtbHlNb2R1bGUgZGVjbGFyYXRpb24uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud3JhcHBlcnNbbmFtZV07XG4gIH1cblxuICBzZXRUeXBlV3JhcHBlcih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy50eXBlc1t0eXBlXSkge1xuICAgICAgdGhpcy50eXBlc1t0eXBlXSA9IDxUeXBlT3B0aW9uPnt9O1xuICAgIH1cbiAgICBpZiAoIXRoaXMudHlwZXNbdHlwZV0ud3JhcHBlcnMpIHtcbiAgICAgIHRoaXMudHlwZXNbdHlwZV0ud3JhcHBlcnMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMudHlwZXNbdHlwZV0ud3JhcHBlcnMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMudHlwZXNbdHlwZV0ud3JhcHBlcnMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWxpZGF0b3Iob3B0aW9uczogVmFsaWRhdG9yT3B0aW9uKSB7XG4gICAgdGhpcy52YWxpZGF0b3JzW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yKG5hbWU6IHN0cmluZyk6IFZhbGlkYXRvck9wdGlvbiB7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRvcnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0Zvcm1seSBFcnJvcl0gVGhlIHZhbGlkYXRvciBcIiR7bmFtZX1cIiBjb3VsZCBub3QgYmUgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBpcyByZWdpc3RlcmVkIHRocm91Z2ggdGhlIEZvcm1seU1vZHVsZSBkZWNsYXJhdGlvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3JzW25hbWVdO1xuICB9XG5cbiAgYWRkVmFsaWRhdG9yTWVzc2FnZShuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uWydtZXNzYWdlJ10pIHtcbiAgICB0aGlzLm1lc3NhZ2VzW25hbWVdID0gbWVzc2FnZTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvck1lc3NhZ2UobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbbmFtZV07XG4gIH1cblxuICBzZXRNYW5pcHVsYXRvcihtYW5pcHVsYXRvcjogTWFuaXB1bGF0b3JPcHRpb24pIHtcbiAgICBuZXcgbWFuaXB1bGF0b3IuY2xhc3MoKVttYW5pcHVsYXRvci5tZXRob2RdKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUV4dGVuZGVkVHlwZShuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMudHlwZXNbbmFtZV0uZXh0ZW5kcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuZGVkVHlwZSA9IHRoaXMuZ2V0VHlwZSh0aGlzLnR5cGVzW25hbWVdLmV4dGVuZHMpO1xuICAgIGlmICghdGhpcy50eXBlc1tuYW1lXS5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMudHlwZXNbbmFtZV0uY29tcG9uZW50ID0gZXh0ZW5kZWRUeXBlLmNvbXBvbmVudDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudHlwZXNbbmFtZV0ud3JhcHBlcnMpIHtcbiAgICAgIHRoaXMudHlwZXNbbmFtZV0ud3JhcHBlcnMgPSBleHRlbmRlZFR5cGUud3JhcHBlcnM7XG4gICAgfVxuICB9XG59XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVPcHRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbXBvbmVudD86IGFueTtcbiAgd3JhcHBlcnM/OiBzdHJpbmdbXTtcbiAgZXh0ZW5kcz86IHN0cmluZztcbiAgZGVmYXVsdE9wdGlvbnM/OiBGb3JtbHlGaWVsZENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXcmFwcGVyT3B0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IGFueTtcbiAgdHlwZXM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFZhbGlkYXRvckZuIHtcbiAgKGM6IEFic3RyYWN0Q29udHJvbCwgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBvcHRpb25zPzogeyBbaWQ6IHN0cmluZ106IGFueTsgfSk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRvck9wdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsaWRhdGlvbjogRmllbGRWYWxpZGF0b3JGbjtcbiAgb3B0aW9ucz86IHsgW2lkOiBzdHJpbmddOiBhbnkgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25PcHRpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGV4dGVuc2lvbjogRm9ybWx5RXh0ZW5zaW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmcgfCAoKGVycm9yOiBhbnksIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4gc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5pcHVsYXRvck9wdGlvbiB7XG4gIGNsYXNzPzogeyBuZXcgKCk6IGFueSB9O1xuICBtZXRob2Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuaXB1bGF0b3JXcmFwcGVyIHtcbiAgKGY6IEZvcm1seUZpZWxkQ29uZmlnKTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbXBsYXRlTWFuaXB1bGF0b3JzIHtcbiAgcHJlV3JhcHBlcj86IE1hbmlwdWxhdG9yV3JhcHBlcltdO1xuICBwb3N0V3JhcHBlcj86IE1hbmlwdWxhdG9yV3JhcHBlcltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ09wdGlvbiB7XG4gIHR5cGVzPzogVHlwZU9wdGlvbltdO1xuICB3cmFwcGVycz86IFdyYXBwZXJPcHRpb25bXTtcbiAgdmFsaWRhdG9ycz86IFZhbGlkYXRvck9wdGlvbltdO1xuICBleHRlbnNpb25zPzogRXh0ZW5zaW9uT3B0aW9uW107XG4gIHZhbGlkYXRpb25NZXNzYWdlcz86IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uW107XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBgZXh0ZW5zaW9uc2AgaW5zdGVhZCAqL1xuICBtYW5pcHVsYXRvcnM/OiBNYW5pcHVsYXRvck9wdGlvbltdO1xuICBleHRyYXM/OiB7XG4gICAgLyoqIEBkZXByZWNhdGVkIHVzZSBgZXh0ZW5zaW9uc2AgaW5zdGVhZCAqL1xuICAgIGZpZWxkVHJhbnNmb3JtPzogYW55LFxuICAgIGltbXV0YWJsZT86IGJvb2xlYW4sXG4gICAgc2hvd0Vycm9yPzogKGZpZWxkOiBGaWVsZFR5cGUpID0+IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBvcHRpb24gd2hpY2ggZm9ybWx5IHJlbHkgb24gdG8gY2hlY2sgZmllbGQgZXhwcmVzc2lvbiBwcm9wZXJ0aWVzLlxuICAgICAqIC0gYG1vZGVsQ2hhbmdlYDogcGVyZm9ybSBhIGNoZWNrIHdoZW4gdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgY2hhbmdlcyAoV2lsbCBiZSBzZXQgYnkgZGVmYXVsdCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uKS5cbiAgICAgKiAtIGBjaGFuZ2VEZXRlY3Rpb25DaGVja2A6IHRyaWdnZXJzIGFuIGltbWVkaWF0ZSBjaGVjayB3aGVuIGBuZ0RvQ2hlY2tgIGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBjaGFuZ2VEZXRlY3Rpb25DaGVja2AuXG4gICAgICovXG4gICAgY2hlY2tFeHByZXNzaW9uT24/OiAnbW9kZWxDaGFuZ2UnIHwgJ2NoYW5nZURldGVjdGlvbkNoZWNrJyxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gbGF6aWx5IHJlbmRlciBmaWVsZCBjb21wb25lbnRzIG9yIG5vdCB3aGVuIG1hcmtlZCBhcyBoaWRkZW4uXG4gICAgICogLSBgdHJ1ZWA6IGxhemlseSByZW5kZXIgZmllbGQgY29tcG9uZW50cyAoV2lsbCBiZSBzZXQgYnkgZGVmYXVsdCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uKS5cbiAgICAgKiAtIGBmYWxzZWA6IHJlbmRlciBmaWVsZCBjb21wb25lbnRzIGFuZCB1c2UgQ1NTIHRvIGNvbnRyb2wgdGhlaXIgdmlzaWJpbGl0eS5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAgICovXG4gICAgbGF6eVJlbmRlcj86IGJvb2xlYW4sXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHJlc2V0IHRoZSB2YWx1ZSBvZiBoaWRkZW4gZmllbGRzLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICByZXNldEZpZWxkT25IaWRlPzogYm9vbGVhbixcbiAgfTtcbn1cbiJdfQ==