/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isObject, isNullOrUndefined, isUndefined, isFunction, defineHiddenProp, wrapProperty, getFieldValue, assignFieldValue } from '../../utils';
import { evalExpression, evalStringExpression } from './utils';
import { isObservable, Observable } from 'rxjs';
import { unregisterControl, registerControl, updateValidity } from '../field-form/utils';
import { FormArray } from '@angular/forms';
/**
 * \@experimental
 */
var /**
 * \@experimental
 */
FieldExpressionExtension = /** @class */ (function () {
    function FieldExpressionExtension() {
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldExpressionExtension.prototype.prePopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field.parent || field.options._checkField) {
            return;
        }
        /** @type {?} */
        var checkLocked = false;
        field.options._checkField = (/**
         * @param {?} f
         * @param {?} ignoreCache
         * @return {?}
         */
        function (f, ignoreCache) {
            if (!checkLocked) {
                checkLocked = true;
                _this.checkField(f, ignoreCache);
                checkLocked = false;
            }
        });
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldExpressionExtension.prototype.postPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (!field.parent || field._expressionProperties) {
            return;
        }
        // cache built expression
        defineHiddenProp(field, '_expressionProperties', {});
        if (field.expressionProperties) {
            var _loop_1 = function (key) {
                /** @type {?} */
                var expressionProperty = field.expressionProperties[key];
                if (typeof expressionProperty === 'string' || isFunction(expressionProperty)) {
                    field._expressionProperties[key] = {
                        expression: this_1._evalExpression(key, expressionProperty, key === 'templateOptions.disabled' && field.parent.expressionProperties && field.parent.expressionProperties.hasOwnProperty('templateOptions.disabled')
                            ? (/**
                             * @return {?}
                             */
                            function () { return field.parent.templateOptions.disabled; })
                            : undefined),
                    };
                    if (key === 'templateOptions.disabled') {
                        Object.defineProperty(field._expressionProperties[key], 'expressionValue', {
                            get: (/**
                             * @return {?}
                             */
                            function () { return field.templateOptions.disabled; }),
                            set: (/**
                             * @return {?}
                             */
                            function () { }),
                            enumerable: true,
                            configurable: true,
                        });
                    }
                }
                else if (expressionProperty instanceof Observable) {
                    /** @type {?} */
                    var subscribe_1 = (/**
                     * @return {?}
                     */
                    function () { return ((/** @type {?} */ (expressionProperty)))
                        .subscribe((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        _this.setExprValue(field, key, v);
                        if (field.options && field.options._markForCheck) {
                            field.options._markForCheck(field);
                        }
                    })); });
                    /** @type {?} */
                    var subscription_1 = subscribe_1();
                    /** @type {?} */
                    var onInit_1 = field.hooks.onInit;
                    field.hooks.onInit = (/**
                     * @return {?}
                     */
                    function () {
                        if (subscription_1 === null) {
                            subscription_1 = subscribe_1();
                        }
                        return onInit_1 && onInit_1(field);
                    });
                    /** @type {?} */
                    var onDestroy_1 = field.hooks.onDestroy;
                    field.hooks.onDestroy = (/**
                     * @return {?}
                     */
                    function () {
                        onDestroy_1 && onDestroy_1(field);
                        subscription_1.unsubscribe();
                        subscription_1 = null;
                    });
                }
            };
            var this_1 = this;
            for (var key in field.expressionProperties) {
                _loop_1(key);
            }
        }
        if (field.hideExpression) {
            // delete hide value in order to force re-evaluate it in FormlyFormExpression.
            delete field.hide;
            field.hideExpression = this._evalExpression('hide', field.hideExpression, (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var root = field.parent;
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
            function (_a) {
                var currentValue = _a.currentValue, firstChange = _a.firstChange;
                field._hide = currentValue;
                if (!firstChange || (firstChange && currentValue === true)) {
                    field.options._hiddenFieldsForCheck.push(field);
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} prop
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    FieldExpressionExtension.prototype._evalExpression = /**
     * @private
     * @param {?} prop
     * @param {?} expression
     * @param {?=} parentExpression
     * @return {?}
     */
    function (prop, expression, parentExpression) {
        return (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                if (typeof expression === 'string') {
                    expression = evalStringExpression(expression, ['model', 'formState', 'field']);
                }
                if (typeof expression !== 'function') {
                    expression = (/**
                     * @return {?}
                     */
                    function () { return !!expression; });
                }
                return (parentExpression && parentExpression()) || expression.apply(void 0, tslib_1.__spread(args));
            }
            catch (error) {
                error.message = "[Formly Error] [Expression \"" + prop + "\"] " + error.message;
                throw error;
            }
        });
    };
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @return {?}
     */
    FieldExpressionExtension.prototype._evalExpressionPath = /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @return {?}
     */
    function (field, prop) {
        if (field._expressionProperties[prop] && field._expressionProperties[prop].expressionPaths) {
            return field._expressionProperties[prop].expressionPaths;
        }
        /** @type {?} */
        var paths = [];
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
            function (p) { return p; }))
                .forEach(((/**
             * @param {?} path
             * @return {?}
             */
            function (path) {
                /** @type {?} */
                var arrayPath = path.match(/['|"](.*?)['|"]/);
                if (arrayPath) {
                    paths.push(arrayPath[1]);
                }
                else {
                    paths.push.apply(paths, tslib_1.__spread(path.split('.').filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p; }))));
                }
            })));
        }
        if (field._expressionProperties[prop]) {
            field._expressionProperties[prop].expressionPaths = paths;
        }
        return paths;
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkField = /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        var _this = this;
        if (ignoreCache === void 0) { ignoreCache = false; }
        /** @type {?} */
        var fieldChanged = this._checkField(field, ignoreCache);
        field.options._hiddenFieldsForCheck
            .sort((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.hide ? -1 : 1; }))
            .forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return _this.toggleFormControl(f, !!f.hide, !ignoreCache); }));
        field.options._hiddenFieldsForCheck = [];
        if (fieldChanged) {
            this.checkField(field);
            if (field.options && field.options._markForCheck) {
                field.options._markForCheck(field);
            }
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype._checkField = /**
     * @private
     * @param {?} field
     * @param {?=} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        var _this = this;
        if (ignoreCache === void 0) { ignoreCache = false; }
        /** @type {?} */
        var fieldChanged = false;
        field.fieldGroup.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            if (!f.options) {
                return;
            }
            _this.checkFieldExpressionChange(f, ignoreCache) && (fieldChanged = true);
            if (_this.checkFieldVisibilityChange(f, ignoreCache)) {
                field.options._hiddenFieldsForCheck.push(f);
                fieldChanged = true;
            }
            if (f.fieldGroup && f.fieldGroup.length > 0) {
                _this._checkField(f, ignoreCache) && (fieldChanged = true);
            }
        }));
        return fieldChanged;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkFieldExpressionChange = /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        if (!field || !field._expressionProperties) {
            return false;
        }
        /** @type {?} */
        var markForCheck = false;
        /** @type {?} */
        var expressionProperties = field._expressionProperties;
        for (var key in expressionProperties) {
            /** @type {?} */
            var expressionValue = evalExpression(expressionProperties[key].expression, { field: field }, [field.model, field.options.formState, field, ignoreCache]);
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
    };
    /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    FieldExpressionExtension.prototype.checkFieldVisibilityChange = /**
     * @private
     * @param {?} field
     * @param {?} ignoreCache
     * @return {?}
     */
    function (field, ignoreCache) {
        if (!field || isNullOrUndefined(field.hideExpression)) {
            return false;
        }
        /** @type {?} */
        var hideExpressionResult = !!evalExpression(field.hideExpression, { field: field }, [field.model, field.options.formState, field, ignoreCache]);
        /** @type {?} */
        var markForCheck = false;
        if (hideExpressionResult !== field.hide || ignoreCache) {
            markForCheck = true;
            // toggle hide
            field.hide = hideExpressionResult;
            field.templateOptions.hidden = hideExpressionResult;
        }
        return markForCheck;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.setDisabledState = /**
     * @private
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (field, value) {
        var _this = this;
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.expressionProperties || !f.expressionProperties.hasOwnProperty('templateOptions.disabled'); }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this.setDisabledState(f, value); }));
        }
        if (field.key && field.templateOptions.disabled !== value) {
            field.templateOptions.disabled = value;
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    FieldExpressionExtension.prototype.toggleFormControl = /**
     * @private
     * @param {?} field
     * @param {?} hide
     * @param {?} resetOnHide
     * @return {?}
     */
    function (field, hide, resetOnHide) {
        var _this = this;
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.hideExpression; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this.toggleFormControl(f, hide, resetOnHide); }));
        }
        if (field.formControl && field.key) {
            defineHiddenProp(field, '_hide', !!(hide || field.hide));
            /** @type {?} */
            var c = field.formControl;
            if (c['_fields'] && c['_fields'].length > 1) {
                updateValidity(c);
            }
            if (hide === true && (!c['_fields'] || c['_fields'].every((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !!f._hide; })))) {
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
            field.options.fieldChanges.next((/** @type {?} */ ({ field: field, type: 'hidden', value: hide })));
        }
    };
    /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.setExprValue = /**
     * @private
     * @param {?} field
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    function (field, prop, value) {
        try {
            /** @type {?} */
            var target = field;
            /** @type {?} */
            var paths = this._evalExpressionPath(field, prop);
            /** @type {?} */
            var lastIndex = paths.length - 1;
            for (var i = 0; i < lastIndex; i++) {
                target = target[paths[i]];
            }
            target[paths[lastIndex]] = value;
        }
        catch (error) {
            error.message = "[Formly Error] [Expression \"" + prop + "\"] " + error.message;
            throw error;
        }
        if (prop === 'templateOptions.disabled' && field.key) {
            this.setDisabledState(field, value);
        }
        if (prop.indexOf('model.') === 0) {
            /** @type {?} */
            var path = prop.replace(/^model\./, '');
            /** @type {?} */
            var control = field.key && prop === path ? field.formControl : field.parent.formControl.get(path);
            if (control
                && !(isNullOrUndefined(control.value) && isNullOrUndefined(value))
                && control.value !== value) {
                control.patchValue(value);
            }
        }
        this.emitExpressionChanges(field, prop, value);
    };
    /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    FieldExpressionExtension.prototype.emitExpressionChanges = /**
     * @private
     * @param {?} field
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (field, property, value) {
        if (!field.options.fieldChanges) {
            return;
        }
        field.options.fieldChanges.next({
            field: field,
            type: 'expressionChanges',
            property: property,
            value: value,
        });
    };
    return FieldExpressionExtension;
}());
/**
 * \@experimental
 */
export { FieldExpressionExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC1leHByZXNzaW9uL2ZpZWxkLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwSixPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUczQzs7OztJQUFBO0lBd1ZBLENBQUM7Ozs7O0lBdlZDLDhDQUFXOzs7O0lBQVgsVUFBWSxLQUE2QjtRQUF6QyxpQkFhQztRQVpDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUM3QyxPQUFPO1NBQ1I7O1lBRUcsV0FBVyxHQUFHLEtBQUs7UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7OztRQUFHLFVBQUMsQ0FBQyxFQUFFLFdBQVc7WUFDekMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ2hDLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUEsQ0FBQztJQUNKLENB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QUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFOztnQkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQzs7Z0JBQ3ZDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFFL0YsSUFDRSxPQUFPO21CQUNKLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7bUJBQy9ELE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUMxQjtnQkFDQSxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7OztJQUVPLHdEQUFxQjs7Ozs7OztJQUE3QixVQUE4QixLQUE2QixFQUFFLFFBQWdCLEVBQUUsS0FBVTtRQUN2RixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzlCLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLFVBQUE7WUFDUixLQUFLLE9BQUE7U0FDTixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQUFDLEFBeFZELElBd1ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seVZhbHVlQ2hhbmdlRXZlbnQsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgaXNPYmplY3QsIGlzTnVsbE9yVW5kZWZpbmVkLCBpc1VuZGVmaW5lZCwgaXNGdW5jdGlvbiwgZGVmaW5lSGlkZGVuUHJvcCwgd3JhcFByb3BlcnR5LCBnZXRGaWVsZFZhbHVlLCBhc3NpZ25GaWVsZFZhbHVlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgZXZhbEV4cHJlc3Npb24sIGV2YWxTdHJpbmdFeHByZXNzaW9uIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRm9ybWx5RXh0ZW5zaW9uIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyB1bnJlZ2lzdGVyQ29udHJvbCwgcmVnaXN0ZXJDb250cm9sLCB1cGRhdGVWYWxpZGl0eSB9IGZyb20gJy4uL2ZpZWxkLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKiogQGV4cGVyaW1lbnRhbCAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkRXhwcmVzc2lvbkV4dGVuc2lvbiBpbXBsZW1lbnRzIEZvcm1seUV4dGVuc2lvbiB7XG4gIHByZVBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKGZpZWxkLnBhcmVudCB8fCBmaWVsZC5vcHRpb25zLl9jaGVja0ZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNoZWNrTG9ja2VkID0gZmFsc2U7XG4gICAgZmllbGQub3B0aW9ucy5fY2hlY2tGaWVsZCA9IChmLCBpZ25vcmVDYWNoZSkgPT4ge1xuICAgICAgaWYgKCFjaGVja0xvY2tlZCkge1xuICAgICAgICBjaGVja0xvY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tGaWVsZChmLCBpZ25vcmVDYWNoZSk7XG4gICAgICAgIGNoZWNrTG9ja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHBvc3RQb3B1bGF0ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGlmICghZmllbGQucGFyZW50IHx8IGZpZWxkLl9leHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNhY2hlIGJ1aWx0IGV4cHJlc3Npb25cbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGZpZWxkLCAnX2V4cHJlc3Npb25Qcm9wZXJ0aWVzJywge30pO1xuXG4gICAgaWYgKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uUHJvcGVydHkgPSBmaWVsZC5leHByZXNzaW9uUHJvcGVydGllc1trZXldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvblByb3BlcnR5ID09PSAnc3RyaW5nJyB8fCBpc0Z1bmN0aW9uKGV4cHJlc3Npb25Qcm9wZXJ0eSkpIHtcbiAgICAgICAgICBmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXNba2V5XSA9IHtcbiAgICAgICAgICAgIGV4cHJlc3Npb246IHRoaXMuX2V2YWxFeHByZXNzaW9uKFxuICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgIGV4cHJlc3Npb25Qcm9wZXJ0eSxcbiAgICAgICAgICAgICAga2V5ID09PSAndGVtcGxhdGVPcHRpb25zLmRpc2FibGVkJyAmJiBmaWVsZC5wYXJlbnQuZXhwcmVzc2lvblByb3BlcnRpZXMgJiYgZmllbGQucGFyZW50LmV4cHJlc3Npb25Qcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgID8gKCkgPT4gZmllbGQucGFyZW50LnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZFxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChrZXkgPT09ICd0ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQnKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzW2tleV0sICdleHByZXNzaW9uVmFsdWUnLCB7XG4gICAgICAgICAgICAgIGdldDogKCkgPT4gZmllbGQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkLFxuICAgICAgICAgICAgICBzZXQ6ICgpID0+IHsgfSxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV4cHJlc3Npb25Qcm9wZXJ0eSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICBjb25zdCBzdWJzY3JpYmUgPSAoKSA9PiAoZXhwcmVzc2lvblByb3BlcnR5IGFzIE9ic2VydmFibGU8YW55PilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0RXhwclZhbHVlKGZpZWxkLCBrZXksIHYpO1xuICAgICAgICAgICAgICBpZiAoZmllbGQub3B0aW9ucyAmJiBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2soZmllbGQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZSgpO1xuICAgICAgICAgIGNvbnN0IG9uSW5pdCA9IGZpZWxkLmhvb2tzLm9uSW5pdDtcbiAgICAgICAgICBmaWVsZC5ob29rcy5vbkluaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9uSW5pdCAmJiBvbkluaXQoZmllbGQpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvbkRlc3Ryb3kgPSBmaWVsZC5ob29rcy5vbkRlc3Ryb3k7XG4gICAgICAgICAgZmllbGQuaG9va3Mub25EZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgb25EZXN0cm95ICYmIG9uRGVzdHJveShmaWVsZCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZC5oaWRlRXhwcmVzc2lvbikge1xuICAgICAgLy8gZGVsZXRlIGhpZGUgdmFsdWUgaW4gb3JkZXIgdG8gZm9yY2UgcmUtZXZhbHVhdGUgaXQgaW4gRm9ybWx5Rm9ybUV4cHJlc3Npb24uXG4gICAgICBkZWxldGUgZmllbGQuaGlkZTtcblxuICAgICAgZmllbGQuaGlkZUV4cHJlc3Npb24gPSB0aGlzLl9ldmFsRXhwcmVzc2lvbihcbiAgICAgICAgJ2hpZGUnLFxuICAgICAgICBmaWVsZC5oaWRlRXhwcmVzc2lvbixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGxldCByb290ID0gZmllbGQucGFyZW50O1xuICAgICAgICAgIHdoaWxlIChyb290LnBhcmVudCAmJiAhcm9vdC5oaWRlKSB7XG4gICAgICAgICAgICByb290ID0gcm9vdC5wYXJlbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJvb3QuaGlkZTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBQcm9wZXJ0eShmaWVsZCwgJ2hpZGUnLCAoeyBjdXJyZW50VmFsdWUsIGZpcnN0Q2hhbmdlIH0pID0+IHtcbiAgICAgICAgZmllbGQuX2hpZGUgPSBjdXJyZW50VmFsdWU7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UgfHwgKGZpcnN0Q2hhbmdlICYmIGN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBmaWVsZC5vcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjay5wdXNoKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXZhbEV4cHJlc3Npb24ocHJvcDogc3RyaW5nLCBleHByZXNzaW9uLCBwYXJlbnRFeHByZXNzaW9uPykge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGV4cHJlc3Npb24gPSBldmFsU3RyaW5nRXhwcmVzc2lvbihleHByZXNzaW9uLCBbJ21vZGVsJywgJ2Zvcm1TdGF0ZScsICdmaWVsZCddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGV4cHJlc3Npb24gPSAoKSA9PiAhIWV4cHJlc3Npb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHBhcmVudEV4cHJlc3Npb24gJiYgcGFyZW50RXhwcmVzc2lvbigpKSB8fCBleHByZXNzaW9uKC4uLmFyZ3MpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9IGBbRm9ybWx5IEVycm9yXSBbRXhwcmVzc2lvbiBcIiR7cHJvcH1cIl0gJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9ldmFsRXhwcmVzc2lvblBhdGgoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHByb3A6IHN0cmluZykge1xuICAgIGlmIChmaWVsZC5fZXhwcmVzc2lvblByb3BlcnRpZXNbcHJvcF0gJiYgZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzW3Byb3BdLmV4cHJlc3Npb25QYXRocykge1xuICAgICAgcmV0dXJuIGZpZWxkLl9leHByZXNzaW9uUHJvcGVydGllc1twcm9wXS5leHByZXNzaW9uUGF0aHM7XG4gICAgfVxuXG4gICAgbGV0IHBhdGhzID0gW107XG4gICAgaWYgKHByb3AuaW5kZXhPZignWycpID09PSAtMSkge1xuICAgICAgcGF0aHMgPSBwcm9wLnNwbGl0KCcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BcbiAgICAgICAgLnNwbGl0KC9bW1xcXV17MSwyfS8pIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDE5ODIwNlxuICAgICAgICAuZmlsdGVyKHAgPT4gcClcbiAgICAgICAgLmZvckVhY2goKHBhdGggPT4ge1xuICAgICAgICAgIGNvbnN0IGFycmF5UGF0aCA9IHBhdGgubWF0Y2goL1snfFwiXSguKj8pWyd8XCJdLyk7XG4gICAgICAgICAgaWYgKGFycmF5UGF0aCkge1xuICAgICAgICAgICAgcGF0aHMucHVzaChhcnJheVBhdGhbMV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRocy5wdXNoKC4uLnBhdGguc3BsaXQoJy4nKS5maWx0ZXIocCA9PiBwKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLl9leHByZXNzaW9uUHJvcGVydGllc1twcm9wXSkge1xuICAgICAgZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzW3Byb3BdLmV4cHJlc3Npb25QYXRocyA9IHBhdGhzO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRocztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgaWdub3JlQ2FjaGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGZpZWxkQ2hhbmdlZCA9IHRoaXMuX2NoZWNrRmllbGQoZmllbGQsIGlnbm9yZUNhY2hlKTtcblxuICAgIGZpZWxkLm9wdGlvbnMuX2hpZGRlbkZpZWxkc0ZvckNoZWNrXG4gICAgICAuc29ydChmID0+IGYuaGlkZSA/IC0xIDogMSlcbiAgICAgIC5mb3JFYWNoKGYgPT4gdGhpcy50b2dnbGVGb3JtQ29udHJvbChmLCAhIWYuaGlkZSwgIWlnbm9yZUNhY2hlKSk7XG5cbiAgICBmaWVsZC5vcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjayA9IFtdO1xuICAgIGlmIChmaWVsZENoYW5nZWQpIHtcbiAgICAgIHRoaXMuY2hlY2tGaWVsZChmaWVsZCk7XG4gICAgICBpZiAoZmllbGQub3B0aW9ucyAmJiBmaWVsZC5vcHRpb25zLl9tYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgZmllbGQub3B0aW9ucy5fbWFya0ZvckNoZWNrKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja0ZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBpZ25vcmVDYWNoZSA9IGZhbHNlKSB7XG4gICAgbGV0IGZpZWxkQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGZpZWxkLmZpZWxkR3JvdXAuZm9yRWFjaChmID0+IHtcbiAgICAgIGlmICghZi5vcHRpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja0ZpZWxkRXhwcmVzc2lvbkNoYW5nZShmLCBpZ25vcmVDYWNoZSkgJiYgKGZpZWxkQ2hhbmdlZCA9IHRydWUpO1xuICAgICAgaWYgKHRoaXMuY2hlY2tGaWVsZFZpc2liaWxpdHlDaGFuZ2UoZiwgaWdub3JlQ2FjaGUpKSB7XG4gICAgICAgIGZpZWxkLm9wdGlvbnMuX2hpZGRlbkZpZWxkc0ZvckNoZWNrLnB1c2goZik7XG4gICAgICAgIGZpZWxkQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChmLmZpZWxkR3JvdXAgJiYgZi5maWVsZEdyb3VwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fY2hlY2tGaWVsZChmLCBpZ25vcmVDYWNoZSkgJiYgKGZpZWxkQ2hhbmdlZCA9IHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpZWxkQ2hhbmdlZDtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGaWVsZEV4cHJlc3Npb25DaGFuZ2UoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIGlnbm9yZUNhY2hlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFmaWVsZCB8fCAhZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IG1hcmtGb3JDaGVjayA9IGZhbHNlO1xuICAgIGNvbnN0IGV4cHJlc3Npb25Qcm9wZXJ0aWVzID0gZmllbGQuX2V4cHJlc3Npb25Qcm9wZXJ0aWVzO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgIGxldCBleHByZXNzaW9uVmFsdWUgPSBldmFsRXhwcmVzc2lvbihleHByZXNzaW9uUHJvcGVydGllc1trZXldLmV4cHJlc3Npb24sIHsgZmllbGQgfSwgW2ZpZWxkLm1vZGVsLCBmaWVsZC5vcHRpb25zLmZvcm1TdGF0ZSwgZmllbGQsIGlnbm9yZUNhY2hlXSk7XG4gICAgICBpZiAoa2V5ID09PSAndGVtcGxhdGVPcHRpb25zLmRpc2FibGVkJykge1xuICAgICAgICBleHByZXNzaW9uVmFsdWUgPSAhIWV4cHJlc3Npb25WYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpZ25vcmVDYWNoZSB8fCAoXG4gICAgICAgICAgZXhwcmVzc2lvblByb3BlcnRpZXNba2V5XS5leHByZXNzaW9uVmFsdWUgIT09IGV4cHJlc3Npb25WYWx1ZVxuICAgICAgICAgICYmIChcbiAgICAgICAgICAgICEoaXNPYmplY3QoZXhwcmVzc2lvblZhbHVlKSB8fCBpc0Z1bmN0aW9uKGV4cHJlc3Npb25WYWx1ZSkpXG4gICAgICAgICAgICB8fCAoXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24oZXhwcmVzc2lvblZhbHVlKVxuICAgICAgICAgICAgICAmJiAoJycgKyBleHByZXNzaW9uUHJvcGVydGllc1trZXldLmV4cHJlc3Npb25WYWx1ZSAhPT0gJycgKyBleHByZXNzaW9uVmFsdWUpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB8fCBpc09ic2VydmFibGUoZXhwcmVzc2lvblZhbHVlKVxuICAgICAgICAgICAgfHwgSlNPTi5zdHJpbmdpZnkoZXhwcmVzc2lvblZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkoZXhwcmVzc2lvblByb3BlcnRpZXNba2V5XS5leHByZXNzaW9uVmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgbWFya0ZvckNoZWNrID0gdHJ1ZTtcbiAgICAgICAgZXhwcmVzc2lvblByb3BlcnRpZXNba2V5XS5leHByZXNzaW9uVmFsdWUgPSBleHByZXNzaW9uVmFsdWU7XG4gICAgICAgIHRoaXMuc2V0RXhwclZhbHVlKGZpZWxkLCBrZXksIGV4cHJlc3Npb25WYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtGb3JDaGVjaztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGaWVsZFZpc2liaWxpdHlDaGFuZ2UoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIGlnbm9yZUNhY2hlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFmaWVsZCB8fCBpc051bGxPclVuZGVmaW5lZChmaWVsZC5oaWRlRXhwcmVzc2lvbikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBoaWRlRXhwcmVzc2lvblJlc3VsdDogYm9vbGVhbiA9ICEhZXZhbEV4cHJlc3Npb24oXG4gICAgICBmaWVsZC5oaWRlRXhwcmVzc2lvbixcbiAgICAgIHsgZmllbGQgfSxcbiAgICAgIFtmaWVsZC5tb2RlbCwgZmllbGQub3B0aW9ucy5mb3JtU3RhdGUsIGZpZWxkLCBpZ25vcmVDYWNoZV0sXG4gICAgKTtcbiAgICBsZXQgbWFya0ZvckNoZWNrID0gZmFsc2U7XG4gICAgaWYgKGhpZGVFeHByZXNzaW9uUmVzdWx0ICE9PSBmaWVsZC5oaWRlIHx8IGlnbm9yZUNhY2hlKSB7XG4gICAgICBtYXJrRm9yQ2hlY2sgPSB0cnVlO1xuICAgICAgLy8gdG9nZ2xlIGhpZGVcbiAgICAgIGZpZWxkLmhpZGUgPSBoaWRlRXhwcmVzc2lvblJlc3VsdDtcbiAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5oaWRkZW4gPSBoaWRlRXhwcmVzc2lvblJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya0ZvckNoZWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaXNhYmxlZFN0YXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cFxuICAgICAgICAuZmlsdGVyKGYgPT4gIWYuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwgIWYuZXhwcmVzc2lvblByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCcpKVxuICAgICAgICAuZm9yRWFjaChmID0+IHRoaXMuc2V0RGlzYWJsZWRTdGF0ZShmLCB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5rZXkgJiYgZmllbGQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkICE9PSB2YWx1ZSkge1xuICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVGb3JtQ29udHJvbChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgaGlkZTogYm9vbGVhbiwgcmVzZXRPbkhpZGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cFxuICAgICAgICAuZmlsdGVyKGYgPT4gIWYuaGlkZUV4cHJlc3Npb24pXG4gICAgICAgIC5mb3JFYWNoKGYgPT4gdGhpcy50b2dnbGVGb3JtQ29udHJvbChmLCBoaWRlLCByZXNldE9uSGlkZSkpO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5mb3JtQ29udHJvbCAmJiBmaWVsZC5rZXkpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3AoZmllbGQsICdfaGlkZScsICEhKGhpZGUgfHwgZmllbGQuaGlkZSkpO1xuICAgICAgY29uc3QgYyA9IGZpZWxkLmZvcm1Db250cm9sO1xuICAgICAgaWYgKGNbJ19maWVsZHMnXSAmJiBjWydfZmllbGRzJ10ubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVWYWxpZGl0eShjKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGUgPT09IHRydWUgJiYgKCFjWydfZmllbGRzJ10gfHwgY1snX2ZpZWxkcyddLmV2ZXJ5KGYgPT4gISFmLl9oaWRlKSkpIHtcbiAgICAgICAgdW5yZWdpc3RlckNvbnRyb2woZmllbGQsIHRydWUpO1xuICAgICAgICBpZiAocmVzZXRPbkhpZGUgJiYgZmllbGQucmVzZXRPbkhpZGUpIHtcbiAgICAgICAgICBmaWVsZC5mb3JtQ29udHJvbC5yZXNldCh7IHZhbHVlOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmaWVsZC5mb3JtQ29udHJvbC5kaXNhYmxlZCB9KTtcbiAgICAgICAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgICAgYXNzaWduRmllbGRWYWx1ZShmaWVsZCwgdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgaWYgKGZpZWxkLmZvcm1Db250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpZWxkLnJlc2V0T25IaWRlICYmIGZpZWxkLnBhcmVudCAmJiAhaXNVbmRlZmluZWQoZmllbGQuZGVmYXVsdFZhbHVlKSAmJiBpc1VuZGVmaW5lZChnZXRGaWVsZFZhbHVlKGZpZWxkKSkpIHtcbiAgICAgICAgICBhc3NpZ25GaWVsZFZhbHVlKGZpZWxkLCBmaWVsZC5kZWZhdWx0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyQ29udHJvbChmaWVsZCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgaWYgKGZpZWxkLnJlc2V0T25IaWRlICYmIGZpZWxkLmZpZWxkQXJyYXkgJiYgKGZpZWxkLmZpZWxkR3JvdXAgfHwgW10pLmxlbmd0aCAhPT0gKGZpZWxkLm1vZGVsIHx8IFtdKS5sZW5ndGgpIHtcbiAgICAgICAgICAoPGFueT4gZmllbGQub3B0aW9ucykuX2J1aWxkRm9ybSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZC5vcHRpb25zLmZpZWxkQ2hhbmdlcykge1xuICAgICAgZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXMubmV4dCg8Rm9ybWx5VmFsdWVDaGFuZ2VFdmVudD4geyBmaWVsZCwgdHlwZTogJ2hpZGRlbicsIHZhbHVlOiBoaWRlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RXhwclZhbHVlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBwcm9wOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHRhcmdldCA9IGZpZWxkO1xuICAgICAgY29uc3QgcGF0aHMgPSB0aGlzLl9ldmFsRXhwcmVzc2lvblBhdGgoZmllbGQsIHByb3ApO1xuICAgICAgY29uc3QgbGFzdEluZGV4ID0gcGF0aHMubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W3BhdGhzW2ldXTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0W3BhdGhzW2xhc3RJbmRleF1dID0gdmFsdWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBgW0Zvcm1seSBFcnJvcl0gW0V4cHJlc3Npb24gXCIke3Byb3B9XCJdICR7ZXJyb3IubWVzc2FnZX1gO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb3AgPT09ICd0ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQnICYmIGZpZWxkLmtleSkge1xuICAgICAgdGhpcy5zZXREaXNhYmxlZFN0YXRlKGZpZWxkLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHByb3AuaW5kZXhPZignbW9kZWwuJykgPT09IDApIHtcbiAgICAgIGNvbnN0IHBhdGggPSBwcm9wLnJlcGxhY2UoL15tb2RlbFxcLi8sICcnKSxcbiAgICAgICAgY29udHJvbCA9IGZpZWxkLmtleSAmJiBwcm9wID09PSBwYXRoID8gZmllbGQuZm9ybUNvbnRyb2wgOiBmaWVsZC5wYXJlbnQuZm9ybUNvbnRyb2wuZ2V0KHBhdGgpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnRyb2xcbiAgICAgICAgJiYgIShpc051bGxPclVuZGVmaW5lZChjb250cm9sLnZhbHVlKSAmJiBpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpXG4gICAgICAgICYmIGNvbnRyb2wudmFsdWUgIT09IHZhbHVlXG4gICAgICApIHtcbiAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmVtaXRFeHByZXNzaW9uQ2hhbmdlcyhmaWVsZCwgcHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RXhwcmVzc2lvbkNoYW5nZXMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIWZpZWxkLm9wdGlvbnMuZmllbGRDaGFuZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXMubmV4dCh7XG4gICAgICBmaWVsZDogZmllbGQsXG4gICAgICB0eXBlOiAnZXhwcmVzc2lvbkNoYW5nZXMnLFxuICAgICAgcHJvcGVydHksXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfVxufVxuIl19