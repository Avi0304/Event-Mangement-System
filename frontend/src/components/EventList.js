import { useEffect, useState } from "react";
import { getEvents, updateEvent, deleteEvent } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaTrash,FaEdit} from 'react-icons/fa';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", date: "", category: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
      setFilteredEvents(res.data);

      const uniqueCategories = [...new Set(res.data.map(event => event.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  //  Apply Filters
  useEffect(() => {
    let filtered = events;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date(dateRange.from) && eventDate <= new Date(dateRange.to);
      });
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, dateRange, events]);

  //  Edit Event Logic
  const handleEditClick = (event) => {
    setEditingEventId(event._id);
    setEditForm({
      name: event.name,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      category: event.category
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (eventId) => {
    try {
      // eslint-disable-next-line
      const response = await updateEvent(eventId, editForm);
      setEditingEventId(null);
      fetchEvents(); // Refresh UI
      toast.success(" Event updated successfully!");
    } catch (error) {
      toast.error(" Error updating event!");
    }
  };

  //  Delete Event Logic with Confirmation Alert
  const handleDelete = async (eventId) => {
      try {
        await deleteEvent(eventId);
        fetchEvents(); // Refresh UI
        toast.success(" Event deleted successfully!");
      } catch (error) {
        toast.error(" Error deleting event!");
      }
  };

  //  Separate Upcoming & Past Events
  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />

        {/*  Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center justify-center">
          <select className="border p-2 rounded-md" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <input type="date" className="border p-2 rounded-md" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />
          <input type="date" className="border p-2 rounded-md" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />

          <button onClick={() => { setSelectedCategory("all"); setDateRange({ from: "", to: "" }); }} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Reset Filters
          </button>
        </div>

        {/*  Upcoming Events Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">📅 Upcoming Events</h3>
        <EventGrid events={upcomingEvents} editingEventId={editingEventId} handleEditClick={handleEditClick} handleEditChange={handleEditChange} handleEditSubmit={handleEditSubmit} handleDelete={handleDelete} editForm={editForm} />

        {/*  Past Events Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">⏳ Past Events</h3>
        <EventGrid events={pastEvents} editingEventId={editingEventId} handleEditClick={handleEditClick} handleEditChange={handleEditChange} handleEditSubmit={handleEditSubmit} handleDelete={handleDelete} editForm={editForm} />
     
    </div>
  );
};

//  Event Grid Component
const EventGrid = ({ events, editingEventId, handleEditClick, handleEditChange, handleEditSubmit, handleDelete, editForm }) => {
  return events.length === 0 ? (
    <p className="text-gray-600 text-center">No events found.</p>
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <EventCard key={event._id} event={event} editingEventId={editingEventId} handleEditClick={handleEditClick} handleEditChange={handleEditChange} handleEditSubmit={handleEditSubmit} handleDelete={handleDelete} editForm={editForm} />
      ))}
    </div>
  );
};

//  Event Card Component with Edit Mode
const EventCard = ({ event, editingEventId, handleEditClick, handleEditChange, handleEditSubmit, handleDelete, editForm }) => {
  const isEditing = editingEventId === event._id;

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105">
      {isEditing ? (
        <>
          <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full border p-2 rounded-md mb-2" />
          <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full border p-2 rounded-md mb-2" />
          <input type="datetime-local" name="date" value={editForm.date} onChange={handleEditChange} className="w-full border p-2 rounded-md mb-2" />
          <button onClick={() => handleEditSubmit(event._id)} className="bg-green-500 text-white px-3 py-2 rounded-md mt-2">Save</button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
          <p className="text-gray-600 mt-2">{event.description}</p>
          <button onClick={() => handleEditClick(event)} className="bg-blue-500 text-white px-3 py-2 rounded-md mt-2"><FaEdit/></button>
          <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-3 py-2 rounded-md mt-2 ml-2"><FaTrash/></button>
        </>
      )}
    </div>
  );
};

export default EventList;
