/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyForm } from './components/formly.form';
import { FormlyField } from './components/formly.field';
import { FormlyAttributes } from './components/formly.attributes';
import { FormlyConfig, FORMLY_CONFIG } from './services/formly.config';
import { FormlyFormBuilder } from './services/formly.form.builder';
import { FormlyGroup } from './templates/formly.group';
import { FormlyValidationMessage } from './templates/formly.validation-message';
import { FormlyTemplateType } from './templates/field-template.type';
import { FieldExpressionExtension } from './extensions/field-expression/field-expression';
import { FieldValidationExtension } from './extensions/field-validation/field-validation';
import { FieldFormExtension } from './extensions/field-form/field-form';
import { CoreExtension } from './extensions/core/core';
import { FieldArrayType } from './templates/field-array.type';
/**
 * @param {?} formlyConfig
 * @return {?}
 */
export function defaultFormlyConfig(formlyConfig) {
    return {
        types: [
            { name: 'formly-group', component: FormlyGroup },
            { name: 'formly-template', component: FormlyTemplateType },
        ],
        extensions: [
            { name: 'core', extension: new CoreExtension(formlyConfig) },
            { name: 'field-validation', extension: new FieldValidationExtension(formlyConfig) },
            { name: 'field-form', extension: new FieldFormExtension(formlyConfig) },
            { name: 'field-expression', extension: new FieldExpressionExtension() },
        ],
    };
}
export class FormlyModule {
    /**
     * @param {?} configService
     * @param {?=} configs
     */
    constructor(configService, configs = []) {
        if (!configs) {
            return;
        }
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        config => configService.addConfig(config)));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyConfig,
                FormlyFormBuilder,
            ],
        };
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    }
}
FormlyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FormlyForm,
                    FormlyField,
                    FormlyAttributes,
                    FormlyGroup,
                    FormlyValidationMessage,
                    FormlyTemplateType,
                    (/** @type {?} */ (FieldArrayType)),
                ],
                entryComponents: [FormlyGroup, FormlyTemplateType],
                exports: [FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
                imports: [CommonModule],
            },] }
];
/** @nocollapse */
FormlyModule.ctorParameters = () => [
    { type: FormlyConfig },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [FORMLY_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1Qiw0QkFBNEIsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQWdCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUU5RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsWUFBMEI7SUFDNUQsT0FBTztRQUNMLEtBQUssRUFBRTtZ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TkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybSB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtbHkuZm9ybSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtbHkuZmllbGQnO1xuaW1wb3J0IHsgRm9ybWx5QXR0cmlidXRlcyB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtbHkuYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIENvbmZpZ09wdGlvbiwgRk9STUxZX0NPTkZJRyB9IGZyb20gJy4vc2VydmljZXMvZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlGb3JtQnVpbGRlciB9IGZyb20gJy4vc2VydmljZXMvZm9ybWx5LmZvcm0uYnVpbGRlcic7XG5pbXBvcnQgeyBGb3JtbHlHcm91cCB9IGZyb20gJy4vdGVtcGxhdGVzL2Zvcm1seS5ncm91cCc7XG5pbXBvcnQgeyBGb3JtbHlWYWxpZGF0aW9uTWVzc2FnZSB9IGZyb20gJy4vdGVtcGxhdGVzL2Zvcm1seS52YWxpZGF0aW9uLW1lc3NhZ2UnO1xuaW1wb3J0IHsgRm9ybWx5VGVtcGxhdGVUeXBlIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZmllbGQtdGVtcGxhdGUudHlwZSc7XG5cbmltcG9ydCB7IEZpZWxkRXhwcmVzc2lvbkV4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9ucy9maWVsZC1leHByZXNzaW9uL2ZpZWxkLWV4cHJlc3Npb24nO1xuaW1wb3J0IHsgRmllbGRWYWxpZGF0aW9uRXh0ZW5zaW9uIH0gZnJvbSAnLi9leHRlbnNpb25zL2ZpZWxkLXZhbGlkYXRpb24vZmllbGQtdmFsaWRhdGlvbic7XG5pbXBvcnQgeyBGaWVsZEZvcm1FeHRlbnNpb24gfSBmcm9tICcuL2V4dGVuc2lvbnMvZmllbGQtZm9ybS9maWVsZC1mb3JtJztcbmltcG9ydCB7IENvcmVFeHRlbnNpb24gfSBmcm9tICcuL2V4dGVuc2lvbnMvY29yZS9jb3JlJztcbmltcG9ydCB7IEZpZWxkQXJyYXlUeXBlIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZmllbGQtYXJyYXkudHlwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Rm9ybWx5Q29uZmlnKGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnKTogQ29uZmlnT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW1xuICAgICAgeyBuYW1lOiAnZm9ybWx5LWdyb3VwJywgY29tcG9uZW50OiBGb3JtbHlHcm91cCB9LFxuICAgICAgeyBuYW1lOiAnZm9ybWx5LXRlbXBsYXRlJywgY29tcG9uZW50OiBGb3JtbHlUZW1wbGF0ZVR5cGUgfSxcbiAgICBdLFxuICAgIGV4dGVuc2lvbnM6IFtcbiAgICAgIHsgbmFtZTogJ2NvcmUnLCBleHRlbnNpb246IG5ldyBDb3JlRXh0ZW5zaW9uKGZvcm1seUNvbmZpZykgfSxcbiAgICAgIHsgbmFtZTogJ2ZpZWxkLXZhbGlkYXRpb24nLCBleHRlbnNpb246IG5ldyBGaWVsZFZhbGlkYXRpb25FeHRlbnNpb24oZm9ybWx5Q29uZmlnKSB9LFxuICAgICAgeyBuYW1lOiAnZmllbGQtZm9ybScsIGV4dGVuc2lvbjogbmV3IEZpZWxkRm9ybUV4dGVuc2lvbihmb3JtbHlDb25maWcpIH0sXG4gICAgICB7IG5hbWU6ICdmaWVsZC1leHByZXNzaW9uJywgZXh0ZW5zaW9uOiBuZXcgRmllbGRFeHByZXNzaW9uRXh0ZW5zaW9uKCkgfSxcbiAgICBdLFxuICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtbHlGb3JtLFxuICAgIEZvcm1seUZpZWxkLFxuICAgIEZvcm1seUF0dHJpYnV0ZXMsXG4gICAgRm9ybWx5R3JvdXAsXG4gICAgRm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgRm9ybWx5VGVtcGxhdGVUeXBlLFxuICAgIEZpZWxkQXJyYXlUeXBlIGFzIGFueSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRm9ybWx5R3JvdXAsIEZvcm1seVRlbXBsYXRlVHlwZV0sXG4gIGV4cG9ydHM6IFtGb3JtbHlGb3JtLCBGb3JtbHlGaWVsZCwgRm9ybWx5QXR0cmlidXRlcywgRm9ybWx5R3JvdXAsIEZvcm1seVZhbGlkYXRpb25NZXNzYWdlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQ29uZmlnT3B0aW9uID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZvcm1seU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRm9ybWx5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgbXVsdGk6IHRydWUsIHVzZUZhY3Rvcnk6IGRlZmF1bHRGb3JtbHlDb25maWcsIGRlcHM6IFtGb3JtbHlDb25maWddIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICBGb3JtbHlDb25maWcsXG4gICAgICAgIEZvcm1seUZvcm1CdWlsZGVyLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKGNvbmZpZzogQ29uZmlnT3B0aW9uID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZvcm1seU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRm9ybWx5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgbXVsdGk6IHRydWUsIHVzZUZhY3Rvcnk6IGRlZmF1bHRGb3JtbHlDb25maWcsIGRlcHM6IFtGb3JtbHlDb25maWddIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICBGb3JtbHlGb3JtQnVpbGRlcixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbmZpZ1NlcnZpY2U6IEZvcm1seUNvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZPUk1MWV9DT05GSUcpIGNvbmZpZ3M6IENvbmZpZ09wdGlvbltdID0gW10sXG4gICkge1xuICAgIGlmICghY29uZmlncykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbmZpZ3MuZm9yRWFjaChjb25maWcgPT4gY29uZmlnU2VydmljZS5hZGRDb25maWcoY29uZmlnKSk7XG4gIH1cbn1cbiJdfQ==