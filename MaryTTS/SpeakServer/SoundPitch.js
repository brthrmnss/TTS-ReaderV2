var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:/Users/morriste/train/train_drive/trash/marytts/marytts-5.1.2/marytts-5.1.2/bin

TTSAudition = require('./TTSAudition.js').TTSAudition

exports.TTSAudition = TTSAudition;

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function ProgramRunner() {
    var p = ProgramRunner.prototype;
    p = this;
    var self = this;
    p.setupData = function setupData() {
        if (self.data == null) {
            self.data = {};
        }
        self.data.args = []
    }
    self.setupData();

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.data.sox = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/bin/windows/sox.exe'
        self.data.sox = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/bin/windows/sox-14.4.1/sox.exe'

        self.data.sox = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/bin/windows/SOX/sox.exe'

        self.data.mp3player = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/bin/windows/cmdmp3.exe'
    }

    p.method = function method(config) {
    }
    p.activeSoundConfig = function activeSoundConfig(config) {
        sh.each(config, function findStuffONSoundConfig(k, v) {
            var fx = self[k]
            if (sh.isFunction(fx)) {
                fx(v);
            }
        });
    }
    p.sound = function sound(fileSound) {
        if (fileSound.startsWith('"')) {
            fileSound = fileSound.slice(1, -1)
        }
        self.data.fileSound = fileSound
        self.data.fileSoundOutput = self.data.fileSound
        if (self.settings.convertFileInline!= true ) {
            self.data.fileSoundOutput += '.out.mp3';
        }
    }
    p.pitch = function method(pitch) {
        self.data.args.push('pitch ' + pitch);
    }
    p.speed = function method(speed) {
        self.data.args.push('speed  ' + speed);
    }
    p.tremolo = function tremolo(speed) {
        self.data.args.push('speed  ' + speed);
    }
    p.reverb = function reverb(gain) {
        self.data.args.push('gain −3 pad 0 3 reverb ' + gain);
    }
    p.metalic = function reverb(gain) {
        self.data.args.push('echo 0.8 0.88 6.0 0.4');
    }
    p.panR = function panLeft(gain) {
        //self.data.args.push('pan -b 8');
        //self.data.args.push('remix 1v0.1,2v0.9 2v0.1 vol 1.1 ')
        self.data.args.push('remix  -a 1,2p-12 1p-6,2')
        //self.data.args.push('remix 0 1' )

        //self.data.args.push('c 2 -b 16 -r 44100 -v 0.1 ')
    }
    p.panL = function panLeft(gain) {
        return
        self.data.args.push('remix 1 0')
        return;
        //self.data.args.push('pan -b 8');
        self.data.args.push('remix 1v0.9,2v0.1 1v0.9,2v0.1 vol 1.1 ')
        //self.data.args.push('c 2 -b 16 -r 44100 -v 0.1 ')
    }
    p.panLeft = function panLeft(gain) {
        //self.data.args.push('pan -b 8');
        self.data.args.push('remix 1v0.9,2v0.1 2v0.8 vol 1.1 ')
        //self.data.args.push('c 2 -b 16 -r 44100 -v 0.1 ')
    }
    p.panRight = function panRight(gain) {
        //self.data.args.push('pan -b 8');
        self.data.args.push('remix 1v0.9,2v0.9 2v0.8 vol 1.1 ')
        // self.data.args.push('remix 1v0.9,2v0.1 2v0.8 vol 1.1 ')
        //self.data.args.push('c 2 -b 16 -r 44100 -v 0.1 ')
    }
    p.lowpass = function lowpass() {
        self.data.args.push(' lowpass 3700');
    }
    p.lowpass2 = function lowpass2() {
        self.data.args.push(' lowpass 1000');
    }
    p.highpass = function highpass(gain) {
        self.data.args.push(' highpass 1000');
    }
    p.garage = function garage() {
        self.data.args.push('echos 0.8 0.7 40.0 0.25 63.0 0.3');
    }
    p.overload = function reverb(gain) {
        self.data.args.push('chorus 0.7 0.9 55.0 0.4 0.25 2.0 -t');
    }
    p.drunkenloudspeaker = function reverb(gain) {
        self.data.args.push('flanger 0.9 0.9 4.0 0.23 1.3 -s');
    }
    p.drunkenloudspeaker2 = function reverb(gain) {
        self.data.args.push('phaser 0.9 0.85 4.0 0.23 1.3 -s');
    }
    p.reverblite = function reverb(gain) {
        gain = 13
        self.data.args.push('gain −3 reverb ' + gain);
    }
    p.reverblite2 = function reverb(gain) {
        gain = 13
        self.data.args.push('gain −3 pad 0 3 reverb ' + gain);
    }
    p.bass = function bass(speed) {
        speed = sh.dv(speed, '40.2')
        self.data.args.push('bass ' + speed);
    }
    p.treble = function treble(speed) {
        speed = sh.dv(speed, '40.2')
        self.data.args.push('treble ' + speed);
    }
    p.choruslite = function choruslite(speed) {
        self.data.args.push(' chorus 0.7 0.9 55 0.4 0.25 2 −t');
    }
    p.chorus = function chorus(speed) {
        self.data.args.push(' chorus 0.7 0.9 55 0.4 0.25 2 −t');
    }
    p.chorus3 = function chorus3(speed) {
        self.data.args.push('chorus 0.5 0.9 50 0.4 0.25 2 −t \
      60 0.32 0.4 2.3 −t 40 0.3 0.3 1.3 −s');
    }
    p.phaser = function phaser(speed) {
        self.data.args.push('phaser ' + '0.8 0.74 3 0.4 0.5 −t');
    }
    p.phaser3 = function phaser3(speed) {
        self.data.args.push('phaser ' + '0.6 0.66 3 0.6 2 −t');
    }
    p.overdrive = function reverb(gain) {
        gain = sh.dv(gain, 20)
        self.data.args.push('overdrive ' + gain);
    }
    p.reset = function reset() {
        self.data.args = [];
    }
    p.vol = function vol(speed) {
        self.data.args.push('vol  ' + speed);
    }
    p.convert = function convert() {
        var commands = [self.data.sox, self.data.fileSound];
        commands.push(self.data.fileSoundOutput)
        command = commands.join(' ')
        command += ' ' + self.data.args.join(' ')
        console.log('run command', command)
        sh.run(command)
    }
    p.convertAsync = function convertAsync(fxDone) {
        if (self.data.args.length == 0) {
            sh.cid(fxDone, self.data.fileSound)
            return;
        }
        var commands = [self.data.sox, self.data.fileSound];
        commands.push(self.data.fileSoundOutput)
        command = commands.join(' ')
        command += ' ' + self.data.args.join(' ')
        console.log('run command async', command)
        sh.runAsync(command, onDone)
        function onDone(asdf) {
            sh.cid(fxDone, self.data.fileSoundOutput)
        }
    }

    p.play = function play(fileSoundOverride) {
        //var commands = [self.data.fileSoundOutput];
        if (fileSoundOverride != null) {
            self.data.fileSoundOutput = fileSoundOverride;
        }
        var commands = [self.data.mp3player, self.data.fileSoundOutput];
        command = commands.join(' ')
        console.log('run play command', command)
        sh.run(command)
    }


    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ProgramRunner = ProgramRunner;
