const express = require("express");
const documentController = require("./../contollers/documentController");
const userController = require("./../contollers/userController");

const router = express.Router();

router.use(userController.protect,userController.restrictTo('admin'));
router.post('/uploadFile',documentController.fileUploader,documentController.uploadFile);
router.post("/uploadPic",documentController.fileUploaderPic,documentController.resizeUserPhoto,documentController.updatePicStudent);
router.post("/uploadDoc",documentController.fileUploaderDoc,documentController.updateDocStudent);
router.delete("/deleteDoc",documentController.deleteDoc);
router.delete("/deleteDoc/:id",documentController.deleteDocByParams);

module.exports = router;




