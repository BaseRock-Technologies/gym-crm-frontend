import React from "react";

import {
  Activity,
  Users,
  Coins,
  DollarSign,
  MessageSquare,
  Radio,
  MessageCircle,
  Users2,
  Dumbbell,
  UserCheck,
  UserCog,
  UsersRound,
  Layers2,
} from "lucide-react";
import { QuickNavCard } from "@/components/dashboard/QuickNavCard";

import { useRef } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import CalendarInput, {
  CalendarInputRef,
} from "@/components/common/CalendarInput";
import { QuickNavCardWithTrigger } from "./QuickNavCardWithTrigger";
import CreateClient from "./QuickNavCardComponents/CreateClient";
import CreateFollowup from "./QuickNavCardComponents/CreateFollowup";

const QuickManage = () => {
  const calendarFromRef = useRef<CalendarInputRef>(null);
  const calendarToRef = useRef<CalendarInputRef>(null);

  return (
    <div className="relative space-y-12 pt-6 pb-8">
      <div className="flex-1 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-primary">
              <Activity className="h-6 w-6 text-primary" />
              Summary Statistics
            </h1>
            <div className="flex justify-end gap-4">
              <CalendarInput
                label="from"
                ref={calendarFromRef}
                placeholder="from"
                defaultToToday={true}
              />
              <CalendarInput
                label="to"
                ref={calendarToRef}
                placeholder="to"
                defaultToToday={true}
              />
              <div className="relative flex justify-center items-end">
                <Button className="bg-primary hover:bg-primary/90 outline-none border-none">
                  APPLY
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <StatCard
            title="New clients"
            value="0"
            icon={Users}
            iconColor="text-green-500"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Total collection"
            value="0"
            icon={Coins}
            iconColor="text-purple-500"
            bgColor="bg-purple-100"
          />
          <StatCard
            title="Total Expenses"
            value="0"
            icon={DollarSign}
            iconColor="text-pink-500"
            bgColor="bg-pink-100"
          />
          <StatCard
            title="Total PT Collection"
            value="0"
            icon={Coins}
            iconColor="text-yellow-500"
            bgColor="bg-yellow-100"
          />
          <StatCard
            title="Profit/Loss"
            value="0.00"
            icon={DollarSign}
            iconColor="text-red-500"
            bgColor="bg-red-100"
          />
          <StatCard
            title="Pending Inquiry(s)"
            value="0"
            icon={MessageSquare}
            iconColor="text-orange-500"
            bgColor="bg-orange-100"
          />
          <StatCard
            title="Active clients"
            value="191"
            icon={Radio}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-100"
          />
          <StatCard
            title="Inactive clients"
            value="106"
            icon={MessageCircle}
            iconColor="text-blue-500"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Booked PT Sessions"
            value="0"
            icon={Dumbbell}
            iconColor="text-cyan-500"
            bgColor="bg-cyan-100"
          />
          <StatCard
            title="Follow-ups"
            value="0"
            icon={UserCheck}
            iconColor="text-rose-500"
            bgColor="bg-rose-100"
          />
          <StatCard
            title="Today Present Client"
            value="0"
            icon={UserCog}
            iconColor="text-indigo-500"
            bgColor="bg-indigo-100"
          />
          <StatCard
            title="Booked Group Class"
            value="0"
            icon={UsersRound}
            iconColor="text-violet-500"
            bgColor="bg-violet-100"
          />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-primary">
              <Layers2 className="h-6 w-6 text-primary" />
              Quick Shortcuts
            </h1>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <QuickNavCard
            title="Create Walk in"
            icon={Users}
            iconColor="text-green-500"
            bgColor="bg-green-100"
            linkTo="/manage-query"
          />
          <QuickNavCardWithTrigger
            title="Create Client"
            icon={Users}
            iconColor="text-purple-500"
            bgColor="bg-purple-100"
            linkTo="/manage-customers"
          />
          <QuickNavCardWithTrigger
            title="Create Client Follow-up"
            icon={Users}
            iconColor="text-pink-500"
            bgColor="bg-pink-100"
            linkTo="/manage-query"
            contentClassName="p-0"
            dialogContent={<CreateFollowup />}

          />
          <QuickNavCard
            title="Create POS Bill"
            icon={Users}
            iconColor="text-yellow-500"
            bgColor="bg-yellow-100"
            linkTo="/pos"
          />
          <QuickNavCard
            title="Create Booking"
            icon={Users}
            iconColor="text-red-500"
            bgColor="bg-red-100"
            linkTo="/gym-bill"
          />
          <QuickNavCard
            title="Add Training Plan"
            icon={Users}
            iconColor="text-orange-500"
            bgColor="bg-orange-100"
            linkTo="/personal-training-bill"
          />
          <QuickNavCard
            title="Add Diet Plan"
            icon={Users}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-100"
            linkTo="/client-forms"
          />
          {/* <QuickNavCard
            title="Send bulk SMS"
            icon={Users}
            iconColor="text-blue-500"
            bgColor="bg-blue-100"
            linkTo="/dashboard"
          /> */}

        </div>
      </div>
    </div>
  );
};

export default QuickManage;
