import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TravelContext } from "../context_api/TravelContext";
import "./AvailablePackages.css";

const AvailablePackages = () => {
  const navigate = useNavigate();
  const { tours, fetchTours } = useContext(TravelContext);

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSelectPackage = (packageId) => {
    // Navigate to book tour route and pass selectedTourId in location state
    navigate("/api/user/book", { state: { selectedTourId: packageId } });
  };

  return (
    <div className="available-packages-container">
      <h2 className="page-title">Available Tour Packages</h2>
      
      {tours.length === 0 ? (
        <div className="no-tours">
          <p>No Tour Packages are currently available. Please check back later.</p>
        </div>
      ) : (
        <div className="packages-grid">
          {tours.map((t) => (
            <div className="package-card" key={t.package_id}>
              <div className="package-badge">{t.status}</div>
              <h3 className="package-name">{t.name}</h3>
              <hr className="divider" />
              
              <div className="package-details">
                <p><b>Destination:</b> {t.destination}</p>
                <p><b>Price:</b> <span className="price-tag">${t.price}</span> / person</p>
                <p><b>Seats Left:</b> <span className="seats-tag">{t.availableseats}</span> / {t.noOfPersons}</p>
                <p><b>Duration:</b> {t.durationdays} days</p>
                <p><b>Dates:</b> {t.startDate} to {t.endDate}</p>
                {t.descripiton && (
                  <p className="package-desc"><i>{t.descripiton}</i></p>
                )}
              </div>

              <button 
                type="button" 
                className="select-book-btn" 
                onClick={() => handleSelectPackage(t.package_id)}
              >
                SELECT & BOOK
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailablePackages;
