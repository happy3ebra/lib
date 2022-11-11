/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { getKeyPath, getFieldValue, isNullOrUndefined, defineHiddenProp, wrapProperty } from '../../utils';
/**
 * @param {?} field
 * @param {?=} emitEvent
 * @return {?}
 */
export function unregisterControl(field, emitEvent) {
    if (emitEvent === void 0) { emitEvent = false; }
    /** @type {?} */
    var control = field.formControl;
    /** @type {?} */
    var fieldIndex = control['_fields'] ? control['_fields'].indexOf(field) : -1;
    if (fieldIndex !== -1) {
        control['_fields'].splice(fieldIndex, 1);
    }
    /** @type {?} */
    var form = (/** @type {?} */ (control.parent));
    if (!form) {
        return;
    }
    /** @type {?} */
    var opts = { emitEvent: emitEvent };
    if (form instanceof FormArray) {
        /** @type {?} */
        var key_1 = form.controls.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c === control; }));
        if (key_1 !== -1) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            function () { return form.removeAt(key_1); }));
        }
    }
    else if (form instanceof FormGroup) {
        /** @type {?} */
        var paths = getKeyPath(field);
        /** @type {?} */
        var key_2 = paths[paths.length - 1];
        if (form.get([key_2]) === control) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            function () { return form.removeControl(key_2); }));
        }
    }
    control.setParent(null);
}
/**
 * @param {?} field
 * @return {?}
 */
export function findControl(field) {
    if (field.formControl) {
        return field.formControl;
    }
    if (field['shareFormControl'] === false) {
        return null;
    }
    /** @type {?} */
    var form = (/** @type {?} */ (field.parent.formControl));
    return form ? form.get(getKeyPath(field)) : null;
}
/**
 * @param {?} field
 * @param {?=} control
 * @param {?=} emitEvent
 * @return {?}
 */
export function registerControl(field, control, emitEvent) {
    if (emitEvent === void 0) { emitEvent = false; }
    control = control || field.formControl;
    if (!control['_fields']) {
        defineHiddenProp(control, '_fields', []);
    }
    if (control['_fields'].indexOf(field) === -1) {
        control['_fields'].push(field);
    }
    if (!field.formControl && control) {
        defineHiddenProp(field, 'formControl', control);
        control.setValidators(null);
        control.setAsyncValidators(null);
        field.templateOptions.disabled = !!field.templateOptions.disabled;
        wrapProperty(field.templateOptions, 'disabled', (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var firstChange = _a.firstChange, currentValue = _a.currentValue;
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        }));
        if (control.registerOnDisabledChange) {
            control.registerOnDisabledChange((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                field.templateOptions['___$disabled'] = value;
                // TODO remove in V6
                field.options && field.options._markForCheck(field);
            }));
        }
    }
    /** @type {?} */
    var parent = (/** @type {?} */ (field.parent.formControl));
    if (!parent || !field.key) {
        return;
    }
    /** @type {?} */
    var paths = getKeyPath(field);
    /** @type {?} */
    var value = getFieldValue(field);
    if (!(isNullOrUndefined(control.value) && isNullOrUndefined(value))
        && control.value !== value
        && control instanceof FormControl) {
        control.patchValue(value);
    }
    var _loop_1 = function (i) {
        /** @type {?} */
        var path = paths[i];
        if (!parent.get([path])) {
            updateControl(parent, { emitEvent: emitEvent }, (/**
             * @return {?}
             */
            function () { return parent.setControl(path, new FormGroup({})); }));
        }
        parent = (/** @type {?} */ (parent.get([path])));
    };
    for (var i = 0; i < (paths.length - 1); i++) {
        _loop_1(i);
    }
    /** @type {?} */
    var key = paths[paths.length - 1];
    if (!field._hide && parent.get([key]) !== control) {
        updateControl(parent, { emitEvent: emitEvent }, (/**
         * @return {?}
         */
        function () { return parent.setControl(key, control); }));
    }
}
/**
 * @param {?} c
 * @param {?=} onlySelf
 * @return {?}
 */
