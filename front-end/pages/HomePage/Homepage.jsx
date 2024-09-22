import React, { useState, useContext } from 'react';
import { BookingContext } from '../BookingContext/BookingContext';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { setFormData } = useContext(BookingContext);
  const navigate = useNavigate();

  const [formDataLocal, setFormDataLocal] = useState({
    firstName: '',
    lastName: '',
    checkin: '',
    checkout: '',
    numberOfPeople: 2, // Initial base number set to 2
  });

  const handleChange = (e) => {
    setFormDataLocal({
      ...formDataLocal,
      [e.target.name]: e.target.value,
    });
  };

  const handlePeopleChange = (operation) => {
    setFormDataLocal((prevData) => ({
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
    setFormData(formDataLocal); // Update formData in context
    navigate('/calendar'); 
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
            value={formDataLocal.firstName}
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
            value={formDataLocal.lastName}
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
            value={formDataLocal.checkin}
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
            value={formDataLocal.checkout}
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
            <span>{formDataLocal.numberOfPeople}</span>
            <button
              type="button"
              onClick={() => handlePeopleChange('add')}
              style={{ marginLeft: '10px' }}
            >
              +
            </button>
          </div>
        </div>
        <button type="submit">Find Room</button>
      </form>
    </div>
  );
};

export default Homepage;
