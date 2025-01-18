import { SetStateAction, useState } from "react";
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
import { BulkActions, TableConfig, TableState } from "../types/table";
import { Spinner } from "@/components/ui/spinner";
import { TableOutOfActions } from "./table-out-actions";

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
    // Handle bulk actions
    switch (type) {
      case "SMS":
        console.log("sms");
        break;
      case "email":
        console.log("email");
      case "follow-up":
        console.log("follow-up");
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

  return (
    <div className="w-full relative">
      <div className="flex items-center py-4 gap-4">
        <TableFilters
          filters={config.filters || []}
          ctaActions={config.bulkActions || []}
          onFilterChange={(filterId, value) => {
            onStateChange({
              filters: { ...tableState.filters, [filterId]: value },
              page: 1,
            });
          }}
          onBulkAction={handleBulkAction}
          searchableColumns={config.searchableColumns}
          pageSize={tableState.pageSize}
          onPageSizeChange={(value) =>
            onStateChange({ pageSize: Number(value), page: 1 })
          } // Pass handler for page size change
        />
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]" key="checkbox-header">
                <Checkbox
                  onCheckedChange={(checked: boolean) =>
                    handleSelectAll(checked)
                  }
                />
              </TableHead>
              {config.columns.map((column) => (
                <TableHead className="truncate" key={column.id}>
                  {column.header}
                </TableHead>
              ))}
              {config.actions && (
                <TableHead key="actions-header">Action</TableHead>
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
                      className="cursor-pointer"
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selected[row.id] || false}
                          onCheckedChange={() => handleSelectRow(row.id)}
                        />
                      </TableCell>
                      {config.columns.map((column, index) => (
                        <TableCell
                          key={`column-${index}`}
                          className="max-w-[200px]"
                        >
                          <div
                            className="truncate"
                            title={
                              column.cell
                                ? column.cell(row).toString()
                                : row[column.accessorKey]?.toString()
                            }
                          >
                            {column.cell
                              ? column.cell(row)
                              : row[column.accessorKey]}
                          </div>
                        </TableCell>
                      ))}
                      {(config.actions || config.outOfActions) && (
                        <TableCell
                          className="flex gap-2 flex-wrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {config.actions && config.actions.length > 0 && (
                            <TableActions actions={config.actions} row={row} />
                          )}
                          {config.outOfActions && (
                            <TableOutOfActions
                              actions={config.outOfActions}
                              row={row}
                            />
                          )}
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
            <div className="flex items-center justify-between  py-4">
              <div className="text-sm text-primary">
                Showing {(tableState.page - 1) * tableState.pageSize + 1} to{" "}
                {Math.min(tableState.page * tableState.pageSize, total)} of{" "}
                {total} entries
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
          )}
        </>
      )}
    </div>
  );
}
