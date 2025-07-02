const express = require("express");
const router = express.Router();
const shelvesController = require("../controllers/bookshelves");

router.get("/", shelvesController.getShelvesAll);

module.exports = router;
