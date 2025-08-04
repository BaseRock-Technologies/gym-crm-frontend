"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionConfig } from "../types/table";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

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
          <DropdownMenuItem key={action.id} asChild>
            {action.alertTrigger ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    data-radix-collection-item
                    data-orientation="vertical"
                    role="menuitem"
                    className="relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-white hover:bg-primary hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 flex flex-row gap-1 cursor-pointer"
                  >
                    {action.icon && <action.icon />}
                    {action.label}
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{action.alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {action.alertDescription}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500"
                      onClick={() => action.onClick(row)}
                    >
                      {action.alertAction}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div
                className="flex flex-row gap-1 cursor-pointer"
                onClick={() => action.onClick(row)}
              >
                {action.icon && <action.icon />}
                {action.label}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
