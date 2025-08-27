"use client";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { AdminOnlyEdit, SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DynamicForm } from "../dynamic-form";
import { formConfig } from "./constant";

const PersonalTrainingBillWithId = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<Record<string, any> | null>(
    null
  );
  const { user } = useAuth();

  const apiConfig: SelectApiData = {
    apiPath: `bills/update`,
    method: "PATCH",
    billType: "personal-training",
    postData: {
      billId: id,
    },
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const billSelectOptions: StatusResponse = await post(
          { billType: "personal-training" },
          "bills/options",
          "Failed to fetch bill options"
        );
        if (billSelectOptions.status === "success" && billSelectOptions.data) {
          const {
            billId,
            clientDetails,
            clientSourceDetails,
            packageDetails,
            taxDetails,
            paymentMethod,
            trainersDetails,
          } = billSelectOptions.data;

          const membeIdField = formConfig.fields.find(
            (field) => field.name === "memberId"
          );
          if (membeIdField) {
            membeIdField.dependsOn = {
              field: "clientName",
              formula: (values, options) => {
                console.log(values);
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
        if (billSelectOptions.status === "error") {
          showToast("error", billSelectOptions.message);
          return;
        }
        const billDetails: StatusResponse = await post(
          { billType: "personal-training", billId: id },
          `bills/details`,
          "Failed to fetch bill details"
        );
        if (billDetails.status === "success" && billDetails.data) {
          const { data } = billDetails;

          // const dateFields = formConfig.fields
          //   .filter((field) => field.type === "date")
          //   .map((field) => field.name);

          // dateFields.forEach((field) => {
          //   if (data[field]) {
          //     data[field] = formatTimestamp(data[field]);
          //   }
          // });
          console.log(data);
          setInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching data in Gym Packgae Bill:", error);
        showToast("error", "Failed to load data");
      }
    };
    formConfig.title = "Update Personal Training Bill";
    if (user) {
      const { role } = user;
      if (role === "admin") {
        fetchInitialData();
      } else {
        setInitialData({});
      }
    }
  }, [user]);

  const adminEditRules: AdminOnlyEdit = {
    adminOnlyEdit: true,
    redirectPath: `/manage-customer`,
    memberId: id,
  };

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={formConfig}
        submitBtnText="Update"
        initialData={initialData}
        apiData={apiConfig}
        resetOnSubmit={false}
        isAdminOnly={true}
        adminEditRules={adminEditRules}
      />
    </div>
  );
};

export default PersonalTrainingBillWithId;
