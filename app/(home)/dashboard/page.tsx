"use client";

import { useRef } from "react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import CalendarInput, { CalendarInputRef } from "@/components/CalendarInput";

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
} from "lucide-react";

export default function DashboardPage() {
  const calendarFromRef = useRef<CalendarInputRef>(null);
  const calendarToRef = useRef<CalendarInputRef>(null);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Activity className="h-6 w-6" />
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="New clients"
          value="0"
          icon={Users}
          color="bg-green-500"
          progress={50}
        />
        <StatCard
          title="Total collection"
          value="0"
          icon={Coins}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Expenses"
          value="0"
          icon={DollarSign}
          color="bg-pink-500"
        />
        <StatCard
          title="Total PT Collection"
          value="0"
          icon={Coins}
          color="bg-yellow-500"
        />
        <StatCard
          title="Profit/Loss"
          value="0.00"
          icon={DollarSign}
          color="bg-red-500"
        />
        <StatCard
          title="Pending Inquiry(s)"
          value="0"
          icon={MessageSquare}
          color="bg-orange-500"
        />
        <StatCard
          title="Active clients"
          value="191"
          icon={Radio}
          color="bg-emerald-500"
        />
        <StatCard
          title="Inactive clients"
          value="106"
          icon={MessageCircle}
          color="bg-blue-500"
        />
        <StatCard
          title="Booked PT Sessions"
          value="0"
          icon={Dumbbell}
          color="bg-cyan-500"
        />
        <StatCard
          title="Follow-ups"
          value="0"
          icon={UserCheck}
          color="bg-rose-500"
        />
        <StatCard
          title="Today Present Client"
          value="0"
          icon={UserCog}
          color="bg-indigo-500"
        />
        <StatCard
          title="Booked Group Class"
          value="0"
          icon={UsersRound}
          color="bg-violet-500"
        />
      </div>
    </div>
  );
}
