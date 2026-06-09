import { useContext, useState } from "react";
import { TravelContext } from "../context_api/TravelContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { handleCreateTour } = useContext(TravelContext);

  const [packageId, setPackageId] = useState("");
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [maxPersons, setMaxPersons] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateTour({
        package_id: Number(packageId),
        name,
        destination,
        descripiton: description,
        durationdays: Number(durationDays),
        noOfPersons: Number(maxPersons),
        availableseats: Number(availableSeats),
        price: Number(price),
        startDate,
        endDate,
        status,
      });
      setPackageId("");
      setName("");
      setDestination("");
      setDescription("");
      setDurationDays("");
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
              type="number"
              placeholder="Package ID"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              required
            />
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
              placeholder="Duration (Days)"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
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
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={{ color: "black" }}
            />
            <input
              type="date"
              value={endDate}
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
