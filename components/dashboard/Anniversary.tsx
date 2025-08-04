"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";

const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "date", header: "Date of Anniversary", accessorKey: "date" },
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

export default function Anniversary() {
  // return <DataTableWrapper config={tableConfig} initialData={mockData} />;
  return <div>To be implemented</div>;
}
