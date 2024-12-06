import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}; // Lấy thông tin user từ localStorage

  return (
    <div className="profile-container p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
