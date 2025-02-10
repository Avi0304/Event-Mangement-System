import { useState } from "react";
import { createEvent } from "../api/api";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("https://event-mangement-system-78ip.onrender.com");

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createEvent(formData);
      toast.success("Event Created Successfully...");
      socket.emit("newEvent", res.data);
      setFormData({ name: "", description: "", date: "", category: "" });
    } catch (error) {
      toast.error("Error Creating Event...");
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Create a New Event
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter event name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Event Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter event category"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="3"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">Event Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-md text-lg font-medium transition hover:bg-teal-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
