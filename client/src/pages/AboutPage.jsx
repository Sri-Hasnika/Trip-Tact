import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">Plan Your Perfect Journey</h1>
          <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
            Discover the story behind the travel itinerary planner that makes organizing your adventures simple and enjoyable.
          </p>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        className="max-w-4xl mx-auto mb-20 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <MapPinIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center text-gray-800 mb-4">Our Mission</motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6">
          We believe that travel should be about experiencing moments, not managing logistics. Our mission is to simplify 
          trip planning so you can focus on creating memories that last a lifetime.
        </motion.p>
        <motion.p variants={itemVariants} className="text-center text-gray-600">
          Whether you're planning a weekend getaway or an extended international adventure, our platform provides the tools 
          you need to organize your journey with ease and confidence.
        </motion.p>
      </motion.div>

      {/* Features Highlights */}
      <motion.div 
        className="max-w-5xl mx-auto mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center text-gray-800 mb-12">Why Choose Our Planner</motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Intuitive Itinerary Builder</h3>
            </div>
            <p className="text-gray-600 pl-14">
              Effortlessly create detailed day-by-day plans with our drag-and-drop interface. Add activities, 
              set times, and organize your perfect trip with ease.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <UserGroupIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Collaborative Planning</h3>
            </div>
            <p className="text-gray-600 pl-14">
              Share your plans with travel companions and allow them to contribute ideas and suggestions,
              making group travel planning a breeze.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Secure & Accessible</h3>
            </div>
            <p className="text-gray-600 pl-14">
              Your travel plans are securely stored and accessible across all your devices, ensuring 
              you'll never lose your itinerary regardless of where you are.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <MapPinIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Smart Recommendations</h3>
            </div>
            <p className="text-gray-600 pl-14">
              Get personalized suggestions for attractions, restaurants, and activities based on 
              your preferences and travel style.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Our Story */}
      <motion.div 
        className="max-w-4xl mx-auto mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center text-gray-800 mb-8">Our Story</motion.h2>
        
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-md border border-indigo-100">
          <p className="text-gray-600 mb-4">
            Our journey began when a group of travel enthusiasts found themselves drowning in spreadsheets, 
            notes, and confirmation emails while planning their trips. We knew there had to be a better way.
          </p>
          <p className="text-gray-600 mb-4">
            In 2023, we set out to create a tool that would transform the way people plan their travels. After months 
            of development and feedback from fellow travelers, our itinerary planner was born.
          </p>
          <p className="text-gray-600">
            Today, thousands of travelers use our platform to plan everything from weekend getaways to 
            round-the-world adventures. We're continuously improving based on user feedback, with a mission to 
            make travel planning as enjoyable as the journey itself.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div 
        className="max-w-3xl mx-auto text-center py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">Ready to Plan Your Next Adventure?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of travelers who have simplified their journey planning process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors">
            Start Planning Now
          </button>
          <button className="px-8 py-3 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg shadow-sm transition-colors">
            View Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;