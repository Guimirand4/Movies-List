import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Carrega os favoritos ao abrir a página
  useEffect(() => {
    const loadFavorites = async () => {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    };
    loadFavorites();
  }, []);

const handleRemove = async (id) => {
  await api.delete(`/favorites/${id}`);
  setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  toast.info("🗑️ Filme removido dos favoritos!");
};

  return (
    <div style={{ padding: 20 }}>
      <h1>⭐ Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p>Nenhum filme favoritado ainda 😔</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favorites.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                margin: 10,
                padding: 10,
                width: 200,
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: 10 }}
              />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
              <button onClick={() => handleRemove(movie.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
