var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


var uiUtils = null;
//require('./../ui_utils.js').uiUtils;
//var u = uiUtils;
var ProcessPdfBook = require('./process_pdf_book').ProcessPdfBook;

function ProcessPdfBookJSON() {
    var p = ProcessPdfBookJSON.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.data.files = sh.fs.getFilesInDirectory2(self.settings.dir)
        //self.data.files = sh.sortByNumber(self.data.files)
        //var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        //var myArray = ['1_Document', '11_Document', '2_Document'];
        sh.sortByAlphaNumeric(self.data.files);
        self.data.bookname = sh.fs.leaf(self.settings.dir)
    }
    p.processPages = function processPages(config) {
        var json = {}
        json.name = self.data.bookname;
        json.dir = self.settings.dir;
        json.pages = [];
        var offset = 0;
        sh.each(self.data.files, function proc(k, v) {
            if ( k  < 10) {
              //  return
            }
            if ( self.settings.pageNum) {
                if ( k !== self.settings.pageNum) {
                    return;
                }
            }
            page = {}
            page.fileBase = v;
            if (false == v.endsWith('.html')) {
                return
            }
            page.pageNumber = k + 1

            console.log('---', v)


            var i = new ProcessPdfBook();
            var config = {};
            config.file = v;
            config.fileOutput = sh.fs.filenameAddToSubDir(v, 'output');
            var pageNumberFromFile = sh.str.before(v, '.html')
            var sections = pageNumberFromFile.split('_')//
            // .slice(-1)[0]
            var pageNumberFromFile = sections.slice(-1)[0]
            config.pdfCurrentPage = parseInt(pageNumberFromFile)
            i.init(config)
            i.loadFile()
            i.convertFile()
            i.saveFile()

            page.sentenceLength = i.data.sentenceLength;
            page.offset = offset
            offset += page.sentenceLength
            page.file = config.fileOutput
            page.file = sh.str.after(page.file, 'rips/', '') //.replace('rips/', )

            page.fileJSONSentences = i.data.fileJSONSentences;
            page.fileJSONSentences = sh.str.after(page.fileJSONSentences, 'rips/', '')

            json.pages.push(page)
        })
        if ( self.settings.pageNum) {
            sh.x()
        }
        self.data.bookJson = json;
        // self.data.filesJSON = sh.fs.join(self.settings.dir, self.data.bookname + '_' + 'toc'+'.json')
        // sh.writeJSONFile(self.data.filesJSON, json)
    }

    p.saveFile = function saveFile(config) {
        self.data.filesJSON = sh.fs.join(self.settings.dir, self.data.bookname + '_' + 'toc' + '.json')
        sh.writeJSONFile(self.data.filesJSON, self.data.bookJson)
    }


    p.findRipBooksInDir = function findRipBooksInDir(dirSearch) {
        var dirs2 = sh.getFilesInDirectory(dirSearch)//, false, false, true )
        var dirs = self.utils.getDirsInDirectory(dirSearch)

        var keep = []; // = {};
        sh.each(dirs, function dirf(k, v) {
            v = sh.slash(v)
            var leaf = sh.fs.leaf(v)
            var fileTOC = sh.fs.join(v, leaf + '_toc.json')
            //v = v.split('rips/uploads/')[1]
            if (sh.fs.exists(fileTOC)) {
                console.log('skip,', v, fileTOC)
                return
            }
            keep.push(v)
            //dict[v] = v
        })

        self.data.keepDirs = keep;
        console.log('keep', keep)


        self.processAllRipBookDirs()
    }
    p.processAllRipBookDirs = function processAllRipBookDirs() {
        sh.each(self.data.keepDirs, function processDir(i, k) {//}, fxDone) {
            var i = new ProcessPdfBookJSON();
            var config = {};
            config.dir = k; //'G:/Dropbox/projects/delegation/Reader/TTS-Reader/rips/testPages/builtonwater'
            i.init(config)
            i.processPages();
            i.saveFile()
            //i.findRipBooksInDir('G:/Dropbox/projects/delegation/Reader/TTS-Reader/rips/testPages/')
        })
    }

    function defineUtils() {
        p.utils = {};
        p.utils.getDirsInDirectory = function getDirsInDirectory(dirSearch) {
            var fs = require("fs")
            var files = fs.readdirSync(dirSearch);
            // console.log('files', files)
            var listOutput = [];
            sh.each(files, function onTestFile(k, file) {
                //if (!files.hasOwnProperty(i)) continue;
                var name = dirSearch + '/' + file;
                //filesWithDir.push(name);

                //asdf.g
                if (fs.statSync(name).isDirectory()) {
                    // if (recurse == true)
                    //     getFiles(name); //will not work

//asdf.g
                    listOutput.push(name)

                } else {
                    return
                    if (showNames) {
                        console.log(name)
                    }
                }
                // } catch (e) {
                // }
            })

            return listOutput
        }
    }

    defineUtils();

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ProcessPdfBookJSON = ProcessPdfBookJSON;

if (module.parent == null) {
    var i = new ProcessPdfBookJSON();
    doEntiredDir  = true;
    if (doEntiredDir == false) {
        var config = {};
        //
        //
        //
        // config.pageNum = 173
        config.dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/rips/testPages/BUILT ON WATER LISA BAKER 276P (NXPowerLite Copy).pdf'
        i.init(config)
        i.processPages();

        i.saveFile()
    } else {
        i.findRipBooksInDir('G:/Dropbox/projects/delegation/Reader/TTS-Reader/rips/testPages/')
    }
    // i.findRipBooksInDir('G:/Dropbox/projects/delegation/Reader/TTS-Reader/rips/testPages/')
    // i.loadFile()
    //i.convertFile()
    // i.saveFile()
}