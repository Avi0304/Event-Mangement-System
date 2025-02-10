import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getEventById } from "../api/api";

const socket = io("http://localhost:5000");

const AttendeeList = ({ eventId }) => {
  const [attendeeCount, setAttendeeCount] = useState(0);

  useEffect(() => {
    const fetchAttendeeCount = async () => {
      try {
        const res = await getEventById(eventId);
        console.log(`ℹ Initial attendee count for event ${eventId}:`, res.data.attendees.length);
        setAttendeeCount(res.data.attendees.length);
      } catch (error) {
        console.error(" Error fetching attendee count:", error);
      }
    };

    fetchAttendeeCount();

    socket.emit("joinEvent", eventId);

    socket.on("attendeeCountUpdate", (count) => {
      console.log(` Received WebSocket update for event ${eventId}: New count:`, count);
      setAttendeeCount(count);
    });

    return () => {
      socket.off("attendeeCountUpdate");
    };
  }, [eventId]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Attendees: {attendeeCount}</h3>
    </div>
  );
};

export default AttendeeList;
