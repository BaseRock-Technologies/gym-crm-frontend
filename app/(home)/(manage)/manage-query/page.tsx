import { DynamicForm } from "@/components/dynamic-form";
import { FormConfig } from "@/types/form";
import { User2 } from "lucide-react";

const AttendedByCustomAddOptionForm: FormConfig = {
  id: "attendedBy-custom-add",
  title: "Create Attended By Option",
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
  ],
};

const SourceOfInquiryCustomAddOptionForm: FormConfig = {
  id: "sourceOfInquiry-custom-add",
  title: "Create Source of Inquiry Option",
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
  ],
};

const InquiryForCustomAddOptionForm: FormConfig = {
  id: "inquiryFor-custom-add",
  title: "Create Inquiry For Option",
  fields: [
    {
      name: "packageName",
      label: "Package Name",
      type: "text",
      required: true,
      placeholder: "Enter name",
      validation: {
        minLength: 1,
        maxLength: 50,
      },
    },
  ],
};

const formConfig: FormConfig = {
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
      label: "Area Address",
      type: "text",
    },
    {
      name: "scheduleFollowUp",
      label: "Schedule FollowUp",
      type: "date",
      required: true,
      placeholder: "Select Follow Up",
    },
    {
      name: "scheduleFollowUpTime",
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
      options: [
        {
          group: "Attended By",
          options: [{ label: "Admin", value: "admin" }],
        },
      ],
      type: "select",
      allowAddCustomOption: true,
      addCustomOptionForm: AttendedByCustomAddOptionForm,
      primaryFieldValue: "firstName",
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
      options: [
        {
          group: "Source of Inquiry",
          options: [
            { label: "Client Ref", value: "client-ref" },
            { label: "Flyer", value: "flyer" },
            { label: "Hoarders", value: "hoarders" },
            { label: "Instagram", value: "instagram" },
            { label: "Walk-In", value: "walk-in" },
          ],
        },
      ],
      type: "select",
      required: true,
      placeholder: "Select Source",
      allowAddCustomOption: true,
      addCustomOptionForm: SourceOfInquiryCustomAddOptionForm,
      primaryFieldValue: "firstName",
    },
    {
      name: "inquiryFor",
      label: "Inquiry For",
      options: [
        {
          group: "Gym Packages",
          options: [
            { label: "Annual Package", value: "annual-package" },
            { label: "1m", value: "1m" },
            { label: "3m", value: "3m" },
            { label: "6m", value: "6m" },
            { label: "7m", value: "7m" },
            { label: "12m", value: "12m" },
            { label: "13m", value: "13m" },
            { label: "14m", value: "14m" },
            { label: "Trial Pack", value: "trial-pack" },
          ],
        },

        {
          group: "PT Packages",
          options: [
            { label: "12 PT Sessions", value: "12-PT-sessions" },
            { label: "12M+PT", value: "12M+PT" },
            { label: "1M+PT", value: "1M+PT" },
            { label: "3M+PT", value: "3M+PT" },
            { label: "12sec-PT", value: "12sec-PT" },
            { label: "3M+12PT", value: "3M+12PT" },
          ],
        },
      ],
      type: "select",
      required: true,
      placeholder: "Select Source",
      allowAddCustomOption: true,
      addCustomOptionForm: InquiryForCustomAddOptionForm,
      primaryFieldValue: "packageName",
    },
    {
      name: "feedback",
      label: "Responce/Feedback",
      type: "textarea",
      required: true,
    },
    {
      name: "send-email",
      label: "Send Text & Email",
      type: "checkbox",
      labelPos: "left",
    },
    {
      name: "profile",
      label: "Profile",
      type: "image",
      required: true,
      formatsAccepted: ["image/png", "image/jpeg"],
      formatsAcceptedPlaceholder: ["png", "jpeg"],
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "resume",
      label: "Resume",
      type: "file",
      required: true,
      formatsAccepted: ["application/pdf"],
      formatsAcceptedPlaceholder: ["pdf"],
      maxSize: 4 * 1024 * 1024,
    },
  ],
};

export default function ManageQueries() {
  return (
    <div className="p-6">
      <DynamicForm config={formConfig} submitBtnText="CREATE INQUIRY" />
    </div>
  );
}
