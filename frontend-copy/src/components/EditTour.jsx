import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { TravelContext } from "../context_api/TravelContext";
import './EditTour.css';

const EditTour = () => {
  const { id } = useParams();
  const { tours, handleUpdateTour } = useContext(TravelContext);
  const navigate = useNavigate();

  const tour = tours.find(t => String(t.package_id) === String(id));

  // Edit states
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

  useEffect(() => {
    if (tour) {
      setName(tour.name || "");
      setDestination(tour.destination || "");
      setDescription(tour.descripiton || "");
      setDurationDays(tour.durationdays || "");
      setMaxPersons(tour.noOfPersons || "");
      setAvailableSeats(tour.availableseats || "");
      setPrice(tour.price || "");
      setStartDate(tour.startDate || "");
      setEndDate(tour.endDate || "");
      setStatus(tour.status || "ACTIVE");
    }
  }, [tour]);

  if (!tour) {
    return (
      <div className="complaint-details">
        <h3>Tour Package not found</h3>
        <button onClick={() => navigate("/api/admin/dashboard")}>BACK</button>
      </div>
    );
  }

  const handleUpdateClick = async () => {
    try {
      await handleUpdateTour(Number(id), {
        package_id: Number(id),
        name,
        destination,
        descripiton: description,
        durationdays: Number(durationDays),
        noOfPersons: Number(maxPersons),
        availableseats: Number(availableSeats),
        price: Number(price),
        startDate,
        endDate,
        status
      });
      navigate("/api/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate("/api/admin/dashboard");
  };

  return (
    <div className="complaint-details">
      <h2>Edit Tour Package</h2>

      <div className="info-row">
        <b>Package ID:</b>
        <span>{id}</span>
      </div>
      
      <div className="info-row">
        <b>Tour Name:</b>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Destination:</b>
        <input 
          type="text" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Duration (Days):</b>
        <input 
          type="number" 
          value={durationDays} 
          onChange={(e) => setDurationDays(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Max Capacity:</b>
        <input 
          type="number" 
          value={maxPersons} 
          onChange={(e) => setMaxPersons(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Available Seats:</b>
        <input 
          type="number" 
          value={availableSeats} 
          onChange={(e) => setAvailableSeats(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Price ($):</b>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Start Date:</b>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%", colorScheme: "dark" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>End Date:</b>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%", colorScheme: "dark" }} 
          required 
        />
      </div>

      <div className="info-row">
        <b>Description:</b>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px", borderRadius: "4px", width: "60%", minHeight: "60px", colorScheme: "dark" }} 
          required 
        />
      </div>

      <div className="status-section">
        <label><b>Status:</b></label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "6px", borderRadius: "4px" }}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <button onClick={handleUpdateClick}>Update Tour Package</button>
      <footer>
        <button onClick={handleBack}>BACK</button>
      </footer>
    </div>
  );
};

export default EditTour;
