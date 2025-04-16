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
    <div className="flex items-center py-20 justify-center min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-100">
      <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-indigo-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="relative mx-auto md:mx-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=transparent&color=fff&size=128`}
                alt="Profile Avatar"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">{user.name}</h2>
            <p className="text-indigo-600 flex items-center justify-center md:justify-start gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-indigo-100">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-500 mb-1">Full Name</p>
            <p className="font-medium text-indigo-900">{user.name}</p>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-indigo-100">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-500 mb-1">Email Address</p>
            <p className="font-medium text-indigo-900">{user.email}</p>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-xl hover:shadow-md transition-shadow duration-300 border border-indigo-100">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-500 mb-1">Account Status</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="font-medium text-indigo-900">Active</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
          
          <button
            className="w-full py-3 px-4 bg-white border border-indigo-200 text-indigo-700 font-medium rounded-xl shadow-sm hover:bg-indigo-50 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;