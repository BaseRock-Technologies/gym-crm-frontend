import { showToast } from "@/lib/helper/toast";
import { FormConfig, FormField } from "@/types/form";
import { formatTimestamp } from "@/utils/date-utils";

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
        name: "maxDiscount",
        label: "Max Discount in Rupees",
        type: "number",
        required: true,
        placeholder: "eg: 1250",
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
      name: "chequeNumber",
      label: "Cheque Number",
      type: "text",
    },
    {
      name: "chequeDate",
      label: "Cheque Date",
      type: "date",
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
          "address",
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
        type: "number",
        editable: false,
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
        required: true,
        placeholder: "Select Client Name",
        allowAddCustomOption: true,
        addCustomOptionForm: ClientCustomAddOptionForm,
        primaryFieldValues: ClientCustomAddOptionForm.fields.map(
          (item) => item.name
        ),
        apiConfig: {
          apiPath: "client/create",
          method: "POST",
        },
        dependsOn: {
          field: "contactNumber",
          formula: (values, options) => {
            const clientName = options?.find(
              (opt) => opt.value === values.contactNumber
            )?.clientName;
            return clientName || ''
          },
        }
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "select",
        placeholder: "Select Contact Number",
        required: true,
        editable: false,
        dependsOn: {
          field: "clientName",
          formula: (values, options) => {
            const contactNumber = options?.find(
              (opt) => opt.value === values.clientName
            )?.contactNumber;
            return contactNumber || ''
          },
        }
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
        apiConfig: {
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
        name: "address",
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
        name: "packageName",
        label: "Package",
  
        options: [],
        type: "select",
        placeholder: "Select Package Name",
        allowAddCustomOption: true,
        addCustomOptionForm: PackageCustomAddOptionForm,
        primaryFieldValues: ["packageName", "packagePrice"],
        fieldsToAddInOptions: {
          durationInDays: ["packageName"],
          packagePrice: ["packageName"],
          maxDiscount: ["packageName"],
        },
        apiConfig: {
          apiPath: "package/create",
          method: "POST",
        },
      },
      {
        name: "endDate",
        label: "End Date",
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
        validation: {
          max: 100,
          min: 0.1,
        },
        dependsOn: {
          field: "packagePrice,discountAmount,packageName",
          formula: (values, options) => {
            const packagePrice: number = parseFloat(values.packagePrice) || 0;
            const userDiscount: number = parseFloat(values.discount) || 0;
            const maxDiscount: number =
              options?.find((opt) => opt.value === values.packageName)
                ?.maxDiscount || 0;
  
            if (packagePrice) {
              const maxDiscountPercentage = (maxDiscount / packagePrice) * 100;
              if (userDiscount > maxDiscountPercentage) {
                showToast(
                  "info",
                  `Max discount percentage is ${maxDiscountPercentage}`
                );
                return maxDiscountPercentage;
              }
              return userDiscount;
            } else {
              return userDiscount;
            }
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
        apiConfig: {
          apiPath: "others/tax/create",
          method: "POST",
        },
      },
      {
        name: "amountPayable",
        label: "Amount Payable",
        type: "decimal",
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
      },
      {
        name: "paymentMode",
        label: "Payment Mode",
        options: [],
        type: "select",
        placeholder: "Select method",
        conditionalFields: {
          Cheque: chequeConditionalFields,
        },
        allowAddCustomOption: true,
        addCustomOptionForm: PaytmMethodCustomAddOptionForm,
        primaryFieldValues: ["paymentMode"],
        apiConfig: {
          apiPath: "others/payment-method/create",
          method: "POST",
        },
      },
      {
        name: "balanceAmount",
        label: "Balance",
        type: "decimal",
        placeholder: "paid",
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
        apiConfig: {
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

  export {
  formConfig }