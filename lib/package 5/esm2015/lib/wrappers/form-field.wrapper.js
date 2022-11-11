/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
export class FormlyWrapperFormField extends FieldWrapper {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2Zvcm0tZmllbGQud3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFxQmhELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxZQUFZOzs7WUFuQnZELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktd3JhcHBlci1mb3JtLWZpZWxkJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtjbGFzcy5oYXMtZXJyb3JdPVwic2hvd0Vycm9yXCI+XG4gICAgICA8bGFiZWwgKm5nSWY9XCJ0by5sYWJlbCAmJiB0by5oaWRlTGFiZWwgIT09IHRydWVcIiBbYXR0ci5mb3JdPVwiaWRcIj5cbiAgICAgICAge3sgdG8ubGFiZWwgfX1cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ0by5yZXF1aXJlZCAmJiB0by5oaWRlUmVxdWlyZWRNYXJrZXIgIT09IHRydWVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9zcGFuPlxuICAgICAgPC9sYWJlbD5cblxuICAgICAgPG5nLXRlbXBsYXRlICNmaWVsZENvbXBvbmVudD48L25nLXRlbXBsYXRlPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Vycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCIgW3N0eWxlLmRpc3BsYXldPVwiJ2Jsb2NrJ1wiPlxuICAgICAgICA8Zm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZSBbZmllbGRdPVwiZmllbGRcIj48L2Zvcm1seS12YWxpZGF0aW9uLW1lc3NhZ2U+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNtYWxsICpuZ0lmPVwidG8uZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+e3sgdG8uZGVzY3JpcHRpb24gfX08L3NtYWxsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlXcmFwcGVyRm9ybUZpZWxkIGV4dGVuZHMgRmllbGRXcmFwcGVyIHtcbn1cbiJdfQ==