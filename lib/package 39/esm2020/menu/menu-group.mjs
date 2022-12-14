/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Output, EventEmitter, ContentChildren, QueryList, } from '@angular/core';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { CdkMenuItemSelectable } from './menu-item-selectable';
import * as i0 from "@angular/core";
/**
 * Directive which acts as a grouping container for `CdkMenuItem` instances with
 * `role="menuitemradio"`, similar to a `role="radiogroup"` element.
 */
export class CdkMenuGroup {
    constructor() {
        /** Emits the element when checkbox or radiobutton state changed  */
        this.change = new EventEmitter();
        /** Emits when the _selectableItems QueryList triggers a change */
        this._selectableChanges = new EventEmitter();
    }
    ngAfterContentInit() {
        this._registerMenuSelectionListeners();
    }
    /**
     * Register the child selectable elements with the change emitter and ensure any new child
     * elements do so as well.
     */
    _registerMenuSelectionListeners() {
        this._selectableItems.forEach(selectable => this._registerClickListener(selectable));
        this._selectableItems.changes.subscribe((selectableItems) => {
            this._selectableChanges.next();
            selectableItems.forEach(selectable => this._registerClickListener(selectable));
        });
    }
    /** Register each selectable to emit on the change Emitter when clicked */
    _registerClickListener(selectable) {
        selectable.toggled
            .pipe(takeUntil(this._selectableChanges))
            .subscribe(() => this.change.next(selectable));
    }
    ngOnDestroy() {
        this._selectableChanges.next();
        this._selectableChanges.complete();
    }
}
CdkMenuGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CdkMenuGroup, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CdkMenuGroup.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: CdkMenuGroup, selector: "[cdkMenuGroup]", outputs: { change: "change" }, host: { attributes: { "role": "group" }, classAttribute: "cdk-menu-group" }, providers: [{ provide: UniqueSelectionDispatcher, useClass: UniqueSelectionDispatcher }], queries: [{ propertyName: "_selectableItems", predicate: CdkMenuItemSelectable, descendants: true }], exportAs: ["cdkMenuGroup"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: CdkMenuGroup, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkMenuGroup]',
                    exportAs: 'cdkMenuGroup',
                    host: {
                        'role': 'group',
                        'class': 'cdk-menu-group',
                    },
                    providers: [{ provide: UniqueSelectionDispatcher, useClass: UniqueSelectionDispatcher }],
                }]
        }], propDecorators: { change: [{
                type: Output
            }], _selectableItems: [{
                type: ContentChildren,
                args: [CdkMenuItemSelectable, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL21lbnUvbWVudS1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osZUFBZSxFQUVmLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRzdEOzs7R0FHRztBQVVILE1BQU0sT0FBTyxZQUFZO0lBVHpCO1FBVUUsb0VBQW9FO1FBQ2pELFdBQU0sR0FBOEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU0xRSxrRUFBa0U7UUFDakQsdUJBQWtCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7S0E4QjlFO0lBNUJDLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssK0JBQStCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUVyRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWlELEVBQUUsRUFBRTtZQUM1RixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0IsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBFQUEwRTtJQUNsRSxzQkFBc0IsQ0FBQyxVQUFpQztRQUM5RCxVQUFVLENBQUMsT0FBTzthQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDeEMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7O3lHQXRDVSxZQUFZOzZGQUFaLFlBQVkscUpBRlosQ0FBQyxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUMsQ0FBQywyREFPckUscUJBQXFCOzJGQUwzQixZQUFZO2tCQVR4QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLE9BQU87d0JBQ2YsT0FBTyxFQUFFLGdCQUFnQjtxQkFDMUI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFDLENBQUM7aUJBQ3ZGOzhCQUdvQixNQUFNO3NCQUF4QixNQUFNO2dCQUlVLGdCQUFnQjtzQkFEaEMsZUFBZTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ29udGVudENoaWxkcmVuLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBRdWVyeUxpc3QsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDZGtNZW51SXRlbVNlbGVjdGFibGV9IGZyb20gJy4vbWVudS1pdGVtLXNlbGVjdGFibGUnO1xuaW1wb3J0IHtDZGtNZW51SXRlbX0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBhY3RzIGFzIGEgZ3JvdXBpbmcgY29udGFpbmVyIGZvciBgQ2RrTWVudUl0ZW1gIGluc3RhbmNlcyB3aXRoXG4gKiBgcm9sZT1cIm1lbnVpdGVtcmFkaW9cImAsIHNpbWlsYXIgdG8gYSBgcm9sZT1cInJhZGlvZ3JvdXBcImAgZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka01lbnVHcm91cF0nLFxuICBleHBvcnRBczogJ2Nka01lbnVHcm91cCcsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdncm91cCcsXG4gICAgJ2NsYXNzJzogJ2Nkay1tZW51LWdyb3VwJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsIHVzZUNsYXNzOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyfV0sXG59KVxuZXhwb3J0IGNsYXNzIENka01lbnVHcm91cCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBFbWl0cyB0aGUgZWxlbWVudCB3aGVuIGNoZWNrYm94IG9yIHJhZGlvYnV0dG9uIHN0YXRlIGNoYW5nZWQgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDZGtNZW51SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqIExpc3Qgb2YgbWVudWl0ZW1jaGVja2JveCBvciBtZW51aXRlbXJhZGlvIGVsZW1lbnRzIHdoaWNoIHJlc2lkZSBpbiB0aGlzIGdyb3VwICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2RrTWVudUl0ZW1TZWxlY3RhYmxlLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBwcml2YXRlIHJlYWRvbmx5IF9zZWxlY3RhYmxlSXRlbXM6IFF1ZXJ5TGlzdDxDZGtNZW51SXRlbVNlbGVjdGFibGU+O1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBfc2VsZWN0YWJsZUl0ZW1zIFF1ZXJ5TGlzdCB0cmlnZ2VycyBhIGNoYW5nZSAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9zZWxlY3RhYmxlQ2hhbmdlczogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9yZWdpc3Rlck1lbnVTZWxlY3Rpb25MaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciB0aGUgY2hpbGQgc2VsZWN0YWJsZSBlbGVtZW50cyB3aXRoIHRoZSBjaGFuZ2UgZW1pdHRlciBhbmQgZW5zdXJlIGFueSBuZXcgY2hpbGRcbiAgICogZWxlbWVudHMgZG8gc28gYXMgd2VsbC5cbiAgICovXG4gIHByaXZhdGUgX3JlZ2lzdGVyTWVudVNlbGVjdGlvbkxpc3RlbmVycygpIHtcbiAgICB0aGlzLl9zZWxlY3RhYmxlSXRlbXMuZm9yRWFjaChzZWxlY3RhYmxlID0+IHRoaXMuX3JlZ2lzdGVyQ2xpY2tMaXN0ZW5lcihzZWxlY3RhYmxlKSk7XG5cbiAgICB0aGlzLl9zZWxlY3RhYmxlSXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKHNlbGVjdGFibGVJdGVtczogUXVlcnlMaXN0PENka01lbnVJdGVtU2VsZWN0YWJsZT4pID0+IHtcbiAgICAgIHRoaXMuX3NlbGVjdGFibGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgIHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKHNlbGVjdGFibGUgPT4gdGhpcy5fcmVnaXN0ZXJDbGlja0xpc3RlbmVyKHNlbGVjdGFibGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZWdpc3RlciBlYWNoIHNlbGVjdGFibGUgdG8gZW1pdCBvbiB0aGUgY2hhbmdlIEVtaXR0ZXIgd2hlbiBjbGlja2VkICovXG4gIHByaXZhdGUgX3JlZ2lzdGVyQ2xpY2tMaXN0ZW5lcihzZWxlY3RhYmxlOiBDZGtNZW51SXRlbVNlbGVjdGFibGUpIHtcbiAgICBzZWxlY3RhYmxlLnRvZ2dsZWRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9zZWxlY3RhYmxlQ2hhbmdlcykpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlLm5leHQoc2VsZWN0YWJsZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX3NlbGVjdGFibGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==