import React from 'react';

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  console.log(event);  

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: 'white', 
      color: 'black',
      padding: '20px', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' 
    }}>
      <h3>Room Details</h3>
      <p><strong>Name:</strong> {event.firstName} {event.lastName}</p>
      <p><strong>Room Number:</strong> {event.roomNumber}</p>
      <p><strong>Check-in Date:</strong> {event.start.toLocaleDateString()}</p>
      <p><strong>Check-out Date:</strong> {event.end.toLocaleDateString()}</p>
      <p><strong>Number of People Staying:</strong> {event.numberOfPeople}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventDetailsModal;
