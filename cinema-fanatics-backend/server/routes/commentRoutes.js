const express = require("express");
const router = express.Router();
const { getCommentsByMovie, addComment } = require("../controllers/commentController");

router.get("/:movieId", getCommentsByMovie);
router.post("/", addComment); // later: protect with auth middleware

module.exports = router;
