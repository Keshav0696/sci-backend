const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const User = mongoose.model('user');

module.exports = {

    authenticateToken : async function(req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token
      
        jwt.verify(token, process.env.TOKEN_SECRET , async (err, data) => {
          if (err) return res.sendStatus(403)

          let {_id : user_id} = data;
          let user =  await User.findOne({_id : user_id}, {email:1, role:1});
          req.user = user;
          next() // pass the execution off to whatever request the client intended
        })
      }
}