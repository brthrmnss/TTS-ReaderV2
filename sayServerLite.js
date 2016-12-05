/**
 * Created by user on 8/2/15.
 */

/**
 * /say to speak test
 * Install http://sourceforge.net/projects/jampal/files/
 * http://jampal.sourceforge.net/ptts.html
 */

var sh = {};
var fs = require("fs");
var encoding = 'utf8';
var express = require("express");
var app = express();
var r
var port = 4444;


sh.writeFile = function writeFile(fileName, content, surpressErrors, binary){

    fs.writeFile(fileName, content, encoding, function(err){
        if(err){
            return console.log(err);
        }
    });
}

sh.dv = function defaultValue(input, ifNullUse){
    if(input == null){
        return ifNullUse;
    }
    return input;
}

sh.qq = function qq(text){
    return "\"" + text + "\"";
};

sh.isWin = function isWin() {
    return process.platform === 'win32'
};

function SayServerLite(){
    var p = SayServerLite.prototype;
    p = this;
    var self = this;
    /**
     * Setup middleware and routes
     * @param urlf
     * @param appCode
     */
    p.start = function start(){
        self.setupExpressApp();
        app.post('/say', self.say);
        app.get('/list', self.listVoices);
    }

    p.setupExpressApp = function setupApp(){

        var bodyParser = require('body-parser');
        app.use(bodyParser());

        //Add middleware for cross domains
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.listen(port)
        return app;
    }

    function defineRoutes(){
        self.say = function sayRoute(req, res){
            var text = req.body.text;
            var rate = req.body.rate;
            var voice = req.body.voice;
            var playAudio = req.body.playAudio=='true';
            var speakOpts = {};
            speakOpts.playAudio = playAudio;
            var volume = req.body.volume;
            speakOpts.volume = volume;
            speakOpts.voice = voice;
            speakOpts.speakOnce = req.body.speakOnce == 'true';


            text = text.replace(/"/g, "'");
            text = text.replace(/“/g, "'");
            if (sh.isWin()==false) {
                var json = {};
                var file = __dirname+'/www/cache/sound' //nof file ext necessary
                json.src="audio/mpeg3;base64,";
                json.src="audio/x-wav;base64,";
                self.speak(function result(body){
                    console.log('file', file +'.mp3')
                    fs.readFile(file +'.wav', function(err, original_data){
                        console.log('data', original_data)
                        if ( speakOpts.playAudio !== true ) {
                            json.src += new Buffer(original_data, 'binary').toString('base64');
                        }
                        json.status = 'ok';
                        res.json(json);
                    });
                }, text , rate, voice, file,playAudio, speakOpts);

                return;

            }


            var json = {}
            json.src="audio/rx-wav;base64,";
            self.speak(function result(body){
                fs.readFile(__dirname+'/www/cache/sound.wav', function(err, original_data){
                    if ( original_data == null ) {
                        res.json(json);
                        return;
                    }
                    json.src += new Buffer(original_data, 'binary').toString('base64');
                    json.status = 'ok';
                    // SEND RESULT
                    res.json(json);
                });
            }, text , rate, voice, file, playAudio, speakOpts);
        }

        p.speak = function speak(fx, text, rate, voice, file, playAudio, speakOpts){
            var isMac = sh.isWin() == false
            if ( speakOpts.speakOnce   ){
                if (  self.speaking != 0 && self.speaking != null ) {
                    console.warn('ignoring speaking', self.speaking)
                    fx(true)
                    return;
                }
            }
            self.speaking = Math.random();
            //setTimeout(function () {

            //},30*1000)
            console.log("speak.text: "+text);
            var child_process = require('child_process');
            if ( isMac ) {
                var gb = "say "
                voice = sh.dv(voice, 'Graham')
                if (isMac && voice == 'IVONA 2 Emma') {
                    voice = 'Heather'
                    // voice = 'Heather Infovox iVox'
                }
                if (isMac && voice == 'IVONA 2 Brian') {
                    voice = 'Heather'
                    voice = 'Graham'
                }

                gb += ' ' + '-v ' + voice + ' ';
                gb += ' ' + sh.qq(text) + ' ';

                if ( rate == null ) {
                    //   rate = 300; //hard code until fix other scripts
                }


                if (rate != null) {
                    rate = parseFloat(rate)*450/10
                    rate *= 1.4 //temp till fix html
                    gb += ' ' + '-r ' + rate + ' ';
                }

                gb += ' ' + '-o ' + file + '.aiff' + ' ';
            }
            //  rate = 7
            if(sh.isWin()){ //windows
                var path = require('path');
                var filePath = path.resolve(__dirname+'/www/cache/txt.txt')
                var filePathFile = path.resolve(__dirname+'/www/cache/sound.wav')
                filePath = filePath.replace(/\\/gi, "/")
                sh.writeFile(filePath, text);
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -u '+filePath
                gb +=  ' -voice ' + sh.qq(sh.dv(speakOpts.voice, 'IVONA 2 Brian'))// sh.qq('IVONA 2 Brian')
                gb +=  ' -v ' + sh.dv(speakOpts.volume, '100')
                if(rate != null){
                    gb += ' -r ' + rate + ' ';
                };
                if ( playAudio != true )
                    gb +=  ' -w ' + filePathFile;
            }

            console.log('log', gb)
            if ( self.lastCp) {
                self.lastCp.kill('SIGINT')
                var spawn = require('child_process').spawn;
                //spawn("taskkill", ["/pid",  self.lastCp.pid, '/f', '/t']);
                //spawn("taskkill", [ "/IM ",  'cscript.exe', "/f",'/t']); //hope this the only csript

            }

            if ( sh.isWin() ) {
                var cp = child_process.exec( ["taskkill", "/IM ",
                    'cscript.exe', "/f",'/t'].join(' '), function (err, stdout, stderr){
                    console.log('cscript', stderr, stdout);
                    runThing();
                });
            } else {
                runThing()
            }


            function runThing() {
                if ( self.lastCp ) {
                    self.lastCp.kill('SIGINT')
                }
                // EXECUTION
                var cp = child_process.exec(gb, function (err, stdout, stderr){
                    self.speaking = 0;
                    if ( isMac ) {
                        var cmd2convert = 'lame -m m '+file+'.aiff '+file+'.mp3';
                        var cmd2convert = 'ffmpeg -i '+file+'.aiff '+file+'.wav';
                        console.log('cmd2convert', cmd2convert)

                        if ( playAudio == true ) {
                            var cmd2play = 'afplay ' + file+'.aiff';
                            console.log('playAudio')
                            var cp = child_process.exec(cmd2play, function (err, stdout, stderr){
                                fx(true);
                                console.log('....')
                                // if ( playAudio != true ) {

                                // }

                            });
                            return;
                        }

                        var cp = child_process.exec(cmd2convert, function (err, stdout, stderr){
                            fx(true);
                            console.log('finished converting')
                        });
                        return
                    }

                    fx(true);
                    //console.log('done speaking', text, stdout);
                });
                self.lastCp = cp;

            }
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

    p.proc = function debugLogger(){
        if(self.silent == true){
            return
        }
        sh.sLog(arguments)
    }

}

exports.SayServerLite = SayServerLite;

if(module.parent == null){
    var e = new SayServerLite()
    e.start();
    var req = {};
    req.body = {};
    req.body.text = 'sentence.'
    req.body.playAudio = 'true'
    var res = {};
    res.json =function () {}
    e.say(req, res)
};



