import React from "react";

const testimonials = [
  {
    name: "John Doe",
    review: "This platform made it so easy to find a caregiver. The process was smooth and stress-free!",
    avatar: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg",
  },
  {
    name: "Jane Smith",
    review: "As a caregiver, I found amazing job opportunities. The system is user-friendly and efficient!",
    avatar: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg",
  },
  {
    name: "Michael Lee",
    review: "Excellent service! Booking an appointment was fast, and the caregiver was very professional.",
    avatar: "https://i.pinimg.com/736x/9c/ec/2f/9cec2fb375f896c83ffbac039184e75e.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-5">
      <div className="container mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-blue-500 mb-6">What Our Users Say</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
          Real experiences from our valued users. Join them today!
        </p>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500 shadow-md"
              />
              <p className="text-gray-700 italic text-lg mt-4 mb-4">"{testimonial.review}"</p>
              <h3 className="text-xl font-semibold text-blue-600">- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
