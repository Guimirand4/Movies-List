import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_API = "https://api.themoviedb.org/3";

// 🎬 Buscar filmes
app.get("/movies/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(`${TMDB_API}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        language: "pt-BR",
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro na requisição TMDb:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Erro ao buscar filmes",
      details: error.response?.data || error.message,
    });
  }
});

// 🎬 Detalhes de um filme
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${TMDB_API}/movie/${id}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "pt-BR",
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Erro ao buscar detalhes do filme",
      details: error.response?.data || error.message,
    });
  }
});

// 🗂️ Configuração de favoritos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FAVORITES_PATH = path.join(__dirname, "db", "favorites.json");

function readFavorites() {
  const data = fs.readFileSync(FAVORITES_PATH, "utf-8");
  return JSON.parse(data);
}

function writeFavorites(data) {
  fs.writeFileSync(FAVORITES_PATH, JSON.stringify(data, null, 2));
}

// ➕ Adicionar favorito
app.post("/favorites", (req, res) => {
  const movie = req.body;
  const favorites = readFavorites();

  if (favorites.find((f) => f.id === movie.id)) {
    return res
      .status(400)
      .json({ error: "Este filme já está nos favoritos!" });
  }

  favorites.push(movie);
  writeFavorites(favorites);
  res.json({ message: "Filme adicionado aos favoritos!" });
});

// ➖ Remover favorito
app.delete("/favorites/:id", (req, res) => {
  const { id } = req.params;
  let favorites = readFavorites();
  favorites = favorites.filter((f) => f.id !== parseInt(id));
  writeFavorites(favorites);
  res.json({ message: "Filme removido!" });
});

// 📋 Listar favoritos
app.get("/favorites", (req, res) => {
  const favorites = readFavorites();
  res.json(favorites);
});

// 🚀 Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
