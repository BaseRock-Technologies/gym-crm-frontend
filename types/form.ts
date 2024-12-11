export type FieldType = 'text' | 'select' | 'date' | 'textarea' | 'checkbox' | 'number' | 'decimal' | 'time' | 'phone';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FieldDependency {
  field: string;
  formula: string; 
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[];
  allowCustomOption?: boolean;
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
}

export interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
}

