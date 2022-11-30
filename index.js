const express = require("express");
require("dotenv").config();

const db = require('./src/utils/database/db');
const indexRoutes = require('./src/api/index/index.routes')
const booksRoutes = require('./src/api/books/books.routes')
const establishmentsRoutes = require('./src/api/establishments/establishments.routes')
const usersRoutes = require('./src/api/users/users.routes')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectDb();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
server.use("/books", booksRoutes);
server.use("/users", usersRoutes);
server.use("/establishments", establishmentsRoutes);

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});
