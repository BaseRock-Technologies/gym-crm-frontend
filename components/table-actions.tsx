"use client";

import { MoreHorizontal } from "lucide-react";
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
        <Button
          variant="secondary"
          className="h-8 w-24 bg-pink-500 hover:bg-pink-600 text-white"
        >
          ACTION
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {actions.map((action) => (
          <DropdownMenuItem key={action.id} onClick={() => action.onClick(row)}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
