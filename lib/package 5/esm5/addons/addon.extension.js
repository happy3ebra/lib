/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @param {?} field
 * @return {?}
 */
export function addonsExtension(field) {
    if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
        return;
    }
    if (field.templateOptions.addonLeft || field.templateOptions.addonRight) {
        field.wrappers = tslib_1.__spread((field.wrappers || []), ['addons']);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24uZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwL2FkZG9ucy8iLCJzb3VyY2VzIjpbImFkZG9uLmV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQXdCO0lBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3pGLE9BQU87S0FDUjtJQUVELElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7UUFDdkUsS0FBSyxDQUFDLFFBQVEsb0JBQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFFLFFBQVEsRUFBQyxDQUFDO0tBQ3hEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRvbnNFeHRlbnNpb24oZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gIGlmICghZmllbGQudGVtcGxhdGVPcHRpb25zIHx8IChmaWVsZC53cmFwcGVycyAmJiBmaWVsZC53cmFwcGVycy5pbmRleE9mKCdhZGRvbnMnKSAhPT0gLTEpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5hZGRvbkxlZnQgfHwgZmllbGQudGVtcGxhdGVPcHRpb25zLmFkZG9uUmlnaHQpIHtcbiAgICBmaWVsZC53cmFwcGVycyA9IFsuLi4oZmllbGQud3JhcHBlcnMgfHwgW10pLCAnYWRkb25zJ107XG4gIH1cbn1cbiJdfQ==