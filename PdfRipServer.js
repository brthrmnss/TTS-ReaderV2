/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;

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
            if ( req.headers.origin != null ) {
                res.header("Access-Control-Allow-Origin", req.headers.origin);
            };
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

        var bodyParser  = require("body-parser");
        var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        //app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
       // app.use(bodyParser.json());                                     // parse application/json
        app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json



        /*app.use(express.bodyParser());
         app.use(express.json());
         app.use(express.urlencoded());
         app.use(express.multipart());*/

        app.get('/2', function (req, res) {
            res.send('Hello World!');
        });

        app.post('/upBook', function uploadRip (req, res) {
            var body = req.body;
            var bookName = body.book_name;
            var page = body.page
            var file = page + '.txt'
            var fileHTML = page + '.html'
            console.log(req.body)
            var contents = req.body.contents;
            if ( sh.isArray(contents) ) {
                contents = contents.join('\n')
            }
            var htmlContents = req.body.htmlContents;

            
            var dirBook = __dirname+'/'+'rips/'+bookName;
            sh.mkdirp(__dirname+'/'+'rips')
            sh.mkdirp(dirBook)
            sh.writeFile(dirBook+'/'+file,  contents);

            htmlContents = sh.html.wrapInHTMLTag(htmlContents, 'html');
            sh.writeFile(dirBook+'/'+fileHTML,  htmlContents);

            htmlContents = sh.replace(htmlContents, 'color: rgba(0, 0, 0, 0);', '')
            htmlContents = sh.html.wrapInHTMLTag(htmlContents, 'html');
            sh.writeFile(dirBook+'/'+fileHTML,  htmlContents);

            res.send('Hello World!');
        });




        var storage =   multer.diskStorage({
            destination: function (req, file, callback) {
                console.error('what...', 66)
                callback(null, __dirname + '/uploads');
            },
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now());
            }
        });
        var upload = multer({ storage : storage}).single('img_val');


        app.post('/doUp2',function(req,res){
            upload(req,res,function(err) {
                console.error('what...', 5, req.headers)
                if(err) {
                    return res.end("Error uploading file.");
                }
                if ( req.body.img_val ) {
                    var base64Data = req.body.img_val.replace(/^data:image\/png;base64,/, "");
                    var base = 'x'
                    if ( req.body.name != null ) {
                        base = req.body.name;
                    }
                    var filename = base + '.png'
                    var fileName = __dirname + '/' + 'uploads/' + filename
                    require("fs").writeFileSync(fileName, base64Data, 'base64' );

                    //sh.writeFile(fileName, req.body.img_val, true, true)
                }
                res.end("File is uploaded");
            });
        });


        app.post('/doUp3',function(req,res){


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
            console.log('bpp')
            var name = p.name;
            sh.writeFile(name, imageBuffer.data, 'base64')
            res.send('done')
            return;
            upload(req,res,function(err) {
                console.error('what...', 5, req.headers)
                if(err) {
                    return res.end("Error uploading file.");
                }
                if ( req.body.img_val ) {
                    var base64Data = req.body.img_val.replace(/^data:image\/png;base64,/, "");
                    var base = 'x'
                    if ( req.body.name != null ) {
                        base = req.body.name;
                    }
                    var filename = base + '.png'
                    var fileName = __dirname + '/' + 'uploads/' + filename
                    require("fs").writeFileSync(fileName, base64Data, 'base64' );

                    //sh.writeFile(fileName, req.body.img_val, true, true)
                }
                res.end("File is uploaded");
            });
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


