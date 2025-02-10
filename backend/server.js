const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const userRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
  

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://event-mangement-system.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Store io instance globally
app.set("io", io);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/events', eventRoutes); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket Events
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinEvent", (eventId) => {
        socket.join(eventId);
        console.log(` User ${socket.id} joined room: ${eventId}`);
      });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
