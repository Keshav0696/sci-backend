var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var UserSchema = new Schema({
    name :{
        type:String,
        default:'',
    },
    email:{
        type:String,
        default:'',
    },
 
    lat:{
        type:String,
        default:'',
    },
    long:{
        type:String,
        default:'',
    },
   
    password:{
        type:String,
        default:'',
    },
 
    role:{
        type:String,
        enum : ['student', 'teacher', 'admin'],
        default:'student', 
    },
  
    phone_number:{
        type:String,
        default:'',
        unique : true
    },
    address:{
        type:String,
        default:'',
    },
    profile_picture:{
        type:String,
        default:'',
    },
    description:{
        type:String,
        default:'',
    },
    status:{
        type:Number,
        enum : [0,1],
        default:0,
    },
    is_block : {
        type:Boolean,
        default:false,
    },
    device_id:{
        type:String,
        default:'',
    },
    device_type:{
        type:Number,
        enum : [0,1], //0=> Android , 1=>ios
        default:'',
    },
  
    otp:{
        type:String,
        default:'',
    },
    radius_to:{
        type:String,
        default:'',
    },
    is_verify:{
        type:Number,
        default:0,
    },
    is_logout : {
        type : String,
        enum : [0, 1],
        default : 1
      },
 
},
    {
        timestamps: true
    });

var User = module.exports = mongoose.model('user', UserSchema);
module.exports.getUserByPhoneNumber = function(phone_number, callback){
    var query = {phone_number: phone_number};
    User.findOne(query, callback);
  }

  module.exports.getUserByEmail = function(username, callback){
    var query = {email: username, status : 0};
    User.findOne(query, callback);
  }
  module.exports.comparePassword = function(candidatePassword, userPassoword, callback){
  
    bcrypt.compare(candidatePassword, userPassoword, function(err, result) {
        if (err) { throw (err); }
        callback(null, result);
    });
}