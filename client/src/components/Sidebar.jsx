import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  CogIcon,
  BellIcon,
  GlobeAltIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Trips', icon: CalendarIcon, path: '/trips' },
  // { name: 'Collaborators', icon: UserGroupIcon, path: '/collaborators' },
  { name: 'Explore Destinations', icon: GlobeAltIcon, path: '/destinations' },
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
      transition={{ type: "spring", stiffness: 100 }}
      className="hidden md:flex flex-col w-64 bg-white min-h-screen shadow-lg border-r border-gray-100"
    >
      {/* Logo and branding */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">TT</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text">
            Trip Tact
          </h1>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 py-6 px-4">
        <div className="mb-4 px-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className={`flex items-center justify-center h-8 w-8 rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 group-hover:text-gray-600'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* User section */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <div className="px-3 py-3 rounded-lg bg-gray-50 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
          <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Pro version banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
              <path d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
          <p className="text-sm opacity-90 mb-3">Get more features and premium support</p>
          <button className="bg-white text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar