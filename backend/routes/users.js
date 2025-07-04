const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { authenticate } = require("../middlewares/auth");

// router.post("/", userController.createUser);
router.get("/:email", userController.findUserByEmail);
router.put("/:id", authenticate, userController.updateuser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
