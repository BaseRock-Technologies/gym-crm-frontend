export interface TimeSlotSection {
  startTime: string; // Formatted time string (e.g., "5:00 AM")
  endTime: string;   // Formatted time string (e.g., "5:15 AM")
}

export interface TimeSlot {
  time: string;
  displayTime: string;
  sections: TimeSlotSection[];
}

export function generateTimeSlots(selectedDate: Date = new Date()): TimeSlot[] {
  const slots: TimeSlot[] = [];

  for (let hour = 5; hour <= 23; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 23 && minute === 30) break; // Stop at 11:00 PM
      
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
      
      // Create date objects for the selected date with specific times
      const baseDate = new Date(selectedDate);
      baseDate.setHours(hour, minute, 0, 0);
      
      // Create two 15-minute sections with formatted time strings
      const sections: TimeSlotSection[] = [
        {
          startTime: displayTime,
          endTime: `${hour % 12 || 12}:${(minute + 15).toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
        },
        {
          startTime: `${hour % 12 || 12}:${(minute + 15).toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`,
          endTime: `${hour % 12 || 12}:${(minute + 30).toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
        }
      ];

      slots.push({
        time: timeStr,
        displayTime,
        sections
      });
    }
  }
  return slots;
}

export  const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}


export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  
  return date.toLocaleDateString('en-US', options).replace(',', '');
};


export const formatTime = (timestamp: number): string => {
  if (!timestamp) {
      return "-";
  }
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  const updatedHour = hours ? String(hours).padStart(2, '0') : '12';

  return `${updatedHour}:${minutes}:${seconds} ${ampm}`;
};
