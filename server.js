require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define a simple Memory schema
const memorySchema = new mongoose.Schema({
  userId: String,
  type: String, // text, image, audio
  content: String, // text content or URL to image/audio
  createdAt: { type: Date, default: Date.now },
});

const Memory = mongoose.model("Memory", memorySchema);

// Routes

// Create new memory
app.post("/memories", async (req, res) => {
  try {
    const memory = new Memory(req.body);
    await memory.save();
    res.status(201).json(memory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all memories for a user
app.get("/memories/:userId", async (req, res) => {
  try {
    const memories = await Memory.find({ userId: req.params.userId });
    res.json(memories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
