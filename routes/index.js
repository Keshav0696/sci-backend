var express = require('express');
var router = express.Router();
var adminRoutes = require('./admin')
var auth = require('../middleware/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/admin',auth.authenticateToken, adminRoutes);
module.exports = router;
