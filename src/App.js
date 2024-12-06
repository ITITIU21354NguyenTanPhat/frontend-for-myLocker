import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/LockerDashboard';
import Clients from './Dashboard/Table/ClientTable';
import Profile from './Dashboard/Header/Profile';  

// Hàm PrivateRoute component để kiểm tra trạng thái đăng nhập
const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" />} />  {/*navigate về login nếu không đăng nhập */}
                
                {/* Các route bảo vệ, yêu cầu người dùng phải đăng nhập */}
                <Route path="/Lockers" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/Clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
