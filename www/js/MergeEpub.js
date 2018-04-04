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

    self.returnPreviousResult = function returnPreviousResult() {
        if (self.settings.force) {
            return false;
        }
        return false;
    }

    self.go = function go() {

        function stopProcessing_returnPreviousResult() {
            if (self.settings.force) {
                return false;
            }
            self.done()
            return true;
        }


        self.fileOutput = self.settings.dir + '/' + 'epub.html';
        if (sh.fileExists(self.fileOutput)) {
            if (stopProcessing_returnPreviousResult()) return;
        } else {
            self.fileOutput = self.settings.dir + '/' + 'OEBPS/' + 'epub.html';
            if (sh.fileExists(self.fileOutput)) {
                if (stopProcessing_returnPreviousResult()) return;
            }
        }

        //asdf.g


        // var dir = 'C:/trash/epub/HBR\'s 10 Must Reads on Leadersh - Harvard Business Review'
        dir = self.settings.dir;
        var fileToc = dir + '/' + 'toc.ncx'
        self.data.fileTOC = fileToc
        self.data.fileJSONToc = dir + '/' + 'toc.json'
        var origDir = self.settings.dir


        fileToc = self.utils.getToc(fileToc, self.settings.dir)

        if (fileToc == null) {
            console.error('cannot find toc')
            return;
        }


        self.fileOutput = self.settings.dir + '/' + 'epub.html'; //rewrite

        var dir2 = '';
        //after fileOutput set, set working dir
        if (sh.fileExists(fileToc)) {
            var dirs = fileToc.split('/').slice(0, -1)
            var dir2 = dirs.join('/') + '/'
            dir2 = dir2.split('/extracted/')[1]
            dir2 = dir2.split('/').slice(1).join('/')
            //dir2 = dir2.replace(__dirname.split('\\').join('/'), '')
            self.data.dirOEBPS = dir2;
            //self.settings.dir = dir;
        }

        var parser = new xml2js.Parser();
        var data = fs.readFileSync(fileToc) //, function(err, data) {
        data = data.toString();
        data = sh.replace(data, 'ncx:', '')
        self.proc('reading toc', fileToc)
        parser.parseString(data, function onReadToc(err, result) {
            // console.dir(result);
            var navPointItems = result.ncx.navMap[0].navPoint;
            var files = []
            var navPoints = []

            function getNavTitle(sdf){
                var title = '';
                title = result.ncx.docTitle[0].text[0]
                return title;
            }
            var title = getNavTitle()
            function getContentForNavPoint(v) {
                var fileSrc = v.content[0].$.src;
                fileSrc = /*dir2 + */fileSrc.split('#')[0];
                return  fileSrc
            }
            function getTextForNavPoint(v) {
                var navLabel = v.navLabel[0].text[0];
                return  navLabel
            }
            function createNavPoint(v, parentNav) {
                var nav = {};
                nav.title = getTextForNavPoint(v);
                nav.file = getContentForNavPoint(v);

                nav.children = [];
                if ( parentNav == null) {
                    navPoints.push(nav)
                } else {
                    parentNav.children.push(nav)
                }
                return nav;
            }

            //  if ( result.ncx.navMap.length > 1 ){
            //  sh.each( result.ncx.navMap, function onAddEachFile(k,navMapSlice) {
            //    var x = navMapSlice.navPoint;
            sh.each(navPointItems, function onAddEachFile(k, v) {
                var fileSrc = v.content[0].$.src;

                fileSrc = dir2 + fileSrc.split('#')[0];

                self.proc(sh.toJSONString(v.content[0]))
                if (files.indexOf(fileSrc) != -1) {
                    return; //skip included
                }
                files.push(fileSrc)
                var l1_NavPoint = createNavPoint(v)

                v.navPoint = sh.dv(v.navPoint, [])
                sh.each(v.navPoint, function onAddEachFile(k, v) {
                    var fileSrc = v.content[0].$.src;

                    fileSrc = dir2 + fileSrc.split('#')[0];

                    self.proc(sh.toJSONString(v.content[0]))
                    if (files.indexOf(fileSrc) != -1) {
                        return; //skip included
                    }
                    files.push(fileSrc)
                    var l2_NavPoint = createNavPoint(v, l1_NavPoint)
                    if (v.navPoint) {
                        sh.each(v.navPoint, function onAddEachFile_inner(k, v) {
                            var fileSrc = v.content[0].$.src;

                            fileSrc = dir2 + fileSrc.split('#')[0];

                            self.proc('inner nav', sh.toJSONString(v.content[0]))
                            if (files.indexOf(fileSrc) != -1) {
                                return; //skip included
                            }
                            //https://youtu.be/jmoRkepTHsg?t=36s
                            files.push(fileSrc)
                            var l3_NavPoint = createNavPoint(v, l2_NavPoint)
                        })

                    }


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

            var navPointsConverted = navPoints;
            sh.tree.all(navPointsConverted, function ok(node){
                if ( node.children.length == 0 ) {
                    delete node.children;
                }
            })

            var flat = sh.tree.flat(navPointsConverted)
            flat = sh.clone(flat)
            sh.tree.all(flat, function ok(node){
                delete node.children
                node.file = sh.fs.slash(node.file)

            })
            console.log(sh.toJSONString(navPointsConverted))

            var jsonTOC = {}
            jsonTOC.title = title;
            jsonTOC.navPoints = navPointsConverted
            jsonTOC.flat = flat

            sh.fs.writeJSONFile(self.data.fileJSONToc, jsonTOC)

            sh.fs.log(self.data.fileJSONToc, 'store json file:')
            console.dir('navPointItems', navPointItems);
            console.log('found', files.length, 'files')
            console.log('Done');
            sh.toJSONString(files, true)


            self.data.files = files;

            if ( self.settings.stopAfterTOC) {
           //     console.log('files', files)
                console.log('stopAfterTOC')
                return
            }
            self.mergeFiles();
            // sh.toJSONString(x, true)
        });


    }


    self.mergeFiles = function mergeFiles(options) {
        var dir = self.settings.dir;

        var fileOutput = dir + '/' + 'epub.html';
        var dirOEBPS = dir + '/' + 'OEBPS/'
        if (self.data.dirOEBPS) {
            dirOEBPS = self.data.dirOEBPS;
        }

        var contents = '';
        var validParts = [];
        sh.each(self.data.files, function onAddEachFile(k, v) {

            //if TOC was in a subdir
            var leaf = sh.fs.leaf(dir)
            if (dir.endsWith(leaf) && v.startsWith(leaf)) {
                var vOrig = v;
                v = v.replace(leaf, '')//asdf.g
            }


            var filePart = dir + '/' + v;

            //replace toc.ncx nav map
            if (sh.fileExists(dirOEBPS) && sh.fileExists(filePart) == false) {
                dir = dirOEBPS;   //case toc.ncx is in subdir, but files are in OEBS
            }

            var isHTMLLike = self.utils.isHTMLFile(filePart);
            filePart = filePart;
            if (isHTMLLike == false) return;

            if (sh.fs.exists(filePart) == false) {
                console.error('cannot find file', filePart)
            }

            try {

                contents += sh.readFile(filePart)
                validParts.push(filePart)
            } catch (e) {
                console.error('where is:', filePart)
                console.error(e)
                contents += 'MergeEpub error ... file not found ' + filePart
            }
        })

        var contentsTocBased = contents;


        //by default get all text in all of book in order ...
        var dirText = dir + '/'


        var dirOEBPS = dir + '/' + 'OEBPS/'
        if (sh.fileExists(dirOEBPS)) {
            dirText = dirOEBPS;   //case toc.ncx is in subdir, but files are in OEBS
        }

        var validPardsWildCard = [];
        var files = sh.fs.getFilesInDirectory2(dirText, false, false)
        self.proc('text mode grabbing all files ...')
        var contents = '';

        sh.each(files, function onAddEachFile(k, v) {
            var filePart = v
            var isHTMLLike = self.utils.isHTMLFile(filePart);
            if (isHTMLLike == false) return;

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

        if (validParts.length > validPardsWildCard.length) {
            self.proc('reverting to regular type')
            contents = contentsTocBased;
        }

        if ( contents.includes('<title/>')) {
            contents = sh.replace(contents, '<title/>', '')
        }

        self.data.contents = contents;
        sh.writeFile(fileOutput, contents)
        // self.mergeFiles();
        self.done()
    }


    self.done = function done(options) {
        if ( self.data.contents )
        self.proc('contents size', self.data.contents.length, 'chars')
        sh.callIfDefined(self.settings.fxDone, self.fileOutput)
    }


    function defineUtils() {
        p.utils = {}
        p.utils.isHTMLFile = function isHTMLFile(filePart) {
            if ( filePart.endsWith('.xml')) {
                return true;
            }
            if (!sh.includes(filePart, '.html') && !sh.includes(filePart, '.xhtml') && !sh.includes(filePart, '.htm')) {
                return false;
            }
            return true;
        }

        p.utils.getToc = function getToc(fileToc, dirx) {
            if (sh.fileExists(fileToc)) {
                return fileToc
            }
            var dir = self.settings.dir;
            var dirToSearch = null;

            var dirOEBPS = dir + '/' + 'OEBPS/'
            if (sh.fileExists(dirOEBPS)) {
                fileToc = dirOEBPS + 'toc.ncx';   //case toc.ncx is in subdir, but files are in OEBS
                dirToSearch = dirOEBPS
            }
            var dirOPS = dir + '/' + 'ops/'
            if (sh.fileExists(dirOPS)) {
                fileToc = dirOPS + 'toc.ncx';   //case toc.ncx is in subdir, but files are in OEBS
                dirToSearch = dirOPS
            }
            if (sh.fileExists(fileToc)) {
                return fileToc
            }

            if (dirToSearch) {
                //   asdf.g
                var files = sh.fs.getFilesInDirectory2(dirToSearch, false, false);
                sh.each(files, function (k, fileTocPotentially) {
                    if (sh.includes(fileTocPotentially, '.ncx')) {
                        fileToc = fileTocPotentially
                    }
                });

                if (sh.fileExists(fileToc)) {
                    return fileToc
                }
            }

            var files = sh.fs.getFilesInDirectory2(dir, false, false);
            sh.each(files, function (k, fileTocPotentially) {
                if (sh.includes(fileTocPotentially, '.ncx')) {
                    fileToc = fileTocPotentially
                }
                var dir = fileTocPotentially
                if ( sh.isDirectory(dir)) {
                    fileTocPotentially = dir+'/toc.ncx'
                    if (sh.fs.exists(fileTocPotentially) ) {
                        fileToc = fileTocPotentially
                    }
                }
            });
            if (sh.fileExists(fileToc)) {
                return fileToc
            }

            self.proc('failed finding toc (.ncx file) ...')

            return null
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
    // dir = 'g:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Blender For Dummiesr  Adam Fowlerepub'
    //dir = 'g:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/The Power of Now  Tolle_ Eckhartepub'


    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/The Age of the Unthinkable_ Why  Joshua Cooper Ramoepub'
    options.dir = dir;

    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Profit Over People_ Neoliberali  Noam Chomskyepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Medical Herbalism  David Hoffmann FNIMH AHGepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Tokyo Fashion City  Philomena Keetepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/The Power of Presence  Kristi Hedgesepub'
    dir = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Babylonjs Essentials  Unknownepub'

    var dirExtracted = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/';
    var dirLeaf = '150 Best Mini Interior Ideas  Francesc Zamoraepub'
    dirLeaf = 'Loveem or Loseemepub'
    dirLeaf = 'Robert_Earl_Fleury_The_small_business_survival_gbook4youorgepub'
    dirLeaf = 'Antianxiety Food Solution  Trudy Scottepub'
    dirLeaf = 'The Black Jacobins  C L R Jamesepub'
    dirLeaf = 'Crazy Rich Asians  Kevin Kwanepub'
    dir = dirExtracted + '/' + dirLeaf

    options.dir = dir;


    options.fxDone = function done() {
        console.log('finished')
    }
    options.force = true;
    options.stopAfterTOC = true;
    go.init(options);
    go.go()
    return;

}


exports.MergeEpub = MergeEpub;