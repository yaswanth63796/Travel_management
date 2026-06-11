import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TravelContext } from "../context_api/TravelContext";
import "./AdminHotels.css";

const TAGS = ["Eco Friendly", "Solitary", "Easily Accessible", "Family Friendly", "Budget", "Luxury"];

const AdminHotels = () => {
    const navigate = useNavigate();
    const { hotels, fetchAllHotels, handleAddHotel, handleDeleteHotel } = useContext(TravelContext);

    const [hotelName, setHotelName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("Budget");
    const [pricePerPerson, setPricePerPerson] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        fetchAllHotels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleAddHotel({
                hotelName, location, description, tag,
                pricePerPerson: Number(pricePerPerson),
                imageUrl, contactNumber, available
            });
            setHotelName(""); setLocation(""); setDescription("");
            setTag("Budget"); setPricePerPerson("");
            setImageUrl(""); setContactNumber(""); setAvailable(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-hotels-container">
            <h2>Hotel Management</h2>

            {/* Add Hotel Form */}
            <div className="add-hotel-form">
                <h3>Add New Hotel</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Hotel Name" value={hotelName} onChange={(e) => setHotelName(e.target.value)} required />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <select value={tag} onChange={(e) => setTag(e.target.value)} required>
                        {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="number" placeholder="Price Per Person" value={pricePerPerson} onChange={(e) => setPricePerPerson(e.target.value)} required />
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                    <label>
                        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                        &nbsp;Available
                    </label>
                    <button type="submit">Add Hotel</button>
                </form>
            </div>

            {/* Hotels List */}
            <div className="hotels-grid">
                {hotels.length === 0 ? (
                    <p>No hotels added yet.</p>
                ) : (
                    hotels.map((h) => (
                        <div className="hotel-card" key={h.hotelId}>
                            <h4>{h.hotelName}</h4>
                            <p><b>Location:</b> {h.location}</p>
                            <p><b>Tag:</b> {h.tag}</p>
                            <p><b>Price/Person:</b> ${h.pricePerPerson}</p>
                            <p><b>Contact:</b> {h.contactNumber}</p>
                            <p><b>Available:</b> <span className={h.available ? "available-yes" : "available-no"}>{h.available ? "Yes" : "No"}</span></p>
                            <div className="hotel-card-actions">
                                <button className="btn-edit" onClick={() => navigate(`/api/admin/hotels/edit/${h.hotelId}`)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDeleteHotel(h.hotelId)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminHotels;
