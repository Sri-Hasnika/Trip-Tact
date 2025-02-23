
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Dashboard = () => {
  const [trips, setTrips] = useState([]); // Initialize trips as an empty array

  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        // Ensure the response data is an array before setting the trips
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.error('Expected an array of trips, but got:', response.data);
          setTrips([]); // Fallback to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Failed to fetch trips', error);
        setTrips([]); // Fallback to an empty array on error
      }
    };

    fetchTrips();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/trips/new" className="btn-primary">
          Create New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <motion.div
              key={trip.tripId} // Ensure tripId exists in the response
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip[2]}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{trip.location}</span>
                  </div>
                  {/* Assuming you calculate or fetch collaborators separately */}
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    <span>{trip.description ? `${trip.description}` : 'No description'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No trips found</p> // Display message if no trips exist
        )}
      </div>
    </div>
  );
};

export default Dashboard;
