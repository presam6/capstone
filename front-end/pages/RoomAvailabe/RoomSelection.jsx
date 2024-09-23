import React, { useContext, useState } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';
import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
  const { formData, setFormData, bookings, setBookings } = useContext(BookingContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomLists, setRoomLists] = useState([0]); // To manage multiple room selection lists
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
    return rooms.filter(room => 
      room.capacity >= formData.numberOfPeople
    );
  };

  const handleRoomSelect = (roomNumber, listIndex) => {
    const updatedSelectedRooms = [...selectedRooms];
    updatedSelectedRooms[listIndex] = roomNumber;
    setSelectedRooms(updatedSelectedRooms);
  };

  const addRoomList = () => {
    setRoomLists([...roomLists, roomLists.length]);
  };

  const confirmBooking = () => {
    if (selectedRooms.length > 0) {
      const newBookings = selectedRooms.map(roomNumber => ({
        ...formData,
        roomNumber: roomNumber,
      }));
      setBookings([...bookings, ...newBookings]);
      navigate('/calendar'); // Redirect to custom calendar page
    } else {
      alert('Please select at least one room.');
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
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
            required
            min={1}
          />
        </div>
      </form>

      <h2>Select Rooms</h2>
      {roomLists.map((listIndex) => {
        const availableRooms = getAvailableRooms();
        return (
          <div key={listIndex}>
            {availableRooms.length > 0 ? (
              <ul>
                {availableRooms.map(room => (
                  <li key={room.roomNumber} style={{ listStyle: 'none' }}>
                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                      <input
                        type="radio"
                        value={room.roomNumber}
                        checked={selectedRooms[listIndex] === room.roomNumber}
                        onChange={() => handleRoomSelect(room.roomNumber, listIndex)}
                        disabled={selectedRooms.includes(room.roomNumber)} // Disable already selected rooms
                      />
                      Room {room.roomNumber} (Capacity: {room.capacity}, Price: ₱ {room.price})
                    </label>
                    {selectedRooms.includes(room.roomNumber) && (
                      <span style={{ color: 'green' }}> - Selected</span> // Indicate selected rooms
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available rooms for the selected dates and number of people.</p>
            )}
          </div>
        );
      })}

      <button type="button" onClick={addRoomList}>Add Another Room</button>
      <button onClick={confirmBooking} disabled={selectedRooms.length === 0}>Confirm Booking</button>
    </div>
  );
};

export default RoomSelection;
