"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { SelectApiData } from "@/types/form";
import AttendanceClientRecords from "./AttendanceClientRecords";
import AttendanceEmployeeRecords from "./AttendanceEmployeeRecords";

const ClientFormIndex = () => {
  const [selected, setSelected] = useState("clients");

  const [apiConfig, setApiConfig] = useState<SelectApiData>({
    apiPath: "attendance/client/records",
    method: "POST",
    postData: {
      category: selected,
    },
  });

  const getApiPath = (selected: string) => {
    switch (selected) {
      case "clients":
        return "attendance/client/records";
      case "employees":
        return "attendance/employee/records";
      case "trainers":
        return "attendance/employee/records";
      default:
        return "attendance/client/records";
    }
  };

  const labelClassName =
    "rounded-md px-6 py-2 cursor-pointer transition-colors text-primary bg-white peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-white uppercase text-sm font-medium whitespace-nowrap";

  const handleValueChange = (value: string) => {
    setSelected(value);
    setApiConfig({
      apiPath: getApiPath(value),
      method: "POST",
      postData: {
        category: value,
      },
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col space-y-2 sm:px-6 px-2 sm:py-8 py-3">
      <RadioGroup
        defaultValue={selected}
        onValueChange={handleValueChange}
        className="flex md:flex-row flex-col gap-4 py-4"
      >
        <div className="flex items-center">
          <RadioGroupItem
            value="clients"
            id="clients"
            className="peer sr-only"
          />
          <Label htmlFor="clients" className={cn(labelClassName)}>
            Clients
          </Label>
        </div>

        <div className="flex items-center">
          <RadioGroupItem
            value="employees"
            id="employees"
            className="peer sr-only"
          />
          <Label htmlFor="employees" className={cn(labelClassName)}>
            Employees
          </Label>
        </div>

        <div className="flex items-center">
          <RadioGroupItem
            value="trainers"
            id="trainers"
            className="peer sr-only"
          />
          <Label htmlFor="trainers" className={cn(labelClassName)}>
            Trainers
          </Label>
        </div>
      </RadioGroup>

      {selected === "clients" && (
        <AttendanceClientRecords apiConfig={apiConfig} />
      )}
      {selected === "employees" && (
        <AttendanceEmployeeRecords apiConfig={apiConfig} />
      )}
      {selected === "trainers" && (
        <AttendanceEmployeeRecords apiConfig={apiConfig} />
      )}
    </div>
  );
};

export default ClientFormIndex;
