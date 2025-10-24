import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

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
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// 📋 Listar favoritos
app.get("/favorites", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM favorites ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    res.status(500).json({ error: "Erro ao listar favoritos" });
  }
});

// ➕ Adicionar favorito
app.post("/favorites", async (req, res) => {
  const { id, title, poster_path, vote_average } = req.body;
  try {
    const exists = await pool.query("SELECT 1 FROM favorites WHERE id = $1", [id]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "Filme já está nos favoritos" });
    }

    await pool.query(
      "INSERT INTO favorites (id, title, poster_path, vote_average) VALUES ($1, $2, $3, $4)",
      [id, title, poster_path, vote_average]
    );

    res.json({ message: "🎬 Filme adicionado aos favoritos!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar favorito" });
  }
});

// ➖ Remover favorito
app.delete("/favorites/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM favorites WHERE id = $1", [id]);
    res.json({ message: "🗑️ Filme removido dos favoritos!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover favorito" });
  }
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
