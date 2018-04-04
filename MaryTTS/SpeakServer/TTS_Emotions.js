var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

TTSAudition = require('./TTSAudition.js').TTSAudition

exports.TTSAudition = TTSAudition;

if (module.parent == null) {



    var voices = {}
    voices.CereProcWilliam = 'CereVoice William - English (England)'

    var text = "Hello <voice emotion='happy'>the sun is shining.</voice>"
    text +=  " The outbreak<voice emotion='sad'>cast a shadow</voice> over the former "
    text += `
    When people leave a tip they want to know it will
 <voice emotion='cross'> not be used</voice>
  to make up the minimum wage.
`
    text += `
    <s>
 The beautiful gardens have been restored to all their
 <voice emotion='calm'>eccentric Victorian splendour.</voice>
</s>`
    function addEmotion(text, emotion) {
        var str = [' <voice emotion=',sh.q(emotion),' >'].join('')
        str += text;
        str += '</voice> '
        return str
    }
    text = 'Hello '
    text = ' -'
     text += addEmotion('not be used', '')
    text += addEmotion('not be used', 'happy')
    text += addEmotion('not be used', 'cross')
    text += addEmotion('not be used', 'sad')


   /*
    Hello <voice emotion='happy'>the sun is shining.</voice> The outbreak<voice emotion='sad'>cast a shadow</voice> over the former
    When people leave a tip they want to know it will
    <voice emotion='cross'> not be used</voice>
    to make up the minimum wage.

    <s>
    The beautiful gardens have been restored to all their
    <voice emotion='calm'>eccentric Victorian splendour.</voice>
    </s>
    */
   console.log(text)
    var doNotPlay = false;
    var s = new TTSAudition();
    s.init()
    s.test3(
        {
            text: text,
            rate: '6',
            playAudio: true,
            playAudioAfter: true,
            randomFile: true,
            volume: '25',
            voice: voices.CereProcWilliam,
           // pitch: '-400',
          //  reverblite: true,
          //  sentenceIndex: '115',
         //   bookname: 'Wilde_Oscar_The_Picture_Of_Do  Unknownepub',
          //  storeAudioInBookname: true,
          //  doNotPlay: true,
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



