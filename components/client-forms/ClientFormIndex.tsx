"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download } from "lucide-react";
import { SelectApiData } from "@/types/form";

const tableConfig: TableConfig = {
  columns: [
    { id: "sno", header: "SNO", accessorKey: "sno" },
    { id: "date", header: "Date", accessorKey: "date" },
    {
      id: "name",
      header: "Customer Name",
      accessorKey: "name",
    },
    { id: "email", header: "Email", accessorKey: "email" },
    {
      id: "documentName",
      header: "Document Name",
      accessorKey: "documentName",
    },
  ],
  filters: [
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  actions: [],
  outOfActions: [
    {
      id: "viewDocument",
      label: "View",
      type: "link",
      href: "/client-forms",
    },
    {
      id: "downloadDocument",
      label: "Download",
      type: "button",
      icon: Download,
      onClick: (row) => console.log("Download Document", row),
      btnType: "btn",
    },
  ],
  searchableColumns: ["customerName"],
};

const ClientFormIndex = () => {
  const [selected, setSelected] = useState("physical-activity");
  const [apiConfig, setApiConfig] = useState<SelectApiData>({
    apiPath: "client-form/records",
    method: "POST",
    postData: {
      category: selected,
    },
  });

  const getTitle = (selected: string) => {
    switch (selected) {
      case "physical-activity":
        return "Physical Activity Readiness";
      case "personal-training":
        return "Personal Training";
      case "trial-waiver":
        return "Trial Waiver";
      default:
        return "Client Forms";
    }
  };

  const labelClassName =
    "rounded-md px-6 py-2 cursor-pointer transition-colors text-primary bg-white peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-white uppercase text-sm font-medium whitespace-nowrap";

  const handleValueChange = (value: string) => {
    setSelected(value);
    setApiConfig({
      apiPath: "client-form/records",
      method: "POST",
      postData: {
        category: value,
      },
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col space-y-2  sm:px-6 px-2 sm:py-8 py-3">
      <RadioGroup
        defaultValue={selected}
        onValueChange={handleValueChange}
        className="flex flex-row flex-wrap gap-4 py-4"
      >
        <div className="flex items-center">
          <RadioGroupItem
            value="physical-activity"
            id="physical-activity"
            className="peer sr-only"
          />
          <Label htmlFor="physical-activity" className={cn(labelClassName)}>
            Physical Activity Readiness
          </Label>
        </div>

        <div className="flex items-center">
          <RadioGroupItem
            value="personal-training"
            id="personal-training"
            className="peer sr-only"
          />
          <Label htmlFor="personal-training" className={cn(labelClassName)}>
            Personal Training
          </Label>
        </div>

        <div className="flex items-center">
          <RadioGroupItem
            value="trial-waiver"
            id="trial-waiver"
            className="peer sr-only"
          />
          <Label htmlFor="trial-waiver" className={cn(labelClassName)}>
            Trial Waiver
          </Label>
        </div>
      </RadioGroup>
      <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
        <CardHeader className="bg-primary text-white mb-5 shadow-sm">
          <CardTitle>{getTitle(selected)}</CardTitle>
        </CardHeader>
        <CardContent className="container">
          <DataTableWrapper
            config={tableConfig}
            apiConfig={apiConfig}
            key={selected}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientFormIndex;
