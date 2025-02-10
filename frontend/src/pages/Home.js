import { Link } from "react-router-dom";
import useTitle from '../hooks/useTitle';

const Home = () => {

  useTitle("Eventify - Home");

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/*  Hero Section */}
      <header
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/new-year-frame-design-space_198067-133368.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Gradient Overlay for a More Modern Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Hero Text Content */}
        <div className="relative z-10 text-center p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to Eventify
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 drop-shadow-md">
            Plan, manage, and experience events like never before.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 space-x-4">
            <Link
              to="/login"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="border border-teal-500 hover:bg-teal-500 text-teal-500 hover:text-white px-6 py-3 rounded-lg text-lg shadow-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/*  Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-teal-400">
          Why Choose Eventify?
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">
              📅 Hassle-Free Event Management
            </h3>
            <p className="mt-2 text-gray-400">
              Create, update, and manage events effortlessly.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">🌍 Real-Time Updates</h3>
            <p className="mt-2 text-gray-400">
              Track attendee counts and receive instant event updates.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">🔒 Secure & Reliable</h3>
            <p className="mt-2 text-gray-400">
              Your event data is protected with top-tier security measures.
            </p>
          </div>
        </div>
      </section>


      {/*  Testimonials Section */}

      <section className="py-16 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-teal-400">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Hear from our happy users who have transformed their events with Eventify!
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "Eventify made planning my conference effortless! A must-have tool for every event manager."
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Alex Johnson, Event Organizer
            </span>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "Real-time attendee tracking helped us manage our event smoothly. Highly recommend!"
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Sarah Miller, Conference Host
            </span>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "Loved the ticketing system! Selling and managing event tickets was seamless and stress-free."
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Daniel Green, Music Festival Coordinator
            </span>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "The event analytics feature helped us understand attendee behavior better. Game-changer!"
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Lisa Wong, Tech Summit Director
            </span>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "Eventify is the easiest platform I’ve used. The real-time updates keep everyone on the same page."
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Michael Smith, Wedding Planner
            </span>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-teal-500 transition transform hover:scale-105">
            <p className="text-gray-300">
              "Amazing platform! Our networking event ran smoothly thanks to the attendee management system."
            </p>
            <span className="block mt-4 font-semibold text-teal-400">
              - Emily Carter, Corporate Events Coordinator
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
