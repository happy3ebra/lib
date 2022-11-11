import { FieldType } from '@ngx-formly/core';
export declare class FormlyFieldMultiCheckbox extends FieldType {
    defaultOptions: {
        templateOptions: {
            options: never[];
            formCheck: string;
        };
    };
    onChange(value: any, checked: boolean): void;
    isChecked(option: any): any;
}
