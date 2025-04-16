import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const ItineraryTab = ({ selectedTrip }) => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    time: '',
    description: '',
  });
  const token = JSON.parse(localStorage.getItem('user')).token;

  const addActivity = async () => {
    if (newActivity.time && newActivity.description) {
      const activity = { time: newActivity.time, description: newActivity.description };
      try {
        await postActivities(activity);
        fetchActivities(); // Refresh activities after adding a new one
        setNewActivity({ time: '', description: '' });
      } catch (err) {
        console.error("Error adding activity:", err.message);
      }
    }
  };

  const postActivities = async (activity) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/activities/${selectedTrip.tripId}`,
        activity,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Activity saved:", res.data);
    } catch (err) {
      console.error("Error while posting activities:", err.message);
    }
  };
  
  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/activities/${selectedTrip.tripId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActivities(res.data);
    } catch (err) {
      console.error("Error fetching activities:", err.message);
    }
  };
  
  const removeActivity = async (id) => {
    console.log(id)
    try {
      await axios.delete(
        `http://localhost:8000/api/activities/${selectedTrip.tripId}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActivities(activities.filter((activity) => activity.id !== id)); // Update local state
      console.log('Activity deleted successfully');
    } catch (err) {
      console.error('Error deleting activity:', err.message);
    }
  };
  
  useEffect(() => {
    if (selectedTrip?.tripId) {
      fetchActivities();
    }
  }, [selectedTrip]);

  return (
    <div className="space-y-8 p-4">
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Trip Itinerary</h3>
        <p className="text-sm text-gray-500">Plan your activities for {selectedTrip?.name || 'this trip'}</p>
      </div>
      
      {/* Add Activity Form */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-sm font-medium text-gray-600 mb-3">Add New Activity</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-40">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              value={newActivity.time}
              onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="What are you planning to do?"
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={newActivity.description}
            onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
          />
          <button 
            onClick={addActivity} 
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Add Activity</span>
          </button>
        </div>
      </div>

      {/* Timeline divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm font-medium text-gray-500">Your Activities</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* List of Activities */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">No activities planned yet.</p>
            <p className="text-sm text-gray-400 mt-1">Add your first activity above!</p>
          </div>
        ) : (
          activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg">
                <div className="text-center">
                  <span className="block text-sm font-semibold">{activity.startTime?.split(':')[0]}:{activity.startTime?.split(':')[1]}</span>
                  <span className="block text-xs">{Number(activity.startTime?.split(':')[0]) >= 12 ? 'PM' : 'AM'}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.name}</p>
              </div>
              <button
                onClick={() => removeActivity(activity.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Delete activity"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItineraryTab;