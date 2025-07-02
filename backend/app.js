const express = require("express");
const models = require("./models");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Bookie 서버가 http://localhost:${PORT}에서 실행중 입니다.`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Bookie DB Connection");
    })
    .catch(() => {
      console.log("Bookie DB Error");
      process.exit();
    });
});
