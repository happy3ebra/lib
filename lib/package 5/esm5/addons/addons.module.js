/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperAddons } from './addons.component';
import { addonsExtension } from './addon.extension';
var FormlyBootstrapAddonsModule = /** @class */ (function () {
    function FormlyBootstrapAddonsModule() {
    }
    FormlyBootstrapAddonsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FormlyWrapperAddons],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild({
                            wrappers: [
                                { name: 'addons', component: FormlyWrapperAddons },
                            ],
                            extensions: [
                                { name: 'addons', extension: { postPopulate: addonsExtension } },
                            ],
                        }),
                    ],
                },] }
    ];
    return FormlyBootstrapAddonsModule;
}());
export { FormlyBootstrapAddonsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9hZGRvbnMvIiwic291cmNlcyI6WyJhZGRvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBEO0lBQUE7SUFnQjJDLENBQUM7O2dCQWhCM0MsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBRW5CLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCLFFBQVEsRUFBRTtnQ0FDUixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFOzZCQUNuRDs0QkFDRCxVQUFVLEVBQUU7Z0NBQ1YsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsRUFBRTs2QkFDakU7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRjs7SUFDMEMsa0NBQUM7Q0FBQSxBQWhCNUMsSUFnQjRDO1NBQS9CLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtbHlXcmFwcGVyQWRkb25zIH0gZnJvbSAnLi9hZGRvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IGFkZG9uc0V4dGVuc2lvbiB9IGZyb20gJy4vYWRkb24uZXh0ZW5zaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRm9ybWx5V3JhcHBlckFkZG9uc10sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZCh7XG4gICAgICB3cmFwcGVyczogW1xuICAgICAgICB7IG5hbWU6ICdhZGRvbnMnLCBjb21wb25lbnQ6IEZvcm1seVdyYXBwZXJBZGRvbnMgfSxcbiAgICAgIF0sXG4gICAgICBleHRlbnNpb25zOiBbXG4gICAgICAgIHsgbmFtZTogJ2FkZG9ucycsIGV4dGVuc2lvbjogeyBwb3N0UG9wdWxhdGU6IGFkZG9uc0V4dGVuc2lvbiB9IH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlCb290c3RyYXBBZGRvbnNNb2R1bGUgeyB9XG4iXX0=