"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import { ImageCell } from "../image-cell";
import { AlertTriangle } from "lucide-react";

export default function InconsistentClients() {
  const tableConfig: TableConfig = {
    columns: [
      { id: "memberId", header: "Member ID", accessorKey: "memberId" },
      { id: "clientName", header: "Name", accessorKey: "clientName" },
      { id: "contactNumber", header: "Contact", accessorKey: "contactNumber" },
      { id: "packageName", header: "Package", accessorKey: "packageName" },
      {
        id: "attendanceDays",
        header: "Present Days",
        accessorKey: "attendanceDays",
      },
      {
        id: "absentDays",
        header: "Absent Days",
        accessorKey: "absentDays",
      },
      {
        id: "attendancePercentage",
        header: "Attendance %",
        accessorKey: "attendancePercentage",
      },
      {
        id: "lastAttendance",
        header: "Last Visit",
        accessorKey: "lastAttendance",
        parseTimeToStr: true,
      },
    ],
    actions: [
      {
        id: "contact",
        label: "Contact Client",
        icon: AlertTriangle,
        onClick: (row) => {
          // Implement contact functionality
          console.log("Contact client", row);
        },
      },
      {
        id: "view-profile",
        label: "View Profile",
        onClick: (row) => {
          window.open(`/profile/${row.memberId}`, "_blank");
        },
      },
    ],
    filters: [
      {
        id: "billType",
        label: "Select Membership",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              { label: "All Types", value: "all" },
              { label: "Gym Membership", value: "gym-membership" },
              { label: "Personal Training", value: "personal-training" },
              { label: "Group Classes", value: "group-class" },
            ],
          },
        ],
      },
      {
        id: "date-range",
        label: "Analysis Period",
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
    searchableColumns: ["clientName", "contactNumber"],
  };

  const apiConfig: SelectApiData = {
    apiPath: "attendance/inconsistent-clients",
    method: "POST",
    postData: {
      absentThreshold: 4,
    },
  };

  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Inconsistent Clients</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
