import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.error('Expected an array of trips, but got:', response.data);
          setTrips([]);
        }
      } catch (error) {
        console.error('Failed to fetch trips', error);
        setTrips([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Decorative Element */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 pr-4"
            >
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Trips</h1>
              <p className="text-gray-500 mt-2">Manage and explore your travel plans</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 pl-4"
            >
              <Link 
                to="/trips/new" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Trip
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8 grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Trips</p>
            <p className="mt-1 text-3xl font-semibold text-indigo-600">{trips.length}</p>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <p className="text-sm font-medium text-gray-500">Upcoming</p>
            <p className="mt-1 text-3xl font-semibold text-indigo-600">
              {trips.filter(trip => new Date(trip.startDate) > new Date()).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Past Trips</p>
            <p className="mt-1 text-3xl font-semibold text-indigo-600">
              {trips.filter(trip => new Date(trip.endDate) < new Date()).length}
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : trips.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trips.map((trip) => (
              <motion.div
                key={trip.tripId}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{trip[2]}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="text-sm">
                        {new Date(trip.startDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })} - {new Date(trip.endDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="text-sm">{trip.location || 'Location not specified'}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-600">
                      <UserGroupIcon className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" />
                      <span className="text-sm line-clamp-2">{trip.description ? trip.description : 'No description'}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <Link 
                      to={`/trips/${trip.tripId}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-12 rounded-xl shadow-md text-center"
          >
            <div className="mx-auto w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No trips found</h3>
            <p className="text-gray-500 mb-6">Start your journey by creating your first trip!</p>
            <Link 
              to="/trips/new" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create a Trip
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;