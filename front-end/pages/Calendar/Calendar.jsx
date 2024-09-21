import React, { useContext } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingContext } from './BookingContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const { bookings } = useContext(BookingContext);

  // Map bookings to events format required by react-big-calendar
  const events = bookings.map((booking, index) => ({
    title: `Room ${booking.roomNumber} Booking`,
    start: new Date(booking.checkin),
    end: new Date(booking.checkout),
    allDay: true,
  }));

  return (
    <div>
      <h2>Booking Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calendar;