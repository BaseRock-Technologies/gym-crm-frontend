"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { showToast } from "@/lib/helper/toast";
import { FormConfig } from "@/types/form";

const PackageCustomAddOptionForm: FormConfig = {
  id: "new-package",
  title: "Add package",
  fields: [
    {
      name: "packageName",
      label: "Package Name",
      type: "text",
      required: true,
      placeholder: "Annual For male",
    },
    {
      name: "packagePrice",
      label: "Package Price",
      type: "number",
      required: true,
      placeholder: "eg: 12000, 5000",
    },
    {
      name: "packageDuration",
      label: "Package Duration",
      type: "number",
      required: true,
      placeholder: "eg: 365, 180",
    },
    {
      name: "isActive",
      label: "Active",
      type: "select",
      required: true,
      options: [
        {
          group: "default",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
      ],
    },
    {
      name: "showOnWebsite",
      label: "Show On website",
      type: "checkbox",
      labelPos: "left",
    },
  ],
};

const ClientCustomAddOptionForm: FormConfig = {
  id: "new-client",
  title: "Add Client",
  fields: [
    {
      name: "clientName",
      label: "Client Name",
      type: "text",
      required: true,
      placeholder: "name",
    },
    {
      name: "contact",
      label: "Contact",
      type: "phone",
      required: true,
      placeholder: "contact",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "email",
    },
  ],
};

const ClientSourceCustomAddOptionForm: FormConfig = {
  id: "client-source",
  title: "Add Source",
  fields: [
    {
      name: "sourceName",
      label: "Source Name",
      type: "text",
      required: true,
      placeholder: "name",
    },
  ],
};

const TaxCustomAddOptionForm: FormConfig = {
  id: "tax-details",
  title: "Add tax",
  fields: [
    {
      name: "taxName",
      label: "Tax Name",
      type: "text",
      required: true,
      placeholder: "tax",
    },
    {
      name: "charges",
      label: "Charges",
      type: "text",
      required: true,
      placeholder: "18%, 15%, 2%",
    },
  ],
};

const formConfig: FormConfig = {
  id: "gym-package",
  title: "Create new bill for Gym Membership",
  fields: [
    {
      name: "memberID",
      label: "Member ID",
      type: "text",
      required: true,
    },
    {
      name: "invoiceDate",
      label: "Invoice Date",
      type: "date",
      placeholder: "Invoice Date",
    },
    {
      name: "clientName",
      label: "Client",
      options: [],
      type: "select",
      placeholder: "Select Client Name",
      allowAddCustomOption: true,
      addCustomOptionForm: ClientCustomAddOptionForm,
      primaryFieldValue: "clientName",
    },
    {
      name: "contactNumber",
      label: "Contact Number",
      type: "select",
      placeholder: "Select Contact Number",
      required: true,
    },
    {
      name: "alternateContact",
      label: "Alternate Contact",
      type: "phone",
      placeholder: "Select Alternate Contact",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "clientSource",
      label: "Client Source",
      options: [],
      type: "select",
      placeholder: "Select Client Source",
      allowAddCustomOption: true,
      addCustomOptionForm: ClientSourceCustomAddOptionForm,
      primaryFieldValue: "clientSourceName",
    },
    {
      name: "gender",
      label: "Gender",
      options: [
        {
          group: "Gender",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
        },
      ],
      type: "select",
      required: true,
      placeholder: "Select gender",
    },
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
      placeholder: "select birthday",
    },
    {
      name: "anniversary",
      label: "Anniversary",
      type: "date",
      placeholder: "select anniversary",
    },
    {
      name: "profession",
      label: "Profession",
      type: "text",
      placeholder: "select profession",
    },
    {
      name: "taxId",
      label: "Tax ID",
      type: "text",
      placeholder: "Select Tax ID",
    },
    {
      name: "workoutHourmorning",
      label: "Workout Hours",
      type: "time-detailed",
      placeholder: "select workout hour",
    },
    {
      name: "workoutHourevening",
      label: "",
      type: "time-detailed",
      placeholder: "select workout hour",
    },
    {
      name: "areaAddress",
      placeholder: "address",
      label: "Area Address",
      type: "textarea",
      validation: {
        maxLength: 200,
      },
    },
    {
      name: "remarks",
      label: "Remarks (if any)",
      type: "textarea",
      validation: {
        maxLength: 200,
      },
    },
    {
      name: "picture",
      label: "Profile Picture",
      type: "image",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
      placeholder: "joining date",
    },
    {
      name: "package",
      label: "Package",
      options: [
        {
          group: "default",
          options: [
            {
              label: "sample",
              value: "Sample",
              price: 7000,
              discountMax: 2000,
            },
          ],
        },
      ],
      type: "select",
      placeholder: "Select Package Name",
      allowAddCustomOption: true,
      addCustomOptionForm: PackageCustomAddOptionForm,
      primaryFieldValue: "packageName",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      placeholder: "end date",
    },
    {
      name: "packagePrice",
      label: "Price",
      type: "decimal",
      placeholder: "price",
      editable: false,
      dependsOn: {
        field: "package",
        formula: (values, options) =>
          options?.find((opt) => opt.value === values.package)?.price || 0,
      },
    },
    {
      name: "discount",
      label: "Discount(%)",
      type: "decimal",
      placeholder: "discount",
      dependsOn: {
        field: "packagePrice,discountAmount",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discountAmount: number = parseFloat(values.discountAmount) || 0;
          const maxDiscount: number =
            options?.find((opt) => opt.value === values.package)?.discountMax ||
            0;
          return Math.min(
            (discountAmount / packagePrice) * 100,
            maxDiscount
          ).toFixed(2);
        },
      },
    },
    {
      name: "discountAmount",
      label: "Discount",
      type: "decimal",
      placeholder: "discount amount",
      dependsOn: {
        field: "packagePrice,discount,package",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discount: number = parseFloat(values.discount) || 0;
          const maxDiscount: number =
            options?.find((opt) => opt.value === values.package)?.discountMax ||
            0;
          if ((packagePrice * discount) / 100 > maxDiscount)
            showToast("info", `Max Discount is ${maxDiscount}`, {
              toastId: "maxDiscount",
            });
          return Math.min((packagePrice * discount) / 100, maxDiscount).toFixed(
            2
          );
        },
      },
    },
    {
      name: "admissionCharges",
      label: "Admission Charges",
      type: "decimal",
      placeholder: "admission",
    },
    {
      name: "taxCalc",
      label: "Tax",
      options: [
        {
          group: "No Tax",
          options: [
            {
              label: "No Tax (0%)",
              value: "no-tax",
              taxPercentage: 0,
            },
          ],
        },
        {
          group: "Exclusive Taxes",
          options: [
            {
              label: "Goods and Service tax (18%)",
              value: "goods-service-tax",
              taxPercentage: 18,
            },
          ],
        },
      ],
      type: "select",
      placeholder: "Select tax",
      allowAddCustomOption: true,
      addCustomOptionForm: TaxCustomAddOptionForm,
      primaryFieldValue: "taxName",
    },
    {
      name: "amountPayable",
      label: "Amount Payable",
      type: "decimal",
      placeholder: "payable",
      dependsOn: {
        field:
          "package, packagePrice,discountAmount,discount,admissionCharges,taxCalc",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discountAmount: number = parseFloat(values.discountAmount) || 0;
          const admissionCharges: number =
            parseFloat(values.admissionCharges) || 0;
          const taxPercent: number =
            options?.find((opt) => opt.value === values.taxCalc)
              ?.taxPercentage || 0;
          const priceCalculates =
            packagePrice - discountAmount + admissionCharges;
          return (
            priceCalculates +
            priceCalculates * (taxPercent / 100)
          ).toFixed(2);
        },
      },
    },
  ],
};

export default function GymPackage() {
  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm config={formConfig} submitBtnText="Save" />
    </div>
  );
}
