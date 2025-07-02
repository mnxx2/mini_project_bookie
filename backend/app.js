require("dotenv").config();
const express = require("express");
const models = require("./models");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const bookRouter = require("./routes/books");
const shelvesRouter = require("./routes/bookshelves");

app.use(express.json());

app.use("/books", bookRouter);
app.use("/bookshelves", shelvesRouter);

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
