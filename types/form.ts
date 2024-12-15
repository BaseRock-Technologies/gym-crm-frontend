export type FieldType = 'text' | 'select' | 'multi-select' | 'date' | 'textarea' | 'checkbox' | 'number' | 'decimal' | 'time' | 'phone' | 'email' | 'image' | 'file';

export interface SelectOption {
  label: string;
  value: string;
}

export interface GroupedSelectOption {
  group : string;
  options: SelectOption[];
}

export interface MultiSelectOption {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export interface FieldDependency {
  field: string;
  formula: string; 
}

type LabelPostion = "right" | "left";

export interface FormFieldBase {
  name: string;
  label: string;
  labelPos?: LabelPostion;
  type: FieldType;
  required?: boolean;
  options?: GroupedSelectOption[];
  placeholder?: string;
  defaultValue?: string | number | boolean;
  dependsOn?: FieldDependency;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    positiveValue?: boolean;
  };
  multiSelectOptions?: MultiSelectOption[]; 
}

export interface FormFieldWithCustomOptions extends FormFieldBase {
  allowAddCustomOption: true; 
  addCustomOptionForm: FormConfig; 
  primaryFieldValue: string;
}

export interface FormFieldWithoutCustomOptions extends FormFieldBase {
  allowAddCustomOption?: false; 
  addCustomOptionForm?: never; 
  primaryFieldValue?: never;
}

export interface FormFieldWithImageUpload extends FormFieldBase {
  type: 'image';
  formatsAccepted?: string[];
  maxSize?: number; // in bytes
}

export interface FormFieldWithFileUpload extends FormFieldBase {
  type: 'file';
  formatsAccepted?: string[];
  maxSize?: number; // in bytes
}

export type FormField = FormFieldWithCustomOptions | FormFieldWithoutCustomOptions | FormFieldWithImageUpload | FormFieldWithFileUpload;


export interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
}



