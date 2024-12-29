"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "./custom-select";
import { TimePicker } from "./time-picker";
import {
  FormConfig,
  FormField as FormFieldType,
  FormGroup,
  GroupedSelectOption,
  SelectOption,
} from "../types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelect } from "./multi-select";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { FileUpload } from "./file-upload";
import { ImageIcon } from "lucide-react";
import { TimePickerDetailed } from "./time-picker-detailed";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import SpinnerTick from "./Images/SpinnerTick";

interface DynamicFormProps {
  config: FormConfig;
  storeFormValues?: (value: Record<string, any>) => void;
  submitBtnText?: string;
  initialData?: Record<string, any> | null;
}

export function DynamicForm({
  config,
  storeFormValues,
  submitBtnText = "Submit",
  initialData,
}: DynamicFormProps) {
  const [customOptions, setCustomOptions] = React.useState<
    Record<string, GroupedSelectOption[]>
  >({});
  const [formValues, setFormValues] = React.useState<Record<string, any>>({});
  const formId = React.useId();
  const [openAccordions, setOpenAccordions] = React.useState<
    Record<string, boolean>
  >({});

  const generateZodSchema = (fields: FormFieldType[]) => {
    const schema: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case "text":
        case "textarea":
          fieldSchema = z.string().superRefine((val, ctx) => {
            if (field.required && !val) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field.label} is required`,
              });
              return z.NEVER;
            }
            if (
              val &&
              field.validation?.minLength &&
              val.length < field.validation.minLength
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field.label} must be at least ${field.validation.minLength} characters`,
              });
            }
            if (
              val &&
              field.validation?.maxLength &&
              val.length > field.validation.maxLength
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field.label} must be at most ${field.validation.maxLength} characters`,
              });
            }
            if (
              val &&
              field.validation?.pattern &&
              !new RegExp(field.validation.pattern).test(val)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${field.label} is invalid`,
              });
            }
          });
          break;
        case "number":
        case "decimal":
          fieldSchema = z.preprocess(
            (val) => {
              if (typeof val === "string") {
                return val.trim() === "" ? undefined : Number(val);
              }
              return val;
            },
            z
              .number({
                required_error: `${field.label} is required`,
                invalid_type_error: `${field.label} must be a number`,
              })
              .nullish()
              .superRefine((val, ctx) => {
                if (field.required && (val === undefined || val === null)) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${field.label} is required`,
                  });
                }
                if (field.validation && (val || val === 0)) {
                  const { min, max, positiveValue } = field.validation;
                  if (min !== undefined && val < min) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.too_small,
                      minimum: min,
                      type: "number",
                      inclusive: true,
                      message: `${field.label} must be at least ${min}`,
                    });
                  }
                  if (max !== undefined && val > max) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.too_big,
                      maximum: max,
                      type: "number",
                      inclusive: true,
                      message: `${field.label} must be at most ${max}`,
                    });
                  }
                  if (
                    positiveValue !== undefined &&
                    positiveValue &&
                    val <= 0
                  ) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: `${field.label} must be a positive value`,
                    });
                  }
                }
              })
          );
          break;
        case "time":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.trim();
              }
              return val;
            }, z.string())
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
              if (val) {
                const isMatch = /^([1-9]|1[0-2]):00 (AM|PM)$/.test(val);
                if (!isMatch) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid ${field.label}`,
                  });
                }
              }
            });
          break;
        case "time-detailed":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.trim();
              }
              return val;
            }, z.string())
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
              if (val) {
                const isMatch = /^([1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/.test(
                  val
                );
                if (!isMatch) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid ${field.label}`,
                  });
                }
              }
            });
          break;
        case "email":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.trim();
              }
              return val;
            }, z.string().email({ message: "Invalid email address" }))
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
            });
          break;
        case "checkbox":
          fieldSchema = z
            .preprocess(
              (val) => {
                if (typeof val === "string") {
                  return val === "true" ? true : val ? true : false;
                }
                return val;
              },
              z
                .boolean({
                  invalid_type_error: `Invalid ${field.label.toLowerCase()}`,
                })
                .superRefine((val, ctx) => {
                  if (field.required && !val) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: `${field.label} is required`,
                    });
                  }
                })
            )
            .superRefine((val, ctx) => {
              if (field.required && (val === undefined || val === null)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
            });
          break;
        case "date":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                const date = new Date(val);
                return isNaN(date.getTime()) ? undefined : date;
              }
              return val;
            }, z.date().nullish())
            .superRefine((val, ctx) => {
              if (field.required && (val === undefined || val === null)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
              if (val !== undefined && val !== null) {
                const isInvalid =
                  !(val instanceof Date) || isNaN(val.getTime());
                if (isInvalid) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid ${field.label}`,
                  });
                }
              }
            });
          break;
        case "select":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.trim();
              }
              return val;
            }, z.string())
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
            });
          break;
        case "multi-select":
          fieldSchema = z
            .preprocess((val) => {
              if (!Array.isArray(val) || val.length === 0) {
                return [];
              }
              return val;
            }, z.array(z.union([z.string(), z.number()])))
            .superRefine((val, ctx) => {
              if (field.required && (!val || val.length === 0)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
            });
          break;
        case "phone":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.replace(/\D/g, "");
              }
              return val;
            }, z.string())
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
              const phoneRegex = /^\d{10}$/;
              if (!phoneRegex.test(val)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Invalid ${field.label}`,
                });
              }
            });
          break;
        case "image":
        case "file":
          fieldSchema = z
            .preprocess((val) => {
              if (val instanceof File) {
                return val;
              }
              return undefined;
            }, z.union([z.instanceof(File), z.undefined()]))
            .superRefine((val, ctx) => {
              if (field.required && !val) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `${field.label} is required`,
                });
              }
              if (val) {
                if (
                  field.formatsAccepted &&
                  !field.formatsAccepted.includes(val.type)
                ) {
                  const acceptedPlaceholder =
                    field.formatsAcceptedPlaceholder || [];
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid file format. Accepted formats: ${acceptedPlaceholder.join(
                      ", "
                    )}`,
                  });
                }
                if (field.maxSize && val.size > field.maxSize) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `File size exceeds the maximum limit of ${
                      field.maxSize / 1024 / 1024
                    }MB`,
                  });
                }
              }
            });
          break;
        default:
          fieldSchema = z.preprocess(
            (val) => {
              if (typeof val !== "string" || val.trim() === "") {
                return undefined;
              }
              return val;
            },
            z.string({
              required_error: `${field.label} is required`,
              invalid_type_error: `Invalid ${field.label.toLowerCase()}`,
            })
          );
      }

      schema[field.name] = field.required
        ? fieldSchema
        : fieldSchema.optional();

      // Include conditional fields in the schema
      if (field.conditionalFields) {
        Object.values(field.conditionalFields)
          .flat()
          .forEach((conditionalField) => {
            const conditionalSchema = generateZodSchema([conditionalField]);
            Object.assign(schema, {
              [conditionalField.name]:
                conditionalSchema.shape[conditionalField.name],
            });
          });
      }
    });

    return z.object(schema);
  };

  const form = useForm<z.infer<ReturnType<typeof generateZodSchema>>>({
    resolver: zodResolver(generateZodSchema(config.fields)),
    defaultValues: React.useMemo(
      () => ({
        ...config.fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.name]: field.defaultValue || "",
          }),
          {}
        ),
        ...initialData,
      }),
      [config.fields, initialData]
    ),
  });

  React.useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        form.setValue(key, value);
      });
    }
  }, [initialData, form]);

  const evaluateFormula = (
    formula: (values: Record<string, any>, options?: SelectOption[]) => any,
    values: Record<string, any>,
    options?: SelectOption[]
  ) => {
    try {
      return formula(values, options);
    } catch (error) {
      console.error("Error evaluating formula:", error);
      return undefined;
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    form.setValue(name, value);
    const newValues = { ...formValues, [name]: value };
    let fieldsUpdated = false;

    // Handle dependent fields
    config.fields.forEach((field) => {
      if (field.dependsOn) {
        const dependentFields = field.dependsOn.field
          .split(",")
          .map((f) => f.trim());
        if (dependentFields.includes(name)) {
          let fieldOptions: SelectOption[] = [];
          dependentFields.forEach((depField) => {
            const fieldFromConfig = config.fields.find(
              (item) => item.name === depField
            );
            if (
              fieldFromConfig?.type === "multi-select" ||
              fieldFromConfig?.type === "select"
            ) {
              fieldOptions = [
                ...fieldOptions,
                ...(fieldFromConfig.options || []),
                ...(newValues[fieldFromConfig.name]?.options || []),
              ]
                .flatMap((item) => item.options)
                .filter(Boolean);
            }
          });
          const calculatedValue = evaluateFormula(
            field.dependsOn.formula,
            newValues,
            fieldOptions
          );
          const fieldName = field.name;
          if (calculatedValue !== undefined) {
            newValues[fieldName] = calculatedValue;
            form.setValue(fieldName, calculatedValue);
          } else {
            newValues[fieldName] = "";
            form.setValue(fieldName, "");
          }
          fieldsUpdated = true;
        }
      }
    });

    // Handle conditional fields
    const fieldConfig = config.fields.find((f) => f.name === name);
    if (fieldConfig?.conditionalFields) {
      Object.keys(fieldConfig.conditionalFields).forEach((key) => {
        const fields = fieldConfig.conditionalFields?.[key] || [];
        fields.forEach((field) => {
          if (key !== value) {
            form.setValue(field.name, undefined);
          } else if (field.defaultValue !== undefined) {
            form.setValue(field.name, field.defaultValue);
          }
        });
      });
      fieldsUpdated = true;
    }

    if (fieldsUpdated) {
      setFormValues(newValues);
    }
  };

  const onSubmit = (values: z.infer<ReturnType<typeof generateZodSchema>>) => {
    console.log(`Form ${formId} submitted with values:`, values);
    form.reset();
    setFormValues({});
    if (storeFormValues) {
      storeFormValues(values);
    }
  };

  const handleAddCustomOption = (
    fieldName: string,
    value: string,
    group: string
  ) => {
    try {
      setCustomOptions((prev) => {
        const updatedOptions = { ...prev };
        if (!updatedOptions[fieldName]) {
          updatedOptions[fieldName] = [];
        }
        const existingGroup = updatedOptions[fieldName].find(
          (g) => g.group === group
        );

        if (existingGroup) {
          const valueExists = existingGroup.options.some(
            (option) => option.value === value
          );
          if (!valueExists) {
            existingGroup.options.push({ label: value, value });
          }
        } else {
          updatedOptions[fieldName].push({
            group,
            options: [{ label: value, value }],
          });
        }
        return updatedOptions;
      });
    } catch (error) {
      console.log("Error Adding Custom options");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    fieldName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      form.setValue(fieldName, file);
      handleFieldChange(fieldName, file);
    }
  };

  const renderField = (field: FormFieldType) => {
    let options: GroupedSelectOption[];
    if (field.options) {
      if (field.type === "select" || field.type === "multi-select") {
        try {
          options = Object.values(
            [
              ...(field.options || []),
              ...(customOptions[field.name] || []),
            ].reduce((acc: Record<string, GroupedSelectOption>, curr) => {
              if (!acc[curr.group]) {
                acc[curr.group] = { group: curr.group, options: [] };
              }
              acc[curr.group].options.push(...curr.options);
              return acc;
            }, {} as Record<string, GroupedSelectOption>)
          );
        } catch {
          options = field.options;
        }
      }
    }
    return (
      <React.Fragment key={field.name}>
        <FormField
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              {(!field.labelPos ||
                (field.labelPos && field.labelPos === "right")) && (
                <FormLabel className={`${!field.label && "h-6 flex"}`}>
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </FormLabel>
              )}
              <FormControl>
                {field.type === "select" ? (
                  <CustomSelect
                    fieldName={field.name}
                    primaryField={field.primaryFieldValue}
                    options={options}
                    value={formField.value}
                    onChange={(value) => {
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    placeholder={field.placeholder}
                    allowAddCustomOption={field.allowAddCustomOption}
                    addCustomOptionForm={field.addCustomOptionForm}
                    onAddCustomOption={(value: string, group: string) =>
                      handleAddCustomOption(field.name, value, group)
                    }
                    disabled={field.editable === false}
                  />
                ) : field.type === "multi-select" &&
                  field.multiSelectOptions ? (
                  <MultiSelect
                    options={field.multiSelectOptions}
                    value={formField.value}
                    onValueChange={(value) => {
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    placeholder={field.placeholder}
                    disabled={field.editable === false}
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    className="max-h-40"
                    placeholder={field.placeholder}
                    {...formField}
                    onChange={(e) => {
                      formField.onChange(e);
                      handleFieldChange(field.name, e.target.value);
                    }}
                    readOnly={field.editable === false}
                  />
                ) : field.type === "checkbox" ? (
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={(value) => {
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    disabled={field.editable === false}
                  />
                ) : field.type === "date" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formField.value && "text-muted-foreground"
                        )}
                      >
                        {formField.value ? (
                          format(formField.value, "MMM dd yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formField.value}
                        onSelect={(value) => {
                          formField.onChange(value);
                          handleFieldChange(field.name, value);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : field.type === "time" ? (
                  <TimePicker
                    value={formField.value}
                    onChange={(value) => {
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                  />
                ) : field.type === "time-detailed" ? (
                  <TimePickerDetailed
                    value={formField.value}
                    onChange={(value) => {
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                  />
                ) : field.type === "decimal" ? (
                  <Input
                    {...formField}
                    type="text"
                    inputMode="decimal"
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      const value = e.target.value;
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    readOnly={field.editable === false}
                  />
                ) : field.type === "number" ? (
                  <Input
                    {...formField}
                    type="text"
                    inputMode="numeric"
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      const value = e.target.value;
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    readOnly={field.editable === false}
                  />
                ) : field.type === "phone" ? (
                  <Input
                    {...formField}
                    type="tel"
                    inputMode="tel"
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      formField.onChange(value);
                      handleFieldChange(field.name, value);
                    }}
                    readOnly={field.editable === false}
                  />
                ) : field.type === "image" ? (
                  <Card
                    className="w-full h-40 flex items-center justify-center border-primary rounded-md cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, field.name)}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`${field.name}-upload`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          formField.onChange(file);
                          handleFieldChange(field.name, file);
                        }
                      }}
                    />
                    <label
                      htmlFor={`${field.name}-upload`}
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      {formField.value ? (
                        <img
                          src={URL.createObjectURL(formField.value)}
                          alt="Uploaded image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground text-center w-3/">
                            Click to upload or drag and drop
                          </span>
                        </>
                      )}
                    </label>
                  </Card>
                ) : field.type === "file" ? (
                  <FileUpload
                    accept={field.formatsAccepted?.join(",")}
                    maxSize={field.maxSize}
                    onFileSelected={(file) => {
                      formField.onChange(file);
                      handleFieldChange(field.name, file);
                    }}
                  />
                ) : (
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      formField.onChange(e);
                      handleFieldChange(field.name, e.target.value);
                    }}
                    readOnly={field.editable === false}
                  />
                )}
              </FormControl>
              {field.labelPos === "left" && (
                <FormLabel className="ml-2">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </FormLabel>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {field.conditionalFields && (
          <>
            {Object.entries(field.conditionalFields).map(
              ([value, conditionalFields]) => (
                <React.Fragment key={value}>
                  {form.watch(field.name) === value && (
                    <>{conditionalFields.map(renderField)}</>
                  )}
                </React.Fragment>
              )
            )}
          </>
        )}
      </React.Fragment>
    );
  };

  const renderGroup = (group: FormGroup) => {
    if (group.type === "accordion") {
      const isOpen = openAccordions[group.id];
      return (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={group.id}
          onValueChange={(value) => {
            setOpenAccordions((prev) => ({
              ...prev,
              [group.id]: value === group.id,
            }));
          }}
        >
          <AccordionItem value={group.id}>
            <AccordionContent className="transition-all duration-300 ease-in-out">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.fields.map((fieldName) => {
                  const field = config.fields.find((f) => f.name === fieldName);
                  return field ? renderField(field) : null;
                })}
              </div>
            </AccordionContent>
            <AccordionTrigger className="flex justify-end ml-auto text-primary leading-4 border-b-2 border-b-primary">
              {isOpen && group.accordianOpenTitle
                ? group.accordianOpenTitle
                : group.title}
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      );
    } else if (group.type === "background") {
      return (
        <div className={`rounded-md ${group.backgroundColor}`} key={group.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {group.fields.map((fieldName) => {
              const field = config.fields.find((f) => f.name === fieldName);
              return field ? renderField(field) : null;
            })}
          </div>
        </div>
      );
    } else if (group.type === "action-group") {
      return (
        <div key={group.id} className={group.className}>
          {group.renderType === "accordion" ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={group.id}>
                <AccordionTrigger>{group.title}</AccordionTrigger>
                <AccordionContent>
                  <div
                    className={`grid ${
                      group.layout === "row"
                        ? "grid-flow-col"
                        : group.layout === "grid"
                        ? "grid-cols-3"
                        : "grid-flow-row"
                    } gap-4`}
                  >
                    {group.fields.map((fieldName) => {
                      const field = config.fields.find(
                        (f) => f.name === fieldName
                      );
                      return field ? renderField(field) : null;
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : group.renderType === "background" ? (
            <div
              className={`p-4 rounded-md ${
                group.backgroundColor || "bg-gray-100"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
              <div
                className={`grid ${
                  group.layout === "row"
                    ? "grid-flow-col"
                    : group.layout === "grid"
                    ? "grid-cols-3"
                    : "grid-flow-row"
                } gap-4`}
              >
                {group.fields.map((fieldName) => {
                  const field = config.fields.find((f) => f.name === fieldName);
                  return field ? renderField(field) : null;
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* <h3 className="text-lg font-semibold mb-4">{group.title}</h3> */}
              <div
                className={`grid gap-1 place-content-end ${
                  group.layout === "row"
                    ? "grid-flow-col"
                    : group.layout === "grid"
                    ? "grid-cols-3 gap-4"
                    : "grid-flow-row"
                }`}
              >
                {group.fields.map((fieldName) => {
                  const field = config.fields.find((f) => f.name === fieldName);
                  return field ? renderField(field) : null;
                })}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div key={group.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {group.fields.map((fieldName) => {
              const field = config.fields.find((f) => f.name === fieldName);
              return field ? renderField(field) : null;
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="relative w-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="relative bg-primary text-white mb-5 shadow-sm">
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {initialData === null && (
          <div className="absolute z-50 w-full h-full top-0 left-0 bg-white/80 flex justify-center items-center">
            <SpinnerTick color="#1a0f2b" />
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id={formId}
          >
            {config.groups ? (
              config.groups.map(renderGroup)
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
                {config.fields.map(renderField)}
              </div>
            )}
            <div className="relative w-full flex justify-end items-center">
              <Button type="submit" size={"lg"} form={formId}>
                {submitBtnText}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
