
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    PhoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    console.log(formData);

    try {
      // Use Axios for signup API call
      const response = await axios.post('http://localhost:8000/api/register', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        PhoneNumber:formData.PhoneNumber
      });

      console.log(response.data);

      // Extract data from Axios response
      // const { token } = response.data;

      login({ email: formData.email, name: formData.name }); // Assuming token is returned
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Signup failed: ${errorMessage}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            className="input-field"
            value={formData.PhoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, PhoneNumber: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="w-full btn-primary">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
