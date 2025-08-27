"use client";

import { useParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import type { SelectApiData } from "@/types/form";
import { formatTimestamp, formatTime } from "@/utils/date-utils";

const Attendance = () => {
  const { memberId } = useParams<{ memberId: string }>();

  const tableConfigRef = useRef<TableConfig>({
    columns: [
      { id: "sno", header: "S.No", accessorKey: "sno" },
      { id: "date", header: "Date", accessorKey: "date", parseDateToStr: true },
      {
        id: "time",
        header: "Time",
        accessorKey: "time",
        cell: (row: any) => {
          let content = "-";
          if (row.inTime && row.outTime) {
            content = `${formatTime(row.inTime)} - ${formatTime(row.outTime)}`;
          } else if (row.inTime) {
            content = formatTime(row.inTime);
          } else if (row.outTime) {
            content = formatTime(row.outTime);
          }
          return <span>{content}</span>;
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
  });

  const apiConfig: SelectApiData = useMemo(
    () => ({
      apiPath: "attendance/client/records",
      method: "POST",
      postData: {
        category: "clients",
        filters: { memberId: Number(memberId) },
      },
    }),
    [memberId]
  );

  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Attendance</CardTitle>
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

export default Attendance;
