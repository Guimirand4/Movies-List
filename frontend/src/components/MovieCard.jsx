import React from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  const handleAddFavorite = async () => {
    try {
      await api.post("/favorites", movie);
      toast.success("🎉 Filme adicionado aos favoritos!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warn("⚠️ Este filme já está nos favoritos!");
      } else {
        toast.error("❌ Erro ao adicionar o filme.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "15px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        color: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        fontFamily: "'Poppins', sans-serif",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      }}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=Sem+Imagem"
        }
        alt={movie.title}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "10px",
          objectFit: "cover",
        }}
      />
      <h3
        style={{
          fontSize: "1.1rem",
          margin: "10px 0",
          minHeight: "48px",
        }}
      >
        {movie.title}
      </h3>
      <p style={{ opacity: 0.8, marginBottom: "10px" }}>⭐ {movie.vote_average}</p>
      <button
        onClick={handleAddFavorite}
        style={{
          backgroundColor: "#ff3c00",
          color: "#fff",
          border: "none",
          borderRadius: "25px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "600",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e63600")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff3c00")}
      >
        ❤️ Favoritar
      </button>
    </div>
  );
}
