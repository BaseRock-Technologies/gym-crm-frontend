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
        placeholder: "Enter Name",
        validation: {
          minLength: 1,
          maxLength: 50,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter Name",
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
        name: "alternateContact",
        label: "Alternate Contact",
        type: "phone",
        placeholder: "Alternate Contact",
        validation: {
          pattern: "^\\d{10}$",
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
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
        placeholder: "Select Gender",
      },
      {
        name: "areaAddress",
        placeholder: "address",
        label: "Area Address",
        type: "text",
      },
      {
        name: "followUpDate",
        label: "Schedule FollowUp",
        type: "date",
        required: true,
        placeholder: "Select Follow Up",
      },
      {
        name: "followUpTime",
        label: "Schedule FollowUp Time",
        type: "time",
        placeholder: "Enter Time",
      },
      {
        name: "assessmentDate",
        label: "Assessment Date",
        type: "date",
        placeholder: "Select Date",
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
              { label: "Converted", value: "converted" },
            ],
          },
        ],
        type: "select",
        required: true,
        placeholder: "Select Status",
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
            "default": ["firstName"]
        },
        apiConfig: {
            apiPath: "others/employee/create",
            method: "POST",
          },
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
              { label: "Successfull Followup", value: "successfull-followup" },
            ],
          },
        ],
        type: "select",
        required: true,
        placeholder: "Select Convertibility",
      },
      {
        name: "sourceOfInquiry",
        label: "Source of Inquiry",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select Source",
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
        placeholder: "Select Source",
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
      },
      {
        name: "sendTextEmail",
        label: "Send Text & Email",
        type: "checkbox",
        labelPos: "left",
      },
    ],
  };