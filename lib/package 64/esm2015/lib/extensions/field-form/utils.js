/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { getKeyPath, getFieldValue, isNullOrUndefined, defineHiddenProp, wrapProperty } from '../../utils';
/**
 * @param {?} field
 * @param {?=} emitEvent
 * @return {?}
 */
export function unregisterControl(field, emitEvent = false) {
    /** @type {?} */
    const control = field.formControl;
    /** @type {?} */
    const fieldIndex = control['_fields'] ? control['_fields'].indexOf(field) : -1;
    if (fieldIndex !== -1) {
        control['_fields'].splice(fieldIndex, 1);
    }
    /** @type {?} */
    const form = (/** @type {?} */ (control.parent));
    if (!form) {
        return;
    }
    /** @type {?} */
    const opts = { emitEvent };
    if (form instanceof FormArray) {
        /** @type {?} */
        const key = form.controls.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        c => c === control));
        if (key !== -1) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeAt(key)));
        }
    }
    else if (form instanceof FormGroup) {
        /** @type {?} */
        const paths = getKeyPath(field);
        /** @type {?} */
        const key = paths[paths.length - 1];
        if (form.get([key]) === control) {
            updateControl(form, opts, (/**
             * @return {?}
             */
            () => form.removeControl(key)));
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
    const form = (/** @type {?} */ (field.parent.formControl));
    return form ? form.get(getKeyPath(field)) : null;
}
/**
 * @param {?} field
 * @param {?=} control
 * @param {?=} emitEvent
 * @return {?}
 */
export function registerControl(field, control, emitEvent = false) {
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
        ({ firstChange, currentValue }) => {
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        }));
        if (control.registerOnDisabledChange) {
            control.registerOnDisabledChange((/**
             * @param {?} value
             * @return {?}
             */
            (value) => {
                field.templateOptions['___$disabled'] = value;
                // TODO remove in V6
                field.options && field.options._markForCheck(field);
            }));
        }
    }
    /** @type {?} */
    let parent = (/** @type {?} */ (field.parent.formControl));
    if (!parent || !field.key) {
        return;
    }
    /** @type {?} */
    const paths = getKeyPath(field);
    /** @type {?} */
    const value = getFieldValue(field);
    if (!(isNullOrUndefined(control.value) && isNullOrUndefined(value))
        && control.value !== value
        && control instanceof FormControl) {
        control.patchValue(value);
    }
    for (let i = 0; i < (paths.length - 1); i++) {
        /** @type {?} */
        const path = paths[i];
        if (!parent.get([path])) {
            updateControl(parent, { emitEvent }, (/**
             * @return {?}
             */
            () => parent.setControl(path, new FormGroup({}))));
        }
        parent = (/** @type {?} */ (parent.get([path])));
    }
    /** @type {?} */
    const key = paths[paths.length - 1];
    if (!field._hide && parent.get([key]) !== control) {
        updateControl(parent, { emitEvent }, (/**
         * @return {?}
         */
        () => parent.setControl(key, control)));
    }
}
/**
 * @param {?} c
 * @param {?=} onlySelf
 * @return {?}
 */
