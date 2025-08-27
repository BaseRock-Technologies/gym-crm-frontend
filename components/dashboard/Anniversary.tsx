"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";

export default function Anniversary() {
  const tableConfig: TableConfig = {
    columns: [
      { id: "memberId", header: "Member ID", accessorKey: "memberId" },
      { id: "name", header: "Name", accessorKey: "name" },
      {
        id: "date",
        header: "Anniversary Date",
        accessorKey: "date",
        parseTimeToStr: true,
      },
      { id: "years", header: "Years", accessorKey: "years" },
      { id: "gender", header: "Gender", accessorKey: "gender" },
      { id: "contactNumber", header: "Contact", accessorKey: "contactNumber" },
    ],
    actions: [
      {
        id: "sms",
        label: "Send Anniversary Wishes",
        icon: MessageCircle,
        onClick: (row) => {
          // Implement SMS functionality
          console.log("Send anniversary wishes to", row);
        },
      },
      {
        id: "call",
        label: "Call Client",
        onClick: (row) => {
          window.open(`tel:${row.contactNumber}`);
        },
      },
    ],
    filters: [
      {
        id: "gender",
        label: "Select Gender",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              { label: "All", value: "all" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
        ],
      },
      {
        id: "search",
        label: "Search",
        type: "search",
      },
    ],
    bulkActions: [],
    searchableColumns: ["name", "contactNumber"],
  };

  const apiConfig: SelectApiData = {
    apiPath: "others/clients/anniversaries",
    method: "POST",
  };

  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Client Anniversary</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
