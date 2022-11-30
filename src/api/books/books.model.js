const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    author: { type: String, trim: true },
    genre: { type: String, trim: true },
    synopsis: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("books", booksSchema);
module.exports = Books;
