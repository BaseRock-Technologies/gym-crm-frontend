"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NoteItem } from "./note-item";
import { DynamicForm } from "./dynamic-form";
import {
  generateTimeSlots,
  formatDate,
  TimeSlot,
  TimeSlotSection,
} from "../utils/date-utils";
import type { Note, NoteFormData } from "../types/schedule";
import { FormConfig, GroupedSelectOption } from "@/types/form";
import { post, updateFormConfigOptions } from "@/lib/helper/steroid";

interface TimeSlotSectionProps {
  timeSlot: TimeSlot;
  section: TimeSlotSection;
  sectionIndex: number;
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onClick: () => void;
  maxNotes?: number;
}

const getForm = (
  fromDate: string,
  toDate: string,
  date: Date,
  clients: Record<string, any[]>,
  trainers: Record<string, any[]>
): FormConfig => {
  const formConfig: FormConfig = {
    id: "daily-schedule",
    groups: [
      {
        id: "defailt-info",
        title: "Primary Information",
        type: "default",
        fields: ["trainerName", "clientName", "timeFrom", "timeTo", "date"],
      },
    ],
    fields: [
      {
        name: "trainerName",
        label: "Trainer",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select Trainer Name",
      },
      {
        name: "clientName",
        label: "Client",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select Client Name",
      },
      {
        name: "timeFrom",
        label: "Time From",
        type: "time",
        placeholder: "choose time from",
        editable: false,
        defaultValue: fromDate,
      },
      {
        name: "timeTo",
        label: "Time To",
        type: "time",
        placeholder: "choose time to",
        editable: false,
        defaultValue: toDate,
      },
      {
        name: "date",
        label: "Date",
        type: "date",
        placeholder: "choose date",
        editable: false,
        defaultValue: Math.floor(date.getTime() / 1000),
      },
    ],
  };
  updateFormConfigOptions(formConfig, "trainerName", trainers, "employeeName");
  updateFormConfigOptions(formConfig, "clientName", clients, "clientName");
  console.log(formConfig);
  return formConfig;
};

function TimeSlotSectionComponent({
  timeSlot,
  section,
  sectionIndex,
  notes,
  onNoteClick,
  onDeleteNote,
  onClick,
  maxNotes = 5,
}: TimeSlotSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleNotes = expanded ? notes : notes.slice(0, maxNotes);
  const hasMoreNotes = notes.length > maxNotes;

  return (
    <div
      className={`h-full p-2 ${
        sectionIndex === 0 ? "border-b" : ""
      } last:border-r-0`}
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [client, setClient] = useState<Record<string, any[]>>();
  const [trainer, setTrainer] = useState<Record<string, any[]>>();

  const timeSlots = generateTimeSlots(selectedDate);

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

  const handleTimeSlotClick = (time: string, sectionIndex: number) => {
    setSelectedTime(time);
    setSelectedSection(sectionIndex);
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  const handleNoteSubmit = (formData: Record<string, any>) => {
    if ((!selectedTime || selectedSection === null) && !editingNote) return;

    const currentDate = formatDate(selectedDate);
    const selectedSlot = timeSlots.find((slot) => slot.time === selectedTime);

    if (!selectedSlot && !editingNote) return;

    if (editingNote) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                trainerName: formData.employeeName,
                clientName: formData.clientName,
                fromTime: formData.timeFrom,
                toTime: formData.timeTo,
                scheduleDate: formData.date,
              }
            : note
        )
      );
    } else {
      // Create new note with timestamps
      const section = selectedSlot!.sections[selectedSection!];
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        employeeName: formData.employeeName,
        clientName: formData.clientName,
        fromTime: formData.timeFrom,
        toTime: formData.timeTo,
        scheduleDate: formData.date,
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

  const getNotesForTimeSlot = (time: string, sectionIndex: number) => {
    const selectedSlot = timeSlots.find((slot) => slot.time === time);
    if (!selectedSlot) return [];

    const section = selectedSlot.sections[sectionIndex];
    return notes.filter(
      (note) =>
        note.scheduleDate === formatDate(selectedDate) &&
        note.fromTime === section.startTime &&
        note.toTime === section.endTime
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clients
        const clientRes = await post(
          {},
          "others/clients/list",
          "Failed to fetch clients"
        );
        if (clientRes.status === "success" && clientRes.data) {
          setClient(clientRes.data);
        }

        // Fetch trainers
        const trainerRes = await post(
          {},
          "others/employee/list",
          "Failed to fetch trainers"
        );
        if (trainerRes.status === "success" && trainerRes.data) {
          setTrainer(trainerRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="default" onClick={handlePreviousDay}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
        <Button variant="default" onClick={handleNextDay}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="border rounded-lg divide-y bg-white">
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
            <DialogTitle className="p-6 bg-primary text-white rounded-t-lg shadow-none">
              {editingNote ? "Edit Schedule" : "Add Schedule"}
            </DialogTitle>
          </DialogHeader>
          {selectedTime && selectedSection !== null && (
            <DynamicForm
              config={getForm(
                timeSlots.find((slot) => slot.time === selectedTime)?.sections[
                  selectedSection
                ].startTime || "",
                timeSlots.find((slot) => slot.time === selectedTime)?.sections[
                  selectedSection
                ].endTime || "",
                selectedDate,
                client as Record<string, any[]>,
                trainer as Record<string, any[]>
              )}
              storeFormValues={handleNoteSubmit}
              submitBtnText={editingNote ? "Update Schedule" : "Add Schedule"}
              initialData={
                editingNote
                  ? {
                      employeeName: editingNote.employeeName,
                      clientName: editingNote.clientName,
                      timeFrom: editingNote.fromTime,
                      timeTo: editingNote.toTime,
                      date: Math.floor(selectedDate.getTime() / 1000),
                    }
                  : undefined
              }
              apiData={null}
              resetOnSubmit={true}
              shouldFlex={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
