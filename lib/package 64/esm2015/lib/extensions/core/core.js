/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getFieldId, isUndefined, getFieldValue, reverseDeepMerge, assignFieldValue } from '../../utils';
/**
 * \@experimental
 */
export class CoreExtension {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.formId = 0;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    prePopulate(field) {
        this.getFieldComponentInstance(field).prePopulate();
        if (field.parent) {
            return;
        }
        /** @type {?} */
        const fieldTransforms = (field.options && field.options.fieldTransform) || this.formlyConfig.extras.fieldTransform;
        (Array.isArray(fieldTransforms) ? fieldTransforms : [fieldTransforms]).forEach((/**
         * @param {?} fieldTransform
         * @return {?}
         */
        fieldTransform => {
            if (fieldTransform) {
                console.warn(`NgxFormly: fieldTransform is deprecated since v5.0, use custom extension instead.`);
                /** @type {?} */
                const fieldGroup = fieldTransform(field.fieldGroup, field.model, (/** @type {?} */ (field.formControl)), field.options);
                if (!fieldGroup) {
                    throw new Error('fieldTransform must return an array of fields');
                }
            }
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onPopulate(field) {
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate();
        if (field.fieldGroup) {
            field.fieldGroup.forEach((/**
             * @param {?} f
             * @param {?} index
             * @return {?}
             */
            (f, index) => {
                Object.defineProperty(f, 'parent', { get: (/**
                     * @return {?}
                     */
                    () => field), configurable: true });
                Object.defineProperty(f, 'index', { get: (/**
                     * @return {?}
                     */
                    () => index), configurable: true });
                this.formId++;
            }));
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    postPopulate(field) {
        this.getFieldComponentInstance(field).postPopulate();
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldOptions(field) {
        /** @type {?} */
        const root = (/** @type {?} */ (field.parent));
        if (!root) {
            return;
        }
        Object.defineProperty(field, 'form', { get: (/**
             * @return {?}
             */
            () => root.formControl), configurable: true });
        Object.defineProperty(field, 'options', { get: (/**
             * @return {?}
             */
            () => root.options), configurable: true });
        Object.defineProperty(field, 'model', {
            get: (/**
             * @return {?}
             */
            () => field.key && field.fieldGroup ? getFieldValue(field) : root.model),
            configurable: true,
        });
        reverseDeepMerge(field, {
            id: getFieldId(`formly_${this.formId}`, field, field['index']),
            hooks: {},
            modelOptions: {},
            validation: { messages: {} },
            templateOptions: !field.type || !field.key ? {} : {
                label: '',
                placeholder: '',
                focus: false,
                disabled: false,
            },
        });
        if (this.formlyConfig.extras.resetFieldOnHide && field.resetOnHide !== false) {
            field.resetOnHide = true;
        }
        if (field.lifecycle) {
            console.warn(`NgxFormly: 'lifecycle' is deprecated since v5.0, use 'hooks' instead.`);
        }
        if (field.type !== 'formly-template'
            && (field.template
                || (field.expressionProperties && field.expressionProperties.template))) {
            if (field.type) {
                console.warn(`NgxFormly: passing 'type' property is not allowed when 'template' is set.`);
            }
            field.type = 'formly-template';
        }
        if (!field.type && field.fieldGroup) {
            field.type = 'formly-group';
        }
        if (field.type) {
            this.formlyConfig.getMergedField(field);
        }
        if (field.parent) {
            /** @type {?} */
            let setDefaultValue = !isUndefined(field.key)
                && !isUndefined(field.defaultValue)
                && isUndefined(getFieldValue(field))
                && (!field.resetOnHide || !(field.hide || field.hideExpression));
            if (setDefaultValue && field.resetOnHide) {
                /** @type {?} */
                let parent = field.parent;
                while (parent && !parent.hideExpression && !parent.hide) {
                    parent = parent.parent;
                }
                setDefaultValue = !parent || !(parent.hideExpression || parent.hide);
            }
            if (setDefaultValue) {
                assignFieldValue(field, field.defaultValue);
            }
        }
        this.initFieldWrappers(field);
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    initFieldWrappers(field) {
        field.wrappers = field.wrappers || [];
        /** @type {?} */
        const fieldTemplateManipulators = Object.assign({ preWrapper: [], postWrapper: [] }, (field.templateOptions.templateManipulators || {}));
        field.wrappers = [
            ...this.formlyConfig.templateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.preWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...field.wrappers,
            ...this.formlyConfig.templateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
            ...fieldTemplateManipulators.postWrapper.map((/**
             * @param {?} m
             * @return {?}
             */
            m => m(field))),
        ].filter((/**
         * @param {?} el
         * @param {?} i
         * @param {?} a
         * @return {?}
         */
        (el, i, a) => el && i === a.indexOf(el)));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    getFieldComponentInstance(field) {
        /** @type {?} */
        const componentRef = this.formlyConfig.resolveFieldTypeRef(field);
        /** @type {?} */
        const instance = componentRef ? (/** @type {?} */ (componentRef.instance)) : {};
        return {
            prePopulate: (/**
             * @return {?}
             */
            () => instance.prePopulate && instance.prePopulate(field)),
            onPopulate: (/**
             * @return {?}
             */
            () => instance.onPopulate && instance.onPopulate(field)),
            postPopulate: (/**
             * @return {?}
             */
            () => instance.postPopulate && instance.postPopulate(field)),
        };
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CoreExtension.prototype.formId;
    /**
     * @type {?}
     * @private
     */
    CoreExtension.prototype.formlyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtZm9ybWx5L2NvcmUvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5zaW9ucy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7OztBQUd6RyxNQUFNLE9BQU8sYUFBYTs7OztJQUV4QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUR0QyxXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQytCLENBQUM7Ozs7O0lBRW5ELFdBQVcsQ0FBQyxLQUE2QjtRQUN2QyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjs7Y0FFSyxlQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsY0FBYztRQUNsSCxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxjQUFjLENBQUMsRUFBRTtZQUM5RixJQUFJLGNBQWMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDOztzQkFDNUYsVUFBVSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsbUJBQVcsS0FBSyxDQUFDLFdBQVcsRUFBQSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQzdHLElBQUksQ0FB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QUMsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUN4RSxHQUFHLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUM7U0FDNUQsQ0FBQyxNQUFNOzs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFFTyx5QkFBeUIsQ0FBQyxLQUE2Qjs7Y0FDdkQsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDOztjQUMzRCxRQUFRLEdBQW9CLFlBQVksQ0FBQyxDQUFDLENBQUMsbUJBQUEsWUFBWSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBRWxGLE9BQU87WUFDTCxXQUFXOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEUsVUFBVTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ25FLFlBQVk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMxRSxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7SUE1SUMsK0JBQW1COzs7OztJQUNQLHFDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1seUV4dGVuc2lvbiwgRm9ybWx5Q29uZmlnLCBUZW1wbGF0ZU1hbmlwdWxhdG9ycyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWdDYWNoZSwgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZ2V0RmllbGRJZCwgaXNVbmRlZmluZWQsIGdldEZpZWxkVmFsdWUsIHJldmVyc2VEZWVwTWVyZ2UsIGFzc2lnbkZpZWxkVmFsdWUgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbi8qKiBAZXhwZXJpbWVudGFsICovXG5leHBvcnQgY2xhc3MgQ29yZUV4dGVuc2lvbiBpbXBsZW1lbnRzIEZvcm1seUV4dGVuc2lvbiB7XG4gIHByaXZhdGUgZm9ybUlkID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZykgeyB9XG5cbiAgcHJlUG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICB0aGlzLmdldEZpZWxkQ29tcG9uZW50SW5zdGFuY2UoZmllbGQpLnByZVBvcHVsYXRlKCk7XG4gICAgaWYgKGZpZWxkLnBhcmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkVHJhbnNmb3JtcyA9IChmaWVsZC5vcHRpb25zICYmIGZpZWxkLm9wdGlvbnMuZmllbGRUcmFuc2Zvcm0pIHx8IHRoaXMuZm9ybWx5Q29uZmlnLmV4dHJhcy5maWVsZFRyYW5zZm9ybTtcbiAgICAoQXJyYXkuaXNBcnJheShmaWVsZFRyYW5zZm9ybXMpID8gZmllbGRUcmFuc2Zvcm1zIDogW2ZpZWxkVHJhbnNmb3Jtc10pLmZvckVhY2goZmllbGRUcmFuc2Zvcm0gPT4ge1xuICAgICAgaWYgKGZpZWxkVHJhbnNmb3JtKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBmaWVsZFRyYW5zZm9ybSBpcyBkZXByZWNhdGVkIHNpbmNlIHY1LjAsIHVzZSBjdXN0b20gZXh0ZW5zaW9uIGluc3RlYWQuYCk7XG4gICAgICAgIGNvbnN0IGZpZWxkR3JvdXAgPSBmaWVsZFRyYW5zZm9ybShmaWVsZC5maWVsZEdyb3VwLCBmaWVsZC5tb2RlbCwgPEZvcm1Hcm91cD5maWVsZC5mb3JtQ29udHJvbCwgZmllbGQub3B0aW9ucyk7XG4gICAgICAgIGlmICghZmllbGRHcm91cCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZmllbGRUcmFuc2Zvcm0gbXVzdCByZXR1cm4gYW4gYXJyYXkgb2YgZmllbGRzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uUG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICB0aGlzLmluaXRGaWVsZE9wdGlvbnMoZmllbGQpO1xuICAgIHRoaXMuZ2V0RmllbGRDb21wb25lbnRJbnN0YW5jZShmaWVsZCkub25Qb3B1bGF0ZSgpO1xuICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwLmZvckVhY2goKGYsIGluZGV4KSA9PiB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCAncGFyZW50JywgeyBnZXQ6ICgpID0+IGZpZWxkLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCAnaW5kZXgnLCB7IGdldDogKCkgPT4gaW5kZXgsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5mb3JtSWQrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBvc3RQb3B1bGF0ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIHRoaXMuZ2V0RmllbGRDb21wb25lbnRJbnN0YW5jZShmaWVsZCkucG9zdFBvcHVsYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRGaWVsZE9wdGlvbnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBjb25zdCByb290ID0gPEZvcm1seUZpZWxkQ29uZmlnQ2FjaGU+IGZpZWxkLnBhcmVudDtcbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmllbGQsICdmb3JtJywgeyBnZXQ6ICgpID0+IHJvb3QuZm9ybUNvbnRyb2wsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmllbGQsICdvcHRpb25zJywgeyBnZXQ6ICgpID0+IHJvb3Qub3B0aW9ucywgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWVsZCwgJ21vZGVsJywge1xuICAgICAgZ2V0OiAoKSA9PiBmaWVsZC5rZXkgJiYgZmllbGQuZmllbGRHcm91cCA/IGdldEZpZWxkVmFsdWUoZmllbGQpIDogcm9vdC5tb2RlbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldmVyc2VEZWVwTWVyZ2UoZmllbGQsIHtcbiAgICAgIGlkOiBnZXRGaWVsZElkKGBmb3JtbHlfJHt0aGlzLmZvcm1JZH1gLCBmaWVsZCwgZmllbGRbJ2luZGV4J10pLFxuICAgICAgaG9va3M6IHt9LFxuICAgICAgbW9kZWxPcHRpb25zOiB7fSxcbiAgICAgIHZhbGlkYXRpb246IHsgbWVzc2FnZXM6IHt9IH0sXG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6ICFmaWVsZC50eXBlIHx8ICFmaWVsZC5rZXkgPyB7fSA6IHtcbiAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmZvcm1seUNvbmZpZy5leHRyYXMucmVzZXRGaWVsZE9uSGlkZSAmJiBmaWVsZC5yZXNldE9uSGlkZSAhPT0gZmFsc2UpIHtcbiAgICAgIGZpZWxkLnJlc2V0T25IaWRlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQubGlmZWN5Y2xlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5neEZvcm1seTogJ2xpZmVjeWNsZScgaXMgZGVwcmVjYXRlZCBzaW5jZSB2NS4wLCB1c2UgJ2hvb2tzJyBpbnN0ZWFkLmApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGZpZWxkLnR5cGUgIT09ICdmb3JtbHktdGVtcGxhdGUnXG4gICAgICAmJiAoXG4gICAgICAgIGZpZWxkLnRlbXBsYXRlXG4gICAgICAgIHx8IChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcyAmJiBmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcy50ZW1wbGF0ZSlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIGlmIChmaWVsZC50eXBlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICd0eXBlJyBwcm9wZXJ0eSBpcyBub3QgYWxsb3dlZCB3aGVuICd0ZW1wbGF0ZScgaXMgc2V0LmApO1xuICAgICAgfVxuICAgICAgZmllbGQudHlwZSA9ICdmb3JtbHktdGVtcGxhdGUnO1xuICAgIH1cblxuICAgIGlmICghZmllbGQudHlwZSAmJiBmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICBmaWVsZC50eXBlID0gJ2Zvcm1seS1ncm91cCc7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLnR5cGUpIHtcbiAgICAgIHRoaXMuZm9ybWx5Q29uZmlnLmdldE1lcmdlZEZpZWxkKGZpZWxkKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQucGFyZW50KSB7XG4gICAgICBsZXQgc2V0RGVmYXVsdFZhbHVlID0gIWlzVW5kZWZpbmVkKGZpZWxkLmtleSlcbiAgICAgICAgJiYgIWlzVW5kZWZpbmVkKGZpZWxkLmRlZmF1bHRWYWx1ZSlcbiAgICAgICAgJiYgaXNVbmRlZmluZWQoZ2V0RmllbGRWYWx1ZShmaWVsZCkpXG4gICAgICAgICYmICghZmllbGQucmVzZXRPbkhpZGUgfHwgIShmaWVsZC5oaWRlIHx8IGZpZWxkLmhpZGVFeHByZXNzaW9uKSk7XG4gICAgICBpZiAoc2V0RGVmYXVsdFZhbHVlICYmIGZpZWxkLnJlc2V0T25IaWRlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBmaWVsZC5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIXBhcmVudC5oaWRlRXhwcmVzc2lvbiAmJiAhcGFyZW50LmhpZGUpIHtcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHNldERlZmF1bHRWYWx1ZSA9ICFwYXJlbnQgfHwgIShwYXJlbnQuaGlkZUV4cHJlc3Npb24gfHwgcGFyZW50LmhpZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0RGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGFzc2lnbkZpZWxkVmFsdWUoZmllbGQsIGZpZWxkLmRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbml0RmllbGRXcmFwcGVycyhmaWVsZCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRGaWVsZFdyYXBwZXJzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykge1xuICAgIGZpZWxkLndyYXBwZXJzID0gZmllbGQud3JhcHBlcnMgfHwgW107XG4gICAgY29uc3QgZmllbGRUZW1wbGF0ZU1hbmlwdWxhdG9yczogVGVtcGxhdGVNYW5pcHVsYXRvcnMgPSB7XG4gICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgIHBvc3RXcmFwcGVyOiBbXSxcbiAgICAgIC4uLihmaWVsZC50ZW1wbGF0ZU9wdGlvbnMudGVtcGxhdGVNYW5pcHVsYXRvcnMgfHwge30pLFxuICAgIH07XG5cbiAgICBmaWVsZC53cmFwcGVycyA9IFtcbiAgICAgIC4uLnRoaXMuZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIubWFwKG0gPT4gbShmaWVsZCkpLFxuICAgICAgLi4uZmllbGRUZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLm1hcChtID0+IG0oZmllbGQpKSxcbiAgICAgIC4uLmZpZWxkLndyYXBwZXJzLFxuICAgICAgLi4udGhpcy5mb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIubWFwKG0gPT4gbShmaWVsZCkpLFxuICAgICAgLi4uZmllbGRUZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlci5tYXAobSA9PiBtKGZpZWxkKSksXG4gICAgXS5maWx0ZXIoKGVsLCBpLCBhKSA9PiBlbCAmJiBpID09PSBhLmluZGV4T2YoZWwpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmllbGRDb21wb25lbnRJbnN0YW5jZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZm9ybWx5Q29uZmlnLnJlc29sdmVGaWVsZFR5cGVSZWYoZmllbGQpO1xuICAgIGNvbnN0IGluc3RhbmNlOiBGb3JtbHlFeHRlbnNpb24gPSBjb21wb25lbnRSZWYgPyBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgYW55IDoge307XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJlUG9wdWxhdGU6ICgpID0+IGluc3RhbmNlLnByZVBvcHVsYXRlICYmIGluc3RhbmNlLnByZVBvcHVsYXRlKGZpZWxkKSxcbiAgICAgIG9uUG9wdWxhdGU6ICgpID0+IGluc3RhbmNlLm9uUG9wdWxhdGUgJiYgaW5zdGFuY2Uub25Qb3B1bGF0ZShmaWVsZCksXG4gICAgICBwb3N0UG9wdWxhdGU6ICgpID0+IGluc3RhbmNlLnBvc3RQb3B1bGF0ZSAmJiBpbnN0YW5jZS5wb3N0UG9wdWxhdGUoZmllbGQpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==