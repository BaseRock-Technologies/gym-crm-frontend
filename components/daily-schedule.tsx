"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NoteForm } from "./note-form";
import { NoteItem } from "./note-item";
import {
  generateTimeSlots,
  formatDate,
  TimeSlot,
  TimeSlotSection,
} from "../utils/date-utils";
import type { Note, NoteFormData } from "../types/schedule";

interface TimeSlotSectionProps {
  timeSlot: TimeSlot;
  section: TimeSlotSection;
  sectionIndex: number;
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onDragStart: (
    e: React.DragEvent,
    noteId: string,
    currentTime: string,
    currentSection: number
  ) => void;
  onDrop: (e: React.DragEvent, time: string, section: number) => void;
  onClick: () => void;
  maxNotes?: number;
}

function TimeSlotSectionComponent({
  timeSlot,
  section,
  sectionIndex,
  notes,
  onNoteClick,
  onDeleteNote,
  onDragStart,
  onDrop,
  onClick,
  maxNotes = 5,
}: TimeSlotSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleNotes = expanded ? notes : notes.slice(0, maxNotes);
  const hasMoreNotes = notes.length > maxNotes;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e, timeSlot.time, sectionIndex);
  };

  return (
    <div
      className={`h-full p-2 ${
        sectionIndex === 0 ? "border-b" : ""
      } border-r last:border-r-0`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="flex flex-wrap gap-2">
        {visibleNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
            onEdit={onNoteClick}
            onDragStart={onDragStart}
          />
        ))}
      </div>
      {hasMoreNotes && !expanded && (
        <Button
          variant="link"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          className="ml-auto block"
        >
          {notes.length - maxNotes} more
        </Button>
      )}
    </div>
  );
}

export default function DailySchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const timeSlots = generateTimeSlots();

  const handlePreviousDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const handleTimeSlotClick = (time: string, section: number) => {
    setSelectedTime(time);
    setSelectedSection(section);
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  const handleNoteSubmit = (formData: NoteFormData) => {
    if ((!selectedTime || selectedSection === null) && !editingNote) return;

    const currentDate = formatDate(selectedDate);
    const noteTime = editingNote ? editingNote.time : selectedTime!;
    const noteSection = editingNote ? editingNote.section : selectedSection!;

    if (editingNote) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...note, ...formData } : note
        )
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        date: currentDate,
        time: noteTime,
        section: noteSection,
        ...formData,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setIsDialogOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsDialogOpen(true);
  };

  const handleDragStart = (
    e: React.DragEvent,
    noteId: string,
    currentTime: string,
    currentSection: number
  ) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ noteId, currentTime, currentSection })
    );
  };

  const handleDrop = useCallback(
    (e: React.DragEvent, newTime: string, newSection: number) => {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { noteId, currentTime, currentSection } = data;

      if (currentTime !== newTime || currentSection !== newSection) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId
              ? { ...note, time: newTime, section: newSection }
              : note
          )
        );
        console.log(
          `Note moved to ${newTime} - ${
            newSection === 0 ? "First" : "Second"
          } Half`
        );
      }
    },
    []
  );

  const getNotesForTimeSlot = (time: string, section: number) => {
    return notes.filter(
      (note) =>
        note.date === formatDate(selectedDate) &&
        note.time === time &&
        note.section === section
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={handlePreviousDay}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
        <Button variant="outline" onClick={handleNextDay}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg divide-y">
        {timeSlots.map((slot) => (
          <div
            key={slot.time}
            className="grid grid-cols-[100px_1fr] hover:bg-gray-50/50"
          >
            <div
              className={`p-3 border-r text-sm text-gray-500 ${
                getNotesForTimeSlot(slot.time, 0).length > 0 ||
                getNotesForTimeSlot(slot.time, 1).length > 0
                  ? "bg-accent/50"
                  : ""
              }`}
            >
              {slot.displayTime}
            </div>
            <div className="grid grid-rows-2">
              {slot.sections.map((section, index) => (
                <TimeSlotSectionComponent
                  key={`${slot.time}-${index}`}
                  timeSlot={slot}
                  section={section}
                  sectionIndex={index}
                  notes={getNotesForTimeSlot(slot.time, index)}
                  onNoteClick={handleEditNote}
                  onDeleteNote={handleDeleteNote}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                  onClick={() => handleTimeSlotClick(slot.time, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>
              {editingNote
                ? "Edit Note"
                : `Add Note for ${
                    selectedTime
                      ? `${
                          timeSlots.find((slot) => slot.time === selectedTime)
                            ?.displayTime
                        } - ${selectedSection === 0 ? "First" : "Second"} Half`
                      : "All Day"
                  }`}
            </DialogTitle>
          </DialogHeader>
          <NoteForm
            onSubmit={handleNoteSubmit}
            initialData={
              editingNote
                ? {
                    title: editingNote.title,
                    content: editingNote.content,
                    primaryField: editingNote.primaryField,
                  }
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
