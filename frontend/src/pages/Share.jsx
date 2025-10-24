import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

export default function Share() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedList = async () => {
      try {
        const response = await api.get(`/share/${id}`);
        setMovies(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.warn("⚠️ Nenhuma lista encontrada para este link.");
        } else {
          toast.error("❌ Erro ao carregar a lista compartilhada.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedList();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.2rem",
        }}
      >
        ⏳ Carregando lista compartilhada...
      </div>
    );
  }

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
        🎬 Lista Compartilhada
      </h1>

      {movies.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "1.1rem",
          }}
        >
          ⚠️ Nenhum filme encontrado para este link.
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
    