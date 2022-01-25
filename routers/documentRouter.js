const express = require("express");
const documentController = require("./../contollers/documentController");
const userController = require("./../contollers/userController");

const router = express.Router();

// router.use(userController.protect);
router.post('/uploadFile',documentController.fileUploader,documentController.uploadFile);
router.post("/uploadPic",documentController.fileUploaderPic,documentController.resizeUserPhoto,documentController.updatePicNumAndStudent);
router.post("/uploadDoc",documentController.fileUploaderDoc,documentController.updateDocNumAndStudent);
router.delete("/deleteDoc",documentController.deleteDoc);
module.exports = router;