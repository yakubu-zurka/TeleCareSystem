import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Consultation",
    icon: "🩺",
    description: "Personalized medical consultations with expert doctors."
  },
  {
    title: "Telemedicine",
    icon: "📱",
    description: "Remote healthcare services through video calls and messaging."
  },
  {
    title: "Emergency Care",
    icon: "🚑",
    description: "24/7 emergency medical services for urgent needs."
  },
  {
    title: "Mental Health Support",
    icon: "🧠",
    description: "Support for mental well-being, including therapy and counseling."
  }
];

const Service = () => {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-40">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-extrabold text-white mb-12">Our Healthcare Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-4">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
