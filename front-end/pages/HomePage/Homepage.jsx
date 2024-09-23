import React, { useState, useContext } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    checkin: '',
    checkout: '',
    numberOfPeople: 4, // Initial base number set to 4
  });

  const { setFormData: setBookingFormData } = useContext(BookingContext);
  const navigate = useNavigate();

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
    setBookingFormData(formData);
    navigate('/select-room'); // Redirect to room selection page
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
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Homepage;
