/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewContainerRef, ViewChild, Attribute, ComponentFactoryResolver, Renderer2, ElementRef, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfig } from '../services/formly.config';
import { defineHiddenProp, wrapProperty } from '../utils';
import { isObservable } from 'rxjs';
var FormlyField = /** @class */ (function () {
    function FormlyField(formlyConfig, renderer, resolver, elementRef, 
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
    Object.defineProperty(FormlyField.prototype, "model", {
        set: /**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'model' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyField.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'form' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyField.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this.warnDeprecation && console.warn("NgxFormly: passing 'options' input to '" + this.constructor.name + "' component is not required anymore, you may remove it!");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterContentInit');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterContentChecked');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterViewInit');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.triggerHook('afterViewChecked');
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.triggerHook('doCheck');
        if (this.detectFieldBuild && (this.field && this.field.options)) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.triggerHook('onInit');
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormlyField.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.triggerHook('onChanges', changes);
    };
    /**
     * @return {?}
     */
    FormlyField.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resetRefs(this.field);
        this.hostObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        function (unsubscribe) { return unsubscribe(); }));
        this.hooksObservers.forEach((/**
         * @param {?} unsubscribe
         * @return {?}
         */
        function (unsubscribe) { return unsubscribe(); }));
        this.triggerHook('onDestroy');
    };
    /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    FormlyField.prototype.renderField = /**
     * @private
     * @param {?} containerRef
     * @param {?} f
     * @param {?=} wrappers
     * @return {?}
     */
    function (containerRef, f, wrappers) {
        var _this = this;
        if (wrappers === void 0) { wrappers = []; }
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field ? this.field.wrappers : [];
        }
        if (wrappers && wrappers.length > 0) {
            var _a = tslib_1.__read(wrappers), wrapper = _a[0], wps_1 = _a.slice(1);
            var component = this.formlyConfig.getWrapper(wrapper).component;
            /** @type {?} */
            var ref_1 = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref_1, f);
            wrapProperty(ref_1.instance, 'fieldComponent', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, previousValue = _a.previousValue, currentValue = _a.currentValue;
                if (currentValue) {
                    if (previousValue && previousValue['_lContainer'] === currentValue['_lContainer']) {
                        return;
                    }
                    /** @type {?} */
                    var viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        _this.renderField(currentValue, f, wps_1);
                    }
                    !firstChange && ref_1.changeDetectorRef.detectChanges();
                }
            }));
        }
        else if (f && f.type) {
            var component = this.formlyConfig.getType(f.type).component;
            /** @type {?} */
            var ref = containerRef.createComponent(this.resolver.resolveComponentFactory(component));
            this.attachComponentRef(ref, f);
        }
    };
    /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    FormlyField.prototype.triggerHook = /**
     * @private
     * @param {?} name
     * @param {?=} changes
     * @return {?}
     */
    function (name, changes) {
        if (this.field && this.field.hooks && this.field.hooks[name]) {
            if (!changes || changes.field) {
                /** @type {?} */
                var r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    /** @type {?} */
                    var sub_1 = r.subscribe();
                    this.hooksObservers.push((/**
                     * @return {?}
                     */
                    function () { return sub_1.unsubscribe(); }));
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
    };
    /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    FormlyField.prototype.attachComponentRef = /**
     * @private
     * @template T
     * @param {?} ref
     * @param {?} field
     * @return {?}
     */
    function (ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        Object.assign(ref.instance, { field: field });
    };
    /**
     * @private
     * @return {?}
     */
    FormlyField.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (unsubscribe) { return unsubscribe(); }));
        this.hostObservers = [
            wrapProperty(this.field, 'hide', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, currentValue = _a.currentValue;
                if (!firstChange || (firstChange && currentValue)) {
                    _this.renderer.setStyle(_this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                }
                if (!_this.formlyConfig.extras.lazyRender) {
                    firstChange && _this.renderField(_this.containerRef, _this.field);
                }
                else {
                    if (currentValue) {
                        _this.containerRef.clear();
                        if (_this.field.className) {
                            _this.renderer.removeAttribute(_this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        _this.renderField(_this.containerRef, _this.field);
                        if (_this.field.className) {
                            _this.renderer.setAttribute(_this.elementRef.nativeElement, 'class', _this.field.className);
                        }
                    }
                }
            })),
            wrapProperty(this.field, 'className', (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var firstChange = _a.firstChange, currentValue = _a.currentValue;
                if ((!firstChange || (firstChange && currentValue))
                    && (!_this.formlyConfig.extras.lazyRender || (_this.field.hide !== true))) {
                    _this.renderer.setAttribute(_this.elementRef.nativeElement, 'class', currentValue);
                }
            })),
        ];
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyField.prototype.resetRefs = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field) {
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((/**
                 * @param {?} ref
                 * @return {?}
                 */
                function (ref) { return _this.componentRefs.indexOf(ref) === -1; }));
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    };
    FormlyField.decorators = [
        { type: Component, args: [{
                    selector: 'formly-field',
                    template: "<ng-template #container></ng-template>"
                }] }
    ];
    /** @nocollapse */
    FormlyField.ctorParameters = function () { return [
        { type: FormlyConfig },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Attribute, args: ['hide-deprecation',] }] }
    ]; };
    FormlyField.propDecorators = {
        field: [{ type: Input }],
        model: [{ type: Input }],
        form: [{ type: Input }],
        options: [{ type: Input }],
        modelChange: [{ type: Output }],
        containerRef: [{ type: ViewChild, args: ['container', (/** @type {?} */ ({ read: ViewContainerRef, static: true })),] }]
    };
    return FormlyField;
}());
export { FormlyField };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZpZWxkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1mb3JtbHkvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQ3RDLGdCQUFnQixFQUFFLFNBQVMsRUFBK0IsU0FBUyxFQUFFLHdCQUF3QixFQUNrQixTQUFTLEVBQUUsVUFBVSxHQUNySSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQztJQTZCRSxxQkFDVSxZQUEwQixFQUMxQixRQUFtQixFQUNuQixRQUFrQyxFQUNsQyxVQUFzQjtJQUM5QiwyQkFBMkI7SUFDSSxlQUFlO1FBTHRDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTFCaEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFjZCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3RELGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQVUvQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsS0FBSyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQTdCRCxzQkFBYSw4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QXFMdkUsa0JBQUM7Q0FBQSxBQTVNRCxJQTRNQztTQXhNWSxXQUFXOzs7SUFDdEIsNEJBQWtDOztJQUVsQyxzQ0FBd0I7O0lBY3hCLGtDQUE4RDs7SUFFOUQsbUNBQXNHOzs7OztJQUN0RyxvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUFrQzs7Ozs7SUFDbEMscUNBQXdDOzs7OztJQUN4Qyx1Q0FBaUM7Ozs7O0lBRy9CLG1DQUFrQzs7Ozs7SUFDbEMsK0JBQTJCOzs7OztJQUMzQiwrQkFBMEM7Ozs7O0lBQzFDLGlDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIENvbXBvbmVudFJlZiwgU2ltcGxlQ2hhbmdlcywgQXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIERvQ2hlY2ssIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIFJlbmRlcmVyMiwgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGb3JtT3B0aW9ucywgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4vZm9ybWx5LmZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZpbmVIaWRkZW5Qcm9wLCB3cmFwUHJvcGVydHkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZmllbGQud3JhcHBlcic7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZmllbGQudHlwZSc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPmAsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2ssIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcblxuICB3YXJuRGVwcmVjYXRpb24gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgbW9kZWwobTogYW55KSB7XG4gICAgdGhpcy53YXJuRGVwcmVjYXRpb24gJiYgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ21vZGVsJyBpbnB1dCB0byAnJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9JyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkIGFueW1vcmUsIHlvdSBtYXkgcmVtb3ZlIGl0IWApO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgdGhpcy53YXJuRGVwcmVjYXRpb24gJiYgY29uc29sZS53YXJuKGBOZ3hGb3JtbHk6IHBhc3NpbmcgJ2Zvcm0nIGlucHV0IHRvICcke3RoaXMuY29uc3RydWN0b3IubmFtZX0nIGNvbXBvbmVudCBpcyBub3QgcmVxdWlyZWQgYW55bW9yZSwgeW91IG1heSByZW1vdmUgaXQhYCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBGb3JtbHlGb3JtT3B0aW9ucykge1xuICAgIHRoaXMud2FybkRlcHJlY2F0aW9uICYmIGNvbnNvbGUud2FybihgTmd4Rm9ybWx5OiBwYXNzaW5nICdvcHRpb25zJyBpbnB1dCB0byAnJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9JyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkIGFueW1vcmUsIHlvdSBtYXkgcmVtb3ZlIGl0IWApO1xuICB9XG5cbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETzogcmVtb3ZlIGBhbnlgLCBvbmNlIGRyb3BwaW5nIGFuZ3VsYXIgYFY3YCBzdXBwb3J0LlxuICBAVmlld0NoaWxkKCdjb250YWluZXInLCA8YW55PiB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBob3N0T2JzZXJ2ZXJzOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgY29tcG9uZW50UmVmczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBob29rc09ic2VydmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIGRldGVjdEZpZWxkQnVpbGQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBBdHRyaWJ1dGUoJ2hpZGUtZGVwcmVjYXRpb24nKSBoaWRlRGVwcmVjYXRpb24sXG4gICkge1xuICAgIHRoaXMud2FybkRlcHJlY2F0aW9uID0gaGlkZURlcHJlY2F0aW9uID09PSBudWxsO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ2FmdGVyQ29udGVudEluaXQnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXJIb29rKCdhZnRlckNvbnRlbnRDaGVja2VkJyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VySG9vaygnYWZ0ZXJWaWV3SW5pdCcpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ2FmdGVyVmlld0NoZWNrZWQnKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnRyaWdnZXJIb29rKCdkb0NoZWNrJyk7XG4gICAgaWYgKHRoaXMuZGV0ZWN0RmllbGRCdWlsZCAmJiAodGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uSW5pdCcpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uQ2hhbmdlcycsIGNoYW5nZXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNldFJlZnModGhpcy5maWVsZCk7XG4gICAgdGhpcy5ob3N0T2JzZXJ2ZXJzLmZvckVhY2godW5zdWJzY3JpYmUgPT4gdW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5ob29rc09ic2VydmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlID0+IHVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uRGVzdHJveScpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJGaWVsZChjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGY6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyUmVmID09PSBjb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMucmVzZXRSZWZzKHRoaXMuZmllbGQpO1xuICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIHdyYXBwZXJzID0gdGhpcy5maWVsZCA/IHRoaXMuZmllbGQud3JhcHBlcnMgOiBbXTtcbiAgICB9XG5cbiAgICBpZiAod3JhcHBlcnMgJiYgd3JhcHBlcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgW3dyYXBwZXIsIC4uLndwc10gPSB3cmFwcGVycztcbiAgICAgIGNvbnN0IHsgY29tcG9uZW50IH0gPSB0aGlzLmZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKHdyYXBwZXIpO1xuXG4gICAgICBjb25zdCByZWYgPSBjb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50PEZpZWxkV3JhcHBlcj4odGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpKTtcbiAgICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50UmVmKHJlZiwgZik7XG4gICAgICB3cmFwUHJvcGVydHk8Vmlld0NvbnRhaW5lclJlZj4ocmVmLmluc3RhbmNlLCAnZmllbGRDb21wb25lbnQnLCAoeyBmaXJzdENoYW5nZSwgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlIH0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHByZXZpb3VzVmFsdWVbJ19sQ29udGFpbmVyJ10gPT09IGN1cnJlbnRWYWx1ZVsnX2xDb250YWluZXInXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHZpZXdSZWYgPSBwcmV2aW91c1ZhbHVlID8gcHJldmlvdXNWYWx1ZS5kZXRhY2goKSA6IG51bGw7XG4gICAgICAgICAgaWYgKHZpZXdSZWYgJiYgIXZpZXdSZWYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWUuaW5zZXJ0KHZpZXdSZWYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckZpZWxkKGN1cnJlbnRWYWx1ZSwgZiwgd3BzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAhZmlyc3RDaGFuZ2UgJiYgcmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChmICYmIGYudHlwZSkge1xuICAgICAgY29uc3QgeyBjb21wb25lbnQgfSA9IHRoaXMuZm9ybWx5Q29uZmlnLmdldFR5cGUoZi50eXBlKTtcbiAgICAgIGNvbnN0IHJlZiA9IGNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQ8RmllbGRXcmFwcGVyPih0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCkpO1xuICAgICAgdGhpcy5hdHRhY2hDb21wb25lbnRSZWYocmVmLCBmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJIb29rKG5hbWU6IHN0cmluZywgY2hhbmdlcz86IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkLmhvb2tzICYmIHRoaXMuZmllbGQuaG9va3NbbmFtZV0pIHtcbiAgICAgIGlmICghY2hhbmdlcyB8fCBjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmZpZWxkLmhvb2tzW25hbWVdKHRoaXMuZmllbGQpO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlKHIpICYmIFsnb25Jbml0JywgJ2FmdGVyQ29udGVudEluaXQnLCAnYWZ0ZXJWaWV3SW5pdCddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgY29uc3Qgc3ViID0gci5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmhvb2tzT2JzZXJ2ZXJzLnB1c2goKCkgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmllbGQgJiYgdGhpcy5maWVsZC5saWZlY3ljbGUgJiYgdGhpcy5maWVsZC5saWZlY3ljbGVbbmFtZV0pIHtcbiAgICAgIHRoaXMuZmllbGQubGlmZWN5Y2xlW25hbWVdKFxuICAgICAgICB0aGlzLmZpZWxkLmZvcm0sXG4gICAgICAgIHRoaXMuZmllbGQsXG4gICAgICAgIHRoaXMuZmllbGQubW9kZWwsXG4gICAgICAgIHRoaXMuZmllbGQub3B0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdvbkNoYW5nZXMnICYmIGNoYW5nZXMuZmllbGQpIHtcbiAgICAgIHRoaXMucmVzZXRSZWZzKGNoYW5nZXMuZmllbGQucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50UmVmPFQgZXh0ZW5kcyBGaWVsZFR5cGU+KHJlZjogQ29tcG9uZW50UmVmPFQ+LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIHRoaXMuY29tcG9uZW50UmVmcy5wdXNoKHJlZik7XG4gICAgZmllbGQuX2NvbXBvbmVudFJlZnMucHVzaChyZWYpO1xuICAgIE9iamVjdC5hc3NpZ24ocmVmLmluc3RhbmNlLCB7IGZpZWxkIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcmVxdWlyZSBGb3JtbHkgYnVpbGRcbiAgICBpZiAoIXRoaXMuZmllbGQub3B0aW9ucykge1xuICAgICAgdGhpcy5kZXRlY3RGaWVsZEJ1aWxkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGV0ZWN0RmllbGRCdWlsZCA9IGZhbHNlO1xuICAgIHRoaXMuaG9zdE9ic2VydmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlID0+IHVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuaG9zdE9ic2VydmVycyA9IFtcbiAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLmZpZWxkLCAnaGlkZScsICh7IGZpcnN0Q2hhbmdlLCBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlIHx8IChmaXJzdENoYW5nZSAmJiBjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCBjdXJyZW50VmFsdWUgPyAnbm9uZScgOiAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZm9ybWx5Q29uZmlnLmV4dHJhcy5sYXp5UmVuZGVyKSB7XG4gICAgICAgICAgZmlyc3RDaGFuZ2UgJiYgdGhpcy5yZW5kZXJGaWVsZCh0aGlzLmNvbnRhaW5lclJlZiwgdGhpcy5maWVsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsYXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRmllbGQodGhpcy5jb250YWluZXJSZWYsIHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGQuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xhc3MnLCB0aGlzLmZpZWxkLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHdyYXBQcm9wZXJ0eSh0aGlzLmZpZWxkLCAnY2xhc3NOYW1lJywgKHsgZmlyc3RDaGFuZ2UsIGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoIWZpcnN0Q2hhbmdlIHx8IChmaXJzdENoYW5nZSAmJiBjdXJyZW50VmFsdWUpKVxuICAgICAgICAgICYmICghdGhpcy5mb3JtbHlDb25maWcuZXh0cmFzLmxhenlSZW5kZXIgfHwgKHRoaXMuZmllbGQuaGlkZSAhPT0gdHJ1ZSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xhc3MnLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFJlZnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZC5fY29tcG9uZW50UmVmcykge1xuICAgICAgICBmaWVsZC5fY29tcG9uZW50UmVmcyA9IGZpZWxkLl9jb21wb25lbnRSZWZzLmZpbHRlcihyZWYgPT4gdGhpcy5jb21wb25lbnRSZWZzLmluZGV4T2YocmVmKSA9PT0gLTEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lSGlkZGVuUHJvcCh0aGlzLmZpZWxkLCAnX2NvbXBvbmVudFJlZnMnLCBbXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb21wb25lbnRSZWZzID0gW107XG4gIH1cbn1cbiJdfQ==