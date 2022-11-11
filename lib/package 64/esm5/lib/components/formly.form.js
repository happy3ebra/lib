/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Optional, EventEmitter, Output, Attribute, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FormlyConfig } from '../services/formly.config';
import { assignFieldValue, isNullOrUndefined, wrapProperty, clone, defineHiddenProp, getKeyPath, isObject } from '../utils';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, take } from 'rxjs/operators';
import { clearControl } from '../extensions/field-form/utils';
var FormlyForm = /** @class */ (function () {
    function FormlyForm(formlyBuilder, formlyConfig, ngZone, 
    // tslint:disable-next-line
    immutable, parentFormGroup) {
        var _this = this;
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
        function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); }))).subscribe((/**
         * @return {?}
         */
        function () { return _this.ngZone.runGuarded((/**
         * @return {?}
         */
        function () {
            // runGuarded is used to keep the expression changes in-sync
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            _this.checkExpressionChange();
            _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
        })); }));
        if (immutable !== null) {
            console.warn("NgxFormly: passing 'immutable' attribute to 'formly-form' component is deprecated since v5.5, enable immutable mode through NgModule declaration instead.");
        }
        this.immutable = (immutable !== null) || !!formlyConfig.extras.immutable;
    }
    Object.defineProperty(FormlyForm.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._model) {
                this._model = {};
            }
            return this._model;
        },
        set: /**
         * @param {?} model
         * @return {?}
         */
        function (model) { this._model = this.immutable ? clone(model) : model; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields || []; },
        set: /**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { this._fields = this.immutable ? clone(fields) : fields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) { this._options = this.immutable ? clone(options) : options; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyForm.prototype, "content", {
        set: /**
         * @param {?} content
         * @return {?}
         */
        function (content) {
            if (content) {
                /** @type {?} */
                var hasContent = false;
                /** @type {?} */
                var node = content.nativeElement.nextSibling;
                while (node && !hasContent) {
                    if (node.nodeType === Node.ELEMENT_NODE
                        || node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== '') {
                        hasContent = true;
                    }
                    node = node.nextSibling;
                }
                if (hasContent) {
                    console.warn("NgxFormly: content projection for 'formly-form' component is deprecated since v5.5, you should avoid passing content inside the 'formly-form' tag.");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormlyForm.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.formlyConfig.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyForm.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    FormlyForm.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modelChangeSub.unsubscribe();
        this.clearModelSubscriptions();
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    FormlyForm.prototype.changeModel = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var key = _a.key, value = _a.value, field = _a.field;
        assignFieldValue(field, value);
        this.modelChange$.next();
    };
    /**
     * @return {?}
     */
    FormlyForm.prototype.setOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.options) {
            this.options = {};
        }
        if (!this.options.resetModel) {
            this.options.resetModel = (/**
             * @param {?=} model
             * @return {?}
             */
            function (model) {
                model = clone(isNullOrUndefined(model) ? ((/** @type {?} */ (_this.options)))._initialModel : model);
                if (_this.model) {
                    Object.keys(_this.model).forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return delete _this.model[k]; }));
                    Object.assign(_this.model, model || {});
                }
                ((/** @type {?} */ (_this.options)))._buildForm();
                // we should call `NgForm::resetForm` to ensure changing `submitted` state after resetting form
                // but only when the current component is a root one.
                if (_this.options.parentForm && _this.options.parentForm.control === _this.form) {
                    _this.options.parentForm.resetForm(_this.model);
                }
                else {
                    _this.form.reset(_this.model);
                }
            });
        }
        if (!this.options.parentForm && this.parentFormGroup) {
            defineHiddenProp(this.options, 'parentForm', this.parentFormGroup);
            wrapProperty(this.options.parentForm, 'submitted', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange;
                if (!firstChange) {
                    _this.checkExpressionChange();
                    ((/** @type {?} */ (_this.options)))._markForCheck({
                        fieldGroup: _this.fields,
                        model: _this.model,
                        formControl: _this.form,
                        options: _this.options,
                    });
                }
            }));
        }
        if (!this.options.updateInitialValue) {
            this.options.updateInitialValue = (/**
             * @return {?}
             */
            function () { return ((/** @type {?} */ (_this.options)))._initialModel = clone(_this.model); });
        }
        if (!((/** @type {?} */ (this.options)))._buildForm) {
            ((/** @type {?} */ (this.options)))._buildForm = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            function (emitModelChange) {
                if (emitModelChange === void 0) { emitModelChange = false; }
                _this.clearModelSubscriptions();
                _this.formlyBuilder.buildForm(_this.form, _this.fields, _this.model, _this.options);
                _this.trackModelChanges(_this.fields);
                if (emitModelChange) {
                    _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
                }
            });
        }
        if (!((/** @type {?} */ (this.options)))._trackModelChanges) {
            ((/** @type {?} */ (this.options)))._trackModelChanges = (/**
             * @param {?=} emitModelChange
             * @return {?}
             */
            function (emitModelChange) {
                if (emitModelChange === void 0) { emitModelChange = false; }
                _this.clearModelSubscriptions();
                _this.trackModelChanges(_this.fields);
                if (emitModelChange) {
                    _this.modelChange.emit(_this._modelChangeValue = clone(_this.model));
                }
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    FormlyForm.prototype.checkExpressionChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.options && ((/** @type {?} */ (this.options)))._checkField) {
            ((/** @type {?} */ (this.options)))._checkField({
                fieldGroup: this.fields,
                model: this.model,
                formControl: this.form,
                options: this.options,
            });
        }
    };
    /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    FormlyForm.prototype.trackModelChanges = /**
     * @private
     * @param {?} fields
     * @param {?=} rootKey
     * @return {?}
     */
    function (fields, rootKey) {
        var _this = this;
        if (rootKey === void 0) { rootKey = []; }
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (field.key && !field.fieldGroup && field.formControl) {
                /** @type {?} */
                var control_1 = field.formControl;
                /** @type {?} */
                var valueChanges = control_1.valueChanges.pipe(distinctUntilChanged((/**
                 * @param {?} x
                 * @param {?} y
                 * @return {?}
                 */
                function (x, y) {
                    if (x !== y || Array.isArray(x) || isObject(x)) {
                        return false;
                    }
                    return true;
                })));
                var _a = field.modelOptions, updateOn = _a.updateOn, debounce = _a.debounce;
                if ((!updateOn || updateOn === 'change') && debounce && debounce.default > 0) {
                    valueChanges = control_1.valueChanges.pipe(debounceTime(debounce.default));
                }
                _this.modelChangeSubs.push(valueChanges.subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    // workaround for https://github.com/angular/angular/issues/13792
                    if (control_1 instanceof FormControl && control_1['_fields'] && control_1['_fields'].length > 1) {
                        control_1.patchValue(value, { emitEvent: false, onlySelf: true });
                    }
                    if (field.parsers && field.parsers.length > 0) {
                        field.parsers.forEach((/**
                         * @param {?} parserFn
                         * @return {?}
                         */
                        function (parserFn) { return value = parserFn(value); }));
                    }
                    _this.changeModel({ key: tslib_1.__spread(rootKey, getKeyPath(field)).join('.'), value: value, field: field });
                })));
                // workaround for v5 (https://github.com/ngx-formly/ngx-formly/issues/2061)
                /** @type {?} */
                var observers = control_1.valueChanges['observers'];
                if (observers && observers.length > 1) {
                    observers.unshift(observers.pop());
                }
            }
            if (field.fieldGroup && field.fieldGroup.length > 0) {
                _this.trackModelChanges(field.fieldGroup, field.key ? tslib_1.__spread(rootKey, getKeyPath(field)) : rootKey);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FormlyForm.prototype.clearModelSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        this.modelChangeSubs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.modelChangeSubs = [];
    };
    Object.defineProperty(FormlyForm.prototype, "field", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.fields && this.fields[0] && this.fields[0].parent;
        },
        enumerable: true,
        configurable: true
    });
    FormlyForm.decorators = [
        { type: Component, args: [{
                    selector: 'formly-form',
                    template: "\n    <formly-field *ngFor=\"let field of fields\"\n      hide-deprecation\n      [form]=\"field.form\"\n      [options]=\"field.options\"\n      [model]=\"field.model\"\n      [field]=\"field\">\n    </formly-field>\n    <ng-container #content>\n      <ng-content></ng-content>\n    </ng-container>\n  ",
                    providers: [FormlyFormBuilder]
                }] }
    ];
    /** @nocollapse */
    FormlyForm.ctorParameters = function () { return [
        { type: FormlyFormBuilder },
        { type: FormlyConfig },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Attribute, args: ['immutable',] }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] }
    ]; };
    FormlyForm.propDecorators = {
        form: [{ type: Input }],
        model: [{ type: Input }],
        fields: [{ type: Input }],
        options: [{ type: Input }],
        modelChange: [{ type: Output }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return FormlyForm;
}());
export { FormlyForm };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFzQixLQUFLLEVBQWlCLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SyxPQUFPLEVBQUUsU0FBUyxFQUFhLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVILE9BQU8sRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RDtJQTJFRSxvQkFDVSxhQUFnQyxFQUNoQyxZQUEwQixFQUMxQixNQUFjO0lBQ3RCLDJCQUEyQjtJQUNILFNBQVMsRUFDYixlQUFtQztRQU56RCxpQkFhQztRQVpTLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBR0Ysb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBNUMvQyxnQkFB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QUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7O2dCQWhRRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxpVEFXVDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0I7Ozs7Z0JBdEJRLGlCQUFpQjtnQkFDakIsWUFBWTtnQkFKc0gsTUFBTTtnREEwRjVJLFNBQVMsU0FBQyxXQUFXO2dCQXpGSyxrQkFBa0IsdUJBMEY1QyxRQUFROzs7dUJBaEVWLEtBQUs7d0JBRUwsS0FBSzt5QkFVTCxLQUFLOzBCQUlMLEtBQUs7OEJBSUwsTUFBTTswQkFDTixTQUFTLFNBQUMsU0FBUzs7SUEyTnRCLGlCQUFDO0NBQUEsQUFqUUQsSUFpUUM7U0FqUFksVUFBVTs7O0lBQ3JCLDBCQUFxQzs7SUFvQnJDLGlDQUFnRDs7Ozs7SUFzQmhELCtCQUEwQjs7Ozs7SUFDMUIsNEJBQW9COzs7OztJQUNwQix1Q0FBb0M7Ozs7O0lBQ3BDLDZCQUFxQzs7Ozs7SUFDckMsOEJBQW9DOzs7OztJQUNwQyxxQ0FBNkM7Ozs7O0lBQzdDLGtDQUEyQzs7Ozs7SUFDM0Msb0NBT0k7Ozs7O0lBR0YsbUNBQXdDOzs7OztJQUN4QyxrQ0FBa0M7Ozs7O0lBQ2xDLDRCQUFzQjs7Ozs7SUFHdEIscUNBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEb0NoZWNrLCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBPcHRpb25hbCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE9uRGVzdHJveSwgQXR0cmlidXRlLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEZvcm1Hcm91cERpcmVjdGl2ZSwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5Rm9ybU9wdGlvbnMsIEZvcm1seUZvcm1PcHRpb25zQ2FjaGUgfSBmcm9tICcuL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybUJ1aWxkZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuZm9ybS5idWlsZGVyJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgYXNzaWduRmllbGRWYWx1ZSwgaXNOdWxsT3JVbmRlZmluZWQsIHdyYXBQcm9wZXJ0eSwgY2xvbmUsIGRlZmluZUhpZGRlblByb3AsIGdldEtleVBhdGgsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjbGVhckNvbnRyb2wgfSBmcm9tICcuLi9leHRlbnNpb25zL2ZpZWxkLWZvcm0vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZm9ybScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGZvcm1seS1maWVsZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCJcbiAgICAgIGhpZGUtZGVwcmVjYXRpb25cbiAgICAgIFtmb3JtXT1cImZpZWxkLmZvcm1cIlxuICAgICAgW29wdGlvbnNdPVwiZmllbGQub3B0aW9uc1wiXG4gICAgICBbbW9kZWxdPVwiZmllbGQubW9kZWxcIlxuICAgICAgW2ZpZWxkXT1cImZpZWxkXCI+XG4gICAgPC9mb3JtbHktZmllbGQ+XG4gICAgPG5nLWNvbnRhaW5lciAjY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbRm9ybWx5Rm9ybUJ1aWxkZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGb3JtIGltcGxlbWVudHMgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXk7XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGVsKG1vZGVsOiBhbnkpIHsgdGhpcy5fbW9kZWwgPSB0aGlzLmltbXV0YWJsZSA/IGNsb25lKG1vZGVsKSA6IG1vZGVsOyB9XG4gIGdldCBtb2RlbCgpIHtcbiAgICBpZiAoIXRoaXMuX21vZGVsKSB7XG4gICAgICB0aGlzLl9tb2RlbCA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWVsZHMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKSB7IHRoaXMuX2ZpZWxkcyA9IHRoaXMuaW1tdXRhYmxlID8gY2xvbmUoZmllbGRzKSA6IGZpZWxkczsgfVxuICBnZXQgZmllbGRzKCkgeyByZXR1cm4gdGhpcy5fZmllbGRzIHx8IFtdOyB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogRm9ybWx5Rm9ybU9wdGlvbnMpIHsgdGhpcy5fb3B0aW9ucyA9IHRoaXMuaW1tdXRhYmxlID8gY2xvbmUob3B0aW9ucykgOiBvcHRpb25zOyB9XG4gIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxuXG4gIEBPdXRwdXQoKSBtb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkKCdjb250ZW50Jykgc2V0IGNvbnRlbnQoY29udGVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgbGV0IGhhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICAgIGxldCBub2RlID0gY29udGVudC5uYXRpdmVFbGVtZW50Lm5leHRTaWJsaW5nO1xuICAgICAgd2hpbGUgKG5vZGUgJiYgIWhhc0NvbnRlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgICAgICAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgJiYgbm9kZS50ZXh0Q29udGVudCAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSAhPT0gJydcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0NvbnRlbnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IGNvbnRlbnQgcHJvamVjdGlvbiBmb3IgJ2Zvcm1seS1mb3JtJyBjb21wb25lbnQgaXMgZGVwcmVjYXRlZCBzaW5jZSB2NS41LCB5b3Ugc2hvdWxkIGF2b2lkIHBhc3NpbmcgY29udGVudCBpbnNpZGUgdGhlICdmb3JtbHktZm9ybScgdGFnLmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW1tdXRhYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgX21vZGVsOiBhbnk7XG4gIHByaXZhdGUgX21vZGVsQ2hhbmdlVmFsdWU6IGFueSA9IHt9O1xuICBwcml2YXRlIF9maWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW107XG4gIHByaXZhdGUgX29wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zO1xuICBwcml2YXRlIG1vZGVsQ2hhbmdlU3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBtb2RlbENoYW5nZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1vZGVsQ2hhbmdlU3ViID0gdGhpcy5tb2RlbENoYW5nZSQucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKSksXG4gICkuc3Vic2NyaWJlKCgpID0+IHRoaXMubmdab25lLnJ1bkd1YXJkZWQoKCkgPT4ge1xuICAgIC8vIHJ1bkd1YXJkZWQgaXMgdXNlZCB0byBrZWVwIHRoZSBleHByZXNzaW9uIGNoYW5nZXMgaW4tc3luY1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3gtZm9ybWx5L25neC1mb3JtbHkvaXNzdWVzLzIwOTVcbiAgICB0aGlzLmNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpO1xuICAgIHRoaXMubW9kZWxDaGFuZ2UuZW1pdCh0aGlzLl9tb2RlbENoYW5nZVZhbHVlID0gY2xvbmUodGhpcy5tb2RlbCkpO1xuICB9KSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtbHlCdWlsZGVyOiBGb3JtbHlGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgQEF0dHJpYnV0ZSgnaW1tdXRhYmxlJykgaW1tdXRhYmxlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICkge1xuICAgIGlmIChpbW11dGFibGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdpbW11dGFibGUnIGF0dHJpYnV0ZSB0byAnZm9ybWx5LWZvcm0nIGNvbXBvbmVudCBpcyBkZXByZWNhdGVkIHNpbmNlIHY1LjUsIGVuYWJsZSBpbW11dGFibGUgbW9kZSB0aHJvdWdoIE5nTW9kdWxlIGRlY2xhcmF0aW9uIGluc3RlYWQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5pbW11dGFibGUgPSAoaW1tdXRhYmxlICE9PSBudWxsKSB8fCAhIWZvcm1seUNvbmZpZy5leHRyYXMuaW1tdXRhYmxlO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmZvcm1seUNvbmZpZy5leHRyYXMuY2hlY2tFeHByZXNzaW9uT24gPT09ICdjaGFuZ2VEZXRlY3Rpb25DaGVjaycpIHtcbiAgICAgIHRoaXMuY2hlY2tFeHByZXNzaW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3gtZm9ybWx5L25neC1mb3JtbHkvaXNzdWVzLzIyOTRcbiAgICBpZiAoY2hhbmdlcy5tb2RlbCAmJiB0aGlzLmZpZWxkKSB7XG4gICAgICB0aGlzLmZpZWxkLm1vZGVsID0gdGhpcy5tb2RlbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5maWVsZHMgJiYgdGhpcy5mb3JtKSB7XG4gICAgICBjbGVhckNvbnRyb2wodGhpcy5mb3JtKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5maWVsZHMgfHwgY2hhbmdlcy5mb3JtIHx8IChjaGFuZ2VzLm1vZGVsICYmIHRoaXMuX21vZGVsQ2hhbmdlVmFsdWUgIT09IGNoYW5nZXMubW9kZWwuY3VycmVudFZhbHVlKSkge1xuICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtIHx8IChuZXcgRm9ybUdyb3VwKHt9KSk7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgIHRoaXMub3B0aW9ucy51cGRhdGVJbml0aWFsVmFsdWUoKTtcbiAgICAgIHRoaXMuY2xlYXJNb2RlbFN1YnNjcmlwdGlvbnMoKTtcbiAgICAgIHRoaXMuZm9ybWx5QnVpbGRlci5idWlsZEZvcm0odGhpcy5mb3JtLCB0aGlzLmZpZWxkcywgdGhpcy5tb2RlbCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMudHJhY2tNb2RlbENoYW5nZXModGhpcy5maWVsZHMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubW9kZWxDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFyTW9kZWxTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICBjaGFuZ2VNb2RlbCh7IGtleSwgdmFsdWUsIGZpZWxkIH06IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyB9KSB7XG4gICAgYXNzaWduRmllbGRWYWx1ZShmaWVsZCwgdmFsdWUpO1xuICAgIHRoaXMubW9kZWxDaGFuZ2UkLm5leHQoKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlc2V0TW9kZWwpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXNldE1vZGVsID0gKG1vZGVsID86IGFueSkgPT4ge1xuICAgICAgICBtb2RlbCA9IGNsb25lKGlzTnVsbE9yVW5kZWZpbmVkKG1vZGVsKSA/ICg8Rm9ybWx5Rm9ybU9wdGlvbnNDYWNoZT4gdGhpcy5vcHRpb25zKS5faW5pdGlhbE1vZGVsIDogbW9kZWwpO1xuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubW9kZWwpLmZvckVhY2goayA9PiBkZWxldGUgdGhpcy5tb2RlbFtrXSk7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZGVsLCBtb2RlbCB8fCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICAoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2J1aWxkRm9ybSgpO1xuXG4gICAgICAgIC8vIHdlIHNob3VsZCBjYWxsIGBOZ0Zvcm06OnJlc2V0Rm9ybWAgdG8gZW5zdXJlIGNoYW5naW5nIGBzdWJtaXR0ZWRgIHN0YXRlIGFmdGVyIHJlc2V0dGluZyBmb3JtXG4gICAgICAgIC8vIGJ1dCBvbmx5IHdoZW4gdGhlIGN1cnJlbnQgY29tcG9uZW50IGlzIGEgcm9vdCBvbmUuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50Rm9ybSAmJiB0aGlzLm9wdGlvbnMucGFyZW50Rm9ybS5jb250cm9sID09PSB0aGlzLmZvcm0pIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMucGFyZW50Rm9ybS5yZXNldEZvcm0odGhpcy5tb2RlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5mb3JtLnJlc2V0KHRoaXMubW9kZWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLnBhcmVudEZvcm0gJiYgdGhpcy5wYXJlbnRGb3JtR3JvdXApIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3AodGhpcy5vcHRpb25zLCAncGFyZW50Rm9ybScsIHRoaXMucGFyZW50Rm9ybUdyb3VwKTtcbiAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLm9wdGlvbnMucGFyZW50Rm9ybSwgJ3N1Ym1pdHRlZCcsICh7IGZpcnN0Q2hhbmdlIH0pID0+IHtcbiAgICAgICAgaWYgKCFmaXJzdENoYW5nZSkge1xuICAgICAgICAgIHRoaXMuY2hlY2tFeHByZXNzaW9uQ2hhbmdlKCk7XG4gICAgICAgICAgKDxGb3JtbHlGb3JtT3B0aW9uc0NhY2hlPiB0aGlzLm9wdGlvbnMpLl9tYXJrRm9yQ2hlY2soe1xuICAgICAgICAgICAgZmllbGRHcm91cDogdGhpcy5maWVsZHMsXG4gICAgICAgICAgICBtb2RlbDogdGhpcy5tb2RlbCxcbiAgICAgICAgICAgIGZvcm1Db250cm9sOiB0aGlzLmZvcm0sXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLnVwZGF0ZUluaXRpYWxWYWx1ZSkge1xuICAgICAgdGhpcy5vcHRpb25zLnVwZGF0ZUluaXRpYWxWYWx1ZSA9ICgpID0+ICg8Rm9ybWx5Rm9ybU9wdGlvbnNDYWNoZT4gdGhpcy5vcHRpb25zKS5faW5pdGlhbE1vZGVsID0gY2xvbmUodGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgaWYgKCEoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2J1aWxkRm9ybSkge1xuICAgICAgKDxGb3JtbHlGb3JtT3B0aW9uc0NhY2hlPiB0aGlzLm9wdGlvbnMpLl9idWlsZEZvcm0gPSAoZW1pdE1vZGVsQ2hhbmdlID0gZmFsc2UpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhck1vZGVsU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmZvcm1seUJ1aWxkZXIuYnVpbGRGb3JtKHRoaXMuZm9ybSwgdGhpcy5maWVsZHMsIHRoaXMubW9kZWwsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHJhY2tNb2RlbENoYW5nZXModGhpcy5maWVsZHMpO1xuXG4gICAgICAgIGlmIChlbWl0TW9kZWxDaGFuZ2UpIHtcbiAgICAgICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodGhpcy5fbW9kZWxDaGFuZ2VWYWx1ZSA9IGNsb25lKHRoaXMubW9kZWwpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoISg8YW55PiB0aGlzLm9wdGlvbnMpLl90cmFja01vZGVsQ2hhbmdlcykge1xuICAgICAgKHRoaXMub3B0aW9ucyBhcyBhbnkpLl90cmFja01vZGVsQ2hhbmdlcyA9IChlbWl0TW9kZWxDaGFuZ2UgPSBmYWxzZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyTW9kZWxTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMudHJhY2tNb2RlbENoYW5nZXModGhpcy5maWVsZHMpO1xuICAgICAgICBpZiAoZW1pdE1vZGVsQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbENoYW5nZS5lbWl0KHRoaXMuX21vZGVsQ2hhbmdlVmFsdWUgPSBjbG9uZSh0aGlzLm1vZGVsKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0V4cHJlc3Npb25DaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiAoPEZvcm1seUZvcm1PcHRpb25zQ2FjaGU+IHRoaXMub3B0aW9ucykuX2NoZWNrRmllbGQpIHtcbiAgICAgICg8Rm9ybWx5Rm9ybU9wdGlvbnNDYWNoZT4gdGhpcy5vcHRpb25zKS5fY2hlY2tGaWVsZCh7XG4gICAgICAgIGZpZWxkR3JvdXA6IHRoaXMuZmllbGRzLFxuICAgICAgICBtb2RlbDogdGhpcy5tb2RlbCxcbiAgICAgICAgZm9ybUNvbnRyb2w6IHRoaXMuZm9ybSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFja01vZGVsQ2hhbmdlcyhmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10sIHJvb3RLZXk6IHN0cmluZ1tdID0gW10pIHtcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQua2V5ICYmICFmaWVsZC5maWVsZEdyb3VwICYmIGZpZWxkLmZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBmaWVsZC5mb3JtQ29udHJvbDtcbiAgICAgICAgbGV0IHZhbHVlQ2hhbmdlcyA9IGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgICAgIGlmICh4ICE9PSB5IHx8IEFycmF5LmlzQXJyYXkoeCkgfHwgaXNPYmplY3QoeCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCB7IHVwZGF0ZU9uLCBkZWJvdW5jZSB9ID0gZmllbGQubW9kZWxPcHRpb25zO1xuICAgICAgICBpZiAoKCF1cGRhdGVPbiB8fCB1cGRhdGVPbiA9PT0gJ2NoYW5nZScpICYmIGRlYm91bmNlICYmIGRlYm91bmNlLmRlZmF1bHQgPiAwKSB7XG4gICAgICAgICAgdmFsdWVDaGFuZ2VzID0gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoZGVib3VuY2UuZGVmYXVsdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlbENoYW5nZVN1YnMucHVzaCh2YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEzNzkyXG4gICAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCAmJiBjb250cm9sWydfZmllbGRzJ10gJiYgY29udHJvbFsnX2ZpZWxkcyddLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmllbGQucGFyc2VycyAmJiBmaWVsZC5wYXJzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZpZWxkLnBhcnNlcnMuZm9yRWFjaChwYXJzZXJGbiA9PiB2YWx1ZSA9IHBhcnNlckZuKHZhbHVlKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jaGFuZ2VNb2RlbCh7IGtleTogWy4uLnJvb3RLZXksIC4uLmdldEtleVBhdGgoZmllbGQpXS5qb2luKCcuJyksIHZhbHVlLCBmaWVsZCB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIHdvcmthcm91bmQgZm9yIHY1IChodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8yMDYxKVxuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBjb250cm9sLnZhbHVlQ2hhbmdlc1snb2JzZXJ2ZXJzJ107XG4gICAgICAgIGlmIChvYnNlcnZlcnMgJiYgb2JzZXJ2ZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBvYnNlcnZlcnMudW5zaGlmdChvYnNlcnZlcnMucG9wKCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZC5maWVsZEdyb3VwICYmIGZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnRyYWNrTW9kZWxDaGFuZ2VzKGZpZWxkLmZpZWxkR3JvdXAsIGZpZWxkLmtleSA/IFsuLi5yb290S2V5LCAuLi5nZXRLZXlQYXRoKGZpZWxkKV0gOiByb290S2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJNb2RlbFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgdGhpcy5tb2RlbENoYW5nZVN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMubW9kZWxDaGFuZ2VTdWJzID0gW107XG4gIH1cblxuICBwcml2YXRlIGdldCBmaWVsZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkcyAmJiB0aGlzLmZpZWxkc1swXSAmJiB0aGlzLmZpZWxkc1swXS5wYXJlbnQ7XG4gIH1cbn1cbiJdfQ==