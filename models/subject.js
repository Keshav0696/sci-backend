var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    name : String,
    class_id : {
        type : Schema.Types.ObjectId,
        ref : "class"
    },
    description: String,
    cover_page : String,
    videos : [{
        name : String,
        description : String,
        thumbnail : String,
        url :  {
            type : String,
            required : true
        }  
    }]
},
{
    timestamps: true
});

var Subject = module.exports = mongoose.model('subject', SubjectSchema);