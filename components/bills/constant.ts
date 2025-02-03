import { showToast } from "@/lib/helper/toast";
import { FormConfig } from "@/types/form";
import { formatTimestamp } from "@/utils/date-utils";
import { ClientCustomAddOptionForm, ClientSourceCustomAddOptionForm, TaxCustomAddOptionForm, chequeConditionalFields, PaytmMethodCustomAddOptionForm, TrainerCustomAddOptionForm, GymPackageCustomAddOptionForm } from "../custom-form-options-constants";


const formConfig: FormConfig = {
    id: "gym-package",
    title: "Create New Bill",
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
        validation: {
          min: 1,
        }
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
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": ClientCustomAddOptionForm,
        },
        primaryFieldValues: {
          "default": ClientCustomAddOptionForm.fields.map(
            (item) => item.name
          )
        },
        fieldsToAddInOptions:{
          contactNumber: ["clientName"],
          email: ["clientName"],
          clientId: ["clientName"],
        },
        apiConfig: {
          apiPath: "client/create",
          method: "POST",
        },
      },
      {
        name: "clientId",
        label: "clientId",
        type: "text",
        placeholder: "clientId",
        isHidden: true,
        dependsOn: {
          field: "clientName",
          formula: (values, options) => {
            const clientId = options?.find(
              (opt) => opt.value === values.clientName
            )?.clientId;
            return clientId|| ''
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
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": ClientSourceCustomAddOptionForm,
        },
        primaryFieldValues: {
          "default": ["clientSource"]
        },
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
        customAddOptionsGroups: ["GYM Packages"],
        addCustomOptionForm: {
          "GYM Packages": GymPackageCustomAddOptionForm,
        },
        primaryFieldValues: {
          "GYM Packages": ["packageName", "packagePrice"]
        },
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
          min: 0,
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
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": TaxCustomAddOptionForm
        },
        primaryFieldValues: {
          "default": ["taxName"]
        },
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
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": PaytmMethodCustomAddOptionForm
        },
        primaryFieldValues: {
          "default": ["paymentMode"]
        },
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
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": TrainerCustomAddOptionForm,
        },
        primaryFieldValues: {
          "default": ["trainer"],
        },
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