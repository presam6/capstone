import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookingProvider } from '../pages/BookingContext/BookingContext';
import Homepage from '../pages/HomePage/Homepage';
import RoomSelection from '../pages/RoomSelection/RoomSelection';
import CustomCalendar from '../components/CustomCalendar/CustomCalendar';

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/select-room" element={<RoomSelection />} />
          <Route path="/calendar" element={<CustomCalendar />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;
