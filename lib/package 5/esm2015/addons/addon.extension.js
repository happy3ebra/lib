/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
export function addonsExtension(field) {
    if (!field.templateOptions || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
        return;
    }
    if (field.templateOptions.addonLeft || field.templateOptions.addonRight) {
        field.wrappers = [...(field.wrappers || []), 'addons'];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24uZXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvYm9vdHN0cmFwL2FkZG9ucy8iLCJzb3VyY2VzIjpbImFkZG9uLmV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBd0I7SUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDekYsT0FBTztLQUNSO0lBRUQsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtRQUN2RSxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDeEQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZG9uc0V4dGVuc2lvbihmaWVsZDogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgaWYgKCFmaWVsZC50ZW1wbGF0ZU9wdGlvbnMgfHwgKGZpZWxkLndyYXBwZXJzICYmIGZpZWxkLndyYXBwZXJzLmluZGV4T2YoJ2FkZG9ucycpICE9PSAtMSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZmllbGQudGVtcGxhdGVPcHRpb25zLmFkZG9uTGVmdCB8fCBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuYWRkb25SaWdodCkge1xuICAgIGZpZWxkLndyYXBwZXJzID0gWy4uLihmaWVsZC53cmFwcGVycyB8fCBbXSksICdhZGRvbnMnXTtcbiAgfVxufVxuIl19