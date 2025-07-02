const express = require("express");
const router = express.Router();
const shelvesController = require("../controllers/bookshelves");

// 책장에 추가
router.post("/:bookId", shelvesController.addBookToBookShelves);
router.get("/", shelvesController.getShelvesAll);

module.exports = router;
