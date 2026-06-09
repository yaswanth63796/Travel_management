import React, { createContext, useState } from "react";
import {
  getAllTours,
  addBooking,
  getBookingsByUser,
  getAllBookings,
  addTour,
  updateTour
} from "../api/TravelApi";

export const TravelContext = createContext();

const TravelContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch all available packages
  const fetchTours = async () => {
    try {
      const res = await getAllTours();
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setTours([]);
    }
  };

  // Create a new booking
  const handleBookTour = async (packageId, userId, noOfPersons) => {
    try {
      const res = await addBooking(packageId, userId, noOfPersons);
      alert("Booking Confirmed Successfully!!");
      return res.data;
    } catch (err) {
      console.error("Error booking tour:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to book tour";
      alert(`Booking Failed: ${errorMsg}`);
      throw err;
    }
  };

  // Fetch all bookings for a user
  const fetchUserBookings = async (userId) => {
    if (!userId) return;
    try {
      const res = await getBookingsByUser(userId);
      setBookings(res.data);
      setShow(true);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      setBookings([]);
    }
  };

  // Fetch all bookings (Admin dashboard)
  const fetchAllBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching all bookings:", err);
      setBookings([]);
    }
  };

  // Add a new tour package (Admin)
  const handleCreateTour = async (tourObj) => {
    try {
      const res = await addTour(tourObj);
      alert("Tour Package Created Successfully!!");
      fetchTours();
      return res.data;
    } catch (err) {
      console.error("Error creating tour package:", err);
      alert("Failed to create tour package");
      throw err;
    }
  };

  // Update a tour package (Admin)
  const handleUpdateTour = async (packageId, tourObj) => {
    try {
      const res = await updateTour(packageId, tourObj);
      alert("Tour Package Updated Successfully!!");
      fetchTours();
      return res.data;
    } catch (err) {
      console.error("Error updating tour package:", err);
      alert("Failed to update tour package");
      throw err;
    }
  };

  return (
    <TravelContext.Provider
      value={{
        show,
        setShow,
        tours,
        setTours,
        bookings,
        setBookings,
        fetchTours,
        handleBookTour,
        fetchUserBookings,
        fetchAllBookings,
        handleCreateTour,
        handleUpdateTour
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export default TravelContextProvider;
