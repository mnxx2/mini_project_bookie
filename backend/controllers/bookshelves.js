const models = require("../models");

exports.getShelvesAll = async (req, res) => {
  const shelves = await models.BookShelf.findAll();
  res.status(200).json({ message: "OK", data: shelves });
};
