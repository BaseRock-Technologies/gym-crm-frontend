export interface Note {
  id: string;
  fromTime: string;
  toTime: string;
  employeeName: string;
  clientName: string;
  scheduleDate: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  primaryField: string;
}

