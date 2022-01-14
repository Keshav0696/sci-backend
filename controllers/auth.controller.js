const mongoose = require('mongoose')
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
module.exports.login = async (req, res) => {
    let { email, password } = req.body;
    let body = { email, password };
    for (var p in body) {
        if (!body[p]) {
            return res.status(400).send({ status: 400, message: `Please send ${p}` })
        }
    }
    User.findOne({ email: email }, { password: 1 })
        .exec()
        .then(function (user) {
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


module.exports.sendOtp = async (req, res) => {
    try {
        let { phone_no } = req.body;
        let body = { phone_no };
        for (var p in body) {
            if (!body[p]) {
                return res.status(400).send({ status: 400, message: `Please send ${p}` })
            }
        }
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        await client.messages
            .create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone_no,
                body: `VanUpvan verification code is ${newOtp}`,
            })
    
        let user_create = await User.findOneAndUpdate({ phone_number: phone_no, status: 0 }, { $set: {  otp: newOtp } }, { new: true });
        if(!user_create){
            return res.status(404).send({status:400, message : "Invalid phone_number"})
        }
        res.send({
            status: 200,
            message: 'Otp sent! Valid only for 2 minutes',
            data: {},
        });
    }
    catch (e) {
        return res.status(400).send({ status: 400, message: e.message })
    }
}
module.exports.verifyOtp = async (req, res) => {
    let { phone_no, otp } = req.body;
    let body = { phone_no, otp };
    for (var p in body) {
        if (!body[p]) {
            return res.status(400).send({ status: 400, message: `Please send ${p}` })
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