export function updateValidity(c, onlySelf) {
    if (onlySelf === void 0) { onlySelf = false; }
    /** @type {?} */
    var status = c.status;
    /** @type {?} */
    var value = c.value;
    c.updateValueAndValidity({ emitEvent: false, onlySelf: onlySelf });
    if (status !== c.status) {
        ((/** @type {?} */ (c.statusChanges))).emit(c.status);
    }
    if (value !== c.value) {
        ((/** @type {?} */ (c.valueChanges))).emit(c.value);
    }
}
/**
 * @param {?} form
 * @param {?} opts
 * @param {?} action
 * @return {?}
 */
function updateControl(form, opts, action) {
    /**
     *  workaround for https://github.com/angular/angular/issues/27679
     */
    if (form instanceof FormGroup && !form['__patchForEachChild']) {
        defineHiddenProp(form, '__patchForEachChild', true);
        ((/** @type {?} */ (form)))._forEachChild = (/**
         * @param {?} cb
         * @return {?}
         */
        function (cb) {
            Object
                .keys(form.controls)
                .forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return form.controls[k] && cb(form.controls[k], k); }));
        });
    }
    /**
     * workaround for https://github.com/angular/angular/issues/20439
     * @type {?}
     */
    var updateValueAndValidity = form.updateValueAndValidity.bind(form);
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = (/**
         * @param {?} opts
         * @return {?}
         */
        function (opts) {
            updateValueAndValidity(tslib_1.__assign({}, (opts || {}), { emitEvent: false }));
        });
    }
    action();
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = updateValueAndValidity;
    }
}
/**
 * @param {?} form
 * @return {?}
 */
