# 🎬 Verzel Movie List
 
---

## 🧩 Tecnologias Utilizadas

### 💻 Backend
- **Node.js** + **Express**
- **Axios** para integração com a API do TMDb
- **CORS**
- **dotenv** para variáveis de ambiente
- Armazenamento local simples via **JSON**

### 🎨 Frontend
- **React.js**
- **Axios** para comunicação com o backend
- **React Router DOM** para navegação
- **React Toastify** para notificações
- Estilização com **CSS** simples e responsiva

---

## 🚀 Como Rodar o Projeto

### 🖥️ 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/verzel-movie-list.git
cd verzel-movie-list

⚙️ 2. Rodar o Backend
cd backend
npm install
cp .env.example .env


Preencha sua chave do TMDb no arquivo .env:

TMDB_API_KEY=sua_chave_tmdb_aqui
DATABASE_URL=sua_url_do_neondb_aqui
PORT=5000


Depois, execute:

npm run dev


Servidor disponível em:
👉 http://localhost:5000

 3. Rodar o Frontend

Em outro terminal:

cd ../frontend
npm install
npm start


Acesse:
👉 http://localhost:3000

🧠 Funcionalidades

✅ Buscar filmes na API do TMDb
✅ Exibir informações como título, nota e imagem
✅ Adicionar filmes aos favoritos
✅ Listar e remover favoritos
✅ Alertas visuais com Toastify
✅ Interface intuitiva e responsiva

🛠️ Endpoints do Backend
Método	Rota	Descrição
GET	/movies/search?query=batman	Busca filmes por nome
GET	/movies/:id	Retorna detalhes de um filme
GET	/favorites	Lista todos os favoritos
POST	/favorites	Adiciona um filme aos favoritos
DELETE	/favorites/:id	Remove um filme dos favoritos

⚠️ Observação

Todo o sistema está funcionando, incluindo busca, favoritos e banco de dados online.
O link de compartilhamento gera corretamente a lista de filmes, mas, por estar hospedado em projetos separados, a tela /share/:id exibe apenas o JSON, sem o visual do React.
