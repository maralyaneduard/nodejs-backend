
var express = require("express"); // require module express
var app = express(); // create app
var mongoose = require('mongoose'); // require mongoose ORM for mongo db
var port = process.env.PORT || 8080;  // set port
var db = require("./config/database");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(db.localUrl); 	// Connect to local MongoDB instance
app.use(express.static(__dirname + '/public')); // telling express where to look for static files
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

// allow origin acces
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

require("./app/routes")(app);
app.listen(port);


console.log("App listening on port " + port);