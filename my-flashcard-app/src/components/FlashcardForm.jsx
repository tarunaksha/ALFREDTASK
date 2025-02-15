import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FlashcardForm = ({ onFlashcardAdded, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/flashcards", {
        question,
        answer,
      });
      onFlashcardAdded(res.data);
      setQuestion("");
      setAnswer("");
      onClose();
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Add a Flashcard</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Add Flashcard
            </button>
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlashcardForm;