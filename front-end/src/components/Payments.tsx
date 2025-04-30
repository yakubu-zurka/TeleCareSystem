import React from "react";

const Payments: React.FC = () => {
  const transactions = [
    { id: 1, amount: "$150", date: "2025-02-18", status: "Completed" },
    { id: 2, amount: "$200", date: "2025-02-20", status: "Pending" },
    { id: 3, amount: "$100", date: "2025-02-22", status: "Failed" },
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-200";
      case "Pending":
        return "text-yellow-700 bg-yellow-200";
      case "Failed":
        return "text-red-700 bg-red-200";
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-6">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          💰 Earnings & <span className="text-yellow-500">Payments</span>
        </h2>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-300">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="py-4 px-3 flex items-center justify-between rounded-lg transition hover:bg-gray-100 cursor-pointer"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{tx.amount}</p>
                  <p className="text-sm text-gray-500">📅 {tx.date}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(tx.status)}`}
                >
                  {tx.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Payments;
