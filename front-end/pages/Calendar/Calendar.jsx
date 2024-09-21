import React, { useContext, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BookingContext } from '../BookingContext/BookingContext';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal'; // Import the modal component

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
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Map bookings to events format required by react-big-calendar
  const events = bookings.map((booking, index) => ({
    title: `${booking.lastName}, ${booking.firstName[0]}. - Room ${booking.roomNumber}`,
    start: new Date(booking.checkin),
    end: new Date(booking.checkout),
    allDay: true,
    ...booking, // Include all booking details in the event object
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <h2>Event Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent} // Handle event selection
      />
      <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
};

export default Calendar;
