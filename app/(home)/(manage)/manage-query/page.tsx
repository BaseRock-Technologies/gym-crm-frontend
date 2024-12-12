import { DynamicForm } from "@/components/dynamic-form";
import { FormConfig } from "@/types/form";
import { User2 } from "lucide-react";

const ServiceSelectCustomAddOptionForm: FormConfig = {
  id: "service-select",
  title: "Create Service Option",
  fields: [
    {
      name: "package-name",
      label: "Package Name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "decimal",
      required: true,
      placeholder: "0.00",
    },
    {
      name: "trainer",
      label: "Select Trainer",
      type: "multi-select",
      placeholder: "Select Trainer",
      multiSelectOptions: [
        {
          label: "Pro",
          value: "pro",
          icon: <User2 />,
        },
        {
          label: "Premium",
          value: "premium",
          icon: <User2 />,
        },
        {
          label: "Base",
          value: "base",
          icon: <User2 />,
        },
        {
          label: "Admin",
          value: "admin",
          icon: <User2 />,
        },
      ],
    },
  ],
};

const formConfig: FormConfig = {
  id: "inquiry",
  title: "Create new Inquiry",
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      placeholder: "Enter Name",
      validation: {
        minLength: 2,
        maxLength: 50,
      },
    },
    {
      name: "contactNumber",
      label: "Contact number",
      type: "phone",
      required: true,
      placeholder: "Contact Number",
      validation: {
        pattern: "^\\d{10}$",
      },
    },
    {
      name: "scheduleTime",
      label: "Schedule Time",
      type: "time",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "decimal",
      placeholder: "0.00",
    },
    {
      name: "discount",
      label: "Discount (%)",
      type: "decimal",
      required: true,
      placeholder: "0.00",
    },
    {
      name: "finalPrice",
      label: "Final Price",
      type: "decimal",
      dependsOn: {
        field: "price",
        formula: "price * (1 - discount / 100)",
      },
    },
    {
      name: "service",
      label: "Service",
      options: [
        { label: "pre", value: "pre" },
        { label: "post", value: "post" },
      ],
      type: "select",
      allowAddCustomOption: true,
      addCustomOptionForm: ServiceSelectCustomAddOptionForm,
      primaryFieldValue: "package-name",
    },
    {
      name: "trainer",
      label: "Select Trainer",
      type: "multi-select",
      placeholder: "Select Trainer",
      required: true,
      multiSelectOptions: [
        {
          label: "Pro",
          value: "pro",
          icon: <User2 />,
        },
        {
          label: "Premium",
          value: "premium",
          icon: <User2 />,
        },
        {
          label: "Base",
          value: "base",
          icon: <User2 />,
        },
        {
          label: "Admin",
          value: "admin",
          icon: <User2 />,
        },
      ],
    },
  ],
};

export default function ManageQueries() {
  return (
    <div className="p-6">
      <DynamicForm config={formConfig} />
    </div>
  );
}
