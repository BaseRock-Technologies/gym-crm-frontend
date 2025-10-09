"use client";
import { DynamicForm } from "@/components/dynamic-form";
import { SelectApiData } from "@/types/form";

import { useState, useEffect, useRef } from "react";
import InquiryHistory from "./inquiryHistory";
import InquiryRecords from "./inquiryRecords";
import { InquiryFormConfig } from "../inquiries/constants";
import { useAuth } from "@/lib/context/authContext";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import { FilterOptions } from "./types";

export default function InquiryHome() {
  const [selectedInquiry, setSelectedInquiry] = useState<
    Record<string, boolean>
  >({});

  const { user } = useAuth();
  const [inquiryFormInitialData, setInquiryFormInitialData] = useState<Record<
    string,
    any
  > | null>(null);

  const apiConfig: SelectApiData = {
    apiPath: "inquiry/create",
    method: "POST",
  };

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple API calls
    if (hasFetchedRef.current) {
      return;
    }

    const fetchInitialData = async () => {
      try {
        hasFetchedRef.current = true;

        const res: StatusResponse = await post(
          {},
          "inquiry/options",
          "Failed to fetch Inquiry options"
        );
        if (res.status === "success" && res.data) {
          const { clientSourceDetails, packageDetails, employeeDetails } =
            res.data;
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const currentDate = Math.floor(tomorrow.getTime() / 1000);
          const data = {
            attendedBy: user?.userName || "",
            convertibility: "warm",
            status: "pending",
            followupDate: currentDate,
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
          setInquiryFormInitialData(data);
        }
      } catch (error) {
        console.error(
          "Error fetching initial data in Gym Packgae Bill:",
          error
        );
        showToast("error", "Failed to load data");
        // Reset the ref on error so we can retry
        hasFetchedRef.current = false;
      }
    };
    InquiryFormConfig.title = "Create New Inquiry";
    fetchInitialData();
  }, [user?.userName]);

  return (
    <div className="relative p-6 flex flex-col gap-6">
      <div className="relative flex md:flex-row flex-col gap-6 justify-stretch items-stretch">
        <div className="relative md:w-3/4 w-full flex">
          <DynamicForm
            config={InquiryFormConfig}
            submitBtnText="CREATE INQUIRY"
            apiData={{
              ...apiConfig,
              onSuccess: () => {
                window.dispatchEvent(new Event("refreshInquiries"));
              }}
            }
            resetOnSubmit={true}
            initialData={inquiryFormInitialData}
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
