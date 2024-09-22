import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from '../pages/BookingContext/BookingContext'; // Adjust path as necessary
import Homepage from '../pages/HomePage/Homepage';
import CustomCalendar from '../components/CustomCalendar/CustomCalendar';

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/calendar" element={<CustomCalendar />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;
