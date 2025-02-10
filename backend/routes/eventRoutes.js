const express = require('express');
const protect = require('../middleware/authMiddleware');
const Event = require('../models/Event');

const router = express.Router();


// Create Event
router.post('/', protect, async (req, res) => {
    try {
        const { name, description, date, category } = req.body;

        //  Ensure category is provided
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const event = await Event.create({
            name,
            description,
            date,
            category,
            createdBy: req.user._id,
        });

        req.app.get("io").emit("eventCreated", event); 

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get Events
router.get('/', protect, async (req, res) => {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
});

// Update Event
router.put("/:id", protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        console.log(" Event Created By:", event.createdBy);
        console.log(" User ID from Token:", req.user.id);

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Update fields explicitly
        event.name = req.body.title || event.name;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.category = req.body.category || event.category;

        await event.save();

        req.app.get("io").emit("eventUpdated", event); 
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete Event
router.delete('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event || event.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await event.deleteOne();
        req.app.get("io").emit("eventDeleted", event._id);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event" });
    }
});

router.post("/:id/join", protect, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        console.log(" Event not found");
        return res.status(404).json({ message: "Event not found" });
      }
  
      if (!req.user) {
        console.log(" User not authenticated");
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      // Prevent duplicate attendees
      if (!event.attendees.includes(req.user.id)) {
        event.attendees.push(req.user.id);
        await event.save();
  
        console.log(` User ${req.user.id} joined event ${event._id}`);
        console.log(`👥 New Attendee Count: ${event.attendees.length}`);
  
        // ✅ Emit WebSocket event
        req.app.get("io").to(event._id.toString()).emit("attendeeCountUpdate", event.attendees.length);
      } else {
        console.log(` User ${req.user.id} already joined event ${event._id}`);
      }
  
      res.json({ message: "Joined event successfully", attendeeCount: event.attendees.length });
    } catch (error) {
      console.error(" Error joining event:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

  // Get a Single Event by ID
router.get("/:id", protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("createdBy", "name").populate("attendees", "name email");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

  

module.exports = router;
