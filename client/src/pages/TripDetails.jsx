import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import ItineraryTab from '../components/ItineraryTab';
import Budget from '../components/Budget';
import { MdOutlineDescription } from "react-icons/md";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const TripDetails = () => {
  const { tripId } = useParams(); // Get the tripId from URL
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  useEffect(() => {
    // Fetch trip details from backend
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/trips/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("selectedTrip from trip details",response.data[0]);
        setSelectedTrip(response.data[0]); // Assuming the response is an array with one trip object
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Failed to load trip details.');
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]); // Correct dependency array

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  if (!selectedTrip) {
    return <p>Trip not found.</p>; // Show if no trip is found
  }

  const tabs = [
    
    { name: 'Budget', icon: CurrencyDollarIcon, component: <Budget trip={selectedTrip} /> },
    { name: 'Itinerary', icon: CalendarIcon, component: <ItineraryTab selectedTrip={selectedTrip} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTrip.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{new Date(selectedTrip.startDate).toLocaleDateString()} - {new Date(selectedTrip.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{selectedTrip.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MdOutlineDescription className="h-5 w-5 mr-2" />
            <span>{selectedTrip.description}</span>
          </div>
        </div>
      </motion.div>

      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 bg-white p-1 rounded-lg shadow-md mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex-1 flex items-center justify-center py-3 px-4 rounded-md focus:outline-none ${
                    selected
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {tab.component}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TripDetails;

