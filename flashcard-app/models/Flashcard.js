const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 }, // Leitner box number
  nextReviewDate: { type: Date, default: Date.now }, // Next review date
});

module.exports = mongoose.model("Flashcard", flashcardSchema);