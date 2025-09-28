"use client";

import {
  useState,
  useEffect,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { DataTable } from "@/components/data-table";
import type { TableConfig, TableState } from "@/types/table";
import { SelectApiData } from "@/types/form";
import { post } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { merge } from "lodash";

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
  const filters: Record<string, any> = {};
  if (config.filters) {
    config.filters.forEach((filter) => {
      if (filter.type === "date-range") {
        filters[filter.id] = filter.dateRange;
      }
    });
  }
  const [tableState, setTableState] = useState<TableState>({
    page: 1,
    pageSize: 10,
    filters,
    sorting: [],
  });
  const [pageData, setPageData] = useState<Record<number, PageData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const previousFiltersRef = useRef(tableState.filters);

  
  
  const searchTimeout = useRef<number | null>(null);

  const getFilteredData = useCallback(async (): Promise<
    PageData | undefined
  > => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      
      
      const payload = merge({}, apiConfig.postData, {
        filters: { ...tableState.filters },
      });

      const res: StatusResponse = await post(
        payload,
        `${apiConfig.apiPath}?offset=${tableState.page - 1}&limit=${tableState.pageSize}`
      );

      if (res.status === "error") {
        showToast("error", "Failed to fetch records", {
          toastId: "12cd9ad6-9e34-4012-b514-72d3f0a1a4e7",
        });
        return;
      }

      const { data } = res;

      let filtered = data.records;

      if (
        tableState.filters.employee &&
        tableState.filters.employee !== "all"
      ) {
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

      return {
        data: filtered,
        total: data.totalData,
      };
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [tableState, apiConfig]);

  const fetchData = useCallback(async () => {
    const currentPage = tableState.page;
    const result = await getFilteredData();
    if (result) {
      setPageData((prevPageData) => ({
        ...prevPageData,
        [currentPage]: result,
      }));
    }
  }, [tableState.page, getFilteredData]);

  const currentPageData = pageData[tableState.page] || { data: [], total: 0 };

  useEffect(() => {
    const currentPage = tableState.page;
    const currentFilters = tableState.filters;
    const previousFilters = previousFiltersRef.current;


    
    const filtersChanged =
      JSON.stringify(currentFilters) !== JSON.stringify(previousFilters);

    
      
    if (filtersChanged) {
      setPageData({});
      setTableState((prev) => ({ ...prev, page: 1 }));
      previousFiltersRef.current = currentFilters;
      return;
    }

   
    
    if (pageData[currentPage]) {
      return;
    }

    fetchData();
  }, [tableState.filters, tableState.page, tableState.pageSize, fetchData]);

  
  const handleStateChange = (newState: Partial<TableState>) => {
    if (newState.filters && newState.filters.search !== undefined) {
      if (searchTimeout.current) {
        window.clearTimeout(searchTimeout.current);
      }
      // @ts-ignore: browser setTimeout returns number
      searchTimeout.current = window.setTimeout(() => {
        setTableState((prev) => ({ ...prev, ...newState, page: 1 }));
      }, 400);
    } else if (newState.filters) {
      setTableState((prev) => ({ ...prev, ...newState, page: 1 }));
    } else {
      setTableState((prev) => ({ ...prev, ...newState }));
    }
  };

  
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        window.clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <DataTable
      config={config}
      data={currentPageData.data}
      total={currentPageData.total}
      tableState={tableState}
      onStateChange={handleStateChange} 
      isLoading={isLoading}
      setSelectedRow={setSelectedRow}
    />
  );
}
