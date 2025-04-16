import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusIcon, FunnelIcon, CalendarIcon, MapPinIcon, DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import TripCard from '../components/TripCard';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  // Helper to check if a trip is upcoming
  const isUpcoming = (startDate) => {
    return new Date(startDate) > new Date();
  };

  // Format date with options
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          My Trips
          <span className="ml-3 text-sm font-medium bg-indigo-100 text-indigo-800 py-1 px-2.5 rounded-full">
            {trips.length}
          </span>
        </h1>
        <Link 
          to="/trips/new" 
          className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Trip
        </Link>
      </div>

      {/* Search and Filter Options */}
      <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center min-w-[180px]">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-no-repeat"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Trips</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Display Filtered Trips */}
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <motion.div
                  key={trip.tripId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Link 
                    to={`/trips/${trip.tripId}`}
                    className="block h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className={`h-2 w-full ${isUpcoming(trip.startDate) ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{trip.title}</h3>
                        <span 
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            isUpcoming(trip.startDate) 
                              ? 'bg-indigo-100 text-indigo-600' 
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isUpcoming(trip.startDate) ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                          <span className="line-clamp-1">{trip.location}</span>
                        </div>
                        {trip.description && (
                          <div className="flex items-center text-gray-600">
                            <DocumentTextIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                            <span className="line-clamp-1 capitalize">{trip.description}</span>
                          </div>
                        )}
                        {trip.budget && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="font-medium text-gray-900">
                              Budget: <span className="text-indigp-600">${trip.budget}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <CalendarIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No trips found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter</p>
              <Link 
                to="/trips/new" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Trip
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Trips;