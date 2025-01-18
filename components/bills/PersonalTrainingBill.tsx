"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import {
  AddtionalFormFieldsConfig,
  AdminOnlyEdit,
  FieldsToRemoveConfig,
  RedirectRules,
  SelectApiData,
} from "@/types/form";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import React from "react";
import { formConfig } from "./constant";

const additionalFormFieldsToAdd: AddtionalFormFieldsConfig = {
  groups: [
    {
      id: "personal-info",
      fields: [{ name: "invoiceId", position: 0 }],
    },
    {
      id: "package-info",
      fields: [{ name: "sessions", position: 3 }],
    },
  ],
  fields: [
    {
      name: "invoiceId",
      label: "Invoice ID",
      type: "number",
      editable: false,
    },
    {
      name: "sessions",
      label: "Session(s)",
      type: "text",
    },
  ],
};

const fieldsToRemove: FieldsToRemoveConfig = {
  groups: [],
};

export default function PersonalTrainingBill() {
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);

  const apiConfig: SelectApiData = {
    apiPath: "bills/create",
    method: "POST",
    billType: "personal-training",
  };

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res: StatusResponse = await post(
          { billType: "personal-training" },
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
          const currentDate = formatTimestamp(
            Math.floor(new Date().getTime() / 1000)
          );
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

    if (additionalFormFieldsToAdd) {
      additionalFormFieldsToAdd.groups?.forEach((group) => {
        const relatedFormConfigGroup = formConfig.groups?.find(
          (configGroup) => configGroup.id === group.id
        );
        if (relatedFormConfigGroup) {
          group.fields.forEach(({ name: fieldName, position }) => {
            const currentIndex =
              relatedFormConfigGroup.fields.indexOf(fieldName);
            if (currentIndex === -1) {
              // Determine the correct position
              const insertIndex = Math.max(
                0,
                Math.min(position, relatedFormConfigGroup.fields.length)
              );
              relatedFormConfigGroup.fields.splice(insertIndex, 0, fieldName);
            }
          });
        }
      });

      const existingFieldNames = new Set(
        formConfig.fields.map((fieldConfig) => fieldConfig.name)
      );
      additionalFormFieldsToAdd.fields.forEach((field) => {
        if (!existingFieldNames.has(field.name)) {
          formConfig.fields.push(field);
        }
      });
    }

    if (fieldsToRemove) {
      const fieldsToRemoveSet = new Set<string>();

      fieldsToRemove.groups.forEach((group) => {
        const relatedFormConfigGroup = formConfig.groups?.find(
          (configGroup) => configGroup.id === group.id
        );
        if (relatedFormConfigGroup) {
          group.fields.forEach((fieldName) => {
            const index = relatedFormConfigGroup.fields.indexOf(fieldName);
            if (index !== -1) {
              relatedFormConfigGroup.fields.splice(index, 1);
            }
            fieldsToRemoveSet.add(fieldName);
          });
        }
      });

      formConfig.fields = formConfig.fields.filter(
        (fieldConfig) => !fieldsToRemoveSet.has(fieldConfig.name)
      );
    }

    formConfig.title = "Create New Personal Training bill";

    fetchInitialData();
  }, [user]);

  const redirectRules: RedirectRules = {
    shouldRedirect: true,
    redirectPath: `/personal-training-bill`,
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
        isAdminOnly={true}
      />
    </div>
  );
}
