import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        setFavorites(response.data);
      } catch (error) {
        toast.error("❌ Erro ao carregar favoritos!");
      }
    };
    loadFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((movie) => movie.id !== id));
      toast.info("🗑️ Filme removido dos favoritos!");
    } catch {
      toast.error("❌ Não foi possível remover o filme.");
    }
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
        ⭐ Meus Favoritos
      </h1>

      {favorites.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "1.1rem",
          }}
        >
          😔 Nenhum filme favoritado ainda. Que tal adicionar um?
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
          {favorites.map((movie) => (
            <div
              key={movie.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "15px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                {movie.title}
              </h3>
              <p style={{ opacity: 0.8 }}>⭐ {movie.vote_average}</p>
              <button
                onClick={() => handleRemove(movie.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ff3c00",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "8px 20px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e63600")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff3c00")}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
