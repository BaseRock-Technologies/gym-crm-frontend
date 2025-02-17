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
                <Button key={action.id} className="">
                  <Link
                    className={cn("gap-1 no-underline", action.customClass)}
                    key={action.id}
                    href={
                      action.getLinkFrom
                        ? action.additionalHref
                          ? `${action.additionalHref}/${
                              row[action.getLinkFrom]
                            }`
                          : row[action.getLinkFrom]
                        : action.href
                    }
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
                      `gap-1 bg-primary flex justify-center items-center ${
                        action.showLabel ? "rounded-md" : "rounded-full"
                      }  p-2`,
                      action.customClass
                    )}
                  >
                    <action.icon className="text-white w-4 h-4" />
                  </Button>
                );
              } else if (action.btnType === "btn") {
                return (
                  <Button
                    key={action.id}
                    onClick={() => action.onClick(row)}
                    className={cn("gap-1", action.customClass)}
                  >
                    {action.label}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={action.id}
                    size="icon"
                    onClick={() => action.onClick(row)}
                    className={cn(
                      `w-fit gap-1 bg-primary flex justify-center items-center ${
                        action.showLabel ? "rounded-md" : "rounded-full"
                      }  py-2 px-3`,
                      action.customClass
                    )}
                  >
                    <action.icon className="text-white w-4 h-4" />
                    {action.showLabel && action.label}
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
