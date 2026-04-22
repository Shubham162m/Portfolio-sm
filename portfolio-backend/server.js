const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected "))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newData = new Contact({ name, email, message });
    await newData.save();

    res.status(201).json({ message: "Saved Successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error saving data" });
  }
});
app.get('/api/contacts', async (req, res) => {
  try {
    const data = await Contact.find().sort({ submittedAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});