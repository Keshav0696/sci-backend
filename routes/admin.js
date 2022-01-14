var express = require('express');
var router = express.Router();
const adminController =  require("../controllers/admin.controller")
/* GET users listing. */
router.post('/addStudent', adminController.addStudent);

module.exports = router;
