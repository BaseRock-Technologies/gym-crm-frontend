import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerDetailedProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TimePickerDetailed({
  value,
  onChange,
  error,
}: TimePickerDetailedProps) {
  const [open, setOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM");
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // Creates [0, 5, 10, ..., 55]

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleMinuteSelect = (minute: number) => {
    if (selectedHour !== null) {
      const formattedHour = selectedHour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
      onChange(formattedTime);
      setOpen(false);
      setSelectedHour(null);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Select time"
            className={cn(error && "border-red-500")}
          />
          <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]" align="start">
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
          {selectedHour === null ? (
            <div className="grid grid-cols-4 gap-2 p-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant="ghost"
                  className="h-8"
                  onClick={() => handleHourSelect(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <div className="mb-2 text-center text-sm text-muted-foreground">
                Select minutes for {selectedHour}:00 {period}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant="ghost"
                    className="h-8"
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    {selectedHour}:{minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
