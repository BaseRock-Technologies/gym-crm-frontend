"use client";

import { useState, useEffect, SetStateAction } from "react";
import { DataTable } from "@/components/data-table";
import type { TableConfig, TableState } from "@/types/table";

interface DataTableWrapperProps {
  config: TableConfig;
  initialData: any[];
  setSelectedRow?: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function DataTableWrapper({
  config,
  initialData,
  setSelectedRow,
}: DataTableWrapperProps) {
  const [tableState, setTableState] = useState<TableState>({
    page: 1,
    pageSize: 10,
    filters: {},
    sorting: [],
  });
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [tableState]);

  const getFilteredData = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...initialData];

    // Apply filters
    if (tableState.filters.search) {
      const searchTerm = tableState.filters.search.toLowerCase();
      filtered = filtered.filter((item) =>
        config.searchableColumns?.some((column) =>
          item[column].toLowerCase().includes(searchTerm)
        )
      );
    }

    if (tableState.filters.employee && tableState.filters.employee !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.representative.toLowerCase() === tableState.filters.employee
      );
    }

    if (tableState.filters.type && tableState.filters.type !== "all") {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === tableState.filters.type
      );
    }

    // Apply pagination
    const start = (tableState.page - 1) * tableState.pageSize;
    const paginatedData = filtered.slice(start, start + tableState.pageSize);

    setIsLoading(false);
    return {
      data: paginatedData,
      total: filtered.length,
    };
  };

  const fetchData = async () => {
    const { data, total } = await getFilteredData();
    setData(data);
    setTotal(total);
  };

  return (
    <DataTable
      config={config}
      data={data}
      total={total}
      tableState={tableState}
      onStateChange={(newState) =>
        setTableState((prevState) => ({ ...prevState, ...newState }))
      }
      isLoading={isLoading}
      setSelectedRow={setSelectedRow}
    />
  );
}
