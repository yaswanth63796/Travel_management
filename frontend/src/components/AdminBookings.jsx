import React, { useContext, useEffect } from "react";
import { TravelContext } from "../context_api/TravelContext";
import "./AdminBookings.css";

const AdminBookings = () => {
  const { bookings, fetchAllBookings } = useContext(TravelContext);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="customer-bookings-page">
      <h2 className="cb-title">Customer Bookings</h2>

      {bookings.length === 0 ? (
        <p className="cb-empty">No Bookings Placed Yet</p>
      ) : (
        <div className="cb-grid">
          {bookings.map((b) => (
            <div className="cb-card" key={b.bookingId}>
              <h4 className="cb-card-heading">Booking ID: #{b.bookingId}</h4>
              <div className="cb-card-body">
                <p><b>User ID:</b> {b.userid}</p>
                <p><b>Tour Name:</b> {b.tour?.name || "N/A"}</p>
                <p><b>Destination:</b> {b.tour?.destination || "N/A"}</p>
                <p><b>No of Persons:</b> {b.noOfPersons}</p>
                <p>
                  <b>Total Amount:</b>{" "}
                  <span className="cb-amount">
                    ${(b.totalamount || 0).toLocaleString()}
                  </span>
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      b.status === "CONFIRMED"
                        ? "cb-status confirmed"
                        : "cb-status cancelled"
                    }
                  >
                    {b.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
