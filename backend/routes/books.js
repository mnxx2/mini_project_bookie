const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");
const { authenticate } = require("../middlewares/auth");

router.get("/", bookController.searchBooks);
router.post("/:isbn", authenticate, bookController.addBook);
router.get("/detail", bookController.getBook);
router.get("/recent", authenticate, bookController.getRecentBooks);

module.exports = router;
