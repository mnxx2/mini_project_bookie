const express = require("express");
const router = express.Router();
const reviewlikesController = require("../controllers/reviewlikes");
const { authenticate } = require("../middlewares/auth");

// 리뷰 좋아요 토글
router.post(
  "/reviews/:reviewId",
  authenticate,
  reviewlikesController.toggleReviewlike
);

// 내가 좋아요한 리뷰 목록
router.get("/", authenticate, reviewlikesController.getReviewlikeAll);

module.exports = router;
