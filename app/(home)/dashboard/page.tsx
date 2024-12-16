"use client";
import WithAuth from "@/lib/helper/withAuth";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import QuickManage from "@/components/dashboard/QuickManage";
import FollowUp from "@/components/dashboard/FollowUp";
import PendingInquiries from "@/components/dashboard/PendingInquiries";
import PendingPayments from "@/components/dashboard/PendingPayments";
import UpcomingRenewals from "@/components/dashboard/UpcomingRenewals";
import InconsistentClients from "@/components/dashboard/InconsistentClients";
import Birthdays from "@/components/dashboard/Birthdays";
import Anniversary from "@/components/dashboard/Anniversary";
import TodaySchedule from "@/components/dashboard/TodaySchedule";

const DashboardPage = () => {
  return (
    <div className="relative w-full h-full space-y-12 px-2 pt-8">
      <Tabs
        defaultValue="quick-manage"
        className="relative w-full h-full overflow-hidden"
      >
        <div className="relative w-full">
          <TabsList className="relative w-full flex justify-start items-center gap-5 overflow-x-auto scrollbar-none">
            <TabsTrigger value="quick-manage">Quick Manage</TabsTrigger>
            <TabsTrigger value="follow-ups">Follow-Ups</TabsTrigger>
            <TabsTrigger value="pending-inquiries">
              Pending Inquiries
            </TabsTrigger>
            <TabsTrigger value="pending-payments">Pending Payments</TabsTrigger>
            <TabsTrigger value="upcoming-renewals">
              Upcoming Renewals
            </TabsTrigger>
            <TabsTrigger value="inconsistant-clients">
              Inconsistant Clients
            </TabsTrigger>
            <TabsTrigger value="birthdays">Birthdays</TabsTrigger>
            <TabsTrigger value="anniversary">Anniversary</TabsTrigger>
            <TabsTrigger value="today-schedule">Today's Schedule</TabsTrigger>
          </TabsList>
          <div className="absolute bottom-0 w-full h-[2px] bg-gray-100 z-0"></div>
        </div>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 container mx-auto overflow-y-auto scrollbar-none"
          value="quick-manage"
        >
          <QuickManage />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="follow-ups"
        >
          <FollowUp />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="pending-inquiries"
        >
          <PendingInquiries />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="pending-payments"
        >
          <PendingPayments />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="upcoming-renewals"
        >
          <UpcomingRenewals />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="inconsistant-clients"
        >
          <InconsistentClients />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="birthdays"
        >
          <Birthdays />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="anniversary"
        >
          <Anniversary />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="today-schedule"
        >
          <TodaySchedule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
