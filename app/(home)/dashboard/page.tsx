"use client";
import WithAuth from "@/lib/helper/withAuth";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import QuickManage from "@/components/dashboard/QuickManage";
import Temp from "@/components/dashboard/Temp";

const DashboardPage = () => {
  return (
    <div className="relative w-full h-full space-y-12 px-2 py-8">
      <Tabs
        defaultValue="follow-ups"
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
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="quick-manage"
        >
          <QuickManage />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="follow-ups"
        >
          <Temp />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="pending-inquiries"
        >
          Pending Inquiries
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="pending-payments"
        >
          Pending Payments
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="upcoming-renewals"
        >
          Upcoming Renewals
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="inconsistant-clients"
        >
          Inconsistant Clients
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="birthdays"
        >
          Birthdays
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="anniversary"
        >
          Anniversary
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 overflow-y-auto scrollbar-none"
          value="today-schedule"
        >
          Todays Schedule
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WithAuth(DashboardPage);
