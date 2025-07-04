const express = require("express");
const router = express.Router();
const booklikesController = require("../controllers/booklikes");
const { authenticate } = require("../middlewares/auth");

// 책 좋아요 토글
router.post("/books/:bookId", authenticate, booklikesController.toggleBooklike);
// 내가 좋아요한 책들 목록
router.get("/", authenticate, booklikesController.getBooklikeAll);

module.exports = router;
