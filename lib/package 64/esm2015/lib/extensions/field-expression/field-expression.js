/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObject, isNullOrUndefined, isUndefined, isFunction, defineHiddenProp, wrapProperty, getFieldValue, assignFieldValue } from '../../utils';
import { evalExpression, evalStringExpression } from './utils';
import { isObservable, Observable } from 'rxjs';
import { unregisterControl, registerControl, updateValidity } from '../field-form/utils';
import { FormArray } from '@angular/forms';
/**
 * \@experimental
 */
export class FieldExpressionExtension {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC1leHByZXNzaW9uL2ZpZWxkLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzNDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7O0lBQ25DLFdBQVcsQ0FBQyxLQUE2QjtRQUN2QyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDN0MsT0FBTztTQUNSOztZQUVHLFdBQVcsR0FBRyxLQUFLO1FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVzs7Ozs7UUFBRyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDaEMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FBQSxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxZ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aUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzttQkFDL0QsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQzFCO2dCQUNBLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7U0FDRjtRQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7O0lBRU8scUJBQXFCLENBQUMsS0FBNkIsRUFBRSxRQUFnQixFQUFFLEtBQVU7UUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUM5QixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUTtZQUNSLEtBQUs7U0FDTixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5VmFsdWVDaGFuZ2VFdmVudCwgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBpc09iamVjdCwgaXNOdWxsT3JVbmRlZmluZWQsIGlzVW5kZWZpbmVkLCBpc0Z1bmN0aW9uLCBkZWZpbmVIaWRkZW5Qcm9wLCB3cmFwUHJvcGVydHksIGdldEZpZWxkVmFsdWUsIGFzc2lnbkZpZWxkVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBldmFsRXhwcmVzc2lvbiwgZXZhbFN0cmluZ0V4cHJlc3Npb24gfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGb3JtbHlFeHRlbnNpb24gfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IHVucmVnaXN0ZXJDb250cm9sLCByZWdpc3RlckNvbnRyb2wsIHVwZGF0ZVZhbGlkaXR5IH0gZnJvbSAnLi4vZmllbGQtZm9ybS91dGlscyc7XG5pbXBvcnQgeyBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKiBAZXhwZXJpbWVudGFsICovXG5leHBvcnQgY2xhc3MgRmllbGRFeHByZXNzaW9uRXh0ZW5zaW9uIGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgcHJlUG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoZmllbGQucGFyZW50IHx8IGZpZWxkLm9wdGlvbnMuX2NoZWNrRmllbGQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tMb2NrZWQgPSBmYWxzZTtcbiAgICBmaWVsZC5vcHRpb25zLl9jaGVja0ZpZWxkID0gKGYsIGlnbm9yZUNhY2hlKSA9PiB7XG4gICAgICBpZiAoIWNoZWNrTG9ja2VkKSB7XG4gICAgICAgIGNoZWNrTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja0ZpZWxkKGYsIGlnbm9yZUNhY2hlKTtcbiAgICAgICAgY2hlY2tMb2NrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcG9zdFBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCFmaWVsZC5wYXJlbnQgfHwgZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2FjaGUgYnVpbHQgZXhwcmVzc2lvblxuICAgIGRlZmluZUhpZGRlblByb3AoZmllbGQsICdfZXhwcmVzc2lvblByb3BlcnRpZXMnLCB7fSk7XG5cbiAgICBpZiAoZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb25Qcm9wZXJ0eSA9IGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzW2tleV07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBleHByZXNzaW9uUHJvcGVydHkgPT09ICdzdHJpbmcnIHx8IGlzRnVuY3Rpb24oZXhwcmVzc2lvblByb3BlcnR5KSkge1xuICAgICAgICAgIGZpZWxkLl9leHByZXNzaW9uUHJvcGVydGllc1trZXldID0ge1xuICAgICAgICAgICAgZXhwcmVzc2lvbjogdGhpcy5fZXZhbEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvblByb3BlcnR5LFxuICAgICAgICAgICAgICBrZXkgPT09ICd0ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQnICYmIGZpZWxkLnBhcmVudC5leHByZXNzaW9uUHJvcGVydGllcyAmJiBmaWVsZC5wYXJlbnQuZXhwcmVzc2lvblByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgPyAoKSA9PiBmaWVsZC5wYXJlbnQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3RlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXNba2V5XSwgJ2V4cHJlc3Npb25WYWx1ZScsIHtcbiAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgIHNldDogKCkgPT4geyB9LFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXhwcmVzc2lvblByb3BlcnR5IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgIGNvbnN0IHN1YnNjcmliZSA9ICgpID0+IChleHByZXNzaW9uUHJvcGVydHkgYXMgT2JzZXJ2YWJsZTxhbnk+KVxuICAgICAgICAgICAgLnN1YnNjcmliZSh2ID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRFeHByVmFsdWUoZmllbGQsIGtleSwgdik7XG4gICAgICAgICAgICAgIGlmIChmaWVsZC5vcHRpb25zICYmIGZpZWxkLm9wdGlvbnMuX21hcmtGb3JDaGVjaykge1xuICAgICAgICAgICAgICAgIGZpZWxkLm9wdGlvbnMuX21hcmtGb3JDaGVjayhmaWVsZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlKCk7XG4gICAgICAgICAgY29uc3Qgb25Jbml0ID0gZmllbGQuaG9va3Mub25Jbml0O1xuICAgICAgICAgIGZpZWxkLmhvb2tzLm9uSW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb25Jbml0ICYmIG9uSW5pdChmaWVsZCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG9uRGVzdHJveSA9IGZpZWxkLmhvb2tzLm9uRGVzdHJveTtcbiAgICAgICAgICBmaWVsZC5ob29rcy5vbkRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBvbkRlc3Ryb3kgJiYgb25EZXN0cm95KGZpZWxkKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLmhpZGVFeHByZXNzaW9uKSB7XG4gICAgICAvLyBkZWxldGUgaGlkZSB2YWx1ZSBpbiBvcmRlciB0byBmb3JjZSByZS1ldmFsdWF0ZSBpdCBpbiBGb3JtbHlGb3JtRXhwcmVzc2lvbi5cbiAgICAgIGRlbGV0ZSBmaWVsZC5oaWRlO1xuXG4gICAgICBmaWVsZC5oaWRlRXhwcmVzc2lvbiA9IHRoaXMuX2V2YWxFeHByZXNzaW9uKFxuICAgICAgICAnaGlkZScsXG4gICAgICAgIGZpZWxkLmhpZGVFeHByZXNzaW9uLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGV0IHJvb3QgPSBmaWVsZC5wYXJlbnQ7XG4gICAgICAgICAgd2hpbGUgKHJvb3QucGFyZW50ICYmICFyb290LmhpZGUpIHtcbiAgICAgICAgICAgIHJvb3QgPSByb290LnBhcmVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcm9vdC5oaWRlO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcFByb3BlcnR5KGZpZWxkLCAnaGlkZScsICh7IGN1cnJlbnRWYWx1ZSwgZmlyc3RDaGFuZ2UgfSkgPT4ge1xuICAgICAgICBmaWVsZC5faGlkZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgaWYgKCFmaXJzdENoYW5nZSB8fCAoZmlyc3RDaGFuZ2UgJiYgY3VycmVudFZhbHVlID09PSB0cnVlKSkge1xuICAgICAgICAgIGZpZWxkLm9wdGlvbnMuX2hpZGRlbkZpZWxkc0ZvckNoZWNrLnB1c2goZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9ldmFsRXhwcmVzc2lvbihwcm9wOiBzdHJpbmcsIGV4cHJlc3Npb24sIHBhcmVudEV4cHJlc3Npb24/KSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZXhwcmVzc2lvbiA9IGV2YWxTdHJpbmdFeHByZXNzaW9uKGV4cHJlc3Npb24sIFsnbW9kZWwnLCAnZm9ybVN0YXRlJywgJ2ZpZWxkJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBleHByZXNzaW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZXhwcmVzc2lvbiA9ICgpID0+ICEhZXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAocGFyZW50RXhwcmVzc2lvbiAmJiBwYXJlbnRFeHByZXNzaW9uKCkpIHx8IGV4cHJlc3Npb24oLi4uYXJncyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gYFtGb3JtbHkgRXJyb3JdIFtFeHByZXNzaW9uIFwiJHtwcm9wfVwiXSAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2V2YWxFeHByZXNzaW9uUGF0aChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgcHJvcDogc3RyaW5nKSB7XG4gICAgaWYgKGZpZWxkLl9leHByZXNzaW9uUHJvcGVydGllc1twcm9wXSAmJiBmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXNbcHJvcF0uZXhwcmVzc2lvblBhdGhzKSB7XG4gICAgICByZXR1cm4gZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzW3Byb3BdLmV4cHJlc3Npb25QYXRocztcbiAgICB9XG5cbiAgICBsZXQgcGF0aHMgPSBbXTtcbiAgICBpZiAocHJvcC5pbmRleE9mKCdbJykgPT09IC0xKSB7XG4gICAgICBwYXRocyA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcFxuICAgICAgICAuc3BsaXQoL1tbXFxdXXsxLDJ9LykgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMTk4MjA2XG4gICAgICAgIC5maWx0ZXIocCA9PiBwKVxuICAgICAgICAuZm9yRWFjaCgocGF0aCA9PiB7XG4gICAgICAgICAgY29uc3QgYXJyYXlQYXRoID0gcGF0aC5tYXRjaCgvWyd8XCJdKC4qPylbJ3xcIl0vKTtcbiAgICAgICAgICBpZiAoYXJyYXlQYXRoKSB7XG4gICAgICAgICAgICBwYXRocy5wdXNoKGFycmF5UGF0aFsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGhzLnB1c2goLi4ucGF0aC5zcGxpdCgnLicpLmZpbHRlcihwID0+IHApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzW3Byb3BdKSB7XG4gICAgICBmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXNbcHJvcF0uZXhwcmVzc2lvblBhdGhzID0gcGF0aHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhzO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBpZ25vcmVDYWNoZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZmllbGRDaGFuZ2VkID0gdGhpcy5fY2hlY2tGaWVsZChmaWVsZCwgaWdub3JlQ2FjaGUpO1xuXG4gICAgZmllbGQub3B0aW9ucy5faGlkZGVuRmllbGRzRm9yQ2hlY2tcbiAgICAgIC5zb3J0KGYgPT4gZi5oaWRlID8gLTEgOiAxKVxuICAgICAgLmZvckVhY2goZiA9PiB0aGlzLnRvZ2dsZUZvcm1Db250cm9sKGYsICEhZi5oaWRlLCAhaWdub3JlQ2FjaGUpKTtcblxuICAgIGZpZWxkLm9wdGlvbnMuX2hpZGRlbkZpZWxkc0ZvckNoZWNrID0gW107XG4gICAgaWYgKGZpZWxkQ2hhbmdlZCkge1xuICAgICAgdGhpcy5jaGVja0ZpZWxkKGZpZWxkKTtcbiAgICAgIGlmIChmaWVsZC5vcHRpb25zICYmIGZpZWxkLm9wdGlvbnMuX21hcmtGb3JDaGVjaykge1xuICAgICAgICBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2soZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIGlnbm9yZUNhY2hlID0gZmFsc2UpIHtcbiAgICBsZXQgZmllbGRDaGFuZ2VkID0gZmFsc2U7XG4gICAgZmllbGQuZmllbGRHcm91cC5mb3JFYWNoKGYgPT4ge1xuICAgICAgaWYgKCFmLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrRmllbGRFeHByZXNzaW9uQ2hhbmdlKGYsIGlnbm9yZUNhY2hlKSAmJiAoZmllbGRDaGFuZ2VkID0gdHJ1ZSk7XG4gICAgICBpZiAodGhpcy5jaGVja0ZpZWxkVmlzaWJpbGl0eUNoYW5nZShmLCBpZ25vcmVDYWNoZSkpIHtcbiAgICAgICAgZmllbGQub3B0aW9ucy5faGlkZGVuRmllbGRzRm9yQ2hlY2sucHVzaChmKTtcbiAgICAgICAgZmllbGRDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGYuZmllbGRHcm91cCAmJiBmLmZpZWxkR3JvdXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9jaGVja0ZpZWxkKGYsIGlnbm9yZUNhY2hlKSAmJiAoZmllbGRDaGFuZ2VkID0gdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmllbGRDaGFuZ2VkO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZpZWxkRXhwcmVzc2lvbkNoYW5nZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgaWdub3JlQ2FjaGUpOiBib29sZWFuIHtcbiAgICBpZiAoIWZpZWxkIHx8ICFmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgbWFya0ZvckNoZWNrID0gZmFsc2U7XG4gICAgY29uc3QgZXhwcmVzc2lvblByb3BlcnRpZXMgPSBmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXM7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBleHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgbGV0IGV4cHJlc3Npb25WYWx1ZSA9IGV2YWxFeHByZXNzaW9uKGV4cHJlc3Npb25Qcm9wZXJ0aWVzW2tleV0uZXhwcmVzc2lvbiwgeyBmaWVsZCB9LCBbZmllbGQubW9kZWwsIGZpZWxkLm9wdGlvbnMuZm9ybVN0YXRlLCBmaWVsZCwgaWdub3JlQ2FjaGVdKTtcbiAgICAgIGlmIChrZXkgPT09ICd0ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQnKSB7XG4gICAgICAgIGV4cHJlc3Npb25WYWx1ZSA9ICEhZXhwcmVzc2lvblZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGlnbm9yZUNhY2hlIHx8IChcbiAgICAgICAgICBleHByZXNzaW9uUHJvcGVydGllc1trZXldLmV4cHJlc3Npb25WYWx1ZSAhPT0gZXhwcmVzc2lvblZhbHVlXG4gICAgICAgICAgJiYgKFxuICAgICAgICAgICAgIShpc09iamVjdChleHByZXNzaW9uVmFsdWUpIHx8IGlzRnVuY3Rpb24oZXhwcmVzc2lvblZhbHVlKSlcbiAgICAgICAgICAgIHx8IChcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihleHByZXNzaW9uVmFsdWUpXG4gICAgICAgICAgICAgICYmICgnJyArIGV4cHJlc3Npb25Qcm9wZXJ0aWVzW2tleV0uZXhwcmVzc2lvblZhbHVlICE9PSAnJyArIGV4cHJlc3Npb25WYWx1ZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHx8IGlzT2JzZXJ2YWJsZShleHByZXNzaW9uVmFsdWUpXG4gICAgICAgICAgICB8fCBKU09OLnN0cmluZ2lmeShleHByZXNzaW9uVmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShleHByZXNzaW9uUHJvcGVydGllc1trZXldLmV4cHJlc3Npb25WYWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBtYXJrRm9yQ2hlY2sgPSB0cnVlO1xuICAgICAgICBleHByZXNzaW9uUHJvcGVydGllc1trZXldLmV4cHJlc3Npb25WYWx1ZSA9IGV4cHJlc3Npb25WYWx1ZTtcbiAgICAgICAgdGhpcy5zZXRFeHByVmFsdWUoZmllbGQsIGtleSwgZXhwcmVzc2lvblZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya0ZvckNoZWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZpZWxkVmlzaWJpbGl0eUNoYW5nZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgaWdub3JlQ2FjaGUpOiBib29sZWFuIHtcbiAgICBpZiAoIWZpZWxkIHx8IGlzTnVsbE9yVW5kZWZpbmVkKGZpZWxkLmhpZGVFeHByZXNzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGhpZGVFeHByZXNzaW9uUmVzdWx0OiBib29sZWFuID0gISFldmFsRXhwcmVzc2lvbihcbiAgICAgIGZpZWxkLmhpZGVFeHByZXNzaW9uLFxuICAgICAgeyBmaWVsZCB9LFxuICAgICAgW2ZpZWxkLm1vZGVsLCBmaWVsZC5vcHRpb25zLmZvcm1TdGF0ZSwgZmllbGQsIGlnbm9yZUNhY2hlXSxcbiAgICApO1xuICAgIGxldCBtYXJrRm9yQ2hlY2sgPSBmYWxzZTtcbiAgICBpZiAoaGlkZUV4cHJlc3Npb25SZXN1bHQgIT09IGZpZWxkLmhpZGUgfHwgaWdub3JlQ2FjaGUpIHtcbiAgICAgIG1hcmtGb3JDaGVjayA9IHRydWU7XG4gICAgICAvLyB0b2dnbGUgaGlkZVxuICAgICAgZmllbGQuaGlkZSA9IGhpZGVFeHByZXNzaW9uUmVzdWx0O1xuICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmhpZGRlbiA9IGhpZGVFeHByZXNzaW9uUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrRm9yQ2hlY2s7XG4gIH1cblxuICBwcml2YXRlIHNldERpc2FibGVkU3RhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwXG4gICAgICAgIC5maWx0ZXIoZiA9PiAhZi5leHByZXNzaW9uUHJvcGVydGllcyB8fCAhZi5leHByZXNzaW9uUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVPcHRpb25zLmRpc2FibGVkJykpXG4gICAgICAgIC5mb3JFYWNoKGYgPT4gdGhpcy5zZXREaXNhYmxlZFN0YXRlKGYsIHZhbHVlKSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLmtleSAmJiBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQgIT09IHZhbHVlKSB7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUZvcm1Db250cm9sKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBoaWRlOiBib29sZWFuLCByZXNldE9uSGlkZTogYm9vbGVhbikge1xuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwXG4gICAgICAgIC5maWx0ZXIoZiA9PiAhZi5oaWRlRXhwcmVzc2lvbilcbiAgICAgICAgLmZvckVhY2goZiA9PiB0aGlzLnRvZ2dsZUZvcm1Db250cm9sKGYsIGhpZGUsIHJlc2V0T25IaWRlKSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLmZvcm1Db250cm9sICYmIGZpZWxkLmtleSkge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChmaWVsZCwgJ19oaWRlJywgISEoaGlkZSB8fCBmaWVsZC5oaWRlKSk7XG4gICAgICBjb25zdCBjID0gZmllbGQuZm9ybUNvbnRyb2w7XG4gICAgICBpZiAoY1snX2ZpZWxkcyddICYmIGNbJ19maWVsZHMnXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHVwZGF0ZVZhbGlkaXR5KGMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGlkZSA9PT0gdHJ1ZSAmJiAoIWNbJ19maWVsZHMnXSB8fCBjWydfZmllbGRzJ10uZXZlcnkoZiA9PiAhIWYuX2hpZGUpKSkge1xuICAgICAgICB1bnJlZ2lzdGVyQ29udHJvbChmaWVsZCwgdHJ1ZSk7XG4gICAgICAgIGlmIChyZXNldE9uSGlkZSAmJiBmaWVsZC5yZXNldE9uSGlkZSkge1xuICAgICAgICAgIGZpZWxkLmZvcm1Db250cm9sLnJlc2V0KHsgdmFsdWU6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IGZpZWxkLmZvcm1Db250cm9sLmRpc2FibGVkIH0pO1xuICAgICAgICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgICAgICBhc3NpZ25GaWVsZFZhbHVlKGZpZWxkLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBpZiAoZmllbGQuZm9ybUNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChoaWRlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZmllbGQucmVzZXRPbkhpZGUgJiYgZmllbGQucGFyZW50ICYmICFpc1VuZGVmaW5lZChmaWVsZC5kZWZhdWx0VmFsdWUpICYmIGlzVW5kZWZpbmVkKGdldEZpZWxkVmFsdWUoZmllbGQpKSkge1xuICAgICAgICAgIGFzc2lnbkZpZWxkVmFsdWUoZmllbGQsIGZpZWxkLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXJDb250cm9sKGZpZWxkLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICBpZiAoZmllbGQucmVzZXRPbkhpZGUgJiYgZmllbGQuZmllbGRBcnJheSAmJiAoZmllbGQuZmllbGRHcm91cCB8fCBbXSkubGVuZ3RoICE9PSAoZmllbGQubW9kZWwgfHwgW10pLmxlbmd0aCkge1xuICAgICAgICAgICg8YW55PiBmaWVsZC5vcHRpb25zKS5fYnVpbGRGb3JtKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLm9wdGlvbnMuZmllbGRDaGFuZ2VzKSB7XG4gICAgICBmaWVsZC5vcHRpb25zLmZpZWxkQ2hhbmdlcy5uZXh0KDxGb3JtbHlWYWx1ZUNoYW5nZUV2ZW50PiB7IGZpZWxkLCB0eXBlOiAnaGlkZGVuJywgdmFsdWU6IGhpZGUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRFeHByVmFsdWUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHByb3A6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gZmllbGQ7XG4gICAgICBjb25zdCBwYXRocyA9IHRoaXMuX2V2YWxFeHByZXNzaW9uUGF0aChmaWVsZCwgcHJvcCk7XG4gICAgICBjb25zdCBsYXN0SW5kZXggPSBwYXRocy5sZW5ndGggLSAxO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0SW5kZXg7IGkrKykge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXRbcGF0aHNbaV1dO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXRbcGF0aHNbbGFzdEluZGV4XV0gPSB2YWx1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZXJyb3IubWVzc2FnZSA9IGBbRm9ybWx5IEVycm9yXSBbRXhwcmVzc2lvbiBcIiR7cHJvcH1cIl0gJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvcCA9PT0gJ3RlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCcgJiYgZmllbGQua2V5KSB7XG4gICAgICB0aGlzLnNldERpc2FibGVkU3RhdGUoZmllbGQsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAocHJvcC5pbmRleE9mKCdtb2RlbC4nKSA9PT0gMCkge1xuICAgICAgY29uc3QgcGF0aCA9IHByb3AucmVwbGFjZSgvXm1vZGVsXFwuLywgJycpLFxuICAgICAgICBjb250cm9sID0gZmllbGQua2V5ICYmIHByb3AgPT09IHBhdGggPyBmaWVsZC5mb3JtQ29udHJvbCA6IGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbC5nZXQocGF0aCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29udHJvbFxuICAgICAgICAmJiAhKGlzTnVsbE9yVW5kZWZpbmVkKGNvbnRyb2wudmFsdWUpICYmIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlKSlcbiAgICAgICAgJiYgY29udHJvbC52YWx1ZSAhPT0gdmFsdWVcbiAgICAgICkge1xuICAgICAgICBjb250cm9sLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZW1pdEV4cHJlc3Npb25DaGFuZ2VzKGZpZWxkLCBwcm9wLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRFeHByZXNzaW9uQ2hhbmdlcyhmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmaWVsZC5vcHRpb25zLmZpZWxkQ2hhbmdlcy5uZXh0KHtcbiAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgIHR5cGU6ICdleHByZXNzaW9uQ2hhbmdlcycsXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9XG59XG4iXX0=