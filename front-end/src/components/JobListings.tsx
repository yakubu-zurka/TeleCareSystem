import React from "react";

const JobListings: React.FC = () => {
  const jobs = [
    { id: 1, title: "Elderly Care - 3 Days", location: "New York" },
    { id: 2, title: "Child Care - Full Time", location: "Los Angeles" },
    { id: 3, title: "Home Nurse - Night Shift", location: "Chicago" },
    { id: 4, title: "Caregiver - Part Time", location: "Houston" },
    { id: 5, title: "Elderly Companion", location: "San Francisco" },
    { id: 6, title: "Special Needs Assistant", location: "Miami" },
  ];

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Job Listings</h2>

        {/* Job List Container */}
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
