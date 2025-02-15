const express = require("express");
const mongoose = require("mongoose");
const Flashcard = require("./models/Flashcard");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add a new flashcard
app.post("/flashcards", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flashcard = new Flashcard({ question, answer });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all flashcards
app.get("/flashcards", async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a flashcard (move to next box or reset)
app.put("/flashcards/:id", async (req, res) => {
  const { id } = req.params;
  const { isCorrect } = req.body;
  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    if (isCorrect) {
      flashcard.box = Math.min(flashcard.box + 1, 5); // Max box is 5
    } else {
      flashcard.box = 1; // Reset to box 1
    }

    // Set next review date based on box number
    const daysToAdd = Math.pow(2, flashcard.box - 1); // Box 1: 1 day, Box 2: 2 days, etc.
    flashcard.nextReviewDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);

    await flashcard.save();
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a flashcard
app.delete("/flashcards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Flashcard.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));