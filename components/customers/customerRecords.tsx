"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImageCell } from "../image-cell";

interface CustomerRecordsProps {}

// const mockData: any[] = [];

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  photo: <ImageCell />,
  clientName: "Regular",
  gender: `+1234567${i.toString().padStart(4, "0")}`,
  registration: "2024-12-08",
  package: "Admin",
  expiration: "Active",
}));

const tableConfig: TableConfig = {
  columns: [
    { id: "id", header: "Cliend ID/Biometric ID", accessorKey: "id" },
    {
      id: "photo",
      header: "Photo",
      cell: (props) => <ImageCell {...props} />,
      accessorKey: "photo",
    },
    { id: "clientName", header: "Client Name", accessorKey: "clientName" },
    { id: "gender", header: "Gender", accessorKey: "gender" },
    { id: "registration", header: "Registration", accessorKey: "registration" },
    { id: "package", header: "Package", accessorKey: "package" },
    { id: "expiration", header: "Expiration", accessorKey: "expiration" },
  ],
  actions: [
    {
      id: "viewBill",
      label: "View Bill",
      onClick: (row) => console.log("View Bill", row),
    },
    {
      id: "renewBill",
      label: "Renew Bill",
      onClick: (row) => console.log("Renew Bill", row),
    },
    {
      id: "freezeMembership",
      label: "Freeze Membership(s)",
      onClick: (row) => console.log("Freeze Membership(s)", row),
    },
    {
      id: "transferMembership",
      label: "Transfer Membership(s)",
      onClick: (row) => console.log("Transfer Membership(s)", row),
    },
    {
      id: "sendBill",
      label: "SMS / Whatsapp / E-mail",
      onClick: (row) => console.log("SMS / Whatsapp / E-mail", row),
    },
    {
      id: "addFollowup",
      label: "Add Followup",
      onClick: (row) => console.log("Add Followup", row),
    },
    {
      id: "sendQR",
      label: "Send QR Url via SMS & Email",
      onClick: (row) => console.log("Send QR Url via SMS & Email", row),
    },
    {
      id: "markAttendance",
      label: "Mark attendance-in",
      onClick: (row) => console.log("Mark attendance-in", row),
    },
    {
      id: "registerRfid",
      label: "Register RFID no",
      onClick: (row) => console.log("Register RFID no", row),
    },
    {
      id: "deleteClient",
      label: "Delete Client",
      onClick: (row) => console.log("Delete Client", row),
    },
  ],
  outOfActions: [
    {
      id: "profile",
      label: "Profile",
      type: "link",
      href: "/profile",
    },
    {
      id: "whatsapp",
      label: "Whatsapp",
      type: "button",
      icon: Send,
      onClick: (row) => console.log("Whatapp", row),
      customClass: "bg-green-500",
      btnType: "icon",
    },
  ],
  filters: [
    {
      id: "gender",
      label: "Select Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      id: "packages",
      label: "All Packages",
      type: "select",
      options: [
        // from db
      ],
    },

    {
      id: "membership",
      label: "Select Membership",
      type: "select",
      options: [
        { label: "Gym Membership", value: "gym-membership" },
        { label: "Personal Training", value: "personal-training" },
        { label: "Group Classes", value: "group-classes" },
      ],
    },
    {
      id: "clientTypes",
      label: "Select Client Type",
      type: "select",
      options: [
        { label: "Live Clients", value: "live-clients" },
        { label: "Inactive Clients", value: "inactive-clients" },
        { label: "Manual inactive Clients", value: "manual-inactive-clients" },
        { label: "New Clients", value: "new-clients" },
        { label: "Deleted Clients", value: "deleted-clients" },
      ],
    },
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  searchableColumns: ["name", "number"],

  bulkActions: [
    {
      id: "SMS",
      label: "Bulk SMS",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("SMS", value),
    },
  ],
};

const CustomerRecords: React.FC<CustomerRecordsProps> = ({}) => {
  return (
    // <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
    //   <CardHeader className="bg-primary text-white mb-5 shadow-sm">
    //     <CardTitle>Inquiry Records</CardTitle>
    //   </CardHeader>
    //   <CardContent className="container">
    //     <DataTableWrapper config={tableConfig}  />
    //   </CardContent>
    // </Card>
    <div>To be implemented</div>
  );
};

export default CustomerRecords;
