'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';

import { MyCalendarProps } from '../types/Event';

function MyCalendar({ events }: MyCalendarProps) {
  const [date, setDate] = useState<[Date, Date] | Date>(new Date());

  return (
    <div className="app">
      <div className="calendar-container"></div>
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={true}
        tileContent={({ date: tileDate, view }) => {
          const cellEvents = events.filter(
            (event) =>
              event.start <= tileDate.toISOString() &&
              event.end > tileDate.toISOString()
          );

          if (view === 'month' && cellEvents.length > 0) {
            return (
              <>
                <div
                  style={{
                    backgroundColor: events[0].color,
                    borderColor: events[0].color,
                    borderRadius: '50%',
                    width: '3px',
                    height: '3px',
                    margin: 'auto',
                  }}
                ></div>
              </>
            );
          }
          return null;
        }}
      />

      {Array.isArray(date) && date.length > 0 ? (
        <p className="text-center">
          <span className="bold">Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">Current Date/Time:</span> {date.toString()}
        </p>
      )}
    </div>
  );
}

export default MyCalendar;
