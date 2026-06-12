import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import AdminDashboard from './components/AdminDashboard'
import TravelContextProvider from './context_api/TravelContext' 
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Navbar from './components/Navbar'
import UserBookings from './components/UserBookings'
import EditTour from './components/EditTour'
import BookTour from './components/BookTour'
import AvailablePackages from './components/AvailablePackages'
import AdminBookings from './components/AdminBookings'
import AdminHotels from './components/AdminHotels'
import EditHotel from './components/EditHotels'

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (token && role && userId && email) {
      return { token, role, userId, email };
    }
    return null;
  });
  const navigate = useNavigate();

  return (
    <TravelContextProvider>
      <div className={user ? "app-layout" : "app-layout-full"}>
        {user && <Navbar user={user} setUser={setUser} />}
        <div className={user ? "main-content" : "main-content-full"}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/api/admin/dashboard"
              element={user && user.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/api/admin/edit-tour/:id"
              element={user && user.role === "ADMIN" ? <EditTour /> : <Navigate to="/login" />}
            />
            <Route
              path="/api/admin/bookings"
              element={user && user.role === "ADMIN" ? <AdminBookings /> : <Navigate to="/login" />}
            />
            <Route
                path="/api/admin/hotels"
                element={user && user.role === "ADMIN" ? <AdminHotels /> : <Navigate to="/login" />}
            />
            <Route
                path="/api/admin/hotels/edit/:id"
                element={user && user.role === "ADMIN" ? <EditHotel /> : <Navigate to="/login" />}
            />
            <Route
              path="/api/user/book"
              element={user && user.role === "USER" ? <BookTour /> : <Navigate to="/login" />}
            />
            <Route
              path="/api/user/packages"
              element={user && user.role === "USER" ? <AvailablePackages /> : <Navigate to="/login" />}
            />
            <Route 
              path="/api/user/bookings/:rollNo" 
              element={user && user.role === "USER" ? <UserBookings /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </TravelContextProvider>
  )
}

export default App
