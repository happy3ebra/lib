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
var FormlyModule = /** @class */ (function () {
    function FormlyModule(configService, configs) {
        if (configs === void 0) { configs = []; }
        if (!configs) {
            return;
        }
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        function (config) { return configService.addConfig(config); }));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    FormlyModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
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
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    FormlyModule.forChild = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    };
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
    FormlyModule.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [FORMLY_CONFIG,] }] }
    ]; };
    return FormlyModule;
}());
export { FormlyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1Qiw0QkFBNEIsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQWdCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUU5RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsWUFBMEI7SUFDNUQsT0FBTztRQUNMLEtBQUssRUFBRTtZ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QUFBLEFBbERELElBa0RDO1NBcENZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1seUZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0nO1xuaW1wb3J0IHsgRm9ybWx5RmllbGQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkJztcbmltcG9ydCB7IEZvcm1seUF0dHJpYnV0ZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LmF0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnLCBDb25maWdPcHRpb24sIEZPUk1MWV9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybUJ1aWxkZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seS5mb3JtLmJ1aWxkZXInO1xuaW1wb3J0IHsgRm9ybWx5R3JvdXAgfSBmcm9tICcuL3RlbXBsYXRlcy9mb3JtbHkuZ3JvdXAnO1xuaW1wb3J0IHsgRm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2UgfSBmcm9tICcuL3RlbXBsYXRlcy9mb3JtbHkudmFsaWRhdGlvbi1tZXNzYWdlJztcbmltcG9ydCB7IEZvcm1seVRlbXBsYXRlVHlwZSB9IGZyb20gJy4vdGVtcGxhdGVzL2ZpZWxkLXRlbXBsYXRlLnR5cGUnO1xuXG5pbXBvcnQgeyBGaWVsZEV4cHJlc3Npb25FeHRlbnNpb24gfSBmcm9tICcuL2V4dGVuc2lvbnMvZmllbGQtZXhwcmVzc2lvbi9maWVsZC1leHByZXNzaW9uJztcbmltcG9ydCB7IEZpZWxkVmFsaWRhdGlvbkV4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9ucy9maWVsZC12YWxpZGF0aW9uL2ZpZWxkLXZhbGlkYXRpb24nO1xuaW1wb3J0IHsgRmllbGRGb3JtRXh0ZW5zaW9uIH0gZnJvbSAnLi9leHRlbnNpb25zL2ZpZWxkLWZvcm0vZmllbGQtZm9ybSc7XG5pbXBvcnQgeyBDb3JlRXh0ZW5zaW9uIH0gZnJvbSAnLi9leHRlbnNpb25zL2NvcmUvY29yZSc7XG5pbXBvcnQgeyBGaWVsZEFycmF5VHlwZSB9IGZyb20gJy4vdGVtcGxhdGVzL2ZpZWxkLWFycmF5LnR5cGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZvcm1seUNvbmZpZyhmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZyk6IENvbmZpZ09wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgdHlwZXM6IFtcbiAgICAgIHsgbmFtZTogJ2Zvcm1seS1ncm91cCcsIGNvbXBvbmVudDogRm9ybWx5R3JvdXAgfSxcbiAgICAgIHsgbmFtZTogJ2Zvcm1seS10ZW1wbGF0ZScsIGNvbXBvbmVudDogRm9ybWx5VGVtcGxhdGVUeXBlIH0sXG4gICAgXSxcbiAgICBleHRlbnNpb25zOiBbXG4gICAgICB7IG5hbWU6ICdjb3JlJywgZXh0ZW5zaW9uOiBuZXcgQ29yZUV4dGVuc2lvbihmb3JtbHlDb25maWcpIH0sXG4gICAgICB7IG5hbWU6ICdmaWVsZC12YWxpZGF0aW9uJywgZXh0ZW5zaW9uOiBuZXcgRmllbGRWYWxpZGF0aW9uRXh0ZW5zaW9uKGZvcm1seUNvbmZpZykgfSxcbiAgICAgIHsgbmFtZTogJ2ZpZWxkLWZvcm0nLCBleHRlbnNpb246IG5ldyBGaWVsZEZvcm1FeHRlbnNpb24oZm9ybWx5Q29uZmlnKSB9LFxuICAgICAgeyBuYW1lOiAnZmllbGQtZXhwcmVzc2lvbicsIGV4dGVuc2lvbjogbmV3IEZpZWxkRXhwcmVzc2lvbkV4dGVuc2lvbigpIH0sXG4gICAgXSxcbiAgfTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRm9ybWx5Rm9ybSxcbiAgICBGb3JtbHlGaWVsZCxcbiAgICBGb3JtbHlBdHRyaWJ1dGVzLFxuICAgIEZvcm1seUdyb3VwLFxuICAgIEZvcm1seVZhbGlkYXRpb25NZXNzYWdlLFxuICAgIEZvcm1seVRlbXBsYXRlVHlwZSxcbiAgICBGaWVsZEFycmF5VHlwZSBhcyBhbnksXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0Zvcm1seUdyb3VwLCBGb3JtbHlUZW1wbGF0ZVR5cGVdLFxuICBleHBvcnRzOiBbRm9ybWx5Rm9ybSwgRm9ybWx5RmllbGQsIEZvcm1seUF0dHJpYnV0ZXMsIEZvcm1seUdyb3VwLCBGb3JtbHlWYWxpZGF0aW9uTWVzc2FnZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IENvbmZpZ09wdGlvbiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxGb3JtbHlNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZvcm1seU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEZPUk1MWV9DT05GSUcsIG11bHRpOiB0cnVlLCB1c2VGYWN0b3J5OiBkZWZhdWx0Rm9ybWx5Q29uZmlnLCBkZXBzOiBbRm9ybWx5Q29uZmlnXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEZPUk1MWV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgRm9ybWx5Q29uZmlnLFxuICAgICAgICBGb3JtbHlGb3JtQnVpbGRlcixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JDaGlsZChjb25maWc6IENvbmZpZ09wdGlvbiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxGb3JtbHlNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZvcm1seU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEZPUk1MWV9DT05GSUcsIG11bHRpOiB0cnVlLCB1c2VGYWN0b3J5OiBkZWZhdWx0Rm9ybWx5Q29uZmlnLCBkZXBzOiBbRm9ybWx5Q29uZmlnXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEZPUk1MWV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgRm9ybWx5Rm9ybUJ1aWxkZXIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWdTZXJ2aWNlOiBGb3JtbHlDb25maWcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGT1JNTFlfQ09ORklHKSBjb25maWdzOiBDb25maWdPcHRpb25bXSA9IFtdLFxuICApIHtcbiAgICBpZiAoIWNvbmZpZ3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25maWdzLmZvckVhY2goY29uZmlnID0+IGNvbmZpZ1NlcnZpY2UuYWRkQ29uZmlnKGNvbmZpZykpO1xuICB9XG59XG4iXX0=