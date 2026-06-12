import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// Auth
export const registerUser = (userObj) => api.post("/public/register", userObj);

// Tours
export const getAllTours = () => api.get("/user/get");
export const addTour = (tourObj) => api.post("/admin/add", tourObj);
export const updateTour = (packageId, tourObj) => api.put(`/admin/update/${packageId}`, tourObj);

// Bookings
export const addBooking = (packageId, userId, noOfPersons, hotelId) => {
  return api.post(`/user/add/${packageId}`, null, {
    params: { userid: userId, noOfPersons, hotelId },
  });
};
export const getBookingsByUser = (userId) => api.get(`/user/getbooks/${userId}`);
export const getAllBookings = () => api.get("/admin/getbooks");

// Hotels
export const getAllHotels = () => api.get("/admin/hotels");
export const addHotel = (hotelObj) => api.post("/admin/hotels/add", hotelObj);
export const updateHotel = (hotelId, hotelObj) => api.put(`/admin/hotels/${hotelId}`, hotelObj);
export const deleteHotel = (hotelId) => api.delete(`/admin/hotels/${hotelId}`);
export const getHotelsByLocation = (location) => api.get("/user/hotels", { params: { location } });

export default api;
