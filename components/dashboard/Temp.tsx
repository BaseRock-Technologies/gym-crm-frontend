"use client";

import { useState, useEffect } from "react";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";

// Example data and table configuration (unchanged)
const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  type: "Regular",
  contact: `+1234567${i.toString().padStart(4, "0")}`,
  followupDate: "2024-12-08",
  representative: "Admin",
  status: "Active",
}));

const tableConfig: TableConfig = {
  columns: [
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "type", header: "Type", accessorKey: "type" },
    { id: "contact", header: "Contact", accessorKey: "contact" },
    {
      id: "followupDate",
      header: "Followup date",
      accessorKey: "followupDate",
    },
    { id: "representative", header: "Rep.", accessorKey: "representative" },
    { id: "status", header: "Status", accessorKey: "status" },
  ],
  actions: [
    {
      id: "view",
      label: "View bill",
      onClick: (row) => console.log("View bill", row),
    },
    {
      id: "renew",
      label: "Renew bill",
      onClick: (row) => console.log("Renew bill", row),
    },
    {
      id: "freeze",
      label: "Freeze membership",
      onClick: (row) => console.log("Freeze membership", row),
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
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  searchableColumns: ["name", "contact", "representative"], // Specify which columns are searchable
};

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <DataTableWrapper config={tableConfig} initialData={mockData} />
    </div>
  );
}
