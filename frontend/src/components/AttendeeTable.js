import { useEffect, useState } from "react";
import { getEvents, getEventById } from "../api/api";

const AttendeeTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);                                                                                   

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      const eventsWithAttendees = await Promise.all(
        res.data.map(async (event) => {
          const eventDetails = await getEventById(event._id);
          return { ...event, attendees: eventDetails.data.attendees };
        })
      );
      setEvents(eventsWithAttendees);
    } catch (error) {
      console.error("Error fetching events and attendees:", error);
    }
  };

  //  Function to Format Date & Time Separately
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }); 
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Attendee List</h2>

      {events.length === 0 ? (
        <p className="text-gray-600 text-center">No events available.</p>
      ) : (
        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
              <th className="py-3 px-4">Event Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Attendees</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-t">
                <td className="py-3 px-4">{event.name}</td>
                <td className="py-3 px-4">{formatDate(event.date)}</td>
                <td className="py-3 px-4">{formatTime(event.date)}</td>
                <td className="py-3 px-4">
                  {event.attendees.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {event.attendees.map((attendee, index) => (
                        <li key={index}>{attendee.name || "Unknown User"}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No attendees yet</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendeeTable;
