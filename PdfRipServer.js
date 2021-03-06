/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;

var PdfRipCombine = require(__dirname + '/' + 'PdfRipCombine').PdfRipCombine


function PdfRipServer() {
    var p = PdfRipServer.prototype;
    p = this;
    var self = this;

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6006)

        self.runServer();

    }

    self.runServer = function runServer() {

        var express = require('express')
        var app = express()

        app.use(function addCrossDomainMiddlware(req, res, next) {
            //asdf.g
            res.header("Access-Control-Allow-Origin", "*");
            if (req.headers.origin != null) {
                res.header("Access-Control-Allow-Origin", req.headers.origin);
            }
            ;
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

        var bodyParser = require("body-parser");
        var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        //app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
        // app.use(bodyParser.json());                                     // parse application/json
        app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json


        /*app.use(express.bodyParser());
         app.use(express.json());
         app.use(express.urlencoded());
         app.use(express.multipart());*/

        app.get('/2', function (req, res) {
            res.send('Hello World!');
        });

        app.post('/upBook', function uploadRip(req, res) {
            var body = req.body;
            var bookName = body.book_name;
            var page = body.page
            var file = page + '.txt'
            var fileHTML = page + '.html'
            console.log(req.body)
            var contents = req.body.contents;
            if (sh.isArray(contents)) {
                contents = contents.join('\n')
            }
            var htmlContents = req.body.htmlContents;


            var dirBook = __dirname + '/' + 'rips/' + bookName;
            sh.mkdirp(__dirname + '/' + 'rips')
            sh.mkdirp(dirBook)
            sh.writeFile(dirBook + '/' + file, contents);

            htmlContents = sh.html.wrapInHTMLTag(htmlContents, 'html');
            sh.writeFile(dirBook + '/' + fileHTML, htmlContents);

            htmlContents = sh.replace(htmlContents, 'color: rgba(0, 0, 0, 0);', '')
            htmlContents = sh.html.wrapInHTMLTag(htmlContents, 'html');
            sh.writeFile(dirBook + '/' + fileHTML, htmlContents);

            res.send('Hello World!');
        });

        app.get('/upBookCombine', function onCombineUploadedBook(req, res) {

            var body = req.query;
            var bookName = body.book_name;

            var t = new PdfRipCombine()
            var options = {}
            //options.port = 7789

            /* options.startAt = 318;
             options.maxPages = 10*/
            console.log('building teh book', bookName)
            options.dirBook = '/uploads/Artificial Intelligence for Games, Second Edition.pdf'

            options.dirBook = '/uploads/the_responsive_city_engaging_c.pdf'
            options.dirBook = bookName //'/uploads/[Donald_A._Norman]_Living_with_Complexity(BookZZ.org).pdf'
            //  options.maxPages = 10
            options.oddName = 'asdftest'
            options.fxDone = function () {
                console.log('..')
                res.send('Hello World! finisehd ');
            }
            t.loadConfig(options);
            return;
        });


        var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                console.error('what...', 66)
                callback(null, __dirname + '/uploads');
            },
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        var upload = multer({storage: storage}).single('img_val');


        app.post('/doUp2', function (req, res) {
            upload(req, res, function (err) {
                console.error('what...', 5, req.headers)
                if (err) {
                    return res.end("Error uploading file.");
                }
                if (req.body.img_val) {
                    var base64Data = req.body.img_val.replace(/^data:image\/png;base64,/, "");
                    var base = 'x'
                    if (req.body.name != null) {
                        base = req.body.name;
                    }
                    var filename = base + '.png'
                    var fileName = __dirname + '/' + 'uploads/' + filename
                    require("fs").writeFileSync(fileName, base64Data, 'base64');

                    //sh.writeFile(fileName, req.body.img_val, true, true)
                }
                res.end("File is uploaded");
            });
        });

        app.post('/uploadPageOfBook', function (req, res) {
            var p = req.body;
            //console.log(imageBuffer, p);
            var data = p.data;
            //  var imageBuffer = decodeBase64Image(data);
            console.log('bpp', p.name)
            var name = p.name;

            var html = p.rawContents;
            var dirTestPages = sh.fs.join(__dirname, 'rips', 'testPages')
            if (p.dirName) {
                dirTestPages += '/' + p.dirName + '/'
            }
            sh.fs.mkdirp(dirTestPages)
            var dirFile = sh.fs.join(dirTestPages, p.page_name + '.html')


            var style =
                `
.page {
    position: relative;
    display: block;
    margin: 10px auto;
    box-shadow: 0px 0px 10px #666666;
    background-color: #ffffff;
}
.text-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: 1000px;
}
 .text-layer > span {
    /*color: transparent;*/
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
}
 #XLayer > span {
   /* color: transparent;*/
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
}
`
            var header = sh.html.wrapInHTMLTag(style, 'style')
            html = sh.html.wrapInHTMLTag(html, 'body')
            html = header + sh.n + html
            html = sh.html.wrapInHTMLTag(html, 'html')
            //tag html
            //tab body

            /*     sh.log.file(dirFile, 'output to')*/
            console.log(dirFile, 'output to')
            console.log('file:///' + sh.slash(dirFile), 'output to')
            sh.writeFile(dirFile, html)

            res.send('done')
        });


        app.post('/doUp3', function (req, res) {


            function decodeBase64Image(dataString) {
                var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                    response = {};

                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }

                response.type = matches[1];
                response.data = new Buffer(matches[2], 'base64');

                return response;
            }


            var p = req.body;
            //console.log(imageBuffer, p);
            var data = p.data;
            var imageBuffer = decodeBase64Image(data);
            console.log('bpp', p.name)
            var name = p.name;

            var fileName = __dirname + '/' + 'rips/image/'
            if (p.dirName) {
                fileName += '' + d.fileName + '/'
            }

            fileName += name;
            if (name.includes('/')) {
                var path = sh.fs.base(fileName)
                sh.fs.mkdirp(path)
            }
            console.log('fileName', fileName, name, path)
            sh.writeFile(fileName, imageBuffer.data, 'base64')
            res.send('done')
            return;
            upload(req, res, function (err) {
                console.error('what...', 5, req.headers)
                if (err) {
                    return res.end("Error uploading file.");
                }
                if (req.body.img_val) {
                    var base64Data = req.body.img_val.replace(/^data:image\/png;base64,/, "");
                    var base = 'x'
                    if (req.body.name != null) {
                        base = req.body.name;
                    }
                    var filename = base + '.png'
                    var fileName = __dirname + '/' + 'uploads/' + filename
                    require("fs").writeFileSync(fileName, base64Data, 'base64');

                    //sh.writeFile(fileName, req.body.img_val, true, true)
                }
                res.end("File is uploaded");
            });
        });

        app.post('/doUpJSON', function doUpJSON(req, res) {
            var p = req.body;
            //console.log(imageBuffer, p);
            var data = p.data;
            console.log('bpp', p.name)
            var name = p.name;

            var key = p.key;
            var val = p.val;

            var fileName = __dirname + '/' + 'rips/jsons/' + name + '.json';
            var path = sh.fs.base(fileName)
            sh.fs.mkdirp(path)
            var contents = sh.readJSONFile(fileName, {}, true)

            var TestEvalRemoteJSONPos = require(__dirname + '/' + 'TestEvalRemoteJSONPos.js').TestEvalRemoteJSONPos

            TestEvalRemoteJSONPos.setVal(key, val, contents)

            sh.writeJSONFile(fileName, contents)
            res.send('done')
            return;
        });
        app.listen(self.settings.port, function () {
            //console.log('Listening on ' + app.address().port)
        });


    }

    function defineUtils() {
        p.utils = {}
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

if (module.parent == null) {


    var t = new PdfRipServer()
    var options = {}
    //options.port = 7789
    t.loadConfig(options);
    return;

}


