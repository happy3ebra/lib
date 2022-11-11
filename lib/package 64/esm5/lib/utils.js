/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isObservable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { TemplateRef } from '@angular/core';
/**
 * @param {?} form
 * @param {?} callback
 * @return {?}
 */
export function disableTreeValidityCall(form, callback) {
    /** @type {?} */
    var _updateTreeValidity = form._updateTreeValidity.bind(form);
    form._updateTreeValidity = (/**
     * @return {?}
     */
    function () { });
    callback();
    form._updateTreeValidity = _updateTreeValidity;
}
/**
 * @param {?} formId
 * @param {?} field
 * @param {?} index
 * @return {?}
 */
export function getFieldId(formId, field, index) {
    if (field.id)
        return field.id;
    /** @type {?} */
    var type = field.type;
    if (!type && field.template) {
        type = 'template';
    }
    if (isFunction(type)) {
        type = ((/** @type {?} */ (type))).prototype.constructor.name;
    }
    return [formId, type, field.key, index].join('_');
}
/**
 * @param {?} field
 * @return {?}
 */
export function getKeyPath(field) {
    if (!field.key) {
        return [];
    }
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!field._keyPath || field._keyPath.key !== field.key) {
        /** @type {?} */
        var path = [];
        if (typeof field.key === 'string') {
            /** @type {?} */
            var key = field.key.indexOf('[') === -1
                ? field.key
                : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = ["" + field.key];
        }
        field._keyPath = { key: field.key, path: path };
    }
    return field._keyPath.path.slice(0);
}
/** @type {?} */
export var FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
/**
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
export function assignFieldValue(field, value) {
    /** @type {?} */
    var paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    /** @type {?} */
    var root = field;
    while (root.parent) {
        root = root.parent;
        paths = tslib_1.__spread(getKeyPath(root), paths);
    }
    if (value === undefined && field.resetOnHide) {
        /** @type {?} */
        var k = paths.pop();
        /** @type {?} */
        var m = paths.reduce((/**
         * @param {?} model
         * @param {?} path
         * @return {?}
         */
        function (model, path) { return model[path] || {}; }), root.model);
        delete m[k];
        return;
    }
    assignModelValue(root.model, paths, value);
}
/**
 * @param {?} model
 * @param {?} paths
 * @param {?} value
 * @return {?}
 */
export function assignModelValue(model, paths, value) {
    for (var i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        var path = paths[i];
        if (!model[path] || !isObject(model[path])) {
            model[path] = /^\d+$/.test(paths[i + 1]) ? [] : {};
        }
        model = model[path];
    }
    model[paths[paths.length - 1]] = clone(value);
}
/**
 * @param {?} field
 * @return {?}
 */
export function getFieldValue(field) {
    var e_1, _a;
    /** @type {?} */
    var model = field.parent.model;
    try {
        for (var _b = tslib_1.__values(getKeyPath(field)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var path = _c.value;
            if (!model) {
                return model;
            }
            model = model[path];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return model;
}
/**
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
export function reverseDeepMerge(dest) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.forEach((/**
     * @param {?} src
     * @return {?}
     */
    function (src) {
        for (var srcArg in src) {
            if (isNullOrUndefined(dest[srcArg]) || isBlankString(dest[srcArg])) {
                dest[srcArg] = clone(src[srcArg]);
            }
            else if (objAndSameType(dest[srcArg], src[srcArg])) {
                reverseDeepMerge(dest[srcArg], src[srcArg]);
            }
        }
    }));
    return dest;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isUndefined(value) {
    return value === undefined;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isBlankString(value) {
    return value === '';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFunction(value) {
    return typeof (value) === 'function';
}
/**
 * @param {?} obj1
 * @param {?} obj2
 * @return {?}
 */
export function objAndSameType(obj1, obj2) {
    return isObject(obj1) && isObject(obj2)
        && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)
        && !(Array.isArray(obj1) || Array.isArray(obj2));
}
/**
 * @param {?} x
 * @return {?}
 */
export function isObject(x) {
    return x != null && typeof x === 'object';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
/**
 * @param {?} value
 * @return {?}
 */
export function clone(value) {
    if (!isObject(value)
        || isObservable(value)
        || (value instanceof TemplateRef)
        || /* instanceof SafeHtmlImpl */ value.changingThisBreaksApplicationSecurity
        || ['RegExp', 'FileList', 'File', 'Blob'].indexOf(value.constructor.name) !== -1) {
        return value;
    }
    if (value instanceof Set) {
        return new Set(value);
    }
    if (value instanceof Map) {
        return new Map(value);
    }
    // https://github.com/moment/moment/blob/master/moment.js#L252
    if (value._isAMomentObject && isFunction(value.clone)) {
        return value.clone();
    }
    if (value instanceof AbstractControl) {
        return null;
    }
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
        return value.slice(0).map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return clone(v); }));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    /** @type {?} */
    var proto = Object.getPrototypeOf(value);
    /** @type {?} */
    var c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((/**
     * @param {?} newVal
     * @param {?} prop
     * @return {?}
     */
    function (newVal, prop) {
        /** @type {?} */
        var propDesc = Object.getOwnPropertyDescriptor(value, prop);
        if (propDesc.get) {
            Object.defineProperty(newVal, prop, propDesc);
        }
        else {
            newVal[prop] = clone(value[prop]);
        }
        return newVal;
    }), c);
}
/**
 * @param {?} field
 * @param {?} prop
 * @param {?} defaultValue
 * @return {?}
 */
