import { useState } from "react";

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Flashcard App</h1>
      <button 
        className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        onClick={onOpenModal}
      >
        Add Flashcard
      </button>
    </nav>
  );
};

export default Navbar;