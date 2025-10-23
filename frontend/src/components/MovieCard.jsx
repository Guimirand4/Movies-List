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
      <button onClick={handleAddFavorite}>Favoritar</button>
    </div>
  );
}
