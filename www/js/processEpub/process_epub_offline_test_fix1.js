var sh = require('shelpers').shelpers;
var ProcessEpubOffline = require('./../process_epub_offline_test.js')

var i = ProcessEpubOffline.runThing(true)

var quickMode = true;
quickMode = false;
var config = i.config;
config.showDbgBlocks = true;

configClone = sh.clone(config)
//configClone.debugSentencesColoring = true;
//configClone.debugSentencesColoring = false;
i.config.file = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Crazy Rich Asians  Kevin Kwanepub/OEBPS/Kwan_9780385536981_epub_c01_r1.htm'
//configClone.showVoicing = true;
i.config.ignoreJSONEpubErrors = true
i.init(i.config)
i.config.dbgSentenceWithIndex = true
i.config.maxSize = null

//i.config.maxSize = 40000
//i.config.maxSize = 8000*2
i.loadFile()
i.convertFile(quickMode)
i.saveFile()

/*

i.convertFile(quickMode)
i.saveFile()*/
