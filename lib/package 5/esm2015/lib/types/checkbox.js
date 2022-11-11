/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export class FormlyFieldCheckbox extends FieldType {
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
if (false) {
    /** @type {?} */
    FormlyFieldCheckbox.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBZ0M3QyxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBUztJQTlCbEQ7O1FBK0JFLG1CQUFjLEdBQUc7WUFDZixlQUFlLEVBQUU7Z0JBQ2YsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFNBQVMsRUFBRSxRQUFRO2FBQ3BCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXRDQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCVDthQUNGOzs7O0lBRUMsNkNBTUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nQ2xhc3NdPVwie1xuICAgICAgJ2Zvcm0tY2hlY2snOiB0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xLFxuICAgICAgJ2Zvcm0tY2hlY2staW5saW5lJzogdG8uZm9ybUNoZWNrID09PSAnaW5saW5lJyxcbiAgICAgICdjdXN0b20tY29udHJvbCc6IHRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gMCxcbiAgICAgICdjdXN0b20tY2hlY2tib3gnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20nIHx8IHRvLmZvcm1DaGVjayA9PT0gJ2N1c3RvbS1pbmxpbmUnLFxuICAgICAgJ2N1c3RvbS1jb250cm9sLWlubGluZSc6IHRvLmZvcm1DaGVjayA9PT0gJ2N1c3RvbS1pbmxpbmUnLFxuICAgICAgJ2N1c3RvbS1zd2l0Y2gnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20tc3dpdGNoJ1xuICAgIH1cIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICBbY2xhc3MuZm9ybS1jaGVjay1pbnB1dF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xXCJcbiAgICAgICAgW2NsYXNzLnBvc2l0aW9uLXN0YXRpY109XCJ0by5mb3JtQ2hlY2sgPT09ICdub2xhYmVsJ1wiXG4gICAgICAgIFtjbGFzcy5jdXN0b20tY29udHJvbC1pbnB1dF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IDBcIlxuICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJ0by5pbmRldGVybWluYXRlICYmIGZvcm1Db250cm9sLnZhbHVlID09PSBudWxsXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIj5cbiAgICAgIDxsYWJlbCBbZm9yXT1cImlkXCJcbiAgICAgICAgKm5nSWY9XCJ0by5mb3JtQ2hlY2sgIT09ICdub2xhYmVsJ1wiXG4gICAgICAgIFtjbGFzcy5mb3JtLWNoZWNrLWxhYmVsXT1cInRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gLTFcIlxuICAgICAgICBbY2xhc3MuY3VzdG9tLWNvbnRyb2wtbGFiZWxdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwXCJcbiAgICAgID5cbiAgICAgICAge3sgdG8ubGFiZWwgfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ0by5yZXF1aXJlZCAmJiB0by5oaWRlUmVxdWlyZWRNYXJrZXIgIT09IHRydWVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRDaGVja2JveCBleHRlbmRzIEZpZWxkVHlwZSB7XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcbiAgICAgIGhpZGVMYWJlbDogdHJ1ZSxcbiAgICAgIGZvcm1DaGVjazogJ2N1c3RvbScsIC8vICdjdXN0b20nIHwgJ2N1c3RvbS1pbmxpbmUnIHwgJ2N1c3RvbS1zd2l0Y2gnIHwgJ3N0YWNrZWQnIHwgJ2lubGluZScgfCAnbm9sYWJlbCdcbiAgICB9LFxuICB9O1xufVxuIl19