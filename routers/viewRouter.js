const express = require("express")
const router = express.Router();
const viewController = require("./../contollers/viewController");
const userController = require('./../contollers/userController');

router.use(userController.isLoggedIn);
router.route("/").get(viewController.overview);
router.get("/login",viewController.login);
router.get("/signup",viewController.signup);
router.post("/excel",viewController.excelPrintData);
router.route("/studentInfo").get(viewController.studentInfo);
router.route("/studentInfo/fees-update").get(userController.protect,viewController.feesUpdate);
router.route("/studentInfo/sr-excel").get(viewController.excelPrintSr);
router.route("/studentInfo/sr-main").get(viewController.srMain);
router.route("/studentInfo/sr-find/:id1/:id2/:id3").get(viewController.srFind);
router.route("/studentInfo/get-one-sr/:id1/:id2").get(userController.protect,viewController.srGet);
router.route("/studentInfo/print-one-sr/:id1/:id2").get(userController.protect,viewController.srPrint);
router.route("/studentInfo/sr-add").get(userController.protect,viewController.srGet);
router.route("/studentInfo/get-one").get(viewController.getOneStudent);
router.route("/studentInfo/get-all").get(viewController.getAllStudent);
router.route("/studentInfo/get-all?/:id1/:id2").get(viewController.getAllStudentData);
router.route("/studentInfo/get-one/:id1/:id2/:id3/:id4").get(viewController.getStudentData);
router.route("/studentInfo/get-one/:id").get(viewController.getOneStudentData);
router.route("/studentInfo/add-one").get(viewController.addStudentData);
router.route("/studentInfo/feesToday").get(viewController.feesToday);
router.route("/studentInfo/feesRecord").get(viewController.feesRecord);
router.route("/documentInfo").get(viewController.documentInfo);
router.route("/documentInfo/download").get(viewController.downloader)
router.route("/documentInfo/upload").get(viewController.uploader);
router.route("/documentInfo/list/:id1/:id2").get(viewController.documentList);
router.route("/studentInfo/printExcelFees").get(viewController.excelPrintFees);
router.route("/studentInfo/printExcel").get(viewController.excelPrint);
router.route("/studentInfo/displayFeeRecord").get(viewController.displayFeeRecord);
router.route("/studentInfo/promote-form").get(viewController.promoteForm);
module.exports = router;