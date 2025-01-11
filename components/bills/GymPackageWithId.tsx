"use client";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DynamicForm } from "../dynamic-form";
import { formConfig } from "./constant";

const GymPackageWithId = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Record<string, any> | null>(
    null
  );
  const { user } = useAuth();

  const apiConfig: SelectApiData = {
    apiPath: `bills/update`,
    method: "PATCH",
    billType: "gym-membership",
    postData: {
      billId: id,
    },
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const billSelectOptions: StatusResponse = await post(
          { billType: "gym-membership" },
          "bills/options",
          "Failed to fetch bill options"
        );
        if (billSelectOptions.status === "success" && billSelectOptions.data) {
          const {
            clientDetails,
            clientSourceDetails,
            packageDetails,
            taxDetails,
            paymentMethod,
            trainersDetails,
          } = billSelectOptions.data;
          updateFormConfigOptions(
            formConfig,
            "clientName",
            clientDetails,
            "clientName"
          );
          updateFormConfigOptions(
            formConfig,
            "contactNumber",
            clientDetails,
            "contactNumber"
          );
          updateFormConfigOptions(
            formConfig,
            "clientSource",
            clientSourceDetails,
            "clientSource"
          );
          updateFormConfigOptions(
            formConfig,
            "packageName",
            packageDetails,
            "package"
          );
          updateFormConfigOptions(formConfig, "taxName", taxDetails, "taxName");
          updateFormConfigOptions(
            formConfig,
            "paymentMode",
            paymentMethod,
            "paymentMode"
          );
          updateFormConfigOptions(
            formConfig,
            "trainer",
            trainersDetails,
            "trainer"
          );
        }
        if (billSelectOptions.status === "error") {
          showToast("error", billSelectOptions.message);
          return;
        }
        const billDetails: StatusResponse = await post(
          { billType: "gym-membership", billId: id },
          `bills/details`,
          "Failed to fetch bill details"
        );
        if (billDetails.status === "success" && billDetails.data) {
          const { data } = billDetails;

          const dateFields = formConfig.fields
            .filter((field) => field.type === "date")
            .map((field) => field.name);

          dateFields.forEach((field) => {
            if (data[field]) {
              data[field] = formatTimestamp(data[field]);
            }
          });
          setInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching data in Gym Packgae Bill:", error);
        showToast("error", "Failed to load data");
      }
    };
    fetchInitialData();
  }, [user]);

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={formConfig}
        submitBtnText="Update"
        initialData={initialData}
        apiData={apiConfig}
        resetOnSubmit={false}
      />
    </div>
  );
};

export default GymPackageWithId;
