"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FeedbackRecordsProps {}

const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    { id: "date", header: "Date", accessorKey: "date" },
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "number", header: "Contact Number", accessorKey: "number" },
    {
      id: "feedback",
      header: "Feedback / Suggestion",
      accessorKey: "feedback",
    },
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
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  searchableColumns: ["name"],
};

const FeedbackRecords: React.FC<FeedbackRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Customer Feedbacks</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} initialData={mockData} />
      </CardContent>
    </Card>
  );
};

export default FeedbackRecords;
