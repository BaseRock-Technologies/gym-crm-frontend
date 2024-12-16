import DailySchedule from "@/components/daily-schedule";

const TodaySchedule = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Daily Schedule</h1>
      <DailySchedule />
    </div>
  );
};

export default TodaySchedule;
