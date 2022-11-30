const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    username: { type: String, trim: true },
    photo: { type: String, required: true, trim: true},
    name: { type: String, trim: true },
    lastName: { type: String, trim: true },
    city: { type: String , trim: true},
    rol: { type: String, enum: ["admin", "user", "checkpoint"], default: "user"}, 
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
