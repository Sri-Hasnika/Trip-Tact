import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-200">
      <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="text-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=128`}
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full mx-auto shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="space-y-5 text-left">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-700">Full Name</h3>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-700">Email Address</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
