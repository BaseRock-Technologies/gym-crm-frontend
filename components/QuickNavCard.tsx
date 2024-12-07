import { type LucideIcon } from "lucide-react";

interface QuickNavCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export function QuickNavCard({
  title,
  icon: Icon,
  iconColor,
  bgColor,
}: QuickNavCardProps) {
  return (
    <div
      className={`relative rounded-lg bg-white p-6 py-4 shadow-sm ${bgColor}`}
    >
      <div className="flex justify-center items-center space-y-4">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
