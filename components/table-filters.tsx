import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BulkActionConfig, BulkActions, FilterConfig } from "../types/table";
import { AnimatedSearchInput } from "@/components/common/animatedSearchInput";
import { DatePickerWithRange } from "./ui/date-range-picker";

interface TableFiltersProps {
  filters: FilterConfig[];
  ctaActions: BulkActionConfig[];
  onFilterChange: (filterId: string, value: any) => void;
  onBulkAction: (type: BulkActions) => void;
  searchableColumns?: string[];
}

export function TableFilters({
  filters,
  ctaActions,
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
                <SelectTrigger className="w-full sm:min-w-[200px] sm:max-w-[200px]">
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
      <div className="relative flex gap-4 justify-center items-center ml-auto">
        {ctaActions.map((btn: BulkActionConfig) => (
          <Button
            key={btn.id}
            variant={btn.btnVariant}
            className="ml-auto"
            onClick={() => onBulkAction(btn.id)}
          >
            {btn.icon && <btn.icon className="w-6 h-6 text-white" />}
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
