const mongoose = require('mongoose')
const User = mongoose.model('user');

(await function(){
let users_count = await User.count({})
if(!users_count){
    let user = [
        {
            name : "admin",
            email : "admin@gmail.com",
            phone_number : "",
            password : "admin@123"
        }
    ]
    await User.insertMany(user);
}
})()