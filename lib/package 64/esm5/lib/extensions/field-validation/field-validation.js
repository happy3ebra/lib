/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Validators } from '@angular/forms';
import { FORMLY_VALIDATORS, defineHiddenProp, isPromise, wrapProperty, clone, isObject } from '../../utils';
import { updateValidity } from '../field-form/utils';
import { isObservable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * \@experimental
 */
var /**
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
                    ? validators.push.apply(validators, tslib_1.__spread(field[type].validation.map((/**
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
            var expression = validator.expression, options = tslib_1.__rest(validator, ["expression"]);
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
                    var _b = errors[name], errorPath_1 = _b.errorPath, opts = tslib_1.__rest(_b, ["errorPath"]);
                    childCtrl.setErrors(tslib_1.__assign({}, (childCtrl.errors || {}), (_a = {}, _a[name] = opts, _a)));
                    !ctrl['_childrenErrors'] && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl['_childrenErrors'][name] = (/**
                     * @return {?}
                     */
                    function () {
                        var _a = childCtrl.errors || {}, _b = name, toDelete = _a[_b], childErrors = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
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
 * \@experimental
 */
export { FieldValidationExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FieldValidationExtension.prototype.formlyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC12YWxpZGF0aW9uL2ZpZWxkLXZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQW1CLFVBQVUsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDOzs7O0lBQ0Usa0NBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQzs7Ozs7SUFFbEQsNkNBQVU7Ozs7SUFBVixVQUFXLEtBQTZCO1FBQ3RDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFFTyxzREFBbUI7Ozs7OztJQUEzQixVQUE0QixLQUE2QixFQUFFLElBQXNDO1FBQWpHLGlCQXFCQzs7WUFwQk8sVUFBVSxHQUFrQixFQUFFO1FBQ3BDLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoRixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FB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QVM7O29CQUV2QixTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDckUsSUFBSSxTQUFTLEVBQUU7d0JBQ1AsaUJBQXFDLEVBQW5DLDBCQUFTLEVBQUUsd0NBQU87b0JBQzFCLFNBQVMsQ0FBQyxTQUFTLHNCQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsZUFBRyxJQUFJLElBQUcsSUFBSSxPQUFHLENBQUM7b0JBRW5FLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMxRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUM7OztvQkFBRzs0QkFDeEIsMkJBQTZELEVBQTNELFNBQU0sRUFBTixpQkFBZ0IsRUFBRSx5RUFBYzt3QkFDeEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2xGLENBQUMsQ0FBQSxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUF0SkQsSUFzSkM7Ozs7Ozs7Ozs7SUFySmEsZ0RBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RXh0ZW5zaW9uLCBGb3JtbHlDb25maWcsIFZhbGlkYXRvck9wdGlvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRvcnMsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRk9STUxZX1ZBTElEQVRPUlMsIGRlZmluZUhpZGRlblByb3AsIGlzUHJvbWlzZSwgd3JhcFByb3BlcnR5LCBjbG9uZSwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyB1cGRhdGVWYWxpZGl0eSB9IGZyb20gJy4uL2ZpZWxkLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKiBAZXhwZXJpbWVudGFsICovXG5leHBvcnQgY2xhc3MgRmllbGRWYWxpZGF0aW9uRXh0ZW5zaW9uIGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZykge31cblxuICBvblBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgdGhpcy5pbml0RmllbGRWYWxpZGF0aW9uKGZpZWxkLCAndmFsaWRhdG9ycycpO1xuICAgIHRoaXMuaW5pdEZpZWxkVmFsaWRhdGlvbihmaWVsZCwgJ2FzeW5jVmFsaWRhdG9ycycpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RmllbGRWYWxpZGF0aW9uKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCB0eXBlOiAndmFsaWRhdG9ycycgfCAnYXN5bmNWYWxpZGF0b3JzJykge1xuICAgIGNvbnN0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZhbGlkYXRvcnMnICYmICEoZmllbGQuaGFzT3duUHJvcGVydHkoJ2ZpZWxkR3JvdXAnKSAmJiAhZmllbGQua2V5KSkge1xuICAgICAgdmFsaWRhdG9ycy5wdXNoKHRoaXMuZ2V0UHJlZGVmaW5lZEZpZWxkVmFsaWRhdGlvbihmaWVsZCkpO1xuICAgIH1cblxuICAgIGlmIChmaWVsZFt0eXBlXSkge1xuICAgICAgZm9yIChjb25zdCB2YWxpZGF0b3JOYW1lIGluIGZpZWxkW3R5cGVdKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JOYW1lID09PSAndmFsaWRhdGlvbicgJiYgIUFycmF5LmlzQXJyYXkoZmllbGRbdHlwZV0udmFsaWRhdGlvbikpIHtcbiAgICAgICAgICBmaWVsZFt0eXBlXS52YWxpZGF0aW9uID0gW2ZpZWxkW3R5cGVdLnZhbGlkYXRpb25dO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5KCR7ZmllbGQua2V5fSk6IHBhc3NpbmcgYSBub24gYXJyYXkgdmFsdWUgdG8gdGhlICd2YWxpZGF0aW9uJyBpcyBkZXByZWNhdGVkLCBwYXNzIGFuIGFycmF5IGluc3RlYWRgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbGlkYXRvck5hbWUgPT09ICd2YWxpZGF0aW9uJ1xuICAgICAgICAgID8gdmFsaWRhdG9ycy5wdXNoKC4uLmZpZWxkW3R5cGVdLnZhbGlkYXRpb24ubWFwKHYgPT4gdGhpcy53cmFwTmdWYWxpZGF0b3JGbihmaWVsZCwgdikpKVxuICAgICAgICAgIDogdmFsaWRhdG9ycy5wdXNoKHRoaXMud3JhcE5nVmFsaWRhdG9yRm4oZmllbGQsIGZpZWxkW3R5cGVdW3ZhbGlkYXRvck5hbWVdLCB2YWxpZGF0b3JOYW1lKSlcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluZUhpZGRlblByb3AoZmllbGQsICdfJyArIHR5cGUsIHZhbGlkYXRvcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcmVkZWZpbmVkRmllbGRWYWxpZGF0aW9uKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKTogVmFsaWRhdG9yRm4ge1xuICAgIGxldCBWQUxJREFUT1JTID0gW107XG4gICAgRk9STUxZX1ZBTElEQVRPUlMuZm9yRWFjaChvcHQgPT4gd3JhcFByb3BlcnR5KGZpZWxkLnRlbXBsYXRlT3B0aW9ucywgb3B0LCAoeyBjdXJyZW50VmFsdWUsIGZpcnN0Q2hhbmdlIH0pID0+IHtcbiAgICAgIFZBTElEQVRPUlMgPSBWQUxJREFUT1JTLmZpbHRlcihvID0+IG8gIT09IG9wdCk7XG4gICAgICBpZiAoY3VycmVudFZhbHVlICE9IG51bGwgJiYgY3VycmVudFZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICBWQUxJREFUT1JTLnB1c2gob3B0KTtcbiAgICAgIH1cbiAgICAgIGlmICghZmlyc3RDaGFuZ2UgJiYgZmllbGQuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdXBkYXRlVmFsaWRpdHkoZmllbGQuZm9ybUNvbnRyb2wpO1xuICAgICAgfVxuICAgIH0pKTtcblxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICBpZiAoVkFMSURBVE9SUy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UoVkFMSURBVE9SUy5tYXAob3B0ID0+ICgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmaWVsZC50ZW1wbGF0ZU9wdGlvbnNbb3B0XTtcbiAgICAgICAgc3dpdGNoIChvcHQpIHtcbiAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5yZXF1aXJlZChjb250cm9sKTtcbiAgICAgICAgICBjYXNlICdwYXR0ZXJuJzpcbiAgICAgICAgICAgIHJldHVybiBWYWxpZGF0b3JzLnBhdHRlcm4odmFsdWUpKGNvbnRyb2wpO1xuICAgICAgICAgIGNhc2UgJ21pbkxlbmd0aCc6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5taW5MZW5ndGgodmFsdWUpKGNvbnRyb2wpO1xuICAgICAgICAgIGNhc2UgJ21heExlbmd0aCc6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGgodmFsdWUpKGNvbnRyb2wpO1xuICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5taW4odmFsdWUpKGNvbnRyb2wpO1xuICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXgodmFsdWUpKGNvbnRyb2wpO1xuICAgICAgICB9XG4gICAgICB9KSkoY29udHJvbCk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgd3JhcE5nVmFsaWRhdG9yRm4oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHZhbGlkYXRvcjogYW55LCB2YWxpZGF0b3JOYW1lPzogc3RyaW5nKSB7XG4gICAgbGV0IHZhbGlkYXRvck9wdGlvbjogVmFsaWRhdG9yT3B0aW9uID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIHZhbGlkYXRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbGlkYXRvck9wdGlvbiA9IGNsb25lKHRoaXMuZm9ybWx5Q29uZmlnLmdldFZhbGlkYXRvcih2YWxpZGF0b3IpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbGlkYXRvciA9PT0gJ29iamVjdCcgJiYgdmFsaWRhdG9yLm5hbWUpIHtcbiAgICAgIHZhbGlkYXRvck9wdGlvbiA9IGNsb25lKHRoaXMuZm9ybWx5Q29uZmlnLmdldFZhbGlkYXRvcih2YWxpZGF0b3IubmFtZSkpO1xuICAgICAgaWYgKHZhbGlkYXRvci5vcHRpb25zKSB7XG4gICAgICAgIHZhbGlkYXRvck9wdGlvbi5vcHRpb25zID0gdmFsaWRhdG9yLm9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgPT09ICdvYmplY3QnICYmIHZhbGlkYXRvci5leHByZXNzaW9uKSB7XG4gICAgICBjb25zdCB7IGV4cHJlc3Npb24sIC4uLm9wdGlvbnMgfSA9IHZhbGlkYXRvcjtcbiAgICAgIHZhbGlkYXRvck9wdGlvbiA9IHtcbiAgICAgICAgbmFtZTogdmFsaWRhdG9yTmFtZSxcbiAgICAgICAgdmFsaWRhdGlvbjogZXhwcmVzc2lvbixcbiAgICAgICAgb3B0aW9uczogT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID4gMCA/IG9wdGlvbnMgOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbGlkYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsaWRhdG9yT3B0aW9uID0ge1xuICAgICAgICBuYW1lOiB2YWxpZGF0b3JOYW1lLFxuICAgICAgICB2YWxpZGF0aW9uOiB2YWxpZGF0b3IsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICBjb25zdCBlcnJvcnM6IGFueSA9IHZhbGlkYXRvck9wdGlvbi52YWxpZGF0aW9uKGNvbnRyb2wsIGZpZWxkLCB2YWxpZGF0b3JPcHRpb24ub3B0aW9ucyk7XG4gICAgICBpZiAoaXNQcm9taXNlKGVycm9ycykpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ycy50aGVuKHYgPT4gdGhpcy5oYW5kbGVBc3luY1Jlc3VsdChmaWVsZCwgdmFsaWRhdG9yTmFtZSA/ICEhdiA6IHYsIHZhbGlkYXRvck9wdGlvbikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPYnNlcnZhYmxlKGVycm9ycykpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ycy5waXBlKG1hcCh2ID0+IHRoaXMuaGFuZGxlQXN5bmNSZXN1bHQoZmllbGQsIHZhbGlkYXRvck5hbWUgPyAhIXYgOiB2LCB2YWxpZGF0b3JPcHRpb24pKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3VsdChmaWVsZCwgdmFsaWRhdG9yTmFtZSA/ICEhZXJyb3JzIDogZXJyb3JzLCB2YWxpZGF0b3JPcHRpb24pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUFzeW5jUmVzdWx0KGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBlcnJvcnM6IGFueSwgb3B0aW9uczogVmFsaWRhdG9yT3B0aW9uKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTMyMDBcbiAgICBpZiAoZmllbGQub3B0aW9ucyAmJiBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2spIHtcbiAgICAgIGZpZWxkLm9wdGlvbnMuX21hcmtGb3JDaGVjayhmaWVsZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzdWx0KGZpZWxkLCBlcnJvcnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXN1bHQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIGVycm9yczogYW55LCB7IG5hbWUsIG9wdGlvbnMgfTogVmFsaWRhdG9yT3B0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBlcnJvcnMgPT09ICdib29sZWFuJykge1xuICAgICAgZXJyb3JzID0gZXJyb3JzID8gbnVsbCA6IHsgW25hbWVdOiBvcHRpb25zID8gb3B0aW9ucyA6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjb25zdCBjdHJsID0gZmllbGQuZm9ybUNvbnRyb2w7XG4gICAgY3RybFsnX2NoaWxkcmVuRXJyb3JzJ10gJiYgY3RybFsnX2NoaWxkcmVuRXJyb3JzJ11bbmFtZV0gJiYgY3RybFsnX2NoaWxkcmVuRXJyb3JzJ11bbmFtZV0oKTtcblxuICAgIGlmIChpc09iamVjdChlcnJvcnMpKSB7XG4gICAgICBPYmplY3Qua2V5cyhlcnJvcnMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yUGF0aCA9IGVycm9yc1tuYW1lXS5lcnJvclBhdGhcbiAgICAgICAgICA/IGVycm9yc1tuYW1lXS5lcnJvclBhdGhcbiAgICAgICAgICA6IChvcHRpb25zIHx8IHt9KS5lcnJvclBhdGg7XG5cbiAgICAgICAgY29uc3QgY2hpbGRDdHJsID0gZXJyb3JQYXRoID8gZmllbGQuZm9ybUNvbnRyb2wuZ2V0KGVycm9yUGF0aCkgOiBudWxsO1xuICAgICAgICBpZiAoY2hpbGRDdHJsKSB7XG4gICAgICAgICAgY29uc3QgeyBlcnJvclBhdGgsIC4uLm9wdHMgfSA9IGVycm9yc1tuYW1lXTtcbiAgICAgICAgICBjaGlsZEN0cmwuc2V0RXJyb3JzKHsgLi4uKGNoaWxkQ3RybC5lcnJvcnMgfHwge30pLCBbbmFtZV06IG9wdHMgfSk7XG5cbiAgICAgICAgICAhY3RybFsnX2NoaWxkcmVuRXJyb3JzJ10gJiYgZGVmaW5lSGlkZGVuUHJvcChjdHJsLCAnX2NoaWxkcmVuRXJyb3JzJywge30pO1xuICAgICAgICAgIGN0cmxbJ19jaGlsZHJlbkVycm9ycyddW25hbWVdID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBbbmFtZV06IHRvRGVsZXRlLCAuLi5jaGlsZEVycm9ycyB9ID0gY2hpbGRDdHJsLmVycm9ycyB8fCB7fTtcbiAgICAgICAgICAgIGNoaWxkQ3RybC5zZXRFcnJvcnMoT2JqZWN0LmtleXMoY2hpbGRFcnJvcnMpLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBjaGlsZEVycm9ycyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxufVxuIl19