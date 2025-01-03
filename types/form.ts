export type FieldType = 'text' | 'select' | 'multi-select' | 'date' | 'textarea' | 'checkbox' | 'number' | 'decimal' | 'time' | 'time-detailed' | 'phone' | 'email' | 'image' | 'file';

export interface SelectOption {
  label: string;
  value: string;
  [key: string]: any;
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
  formula: (values: Record<string, any>, options?: SelectOption[]) => any; 
}


type LabelPostion = "right" | "left";

export interface FormFieldBase {
  name: string;
  label: string;
  labelPos?: LabelPostion;
  type: FieldType;
  required?: boolean;
  options?: GroupedSelectOption[] | [];
  shouldAskGroupNameInAddOption?: boolean;
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
  formatsAccepted?: string[];
  formatsAcceptedPlaceholder?: string[];
  maxSize?: number; // in bytes
  editable?: boolean;
  conditionalFields?: Record<string, FormField[]>;
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

export type FormField = FormFieldWithCustomOptions | FormFieldWithoutCustomOptions;

export interface FormGroup {
  id: string;
  title: string;
  accordianOpenTitle?: string;
  type: 'accordion' | 'background' | 'default' | 'action-group';
  backgroundColor?: string;
  fields: string[];
  className?: string;
  renderType?: 'accordion' | 'background' | 'default';
  layout?: 'row' | 'col' | 'grid';
  additionalClass?: string;
}

export interface FormConfig {
  id: string;
  title: string;
  groups?: FormGroup[];
  fields: FormField[];
}

