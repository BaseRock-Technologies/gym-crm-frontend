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

interface DynamicFormProps {
  config: FormConfig;
  storeFormValues?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  submitBtnText?: string;
}

export function DynamicForm({
  config,
  storeFormValues,
  submitBtnText = "Submit",
}: DynamicFormProps) {
  const [customOptions, setCustomOptions] = React.useState<
    Record<string, SelectOption[]>
  >({});
  const [formValues, setFormValues] = React.useState<Record<string, any>>({});

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
                return val.trim(); // Trim whitespace from the value
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
        case "email":
          fieldSchema = z
            .preprocess((val) => {
              if (typeof val === "string") {
                return val.trim(); // Trim whitespace from the value
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
                return val.trim(); // Trim whitespace from the value
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
                const isMatch = /^[a-zA-Z0-9\s]+$/.test(val);
                if (isMatch) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid ${field.label}`,
                  });
                }
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
    });

    return z.object(schema);
  };

  const form = useForm<z.infer<ReturnType<typeof generateZodSchema>>>({
    resolver: zodResolver(generateZodSchema(config.fields)),
    defaultValues: config.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue || "",
      }),
      {}
    ),
  });

  const evaluateFormula = (formula: string, values: Record<string, any>) => {
    try {
      const safeEval = new Function(
        ...Object.keys(values),
        `return ${formula}`
      );
      return safeEval(...Object.values(values));
    } catch (error) {
      console.error("Error evaluating formula:", error);
      return undefined;
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormValues((prev) => {
      const newValues = { ...prev, [name]: value };

      config.fields.forEach((field) => {
        if (field.dependsOn && field.dependsOn.field === name) {
          const calculatedValue = evaluateFormula(
            field.dependsOn.formula,
            newValues
          );
          if (calculatedValue !== undefined) {
            form.setValue(field.name, calculatedValue);
            newValues[field.name] = calculatedValue;
          } else {
            form.setValue(field.name, "");
            newValues[field.name] = "";
          }
        }
      });
      return newValues;
    });
  };

  const onSubmit = (values: z.infer<ReturnType<typeof generateZodSchema>>) => {
    console.log("Form submitted with values:", values);
    form.reset();
    setFormValues({});
    if (storeFormValues && storeFormValues !== undefined) {
      storeFormValues(values);
    }
  };

  const handleAddCustomOption = (fieldName: string, value: string) => {
    setCustomOptions((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), { label: value, value }],
    }));
  };

  const renderField = (field: FormFieldType) => {
    const options = [
      ...(field.options || []),
      ...(customOptions[field.name] || []),
    ];

    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            {(!field.labelPos ||
              (field.labelPos && field.labelPos === "right")) && (
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <FormControl>
              {field.type === "select" ? (
                <CustomSelect
                  fieldName={field.name}
                  options={options}
                  value={formField.value}
                  onChange={(value) => {
                    formField.onChange(value);
                    handleFieldChange(field.name, value);
                  }}
                  placeholder={field.placeholder}
                  allowAddCustomOption={field.allowAddCustomOption}
                  addCustomOptionForm={field.addCustomOptionForm}
                  onAddCustomOption={(value) =>
                    handleAddCustomOption(field.name, value)
                  }
                />
              ) : field.type === "multi-select" && field.multiSelectOptions ? (
                <MultiSelect
                  options={field.multiSelectOptions}
                  value={formField.value}
                  onValueChange={(value) => {
                    formField.onChange(value);
                    handleFieldChange(field.name, value);
                  }}
                  placeholder={field.placeholder}
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  placeholder={field.placeholder}
                  {...formField}
                  onChange={(e) => {
                    formField.onChange(e);
                    handleFieldChange(field.name, e.target.value);
                  }}
                />
              ) : field.type === "checkbox" ? (
                <Checkbox
                  checked={formField.value}
                  onCheckedChange={(value) => {
                    formField.onChange(value);
                    handleFieldChange(field.name, value);
                  }}
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
    );
  };

  return (
    <Card className="w-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {config.fields.map(renderField)}
            </div>
            <div className="relative w-full flex justify-end items-center">
              <Button type="submit" size={"lg"}>
                {submitBtnText}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
