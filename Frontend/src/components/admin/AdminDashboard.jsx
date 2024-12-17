import React, { useState, useEffect } from "react";
import PackageForm from "./PackageForm";
import PackageList from "./PackageList";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: [],
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/tour-packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "availableDates" ? value.split(",") : value,
    }));
  };

  const handleSubmit = () => {
    const url = editId ? `/api/tour-packages/${editId}` : "/api/tour-packages";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setPackages((prev) =>
            prev.map((pkg) => (pkg.id === editId ? { ...pkg, ...data } : pkg))
          );
        } else {
          setPackages((prev) => [...prev, data]);
        }
        setEditId(null);
        setFormData({
          title: "",
          description: "",
          price: "",
          availableDates: [],
          image: "",
        });
        setShowForm(false);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (pkg) => {
    setEditId(pkg.id);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      availableDates: pkg.availableDates.join(","),
      image: pkg.image,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    // Optimistically update the UI before making the API call
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  
    // Make the DELETE request to the server
    fetch(`/api/tour-packages/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete package');
        }
      })
      .catch((err) => {
        console.error(err);
        // If the deletion fails, you may want to add the package back to the state or show an error
        setPackages((prev) => [...prev, prev.find((pkg) => pkg.id === id)]);
      });
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Navigation for toggling views */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowForm(false)}
            className={`px-4 py-2 rounded-md ${
              !showForm
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            View Packages
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setFormData({
                title: "",
                description: "",
                price: "",
                availableDates: [],
                image: "",
              });
              setEditId(null);
            }}
            className={`px-4 py-2 rounded-md ${
              showForm
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {editId ? "Edit Package" : "Add Package"}
          </button>
        </div>

        {/* Conditional rendering */}
        {showForm ? (
          <PackageForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditing={!!editId}
          />
        ) : (
          <PackageList
            packages={packages}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
