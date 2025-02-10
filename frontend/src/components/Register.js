import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/profile.png";
import useTitle from "../hooks/useTitle";

const Register = () => {
  const { handleRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  useTitle("Eventify - Register")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
    navigate("/login");
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {/*  Logo */}
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src={Logo}
            alt="Eventify Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create Your Account</h2>
          <p className="mt-2 text-gray-400">Sign up to start managing your events.</p>
        </div>

        {/*  Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/*  Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your full name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/*  Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
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
              placeholder="Create a strong password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/*  Register Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-200"
          >
            Register
          </button>
        </form>

        {/*  Divider */}
        <div className="mt-6 flex items-center text-gray-400">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-sm">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/*  Already Registered */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
