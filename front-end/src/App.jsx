import React from 'react';
import { BookingProvider } from '../pages/BookingContext/BookingContext';
import Homepage from '../pages/HomePage/Homepage';
import Calendar from '../pages/Calendar/Calendar';

const App = () => {
  return (
    <BookingProvider>
      <Homepage />
      <Calendar />
    </BookingProvider>
  );
};

export default App;
