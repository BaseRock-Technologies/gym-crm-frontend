"use client";
import { SelectApiData } from "@/types/form";
import { DynamicForm } from "../dynamic-form";
import { PosPurchaseFormConfig } from "./constants";
import PosNavigation from "./PosNavigation";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import React from "react";

const PosPurchase = () => {
  const apiConfig: SelectApiData = {
    apiPath: "pos/purchase/create",
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
        const res: StatusResponse = await post(
          {},
          "pos/purchase/options",
          "Failed to fetch bill options"
        );
        if (res.status === "success" && res.data) {
          const { vendorDetails, paymentMethod, productDetails } = res.data;
          const currentDate = formatTimestamp(
            Math.floor(new Date().getTime() / 1000)
          );
          const data = {
            purchaseDate: currentDate,
          };

          updateFormConfigOptions(
            PosPurchaseFormConfig,
            "paymentMode",
            paymentMethod,
            "paymentMode"
          );
          updateFormConfigOptions(
            PosPurchaseFormConfig,
            "vendorName",
            vendorDetails,
            "vendorName"
          );
          updateFormConfigOptions(
            PosPurchaseFormConfig,
            "productDetails",
            productDetails,
            "productName"
          );
          setInitialData(data);
        }
      } catch (error) {
        console.error(
          "Error fetching initial data in Pos Purchase Bill:",
          error
        );
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
        config={PosPurchaseFormConfig}
        apiData={apiConfig}
        resetOnSubmit={true}
        submitBtnText="CREATE BILL"
      />
    </div>
  );
};

export default PosPurchase;
