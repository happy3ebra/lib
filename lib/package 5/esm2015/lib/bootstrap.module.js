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
export class FormlyBootstrapModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImxpYi9ib290c3RyYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFjM0UsTUFBTSxPQUFPLHFCQUFxQjs7O1lBWmpDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1oscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGtCQUFrQjtvQkFDbEIsWUFBWSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDOUMsMkJBQTJCO2lCQUM1QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlL3NlbGVjdCc7XG5pbXBvcnQgeyBCT09UU1RSQVBfRk9STUxZX0NPTkZJRywgRklFTERfVFlQRV9DT01QT05FTlRTIH0gZnJvbSAnLi9ib290c3RyYXAuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUJvb3RzdHJhcEFkZG9uc01vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9hZGRvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGSUVMRF9UWVBFX0NPTVBPTkVOVFMsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3JtbHlTZWxlY3RNb2R1bGUsXG4gICAgRm9ybWx5TW9kdWxlLmZvckNoaWxkKEJPT1RTVFJBUF9GT1JNTFlfQ09ORklHKSxcbiAgICBGb3JtbHlCb290c3RyYXBBZGRvbnNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUJvb3RzdHJhcE1vZHVsZSB7fVxuIl19