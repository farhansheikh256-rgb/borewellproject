import React from 'react';
import BookingForm from '../components/Booking/BookingForm';
import ContactInfo from '../components/Contact/ContactInfo';

export default function BookService() {
  return (
    <div>
      <div className="py-5 text-center" style={{ background: 'var(--surface-2)', paddingTop: '120px' }}>
        <div className="container">
          <h1 className="section-title">Book a Service</h1>
          <p className="section-subtitle mb-0">Fill out the form below and our team will get back to you shortly.</p>
        </div>
      </div>
      
      <div className="py-5">
        <div className="container booking-layout">
          <div>
            <BookingForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
