/**
 * Created by user on 8/2/15.
 */

/**
 * /say to speak test
 * Install http://sourceforge.net/projects/jampal/files/
 * http://jampal.sourceforge.net/ptts.html
 */

var sh = {};
var sh = require('shelpers').shelpers;


var fs = require("fs");
var encoding = 'utf8';
var express = require("express");

var bodyParser = require('body-parser');

FileCountLimiter = require('.//www/js/FileCountLimiter.js').FileCountLimiter
/*

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
 */

function SayServerLite() {
    var p = SayServerLite.prototype;
    p = this;
    var self = this;

    self.settings = {};

    self.data = {};
    self.data.cache = {};
    self.data.cachedFiles = [];


    var dirTrash = sh.fs.trash('sayServerLite')
    sh.fs.mkdirp(dirTrash)
    if (sh.fileExists(dirTrash)) {
        self.settings.useTrash = true
    }
    self.settings.fastMode = true
    self.settings.fastMode = false
    self.settings.returnJSONAudio = false;

    //self.settings.socketMode  =true;

    /**
     * Setup middleware and routes
     * @param urlf
     * @param appCode
     */
    p.start = function start() {
        self.setupExpressApp();
        self.data.app.post('/say', self.say);
        self.data.app.get('/list', self.listVoices);
        self.data.app.get('/speakText', self.speakText);
        self.data.app.post('/speakText2', self.speakText2);
    }

    p.setupExpressApp = function setupApp() {
        var app = express();
        self.data.app = app;
        var port = 4444;
        //  port = 5444;
        var http = require('http').Server(app);
        var io = require('socket.io')(http);
        self.data.io = io


        app.use(bodyParser({limit: '50mb'}));
        //app.use(express.json({limit: '50mb'}));
        // app.use(express.urlencoded({limit: '50mb'}));

        //Add middleware for cross domains
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        self.settings.port = port
        var baseUrl = 'http://127.0.0.1' + ':' + self.settings.port;
        //app.listen(port)
        http.listen(self.settings.port, function () {
            console.log('started')
            console.log('go to ', baseUrl)
            console.log('.', 'http://127.0.0.1:4444/testSay?text=Who%20are%20you?&rate=100%')
        })
        //G:\Dropbox\projects\delegation\Reader\TTS-Reader\MaryTTS\SpeakServer\public_html
        var dirStatic = sh.fs.join(__dirname, 'MaryTTS', 'SpeakServer', 'public_html');
        app.use(express.static(dirStatic));
        app.use(express.static(dirTrash));

        self.data.dirWWW = sh.fs.join(__dirname, 'www');
        self.data.dirWWW = sh.fs.slash(self.data.dirWWW)
        app.use(express.static(self.data.dirWWW));


        if (self.settings.socketMode) {
            setTimeout(function onTest() {
                var open = require("open");
                // open(baseUrl);
            }, 3000)

            self.setupSocketMode()
        }
        return app;
    }

    p.setupSocketMode = function setupSocketMode() {
        self.appSocket = self.data.io
        self.data.io.sockets.on('connection', function (socket) {
            console.log('new connnnn')
            if (self.data.tested != false) {
                self.test()
                self.data.tested = true;
            }
            self.pSocket = socket;
            socket.emit('news', {hello: 'world'});
            socket.emit('reload', {why: 'grammar', count: self.data.id});

            socket.on('my other event', function (data) {
                console.log(data);
            });

            socket.on('audioEnded', function onAudioEndedUI(data) {
                console.log('ended a sound', data)
                self.proc('audioEnded', data);
                sh.callIfDefined(self.data.fxEndAudio)
                self.data.fxEndAudio = null;
            });
            /*socket.on('chat message', function (data) {
             console.log(data);
             });*/
            socket.on('chat message', function (msg) {
                self.data.io.emit('chat message', msg);
            });


            socket.on('window.invoke', function (x) {
                console.log('window invoke')
                socket.broadcast.emit('window.invoke', x);
            })

        });
    }

    function defineRoutes() {
        self.say = function sayRoute(req, res) {
            var text = req.body.text;
            var rate = req.body.rate;
            var voice = req.body.voice;
            /*   var playAudio = req.body.playAudio=='true';*/
            var speakOpts = {};
            speakOpts = sh.clone(req.body);
            /* speakOpts.playAudio = playAudio;
             speakOpts.cacheAudio = req.body.cacheAudio=='true';
             speakOpts.playAudioAfter = req.body.playAudioAfter; //=='true';
             */
            sh.each(speakOpts, function convertAllARgs(k, v) {
                if (v === 'true' || v === true) {
                    speakOpts[k] = true
                } else {
                    if (v === false || v === 'false') {
                        speakOpts[k] = false
                    }
                }
            })

            var volume = req.body.volume;
            speakOpts.volume = volume;
            speakOpts.voice = voice;
            speakOpts.speakOnce = req.body.speakOnce == 'true';

            text = text.replace(/"/g, "'");
            text = text.replace(/“/g, "'");
            if (sh.isWin() == false) {
                var json = {};
                var file = __dirname + '/www/cache/sound' //nof file ext necessary
                json.src = "audio/mpeg3;base64,";
                json.src = "audio/x-wav;base64,";
                self.speak(function result(body) {
                    console.log('file', file + '.mp3')
                    fs.readFile(file + '.wav', function (err, original_data) {
                        console.log('data', original_data)
                        if (speakOpts.playAudio !== true) {
                            json.src += new Buffer(original_data, 'binary').toString('base64');
                        }
                        json.status = 'ok';
                        res.json(json);
                    });
                },
                    /*text, rate, voice, file, playAudio, */
                    speakOpts);

                return;

            }

            var json = {}
            json.src = "audio/rx-wav;base64,";
            self.speak(function onResultOfSpeaking(body) {
                if (self.settings.returnJSONAudio != true) {
                    //console.error('self.settings.returnJSONAudio != true');
                    res.json(json)
                    return;
                }
                else {
                    fs.readFile(__dirname + '/www/cache/sound.wav', function (err, original_data) {
                        if (original_data == null) {
                            res.json(json);
                            return;
                        }
                        json.src += new Buffer(original_data, 'binary').toString('base64');
                        json.status = 'ok';
                        // SEND RESULT
                        res.json(json);
                    });
                }
            }, /* text, rate, voice, file, playAudio, */speakOpts);
        }


        var nextX = {}
        nextX.data = {};
        nextX.load = function loadArr(arr) {
            nextX.arr = arr;
            nextX.currentIndex = 0
        }
        nextX.next = function next() {
            if (nextX.arr.length >= nextX.currentIndex)
                nextX.currentIndex = -1

            nextX.currentIndex++
            var nextItem = nextX.arr[nextX.currentIndex];
            nextX.data.current = nextItem;
            return nextItem;
        }
        nextX.getCurrent = function getCurrent() {
            if (nextX.data.current == null) {
                nextX.next()
            }
            return nextX.data.current;
        }
        nextX.load(['cachedFile1.wav', 'cachedFile2.wav', 'cachedFile3.wav'])


        p.speak = function speak(fx, /* text, rate, voice, file, playAudio, */speakOpts) {
            var isMac = sh.isWin() == false
            speakOpts = sh.dv(speakOpts, {})
            if (speakOpts.speakOnce) {
                if (self.speaking != 0 && self.speaking != null) {
                    console.warn('ignoring speaking', self.speaking)
                    fx(true)
                    return;
                }
            }
            self.speaking = Math.random();

            speakOpts.voice = sh.dv(speakOpts.voice, 'IVONA 2 Brian')
            //setTimeout(function () {

            //},30*1000)
            console.log('')
            console.log('speakOpts',speakOpts)
            self.proc("speak.text: " + speakOpts.text);
            if (speakOpts.text == 'zzz beep zzz') {
                var fileSong = __dirname + '/' + 'www/' + 'audio/' + 'tone.mp3'
                self.utils.playSong(fileSong, fx)
                return;
            }
            var child_process = require('child_process');
            if (isMac) {
                var gb = "say "
                voice = sh.dv(speakOpts.voice, 'Graham')
                if (isMac && speakOpts.voice == 'IVONA 2 Emma') {
                    speakOpts.voice = 'Heather'
                    // voice = 'Heather Infovox iVox'
                }
                if (isMac && speakOpts.voice == 'IVONA 2 Brian') {
                    speakOpts.voice = 'Heather'
                    speakOpts.voice = 'Graham'
                }

                gb += ' ' + '-v ' + speakOpts.voice + ' ';
                gb += ' ' + sh.qq(speakOpts.text) + ' ';

                if (speakOpts.rate == null) {
                    //   rate = 300; //hard code until fix other scripts
                }


                if (speakOpts.rate != null) {
                    speakOpts.rate = parseFloat(speakOpts.rate) * 450 / 10
                    speakOpts.rate *= 1.4 //temp till fix html
                    gb += ' ' + '-r ' + speakOpts.rate + ' ';
                }
                //var filePathFile = path.resolve(__dirname + '/www/cache/sound' + rand + '.wav')
                filePathFile = sh.fs.trash('sayServerLiteXPrompt', 'soundoutput')

                gb += ' ' + '-o ' + filePathFile + '.aiff' + ' ';
            }
            //  rate = 7
            if (sh.isWin()) { //windows
                var path = require('path');
                var rand = ''
                if (speakOpts.randomFile) {
                    rand = Math.random() * 1000
                    rand = rand.toString().slice(0, 2)
                }

                if (self.data.promptFiles == null) {
                    self.data.promptFiles = new FileCountLimiter();
                    var config = {};
                    config.dirFiles = sh.fs.trash('sayServerLiteXPrompts')
                    config.maxFiles = 10;
                    self.data.promptFiles.init(config)
                    self.data.promptFiles.method()

                }
                var fileTxtPrompt = sh.fs.join(self.data.promptFiles.settings.dirFiles, rand + '.txt')

                var filePathFile = path.resolve(__dirname + '/www/cache/sound' + rand + '.wav')


                var text = speakOpts.text;
                var fileNext = nextX.getCurrent();

                var indexCachedFile = fileCachedWav =
                    speakOpts.voice + '_' +
                    text.slice(0, 35) + text.slice(-35) + text.split(' ').length + '.wav'
                indexCachedFile = fileCachedWav = sh.replace(fileCachedWav, ' ', '_')
                if (self.settings.useTrash) {
                    // var fileTxtPrompt = fileTxtPrompt
                    var filePathFile = path.resolve(dirTrash + '/sound' + rand + '.wav')
                    fileCachedWav = path.resolve(dirTrash + '/' + fileCachedWav)
                }

                if (speakOpts.cacheActive ||
                    (speakOpts.playAudio && speakOpts.cacheAudio)) {
                    var cachedFile = self.data.cache[indexCachedFile]
                    if (cachedFile) {
                        console.log(sh.t, '>>> found cached', text, cachedFile)
                        self.utils.playSong(cachedFile, fx)
                        return;
                    } else {
                        console.log(sh.t, 'file not cached')
                    }
                }

                if (speakOpts.cacheActive || speakOpts.cacheAudio) {
                    filePathFile = fileCachedWav;
                }

                if ( speakOpts.storeAudioInBookname ) {
                    if (self.settings.useTrash) {
                        // var fileTxtPrompt = fileTxtPrompt
                        var dirBook = sh.fs.join(dirTrash, 'storedAudio', speakOpts.bookname)
                        sh.fs.mkdirp(dirBook)
                        var filePathCacheStoredAudio = sh.fs.join(dirBook, speakOpts.sentenceIndex+ '.mp3')
                        //
                        speakOpts.filePathCacheStoredAudio = filePathCacheStoredAudio;
                        if ( sh.fs.exists(filePathCacheStoredAudio)) {
                            console.log(sh.t, '>>> filePathCacheStoredAudio', filePathCacheStoredAudio)
                            if ( speakOpts.doNotPlay ) {
                                console.log('do not play')
                                fx()
                                return;
                            }
                            self.utils.playSong(filePathCacheStoredAudio, fx)
                            return;
                        }
                    }
                }


                fileTxtPrompt = sh.fs.slash(fileTxtPrompt)
                sh.writeFile(fileTxtPrompt, text);
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -u ' + fileTxtPrompt

                filePathFile = filePathFile.split(' ').join('_')
                filePathFile = sh.qq(filePathFile)
                if (speakOpts.playAudioAfter || speakOpts.cacheAudio || self.settings.socketMode) {
                    //store file
                    gb += ' ' + '-w ' + filePathFile + ' ';
                }
                gb += ' -voice ' + sh.qq(speakOpts.voice)// sh.qq('IVONA 2 Brian')
                gb += ' -v ' + sh.dv(speakOpts.volume, '70')
                if (speakOpts.rate != null) {
                    gb += ' -r ' + speakOpts.rate + ' ';
                }
                ;
                if (speakOpts.playAudio != true) {
                    // gb += ' -w ' + filePathFile;
                }

                if (speakOpts.cacheAudio) {
                    console.log('caching audio', filePathFile, fileCachedWav, sh.qq(text))
                    self.data.cachedFiles.push(fileCachedWav)
                    /*sh.each(self.data.cache, function removeIfVal(k, v) {
                     if (v == fileCachedWav) {
                     self.data.cache[k] == null;
                     delete  self.data.cache[k]
                     }
                     })*/
                    if (self.data.cachedFiles.length > 10) {
                        self.data.cachedFiles.unshift()
                    }
                    self.data.cache[indexCachedFile] = fileCachedWav;
                    //sh.copyFile(filePathFile, fileCachedWav)
                    // asdf.g
                }

            }

            console.log('log', gb)
            if (self.lastCp) {
                self.lastCp.kill('SIGINT')
                var spawn = require('child_process').spawn;
                //spawn("taskkill", ["/pid",  self.lastCp.pid, '/f', '/t']);
                //spawn("taskkill", [ "/IM ",  'cscript.exe', "/f",'/t']); //hope this the only csript

            }

            if (sh.isWin() && speakOpts.endOld != false) {
                var cp = child_process.exec(["taskkill", "/IM ",
                    'cscript.exe', "/f", '/t'].join(' '), function (err, stdout, stderr) {
                    if (stderr.includes('ERROR: The process "cscript.exe" not found.')) {

                    } else {
                        console.log('cscript', stderr, stdout);
                    }
                    playAudioClip();
                });
            } else {
                playAudioClip()
            }


            function playAudioClip() {
                if (self.lastCp) {
                    self.lastCp.kill('SIGINT')
                }


                // EXECUTION
                var cp = child_process.exec(gb, function (err, stdout, stderr) {
                    self.speaking = 0;
                    if (isMac) {
                        var cmd2convert = 'lame -m m ' + filePathFile + '.aiff ' + filePathFile + '.mp3';
                        var cmd2convert = 'ffmpeg -i ' + filePathFile + '.aiff ' + filePathFile + '.wav';
                        console.log('cmd2convert', cmd2convert)

                        if (speakOpts.playAudio == true) {
                            var cmd2play = 'afplay ' + filePathFile + '.aiff';
                            console.log('playAudio')
                            var cp = child_process.exec(cmd2play, function (err, stdout, stderr) {
                                fx(true);
                                console.log('....')
                                // if ( playAudio != true ) {

                                // }

                            });
                            return;
                        }

                        var cp = child_process.exec(cmd2convert, function (err, stdout, stderr) {
                            fx(true);
                            console.log('finished converting')
                        });
                        return
                    }
                    if (self.data.modeApplyConversions) {
                        spark2();
                    } else {
                        self.utils.doConvert(filePathFile, spark2, speakOpts);
                    }

                })


                function spark2(newSoundPath) {

                    //filePathFile = asdf
                    if ( newSoundPath ) {
                        filePathFile = newSoundPath;
                    }

                    if (  speakOpts.filePathCacheStoredAudio ) {
                        console.log('copy stuff',filePathFile, speakOpts.filePathCacheStoredAudio )
                        sh.fs.copy(filePathFile, speakOpts.filePathCacheStoredAudio)
                    }

                    if ( speakOpts.doNotPlay ) {
                        console.log('do not play2')
                        fx()
                        return;
                    }

                    if (speakOpts.cacheAudio && speakOpts.playAudio) {
                        self.utils.playSong(filePathFile, fx)
                        return;
                    }
                    if (speakOpts.playAudioAfter) {
                        self.utils.playSong(filePathFile, fx)
                        return;
                    }
                    if (self.settings.socketMode) {
                        self.utils.playSong(filePathFile, fx)
                        return;
                    }
                    if (speakOpts.cacheAudio && speakOpts.playAudio !== true) {
                       setTimeout(function waitToEnsureWRiing() {
                           fx(true)
                       },50)
                        return;
                    }

                    if (fx)
                        fx(true);
                    //console.log('done speaking', text, stdout);
                }
                self.lastCp = cp;

            }

            return;
        }

        p.utils = {}
        p.utils.getDuration = function getDuration(fileSong, fx) {
            var txt = null

            var timer = sh.newTimer()

            try {
                txt = sh.runAsync(
                    [
                        sh.fs.join(__dirname, 'bin', 'windows', 'ffmpeg.exe'),
                        '-i',
                        sh.qq(fileSong)
                    ].join(' '), doneRunningDuration)
            } catch (e) {
                txt = e.message;
                //this is an error b/c we hav eno action just ge tduraction
            }


            function doneRunningDuration(df) {
                //console.error('ok', txt)
                var txtOutput = df.message;
                var strDuration = sh.getContentAfter(txtOutput, 'Duration: ')
                strDuration = sh.getContentBefore(strDuration, ',')

                strDuration = strDuration.trim()
                var dbg = strDuration.split(':')

                sh.each(dbg, function onK(k, v) {
                    dbg[k] = parseFloat(dbg[k]);
                })

                var sec = dbg[0] * sh.time.hours
                    + dbg[1] * sh.time.minutes
                    + dbg[2] * 1


                var ms = sec * 1000
                sec -= .2
                var timeDiff = timer.stop()
                console.log('sec', sec)
                sec -= timeDiff;
                console.log('td', timeDiff)
                console.log('duration', strDuration, dbg, sec, ms)

                //doConvertVoice()
                fx(sec);
            }
            /*function onConvertDone() {
                fx(sec);
            }*/
        }
        p.utils.doConvert = function doConvert(fileSound, fxDone, speakOpts) {
                var SoundPitcher = require(__dirname+'/MaryTTS/SpeakServer/SoundPitch.js').SoundPitcher;
                var s = new SoundPitcher();
                s.init()
                s.sound(fileSound ); //"C:/Users/user1/trash/sayServerLite/sound54.wav")

                /*
                 var config = {
                 reverblite:true,
                 highpass:true,
                 }
                 */
                s.init();
                s.setupData();
                s.activeSoundConfig(speakOpts);
                s.convertAsync(function onDone(newOutputFile) {

                    //onConvertDone();
                    //return;
                    console.log('newOutputFile', newOutputFile)

                    sh.cid(fxDone, newOutputFile)
                    // s.play(kfile)
                })


            }


        p.utils.playSong = function playSong(fileSong, fx) {

            if (self.settings.socketMode) {
                self.data.fxEndAudio = fx;
                dirTrash = sh.fs.slash(dirTrash)
                fileSong = sh.fs.slash(fileSong)
                fileSong = fileSong.replace(dirTrash, '')
                fileSong += '?timestamp=' + new Date()

                fileSong = fileSong.replace(self.data.dirWWW, '')

                self.data.io.sockets.emit('play', {
                    hello: 'world', file: '',
                    url: fileSong
                });

                return;
            }


            var h = {}
            h.fxCallbackInvoked = false;

            if (self.settings.fastMode) {
                self.utils.getDuration(fileSong, function onDuration(secs) {
                    var ms = secs * 1000;
                    setTimeout(function okn() {
                        fx()
                    }, ms);
                    h.fxCallbackInvoked = true;
                })


            }

            sh.runAsync(
                [
                    sh.fs.join(__dirname, 'bin', 'windows', 'cmdmp3.exe'),
                    sh.qq(fileSong)
                ].join(' '),

                function onDone() {
                    if (h.fxCallbackInvoked == false) {
                        fx();
                    }
                    //console.error('eeeer')
                })

        }

        p.listVoices = function listVoices(req, res) {
            //console.log("speak.text: "+text);
            var child_process = require('child_process');
            var gb = "say -v '?'"
            var isMac = sh.isWin() == false
            //  rate = 7
            if (sh.isWin()) { //windows
                gb = 'cscript "C:\\Program Files\\Jampal\\ptts.vbs" -vl ';
            }
            console.log('log', gb)
            // EXECUTION
            var cp = child_process.exec(gb, function (err, stdout, stderr) {
                /*
                if (isMac) {
                    var cmd2convert = 'lame -m m ' + file + '.aiff ' + file + '.mp3';
                    var cmd2convert = 'ffmpeg -i ' + file + '.aiff ' + file + '.wav';
                    console.log('cmd2convert', cmd2convert)
                    var cp = child_process.exec(cmd2convert, function (err, stdout, stderr) {
                        fx(true);
                    });
                    return
                }
                */

                res.send(stdout)
                //console.log('done speaking', text, stdout);
            });
            return;
        }

        p.speakText = function speakText(req, res) {
            self.speak(function ok() {
                res.send('ok')
            }, req.query.text, 6)

        }


        p.speakText2 = function speakText(req, res) {
            /* self.speak(function ok() {
             res.send('ok')
             }, req.query.text, 6 )*/

            var contents = req.body;
            sh.writeFile('text.html', contents.html)
            res.send()

        }
    }

    defineRoutes();

    p.test =
        function test() {

            var sentObjs = [
                {text: 'zzz beep zzz'},
                {text: 'Sentence'},
                {text: 'Sentence'},
                {text: 'Sentence', cacheAudio: true, playAudio: false},
                //{ text:'Sentence2',cacheAudio:true},
                {text: 'Sentence', cacheAudio: true},
                {text: 'Sentence', cacheAudio: true},
            ]


            var h = {}
            h.d = new Date();

            var ddd = [];

            var index = 0;

            sh.async(sentObjs, function onCall(k, fx) {
                //e.start();
                // asdf.g
                index++;
                console.log('\t', index, 'pu', k.text)
                var req = {};
                req.body = {};
                // k.text = 'take that dog outside i said, it\'s muddy'
                req.body.text = k.text;
                req.body.playAudio = 'true'
                if (k.cacheAudio) {
                    req.body.cacheAudio = 'true';
                }
                if (k.playAudio == false) {
                    req.body.playAudio = 'false';
                }
                var res = {};
                res.json = function onJSon() {
                    var yy = sh.time.secs(h.d);
                    console.log('how much time', yy)
                    h.d = new Date();
                    ddd.push(yy)
                    fx()
                }

                self.say(req, res)
            }, function asdf() {
                console.log(ddd)
            })

        }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }

}

exports.SayServerLite = SayServerLite;

if (module.parent == null) {
    var e = new SayServerLite()
    e.start();


    var TTSTestCaching = require('./MaryTTS/SpeakServer/TTSTestCaching.js').TTSTestCaching
    var s = new TTSTestCaching();
    s.init()
    s.test2()

    /*
     var req = {};
     req.body = {};
     req.body.text = 'sentence.'
     req.body.playAudio = 'true'
     var res = {};
     res.json =function () {}
     e.say(req, res)

     setTimeout(function ()  {
     var req = {};
     req.body = {};
     req.body.text = 'sentence 2.'
     req.body.cacheAudio = 'true'
     var res = {};
     res.json =function () {}
     e.say(req, res)
     }, 1000)


     setTimeout(function ()  {
     var req = {};
     req.body = {};
     req.body.text = 'sentence 2.'
     req.body.cacheAudio = 'true'
     req.body.playAudio = 'true'
     var res = {};
     res.json =function () {}
     e.say(req, res)
     }, 2000)


     */


}
;



