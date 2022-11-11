import { NgZone } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
export declare class FormlyFieldSelect extends FieldType {
    private ngZone;
    defaultOptions: {
        templateOptions: {
            options: never[];
            compareWith(o1: any, o2: any): boolean;
        };
    };
    selectAccessor: any;
    constructor(ngZone: NgZone);
}
