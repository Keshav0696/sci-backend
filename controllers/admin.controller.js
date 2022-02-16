const mongoose = require('mongoose')
const User = mongoose.model('user');
const Class = mongoose.model('class');
const Subject = mongoose.model('subject');
const validator = require("../helpers/validator")

module.exports.getProfile = async (req, res) => {
    try {
     res,send({status:200, data:req.user});
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.addStudent = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let { name, role, phone_no: phone_number, email, class_id} = req.body;
            if(!validator.validateMobileNumber(phone_number)){
                return res.send({ status: 400, message: `Invalid phone_no` })
            }
            if(!validator.validateEmail(email)){
                return res.send({ status: 400, message: `Invalid email` })
            }
            let body = { name, role,  phone_number, email, class_id};
            for (var p in body) {
                if (!body[p]) {
                    return res.send({ status: 400, message: `Please send ${p}` })
                }
            }
            let found = await User.findOne({ phone_number: phone_number, role: role, status: 0 });
            if (found) {
                res.send({ status: 400, message: "User Already exist" })
            } else {
                let new_user = new User(body);
                let saved = await new_user.save();
                res.send({ status: 200, message: "User added successfully", data: saved })
            }
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}

module.exports.getAllStudents = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
          let all_students = await User.find({role : "student"}).sort({createdAt:-1}).populate("class_id");
          res.send({status :200, data :all_students});
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}

module.exports.getAllClasses = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
          let all_students = await Class.find({});
          res.send({status :200, data :all_students});
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.addClass = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let { name, description} = req.body;
            let body ={ name, description};
            for (var p in body) {
                if (!body[p]) {
                    return res.send({ status: 400, message: `Please send ${p}` })
                }
            }
                let newClass = new Class(body);
                let saved = await newClass.save();
                res.send({ status: 200, message: "Class added successfully", data: saved })
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.addSubject = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let { name, description, cover_page, videos, class_id} = req.body;
            let body =  { name, description, cover_page, videos, class_id};
            for (var p in body) {
                if (!body[p]) {
                    return res.send({ status: 400, message: `Please send ${p}` })
                }
            }
         
                let new_subject = new Subject(body);
                let saved = await new_subject.save();
                res.send({ status: 200, message: "Subject added successfully", data: saved })
            
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}

module.exports.getAllSubjects = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let subjects = await Subject.find({}).sort({createdAt:-1}).populate("class_id");
                res.send({ status: 200, message: "Subject added successfully", data: subjects })
            
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.getSubjectById = async (req, res) => {
    try {
        if (req.user && req.user.role == 'admin') {
            let {id: subject_id} = req.params;
            if(!subject_id){
                throw new Error("subject_id is mendatory")
            }
            let subjects = await Subject.findOne({_id : subject_id}).populate("class_id");
                res.send({ status: 200, message: "Subject added successfully", data: subjects })
            
        } else {
            res.send({ status: 400, message: "You don't have access" })
        }
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
// module.exports.listClasses = async (req, res) => {
//     try {
//         let found = await Class.find({  });
//         return res.
//     }
//     catch (e) {
//         return res.send({ status: 400, message: e.message })
//     }
// }