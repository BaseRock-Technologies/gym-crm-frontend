"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface InStockRecordsProps {}

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    {
      id: "productName",
      header: "Product",
      accessorKey: "productName",
    },
    {
      id: "itemInStock",
      header: "Item In Stock",
      accessorKey: "itemInStock",
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
  searchableColumns: ["productName"],
};

const apiConfig: SelectApiData = {
  apiPath: "product/records",
  method: "POST",
  postData: {
    category: "in-stock",
  },
};

const InStockRecords: React.FC<InStockRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Current Stock</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default InStockRecords;
