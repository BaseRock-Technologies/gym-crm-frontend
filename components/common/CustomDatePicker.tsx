"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

export default function DatePickerField({ value, onChange, placeholder }: Props) {
  return (
    <div className="w-full custom-datepicker">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="MMM dd, yyyy"        // Sep 22, 2025
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        calendarClassName="rounded-lg border shadow-md p-2"
        popperClassName="z-50"
      />
    </div>
  );
}
