import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/authStore'
import { Menu } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-primary-600"
              >
                TravelPal
              </motion.h1>
            </Link>
          </div>

          {user ? (
            <div className="flex items-center">
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Menu.Item>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="px-4 py-2 rounded-md text-primary-600 hover:text-primary-700"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar