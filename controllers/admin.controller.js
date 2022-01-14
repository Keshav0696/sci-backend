const mongoose = require('mongoose')
const User = mongoose.model('user');
const validator = require("../helpers/validator")
module.exports.addStudent = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let { name, role, phone_no: phone_number, email} = req.body;
            if(!validator.validateMobileNumber(phone_no)){
                return res.status(400).send({ status: 400, message: `Invalid phone_no` })
            }
            if(!validator.validateEmail(email)){
                return res.status(400).send({ status: 400, message: `Invalid email` })
            }
            let body = { name, role,  phone_number, email};
            for (var p in body) {
                if (!body[p]) {
                    return res.status(400).send({ status: 400, message: `Please send ${p}` })
                }
            }
            let found = await User.findOne({ phone_number: phone_number, role: role, status: 0 });
            if (found) {
                res.status(400).send({ status: 400, message: "User Already exist" })
            } else {
                let new_user = new User(body);
                let saved = await new_user.save();
                res.status(200).send({ status: 200, message: "User added successfully", data: saved })
            }
        } else {
            res.status(400).send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.status(400).send({ status: 400, message: e.message })
    }
}
