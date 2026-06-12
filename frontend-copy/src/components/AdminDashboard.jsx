import { useContext, useState } from "react";
import { TravelContext } from "../context_api/TravelContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { handleCreateTour } = useContext(TravelContext);

  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [maxPersons, setMaxPersons] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const today = new Date().toISOString().split("T")[0];

  const calcDuration = (start, end) => {
    if (!start || !end) return 0;
    const diff = new Date(end) - new Date(start);
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const handleStartDateChange = (e) => {
    const val = e.target.value;
    setStartDate(val);
    if (endDate && endDate <= val) setEndDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateTour({
        name,
        destination,
        descripiton: description,
        durationdays: calcDuration(startDate, endDate),
        noOfPersons: Number(maxPersons),
        availableseats: Number(availableSeats),
        price: Number(price),
        startDate,
        endDate,
        status,
      });
      setName("");
      setDestination("");
      setDescription("");
      setMaxPersons("");
      setAvailableSeats("");
      setPrice("");
      setStartDate("");
      setEndDate("");
      setStatus("ACTIVE");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="view-complaints">
      <h2 id="heading">Admin Dashboard - Add Tour Package</h2>

      <div className="container" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div className="one" style={{ width: "400px", padding: "25px" }}>
          <h3 style={{ color: "white", textAlign: "center", marginBottom: "15px" }}>
            Create New Tour
          </h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="text"
              placeholder="Tour Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Max Capacity"
              value={maxPersons}
              onChange={(e) => setMaxPersons(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Available Seats"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={handleStartDateChange}
              required
              style={{ color: "black" }}
            />
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              required
              disabled={!startDate}
              style={{ color: "black" }}
            />
            {startDate && endDate && (
              <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                Duration: {calcDuration(startDate, endDate)} day(s)
              </p>
            )}
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <button type="submit" className="btn">
              Add Package
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
