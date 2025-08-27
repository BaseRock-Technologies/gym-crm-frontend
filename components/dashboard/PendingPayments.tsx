"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Eye, Edit } from "lucide-react";
import { ImageCell } from "../image-cell";

export default function PendingPayments() {
  const tableConfig: TableConfig = {
    columns: [
      {
        id: "createdAt",
        header: "Date",
        accessorKey: "createdAt",
        parseDateToStr: true,
      },
      { id: "clientName", header: "Name", accessorKey: "clientName" },
      { id: "contactNumber", header: "Number", accessorKey: "contactNumber" },
      {
        id: "clientPicture",
        header: "Photo",
        cell: (props) => <ImageCell {...props} />,
        accessorKey: "clientPicture",
      },
      {
        id: "balanceAmount",
        header: "Amount",
        accessorKey: "balanceAmount",
      },
      { id: "packageName", header: "For", accessorKey: "packageName" },
      {
        id: "clientRepresentative",
        header: "Rep.",
        accessorKey: "clientRepresentative",
      },
    ],
    actions: [
      {
        id: "view",
        label: "View/Update",
        onClick: (row) => {
          const billType = row.billType;
          const billId = row.billId;

          if (billType === "gym-membership") {
            window.open(`/gym-bill/${billId}`, "_blank");
          } else if (billType === "personal-training") {
            window.open(`personal-training-bill/${billId}`, "_blank");
          } else if (billType === "group-class") {
            window.open(`group-class-bill/${billId}`, "_blank");
          }
        },
      },
    ],
    filters: [
      {
        id: "billType",
        label: "Select Bill Type",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              { label: "All Bills", value: "all" },
              { label: "Gym Membership", value: "gym-membership" },
              { label: "Personal Training", value: "personal-training" },
              { label: "Group Classes", value: "group-class" },
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
    bulkActions: [],
    searchableColumns: ["clientName", "contactNumber", "packageName"],
  };

  const apiConfig: SelectApiData = {
    apiPath: "bills/records",
    method: "POST",
    postData: {
      type: "pending-payments",
    },
  };

  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Pending Payments</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
