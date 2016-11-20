var fs = require('fs'),
    xml2js = require('xml2js');
var sh = require('shelpers').shelpers;
/*

 var dir = 'C:/trash/epub/HBR\'s 10 Must Reads on Leadersh - Harvard Business Review'
 var fileToc = dir + '/' + 'toc.ncx'

 var parser = new xml2js.Parser();
 var data = fs.readFileSync(fileToc ) //, function(err, data) {
 parser.parseString(data, function (err, result) {
 // console.dir(result);
 var x = result.ncx.navMap[0].navPoint;
 var files = []
 sh.each(x, function onAddEachFile(k,v) {
 files.push(v.content[0].$.src)
 })
 console.dir(x);
 console.log(files)
 console.log('Done');
 sh.toJSONString(files, true)
 // sh.toJSONString(x, true)
 });


 */


/**
 * Created by user1 on 2/7/14.
 *
 *
 * 1 find content on piratebay
 * 2 download content via put.io to blasdf
 * 3 iterate over content, add rotten tomato information
 * 4 add new content to db
 *
 * insight:  seperate rotten as a later step
 * get content first
 */

/**
 *
 */
var sh = require('shelpers').shelpers;
var fs = require("fs");
var async = require('async');
var mkdirp = require("mkdirp");

/*
 Goal is to extract file
 to dir
 so 5thelement.zip
 to dirExtract+/5thElement/....

 */
