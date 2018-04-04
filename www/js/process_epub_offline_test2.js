var sh = require('shelpers').shelpers;
var ProcessEpubOffline = require('./process_epub_offline_test.js')

var i = ProcessEpubOffline.runThing(true)

var quickMode = true;
quickMode = false;
var config = i.config;
config.showDbgBlocks = true;

configClone = sh.clone(config)
//configClone.debugSentencesColoring = true;
//configClone.debugSentencesColoring = false;

configClone.showVoicing = true;
i.init(i.config)

if (quickMode == false) {
    i.config.dbgSentenceWithIndex = true
    i.config.maxSize = null
    //i.config.maxSize = 40000
    i.config.maxSize = 8000*2
    i.loadFile()
    i.convertFile(quickMode)
    i.saveFile()

    var i = ProcessEpubOffline.runThing(true)

    configClone.updateViewer = true;
    // configClone.debugSentencesColoring = true;
    quickMode = true;
    i.config = configClone;
    i.init(i.config)
} else {
    sh.mergeObjects(configClone, config)
    // console.log(config.showDbgBlocks)
    //debugger
    //config.debugSentencesColoring = true;
    config.updateViewer = true;
}

i.convertFile(quickMode)
i.saveFile()