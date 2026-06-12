import React, { useContext, useEffect, useState } from "react";
import { TravelContext } from "../context_api/TravelContext";
import './BookTour.css';
import { useNavigate, useLocation } from "react-router-dom";
import { getHotelsByLocation } from "../api/TravelApi";

const BookTour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tours, fetchTours, handleBookTour } = useContext(TravelContext);

  const userId = localStorage.getItem("userId");

  const [noOfPersons, setNoOfPersons] = useState("");
  const [selectedTourId, setSelectedTourId] = useState("");
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => { fetchTours(); }, []);

  useEffect(() => {
    if (location.state?.selectedTourId) {
      setSelectedTourId(String(location.state.selectedTourId));
    }
  }, [location.state]);

  // Fetch hotels for the selected tour's destination
  useEffect(() => {
    if (!selectedTourId) { setHotels([]); setSelectedHotelId(""); return; }
    const tour = tours.find(t => String(t.package_id) === String(selectedTourId));
    if (tour?.destination) {
      getHotelsByLocation(tour.destination)
        .then(res => setHotels(res.data.filter(h => h.available)))
        .catch(() => setHotels([]));
    }
    setSelectedHotelId("");
  }, [selectedTourId, tours]);

  // Recalculate total price whenever relevant fields change
  useEffect(() => {
    if (!selectedTourId || !noOfPersons) { setTotalPrice(null); return; }
    const tour = tours.find(t => String(t.package_id) === String(selectedTourId));
    const hotel = hotels.find(h => String(h.hotelId) === String(selectedHotelId));
    if (tour) {
      const price = (tour.price + (hotel ? hotel.pricePerPerson : 0)) * Number(noOfPersons);
      setTotalPrice(price);
    }
  }, [selectedTourId, selectedHotelId, noOfPersons, tours, hotels]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTourId) { alert("Please select a tour package."); return; }
    try {
      await handleBookTour(
        Number(selectedTourId),
        Number(userId),
        Number(noOfPersons),
        selectedHotelId ? Number(selectedHotelId) : null
      );
      setNoOfPersons("");
      setSelectedTourId("");
      setSelectedHotelId("");
      setHotels([]);
      setTotalPrice(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addcomplaint">
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "15px" }}>Book Tour Package</h2>

        <select value={selectedTourId} onChange={(e) => setSelectedTourId(e.target.value)} required>
          <option value="">Select Tour Package</option>
          {tours.map((t) => (
            <option key={t.package_id} value={t.package_id}>
              {t.name} — {t.destination} (₹{t.price}/person)
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Number of Persons"
          value={noOfPersons}
          onChange={(e) => setNoOfPersons(e.target.value)}
          required
          min="1"
        />

        {selectedTourId && (
          <select value={selectedHotelId} onChange={(e) => setSelectedHotelId(e.target.value)}>
            <option value="">No Hotel (Skip)</option>
            {hotels.length === 0
              ? <option disabled>No hotels available for this destination</option>
              : hotels.map((h) => (
                  <option key={h.hotelId} value={h.hotelId}>
                    {h.hotelName} — {h.tag} (₹{h.pricePerPerson}/person)
                  </option>
                ))
            }
          </select>
        )}

        {totalPrice !== null && (
          <p style={{ color: "#34d399", fontWeight: "bold", textAlign: "center", margin: "5px 0" }}>
            Estimated Total: ₹{totalPrice.toLocaleString()}
          </p>
        )}

        <button type="submit">BOOK TOUR PACKAGE</button>
        <button type="button" onClick={() => navigate(`/api/user/bookings/${userId}`)}>
          VIEW MY BOOKINGS
        </button>
      </form>
    </div>
  );
};

export default BookTour;
