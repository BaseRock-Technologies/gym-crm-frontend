"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Edit2Icon, Trash2 } from "lucide-react";

interface ManageProductRecordsProps {}

const tableConfig: TableConfig = {
  columns: [
    {
      id: "productName",
      header: "Product Name",
      accessorKey: "productName",
    },
  ],
  outOfActions: [
    {
      id: "editProduct",
      label: "Edit",
      type: "button",
      icon: Edit2Icon,
      onClick: (row) => console.log("Edit product", row),
      customClass: "bg-primary",
      btnType: "icon-btn",
      showLabel: true,
    },
    {
      id: "deleteProduct",
      label: "Delete",
      type: "button",
      icon: Trash2,
      onClick: (row) => console.log("Delete product", row),
      customClass: "bg-red-500",
      btnType: "icon-btn",
      showLabel: true,
    },
  ],
  filters: [],
};

const apiConfig: SelectApiData = {
  apiPath: "product/records",
  method: "POST",
};

const ManageProductRecords: React.FC<ManageProductRecordsProps> = ({}) => {
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Manage Product(s)</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default ManageProductRecords;
