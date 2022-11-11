/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export class FormlyFieldMultiCheckbox extends FieldType {
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
if (false) {
    /** @type {?} */
    FormlyFieldMultiCheckbox.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy9tdWx0aWNoZWNrYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQW1DN0MsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFNBQVM7SUFqQ3ZEOztRQWtDRSxtQkFBYyxHQUFHO1lBQ2YsZUFBZSxFQUFFO2dCQUNmLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxRQUFRO2FBQ3BCO1NBQ0YsQ0FBQztJQXdCSixDQUFDOzs7Ozs7SUF0QkMsUUFBUSxDQUFDLEtBQVUsRUFBRSxPQUFnQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU87Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFDLENBQy9ELENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLG1CQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFHLENBQUM7U0FDOUU7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQVc7O2NBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztRQUVwQyxPQUFPLEtBQUssSUFBSSxDQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDdEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ3hCLENBQUM7SUFDSixDQUFDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7YUFDRjs7OztJQUVDLGtEQUtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLW11bHRpY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgdG8ub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnM6ZmllbGQgfCBhc3luYzsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2Zvcm0tY2hlY2snOiB0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xLFxuICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZSc6IHRvLmZvcm1DaGVjayA9PT0gJ2lubGluZScsXG4gICAgICAgICAgJ2N1c3RvbS1jb250cm9sJzogdG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwLFxuICAgICAgICAgICdjdXN0b20tY2hlY2tib3gnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20nIHx8IHRvLmZvcm1DaGVjayA9PT0gJ2N1c3RvbS1pbmxpbmUnLFxuICAgICAgICAgICdjdXN0b20tY29udHJvbC1pbmxpbmUnOiB0by5mb3JtQ2hlY2sgPT09ICdjdXN0b20taW5saW5lJyxcbiAgICAgICAgICAnY3VzdG9tLXN3aXRjaCc6IHRvLmZvcm1DaGVjayA9PT0gJ2N1c3RvbS1zd2l0Y2gnXG4gICAgICAgIH1cIlxuICAgICAgPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBbaWRdPVwiaWQgKyAnXycgKyBpXCJcbiAgICAgICAgICBbY2xhc3MuZm9ybS1jaGVjay1pbnB1dF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xXCJcbiAgICAgICAgICBbY2xhc3MuY3VzdG9tLWNvbnRyb2wtaW5wdXRdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwXCJcbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbY2hlY2tlZF09XCJpc0NoZWNrZWQob3B0aW9uKVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cIiBmb3JtQ29udHJvbC5kaXNhYmxlZCB8fCBvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKG9wdGlvbi52YWx1ZSwgJGV2ZW50LnRhcmdldC5jaGVja2VkKVwiPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICBbY2xhc3MuZm9ybS1jaGVjay1sYWJlbF09XCJ0by5mb3JtQ2hlY2suaW5kZXhPZignY3VzdG9tJykgPT09IC0xXCJcbiAgICAgICAgICBbY2xhc3MuY3VzdG9tLWNvbnRyb2wtbGFiZWxdPVwidG8uZm9ybUNoZWNrLmluZGV4T2YoJ2N1c3RvbScpID09PSAwXCJcbiAgICAgICAgICBbZm9yXT1cImlkICsgJ18nICsgaVwiPlxuICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkTXVsdGlDaGVja2JveCBleHRlbmRzIEZpZWxkVHlwZSB7XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgb3B0aW9uczogW10sXG4gICAgICBmb3JtQ2hlY2s6ICdjdXN0b20nLCAvLyAnY3VzdG9tJyB8ICdjdXN0b20taW5saW5lJyB8ICdjdXN0b20tc3dpdGNoJyB8ICdzdGFja2VkJyB8ICdpbmxpbmUnXG4gICAgfSxcbiAgfTtcblxuICBvbkNoYW5nZSh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgIGlmICh0aGlzLnRvLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZShjaGVja2VkXG4gICAgICAgID8gWy4uLih0aGlzLmZvcm1Db250cm9sLnZhbHVlIHx8IFtdKSwgdmFsdWVdXG4gICAgICAgIDogWy4uLih0aGlzLmZvcm1Db250cm9sLnZhbHVlIHx8IFtdKV0uZmlsdGVyKG8gPT4gbyAhPT0gdmFsdWUpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5wYXRjaFZhbHVlKHsgLi4udGhpcy5mb3JtQ29udHJvbC52YWx1ZSwgW3ZhbHVlXTogY2hlY2tlZCB9KTtcbiAgICB9XG4gICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICBpc0NoZWNrZWQob3B0aW9uOiBhbnkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWU7XG5cbiAgICByZXR1cm4gdmFsdWUgJiYgKFxuICAgICAgdGhpcy50by50eXBlID09PSAnYXJyYXknXG4gICAgICAgID8gKHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEpXG4gICAgICAgIDogdmFsdWVbb3B0aW9uLnZhbHVlXVxuICAgICk7XG4gIH1cbn1cbiJdfQ==