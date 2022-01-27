const collectionController = require("./../contollers/collectionController");
const express= require("express");
const userController = require("./../contollers/userController");

const router = express.Router();
router.use(userController.protect,userController.restrictTo('admin'));
router.route("/").patch(collectionController.updateData);
router.route("/fees-update").post(collectionController.feesUpdate);
router.route("/get-fees").get(collectionController.getFees);

module.exports = router;