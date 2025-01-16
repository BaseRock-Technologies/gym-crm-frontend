"use client";

import { useState, useEffect, SetStateAction } from "react";
import { DataTable } from "@/components/data-table";
import type { TableConfig, TableState } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { post } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";

interface DataTableWrapperProps {
  config: TableConfig;
  apiConfig: SelectApiData;
  setSelectedRow?: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}

interface PageData {
  data: any[];
  total: number;
}

export function DataTableWrapper({
  config,
  apiConfig,
  setSelectedRow,
}: DataTableWrapperProps) {
  const [tableState, setTableState] = useState<TableState>({
    page: 1,
    pageSize: 10,
    filters: {},
    sorting: [],
  });
  const [pageData, setPageData] = useState<Record<number, PageData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageData({});
    fetchData();
  }, [tableState.filters, tableState.page, tableState.pageSize]);

  useEffect(() => {
    const currentPage = tableState.page;
    if (pageData[currentPage]) {
      return;
    } else {
      setPageData({});
      fetchData();
    }
  }, [tableState.page]);

  const getFilteredData = async (): Promise<PageData | undefined> => {
    setIsLoading(true);

    const payload = {
      filters: { ...tableState.filters },
      searchConfig: tableState.filters.search
        ? {
            searchTerm: tableState.filters.search,
            searchableColumns: config.searchableColumns,
          }
        : undefined,
    };
    delete payload.filters.search;
    const res: StatusResponse = await post(
      payload,
      `${apiConfig.apiPath}?offset=${tableState.page - 1}&limit=${
        tableState.pageSize
      }`
    );

    if (res.status === "error") {
      showToast("error", "Failed to fetch records", {
        toastId: "12cd9ad6-9e34-4012-b514-72d3f0a1a4e7",
      });
      setIsLoading(false);
      return;
    }

    const { data } = res;

    let filtered = data.records;

    if (tableState.filters.employee && tableState.filters.employee !== "all") {
      filtered = filtered.filter(
        (item: any) =>
          item.representative.toLowerCase() === tableState.filters.employee
      );
    }

    if (tableState.filters.type && tableState.filters.type !== "all") {
      filtered = filtered.filter(
        (item: any) => item.type.toLowerCase() === tableState.filters.type
      );
    }

    setIsLoading(false);
    return {
      data: filtered,
      total: data.totalData,
    };
  };

  const fetchData = async () => {
    const currentPage = tableState.page;
    const result = await getFilteredData();
    if (result) {
      setPageData((prevPageData) => ({
        ...prevPageData,
        [currentPage]: result,
      }));
    }
  };

  const currentPageData = pageData[tableState.page] || { data: [], total: 0 };

  return (
    <DataTable
      config={config}
      data={currentPageData.data}
      total={currentPageData.total}
      tableState={tableState}
      onStateChange={(newState) =>
        setTableState((prevState) => ({ ...prevState, ...newState }))
      }
      isLoading={isLoading}
      setSelectedRow={setSelectedRow}
    />
  );
}
