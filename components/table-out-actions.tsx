"use client";

import Link from "next/link";
import type { OutOfActionsConfig } from "../types/table";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TableOutOfActionsProps {
  actions: OutOfActionsConfig[];
  row: any;
}

export function TableOutOfActions({ actions, row }: TableOutOfActionsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {actions &&
        actions.map((action) => {
          switch (action.type) {
            case "link":
              return (
                <Button key={action.id}>
                  <Link
                    className={cn("gap-1 no-underline", action.customClass)}
                    key={action.id}
                    href={action.href}
                  >
                    {action.icon && <action.icon />}
                    {action.label}
                  </Link>
                </Button>
              );

            case "button":
              if (action.btnType === "icon") {
                return (
                  <Button
                    key={action.id}
                    size="icon"
                    onClick={() => action.onClick(row)}
                    className={cn(
                      "gap-1 bg-primary rounded-full p-2",
                      action.customClass
                    )}
                  >
                    <action.icon className="text-white w-4 h-4" />
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={action.id}
                    onClick={() => action.onClick(row)}
                    className={cn("gap-1", action.customClass)}
                  >
                    {action.label}
                  </Button>
                );
              }

            default:
              return null;
          }
        })}
    </div>
  );
}
