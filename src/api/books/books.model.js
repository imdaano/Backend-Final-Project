const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
    {
        
    },
    {
        timestamps: true
    }
);

const Books = mongoose.model('establishment', booksSchema);
module.exports = User;