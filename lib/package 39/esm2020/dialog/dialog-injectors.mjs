/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
/** Injection token for the Dialog's ScrollStrategy. */
export const DIALOG_SCROLL_STRATEGY = new InjectionToken('DialogScrollStrategy');
/** Injection token for the Dialog's Data. */
export const DIALOG_DATA = new InjectionToken('DialogData');
/** Injection token for the DialogRef constructor. */
export const DIALOG_REF = new InjectionToken('DialogRef');
/** Injection token for the DialogConfig. */
export const DIALOG_CONFIG = new InjectionToken('DialogConfig');
/** Injection token for the Dialog's DialogContainer component. */
export const DIALOG_CONTAINER = new InjectionToken('DialogContainer');
/** @docs-private */
export function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/** @docs-private */
export const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWluamVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL2RpYWxvZy9kaWFsb2ctaW5qZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFnQixPQUFPLEVBQWlCLE1BQU0sc0JBQXNCLENBQUM7QUFLNUUsdURBQXVEO0FBQ3ZELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUN0RCxzQkFBc0IsQ0FDdkIsQ0FBQztBQUVGLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQU0sWUFBWSxDQUFDLENBQUM7QUFFakUscURBQXFEO0FBQ3JELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsV0FBVyxDQUFDLENBQUM7QUFFMUUsNENBQTRDO0FBQzVDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBZSxjQUFjLENBQUMsQ0FBQztBQUU5RSxrRUFBa0U7QUFDbEUsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQ2hELGlCQUFpQixDQUNsQixDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSwyQ0FBMkMsQ0FDekQsT0FBZ0I7SUFFaEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUVELG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBRztJQUNqRCxPQUFPLEVBQUUsc0JBQXNCO0lBQy9CLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNmLFVBQVUsRUFBRSwyQ0FBMkM7Q0FDeEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50VHlwZSwgT3ZlcmxheSwgU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7RGlhbG9nUmVmfSBmcm9tICcuL2RpYWxvZy1yZWYnO1xuaW1wb3J0IHtDZGtEaWFsb2dDb250YWluZXJ9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lcic7XG5pbXBvcnQge0RpYWxvZ0NvbmZpZ30gZnJvbSAnLi9kaWFsb2ctY29uZmlnJztcblxuLyoqIEluamVjdGlvbiB0b2tlbiBmb3IgdGhlIERpYWxvZydzIFNjcm9sbFN0cmF0ZWd5LiAqL1xuZXhwb3J0IGNvbnN0IERJQUxPR19TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KFxuICAnRGlhbG9nU2Nyb2xsU3RyYXRlZ3knLFxuKTtcblxuLyoqIEluamVjdGlvbiB0b2tlbiBmb3IgdGhlIERpYWxvZydzIERhdGEuICovXG5leHBvcnQgY29uc3QgRElBTE9HX0RBVEEgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignRGlhbG9nRGF0YScpO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIGZvciB0aGUgRGlhbG9nUmVmIGNvbnN0cnVjdG9yLiAqL1xuZXhwb3J0IGNvbnN0IERJQUxPR19SRUYgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGlhbG9nUmVmPGFueT4+KCdEaWFsb2dSZWYnKTtcblxuLyoqIEluamVjdGlvbiB0b2tlbiBmb3IgdGhlIERpYWxvZ0NvbmZpZy4gKi9cbmV4cG9ydCBjb25zdCBESUFMT0dfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERpYWxvZ0NvbmZpZz4oJ0RpYWxvZ0NvbmZpZycpO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIGZvciB0aGUgRGlhbG9nJ3MgRGlhbG9nQ29udGFpbmVyIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBjb25zdCBESUFMT0dfQ09OVEFJTkVSID0gbmV3IEluamVjdGlvblRva2VuPENvbXBvbmVudFR5cGU8Q2RrRGlhbG9nQ29udGFpbmVyPj4oXG4gICdEaWFsb2dDb250YWluZXInLFxuKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBvdmVybGF5OiBPdmVybGF5LFxuKTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IERJQUxPR19TQ1JPTExfU1RSQVRFR1ksXG4gIGRlcHM6IFtPdmVybGF5XSxcbiAgdXNlRmFjdG9yeTogTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWSxcbn07XG4iXX0=