"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";

// Example data and table configuration (unchanged)
// const mockData = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   name: `Client ${i + 1}`,
//   type: "Regular",
//   contact: `+1234567${i.toString().padStart(4, "0")}`,
//   followupDate: "2024-12-08",
//   representative: "Admin",
//   status: "Active",
// }));
const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "number", header: "Number", accessorKey: "number" },
    { id: "for", header: "For", accessorKey: "for" },
    {
      id: "nextFollowUp",
      header: "Next Follow-up",
      accessorKey: "nextFollowUp",
    },
    { id: "representative", header: "Rep.", accessorKey: "representative" },
    { id: "status", header: "Status", accessorKey: "status" },
  ],
  actions: [
    {
      id: "sms",
      label: "SMS",
      onClick: (row) => console.log("SMS", row),
    },
  ],
  filters: [
    {
      id: "employee",
      label: "Select Employee",
      type: "select",
      options: [
        { label: "All employees", value: "all" },
        { label: "Admin", value: "admin" },
        { label: "Staff", value: "staff" },
      ],
    },
    {
      id: "type",
      label: "Select Type",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Hot", value: "hot" },
        { label: "Warm", value: "warm" },
        { label: "Cold", value: "cold" },
        { label: "Expected Amount", value: "expected-amount" },
        { label: "Successfull Followup", value: "successfull-followup" },
      ],
    },
    {
      id: "date-range",
      label: "Pick a date",
      type: "date-range",
      dateRange: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  bulkActions: [
    {
      id: "SMS",
      label: "Bulk SMS",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("SMS", value),
    },
  ],
  searchableColumns: ["name", "number"],
};

export default function PendingInquiries() {
  return <DataTableWrapper config={tableConfig} initialData={mockData} />;
}
