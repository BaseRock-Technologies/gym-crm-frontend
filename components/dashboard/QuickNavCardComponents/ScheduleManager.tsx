"use client";

import React from "react";
import { DynamicForm } from "@/components/dynamic-form";
import { FormConfig } from "@/types/form";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { StatusResponse } from "@/types/query";
import { DialogTitle } from "@/components/ui/dialog";

type ScheduleManagerMode = "create" | "edit";

interface ScheduleManagerProps {
  mode: ScheduleManagerMode;
  scheduleId?: string;
  initialData?: Record<string, any> | null;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  mode,
  scheduleId,
  initialData,
}) => {
  const [formConfig, setFormConfig] = React.useState<FormConfig | null>(null);

  const buildScheduleForm = (
    clients: Record<string, any[]> | undefined,
    trainers: Record<string, any[]> | undefined,
    defaults?: Partial<{
      trainerName: string;
      clientName: string;
      timeFrom: string;
      timeTo: string;
      scheduleDate: number;
    }>
  ): FormConfig => {
    const formConfig: FormConfig = {
      id: "daily-schedule",
      groups: [
        {
          id: "schedule-info",
          title: "Schedule",
          type: "card-form",
          fields: [
            "trainerName",
            "clientName",
            "timeFrom",
            "timeTo",
            "scheduleDate",
          ],
        },
      ],
      fields: [
        {
          name: "trainerName",
          label: "Trainer",
          options: [],
          type: "select",
          required: true,
          placeholder: "Select Trainer Name",
          defaultValue: defaults?.trainerName || "",
        },
        {
          name: "clientName",
          label: "Client",
          options: [],
          type: "select",
          required: true,
          placeholder: "Select Client Name",
          defaultValue: defaults?.clientName || "",
        },
        {
          name: "timeFrom",
          label: "Time From",
          type: "time-detailed",
          placeholder: "choose time from",
          editable: true,
          defaultValue: defaults?.timeFrom || "",
        },
        {
          name: "timeTo",
          label: "Time To",
          type: "time-detailed",
          placeholder: "choose time to",
          editable: true,
          defaultValue: defaults?.timeTo || "",
        },
        {
          name: "scheduleDate",
          label: "Date",
          type: "date",
          placeholder: "choose date",
          editable: true,
          defaultValue: defaults?.scheduleDate || Math.floor(Date.now() / 1000),
        },
      ],
    };
    if (clients)
      updateFormConfigOptions(formConfig, "clientName", clients, "clientName");
    if (trainers)
      updateFormConfigOptions(
        formConfig,
        "trainerName",
        trainers,
        "employeeName"
      );
    return formConfig;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const clientRes: StatusResponse = await post(
        {},
        "others/clients/list",
        "Failed to fetch clients"
      );
      const trainerRes: StatusResponse = await post(
        {},
        "others/employee/list",
        "Failed to fetch trainers"
      );

      const nextClients =
        clientRes.status === "success"
          ? (clientRes.data as Record<string, any[]>)
          : undefined;
      const nextTrainers =
        trainerRes.status === "success"
          ? (trainerRes.data as Record<string, any[]>)
          : undefined;

      const defaults = initialData
        ? {
            trainerName: initialData.trainerName,
            clientName: initialData.clientName,
            timeFrom: initialData.timeFrom,
            timeTo: initialData.timeTo,
            scheduleDate: initialData.scheduleDate,
          }
        : undefined;
      setFormConfig(buildScheduleForm(nextClients, nextTrainers, defaults));
    };
    fetchData();
  }, [initialData]);

  if (!formConfig) return null;

  const isEdit = mode === "edit";
  const apiPath =
    isEdit && scheduleId
      ? `schedules/update/${scheduleId}`
      : "schedules/create";
  const method = isEdit ? "PATCH" : "POST";

  return (
    <>
      <DynamicForm
        config={formConfig}
        submitBtnText={isEdit ? "Update Schedule" : "Add Schedule"}
        apiData={{ apiPath, method }}
        resetOnSubmit={true}
        shouldFlex={true}
        initialData={initialData || undefined}
      />
    </>
  );
};

export default ScheduleManager;
