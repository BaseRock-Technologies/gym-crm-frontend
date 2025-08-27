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
import { cn } from "@/lib/utils";
import React from "react";

interface TableFiltersProps {
  filters: FilterConfig[];
  ctaActions: BulkActionConfig[];
  onFilterChange: (filterId: string, value: any) => void;
  onBulkAction: (type: BulkActions) => void;
  searchableColumns?: string[];
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  components: React.JSX.Element[];
}

export function TableFilters({
  filters,
  ctaActions,
  onFilterChange,
  onBulkAction,
  searchableColumns = [],
  pageSize,
  onPageSizeChange,
  components,
}: TableFiltersProps) {
  const hasSearchFilter = filters.find((filter) => filter.type === "search");
  return (
    <div
      className={cn(
        "relative w-full flex gap-4 flex-col"
        // filters.length > 2
        //   ? "flex-col"
        //   : "min-[440px]:flex-row flex-col min-[440px]:justify-between justify-start min-[440px]:items-center items-start"
      )}
    >
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
            <SelectItem value="25">Show 25 entries</SelectItem>
            <SelectItem value="50">Show 50 entries</SelectItem>
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
                  <SelectContent className="sm:max-h-72 max-h-60 overflow-auto">
                    {filter.options?.map((group) => (
                      <React.Fragment key={group.group}>
                        {filter.options && filter.options.length > 1 && (
                          <div className="text-xs my-2 pl-1 text-gray-500">
                            {group.group}
                          </div>
                        )}
                        {group.options.map((option, index) => (
                          <SelectItem
                            key={option.value + index}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </React.Fragment>
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
        {components.map((component) => component)}
      </div>
      <div className="relative flex flex-wrap justify-start items-center gap-4 max-[440px]:w-full w-full">
        {hasSearchFilter && (
          <div className="flex-grow">
            <AnimatedSearchInput
              key={hasSearchFilter.id}
              searchableColumns={searchableColumns}
              onSearch={(value) => onFilterChange(hasSearchFilter.id, value)}
            />
          </div>
        )}
        {ctaActions && ctaActions.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
