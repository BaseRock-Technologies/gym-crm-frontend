import { FormConfig } from "@/types/form";

const profileFormConfig: FormConfig = {
    id: "profile-information",
    title: "Profile Information",
    groups: [
        {
            id: "profile-picture",
            title: "Image",
            type: "default",
            fields: [
            "picture",
            ],
        },
      {
        id: "profile-info",
        title: "Personal Information",
        type: "default",
        fields: [
          "clientName",
          "contactNumber",
          "alternativeContact",
          "memberId",
          "birthday",
          "gender",
          "anniversary",
          "joiningDate",
          "profession",
          "email",
          "status"
        ],
      },
      {
        id: "profile-info-address",
        title: "Address Information",
        type: "single-line",
        fields: [
          "address",
        ],
      },
      {
        id: "profile-info-remarks",
        title: "Remarks Information",
        type: "single-line",
        fields: [
          "remarks",
        ],
      },
    ],
    fields: [
      {
        name: "picture",
        label: "Profile Picture",
        type: "image",
        maxSize: 5 * 1024 * 1024,
        editable: false,
      },
      {
        name: "clientName",
        label: "Client Name",
        type: "text",
        editable: false,
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "number",
        editable: false,
      },
      {
        name: "alternativeContact",
        label: "Alternative Contact",
        type: "text",
        editable: false,
      },
      {
        name: "memberId",
        label: "Membership ID",
        type: "number",
        editable: false,
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
        editable: false,
      },
      {
        name: "status",
        label: "Status",
        options: [
          {
            group: "status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ],
        type: "select",
        placeholder: "Select status",
        editable: false,
      },
      {
        name: "birthday",
        label: "Birthday",
        type: "date",
        placeholder: "birthday date",
        editable: false,
      },
      {
        name: "anniversary",
        label: "Anniversary",
        type: "date",
        placeholder: "anniversary date",
        editable: false,
      },
      {
        name: "joiningDate",
        label: "Date of Joining",
        type: "date",
        placeholder: "date of joining",
        editable: false,
      },
      {
        name: "profession",
        label: "Profession",
        type: "text",
        placeholder: "profession",
        editable: false,
      },
      {
        name: "address",
        placeholder: "address",
        label: "Area Address",
        type: "textarea",
        validation: {
          maxLength: 200,
        },
        editable: false,
      },
      {
        name: "remarks",
        label: "Remarks (if any)",
        type: "textarea",
        validation: {
          maxLength: 200,
        },
        editable: false,
      },
      {
        name: "joiningDate",
        label: "Joining Date",
        type: "date",
        placeholder: "joining date",
        editable: false,
      },
    ],
  };

  export {
    profileFormConfig,
  }