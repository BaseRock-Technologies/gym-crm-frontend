"use client";
import { SelectApiData } from "@/types/form";
import { DynamicForm } from "../dynamic-form";
import { ProductFormConfig } from "./constants";
import PosNavigation from "./PosNavigation";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import React, { useState } from "react";

const PosIndex = () => {
  const MIN_LOADER_TIME = 1000; 
  const apiConfig: SelectApiData = {
    apiPath: "pos/bill/create",
    method: "POST",
  };

  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const start = Date.now();
        const res: StatusResponse = await post(
          {},
          "pos/bill/options",
          "Failed to fetch bill options"
        );
        if (res.status === "success" && res.data) {
          const {
            invoiceNo,
            clientDetails,
            paymentMethod,
            productDetails
          } = res.data;
          const currentDate = Math.floor(new Date().getTime() / 1000);
          const data = {
            invoiceNo: invoiceNo.toString(),
            billDate: currentDate,
          };

          updateFormConfigOptions(
            ProductFormConfig,
            "clientName",
            clientDetails,
            "clientName"
          );
          updateFormConfigOptions(
            ProductFormConfig,
            "paymentMode",
            paymentMethod,
            "paymentMode"
          );
          updateFormConfigOptions(
            ProductFormConfig,
            "productDetails",
            productDetails,
            "productName"
          );

          // Ensure spinner shows for at least MIN_LOADER_TIME
          const elapsed = Date.now() - start;
          if (elapsed < MIN_LOADER_TIME) {
            setTimeout(() => setInitialData(data), MIN_LOADER_TIME - elapsed);
          } else {
            setInitialData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching initial data in Pos Bill:", error);
        showToast("error", "Failed to load data");
      }
    };
    fetchInitialData();
  }, [user]);
  return (
    <div className="relative w-full space-y-3">
      <PosNavigation />
      <DynamicForm
        initialData={initialData}
        config={ProductFormConfig}
        apiData={apiConfig}
        resetOnSubmit={true}
        submitBtnText="CREATE BILL"
      />
    </div>
  );
};

export default PosIndex;
