var mongoose = require("mongoose");

module.exports = mongoose.model("test",{
	title : { type : String, default : ""},
	description : { type : String, default : ""},
	rating : { type : Number, default : ""}
})