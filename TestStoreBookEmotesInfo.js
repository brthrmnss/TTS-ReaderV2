/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;


function TestStoreBookEmotesInfo() {
    var p = TestStoreBookEmotesInfo.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = config;
    }
    p.storeRake = function storeRake(rake1, cleanFile) {
        var fs = require('fs');
        if (rake1.book_name) {
            var book_dir = rake1.book_name.split('/')[0]
            var dirEpub = sh.fs.join(__dirname, 'uploads/extracted/', book_dir)
            console.log('file', dirEpub)
            var file = sh.fs.join(dirEpub, 'e_flows.txt')
            sh.log.file(file)
            self.data.fileRake = file;
        }
        if (cleanFile) {
            sh.writeFile(self.data.fileRake, '')
        }
        rake1.date = new Date()
        var txt = sh.n + JSON.stringify(rake1)
        fs.appendFileSync(self.data.fileRake, txt);
    }
    p.flattenEmotesFile = function flattenEmotesFile(rake1, cleanFile) {
        var dirFile = self.utils.getDirOfFile(rake1)

        var contents = sh.fs.readFile(self.data.fileRake)
        var yyy = contents.split(sh.n)
        var flowJSON = {};
        sh.each(yyy, function proc(k, j) {
            if (j.trim() == '') {
                return
            }
            console.log('j', j)
            var json = JSON.parse(j)
            var arr = flowJSON[json.sentence_index]
            arr = sh.dv(arr, [])

            var template = sh.clone(json)
            delete template.sentence_index;
            delete template.book_name;
            delete template.tags;
            //var clone = sh.clone(template)

            json.tags = sh.dv(json.tags, ['untagged'])
            sh.each(json.tags, function onEachTag(i, tag) {
                var clone = sh.clone(template)
                clone.tag = tag;
                arr.push(clone)
            })
            flowJSON[json.sentence_index] = arr;
        })

        sh.log.file(self.data.fileFlowJSON)
        sh.fs.writeJSONFile(self.data.fileFlowJSON, flowJSON)
    }

    function defineUtils() {
        p.utils = {}
        p.utils.getDirOfFile = function getDirOfFile(dirname) {
            if (dirname.book_name) {
                dirname = dirname.book_name
            }
            var book_dir = dirname.split('/')[0]
            var dirEpub = sh.fs.join(__dirname, 'uploads/extracted/', book_dir)
            console.log('file', dirEpub)
            self.data.dirFile = dirEpub
            self.data.fileFlowJSON = sh.fs.join(dirEpub, 'e_flows.json')
            var file = sh.fs.join(dirEpub, 'e_flows.txt')
            sh.log.file(file)
            self.data.fileRake = file;

            return self.data.fileRake;
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

TestStoreBookEmotesInfo.storeRake = function storeRake(rake1, cleanFile) {
    var t = new TestStoreBookEmotesInfo()
    var config = {}
    //config.book =
    t.init(config)
    t.storeRake(rake1, cleanFile)
    //t.saveFile
}
TestStoreBookEmotesInfo.flattenEmotesFile = function flattenEmotesFile(rake1) {
    var t = new TestStoreBookEmotesInfo()
    var config = {}
    //config.book =
    t.init(config)
    t.flattenEmotesFile(rake1)
    //t.saveFile
}


exports.TestStoreBookEmotesInfo = TestStoreBookEmotesInfo;
if (module.parent == null) {

    var startingVal = {}

    /*    var set2 = 'caster oil.[1]'
     TestEvalRemoteJSONPos.setVal(set2, {test: 'name', obj: 'frame'})
     var set2 = 'aaa.bbb.ccc'
     TestEvalRemoteJSONPos.setVal(set2, 5)
     var set2 = 'caster oil.[0]'
     TestEvalRemoteJSONPos.setVal(set2, 'yyyy')*/

    var rake1 = {
        "tags": ["zzz", "slightly-frowning-face"],
        "notes": "dfgdfg dfg",
        "sentence_index": "7",
        "book_name": "Wilde_Oscar_The_Picture_Of_Do  Unknownepub/epub_offline.html"
    }
    TestStoreBookEmotesInfo.storeRake(rake1, true)

    rake1 = {
        "tags": ["zzz", "tired"],
        "notes": "dfgdfg dfg",
        "sentence_index": 16,
        "book_name": "Wilde_Oscar_The_Picture_Of_Do  Unknownepub/epub_offline.html"
    }
    TestStoreBookEmotesInfo.storeRake(rake1)
    rake1.notes = "version 2"
    TestStoreBookEmotesInfo.storeRake(rake1)
    rake1 = {
        "tags": ["sounds"],
        "notes": "laughter.mp3",
        "sentence_index": 89,
        "book_name": "Wilde_Oscar_The_Picture_Of_Do  Unknownepub/epub_offline.html"
    }
    TestStoreBookEmotesInfo.storeRake(rake1)


    TestStoreBookEmotesInfo.flattenEmotesFile(rake1)

    //TestEvalRemoteJSONPos.setVal(set2, 'http://www.yahoo.com')
    var t = new TestStoreBookEmotesInfo()
    var options = {}
    //options.port = 7789
    // t.loadConfig(options);
    return;

}


