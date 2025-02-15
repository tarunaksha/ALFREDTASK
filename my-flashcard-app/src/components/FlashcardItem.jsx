import { useState } from "react";
import { motion } from "framer-motion";

const FlashcardItem = ({ flashcard, onUpdate, onNext }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  
  const handleAnswer = (isCorrect) => {
    onUpdate(flashcard._id, isCorrect);
    setShowAnswer(false);
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105"
    >
      <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">{flashcard.question}</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnswer ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showAnswer && <p className="text-gray-700 dark:text-gray-300 mb-4">{flashcard.answer}</p>}
      </motion.div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-600 transition"
        onClick={handleShowAnswer}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 mx-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => handleAnswer(true)}
        >
          Got it Right
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 mx-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => handleAnswer(false)}
        >
          Got it Wrong
        </button>
      </div>
    </motion.div>
  );
};

export default FlashcardItem;