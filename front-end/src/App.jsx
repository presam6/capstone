import React from 'react';
import { BookingProvider } from '../pages/BookingContext/BookingContext'// Adjust path as necessary
import Homepage from '../pages/HomePage/Homepage';
import CustomCalendar from '../components/CustomCalendar/CustomCalendar';

const App = () => {
  return (
    <BookingProvider>
      <Homepage />
      <CustomCalendar />
    </BookingProvider>
  );
};

export default App;
