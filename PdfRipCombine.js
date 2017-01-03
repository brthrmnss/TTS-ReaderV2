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

        var dir = self.data.dir  + '/uploads/Artificial Intelligence for Games, Second Edition.pdf'
        dir +=  '/';

        var filesInput = sh.fs.getFilesInDirectory2(dir )
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
            if ( files.length > 10 ) return;
            files.push(v)
        })
        console.log('files', files)


        var fileOutput = dir.slice(0,-1)+'.html'
        var contents = ''
        sh.each(files, function combineItems(k,v) {
            contents += sh.readFile(v);
        })
        sh.writeFile(fileOutput, contents)
        console.log('files', files.length)
        self.proc('start', files[0])
        self.proc('end', files.slice(-1)[0])
        self.proc('out', fileOutput)
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

if (module.parent == null) {


    var t = new PdfRipCombine()
    var options = {}
    //options.port = 7789

    options.startAt = 318;
    t.loadConfig(options);
    return;

}

