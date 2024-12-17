// components/TourPackages.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TourPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/tour-packages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Available Tour Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded shadow">
            <img src={pkg.image} alt={pkg.title} className="mb-4 w-full h-48 object-cover" />
            <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
            <p>{pkg.description}</p>
            <p className="font-bold mt-2">Price: ${pkg.price}</p>
            <p>Available Dates: {pkg.availableDates.join(", ")}</p>
            <Link
              to={`/book/${pkg._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 block text-center"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPackages;

