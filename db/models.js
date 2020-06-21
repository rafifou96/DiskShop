const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create a type for my Schema
const diskShema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports.DiskModel = mongoose.model("DiskModel", diskShema);
