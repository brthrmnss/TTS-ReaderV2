var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

function MaryTTSSpeaker() {
    var p = MaryTTSSpeaker.prototype;
    p = this;
    var self = this;
    self.settings = {}
    self.data = {};
    p.init = function init(url, appCode) {

    }

    p.test = function test() {

        var cfg = {};


        cfg.playLocally = true
        cfg.text = 'is that a nice body you have?'
        cfg.voice = 'cmu-rms en_US male unitselection general'
        cfg.voice = 'cmu-rms' //_en_US_male_unitselection_general'
        self.speak(cfg)

        setTimeout(function () {
            cfg.text = 'what did you say?'
            cfg.voice = 'cmu-slt';
            cfg.trash = true;
            self.speak(cfg)
        }, 1500)


        setTimeout(function () {
            cfg.text = 'what did you say?'
            cfg.voice = 'cmu-slt';
            cfg.trash = true;
            self.speak(cfg)
        }, 3200)


        setTimeout(function () {
            cfg.text = 'me too ..... im waiting for ur response ...'
            cfg.voice = 'dfki-obadiah';
            cfg.trash = true;
            self.speak(cfg)
        }, 2000)

        return

    }

    p.kill = function kill() {
        self.data.killed = true;
    }

    p.speak = function speak(cfg) {
        var port = 59125
        var baseUrl = 'http://127.0.0.1:' + port
        var t = EasyRemoteTester.create('Test say basics', {showBody: false});
        var data = {};
        t.settings.baseUrl = baseUrl
        var urls = {};
        urls.notes = {};
        urls.say = t.utils.createTestingUrl('say')
        urls.process = t.utils.createTestingUrl('process')
        urls.voices = t.utils.createTestingUrl('voices')


        cfg.text = self.utils.escapeXML(cfg.text)

        //cfg.rate = sh.dv(cfg.rate, '+20%')
        cfg.rate = sh.dv(cfg.rate, '100%')

        var maryXML = ['<?xml version="1.0" encoding="UTF-8"?>',
            '<maryxml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://mary.dfki.de/2002/MaryXML" version="0.4" xml:lang="en-US">',
            // '<p>',
            '<prosody rate="' + cfg.rate + '" range="-10%" >' + cfg.text + '</prosody>',
            //   '</p>',
            '</maryxml>'];

        maryXML = maryXML.join(' \n')

        self.settings.showMaryXML = true
        if (self.settings.showMaryXML)
            console.log('mary', maryXML)

        //request raw xml
        var req = {}
        req.INPUT_TYPE = 'RAWMARYXML'
        req.OUTPUT_TYPE = 'AUDIO'
        req.INPUT_TEXT = maryXML
        req.INPUT_TEXT = maryXML
        req.LOCALE = 'en_US'
        req.AUDIO = "WAVE_FILE"
        if (cfg.voice) {
            if (cfg.voice == 'IVONA 2 Brian') {
                cfg.voice = 'cmu-rms'
                cfg.voice = 'dfki-obadiah'
            }
            if (cfg.voice == 'IVONA 2 Kendra') {
                cfg.voice = 'cmu-slt'
            }
            req.VOICE = cfg.voice;
        }

        // req.AUDIO_OUT= "WAVE_FILE"
        // req.VOICE='bits3'
        var t2 = t.clone('test a few voices notes');
        t2.getR(urls.process, /*null,*/ 'getBinary').with(req)
            .addFx(function onResult(body, resp, error) {

                //console.error('onResult', body, resp, error)

                console.log('onResult of respose', resp.statusCode)
                if (resp == null) {
                    console.error('response is null');
                    console.error(error);
                    return
                }
                if (resp.statusCode != 200) {
                    console.error('...', resp.code, resp.statusCode, resp.statusMessage)
                    if (body == null) {
                        console.error(body, resp.code);
                    } else {
                        console.error(body.toString(), resp.code);
                    }
                    t2.assert(resp.statusCode==200, body.toString() )
                    return
                }
                if (body == null) {
                    console.error('body', body, 'is null')
                    return
                }
                var file = 'sample.wav';
                file = sh.fs.resolve(file);
                if (cfg.trash) {
                    sh.fs.mkdirp(sh.fs.trash('sounds'))
                    file = sh.fs.trash('sounds/' + Math.random() + '.wav')
                }
                console.log('')
                //console.log(body)
                self.proc('writing file', file, body.length, body == undefined, body == 'undefined')
               try {
                   sh.writeFile(file, body, false, true)
               } catch( e ) {
                    console.log('e')
                   sh.writeFile(file, body, false, true)
               }
                if (cfg.playLocally == true) {
                    sh.runAsync(
                        ['G:/Dropbox/projects/delegation/Reader/TTS-Reader/bin/windows/cmdmp3.exe',
                            sh.qq(file)].join(' ')
                        ,
                        commandRaun
                    )
                } else {
                    commandRaun()

                }


                function commandRaun() {
                    sh.callIfDefined(cfg.fx, file)
                    sh.callIfDefined(cfg.fxDone, file)
                }
                //  if (self.data.killed != true)

                return;
            })
            .fxFail(function onFault(e) {
                console.error(e)
            })
    }


    p.test2 = function test2(cfg) {
        var port = 59125
        var baseUrl = 'http://127.0.0.1:' + port
        var t = EasyRemoteTester.create('Test say basics', {showBody: false});
        var data = {};
        t.settings.baseUrl = baseUrl
        var urls = {};
        urls.notes = {};
        urls.say = t.utils.createTestingUrl('say')
        urls.voices = t.utils.createTestingUrl('voices')

        var t2 = t.clone('test a few voices notes');
        t2.getR(urls.voices, /*null,*/ 'get')
            .addFx(function onResult(body, resp, error) {

                var voices = sh.breakStringIntoLinesSafe(body);
                console.log(voices)




                sh.each(voices, function addCmds(k,voice) {
                    if ( voice == '' ) {
                        return
                    }
                    voice = voice.split(' ')[0]
                    t2.addNext(function onK() {

                        console.log('aaaa', voice)
                        var cfg = {};
                        cfg.text = 'me too ..... im waiting for ur response ...'
                        cfg.voice = 'dfki-obadiah';
                        cfg.voice = voice
                        cfg.playLocally = true;
                        cfg.trash = true;
                        cfg.fxDone = function ok(){
                            console.log('aaaa-done')
                            t2.cb()
                        }
                        self.speak(cfg)
                    }, k)

                })

                return;
                t2.addNext(function onK() {
                    console.log('aaaa')
                    var cfg = {};
                    cfg.text = 'me too ..... im waiting for ur response ...'
                    cfg.voice = 'dfki-obadiah';
                    cfg.playLocally = true;
                    cfg.trash = true;
                    cfg.fxDone = function ok(){
                        console.log('aaaa-done')
                        t2.cb()
                    }
                    self.speak(cfg)
                })


                t2.addNext(function onK() {
                    console.log('bbbb')
                },1)
            })
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }

    p.utils = {}
    p.utils.escapeXML = function escapeXML(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        /*
         AS of date titel should up near the title
         */


    }


}

exports.MaryTTSSpeaker = MaryTTSSpeaker;

if (module.parent == null) {

    var s = new MaryTTSSpeaker();
    s.init()
    s.test()
}



