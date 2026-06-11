import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TravelContext } from "../context_api/TravelContext";
import '../components/EditTour.css';


const TAGS = ["Eco Friendly", "Solitary", "Easily Accessible", "Family Friendly", "Budget", "Luxury"];

const EditHotel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hotels, handleUpdateHotel } = useContext(TravelContext);

    const hotel = hotels.find(h => String(h.hotelId) === String(id));

    const [hotelName, setHotelName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("Budget");
    const [pricePerPerson, setPricePerPerson] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        if (hotel) {
            setHotelName(hotel.hotelName || "");
            setLocation(hotel.location || "");
            setDescription(hotel.description || "");
            setTag(hotel.tag || "Budget");
            setPricePerPerson(hotel.pricePerPerson || "");
            setImageUrl(hotel.imageUrl || "");
            setContactNumber(hotel.contactNumber || "");
            setAvailable(hotel.available ?? true);
        }
    }, [hotel]);

    if (!hotel) {
        return (
            <div>
                <h3>Hotel not found</h3>
                <button onClick={() => navigate("/api/admin/hotels")}>Back</button>
            </div>
        );
    }

    const handleSubmit = async () => {
        try {
            await handleUpdateHotel(Number(id), {
                hotelName, location, description, tag,
                pricePerPerson: Number(pricePerPerson),
                imageUrl, contactNumber, available
            });
            navigate("/api/admin/hotels");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="complaint-details">
            <h2>Edit Hotel</h2>
            <div className="info-row"><b>Hotel ID:</b><span>{id}</span></div>
            <div className="info-row">
                <b>Hotel Name:</b>
                <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Location:</b>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Description:</b>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Tag:</b>
                <select value={tag} onChange={(e) => setTag(e.target.value)}>
                    {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="info-row">
                <b>Price/Person:</b>
                <input type="number" value={pricePerPerson} onChange={(e) => setPricePerPerson(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Image URL:</b>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Contact:</b>
                <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div className="info-row">
                <b>Available:</b>
                <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
            </div>
            <button onClick={handleSubmit}>Update Hotel</button>
            <footer>
                <button onClick={() => navigate("/api/admin/hotels")}>Back</button>
            </footer>
        </div>
    );
};

export default EditHotel;
