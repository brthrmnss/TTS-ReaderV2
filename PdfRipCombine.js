/**
 * Created by user1 on 12/30/2016.
 */





/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;

function PdfRipCombine() {
    var p = PdfRipCombine.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.loadConfig = function loadConfig(config) {

        self.settings = config;
        config.port = sh.dv(config.port, 6006)


        var dirRips = __dirname+'/'+'rips/';

        self.data.dir = dirRips;
        // self.runServer();

        self.p2()
    }

    p.p2 = function p2() {

        var dir = self.data.dir  + self.settings.dirBook;
        dir +=  '/';

        var filesInput = sh.fs.getFilesInDirectory2(dir )
        filesInput = filesInput.sort(function onSortNumbers(a,b){
            function c(input) {
                var last = input.split('/').slice(-1)[0]
                last = last.replace('.html', '')
                return parseInt(last)

            }
            a = c(a)
            b = c(b)
            return a - b
        })
        var files = [];
        var foundStartAt = false;
        sh.each(filesInput, function filterFiltes(k,v) {
            if ( v.includes('.html')== false ) return;
            if ( self.settings.startAt != null ) {
                if ( foundStartAt == false ) {
                    if ( v.includes(self.settings.startAt)) {
                        foundStartAt = true;
                    } else {
                        return;
                    }
                }
            }
            if ( self.settings.maxPages ) {
                if (files.length > self.settings.maxPages) return;
            }
            files.push(v)
        })
        console.log('files', files)

        var cheerio = require('cheerio');
        self.settings.oddName = sh.dv(self.settings.oddName, '')
        var fileOutput = dir.slice(0,-1)+'.'+files.length+self.settings.oddName+'.html'
        var contents = ''
        sh.each(files, function combineItems(k,v) {
            var body = sh.readFile(v);
            var $ = cheerio.load(body);
            var d = $('pre').remove()
            var html = $.html();
            contents += html
        })
        sh.writeFile(fileOutput, contents)
        console.log('files', files.length)
        self.proc('start', files[0])
        self.proc('end', files.slice(-1)[0])
        self.proc('out', fileOutput)

        sh.callIfDefined(self.settings.fxDone, fileOutput)
    }

    self.runServer = function runServer() {



    }

    function defineUtils() {
        p.utils = {}
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

module.exports.PdfRipCombine = PdfRipCombine;

if (module.parent == null) {


    var t = new PdfRipCombine()
    var options = {}
    //options.port = 7789

   /* options.startAt = 318;
    options.maxPages = 10*/

    options.dirBook =  '/uploads/Artificial Intelligence for Games, Second Edition.pdf'

    options.dirBook = '/uploads/the_responsive_city_engaging_c.pdf'
    options.dirBook = '/uploads/[Donald_A._Norman]_Living_with_Complexity(BookZZ.org).pdf'

    options.maxPages = 10
    options.oddName = 'asdftest'

    t.loadConfig(options);
    options.fxDone = function fxDone(file) {
        console.log('...what', file)
    }
    return;

}

