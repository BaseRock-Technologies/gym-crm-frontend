"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { FormConfig, FormField, FormGroup } from "@/types/form";
import { StatusResponse } from "@/types/response";
import { formatTimestamp } from "@/utils/date-utils";
import React from "react";

const PackageCustomAddOptionForm: FormConfig = {
  id: "new-package",
  title: "Add package",
  fields: [
    {
      name: "addOptionPackageName",
      label: "Package Name",
      type: "text",
      required: true,
      placeholder: "Annual For male",
    },
    {
      name: "addOptionPackagePrice",
      label: "Package Price",
      type: "number",
      required: true,
      placeholder: "eg: 12000, 5000",
    },
    {
      name: "addOptionPackageDuration",
      label: "Package Duration",
      type: "number",
      required: true,
      placeholder: "eg: 365, 180",
    },
    {
      name: "addOptionIsActive",
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
      name: "addOptionShowOnWebsite",
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
      name: "addOptionClientName",
      label: "Client Name",
      type: "text",
      required: true,
      placeholder: "name",
    },
    {
      name: "addOptionContactNumber",
      label: "Contact",
      type: "phone",
      required: true,
      placeholder: "contact",
    },
    {
      name: "addOptionEmail",
      label: "Email",
      type: "email",
      placeholder: "email",
    },
  ],
};

const ClientSourceCustomAddOptionForm: FormConfig = {
  id: "client-source",
  title: "Add Source",
  fields: [
    {
      name: "addOptionSourceName",
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
      name: "addOptionPaymentMethod",
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
      name: "addOptionTaxName",
      label: "Tax Name",
      type: "text",
      required: true,
      placeholder: "tax",
    },
    {
      name: "addOptionCharges",
      label: "Charges",
      type: "text",
      required: true,
      placeholder: "18%, 15%, 2%",
    },
  ],
};

