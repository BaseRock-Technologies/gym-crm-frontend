import { useState } from "react";
import { X } from "lucide-react";
import { Note } from "../types/schedule";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export function NoteItem({ note, onDelete, onEdit }: NoteItemProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAlertOpen(true);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <>
      <div
        className="text-sm mb-1 p-2 bg-blue-50 rounded flex justify-between items-center max-w-[300px] overflow-hidden"
        onClick={handleEdit}
      >
        <div className="truncate flex-1">
          <span className="font-medium">{note.employeeName}:</span>{" "}
          {note.clientName}
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this note?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Employee Name: {note.employeeName}
              <br />
              Client Name: {note.clientName}
              <br />
              Schedule Date: {note.scheduleDate}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
