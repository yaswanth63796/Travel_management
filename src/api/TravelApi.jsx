import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Request interceptor to automatically attach Basic Auth token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth & Signup
export const registerUser = (userObj) => api.post("/public/register", userObj);

// Tours
export const getAllTours = () => api.get("/user/get");
export const addTour = (tourObj) => api.post("/admin/add", tourObj);
export const updateTour = (packageId, tourObj) => api.put(`/admin/update/${packageId}`, tourObj);

// Bookings
export const addBooking = (packageId, userId, noOfPersons) => {
  return api.post(`/user/add/${packageId}`, null, {
    params: { userid: userId, noOfPersons: noOfPersons },
  });
};
export const getBookingsByUser = (userId) => api.get(`/user/getbooks/${userId}`);
export const getAllBookings = () => api.get("/admin/getbooks");

export default api;
