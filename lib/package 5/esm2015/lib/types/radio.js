/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export class FormlyFieldRadio extends FieldType {
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
if (false) {
    /** @type {?} */
    FormlyFieldRadio.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBbUM3QyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBUztJQWpDL0M7O1FBa0NFLG1CQUFjLEdBQUc7WUFDZixlQUFlLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLFFBQVE7YUFDcEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBeENBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO2FBQ0Y7Ozs7SUFFQywwQ0FLRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1yYWRpbycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiB0by5vcHRpb25zIHwgZm9ybWx5U2VsZWN0T3B0aW9uczpmaWVsZCB8IGFzeW5jOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAnZm9ybS1jaGVjayc6IHRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gLTEsXG4gICAgICAgICAgJ2Zvcm0tY2hlY2staW5saW5lJzogdG8uZm9ybUNoZWNrID09PSAnaW5saW5lJyxcbiAgICAgICAgICAnY3VzdG9tLWNvbnRyb2wgY3VzdG9tLXJhZGlvJzogdG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwLFxuICAgICAgICAgICdjdXN0b20tY29udHJvbC1pbmxpbmUnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20taW5saW5lJ1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgW2lkXT1cImlkICsgJ18nICsgaVwiXG4gICAgICAgICAgW2NsYXNzLmZvcm0tY2hlY2staW5wdXRdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAtMVwiXG4gICAgICAgICAgW2NsYXNzLmN1c3RvbS1jb250cm9sLWlucHV0XT1cInRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gMFwiXG4gICAgICAgICAgW25hbWVdPVwiZmllbGQubmFtZSB8fCBpZFwiXG4gICAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICBbYXR0ci52YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgICAgIFthdHRyLmRpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZCB8fCBmb3JtQ29udHJvbC5kaXNhYmxlZCA/IHRydWUgOiBudWxsXCI+XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgIFtjbGFzcy5mb3JtLWNoZWNrLWxhYmVsXT1cInRvLmZvcm1DaGVjay5pbmRleE9mKCdjdXN0b20nKSA9PT0gLTFcIlxuICAgICAgICAgIFtjbGFzcy5jdXN0b20tY29udHJvbC1sYWJlbF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IDBcIlxuICAgICAgICAgIFtmb3JdPVwiaWQgKyAnXycgKyBpXCI+XG4gICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRSYWRpbyBleHRlbmRzIEZpZWxkVHlwZSB7XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgb3B0aW9uczogW10sXG4gICAgICBmb3JtQ2hlY2s6ICdjdXN0b20nLCAvLyAnY3VzdG9tJyB8ICdjdXN0b20taW5saW5lJyB8ICdzdGFja2VkJyB8ICdpbmxpbmUnXG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==