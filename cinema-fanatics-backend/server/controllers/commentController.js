const Comment = require("../models/Comment");

// Get comments for a movie
exports.getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await Comment.find({ movie_id: movieId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err });
  }
};

// Post a new comment
exports.addComment = async (req, res) => {
  try {
    const { movie_id, name, email, text } = req.body;

    const newComment = new Comment({
      movie_id,
      name,
      email,
      text,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err });
  }
};
