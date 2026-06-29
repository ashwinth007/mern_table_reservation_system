import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaEnvelope, FaPhone } from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reservations/");
      setBookings(res.data.reservations);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <p className="booking-ui-loading">Loading bookings...</p>
    );
  }

  return (
    <section className="booking-ui-section">
      <div className="booking-ui-container">
        <div className="booking-ui-heading">
          <h1>All Bookings</h1>
          <p>View your reservations with details like name, contact info, date, time, and status.</p>
        </div>
        <div className="booking-ui-grid">
          {bookings.map((b) => (
            <div className="booking-ui-card" key={b._id}>
              <h3>{b.firstName} {b.lastName}</h3>
              <p><FaEnvelope className="booking-ui-icon" /> {b.email}</p>
              <p><FaPhone className="booking-ui-icon" /> {b.phone}</p>
              <p><FaCalendarAlt className="booking-ui-icon" /> {b.date}</p>
              <p><FaClock className="booking-ui-icon" /> {b.time}</p>
              <span className={`booking-ui-status ${getStatusColor(b.status)}`}>
                {b.status || "Booked"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bookings;