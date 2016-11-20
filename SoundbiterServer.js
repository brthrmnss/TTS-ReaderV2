/* host soundbiter */

var express = require("express");
var bodyParser  = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var http = require("http");
var app  = express();

var baseUrl = 'http://127.0.0.1:4444'
var request = require('request');
var querystring = require('querystring');

var request = require('request');

// UPLOAD FILES
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname +'/www/uploads/')			// DESTINATION FILES
	},
	filename: function (req, file, cb) {
		if(typeof file === 'undefined')
			return;
		//var ext = file.originalname.split('.').pop();
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage });

// CORS middleware
var allowCrossDomain = function(req, res, next){

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
}

app.use(allowCrossDomain);
//app.use(express.static(__dirname + '/www'));                 	// set the static files location /www/img will be /img for users
var path = require('path');
var bpath = __dirname + '/' + '../../autocomplete/soundbiter/'//);//index.html';
var path2 = path.resolve(bpath);
console.log(path2);

var pathC = __dirname + '/' + '../../../'//);//index.html';
var pathC2 = path.resolve(pathC);
console.log('pathC2', pathC2);


app.use(express.static(path2));

app.use(express.static(pathC2));
//process.exit();
//app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.set('view engine', 'ejs');

// application -------------------------------------------------------------
/*app.get("*",function(req,res){
	// load the single view file (angular will handle the page changes on the front-end)
	res.sendFile(__dirname +'/www/index.html');
});*/

// GET ALL ENTRIES
app.post('/getRecentFiles', function(req, res){

	try {
		var obj = JSON.parse(fs.readFileSync(__dirname + '/controls/recents_files.json', 'utf8'));
	} catch ( e ) {
		console.log('error parsing file')
		obj = {};
	}
	//console.log(JSON.stringify(obj));
	res.send(obj);
});


// listen (start app with node Server.js) ======================================
var port  = 8082
app.listen(port);
console.log("App listening on port "+port);

function testReq() {
	var req 		= {}
	req.url 		= 'http://127.0.0.1:8081/getRecentFiles'
	req.method 		= 'POST'
	req.json 		= {}
	req.json.text 	= 'boo.'
	//return
	request(req, function onResponse (error, response, body) {
		if (!error && response.statusCode == 200) {
			//	console.log(body) // Show the HTML for the Google homepage.
		}
		console.log("\n\n\n\n\n\n")
		console.log('logged', error)
		//console.error('result', error, body)
	})
}
//setTimeout(testReq, 1000)