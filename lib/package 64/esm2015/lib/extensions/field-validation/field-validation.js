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
export class FieldValidationExtension {
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
            const { expression } = validator, options = tslib_1.__rest(validator, ["expression"]);
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
                    const _a = errors[name], { errorPath } = _a, opts = tslib_1.__rest(_a, ["errorPath"]);
                    childCtrl.setErrors(Object.assign({}, (childCtrl.errors || {}), { [name]: opts }));
                    !ctrl['_childrenErrors'] && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl['_childrenErrors'][name] = (/**
                     * @return {?}
                     */
                    () => {
                        const _a = childCtrl.errors || {}, _b = name, toDelete = _a[_b], childErrors = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                        childCtrl.setErrors(Object.keys(childErrors).length === 0 ? null : childErrors);
                    });
                }
            }));
        }
        return errors;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FieldValidationExtension.prototype.formlyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC12YWxpZGF0aW9uL2ZpZWxkLXZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQW1CLFVBQVUsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFDbkMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDOzs7OztJQUVsRCxVQUFVLENBQUMsS0FBNkI7UUFDdEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7OztJQUVPLG1CQUFtQixDQUFDLEtBQTZCLEVBQUUsSUFBc0M7O2NBQ3pGLFVBQVUsR0FBa0IsRUFBRTtRQUNwQyxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEYsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUMs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Q0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNyRSxJQUFJLFNBQVMsRUFBRTswQkFDUCxpQkFBcUMsRUFBckMsRUFBRSxTQUFTLE9BQTBCLEVBQXhCLHdDQUFPO29CQUMxQixTQUFTLENBQUMsU0FBUyxtQkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUcsQ0FBQztvQkFFbkUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQzs7O29CQUFHLEdBQUcsRUFBRTs4QkFDN0IsMkJBQTZELEVBQTNELFNBQU0sRUFBTixpQkFBZ0IsRUFBRSx5RUFBYzt3QkFDeEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2xGLENBQUMsQ0FBQSxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjs7Ozs7O0lBckphLGdEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1seUV4dGVuc2lvbiwgRm9ybWx5Q29uZmlnLCBWYWxpZGF0b3JPcHRpb24gfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0b3JzLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZPUk1MWV9WQUxJREFUT1JTLCBkZWZpbmVIaWRkZW5Qcm9wLCBpc1Byb21pc2UsIHdyYXBQcm9wZXJ0eSwgY2xvbmUsIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgdXBkYXRlVmFsaWRpdHkgfSBmcm9tICcuLi9maWVsZC1mb3JtL3V0aWxzJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogQGV4cGVyaW1lbnRhbCAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkVmFsaWRhdGlvbkV4dGVuc2lvbiBpbXBsZW1lbnRzIEZvcm1seUV4dGVuc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWcpIHt9XG5cbiAgb25Qb3B1bGF0ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIHRoaXMuaW5pdEZpZWxkVmFsaWRhdGlvbihmaWVsZCwgJ3ZhbGlkYXRvcnMnKTtcbiAgICB0aGlzLmluaXRGaWVsZFZhbGlkYXRpb24oZmllbGQsICdhc3luY1ZhbGlkYXRvcnMnKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEZpZWxkVmFsaWRhdGlvbihmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgdHlwZTogJ3ZhbGlkYXRvcnMnIHwgJ2FzeW5jVmFsaWRhdG9ycycpIHtcbiAgICBjb25zdCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG4gICAgaWYgKHR5cGUgPT09ICd2YWxpZGF0b3JzJyAmJiAhKGZpZWxkLmhhc093blByb3BlcnR5KCdmaWVsZEdyb3VwJykgJiYgIWZpZWxkLmtleSkpIHtcbiAgICAgIHZhbGlkYXRvcnMucHVzaCh0aGlzLmdldFByZWRlZmluZWRGaWVsZFZhbGlkYXRpb24oZmllbGQpKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRbdHlwZV0pIHtcbiAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yTmFtZSBpbiBmaWVsZFt0eXBlXSkge1xuICAgICAgICBpZiAodmFsaWRhdG9yTmFtZSA9PT0gJ3ZhbGlkYXRpb24nICYmICFBcnJheS5pc0FycmF5KGZpZWxkW3R5cGVdLnZhbGlkYXRpb24pKSB7XG4gICAgICAgICAgZmllbGRbdHlwZV0udmFsaWRhdGlvbiA9IFtmaWVsZFt0eXBlXS52YWxpZGF0aW9uXTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE5neEZvcm1seSgke2ZpZWxkLmtleX0pOiBwYXNzaW5nIGEgbm9uIGFycmF5IHZhbHVlIHRvIHRoZSAndmFsaWRhdGlvbicgaXMgZGVwcmVjYXRlZCwgcGFzcyBhbiBhcnJheSBpbnN0ZWFkYCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWxpZGF0b3JOYW1lID09PSAndmFsaWRhdGlvbidcbiAgICAgICAgICA/IHZhbGlkYXRvcnMucHVzaCguLi5maWVsZFt0eXBlXS52YWxpZGF0aW9uLm1hcCh2ID0+IHRoaXMud3JhcE5nVmFsaWRhdG9yRm4oZmllbGQsIHYpKSlcbiAgICAgICAgICA6IHZhbGlkYXRvcnMucHVzaCh0aGlzLndyYXBOZ1ZhbGlkYXRvckZuKGZpZWxkLCBmaWVsZFt0eXBlXVt2YWxpZGF0b3JOYW1lXSwgdmFsaWRhdG9yTmFtZSkpXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGZpZWxkLCAnXycgKyB0eXBlLCB2YWxpZGF0b3JzKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJlZGVmaW5lZEZpZWxkVmFsaWRhdGlvbihmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSk6IFZhbGlkYXRvckZuIHtcbiAgICBsZXQgVkFMSURBVE9SUyA9IFtdO1xuICAgIEZPUk1MWV9WQUxJREFUT1JTLmZvckVhY2gob3B0ID0+IHdyYXBQcm9wZXJ0eShmaWVsZC50ZW1wbGF0ZU9wdGlvbnMsIG9wdCwgKHsgY3VycmVudFZhbHVlLCBmaXJzdENoYW5nZSB9KSA9PiB7XG4gICAgICBWQUxJREFUT1JTID0gVkFMSURBVE9SUy5maWx0ZXIobyA9PiBvICE9PSBvcHQpO1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPSBudWxsICYmIGN1cnJlbnRWYWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgVkFMSURBVE9SUy5wdXNoKG9wdCk7XG4gICAgICB9XG4gICAgICBpZiAoIWZpcnN0Q2hhbmdlICYmIGZpZWxkLmZvcm1Db250cm9sKSB7XG4gICAgICAgIHVwZGF0ZVZhbGlkaXR5KGZpZWxkLmZvcm1Db250cm9sKTtcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgaWYgKFZBTElEQVRPUlMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKFZBTElEQVRPUlMubWFwKG9wdCA9PiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZmllbGQudGVtcGxhdGVPcHRpb25zW29wdF07XG4gICAgICAgIHN3aXRjaCAob3B0KSB7XG4gICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgICAgY2FzZSAncGF0dGVybic6XG4gICAgICAgICAgICByZXR1cm4gVmFsaWRhdG9ycy5wYXR0ZXJuKHZhbHVlKShjb250cm9sKTtcbiAgICAgICAgICBjYXNlICdtaW5MZW5ndGgnOlxuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMubWluTGVuZ3RoKHZhbHVlKShjb250cm9sKTtcbiAgICAgICAgICBjYXNlICdtYXhMZW5ndGgnOlxuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMubWF4TGVuZ3RoKHZhbHVlKShjb250cm9sKTtcbiAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMubWluKHZhbHVlKShjb250cm9sKTtcbiAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgcmV0dXJuIFZhbGlkYXRvcnMubWF4KHZhbHVlKShjb250cm9sKTtcbiAgICAgICAgfVxuICAgICAgfSkpKGNvbnRyb2wpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHdyYXBOZ1ZhbGlkYXRvckZuKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCB2YWxpZGF0b3I6IGFueSwgdmFsaWRhdG9yTmFtZT86IHN0cmluZykge1xuICAgIGxldCB2YWxpZGF0b3JPcHRpb246IFZhbGlkYXRvck9wdGlvbiA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0b3JPcHRpb24gPSBjbG9uZSh0aGlzLmZvcm1seUNvbmZpZy5nZXRWYWxpZGF0b3IodmFsaWRhdG9yKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgPT09ICdvYmplY3QnICYmIHZhbGlkYXRvci5uYW1lKSB7XG4gICAgICB2YWxpZGF0b3JPcHRpb24gPSBjbG9uZSh0aGlzLmZvcm1seUNvbmZpZy5nZXRWYWxpZGF0b3IodmFsaWRhdG9yLm5hbWUpKTtcbiAgICAgIGlmICh2YWxpZGF0b3Iub3B0aW9ucykge1xuICAgICAgICB2YWxpZGF0b3JPcHRpb24ub3B0aW9ucyA9IHZhbGlkYXRvci5vcHRpb25zO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yID09PSAnb2JqZWN0JyAmJiB2YWxpZGF0b3IuZXhwcmVzc2lvbikge1xuICAgICAgY29uc3QgeyBleHByZXNzaW9uLCAuLi5vcHRpb25zIH0gPSB2YWxpZGF0b3I7XG4gICAgICB2YWxpZGF0b3JPcHRpb24gPSB7XG4gICAgICAgIG5hbWU6IHZhbGlkYXRvck5hbWUsXG4gICAgICAgIHZhbGlkYXRpb246IGV4cHJlc3Npb24sXG4gICAgICAgIG9wdGlvbnM6IE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDAgPyBvcHRpb25zIDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbGlkYXRvck9wdGlvbiA9IHtcbiAgICAgICAgbmFtZTogdmFsaWRhdG9yTmFtZSxcbiAgICAgICAgdmFsaWRhdGlvbjogdmFsaWRhdG9yLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgY29uc3QgZXJyb3JzOiBhbnkgPSB2YWxpZGF0b3JPcHRpb24udmFsaWRhdGlvbihjb250cm9sLCBmaWVsZCwgdmFsaWRhdG9yT3B0aW9uLm9wdGlvbnMpO1xuICAgICAgaWYgKGlzUHJvbWlzZShlcnJvcnMpKSB7XG4gICAgICAgIHJldHVybiBlcnJvcnMudGhlbih2ID0+IHRoaXMuaGFuZGxlQXN5bmNSZXN1bHQoZmllbGQsIHZhbGlkYXRvck5hbWUgPyAhIXYgOiB2LCB2YWxpZGF0b3JPcHRpb24pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShlcnJvcnMpKSB7XG4gICAgICAgIHJldHVybiBlcnJvcnMucGlwZShtYXAodiA9PiB0aGlzLmhhbmRsZUFzeW5jUmVzdWx0KGZpZWxkLCB2YWxpZGF0b3JOYW1lID8gISF2IDogdiwgdmFsaWRhdG9yT3B0aW9uKSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXN1bHQoZmllbGQsIHZhbGlkYXRvck5hbWUgPyAhIWVycm9ycyA6IGVycm9ycywgdmFsaWRhdG9yT3B0aW9uKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVBc3luY1Jlc3VsdChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgZXJyb3JzOiBhbnksIG9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbikge1xuICAgIC8vIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEzMjAwXG4gICAgaWYgKGZpZWxkLm9wdGlvbnMgJiYgZmllbGQub3B0aW9ucy5fbWFya0ZvckNoZWNrKSB7XG4gICAgICBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2soZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3VsdChmaWVsZCwgZXJyb3JzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUmVzdWx0KGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBlcnJvcnM6IGFueSwgeyBuYW1lLCBvcHRpb25zIH06IFZhbGlkYXRvck9wdGlvbikge1xuICAgIGlmICh0eXBlb2YgZXJyb3JzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGVycm9ycyA9IGVycm9ycyA/IG51bGwgOiB7IFtuYW1lXTogb3B0aW9ucyA/IG9wdGlvbnMgOiB0cnVlIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3RybCA9IGZpZWxkLmZvcm1Db250cm9sO1xuICAgIGN0cmxbJ19jaGlsZHJlbkVycm9ycyddICYmIGN0cmxbJ19jaGlsZHJlbkVycm9ycyddW25hbWVdICYmIGN0cmxbJ19jaGlsZHJlbkVycm9ycyddW25hbWVdKCk7XG5cbiAgICBpZiAoaXNPYmplY3QoZXJyb3JzKSkge1xuICAgICAgT2JqZWN0LmtleXMoZXJyb3JzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICBjb25zdCBlcnJvclBhdGggPSBlcnJvcnNbbmFtZV0uZXJyb3JQYXRoXG4gICAgICAgICAgPyBlcnJvcnNbbmFtZV0uZXJyb3JQYXRoXG4gICAgICAgICAgOiAob3B0aW9ucyB8fCB7fSkuZXJyb3JQYXRoO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkQ3RybCA9IGVycm9yUGF0aCA/IGZpZWxkLmZvcm1Db250cm9sLmdldChlcnJvclBhdGgpIDogbnVsbDtcbiAgICAgICAgaWYgKGNoaWxkQ3RybCkge1xuICAgICAgICAgIGNvbnN0IHsgZXJyb3JQYXRoLCAuLi5vcHRzIH0gPSBlcnJvcnNbbmFtZV07XG4gICAgICAgICAgY2hpbGRDdHJsLnNldEVycm9ycyh7IC4uLihjaGlsZEN0cmwuZXJyb3JzIHx8IHt9KSwgW25hbWVdOiBvcHRzIH0pO1xuXG4gICAgICAgICAgIWN0cmxbJ19jaGlsZHJlbkVycm9ycyddICYmIGRlZmluZUhpZGRlblByb3AoY3RybCwgJ19jaGlsZHJlbkVycm9ycycsIHt9KTtcbiAgICAgICAgICBjdHJsWydfY2hpbGRyZW5FcnJvcnMnXVtuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgW25hbWVdOiB0b0RlbGV0ZSwgLi4uY2hpbGRFcnJvcnMgfSA9IGNoaWxkQ3RybC5lcnJvcnMgfHwge307XG4gICAgICAgICAgICBjaGlsZEN0cmwuc2V0RXJyb3JzKE9iamVjdC5rZXlzKGNoaWxkRXJyb3JzKS5sZW5ndGggPT09IDAgPyBudWxsIDogY2hpbGRFcnJvcnMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJvcnM7XG4gIH1cbn1cbiJdfQ==