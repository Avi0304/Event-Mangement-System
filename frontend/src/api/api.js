import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth APIs
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const guest =(data) => API.post("/auth/guest-login",data);
export const profile = (data) => API.get("/auth/profile",data);

// Event APIs
export const getEvents = () => API.get("/events");
export const getEventById = (eventId) => API.get(`/events/${eventId}`);
export const createEvent = (data) => API.post("/events", data);
export const updateEvent = (eventId, data) => API.put(`/events/${eventId}`, data);
export const deleteEvent = (eventId) => API.delete(`/events/${eventId}`);

// Join Event API (Attendee joins an event)
export const joinEvent = (eventId) => API.post(`/events/${eventId}/join`);