function MergeEpub() {

    var p = MergeEpub.prototype;
    p = this;
    var self = this;

    self.data = {};

    self.init = function init(options) {

        self.settings = options;


    }

    self.returnPreviousResult =   function returnPreviousResult() {
        if (  self.settings.force ) {
            return false;
        }
        return false;
    }

    self.go = function go() {

        function stopProcessing_returnPreviousResult() {
            if (  self.settings.force ) {
                return false;
            }
            self.done()
            return true;
        }


        self.fileOutput = self.settings.dir + '/' + 'epub.html';
        if (sh.fileExists(self.fileOutput)) {
            if ( stopProcessing_returnPreviousResult() ) return;
        } else {
            self.fileOutput = self.settings.dir + '/' + 'OEBPS/' + 'epub.html';
            if (sh.fileExists(self.fileOutput)) {
                if ( stopProcessing_returnPreviousResult() ) return;
            }
        }

        //asdf.g


        // var dir = 'C:/trash/epub/HBR\'s 10 Must Reads on Leadersh - Harvard Business Review'
        dir = self.settings.dir;
        var fileToc = dir + '/' + 'toc.ncx'
        var origDir = self.settings.dir



        fileToc = self.utils.getToc(fileToc,  self.settings.dir)

        if (sh.fileExists(fileToc) == false ) {
            dir = origDir + '/' + 'OEBPS/'
            var fileToc = dir + '/' + 'toc.ncx'
            self.settings.dir = dir;
        }



        if (sh.fileExists(fileToc) == false) {
            //asdf.g
            dir = origDir + '/' + 'OPS/'
            self.settings.dir = dir;
            var fileToc = dir + '/' + 'toc.ncx'
        }

        self.fileOutput = self.settings.dir + '/' + 'epub.html'; //rewrite

        var parser = new xml2js.Parser();
        var data = fs.readFileSync(fileToc) //, function(err, data) {
        parser.parseString(data, function (err, result) {
            // console.dir(result);
            var x = result.ncx.navMap[0].navPoint;
            var files = []


            //  if ( result.ncx.navMap.length > 1 ){
            //  sh.each( result.ncx.navMap, function onAddEachFile(k,navMapSlice) {
            //    var x = navMapSlice.navPoint;
            sh.each(x, function onAddEachFile(k, v) {
                var fileSrc = v.content[0].$.src;

                fileSrc = fileSrc.split('#')[0];

                self.proc(sh.toJSONString(v.content[0]))
                if (files.indexOf(fileSrc) != -1) {
                    return; //skip included
                }
                files.push(fileSrc)

                v.navPoint = sh.dv(v.navPoint, [])
                sh.each(v.navPoint, function onAddEachFile(k, v) {
                    var fileSrc = v.content[0].$.src;

                    fileSrc = fileSrc.split('#')[0];

                    self.proc(sh.toJSONString(v.content[0]))
                    if (files.indexOf(fileSrc) != -1) {
                        return; //skip included
                    }
                    files.push(fileSrc)
                })


            })
            //       })
            //    }

            /* sh.each(x, function onAddEachFile(k,v) {
             var fileSrc = v.content[0].$.src;

             fileSrc = fileSrc.split('#')[0];

             if ( files.indexOf(fileSrc) != -1 ) {
             return; //skip included
             }
             files.push(fileSrc)
             })*/

            console.dir(x);
            console.log(files)
            console.log('Done');
            sh.toJSONString(files, true)


            self.data.files = files;
            self.mergeFiles();
            // sh.toJSONString(x, true)
        });


    }


    self.mergeFiles = function mergeFiles(options) {
        var dir = self.settings.dir;

        var fileOutput = dir + '/' + 'epub.html';
        var dirOEBPS = dir+'/'+'OEBPS/'


        var contents = '';
        var validParts = [];
        sh.each(self.data.files, function onAddEachFile(k, v) {
            var filePart = dir + '/' + v
            //replace toc.ncx nav map
            if ( sh.fileExists(dirOEBPS) && sh.fileExists(filePart) == false) {
                dir = dirOEBPS;   //case toc.ncx is in subdir, but files are in OEBS
            }


            var isHTMLLike = self.utils.isHTMLFile(filePart);
            filePart = filePart;
            if ( isHTMLLike == false ) return;
            try {
                contents += sh.readFile(filePart)
                validParts.push(filePart)
            } catch (e) {
                contents += 'MergeEpub error ... file not found ' + filePart
            }
        })

        var contentsTocBased = contents;


        //by default get all text in all of book in order ...
        var dirText = dir + '/'


        var dirOEBPS = dir+'/'+'OEBPS/'
        if ( sh.fileExists(dirOEBPS)) {
            dirText = dirOEBPS;   //case toc.ncx is in subdir, but files are in OEBS
        }

        var validPardsWildCard = [];
        var files = sh.fs.getFilesInDirectory2(dirText, false, false)
        self.proc('text mode grabbing all files ...')
        var contents = '';

        sh.each(files, function onAddEachFile(k, v) {
            var filePart = v
            var isHTMLLike = self.utils.isHTMLFile(filePart);
            if ( isHTMLLike == false ) return;

            validPardsWildCard.push(v); //++
            try {
                contents += sh.readFile(filePart)
            } catch (e) {
                contents += 'MergeEpub error ... file not found ' + filePart
            }
        })

        //why: combine all html files in a folder ...
        var dirText = dir + '/' + 'text/'
        var isBookThatHasHTMLDumpedInTextSubDir = sh.fileExists(dirText);
        if (isBookThatHasHTMLDumpedInTextSubDir) { //sh.includes(dir, '/text/')) {
            var files = sh.fs.getFilesInDirectory2(dirText, false, false)
            self.proc('text mode grabbing all files ...')
            var contents = '';
            validPardsWildCard = [];

            sh.each(files, function onAddEachFile(k, v) {
                var filePart = v
                try {
                    contents += sh.readFile(filePart)
                    validPardsWildCard.push(v); //++
                } catch (e) {
                    contents += 'MergeEpub error ... file not found ' + filePart
                }
            })
        }

        if ( validParts.length > validPardsWildCard.length ) {
            self.proc('reverting to regular type')
            contents = contentsTocBased;
        }

        sh.writeFile(fileOutput, contents)
        // self.mergeFiles();
        self.done()
    }


    self.done = function done(options) {
        sh.callIfDefined(self.settings.fxDone, self.fileOutput)
    }


    function defineUtils() {
        p.utils = {}
        p.utils.isHTMLFile = function isHTMLFile(filePart) {
            if (!sh.includes(filePart, '.html') && !sh.includes(filePart, '.xhtml') &&
                !sh.includes(filePart, '.htm')) {
                return false;
            }
            return true;
        }

        p.utils.getToc = function getToc(fileToc, dirx) {
            if ( sh.fileExists(fileToc)) {
                return fileToc
            }
            var dir = self.settings.dir;
            var dirOEBPS = dir+'/'+'OEBPS/'
            if ( sh.fileExists(dirOEBPS)) {
                fileToc = dirOEBPS+'toc.ncx';   //case toc.ncx is in subdir, but files are in OEBS
            }
            if ( sh.fileExists(fileToc)) {
                return fileToc
            }


            var files = sh.fs.getFilesInDirectory2(dirOEBPS, false, false);
            sh.each(files, function (k,fileTocPotentially) {
                if ( sh.includes(fileTocPotentially, '.ncx')) {
                    fileToc = fileTocPotentially
                }
            });

            if ( sh.fileExists(fileToc)) {
                return fileToc
            }

            var files = sh.fs.getFilesInDirectory2(dir, false, false);
            sh.each(files, function (k,fileTocPotentially) {
                if ( sh.includes(fileTocPotentially, '.ncx')) {
                    fileToc = fileTocPotentially
                }
            });
            if ( sh.fileExists(fileToc)) {
                return fileToc
            }

            self.proc('failed finding toc (.ncx file) ...')

            return fileToc
        }
    }

    defineUtils();
    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

if (module.parent == null) {

    var options = {}
    options.callback = function onDone(dirExtract, token) {
        console.log('done', dirExtract)
    }
    options.dirExtract = 'dirExtractionTarget'
    options.fileToExtract = '/home/user/trash/downloads/Wiz Khalifa - No Sleep.mp3.zip'
    var go = new MergeEpub()
    var dir = 'C:/trash/epub/HBR\'s 10 Must Reads on Leadersh - Harvard Business Review'
    // dir = 'g:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/Blender For Dummiesr  Adam Fowlerepub'
    //dir = 'g:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/The Power of Now  Tolle_ Eckhartepub'


    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/The Age of the Unthinkable_ Why  Joshua Cooper Ramoepub'
    options.dir = dir;

    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/Profit Over People_ Neoliberali  Noam Chomskyepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/Medical Herbalism  David Hoffmann FNIMH AHGepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/www/uploads/extracted/Tokyo Fashion City  Philomena Keetepub'
    options.dir = dir;



    options.fxDone = function done() {
        console.log('finished')
    }
    options.force = true;
    go.init(options);
    go.go()
    return;

}


exports.MergeEpub = MergeEpub;