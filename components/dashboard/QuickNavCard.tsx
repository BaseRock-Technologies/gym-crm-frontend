import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickNavCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  linkTo: string;
}

export function QuickNavCard({
  title,
  icon: Icon,
  iconColor,
  bgColor,
  linkTo,
}: QuickNavCardProps) {
  return (
    <Link
      href={linkTo}
      className={`relative rounded-lg bg-white p-6 py-4 shadow-sm cursor-pointer`}
    >
      <div className="flex justify-start items-center gap-4">
        <div className={`rounded-full p-3 ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <span className="text-sm text-secondary">{title}</span>
      </div>
    </Link>
  );
}
