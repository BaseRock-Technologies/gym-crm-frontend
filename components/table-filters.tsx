import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterConfig } from "../types/table";
import { AnimatedSearchInput } from "@/components/common/animatedSearchInput";
import { DatePickerWithRange } from "./ui/date-range-picker";

interface TableFiltersProps {
  filters: FilterConfig[];
  onFilterChange: (filterId: string, value: any) => void;
  onBulkAction: () => void;
  searchableColumns?: string[];
}

export function TableFilters({
  filters,
  onFilterChange,
  onBulkAction,
  searchableColumns = [],
}: TableFiltersProps) {
  return (
    <div className="relative w-full flex justify-center items-center gap-4 ">
      {filters.map((filter) => {
        switch (filter.type) {
          case "select":
            return (
              <Select
                key={filter.id}
                onValueChange={(value) => onFilterChange(filter.id, value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          case "search":
            return (
              <AnimatedSearchInput
                key={filter.id}
                searchableColumns={searchableColumns}
                onSearch={(value) => onFilterChange(filter.id, value)}
              />
            );
          case "date-range":
            return (
              <DatePickerWithRange
                key={filter.id}
                onValueChange={(value) => onFilterChange(filter.id, value)}
              />
            );
          default:
            return null;
        }
      })}
      <Button
        variant="default"
        className="ml-auto bg-green-600 hover:bg-green-700"
        onClick={onBulkAction}
      >
        BULK SMS
      </Button>
    </div>
  );
}
