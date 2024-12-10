"use client";

import { useState, useEffect } from "react";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { addDays } from "date-fns";
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
    { id: "date", header: "Date", accessorKey: "date" },
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "number", header: "Number", accessorKey: "number" },
    { id: "photo", header: "Photo", accessorKey: "photo" },
    { id: "for", header: "For", accessorKey: "for" },
    { id: "representative", header: "Rep.", accessorKey: "representative" },
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
      id: "clients",
      label: "Select Client",
      type: "select",
      options: [
        { label: "All Clients", value: "all" },
        { label: "Gym Membership", value: "gym-membership" },
        { label: "Personal Training", value: "personal-training" },
        { label: "Group Classes", value: "group-classes" },
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

export default function UpcomingRenewals() {
  return (
    <div className="container mx-auto py-5">
      <DataTableWrapper config={tableConfig} initialData={mockData} />
    </div>
  );
}
