const express = require("express");
const router = express.Router();
const userController = require("./../contollers/userController");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
module.exports = router;