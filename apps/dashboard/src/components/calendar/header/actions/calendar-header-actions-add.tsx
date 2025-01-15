import { Button } from "@optima/ui/button";
import { CalendarAdd01Icon } from "hugeicons-react";
import { Plus } from "lucide-react";
import { useCalendarContext } from "../../calendar-context";

export default function CalendarHeaderActionsAdd() {
  const { setNewEventDialogOpen } = useCalendarContext();
  return (
    <Button onClick={() => setNewEventDialogOpen(true)}>
      <CalendarAdd01Icon strokeWidth={2} size={18} />
      Create Event
    </Button>
  );
}
