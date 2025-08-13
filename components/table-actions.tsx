"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActionConfig,
  ActionWithAlert,
  ActionWithDialog,
} from "../types/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ButtonDialogTrigger } from "@/components/common/ButtonDialogTrigger";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface TableActionsProps {
  actions: ActionConfig[];
  row: any;
}

export function TableActions({ actions, row }: TableActionsProps) {
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    action?: ActionWithAlert;
  }>({ open: false });
  const isDialogAction = (action: ActionConfig): action is ActionWithDialog => {
    return (action as any).dialogTrigger === true;
  };

  const isAlertAction = (action: ActionConfig): action is ActionWithAlert => {
    return (action as any).alertTrigger === true;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="h-8 w-24">
          ACTION
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {actions.map((action) =>
          isDialogAction(action) ? (
            <DropdownMenuItem key={action.id} asChild>
              <ButtonDialogTrigger
                title={action.dialogTitle || action.label}
                triggerClassName="w-full justify-start"
                dialogContent={action.dialogContent(row)}
                isDialog={true}
              />
            </DropdownMenuItem>
          ) : isAlertAction(action) ? (
            <DropdownMenuItem
              key={action.id}
              onSelect={() => {
                setTimeout(() => setConfirmState({ open: true, action }), 0);
              }}
            >
              {action.icon && <action.icon />}
              {action.label}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={action.id}
              onSelect={() => {
                action.onClick && action.onClick(row);
              }}
            >
              {action.icon && <action.icon />}
              {action.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
      {confirmState.action && (
        <AlertDialog
          open={confirmState.open}
          onOpenChange={(open) => setConfirmState((s) => ({ ...s, open }))}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {confirmState.action.alertTitle}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmState.action.alertDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => {
                  confirmState.action?.onClick?.(row);
                  setConfirmState({ open: false });
                }}
              >
                {confirmState.action.alertAction}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DropdownMenu>
  );
}
