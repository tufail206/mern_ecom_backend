const express=require("express")
const userController = require("../controllers/user-controllers");
const router=express.Router()
router.route("/register").post(userController.register);
router.route("/user").get(userController.user);
router.route("/login").post(userController.login);
router.route("/verify-email").get(userController.verify_email);
module.exports = router;