export function defineHiddenProp(field, prop, defaultValue) {
    Object.defineProperty(field, prop, { enumerable: false, writable: true, configurable: true });
    field[prop] = defaultValue;
}
/**
 * @template T
 * @param {?} o
 * @param {?} prop
 * @param {?} setFn
 * @return {?}
 */
export function wrapProperty(o, prop, setFn) {
    if (!o._observers) {
        defineHiddenProp(o, '_observers', {});
    }
    if (!o._observers[prop]) {
        o._observers[prop] = [];
    }
    /** @type {?} */
    var fns = o._observers[prop];
    if (fns.indexOf(setFn) === -1) {
        fns.push(setFn);
        setFn({ currentValue: o[prop], firstChange: true });
        if (fns.length === 1) {
            defineHiddenProp(o, "___$" + prop, o[prop]);
            Object.defineProperty(o, prop, {
                configurable: true,
                get: (/**
                 * @return {?}
                 */
                function () { return o["___$" + prop]; }),
                set: (/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                function (currentValue) {
                    if (currentValue !== o["___$" + prop]) {
                        /** @type {?} */
                        var previousValue_1 = o["___$" + prop];
                        o["___$" + prop] = currentValue;
                        fns.forEach((/**
                         * @param {?} changeFn
                         * @return {?}
                         */
                        function (changeFn) { return changeFn({ previousValue: previousValue_1, currentValue: currentValue, firstChange: false }); }));
                    }
                }),
            });
        }
    }
    return (/**
     * @return {?}
     */
    function () { return fns.splice(fns.indexOf(setFn), 1); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRTVDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxJQUFTLEVBQUUsUUFBa0I7O1FBQzdELG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQy9ELElBQUksQ0FBQyxtQkFBbUI7OztJQUFHLGNBQU8sQ0FBQyxDQUFBLENBQUM7SUFDcEMsUUFBUSxFQUFFLENBQUM7SUFDWCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDakQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBYyxFQUFFLEtBQXdCLEVBQUUsS0FBb0I7SUFDdkYsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQzs7UUFDMUIsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJO0lBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUMzQixJQUFJLEdBQUcsVUFBVSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsSUFBSSxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztLQUNqRDtJQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFD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LEdBQUc7OztnQkFBRSxjQUFNLE9BQUEsQ0FBQyxDQUFDLFNBQU8sSUFBTSxDQUFDLEVBQWhCLENBQWdCLENBQUE7Z0JBQzNCLEdBQUc7Ozs7Z0JBQUUsVUFBQSxZQUFZO29CQUNmLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxTQUFPLElBQU0sQ0FBQyxFQUFFOzs0QkFDL0IsZUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFPLElBQU0sQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLFNBQU8sSUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO3dCQUNoQyxHQUFHLENBQUMsT0FBTzs7Ozt3QkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLGFBQWEsaUJBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBN0QsQ0FBNkQsRUFBQyxDQUFDO3FCQUN4RjtnQkFDSCxDQUFDLENBQUE7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGO0lBRUQ7OztJQUFPLGNBQU0sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLEVBQUM7QUFDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtbHkuZmllbGQuY29uZmlnJztcbmltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlVHJlZVZhbGlkaXR5Q2FsbChmb3JtOiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICBjb25zdCBfdXBkYXRlVHJlZVZhbGlkaXR5ID0gZm9ybS5fdXBkYXRlVHJlZVZhbGlkaXR5LmJpbmQoZm9ybSk7XG4gIGZvcm0uX3VwZGF0ZVRyZWVWYWxpZGl0eSA9ICgpID0+IHt9O1xuICBjYWxsYmFjaygpO1xuICBmb3JtLl91cGRhdGVUcmVlVmFsaWRpdHkgPSBfdXBkYXRlVHJlZVZhbGlkaXR5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRJZChmb3JtSWQ6IHN0cmluZywgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBpbmRleDogc3RyaW5nfG51bWJlcikge1xuICBpZiAoZmllbGQuaWQpIHJldHVybiBmaWVsZC5pZDtcbiAgbGV0IHR5cGUgPSBmaWVsZC50eXBlO1xuICBpZiAoIXR5cGUgJiYgZmllbGQudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfVxuICBpZiAoaXNGdW5jdGlvbih0eXBlKSkge1xuICAgIHR5cGUgPSAodHlwZSBhcyBhbnkpLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIHJldHVybiBbZm9ybUlkLCB0eXBlLCBmaWVsZC5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlQYXRoKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKTogc3RyaW5nW10ge1xuICBpZiAoIWZpZWxkLmtleSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qIFdlIHN0b3JlIHRoZSBrZXlQYXRoIGluIHRoZSBmaWVsZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBmcmVxdWVudGx5LiAqL1xuICBpZiAoIWZpZWxkLl9rZXlQYXRoIHx8IGZpZWxkLl9rZXlQYXRoLmtleSAhPT0gZmllbGQua2V5KSB7XG4gICAgbGV0IHBhdGg6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHR5cGVvZiBmaWVsZC5rZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBrZXkgPSBmaWVsZC5rZXkuaW5kZXhPZignWycpID09PSAtMVxuICAgICAgICA/IGZpZWxkLmtleVxuICAgICAgICA6IGZpZWxkLmtleS5yZXBsYWNlKC9cXFsoXFx3KylcXF0vZywgJy4kMScpO1xuICAgICAgcGF0aCA9IGtleS5pbmRleE9mKCcuJykgIT09IC0xID8ga2V5LnNwbGl0KCcuJykgOiBba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZmllbGQua2V5KSkge1xuICAgICAgcGF0aCA9IGZpZWxkLmtleS5zbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCA9IFtgJHtmaWVsZC5rZXl9YF07XG4gICAgfVxuXG4gICAgZmllbGQuX2tleVBhdGggPSB7IGtleTogZmllbGQua2V5LCBwYXRoIH07XG4gIH1cblxuICByZXR1cm4gZmllbGQuX2tleVBhdGgucGF0aC5zbGljZSgwKTtcbn1cblxuZXhwb3J0IGNvbnN0IEZPUk1MWV9WQUxJREFUT1JTID0gWydyZXF1aXJlZCcsICdwYXR0ZXJuJywgJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnLCAnbWluJywgJ21heCddO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduRmllbGRWYWx1ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSwgdmFsdWU6IGFueSkge1xuICBsZXQgcGF0aHMgPSBnZXRLZXlQYXRoKGZpZWxkKTtcbiAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCByb290ID0gZmllbGQ7XG4gIHdoaWxlIChyb290LnBhcmVudCkge1xuICAgIHJvb3QgPSByb290LnBhcmVudDtcbiAgICBwYXRocyA9IFsuLi5nZXRLZXlQYXRoKHJvb3QpLCAuLi5wYXRoc107XG4gIH1cblxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBmaWVsZC5yZXNldE9uSGlkZSkge1xuICAgIGNvbnN0IGsgPSBwYXRocy5wb3AoKTtcbiAgICBjb25zdCBtID0gcGF0aHMucmVkdWNlKChtb2RlbCwgcGF0aCkgPT4gbW9kZWxbcGF0aF0gfHwge30sIHJvb3QubW9kZWwpO1xuICAgIGRlbGV0ZSBtW2tdO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzc2lnbk1vZGVsVmFsdWUocm9vdC5tb2RlbCwgcGF0aHMsIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbk1vZGVsVmFsdWUobW9kZWw6IGFueSwgcGF0aHM6IHN0cmluZ1tdLCB2YWx1ZTogYW55KSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgKHBhdGhzLmxlbmd0aCAtIDEpOyBpKyspIHtcbiAgICBjb25zdCBwYXRoID0gcGF0aHNbaV07XG4gICAgaWYgKCFtb2RlbFtwYXRoXSB8fCAhaXNPYmplY3QobW9kZWxbcGF0aF0pKSB7XG4gICAgICBtb2RlbFtwYXRoXSA9IC9eXFxkKyQvLnRlc3QocGF0aHNbaSArIDFdKSA/IFtdIDoge307XG4gICAgfVxuXG4gICAgbW9kZWwgPSBtb2RlbFtwYXRoXTtcbiAgfVxuXG4gIG1vZGVsW3BhdGhzW3BhdGhzLmxlbmd0aCAtIDFdXSA9IGNsb25lKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkVmFsdWUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogYW55IHtcbiAgbGV0IG1vZGVsID0gZmllbGQucGFyZW50Lm1vZGVsO1xuICBmb3IgKGNvbnN0IHBhdGggb2YgZ2V0S2V5UGF0aChmaWVsZCkpIHtcbiAgICBpZiAoIW1vZGVsKSB7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICAgIG1vZGVsID0gbW9kZWxbcGF0aF07XG4gIH1cblxuICByZXR1cm4gbW9kZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKGRlc3Q6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgYXJncy5mb3JFYWNoKHNyYyA9PiB7XG4gICAgZm9yIChsZXQgc3JjQXJnIGluIHNyYykge1xuICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGRlc3Rbc3JjQXJnXSkgfHwgaXNCbGFua1N0cmluZyhkZXN0W3NyY0FyZ10pKSB7XG4gICAgICAgIGRlc3Rbc3JjQXJnXSA9IGNsb25lKHNyY1tzcmNBcmddKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtzcmNBcmddLCBzcmNbc3JjQXJnXSkpIHtcbiAgICAgICAgcmV2ZXJzZURlZXBNZXJnZShkZXN0W3NyY0FyZ10sIHNyY1tzcmNBcmddKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFua1N0cmluZyh2YWx1ZTogYW55KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlOiBhbnkpIHtcbiAgcmV0dXJuIHR5cGVvZih2YWx1ZSkgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxOiBhbnksIG9iajI6IGFueSkge1xuICByZXR1cm4gaXNPYmplY3Qob2JqMSkgJiYgaXNPYmplY3Qob2JqMilcbiAgICAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKVxuICAgICYmICEoQXJyYXkuaXNBcnJheShvYmoxKSB8fCBBcnJheS5pc0FycmF5KG9iajIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHg6IGFueSkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IG9iaiBpcyBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gISFvYmogJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUodmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChcbiAgICAhaXNPYmplY3QodmFsdWUpXG4gICAgfHwgaXNPYnNlcnZhYmxlKHZhbHVlKVxuICAgIHx8ICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKVxuICAgIHx8IC8qIGluc3RhbmNlb2YgU2FmZUh0bWxJbXBsICovIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHlcbiAgICB8fCBbJ1JlZ0V4cCcsICdGaWxlTGlzdCcsICdGaWxlJywgJ0Jsb2InXS5pbmRleE9mKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpICE9PSAtMVxuICApIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICByZXR1cm4gbmV3IFNldCh2YWx1ZSk7XG4gIH1cblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICByZXR1cm4gbmV3IE1hcCh2YWx1ZSk7XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL21hc3Rlci9tb21lbnQuanMjTDI1MlxuICBpZiAodmFsdWUuX2lzQU1vbWVudE9iamVjdCAmJiBpc0Z1bmN0aW9uKHZhbHVlLmNsb25lKSkge1xuICAgIHJldHVybiB2YWx1ZS5jbG9uZSgpO1xuICB9XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCkubWFwKHYgPT4gY2xvbmUodikpO1xuICB9XG5cbiAgLy8gYmVzdCB3YXkgdG8gY2xvbmUgYSBqcyBvYmplY3QgbWF5YmVcbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDE0NzQ5ODYvaG93LXRvLWNsb25lLWEtamF2YXNjcmlwdC1lczYtY2xhc3MtaW5zdGFuY2VcbiAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBsZXQgYyA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICBjID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKGMsIHByb3RvKTtcbiAgLy8gbmVlZCB0byBtYWtlIGEgZGVlcCBjb3B5IHNvIHdlIGRvbnQgdXNlIE9iamVjdC5hc3NpZ25cbiAgLy8gYWxzbyBPYmplY3QuYXNzaWduIHdvbnQgY29weSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGV4YWN0bHlcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5yZWR1Y2UoKG5ld1ZhbCwgcHJvcCkgPT4ge1xuICAgIGNvbnN0IHByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwgcHJvcCk7XG4gICAgaWYgKHByb3BEZXNjLmdldCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld1ZhbCwgcHJvcCwgcHJvcERlc2MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWxbcHJvcF0gPSBjbG9uZSh2YWx1ZVtwcm9wXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1ZhbDtcbiAgfSwgYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVIaWRkZW5Qcm9wKGZpZWxkOiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBhbnkpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZpZWxkLCBwcm9wLCB7IGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICBmaWVsZFtwcm9wXSA9IGRlZmF1bHRWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9wZXJ0eTxUID0gYW55PihcbiAgbzogYW55LFxuICBwcm9wOiBzdHJpbmcsXG4gIHNldEZuOiAoY2hhbmdlOiB7Y3VycmVudFZhbHVlOiBULCBwcmV2aW91c1ZhbHVlPzogVCwgZmlyc3RDaGFuZ2U6IGJvb2xlYW59KSA9PiB2b2lkLFxuKSB7XG4gIGlmICghby5fb2JzZXJ2ZXJzKSB7XG4gICAgZGVmaW5lSGlkZGVuUHJvcChvLCAnX29ic2VydmVycycsIHt9KTtcbiAgfVxuXG4gIGlmICghby5fb2JzZXJ2ZXJzW3Byb3BdKSB7XG4gICAgby5fb2JzZXJ2ZXJzW3Byb3BdID0gW107XG4gIH1cblxuICBsZXQgZm5zOiB0eXBlb2Ygc2V0Rm5bXSA9IG8uX29ic2VydmVyc1twcm9wXTtcbiAgaWYgKGZucy5pbmRleE9mKHNldEZuKSA9PT0gLTEpIHtcbiAgICBmbnMucHVzaChzZXRGbik7XG4gICAgc2V0Rm4oeyBjdXJyZW50VmFsdWU6IG9bcHJvcF0sIGZpcnN0Q2hhbmdlOiB0cnVlIH0pO1xuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG8sIGBfX18kJHtwcm9wfWAsIG9bcHJvcF0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIHByb3AsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IG9bYF9fXyQke3Byb3B9YF0sXG4gICAgICAgIHNldDogY3VycmVudFZhbHVlID0+IHtcbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9PSBvW2BfX18kJHtwcm9wfWBdKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gb1tgX19fJCR7cHJvcH1gXTtcbiAgICAgICAgICAgIG9bYF9fXyQke3Byb3B9YF0gPSBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBmbnMuZm9yRWFjaChjaGFuZ2VGbiA9PiBjaGFuZ2VGbih7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSwgZmlyc3RDaGFuZ2U6IGZhbHNlIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKCkgPT4gZm5zLnNwbGljZShmbnMuaW5kZXhPZihzZXRGbiksIDEpO1xufVxuIl19