"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";
import React, { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectApiData, SelectOption } from "@/types/form";
import { FilterOptions } from "./types";

interface InquiryRecordsProps {
  setSelectedRow: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}

const InquiryRecords: React.FC<InquiryRecordsProps> = ({ setSelectedRow }) => {
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
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        startCase: true,
      },
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
              { label: "Hot", value: "hot" },
              { label: "Warm", value: "warm" },
              { label: "Cold", value: "cold" },
              { label: "Expected Amount", value: "expected-amount" },
              { label: "Successfull Followup", value: "successful-followup" },
            ],
          },
        ],
      },
      {
        id: "status",
        label: "Select Status",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              {
                label: "Pending",
                value: "pending",
              },
              {
                label: "Converted",
                value: "converted",
              },
              {
                label: "Closed",
                value: "closed",
              },
            ],
          },
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
  };

  const apiConfig: SelectApiData = {
    apiPath: "inquiry/records",
    method: "POST",
  };
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Inquiry Records</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper
          apiConfig={apiConfig}
          config={tableConfig}
          setSelectedRow={setSelectedRow}
        />
      </CardContent>
    </Card>
  );
};

export default InquiryRecords;
