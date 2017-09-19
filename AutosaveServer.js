/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;

var JSONFileHelper = require('./www/js/JSONFileHelper').JSONFileHelper

function TinyMCESaveServer() {
    var p = TinyMCESaveServer.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6007)


        var j = new JSONFileHelper();
        var config = {};
        config.file = __dirname + '/'+'recent_pages.json';
        j.init(config);

        self.data.j = j; 
        

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

        app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

        var dirSaves = __dirname+'/'+'saves/';
        self.data.dirSaves = dirSaves;
        sh.mkdirp(dirSaves);
        sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');

        app.get('/readFile', function onReadFile (req, res) {
            var name = req.query.name;
            var content = sh.readFile(dirSaves+name+'.html')


            console.log(dirSaves+name)
            res.send(content);

        });

        app.post('/saveFile', function onSaveFile (req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body);
            var fileJSON = dirSaves+name+'.html';
            sh.writeFile(fileJSON, contents);


            var bookJSON = {
                file:fileJSON,
                name:name
            }
            self.data.j.addRecent(bookJSON, true, 'file');

            res.send('Hello World!');
        });

        app.get('/removeFile', function onRemoveFile (req, res) {
            var body = req.query;
            var name = body.name;
            var fileJSON = dirSaves+name+'.html';
            self.proc('removing', name)

            var bookJSON = {
                file:fileJSON,
                name:name
            }
            self.data.j.removeRecent(bookJSON, 'file');

            res.send('removed');
        });

        app.get('/listFiles', function onSaveFile (req, res) {

            var files = [];//self.utils.getfilesInDir();

            files = self.data.j.readFile();
            res.json(files)

            return;
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves+name+'.html', contents)

            res.send('Hello World!');
        });


        app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });


    }


    function defineUtils() {
        p.utils = {}
        p.utils.getFilesInDir = function getFilesInDir() {
            var books = sh.fs.getFilesInDirectory2(self.data.dirSaves)


            return books;

        }
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
    var t = new TinyMCESaveServer()
    var options = {}
    t.loadConfig(options);
   // console.log(t.utils.getFilesInDir())
    return;
}


