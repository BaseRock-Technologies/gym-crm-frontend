"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";
import React, { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface InquiryRecordsProps {
  setSelectedRow: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}

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
      id: "attendedBy",
      label: "Select AttendedBy",
      type: "select",
      options: [{ label: "Admin", value: "admin" }],
    },
    {
      id: "convertibility",
      label: "Select Convertibility",
      type: "select",
      options: [
        { label: "Hot", value: "hot" },
        { label: "Warm", value: "warm" },
        { label: "Cold", value: "cold" },
        { label: "Expected Amount", value: "expected-amount" },
        { label: "Successfull Followup", value: "successfull-followup" },
      ],
    },
    {
      id: "status",
      label: "Select Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Close", value: "close" },
        { label: "Converted", value: "converted" },
      ],
    },
    {
      id: "search",
      label: "Search",
      type: "search",
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
  searchableColumns: ["name", "number"],

  bulkActions: [
    {
      id: "SMS",
      label: "Bulk SMS",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("SMS", value),
    },
    {
      id: "whatsapp",
      label: "Bulk Whatsapp",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("Whatsapp", value),
    },
    {
      id: "transfer-inquiry",
      label: "Transfer Inquiry",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("Transfer Inquiry", value),
    },
  ],
};

const InquiryRecords: React.FC<InquiryRecordsProps> = ({ setSelectedRow }) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Inquiry Records</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper
          config={tableConfig}
          initialData={mockData}
          setSelectedRow={setSelectedRow}
        />
      </CardContent>
    </Card>
  );
};

export default InquiryRecords;
