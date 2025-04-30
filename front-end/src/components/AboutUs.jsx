import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "John Doe", role: "CEO", img: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg" },
  { name: "Jane Smith", role: "CTO", img: "https://i.pinimg.com/736x/73/59/14/73591405ff33858e666ae73512e26e2c.jpg" },
  { name: "Emma Johnson", role: "Lead Designer", img: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg" },
  { name: "Alex Lee", role: "Head of Marketing", img: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg" }
];

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-l from-indigo-500 to-blue-500 py-40">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-extrabold text-white mb-6">About Us</h2>
        <p className="text-lg text-white mb-12">
          We are a passionate team committed to delivering excellence in every project.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="rounded-full overflow-hidden mb-4">
                <img src={member.img} alt={member.name} className="w-32 h-32 object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
