"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { Eye, Edit } from "lucide-react";
import { ImageCell } from "../image-cell";

export default function UpcomingRenewals() {
  const tableConfig: TableConfig = {
    columns: [
      {
        id: "endDate",
        header: "Date",
        accessorKey: "endDate",
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
          from: new Date(),
          to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // End of next month
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
      type: "upcoming-renewals",
    },
  };

  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Upcoming Renewals</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
