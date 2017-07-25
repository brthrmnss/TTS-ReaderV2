
/*
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var PdfRipCombine = require('./PdfRipCombine.js').PdfRipCombine;

function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.method();
    }

    p.method = function method(config) {
    }
    p.identifyBooks = function identifyBooks() {
        var dirSearch = sh.fs.join(__dirname,  'rips', 'uploads')
        //G:\Dropbox\projects\delegation\Reader\TTS-Reader\www\uploads
        var dirs2 = sh.getFilesInDirectory(dirSearch)//, false, false, true )


        var dirs = self.utils.getDirsInDirectory(dirSearch)



        var dict = {};
        sh.each(dirs, function dirf(k,v) {
            v = sh.slash(v)
            v = v.split('rips/uploads/')[1]
            dict[v] = v
        })


        sh.each(dirs2, function dirf(k,v) {
           // v = sh.slash(v)
          //  v = v.split('rips/uploads/')[1]
            if (v.endsWith('.html') == false) {
                return;
            }
            v = v.split('.pdf')[0] + '.pdf'
            delete dict[v]
            console.log('removing...', v)
        })


        var arr = [] 
        sh.each(dict, function combineToArr(k,v){
            arr.push(v)
        })
        
        self.data.dirs = arr; 
        /*dirs = dirs.filter(function isDirectoryOnName(name) {
            console.log('ok', name)


            return false;
        })*/
        console.log('dirs', dict)
    }
    p.process = function process() {
        sh.async( self.data.dirs, function processDir(dir, fxDone) {
            var t = new PdfRipCombine()
            var options = {}

            options.dirBook = '/uploads/' +
                dir 
                    //[Anja_Schwarz,_Lars_Eckstein_(eds.)]_Postcolonial_(book4you.org).pdf'
            //G:\Dropbox\projects\delegation\Reader\TTS-Reader\rips\uploads\[Anja_Schwarz,_Lars_Eckstein_(eds.)]_Postcolonial_(book4you.org).pdf
            //options.dirBook = '/uploads/[Jane_Hathaway]_El-Hajj_Beshir_Agha(book4you.org).pdf'

            //options.maxPages = 10
            options.oddName = 'asdftest'

            var fixed = sh.replace(dir, '_', ' ')
            fixed = fixed
            fixed = sh.replace(fixed, '(book4you.org)', '')
            fixed = sh.replace(fixed, ' (NXPowerLite Copy)', '')


            if ( fixed.includes('[') && fixed.startsWith('[')) {
                var title = sh.getContentAfter(fixed, ']').trim()
                var auth = sh.getContentBefore(fixed, ']')
                auth = auth.slice(1)
                fixed = [title, 'by', auth].join(' ')
            }

            console.log('fixed', fixed)

           // return
           // asdf.g

            options.fxDone = function fxDone_Cnv(file) {
                console.log('...what', file)
                var file2 = file;
                sh.fs.copy(file, 'rips/export/'+fixed+'.html')
                fxDone()
            }

            t.loadConfig(options);
        })
    }

    p.test = function test(config) {
    }


    p.utils = {};
    p.utils.getDirsInDirectory = function getDirsInDirectory(dirSearch) {
        var fs = require("fs")
        var files = fs.readdirSync(dirSearch);
       // console.log('files', files)
        var listOutput = [];
        sh.each(files, function onTestFile(k,file) {
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

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.BasicClass = BasicClass;



if (module.parent == null || exports.reloadAny) {
    var instance = new BasicClass();
    var config = {};
    instance.init(config)
    instance.test();
    instance.identifyBooks();
    instance.process()
}

//director site:imdb.com/list



//sh.reload.reloadFile(__filename)

console.log('GILR')

//exports.IMDBContentList = IMDBContentList;

