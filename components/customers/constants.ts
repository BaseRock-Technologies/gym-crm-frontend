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
          "membershipId",
          "dateOfBirth",
          "gender",
          "anniversary",
          "dateOfJoining",
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
      },
      {
        name: "clientName",
        label: "Client Name",
        type: "text",
      },
      {
        name: "contactNumber",
        label: "Contact Number",
        type: "text",
      },
      {
        name: "alternativeContact",
        label: "Alternative Contact",
        type: "text",
      },
      {
        name: "membershipId",
        label: "Membership ID",
        type: "text",
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
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
        name: "joiningDate",
        label: "Joining Date",
        type: "date",
        placeholder: "joining date",
      },
    ],
  };

  export {
    profileFormConfig,
  }