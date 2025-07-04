const models = require("../models");

exports.toggleBookmark = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  console.log(userId, bookId);
  try {
    const [mark, created] = await models.BookMark.findOrCreate({
      where: { userId, bookId },
    });

    // 북마크 -> 북마크 삭제
    if (!created) {
      await mark.destroy();
      return res.status(200).json({ message: "OK", marked: false });
    } else {
      // 북마크 생성
      return res.status(200).json({ message: "OK", marked: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "북마크를 할 수 없습니다." });
  }
};

// 내가 북마크한 책들
exports.getBookMarkAll = async (req, res) => {
  const userId = req.user.id;

  const marks = await models.BookMark.findAll({
    where: { userId },
    include: [
      {
        model: models.Book,
        as: "bookmarks",
        attributes: ["title", "authors", "thumbnail"],
      },
    ],
  });

  res.status(200).json({ message: "OK", data: marks });
};
