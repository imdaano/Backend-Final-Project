const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const establishmentSchema = new Schema(
    {
        
    },
    {
        timestamps: true
    }
);

const Establishment = mongoose.model('establishment', establishmentSchema);
module.exports = User;