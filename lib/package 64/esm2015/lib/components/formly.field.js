/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewContainerRef, ViewChild, Attribute, ComponentFactoryResolver, Renderer2, ElementRef, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfig } from '../services/formly.config';
import { defineHiddenProp, wrapProperty } from '../utils';
import { isObservable } from 'rxjs';
export class FormlyField {
    /**
     * @param {?} formlyConfig
     * @param {?} renderer
     * @param {?} resolver
     * @param {?} elementRef
     * @param {?} hideDeprecation
     */
    constructor(formlyConfig, renderer, resolver, elementRef, 
    // tslint:disable-next-line
    hideDeprecation) {
        this.formlyConfig = formlyConfig;
        this.renderer = renderer;
        this.resolver = resolver;
        this.elementRef = elementRef;
        this.warnDeprecation = false;
        this.modelChange = new EventEmitter();
        this.hostObservers = [];
        this.componentRefs = [];
        this.hooksObservers = [];
        this.detectFieldBuild = false;
        this.warnDeprecation = hideDeprecation === null;
    }
    /**
     * @param {?} m
     * @return {?}
     */
    set model(m) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'model' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'form' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.warnDeprecation && console.warn(`NgxFormly: passing 'options' input to '${this.constructor.name}' component is not required anymore, you may remove it!`);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.triggerHook('afterContentInit');
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.triggerHook('afterContentChecked');
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.triggerHook('afterViewInit');
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.triggerHook('afterViewChecked');
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.triggerHook('doCheck');
        if (this.detectFieldBuild && (this.field && this.field.options)) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.triggerHook('onInit');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.triggerHook('onChanges', changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resetRefs(this.field);
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.hooksObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.triggerHook('onDestroy');
    }
    /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    renderField(containerRef, f, wrappers = []) {
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field ? this.field.wrappers : [];
        }
        if (wrappers && wrappers.length > 0) {
            const [wrapper, ...wps] = wrappers;
            const { component } = this.formlyConfig.getWrapper(wrapper);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
            wrapProperty(ref.instance, 'fieldComponent', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, previousValue, currentValue }) => {
                if (currentValue) {
                    if (previousValue && previousValue['_lContainer'] === currentValue['_lContainer']) {
                        return;
                    }
                    /** @type {?} */
                    const viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        this.renderField(currentValue, f, wps);
                    }
                    !firstChange && ref.changeDetectorRef.detectChanges();
                }
            }));
        }
        else if (f && f.type) {
            const { component } = this.formlyConfig.getType(f.type);
            /** @type {?} */
            const ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
        }
    }
    /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    triggerHook(name, changes) {
        if (this.field && this.field.hooks && this.field.hooks[name]) {
            if (!changes || changes.field) {
                /** @type {?} */
                const r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    /** @type {?} */
                    const sub = r.subscribe();
                    this.hooksObservers.push((/**
                     * @return {?}
                     */
                    () => sub.unsubscribe()));
                }
            }
        }
        if (this.field && this.field.lifecycle && this.field.lifecycle[name]) {
            this.field.lifecycle[name](this.field.form, this.field, this.field.model, this.field.options);
        }
        if (name === 'onChanges' && changes.field) {
            this.resetRefs(changes.field.previousValue);
            this.render();
        }
    }
    /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    attachComponentRef(ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        Object.assign(ref.instance, { field });
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        if (!this.field) {
            return;
        }
        // require Formly build
        if (!this.field.options) {
            this.detectFieldBuild = true;
            return;
        }
        this.detectFieldBuild = false;
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        unsubscribe => unsubscribe()));
        this.hostObservers = [
            wrapProperty(this.field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if (!firstChange || (firstChange && currentValue)) {
                    this.renderer.setStyle(this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                }
                if (!this.formlyConfig.extras.lazyRender) {
                    firstChange && this.renderField(this.containerRef, this.field);
                }
                else {
                    if (currentValue) {
                        this.containerRef.clear();
                        if (this.field.className) {
                            this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        this.renderField(this.containerRef, this.field);
                        if (this.field.className) {
                            this.renderer.setAttribute(this.elementRef.nativeElement, 'class', this.field.className);
                        }
                    }
                }
            })),
            wrapProperty(this.field, 'className', (/**
             * @param {?} __0
             * @return {?}
             */
            ({ firstChange, currentValue }) => {
                if ((!firstChange || (firstChange && currentValue))
                    && (!this.formlyConfig.extras.lazyRender || (this.field.hide !== true))) {
                    this.renderer.setAttribute(this.elementRef.nativeElement, 'class', currentValue);
                }
            })),
        ];
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    resetRefs(field) {
        if (field) {
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((/**
                 * @param {?} ref
                 * @return {?}
                 */
                ref => this.componentRefs.indexOf(ref) === -1));
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    }
}
FormlyField.decorators = [
    { type: Component, args: [{
                selector: 'formly-field',
                template: `<ng-template #container></ng-template>`
            }] }
];
/** @nocollapse */
FormlyField.ctorParameters = () => [
    { type: FormlyConfig },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Attribute, args: ['hide-deprecation',] }] }
];
FormlyField.propDecorators = {
    field: [{ type: Input }],
    model: [{ type: Input }],
    form: [{ type: Input }],
    options: [{ type: Input }],
    modelChange: [{ type: Output }],
    containerRef: [{ type: ViewChild, args: ['container', (/** @type {?} */ ({ read: ViewContainerRef, static: true })),] }]
};
if (false) {
    /** @type {?} */
    FormlyField.prototype.field;
    /** @type {?} */
    FormlyField.prototype.warnDeprecation;
    /** @type {?} */
    FormlyField.prototype.modelChange;
    /** @type {?} */
    FormlyField.prototype.containerRef;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.hostObservers;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.componentRefs;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.hooksObservers;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.detectFieldBuild;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.formlyConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.resolver;
    /**
     * @type {?}
     * @private
     */
    FormlyField.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZpZWxkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDdEMsZ0JBQWdCLEVBQUUsU0FBUyxFQUErQixTQUFTLEVBQUUsd0JBQXdCLEVBQ2tCLFNBQVMsRUFBRSxVQUFVLEdBQ3JJLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUcxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTXBDLE1BQU0sT0FBTyxXQUFXOzs7Ozs7OztJQXlCdEIsWUFDVSxZQUEwQixFQUMxQixRQUFtQixFQUNuQixRQUFrQyxFQUNsQyxVQUFzQjtJQUM5QiwyQkFBMkI7SUFDSSxlQUFlO1FBTHRDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTFCaEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFjZCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3RELGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQVUvQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsS0FBSyxJQUFJLENBQUM7SUFD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Ry9CLG1DQUFrQzs7Ozs7SUFDbEMsK0JBQTJCOzs7OztJQUMzQiwrQkFBMEM7Ozs7O0lBQzFDLGlDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIENvbXBvbmVudFJlZiwgU2ltcGxlQ2hhbmdlcywgQXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIERvQ2hlY2ssIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIFJlbmRlcmVyMiwgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGb3JtT3B0aW9ucywgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4vZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZpbmVIaWRkZW5Qcm9wLCB3cmFwUHJvcGVydHkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZmllbGQud3JhcHBlcic7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZmllbGQudHlwZSc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPmAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2ssIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcblxuICB3YXJuRGVwcmVjYXRpb24gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgbW9kZWwobTogYW55KSB7XG4gICAgdGhpcy53YXJuRGVwcmVjYXRpb24gJiYgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ21vZGVsJyBpbnB1dCB0byAnJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9JyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkIGFueW1vcmUsIHlvdSBtYXkgcmVtb3ZlIGl0IWApO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgdGhpcy53YXJuRGVwcmVjYXRpb24gJiYgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ2Zvcm0nIGlucHV0IHRvICcke3RoaXMuY29uc3RydWN0b3IubmFtZX0nIGNvbXBvbmVudCBpcyBub3QgcmVxdWlyZWQgYW55bW9yZSwgeW91IG1heSByZW1vdmUgaXQhYCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9ucykge1xuICAgIHRoaXMud2FybkRlcHJlY2F0aW9uICYmIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdvcHRpb25zJyBpbnB1dCB0byAnJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9JyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkIGFueW1vcmUsIHlvdSBtYXkgcmVtb3ZlIGl0IWApO1xuICB9XG5cbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETzogcmVtb3ZlIGBhbnlgLCBvbmNlIGRyb3BwaW5nIGFuZ3VsYXIgYFY3YCBzdXBwb3J0LlxuICBAVmlld0NoaWxkKCdjb250YWluZXInLCA8YW55PiB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBob3N0T2JzZXJ2ZXJzOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgY29tcG9uZW50UmVmczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBob29rc09ic2VydmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIGRldGVjdEZpZWxkQnVpbGQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBBdHRyaWJ1dGUoJ2hpZGUtZGVwcmVjYXRpb24nKSBoaWRlRGVwcmVjYXRpb24sXG4gICkge1xuICAgIHRoaXMud2FybkRlcHJlY2F0aW9uID0gaGlkZURlcHJlY2F0aW9uID09PSBudWxsO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ2FmdGVyQ29udGVudEluaXQnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXJIb29rKCdhZnRlckNvbnRlbnRDaGVja2VkJyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VySG9vaygnYWZ0ZXJWaWV3SW5pdCcpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ2FmdGVyVmlld0NoZWNrZWQnKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnRyaWdnZXJIb29rKCdkb0NoZWNrJyk7XG4gICAgaWYgKHRoaXMuZGV0ZWN0RmllbGRCdWlsZCAmJiAodGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uSW5pdCcpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uQ2hhbmdlcycsIGNoYW5nZXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNldFJlZnModGhpcy5maWVsZCk7XG4gICAgdGhpcy5ob3N0T2JzZXJ2ZXJzLmZvckVhY2godW5zdWJzY3JpYmUgPT4gdW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5ob29rc09ic2VydmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlID0+IHVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uRGVzdHJveScpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJGaWVsZChjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGY6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyUmVmID09PSBjb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMucmVzZXRSZWZzKHRoaXMuZmllbGQpO1xuICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIHdyYXBwZXJzID0gdGhpcy5maWVsZCA/IHRoaXMuZmllbGQud3JhcHBlcnMgOiBbXTtcbiAgICB9XG5cbiAgICBpZiAod3JhcHBlcnMgJiYgd3JhcHBlcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgW3dyYXBwZXIsIC4uLndwc10gPSB3cmFwcGVycztcbiAgICAgIGNvbnN0IHsgY29tcG9uZW50IH0gPSB0aGlzLmZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKHdyYXBwZXIpO1xuXG4gICAgICBjb25zdCByZWYgPSBjb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50PEZpZWxkV3JhcHBlcj4odGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpKTtcbiAgICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50UmVmKHJlZiwgZik7XG4gICAgICB3cmFwUHJvcGVydHk8Vmlld0NvbnRhaW5lclJlZj4ocmVmLmluc3RhbmNlLCAnZmllbGRDb21wb25lbnQnLCAoeyBmaXJzdENoYW5nZSwgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlIH0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHByZXZpb3VzVmFsdWVbJ19sQ29udGFpbmVyJ10gPT09IGN1cnJlbnRWYWx1ZVsnX2xDb250YWluZXInXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHZpZXdSZWYgPSBwcmV2aW91c1ZhbHVlID8gcHJldmlvdXNWYWx1ZS5kZXRhY2goKSA6IG51bGw7XG4gICAgICAgICAgaWYgKHZpZXdSZWYgJiYgIXZpZXdSZWYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWUuaW5zZXJ0KHZpZXdSZWYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZpZWxkKGN1cnJlbnRWYWx1ZSwgZiwgd3BzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAhZmlyc3RDaGFuZ2UgJiYgcmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChmICYmIGYudHlwZSkge1xuICAgICAgY29uc3QgeyBjb21wb25lbnQgfSA9IHRoaXMuZm9ybWx5Q29uZmlnLmdldFR5cGUoZi50eXBlKTtcbiAgICAgIGNvbnN0IHJlZiA9IGNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQ8RmllbGRXcmFwcGVyPih0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCkpO1xuICAgICAgdGhpcy5hdHRhY2hDb21wb25lbnRSZWYocmVmLCBmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJIb29rKG5hbWU6IHN0cmluZywgY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkLmhvb2tzICYmIHRoaXMuZmllbGQuaG9va3NbbmFtZV0pIHtcbiAgICAgIGlmICghY2hhbmdlcyB8fCBjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmZpZWxkLmhvb2tzW25hbWVdKHRoaXMuZmllbGQpO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlKHIpICYmIFsnb25Jbml0JywgJ2FmdGVyQ29udGVudEluaXQnLCAnYWZ0ZXJWaWV3SW5pdCddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgY29uc3Qgc3ViID0gci5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmhvb2tzT2JzZXJ2ZXJzLnB1c2goKCkgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmllbGQgJiYgdGhpcy5maWVsZC5saWZlY3ljbGUgJiYgdGhpcy5maWVsZC5saWZlY3ljbGVbbmFtZV0pIHtcbiAgICAgIHRoaXMuZmllbGQubGlmZWN5Y2xlW25hbWVdKFxuICAgICAgICB0aGlzLmZpZWxkLmZvcm0sXG4gICAgICAgIHRoaXMuZmllbGQsXG4gICAgICAgIHRoaXMuZmllbGQubW9kZWwsXG4gICAgICAgIHRoaXMuZmllbGQub3B0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdvbkNoYW5nZXMnICYmIGNoYW5nZXMuZmllbGQpIHtcbiAgICAgIHRoaXMucmVzZXRSZWZzKGNoYW5nZXMuZmllbGQucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50UmVmPFQgZXh0ZW5kcyBGaWVsZFR5cGU+KHJlZjogQ29tcG9uZW50UmVmPFQ+LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIHRoaXMuY29tcG9uZW50UmVmcy5wdXNoKHJlZik7XG4gICAgZmllbGQuX2NvbXBvbmVudFJlZnMucHVzaChyZWYpO1xuICAgIE9iamVjdC5hc3NpZ24ocmVmLmluc3RhbmNlLCB7IGZpZWxkIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcmVxdWlyZSBGb3JtbHkgYnVpbGRcbiAgICBpZiAoIXRoaXMuZmllbGQub3B0aW9ucykge1xuICAgICAgdGhpcy5kZXRlY3RGaWVsZEJ1aWxkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGV0ZWN0RmllbGRCdWlsZCA9IGZhbHNlO1xuICAgIHRoaXMuaG9zdE9ic2VydmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlID0+IHVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuaG9zdE9ic2VydmVycyA9IFtcbiAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLmZpZWxkLCAnaGlkZScsICh7IGZpcnN0Q2hhbmdlLCBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlIHx8IChmaXJzdENoYW5nZSAmJiBjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCBjdXJyZW50VmFsdWUgPyAnbm9uZScgOiAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZm9ybWx5Q29uZmlnLmV4dHJhcy5sYXp5UmVuZGVyKSB7XG4gICAgICAgICAgZmlyc3RDaGFuZ2UgJiYgdGhpcy5yZW5kZXJGaWVsZCh0aGlzLmNvbnRhaW5lclJlZiwgdGhpcy5maWVsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsYXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRmllbGQodGhpcy5jb250YWluZXJSZWYsIHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGQuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xhc3MnLCB0aGlzLmZpZWxkLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLmZpZWxkLCAnY2xhc3NOYW1lJywgKHsgZmlyc3RDaGFuZ2UsIGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoIWZpcnN0Q2hhbmdlIHx8IChmaXJzdENoYW5nZSAmJiBjdXJyZW50VmFsdWUpKVxuICAgICAgICAgICYmICghdGhpcy5mb3JtbHlDb25maWcuZXh0cmFzLmxhenlSZW5kZXIgfHwgKHRoaXMuZmllbGQuaGlkZSAhPT0gdHJ1ZSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xhc3MnLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFJlZnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZC5fY29tcG9uZW50UmVmcykge1xuICAgICAgICBmaWVsZC5fY29tcG9uZW50UmVmcyA9IGZpZWxkLl9jb21wb25lbnRSZWZzLmZpbHRlcihyZWYgPT4gdGhpcy5jb21wb25lbnRSZWZzLmluZGV4T2YocmVmKSA9PT0gLTEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lSGlkZGVuUHJvcCh0aGlzLmZpZWxkLCAnX2NvbXBvbmVudFJlZnMnLCBbXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb21wb25lbnRSZWZzID0gW107XG4gIH1cbn1cbiJdfQ==