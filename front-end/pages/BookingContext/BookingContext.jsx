// BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({}); // Add form data state here

  return (
    <BookingContext.Provider value={{ bookings, setBookings, formData, setFormData }}>
      {children}
    </BookingContext.Provider>
  );
};
