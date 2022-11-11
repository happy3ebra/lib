/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Renderer2, Inject } from '@angular/core';
import { wrapProperty, defineHiddenProp, FORMLY_VALIDATORS } from '../utils';
import { DOCUMENT } from '@angular/common';
var FormlyAttributes = /** @class */ (function () {
    function FormlyAttributes(renderer, elementRef, _document) {
        var _this = this;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        this.uiAttributes = null;
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: ['click', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],
            callback: (/**
             * @param {?} eventName
             * @param {?} $event
             * @return {?}
             */
            function (eventName, $event) {
                switch (eventName) {
                    case 'focus':
                        return _this.onFocus($event);
                    case 'blur':
                        return _this.onBlur($event);
                    case 'change':
                        return _this.onChange($event);
                    default:
                        return _this.to[eventName](_this.field, $event);
                }
            }),
        };
        this.document = _document;
    }
    Object.defineProperty(FormlyAttributes.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () { return this.field.templateOptions || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyAttributes.prototype, "fieldAttrElements", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return (this.field && this.field['_elementRefs']) || []; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyAttributes.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            function (listener) { return listener(); }));
            this.uiEvents.events.forEach((/**
             * @param {?} eventName
             * @return {?}
             */
            function (eventName) {
                if ((_this.to && _this.to[eventName]) || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    _this.uiEvents.listeners.push(_this.renderer.listen(_this.elementRef.nativeElement, eventName, (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return _this.uiEvents.callback(eventName, e); })));
                }
            }));
            if (this.to && this.to.attributes) {
                wrapProperty(this.to, 'attributes', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var currentValue = _a.currentValue, previousValue = _a.previousValue;
                    if (previousValue) {
                        Object.keys(previousValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        function (attr) { return _this.removeAttribute(attr); }));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        function (attr) {
                            if (currentValue[attr] != null) {
                                _this.setAttribute(attr, currentValue[attr]);
                            }
                        }));
                    }
                }));
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                wrapProperty(this.field, 'focus', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var currentValue = _a.currentValue;
                    _this.toggleFocus(currentValue);
                }));
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    };
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    FormlyAttributes.prototype.ngDoCheck = /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.uiAttributes) {
            /** @type {?} */
            var element_1 = (/** @type {?} */ (this.elementRef.nativeElement));
            this.uiAttributes = tslib_1.__spread(FORMLY_VALIDATORS, ['tabindex', 'placeholder', 'readonly', 'disabled', 'step']).filter((/**
             * @param {?} attr
             * @return {?}
             */
            function (attr) { return !element_1.hasAttribute || !element_1.hasAttribute(attr); }));
        }
        this.uiAttributes.forEach((/**
         * @param {?} attr
         * @return {?}
         */
        function (attr) {
            /** @type {?} */
            var value = _this.to[attr];
            if (_this.uiAttributesCache[attr] !== value
                && (!_this.to.attributes || !_this.to.attributes.hasOwnProperty(attr.toLowerCase()))) {
                _this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    _this.setAttribute(attr, value === true ? attr : "" + value);
                }
                else {
                    _this.removeAttribute(attr);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    FormlyAttributes.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.uiEvents.listeners.forEach((/**
         * @param {?} listener
         * @return {?}
         */
        function (listener) { return listener(); }));
        this.detachElementRef(this.field);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormlyAttributes.prototype.toggleFocus = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        /** @type {?} */
        var isFocused = !!this.document.activeElement
            && this.fieldAttrElements
                .some((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var nativeElement = _a.nativeElement;
                return _this.document.activeElement === nativeElement || nativeElement.contains(_this.document.activeElement);
            }));
        if (value && !isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return element.nativeElement.focus(); }));
        }
        else if (!value && isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return element.nativeElement.blur(); }));
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onFocus = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.field['___$focus'] = true;
        if (this.to.focus) {
            this.to.focus(this.field, $event);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.field['___$focus'] = false;
        if (this.to.blur) {
            this.to.blur(this.field, $event);
        }
    };
    // handle custom `change` event, for regular ones rely on DOM listener
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onHostChange = 
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormlyAttributes.prototype.onChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
        if (this.field.formControl) {
            this.field.formControl.markAsDirty();
        }
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    FormlyAttributes.prototype.attachElementRef = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs'] && f['_elementRefs'].indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    FormlyAttributes.prototype.detachElementRef = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        /** @type {?} */
        var index = f && f['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            this.field['_elementRefs'].splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    FormlyAttributes.prototype.setAttribute = /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    function (attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    };
    /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    FormlyAttributes.prototype.removeAttribute = /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    function (attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    };
    FormlyAttributes.decorators = [
        { type: Directive, args: [{
                    selector: '[formlyAttributes]',
                    host: {
                        '(change)': 'onHostChange($event)',
                    },
                },] }
    ];
    /** @nocollapse */
    FormlyAttributes.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FormlyAttributes.propDecorators = {
        field: [{ type: Input, args: ['formlyAttributes',] }],
        id: [{ type: Input }]
    };
    return FormlyAttributes;
}());
export { FormlyAttributes };
if (false) {
    /** @type {?} */
    FormlyAttributes.prototype.field;
    /** @type {?} */
    FormlyAttributes.prototype.id;
    /**
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.document;
    /**
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.uiAttributesCache;
    /**
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.uiAttributes;
    /**
     * HostBinding doesn't register listeners conditionally which may produce some perf issues.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.uiEvents;
    /**
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    FormlyAttributes.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybWx5LmF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTRCLFNBQVMsRUFBVyxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUgsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0M7SUF3Q0UsMEJBQ1UsUUFBbUIsRUFDbkIsVUFBc0IsRUFDWixTQUFjO1FBSGxDLGlCQU1DO1FBTFMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBL0J4QixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsaUJBQVksR0FBYSxJQUFJLENBQUM7Ozs7OztRQU85QixhQUFRLEdBQUc7WUFDakIsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDNUUsUUFBUTs7Ozs7WUFBRSxVQUFDLFNBQWlCLEVBQUUsTUFBVztnQkFDdkMsUUFBUSxTQUFTLEVBQUU7b0JBQ2pCLEtBQUssT0FBTzt3QkFDVixPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlCLEtBQUssTUFBTTt3QkFDVCxPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdCLEtBQUssUUFBUTt3QkFDWCxPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JB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aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBSZW5kZXJlcjIsIERvQ2hlY2ssIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5VGVtcGxhdGVPcHRpb25zIH0gZnJvbSAnLi9mb3JtbHkuZmllbGQuY29uZmlnJztcbmltcG9ydCB7IHdyYXBQcm9wZXJ0eSwgZGVmaW5lSGlkZGVuUHJvcCwgRk9STUxZX1ZBTElEQVRPUlMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmb3JtbHlBdHRyaWJ1dGVzXScsXG4gIGhvc3Q6IHtcbiAgICAnKGNoYW5nZSknOiAnb25Ib3N0Q2hhbmdlKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlBdHRyaWJ1dGVzIGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ2Zvcm1seUF0dHJpYnV0ZXMnKSBmaWVsZDogRm9ybWx5RmllbGRDb25maWc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgdWlBdHRyaWJ1dGVzQ2FjaGU6IGFueSA9IHt9O1xuICBwcml2YXRlIHVpQXR0cmlidXRlczogc3RyaW5nW10gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBIb3N0QmluZGluZyBkb2Vzbid0IHJlZ2lzdGVyIGxpc3RlbmVycyBjb25kaXRpb25hbGx5IHdoaWNoIG1heSBwcm9kdWNlIHNvbWUgcGVyZiBpc3N1ZXMuXG4gICAqXG4gICAqIEZvcm1seSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMTk5MVxuICAgKi9cbiAgcHJpdmF0ZSB1aUV2ZW50cyA9IHtcbiAgICBsaXN0ZW5lcnM6IFtdLFxuICAgIGV2ZW50czogWydjbGljaycsICdrZXl1cCcsICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJ10sXG4gICAgY2FsbGJhY2s6IChldmVudE5hbWU6IHN0cmluZywgJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkZvY3VzKCRldmVudCk7XG4gICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgIHJldHVybiB0aGlzLm9uQmx1cigkZXZlbnQpO1xuICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm9uQ2hhbmdlKCRldmVudCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG9bZXZlbnROYW1lXSh0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgZ2V0IHRvKCk6IEZvcm1seVRlbXBsYXRlT3B0aW9ucyB7IHJldHVybiB0aGlzLmZpZWxkLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTsgfVxuXG4gIHByaXZhdGUgZ2V0IGZpZWxkQXR0ckVsZW1lbnRzKCk6IEVsZW1lbnRSZWZbXSB7IHJldHVybiAodGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkWydfZWxlbWVudFJlZnMnXSkgfHwgW107IH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICApIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gX2RvY3VtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICB0aGlzLmZpZWxkLm5hbWUgJiYgdGhpcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmZpZWxkLm5hbWUpO1xuICAgICAgdGhpcy51aUV2ZW50cy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKCkpO1xuICAgICAgdGhpcy51aUV2ZW50cy5ldmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGlmICgodGhpcy50byAmJiB0aGlzLnRvW2V2ZW50TmFtZV0pIHx8IFsnZm9jdXMnLCAnYmx1cicsICdjaGFuZ2UnXS5pbmRleE9mKGV2ZW50TmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy51aUV2ZW50cy5saXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBldmVudE5hbWUsIChlKSA9PiB0aGlzLnVpRXZlbnRzLmNhbGxiYWNrKGV2ZW50TmFtZSwgZSkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy50byAmJiB0aGlzLnRvLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgd3JhcFByb3BlcnR5KHRoaXMudG8sICdhdHRyaWJ1dGVzJywgKHsgY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlIH0pID0+IHtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocHJldmlvdXNWYWx1ZSkuZm9yRWFjaChhdHRyID0+IHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjdXJyZW50VmFsdWUpLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWVbYXR0cl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHIsIGN1cnJlbnRWYWx1ZVthdHRyXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGV0YWNoRWxlbWVudFJlZihjaGFuZ2VzLmZpZWxkLnByZXZpb3VzVmFsdWUpO1xuICAgICAgdGhpcy5hdHRhY2hFbGVtZW50UmVmKGNoYW5nZXMuZmllbGQuY3VycmVudFZhbHVlKTtcbiAgICAgIGlmICh0aGlzLmZpZWxkQXR0ckVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAhdGhpcy5pZCAmJiB0aGlzLmZpZWxkLmlkICYmIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZmllbGQuaWQpO1xuICAgICAgICB3cmFwUHJvcGVydHkodGhpcy5maWVsZCwgJ2ZvY3VzJywgKHsgY3VycmVudFZhbHVlIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUZvY3VzKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmlkKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2UgbmVlZCB0byByZS1ldmFsdWF0ZSBhbGwgdGhlIGF0dHJpYnV0ZXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZVxuICAgKiBieSB1c2luZyBhIEhvc3RCaW5kaW5nIHdlIHJ1biBpbnRvIGNlcnRhaW4gZWRnZSBjYXNlcy4gVGhpcyBtZWFucyB0aGF0IHdoYXRldmVyIGxvZ2ljXG4gICAqIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBzZXJpb3VzbHkgZGFtYWdpbmcgb3IgZGVzdHJveWluZyB0aGUgcGVyZm9ybWFuY2UuXG4gICAqXG4gICAqIEZvcm1seSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMTMxN1xuICAgKiBNYXRlcmlhbCBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTQwMjRcbiAgICovXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMudWlBdHRyaWJ1dGVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLnVpQXR0cmlidXRlcyA9IFsuLi5GT1JNTFlfVkFMSURBVE9SUywgJ3RhYmluZGV4JywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5JywgJ2Rpc2FibGVkJywgJ3N0ZXAnXS5maWx0ZXIoXG4gICAgICAgIChhdHRyKSA9PiAhZWxlbWVudC5oYXNBdHRyaWJ1dGUgfHwgIWVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHIpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnVpQXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnRvW2F0dHJdO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnVpQXR0cmlidXRlc0NhY2hlW2F0dHJdICE9PSB2YWx1ZVxuICAgICAgICAmJiAoIXRoaXMudG8uYXR0cmlidXRlcyB8fCAhdGhpcy50by5hdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHIudG9Mb3dlckNhc2UoKSkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51aUF0dHJpYnV0ZXNDYWNoZVthdHRyXSA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSA9PT0gdHJ1ZSA/IGF0dHIgOiBgJHt2YWx1ZX1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51aUV2ZW50cy5saXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcigpKTtcbiAgICB0aGlzLmRldGFjaEVsZW1lbnRSZWYodGhpcy5maWVsZCk7XG4gIH1cblxuICB0b2dnbGVGb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzID8gdGhpcy5maWVsZEF0dHJFbGVtZW50c1swXSA6IG51bGw7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvY3VzZWQgPSAhIXRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgJiYgdGhpcy5maWVsZEF0dHJFbGVtZW50c1xuICAgICAgICAuc29tZSgoeyBuYXRpdmVFbGVtZW50IH0pID0+IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbmF0aXZlRWxlbWVudCB8fCBuYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpO1xuXG4gICAgaWYgKHZhbHVlICYmICFpc0ZvY3VzZWQpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgIH0gZWxzZSBpZiAoIXZhbHVlICYmIGlzRm9jdXNlZCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYmx1cigpKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5maWVsZFsnX19fJGZvY3VzJ10gPSB0cnVlO1xuICAgIGlmICh0aGlzLnRvLmZvY3VzKSB7XG4gICAgICB0aGlzLnRvLmZvY3VzKHRoaXMuZmllbGQsICRldmVudCk7XG4gICAgfVxuICB9XG5cbiAgb25CbHVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5maWVsZFsnX19fJGZvY3VzJ10gPSBmYWxzZTtcbiAgICBpZiAodGhpcy50by5ibHVyKSB7XG4gICAgICB0aGlzLnRvLmJsdXIodGhpcy5maWVsZCwgJGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgY3VzdG9tIGBjaGFuZ2VgIGV2ZW50LCBmb3IgcmVndWxhciBvbmVzIHJlbHkgb24gRE9NIGxpc3RlbmVyXG4gIG9uSG9zdENoYW5nZSgkZXZlbnQ6IGFueSkge1xuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UoJGV2ZW50KTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCRldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMudG8uY2hhbmdlKSB7XG4gICAgICB0aGlzLnRvLmNoYW5nZSh0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpZWxkLmZvcm1Db250cm9sKSB7XG4gICAgICB0aGlzLmZpZWxkLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hFbGVtZW50UmVmKGY6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gICAgaWYgKCFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGZbJ19lbGVtZW50UmVmcyddICYmIGZbJ19lbGVtZW50UmVmcyddLmluZGV4T2YodGhpcy5lbGVtZW50UmVmKSA9PT0gLTEpIHtcbiAgICAgIGZbJ19lbGVtZW50UmVmcyddLnB1c2godGhpcy5lbGVtZW50UmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChmLCAnX2VsZW1lbnRSZWZzJywgW3RoaXMuZWxlbWVudFJlZl0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoRWxlbWVudFJlZihmOiBGb3JtbHlGaWVsZENvbmZpZykge1xuICAgIGNvbnN0IGluZGV4ID0gZiAmJiBmWydfZWxlbWVudFJlZnMnXSA/IHRoaXMuZmllbGRBdHRyRWxlbWVudHMuaW5kZXhPZih0aGlzLmVsZW1lbnRSZWYpIDogLTE7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5maWVsZFsnX2VsZW1lbnRSZWZzJ10uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEF0dHJpYnV0ZShhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYXR0ciwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBdHRyaWJ1dGUoYXR0cjogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGF0dHIpO1xuICB9XG59XG4iXX0=