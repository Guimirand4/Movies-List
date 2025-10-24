import React, { useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const response = await api.get(`/movies/search?query=${query}`);
    setMovies(response.data.results);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "30px",
          letterSpacing: "1px",
        }}
      >
        🎬 Buscador de Filmes
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "300px",
            padding: "12px 15px",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            boxShadow: "0 0 10px rgba(255,255,255,0.2)",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#ff3c00",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            padding: "12px 25px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e63600")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff3c00")}
        >
          Buscar
        </button>
      </div>

      {movies.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.8 }}>
          🔎 Nenhum filme encontrado. Tente buscar algo!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
