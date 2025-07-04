require("dotenv").config();
const express = require("express");
const models = require("./models");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const booksRouter = require("./routes/books");
const shelvesRouter = require("./routes/bookshelves");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const booklikesRouter = require("./routes/booklikes");
const reviewlikesRouter = require("./routes/reviewlikes");
const bookmarksRouter = require("./routes/bookmarks");

app.use(express.json());

app.use("/books", booksRouter);
app.use("/bookshelves", shelvesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/booklikes", booklikesRouter);
app.use("/reviewlikes/", reviewlikesRouter);
app.use("/bookmarks", bookmarksRouter);

// 404 에러 처리
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없습니다.",
  });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "ERROR",
    message: `server error : ${err.stack}`,
  });
});

app.listen(PORT, () => {
  console.log(`Bookie 서버가 http://localhost:${PORT}에서 실행중 입니다.`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Bookie DB Connection");
    })
    .catch((error) => {
      console.log("Bookie DB Error", error);
      process.exit();
    });
});