export function updateValidity(c, onlySelf = false) {
    /** @type {?} */
    const status = c.status;
    /** @type {?} */
    const value = c.value;
    c.updateValueAndValidity({ emitEvent: false, onlySelf });
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
        (cb) => {
            Object
                .keys(form.controls)
                .forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => form.controls[k] && cb(form.controls[k], k)));
        });
    }
    /**
     * workaround for https://github.com/angular/angular/issues/20439
     * @type {?}
     */
    const updateValueAndValidity = form.updateValueAndValidity.bind(form);
    if (opts.emitEvent === false) {
        form.updateValueAndValidity = (/**
         * @param {?} opts
         * @return {?}
         */
        (opts) => {
            updateValueAndValidity(Object.assign({}, (opts || {}), { emitEvent: false }));
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
        (k) => clearControl(form.controls[k])));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2V4dGVuc2lvbnMvZmllbGQtZm9ybS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFtQixNQUFNLGdCQUFnQixDQUFDO0FBRXBGLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7O0FBSTNHLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUF3QixFQUFFLFNBQVMsR0FBRyxLQUFLOztVQUNyRSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVc7O1VBQzNCLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxJQUFJLFVBQVUsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxQzs7VUFFSyxJQUFJLEdBQUcsbUJBQUEsT0FBTyxDQUFDLE1BQU0sRUFBeUI7SUFDcEQsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU87S0FDUjs7VUFFSyxJQUFJLEdBQUcsRUFBRSxTQUFTLEVBQUU7SUFDMUIsSUFBSSxJQUFJLFlBQVksU0FBUyxFQUFFOztjQUN2QixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFDO1FBQ3ZELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsYUFBYSxDQUFD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SUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdkIsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2NvcmUnO1xuaW1wb3J0IHsgZ2V0S2V5UGF0aCwgZ2V0RmllbGRWYWx1ZSwgaXNOdWxsT3JVbmRlZmluZWQsIGRlZmluZUhpZGRlblByb3AsIHdyYXBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyQ29udHJvbChmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGVtaXRFdmVudCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNvbnRyb2wgPSBmaWVsZC5mb3JtQ29udHJvbDtcbiAgY29uc3QgZmllbGRJbmRleCA9IGNvbnRyb2xbJ19maWVsZHMnXSA/IGNvbnRyb2xbJ19maWVsZHMnXS5pbmRleE9mKGZpZWxkKSA6IC0xO1xuICBpZiAoZmllbGRJbmRleCAhPT0gLTEpIHtcbiAgICBjb250cm9sWydfZmllbGRzJ10uc3BsaWNlKGZpZWxkSW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGNvbnRyb2wucGFyZW50IGFzIEZvcm1BcnJheSB8IEZvcm1Hcm91cDtcbiAgaWYgKCFmb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IHsgZW1pdEV2ZW50IH07XG4gIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgY29uc3Qga2V5ID0gZm9ybS5jb250cm9scy5maW5kSW5kZXgoYyA9PiBjID09PSBjb250cm9sKTtcbiAgICBpZiAoa2V5ICE9PSAtMSkge1xuICAgICAgdXBkYXRlQ29udHJvbChmb3JtLCBvcHRzLCAoKSA9PiBmb3JtLnJlbW92ZUF0KGtleSkpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XG4gICAgY29uc3QgcGF0aHMgPSBnZXRLZXlQYXRoKGZpZWxkKTtcbiAgICBjb25zdCBrZXkgPSBwYXRoc1twYXRocy5sZW5ndGggLSAxXTtcbiAgICBpZiAoZm9ybS5nZXQoW2tleV0pID09PSBjb250cm9sKSB7XG4gICAgICB1cGRhdGVDb250cm9sKGZvcm0sIG9wdHMsICgpID0+IGZvcm0ucmVtb3ZlQ29udHJvbChrZXkpKTtcbiAgICB9XG4gIH1cblxuICBjb250cm9sLnNldFBhcmVudChudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb250cm9sKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IEFic3RyYWN0Q29udHJvbCB7XG4gIGlmIChmaWVsZC5mb3JtQ29udHJvbCkge1xuICAgIHJldHVybiBmaWVsZC5mb3JtQ29udHJvbDtcbiAgfVxuXG4gIGlmIChmaWVsZFsnc2hhcmVGb3JtQ29udHJvbCddID09PSBmYWxzZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbCBhcyBGb3JtR3JvdXA7XG5cbiAgcmV0dXJuIGZvcm0gPyBmb3JtLmdldChnZXRLZXlQYXRoKGZpZWxkKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb250cm9sKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlLCBjb250cm9sPzogYW55LCBlbWl0RXZlbnQgPSBmYWxzZSkge1xuICBjb250cm9sID0gY29udHJvbCB8fCBmaWVsZC5mb3JtQ29udHJvbDtcbiAgaWYgKCFjb250cm9sWydfZmllbGRzJ10pIHtcbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGNvbnRyb2wsICdfZmllbGRzJywgW10pO1xuICB9XG4gIGlmIChjb250cm9sWydfZmllbGRzJ10uaW5kZXhPZihmaWVsZCkgPT09IC0xKSB7XG4gICAgY29udHJvbFsnX2ZpZWxkcyddLnB1c2goZmllbGQpO1xuICB9XG5cbiAgaWYgKCFmaWVsZC5mb3JtQ29udHJvbCAmJiBjb250cm9sKSB7XG4gICAgZGVmaW5lSGlkZGVuUHJvcChmaWVsZCwgJ2Zvcm1Db250cm9sJywgY29udHJvbCk7XG4gICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKG51bGwpO1xuICAgIGNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKG51bGwpO1xuXG4gICAgZmllbGQudGVtcGxhdGVPcHRpb25zLmRpc2FibGVkID0gISFmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZGlzYWJsZWQ7XG4gICAgd3JhcFByb3BlcnR5KGZpZWxkLnRlbXBsYXRlT3B0aW9ucywgJ2Rpc2FibGVkJywgKHsgZmlyc3RDaGFuZ2UsIGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICBpZiAoIWZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIGN1cnJlbnRWYWx1ZSA/IGZpZWxkLmZvcm1Db250cm9sLmRpc2FibGUoKSA6IGZpZWxkLmZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjb250cm9sLnJlZ2lzdGVyT25EaXNhYmxlZENoYW5nZSkge1xuICAgICAgY29udHJvbC5yZWdpc3Rlck9uRGlzYWJsZWRDaGFuZ2UoXG4gICAgICAgICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9uc1snX19fJGRpc2FibGVkJ10gPSB2YWx1ZTtcbiAgICAgICAgICAvLyBUT0RPIHJlbW92ZSBpbiBWNlxuICAgICAgICAgIGZpZWxkLm9wdGlvbnMgJiYgZmllbGQub3B0aW9ucy5fbWFya0ZvckNoZWNrKGZpZWxkKTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHBhcmVudCA9IGZpZWxkLnBhcmVudC5mb3JtQ29udHJvbCBhcyBGb3JtR3JvdXA7XG4gIGlmICghcGFyZW50IHx8ICFmaWVsZC5rZXkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXRocyA9IGdldEtleVBhdGgoZmllbGQpO1xuICBjb25zdCB2YWx1ZSA9IGdldEZpZWxkVmFsdWUoZmllbGQpO1xuICBpZiAoXG4gICAgIShpc051bGxPclVuZGVmaW5lZChjb250cm9sLnZhbHVlKSAmJiBpc051bGxPclVuZGVmaW5lZCh2YWx1ZSkpXG4gICAgJiYgY29udHJvbC52YWx1ZSAhPT0gdmFsdWVcbiAgICAmJiBjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xcbiAgKSB7XG4gICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgKHBhdGhzLmxlbmd0aCAtIDEpOyBpKyspIHtcbiAgICBjb25zdCBwYXRoID0gcGF0aHNbaV07XG4gICAgaWYgKCFwYXJlbnQuZ2V0KFtwYXRoXSkpIHtcbiAgICAgIHVwZGF0ZUNvbnRyb2woXG4gICAgICAgIHBhcmVudCxcbiAgICAgICAgeyBlbWl0RXZlbnQgfSxcbiAgICAgICAgKCkgPT4gcGFyZW50LnNldENvbnRyb2wocGF0aCwgbmV3IEZvcm1Hcm91cCh7fSkpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBwYXJlbnQgPSA8Rm9ybUdyb3VwPiBwYXJlbnQuZ2V0KFtwYXRoXSk7XG4gIH1cblxuICBjb25zdCBrZXkgPSBwYXRoc1twYXRocy5sZW5ndGggLSAxXTtcbiAgaWYgKCFmaWVsZC5faGlkZSAmJiBwYXJlbnQuZ2V0KFtrZXldKSAhPT0gY29udHJvbCkge1xuICAgIHVwZGF0ZUNvbnRyb2woXG4gICAgICBwYXJlbnQsXG4gICAgICB7IGVtaXRFdmVudCB9LFxuICAgICAgKCkgPT4gcGFyZW50LnNldENvbnRyb2woa2V5LCBjb250cm9sKSxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wsIG9ubHlTZWxmID0gZmFsc2UpIHtcbiAgY29uc3Qgc3RhdHVzID0gYy5zdGF0dXM7XG4gIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcbiAgYy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgZW1pdEV2ZW50OiBmYWxzZSwgb25seVNlbGYgfSk7XG4gIGlmIChzdGF0dXMgIT09IGMuc3RhdHVzKSB7XG4gICAgKGMuc3RhdHVzQ2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8c3RyaW5nPikuZW1pdChjLnN0YXR1cyk7XG4gIH1cblxuICBpZiAodmFsdWUgIT09IGMudmFsdWUpIHtcbiAgICAoYy52YWx1ZUNoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPGFueT4pLmVtaXQoYy52YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbChmb3JtOiBGb3JtR3JvdXB8Rm9ybUFycmF5LCBvcHRzOiB7IGVtaXRFdmVudDogYm9vbGVhbiB9LCBhY3Rpb246IEZ1bmN0aW9uKSB7XG4gIC8qKlxuICAgKiAgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjc2NzlcbiAgICovXG4gIGlmIChmb3JtIGluc3RhbmNlb2YgRm9ybUdyb3VwICYmICFmb3JtWydfX3BhdGNoRm9yRWFjaENoaWxkJ10pIHtcbiAgICBkZWZpbmVIaWRkZW5Qcm9wKGZvcm0sICdfX3BhdGNoRm9yRWFjaENoaWxkJywgdHJ1ZSk7XG4gICAgKGZvcm0gYXMgYW55KS5fZm9yRWFjaENoaWxkID0gKGNiOiBGdW5jdGlvbikgPT4ge1xuICAgICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKGZvcm0uY29udHJvbHMpXG4gICAgICAgIC5mb3JFYWNoKGsgPT4gZm9ybS5jb250cm9sc1trXSAmJiBjYihmb3JtLmNvbnRyb2xzW2tdLCBrKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDQzOVxuICAgKi9cbiAgY29uc3QgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eSA9IGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eS5iaW5kKGZvcm0pO1xuICBpZiAob3B0cy5lbWl0RXZlbnQgPT09IGZhbHNlKSB7XG4gICAgZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5ID0gKG9wdHMpID0+IHtcbiAgICAgIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyAuLi4ob3B0cyB8fCB7fSksIGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGFjdGlvbigpO1xuXG4gIGlmIChvcHRzLmVtaXRFdmVudCA9PT0gZmFsc2UpIHtcbiAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkgPSB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbnRyb2woZm9ybTogQWJzdHJhY3RDb250cm9sKSB7XG4gIGZvcm1bJ19maWVsZHMnXSAmJiBkZWxldGUgZm9ybVsnX2ZpZWxkcyddO1xuICBmb3JtLnNldFZhbGlkYXRvcnMobnVsbCk7XG4gIGZvcm0uc2V0QXN5bmNWYWxpZGF0b3JzKG51bGwpO1xuICBpZiAoZm9ybSBpbnN0YW5jZW9mIEZvcm1Hcm91cCB8fCBmb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybS5jb250cm9scylcbiAgICAgIC5mb3JFYWNoKChrKSA9PiBjbGVhckNvbnRyb2woZm9ybS5jb250cm9sc1trXSkpO1xuICB9XG59XG4iXX0=