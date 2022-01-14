var express = require('express');
var router = express.Router();
const authController =  require("../controllers/auth.controller")
/* GET users listing. */
router.post('/login', authController.login);
router.post('/sendOtp', authController.sendOtp);
router.post('/verifyOtp', authController.verifyOtp);


module.exports = router;
