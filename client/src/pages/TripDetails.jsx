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
  PhotoIcon,
  ShareIcon,
  PencilIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const TripDetails = () => {
  const { tripId } = useParams();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/trips/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("selectedTrip from trip details", response.data[0]);
        setSelectedTrip(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Failed to load trip details.');
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-indigo-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-indigo-700 font-medium text-lg">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-red-50 to-white p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops!</h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!selectedTrip) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Trip Not Found</h3>
          <p className="text-gray-600 mb-8">We couldn't find the adventure you're looking for.</p>
          <button 
            onClick={() => window.history.back()} 
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Budget', icon: CurrencyDollarIcon, component: <Budget trip={selectedTrip} /> },
    { name: 'Itinerary', icon: CalendarIcon, component: <ItineraryTab selectedTrip={selectedTrip} /> },
  ];

  // Calculate trip duration
  const startDate = new Date(selectedTrip.startDate);
  const endDate = new Date(selectedTrip.endDate);
  const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white pb-16">
      {/* Header section with blur effect and gradient overlay */}
      <div className="relative bg-indigo-600 h-48 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/path-to-travel-pattern.png')] opacity-10"></div>
        
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center text-white hover:text-indigo-100 mb-4 transition-colors group"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Trips</span>
          </motion.button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 relative z-10">
        {/* Trip Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{selectedTrip.title}</h1>
                <div className="flex items-center space-x-2 text-gray-500">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{selectedTrip.location || 'Location not specified'}</span>
                </div>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {durationInDays} {durationInDays === 1 ? 'day' : 'days'}
                </span>
                
                <button className="p-2 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-all text-indigo-700">
                  <ShareIcon className="h-5 w-5" />
                </button>
                
                <button className="p-2 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-all text-indigo-700">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 mb-2">
              <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trip Dates</h3>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {formatDate(selectedTrip.startDate)} - {formatDate(selectedTrip.endDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Destination</h3>
                  <p className="mt-1 text-base font-medium text-gray-900">{selectedTrip.location || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600">
                    <MdOutlineDescription className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About</h3>
                  <p className="mt-1 text-base text-gray-700 line-clamp-2">{selectedTrip.description || 'No description'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-white shadow-lg p-1.5 mb-6 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `w-full flex items-center justify-center py-3.5 px-5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      selected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="border-b border-gray-200">
                    <div className="px-6 py-4 md:px-8 md:py-5 flex items-center justify-between">
                      <h2 className="text-lg md:text-xl font-medium text-gray-900 flex items-center">
                        <tab.icon className="h-5 w-5 mr-2 text-indigo-600" />
                        {tab.name} Details
                      </h2>
                      <div className="flex items-center space-x-2">
                        {tab.name === 'Budget' && (
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    {tab.component}
                  </div>
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TripDetails;