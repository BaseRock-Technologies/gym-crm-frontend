"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface ButtonDialogTriggerProps {
  title: string;
  triggerClassName?: string;
  dialogContent: React.JSX.Element;
  contentClassName?: string;
  isDialog?: boolean;
}

export function ButtonDialogTrigger({
  title,
  triggerClassName,
  dialogContent,
  contentClassName,
  isDialog,
}: ButtonDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  let triggerClass =
    "sm:h-9 cursor-pointer sm:px-4 sm:py-2 h-7 px-3 py-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-white shadow hover:bg-primary/90 sm:text-base";
  if (isDialog) {
    triggerClass =
      "relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-white hover:bg-primary hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 flex flex-row gap-1 cursor-pointer";
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(triggerClass, triggerClassName)}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <span>{title}</span>
        </div>
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        {title && (
          <DialogTitle className="p-6 bg-primary text-white rounded-t-lg shadow-none">
            {title}
          </DialogTitle>
        )}
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
