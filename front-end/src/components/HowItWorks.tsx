import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto text-center px-6">
        {/* 🌟 Title */}
        <h2 className="text-4xl font-extrabold text-blue-500 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Seamless steps for patients and caregivers to connect.
        </p>

        {/* 📌 Steps Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* 🚑 Steps for Patients */}
          <motion.div
            className="bg-blue-400 p-8 rounded-lg shadow-2xl transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              For Patients
            </h3>
            <ul className="text-white space-y-4 text-lg">
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">🔍</span>
                <span>Find a caregiver easily</span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">📅</span>
                <span>Book an appointment</span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">💊</span>
                <span>Receive top-quality care</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* 🏥 Steps for Caregivers */}
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-lg shadow-2xl transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              For Caregivers
            </h3>
            <ul className="text-white space-y-4 text-lg">
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">📝</span>
                <span>Sign up & create a profile</span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">📩</span>
                <span>Receive job requests</span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-2xl">🩺</span>
                <span>Deliver excellent care</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
