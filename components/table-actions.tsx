"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionConfig } from "../types/table";

interface TableActionsProps {
  actions: ActionConfig[];
  row: any;
}

export function TableActions({ actions, row }: TableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="h-8 w-24">
          ACTION
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {actions.map((action) => (
          <DropdownMenuItem key={action.id} onClick={() => action.onClick(row)}>
            <div className="flex flex-row gap-1">
              {action.icon && <action.icon />}
              {action.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
