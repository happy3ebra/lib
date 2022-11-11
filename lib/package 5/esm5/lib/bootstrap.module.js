/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { BOOTSTRAP_FORMLY_CONFIG, FIELD_TYPE_COMPONENTS } from './bootstrap.config';
import { FormlyBootstrapAddonsModule } from '@ngx-formly/bootstrap/addons';
var FormlyBootstrapModule = /** @class */ (function () {
    function FormlyBootstrapModule() {
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
    return FormlyBootstrapModule;
}());
export { FormlyBootstrapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImxpYi9ib290c3RyYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFM0U7SUFBQTtJQVlvQyxDQUFDOztnQkFacEMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixZQUFZLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3dCQUM5QywyQkFBMkI7cUJBQzVCO2lCQUNGOztJQUNtQyw0QkFBQztDQUFBLEFBWnJDLElBWXFDO1NBQXhCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seU1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5U2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZS9zZWxlY3QnO1xuaW1wb3J0IHsgQk9PVFNUUkFQX0ZPUk1MWV9DT05GSUcsIEZJRUxEX1RZUEVfQ09NUE9ORU5UUyB9IGZyb20gJy4vYm9vdHN0cmFwLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlCb290c3RyYXBBZGRvbnNNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9ib290c3RyYXAvYWRkb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRklFTERfVFlQRV9DT01QT05FTlRTLFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybWx5U2VsZWN0TW9kdWxlLFxuICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZChCT09UU1RSQVBfRk9STUxZX0NPTkZJRyksXG4gICAgRm9ybWx5Qm9vdHN0cmFwQWRkb25zTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlCb290c3RyYXBNb2R1bGUge31cbiJdfQ==