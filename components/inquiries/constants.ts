import { FormConfig } from "@/types/form";
import { EmployeeCustomAddOptionForm, ClientSourceCustomAddOptionForm, GroupClassPackageCustomAddOptionForm, GymPackageCustomAddOptionForm } from "../custom-form-options-constants";

  export const InquiryFormConfig: FormConfig = {
    id: "inquiry",
    title: "Create new Inquiry",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "Enter first name",
        validation: {
          minLength: 1,
          maxLength: 50,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter last name",
      },
      {
        name: "contactNumber",
        label: "Contact number",
        type: "phone",
        required: true,
        placeholder: "Enter contact number",
        validation: {
          pattern: "^\\d{10}$",
        },
      },
      {
        name: "alternateContact",
        label: "Alternate Contact",
        type: "phone",
        placeholder: "Enter alternate number",
        validation: {
          pattern: "^\\d{10}$",
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email address",
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
        name: "areaAddress",
        placeholder: "Enter address",
        label: "Area Address",
        type: "text",
      },
      {
        name: "followupDate",
        label: "Schedule FollowUp",
        type: "date",
        required: true,
        placeholder: "Select follow-up date",
      },
      {
        name: "followupTime",
        label: "Schedule FollowUp Time",
        type: "time",
        placeholder: "Select follow-up time",
      },
      {
        name: "assessmentDate",
        label: "Assessment Date",
        type: "date",
        placeholder: "Select assessment date",
      },
      {
        name: "status",
        label: "Status",
        options: [
          {
            group: "Status",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Close", value: "close" },
              { label: "Completed", value: "completed" },
            ],
          },
        ],
        type: "select",
        required: true,
        placeholder: "Select status",
      },
      {
        name: "attendedBy",
        label: "Attended By",
        options: [],
        type: "select",
        allowAddCustomOption: true,
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
            "default": EmployeeCustomAddOptionForm,
        },
        primaryFieldValues: {
            "default": ["fullName"]
        },
        apiConfig: {
            apiPath: "others/employee/create",
            method: "POST",
          },
        required: true,
        placeholder: "Select staff",
      },
      {
        name: "convertibility",
        label: "Convertibility",
        options: [
          {
            group: "Convertibility",
            options: [
              { label: "Hot", value: "hot" },
              { label: "Warm", value: "warm" },
              { label: "Cold", value: "cold" },
              { label: "Expected Amount", value: "expected-amount" },
              { label: "Successfull Followup", value: "successful-followup" },
            ],
          },
        ],
        type: "select",
        required: true,
        placeholder: "Select convertibility",
      },
      {
        name: "sourceOfInquiry",
        label: "Source of Inquiry",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select source",
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
        name: "inquiryFor",
        label: "Inquiry For",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select package",
        allowAddCustomOption: true,
        customAddOptionsGroups: ["GYM Packages", "PT Packages", "Group Class Package"],
        addCustomOptionForm: {
          "GYM Packages": GymPackageCustomAddOptionForm,
          "PT Packages": GroupClassPackageCustomAddOptionForm,
          "Group Class Package": GroupClassPackageCustomAddOptionForm,
        },
        primaryFieldValues: {
          "GYM Packages": ["packageName"],
          "PT Packages": ["packageName"],
          "Group Class Package": ["packageName"],
        },
        apiConfig: {
          apiPath: "package/create",
          method: "POST",
        },
      },
      {
        name: "feedback",
        label: "Responce/Feedback",
        type: "textarea",
        required: true,
        placeholder: "Enter response or feedback",
      },
      // {
      //   name: "sendTextEmail",
      //   label: "Send Text & Email",
      //   type: "checkbox",
      //   labelPos: "left",
      // },
    ],
  };