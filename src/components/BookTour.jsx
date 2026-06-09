import React, { useContext, useEffect, useState } from "react";
import { TravelContext } from "../context_api/TravelContext";
import './BookTour.css';
import { useNavigate, useLocation } from "react-router-dom";

const BookTour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tours, fetchTours, handleBookTour } = useContext(TravelContext);

  const savedUserId = localStorage.getItem("userId") || "1";
  
  const [userIdInput, setUserIdInput] = useState(savedUserId);
  const [name, setName] = useState("");
  const [noOfPersons, setNoOfPersons] = useState("");
  const [selectedTourId, setSelectedTourId] = useState("");
  const [bookingClass, setBookingClass] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchTours();
  }, []);

  // Set the selected tour package if redirected from Available Packages
  useEffect(() => {
    if (location.state && location.state.selectedTourId) {
      setSelectedTourId(String(location.state.selectedTourId));
    }
  }, [location.state, tours]);

  const handleMyBookings = () => {
    navigate(`/api/user/bookings/${userIdInput}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTourId) {
      alert("Please select a tour package.");
      return;
    }
    try {
      await handleBookTour(Number(selectedTourId), Number(userIdInput), Number(noOfPersons));
      setName("");
      setNoOfPersons("");
      setSelectedTourId("");
      setBookingClass("");
      setSpecialRequests("");
      setPhoneNumber("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addcomplaint">
      {/* Booking Form */}
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "15px" }}>Book Tour Package</h2>
        
        <input
          type="text"
          placeholder="User ID"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Number of Persons"
          value={noOfPersons}
          onChange={(e) => setNoOfPersons(e.target.value)}
          required
          min="1"
        />

        <select value={selectedTourId} onChange={(e) => setSelectedTourId(e.target.value)} required>
          <option value="">Select Tour Package</option>
          {tours.map((t) => (
            <option key={t.package_id} value={t.package_id}>
              {t.name} to {t.destination} (${t.price}/person)
            </option>
          ))}
        </select>

        <select value={bookingClass} onChange={(e) => setBookingClass(e.target.value)} required>
          <option value="">Select Class</option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="Premium">Premium</option>
        </select>

        <textarea
          placeholder="Special Requests / Details"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        
        <button type="submit">
          BOOK TOUR PACKAGE
        </button>

        <button type="button" onClick={handleMyBookings}>
          VIEW MY BOOKINGS
        </button>
      </form>
    </div>
  );
};

export default BookTour;
