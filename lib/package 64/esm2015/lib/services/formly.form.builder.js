/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ComponentFactoryResolver, Injector, ChangeDetectorRef } from '@angular/core';
import { FormlyConfig } from './formly.config';
import { Subject } from 'rxjs';
import { defineHiddenProp, disableTreeValidityCall } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "./formly.config";
export class FormlyFormBuilder {
    /**
     * @param {?} formlyConfig
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    constructor(formlyConfig, componentFactoryResolver, injector) {
        this.formlyConfig = formlyConfig;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * @param {?} formControl
     * @param {?=} fieldGroup
     * @param {?=} model
     * @param {?=} options
     * @return {?}
     */
    buildForm(formControl, fieldGroup = [], model, options) {
        if (!this.formlyConfig.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        /** @type {?} */
        const field = { fieldGroup, model, formControl, options: this._setOptions(options) };
        disableTreeValidityCall(formControl, (/**
         * @return {?}
         */
        () => {
            this._buildForm(field);
            field.options._checkField(field, true);
        }));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    _buildForm(field) {
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.prePopulate && extension.prePopulate(field)));
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.onPopulate && extension.onPopulate(field)));
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @return {?}
             */
            (f) => this._buildForm(f)));
        }
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        extension => extension.postPopulate && extension.postPopulate(field)));
    }
    /**
     * @private
     * @return {?}
     */
    getExtensions() {
        return Object.keys(this.formlyConfig.extensions).map((/**
         * @param {?} name
         * @return {?}
         */
        name => this.formlyConfig.extensions[name]));
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    _setOptions(options) {
        options = options || {};
        options.formState = options.formState || {};
        if (!options.showError) {
            options.showError = this.formlyConfig.extras.showError;
        }
        if (!options.fieldChanges) {
            defineHiddenProp(options, 'fieldChanges', new Subject());
        }
        if (!options._resolver) {
            defineHiddenProp(options, '_resolver', this.componentFactoryResolver);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options._hiddenFieldsForCheck) {
            options._hiddenFieldsForCheck = [];
        }
        if (!options._markForCheck) {
            options._markForCheck = (/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                if (field._componentRefs) {
                    field._componentRefs.forEach((/**
                     * @param {?} ref
                     * @return {?}
                     */
                    ref => {
                        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                        /** @type {?} */
                        const changeDetectorRef = ref.injector.get(ChangeDetectorRef);
                        changeDetectorRef.markForCheck();
                    }));
                }
                if (field.fieldGroup) {
                    field.fieldGroup.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => options._markForCheck(f)));
                }
            });
        }
        if (!options._buildField) {
            options._buildField = (/**
             * @param {?} field
             * @return {?}
             */
            (field) => {
                this._setOptions(field.options);
                this._buildForm(field);
                ((/** @type {?} */ (field.options)))._checkField(field, true);
                return field;
            });
        }
        return options;
    }
}
FormlyFormBuilder.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
FormlyFormBuilder.ctorParameters = () => [
    { type: FormlyConfig },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
/** @nocollapse */ FormlyFormBuilder.ngInjectableDef = i0.defineInjectable({ factory: function FormlyFormBuilder_Factory() { return new FormlyFormBuilder(i0.inject(i1.FormlyConfig), i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.INJECTOR)); }, token: FormlyFormBuilder, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormlyFormBuilder.prototype.formlyConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyFormBuilder.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    FormlyFormBuilder.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZm9ybWx5LmZvcm0uYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7QUFHckUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBQzVCLFlBQ1UsWUFBMEIsRUFDMUIsd0JBQWtELEVBQ2xELFFBQWtCO1FBRmxCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6QixDQUFDOzs7Ozs7OztJQUVKLFNBQVMsQ0FBQyxXQUFrQyxFQUFFLGFBQWtDLEVBQUUsRUFBRSxLQUFVLEVBQUUsT0FBMEI7UUFDeEgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDJGQUEyRixDQUFDLENBQUM7U0FDOUc7O2NBRUssS0FBSyxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEYsdUJBQXVCLENBQUMsV0FBVzs7O1FBQUUsR0FBRyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsS0FBSyxD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QUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUFBLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxXQUFXOzs7O1lBQUcsQ0FBQyxLQUF3QixFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLEVBQTBCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUVuRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQSxDQUFDO1NBQ0g7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUF0RkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztZQUx6QixZQUFZO1lBRkEsd0JBQXdCO1lBQUUsUUFBUTs7Ozs7Ozs7SUFVbkQseUNBQWtDOzs7OztJQUNsQyxxREFBMEQ7Ozs7O0lBQzFELHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5Rm9ybU9wdGlvbnMsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIEZvcm1seVZhbHVlQ2hhbmdlRXZlbnQsIEZvcm1seUZvcm1PcHRpb25zQ2FjaGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVmaW5lSGlkZGVuUHJvcCwgZGlzYWJsZVRyZWVWYWxpZGl0eUNhbGwgfSBmcm9tICcuLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Rm9ybUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICkge31cblxuICBidWlsZEZvcm0oZm9ybUNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1BcnJheSwgZmllbGRHcm91cDogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdLCBtb2RlbDogYW55LCBvcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9ucykge1xuICAgIGlmICghdGhpcy5mb3JtbHlDb25maWcuZXh0ZW5zaW9ucy5jb3JlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neEZvcm1seTogbWlzc2luZyBgZm9yUm9vdCgpYCBjYWxsLiB1c2UgYGZvclJvb3QoKWAgd2hlbiByZWdpc3RlcmluZyB0aGUgYEZvcm1seU1vZHVsZWAuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSB7IGZpZWxkR3JvdXAsIG1vZGVsLCBmb3JtQ29udHJvbCwgb3B0aW9uczogdGhpcy5fc2V0T3B0aW9ucyhvcHRpb25zKSB9O1xuICAgIGRpc2FibGVUcmVlVmFsaWRpdHlDYWxsKGZvcm1Db250cm9sLCAoKSA9PiB7XG4gICAgICB0aGlzLl9idWlsZEZvcm0oZmllbGQpO1xuICAgICAgZmllbGQub3B0aW9ucy5fY2hlY2tGaWVsZChmaWVsZCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEZvcm0oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICB0aGlzLmdldEV4dGVuc2lvbnMoKS5mb3JFYWNoKGV4dGVuc2lvbiA9PiBleHRlbnNpb24ucHJlUG9wdWxhdGUgJiYgZXh0ZW5zaW9uLnByZVBvcHVsYXRlKGZpZWxkKSk7XG4gICAgdGhpcy5nZXRFeHRlbnNpb25zKCkuZm9yRWFjaChleHRlbnNpb24gPT4gZXh0ZW5zaW9uLm9uUG9wdWxhdGUgJiYgZXh0ZW5zaW9uLm9uUG9wdWxhdGUoZmllbGQpKTtcblxuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwLmZvckVhY2goKGYpID0+IHRoaXMuX2J1aWxkRm9ybShmKSk7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRFeHRlbnNpb25zKCkuZm9yRWFjaChleHRlbnNpb24gPT4gZXh0ZW5zaW9uLnBvc3RQb3B1bGF0ZSAmJiBleHRlbnNpb24ucG9zdFBvcHVsYXRlKGZpZWxkKSk7XG4gIH1cblxuICBwcml2YXRlIGdldEV4dGVuc2lvbnMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZm9ybWx5Q29uZmlnLmV4dGVuc2lvbnMpLm1hcChuYW1lID0+IHRoaXMuZm9ybWx5Q29uZmlnLmV4dGVuc2lvbnNbbmFtZV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T3B0aW9ucyhvcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9uc0NhY2hlKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5mb3JtU3RhdGUgPSBvcHRpb25zLmZvcm1TdGF0ZSB8fCB7fTtcblxuICAgIGlmICghb3B0aW9ucy5zaG93RXJyb3IpIHtcbiAgICAgIG9wdGlvbnMuc2hvd0Vycm9yID0gdGhpcy5mb3JtbHlDb25maWcuZXh0cmFzLnNob3dFcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuZmllbGRDaGFuZ2VzKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdmaWVsZENoYW5nZXMnLCBuZXcgU3ViamVjdDxGb3JtbHlWYWx1ZUNoYW5nZUV2ZW50PigpKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuX3Jlc29sdmVyKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdfcmVzb2x2ZXInLCB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9pbmplY3Rvcikge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChvcHRpb25zLCAnX2luamVjdG9yJywgdGhpcy5pbmplY3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjaykge1xuICAgICAgb3B0aW9ucy5faGlkZGVuRmllbGRzRm9yQ2hlY2sgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuX21hcmtGb3JDaGVjaykge1xuICAgICAgb3B0aW9ucy5fbWFya0ZvckNoZWNrID0gKGZpZWxkKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZC5fY29tcG9uZW50UmVmcykge1xuICAgICAgICAgIGZpZWxkLl9jb21wb25lbnRSZWZzLmZvckVhY2gocmVmID0+IHtcbiAgICAgICAgICAgIC8vIE5PVEU6IHdlIGNhbm5vdCB1c2UgcmVmLmNoYW5nZURldGVjdG9yUmVmLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMjE5MVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlRGV0ZWN0b3JSZWYgPSByZWYuaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLmZvckVhY2goZiA9PiBvcHRpb25zLl9tYXJrRm9yQ2hlY2soZikpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5fYnVpbGRGaWVsZCkge1xuICAgICAgb3B0aW9ucy5fYnVpbGRGaWVsZCA9IChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgdGhpcy5fc2V0T3B0aW9ucyhmaWVsZC5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5fYnVpbGRGb3JtKGZpZWxkKTtcbiAgICAgICAgKGZpZWxkLm9wdGlvbnMgYXMgRm9ybWx5Rm9ybU9wdGlvbnNDYWNoZSkuX2NoZWNrRmllbGQoZmllbGQsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmaWVsZDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==