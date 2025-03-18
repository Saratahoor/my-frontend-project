import { motion } from "framer-motion";
import { useState } from "react";

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Home");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ff7e5f] via-[#f9f9f9] to-[#5ee7df] p-10">
      
      {/* Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="absolute top-5 left-5 text-white text-3xl font-bold">
        Nyaya Path
      </motion.div>

      {/* Navigation Menu */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.7 }}
        className="absolute top-16 left-5 bg-white bg-opacity-30 backdrop-blur-lg p-4 rounded-xl shadow-lg flex flex-col gap-3">
        {["Home", "File a Case", "Track Case", "Find a Mediator"].map((option) => (
          <button 
            key={option} 
            onClick={() => setSelectedOption(option)}
            className={`px-6 py-2 text-lg rounded-lg transition-all duration-300 ${
              selectedOption === option ? "bg-orange-500 text-white" : "text-gray-800 hover:bg-orange-200"
            }`}>
            {option}
          </button>
        ))}
      </motion.div>

      {/* Content Box with Glassmorphism */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedOption}</h2>
        <p className="text-lg text-gray-700">
          {selectedOption === "Home"
            ? "Welcome to Nyaya Path! Navigate through the menu to get started."
            : `You selected "${selectedOption}". More details coming soon!`}
        </p>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
