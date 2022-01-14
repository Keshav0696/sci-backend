'user strict';
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { 
	useNewUrlParser: true,
  	useUnifiedTopology: true,
  	serverSelectionTimeoutMS: 5000
});
mongoose.connection.on('error', function(err) {
	if(err) throw err;

    console.log("Db connected");
});

exports.initialize = function() {
	require("fs").readdirSync(__dirname).forEach(function(file) {
	  require(__dirname + "/"+ file);
	});
  };
  this.initialize()
