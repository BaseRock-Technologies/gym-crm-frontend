"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import type { TableConfig } from "@/types/table";
import { Send } from "lucide-react";
import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImageCell } from "../image-cell";
import { post, updateFilterOptions } from "@/lib/helper/steroid";
import { showToast } from "@/lib/helper/toast";
import type { StatusResponse } from "@/types/query";
import { InquiryFormConfig } from "../inquiries/constants";
import { useAuth } from "@/lib/context/authContext";
import type { SelectApiData } from "@/types/form";
import FreezeMembership from "./FreezeMembership";

type CustomerRecordsProps = {};

const CustomerRecords: React.FC<CustomerRecordsProps> = ({}) => {
  const { user } = useAuth();
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const tableConfigRef = useRef<TableConfig>({
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
        header: "Contact Number",
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
        onClick: (row) => console.log("view Bill", row),
      },
      {
        id: "renewBill",
        label: "Renew Bill",
        onClick: (row) => console.log("Renew Bill", row),
      },
      {
        id: "freezeMembership",
        label: "Freeze Membership(s)",
        onClick: (row) => {
          setIsFreezeModalOpen(true);
          setSelectedMember(row);
        },
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
        href: "/dashboard",
        getLinkFrom: "memberId",
        additionalHref: "/profile",
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
  });

  const updateTableConfig = useCallback(
    (updater: (config: TableConfig) => void) => {
      updater(tableConfigRef.current);
    },
    []
  );

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

          updateTableConfig((config) => {
            updateFilterOptions(
              config,
              "packageName",
              packageDetails,
              "package"
            );
          });
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
  return (
    <>
      <Card className="w-full h-full mx-auto border-none rounded-md overflow-hidden shadow-none">
        <CardHeader className="bg-primary text-white mb-5 shadow-sm">
          <CardTitle>Client(s)</CardTitle>
        </CardHeader>
        <CardContent className="container">
          <DataTableWrapper
            config={tableConfigRef.current}
            apiConfig={apiConfig}
          />
        </CardContent>
      </Card>
      <FreezeMembership
        isOpen={isFreezeModalOpen}
        onClose={() => setIsFreezeModalOpen(false)}
        data={selectedMember}
      />
    </>
  );
};

export default CustomerRecords;
