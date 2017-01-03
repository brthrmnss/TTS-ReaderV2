var express = require("express");
var bodyParser  = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var http = require("http");
var speak = require("node-speak");
var app  = express();

var sh = require('shelpers').shelpers;
var MergeEpub = require('./www/js/MergeEpub.js').MergeEpub;
var JSONFileHelper = require('./www/js/JSONFileHelper').JSONFileHelper



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

// application -------------------------------------------------------------
app.get("/epub.html",function(req,res){
	//asdf.g
	// load the single view file (angular will handle the page changes on the front-end)
	res.sendFile(__dirname +'/www/epub.html');
});

function onGetRecentBooks(req,res) {
	var json = sh.readJSONFile('recent_files.json', [], true)
	var recents = {};
	recents.name = 'upload new'
	recents.originalUrl = 'epub.html'
	json.unshift(recents)
	json.unshift({})
	var str = ''
	sh.each(json, function addLink(k, v) {
		str += sh.join(['<a href=', sh.qq(v.originalUrl), '>', v.name, '</a>', sh.br]);
	})
	//asdf.g
	// load the single view file (angular will handle the page changes on the front-end)
	res.send(str)
}
app.get("/recent",onGetRecentBooks);
app.get("/recents",onGetRecentBooks);

app.get("/articles",function onGetListOfArticles(req,res){
	//why: show list of all articles
	var dirArticles =  __dirname+'/'+'www/js/articles/'
	var files = sh.fs.getFilesInDirectory2(dirArticles )
	var str = ''
	sh.each(files, function addLink(k,file) {
		if ( ! sh.includes(file, '.html')) {
			return;
		}
		var fileRaw = file.replace(dirArticles, '');
		var fileUrl = encodeURI(fileRaw)
		fileUrl = '/js/articles/' + fileUrl
		var fileName = sh.getFilename(fileRaw)



		console.log(file, fileRaw)
		str += sh.join( ['<a href=',sh.qq(fileUrl),'target="_blank"','>',fileName,'</a>', sh.br]);
	})
	//asdf.g
	// load the single view file (angular will handle the page changes on the front-end)
	res.send(str)
});




