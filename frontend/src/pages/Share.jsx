import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

export default function Share() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSharedList = async () => {
      try {
        const response = await api.get(`/share/${id}`);
        if (!response.data || response.data.length === 0) {
          setNotFound(true);
        } else {
          setMovies(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("❌ Erro ao carregar lista compartilhada.");
        setNotFound(true);
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
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h2>⏳ Carregando lista compartilhada...</h2>
      </div>
    );
  }

  if (notFound) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
        }}
      >
        <h2>😕 Lista não encontrada ou vazia</h2>
        <p style={{ opacity: 0.8 }}>
          O link pode ter expirado ou não conter filmes favoritos.
        </p>
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
    </div>
  );
}
