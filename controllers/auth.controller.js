const mongoose = require('mongoose')
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validOptions = { apikey: process.env.TEXTLOCALKEY };
const tl = require('textlocal')(validOptions); 
 
var http = require('http');
var urlencode = require('urlencode');

module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    let body = { email, password };
    for (var p in body) {
        if (!body[p]) {
            return res.send({ status: 400, message: `Please send ${p}` })
        }
    }
    User.findOne({ email: email }, { password: 1 })
        .exec()
        .then(function (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.send('error');
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                        process.env.TOKEN_SECRET);
                    return res.json({
                        success: 'jwt',
                        token: token
                    });
                }
                return res.send('Problem with login');
            });
        })
        .catch(err => {
            res.send(err);
        });
}


module.exports.sendOtp = async (req, res) => {
    try {
        let { phone_no } = req.body;
        let body = { phone_no };
        for (var p in body) {
            if (!body[p]) {
                return res.send({ status: 400, message: `Please send ${p}` })
            }
        }
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        let user_create = await User.findOneAndUpdate({ phone_number: phone_no, status: 0 }, { $set: {  otp: newOtp } }, { new: true });
        if(!user_create){
            return res.send({status:400, message : "Invalid phone_number"})
        }
        
        var msg=urlencode(`Hi there, thank you for sending your first test message from Textlocal. Get 20% off today with our code: ${newOtp}.`);
        var number=phone_no;
        var username='faisalgulzar11@gmail.com';
        var hash=process.env.SENDER_HASH; // The hash key could be found under Help->All Documentation->Your hash key. Alternatively you can use your Textlocal password in plain text.
        var sender=process.env.SENDER_ID;
        var data='username='+username+'&hash='+hash+'&sender='+sender+'&numbers='+number+'&message='+msg
        var options = {
         host: 'api.textlocal.in',
         path: '/send?'+data
        };
        callback = function(response) {
          var str = '';
          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
          str += chunk;
          });
          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
          res.send(str);
          });
        }
        //console.log('hello js'))
        http.request(options, callback).end();
  
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.verifyOtp = async (req, res) => {
    let { phone_no, otp } = req.body;
    let body = { phone_no, otp };
    for (var p in body) {
        if (!body[p]) {
            return res.send({ status: 400, message: `Please send ${p}` })
        }
    }
    let user = await User.findOne({ phone_number: req.body.phone_no, otp: req.body.otp, status: 0 })
    if (user) {
        await user.update({ is_verify: 1, role: 'user', login_by_phone: 1 });
        const token = jwt.sign({ user }, '8A169E5DFB4F18C678DBAD19A4B4A17F1F8154713192E618DCDBF7D8C9E9ABA4');
        user.token = token;
        return res.json({ status: 200, user, message: 'otp verified sucessfully' });
    } else {
        res.json({
            status: 400,
            message: 'otp not verified'
        })
    }

}