"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { SelectApiData } from "@/types/form";

import { useState, useEffect } from "react";
import InquiryHistory from "./inquiryHistory";
import InquiryRecords from "./inquiryRecords";
import { InquiryFormConfig } from "../inquiries/constants";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";

export default function InquiryHome() {
  const [selectedInquiry, setSelectedInquiry] = useState<
    Record<string, boolean>
  >({});

  const { user } = useAuth();
  const [initialData, setInitialData] = useState<Record<string, any> | null>(
    null
  );

  const apiConfig: SelectApiData = {
    apiPath: "bills/create",
    method: "POST",
    billType: "gym-membership",
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res: StatusResponse = await post(
          {},
          "inquiry/options",
          "Failed to fetch Inquiry options"
        );
        if (res.status === "success" && res.data) {
          const { clientSourceDetails, packageDetails, employeeDetails } =
            res.data;
          const currentDate = formatTimestamp(
            Math.floor(new Date().getTime() / 1000)
          );
          const data = {
            attendedBy: user?.userName || "",
            convertibility: "Warm",
            status: "Pending",
            followUpDate: currentDate,
          };

          updateFormConfigOptions(
            InquiryFormConfig,
            "clientSource",
            clientSourceDetails,
            "clientSource"
          );
          updateFormConfigOptions(
            InquiryFormConfig,
            "packageName",
            packageDetails,
            "package"
          );
          updateFormConfigOptions(
            InquiryFormConfig,
            "attendedBy",
            employeeDetails,
            "fullName"
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
    InquiryFormConfig.title = "Create new bill for Gym Membership";
    fetchInitialData();
  }, [user]);

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <div className="relative flex md:flex-row flex-col gap-6 justify-stretch items-stretch">
        <div className="relative md:w-3/4 w-full flex">
          <DynamicForm
            config={InquiryFormConfig}
            submitBtnText="CREATE INQUIRY"
            apiData={apiConfig}
            resetOnSubmit={true}
            initialData={initialData}
          />
        </div>
        <div className="relative md:w-1/4 w-full flex">
          <InquiryHistory selectedInquiry={selectedInquiry} />
        </div>
      </div>
      <div>
        <InquiryRecords setSelectedRow={setSelectedInquiry} />
      </div>
    </div>
  );
}
