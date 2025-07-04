const express = require("express");
const router = express.Router();
const bookmarksController = require("../controllers/bookmarks");
const { authenticate } = require("../middlewares/auth");

router.post("/books/:bookId", authenticate, bookmarksController.toggleBookmark);
router.get("/", authenticate, bookmarksController.getBookMarkAll);

module.exports = router;
