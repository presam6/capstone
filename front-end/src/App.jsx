import React from 'react';
import { BookingProvider } from '../pages/BookingContext/BookingContext';
import Homepage from './Homepage';
import Calendar from './Calendar';

const App = () => {
  return (
    <BookingProvider>
      <Homepage />
      <Calendar />
    </BookingProvider>
  );
};

export default App;
