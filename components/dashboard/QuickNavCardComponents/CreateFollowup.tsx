"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/components/dynamic-form";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { FormConfig, SelectApiData } from "@/types/form";
import { StatusResponse } from "@/types/query";

interface Client {
  _id: string;
  clientName: string;
  contactNumber: string;
  clientCode: string;
}

const CreateFollowup = () => {
  const { user } = useAuth();
  const [initialData, setInitialData] = React.useState<Record<
    string,
    any
  > | null>(null);
  const [formConfig, setFormConfig] = React.useState<FormConfig>({
    id: "followup",
    fields: [
      {
        name: "clientCode",
        label: "Client",
        type: "select",
        required: true,
        placeholder: "Select client",
        options: [],
        allowAddCustomOption: false,
      },
      {
        name: "followupType",
        label: "Followup type",
        type: "select",
        required: true,
        placeholder: "Select followup type",
        options: [
          {
            group: "Followup Types",
            options: [
              { label: "Anniversary", value: "anniversary" },
              { label: "Balance", value: "balance" },
              { label: "Balance Billing", value: "balance-billing" },
              { label: "Birthday wishes", value: "birthday-wishes" },
              { label: "Blacklisted member", value: "blacklisted-member" },
              { label: "Cheque bounce", value: "cheque-bounce" },
              { label: "Diet record", value: "diet-record" },
              { label: "Enquiry", value: "enquiry" },
              {
                label: "Fitness counselling record",
                value: "fitness-counselling-record",
              },
              { label: "Fitness test", value: "fitness-test" },
              { label: "Fun run", value: "fun-run" },
              {
                label: "Gym membership renewal",
                value: "gym-membership-renewal",
              },
              { label: "Gym PT renewal", value: "gym-pt-renewal" },
              { label: "Gym trial", value: "gym-trial" },
              { label: "Member feedback", value: "member-feedback" },
              { label: "Member grievance", value: "member-grievance" },
              {
                label: "Not connected gym trial",
                value: "not-connected-gym-trial",
              },
              { label: "Nutrition assessment", value: "nutrition-assessment" },
              { label: "Nutrition renewal", value: "nutrition-renewal" },
              {
                label: "Nutrition session appointment",
                value: "nutrition-session-appointment",
              },
              { label: "Payment confirmation", value: "payment-confirmation" },
              { label: "Payment reversal", value: "payment-reversal" },
              { label: "PT trial", value: "pt-trial" },
              { label: "Referral", value: "referral" },
              { label: "Upgrade", value: "upgrade" },
              { label: "Web Transaction", value: "web-transaction" },
              { label: "Today followup", value: "today-followup" },
              { label: "Pending payment", value: "pending-payment" },
              { label: "Upcoming renewal", value: "upcoming-renewal" },
            ],
          },
        ],
      },
      {
        name: "followupTime",
        label: "Schedule followup time",
        type: "time",
        placeholder: "Enter time",
      },
      {
        name: "followupDate",
        label: "Schedule followup date",
        type: "date",
        required: true,
        placeholder: "Select date",
      },
      {
        name: "feedback",
        label: "Response / feedback",
        type: "textarea",
        placeholder: "Enter feedback",
      },
    ],
  });

  const apiConfig: SelectApiData = {
    apiPath: "followup/create",
    method: "POST",
  };

  const hasFetchedRef = useRef(false);

  React.useEffect(() => {
    // Prevent multiple API calls
    if (hasFetchedRef.current) {
      return;
    }

    const fetchInitialData = async () => {
      try {
        hasFetchedRef.current = true;

        const res: StatusResponse = await post(
          {},
          "others/clients/list",
          "Failed to fetch clients"
        );

        if (res.status === "success" && res.data) {
          const clientDetails = res.data;

          // Update form config with client options
          updateFormConfigOptions(
            formConfig,
            "clientCode",
            clientDetails,
            "clientName",
            "clientCode"
          );

          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const currentDate = Math.floor(tomorrow.getTime() / 1000);
          const data = {
            followupDate: currentDate,
            createdBy: user?.userName || "",
          };

          setInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching initial data in Create Followup:", error);
        showToast("error", "Failed to load data");
        // Reset the ref on error so we can retry
        hasFetchedRef.current = false;
      }
    };

    fetchInitialData();
  }, [user?.userName]);

  return (
    <DynamicForm
      config={formConfig}
      submitBtnText="ADD FOLLOWUP"
      initialData={initialData}
      apiData={apiConfig}
      resetOnSubmit={true}
      canSaveTheForm={true}
      shouldFlex={true}
    />
  );
};

export default CreateFollowup;