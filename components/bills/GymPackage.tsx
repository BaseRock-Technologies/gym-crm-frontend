"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { showToast } from "@/lib/helper/toast";
import { FormConfig, FormField, FormGroup } from "@/types/form";
import React from "react";

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

const PaytmMethodCustomAddOptionForm: FormConfig = {
  id: "add-payment",
  title: "Add Payment Method",
  fields: [
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "text",
      required: true,
      placeholder: "method",
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

const chequeConditionalFields: FormField[] = [
  {
    name: "chequeNumber",
    label: "Cheque Number",
    type: "text",
    required: true,
  },
  {
    name: "chequeDate",
    label: "Cheque Date",
    type: "date",
    required: true,
  },
  {
    name: "chequeStatus",
    label: "Cheque Status",
    type: "select",
    options: [
      {
        group: "default",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Cleared", value: "cleared" },
          { label: "Bounced", value: "bounced" },
        ],
      },
    ],
    required: true,
  },
];

const formConfig: FormConfig = {
  id: "gym-package",
  title: "Create new bill for Gym Membership",
  groups: [
    {
      id: "personal-info",
      title: "Personal Information",
      type: "default",
      fields: [
        "memberID",
        "invoiceDate",
        "clientName",
        "contactNumber",
        "alternateContact",
        "email",
        "clientSource",
      ],
    },
    {
      id: "more-personal-info",
      title: "More Details",
      accordianOpenTitle: "Hide Details",
      type: "accordion",
      fields: [
        "gender",
        "birthday",
        "anniversary",
        "profession",
        "taxId",
        "workoutHourmorning",
        "workoutHourevening",
        "areaAddress",
        "remarks",
        "picture",
      ],
    },
    {
      id: "package-info",
      title: "Package Information",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: [
        "package",
        "joiningDate",
        "endDate",
        "packagePrice",
        "discount",
        "discountAmount",
        "admissionCharges",
        "taxCalc",
        "amountPayable",
        "amountPaid",
        "paymentMode",
        "balanceAmount",
        "trainer",
        "clientRepresentative",
      ],
    },
    {
      id: "actions",
      title: "Actions",
      type: "action-group",
      renderType: "default",
      backgroundColor: "bg-transparent",
      layout: "col",
      fields: ["sendTextAndEmail", "sendWhatsapp"],
    },
  ],
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
              toastId: "019411cb-5477-7a10-869e-cedb19af7489",
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
    {
      name: "amountPaid",
      label: "Amount Paid",
      type: "decimal",
      placeholder: "paid",
    },
    {
      name: "paymentMode",
      label: "Payment Mode",
      options: [
        {
          group: "default",
          options: [
            { label: "Cash", value: "cash" },
            { label: "Cheque", value: "cheque" },
            { label: "Card", value: "card" },
          ],
        },
      ],
      type: "select",
      placeholder: "Select method",
      conditionalFields: {
        cheque: chequeConditionalFields,
      },
      allowAddCustomOption: true,
      addCustomOptionForm: PaytmMethodCustomAddOptionForm,
      primaryFieldValue: "paymentMethod",
    },
    {
      name: "balanceAmount",
      label: "Balance",
      type: "decimal",
      placeholder: "paid",
      dependsOn: {
        field: "amountPayable, amountPaid",
        formula: (values) => {
          const amountPaid: number = parseFloat(values.amountPaid) || 0;
          const amountPayable: number = parseFloat(values.amountPayable) || 0;
          if (amountPaid > amountPayable) {
            showToast(
              "error",
              "Total amount paid is greater than amount payable",
              { toastId: "019411cb-2722-7096-b07d-4a743ac6518e" }
            );
            return amountPayable;
          }
          const priceCalculates = amountPayable - amountPaid;
          return priceCalculates.toFixed(2);
        },
      },
    },
    {
      name: "clientRepresentative",
      label: "Client Representative",
      type: "text",
      placeholder: "rep",
      editable: false,
    },
    {
      name: "trainer",
      label: "Appoint Trainer",
      type: "select",
      options: [
        {
          group: "default",
          options: [
            {
              label: "hari",
              value: "hari",
            },
          ],
        },
      ],
    },
    {
      name: "trainer",
      label: "Appoint Trainer",
      type: "select",
      options: [
        {
          group: "default",
          options: [
            {
              label: "hari",
              value: "hari",
            },
          ],
        },
      ],
    },
    {
      name: "sendTextAndEmail",
      label: "Send Text & Email",
      type: "checkbox",
      labelPos: "left",
    },
    {
      name: "sendWhatsapp",
      label: "Send WhatsApp",
      type: "checkbox",
      labelPos: "left",
    },
  ],
};

export default function GymPackage() {
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await new Promise<Record<string, any>>((resolve) =>
          setTimeout(
            () =>
              resolve({
                clientName: "John Doe",
                contactNumber: "1234567890",
                package: "gold",
                clientRepresentative: user?.userName || "null",
              }),
            1000
          )
        );
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        showToast("error", "Failed to load initial data");
      }
    };

    fetchInitialData();
  }, [user]);

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={formConfig}
        submitBtnText="Save"
        initialData={initialData}
      />
    </div>
  );
}
