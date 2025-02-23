
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // Initialize the user from localStorage if available
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'), // Set true if user exists in localStorage

  // Login function
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    set({ user: userData, isAuthenticated: true });
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
