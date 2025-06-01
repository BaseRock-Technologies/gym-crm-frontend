"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PurchaseRecordsProps {}

const tableConfig: TableConfig = {
  columns: [
    {
      id: "invoiceByVendor",
      header: "Invoice",
      accessorKey: "invoiceByVendor",
    },
    {
      id: "purchaseDate",
      header: "Date of Purchase",
      accessorKey: "purchaseDate",
    },
    {
      id: "vendorName",
      header: "Vendor",
      accessorKey: "vendorName",
    },
    {
      id: "totalCharges",
      header: "Total",
      accessorKey: "totalCharges",
    },
    {
      id: "paymentMode",
      header: "Payment Mode",
      accessorKey: "paymentMode",
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
  searchableColumns: ["vendorName", "invoiceByVendor"],
};

const apiConfig: SelectApiData = {
  apiPath: "pos/purchase/records",
  method: "POST",
};

const PurchaseRecords: React.FC<PurchaseRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default PurchaseRecords;
