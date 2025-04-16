import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, Users, Calendar } from 'lucide-react'

const Home = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-primary-100 blur-3xl opacity-60"></div>
        <div className="absolute left-10 bottom-20 w-80 h-80 rounded-full bg-indigo-100 blur-3xl opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-20 sm:py-32">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-block p-3 bg-primary-100 rounded-full">
                <Compass className="w-8 h-8 text-primary-600" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-bold text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600"
            >
              Plan Your Perfect Trip
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Organize your travel plans, collaborate with friends, and discover amazing destinations all in one place.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/signup"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg border-2 border-primary-600 text-primary-700 font-medium hover:bg-primary-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Features section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl"
          >
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-primary-100 rounded-full mb-4">
                <Compass className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Discover Destinations</h3>
              <p className="mt-2 text-center text-gray-600">Find hidden gems and popular spots for your next adventure.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-primary-100 rounded-full mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Plan Itineraries</h3>
              <p className="mt-2 text-center text-gray-600">Create detailed day-by-day plans for seamless travel experiences.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-primary-100 rounded-full mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Travel Together</h3>
              <p className="mt-2 text-center text-gray-600">Collaborate with friends and family on shared trip plans.</p>
            </motion.div>
          </motion.div>
          
          {/* Testimonial/CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-24 p-8 bg-white rounded-2xl shadow-xl max-w-4xl w-full"
          >
            <p className="text-lg text-gray-700 italic">
              "Travel isn’t always pretty. It isn’t always comfortable. But that’s okay. The journey changes you — it should change you."
            </p>
            <p className="mt-4 font-medium text-gray-900">— Anthony Bourdain</p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                Start Planning Today
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home