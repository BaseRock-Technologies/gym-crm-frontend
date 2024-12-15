"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AttendanceRecordsProps {}

const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    { id: "no", header: "SNO", accessorKey: "no" },
    {
      id: "clientId",
      header: "Biometric / Client ID",
      accessorKey: "clientId",
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
      id: "role",
      label: "Select Role",
      type: "select",
      options: [
        { label: "Clients", value: "clients" },
        { label: "Employees", value: "employees" },
        { label: "Trainer", value: "trainer" },
        { label: "Unauthorized", value: "unauthorized" },
      ],
    },
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  searchableColumns: ["name"],
};

const AttendanceRecords: React.FC<AttendanceRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} initialData={mockData} />
      </CardContent>
    </Card>
  );
};

export default AttendanceRecords;
