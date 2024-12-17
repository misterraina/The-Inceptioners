import React from "react";

const PackageList = ({ packages, handleEdit, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg._id} className="bg-white p-4 rounded-md shadow-md">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-bold">{pkg.title}</h3>
          <p className="text-gray-700">{pkg.description}</p>
          <p className="text-gray-700">Price: ${pkg.price}</p>
          <p className="text-gray-700">Dates: {pkg.availableDates.join(", ")}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => handleEdit(pkg)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(pkg._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
