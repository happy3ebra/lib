import { take } from 'rxjs/operators';
import { Component, ViewChild, NgZone, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldWrapper, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FormlyBootstrapAddonsModule } from '@ngx-formly/bootstrap/addons';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                indeterminate: true,
                hideLabel: true,
                formCheck: 'custom',
            },
        };
    }
}
FormlyFieldCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-checkbox',
                template: `
    <div [ngClass]="{
      'form-check': to.formCheck.indexOf('custom') === -1,
      'form-check-inline': to.formCheck === 'inline',
      'custom-control': to.formCheck.indexOf('custom') === 0,
      'custom-checkbox': to.formCheck === 'custom' || to.formCheck === 'custom-inline',
      'custom-control-inline': to.formCheck === 'custom-inline',
      'custom-switch': to.formCheck === 'custom-switch'
    }">
      <input type="checkbox"
        [class.is-invalid]="showError"
        [class.form-check-input]="to.formCheck.indexOf('custom') === -1"
        [class.position-static]="to.formCheck === 'nolabel'"
        [class.custom-control-input]="to.formCheck.indexOf('custom') === 0"
        [indeterminate]="to.indeterminate && formControl.value === null"
        [formControl]="formControl"
        [formlyAttributes]="field">
      <label [for]="id"
        *ngIf="to.formCheck !== 'nolabel'"
        [class.form-check-label]="to.formCheck.indexOf('custom') === -1"
        [class.custom-control-label]="to.formCheck.indexOf('custom') === 0"
      >
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
    </div>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldMultiCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                options: [],
                formCheck: 'custom',
            },
        };
    }
    /**
     * @param {?} value
     * @param {?} checked
     * @return {?}
     */
    onChange(value, checked) {
        this.formControl.markAsDirty();
        if (this.to.type === 'array') {
            this.formControl.patchValue(checked
                ? [...(this.formControl.value || []), value]
                : [...(this.formControl.value || [])].filter((/**
                 * @param {?} o
                 * @return {?}
                 */
                o => o !== value)));
        }
        else {
            this.formControl.patchValue(Object.assign({}, this.formControl.value, { [value]: checked }));
        }
        this.formControl.markAsTouched();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    isChecked(option) {
        /** @type {?} */
        const value = this.formControl.value;
        return value && (this.to.type === 'array'
            ? (value.indexOf(option.value) !== -1)
            : value[option.value]);
    }
}
FormlyFieldMultiCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-multicheckbox',
                template: `
    <div>
      <div *ngFor="let option of to.options | formlySelectOptions:field | async; let i = index;"
        [ngClass]="{
          'form-check': to.formCheck.indexOf('custom') === -1,
          'form-check-inline': to.formCheck === 'inline',
          'custom-control': to.formCheck.indexOf('custom') === 0,
          'custom-checkbox': to.formCheck === 'custom' || to.formCheck === 'custom-inline',
          'custom-control-inline': to.formCheck === 'custom-inline',
          'custom-switch': to.formCheck === 'custom-switch'
        }"
      >
        <input type="checkbox"
          [id]="id + '_' + i"
          [class.form-check-input]="to.formCheck.indexOf('custom') === -1"
          [class.custom-control-input]="to.formCheck.indexOf('custom') === 0"
          [value]="option.value"
          [checked]="isChecked(option)"
          [disabled]=" formControl.disabled || option.disabled"
          [formlyAttributes]="field"
          (change)="onChange(option.value, $event.target.checked)">
        <label
          [class.form-check-label]="to.formCheck.indexOf('custom') === -1"
          [class.custom-control-label]="to.formCheck.indexOf('custom') === 0"
          [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </div>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldInput extends FieldType {
    /**
     * @return {?}
     */
    get type() {
        return this.to.type || 'text';
    }
}
FormlyFieldInput.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-input',
                template: `
    <input *ngIf="type !== 'number' else numberTmp" [type]="type" [formControl]="formControl" class="form-control" [formlyAttributes]="field" [class.is-invalid]="showError">
    <ng-template #numberTmp>
      <input type="number" [formControl]="formControl" class="form-control" [formlyAttributes]="field" [class.is-invalid]="showError">
    </ng-template>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldRadio extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                options: [],
                formCheck: 'custom',
            },
        };
    }
}
FormlyFieldRadio.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-radio',
                template: `
    <div>
      <div *ngFor="let option of to.options | formlySelectOptions:field | async; let i = index;"
        [ngClass]="{
          'form-check': to.formCheck.indexOf('custom') === -1,
          'form-check-inline': to.formCheck === 'inline',
          'custom-control custom-radio': to.formCheck.indexOf('custom') === 0,
          'custom-control-inline': to.formCheck === 'custom-inline'
        }"
      >
        <input type="radio"
          [id]="id + '_' + i"
          [class.form-check-input]="to.formCheck.indexOf('custom') === -1"
          [class.custom-control-input]="to.formCheck.indexOf('custom') === 0"
          [name]="field.name || id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [attr.disabled]="option.disabled || formControl.disabled ? true : null">
        <label
          [class.form-check-label]="to.formCheck.indexOf('custom') === -1"
          [class.custom-control-label]="to.formCheck.indexOf('custom') === 0"
          [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </div>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldTextArea extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            templateOptions: {
                cols: 1,
                rows: 1,
            },
        };
    }
}
FormlyFieldTextArea.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-textarea',
                template: `
    <textarea [formControl]="formControl" [cols]="to.cols"
      [rows]="to.rows" class="form-control" [class.is-invalid]="showError"
      [formlyAttributes]="field">
    </textarea>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyFieldSelect extends FieldType {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.defaultOptions = {
            templateOptions: {
                options: [],
                /**
                 * @param {?} o1
                 * @param {?} o2
                 * @return {?}
                 */
                compareWith(o1, o2) {
                    return o1 === o2;
                },
            },
        };
    }
    // workaround for https://github.com/angular/angular/issues/10010
    /**
     * @param {?} s
     * @return {?}
     */
    set selectAccessor(s) {
        if (!s)
            return;
        /** @type {?} */
        const writeValue = s.writeValue.bind(s);
        if (s._getOptionId(s.value) === null) {
            writeValue(s.value);
        }
        s.writeValue = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const id = s._idCounter;
            writeValue(value);
            if (value === null) {
                this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (id !== s._idCounter && s._getOptionId(value) === null && s._elementRef.nativeElement.selectedIndex !== -1) {
                        writeValue(value);
                    }
                }));
            }
        });
    }
}
FormlyFieldSelect.decorators = [
    { type: Component, args: [{
                selector: 'formly-field-select',
                template: `
    <select *ngIf="to.multiple; else singleSelect" class="form-control"
      multiple
      [class.custom-select]="to.customSelect"
      [formControl]="formControl"
      [compareWith]="to.compareWith"
      [class.is-invalid]="showError"
      [formlyAttributes]="field">
      <ng-container *ngIf="to.options | formlySelectOptions:field | async as opts">
        <ng-container *ngIf="to._flatOptions else grouplist">
          <ng-container *ngFor="let opt of opts">
            <option [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
          </ng-container>
        </ng-container>

        <ng-template #grouplist>
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-template>
      </ng-container>
    </select>

    <ng-template #singleSelect>
      <select class="form-control"
        [formControl]="formControl"
        [compareWith]="to.compareWith"
        [class.custom-select]="to.customSelect"
        [class.is-invalid]="showError"
        [formlyAttributes]="field">
        <option *ngIf="to.placeholder" [ngValue]="null">{{ to.placeholder }}</option>
        <ng-container *ngIf="to.options | formlySelectOptions:field | async as opts">
          <ng-container *ngIf="to._flatOptions else grouplist">
            <ng-container *ngFor="let opt of opts">
              <option [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
            </ng-container>
          </ng-container>

          <ng-template #grouplist>
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-template>
        </ng-container>
      </select>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
FormlyFieldSelect.ctorParameters = () => [
    { type: NgZone }
];
FormlyFieldSelect.propDecorators = {
    selectAccessor: [{ type: ViewChild, args: [SelectControlValueAccessor,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyWrapperFormField extends FieldWrapper {
}
FormlyWrapperFormField.decorators = [
    { type: Component, args: [{
                selector: 'formly-wrapper-form-field',
                template: `
    <div class="form-group" [class.has-error]="showError">
      <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>

      <ng-template #fieldComponent></ng-template>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>
    </div>
  `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FIELD_TYPE_COMPONENTS = [
    // types
    FormlyFieldInput,
    FormlyFieldCheckbox,
    FormlyFieldRadio,
    FormlyFieldSelect,
    FormlyFieldTextArea,
    FormlyFieldMultiCheckbox,
    // wrappers
    FormlyWrapperFormField,
];
/** @type {?} */
const BOOTSTRAP_FORMLY_CONFIG = {
    types: [
        {
            name: 'input',
            component: FormlyFieldInput,
            wrappers: ['form-field'],
        },
        {
            name: 'checkbox',
            component: FormlyFieldCheckbox,
            wrappers: ['form-field'],
        },
        {
            name: 'radio',
            component: FormlyFieldRadio,
            wrappers: ['form-field'],
        },
        {
            name: 'select',
            component: FormlyFieldSelect,
            wrappers: ['form-field'],
        },
        {
            name: 'textarea',
            component: FormlyFieldTextArea,
            wrappers: ['form-field'],
        },
        {
            name: 'multicheckbox',
            component: FormlyFieldMultiCheckbox,
            wrappers: ['form-field'],
        },
    ],
    wrappers: [
        { name: 'form-field', component: FormlyWrapperFormField },
    ],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyBootstrapModule {
}
FormlyBootstrapModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FIELD_TYPE_COMPONENTS,
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormlySelectModule,
                    FormlyModule.forChild(BOOTSTRAP_FORMLY_CONFIG),
                    FormlyBootstrapAddonsModule,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FormlyBootstrapModule, FormlyFieldCheckbox, FormlyFieldMultiCheckbox, FormlyFieldInput, FormlyFieldRadio, FormlyFieldTextArea, FormlyFieldSelect, FormlyWrapperFormField, BOOTSTRAP_FORMLY_CONFIG as ɵb, FIELD_TYPE_COMPONENTS as ɵa };

//# sourceMappingURL=ngx-formly-bootstrap.js.map