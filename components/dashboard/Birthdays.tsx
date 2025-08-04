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
    { id: "dob", header: "Date of Birth", accessorKey: "dob" },
    { id: "age", header: "Age", accessorKey: "age" },
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
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  bulkActions: [
    // {
    //   id: "SMS",
    //   label: "Bulk SMS",
    //   icon: Send,
    //   btnVariant: "default",
    //   onClick: (value) => console.log("SMS", value),
    // },
  ],
  searchableColumns: ["name", "number"],
};

export default function Birthdays() {
  // return <DataTableWrapper config={tableConfig} initialData={mockData} />;
  return <div>To be implemented</div>;
}
