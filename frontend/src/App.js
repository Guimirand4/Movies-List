import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Favorites from "./components/Favorites";


function Navbar() {
  const location = useLocation();

  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "background 0.3s ease, transform 0.2s ease",
  };

  const activeStyle = {
    backgroundColor: "#ff3c00",
    boxShadow: "0 0 10px rgba(255,60,0,0.4)",
    transform: "scale(1.05)",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          ...linkStyle,
          ...(location.pathname === "/" ? activeStyle : {}),
        }}
      >
        🏠 Início
      </Link>
      <Link
        to="/favoritos"
        style={{
          ...linkStyle,
          ...(location.pathname === "/favoritos" ? activeStyle : {}),
        }}
      >
        ⭐ Favoritos
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>

   
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      />
    </BrowserRouter>
  );
}
