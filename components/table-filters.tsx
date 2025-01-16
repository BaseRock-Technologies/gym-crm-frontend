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
  pageSize: number;
  onPageSizeChange: (value: number) => void;
}

export function TableFilters({
  filters,
  ctaActions,
  onFilterChange,
  onBulkAction,
  searchableColumns = [],
  pageSize,
  onPageSizeChange,
}: TableFiltersProps) {
  const hasSearchFilter = filters.find((filter) => filter.type === "search");
  return (
    <div className="relative w-full flex flex-col gap-4">
      <div className="relative w-full flex flex-wrap justify-start items-center gap-4 ">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-full sm:min-w-[200px] sm:max-w-[200px]">
            <SelectValue placeholder="Show entries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Show 10 entries</SelectItem>
            <SelectItem value="20">Show 20 entries</SelectItem>
            <SelectItem value="40">Show 40 entries</SelectItem>
            <SelectItem value="100">Show 100 entries</SelectItem>
          </SelectContent>
        </Select>
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
      </div>
      <div className="relative flex flex-wrap justify-between items-center gap-4">
        {hasSearchFilter && (
          <AnimatedSearchInput
            key={hasSearchFilter.id}
            searchableColumns={searchableColumns}
            onSearch={(value) => onFilterChange(hasSearchFilter.id, value)}
          />
        )}
        <div className="relative flex flex-wrap sm:gap-4 gap-2 justify-center items-center ml-auto">
          {ctaActions.map((btn: BulkActionConfig) => (
            <Button
              key={btn.id}
              variant={btn.btnVariant}
              className="ml-auto"
              onClick={() => onBulkAction(btn.id)}
            >
              {btn.icon && <btn.icon className="text-white" />}
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
