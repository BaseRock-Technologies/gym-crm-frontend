"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download } from "lucide-react";

const tableConfig: TableConfig = {
  columns: [
    { id: "date", header: "Date", accessorKey: "date" },
    {
      id: "customerName",
      header: "Customer Name",
      accessorKey: "customerName",
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
  const [selected, setSelected] = useState("personal-training");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10`
        );
        const data = await response.json();

        const transformedData = data.map((item: any, index: any) => ({
          id: `${selected} ${index}`,
          date: "12-12-2024",
          customerName: `Customer ${item.id}`,
          email: `customer${item.id}@example.com`,
          documentName: `Document ${item.id}`,
        }));
        setTableData(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selected]);

  const labelClassName =
    "rounded-md px-6 py-2 cursor-pointer transition-colors text-primary bg-white peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-white uppercase text-sm font-medium whitespace-nowrap";

  return (
    <div className="relative w-full h-full flex flex-col space-y-2 px-6 py-8">
      <RadioGroup
        defaultValue={selected}
        onValueChange={setSelected}
        className="flex gap-4 py-4"
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
          {!isLoading && (
            <DataTableWrapper config={tableConfig} initialData={tableData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientFormIndex;
