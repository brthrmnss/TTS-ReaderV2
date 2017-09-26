/**
 * Created by user on 8/2/15.
 */

/**
 * This is a mini server, that allows users to
 * append to notes
 *
 * https://github.com/marytts/marytts/issues/213
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express');
var config = global.config;

var express = require("express");
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser());

//var open = require('open')



var http = require('http').Server(app);
var io = require('socket.io')(http);



/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;


function BrowserEvalServer() {
    var p = BrowserEvalServer.prototype;
    p = this;
    var self = this;
    self.data = {};

    //specify url of everest folder
    var baseUrl = 'http://127.0.0.1';

    //create urls
    var t = EasyRemoteTester.create('Test evenote basics',{})
    t.settings.baseUrl = baseUrl
    var urls = {};
    urls.notes = {};
    urls.reload = t.utils.createTestingUrl('reload')
    urls.getFile = t.utils.createTestingUrl('getFile')
    urls.notes.update = t.utils.createTestingUrl('notes')
    urls.notes.get = t.utils.createTestingUrl('notes')

    self.dirPrjRoot = '/media/psf/Dropbox/projects/crypto/deploy_nodejs'
    self.dirPrjRoot = '/media/sf_projects/crypto/deploy_nodejs'

    /**
     * Setup middleware and routes
     * @param url
     * @param appCode
     */
    p.start = function start(url, appCode) {
        //Add middleware for cross domains
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        self.settings = {};
        self.settings.port = 5558
        self.settings.port2 = 3000

        self.settings.port = 4444//+1
        self.settings.port2 = 3002
        baseUrl += ':' + self.settings.port;

        self.data.id = 'RCS'+Math.random();

        // app.post('/append_named',   self.appendNoteNamed);
        //self.setupSession();
        //var port = 3000
        http.listen(self.settings.port, function () {
            console.log('started')
            console.log('go to ', baseUrl)
            console.log('.', 'http://127.0.0.1:4444/testSay?text=Who%20are%20you?&rate=100%')
        })

        // open('http://localhost:5557')
        // http://localhost:5557/index.html
        var server = app.listen(self.settings.port2);
        // var io = require('socket.io').listen(server, { log: true });

        console.log('path', __dirname)
        app.use(express.static(__dirname + '/public_html'))
        app.use(express.static(__dirname + '/testFiles'));
        var dirStatic = sh.fs.join(__dirname, '..', '..',
            'RemoteConsoleServer', 'public_html')
        //sh.fs.exists(dirStatic, 'what is this different not working dev for jquery')
        app.use(express.static(dirStatic));
        // /media/sf_Dropbox/projects/crypto/mp/RemoteConsoleServer/public_html
        //app.use(express.static(__dirname + '/testFileds'));
        var path = __dirname + '/../../node_modules/shelpers/lib'
        path = sh.fs.resolve(path)
        console.log('path', path)
        app.use(express.static(path))
        //app.use(express.static(__dirname ) );// + '/public_html'))
        self.appSocket = io
        io.sockets.on('connection', function (socket) {
            console.log('new connnnn')
            self.pSocket = socket;
            socket.emit('news', { hello: 'world' });
            socket.emit('reload', {why:'grammar', count:self.data.id});

            socket.on('my other event', function (data) {
                console.log(data);
            });

            socket.on('audioEnded', function onAudioEndedUI (data) {
                self.proc('audioEnded', data);
                sh.callIfDefined(self.data.fxEndAudio)
                self.data.fxEndAudio = null;
            });
            /*socket.on('chat message', function (data) {
             console.log(data);
             });*/
            socket.on('chat message', function(msg){
                io.emit('chat message', msg);
            });


            socket.on('window.invoke', function (x) {
                console.log('window invoke')
                socket.broadcast.emit('window.invoke', x);
            })

        });

        self.server = app;
        self.newRoutes();

    }


    self.newRoutes = function newroutes() {


        self.server.get('/next', function (req, res) {
                var fileName = req.query.file;
                console.log( 'next', 'file....');
                setTimeout(function () {
                    self.sendNext();
                }, 400)
                res.end('ok');
            }
        )


    }

    p.open = function method(dirToOpen) {
        //C:\Users\Leniel>start %windir%\explorer.exe "C:\Users\Leniel\Desktop"
        var cmd = 'start %windir%\\explorer.exe '+
            sh.qq(dirToOpen)
        var cmd = 'explorer '+
            sh.qq(dirToOpen)
        try {
            sh.run(cmd)
        } catch ( e ) {
            console.error('what?')
        }
        //return
        var fileBat = 'test.bat';
        sh.writeFile(fileBat, cmd);
        var cmd2 = 'start test.bat'
        sh.run(cmd2)
    }

    self.sendNext = function sendNextCommand() {
        if ( self.lines.length == 0 ) {
            console.log('all work is done');
            return;
        }
        var cmd = self.lines.shift();
        if ( self.pSocket == null ) {
            self.proc('pSocket is null')
            return;
        }
        self.proc('sent')
        self.appSocket.emit('runcmd', cmd);
        self.appSocket.emit('chat message', "llllllllllllllllllllllll");
    }

    self.setupSession = function setupSession() {
        var t = EasyRemoteTester.create('Test evenote basics',{});
        var data = {};

        t.settings.baseUrl = baseUrl;


        t.xadd(function reload() {
                t.quickRequest( urls.reload,
                    'get', onResult )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.id>0, 'post-verify did not let me do a search');
                    t.cb();
                }
            }
        );

        t.add(function getFiles() {
                t.quickRequest( urls.getFile,
                    'get', onResult, {file:'a.txt'} )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.status=='ok', 'did not parse file');
                    t.cb();
                }
            }
        );
    }


    function defineRoutes(){
        self.say = function sayRoute(req, res){
            console.log('... say route ... ')
            var speakOpts = {};
            if ( req.body ) {
                speakOpts       = req.body;
            }
            if ( req.query && req.query.text ) {
                speakOpts       = req.query;
            }
            speakOpts.text = sh.dv(speakOpts.text, speakOpts.txt);
            speakOpts.text = sh.dv(speakOpts.text, ' ')

            speakOpts.playAudio = speakOpts.playAudio == 'true';
            speakOpts.speakOnce = speakOpts.speakOnce == 'true';

            speakOpts.text = speakOpts.text.replace(/"/g, "'");
            speakOpts.text = speakOpts.text.replace(/“/g, "'");

            if ( speakOpts.rate ) {
                if ( sh.isNumber(speakOpts.rate)) {
                    speakOpts.rate = speakOpts.rate * 100 / 5;
                    speakOpts.rate += '%'
                }
            }

            self.proc('speak', speakOpts.rate, speakOpts.text)

            speakOpts.fx = function () {
                console.log('on sent')
                if ( res.send )
                    res.send('');
            }
            self.speak(speakOpts) ;
            return;
        }

        self.testSay = function testSay(req, res){
            function test() {
                var req2 = {};
                req2.body = {};
                req2.body.text = 'sentence.'
                if ( req.query ) {
                    req2 = req;
                }
                req2.body.playAudio = 'true'
                var res = {};
                res.json =function () {}
                self.say(req2, res)
            }
            test();
            res.send(sh.getTimeStamp())
        }

        self.getSound = function getSound(req, res){
            res.sendfile('sample.wav');
        }


        p.speak = function speak(  speakOpts){
            if ( speakOpts.speakOnce   ){
                if (  self.speaking != 0 && self.speaking != null ) {
                    console.warn('ignoring speaking', self.speaking)
                    fx(true)
                    return;
                }
            }
            self.speaking = Math.random();
            console.log("speak.text: "+speakOpts.text);

            var MaryTTSSpeaker = require('./MaryTTS').MaryTTSSpeaker;
            var m = new MaryTTSSpeaker();

            if ( self.data.oldMary ) {
                //ensure old requests are responded to express allows 6 concurrent connections
                self.data.oldMary.kill();
                sh.callIfDefined(self.data.fxEndAudio)
            }
            self.data.oldMary = m;
            var fxEnd = speakOpts.fx;
            /* setTimeout(function () {
             sh.callIfDefined(fxEnd)
             }, 2000)*/
            self.data.fxEndAudio = fxEnd;

            var cfg = speakOpts;
            cfg.playLocally = sh.dv(cfg.playLocally, false)
            cfg.fx = function done(file){
                //what is time?
                //if ( file.includes(__dirname))
                var url = '/getSound'
                url +='?'+ new Date()
                io.sockets.emit('play', { hello: 'world', file: file,
                    url: url});
                // self.appSocket.emit('play', { hello: 'world' });
            }
            m.speak(cfg)

            return;


        }

        p.listVoices = function listVoices(req, res){
            //console.log("speak.text: "+text);
            var child_process = require('child_process');
            var gb = "say -v '?'"
            var isMac = sh.isWin() == false
            //  rate = 7
            if(sh.isWin()){ //windows
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -vl ';
            }
            console.log('log', gb)
            // EXECUTION
            var cp = child_process.exec(gb, function (err, stdout, stderr){
                if ( isMac ) {
                    var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
                    var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
                    console.log('cmd2convert', cmd2convert)
                    var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
                        fx(true);
                    });
                    return
                }

                res.send(stdout)
                //console.log('done speaking', text, stdout);
            });
            return;
        }
    }
    defineRoutes();


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin", req.headers['origin']);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.post('/say', self.say);
    app.get('/testSay', self.testSay);
    app.get('/say', self.say);
    app.get('/list', self.listVoices);
    app.get('/getSound', self.getSound);


    p.test = function test() {}


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments)
    }


}

exports.BrowserEvalServer = BrowserEvalServer;

if (module.parent == null) {
    var e = new BrowserEvalServer()
    e.start();

    e.test();

    var req = {};
    req.body = {};
    req.body.text = 'sentence.'
    req.body.playAudio = 'true'
    req.body.playLocally = true;
    var res = {};
    res.json =function () {}
    // e.say(req, res)

    setTimeout(function(){
        e.say(req, res)
    }, 1000)

    /*  setTimeout(function(){
     e.say(req, res)
     }, 3000)*/

}

