/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const _updateTreeValidity = form._updateTreeValidity.bind(form);
    form._updateTreeValidity = (/**
     * @return {?}
     */
    () => { });
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
    let type = field.type;
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
        let path = [];
        if (typeof field.key === 'string') {
            /** @type {?} */
            const key = field.key.indexOf('[') === -1
                ? field.key
                : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = [`${field.key}`];
        }
        field._keyPath = { key: field.key, path };
    }
    return field._keyPath.path.slice(0);
}
/** @type {?} */
export const FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
/**
 * @param {?} field
 * @param {?} value
 * @return {?}
 */
export function assignFieldValue(field, value) {
    /** @type {?} */
    let paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    /** @type {?} */
    let root = field;
    while (root.parent) {
        root = root.parent;
        paths = [...getKeyPath(root), ...paths];
    }
    if (value === undefined && field.resetOnHide) {
        /** @type {?} */
        const k = paths.pop();
        /** @type {?} */
        const m = paths.reduce((/**
         * @param {?} model
         * @param {?} path
         * @return {?}
         */
        (model, path) => model[path] || {}), root.model);
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
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
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
    /** @type {?} */
    let model = field.parent.model;
    for (const path of getKeyPath(field)) {
        if (!model) {
            return model;
        }
        model = model[path];
    }
    return model;
}
/**
 * @param {?} dest
 * @param {...?} args
 * @return {?}
 */
export function reverseDeepMerge(dest, ...args) {
    args.forEach((/**
     * @param {?} src
     * @return {?}
     */
    src => {
        for (let srcArg in src) {
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
        v => clone(v)));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    /** @type {?} */
    const proto = Object.getPrototypeOf(value);
    /** @type {?} */
    let c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((/**
     * @param {?} newVal
     * @param {?} prop
     * @return {?}
     */
    (newVal, prop) => {
        /** @type {?} */
        const propDesc = Object.getOwnPropertyDescriptor(value, prop);
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
    let fns = o._observers[prop];
    if (fns.indexOf(setFn) === -1) {
        fns.push(setFn);
        setFn({ currentValue: o[prop], firstChange: true });
        if (fns.length === 1) {
            defineHiddenProp(o, `___$${prop}`, o[prop]);
            Object.defineProperty(o, prop, {
                configurable: true,
                get: (/**
                 * @return {?}
                 */
                () => o[`___$${prop}`]),
                set: (/**
                 * @param {?} currentValue
                 * @return {?}
                 */
                currentValue => {
                    if (currentValue !== o[`___$${prop}`]) {
                        /** @type {?} */
                        const previousValue = o[`___$${prop}`];
                        o[`___$${prop}`] = currentValue;
                        fns.forEach((/**
                         * @param {?} changeFn
                         * @return {?}
                         */
                        changeFn => changeFn({ previousValue, currentValue, firstChange: false })));
                    }
                }),
            });
        }
    }
    return (/**
     * @return {?}
     */
    () => fns.splice(fns.indexOf(setFn), 1));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFFNUMsTUFBTSxVQUFVLHVCQUF1QixDQUFDLElBQVMsRUFBRSxRQUFrQjs7VUFDN0QsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDL0QsSUFBSSxDQUFDLG1CQUFtQjs7O0lBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBLENBQUM7SUFDcEMsUUFBUSxFQUFFLENBQUM7SUFDWCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDakQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBYyxFQUFFLEtBQXdCLEVBQUUsS0FBb0I7SUFDdkYsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQzs7UUFDMUIsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJO0lBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUMzQixJQUFJLEdBQUcsVUFBVSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsSUFBSSxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztLQUNqRDtJQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMs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QUMsQ0FBQTtnQkFDM0IsR0FBRzs7OztnQkFBRSxZQUFZLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRTs7OEJBQy9CLGFBQWEsR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUM7d0JBQ2hDLEdBQUcsQ0FBQyxPQUFPOzs7O3dCQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO3FCQUN4RjtnQkFDSCxDQUFDLENBQUE7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGO0lBRUQ7OztJQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVUcmVlVmFsaWRpdHlDYWxsKGZvcm06IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGNvbnN0IF91cGRhdGVUcmVlVmFsaWRpdHkgPSBmb3JtLl91cGRhdGVUcmVlVmFsaWRpdHkuYmluZChmb3JtKTtcbiAgZm9ybS5fdXBkYXRlVHJlZVZhbGlkaXR5ID0gKCkgPT4ge307XG4gIGNhbGxiYWNrKCk7XG4gIGZvcm0uX3VwZGF0ZVRyZWVWYWxpZGl0eSA9IF91cGRhdGVUcmVlVmFsaWRpdHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZDogc3RyaW5nLCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGluZGV4OiBzdHJpbmd8bnVtYmVyKSB7XG4gIGlmIChmaWVsZC5pZCkgcmV0dXJuIGZpZWxkLmlkO1xuICBsZXQgdHlwZSA9IGZpZWxkLnR5cGU7XG4gIGlmICghdHlwZSAmJiBmaWVsZC50ZW1wbGF0ZSkge1xuICAgIHR5cGUgPSAndGVtcGxhdGUnO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHR5cGUpKSB7XG4gICAgdHlwZSA9ICh0eXBlIGFzIGFueSkucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIGZpZWxkLmtleSwgaW5kZXhdLmpvaW4oJ18nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleVBhdGgoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpOiBzdHJpbmdbXSB7XG4gIGlmICghZmllbGQua2V5KSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyogV2Ugc3RvcmUgdGhlIGtleVBhdGggaW4gdGhlIGZpZWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGZyZXF1ZW50bHkuICovXG4gIGlmICghZmllbGQuX2tleVBhdGggfHwgZmllbGQuX2tleVBhdGgua2V5ICE9PSBmaWVsZC5rZXkpIHtcbiAgICBsZXQgcGF0aDogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodHlwZW9mIGZpZWxkLmtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZpZWxkLmtleS5pbmRleE9mKCdbJykgPT09IC0xXG4gICAgICAgID8gZmllbGQua2V5XG4gICAgICAgIDogZmllbGQua2V5LnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7XG4gICAgICBwYXRoID0ga2V5LmluZGV4T2YoJy4nKSAhPT0gLTEgPyBrZXkuc3BsaXQoJy4nKSA6IFtrZXldO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmaWVsZC5rZXkpKSB7XG4gICAgICBwYXRoID0gZmllbGQua2V5LnNsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gW2Ake2ZpZWxkLmtleX1gXTtcbiAgICB9XG5cbiAgICBmaWVsZC5fa2V5UGF0aCA9IHsga2V5OiBmaWVsZC5rZXksIHBhdGggfTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZC5fa2V5UGF0aC5wYXRoLnNsaWNlKDApO1xufVxuXG5leHBvcnQgY29uc3QgRk9STUxZX1ZBTElEQVRPUlMgPSBbJ3JlcXVpcmVkJywgJ3BhdHRlcm4nLCAnbWluTGVuZ3RoJywgJ21heExlbmd0aCcsICdtaW4nLCAnbWF4J107XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25GaWVsZFZhbHVlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCB2YWx1ZTogYW55KSB7XG4gIGxldCBwYXRocyA9IGdldEtleVBhdGgoZmllbGQpO1xuICBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHJvb3QgPSBmaWVsZDtcbiAgd2hpbGUgKHJvb3QucGFyZW50KSB7XG4gICAgcm9vdCA9IHJvb3QucGFyZW50O1xuICAgIHBhdGhzID0gWy4uLmdldEtleVBhdGgocm9vdCksIC4uLnBhdGhzXTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGZpZWxkLnJlc2V0T25IaWRlKSB7XG4gICAgY29uc3QgayA9IHBhdGhzLnBvcCgpO1xuICAgIGNvbnN0IG0gPSBwYXRocy5yZWR1Y2UoKG1vZGVsLCBwYXRoKSA9PiBtb2RlbFtwYXRoXSB8fCB7fSwgcm9vdC5tb2RlbCk7XG4gICAgZGVsZXRlIG1ba107XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXNzaWduTW9kZWxWYWx1ZShyb290Lm1vZGVsLCBwYXRocywgdmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduTW9kZWxWYWx1ZShtb2RlbDogYW55LCBwYXRoczogc3RyaW5nW10sIHZhbHVlOiBhbnkpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAocGF0aHMubGVuZ3RoIC0gMSk7IGkrKykge1xuICAgIGNvbnN0IHBhdGggPSBwYXRoc1tpXTtcbiAgICBpZiAoIW1vZGVsW3BhdGhdIHx8ICFpc09iamVjdChtb2RlbFtwYXRoXSkpIHtcbiAgICAgIG1vZGVsW3BhdGhdID0gL15cXGQrJC8udGVzdChwYXRoc1tpICsgMV0pID8gW10gOiB7fTtcbiAgICB9XG5cbiAgICBtb2RlbCA9IG1vZGVsW3BhdGhdO1xuICB9XG5cbiAgbW9kZWxbcGF0aHNbcGF0aHMubGVuZ3RoIC0gMV1dID0gY2xvbmUodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRWYWx1ZShmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBhbnkge1xuICBsZXQgbW9kZWwgPSBmaWVsZC5wYXJlbnQubW9kZWw7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBnZXRLZXlQYXRoKGZpZWxkKSkge1xuICAgIGlmICghbW9kZWwpIHtcbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9XG4gICAgbW9kZWwgPSBtb2RlbFtwYXRoXTtcbiAgfVxuXG4gIHJldHVybiBtb2RlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VEZWVwTWVyZ2UoZGVzdDogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICBhcmdzLmZvckVhY2goc3JjID0+IHtcbiAgICBmb3IgKGxldCBzcmNBcmcgaW4gc3JjKSB7XG4gICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoZGVzdFtzcmNBcmddKSB8fCBpc0JsYW5rU3RyaW5nKGRlc3Rbc3JjQXJnXSkpIHtcbiAgICAgICAgZGVzdFtzcmNBcmddID0gY2xvbmUoc3JjW3NyY0FyZ10pO1xuICAgICAgfSBlbHNlIGlmIChvYmpBbmRTYW1lVHlwZShkZXN0W3NyY0FyZ10sIHNyY1tzcmNBcmddKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3Rbc3JjQXJnXSwgc3JjW3NyY0FyZ10pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQodmFsdWU6IGFueSkge1xuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgcmV0dXJuIHZhbHVlID09PSAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWU6IGFueSkge1xuICByZXR1cm4gdHlwZW9mKHZhbHVlKSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iakFuZFNhbWVUeXBlKG9iajE6IGFueSwgb2JqMjogYW55KSB7XG4gIHJldHVybiBpc09iamVjdChvYmoxKSAmJiBpc09iamVjdChvYmoyKVxuICAgICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoxKSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajIpXG4gICAgJiYgIShBcnJheS5pc0FycmF5KG9iajEpIHx8IEFycmF5LmlzQXJyYXkob2JqMikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QoeDogYW55KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogb2JqIGlzIFByb21pc2U8YW55PiB7XG4gIHJldHVybiAhIW9iaiAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSh2YWx1ZTogYW55KTogYW55IHtcbiAgaWYgKFxuICAgICFpc09iamVjdCh2YWx1ZSlcbiAgICB8fCBpc09ic2VydmFibGUodmFsdWUpXG4gICAgfHwgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpXG4gICAgfHwgLyogaW5zdGFuY2VvZiBTYWZlSHRtbEltcGwgKi8gdmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eVxuICAgIHx8IFsnUmVnRXhwJywgJ0ZpbGVMaXN0JywgJ0ZpbGUnLCAnQmxvYiddLmluZGV4T2YodmFsdWUuY29uc3RydWN0b3IubmFtZSkgIT09IC0xXG4gICkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNldCkge1xuICAgIHJldHVybiBuZXcgU2V0KHZhbHVlKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgIHJldHVybiBuZXcgTWFwKHZhbHVlKTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2Jsb2IvbWFzdGVyL21vbWVudC5qcyNMMjUyXG4gIGlmICh2YWx1ZS5faXNBTW9tZW50T2JqZWN0ICYmIGlzRnVuY3Rpb24odmFsdWUuY2xvbmUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNsb25lKCk7XG4gIH1cblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwKS5tYXAodiA9PiBjbG9uZSh2KSk7XG4gIH1cblxuICAvLyBiZXN0IHdheSB0byBjbG9uZSBhIGpzIG9iamVjdCBtYXliZVxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MTQ3NDk4Ni9ob3ctdG8tY2xvbmUtYS1qYXZhc2NyaXB0LWVzNi1jbGFzcy1pbnN0YW5jZVxuICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gIGxldCBjID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gIGMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YoYywgcHJvdG8pO1xuICAvLyBuZWVkIHRvIG1ha2UgYSBkZWVwIGNvcHkgc28gd2UgZG9udCB1c2UgT2JqZWN0LmFzc2lnblxuICAvLyBhbHNvIE9iamVjdC5hc3NpZ24gd29udCBjb3B5IHByb3BlcnR5IGRlc2NyaXB0b3IgZXhhY3RseVxuICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLnJlZHVjZSgobmV3VmFsLCBwcm9wKSA9PiB7XG4gICAgY29uc3QgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBwcm9wKTtcbiAgICBpZiAocHJvcERlc2MuZ2V0KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3VmFsLCBwcm9wLCBwcm9wRGVzYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbFtwcm9wXSA9IGNsb25lKHZhbHVlW3Byb3BdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3VmFsO1xuICB9LCBjKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUhpZGRlblByb3AoZmllbGQ6IGFueSwgcHJvcDogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmllbGQsIHByb3AsIHsgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gIGZpZWxkW3Byb3BdID0gZGVmYXVsdFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb3BlcnR5PFQgPSBhbnk+KFxuICBvOiBhbnksXG4gIHByb3A6IHN0cmluZyxcbiAgc2V0Rm46IChjaGFuZ2U6IHtjdXJyZW50VmFsdWU6IFQsIHByZXZpb3VzVmFsdWU/OiBULCBmaXJzdENoYW5nZTogYm9vbGVhbn0pID0+IHZvaWQsXG4pIHtcbiAgaWYgKCFvLl9vYnNlcnZlcnMpIHtcbiAgICBkZWZpbmVIaWRkZW5Qcm9wKG8sICdfb2JzZXJ2ZXJzJywge30pO1xuICB9XG5cbiAgaWYgKCFvLl9vYnNlcnZlcnNbcHJvcF0pIHtcbiAgICBvLl9vYnNlcnZlcnNbcHJvcF0gPSBbXTtcbiAgfVxuXG4gIGxldCBmbnM6IHR5cGVvZiBzZXRGbltdID0gby5fb2JzZXJ2ZXJzW3Byb3BdO1xuICBpZiAoZm5zLmluZGV4T2Yoc2V0Rm4pID09PSAtMSkge1xuICAgIGZucy5wdXNoKHNldEZuKTtcbiAgICBzZXRGbih7IGN1cnJlbnRWYWx1ZTogb1twcm9wXSwgZmlyc3RDaGFuZ2U6IHRydWUgfSk7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3AobywgYF9fXyQke3Byb3B9YCwgb1twcm9wXSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgcHJvcCwge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4gb1tgX19fJCR7cHJvcH1gXSxcbiAgICAgICAgc2V0OiBjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IG9bYF9fXyQke3Byb3B9YF0pIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBvW2BfX18kJHtwcm9wfWBdO1xuICAgICAgICAgICAgb1tgX19fJCR7cHJvcH1gXSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGZucy5mb3JFYWNoKGNoYW5nZUZuID0+IGNoYW5nZUZuKHsgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlLCBmaXJzdENoYW5nZTogZmFsc2UgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoKSA9PiBmbnMuc3BsaWNlKGZucy5pbmRleE9mKHNldEZuKSwgMSk7XG59XG4iXX0=