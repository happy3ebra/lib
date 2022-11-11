/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, EventEmitter, Output, Attribute, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FormlyConfig } from '../services/formly.config';
import { assignFieldValue, isNullOrUndefined, wrapProperty, clone, defineHiddenProp, getKeyPath, isObject } from '../utils';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, take } from 'rxjs/operators';
import { clearControl } from '../extensions/field-form/utils';
export class FormlyForm {
    /**
     * @param {?} formlyBuilder
     * @param {?} formlyConfig
     * @param {?} ngZone
     * @param {?} immutable
     * @param {?} parentFormGroup
     */
    constructor(formlyBuilder, formlyConfig, ngZone, 
    // tslint:disable-next-line
    immutable, parentFormGroup) {
        this.formlyBuilder = formlyBuilder;
        this.formlyConfig = formlyConfig;
        this.ngZone = ngZone;
        this.parentFormGroup = parentFormGroup;
        this.modelChange = new EventEmitter();
        this.immutable = false;
        this._modelChangeValue = {};
        this.modelChangeSubs = [];
        this.modelChange$ = new Subject();
        this.modelChangeSub = this.modelChange$.pipe(switchMap((/**
         * @return {?}
         */
        () => this.ngZone.onStable.asObservable().pipe(take(1))))).subscribe((/**
         * @return {?}
         */
        () => this.ngZone.runGuarded((/**
         * @return {?}
         */
        () => {
            // runGuarded is used to keep the expression changes in-sync
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            this.modelChange.emit(this._modelChangeValue = clone(this.model));
        }))));
        if (immutable !== null) {
            console.warn(`NgxFormly: passing 'immutable' attribute to 'formly-form' component is deprecated since v5.5, enable immutable mode through NgModule declaration instead.`);
        }
        this.immutable = (immutable !== null) || !!formlyConfig.extras.immutable;
    }
    /**
     * @param {?} model
     * @return {?}
     */
    set model(model) { this._model = this.immutable ? clone(model) : model; }
    /**
     * @return {?}
     */
    get model() {
        if (!this._model) {
            this._model = {};
        }
        return this._model;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    set fields(fields) { this._fields = this.immutable ? clone(fields) : fields; }
    /**
     * @return {?}
     */
    get fields() { return this._fields || []; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) { this._options = this.immutable ? clone(options) : options; }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @param {?} content
     * @return {?}
     */
    set content(content) {
        if (content) {
            /** @type {?} */
            let hasContent = false;
            /** @type {?} */
            let node = content.nativeElement.nextSibling;
            while (node && !hasContent) {
                if (node.nodeType === Node.ELEMENT_NODE
                    || node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== '') {
                    hasContent = true;
                }
                node = node.nextSibling;
            }
            if (hasContent) {
                console.warn(`NgxFormly: content projection for 'formly-form' component is deprecated since v5.5, you should avoid passing content inside the 'formly-form' tag.`);
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.formlyConfig.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // https://github.com/ngx-formly/ngx-formly/issues/2294
        if (changes.model && this.field) {
            this.field.model = this.model;
        }
        if (changes.fields && this.form) {
            clearControl(this.form);
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.form = this.form || (new FormGroup({}));
            this.setOptions();
            this.options.updateInitialValue();
            this.clearModelSubscriptions();
            this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
            this.trackModelChanges(this.fields);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.modelChangeSub.unsubscribe();
        this.clearModelSubscriptions();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    changeModel({ key, value, field }) {
        assignFieldValue(field, value);
        this.modelChange$.next();
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.resetModel) {
            this.options.resetModel = (/**
             * @param {?=} model
             * @return {?}
             */
            (model) => {
                model = clone(isNullOrUndefined(model) ? ((/** @type {?} */ (this.options)))._initialModel : model);
                if (this.model) {
                    Object.keys(this.model).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    k => delete this.model[k]));
                    Object.assign(this.model, model || {});
                }
                ((/** @type {?} */ (this.options)))._buildForm();
                // we should call `NgForm::resetForm` to ensure changing `submitted` state after resetting form
                // but only when the current component is a root one.
                if (this.options.parentForm && this.options.parentForm.control === this.form) {
                    this.options.parentForm.resetForm(this.model);
                }
                else {
                    this.form.reset(this.model);
                }
            });
        }
        if (!this.options.parentForm && this.parentFormGroup) {
            defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
            wrapProperty(this.options.parentForm, 'submitted', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange }) => {
                if (!firstChange) {
                    this.checkExpressionChange();
                    ((/** @type {?} */ (this.options)))._markForCheck({
                        fieldGroup: this.fields,
                        model: this.model,
                        formControl: this.form,
                        options: this.options,
                    });
                }
            }));
        }
        if (!this.options.updateInitialValue) {
            this.options.updateInitialValue = (/**
             * @return {?}
             */
            () => ((/** @type {?} */ (this.options)))._initialModel = clone(this.model));
        }
        if (!((/** @type {?} */ (this.options)))._buildForm) {
            ((/** @type {?} */ (this.options)))._buildForm = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            (emitModelChange = false) => {
                this.clearModelSubscriptions();
                this.formlyBuilder.buildForm(this.form, this.fields, this.model, this.options);
                this.trackModelChanges(this.fields);
                if (emitModelChange) {
                    this.modelChange.emit(this._modelChangeValue = clone(this.model));
                }
            });
        }
        if (!((/** @type {?} */ (this.options)))._trackModelChanges) {
            ((/** @type {?} */ (this.options)))._trackModelChanges = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            (emitModelChange = false) => {
                this.clearModelSubscriptions();
                this.trackModelChanges(this.fields);
                if (emitModelChange) {
                    this.modelChange.emit(this._modelChangeValue = clone(this.model));
                }
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkExpressionChange() {
        if (this.options && ((/** @type {?} */ (this.options)))._checkField) {
            ((/** @type {?} */ (this.options)))._checkField({
                fieldGroup: this.fields,
                model: this.model,
                formControl: this.form,
                options: this.options,
            });
        }
    }
    /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    trackModelChanges(fields, rootKey = []) {
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            if (field.key && !field.fieldGroup && field.formControl) {
                /** @type {?} */
                const control = field.formControl;
                /** @type {?} */
                let valueChanges = control.valueChanges.pipe(distinctUntilChanged((/**
                 * @param {?} x
                 * @param {?} y
                 * @return {?}
                 */
                (x, y) => {
                    if (x !== y || Array.isArray(x) || isObject(x)) {
                        return false;
                    }
                    return true;
                })));
                const { updateOn, debounce } = field.modelOptions;
                if ((!updateOn || updateOn === 'change') && debounce && debounce.default > 0) {
                    valueChanges = control.valueChanges.pipe(debounceTime(debounce.default));
                }
                this.modelChangeSubs.push(valueChanges.subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => {
                    // workaround for https://github.com/angular/angular/issues/13792
                    if (control instanceof FormControl && control['_fields'] && control['_fields'].length > 1) {
                        control.patchValue(value, { emitEvent: false, onlySelf: true });
                    }
                    if (field.parsers && field.parsers.length > 0) {
                        field.parsers.forEach((/**
                         * @param {?} parserFn
                         * @return {?}
                         */
                        parserFn => value = parserFn(value)));
                    }
                    this.changeModel({ key: [...rootKey, ...getKeyPath(field)].join('.'), value, field });
                })));
                // workaround for v5 (https://github.com/ngx-formly/ngx-formly/issues/2061)
                /** @type {?} */
                const observers = control.valueChanges['observers'];
                if (observers && observers.length > 1) {
                    observers.unshift(observers.pop());
                }
            }
            if (field.fieldGroup && field.fieldGroup.length > 0) {
                this.trackModelChanges(field.fieldGroup, field.key ? [...rootKey, ...getKeyPath(field)] : rootKey);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    clearModelSubscriptions() {
        this.modelChangeSubs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.modelChangeSubs = [];
    }
    /**
     * @private
     * @return {?}
     */
    get field() {
        return this.fields && this.fields[0] && this.fields[0].parent;
    }
}
FormlyForm.decorators = [
    { type: Component, args: [{
                selector: 'formly-form',
                template: `
    <formly-field *ngFor="let field of fields"
      hide-deprecation
      [form]="field.form"
      [options]="field.options"
      [model]="field.model"
      [field]="field">
    </formly-field>
    <ng-container #content>
      <ng-content></ng-content>
    </ng-container>
  `,
                providers: [FormlyFormBuilder]
            }] }
];
/** @nocollapse */
FormlyForm.ctorParameters = () => [
    { type: FormlyFormBuilder },
    { type: FormlyConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Attribute, args: ['immutable',] }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] }
];
FormlyForm.propDecorators = {
    form: [{ type: Input }],
    model: [{ type: Input }],
    fields: [{ type: Input }],
    options: [{ type: Input }],
    modelChange: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content',] }]
};
if (false) {
    /** @type {?} */
    FormlyForm.prototype.form;
    /** @type {?} */
    FormlyForm.prototype.modelChange;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.immutable;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype._model;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype._modelChangeValue;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype._fields;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype._options;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.modelChangeSubs;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.modelChange$;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.modelChangeSub;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.formlyBuilder;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.formlyConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    FormlyForm.prototype.parentFormGroup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXNCLEtBQUssRUFBaUIsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWEsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pLLE9BQU8sRUFBRSxTQUFTLEVBQWEsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUgsT0FBTyxFQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBa0I5RCxNQUFNLE9BQU8sVUFBVTs7Ozs7Ozs7SUEyRHJCLFlBQ1UsYUFBZ0MsRUFDaEMsWUFBMEIsRUFDMUIsTUFBYztJQUN0QiwyQkFBMkI7SUFDSCxTQUFTLEVBQ2IsZUFBbUM7UUFML0Msa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHRixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7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QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDL0I7Ozs7WUF0QlEsaUJBQWlCO1lBQ2pCLFlBQVk7WUFKc0gsTUFBTTs0Q0EwRjVJLFNBQVMsU0FBQyxXQUFXO1lBekZLLGtCQUFrQix1QkEwRjVDLFFBQVE7OzttQkFoRVYsS0FBSztvQkFFTCxLQUFLO3FCQVVMLEtBQUs7c0JBSUwsS0FBSzswQkFJTCxNQUFNO3NCQUNOLFNBQVMsU0FBQyxTQUFTOzs7O0lBckJwQiwwQkFBcUM7O0lBb0JyQyxpQ0FBZ0Q7Ozs7O0lBc0JoRCwrQkFBMEI7Ozs7O0lBQzFCLDRCQUFvQjs7Ozs7SUFDcEIsdUNBQW9DOzs7OztJQUNwQyw2QkFBcUM7Ozs7O0lBQ3JDLDhCQUFvQzs7Ozs7SUFDcEMscUNBQTZDOzs7OztJQUM3QyxrQ0FBMkM7Ozs7O0lBQzNDLG9DQU9JOzs7OztJQUdGLG1DQUF3Qzs7Ozs7SUFDeEMsa0NBQWtDOzs7OztJQUNsQyw0QkFBc0I7Ozs7O0lBR3RCLHFDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRG9DaGVjaywgT25DaGFuZ2VzLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgT3B0aW9uYWwsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkRlc3Ryb3ksIEF0dHJpYnV0ZSwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5LCBGb3JtR3JvdXBEaXJlY3RpdmUsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZvcm1PcHRpb25zLCBGb3JtbHlGb3JtT3B0aW9uc0NhY2hlIH0gZnJvbSAnLi9mb3JtbHkuZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZvcm1CdWlsZGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybWx5LmZvcm0uYnVpbGRlcic7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IGFzc2lnbkZpZWxkVmFsdWUsIGlzTnVsbE9yVW5kZWZpbmVkLCB3cmFwUHJvcGVydHksIGNsb25lLCBkZWZpbmVIaWRkZW5Qcm9wLCBnZXRLZXlQYXRoLCBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2xlYXJDb250cm9sIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9maWVsZC1mb3JtL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtbHktZmllbGQgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpZWxkc1wiXG4gICAgICBoaWRlLWRlcHJlY2F0aW9uXG4gICAgICBbZm9ybV09XCJmaWVsZC5mb3JtXCJcbiAgICAgIFtvcHRpb25zXT1cImZpZWxkLm9wdGlvbnNcIlxuICAgICAgW21vZGVsXT1cImZpZWxkLm1vZGVsXCJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiPlxuICAgIDwvZm9ybWx5LWZpZWxkPlxuICAgIDxuZy1jb250YWluZXIgI2NvbnRlbnQ+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIHByb3ZpZGVyczogW0Zvcm1seUZvcm1CdWlsZGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Rm9ybSBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlbChtb2RlbDogYW55KSB7IHRoaXMuX21vZGVsID0gdGhpcy5pbW11dGFibGUgPyBjbG9uZShtb2RlbCkgOiBtb2RlbDsgfVxuICBnZXQgbW9kZWwoKSB7XG4gICAgaWYgKCF0aGlzLl9tb2RlbCkge1xuICAgICAgdGhpcy5fbW9kZWwgPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZmllbGRzKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSkgeyB0aGlzLl9maWVsZHMgPSB0aGlzLmltbXV0YWJsZSA/IGNsb25lKGZpZWxkcykgOiBmaWVsZHM7IH1cbiAgZ2V0IGZpZWxkcygpIHsgcmV0dXJuIHRoaXMuX2ZpZWxkcyB8fCBbXTsgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zKSB7IHRoaXMuX29wdGlvbnMgPSB0aGlzLmltbXV0YWJsZSA/IGNsb25lKG9wdGlvbnMpIDogb3B0aW9uczsgfVxuICBnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cblxuICBAT3V0cHV0KCkgbW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIHNldCBjb250ZW50KGNvbnRlbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgIGxldCBoYXNDb250ZW50ID0gZmFsc2U7XG4gICAgICBsZXQgbm9kZSA9IGNvbnRlbnQubmF0aXZlRWxlbWVudC5uZXh0U2libGluZztcbiAgICAgIHdoaWxlIChub2RlICYmICFoYXNDb250ZW50KSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERVxuICAgICAgICAgIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQgJiYgbm9kZS50ZXh0Q29udGVudC50cmltKCkgIT09ICcnXG4gICAgICAgICkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNDb250ZW50KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBjb250ZW50IHByb2plY3Rpb24gZm9yICdmb3JtbHktZm9ybScgY29tcG9uZW50IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjUuNSwgeW91IHNob3VsZCBhdm9pZCBwYXNzaW5nIGNvbnRlbnQgaW5zaWRlIHRoZSAnZm9ybWx5LWZvcm0nIHRhZy5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGltbXV0YWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIF9tb2RlbDogYW55O1xuICBwcml2YXRlIF9tb2RlbENoYW5nZVZhbHVlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdO1xuICBwcml2YXRlIF9vcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9ucztcbiAgcHJpdmF0ZSBtb2RlbENoYW5nZVN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgbW9kZWxDaGFuZ2UkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBtb2RlbENoYW5nZVN1YiA9IHRoaXMubW9kZWxDaGFuZ2UkLnBpcGUoXG4gICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkpLFxuICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLm5nWm9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICAvLyBydW5HdWFyZGVkIGlzIHVzZWQgdG8ga2VlcCB0aGUgZXhwcmVzc2lvbiBjaGFuZ2VzIGluLXN5bmNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8yMDk1XG4gICAgdGhpcy5jaGVja0V4cHJlc3Npb25DaGFuZ2UoKTtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodGhpcy5fbW9kZWxDaGFuZ2VWYWx1ZSA9IGNsb25lKHRoaXMubW9kZWwpKTtcbiAgfSkpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybWx5QnVpbGRlcjogRm9ybWx5Rm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZyxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBBdHRyaWJ1dGUoJ2ltbXV0YWJsZScpIGltbXV0YWJsZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICApIHtcbiAgICBpZiAoaW1tdXRhYmxlICE9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5neEZvcm1seTogcGFzc2luZyAnaW1tdXRhYmxlJyBhdHRyaWJ1dGUgdG8gJ2Zvcm1seS1mb3JtJyBjb21wb25lbnQgaXMgZGVwcmVjYXRlZCBzaW5jZSB2NS41LCBlbmFibGUgaW1tdXRhYmxlIG1vZGUgdGhyb3VnaCBOZ01vZHVsZSBkZWNsYXJhdGlvbiBpbnN0ZWFkLmApO1xuICAgIH1cblxuICAgIHRoaXMuaW1tdXRhYmxlID0gKGltbXV0YWJsZSAhPT0gbnVsbCkgfHwgISFmb3JtbHlDb25maWcuZXh0cmFzLmltbXV0YWJsZTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5mb3JtbHlDb25maWcuZXh0cmFzLmNoZWNrRXhwcmVzc2lvbk9uID09PSAnY2hhbmdlRGV0ZWN0aW9uQ2hlY2snKSB7XG4gICAgICB0aGlzLmNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8yMjk0XG4gICAgaWYgKGNoYW5nZXMubW9kZWwgJiYgdGhpcy5maWVsZCkge1xuICAgICAgdGhpcy5maWVsZC5tb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZmllbGRzICYmIHRoaXMuZm9ybSkge1xuICAgICAgY2xlYXJDb250cm9sKHRoaXMuZm9ybSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuZmllbGRzIHx8IGNoYW5nZXMuZm9ybSB8fCAoY2hhbmdlcy5tb2RlbCAmJiB0aGlzLl9tb2RlbENoYW5nZVZhbHVlICE9PSBjaGFuZ2VzLm1vZGVsLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybSB8fCAobmV3IEZvcm1Hcm91cCh7fSkpO1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLm9wdGlvbnMudXBkYXRlSW5pdGlhbFZhbHVlKCk7XG4gICAgICB0aGlzLmNsZWFyTW9kZWxTdWJzY3JpcHRpb25zKCk7XG4gICAgICB0aGlzLmZvcm1seUJ1aWxkZXIuYnVpbGRGb3JtKHRoaXMuZm9ybSwgdGhpcy5maWVsZHMsIHRoaXMubW9kZWwsIHRoaXMub3B0aW9ucyk7XG4gICAgICB0aGlzLnRyYWNrTW9kZWxDaGFuZ2VzKHRoaXMuZmllbGRzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhck1vZGVsU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgY2hhbmdlTW9kZWwoeyBrZXksIHZhbHVlLCBmaWVsZCB9OiB7IGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcgfSkge1xuICAgIGFzc2lnbkZpZWxkVmFsdWUoZmllbGQsIHZhbHVlKTtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlJC5uZXh0KCk7XG4gIH1cblxuICBzZXRPcHRpb25zKCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZXNldE1vZGVsKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmVzZXRNb2RlbCA9IChtb2RlbCA/OiBhbnkpID0+IHtcbiAgICAgICAgbW9kZWwgPSBjbG9uZShpc051bGxPclVuZGVmaW5lZChtb2RlbCkgPyAoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2luaXRpYWxNb2RlbCA6IG1vZGVsKTtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm1vZGVsKS5mb3JFYWNoKGsgPT4gZGVsZXRlIHRoaXMubW9kZWxba10pO1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tb2RlbCwgbW9kZWwgfHwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgKDxGb3JtbHlGb3JtT3B0aW9uc0NhY2hlPiB0aGlzLm9wdGlvbnMpLl9idWlsZEZvcm0oKTtcblxuICAgICAgICAvLyB3ZSBzaG91bGQgY2FsbCBgTmdGb3JtOjpyZXNldEZvcm1gIHRvIGVuc3VyZSBjaGFuZ2luZyBgc3VibWl0dGVkYCBzdGF0ZSBhZnRlciByZXNldHRpbmcgZm9ybVxuICAgICAgICAvLyBidXQgb25seSB3aGVuIHRoZSBjdXJyZW50IGNvbXBvbmVudCBpcyBhIHJvb3Qgb25lLlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudEZvcm0gJiYgdGhpcy5vcHRpb25zLnBhcmVudEZvcm0uY29udHJvbCA9PT0gdGhpcy5mb3JtKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnBhcmVudEZvcm0ucmVzZXRGb3JtKHRoaXMubW9kZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZm9ybS5yZXNldCh0aGlzLm1vZGVsKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5wYXJlbnRGb3JtICYmIHRoaXMucGFyZW50Rm9ybUdyb3VwKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKHRoaXMub3B0aW9ucywgJ3BhcmVudEZvcm0nLCB0aGlzLnBhcmVudEZvcm1Hcm91cCk7XG4gICAgICB3cmFwUHJvcGVydHkodGhpcy5vcHRpb25zLnBhcmVudEZvcm0sICdzdWJtaXR0ZWQnLCAoeyBmaXJzdENoYW5nZSB9KSA9PiB7XG4gICAgICAgIGlmICghZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpO1xuICAgICAgICAgICg8Rm9ybWx5Rm9ybU9wdGlvbnNDYWNoZT4gdGhpcy5vcHRpb25zKS5fbWFya0ZvckNoZWNrKHtcbiAgICAgICAgICAgIGZpZWxkR3JvdXA6IHRoaXMuZmllbGRzLFxuICAgICAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBmb3JtQ29udHJvbDogdGhpcy5mb3JtLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy51cGRhdGVJbml0aWFsVmFsdWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy51cGRhdGVJbml0aWFsVmFsdWUgPSAoKSA9PiAoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2luaXRpYWxNb2RlbCA9IGNsb25lKHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIGlmICghKDxGb3JtbHlGb3JtT3B0aW9uc0NhY2hlPiB0aGlzLm9wdGlvbnMpLl9idWlsZEZvcm0pIHtcbiAgICAgICg8Rm9ybWx5Rm9ybU9wdGlvbnNDYWNoZT4gdGhpcy5vcHRpb25zKS5fYnVpbGRGb3JtID0gKGVtaXRNb2RlbENoYW5nZSA9IGZhbHNlKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJNb2RlbFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgICAgdGhpcy5mb3JtbHlCdWlsZGVyLmJ1aWxkRm9ybSh0aGlzLmZvcm0sIHRoaXMuZmllbGRzLCB0aGlzLm1vZGVsLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnRyYWNrTW9kZWxDaGFuZ2VzKHRoaXMuZmllbGRzKTtcblxuICAgICAgICBpZiAoZW1pdE1vZGVsQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbENoYW5nZS5lbWl0KHRoaXMuX21vZGVsQ2hhbmdlVmFsdWUgPSBjbG9uZSh0aGlzLm1vZGVsKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCEoPGFueT4gdGhpcy5vcHRpb25zKS5fdHJhY2tNb2RlbENoYW5nZXMpIHtcbiAgICAgICh0aGlzLm9wdGlvbnMgYXMgYW55KS5fdHJhY2tNb2RlbENoYW5nZXMgPSAoZW1pdE1vZGVsQ2hhbmdlID0gZmFsc2UpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhck1vZGVsU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLnRyYWNrTW9kZWxDaGFuZ2VzKHRoaXMuZmllbGRzKTtcbiAgICAgICAgaWYgKGVtaXRNb2RlbENoYW5nZSkge1xuICAgICAgICAgIHRoaXMubW9kZWxDaGFuZ2UuZW1pdCh0aGlzLl9tb2RlbENoYW5nZVZhbHVlID0gY2xvbmUodGhpcy5tb2RlbCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tFeHByZXNzaW9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgKDxGb3JtbHlGb3JtT3B0aW9uc0NhY2hlPiB0aGlzLm9wdGlvbnMpLl9jaGVja0ZpZWxkKSB7XG4gICAgICAoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2NoZWNrRmllbGQoe1xuICAgICAgICBmaWVsZEdyb3VwOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICAgIGZvcm1Db250cm9sOiB0aGlzLmZvcm0sXG4gICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhY2tNb2RlbENoYW5nZXMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdLCByb290S2V5OiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgaWYgKGZpZWxkLmtleSAmJiAhZmllbGQuZmllbGRHcm91cCAmJiBmaWVsZC5mb3JtQ29udHJvbCkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gZmllbGQuZm9ybUNvbnRyb2w7XG4gICAgICAgIGxldCB2YWx1ZUNoYW5nZXMgPSBjb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgICBpZiAoeCAhPT0geSB8fCBBcnJheS5pc0FycmF5KHgpIHx8IGlzT2JqZWN0KHgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgeyB1cGRhdGVPbiwgZGVib3VuY2UgfSA9IGZpZWxkLm1vZGVsT3B0aW9ucztcbiAgICAgICAgaWYgKCghdXBkYXRlT24gfHwgdXBkYXRlT24gPT09ICdjaGFuZ2UnKSAmJiBkZWJvdW5jZSAmJiBkZWJvdW5jZS5kZWZhdWx0ID4gMCkge1xuICAgICAgICAgIHZhbHVlQ2hhbmdlcyA9IGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoZGVib3VuY2VUaW1lKGRlYm91bmNlLmRlZmF1bHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWxDaGFuZ2VTdWJzLnB1c2godmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMzc5MlxuICAgICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wgJiYgY29udHJvbFsnX2ZpZWxkcyddICYmIGNvbnRyb2xbJ19maWVsZHMnXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb250cm9sLnBhdGNoVmFsdWUodmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZpZWxkLnBhcnNlcnMgJiYgZmllbGQucGFyc2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmaWVsZC5wYXJzZXJzLmZvckVhY2gocGFyc2VyRm4gPT4gdmFsdWUgPSBwYXJzZXJGbih2YWx1ZSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2hhbmdlTW9kZWwoeyBrZXk6IFsuLi5yb290S2V5LCAuLi5nZXRLZXlQYXRoKGZpZWxkKV0uam9pbignLicpLCB2YWx1ZSwgZmllbGQgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciB2NSAoaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMjA2MSlcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gY29udHJvbC52YWx1ZUNoYW5nZXNbJ29ic2VydmVycyddO1xuICAgICAgICBpZiAob2JzZXJ2ZXJzICYmIG9ic2VydmVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgb2JzZXJ2ZXJzLnVuc2hpZnQob2JzZXJ2ZXJzLnBvcCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGQuZmllbGRHcm91cCAmJiBmaWVsZC5maWVsZEdyb3VwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy50cmFja01vZGVsQ2hhbmdlcyhmaWVsZC5maWVsZEdyb3VwLCBmaWVsZC5rZXkgPyBbLi4ucm9vdEtleSwgLi4uZ2V0S2V5UGF0aChmaWVsZCldIDogcm9vdEtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyTW9kZWxTdWJzY3JpcHRpb25zKCkge1xuICAgIHRoaXMubW9kZWxDaGFuZ2VTdWJzLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB0aGlzLm1vZGVsQ2hhbmdlU3VicyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZmllbGQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5maWVsZHMgJiYgdGhpcy5maWVsZHNbMF0gJiYgdGhpcy5maWVsZHNbMF0ucGFyZW50O1xuICB9XG59XG4iXX0=