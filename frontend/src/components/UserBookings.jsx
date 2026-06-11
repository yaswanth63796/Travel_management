import "./UserBookings.css"
import React, { useContext, useEffect } from "react";
import { TravelContext } from "../context_api/TravelContext";
import { useNavigate, useParams } from "react-router-dom";

const UserBookings = () => {
  const nav = useNavigate();
  const { rollNo } = useParams(); // rollNo maps to userId in route

  const { bookings, show, fetchUserBookings } = useContext(TravelContext);

  useEffect(() => {
    if (rollNo) {
      fetchUserBookings(Number(rollNo));
    }
  }, [rollNo]);

  const handleBack = () => {
    nav("/api/user/book");
  };

  return (
    <div className="view-complaints">
      <h2>Bookings of User ID: {rollNo}</h2>

      {show && bookings.length === 0 && (
        <p>No bookings found</p>
      )}

      {show &&
        bookings.map((b) => (
          <div key={b.bookingId} className="complaint-card">
            <p><b>Booking ID:</b> {b.bookingId}</p>
            <p><b>Tour Name:</b> {b.tour?.name || "N/A"}</p>
            <p><b>Destination:</b> {b.tour?.destination || "N/A"}</p>
            <p><b>No of Persons:</b> {b.noOfPersons}</p>
            <p><b>Total Price:</b> ${b.totalamount}</p>
            <p><b>Status:</b> {b.status}</p>
          </div>
        ))}
      <footer>
        <button onClick={handleBack}>BACK</button>
      </footer>
    </div>
  );
};

export default UserBookings;
