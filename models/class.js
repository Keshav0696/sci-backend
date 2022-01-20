var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ClassSchema = new Schema({
    name : String,
    description: String
},
{
    timestamps: true
});

var Class = module.exports = mongoose.model('class', ClassSchema);