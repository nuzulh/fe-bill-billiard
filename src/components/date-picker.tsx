import { startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { useState } from "react";

export function DatePicker({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date>(startOfDay(new Date()));

  const handleDateChange = (date: Date) => {
    setDate(startOfDay(date));
    onDateChange(startOfDay(date));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDate(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(x) => handleDateChange(x ?? new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
