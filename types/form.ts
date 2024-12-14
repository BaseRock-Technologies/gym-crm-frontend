import { LucideIcon } from "lucide-react";

export type FieldType = 'text' | 'select' | 'multi-select' | 'date' | 'textarea' | 'checkbox' | 'number' | 'decimal' | 'time' | 'phone' | 'email';

export interface SelectOption {
  label: string;
  value: string | number;
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
  options?: SelectOption[];
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
  allowAddCustomOption: true; // When true
  addCustomOptionForm: FormConfig; // Required
  primaryFieldValue: string;
}

export interface FormFieldWithoutCustomOptions extends FormFieldBase {
  allowAddCustomOption?: false; // Optional or false
  addCustomOptionForm?: never; // Not allowed
  primaryFieldValue?: never;
}

export type FormField = FormFieldWithCustomOptions | FormFieldWithoutCustomOptions;


export interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
}

