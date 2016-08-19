var test = require("./models/test");

function getTest(res)
{
	test.find(function(err,data){
		if(err)
		{
			console.log("error")
		}
		res.statusCode = 200;
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(data);
	});
}

function saveTest(t,res)
{
	t.save(function (err, todo) {
		if (err){
			res.setHeader("Content-Type", "application/json");
			res.send(err);
		}
		else
		{
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			getTest(res);
		}
	});
}

module.exports = function(app){
	app.get("/",function(req,res){
		getTest(res);
	});

	app.get("/:id",function(req,res){
		var testId = req.params.id;
		console.log("**** " + testId);
		test.findById(testId, function (err, data) {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json(data);
		});
	});

	app.post("/",function(req,res){
		var t = new test(
		{
			title:req.body.title,
			description:req.body.description,
			rating:req.body.rating
		});
		saveTest(t,res);
	});

	app.put("/",function(req,res){
		var testId = req.body._id;
		console.dir(req.body);
		test.findByIdAndUpdate(testId, { $set: { 
			title: req.body.title,
			description:req.body.description,
			rating:req.body.rating}},
			function (err, tank) {
				if (err) {
					return handleError(err);
				}
				else
				{
					getTest(res);
				}
			});
	});

	// get for delete, delete method not working due to persmissions 
	app.get("/delete",function(req,res){
		test.remove({},function(){});
		getTest(res);
	});

	app.delete("/",function(req,res){
			console.log("****-**************");
			test.remove({},function(){});
		getTest(res);
	});

	app.get("/tests/delete/:id",function(req,res){
		var testId = req.params.id;
		test.find({ _id:testId }).remove().exec();
		getTest(res);
	});
}