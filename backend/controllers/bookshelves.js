const models = require("../models");

exports.getShelvesAll = async (req, res) => {
  const shelves = await models.BookShelf.findAll();
  res.status(200).json({ message: "OK", data: shelves });
};

exports.addBookToBookShelves = async (req, res) => {
  try {
    // user 정보가 있는지 확인 후 없으면 user 생성
    let user = await models.User.findOne({
      where: { email: "saltbready@example.com" },
    });

    if (!user) {
      user = await models.User.create({
        name: "소금빵",
        email: "saltbready@example.com",
        password: "12345678",
      });
    }

    const bookId = req.params.bookId;

    // bookshelves 테이블에 추가
    // userid, bookid로 중복 체크
    const bookshelf = await models.BookShelf.findOne({
      where: { userId: user.id, bookId: bookId },
    });

    if (bookshelf) {
      return res.status(404).json({ message: "이미 책장에 추가된 책입니다." });
    }

    await models.BookShelf.create({
      userId: user.id,
      bookId: bookId,
    });

    res.status(201).json({ message: "선택한 책이 책장에 추가되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "책장에 책을 추가하지 못했습니다." });
  }
};
