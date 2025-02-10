import { useEffect, useState } from "react";
import { getEvents, getEventById, joinEvent } from "../api/api";
import io from "socket.io-client";
import AttendeeList from "../components/AttendeeList";
import useTitle from "../hooks/useTitle";

const socket = io("http://localhost:5000");

const EventList = () => {
  const [events, setEvents] = useState([]);
  useTitle("Eventify - Events");

  //  Fetch only upcoming events safely
  const fetchEvents = async () => {
    try {
      const res = await getEvents();
    
      const currentDate = new Date();
      const upcomingEvents = Array.isArray(res.data) 
        ? res.data.filter((event) => new Date(event.date) >= currentDate)
        : [];

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
    socket.on("eventCreated", fetchEvents);
    socket.on("eventDeleted", fetchEvents);

    return () => {
      socket.off("eventCreated", fetchEvents);
      socket.off("eventDeleted", fetchEvents);
    };
  }, []);

  //  Handle Joining Event
  const handleJoinEvent = async (eventId) => {
    try {
      await joinEvent(eventId);
      console.log("Joined event successfully!");

      // 🔄 Update event attendees dynamically
      const updatedEvent = await getEventById(eventId);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, attendees: updatedEvent.data.attendees } : event
        )
      );
    } catch (error) {
      console.error("Error joining event:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/*  Hero Section */}
      <section
        className="relative flex items-center justify-center h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1489513691500-41ef4acdb665?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnQlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold tracking-wide text-white">🚀 Upcoming Events</h1>
          <p className="mt-4 text-lg text-gray-300">Don't miss out on amazing events happening soon!</p>
        </div>
      </section>

      {/*  Events Section */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-300 text-center mb-6">Events</h2>

        {Array.isArray(events) && events.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                  <p className="text-gray-400 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    📅 {new Date(event.date).toLocaleDateString()} ⏰{" "}
                    {new Date(event.date).toLocaleTimeString()}
                  </p>
                  <AttendeeList eventId={event._id} />

                  {/*  Join Button */}
                  <button
                    className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition"
                    onClick={() => handleJoinEvent(event._id)}
                  >
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No upcoming events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
