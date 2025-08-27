import { type SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TableFilters } from "./table-filters";
import { TableActions } from "./table-actions";
import type { BulkActions, TableConfig, TableState } from "../types/table";
import { Spinner } from "@/components/ui/spinner";
import { TableOutOfActions } from "./table-out-actions";
import { formatTimestamp, formatTime } from "@/utils/date-utils";
import { startCase } from "lodash";

interface DataTableProps {
  config: TableConfig;
  data: Record<string, any>[];
  total: number;
  tableState: TableState;
  onStateChange: (newState: Partial<TableState>) => void;
  isLoading?: boolean;
  setSelectedRow?: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function DataTable({
  config,
  data,
  total,
  tableState,
  onStateChange,
  isLoading,
  setSelectedRow,
}: DataTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSelectAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {};
    data.forEach((row) => {
      newSelected[row.id] = checked;
    });
    setSelected(newSelected);
    setSelectedRow?.(newSelected);
  };

  const handleSelectRow = (rowId: string) => {
    setSelected((prev) => {
      const updated = {
        ...prev,
        [rowId]: !prev[rowId],
      };
      setSelectedRow?.(updated);
      return updated;
    });
  };

  const handleBulkAction = (type: BulkActions) => {
    const selectedRows = data.filter((row) => selected[row.id]);

    const rowsToExport = selectedRows.length > 0 ? selectedRows : data;

    const exportToCSV = (filename: string) => {
      if (!rowsToExport || rowsToExport.length === 0) return;
      const headers = config.columns.map((c) => c.header);
      const keys = config.columns.map((c) => c.accessorKey);
      const csv = [headers.join(",")]
        .concat(
          rowsToExport.map((r) =>
            keys.map((k) => JSON.stringify((r as any)[k] ?? "")).join(",")
          )
        )
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    };

    switch (type) {
      case "export-excel":
        exportToCSV("table-export.csv");
        break;
      case "export-pdf":
        window.print();
        break;
      case "print":
        window.print();
        break;
      case "SMS":
        console.log("sms");
        break;
      case "email":
        console.log("email");
      case "whatsapp":
        console.log("whatsapp");
        break;
      case "transfer-inquiry":
        console.log("transfer-inquiry");
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    onStateChange({
      filters: {},
      page: 1,
    });
  };

  const renderCellContent = (column: any, row: any) => {
    const cellValue = row[column.accessorKey];

    // If custom cell renderer is provided, use it
    if (column.cell) {
      return column.cell(row);
    }

    // If no value, return default
    if (!cellValue) {
      return "-";
    }

    // Apply formatting based on column configuration
    if (column.parseDateToStr) {
      return formatTimestamp(cellValue);
    }

    if (column.startCase) {
      return startCase(cellValue);
    }

    if (column.parseTimeToStr) {
      return formatTime(cellValue);
    }

    // Return raw value
    return cellValue;
  };

  return (
    <div className="w-full relative space-y-6">
      <TableFilters
        filters={config.filters || []}
        ctaActions={config.bulkActions || []}
        onFilterChange={(filterId, value) => {
          onStateChange({
            filters: { ...tableState.filters, [filterId]: value },
            page: 1,
          });
        }}
        components={config.components || []}
        onBulkAction={handleBulkAction}
        searchableColumns={config.searchableColumns}
        pageSize={tableState.pageSize}
        onPageSizeChange={(value) =>
          onStateChange({ pageSize: Number(value), page: 1 })
        }
      />

      <div className="rounded-md border border-primary bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {config.showSelector && (
                <TableHead
                  className="w-[50px] border-r border-black/70"
                  key="checkbox-header"
                >
                  <Checkbox
                    onCheckedChange={(checked: boolean) =>
                      handleSelectAll(checked)
                    }
                  />
                </TableHead>
              )}
              {config.columns.map((column, index) => (
                <TableHead
                  className={`truncate ${
                    index < config.columns.length - 1
                      ? "border-r border-black/70"
                      : ""
                  }`}
                  key={column.id}
                >
                  {column.header}
                </TableHead>
              ))}
              {config.actions && (
                <TableHead
                  key="actions-header"
                  className="border-l border-black/70"
                >
                  Action
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              <>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <TableRow
                      key={`row-${index}`}
                      onClick={() => handleSelectRow(row.id)}
                      className={`cursor-pointer ${
                        index % 2 === 1 ? "bg-gray-50" : ""
                      }`}
                    >
                      {config.showSelector && (
                        <TableCell
                          className="border-r border-black/70"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selected[row.id] || false}
                            onCheckedChange={() => handleSelectRow(row.id)}
                          />
                        </TableCell>
                      )}
                      {config.columns.map((column, index) => (
                        <TableCell
                          key={`column-${index}`}
                          className={`max-w-[200px] ${
                            index < config.columns.length
                              ? "border-r border-black/70"
                              : ""
                          }`}
                        >
                          <div
                            className="truncate"
                            title={
                              column.cell
                                ? column.cell(row).toString()
                                : row[column.accessorKey]?.toString()
                            }
                          >
                            {renderCellContent(column, row)}
                          </div>
                        </TableCell>
                      ))}
                      {(config.actions || config.outOfActions) && (
                        <TableCell
                          className="p-0 text-center align-middle"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-flex justify-center items-center gap-4 max-w-xs mx-auto">
                            {config.actions && config.actions.length > 0 && (
                              <TableActions actions={config.actions} row={row} />
                            )}
                            {config.outOfActions && (
                              <TableOutOfActions actions={config.outOfActions} row={row} />
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={
                        config.columns.length + 1 + (config.actions ? 1 : 0)
                      }
                      className="h-24 text-center"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell className="relative h-20 "></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="absolute min-h-96 inset-0 flex items-center justify-center z-50">
            <Spinner />
          </div>
        )}
      </div>

      {!isLoading && (
        <>
          {total > 0 && (
            <div className="flex sm:flex-row flex-col items-center justify-between gap-4 py-4">
              <div className="sm:text-sm text-xs text-primary w-full text-start">
                Showing {(tableState.page - 1) * tableState.pageSize + 1} to{" "}
                {Math.min(tableState.page * tableState.pageSize, total)} of{" "}
                {total} entries
              </div>
              <div className="w-full flex items-center justify-end space-x-2">
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
          )}
        </>
      )}
    </div>
  );
}
