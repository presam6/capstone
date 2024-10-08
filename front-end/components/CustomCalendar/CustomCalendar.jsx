import React, { useContext, useState } from 'react';
import { BookingContext } from '../../pages/BookingContext/BookingContext';
import EventDetailsModal from '../EventDetailsModal/EventDetailsModal';
import '../../styles/CustomCalendar/CustomCalendar.css';

const CustomCalendar = () => {
  const { bookings } = useContext(BookingContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const updateMonth = (increment) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1);
    setCurrentDate(newDate);
  };

  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const getBookingForRoomAndDay = (roomNumber, day) => {
    return bookings.find(booking => {
      const checkinDate = new Date(booking.checkin);
      const checkoutDate = new Date(booking.checkout);
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

      // Ensure the check-in time is at the start of the day (midnight)
      checkinDate.setHours(0, 0, 0, 0);
      // Ensure the check-out time is at the end of the day (before midnight)
      checkoutDate.setHours(23, 59, 59, 999);

      // Check if the current day falls between the check-in and check-out dates (inclusive)
      return (
        booking.roomNumber === roomNumber &&
        currentDay >= checkinDate && 
        currentDay <= checkoutDate
      );
    });
  };

  const handleCellClick = (roomNumber, day) => {
    const booking = getBookingForRoomAndDay(roomNumber, day);
    if (booking) {
      setSelectedEvent({
        ...booking,
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1),
      });
    }
  };

  return (
    <div className="custom-calendar">
      <div className="calendar-controls">
        <button onClick={() => updateMonth(-1)}>Previous Month</button>
        <span>{currentMonth}</span>
        <button onClick={() => updateMonth(1)}>Next Month</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            {[...Array(9)].map((_, index) => (
              <th key={index}>Room {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(daysInMonth)].map((_, day) => (
            <tr key={day}>
              <td>{day + 1}</td>
              {[...Array(9)].map((_, room) => {
                const booking = getBookingForRoomAndDay(room + 1, day + 1);
                return (
                  <td
                    key={room}
                    className={booking ? 'booked' : ''}
                    onClick={() => handleCellClick(room + 1, day + 1)}
                  >
                    {booking ? `${booking.lastName}, ${booking.firstName[0]}. (${booking.numberOfPeople})` : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default CustomCalendar;
