const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews");
const { authenticate } = require("../middlewares/auth");

router.post("/books/:isbn", authenticate, reviewController.createReview);
router.get("/books/:bookId", reviewController.getReviewAll);

module.exports = router;
