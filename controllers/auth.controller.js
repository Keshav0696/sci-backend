const mongoose = require('mongoose')
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  let {email, password} = req.body;
  let body ={email, password};
  for (var p in body) {
    if (!body[p]) {
        return res.status(400).send({ status: 400, message: `Please send ${p}` })
    }
}
  User.findOne({ email: email }, { password: 1 })
    .exec()
    .then(function(user) {
      bcrypt.compare(password, user.password, (err, result) => {        
        if (err) {
          return res.status(401).send('error');
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            _id: user._id
          },
          process.env.TOKEN_SECRET);
          return res.status(200).json({
            success: 'jwt',
            token: token
          });
        }
        return res.status(401).send('Problem with login');
      });
    })
    .catch(err => {
      res.status(401).send(err);
    });
    }

