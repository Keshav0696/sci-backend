const mongoose = require('mongoose')
const User = mongoose.model('user');
const Subject = mongoose.model('subject');

const validator = require("../helpers/validator")
module.exports.listSubjectsFromClass = async (req, res) => {
    try {
     let {phone_no} = req.body;
     let body = {phone_no};
     for (var p in body) {
         if (!body[p]) {
             return res.send({ status: 400, message: `Please send ${p}` })
         }
     }
     let found  =  await User.findOne({phone_number :phone_no, status:0 });
     if(!found){
         return res.json({status:400, message:"User not found"})
     }
     let {class_id} = found;
     if(!class_id){
        return res.json({status:400, message:"User do not have class in it"})
     }
     let subjects =await  Subject.find({class_id : class_id},{ name : 1, cover_page:1})
     res.send({subjects})
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}
module.exports.getSubjectDetail = async (req, res) => {
    try {
     let {id:subject_id} = req.params;
     let body = {subject_id};
     for (var p in body) {
         if (!body[p]) {
             return res.send({ status: 400, message: `Please send ${p}` })
         }
     }
     let found  =  await Subject.findOne({_id :subject_id });
     if(!found){
         return res.json({status:400, message:"Subject not found"})
     }
    
     res.send({data: found})
    }
    catch (e) {
        return res.send({ status: 400, message: e.message })
    }
}