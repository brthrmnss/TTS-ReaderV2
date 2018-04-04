var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
//where is mary?
//C:\Users\morriste\train\train_drive\trash\marytts\marytts-5.1.2\marytts-5.1.2\bin

  TTSAudition = require('./TTSAudition.js').TTSAudition

exports.TTSAudition = TTSAudition;

if (module.parent == null) {

    var s = new TTSAudition();
    s.init()
   /* s.test3({text:'hello, this is  miguel',
        voice:'IVONA 2 Miguel'})*/
    s.test3({text:'Hell-o, this is  miguel, wear are you going - my frend?',
        rate:5,
        pitch:-400,
       // garage:true,
      //  chorus3:null,
        reverblite:true,
        voice:'IVONA 2 Miguel'})
    //s.test2()
}



