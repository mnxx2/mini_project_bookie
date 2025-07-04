const models = require("../models");

exports.toggleReviewlike = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  try {
    const [like, created] = await models.ReviewLike.findOrCreate({
      where: { userId, reviewId },
    });

    // 좋아요 -> 좋아요 삭제
    if (!created) {
      await like.destroy();
      return res.status(200).json({ message: "OK", liked: false });
    } else {
      // 좋아요 생성
      return res.status(200).json({ message: "OK", liked: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "좋아요를 할 수 없습니다." });
  }
};

// 내가 좋아요한 리뷰들
exports.getReviewlikeAll = async (req, res) => {
  const userId = req.user.id;

  const likes = await models.ReviewLike.findAll({
    where: { userId },
    include: [
      {
        model: models.Review,
        as: "review",
        attributes: ["content", "rating"],
      },
      {
        model: models.User,
        as: "userreviewlikes",
        attributes: ["name"],
      },
    ],
  });

  res.status(200).json({ message: "OK", data: likes });
};
