import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
}: StatCardProps) {
  return (
    <div className={`relative rounded-lg bg-white p-6 py-8 shadow-sm`}>
      <div className="flex items-center gap-4">
        <div className={`rounded-full ${bgColor} p-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}
