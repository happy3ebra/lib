import { FormlyExtension, FormlyConfig } from '../../services/formly.config';
import { FormlyFieldConfigCache } from '../../components/formly.field.config';
/** @experimental */
export declare class FieldFormExtension implements FormlyExtension {
    private config;
    private root;
    constructor(config: FormlyConfig);
    prePopulate(field: FormlyFieldConfigCache): void;
    onPopulate(field: FormlyFieldConfigCache): void;
    postPopulate(field: FormlyFieldConfigCache): void;
    private addFormControl;
    private setValidators;
    private mergeValidators;
}
