// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // Contact Schema
// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//   },
//   message: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Contact = mongoose.model("Contact", contactSchema);

// // Home
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "SMGalaxy Backend is running",
//   });
// });

// // Admin Login
// app.post("/api/admin/login", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Username and password are required",
//     });
//   }

//   if (
//     username === process.env.ADMIN_USERNAME &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//     });
//   }

//   res.status(401).json({
//     success: false,
//     message: "Wrong username or password",
//   });
// });

// // Save Contact
// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email and message are required",
//       });
//     }

//     await Contact.create({
//       name,
//       email,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Saved Successfully",
//     });
//   } catch (err) {
//     console.error("Save Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Error saving data",
//     });
//   }
// });

// // Get Contacts
// app.get("/api/contacts", async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({
//       submittedAt: -1,
//     });

//     res.json(contacts);
//   } catch (err) {
//     console.error("Fetch Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching data",
//     });
//   }
// });

// // Delete Contact
// app.delete("/api/contacts/:id", async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(
//       req.params.id
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Contact deleted successfully",
//     });
//   } catch (err) {
//     console.error("Delete Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Error deleting contact",
//     });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// ===============================================================================================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// =========================
// MongoDB Connection
// =========================
// Atlas cluster: smgalaxy
// Database: portfolioDB
// Collection: contact
// =========================

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "portfolioDB",
  })
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Database: portfolioDB");
    console.log("Collection: contact");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// =========================
// Contact Schema
// =========================

const contactSchema = new mongoose.Schema(
  {
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
  },
  {
    collection: "contact",
  }
);

// Explicitly use "contact" collection
const Contact = mongoose.model(
  "Contact",
  contactSchema,
  "contact"
);

// =========================
// Home
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SMGalaxy Backend is running",
  });
});

// =========================
// Admin Login
// =========================

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Wrong username or password",
  });
});

// =========================
// Save Contact
// POST /api/contact
// =========================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Saved Successfully",
      contact: newContact,
    });
  } catch (err) {
    console.error("Save Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error saving data",
    });
  }
});

// =========================
// Get Contacts
// GET /api/contacts
// =========================

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({
        submittedAt: -1,
      })
      .lean();

    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Fetch Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching data",
    });
  }
});

// =========================
// Delete Contact
// DELETE /api/contacts/:id
// =========================

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (err) {
    console.error("Delete Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error deleting contact",
    });
  }
});

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

