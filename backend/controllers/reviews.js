const models = require("../models");

// exports.createReview = async (req, res) => {
//   const isbnRaw = req.params.isbn;
//   const isbn = isbnRaw.replace(/-/g, "");
//   const { content, rating } = req.body;

//   const userId = 1;
//   try {
//     const review = await models.Review.create({
//       content,
//       rating,
//       isbn,
//       userId,
//     });

exports.createReview = async (req, res) => {
  const isbn = req.params.isbn;
  const { content, rating } = req.body;

  try {
    const book = await models.Book.findOne({
      where: { isbn },
    });

    if (!book) {
      console.log(book);
      console.log(isbn);
      return res.status(404).json({ message: "책을 찾을 수 없습니다." });
    }

    const userId = req.user.id;
    const review = await models.Review.create({
      content,
      rating,
      bookId: book.id,
      userId,
    });

    res.status(201).json({ message: "OK", data: review });
  } catch (error) {
    console.error("리뷰 작성 에러:", error);
    res
      .status(500)
      .json({ message: "리뷰 작성에 실패했습니다.", error: error.message });
  }
};

//     res.status(201).json({ message: "OK", data: review });
//   } catch (error) {
//     console.error("리뷰 작성 에러 : ", error);
//     res
//       .status(404)
//       .json({ message: "책을 찾지 못해 리뷰를 작성할 수 없습니다." });
//   }
// };

// 각 책별 리뷰 목록
exports.getReviewAll = async (req, res) => {
  const bookId = req.params.bookId;

  const book = await models.Book.findOne({ where: { id: bookId } });

  if (!book) {
    console.log(book);
    res.status(404).json({ message: "선택한 책이 없습니다." });
  }
  const reviews = await models.Review.findAll({ where: { bookId: book.id } });

  if (reviews.length === 0) {
    return res.status(404).json({ message: "아직 등록된 리뷰가 없습니다." });
  }

  res.status(200).json({ message: "OK", data: reviews });
};
