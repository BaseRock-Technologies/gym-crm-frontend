import { useState } from 'react'
import { X, GripVertical } from 'lucide-react'
import { Note } from '../types/schedule'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
  onDragStart: (e: React.DragEvent, noteId: string, currentTime: string, currentSection: number) => void;
}

export function NoteItem({ note, onDelete, onEdit, onDragStart }: NoteItemProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAlertOpen(true);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    onDragStart(e, note.id, note.time, note.section);
  };

  return (
    <>
      <div
        className="text-sm mb-1 p-2 bg-blue-50 rounded flex justify-between items-center max-w-[300px] overflow-hidden"
        onClick={handleEdit}
        draggable={isDraggable}
        onDragStart={handleDragStart}
      >
        <div className="truncate flex-1">
          <span className="font-medium">{note.primaryField}:</span> {note.title}
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsDraggable(!isDraggable);
            }}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
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
        <AlertDialogContent onClick={e => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
              Title: {note.title}<br />
              Primary Field: {note.primaryField}<br />
              Content: {note.content}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={e => e.stopPropagation()}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

