var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

var MaryTTSSpeaker = require('./MaryTTS.js').MaryTTSSpeaker
if (module.parent == null) {

    var s = new MaryTTSSpeaker();
    s.init()
    s.test2()
}



