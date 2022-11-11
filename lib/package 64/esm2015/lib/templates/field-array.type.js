/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Optional } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { clone, isNullOrUndefined, assignFieldValue } from '../utils';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FORMLY_CONFIG } from '../services/formly.config';
import { registerControl, unregisterControl, findControl } from '../extensions/field-form/utils';
import { Directive } from '@angular/core';
/**
 * @record
 */
export function FieldArrayTypeConfig() { }
if (false) {
    /** @type {?} */
    FieldArrayTypeConfig.prototype.formControl;
    /** @type {?} */
    FieldArrayTypeConfig.prototype.templateOptions;
    /** @type {?} */
    FieldArrayTypeConfig.prototype.options;
}
// TODO remove `selector` in V6
// tslint:disable-next-line
/**
 * @abstract
 * @template F
 */
export class FieldArrayType extends FieldType {
    /**
     * @param {?=} builder
     */
    constructor(builder) {
        super();
        this.defaultOptions = {
            defaultValue: [],
        };
        if (builder instanceof FormlyFormBuilder) {
            console.warn(`NgxFormly: passing 'FormlyFormBuilder' to '${this.constructor.name}' type is not required anymore, you may remove it!`);
        }
    }
    /**
     * @return {?}
     */
    get formControl() {
        return (/** @type {?} */ (this.field.formControl));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        if (!field.formControl && field.key) {
            /** @type {?} */
            const control = findControl(field);
            registerControl(field, control ? control : new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        /** @type {?} */
        const length = field.model ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (let i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i], true);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (let i = field.fieldGroup.length; i < length; i++) {
            /** @type {?} */
            const f = Object.assign({}, clone(field.fieldArray), { key: `${i}` });
            field.fieldGroup.push(f);
        }
    }
    /**
     * @param {?=} i
     * @param {?=} initialModel
     * @param {?=} __2
     * @return {?}
     */
    add(i, initialModel, { markAsDirty } = { markAsDirty: true }) {
        i = isNullOrUndefined(i) ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    }
    /**
     * @param {?} i
     * @param {?=} __1
     * @return {?}
     */
    remove(i, { markAsDirty } = { markAsDirty: true }) {
        this.model.splice(i, 1);
        unregisterControl(this.field.fieldGroup[i], true);
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((/**
         * @param {?} f
         * @param {?} key
         * @return {?}
         */
        (f, key) => f.key = `${key}`));
        this._build();
        markAsDirty && this.formControl.markAsDirty();
    }
    /**
     * @private
     * @return {?}
     */
    _build() {
        ((/** @type {?} */ (this.options)))._buildField(this.field);
        ((/** @type {?} */ (this.options)))._trackModelChanges(true);
    }
}
FieldArrayType.decorators = [
    { type: Directive, args: [{ selector: '[ɵfieldArray]' },] }
];
/** @nocollapse */
FieldArrayType.ctorParameters = () => [
    { type: FormlyFormBuilder, decorators: [{ type: Inject, args: [FORMLY_CONFIG,] }, { type: Optional }] }
];
if (false) {
    /** @type {?} */
    FieldArrayType.prototype.field;
    /** @type {?} */
    FieldArrayType.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtYXJyYXkudHlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGVtcGxhdGVzL2ZpZWxkLWFycmF5LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEUsT0FBTyxFQUFFLGFBQWEsRUFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFFMUMsMENBSUM7OztJQUhDLDJDQUF1Qjs7SUFDdkIsK0NBQW1FOztJQUNuRSx1Q0FBbUQ7Ozs7Ozs7O0FBTXJELE1BQU0sT0FBZ0IsY0FBZ0UsU0FBUSxTQUFjOzs7O0lBVTFHLFlBQStDLE9BQTJCO1FBQ3hFLEtBQUssRUFBRSxDQUFDO1FBVFYsbUJBQWMsR0FBUTtZQUNwQixZQUFZLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBU0EsSUFBSSxPQUFPLFlBQVksaUJBQWlCLEVBQUU7WUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDdkk7SUFDSCxDQUFDOzs7O0lBVkQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxtQkFBQSxJQUFJLENB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QUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFTyxNQUFNO1FBQ1osQ0FBQyxtQkFBTSxJQUFJLENBQUMsT0FBTyxFQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsbUJBQU0sSUFBSSxDQUFDLE9BQU8sRUFBQSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBbEVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Ozs7WUFkL0IsaUJBQWlCLHVCQXlCWCxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVE7Ozs7SUFUNUMsK0JBQVM7O0lBQ1Qsd0NBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkLnR5cGUnO1xuaW1wb3J0IHsgY2xvbmUsIGlzTnVsbE9yVW5kZWZpbmVkLCBhc3NpZ25GaWVsZFZhbHVlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybUJ1aWxkZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuZm9ybS5idWlsZGVyJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vY29tcG9uZW50cy9mb3JtbHkuZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZPUk1MWV9DT05GSUcsIEZvcm1seUV4dGVuc2lvbiB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb250cm9sLCB1bnJlZ2lzdGVyQ29udHJvbCwgZmluZENvbnRyb2wgfSBmcm9tICcuLi9leHRlbnNpb25zL2ZpZWxkLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRBcnJheVR5cGVDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gIGZvcm1Db250cm9sOiBGb3JtQXJyYXk7XG4gIHRlbXBsYXRlT3B0aW9uczogTm9uTnVsbGFibGU8Rm9ybWx5RmllbGRDb25maWdbJ3RlbXBsYXRlT3B0aW9ucyddPjtcbiAgb3B0aW9uczogTm9uTnVsbGFibGU8Rm9ybWx5RmllbGRDb25maWdbJ29wdGlvbnMnXT47XG59XG5cbi8vIFRPRE8gcmVtb3ZlIGBzZWxlY3RvcmAgaW4gVjZcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW8m1ZmllbGRBcnJheV0nIH0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRBcnJheVR5cGU8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnID0gRm9ybWx5RmllbGRDb25maWc+IGV4dGVuZHMgRmllbGRUeXBlPGFueT4gaW1wbGVtZW50cyBGb3JtbHlFeHRlbnNpb24ge1xuICBmaWVsZDogRjtcbiAgZGVmYXVsdE9wdGlvbnM6IGFueSA9IHtcbiAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICB9O1xuXG4gIGdldCBmb3JtQ29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZC5mb3JtQ29udHJvbCBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEZPUk1MWV9DT05GSUcpIEBPcHRpb25hbCgpIGJ1aWxkZXI/OiBGb3JtbHlGb3JtQnVpbGRlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoYnVpbGRlciBpbnN0YW5jZW9mIEZvcm1seUZvcm1CdWlsZGVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnRm9ybWx5Rm9ybUJ1aWxkZXInIHRvICcke3RoaXMuY29uc3RydWN0b3IubmFtZX0nIHR5cGUgaXMgbm90IHJlcXVpcmVkIGFueW1vcmUsIHlvdSBtYXkgcmVtb3ZlIGl0IWApO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gICAgaWYgKCFmaWVsZC5mb3JtQ29udHJvbCAmJiBmaWVsZC5rZXkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBmaW5kQ29udHJvbChmaWVsZCk7XG4gICAgICByZWdpc3RlckNvbnRyb2woZmllbGQsIGNvbnRyb2wgPyBjb250cm9sIDogbmV3IEZvcm1BcnJheShbXSwgeyB1cGRhdGVPbjogZmllbGQubW9kZWxPcHRpb25zLnVwZGF0ZU9uIH0pKTtcbiAgICB9XG5cbiAgICBmaWVsZC5maWVsZEdyb3VwID0gZmllbGQuZmllbGRHcm91cCB8fCBbXTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IGZpZWxkLm1vZGVsID8gZmllbGQubW9kZWwubGVuZ3RoIDogMDtcbiAgICBpZiAoZmllbGQuZmllbGRHcm91cC5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSBmaWVsZC5maWVsZEdyb3VwLmxlbmd0aCAtIDE7IGkgPj0gbGVuZ3RoOyAtLWkpIHtcbiAgICAgICAgdW5yZWdpc3RlckNvbnRyb2woZmllbGQuZmllbGRHcm91cFtpXSwgdHJ1ZSk7XG4gICAgICAgIGZpZWxkLmZpZWxkR3JvdXAuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBmaWVsZC5maWVsZEdyb3VwLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmID0geyAuLi5jbG9uZShmaWVsZC5maWVsZEFycmF5KSwga2V5OiBgJHtpfWAgfTtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChmKTtcbiAgICB9XG4gIH1cblxuICBhZGQoaT86IG51bWJlciwgaW5pdGlhbE1vZGVsPzogYW55LCB7IG1hcmtBc0RpcnR5IH0gPSB7IG1hcmtBc0RpcnR5OiB0cnVlIH0pIHtcbiAgICBpID0gaXNOdWxsT3JVbmRlZmluZWQoaSkgPyB0aGlzLmZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoIDogaTtcbiAgICBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgIGFzc2lnbkZpZWxkVmFsdWUodGhpcy5maWVsZCwgW10pO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWwuc3BsaWNlKGksIDAsIGluaXRpYWxNb2RlbCA/IGNsb25lKGluaXRpYWxNb2RlbCkgOiB1bmRlZmluZWQpO1xuXG4gICAgdGhpcy5fYnVpbGQoKTtcbiAgICBtYXJrQXNEaXJ0eSAmJiB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gIH1cblxuICByZW1vdmUoaTogbnVtYmVyLCB7IG1hcmtBc0RpcnR5IH0gPSB7IG1hcmtBc0RpcnR5OiB0cnVlIH0pIHtcbiAgICB0aGlzLm1vZGVsLnNwbGljZShpLCAxKTtcbiAgICB1bnJlZ2lzdGVyQ29udHJvbCh0aGlzLmZpZWxkLmZpZWxkR3JvdXBbaV0sIHRydWUpO1xuICAgIHRoaXMuZmllbGQuZmllbGRHcm91cC5zcGxpY2UoaSwgMSk7XG4gICAgdGhpcy5maWVsZC5maWVsZEdyb3VwLmZvckVhY2goKGYsIGtleSkgPT4gZi5rZXkgPSBgJHtrZXl9YCk7XG5cbiAgICB0aGlzLl9idWlsZCgpO1xuICAgIG1hcmtBc0RpcnR5ICYmIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkKCkge1xuICAgICg8YW55PiB0aGlzLm9wdGlvbnMpLl9idWlsZEZpZWxkKHRoaXMuZmllbGQpO1xuICAgICg8YW55PiB0aGlzLm9wdGlvbnMpLl90cmFja01vZGVsQ2hhbmdlcyh0cnVlKTtcbiAgfVxufVxuIl19