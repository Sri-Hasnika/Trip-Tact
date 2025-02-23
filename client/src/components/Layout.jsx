import { motion } from 'framer-motion'
import useAuthStore from '../store/authStore'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

export default Layout