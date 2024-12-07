import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  progress?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  progress = 100,
}: StatCardProps) {
  return (
    <div className="relative rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`rounded-full ${color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full ${color.replace("bg-", "bg-")} transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
