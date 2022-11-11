/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, NgZone } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { take } from 'rxjs/operators';
export class FormlyFieldSelect extends FieldType {
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
if (false) {
    /** @type {?} */
    FormlyFieldSelect.prototype.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    FormlyFieldSelect.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibGliL3R5cGVzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFrRXRDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUFTOzs7O0lBZ0M5QyxZQUFvQixNQUFjO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQS9CbEMsbUJBQWMsR0FBRztZQUNmLGVBQWUsRUFBRTtnQkFDZixPQUFPLEVBQUUsRUFBRTs7Ozs7O2dCQUNYLFdBQVcsQ0FBQyxFQUFPLEVBQUUsRUFBTztvQkFDMUIsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNuQixDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBMEJGLENBQUM7Ozs7OztJQXZCRCxJQUEyQyxjQUFjLENBQUMsQ0FBTTtRQUM5RCxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87O2NBRVQsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsQ0FBQyxDQUFDLFVBQVU7Ozs7UUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFOztrQkFDdEIsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUFVO1lBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUMvRCxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDN0csVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNuQjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBLENBQUM7SUFDSixDQUFDOzs7WUE5RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERUO2FBQ0Y7Ozs7WUFwRThCLE1BQU07Ozs2QkFnRmxDLFNBQVMsU0FBQywwQkFBMEI7Ozs7SUFWckMsMkNBT0U7Ozs7O0lBd0JVLG1DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VsZWN0ICpuZ0lmPVwidG8ubXVsdGlwbGU7IGVsc2Ugc2luZ2xlU2VsZWN0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgbXVsdGlwbGVcbiAgICAgIFtjbGFzcy5jdXN0b20tc2VsZWN0XT1cInRvLmN1c3RvbVNlbGVjdFwiXG4gICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgW2NvbXBhcmVXaXRoXT1cInRvLmNvbXBhcmVXaXRoXCJcbiAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zOmZpZWxkIHwgYXN5bmMgYXMgb3B0c1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidG8uX2ZsYXRPcHRpb25zIGVsc2UgZ3JvdXBsaXN0XCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0IG9mIG9wdHNcIj5cbiAgICAgICAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwib3B0LnZhbHVlXCIgW2Rpc2FibGVkXT1cIm9wdC5kaXNhYmxlZFwiPnt7IG9wdC5sYWJlbCB9fTwvb3B0aW9uPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI2dyb3VwbGlzdD5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHQgb2Ygb3B0c1wiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXAgZWxzZSBvcHRncm91cFwiIFtuZ1ZhbHVlXT1cIm9wdC52YWx1ZVwiIFtkaXNhYmxlZF09XCJvcHQuZGlzYWJsZWRcIj57eyBvcHQubGFiZWwgfX08L29wdGlvbj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjb3B0Z3JvdXA+XG4gICAgICAgICAgICAgIDxvcHRncm91cCBbbGFiZWxdPVwib3B0LmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygb3B0Lmdyb3VwXCIgW25nVmFsdWVdPVwiY2hpbGQudmFsdWVcIiBbZGlzYWJsZWRdPVwiY2hpbGQuZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgIHt7IGNoaWxkLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvb3B0Z3JvdXA+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zZWxlY3Q+XG5cbiAgICA8bmctdGVtcGxhdGUgI3NpbmdsZVNlbGVjdD5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbY29tcGFyZVdpdGhdPVwidG8uY29tcGFyZVdpdGhcIlxuICAgICAgICBbY2xhc3MuY3VzdG9tLXNlbGVjdF09XCJ0by5jdXN0b21TZWxlY3RcIlxuICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiPlxuICAgICAgICA8b3B0aW9uICpuZ0lmPVwidG8ucGxhY2Vob2xkZXJcIiBbbmdWYWx1ZV09XCJudWxsXCI+e3sgdG8ucGxhY2Vob2xkZXIgfX08L29wdGlvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zOmZpZWxkIHwgYXN5bmMgYXMgb3B0c1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0by5fZmxhdE9wdGlvbnMgZWxzZSBncm91cGxpc3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdCBvZiBvcHRzXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gW25nVmFsdWVdPVwib3B0LnZhbHVlXCIgW2Rpc2FibGVkXT1cIm9wdC5kaXNhYmxlZFwiPnt7IG9wdC5sYWJlbCB9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2dyb3VwbGlzdD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdCBvZiBvcHRzXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gKm5nSWY9XCIhb3B0Lmdyb3VwIGVsc2Ugb3B0Z3JvdXBcIiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+e3sgb3B0LmxhYmVsIH19PC9vcHRpb24+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgPG9wdGdyb3VwIFtsYWJlbF09XCJvcHQubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGNoaWxkIG9mIG9wdC5ncm91cFwiIFtuZ1ZhbHVlXT1cImNoaWxkLnZhbHVlXCIgW2Rpc2FibGVkXT1cImNoaWxkLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNoaWxkLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NlbGVjdD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZFNlbGVjdCBleHRlbmRzIEZpZWxkVHlwZSB7XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgb3B0aW9uczogW10sXG4gICAgICBjb21wYXJlV2l0aChvMTogYW55LCBvMjogYW55KSB7XG4gICAgICAgIHJldHVybiBvMSA9PT0gbzI7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTAwMTBcbiAgQFZpZXdDaGlsZChTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3Nvcikgc2V0IHNlbGVjdEFjY2Vzc29yKHM6IGFueSkge1xuICAgIGlmICghcykgcmV0dXJuO1xuXG4gICAgY29uc3Qgd3JpdGVWYWx1ZSA9IHMud3JpdGVWYWx1ZS5iaW5kKHMpO1xuICAgIGlmIChzLl9nZXRPcHRpb25JZChzLnZhbHVlKSA9PT0gbnVsbCkge1xuICAgICAgd3JpdGVWYWx1ZShzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzLndyaXRlVmFsdWUgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBzLl9pZENvdW50ZXI7XG4gICAgICB3cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKGlkICE9PSBzLl9pZENvdW50ZXIgJiYgcy5fZ2V0T3B0aW9uSWQodmFsdWUpID09PSBudWxsICYmIHMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZWxlY3RlZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgd3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiJdfQ==