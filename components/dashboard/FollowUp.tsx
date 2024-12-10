"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Plus, Send } from "lucide-react";

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
    { id: "type", header: "Type", accessorKey: "type" },
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "contact", header: "Contact", accessorKey: "contact" },
    {
      id: "followupDate",
      header: "Followup date",
      accessorKey: "followupDate",
    },
    { id: "representative", header: "Rep.", accessorKey: "representative" },
  ],
  actions: [
    {
      id: "add-followup",
      label: "Add Followup",
      onClick: (row) => console.log("Add Followup", row),
    },
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
        { label: "All types", value: "all" },
        { label: "Regular", value: "regular" },
        { label: "Premium", value: "premium" },
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
  ],
  bulkActions: [
    {
      id: "SMS",
      label: "Bulk SMS",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("SMS", value),
    },
    {
      id: "follow-up",
      label: "Create Followup",
      icon: Plus,
      btnVariant: "default",
      onClick: (value) => console.log("Followup", value),
    },
  ],
};

export default function FollowUp() {
  return (
    <div className="container mx-auto py-5">
      <DataTableWrapper config={tableConfig} initialData={mockData} />
    </div>
  );
}
