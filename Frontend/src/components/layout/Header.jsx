// components/layout/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tour Packages</h1>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin" className="mr-4">Admin Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

