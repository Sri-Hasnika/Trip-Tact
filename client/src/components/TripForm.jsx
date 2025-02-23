
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Trip Title</label>
          <input
            type="text"
            className="input-field"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="input-field"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="input-field"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="input-field"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Budget</label>
          <input
            type="number"
            className="input-field"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose</label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                id="business"
                name="purpose"
                value="business"
                checked={formData.description === 'business'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
              />
              <label htmlFor="business" className="text-sm text-gray-700">Business</label>
            </div>
            <div>
              <input
                type="radio"
                id="leisure"
                name="purpose"
                value="leisure"
                checked={formData.description === 'leisure'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
              />
              <label htmlFor="leisure" className="text-sm text-gray-700">Leisure</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="purpose"
                value="other"
                checked={formData.description === 'other'}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
              />
              <label htmlFor="other" className="text-sm text-gray-700">Other</label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/trips')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Trip
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TripForm;
