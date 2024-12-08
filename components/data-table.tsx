import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TableFilters } from "./table-filters";
import { TableActions } from "./table-actions";
import { TableConfig, TableState } from "../types/table";
import { Spinner } from "@/components/ui/spinner";

interface DataTableProps {
  config: TableConfig;
  data: Record<string, any>[];
  total: number;
  tableState: TableState;
  onStateChange: (newState: Partial<TableState>) => void;
  isLoading?: boolean;
}

export function DataTable({
  config,
  data,
  total,
  tableState,
  onStateChange,
  isLoading,
}: DataTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSelectAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {};
    data.forEach((row) => {
      newSelected[row.id] = checked;
    });
    setSelected(newSelected);
  };

  const handleSelectRow = (rowId: string) => {
    setSelected((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleBulkAction = () => {
    const selectedRows = data.filter((row) => selected[row.id]);
    // Handle bulk actions
    console.log("Selected rows:", selectedRows);
  };

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}

      <div className="flex items-center py-4 px-4 gap-4">
        <Select
          value={tableState.pageSize.toString()}
          onValueChange={(value) => {
            onStateChange({
              pageSize: Number(value),
              page: 1,
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Show entries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Show 10 entries</SelectItem>
            <SelectItem value="25">Show 25 entries</SelectItem>
            <SelectItem value="50">Show 50 entries</SelectItem>
          </SelectContent>
        </Select>
        <TableFilters
          filters={config.filters || []}
          onFilterChange={(filterId, value) => {
            onStateChange({
              filters: { ...tableState.filters, [filterId]: value },
              page: 1,
            });
          }}
          onBulkAction={handleBulkAction}
          searchableColumns={config.searchableColumns}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    Object.values(selected).every(Boolean) && data.length > 0
                  }
                  onCheckedChange={(checked: boolean) =>
                    handleSelectAll(checked)
                  }
                />
              </TableHead>
              {config.columns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
              {config.actions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleSelectRow(row.id)}
                className="cursor-pointer"
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected[row.id] || false}
                    onCheckedChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                {config.columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.cell ? column.cell(row) : row[column.accessorKey]}
                  </TableCell>
                ))}
                {config.actions && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <TableActions actions={config.actions} row={row} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {(tableState.page - 1) * tableState.pageSize + 1} to{" "}
          {Math.min(tableState.page * tableState.pageSize, total)} of {total}{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="invert"
            size="sm"
            onClick={() => {
              onStateChange({
                page: tableState.page - 1,
              });
            }}
            disabled={tableState.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="invert"
            size="sm"
            onClick={() => {
              onStateChange({
                page: tableState.page + 1,
              });
            }}
            disabled={tableState.page * tableState.pageSize >= total}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
