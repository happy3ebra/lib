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
var FormlyFormBuilder = /** @class */ (function () {
    function FormlyFormBuilder(formlyConfig, componentFactoryResolver, injector) {
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
    FormlyFormBuilder.prototype.buildForm = /**
     * @param {?} formControl
     * @param {?=} fieldGroup
     * @param {?=} model
     * @param {?=} options
     * @return {?}
     */
    function (formControl, fieldGroup, model, options) {
        var _this = this;
        if (fieldGroup === void 0) { fieldGroup = []; }
        if (!this.formlyConfig.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        /** @type {?} */
        var field = { fieldGroup: fieldGroup, model: model, formControl: formControl, options: this._setOptions(options) };
        disableTreeValidityCall(formControl, (/**
         * @return {?}
         */
        function () {
            _this._buildForm(field);
            field.options._checkField(field, true);
        }));
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyFormBuilder.prototype._buildForm = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.prePopulate && extension.prePopulate(field); }));
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.onPopulate && extension.onPopulate(field); }));
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return _this._buildForm(f); }));
        }
        this.getExtensions().forEach((/**
         * @param {?} extension
         * @return {?}
         */
        function (extension) { return extension.postPopulate && extension.postPopulate(field); }));
    };
    /**
     * @private
     * @return {?}
     */
    FormlyFormBuilder.prototype.getExtensions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return Object.keys(this.formlyConfig.extensions).map((/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return _this.formlyConfig.extensions[name]; }));
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    FormlyFormBuilder.prototype._setOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
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
            function (field) {
                if (field._componentRefs) {
                    field._componentRefs.forEach((/**
                     * @param {?} ref
                     * @return {?}
                     */
                    function (ref) {
                        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
                        /** @type {?} */
                        var changeDetectorRef = ref.injector.get(ChangeDetectorRef);
                        changeDetectorRef.markForCheck();
                    }));
                }
                if (field.fieldGroup) {
                    field.fieldGroup.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return options._markForCheck(f); }));
                }
            });
        }
        if (!options._buildField) {
            options._buildField = (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                _this._setOptions(field.options);
                _this._buildForm(field);
                ((/** @type {?} */ (field.options)))._checkField(field, true);
                return field;
            });
        }
        return options;
    };
    FormlyFormBuilder.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    FormlyFormBuilder.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    /** @nocollapse */ FormlyFormBuilder.ngInjectableDef = i0.defineInjectable({ factory: function FormlyFormBuilder_Factory() { return new FormlyFormBuilder(i0.inject(i1.FormlyConfig), i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.INJECTOR)); }, token: FormlyFormBuilder, providedIn: "root" });
    return FormlyFormBuilder;
}());
export { FormlyFormBuilder };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZm9ybWx5LmZvcm0uYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7QUFFckU7SUFFRSwyQkFDVSxZQUEwQixFQUMxQix3QkFBa0QsRUFDbEQsUUFBa0I7UUFGbEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7Ozs7Ozs7O0lBRUoscUNBQVM7Ozs7Ozs7SUFBVCxVQUFVLFdBQWtDLEVBQUUsVUFBb0MsRUFBRSxLQUFVLEVBQUUsT0FBMEI7UUFBMUgsaUJBVUM7UUFWNkMsMkJBQUEsRUFBQSxlQUFvQztRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkZBQTJGLENBQUMsQ0FBQztTQUM5Rzs7WUFFSyxLQUFLLEdBQUcsRUFBRSxVQUFVLFlBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwRix1QkFBdUIsQ0FBQyxXQUFXOzs7UUFBRTtZQUNuQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtB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aUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ25DLENBQUMsRUFBQyxDQUFDO2lCQUNKO2dCQUVELElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQSxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN4QixPQUFPLENBQUMsV0FBVzs7OztZQUFHLFVBQUMsS0FBd0I7Z0JBQzdDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLEVBQTBCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUVuRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQSxDQUFDO1NBQ0g7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnQkF0RkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnQkFMekIsWUFBWTtnQkFGQSx3QkFBd0I7Z0JBQUUsUUFBUTs7OzRCQUF2RDtDQThGQyxBQXZGRCxJQXVGQztTQXRGWSxpQkFBaUI7Ozs7OztJQUUxQix5Q0FBa0M7Ozs7O0lBQ2xDLHFEQUEwRDs7Ozs7SUFDMUQscUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnIH0gZnJvbSAnLi9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGb3JtT3B0aW9ucywgRm9ybWx5RmllbGRDb25maWdDYWNoZSwgRm9ybWx5VmFsdWVDaGFuZ2VFdmVudCwgRm9ybWx5Rm9ybU9wdGlvbnNDYWNoZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWZpbmVIaWRkZW5Qcm9wLCBkaXNhYmxlVHJlZVZhbGlkaXR5Q2FsbCB9IGZyb20gJy4uL3V0aWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGb3JtQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWcsXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgKSB7fVxuXG4gIGJ1aWxkRm9ybShmb3JtQ29udHJvbDogRm9ybUdyb3VwIHwgRm9ybUFycmF5LCBmaWVsZEdyb3VwOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW10sIG1vZGVsOiBhbnksIG9wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1seUNvbmZpZy5leHRlbnNpb25zLmNvcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmd4Rm9ybWx5OiBtaXNzaW5nIGBmb3JSb290KClgIGNhbGwuIHVzZSBgZm9yUm9vdCgpYCB3aGVuIHJlZ2lzdGVyaW5nIHRoZSBgRm9ybWx5TW9kdWxlYC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWVsZCA9IHsgZmllbGRHcm91cCwgbW9kZWwsIGZvcm1Db250cm9sLCBvcHRpb25zOiB0aGlzLl9zZXRPcHRpb25zKG9wdGlvbnMpIH07XG4gICAgZGlzYWJsZVRyZWVWYWxpZGl0eUNhbGwoZm9ybUNvbnRyb2wsICgpID0+IHtcbiAgICAgIHRoaXMuX2J1aWxkRm9ybShmaWVsZCk7XG4gICAgICBmaWVsZC5vcHRpb25zLl9jaGVja0ZpZWxkKGZpZWxkLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIHRoaXMuZ2V0RXh0ZW5zaW9ucygpLmZvckVhY2goZXh0ZW5zaW9uID0+IGV4dGVuc2lvbi5wcmVQb3B1bGF0ZSAmJiBleHRlbnNpb24ucHJlUG9wdWxhdGUoZmllbGQpKTtcbiAgICB0aGlzLmdldEV4dGVuc2lvbnMoKS5mb3JFYWNoKGV4dGVuc2lvbiA9PiBleHRlbnNpb24ub25Qb3B1bGF0ZSAmJiBleHRlbnNpb24ub25Qb3B1bGF0ZShmaWVsZCkpO1xuXG4gICAgaWYgKGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAuZm9yRWFjaCgoZikgPT4gdGhpcy5fYnVpbGRGb3JtKGYpKTtcbiAgICB9XG5cbiAgICB0aGlzLmdldEV4dGVuc2lvbnMoKS5mb3JFYWNoKGV4dGVuc2lvbiA9PiBleHRlbnNpb24ucG9zdFBvcHVsYXRlICYmIGV4dGVuc2lvbi5wb3N0UG9wdWxhdGUoZmllbGQpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RXh0ZW5zaW9ucygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5mb3JtbHlDb25maWcuZXh0ZW5zaW9ucykubWFwKG5hbWUgPT4gdGhpcy5mb3JtbHlDb25maWcuZXh0ZW5zaW9uc1tuYW1lXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRPcHRpb25zKG9wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zQ2FjaGUpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmZvcm1TdGF0ZSA9IG9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgaWYgKCFvcHRpb25zLnNob3dFcnJvcikge1xuICAgICAgb3B0aW9ucy5zaG93RXJyb3IgPSB0aGlzLmZvcm1seUNvbmZpZy5leHRyYXMuc2hvd0Vycm9yO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5maWVsZENoYW5nZXMpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3Aob3B0aW9ucywgJ2ZpZWxkQ2hhbmdlcycsIG5ldyBTdWJqZWN0PEZvcm1seVZhbHVlQ2hhbmdlRXZlbnQ+KCkpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5fcmVzb2x2ZXIpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3Aob3B0aW9ucywgJ19yZXNvbHZlcicsIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuX2luamVjdG9yKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdfaW5qZWN0b3InLCB0aGlzLmluamVjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuX2hpZGRlbkZpZWxkc0ZvckNoZWNrKSB7XG4gICAgICBvcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjayA9IFtdO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5fbWFya0ZvckNoZWNrKSB7XG4gICAgICBvcHRpb25zLl9tYXJrRm9yQ2hlY2sgPSAoZmllbGQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkLl9jb21wb25lbnRSZWZzKSB7XG4gICAgICAgICAgZmllbGQuX2NvbXBvbmVudFJlZnMuZm9yRWFjaChyZWYgPT4ge1xuICAgICAgICAgICAgLy8gTk9URTogd2UgY2Fubm90IHVzZSByZWYuY2hhbmdlRGV0ZWN0b3JSZWYsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8yMTkxXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VEZXRlY3RvclJlZiA9IHJlZi5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAuZm9yRWFjaChmID0+IG9wdGlvbnMuX21hcmtGb3JDaGVjayhmKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9idWlsZEZpZWxkKSB7XG4gICAgICBvcHRpb25zLl9idWlsZEZpZWxkID0gKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICB0aGlzLl9zZXRPcHRpb25zKGZpZWxkLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9idWlsZEZvcm0oZmllbGQpO1xuICAgICAgICAoZmllbGQub3B0aW9ucyBhcyBGb3JtbHlGb3JtT3B0aW9uc0NhY2hlKS5fY2hlY2tGaWVsZChmaWVsZCwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIl19