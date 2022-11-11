/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export class FormlyFieldInput extends FieldType {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9ib290c3RyYXAvIiwic291cmNlcyI6WyJsaWIvdHlwZXMvaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBVzdDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxTQUFTOzs7O0lBQzdDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO0lBQ2hDLENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7O0dBS1Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0ICpuZ0lmPVwidHlwZSAhPT0gJ251bWJlcicgZWxzZSBudW1iZXJUbXBcIiBbdHlwZV09XCJ0eXBlXCIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiPlxuICAgIDxuZy10ZW1wbGF0ZSAjbnVtYmVyVG1wPlxuICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCIgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRJbnB1dCBleHRlbmRzIEZpZWxkVHlwZSB7XG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLnRvLnR5cGUgfHwgJ3RleHQnO1xuICB9XG59XG4iXX0=