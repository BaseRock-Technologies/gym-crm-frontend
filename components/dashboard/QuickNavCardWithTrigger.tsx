"use client";

import { useState } from "react";
import { TypeIcon as type, LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface QuickNavCardWithTriggerProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  dialogContent: React.JSX.Element;
  contentClassName?: string;
}

export function QuickNavCardWithTrigger({
  title,
  icon: Icon,
  iconColor,
  bgColor,
  dialogContent,
  contentClassName,
}: QuickNavCardWithTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`relative rounded-lg bg-white p-6 py-4 shadow-sm cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <div className="flex justify-start items-center gap-4">
            <div className={`rounded-full p-3 ${bgColor}`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <span className="text-sm text-secondary">{title}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        {title && (
          <DialogTitle className="p-6 bg-primary text-white">
            {title}
          </DialogTitle>
        )}
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
