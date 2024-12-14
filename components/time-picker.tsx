import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TimePicker({ value, onChange, error }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleTimeSelect = (hour: number) => {
    const formattedHour = `${hour}:00 ${period}`;
    onChange(formattedHour);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Select time"
            errorMessage={error}
          />
          <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <div className="flex flex-col">
          <div className="flex justify-center p-2 border-b">
            <Button
              variant={period === "AM" ? "default" : "ghost"}
              className="w-full"
              onClick={() => setPeriod("AM")}
            >
              AM
            </Button>
            <Button
              variant={period === "PM" ? "default" : "ghost"}
              className="w-full"
              onClick={() => setPeriod("PM")}
            >
              PM
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 p-2">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant="ghost"
                className="h-8"
                onClick={() => handleTimeSelect(hour)}
              >
                {hour}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
