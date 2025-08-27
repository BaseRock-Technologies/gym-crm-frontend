"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import type { SelectApiData } from "@/types/form";
import { ButtonDialogTrigger } from "@/components/common/ButtonDialogTrigger";
import CreateFollowup from "@/components/dashboard/QuickNavCardComponents/CreateFollowup";
import { post } from "@/lib/helper/steroid";
import { StatusResponse } from "@/types/query";

const Communication = () => {
  const { memberId } = useParams<{ memberId: string }>();

  const tableConfig = React.useRef<TableConfig>({
    columns: [
      { id: "sno", header: "S.No", accessorKey: "sno" },
      {
        id: "followupDate",
        header: "Date",
        accessorKey: "followupDate",
        parseDateToStr: true,
      },
      { id: "createdBy", header: "Rep", accessorKey: "createdBy" },
      { id: "feedback", header: "Response", accessorKey: "feedback" },
      { id: "status", header: "Status", accessorKey: "status" },
      {
        id: "followup-done-at",
        header: "Followup done at",
        accessorKey: "updatedAt",
        cell: (row: any) => {
          if (row.status === "completed" && row.updatedAt) {
            return (
              <span>{new Date(row.updatedAt * 1000).toLocaleString()}</span>
            );
          }
          return <span>-</span>;
        },
      },
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
    ],
    searchableColumns: [],
    showSelector: false,
    actions: undefined,
    bulkActions: [],
    components: [
      <ButtonDialogTrigger
        title="Create Followup"
        key="create-followup"
        dialogContent={<CreateFollowup />}
      />,
    ],
  });

  const apiConfig: SelectApiData = {
    apiPath: "followup/records",
    method: "POST",
    postData: {
      filters: {
        memberId: Number(memberId),
      },
    },
  };

  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Communication</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig.current} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default Communication;
