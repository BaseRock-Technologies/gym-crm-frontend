"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectApiData } from "@/types/form";
import { useId } from "react";

interface AttendanceClientRecordsProps {
  apiConfig: SelectApiData;
}

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    {
      id: "biometricId",
      header: "Biometric / Client ID",
      accessorKey: "biometricId",
    },
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "memberId", header: "Member ID", accessorKey: "memberId" },
    {
      id: "contactNumber",
      header: "Contact Number",
      accessorKey: "contactNumber",
    },
    {
      id: "inTime",
      header: "In Time",
      accessorKey: "inTime",
      parseTimeToStr: true,
    },
    {
      id: "outTime",
      header: "Out Time",
      accessorKey: "outTime",
      parseTimeToStr: true,
    },
    { id: "date", header: "Date", accessorKey: "date", parseDateToStr: true },
  ],
  filters: [
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
  searchableColumns: ["name"],
};

const AttendanceClientRecords: React.FC<AttendanceClientRecordsProps> = ({
  apiConfig,
}) => {
  const id = useId();
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default AttendanceClientRecords;
