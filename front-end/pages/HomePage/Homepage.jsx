import React, { useState, useContext } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';

const Homepage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    checkin: '',
    checkout: '',
    roomNumber: '',
  });

  const { bookings, setBookings } = useContext(BookingContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings([...bookings, formData]);
    setFormData({
      firstName: '',
      lastName: '',
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
    </div>
  );
};

export default Homepage;
