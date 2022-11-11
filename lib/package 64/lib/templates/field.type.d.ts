import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '../components/formly.field.config';
export interface FieldTypeConfig extends FormlyFieldConfig {
    formControl: NonNullable<FormControl>;
    templateOptions: NonNullable<FormlyFieldConfig['templateOptions']>;
    options: NonNullable<FormlyFieldConfig['options']>;
}
export interface FieldGroupTypeConfig extends FormlyFieldConfig {
    formControl: NonNullable<FormGroup>;
    templateOptions: NonNullable<FormlyFieldConfig['templateOptions']>;
    options: NonNullable<FormlyFieldConfig['options']>;
}
export declare abstract class FieldType<F extends FormlyFieldConfig = FormlyFieldConfig> {
    field: F;
    defaultOptions?: Partial<F>;
    model: any;
    form: FormGroup;
    options: F['options'];
    readonly key: string | number | string[];
    readonly formControl: NonNullable<F["formControl"]>;
    readonly to: import("../components/formly.field.config").FormlyTemplateOptions;
    readonly showError: boolean;
    readonly id: string;
    readonly formState: any;
}
/**
 * @deprecated use `FieldType` instead
 */
export declare abstract class Field extends FieldType {
    constructor();
}