function defineShelpers() {
	if (String.prototype.endsWith == null) {
		String.prototype.endsWith = function (suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	};
}
defineShelpers()


function defineBookDirUtils() {

	var utils = {};

	utils.getDirObject = function getDirObject(file, req) {

		//give file/directory
		//output:
		//index file, and dir

		file = unescape(file)


		var fileOrig = file;
		//var sh = {};
		//sh.readfile =
//http://127.0.0.1:8080/epub.html/C:/trash/epub/books/Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin/book.html
		//var books = sh.fs.getFilesInDirectory2('C:/trash/epub')
		var books2 = [];


		var result = {};
		result.fileOrig = file;

		if ( sh.fileExists(file) ) {
			result.file = file;
			result.dir = sh.fs.getFilePath(file);
			return result;
		}

		//why: try more advanced method of located files
		if ( req != null ) {
			var referer = req.headers['referer'];
		}

		console.info('referer', fileOrig, referer);
		var dirReferrer = null;
		if (referer && referer.indexOf('epub.html') != -1) {
			dirReferrer = unescape(referer).split('epub.html/')[1]
			//console.error('change it ..', fileOrig, dirReferrer)
		}

		function getDirForBook(dir) {
			var dirBook = sh.fs.getFileNameOnly(dir).replace(/[^\w\s]/gi, '')
			var dirEpub = __dirname + '/www/uploads/extracted/' + dirBook + 'epub'
			var dirHTMLz = __dirname + '/www/uploads/extracted/' + dirBook + 'htmlz'


			if (sh.fileExists(dirEpub)) {
				return dirEpub;

			}
			if (sh.fileExists(dirHTMLz)) {
				return dirHTMLz;
			}
		}


		var dirBook = sh.fs.getFileNameOnly(file).replace(/[^\w\s]/gi, '')
		var dirEpub = __dirname + '/www/uploads/extracted/' + dirBook + 'epub'
		var dirHTMLz = __dirname + '/www/uploads/extracted/' + dirBook + 'htmlz'
		//var dirHTMLz = __dirname+'/wwww/uploads/extracted/'+getFileNameOnly(file)+'.epub'
		//var dirHTMLz2 = __dirname+'/www/uploads/extracted/'+ 'Shirtmaking_ Developing Skills  David Coffinhtmlz'
		//console.log(dirEpub, sh.fileExists(dirEpub))
		//console.log(dirHTMLz, sh.fileExists(dirHTMLz))
		//console.log(dirHTMLz2, sh.fileExists(dirHTMLz2))
		//why: check if sent directory, and must find index file
		//why: try different recrectoies fo rmatch
		if (sh.fileExists(dirEpub)) {
			result.file = file;
			var books = sh.fs.getFilesInDirectory2(dirEpub)
			sh.each(books, function removeEpub(k, v) { //find html file
				if (v.endsWith('.ncx')) {
					file = v;
				}
			});
			result.dir = dirEpub;
			console.error('v', file);
			return result;

		}
		if (sh.fileExists(dirHTMLz)) {


			result.file = file;
			result.dir = dirHTMLz;

			var books = sh.fs.getFilesInDirectory2(dirHTMLz)
			sh.each(books, function removeEpub(k, v) { //find html file
				if (v.endsWith('.html')) {
					file = v;
				}
			});

			result.file = file;
			console.error('v', file);
			return result;
			//file = file.replace( , dirHTMLz )

		}

		//why: check if file in referred directory get all files until


		var fileIfLocal = 'www/' + fileOrig; //.split('/js/')[1];
		if (sh.fileExists(fileIfLocal)) {
			fileContent = fs.readFileSync(fileIfLocal, 'utf8');
			res.send(fileContent);
			return;
		}


		if (dirReferrer) {
			var fileIfInBookDir = getDirForBook(dirReferrer) + '/' + fileOrig;
			console.info('-fileIfInBookDir', fileIfInBookDir, sh.fileExists(fileIfInBookDir), sh.qq(dirReferrer));
			if (sh.fileExists(fileIfInBookDir)) {

				res.sendfile(fileIfInBookDir);
				return;
				var readType = 'utf8';
				/*if ( sh.isBinaryFile() == false) {

				 }*/
				if (fileIfInBookDir.endsWith('.jpg')) {
					readType = 'binary'
				}
				fileContent = fs.readFileSync(fileIfInBookDir, readType);
				res.send(fileContent);
				return;
			}

		}


	}


	return utils;

}
var utils = defineBookDirUtils()


app.get("/epub.html/*",function onEditEpub(req,res){
	//asdf.g
	var file =  req.params[0];
	var fileOrig = file;
	//var sh = {};
	//sh.readfile =
//http://127.0.0.1:8080/epub.html/C:/trash/epub/books/Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin/book.html

	//var books = sh.fs.getFilesInDirectory2('C:/trash/epub')
	var books2 = [];

	var referer  = req.headers['referer'];
	console.info('referer', fileOrig, referer);
	var dirReferrer = null;
	if ( referer && referer.indexOf('epub.html') != -1 ) {
		dirReferrer = unescape(referer).split('epub.html/')[1];
		//console.error('change it ..', fileOrig, dirReferrer)
		if ( dirReferrer && dirReferrer.indexOf('?') != -1 ) {
			dirReferrer = dirReferrer.split('?')[0];
		}
	}


	function getDirForBook(dir){
		var dirBook = sh.fs.getFileNameOnly(dir).replace(/[^\w\s]/gi, '')
		var dirEpub = 	__dirname+'/www/uploads/extracted/'+dirBook+'epub'
		var dirHTMLz = __dirname+'/www/uploads/extracted/'+dirBook+'htmlz'


		if ( sh.fileExists(dirEpub) ) {
			return dirEpub;

		}
		if ( sh.fileExists(dirHTMLz) ) {
			return dirHTMLz;
		}
	}


	var dirBook = sh.fs.getFileNameOnly(file).replace(/[^\w\s]/gi, '')
	var dirEpub = 	__dirname+'/www/uploads/extracted/'+dirBook+'epub'
	var dirHTMLz = __dirname+'/www/uploads/extracted/'+dirBook+'htmlz'
	//var dirHTMLz = __dirname+'/wwww/uploads/extracted/'+getFileNameOnly(file)+'.epub'
	//var dirHTMLz2 = __dirname+'/www/uploads/extracted/'+ 'Shirtmaking_ Developing Skills  David Coffinhtmlz'
	//console.log(dirEpub, sh.fileExists(dirEpub))
	//console.log(dirHTMLz, sh.fileExists(dirHTMLz))
	//console.log(dirHTMLz2, sh.fileExists(dirHTMLz2))
	if ( sh.fileExists(dirEpub) ) {
		//asdf.g


		var go = new MergeEpub()
		//var dir = 'C:/trash/epub/HBR\'s 10 Must Reads on Leadersh - Harvard Business Review'

		var options = {};
		options.dir = dirEpub;
		options.fxDone  = function done(file){
			var fileContent = fs.readFileSync(file, 'utf8')
			var fileEpubHtml = __dirname + '/www/epub.html'
			var epub = fs.readFileSync(fileEpubHtml, 'utf8')
			//src="../images/00003.jpeg"/></span></p>
			//epub = sh.replace(epub, 'src="../', 'src="')
			//epub = epub.replace(new RegExp('/src="../', "gi"), 'src="')
			fileContent = fileContent.replace(new RegExp("src=\"\.\.\/", "gi"), 'src="')

			
			var bookJSON = {
				originalUrl:req.originalUrl,
				fileHtml:fileEpubHtml,
				file:file,
				name:dirBook
			}

			j.add(bookJSON, true, 'originalUrl');

			//epub = epub.replace(/src="\.\.\//gi, '~~~~')
			if ( req.query.endAt != null ) {
				var endAt = parseFloat(req.query.endAt)
				console.log('end at ', endAt)
				fileContent = fileContent.slice(0,endAt)
			}
			epub = epub.replace('---yyy---', fileContent)
			res.send(epub);

		}
		go.init(options);
		go.go()
		return;

		return;
	}
	if ( sh.fileExists(dirHTMLz) ) {
		var books = sh.fs.getFilesInDirectory2(dirHTMLz)
		sh.each(books, function removeEpub(k,v){ //find html file
			if ( v.endsWith('.html')   ) {
				file = v;
			}
		});

		console.error('v', file)
		//file = file.replace( , dirHTMLz )
	}

	//get all files until


	var fileIfLocal =  'www/'+fileOrig; //.split('/js/')[1];
	if ( sh.fileExists(fileIfLocal)) {
		var fileLocal = sh.fs.resolve(fileIfLocal)
		console.error('send local', fileIfLocal)
		if ( sh.includes(fileIfLocal, 'bootstrap') &&
			sh.includes(fileIfLocal, '.css')
		) {
			console.error('send local', fileLocal, '...')
		}
		res.sendFile(fileLocal);
		return;
		fileContent = fs.readFileSync( fileIfLocal, 'utf8' );
		res.send(fileContent);
		return;
	}

	/*var fileIfArticle =  'www/js/articles/'+fileOrig; //.split('/js/')[1];
	 if ( sh.fileExists(fileIfArticle)) {
	 fileContent = fs.readFileSync( fileIfArticle, 'utf8' );
	 fileContent = sh.replace(fileContent, 'script src=', 'script srx=')
	 fileContent = fileContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
	 res.send(fileContent);
	 return;
	 }*/


	if ( dirReferrer) {
		var fileIfInBookDir = getDirForBook(dirReferrer) + '/' + fileOrig;
		if ( sh.fileExists(fileIfInBookDir)) {

		} else {
			var fileIfInBookDir = getDirForBook(dirReferrer) + '/' + '/OEBPS/' + fileOrig;
			//why: ebook in epub sub folder
			if ( sh.fileExists(fileIfInBookDir)) {
			} else {
				console.error(3,'did not find book referrer', fileIfInBookDir)

				var fileIfInBookDir = getDirForBook(dirReferrer) + '/' + '/OPS/' + fileOrig;
				//why: ebook in epub sub folder
				if ( sh.fileExists(fileIfInBookDir)) {
				} else {
					console.error(4,'did not find book referrer', fileIfInBookDir, dirReferrer)
					console.error('headers:', req.headers)
				}



			}

		}

		console.info('-fileIfInBookDir', fileIfInBookDir, sh.fileExists(fileIfInBookDir), sh.qq(dirReferrer));
		if ( sh.fileExists(fileIfInBookDir)) {

			res.sendfile(fileIfInBookDir);
			return;
			var readType = 'utf8';
			/*if ( sh.isBinaryFile() == false) {

			 }*/
			if ( fileIfInBookDir.endsWith('.jpg') ) {
				readType = 'binary'
			}
			fileContent = fs.readFileSync( fileIfInBookDir, readType );
			res.send(fileContent);
			return;
		}

	}


	if ( file.endsWith('.html')) {
		//try to send from article store


		var fileIfArticle =  'www/js/articles/'+fileOrig; //.split('/js/')[1];
		if ( sh.fileExists(fileIfArticle)) {
			//qhy: quickly load test articles from articles folder
			fileContent = fs.readFileSync( fileIfArticle, 'utf8' );
			fileContent = sh.replace(fileContent, 'script src=', 'script srx=')
			fileContent = fileContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			//res.send(fileContent);
			//return;
		}
		else {
			var fileContent = fs.readFileSync(file, 'utf8')
		}



		var fileEpubHtml = __dirname + '/www/epub.html'

		var epub = fs.readFileSync(fileEpubHtml, 'utf8')

		if ( req.query.endAt != null ) {
			var endAt = parseFloat(req.query.endAt)
			fileContent = fileContent.slice(0,endAt)
		}
		epub = epub.replace('---yyy---', fileContent)
		res.send(epub);
	} else if ( file.endsWith('.js') ) {
		var y =  'www/js/'+file.split('/js/')[1];
		fileContent = fs.readFileSync( y, 'utf8' );
		res.send(fileContent);
	} else { //send raw file
		fileContent = fs.readFileSync(file )
		res.send(fileContent);
		return;
		res.sendFile(file);
		return;
		fileContent = fs.readFileSync(file, 'utf8')
		res.send(fileContent);
	}

	return;
	// load the single view file (angular will handle the page changes on the front-end)
	res.sendFile(epub);
});


app.use(express.static(__dirname + '/www'));                 	// set the static files location /www/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

function storeBookmark (req,res){
	console.log('what is body' , req.body)
	var body = req.body;
	var fileBookmarks = null;
	if (body.dir != 'free') {
		var obj = utils.getDirObject(body.dir);
		var dir = obj.dir;
		var dirBookmarks = __dirname + '/'+'bookmarks/'//+ sh.getFileName(dir);
		fileBookmarks = dirBookmarks + sh.getFileName(dir)+'.json';
		sh.mkdirp(dirBookmarks)
		if ( dir == null ) {
			asdf.g
		}
	} else {
		dir = 'free'
		var fileBookmarks = dir+'/'+'bookmarks.json';
		sh.mkdirp('free/')
	}


	var ddd = sh.clone(body);
	ddd.date = new Date();
	delete ddd.dir
	sh.fs.appendJSON(fileBookmarks, ddd);
	res.send({status:'ok', file:dir+'/'+'bookmarks.json'});
}

app.get("/store_doc", storeBookmark)
app.post("/store_doc", storeBookmark)


// application -------------------------------------------------------------
app.get("*",function(req,res){
	// load the single view file (angular will handle the page changes on the front-end)
	res.sendFile(__dirname +'/www/index.html');
});

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

// UPLOAD FILE
app.post('/upload', upload.single('file'), function(req, res){

	var filename = req.file.filename;
	var isArchiveFile = req.file.filename.indexOf('.htmlz') != -1
	if ( req.file.filename.indexOf('.epub') != -1 || isArchiveFile ) {
		var filePath = req.file.destination+req.file.filename
		var execSync = require('child_process').execSync;
		var dirExtraction = req.file.destination+'extracted/'
		filePath = '"'+filePath+'"'
		var dirBook = filename.replace(/[^\w\s]/gi, '')
		dirExtraction += dirBook   +'/'
		dirExtraction = '"'+dirExtraction+'"'
		var args = ['-o',filePath, '-d', dirExtraction];
		console.log(args)
		args = args.join(' ')
		console.log(args)
		var code = execSync('unzip ' +args);
	}
	res.status(204).end(); req.filename;
});

// UPDATE RECENT FILES LIST
app.post('/updateRecentsFiles', function(req, res){

	console.log("body: "+JSON.stringify(req.body));//.replace(/\\/g, ""));
	if(typeof req.body !== 'undefined'){
		// WRITE THE WHOLE ARRAY IN FILE
		fs.writeFile(__dirname+"/controls/recents_files.json", JSON.stringify(req.body).replace(/\\/g, ""), function(err){
			if(err){
				return console.log(err);
			}
			console.log("the list is modified");
		});
	}
	res.status(204).end();
});

// GET FILE CONTENT
app.post('/readFile/:name', function(req, res){

	console.log("body: "+JSON.stringify(req.body)); // form fields
	//console.log("query: "+JSON.stringify(req.query));
	//console.log("param: "+JSON.stringify(req.param));

	fs.readFile(__dirname+'/www/uploads/'+req.body['file_name'], function (err, data){
		if(err){
			return console.log(err);
		}
		res.type('text/plain'); // set content-type
		return res.send(data);
	});

	//res.status(204).end();
});

// OLD SPEECH API
app.post('/espeak', function(req, res){

	//console.log("speak: "+JSON.stringify(req.body));
	var audio = "";
	if(req.body.text){
		speak(req.body.text, {
			callback: function(src){
				audio = src;
			}
		});
		res.type('text/plain'); // set content-type
		return res.send(audio);
	}
});

// NEW SPEECH API
app.post('/speak', function(req, res){

	try{ // DELETE CACHE FILES
		var soundFilePath = __dirname+'/www/cache/sound.wav';
		var textFilePath = __dirname+'/www/cache/txt.txt';
		fs.unlinkSync(soundFilePath);
		fs.unlinkSync(textFilePath);
	} catch(err){}

	console.log("speak> text: "+req.body.text);
	var data = querystring.stringify({text: req.body.text});
	/*var options = {
	 host: '127.0.0.1',
	 port: 4444,
	 path: '/say',
	 method: 'POST',
	 headers: {
	 'Content-Type': 'application/x-www-form-urlencoded',
	 'Content-Length': Buffer.byteLength(data)
	 }
	 };
	 */
	var str="";
	var sayReq = {}
	sayReq.url = 'http://127.0.0.1:4444/say'
	sayReq.json = req.body;
	sayReq.method = 'POST';

	/*
	 var RequestRetry = require('node-request-retry');

	 // A wrapper for request.defaults(obj);
	 RequestRetry.setDefaults({timeout: 30000});

	 // Default is 3
	 Request.setMaxRetries(5);

	 // Default is 10000
	 Request.setRetryDelay(20000);
	 */


	var request = require('requestretry');
	sayReq.maxAttempts = 3   // (default) try 5 times
	sayReq.retryDelay = 1000  // (default) wait for 5s before trying again
	request(sayReq, function onSay(error, response, body) {
		console.log('onSay', 'resp')
		/*if (!error && response.statusCode == 200) {
		 console.log('result2', body) // Show the HTML for the Google homepage.
		 }*/
		if ( error ) console.error(error)

		//res.send()

		res.end(data.src, 'binary');
	})


	try{




		/*
		 var req = http.request(options, function(res){
		 res.setEncoding('utf8');
		 res.on('data', function (chunk){
		 str += chunk;
		 });
		 res.on('end', function(){
		 var jsonObject = JSON.parse(str);
		 try {
		 console.log("str: " + jsonObject.src.length);
		 } catch (err) {
		 console.log(jsonObject, '....?');
		 }
		 result.type('text/plain');
		 return result.send(jsonObject.src);
		 });
		 });
		 req.write(data);
		 req.on('error', function (o) {
		 console.log('error', o)
		 })
		 req.end();*/
	} catch(err){
		throw new Error("Error: connect ECONNREFUSED 127.0.0.1:4444 - Run Speech Server with : node sayServerLite");
	}

});

app.set('view engine', 'ejs');

// listen (start app with node Server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

function testReq() {
	var req 		= {}
	req.url 		= 'http://127.0.0.1:8080/speak'
	req.method 		= 'POST'
	req.json 		= {}
	req.json.text 	= 'boo.'
	//return
	request(req, function onResponse (error, response, body) {
		if (!error && response.statusCode == 200) {
			//	console.log(body) // Show the HTML for the Google homepage.
		}
		//console.log("\n\n\n\n\n\n")
		console.log('->', 'logged', error)
		//console.error('result', error, body)
		testReq2();
	})

}

function testReq2() {
	var req 		= {}
	req.url 		= 'http://127.0.0.1:8080/store_doc'
	req.method 		= 'GET'
	req.json 		= {};
	req.json.text 	= 'boo.';
	req.json.dir  	= 'C:/trash/epub/books/Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin/book3.html';
	req.json.dir 	= 'Shirtmaking_%20Developing%20Skills%20-%20David%20Coffin'
	req.json.bookmark = 'booty booty'
	req.json.note = '';
	//return
	request(req, function onResponse (error, response, body) {
		if (!error && response.statusCode == 200) {
			//	console.log(body) // Show the HTML for the Google homepage.
		}
		//console.log("\n\n\n\n\n\n")
		console.log('->', 'logged', error);
		//console.error('result', error, body)
	})
}
setTimeout(testReq, 1000)