import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    roomNumber: '',
  });

  const [bookings, setBookings] = useState(() => {
    // Retrieve bookings from local storage, if they exist
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    // Update local storage whenever bookings change
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the current form data to the bookings array
    setBookings([...bookings, formData]);
    // Optionally, clear the form after submission
    setFormData({
      checkin: '',
      checkout: '',
      roomNumber: '',
    });
  };

  return (
    <div>
      <h2>Book Your Stay</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>

      <h3>Your Bookings:</h3>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            Room {booking.roomNumber} from {booking.checkin} to {booking.checkout}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
