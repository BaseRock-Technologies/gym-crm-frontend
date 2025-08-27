"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import type { SelectApiData } from "@/types/form";
import { updateFilterOptions } from "@/lib/helper/steroid";
import { post } from "@/lib/helper/steroid";
import type { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";

const BillingAndPayment = () => {
  const { memberId } = useParams<{ memberId: string }>();

  const tableConfigRef = useRef<TableConfig>({
    columns: [
      {
        id: "createdAt",
        header: "Date",
        accessorKey: "createdAt",
        parseDateToStr: true,
      },
      { id: "billId", header: "Invoice No", accessorKey: "billId" },
      {
        id: "packageName",
        header: "Item",
        accessorKey: "packageName",
      },
      {
        id: "duration",
        header: "Duration",
        accessorKey: "duration",
        cell: (row: any) => (
          <span>
            {row.joiningDate ? formatTimestamp(row.joiningDate) : "-"} to{" "}
            {row.endDate ? formatTimestamp(row.endDate) : "-"}
          </span>
        ),
      },
      {
        id: "amountPayable",
        header: "Net payable",
        accessorKey: "amountPayable",
      },
      { id: "amountPaid", header: "Amount paid", accessorKey: "amountPaid" },
      { id: "balanceAmount", header: "Pending", accessorKey: "balanceAmount" },
      { id: "paymentMode", header: "Payment type", accessorKey: "paymentMode" },
    ],
    filters: [
      {
        id: "packageName",
        label: "Select item",
        type: "select",
        options: [
          {
            group: "default",
            options: [{ label: "All", value: "all" }],
          },
        ],
      },
      {
        id: "search",
        label: "Search",
        type: "search",
      },
    ],
    searchableColumns: ["packageName", "billId", "paymentMode"],
    actions: [
      {
        id: "view",
        label: "View Bill",
        onClick: (row) => {
          const billType = row.billType;
          const billId = row.billId;
          if (billType === "gym-membership") {
            window.open(`/gym-bill/${billId}`, "_blank");
          } else if (billType === "personal-training") {
            window.open(`/personal-training-bill/${billId}`, "_blank");
          } else if (billType === "group-class") {
            window.open(`/group-class-bill/${billId}`, "_blank");
          }
        },
      },
    ],
    bulkActions: [
      {
        id: "export-excel",
        label: "EXCEL",
        btnVariant: "default",
        onClick: () => {},
      },
      {
        id: "export-pdf",
        label: "PDF",
        btnVariant: "default",
        onClick: () => {},
      },
      {
        id: "print",
        label: "PRINT",
        btnVariant: "default",
        onClick: () => {},
      },
    ],
  });

  // Load package options for the filter
  useEffect(() => {
    const fetchPackageOptions = async () => {
      const res: StatusResponse = await post({}, "package/options");
      if (res.status === "success" && res.data) {
        const { packageDetails } = res.data;
        updateFilterOptions(
          tableConfigRef.current,
          "packageName",
          packageDetails,
          "package"
        );
      }
    };
    fetchPackageOptions();
  }, []);

  const apiConfig: SelectApiData = useMemo(
    () => ({
      apiPath: "bills/records",
      method: "POST",
      postData: {
        // include member, and default package filter as 'all' so backend will skip it
        filters: { memberId: Number(memberId), packageName: "all" },
      },
    }),
    [memberId]
  );

  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Billing history</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper
          config={tableConfigRef.current}
          apiConfig={apiConfig}
        />
      </CardContent>
    </Card>
  );
};

export default BillingAndPayment;