exports.SoundPitcher = ProgramRunner;
/*

 if (module.parent == null) {
 var instance = new BasicClass();
 var config = {};
 instance.init(config)
 }

 */

if (module.parent == null) {

    var s = new ProgramRunner();
    s.init()
    s.sound("C:/Users/user1/trash/sayServerLite/sound54.wav")
    // s.pitch(-400)
    //s.speed(0.8)
    // s.vol(3.2)
    // s.tremolo(1.5)
    // s.drunkenloudspeaker2(0.1*100)
    //s.panLeft()
    s.panR()
    //  s.highpass()
    //   s.panLeft()
    //   s.choruslite(3.2)
    //s.chorus3(3.2)
    // s.bass(50.2)
    //s.treble(3.2)
    // s.reverb(3.2)
    // s.phaser(3.2)
    /*  s.phaser2(3.2)
     s.phaser3(3.2)*/
    // s.phaser3(3.2)
    // s.vol(-90.8)
    //s.overdrive(40)

    /* s.chorus(3.2)
     s.echo(3.2)*/
    s.convert()
    s.play()

    s.reset()
    s.vol(3.2)
    s.panL()
    s.convert()
    s.play()
    /*/!* s.test3({text:'hello, this is  miguel',
     voice:'IVONA 2 Miguel'})*!/
     s.test3({text:'Hell-o, this is  miguel, wear are you going - my frend?',
     rate:5,
     pitch:-3,
     voice:'IVONA 2 Miguel'})
     //s.test2()*/
}



