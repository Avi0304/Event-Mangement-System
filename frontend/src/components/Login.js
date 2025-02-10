import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/profile.png';
import useTitle from '../hooks/useTitle';


const Login = () => {
  const { handleLogin, handleGuest } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useTitle('Eventify - Login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
    navigate('/');
  };

  const handleGuestLogin = async () => {
    await handleGuest();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {/*  Logo */}
        <div className="text-center">
          <img 
            className="mx-auto h-12 w-auto"
            src={Logo}            
            alt="Your Company"
          />
          
          <h2 className="mt-6 text-3xl font-extrabold text-white">Sign in to your account</h2>
          <p className="mt-2 text-gray-400">Welcome back! Please enter your details.</p>
        </div>

        {/*  Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/*  Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/*  Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/*  Sign in Button */}
          <button 
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
          >
            Sign in
          </button>
        </form>

        {/*  Divider */}
        <div className="mt-6 flex items-center text-gray-400">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-sm">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/*  Guest Login Button */}
        <button 
          onClick={handleGuestLogin}
          className="mt-4 w-full rounded-lg bg-gray-600 px-4 py-2 text-white font-semibold hover:bg-gray-500 transition duration-200"
        >
          Guest Login
        </button>

        {/*  Register & Forgot Password Links */}
        <p className="mt-6 text-center text-gray-400">
          Not a member?&nbsp;
          <Link to="/register" className="text-indigo-400 hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
