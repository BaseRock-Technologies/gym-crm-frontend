export type FieldType = 'text' | 'select' | 'multi-select' | 'date' | 'textarea' | 'checkbox' | 'number' | 'decimal' | 'time' | 'time-detailed' | 'phone' | 'email' | 'image' | 'file'  | 'products' ;

export interface SelectOption {
  id?: string
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

export interface RedirectRules {
  shouldRedirect: boolean,
  redirectPath: string,
  redirectOnMemberId?: boolean,
}

export interface AdminOnlyEdit {
  adminOnlyEdit: boolean,
  redirectPath: string,
  memberId?: string,
}

export interface Product {
  id: string;
  product: string;
  price: string;
  quantity: string;
  total: string;
}

export interface FieldDependency {
  field: string;
  formula: (values: Record<string, any>, options?: SelectOption[] ) => any; 
}


type LabelPostion = "right" | "left";
export type ApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
export type BillTypes = 'gym-membership'| 'personal-training'| 'group-class'

export interface SelectApiData {
  apiPath: string, 
  method: ApiMethod,
  billType?: BillTypes,
  postData?: Record<string, any>
}

export interface FormFieldBase {
  name: string;
  label: string;
  labelPos?: LabelPostion;
  type: FieldType;
  required?: boolean;
  options?: GroupedSelectOption[] | [];
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
  alias?: string;
}

export type FieldsToAddInOptions = Record<string, string[]>;


export interface FormFieldWithCustomOptions extends FormFieldBase {
  allowAddCustomOption: true;
  customAddOptionsGroups?: string[];
  addCustomOptionForm: Record<string, FormConfig>;
  primaryFieldValues: Record<string, string[]>;
  combinePrimaryFields?: Boolean;
  apiConfig?: SelectApiData;
  fieldsToAddInOptions?: FieldsToAddInOptions;
}
export interface FormFieldWithoutCustomOptions extends FormFieldBase {
  allowAddCustomOption?: false;
  customAddOptionsGroups?: never;
  addCustomOptionForm?:never;
  primaryFieldValues?: never;
  combinePrimaryFields?: never;
  apiConfig?: never;
  fieldsToAddInOptions?: never;
}

export type FormField = FormFieldWithCustomOptions | FormFieldWithoutCustomOptions;

export interface FormGroup {
  id: string;
  title: string;
  accordianOpenTitle?: string;
  type: "accordion" | "background" | "default" | "action-group" | "card-form" | "single-line"
  addMoreConfig?: {
    buttonText: string
    fields: string[],
  }
  backgroundColor?: string;
  fields: string[];
  className?: string;
  renderType?: 'accordion' | 'background' | 'default';
  layout?: 'row' | 'col' | 'grid';
  additionalClass?: string;
}
export interface AddtionalFormFieldsConfigGroup {
  id: string;
  fields: { name: string; position: number }[]; 
}
export interface FormConfig {
  id: string;
  title: string;
  groups?: FormGroup[];
  fields: FormField[];
}

export interface AddtionalFormFieldsConfig {
  groups?: AddtionalFormFieldsConfigGroup[];
  fields: FormField[];
}

export interface FieldsToRemoveConfigGroup {
  id: string;
  fields: string[];
}

export interface FieldsToRemoveConfig {
  groups: FieldsToRemoveConfigGroup[];
}
