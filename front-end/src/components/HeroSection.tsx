import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center h-screen text-center bg-gradient-to-br from-blue-500 to-blue-300 overflow-hidden">
      
      {/* 🌌 Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* 🔵 Large Neon Glowing Blob - Left */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-white to-blue-500 opacity-25 rounded-full blur-[150px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* 🟣 Smaller Floating Blobs */}
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-300 to-white opacity-20 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* 🌊 Wavy Floating Lines */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-32 h-1 bg-white opacity-50 rotate-45"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-32 h-1 bg-white opacity-50 -rotate-45"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      {/* ✨ Glassmorphism Card */}
      <motion.div 
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        
        {/* 🎯 Animated Heading */}
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Elevate Your Healthcare Experience
        </motion.h1>
        
        {/* 📌 Animated Subtext */}
        <motion.p 
          className="text-lg md:text-xl text-white mt-4 mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Access world-class medical services with just a click. Quality care at your fingertips.
        </motion.p>
        
        {/* 🚀 CTA Buttons with 3D Hover Effects */}
        <motion.div 
          className="flex space-x-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.button 
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button 
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-yellow-600 transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
