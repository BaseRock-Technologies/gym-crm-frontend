export interface Note {
  id: string;
  timeFrom: string;
  timeTo: string;
  employeeName: string;
  clientName: string;
  scheduleDate: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  primaryField: string;
}

