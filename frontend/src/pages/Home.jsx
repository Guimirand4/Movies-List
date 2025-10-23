import React, { useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await api.get(`/movies/search?query=${query}`);
    setMovies(response.data.results);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 Buscador de Filmes</h1>
      <input
        type="text"
        placeholder="Digite o nome do filme..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
