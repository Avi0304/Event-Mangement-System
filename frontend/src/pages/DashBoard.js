import { useState } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import AttendeeTable from "../components/AttendeeTable";
import useTitle from "../hooks/useTitle";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("eventForm"); 
  useTitle("Eventify - DashBoard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*  Sticky Sidebar Navigation */}
      <aside className="w-1/4 bg-gray-900 text-white p-6 hidden md:block sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-6">Eventify Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("eventForm")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "eventForm" ? "bg-teal-500" : "hover:bg-gray-700"
            }`}
          >
            ➕ Create Event
          </button>
          <button
            onClick={() => setActiveTab("eventList")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "eventList" ? "bg-teal-500" : "hover:bg-gray-700"
            }`}
          >
            📅 Event List
          </button>
          <button
            onClick={() => setActiveTab("attendeeList")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "attendeeList" ? "bg-teal-500" : "hover:bg-gray-700"
            }`}
          >
            📋 Attendee List
          </button>
        </nav>
      </aside>

      {/*  Main Content (Scrollable) */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          {activeTab === "eventForm"
            ? "Create a New Event"
            : activeTab === "eventList"
            ? "Upcoming & Past Events"
            : "Event Attendee List"}
        </h2>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {activeTab === "eventForm" && <EventForm />}
          {activeTab === "eventList" && <EventList />}
          {activeTab === "attendeeList" && <AttendeeTable />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
