import { useState, useEffect } from "react";
import axios from "axios";
import FlashcardItem from "../components/FlashcardItem";
import FlashcardForm from "../components/FlashcardForm";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleUpdateFlashcard = async (id, isCorrect) => {
    try {
      await axios.put(`http://localhost:5000/flashcards/${id}`, { isCorrect });
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  const handleNextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 < flashcards.length ? prevIndex + 1 : 0));
  };

  return (
    <div>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        {isModalOpen && <FlashcardForm onFlashcardAdded={fetchFlashcards} onClose={() => setIsModalOpen(false)} />}
        {flashcards.length > 0 && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <FlashcardItem 
              flashcard={flashcards[currentIndex]} 
              onUpdate={handleUpdateFlashcard} 
              onNext={handleNextFlashcard} 
            />
          </motion.div>
        )}
        <p className="mt-4 text-gray-600 dark:text-gray-300">You have {flashcards.length} flashcards due today.</p>
      </div>
    </div>
  );
};

export default Home;