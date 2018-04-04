var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

TTSAudition = require('./TTSAudition.js').TTSAudition

exports.TTSAudition = TTSAudition;

if (module.parent == null) {

    var doNotPlay = false;
    var s = new TTSAudition();
    s.init()
    s.test3(
        {
            text: '"Being  natural  is  simply  a  pose,  and  the  most  irritating  pose  I  know,"',
            rate: '6',
            playAudio: true,
            playAudioAfter: true,
            randomFile: true,
            volume: '25',
            voice: 'IVONA 2 Eric',
            pitch: '-400',
            reverblite: true,
            sentenceIndex: '115',
            bookname: 'Wilde_Oscar_The_Picture_Of_Do  Unknownepub',
            storeAudioInBookname: true,
            doNotPlay: true,
            speakOnce: false
        }
    )
    /*    s.test3({
     text: 'Hell-o, this is  miguel, wear are you going - my frend?',
     rate: 5,
     pitch: 400,
     bookname: 'MiguelTest',
     sentenceIndex:2,
     storeAudioInBookname:true,
     doNotPlay:doNotPlay,
     // garage:true,
     //  chorus3:null,
     reverblite: true,
     voice: 'IVONA 2 Miguel'
     })*/
}



