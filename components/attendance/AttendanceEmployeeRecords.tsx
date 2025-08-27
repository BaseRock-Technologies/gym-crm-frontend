"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectApiData } from "@/types/form";

interface AttendanceEmployeeRecordsProps {
  apiConfig: SelectApiData;
}

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    {
      id: "employeeId",
      header: "Employee Id",
      accessorKey: "employeeId",
    },

    {
      id: "employeeName",
      header: "Employee Name",
      accessorKey: "employeeName",
    },

    {
      id: "employeeNumber",
      header: "Employee Number",
      accessorKey: "employeeNumber",
    },

    {
      id: "employeeEmail",
      header: "Employee Email",
      accessorKey: "employeeEmail",
    },

    {
      id: "employeeDesignation",
      header: "Employee Designation",
      accessorKey: "employeeDesignation",
    },

    {
      id: "employeeSalary",
      header: "Employee Salary",
      accessorKey: "employeeSalary",
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

const AttendanceEmployeeRecords: React.FC<AttendanceEmployeeRecordsProps> = ({
  apiConfig,
}) => {
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

export default AttendanceEmployeeRecords;
