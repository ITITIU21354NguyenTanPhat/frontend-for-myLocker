import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/LockerDashboard';
import Clients from './Dashboard/Table/ClientTable';
import Profile from './Dashboard/Header/Profile';
import { useMsal } from '@azure/msal-react';

function App() {
    const { accounts } = useMsal();

    // Kiểm tra xem người dùng có đăng nhập hay chưa
    const isAuthenticated = accounts.length > 0;

    return (
        <Router>
            <Routes>
                {/* Route đăng nhập */}
                <Route path="/login" element={<Login />} />

                {/* Nếu người dùng chưa đăng nhập, chuyển hướng tới trang login */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/Lockers" /> : <Navigate to="/login" />} />

                {/* Các route bảo vệ, yêu cầu người dùng phải đăng nhập */}
                <Route path="/Lockers" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/Clients" element={isAuthenticated ? <Clients /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
