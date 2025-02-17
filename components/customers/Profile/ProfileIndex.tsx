"use client";
import { useParams } from "next/navigation";
import React from "react";
import WithAuth from "@/lib/helper/withAuth";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Profile from "./Profile";
import BillingAndPayment from "./BillingAndPayment";
import Communication from "./Communication";
import Attendance from "./Attendance";
import Anthroprometrics from "./Anthroprometrics";
import WorkoutPlan from "./WorkoutPlan";
import NutritionPlan from "./NutritionPlan";
import Documents from "./Documents";
import Bookings from "./Bookings";

const ProfileIndex = () => {
  return (
    <div className="relative w-full h-full space-y-12 px-2 pt-8 shadow-none">
      <Tabs
        defaultValue="profile"
        className="relative w-full h-full overflow-hidden"
      >
        <div className="relative w-full">
          <TabsList className="relative w-full flex justify-start items-center gap-5 overflow-x-auto scrollbar-none">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billingAndPayments">
              Billing & Payments
            </TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="anthropometrics">Anthropometrics</TabsTrigger>
            <TabsTrigger value="workout-plan">Workout Plan</TabsTrigger>
            <TabsTrigger value="nutrition-plan">Nutrition Plan</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          <div className="absolute bottom-0 w-full h-[2px] bg-gray-100 z-0"></div>
        </div>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 container mx-auto overflow-y-auto scrollbar-none"
          value="profile"
        >
          <Profile />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="billingAndPayments"
        >
          <BillingAndPayment />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="communication"
        >
          <Communication />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="attendance"
        >
          <Attendance />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="anthropometrics"
        >
          <Anthroprometrics />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="workout-plan"
        >
          <WorkoutPlan />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="nutrition-plan"
        >
          <NutritionPlan />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="documents"
        >
          <Documents />
        </TabsContent>
        <TabsContent
          className="relative w-full h-full pb-8 px-3 py-5 overflow-y-auto scrollbar-none container mx-auto"
          value="bookings"
        >
          <Bookings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default WithAuth(ProfileIndex);
