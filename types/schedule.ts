export interface Note {
  id: string;
  time: string;
  section: number; // 0 or 1 for first or second 15-min section
  date: string;
  primaryField: string;
  content: string;
  title: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  primaryField: string;
}

