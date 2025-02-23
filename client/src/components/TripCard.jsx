import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const TripCard = ({ trip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <Link to={`/trips/${trip.id}`}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{trip.startDate} - {trip.endDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{trip.location}</span>
          </div>
          
        </div>
      </Link>
    </motion.div>
  )
}

export default TripCard