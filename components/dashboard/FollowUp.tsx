"use client";

import { DataTableWrapper } from "@/components/data-table-wrapper";
import { SelectApiData } from "@/types/form";
import type { TableConfig } from "@/types/table";
import { Plus, Users } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";
import CreateFollowup from "./QuickNavCardComponents/CreateFollowup";
import { ButtonDialogTrigger } from "../common/ButtonDialogTrigger";
import { showToast } from "@/lib/helper/toast";
import { post } from "@/lib/helper/steroid";

export default function FollowUp() {
  const updateFollowupStatus = async (row: any, status: string) => {
    try {
      if (!row || !row._id) {
        showToast("error", "Please select a followup to update status");
        return;
      }

      const response = await post(
        { status },
        `followup/update-status/${row._id}`,
        "Failed to update followup status"
      );

      if (response.status === "success") {
        showToast("success", "Followup status updated successfully");
      } else {
        showToast("success", "Failed to update followup status");
      }
    } catch {
      showToast("error", "Something went wrong");
    }
  };

  const deleteFollowup = async (row: any) => {
    try {
      if (!row || !row._id) {
        showToast("error", "Please select a followup to delete");
        return;
      }

      const response = await post(
        {},
        `followup/delete/${row._id}`,
        "Failed to delete followup"
      );

      if (response.status === "success") {
        showToast("success", "Followup deleted successfully");
      } else {
        showToast("success", "Failed to delete followup");
      }
    } catch {
      showToast("error", "Failed to delete followup");
    }
  };

  const tableConfig: TableConfig = {
    columns: [
      { id: "sno", header: "SNO", accessorKey: "sno" },
      { id: "followupType", header: "Type", accessorKey: "followupType" },
      { id: "clientName", header: "Name", accessorKey: "clientName" },
      { id: "contactNumber", header: "Contact", accessorKey: "contactNumber" },
      {
        id: "followupDate",
        header: "Followup date",
        accessorKey: "followupDate",
        parseTimeToStr: true,
      },
      { id: "createdBy", header: "Created By", accessorKey: "createdBy" },
      { id: "status", header: "Status", accessorKey: "status" },
    ],
    actions: [
      {
        id: "delete-followup",
        label: "Delete",
        alertTrigger: true,
        alertTitle: "Delete Followup",
        alertDescription: "Are you sure you want to delete this followup?",
        alertAction: "Delete",
        onClick: (row) => deleteFollowup(row),
      },
      {
        id: "mark-as-done",
        label: "Mark as Done",
        onClick: (row) => updateFollowupStatus(row, "completed"),
      },
      {
        id: "mark-as-cancel",
        label: "Mark as Cancelled",
        onClick: (row) => updateFollowupStatus(row, "cancelled"),
      },
    ],
    filters: [
      {
        id: "createdBy",
        label: "Select Employee",
        type: "select",
        options: [
          {
            group: "default",
            options: [{ label: "Admin", value: "admin" }],
          },
        ],
      },
      {
        id: "status",
        label: "Select Status",
        type: "select",
        options: [
          {
            group: "default",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ],
          },
        ],
      },
      {
        id: "followupType",
        label: "Select Type",
        type: "select",
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
        id: "date-range",
        label: "Pick a date",
        type: "date-range",
        dateRange: {
          from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          to: new Date(),
        },
      },
    ],
    bulkActions: [
      // {
      //   id: "SMS",
      //   label: "Bulk SMS",
      //   icon: Send,
      //   btnVariant: "default",
      //   onClick: (value) => console.log("SMS", value),
      // },
    ],
    components: [
      <ButtonDialogTrigger
        title="Create Followup"
        key="create-followup"
        dialogContent={<CreateFollowup />}
      />,
    ],
    showSelector: false,
  };

  const apiConfig: SelectApiData = {
    apiPath: "followup/records",
    method: "POST",
  };
  return (
    <Card className="w-full h-auto mx-auto border-none rounded-md overflow-hidden shadow-none">
      <CardHeader className="bg-primary text-white mb-5 shadow-sm">
        <CardTitle>Followup Records</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <DataTableWrapper apiConfig={apiConfig} config={tableConfig} />
      </CardContent>
    </Card>
  );
}
