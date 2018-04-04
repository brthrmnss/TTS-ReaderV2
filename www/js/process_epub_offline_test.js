var ProcessEpubOffline = require('./process_epub_offline.js').ProcessEpubOffline

var sh = require('shelpers').shelpers


function runThing(returnX) {
    // UPLOAD FILE
    ProcessEpubOffline()


    function bookDir(dir) {
        file = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/'
        return file + dir + '/epub.html';
    }

    file = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/The Wealth of Knowledge_ Intell  Thomas A Stewartepub'
    file = bookDir('The Wealth of Knowledge_ Intell  Thomas A Stewartepub')
    file = bookDir('Wilde_Oscar_The_Picture_Of_Do  Unknownepub')
    file = bookDir('Crazy Rich Asians  Kevin Kwanepub')

    //sh.file.log(file, 'starting with')
    console.log('file', file)
    var i = new ProcessEpubOffline();
    var config = {};
    config.file = file
    config.maxSize = null
    config.maxSize = 2000
    config.updateViewer =  true;
    i.config = config;
    if (returnX) {
        return i;
    }

    i.init(config)
    var quickMode = true;
//quickMode = false;
    if (quickMode == false) {
        i.loadFile()
    } else {

    }

    i.convertFile(quickMode)
    i.saveFile()
}

exports.runThing = runThing;
if (module.parent == null) {

    runThing()
}