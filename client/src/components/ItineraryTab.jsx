

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const ItineraryTab = ({ selectedTrip }) => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    time: '',
    description: '',
  });
  const token = JSON.parse(localStorage.getItem('user')).token;
  // console.log(selectedTrip);

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
      // toast.error("Failed to add activity.");
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
      // console.log(res.data);
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
    <div className="space-y-6">
      {/* Add Activity Form */}
      <div className="flex gap-4">
        <input
          type="time"
          className="input-field w-40"
          value={newActivity.time}
          onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Activity description"
          className="input-field flex-1"
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
        />
        <button onClick={addActivity} className="btn-primary">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* List of Activities */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
          >
            <span className="w-40 font-medium">{activity.startTime}</span>
            <span className="flex-1">{activity.name}</span>
            <button
              onClick={() => removeActivity(activity.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryTab;
