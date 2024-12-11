import { DynamicForm } from "@/components/dynamic-form";
import { FormConfig } from "@/types/form";

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
      required: true,
      placeholder: "0.00",
    },
    {
      name: "discount",
      label: "Discount (%)",
      type: "decimal",
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
