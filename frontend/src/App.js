import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Favorites from "./components/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 10, padding: 10 }}>
        <Link to="/">🏠 Início</Link>
        <Link to="/favoritos">⭐ Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>

      {/* Toast container (global) */}
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}
