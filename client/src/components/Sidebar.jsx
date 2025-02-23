

// export default Sidebar
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  CogIcon,
  BellIcon,
  GlobeAltIcon // Import the GlobeAltIcon for ExploreDestinations
} from '@heroicons/react/24/outline'

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Trips', icon: CalendarIcon, path: '/trips' },
  // { name: 'Collaborators', icon: UserGroupIcon, path: '/collaborators' },
  { name: 'ExploreDestinations', icon: GlobeAltIcon, path: '/destinations' }, // Updated icon here
  // { name: 'Notifications', icon: BellIcon, path: '/notifications' },
  { name: 'Travel Stats', icon: CogIcon, path: '/travel-stats' },
  // { name: 'Settings', icon: CogIcon, path: '/settings' },
]

const Sidebar = () => {
  const location = useLocation()

  // If the location is home, don't render the sidebar
  if (location.pathname === '/') {
    return null
  }

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="hidden md:block w-64 bg-white min-h-screen shadow-lg"
    >
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
