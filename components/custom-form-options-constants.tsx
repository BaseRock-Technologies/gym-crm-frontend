import { FormConfig, FormField } from "@/types/form";

const GymPackageCustomAddOptionForm: FormConfig = {
  id: "new-gym-package",
  title: "Add Gym package",
  groups: [
    {
      id: "packageDetailsFields",
      title: "Package Details",
      type: "card-form",
      fields: [
        "packageName",
        "packagePrice",
        "durationInDays",
        "maxDiscount",
        "status",
      ],
    },
    {
      id: "actions",
      title: "Actions",
      type: "action-group",
      renderType: "default",
      backgroundColor: "bg-transparent",
      layout: "col",
      fields: ["showOnWebsite"],
    },
  ],
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

function getUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const GroupClassPackageCustomAddOptionForm: FormConfig = {
  id: "new-group-class-package",
  title: "Add Group Class package",
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
      name: "packageValidity",
      label: "Validity of Package in days",
      type: "number",
      required: true,
      placeholder: "eg: 365, 180",
    },
    {
      name: "packageSession",
      label: "Session",
      type: "number",
      required: true,
      placeholder: "eg: 15, 30, 40",
    },
    {
      name: "packageClassType",
      label: "Class Type",
      type: "text",
      required: true,
      placeholder: "eg: 1250",
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
    {
      name: "clientCode",
      label: "Client Code",
      type: "text",
      editable: false,
      isHidden: true,
      placeholder: "client code",
      defaultValue: typeof window !== "undefined" && window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
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

const EmployeeCustomAddOptionForm: FormConfig = {
  id: "new-employee",
  title: "Add Employee",
  groups: [
    {
      id: "basicDetails",
      title: "Basic Details",
      type: "background",
      fields: [
        "fullName",
        "contact",
        "email",
        "dateOfBirth",
        "gender",
        "profilePicture",
        "address",
      ],
    },
    {
      id: "employmentDetails",
      title: "Employment Details",
      type: "background",
      fields: ["employeeType", "monthlySalary", "status"],
    },
  ],
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter full name",
    },
    {
      name: "contact",
      label: "Contact Number",
      type: "phone",
      required: true,
      placeholder: "Enter contact number",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email address",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      placeholder: "Select date of birth",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: [
        {
          group: "default",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
        },
      ],
    },
    {
      name: "profilePicture",
      type: "image",
      label: "Profile Picture",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter address",
    },
    {
      name: "employeeType",
      label: "Employee Type",
      type: "select",
      required: true,
      options: [
        {
          group: "default",
          options: [
            { label: "Sales Team", value: "sales-team" },
            { label: "Management", value: "management" },
            { label: "Others", value: "others" },
          ],
        },
      ],
    },
    {
      name: "monthlySalary",
      label: "Monthly Salary",
      type: "number",
      placeholder: "Enter monthly salary",
    },
    {
      name: "status",
      label: "Status",
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
  ],
};

export {
  ClientCustomAddOptionForm,
  ClientSourceCustomAddOptionForm,
  GymPackageCustomAddOptionForm,
  GroupClassPackageCustomAddOptionForm,
  PaytmMethodCustomAddOptionForm,
  TaxCustomAddOptionForm,
  TrainerCustomAddOptionForm,
  chequeConditionalFields,
  EmployeeCustomAddOptionForm,
};
