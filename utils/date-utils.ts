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

  const formatDisplayTimeFromDate = (date: Date): string => {
    const hour24 = date.getHours();
    const minute = date.getMinutes();
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  for (let hour = 5; hour <= 23; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 23 && minute === 30) break; // Stop at 11:00 PM
      
      const baseDate = new Date(selectedDate);
      baseDate.setHours(hour, minute, 0, 0);

      const timeStr = `${baseDate.getHours().toString().padStart(2, '0')}:${baseDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      const displayTime = formatDisplayTimeFromDate(baseDate);

      const endFirstSection = new Date(baseDate);
      endFirstSection.setMinutes(endFirstSection.getMinutes() + 15);

      const endSecondSection = new Date(baseDate);
      endSecondSection.setMinutes(endSecondSection.getMinutes() + 30);

      const sections: TimeSlotSection[] = [
        {
          startTime: displayTime,
          endTime: formatDisplayTimeFromDate(endFirstSection),
        },
        {
          startTime: formatDisplayTimeFromDate(endFirstSection),
          endTime: formatDisplayTimeFromDate(endSecondSection),
        },
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
