'use client';

import 'react-calendar/dist/Calendar.css';
import Nav from './components/Nav';
import MyCalendar from './components/Cal';

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}

const events: Event[] = [
  {
    id: 'event-1',
    title: 'Event 1',
    start: '2023-05-04T00:00:00',
    end: '2023-05-04T23:59:59',
    color: 'aqua',
  },
  {
    id: 'event-2',
    title: 'Event 2',
    start: '2023-05-05T00:00:00',
    end: '2023-05-05T23:59:59',
    color: 'aqua',
  },
];

function Home() {
  return (
    <>
      <Nav />
      <MyCalendar events={events} />
    </>
  );
}

export default Home;
