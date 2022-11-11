/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2, Inject } from '@angular/core';
import { wrapProperty, defineHiddenProp, FORMLY_VALIDATORS } from '../utils';
import { DOCUMENT } from '@angular/common';
export class FormlyAttributes {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(renderer, elementRef, _document) {
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
            (eventName, $event) => {
                switch (eventName) {
                    case 'focus':
                        return this.onFocus($event);
                    case 'blur':
                        return this.onBlur($event);
                    case 'change':
                        return this.onChange($event);
                    default:
                        return this.to[eventName](this.field, $event);
                }
            }),
        };
        this.document = _document;
    }
    /**
     * @return {?}
     */
    get to() { return this.field.templateOptions || {}; }
    /**
     * @private
     * @return {?}
     */
    get fieldAttrElements() { return (this.field && this.field['_elementRefs']) || []; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            (listener) => listener()));
            this.uiEvents.events.forEach((/**
             * @param {?} eventName
             * @return {?}
             */
            (eventName) => {
                if ((this.to && this.to[eventName]) || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (/**
                     * @param {?} e
                     * @return {?}
                     */
                    (e) => this.uiEvents.callback(eventName, e))));
                }
            }));
            if (this.to && this.to.attributes) {
                wrapProperty(this.to, 'attributes', (/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => this.removeAttribute(attr)));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        attr => {
                            if (currentValue[attr] != null) {
                                this.setAttribute(attr, currentValue[attr]);
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
                ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                }));
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     * @return {?}
     */
    ngDoCheck() {
        if (!this.uiAttributes) {
            /** @type {?} */
            const element = (/** @type {?} */ (this.elementRef.nativeElement));
            this.uiAttributes = [...FORMLY_VALIDATORS, 'tabindex', 'placeholder', 'readonly', 'disabled', 'step'].filter((/**
             * @param {?} attr
             * @return {?}
             */
            (attr) => !element.hasAttribute || !element.hasAttribute(attr)));
        }
        this.uiAttributes.forEach((/**
         * @param {?} attr
         * @return {?}
         */
        attr => {
            /** @type {?} */
            const value = this.to[attr];
            if (this.uiAttributesCache[attr] !== value
                && (!this.to.attributes || !this.to.attributes.hasOwnProperty(attr.toLowerCase()))) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((/**
         * @param {?} listener
         * @return {?}
         */
        listener => listener()));
        this.detachElementRef(this.field);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toggleFocus(value) {
        /** @type {?} */
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        /** @type {?} */
        const isFocused = !!this.document.activeElement
            && this.fieldAttrElements
                .some((/**
             * @param {?} __0
             * @return {?}
             */
            ({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement)));
        if (value && !isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => element.nativeElement.focus()));
        }
        else if (!value && isFocused) {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => element.nativeElement.blur()));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFocus($event) {
        this.field['___$focus'] = true;
        if (this.to.focus) {
            this.to.focus(this.field, $event);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        this.field['___$focus'] = false;
        if (this.to.blur) {
            this.to.blur(this.field, $event);
        }
    }
    // handle custom `change` event, for regular ones rely on DOM listener
    /**
     * @param {?} $event
     * @return {?}
     */
    onHostChange($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChange($event) {
        if (this.to.change) {
            this.to.change(this.field, $event);
        }
        if (this.field.formControl) {
            this.field.formControl.markAsDirty();
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs'] && f['_elementRefs'].indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    detachElementRef(f) {
        /** @type {?} */
        const index = f && f['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            this.field['_elementRefs'].splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} attr
     * @param {?} value
     * @return {?}
     */
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    /**
     * @private
     * @param {?} attr
     * @return {?}
     */
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.decorators = [
    { type: Directive, args: [{
                selector: '[formlyAttributes]',
                host: {
                    '(change)': 'onHostChange($event)',
                },
            },] }
];
/** @nocollapse */
FormlyAttributes.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
FormlyAttributes.propDecorators = {
    field: [{ type: Input, args: ['formlyAttributes',] }],
    id: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWZvcm1seS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybWx5LmF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBNEIsU0FBUyxFQUFXLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUU5SCxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVEzQyxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7SUFrQzNCLFlBQ1UsUUFBbUIsRUFDbkIsVUFBc0IsRUFDWixTQUFjO1FBRnhCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQS9CeEIsc0JBQWlCLEdBQVEsRUFBRSxDQUFDO1FBQzVCLGlCQUFZLEdBQWEsSUFBSSxDQUFDOzs7Ozs7UUFPOUIsYUFBUSxHQUFHO1lBQ2pCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzVFLFFBQVE7Ozs7O1lBQUUsQ0FBQyxTQUFpQixFQUFFLE1BQVcsRUFBRSxFQUFFO2dCQUMzQyxRQUFRLFNBQVMsRUFBRTtvQkFDakIsS0FBSyxPQUFPO3dCQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxNQUFNO3dCQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0IsS0FBSyxRQUFRO3dCQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FB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RSxDQUFDLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7Ozs7Ozs7SUFFTyxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7OztJQUVPLGVBQWUsQ0FBQyxJQUFZO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7OztZQTNNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxzQkFBc0I7aUJBQ25DO2FBQ0Y7Ozs7WUFWZ0UsU0FBUztZQUF0RCxVQUFVOzRDQWdEekIsTUFBTSxTQUFDLFFBQVE7OztvQkFwQ2pCLEtBQUssU0FBQyxrQkFBa0I7aUJBQ3hCLEtBQUs7Ozs7SUFETixpQ0FBb0Q7O0lBQ3BELDhCQUFvQjs7Ozs7SUFFcEIsb0NBQTJCOzs7OztJQUMzQiw2Q0FBb0M7Ozs7O0lBQ3BDLHdDQUFzQzs7Ozs7Ozs7SUFPdEMsb0NBZUU7Ozs7O0lBT0Esb0NBQTJCOzs7OztJQUMzQixzQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFJlbmRlcmVyMiwgRG9DaGVjaywgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlUZW1wbGF0ZU9wdGlvbnMgfSBmcm9tICcuL2Zvcm1seS5maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgd3JhcFByb3BlcnR5LCBkZWZpbmVIaWRkZW5Qcm9wLCBGT1JNTFlfVkFMSURBVE9SUyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Zvcm1seUF0dHJpYnV0ZXNdJyxcbiAgaG9zdDoge1xuICAgICcoY2hhbmdlKSc6ICdvbkhvc3RDaGFuZ2UoJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUF0dHJpYnV0ZXMgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnZm9ybWx5QXR0cmlidXRlcycpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHJpdmF0ZSB1aUF0dHJpYnV0ZXNDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgdWlBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEhvc3RCaW5kaW5nIGRvZXNuJ3QgcmVnaXN0ZXIgbGlzdGVuZXJzIGNvbmRpdGlvbmFsbHkgd2hpY2ggbWF5IHByb2R1Y2Ugc29tZSBwZXJmIGlzc3Vlcy5cbiAgICpcbiAgICogRm9ybWx5IGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8xOTkxXG4gICAqL1xuICBwcml2YXRlIHVpRXZlbnRzID0ge1xuICAgIGxpc3RlbmVyczogW10sXG4gICAgZXZlbnRzOiBbJ2NsaWNrJywgJ2tleXVwJywgJ2tleWRvd24nLCAna2V5cHJlc3MnLCAnZm9jdXMnLCAnYmx1cicsICdjaGFuZ2UnXSxcbiAgICBjYWxsYmFjazogKGV2ZW50TmFtZTogc3RyaW5nLCAkZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm9uRm9jdXMoJGV2ZW50KTtcbiAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25CbHVyKCRldmVudCk7XG4gICAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25DaGFuZ2UoJGV2ZW50KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdGhpcy50b1tldmVudE5hbWVdKHRoaXMuZmllbGQsICRldmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBnZXQgdG8oKTogRm9ybWx5VGVtcGxhdGVPcHRpb25zIHsgcmV0dXJuIHRoaXMuZmllbGQudGVtcGxhdGVPcHRpb25zIHx8IHt9OyB9XG5cbiAgcHJpdmF0ZSBnZXQgZmllbGRBdHRyRWxlbWVudHMoKTogRWxlbWVudFJlZltdIHsgcmV0dXJuICh0aGlzLmZpZWxkICYmIHRoaXMuZmllbGRbJ19lbGVtZW50UmVmcyddKSB8fCBbXTsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBfZG9jdW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZmllbGQpIHtcbiAgICAgIHRoaXMuZmllbGQubmFtZSAmJiB0aGlzLnNldEF0dHJpYnV0ZSgnbmFtZScsIHRoaXMuZmllbGQubmFtZSk7XG4gICAgICB0aGlzLnVpRXZlbnRzLmxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4gbGlzdGVuZXIoKSk7XG4gICAgICB0aGlzLnVpRXZlbnRzLmV2ZW50cy5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgaWYgKCh0aGlzLnRvICYmIHRoaXMudG9bZXZlbnROYW1lXSkgfHwgWydmb2N1cycsICdibHVyJywgJ2NoYW5nZSddLmluZGV4T2YoZXZlbnROYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnVpRXZlbnRzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgKGUpID0+IHRoaXMudWlFdmVudHMuY2FsbGJhY2soZXZlbnROYW1lLCBlKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLnRvICYmIHRoaXMudG8uYXR0cmlidXRlcykge1xuICAgICAgICB3cmFwUHJvcGVydHkodGhpcy50bywgJ2F0dHJpYnV0ZXMnLCAoeyBjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUgfSkgPT4ge1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwcmV2aW91c1ZhbHVlKS5mb3JFYWNoKGF0dHIgPT4gdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGN1cnJlbnRWYWx1ZSkuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZVthdHRyXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ciwgY3VycmVudFZhbHVlW2F0dHJdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kZXRhY2hFbGVtZW50UmVmKGNoYW5nZXMuZmllbGQucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLmF0dGFjaEVsZW1lbnRSZWYoY2hhbmdlcy5maWVsZC5jdXJyZW50VmFsdWUpO1xuICAgICAgaWYgKHRoaXMuZmllbGRBdHRyRWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICF0aGlzLmlkICYmIHRoaXMuZmllbGQuaWQgJiYgdGhpcy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5maWVsZC5pZCk7XG4gICAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLmZpZWxkLCAnZm9jdXMnLCAoeyBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgICAgIHRoaXMudG9nZ2xlRm9jdXMoY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaWQpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGFsbCB0aGUgYXR0cmlidXRlcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlXG4gICAqIGJ5IHVzaW5nIGEgSG9zdEJpbmRpbmcgd2UgcnVuIGludG8gY2VydGFpbiBlZGdlIGNhc2VzLiBUaGlzIG1lYW5zIHRoYXQgd2hhdGV2ZXIgbG9naWNcbiAgICogaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIHNlcmlvdXNseSBkYW1hZ2luZyBvciBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICpcbiAgICogRm9ybWx5IGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8xMzE3XG4gICAqIE1hdGVyaWFsIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNDAyNFxuICAgKi9cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICghdGhpcy51aUF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMudWlBdHRyaWJ1dGVzID0gWy4uLkZPUk1MWV9WQUxJREFUT1JTLCAndGFiaW5kZXgnLCAncGxhY2Vob2xkZXInLCAncmVhZG9ubHknLCAnZGlzYWJsZWQnLCAnc3RlcCddLmZpbHRlcihcbiAgICAgICAgKGF0dHIpID0+ICFlbGVtZW50Lmhhc0F0dHJpYnV0ZSB8fCAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0ciksXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMudWlBdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudG9bYXR0cl07XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudWlBdHRyaWJ1dGVzQ2FjaGVbYXR0cl0gIT09IHZhbHVlXG4gICAgICAgICYmICghdGhpcy50by5hdHRyaWJ1dGVzIHx8ICF0aGlzLnRvLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0ci50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVpQXR0cmlidXRlc0NhY2hlW2F0dHJdID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlID09PSB0cnVlID8gYXR0ciA6IGAke3ZhbHVlfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVpRXZlbnRzLmxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKCkpO1xuICAgIHRoaXMuZGV0YWNoRWxlbWVudFJlZih0aGlzLmZpZWxkKTtcbiAgfVxuXG4gIHRvZ2dsZUZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZmllbGRBdHRyRWxlbWVudHMgPyB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzWzBdIDogbnVsbDtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9jdXNlZCA9ICEhdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAmJiB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzXG4gICAgICAgIC5zb21lKCh7IG5hdGl2ZUVsZW1lbnQgfSkgPT4gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBuYXRpdmVFbGVtZW50IHx8IG5hdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50KSk7XG5cbiAgICBpZiAodmFsdWUgJiYgIWlzRm9jdXNlZCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfSBlbHNlIGlmICghdmFsdWUgJiYgaXNGb2N1c2VkKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCkpO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmZpZWxkWydfX18kZm9jdXMnXSA9IHRydWU7XG4gICAgaWYgKHRoaXMudG8uZm9jdXMpIHtcbiAgICAgIHRoaXMudG8uZm9jdXModGhpcy5maWVsZCwgJGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmZpZWxkWydfX18kZm9jdXMnXSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnRvLmJsdXIpIHtcbiAgICAgIHRoaXMudG8uYmx1cih0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhhbmRsZSBjdXN0b20gYGNoYW5nZWAgZXZlbnQsIGZvciByZWd1bGFyIG9uZXMgcmVseSBvbiBET00gbGlzdGVuZXJcbiAgb25Ib3N0Q2hhbmdlKCRldmVudDogYW55KSB7XG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIEV2ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZSgkZXZlbnQpO1xuICB9XG5cbiAgb25DaGFuZ2UoJGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy50by5jaGFuZ2UpIHtcbiAgICAgIHRoaXMudG8uY2hhbmdlKHRoaXMuZmllbGQsICRldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmllbGQuZm9ybUNvbnRyb2wpIHtcbiAgICAgIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEVsZW1lbnRSZWYoZjogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBpZiAoIWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZlsnX2VsZW1lbnRSZWZzJ10gJiYgZlsnX2VsZW1lbnRSZWZzJ10uaW5kZXhPZih0aGlzLmVsZW1lbnRSZWYpID09PSAtMSkge1xuICAgICAgZlsnX2VsZW1lbnRSZWZzJ10ucHVzaCh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKGYsICdfZWxlbWVudFJlZnMnLCBbdGhpcy5lbGVtZW50UmVmXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hFbGVtZW50UmVmKGY6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gICAgY29uc3QgaW5kZXggPSBmICYmIGZbJ19lbGVtZW50UmVmcyddID8gdGhpcy5maWVsZEF0dHJFbGVtZW50cy5pbmRleE9mKHRoaXMuZWxlbWVudFJlZikgOiAtMTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmZpZWxkWydfZWxlbWVudFJlZnMnXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0QXR0cmlidXRlKGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBhdHRyLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUF0dHJpYnV0ZShhdHRyOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYXR0cik7XG4gIH1cbn1cbiJdfQ==