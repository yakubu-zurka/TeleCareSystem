import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Review {
  id: number;
  caregiver: string;
  rating: number;
  feedback: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    { id: 1, caregiver: "Alice Johnson", rating: 5, feedback: "Excellent care!" },
    { id: 2, caregiver: "Michael Smith", rating: 4.5, feedback: "Very professional and kind." },
    { id: 3, caregiver: "Sophia Williams", rating: 4, feedback: "Great service, but room for improvement." },
    { id: 4, caregiver: "James Brown", rating: 5, feedback: "Outstanding support and care!" },
    { id: 5, caregiver: "Emma Wilson", rating: 4.8, feedback: "Highly recommended!" },
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </span>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 shadow-lg rounded-xl max-w-2xl mx-auto">
      {/* Section Title */}
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        🌟 Reviews & Ratings
      </h2>

      {/* Reviews List */}
      <ul className="space-y-5">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="bg-gray-100 p-5 rounded-xl shadow-md transition transform hover:scale-105 hover:bg-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-700">{review.caregiver}</h3>
            <div className="flex items-center gap-2">{renderStars(review.rating)}</div>
            <p className="text-gray-600 mt-2">{review.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
