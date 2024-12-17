// components/BookingPage.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId: id, name, email }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to book package.");
      }
    } catch (error) {
      setError("An error occurred while booking the package.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Book Package</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
