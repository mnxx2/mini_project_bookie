const models = require("../models");

exports.toggleBooklike = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    const [like, created] = await models.BookLike.findOrCreate({
      where: { userId, bookId },
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

// 내가 좋아요한 책들
exports.getBooklikeAll = async (req, res) => {
  const userId = req.user.id;

  const likes = await models.BookLike.findAll({
    where: { userId },
    include: [
      {
        model: models.Book,
        as: "booklikes",
        attributes: ["title", "authors", "thumbnail"],
      },
    ],
  });

  res.status(200).json({ message: "OK", data: likes });
};
