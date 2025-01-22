"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectApiData } from "@/types/form";

interface FeedbackRecordsProps {}

const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    { id: "date", header: "Date", accessorKey: "date" },
    { id: "name", header: "Name", accessorKey: "name" },
    {
      id: "contactNumber",
      header: "Contact Number",
      accessorKey: "contactNumber",
    },
    {
      id: "feedback",
      header: "Feedback / Suggestion",
      accessorKey: "feedback",
    },
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

const apiConfig: SelectApiData = {
  apiPath: "feedback/records",
  method: "POST",
};

const FeedbackRecords: React.FC<FeedbackRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Customer Feedbacks</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default FeedbackRecords;
