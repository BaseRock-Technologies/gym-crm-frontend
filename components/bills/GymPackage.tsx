"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { FormConfig, FormField, FormGroup } from "@/types/form";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
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
      name: "durationInDays",
      label: "Package Duration",
      type: "number",
      required: true,
      placeholder: "eg: 365, 180",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      placeholder: "status",
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
      name: "contactNumber",
      label: "Contact",
      type: "phone",
      required: true,
      placeholder: "contact",
    },
    {
      name: "email",
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
      name: "clientSource",
      label: "Source Name",
      type: "text",
      required: true,
      placeholder: "name",
    },
  ],
};

const TrainerCustomAddOptionForm: FormConfig = {
  id: "client-trainer",
  title: "Add-Trainer",
  fields: [
    {
      name: "trainer",
      label: "Trainer name",
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
      name: "paymentMode",
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
      name: "chargesPercentage",
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
        "memberId",
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
        "packageName",
        "joiningDate",
        "endDate",
        "packagePrice",
        "discount",
        "discountAmount",
        "admissionCharges",
        "taxName",
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
      primaryFieldValues: ClientCustomAddOptionForm.fields.map(
        (item) => item.name
      ),
      formApiData: {
        apiPath: "client/create",
        method: "POST",
      },
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
      name: "clientSource",
      label: "Client Source",
      options: [],
      type: "select",
      placeholder: "Select Client Source",
      allowAddCustomOption: true,
      addCustomOptionForm: ClientSourceCustomAddOptionForm,
      primaryFieldValues: ["clientSource"],
      formApiData: {
        apiPath: "others/client-source/create",
        method: "POST",
      },
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
      name: "packageName",
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
      primaryFieldValues: ["packageName", "packagePrice"],
      fieldsToAddInOptions: {
        durationInDays: ["packageName"],
        packagePrice: ["packageName"],
      },
      formApiData: {
        apiPath: "package/create",
        method: "POST",
      },
    },
    {
      name: "endDate",
      label: "End Date",
      required: true,
      type: "date",
      placeholder: "end date",
      dependsOn: {
        field: "packageName,joiningDate",
        formula: (values, options) => {
          const packageDetails = options?.find(
            (opt) => opt.value === values.packageName
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
        field: "packageName",
        formula: (values, options) =>
          options?.find((opt) => opt.value === values.packageName)
            ?.packagePrice || 0,
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
            options?.find((opt) => opt.value === values.packageName)
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
        field: "packagePrice,discount,packageName",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discount: number = parseFloat(values.discount) || 0;
          const maxDiscount: number =
            options?.find((opt) => opt.value === values.packageName)
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
      name: "taxName",
      label: "Tax",
      options: [],
      type: "select",
      placeholder: "Select tax",
      allowAddCustomOption: true,
      addCustomOptionForm: TaxCustomAddOptionForm,
      primaryFieldValues: ["taxName"],
      formApiData: {
        apiPath: "others/tax/create",
        method: "POST",
      },
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
          "packageName, packagePrice,discountAmount,discount,admissionCharges,taxName",
        formula: (values, options) => {
          const packagePrice: number = parseFloat(values.packagePrice) || 0;
          const discountAmount: number = parseFloat(values.discountAmount) || 0;
          const admissionCharges: number =
            parseFloat(values.admissionCharges) || 0;
          const taxPercent: number =
            options?.find((opt) => opt.value === values.taxName)
              ?.chargesPercentage || 0;
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
      options: [],
      type: "select",
      placeholder: "Select method",
      conditionalFields: {
        cheque: chequeConditionalFields,
      },
      allowAddCustomOption: true,
      addCustomOptionForm: PaytmMethodCustomAddOptionForm,
      primaryFieldValues: ["paymentMode"],
      formApiData: {
        apiPath: "others/payment-method/create",
        method: "POST",
      },
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
      options: [],
      allowAddCustomOption: true,
      addCustomOptionForm: TrainerCustomAddOptionForm,
      primaryFieldValues: ["trainer"],
      formApiData: {
        apiPath: "others/trainer/create",
        method: "POST",
      },
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
            "clientName"
          );
          updateFormConfigOptions(
            formConfig,
            "contactNumber",
            clientDetails,
            "contactNumber",
            "contactNumber"
          );
          updateFormConfigOptions(
            formConfig,
            "clientSource",
            clientSourceDetails,
            "clientSource",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "packageName",
            packageDetails,
            "package",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "taxName",
            taxDetails,
            "taxName",
            "_id"
          );
          updateFormConfigOptions(
            formConfig,
            "paymentMode",
            paymentMethod,
            "paymentMode",
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
        apiData={null}
      />
    </div>
  );
}
