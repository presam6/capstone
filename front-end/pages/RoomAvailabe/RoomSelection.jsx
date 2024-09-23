import React, { useContext, useState } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';
import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
  const { formData, setFormData, bookings, setBookings } = useContext(BookingContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const rooms = [
    { roomNumber: 1, capacity: 4, price: 1500 },
    { roomNumber: 2, capacity: 4, price: 1200 },
    { roomNumber: 3, capacity: 4, price: 1200 },
    { roomNumber: 4, capacity: 4, price: 1500 },
    { roomNumber: 5, capacity: 2, price: 850 },
    { roomNumber: 6, capacity: 5, price: 1800 },
    { roomNumber: 7, capacity: 7, price: 2400 },
    { roomNumber: 8, capacity: 2, price: 950 },
    { roomNumber: 9, capacity: 6, price: 2100 },
  ];

  const getAvailableRooms = () => {
    const suitableRooms = rooms.filter(room => room.capacity >= formData.numberOfPeople);

    return suitableRooms.filter(room => {
      return !bookings.some(booking => {
        const bookingCheckin = new Date(booking.checkin);
        const bookingCheckout = new Date(booking.checkout);
        return (
          booking.roomNumber === room.roomNumber &&
          ((new Date(formData.checkin) >= bookingCheckin && new Date(formData.checkin) <= bookingCheckout) ||
           (new Date(formData.checkout) >= bookingCheckin && new Date(formData.checkout) <= bookingCheckout))
        );
      });
    });
  };

  const availableRooms = getAvailableRooms();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmBooking = () => {
    if (selectedRoom) {
      const newBooking = {
        ...formData,
        roomNumber: selectedRoom,
      };
      setBookings([...bookings, newBooking]);
      navigate('/calendar'); // Redirect to custom calendar page
    } else {
      alert('Please select a room.');
    }
  };

  return (
    <div>
      <h2>Client Information</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkin">Check-in Date:</label>
          <input
            type="date"
            id="checkin"
            name="checkin"
            value={formData.checkin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkout">Check-out Date:</label>
          <input
            type="date"
            id="checkout"
            name="checkout"
            value={formData.checkout}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfPeople">Number of People Staying:</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
            min={1}
          />
        </div>
      </form>
      
      <h2>Select a Room</h2>
      {availableRooms.length > 0 ? (
        <ul>
          {availableRooms.map(room => (
            <li key={room.roomNumber}>
              <label>
                <input
                  type="radio"
                  value={room.roomNumber}
                  checked={selectedRoom === room.roomNumber}
                  onChange={() => setSelectedRoom(room.roomNumber)}
                />
                Room {room.roomNumber} (Capacity: {room.capacity}, Price: ₱ {room.price})
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available rooms for the selected dates and number of people.</p>
      )}
      <button onClick={confirmBooking} disabled={!selectedRoom}>Allocate Room</button>
    </div>
  );
};

export default RoomSelection;
