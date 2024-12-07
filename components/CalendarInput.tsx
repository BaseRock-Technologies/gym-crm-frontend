"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface CalendarInputProps {
  className?: string;
  placeholder?: string;
  buttonClassName?: string;
  defaultToToday?: boolean;
  label?: string;
}

export interface CalendarInputRef {
  getValue: () => Date | undefined;
  setValue: (date: Date | undefined) => void;
}

const CalendarInput = forwardRef<CalendarInputRef, CalendarInputProps>(
  (
    {
      className,
      placeholder = "Pick a date",
      buttonClassName,
      defaultToToday = false,
      label,
    },
    ref
  ) => {
    const [date, setDate] = useState<Date | undefined>(
      defaultToToday ? new Date() : undefined
    );

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => date,
        setValue: (newDate) => setDate(newDate),
      }),
      [date]
    );

    const handleSelect = (newDate: Date | undefined) => {
      setDate(newDate);
    };

    return (
      <div className={cn("space-y-1", className)}>
        {label && (
          <label className="text-sm text-secondary font-semibold">
            {label}
          </label>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal hover:bg-background/60",
                !date && "text-muted-foreground",
                buttonClassName
              )}
            >
              {date ? format(date, "M/d/yyyy") : <span>{placeholder}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

CalendarInput.displayName = "CalendarInput";

export default CalendarInput;
