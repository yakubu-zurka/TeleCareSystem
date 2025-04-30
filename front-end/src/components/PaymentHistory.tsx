import React, { useState } from "react";

const PaymentHistory: React.FC = () => {
  const [amount, setAmount] = useState<number>(0); // State for the amount to be paid
  const [payments, setPayments] = useState([
    { id: 1, amount: "$150", date: "2025-02-18", status: "Completed" },
    { id: 2, amount: "$200", date: "2025-02-20", status: "Pending" },
    { id: 3, amount: "$350", date: "2025-02-22", status: "Completed" },
    { id: 4, amount: "$100", date: "2025-02-25", status: "Failed" },
  ]);

  const handlePayment = async () => {
    // Call backend to create payment
    const res = await fetch("/api/create-payment", {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" },
    });

    const { data } = await res.json();
    const { reference, email, amount, currency } = data;

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: "your-public-key", // Your Paystack public key
      email: email,
      amount: amount * 100, // Amount in kobo
      ref: reference, // Unique reference for the transaction
      callback: async function (response) {
        alert("Payment successful: " + response.reference);

        // Verify the payment on the backend
        const verifyRes = await fetch(`/api/payments/verify-payment/${response.reference}`);
        const { payment } = await verifyRes.json();

        // Update payment status in the state
        const updatedPayments = payments.map((paymentItem) =>
          paymentItem.id === payment.id
            ? { ...paymentItem, status: payment.status }
            : paymentItem
        );
        setPayments(updatedPayments);
      },
      onClose: function () {
        alert("Payment was canceled.");
      },
    });

    handler.openIframe();
  };

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-6">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          💳 Payment <span className="text-yellow-500">History</span>
        </h2>

        {/* Payment Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr
                  key={p.id}
                  className={`border-b transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="p-4 font-semibold">{p.amount}</td>
                  <td className="p-4 text-gray-600">{p.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        p.status === "Completed"
                          ? "bg-green-500"
                          : p.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="mt-6 text-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="p-2 border rounded"
          />
          <button
            onClick={handlePayment}
            className="ml-4 p-2 bg-blue-600 text-white rounded"
          >
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;
