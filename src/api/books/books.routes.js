const express = require("express");
const Book = require("./books.model");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");
const { isAdmin } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json("Server error");
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookToFind = await Book.findById(id);
    return res.status(200).json(bookToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const allBooks = await Book.find({ title: title });
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/create", [isAdmin], upload.single("img"), async (req, res) => {
  try {
    const book = req.body;
    if (req.file) {
      book.img = req.file.path;
    }
    const newBook = new Book(book);
    const created = await newBook.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/edit/:id", [isAdmin], upload.single("img"), async (req, res) => {
  try {
    const id = req.params.id;
    const book = req.body;
    const bookOld = await Book.findById(id);

    if (req.file) {
      deleteFile(bookOld.img);
      book.img = req.file.path;
    }
    const bookModify = new Book(req.body);
    bookModify._id = id;
    const bookUpdated = await Book.findByIdAndUpdate(id, bookModify);
    return res.status(201).json(bookUpdated);
  } catch (error) {
    return res.status(500).json("Error editing book");
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const bookToDelete = await Book.findByIdAndDelete(id);
    return res
      .status(200)
      .json("Book deleted correctly");
  } catch (error) {
    return res.status(500).json("Could not delete book");
  }
});

module.exports = router;