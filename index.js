const express = require("express");
require("dotenv").config();

const db = require('./src/utils/database/db');
const indexRoutes = require('./src/api/index/index.routes')
const booksRoutes = require('./src/api/books/books.routes')
const checkpointRoutes = require('./src/api/checkpoints/checkpoints.routes')
const usersRoutes = require('./src/api/users/users.routes')
const cors = require("./src/api/users/users.model")
const cloudinary = require("cloudinary").v2;

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

server.use(cors({
  origin: '*',
  credentials: true
}));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
server.use("/books", booksRoutes);
server.use("/users", usersRoutes);
server.use("/checkpoints", checkpointRoutes);

server.use('*', (req, res) => {
  const error = new Error('Route not found');
  error.status = 404;
  return res.status(error.status).json(error.message);
});

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});