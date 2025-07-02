require("dotenv").config();
const models = require("../models");

// 카카오 api 를 사용해 책 검색 목록 조회
exports.searchBooks = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: "검색어를 입력해주세요." });
  }

  try {
    const url = `https://dapi.kakao.com/v3/search/book?query=${query}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! STATUS : ${response.status}`);
    }

    const data = await response.json();
    res.json(data.documents);
  } catch (error) {
    console.error("Kakao API Error:", error.message);
    console.log("authorization key : " + process.env.API_KEY);
    res.status(500).json({ message: "카카오 API 요청 실패" });
  }
};

// 책을 선택하면 books 테이블에 저장 POST
exports.addBook = async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${isbn}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(404).json({ message: "카카오 API 호출 실패" });
    }

    const jsondata = await response.json();
    const data = jsondata.documents;

    // 첫 번째 책 선택 또는 isbn 포함된 책 찾기
    const bookData =
      data.find((doc) =>
        doc.isbn.replace(/-/g, "").includes(isbn.replace(/-/g, ""))
      ) || data[0];

    if (!bookData) {
      return res.status(404).json({ message: "책 정보를 찾을 수 없습니다." });
    }

    // authors가 배열이면 JSON 문자열로 변환해서 저장
    const authorsStr = Array.isArray(bookData.authors)
      ? JSON.stringify(bookData.authors)
      : bookData.authors;

    // isbn 중복 체크
    let book = await models.Book.findOne({ where: { isbn: bookData.isbn } });

    // 중복 책이 없으면 books 테이블에 저장
    if (!book) {
      book = await models.Book.create({
        title: bookData.title,
        authors: authorsStr,
        publisher: bookData.publisher,
        isbn: bookData.isbn,
        thumbnail: bookData.thumbnail,
        contents: bookData.contents,
      });
    }

    // req.book = book;
    res.status(200).json({ message: "OK", data: book });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "책 저장 실패" });
  }
};
