const express = require("express")
const router = express.Router();
const viewController = require("./../contollers/viewController");
const userController = require('./../contollers/userController');

router.use(userController.isLoggedIn);
router.route("/").get(viewController.overview);
router.get("/login",viewController.login);
router.get("/me",viewController.me);
router.get("/signup",viewController.signup);
router.post("/excel",userController.protect,viewController.excelPrintData);
router.route("/studentInfo").get( userController.protect,viewController.studentInfo);
router.route("/studentInfo/fees-update").get(userController.protect,viewController.feesUpdate);
router.route("/studentInfo/sr-excel").get(userController.protect,viewController.excelPrintSr);
router.route("/studentInfo/sr-main").get(userController.protect,viewController.srMain);
router.route("/studentInfo/sr-find/:id1/:id2/:id3").get(userController.protect,viewController.srFind);
router.route("/studentInfo/sr-find-fee/:id1/:id2/:id3").get(userController.protect,viewController.srFindFees);
router.route("/studentInfo/get-one-sr/:id1/:id2").get(userController.protect,viewController.srGet);
router.route("/studentInfo/print-one-sr/:id1/:id2").get(userController.protect,viewController.srPrint);
router.route("/studentInfo/sr-add").get(userController.protect,viewController.srGet);
router.route("/studentInfo/get-one").get(userController.protect,viewController.getOneStudent);
router.route("/studentInfo/get-all").get(userController.protect,viewController.getAllStudent);
router.route("/studentInfo/get-all?/:id1/:id2").get(userController.protect,viewController.getAllStudentData);
router.route("/studentInfo/get-one/:id1/:id2/:id3/:id4").get(userController.protect,viewController.getStudentData);
router.route("/studentInfo/get-one/:id").get(userController.protect,viewController.getOneStudentData);
router.route("/studentInfo/add-one").get(userController.protect,viewController.addStudentData);
router.route("/studentInfo/feesToday").get(userController.protect,viewController.feesToday);
router.route("/studentInfo/feesRecord").get(userController.protect,viewController.feesRecord);
router.route("/documentInfo").get(userController.protect,viewController.documentInfo);
router.route("/documentInfo/download").get(userController.protect,viewController.downloader)
router.route("/documentInfo/upload").get(userController.protect,viewController.uploader);
router.route("/documentInfo/list/:id1/:id2").get(userController.protect,viewController.documentList);
router.route("/studentInfo/printExcelFees").get(userController.protect,viewController.excelPrintFees);
router.route("/studentInfo/printExcel").get(userController.protect,viewController.excelPrint);
router.route("/studentInfo/displayFeeRecord").get(userController.protect,viewController.displayFeeRecord);
router.route("/studentInfo/promote-form").get(userController.protect,viewController.promoteForm);
module.exports = router;