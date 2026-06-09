import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/TravelApi';
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [role, setRole] = useState("USER");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser({ name, email, gender, role, password });
            
            // Save email mappings in local storage for later retrieval (User ID and role)
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");
            registeredUsers[email] = {
                id: res.data.id,
                role: res.data.role,
                name: res.data.name
            };
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

            setMessage(`Signup successful! Your User ID is ${res.data.id}. Redirecting to login...`);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div className='signup'>
            <h2>Signup</h2>
            {message && <p className="message" style={{ color: "green", marginBottom: "15px" }}>{message}</p>}
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <select value={gender} onChange={(e) => setGender(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;