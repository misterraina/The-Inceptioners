import React from "react";

const PackageForm = ({ formData, handleChange, handleSubmit, isEditing }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Package" : "Add New Package"}</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="availableDates"
          placeholder="Available Dates (comma-separated)"
          value={formData.availableDates}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
        >
          {isEditing ? "Save Changes" : "Add Package"}
        </button>
      </div>
    </div>
  );
};

export default PackageForm;
