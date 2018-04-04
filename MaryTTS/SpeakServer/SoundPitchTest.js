var SoundPitcher = require('./SoundPitch.js').SoundPitcher;

if (module.parent == null) {
    var s = new SoundPitcher();
    s.init()
    s.sound("C:/Users/user1/trash/sayServerLite/sound54.wav")
// s.pitch(-400)
//s.speed(0.8)
// s.vol(3.2)
// s.tremolo(1.5)
// s.drunkenloudspeaker2(0.1*100)
//s.panLeft()
    s.panR()
    s.highpass()
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
  // s.data = {};
    var config = {
        reverblite:true,
        highpass:true,
    }
    s.init();
    s.setupData();
    s.activeSoundConfig(config);
    /* s.chorus(3.2)
     s.echo(3.2)*/
    s.convertAsync(function onDone(kfile) {
        console.log('kfile', kfile)

        s.play(kfile)
    })
    //s.convert()
    //s.play()
}