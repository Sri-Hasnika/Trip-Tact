import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import TripCard from '../components/TripCard';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);  // Log the response data to verify the structure
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.error('Expected an array of trips, but got:', response.data);
          setTrips([]); // Handle unexpected response structure
        }
      } catch (error) {
        console.error('Failed to fetch trips', error);
        setTrips([]); // Fallback to empty array on error
      }
    };

    fetchTrips();
  }, [token]);

  // Filter trips based on search and filter criteria
  const filteredTrips = trips.filter((trip) => {
    const title = trip.title?.toLowerCase() || '';  // Use optional chaining to handle undefined values
    const location = trip.location?.toLowerCase() || '';  // Use optional chaining to handle undefined values
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || location.includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    if (filter === 'upcoming') return matchesSearch && new Date(trip.startDate) > new Date();
    if (filter === 'past') return matchesSearch && new Date(trip.endDate) < new Date();
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <Link to="/trips/new" className="btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Trip
        </Link>
      </div>

      {/* Search and Filter Options */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search trips..."
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <select
            className="input-field"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Trips</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {/* Display Filtered Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <motion.div
              key={trip.tripId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Link to={`/trips/${trip.tripId}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>{trip.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>{trip.description ? trip.description : 'No description'}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No trips found</p>
        )}
      </div>
    </div>
  );
};

export default Trips;