export function clearControl(form) {
    form['_fields'] && delete form['_fields'];
    form.setValidators(null);
    form.setAsyncValidators(null);
    if (form instanceof FormGroup || form instanceof FormArray) {
        Object.keys(form.controls)
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return clearControl(form.controls[k]); }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2V4dGVuc2lvbnMvZmllbGQtZm9ybS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRixPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQUkzRyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBd0IsRUFBRSxTQUFpQjtJQUFqQiwwQkFBQSxFQUFBLGlCQUFpQjs7UUFDckUsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXOztRQUMzQixVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDckIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDMUM7O1FBRUssSUFBSSxHQUFHLG1CQUFBLE9BQU8sQ0FBQyxNQUFNLEVBQXlCO0lBQ3BELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPO0tBQ1I7O1FBRUssSUFBSSxHQUFHLEVBQUUsU0FBUyxXQUFBLEVBQUU7SUFDMUIsSUFBSSxJQUFJLFlBQVksU0FBUyxFQUFFOztZQUN2QixLQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssT0FBTyxFQUFiLENBQWEsRUFBQztRQUN2RCxJQUFJLEtBQUcsS0FB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QUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksSUFBSSxZQUFZLFNBQVMsSUFBSSxJQUFJLFlBQVksU0FBUyxFQUFFO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN2QixPQUFPOzs7O1FBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE5QixDQUE4QixFQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2NvcmUnO1xuaW1wb3J0IHsgZ2V0S2V5UGF0aCwgZ2V0RmllbGRWYWx1ZSwgaXNOdWxsT3JVbmRlZmluZWQsIGRlZmluZUhpZGRlblByb3AsIHdyYXBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyQ29udHJvbChmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGVtaXRFdmVudCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNvbnRyb2wgPSBmaWVsZC5mb3JtQ29udHJvbDtcbiAgY29uc3QgZmllbGRJbmRleCA9IGNvbnRyb2xbJ19maWVsZHMnXSA/IGNvbnRyb2xbJ19maWVsZHMnXS5pbmRleE9mKGZpZWxkKSA6IC0xO1xuICBpZiAoZmllbGRJbmRleCAhPT0gLTEpIHtcbiAgICBjb250cm9sWydfZmllbGRzJ10uc3BsaWNlKGZpZWxkSW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGNvbnRyb2wucGFyZW50IGFzIEZvcm1BcnJheSB8IEZvcm1Hcm91cDtcbiAgaWYgKCFmb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IHsgZW1pdEV2ZW50IH07XG4gIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgY29uc3Qga2V5ID0gZm9ybS5jb250cm9scy5maW5kSW5kZXgoYyA9PiBjID09PSBjb250cm9sKTtcbiAgICBpZiAoa2V5ICE9PSAtMSkge1xuICAgICAgdXBkYXRlQ29udHJvbChmb3JtLCBvcHRzLCAoKSA9PiBmb3JtLnJlbW92ZUF0KGtleSkpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XG4gICAgY29uc3QgcGF0aHMgPSBnZXRLZXlQYXRoKGZpZWxkKTtcbiAgICBjb25zdCBrZXkgPSBwYXRoc1twYXRocy5sZW5ndGggLSAxXTtcbiAgICBpZiAoZm9ybS5nZXQoW2tleV0pID09PSBjb250cm9sKSB7XG4gICAgICB1cGRhdGVDb250cm9sKGZvcm0sIG9wdHMsICgpID0+IGZvcm0ucmVtb3ZlQ29udHJvbChrZXkpKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sLnNldFBhcmVudChudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb250cm9sKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IEFic3RyYWN0Q29udHJvbCB7XG4gIGlmIChmaWVsZC5mb3JtQ29udHJvbCkge1xuICAgIHJldHVybiBmaWVsZC5mb3JtQ29udHJvbDtcbiAgfVxuXG4gIGlmIChmaWVsZFsnc2hhcmVGb3JtQ29udHJvbCddID09PSBmYWxzZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbCBhcyBGb3JtR3JvdXA7XG5cbiAgcmV0dXJuIGZvcm0gPyBmb3JtLmdldChnZXRLZXlQYXRoKGZpZWxkKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb250cm9sKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBjb250cm9sPzogYW55LCBlbWl0RXZlbnQgPSBmYWxzZSkge1xuICBjb250cm9sID0gY29udHJvbCB8fCBmaWVsZC5mb3JtQ29udHJvbDtcbiAgaWYgKCFjb250cm9sWydfZmllbGRzJ10pIHtcbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGNvbnRyb2wsICdfZmllbGRzJywgW10pO1xuICB9XG4gIGlmIChjb250cm9sWydfZmllbGRzJ10uaW5kZXhPZihmaWVsZCkgPT09IC0xKSB7XG4gICAgY29udHJvbFsnX2ZpZWxkcyddLnB1c2goZmllbGQpO1xuICB9XG5cbiAgaWYgKCFmaWVsZC5mb3JtQ29udHJvbCAmJiBjb250cm9sKSB7XG4gICAgZGVmaW5lSGlkZGVuUHJvcChmaWVsZCwgJ2Zvcm1Db250cm9sJywgY29udHJvbCk7XG4gICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKG51bGwpO1xuICAgIGNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKG51bGwpO1xuXG4gICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkID0gISFmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQ7XG4gICAgd3JhcFByb3BlcnR5KGZpZWxkLnRlbXBsYXRlT3B0aW9ucywgJ2Rpc2FibGVkJywgKHsgZmlyc3RDaGFuZ2UsIGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICBpZiAoIWZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIGN1cnJlbnRWYWx1ZSA/IGZpZWxkLmZvcm1Db250cm9sLmRpc2FibGUoKSA6IGZpZWxkLmZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjb250cm9sLnJlZ2lzdGVyT25EaXNhYmxlZENoYW5nZSkge1xuICAgICAgY29udHJvbC5yZWdpc3Rlck9uRGlzYWJsZWRDaGFuZ2UoXG4gICAgICAgICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9uc1snX19fJGRpc2FibGVkJ10gPSB2YWx1ZTtcbiAgICAgICAgICAvLyBUT0RPIHJlbW92ZSBpbiBWNlxuICAgICAgICAgIGZpZWxkLm9wdGlvbnMgJiYgZmllbGQub3B0aW9ucy5fbWFya0ZvckNoZWNrKGZpZWxkKTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHBhcmVudCA9IGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbCBhcyBGb3JtR3JvdXA7XG4gIGlmICghcGFyZW50IHx8ICFmaWVsZC5rZXkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXRocyA9IGdldEtleVBhdGgoZmllbGQpO1xuICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZmllbGQpO1xuICBpZiAoXG4gICAgIShpc051bGxPclVuZGVmaW5lZChjb250cm9sLnZhbHVlKSAmJiBpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpXG4gICAgJiYgY29udHJvbC52YWx1ZSAhPT0gdmFsdWVcbiAgICAmJiBjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xcbiAgKSB7XG4gICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgKHBhdGhzLmxlbmd0aCAtIDEpOyBpKyspIHtcbiAgICBjb25zdCBwYXRoID0gcGF0aHNbaV07XG4gICAgaWYgKCFwYXJlbnQuZ2V0KFtwYXRoXSkpIHtcbiAgICAgIHVwZGF0ZUNvbnRyb2woXG4gICAgICAgIHBhcmVudCxcbiAgICAgICAgeyBlbWl0RXZlbnQgfSxcbiAgICAgICAgKCkgPT4gcGFyZW50LnNldENvbnRyb2wocGF0aCwgbmV3IEZvcm1Hcm91cCh7fSkpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBwYXJlbnQgPSA8Rm9ybUdyb3VwPiBwYXJlbnQuZ2V0KFtwYXRoXSk7XG4gIH1cblxuICBjb25zdCBrZXkgPSBwYXRoc1twYXRocy5sZW5ndGggLSAxXTtcbiAgaWYgKCFmaWVsZC5faGlkZSAmJiBwYXJlbnQuZ2V0KFtrZXldKSAhPT0gY29udHJvbCkge1xuICAgIHVwZGF0ZUNvbnRyb2woXG4gICAgICBwYXJlbnQsXG4gICAgICB7IGVtaXRFdmVudCB9LFxuICAgICAgKCkgPT4gcGFyZW50LnNldENvbnRyb2woa2V5LCBjb250cm9sKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgY29uc3Qgc3RhdHVzID0gYy5zdGF0dXM7XG4gIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcbiAgYy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGYgfSk7XG4gIGlmIChzdGF0dXMgIT09IGMuc3RhdHVzKSB7XG4gICAgKGMuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChjLnN0YXR1cyk7XG4gIH1cblxuICBpZiAodmFsdWUgIT09IGMudmFsdWUpIHtcbiAgICAoYy52YWx1ZUNoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPGFueT4pLmVtaXQoYy52YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbChmb3JtOiBGb3JtR3JvdXB8Rm9ybUFycmF5LCBvcHRzOiB7IGVtaXRFdmVudDogYm9vbGVhbiB9LCBhY3Rpb246IEZ1bmN0aW9uKSB7XG4gIC8qKlxuICAgKiAgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjc2NzlcbiAgICovXG4gIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwICYmICFmb3JtWydfX3BhdGNoRm9yRWFjaENoaWxkJ10pIHtcbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGZvcm0sICdfX3BhdGNoRm9yRWFjaENoaWxkJywgdHJ1ZSk7XG4gICAgKGZvcm0gYXMgYW55KS5fZm9yRWFjaENoaWxkID0gKGNiOiBGdW5jdGlvbikgPT4ge1xuICAgICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKGZvcm0uY29udHJvbHMpXG4gICAgICAgIC5mb3JFYWNoKGsgPT4gZm9ybS5jb250cm9sc1trXSAmJiBjYihmb3JtLmNvbnRyb2xzW2tdLCBrKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDQzOVxuICAgKi9cbiAgY29uc3QgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eSA9IGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eS5iaW5kKGZvcm0pO1xuICBpZiAob3B0cy5lbWl0RXZlbnQgPT09IGZhbHNlKSB7XG4gICAgZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5ID0gKG9wdHMpID0+IHtcbiAgICAgIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyAuLi4ob3B0cyB8fCB7fSksIGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGFjdGlvbigpO1xuXG4gIGlmIChvcHRzLmVtaXRFdmVudCA9PT0gZmFsc2UpIHtcbiAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkgPSB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbnRyb2woZm9ybTogQWJzdHJhY3RDb250cm9sKSB7XG4gIGZvcm1bJ19maWVsZHMnXSAmJiBkZWxldGUgZm9ybVsnX2ZpZWxkcyddO1xuICBmb3JtLnNldFZhbGlkYXRvcnMobnVsbCk7XG4gIGZvcm0uc2V0QXN5bmNWYWxpZGF0b3JzKG51bGwpO1xuICBpZiAoZm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCB8fCBmb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybS5jb250cm9scylcbiAgICAgIC5mb3JFYWNoKChrKSA9PiBjbGVhckNvbnRyb2woZm9ybS5jb250cm9sc1trXSkpO1xuICB9XG59XG4iXX0=