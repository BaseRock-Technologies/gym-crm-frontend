"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImageCell } from "../image-cell";
import {
  post,
  updateFormConfigOptions,
  updateFilterOptions,
} from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import { StatusResponse } from "@/types/query";
import { formatTimestamp } from "@/utils/date-utils";
import { InquiryFormConfig } from "../inquiries/constants";
import { useAuth } from "@/lib/context/authContext";
import { SelectApiData } from "@/types/form";

interface CustomerRecordsProps {}

// const mockData: any[] = [];

const tableConfig: TableConfig = {
  columns: [
    {
      id: "memberId",
      header: "Cliend ID/Biometric ID",
      accessorKey: "memberId",
    },
    {
      id: "clientPicture",
      header: "Photo",
      cell: (props) => <ImageCell {...props} />,
      accessorKey: "clientPicture",
    },
    { id: "clientName", header: "Client Name", accessorKey: "clientName" },
    {
      id: "contactNumber",
      header: "Client Name",
      accessorKey: "contactNumber",
    },
    { id: "gender", header: "Gender", accessorKey: "gender" },
    { id: "joiningDate", header: "Registration", accessorKey: "joiningDate" },
    { id: "packageName", header: "Package", accessorKey: "packageName" },
    { id: "endDate", header: "Expiration", accessorKey: "endDate" },
  ],
  actions: [
    {
      id: "viewBill",
      label: "View Bill",
      onClick: (row) => console.log("View Bill", row),
    },
    {
      id: "renewBill",
      label: "Renew Bill",
      onClick: (row) => console.log("Renew Bill", row),
    },
    {
      id: "freezeMembership",
      label: "Freeze Membership(s)",
      onClick: (row) => console.log("Freeze Membership(s)", row),
    },
    {
      id: "transferMembership",
      label: "Transfer Membership(s)",
      onClick: (row) => console.log("Transfer Membership(s)", row),
    },
    {
      id: "sendBill",
      label: "SMS / Whatsapp / E-mail",
      onClick: (row) => console.log("SMS / Whatsapp / E-mail", row),
    },
    {
      id: "addFollowup",
      label: "Add Followup",
      onClick: (row) => console.log("Add Followup", row),
    },
    {
      id: "sendQR",
      label: "Send QR Url via SMS & Email",
      onClick: (row) => console.log("Send QR Url via SMS & Email", row),
    },
    {
      id: "markAttendance",
      label: "Mark attendance-in",
      onClick: (row) => console.log("Mark attendance-in", row),
    },
    {
      id: "registerRfid",
      label: "Register RFID no",
      onClick: (row) => console.log("Register RFID no", row),
    },
    {
      id: "deleteClient",
      label: "Delete Client",
      onClick: (row) => console.log("Delete Client", row),
    },
  ],
  outOfActions: [
    {
      id: "profile",
      label: "Profile",
      type: "link",
      href: "/profile",
    },
    {
      id: "whatsapp",
      label: "Whatsapp",
      type: "button",
      icon: Send,
      onClick: (row) => console.log("Whatapp", row),
      customClass: "bg-green-500",
      btnType: "icon",
    },
  ],
  filters: [
    {
      id: "gender",
      label: "Select Gender",
      type: "select",
      options: [
        {
          group: "default",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
        },
      ],
    },
    {
      id: "packageName",
      label: "All Packages",
      type: "select",
      options: [],
    },

    {
      id: "billType",
      label: "Select Membership",
      type: "select",
      options: [
        {
          group: "default",
          options: [
            { label: "Gym Membership", value: "gym-membership" },
            { label: "Personal Training", value: "personal-training" },
            { label: "Group Classes", value: "group-class" },
          ],
        },
      ],
    },
    {
      id: "clientStatus",
      label: "Select Client Type",
      type: "select",
      options: [
        {
          group: "default",
          options: [
            { label: "Live Clients", value: "active" },
            { label: "Inactive Clients", value: "inactive" },
            {
              label: "Manual inactive Clients",
              value: "manual-inactive",
            },
            { label: "New Clients", value: "new-clients" },
            { label: "Deleted Clients", value: "deleted" },
          ],
        },
      ],
    },
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
  searchableColumns: ["clientName", "contactNumber"],

  bulkActions: [
    {
      id: "SMS",
      label: "Bulk SMS",
      icon: Send,
      btnVariant: "default",
      onClick: (value) => console.log("SMS", value),
    },
  ],
};

const CustomerRecords: React.FC<CustomerRecordsProps> = ({}) => {
  const { user } = useAuth();
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res: StatusResponse = await post(
          {},
          "package/options",
          "Failed to fetch package options"
        );
        if (res.status === "success" && res.data) {
          const { packageDetails } = res.data;

          updateFilterOptions(
            tableConfig,
            "packageName",
            packageDetails,
            "package"
          );
        }
      } catch (error) {
        console.error(
          "Error fetching initial data in Gym Package Bill:",
          error
        );
        showToast("error", "Failed to load data");
      }
    };
    InquiryFormConfig.title = "Create new bill for Gym Membership";
    fetchInitialData();
  }, [user]);

  const apiConfig: SelectApiData = {
    apiPath: "client/records",
    method: "POST",
  };
  console.log(tableConfig);
  return (
    <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Client(s)</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper config={tableConfig} apiConfig={apiConfig} />
      </CardContent>
    </Card>
  );
};

export default CustomerRecords;
