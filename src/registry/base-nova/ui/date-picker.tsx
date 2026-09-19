"use client";

import { CalendarIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { Button } from "@/registry/base-nova/ui/button";
import { Calendar } from "@/registry/base-nova/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/base-nova/ui/popover";

type DatePickerProps = {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  locale?: ComponentProps<typeof Calendar>["locale"];
};

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  id,
  locale,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className="min-w-48 justify-start"
          />
        }
      >
        <CalendarIcon aria-hidden="true" />
        {value ? value.toLocaleDateString(locale?.code, { dateStyle: "long" }) : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" aria-label="Choose a date">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          locale={locale}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, type DatePickerProps };
