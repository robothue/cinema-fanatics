const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String, // commenter's name
  email: String,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: { type: Date, default: Date.now },
}, { collection: "comments" });

module.exports = mongoose.model("Comment", commentSchema);
