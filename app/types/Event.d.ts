interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

export interface MyCalendarProps {
  events: Event[];
}
