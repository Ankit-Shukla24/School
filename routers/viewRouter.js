const express = require("express")
const router = express.Router();
const viewController = require("./../contollers/viewController");
const userController = require('./../contollers/userController');

router.use(userController.isLoggedIn);
router.route("/").get(viewController.overview);
router.get("/login",viewController.login);
router.get("/me",viewController.me);
router.get("/signup",viewController.signup);
router.post("/excel",userController.protect,userController.restrictTo('admin'),viewController.excelPrintData);
router.route("/studentInfo").get( userController.protect,userController.restrictTo('admin'),viewController.studentInfo);
router.route("/studentInfo/fees-update").get(userController.protect,userController.restrictTo('admin'),viewController.feesUpdate);
router.route("/studentInfo/sr-excel").get(userController.protect,userController.restrictTo('admin'),viewController.excelPrintSr);
router.route("/studentInfo/sr-main").get(userController.protect,userController.restrictTo('admin'),viewController.srMain);
router.route("/studentInfo/sr-find/:id1/:id2/:id3").get(userController.protect,userController.restrictTo('admin'),viewController.srFind);
router.route("/studentInfo/sr-find-fee/:id1/:id2/:id3").get(userController.protect,userController.restrictTo('admin'),viewController.srFindFees);
router.route("/studentInfo/get-one-sr/:id1/:id2").get(userController.protect,userController.restrictTo('admin'),viewController.srGet);
router.route("/studentInfo/print-one-sr/:id1/:id2").get(userController.protect,userController.restrictTo('admin'),viewController.srPrint);
router.route("/studentInfo/sr-add").get(userController.protect,userController.restrictTo('admin'),viewController.srGet);
router.route("/studentInfo/get-one").get(userController.protect,userController.restrictTo('admin'),viewController.getOneStudent);
router.route("/studentInfo/get-all").get(userController.protect,userController.restrictTo('admin'),viewController.getAllStudent);
router.route("/studentInfo/get-all?/:id1/:id2").get(userController.protect,userController.restrictTo('admin'),viewController.getAllStudentData);
router.route("/studentInfo/get-one/:id1/:id2/:id3/:id4").get(userController.protect,userController.restrictTo('admin'),viewController.getStudentData);
router.route("/studentInfo/get-one/:id").get(userController.protect,userController.restrictTo('admin'),viewController.getOneStudentData);
router.route("/studentInfo/add-one").get(userController.protect,userController.restrictTo('admin'),viewController.addStudentData);
router.route("/studentInfo/feesToday").get(userController.protect,userController.restrictTo('admin'),viewController.feesToday);
router.route("/studentInfo/feesRecord").get(userController.protect,userController.restrictTo('admin'),viewController.feesRecord);
router.route("/documentInfo").get(userController.protect,userController.restrictTo('admin'),viewController.documentInfo);
router.route("/documentInfo/download").get(userController.protect,userController.restrictTo('admin'),viewController.downloader)
router.route("/documentInfo/upload").get(userController.protect,userController.restrictTo('admin'),viewController.uploader);
router.route("/documentInfo/list/:id1/:id2").get(userController.protect,userController.restrictTo('admin'),viewController.documentList);
router.route("/studentInfo/printExcelFees").get(userController.protect,userController.restrictTo('admin'),viewController.excelPrintFees);
router.route("/studentInfo/printExcel").get(userController.protect,userController.restrictTo('admin'),viewController.excelPrint);
router.route("/studentInfo/displayFeeRecord").get(userController.protect,userController.restrictTo('admin'),viewController.displayFeeRecord);
router.route("/studentInfo/promote-form").get(userController.protect,userController.restrictTo('admin'),viewController.promoteForm);
module.exports = router;