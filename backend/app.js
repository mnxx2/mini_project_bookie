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

app.use(express.json());

app.use("/books", booksRouter);
app.use("/bookshelves", shelvesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/booklikes", booklikesRouter);

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
