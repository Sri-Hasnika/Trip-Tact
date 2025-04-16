import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAuthStore from '../store/authStore'
import { Menu, Transition } from '@headlessui/react'
import { 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  CalendarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
          : 'bg-white py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex items-center"
              >
                <div className="h-9 w-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                  <span className="text-white font-bold text-lg">TT</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text hidden sm:block">
                  Trip Tact
                </h1>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user && (
              <div className="flex items-center space-x-1 mr-4">
                <NavLink to="/dashboard">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/trips">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  <span>Trips</span>
                </NavLink>
                <NavLink to="/travel-stats">
                  <ChartBarIcon className="h-5 w-5 mr-1" />
                  <span>Analytics</span>
                </NavLink>
              </div>
            )}

            {user ? (
              <div className="flex items-center">
                <Menu as="div" className="relative">
                  <Menu.Button 
                    className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                  >
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.name || 'My Account'}
                    </span>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center overflow-hidden shadow-sm">
                      {user.profilePic 
                        ? <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" /> 
                        : <UserCircleIcon className="h-7 w-7" />
                      }
                    </div>
                  </Menu.Button>
                  
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 focus:outline-none py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
                      </div>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link 
                            to="/profile" 
                            className={`flex items-center px-4 py-2.5 text-sm ${
                              active ? 'bg-gray-50' : ''
                            }`}
                          >
                            <UserCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Your Profile</span>
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link 
                            to="/settings" 
                            className={`flex items-center px-4 py-2.5 text-sm ${
                              active ? 'bg-gray-50' : ''
                            }`}
                          >
                            <CogIcon className="h-5 w-5 mr-3 text-gray-500" />
                            <span>About</span>
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <div className="border-t border-gray-100 mt-1"></div>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <button 
                            onClick={logout}
                            className={`flex items-center w-full text-left px-4 py-2.5 text-sm ${
                              active ? 'bg-gray-50 text-red-600' : 'text-gray-700'
                            }`}
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-500" />
                            <span>Sign out</span>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="px-4 py-2 rounded-md text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup"
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm font-medium text-sm transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-3 mb-2 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center overflow-hidden">
                      {user.profilePic 
                        ? <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" /> 
                        : <UserCircleIcon className="h-8 w-8" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
                    </div>
                  </div>
                  
                  <Link to="/dashboard" className="block px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <HomeIcon className="h-5 w-5 mr-3 text-indigo-600" />
                      <span className="font-medium text-gray-900">Dashboard</span>
                    </div>
                  </Link>
                  
                  <Link to="/trips" className="block px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-3 text-indigo-600" />
                      <span className="font-medium text-gray-900">My Trips</span>
                    </div>
                  </Link>
                  
                  <Link to="/travel-stats" className="block px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <ChartBarIcon className="h-5 w-5 mr-3 text-indigo-600" />
                      <span className="font-medium text-gray-900">Analytics</span>
                    </div>
                  </Link>
                  
                  <Link to="/profile" className="block px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-5 w-5 mr-3 text-indigo-600" />
                      <span className="font-medium text-gray-900">Profile</span>
                    </div>
                  </Link>
                  
                  <Link to="/settings" className="block px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <CogIcon className="h-5 w-5 mr-3 text-indigo-600" />
                      <span className="font-medium text-gray-900">Settings</span>
                    </div>
                  </Link>
                  
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button 
                      onClick={logout}
                      className="w-full px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
                      <span className="font-medium text-red-600">Sign out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Link 
                    to="/login"
                    className="px-4 py-3 rounded-lg border border-gray-200 text-center text-indigo-600 font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white font-medium text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Helper component for desktop navigation links
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;