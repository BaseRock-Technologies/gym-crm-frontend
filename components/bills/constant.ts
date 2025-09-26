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
          "invoiceId",
          "memberId",
          "invoiceDate",
          "clientName",
          "contactNumber",
          "alternateContact",
          "email",
          "clientSource"
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
          "sessions",
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
          "followupDate",
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
          name: "invoiceId",
          label: "Invoice ID",
          type: "text",
          placeholder: "Invoice ID",
          required: true,
          defaultValue: "",
        },
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
          clientCode: ["clientName"],
        },
        apiConfig: {
          apiPath: "client/create",
          method: "POST",
        },
      },
      {
        name: "clientCode",
        label: "clientCode",
        type: "text",
        placeholder: "clientCode",
        isHidden: true,
        dependsOn: {
          field: "clientName",
          formula: (values, options) => {
            const clientCode = options?.find(
              (opt) => opt.value === values.clientName
            )?.clientCode;
            return clientCode|| ''
          },
        }
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "text",
        placeholder: "Contact Number",
        required: true,
        editable: true,
        validation: {
          pattern: "^\\d{10}$",
          minLength: 10,
          maxLength: 10
        },
        dependsOn: {
          field: "clientName",
          formula: (values, options) => {
            const contactNumber = options?.find(
              (opt) => opt.value === values.clientName
            )?.contactNumber;
            return contactNumber || values.contactNumber || '';
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
        type: "select",
        placeholder: "Email",
        required: true,
        editable: false,
        dependsOn: {
          field: "clientName",
          formula: (values, options) => {
            const email = options?.find(
              (opt) => opt.value === values.clientName
            )?.email;
            return email || '';
          },
        },
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
        placeholder: "Select Gender",
      },
      {
        name: "birthday",
        label: "Date of Birth",
        type: "date",
        placeholder: "Birthday Date",
      },
      {
        name: "anniversary",
        label: "Anniversary",
        type: "date",
        placeholder: "Anniversary Date",
      },
      {
        name: "profession",
        label: "Profession",
        type: "text",
        placeholder: "Profession",
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
        placeholder: "Choose Workout Hour",
      },
      {
        name: "workoutHourevening",
        label: "",
        type: "time-detailed",
        placeholder: "Choose Workout Hour",
      },
      {
        name: "address",
        placeholder: "Address",
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
        placeholder: "Joining Date",
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
        placeholder: "End Date",
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
        placeholder: "Price",
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
        placeholder: "Discount Percentage",
        editable: true,
        validation: {
          max: 100,
          min: 0,
        },
        dependsOn: {
          field: "packageName,packagePrice",
          formula: (values, options) => {
            const packagePrice: number = parseFloat(values.packagePrice) || 0;
            const maxDiscount: number =
              options?.find((opt) => opt.value === values.packageName)
                ?.maxDiscount || 999999; // Default high value if no max discount

            const userDiscount: number = parseFloat(values.discount) || 0;
            if (packagePrice > 0 && maxDiscount < 999999) {
              const maxDiscountPercentage = Math.round((maxDiscount / packagePrice * 100) * 100) / 100;
              if (userDiscount > maxDiscountPercentage) {
                showToast(
                  "warning",
                  `Max discount percentage is ${maxDiscountPercentage.toFixed(2)}%`
                );
                return maxDiscountPercentage;
              }
            }
            return userDiscount;
          },
        },
      },
      {
        name: "discountAmount",
        label: "Discount Amount",
        type: "decimal",
        placeholder: "Discount Amount",
        editable: true,
        dependsOn: {
          field: "packagePrice,discount,packageName",
          formula: (values, options) => {
            const packagePrice: number = parseFloat(values.packagePrice) || 0;
            const discount: number = parseFloat(values.discount) || 0;
            const maxDiscount: number =
              options?.find((opt) => opt.value === values.packageName)
                ?.maxDiscount || 999999; // Default high value if no max discount

            // Calculate discount amount from percentage
            if (packagePrice > 0 && discount > 0) {
              const calculatedAmount = Math.round((packagePrice * discount / 100) * 100) / 100;
              return Math.min(calculatedAmount, maxDiscount);
            }

            // Allow manual entry if no percentage is set
            const userDiscountAmount: number = parseFloat(values.discountAmount) || 0;
            if (userDiscountAmount > maxDiscount && maxDiscount < 999999) {
              showToast("warning", `Max discount amount is ₹${maxDiscount}`);
              return maxDiscount;
            }
            return userDiscountAmount;
          },
        },
      },
      {
        name: "admissionCharges",
        label: "Admission Charges",
        type: "decimal",
        placeholder: "Admission",
      },
      {
        name: "taxName",
        label: "Tax",
        options: [],
        type: "select",
        placeholder: "Select Tax",
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
        placeholder: "Payable",
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
        placeholder: "Paid",
      },
      {
        name: "paymentMode",
        label: "Payment Mode",
        options: [],
        type: "select",
        placeholder: "Select Method",
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
        placeholder: "Paid",
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
        name: "sessions",
        label: "Session(s)",
        type: "text",
        placeholder: "Sessions",
      },
      {
        name: "amount",
        label: "Amount",
        type: "decimal",
        placeholder: "Amount",
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
        name: "followupDate",
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
        placeholder: "Rep",
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
      // {
      //   name: "sendTextAndEmail",
      //   label: "Send Text & Email",
      //   type: "checkbox",
      //   labelPos: "left",
      // },
      // {
      //   name: "sendWhatsapp",
      //   label: "Send WhatsApp",
      //   type: "checkbox",
      //   labelPos: "left",
      // },
    ],
  };

  export {
  formConfig }