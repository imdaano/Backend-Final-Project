const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const establishmentSchema = new Schema(
  {
    name: { type: String, trim: true },
    img: { type: String, trim: true },
    location: {
      type: { type: String, trim: true },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

const Establishment = mongoose.model("establishment", establishmentSchema);
module.exports = Establishment;
