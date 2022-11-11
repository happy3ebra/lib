import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FormlyFieldConfig } from '../components/formly.field.config';
import { FormlyExtension } from '../services/formly.config';
export interface FieldArrayTypeConfig extends FormlyFieldConfig {
    formControl: FormArray;
    templateOptions: NonNullable<FormlyFieldConfig['templateOptions']>;
    options: NonNullable<FormlyFieldConfig['options']>;
}
export declare abstract class FieldArrayType<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldType<any> implements FormlyExtension {
    field: F;
    defaultOptions: any;
    readonly formControl: FormArray;
    constructor(builder?: FormlyFormBuilder);
    onPopulate(field: FormlyFieldConfig): void;
    add(i?: number, initialModel?: any, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    remove(i: number, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    private _build;
}
