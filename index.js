const express = require("express");
require("dotenv").config();







/* cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


connectDb();

const PORT = process.env.PORT;
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
server.use("/info", infoRoutes);
server.use("/users", usersRoutes);
server.use("/movies", moviesRoutes);

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});
 */