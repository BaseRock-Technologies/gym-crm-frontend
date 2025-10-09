import { FormConfig } from "@/types/form";
import { EmployeeCustomAddOptionForm, ClientSourceCustomAddOptionForm, GroupClassPackageCustomAddOptionForm, GymPackageCustomAddOptionForm } from "../custom-form-options-constants";

  export const InquiryFormConfig: FormConfig = {
    id: "inquiry",
    title: "Create New Inquiry",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "First Name",
        validation: {
          pattern: "^[A-Za-z ]+$",
          minLength: 1,
          maxLength: 50,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",

        required: true,
        validation: {
          pattern: "^[A-Za-z ]+$",
          minLength: 1,
          maxLength: 50,
        },
        placeholder: "Last Name",

      },
      {
        name: "contactNumber",
        label: "Contact Number",
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
        
        placeholder: "Alternate Number",
        validation: {
          pattern: "^\\d{10}$",
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",

        required: true,
        placeholder: "Email Address",
        validation: {
          pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
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
        required: true,
        placeholder: "Select Gender",
      },
      {
        name: "areaAddress",

        label: "Area Address",
        required: true,
        type: "text",
      },
      {
        name: "followupDate",
        label: "Schedule FollowUp",
        type: "date",
        required: true,
        placeholder: "Select Follow Up",
      },
      {
        name: "birthday",
        label: "Date of Birth",
        type: "date",
        required: true,
        placeholder: "Date of Birth",
      },
      // {

      //   label: "Schedule FollowUp Time",
      //   type: "time",
      //   placeholder: "Enter Time",
      // },
      // {
      //   name: "assessmentDate",
      //   label: "Assessment Date",
      //   type: "date",
      //   placeholder: "Select Date",
      // },
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
        placeholder: "Select Status",
      },
      {
        name: "attendedBy",
        label: "Attended By",
        options: [],
        type: "select",
        placeholder: "Select Staff",
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
          fieldsToAddInOptions: {   
          "default": ["clientSource", "_id"]
        },
        required: true,
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
        placeholder: "Select Convertibility",
      },
      {
        name: "clientSource",
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
        fieldsToAddInOptions: {
          "default": ["clientSource", "_id"]
        },
      },
      {  
        name: "packageName",
        label: "Inquiry For",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select Package",
        allowAddCustomOption: true,
        customAddOptionsGroups: ["GYM Packages", "PT Packages", "Group Class Package"],
        addCustomOptionForm: {
          "GYM Packages": GymPackageCustomAddOptionForm,
          "PT Packages": GroupClassPackageCustomAddOptionForm,
          "Group Class Package": GroupClassPackageCustomAddOptionForm,
        },
        primaryFieldValues: {
          "GYM Packages": ["packageName", "packagePrice"],
          "PT Packages": ["packageName", "packagePrice"],
          "Group Class Package": ["packageName", "packagePrice"]
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
        name: "feedback",
        label: "Response/Feedback",
        type: "textarea",
        placeholder: "Enter Feedback",
        required: true,
      },
      // {
      //   name: "sendTextEmail",
      //   label: "Send Text & Email",
      //   type: "checkbox",
      //   labelPos: "left",
      // },
    ],
  };