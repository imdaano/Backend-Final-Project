const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkpointSchema = new Schema(
  {
    name: { type: String, trim: true },
    img: { type: String, trim: true },
    location: {
      type: { type: String, trim: true },
      coordinates: [Number] ,
    },
    address: { type: String, trim: true},
    phone: { type: String },
    books: [{type: mongoose.Types.ObjectId, ref: "books"}]
  },
  {
    timestamps: true,
  }
);

const Checkpoint = mongoose.model("checkpoints", checkpointSchema);
module.exports = Checkpoint;
