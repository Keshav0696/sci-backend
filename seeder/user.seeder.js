const mongoose = require('mongoose')
const User = mongoose.model('user');
const bcrypt = require('bcrypt');   

var encryptPassword = async function(password){
       return new Promise((resolve, reject)=>{
       
        resolve(bcrypt.hash(password, 10));
       })
}
let defaultUser =async function(){
let users_count = await User.count({});
if(!users_count){
    let user = [
        {
            name : "admin",
            email : "admin@gmail.com",
            phone_number : "",
            password : await encryptPassword("admin@123"),
            role :"admin"
        }
    ]
   await User.insertMany(user)
}
}
defaultUser()