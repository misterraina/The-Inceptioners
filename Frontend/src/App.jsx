// App.js
import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Login from "./components/auth/Login";
import TourPackages from "./components/TourPackages";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminDashboard from "./components/admin/AdminDashboard";
import BookingPage from "./components/BookingPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
              <Header />
              <TourPackages />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/book/:id"
          element={
            <>
              <Header />
              <BookingPage />
              <Footer />
            </>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
