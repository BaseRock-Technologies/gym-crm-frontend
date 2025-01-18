"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectApiData } from "@/types/form";

interface AttendanceEmployeeRecordsProps {
  title: string;
  apiConfig: SelectApiData;
}

const tableConfig: TableConfig = {
  columns: [
    { id: "no", header: "SNO", accessorKey: "no" },
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
    { id: "inTime", header: "In Time", accessorKey: "inTime" },
    { id: "outTime", header: "Out Time", accessorKey: "outTime" },
    { id: "date", header: "Date", accessorKey: "date" },
  ],
  filters: [
    {
      id: "date-range",
      label: "Pick a date",
      type: "date-range",
      dateRange: {
        from: new Date(),
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

const AttendanceEmployeeRecords: React.FC<AttendanceEmployeeRecordsProps> = ({
  title,
  apiConfig,
}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>
          {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default AttendanceEmployeeRecords;
