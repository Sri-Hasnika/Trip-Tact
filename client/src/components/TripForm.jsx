import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useTripStore from '../store/tripStore';
import axios from 'axios';

const TripForm = () => {
  const navigate = useNavigate();
  const addTrip = useTripStore((state) => state.addTrip);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    budget: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get today's date in the YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Validate the start and end dates
    if (formData.startDate < today) {
      toast.error('Start date cannot be in the past.');
      return;
    }
    if (formData.endDate < formData.startDate) {
      toast.error('End date cannot be before the start date.');
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('User not logged in. Please login again.');
      return;
    }

    const token = JSON.parse(user).token;

    try {
      const response = await axios.post(
        'http://localhost:8000/api/trips',
        {
          title: formData.title,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location,
          description: formData.description,
          budget: formData.budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Trip created successfully!');
        navigate('/trips');
      }
    } catch (error) {
      console.error('Error creating trip:', error.response || error.message);
      toast.error(error.response?.data?.error || 'Failed to create trip');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 pt-20"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create New Trip</h2>
        <p className="text-gray-500 mt-2">Fill in the details to plan your next adventure</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="E.g. Summer Vacation in Italy"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="E.g. Rome, Italy"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Purpose</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="radio"
                id="business"
                name="purpose"
                value="business"
                checked={formData.description === 'business'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="hidden peer"
                required
              />
              <label 
                htmlFor="business" 
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <span className="font-medium">Business</span>
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="leisure"
                name="purpose"
                value="leisure"
                checked={formData.description === 'leisure'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="hidden peer"
              />
              <label 
                htmlFor="leisure" 
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <span className="font-medium">Leisure</span>
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="other"
                name="purpose"
                value="other"
                checked={formData.description === 'other'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="hidden peer"
              />
              <label 
                htmlFor="other" 
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <span className="font-medium">Other</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 mt-8">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/trips')}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Create Trip
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default TripForm;