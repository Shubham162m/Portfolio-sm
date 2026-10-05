const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// ===============================
// Contact Schema
// ===============================

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// ===============================
// Contact Model
// ===============================

const Contact = mongoose.model("Contact", contactSchema);

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SMGalaxy Backend is running",
  });
});

// ===============================
// POST Contact
// ===============================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Create new contact
    const newData = new Contact({
      name,
      email,
      message,
    });

    // Save to MongoDB
    await newData.save();

    res.status(201).json({
      success: true,
      message: "Saved Successfully",
    });
  } catch (error) {
    console.error("Error saving contact:", error);

    res.status(500).json({
      success: false,
      message: "Error saving data",
    });
  }
});

// ===============================
// GET All Contacts
// ===============================

app.get("/api/contacts", async (req, res) => {
  try {
    const data = await Contact.find().sort({
      submittedAt: -1,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching contacts:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching data",
    });
  }
});

// ===============================
// DELETE Contact
// ===============================

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);

    res.status(500).json({
      success: false,
      message: "Error deleting contact",
    });
  }
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
