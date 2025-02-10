import React, { useState } from "react";
import useTitle from "../hooks/useTitle";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useTitle("Eventify -Contact Us")

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/*  Hero Section */}
      <section className="relative flex items-center justify-center h-96 bg-cover bg-center bg-[url('https://source.unsplash.com/1600x900/?customer-support,chat')]" style={{
        backgroundImage: "url('https://www.chiefsalesleader.com/wp-content/uploads/2018/03/Contact-Us-Background.jpg", backgroundSize: "cover", backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold tracking-wide text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            Have questions? We’re here to help!
          </p>
        </div>
      </section>

      {/*  Contact Form Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-teal-400 text-center">Get in Touch</h2>
        <p className="text-gray-300 text-center mt-4">
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        {submitted ? (
          <p className="mt-6 text-green-400 text-center font-semibold text-xl animate-pulse">
             Your message has been sent successfully!
          </p>
        ) : (
          <form className="mt-10 bg-gray-800/60 p-8 rounded-xl shadow-lg backdrop-blur-lg border border-gray-700 hover:border-teal-400 transition" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 transform"
            >
               Send Message
            </button>
          </form>
        )}
      </section>

      {/*  Contact Information Section */}
      <section className="py-16 bg-gray-800 px-6 max-w-4xl mx-auto text-center rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-teal-400">Contact Information</h2>
        <p className="mt-4 text-gray-300">You can also reach us at:</p>
        <div className="mt-6 space-y-4 text-lg">
          <p>📍 <span className="font-semibold text-teal-400">Address:</span> 123 Eventify Street, Tech City</p>
          <p>📞 <span className="font-semibold text-teal-400">Phone:</span> +1 (123) 456-7890</p>
          <p>✉️ <span className="font-semibold text-teal-400">Email:</span> support@eventify.com</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
