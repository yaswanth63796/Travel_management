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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (endDate < startDate) {
        alert("End date cannot be before start date.");
        return;
      }
      const duration = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      await handleCreateTour({
        name,
        destination,
        descripiton: description,
        durationdays: duration,
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
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate && e.target.value > endDate) setEndDate("");
              }}
              required
              style={{ color: "black" }}
            />
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              required
              style={{ color: "black" }}
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
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
