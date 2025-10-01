"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";
import { useParams } from "next/navigation";
import React from "react";
import { formConfig } from "./constant";

const GroupClassBillWithId = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<string, any> | null>(null);

  const apiConfig: SelectApiData = {
    apiPath: "bills/update",
    method: "PATCH",
    billType: "group-class",
    postData: { billId: id },
  };

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 1. Fetch options
        const res: StatusResponse = await post(
          { billType: "group-class" },
          "bills/options",
          "Failed to fetch bill options"
        );

        if (res.status === "success" && res.data) {
          const {
            billId,
            clientDetails,
            clientSourceDetails,
            packageDetails,
            taxDetails,
            paymentMethod,
            trainersDetails,
          } = res.data;

          const membeIdField = formConfig.fields.find(
            (field) => field.name === "memberId"
          );
          if (membeIdField) {
            membeIdField.dependsOn = {
              field: "clientName",
              formula: (values, options) => {
                return (
                  options?.find((opt) => opt.value === values.clientName)
                    ?.memberId ?? billId
                );
              },
            };
          }

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

        if (res.status === "error") {
          showToast("error", res.message);
          return;
        }

        // 2. Fetch bill details
        const billDetails: StatusResponse = await post(
          { billType: "group-class", billId: id },
          "bills/details",
          "Failed to fetch bill details"
        );

        if (billDetails.status === "success" && billDetails.data) {
          const { data } = billDetails;

          // Ensure phone is string
          if (data.contactNumber !== undefined && data.contactNumber !== null) {
            data.contactNumber = String(data.contactNumber);
          }

          setInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching data in Group Class Bill:", error);
        showToast("error", "Failed to load data");
      }
    };

    formConfig.title = "Update Group Class Bill";
    fetchInitialData();
  }, [user, id]);

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={formConfig}
        submitBtnText="Update"
        initialData={initialData}
        apiData={apiConfig}
        resetOnSubmit={false}
        isAdminOnly={true}
      />
    </div>
  );
};

export default GroupClassBillWithId;
