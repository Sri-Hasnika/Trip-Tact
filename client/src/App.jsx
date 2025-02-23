import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import TripDetails from './pages/TripDetails'
import TripForm from './components/TripForm'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import ExploreDestinations from './pages/ExploreDestinations'
import DestinationDetails from './pages/DestinationDetails'
import Settings from './pages/Settings'
import TravelStats from './pages/TravelStats'
function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/profile" element={<Layout><Profile/></Layout>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips" element={
          <PrivateRoute>
            <Layout><Trips /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips/new" element={
          <PrivateRoute>
            <Layout><TripForm /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips/:tripId" element={
          <PrivateRoute>
            <Layout><TripDetails /></Layout>
          </PrivateRoute>
        } />
        <Route path="/destinations" element={
          <PrivateRoute>
            <Layout><ExploreDestinations /></Layout>
          </PrivateRoute>
        } />
        <Route path="/destination/:id" element={
          <PrivateRoute>
            <Layout><DestinationDetails /></Layout>
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <Layout><Settings /></Layout>
          </PrivateRoute>
        } />
        <Route path="/travel-stats" element={
          <PrivateRoute>
            <Layout><TravelStats /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App