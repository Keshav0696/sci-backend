var express = require('express');
var router = express.Router();
const adminController =  require("../controllers/admin.controller")
/* GET users listing. */
router.post('/addStudent', adminController.addStudent);
router.post('/addSubject', adminController.addSubject);
router.post('/addClass', adminController.addClass);
router.get('/getProfile', adminController.getProfile);
router.get('/getAllStudents', adminController.getAllStudents);
router.get('/getAllClasses', adminController.getAllClasses);
router.get('/getAllSubjects', adminController.getAllSubjects);
router.get('/getSubjectById/:id', adminController.getSubjectById);


module.exports = router;
