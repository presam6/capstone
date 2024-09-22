import React, { useState, useContext } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';

const Homepage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    checkin: '',
    checkout: '',
    roomNumber: '',
    numberOfPeople: 2, // Initial base number set to 2
  });

  const { bookings, setBookings } = useContext(BookingContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePeopleChange = (operation) => {
    setFormData((prevData) => ({
      ...prevData,
      numberOfPeople:
        operation === 'subtract' && prevData.numberOfPeople > 1
          ? prevData.numberOfPeople - 1
          : operation === 'add'
          ? prevData.numberOfPeople + 1
          : prevData.numberOfPeople,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      checkin: formData.checkin,
      checkout: formData.checkout,
      roomNumber: parseInt(formData.roomNumber, 10), // Ensure room number is an integer
      numberOfPeople: formData.numberOfPeople,
    };
    setBookings([...bookings, newBooking]);
    setFormData({
      firstName: '',
      lastName: '',
      checkin: '',
      checkout: '',
      roomNumber: '',
      numberOfPeople: 2, // Reset to base number 2 after submission
    });
    console.log([...bookings, newBooking]); // Check the updated bookings
  };

  return (
    <div>
      <h2>Client Information</h2>
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
            // required
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
            <span>{formData.numberOfPeople}</span>
            <button
              type="button"
              onClick={() => handlePeopleChange('add')}
              style={{ marginLeft: '10px' }}
            >
              +
            </button>
          </div>
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Homepage;
