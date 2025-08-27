"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { ButtonDialogTrigger } from "@/components/common/ButtonDialogTrigger";
import ScheduleManager from "@/components/dashboard/QuickNavCardComponents/ScheduleManager";
import { FormConfig } from "@/types/form";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";

import { showToast } from "@/lib/helper/toast";

export default function DailySchedule() {
  const [clients, setClients] = useState<Record<string, any[]>>();
  const [trainers, setTrainers] = useState<Record<string, any[]>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientRes = await post(
          {},
          "others/clients/list",
          "Failed to fetch clients"
        );
        if (clientRes.status === "success" && clientRes.data) {
          setClients(clientRes.data);
        }

        const trainerRes = await post(
          {},
          "others/employee/list",
          "Failed to fetch trainers"
        );
        if (trainerRes.status === "success" && trainerRes.data) {
          setTrainers(trainerRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const tableConfig: TableConfig = useMemo(
    () => ({
      columns: [
        { id: "sno", header: "SNO", accessorKey: "sno" },
        { id: "trainerName", header: "Trainer", accessorKey: "trainerName" },
        { id: "clientName", header: "Client", accessorKey: "clientName" },
        { id: "timeFrom", header: "From", accessorKey: "timeFrom" },
        { id: "timeTo", header: "To", accessorKey: "timeTo" },
        {
          id: "scheduleDate",
          header: "Date",
          accessorKey: "scheduleDate",
          parseDateToStr: true,
        },
      ],
      actions: [
        {
          id: "edit",
          label: "Edit",
          dialogTrigger: true,
          dialogTitle: "Edit Schedule",
          dialogContent: (row) => {
            return (
              <ScheduleManager
                mode="edit"
                scheduleId={row.id}
                initialData={{
                  trainerName: row.trainerName,
                  clientName: row.clientName,
                  timeFrom: row.timeFrom,
                  timeTo: row.timeTo,
                  scheduleDate: row.scheduleDate,
                }}
              />
            );
          },
        },
        {
          id: "delete",
          label: "Delete",
          alertTrigger: true,
          alertTitle: "Delete Schedule",
          alertDescription: "Are you sure you want to delete this schedule?",
          alertAction: "Delete",
          onClick: async (row) => {
            try {
              const res = await post(
                {},
                `schedules/delete/${row.id}`,
                "Failed to delete schedule"
              );
              if (res.status === "success") {
                showToast("success", "Schedule deleted successfully");
              } else {
                showToast("error", "Failed to delete schedule");
              }
            } catch {
              showToast("error", "Failed to delete schedule");
            }
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
      components: [
        <ButtonDialogTrigger
          title="Add Schedule"
          key="add-schedule"
          dialogContent={<ScheduleManager mode="create" />}
        />,
      ],
      showSelector: false,
    }),
    [clients, trainers]
  );

  const apiConfig = { apiPath: "schedules/records", method: "POST" } as const;

  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Daily Schedule</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
