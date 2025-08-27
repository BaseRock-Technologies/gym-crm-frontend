"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Send } from "lucide-react";

export default function PendingInquiries() {
  const tableConfig: TableConfig = {
    columns: [
      { id: "sno", header: "SNO", accessorKey: "sno" },
      { id: "name", header: "Name", accessorKey: "name" },
      { id: "contactNumber", header: "Number", accessorKey: "contactNumber" },
      { id: "inquiryFor", header: "For", accessorKey: "inquiryFor" },
      {
        id: "followupDate",
        header: "Next Follow-up",
        accessorKey: "followupDate",
        parseDateToStr: true,
      },
      { id: "attendedBy", header: "Rep.", accessorKey: "attendedBy" },
      { id: "status", header: "Status", accessorKey: "status" },
    ],
    actions: [
      {
        id: "delete",
        label: "Delete",
        onClick: (row) => console.log("Delete", row),
      },
    ],
    filters: [
      {
        id: "attendedBy",
        label: "Select AttendedBy",
        type: "select",
        options: [
          {
            group: "default",
            options: [{ label: "Admin", value: "Admin" }],
          },
        ],
      },
      {
        id: "convertibility",
        label: "Select Convertibility",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              { label: "Hot", value: "Hot" },
              { label: "Warm", value: "Warm" },
              { label: "Cold", value: "Cold" },
              { label: "Expected Amount", value: "Expected Amount" },
              { label: "Successfull Followup", value: "Successfull Followup" },
            ],
          },
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
    searchableColumns: ["name", "contactNumber"],
    bulkActions: [
      // {
      //   id: "SMS",
      //   label: "Bulk SMS",
      //   icon: Send,
      //   btnVariant: "default",
      //   onClick: (value) => console.log("SMS", value),
      // },
      // {
      //   id: "whatsapp",
      //   label: "Bulk Whatsapp",
      //   icon: Send,
      //   btnVariant: "default",
      //   onClick: (value) => console.log("Whatsapp", value),
      // },
      // {
      //   id: "transfer-inquiry",
      //   label: "Transfer Inquiry",
      //   icon: Send,
      //   btnVariant: "default",
      //   onClick: (value) => console.log("Transfer Inquiry", value),
      // },
    ],
    showSelector: false,
  };
  const apiConfig: SelectApiData = {
    apiPath: "inquiry/records",
    method: "POST",
    postData: {
      filters: { status: "pending" },
    },
  };
  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Pending Inquiries</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
