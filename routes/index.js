var express = require('express');
var router = express.Router();
var adminRoutes = require('./admin');
var userRoutes = require('./users');
var authRoutes = require('./auth');
var auth = require('../middleware/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/admin',auth.authenticateToken, adminRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
