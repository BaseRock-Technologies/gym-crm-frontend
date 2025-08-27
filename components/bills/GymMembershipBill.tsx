"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { RedirectRules, SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import React from "react";
import { formConfig } from "./constant";

export default function GymMembershipBill() {
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);

  const apiConfig: SelectApiData = {
    apiPath: "bills/create",
    method: "POST",
    billType: "gym-membership",
  };

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res: StatusResponse = await post(
          { billType: "gym-membership" },
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
          const currentDate = Math.floor(new Date().getTime() / 1000);
          const data = {
            memberId: billId.toString(),
            clientRepresentative: user?.userName || "",
            invoiceDate: currentDate,
            joiningDate: currentDate,
            endDate: currentDate,
          };

          const membeIdField = formConfig.fields.find(
            (field) => field.name === "memberId"
          );
          if (membeIdField) {
            membeIdField.dependsOn = {
              field: "clientName",
              formula: (values, options) => {
                return (
                  options?.find((opt) => opt.value === values.clientName)
                    ?.memberId ?? data.memberId
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
          setInitialData(data);
        }
      } catch (error) {
        console.error(
          "Error fetching initial data in Gym Packgae Bill:",
          error
        );
        showToast("error", "Failed to load data");
      }
    };
    formConfig.title = "Create New Bill for Gym Membership";
    fetchInitialData();
  }, [user]);

  const redirectRules: RedirectRules = {
    shouldRedirect: true,
    redirectPath: `/gym-bill`,
    redirectOnMemberId: true,
  };

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <DynamicForm
        config={formConfig}
        submitBtnText="Save"
        initialData={initialData}
        apiData={apiConfig}
        redirectRules={redirectRules}
        resetOnSubmit={true}
      />
    </div>
  );
}
