var express = require('express');
var router = express.Router();
const adminController =  require("../controllers/admin.controller")
/* GET users listing. */
router.post('/addStudent', adminController.addStudent);
router.post('/addSubject', adminController.addSubject);
router.post('/addClass', adminController.addClass);


module.exports = router;
