const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
    {
        
    },
    {
        timestamps: true
    }
);

const Books = mongoose.model('books', booksSchema);
module.exports = Books;