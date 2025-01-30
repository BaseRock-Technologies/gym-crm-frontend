"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface OutOfStockRecordsProps {}

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    {
      id: "productName",
      header: "Product Name",
      accessorKey: "productName",
    },
  ],
  outOfActions: [
    {
      id: "viewHistory",
      label: "View History",
      type: "button",
      icon: Clock,
      onClick: (row) => console.log("view History", row),
      customClass: "bg-primary",
      btnType: "icon-btn",
      showLabel: true,
    },
  ],
  filters: [],
};

const apiConfig: SelectApiData = {
  apiPath: "product/records",
  method: "POST",
  postData: {
    category: "out-of-stock",
  },
};

const OutOfStockRecords: React.FC<OutOfStockRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Out Of Stock</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default OutOfStockRecords;
