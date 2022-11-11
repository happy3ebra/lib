/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getFieldValue, defineHiddenProp } from '../../utils';
import { registerControl, findControl, updateValidity } from './utils';
import { of } from 'rxjs';
/**
 * \@experimental
 */
export class FieldFormExtension {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        if (!this.root) {
            this.root = field;
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.parent) {
            return;
        }
        if (field.fieldGroup && !field.key) {
            defineHiddenProp(field, 'formControl', field.parent.formControl);
        }
        else {
            this.addFormControl(field);
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        if (this.root !== field) {
            return;
        }
        this.root = null;
        this.setValidators(field);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    addFormControl(field) {
        /** @type {?} */
        let control = findControl(field);
        if (!control) {
            /** @type {?} */
            const controlOptions = { updateOn: field.modelOptions.updateOn };
            /** @type {?} */
            const value = field.key ? getFieldValue(field) : field.defaultValue;
            /** @type {?} */
            const ref = this.config ? this.config.resolveFieldTypeRef(field) : null;
            if (ref && ref.componentType && ref.componentType['createControl']) {
                /** @type {?} */
                const component = ref.componentType;
                console.warn(`NgxFormly: '${component.name}::createControl' is deprecated since v5.0, use 'prePopulate' hook instead.`);
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
    }
    /**
     * @private
     * @param {?} field
     * @param {?=} disabled
     * @return {?}
     */
    setValidators(field, disabled = false) {
        /** @type {?} */
        let markForCheck = false;
        if (disabled === false && field.key && field.templateOptions && field.templateOptions.disabled) {
            disabled = true;
        }
        (field.fieldGroup || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => this.setValidators(f, disabled) && (markForCheck = true)));
        if (field.key || !field.parent || (!field.key && !field.fieldGroup)) {
            const { formControl: c } = field;
            field.templateOptions = field.templateOptions || {};
            if (field.key && c && c instanceof FormControl) {
                if (disabled && c.enabled) {
                    c.disable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
                if (!disabled && c.disabled) {
                    c.enable({ emitEvent: false, onlySelf: true });
                    markForCheck = true;
                }
            }
            if (c && (null === c.validator || null === c.asyncValidator)) {
                c.setValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = Validators.compose(this.mergeValidators(field, '_validators'));
                    return v ? v(c) : null;
                }));
                c.setAsyncValidators((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const v = Validators.composeAsync(this.mergeValidators(field, '_asyncValidators'));
                    return v ? v(c) : of(null);
                }));
                markForCheck = true;
            }
            if (markForCheck) {
                updateValidity(c, true);
            }
        }
        return markForCheck;
    }
    /**
     * @private
     * @template T
     * @param {?} field
     * @param {?} type
     * @return {?}
     */
    mergeValidators(field, type) {
        /** @type {?} */
        const validators = [];
        /** @type {?} */
        const c = field.formControl;
        if (c && c['_fields'] && c['_fields'].length > 1) {
            c['_fields']
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f._hide))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => validators.push(...f[type])));
        }
        else if (field[type]) {
            validators.push(...field[type]);
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => !f.key && f.fieldGroup))
                .forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => validators.push(...this.mergeValidators(f, type))));
        }
        return validators;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9maWVsZC1mb3JtL2ZpZWxkLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUEwQixVQUFVLEVBQWlDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0gsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdkUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUcxQixNQUFNLE9BQU8sa0JBQWtCOzs7O0lBRTdCLFlBQW9CLE1BQW9CO1FBQXBCLFdBQU0sR0FBTixNQUFNLENBQWM7SUFBSSxDQUFDOzs7OztJQUU3QyxXQUFXLENBQUMsS0FBNkI7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQTZCO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDbEMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBNkI7UUFDeEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtB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LENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDVCxNQUFNOzs7O1lBQUMsQ0FBQyxDQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUM7aUJBQy9DLE9BQU87Ozs7WUFBQyxDQUFDLENBQXlCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDO1NBQ3hFO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3BCLEtBQUssQ0FBQyxVQUFVO2lCQUNiLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFDO2lCQUNuQyxPQUFPOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDO1NBQ3BFO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7Ozs7SUF2SEMsa0NBQXFDOzs7OztJQUN6QixvQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtbHlFeHRlbnNpb24sIEZvcm1seUNvbmZpZyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBWYWxpZGF0b3JzLCBWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGdldEZpZWxkVmFsdWUsIGRlZmluZUhpZGRlblByb3AgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyByZWdpc3RlckNvbnRyb2wsIGZpbmRDb250cm9sLCB1cGRhdGVWYWxpZGl0eSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcblxuLyoqIEBleHBlcmltZW50YWwgKi9cbmV4cG9ydCBjbGFzcyBGaWVsZEZvcm1FeHRlbnNpb24gaW1wbGVtZW50cyBGb3JtbHlFeHRlbnNpb24ge1xuICBwcml2YXRlIHJvb3Q6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGU7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBGb3JtbHlDb25maWcpIHsgfVxuXG4gIHByZVBvcHVsYXRlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCF0aGlzLnJvb3QpIHtcbiAgICAgIHRoaXMucm9vdCA9IGZpZWxkO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoIWZpZWxkLnBhcmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwICYmICFmaWVsZC5rZXkpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3AoZmllbGQsICdmb3JtQ29udHJvbCcsIGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRm9ybUNvbnRyb2woZmllbGQpO1xuICAgIH1cbiAgfVxuXG4gIHBvc3RQb3B1bGF0ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGlmICh0aGlzLnJvb3QgIT09IGZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yb290ID0gbnVsbDtcbiAgICB0aGlzLnNldFZhbGlkYXRvcnMoZmllbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRGb3JtQ29udHJvbChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGxldCBjb250cm9sID0gZmluZENvbnRyb2woZmllbGQpO1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgY29uc3QgY29udHJvbE9wdGlvbnM6IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgPSB7IHVwZGF0ZU9uOiBmaWVsZC5tb2RlbE9wdGlvbnMudXBkYXRlT24gfTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZmllbGQua2V5ID8gZ2V0RmllbGRWYWx1ZShmaWVsZCkgOiBmaWVsZC5kZWZhdWx0VmFsdWU7XG5cbiAgICAgIGNvbnN0IHJlZiA9IHRoaXMuY29uZmlnID8gdGhpcy5jb25maWcucmVzb2x2ZUZpZWxkVHlwZVJlZihmaWVsZCkgOiBudWxsO1xuICAgICAgaWYgKHJlZiAmJiByZWYuY29tcG9uZW50VHlwZSAmJiByZWYuY29tcG9uZW50VHlwZVsnY3JlYXRlQ29udHJvbCddKSB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHJlZi5jb21wb25lbnRUeXBlO1xuICAgICAgICBjb25zb2xlLndhcm4oYE5neEZvcm1seTogJyR7Y29tcG9uZW50Lm5hbWV9OjpjcmVhdGVDb250cm9sJyBpcyBkZXByZWNhdGVkIHNpbmNlIHY1LjAsIHVzZSAncHJlUG9wdWxhdGUnIGhvb2sgaW5zdGVhZC5gKTtcbiAgICAgICAgY29udHJvbCA9IGNvbXBvbmVudFsnY3JlYXRlQ29udHJvbCddKHZhbHVlLCBmaWVsZCk7XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgLy8gVE9ETzogbW92ZSB0byBwb3N0UG9wdWxhdGVcbiAgICAgICAgY29udHJvbCA9IG5ldyBGb3JtR3JvdXAoe30sIGNvbnRyb2xPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodmFsdWUsIGNvbnRyb2xPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlckNvbnRyb2woZmllbGQsIGNvbnRyb2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWxpZGF0b3JzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBkaXNhYmxlZCA9IGZhbHNlKSB7XG4gICAgbGV0IG1hcmtGb3JDaGVjayA9IGZhbHNlO1xuXG4gICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSAmJiBmaWVsZC5rZXkgJiYgZmllbGQudGVtcGxhdGVPcHRpb25zICYmIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIChmaWVsZC5maWVsZEdyb3VwIHx8IFtdKS5mb3JFYWNoKGYgPT4gdGhpcy5zZXRWYWxpZGF0b3JzKGYsIGRpc2FibGVkKSAmJiAobWFya0ZvckNoZWNrID0gdHJ1ZSkpO1xuXG4gICAgaWYgKGZpZWxkLmtleSB8fCAhZmllbGQucGFyZW50IHx8ICghZmllbGQua2V5ICYmICFmaWVsZC5maWVsZEdyb3VwKSkge1xuICAgICAgY29uc3QgeyBmb3JtQ29udHJvbDogYyB9ID0gZmllbGQ7XG4gICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMgPSBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMgfHwge307XG4gICAgICBpZiAoZmllbGQua2V5ICYmIGMgJiYgYyBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGlmIChkaXNhYmxlZCAmJiBjLmVuYWJsZWQpIHtcbiAgICAgICAgICBjLmRpc2FibGUoeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICBtYXJrRm9yQ2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBjLmRpc2FibGVkKSB7XG4gICAgICAgICAgYy5lbmFibGUoeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICBtYXJrRm9yQ2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgaWYgKGMgJiYgKG51bGwgPT09IGMudmFsaWRhdG9yIHx8IG51bGwgPT09IGMuYXN5bmNWYWxpZGF0b3IpKSB7XG4gICAgICAgIGMuc2V0VmFsaWRhdG9ycygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdiA9IFZhbGlkYXRvcnMuY29tcG9zZSh0aGlzLm1lcmdlVmFsaWRhdG9yczxWYWxpZGF0b3JGbj4oZmllbGQsICdfdmFsaWRhdG9ycycpKTtcblxuICAgICAgICAgIHJldHVybiB2ID8gdihjKSA6IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjLnNldEFzeW5jVmFsaWRhdG9ycygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdiA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKHRoaXMubWVyZ2VWYWxpZGF0b3JzPEFzeW5jVmFsaWRhdG9yRm4+KGZpZWxkLCAnX2FzeW5jVmFsaWRhdG9ycycpKTtcblxuICAgICAgICAgIHJldHVybiB2ID8gdihjKSA6IG9mKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtYXJrRm9yQ2hlY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHVwZGF0ZVZhbGlkaXR5KGMsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrRm9yQ2hlY2s7XG4gIH1cblxuICBwcml2YXRlIG1lcmdlVmFsaWRhdG9yczxUPihmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgdHlwZTogJ192YWxpZGF0b3JzJyB8ICdfYXN5bmNWYWxpZGF0b3JzJyk6IFRbXSB7XG4gICAgY29uc3QgdmFsaWRhdG9yczogYW55ID0gW107XG4gICAgY29uc3QgYyA9IGZpZWxkLmZvcm1Db250cm9sO1xuICAgIGlmIChjICYmIGNbJ19maWVsZHMnXSAmJiBjWydfZmllbGRzJ10ubGVuZ3RoID4gMSkge1xuICAgICAgY1snX2ZpZWxkcyddXG4gICAgICAgIC5maWx0ZXIoKGY6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpID0+ICFmLl9oaWRlKVxuICAgICAgICAuZm9yRWFjaCgoZjogRm9ybWx5RmllbGRDb25maWdDYWNoZSkgPT4gdmFsaWRhdG9ycy5wdXNoKC4uLmZbdHlwZV0pKTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkW3R5cGVdKSB7XG4gICAgICB2YWxpZGF0b3JzLnB1c2goLi4uZmllbGRbdHlwZV0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwXG4gICAgICAgIC5maWx0ZXIoZiA9PiAhZi5rZXkgJiYgZi5maWVsZEdyb3VwKVxuICAgICAgICAuZm9yRWFjaChmID0+IHZhbGlkYXRvcnMucHVzaCguLi50aGlzLm1lcmdlVmFsaWRhdG9ycyhmLCB0eXBlKSkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICB9XG59XG4iXX0=