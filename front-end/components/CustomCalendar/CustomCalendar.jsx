import React, { useContext, useState } from 'react';
import { BookingContext } from '../../pages/BookingContext/BookingContext';
import EventDetailsModal from '../EventDetailsModal/EventDetailsModal'; // Adjust the path if necessary
import '../../styles/CustomCalendar/CustomCalendar.css'; 

const CustomCalendar = () => {
  const { bookings, setBookings, formData } = useContext(BookingContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [localFormData, setLocalFormData] = useState(formData);
  const [roomNumber, setRoomNumber] = useState(''); // State for room number

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
      return (
        booking.roomNumber === roomNumber &&
        day >= checkinDate.getDate() &&
        day <= checkoutDate.getDate() &&
        checkinDate.getMonth() === currentDate.getMonth() &&
        checkinDate.getFullYear() === currentDate.getFullYear()
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

  const handleChange = (e) => {
    setLocalFormData({
      ...localFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePeopleChange = (operation) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      numberOfPeople:
        operation === 'subtract' && prevData.numberOfPeople > 1
          ? prevData.numberOfPeople - 1
          : operation === 'add'
          ? prevData.numberOfPeople + 1
          : prevData.numberOfPeople,
    }));
  };

  const handleAddBooking = () => {
    const newBooking = {
      ...localFormData,
      roomNumber: parseInt(roomNumber, 10),
    };
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="custom-calendar">
      <h3>Booking Details</h3>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={localFormData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={localFormData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="checkin">Check-in Date:</label>
        <input
          type="date"
          id="checkin"
          name="checkin"
          value={localFormData.checkin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="checkout">Check-out Date:</label>
        <input
          type="date"
          id="checkout"
          name="checkout"
          value={localFormData.checkout}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="roomNumber">Room Number:</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numberOfPeople">Number of People Staying:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handlePeopleChange('subtract')}
            style={{ marginRight: '10px' }}
          >
            -
          </button>
          <span>{localFormData.numberOfPeople}</span>
          <button
            type="button"
            onClick={() => handlePeopleChange('add')}
            style={{ marginLeft: '10px' }}
          >
            +
          </button>
        </div>
      </div>
      <button onClick={handleAddBooking}>Add Booking</button>

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
              {[...Array(9)].map((_, room) => (
                <td
                  key={room}
                  onClick={() => handleCellClick(room + 1, day + 1)} // Room numbers start from 1
                >
                  {getBookingForRoomAndDay(room + 1, day + 1) ? 'Booked' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};

export default CustomCalendar;
