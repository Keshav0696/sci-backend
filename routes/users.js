var express = require('express');
var router = express.Router();
const userController =  require("../controllers/user.controller")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var auth = require('../middleware/auth');

router.post('/listSubjectsFromClass',  userController.listSubjectsFromClass);
router.get('/getSubjectDetail/:id',  userController.getSubjectDetail);


module.exports = router;
