const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4"); 

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Listar
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Cadastrar
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { 
    id: uuid(), 
    title, 
    url, 
    techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.json(repositories);
});

// Atualizar
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositoryIndex) {
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  const repositorie = {
    id,
    title,
    url,
    techs
  }

  repositories[repositoryIndex] = repositorie;

  return response.json(repositorie);
});

// Deletar
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositoryIndex) {
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

// Update likes
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositoryIndex) {
    return response.status(400).json({ error: 'Repositorie not found!' });
  }

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;

  return res.status(200).json({ likes: repositories[repositoryIndex].likes });
});

module.exports = app;