const chequeConditionalFields: FormField[] = [
  {
    name: "condFieldChequeNumber",
    label: "Cheque Number",
    type: "text",
    required: true,
  },
  {
    name: "condFieldChequeDate",
    label: "Cheque Date",
    type: "date",
    required: true,
  },
  {
    name: "condFieldChequeStatus",
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
        "memberId",
        "invoiceDate",
        "clientName",
        "contactNumber",
        "alternateContact",
        "email",
        "clientSourceDetails",
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
        "packageDetails",
        "joiningDate",
        "endDate",
        "packagePrice",
        "discount",
        "discountAmount",
        "admissionCharges",
        "taxDetails",
        "amountPayable",
        "amountPaid",
        "paymentMode",
        "balanceAmount",
      ],
    },
    {
      id: "payment-info",
      title: "Payment Information",
      type: "background",
      backgroundColor: "bg-gray-200",
      additionalClass: "p-4",
      fields: [
        "amount",
        "followUpDate",
        "amountStatus",
        "paymentMethod",
        "paymentMethodDetail",
      ],
    },
    {
      id: "trainer-info",
      title: "Trainer Information",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: ["trainer", "clientRepresentative"],
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
      name: "memberId",
      label: "Member ID",
      type: "text",
      editable: false,
      required: true,
    },
    {
      name: "invoiceDate",
      label: "Invoice Date",
      type: "date",
      placeholder: "Invoice Date",
      required: true,
    },
    {
      name: "clientName",
      label: "Client",
      options: [],
      type: "select",
      required: true,
      placeholder: "Select Client Name",
      allowAddCustomOption: true,
      addCustomOptionForm: ClientCustomAddOptionForm,
      primaryFieldValues: [
        "addOptionClientName",
        "addOptionContactNumber",
        "addOptionEmail",
      ],
      targetedFieldNames: ["clientName", "contactNumber", "email"],
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
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "clientSourceDetails",
      label: "Client Source",
      options: [
        {
          group: "default",
          options: [],
        },
      ],
      type: "select",
      placeholder: "Select Client Source",
      allowAddCustomOption: true,
      addCustomOptionForm: ClientSourceCustomAddOptionForm,
      primaryFieldValues: ["addOptionSourceName"],
      targetedFieldNames: ["sourceName"],
      shouldAskGroupNameInAddOption: false,
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
      placeholder: "Select gender",
    },
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
      placeholder: "birthday date",
    },
    {
      name: "anniversary",
      label: "Anniversary",
      type: "date",
      placeholder: "anniversary date",
    },
    {
      name: "profession",
      label: "Profession",
      type: "text",
      placeholder: "profession",
    },
    {
      name: "taxId",
      label: "Tax ID",
      type: "text",
      placeholder: "Tax ID",
    },
    {
      name: "workoutHourmorning",
      label: "Workout Hours",
      type: "time-detailed",
      placeholder: "choose workout hour",
    },
    {
      name: "workoutHourevening",
      label: "",
      type: "time-detailed",
      placeholder: "choose workout hour",
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
      required: true,
    },
    {
      name: "packageDetails",
      label: "Package",
      required: true,

      options: [
        {
          group: "default",
          options: [],
        },
      ],
      type: "select",
      placeholder: "Select Package Name",
      allowAddCustomOption: true,
      addCustomOptionForm: PackageCustomAddOptionForm,
      primaryFieldValues: ["addOptionPackageName"],
      targetedFieldNames: ["packageDetails"],
    },
    {
      name: "endDate",
      label: "End Date",
      required: true,
      type: "date",
      placeholder: "end date",
      dependsOn: {
        field: "packageDetails,joiningDate",
        formula: (values, options) => {
          const packageDetails = options?.find(
            (opt) => opt.value === values.packageDetails
          );
          const totalDurationOfPackageInDays =
            packageDetails?.durationInDays || 0;
          const joiningDate = values.joiningDate
            ? new Date(values.joiningDate)
            : new Date();

          const endDate = new Date(joiningDate);
          endDate.setDate(joiningDate.getDate() + totalDurationOfPackageInDays);
          return formatTimestamp(Math.floor(endDate.getTime() / 1000));
        },
      },
    },
    {
      name: "packagePrice",
      label: "Price",
      type: "decimal",
      placeholder: "price",
      editable: false,
      dependsOn: {
        field: "packageDetails",
        formula: (values, options) =>
          options?.find((opt) => opt.value === values.packageDetails)?.price ||
          0,
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
            options?.find((opt) => opt.value === values.packageDetails)
              ?.maxDiscount || 0;

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
      editable: false,
      dependsOn: {
        field: "packagePrice,discount,packageDetails",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discount: number = parseFloat(values.discount) || 0;
          const maxDiscount: number =
            options?.find((opt) => opt.value === values.packageDetails)
              ?.maxDiscount || 0;
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
      name: "taxDetails",
      label: "Tax",
      options: [],
      type: "select",
      placeholder: "Select tax",
      allowAddCustomOption: true,
      addCustomOptionForm: TaxCustomAddOptionForm,
      primaryFieldValues: ["taxDetails"],
      targetedFieldNames: ["addOptionTaxName"],
    },
    {
      name: "amountPayable",
      label: "Amount Payable",
      type: "decimal",
      required: true,
      editable: false,
      placeholder: "payable",
      dependsOn: {
        field:
          "packageDetails, packagePrice,discountAmount,discount,admissionCharges,taxDetails",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discountAmount: number = parseFloat(values.discountAmount) || 0;
          const admissionCharges: number =
            parseFloat(values.admissionCharges) || 0;
          const taxPercent: number =
            options?.find((opt) => opt.value === values.taxDetails)
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
      required: true,
    },
    {
      name: "paymentMode",
      label: "Payment Mode",
      options: [
        {
          group: "default",
          options: [],
        },
      ],
      type: "select",
      placeholder: "Select method",
      conditionalFields: {
        cheque: chequeConditionalFields,
      },
      allowAddCustomOption: true,
      addCustomOptionForm: PaytmMethodCustomAddOptionForm,
      primaryFieldValues: ["addOptionPaymentMethod"],
      targetedFieldNames: ["paymentMode"],
    },
    {
      name: "balanceAmount",
      label: "Balance",
      type: "decimal",
      placeholder: "paid",
      required: true,
      editable: false,
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
      name: "amount",
      label: "Amount",
      type: "decimal",
      placeholder: "amount",
      editable: false,
      dependsOn: {
        field: "amountPayable, amountPaid",
        formula: (values) => {
          const amountPaid: number = parseFloat(values.amountPaid) || 0;
          const amountPayable: number = parseFloat(values.amountPayable) || 0;
          if (amountPaid > amountPayable) {
            return amountPayable;
          }
          const priceCalculates = amountPayable - amountPaid;
          return priceCalculates.toFixed(2);
        },
      },
    },
    {
      name: "followUpDate",
      label: "Followup Date",
      type: "date",
    },
    {
      name: "amountStatus",
      label: "Status",
      options: [
        {
          group: "default",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Paid", value: "paid" },
          ],
        },
      ],
      type: "select",
      placeholder: "Select Status",
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      options: [
        {
          group: "default",
          options: [],
        },
      ],
      type: "select",
      placeholder: "Select method",
    },
    {
      name: "paymentMethodDetail",
      label: "Payment Method Detail (if any)",
      type: "textarea",
    },
    {
      name: "clientRepresentative",
      label: "Client Representative",
      type: "text",
      placeholder: "rep",
      required: true,
      editable: false,
    },
    {
      name: "trainer",
      label: "Appoint Trainer",
      type: "select",
      options: [
        {
          group: "default",
          options: [],
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
        const res: StatusResponse = await post({}, "bills/gym-bill");
        if (res.status === "success" && res.data) {
          const {
            billId,
            clientDetails,
            clientSourceDetails,
            packageDetails,
            taxDetails,
            paymentMethod,
            trainersDetails,
          } = res.data;
          const currentDate = formatTimestamp(
            Math.floor(new Date().getTime() / 1000)
          );
          const data = {
            memberId: billId.toString(),
            clientRepresentative: user?.userName || "",
            invoiceDate: currentDate,
            joiningDate: currentDate,
            endDate: currentDate,
          };
          updateFormConfigOptions(
            formConfig,
            "clientName",
            clientDetails,
            "clientName",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "contactNumber",
            clientDetails,
            "contactNumber",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "clientSourceDetails",
            clientSourceDetails,
            "source",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "packageDetails",
            packageDetails,
            "package",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "taxDetails",
            taxDetails,
            "taxName",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "paymentMethod",
            paymentMethod,
            "method",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "trainer",
            trainersDetails,
            "trainer",
            "_id"
          );
          setInitialData(data);
        }
      } catch (error) {
        console.error(
          "Error fetching initial data in Gym Packgae Bill:",
          error
        );
        showToast("error", "Failed to load data");
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
