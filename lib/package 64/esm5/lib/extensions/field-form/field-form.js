/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getFieldValue, defineHiddenProp } from '../../utils';
import { registerControl, findControl, updateValidity } from './utils';
import { of } from 'rxjs';
/**
 * \@experimental
 */
var /**
 * \@experimental
 */
FieldFormExtension = /** @class */ (function () {
    function FieldFormExtension(config) {
        this.config = config;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.prePopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!this.root) {
            this.root = field;
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.onPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!field.parent) {
            return;
        }
        if (field.fieldGroup && !field.key) {
            defineHiddenProp(field, 'formControl', field.parent.formControl);
        }
        else {
            this.addFormControl(field);
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.postPopulate = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (this.root !== field) {
            return;
        }
        this.root = null;
        this.setValidators(field);
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FieldFormExtension.prototype.addFormControl = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var control = findControl(field);
        if (!control) {
            /** @type {?} */
            var controlOptions = { updateOn: field.modelOptions.updateOn };
            /** @type {?} */
            var value = field.key ? getFieldValue(field) : field.defaultValue;
            /** @type {?} */
            var ref = this.config ? this.config.resolveFieldTypeRef(field) : null;
            if (ref && ref.componentType && ref.componentType['createControl']) {
                /** @type {?} */
                var component = ref.componentType;
                console.warn("NgxFormly: '" + component.name + "::createControl' is deprecated since v5.0, use 'prePopulate' hook instead.");
                control = component['createControl'](value, field);
            }
            else if (field.fieldGroup) {
                // TODO: move to postPopulate
                control = new FormGroup({}, controlOptions);
            }
            else {
                control = new FormControl(value, controlOptions);
            }
        }
        registerControl(field, control);
    };
    /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    FieldFormExtension.prototype.setValidators = /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    function (field, disabled) {
        var _this = this;
        if (disabled === void 0) { disabled = false; }
        /** @type {?} */
        var markForCheck = false;
        if (disabled === false && field.key && field.templateOptions && field.templateOptions.disabled) {
            disabled = true;
        }
        (field.fieldGroup || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return _this.setValidators(f, disabled) && (markForCheck = true); }));
        if (field.key || !field.parent || (!field.key && !field.fieldGroup)) {
            var c_1 = field.formControl;
            field.templateOptions = field.templateOptions || {};
            if (field.key && c_1 && c_1 instanceof FormControl) {
                if (disabled && c_1.enabled) {
                    c_1.disable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
                if (!disabled && c_1.disabled) {
                    c_1.enable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
            }
            if (c_1 && (null === c_1.validator || null === c_1.asyncValidator)) {
                c_1.setValidators((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var v = Validators.compose(_this.mergeValidators(field, '_validators'));
                    return v ? v(c_1) : null;
                }));
                c_1.setAsyncValidators((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var v = Validators.composeAsync(_this.mergeValidators(field, '_asyncValidators'));
                    return v ? v(c_1) : of(null);
                }));
                markForCheck = true;
            }
            if (markForCheck) {
                updateValidity(c_1, true);
            }
        }
        return markForCheck;
    };
    /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    FieldFormExtension.prototype.mergeValidators = /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    function (field, type) {
        var _this = this;
        /** @type {?} */
        var validators = [];
        /** @type {?} */
        var c = field.formControl;
        if (c && c['_fields'] && c['_fields'].length > 1) {
            c['_fields']
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f._hide; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return validators.push.apply(validators, tslib_1.__spread(f[type])); }));
        }
        else if (field[type]) {
            validators.push.apply(validators, tslib_1.__spread(field[type]));
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return !f.key && f.fieldGroup; }))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return validators.push.apply(validators, tslib_1.__spread(_this.mergeValidators(f, type))); }));
        }
        return validators;
    };
    return FieldFormExtension;
}());
/**
 * \@experimental
 */
export { FieldFormExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FieldFormExtension.prototype.root;
    /**
     * @type {?}
     * @private
     */
    FieldFormExtension.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC1mb3JtL2ZpZWxkLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBMEIsVUFBVSxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFHMUI7Ozs7SUFFRSw0QkFBb0IsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUFJLENBQUM7Ozs7O0lBRTdDLHdDQUFXOzs7O0lBQVgsVUFBWSxLQUE2QjtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7SUFFRCx1Q0FBVTs7OztJQUFWLFVBQVcsS0FBNkI7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7OztJQUVELHlDQUFZOzs7O0lBQVosVUFBYSxLQUE2QjtRQUN4QyxJQUFJLElBQUksQ0FBQyxJ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b3JtbHlDb25maWcgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sT3B0aW9ucywgVmFsaWRhdG9ycywgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBnZXRGaWVsZFZhbHVlLCBkZWZpbmVIaWRkZW5Qcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb250cm9sLCBmaW5kQ29udHJvbCwgdXBkYXRlVmFsaWRpdHkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbi8qKiBAZXhwZXJpbWVudGFsICovXG5leHBvcnQgY2xhc3MgRmllbGRGb3JtRXh0ZW5zaW9uIGltcGxlbWVudHMgRm9ybWx5RXh0ZW5zaW9uIHtcbiAgcHJpdmF0ZSByb290OiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogRm9ybWx5Q29uZmlnKSB7IH1cblxuICBwcmVQb3B1bGF0ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICB0aGlzLnJvb3QgPSBmaWVsZDtcbiAgICB9XG4gIH1cblxuICBvblBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCFmaWVsZC5wYXJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCAmJiAhZmllbGQua2V5KSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKGZpZWxkLCAnZm9ybUNvbnRyb2wnLCBmaWVsZC5wYXJlbnQuZm9ybUNvbnRyb2wpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEZvcm1Db250cm9sKGZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBwb3N0UG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAodGhpcy5yb290ICE9PSBmaWVsZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgdGhpcy5zZXRWYWxpZGF0b3JzKGZpZWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRm9ybUNvbnRyb2woZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBsZXQgY29udHJvbCA9IGZpbmRDb250cm9sKGZpZWxkKTtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xPcHRpb25zOiBBYnN0cmFjdENvbnRyb2xPcHRpb25zID0geyB1cGRhdGVPbjogZmllbGQubW9kZWxPcHRpb25zLnVwZGF0ZU9uIH07XG4gICAgICBjb25zdCB2YWx1ZSA9IGZpZWxkLmtleSA/IGdldEZpZWxkVmFsdWUoZmllbGQpIDogZmllbGQuZGVmYXVsdFZhbHVlO1xuXG4gICAgICBjb25zdCByZWYgPSB0aGlzLmNvbmZpZyA/IHRoaXMuY29uZmlnLnJlc29sdmVGaWVsZFR5cGVSZWYoZmllbGQpIDogbnVsbDtcbiAgICAgIGlmIChyZWYgJiYgcmVmLmNvbXBvbmVudFR5cGUgJiYgcmVmLmNvbXBvbmVudFR5cGVbJ2NyZWF0ZUNvbnRyb2wnXSkge1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSByZWYuY29tcG9uZW50VHlwZTtcbiAgICAgICAgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6ICcke2NvbXBvbmVudC5uYW1lfTo6Y3JlYXRlQ29udHJvbCcgaXMgZGVwcmVjYXRlZCBzaW5jZSB2NS4wLCB1c2UgJ3ByZVBvcHVsYXRlJyBob29rIGluc3RlYWQuYCk7XG4gICAgICAgIGNvbnRyb2wgPSBjb21wb25lbnRbJ2NyZWF0ZUNvbnRyb2wnXSh2YWx1ZSwgZmllbGQpO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgIC8vIFRPRE86IG1vdmUgdG8gcG9zdFBvcHVsYXRlXG4gICAgICAgIGNvbnRyb2wgPSBuZXcgRm9ybUdyb3VwKHt9LCBjb250cm9sT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKHZhbHVlLCBjb250cm9sT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJDb250cm9sKGZpZWxkLCBjb250cm9sKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsaWRhdG9ycyhmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgZGlzYWJsZWQgPSBmYWxzZSkge1xuICAgIGxldCBtYXJrRm9yQ2hlY2sgPSBmYWxzZTtcblxuICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UgJiYgZmllbGQua2V5ICYmIGZpZWxkLnRlbXBsYXRlT3B0aW9ucyAmJiBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAoZmllbGQuZmllbGRHcm91cCB8fCBbXSkuZm9yRWFjaChmID0+IHRoaXMuc2V0VmFsaWRhdG9ycyhmLCBkaXNhYmxlZCkgJiYgKG1hcmtGb3JDaGVjayA9IHRydWUpKTtcblxuICAgIGlmIChmaWVsZC5rZXkgfHwgIWZpZWxkLnBhcmVudCB8fCAoIWZpZWxkLmtleSAmJiAhZmllbGQuZmllbGRHcm91cCkpIHtcbiAgICAgIGNvbnN0IHsgZm9ybUNvbnRyb2w6IGMgfSA9IGZpZWxkO1xuICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zID0gZmllbGQudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgaWYgKGZpZWxkLmtleSAmJiBjICYmIGMgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICBpZiAoZGlzYWJsZWQgJiYgYy5lbmFibGVkKSB7XG4gICAgICAgICAgYy5kaXNhYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgbWFya0ZvckNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGlzYWJsZWQgJiYgYy5kaXNhYmxlZCkge1xuICAgICAgICAgIGMuZW5hYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgbWFya0ZvckNoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIGlmIChjICYmIChudWxsID09PSBjLnZhbGlkYXRvciB8fCBudWxsID09PSBjLmFzeW5jVmFsaWRhdG9yKSkge1xuICAgICAgICBjLnNldFZhbGlkYXRvcnMoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHYgPSBWYWxpZGF0b3JzLmNvbXBvc2UodGhpcy5tZXJnZVZhbGlkYXRvcnM8VmFsaWRhdG9yRm4+KGZpZWxkLCAnX3ZhbGlkYXRvcnMnKSk7XG5cbiAgICAgICAgICByZXR1cm4gdiA/IHYoYykgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgYy5zZXRBc3luY1ZhbGlkYXRvcnMoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHYgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLm1lcmdlVmFsaWRhdG9yczxBc3luY1ZhbGlkYXRvckZuPihmaWVsZCwgJ19hc3luY1ZhbGlkYXRvcnMnKSk7XG5cbiAgICAgICAgICByZXR1cm4gdiA/IHYoYykgOiBvZihudWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFya0ZvckNoZWNrID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICB1cGRhdGVWYWxpZGl0eShjLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya0ZvckNoZWNrO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZVZhbGlkYXRvcnM8VD4oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHR5cGU6ICdfdmFsaWRhdG9ycycgfCAnX2FzeW5jVmFsaWRhdG9ycycpOiBUW10ge1xuICAgIGNvbnN0IHZhbGlkYXRvcnM6IGFueSA9IFtdO1xuICAgIGNvbnN0IGMgPSBmaWVsZC5mb3JtQ29udHJvbDtcbiAgICBpZiAoYyAmJiBjWydfZmllbGRzJ10gJiYgY1snX2ZpZWxkcyddLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNbJ19maWVsZHMnXVxuICAgICAgICAuZmlsdGVyKChmOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSA9PiAhZi5faGlkZSlcbiAgICAgICAgLmZvckVhY2goKGY6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpID0+IHZhbGlkYXRvcnMucHVzaCguLi5mW3R5cGVdKSk7XG4gICAgfSBlbHNlIGlmIChmaWVsZFt0eXBlXSkge1xuICAgICAgdmFsaWRhdG9ycy5wdXNoKC4uLmZpZWxkW3R5cGVdKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cFxuICAgICAgICAuZmlsdGVyKGYgPT4gIWYua2V5ICYmIGYuZmllbGRHcm91cClcbiAgICAgICAgLmZvckVhY2goZiA9PiB2YWxpZGF0b3JzLnB1c2goLi4udGhpcy5tZXJnZVZhbGlkYXRvcnMoZiwgdHlwZSkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgfVxufVxuIl19