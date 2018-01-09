var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function FileCountLimiter() {
    var p = FileCountLimiter.prototype;
    p = this;
    var self = this;
    self.data = {}
    self.data.files = [];
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.method = function method(config) {
        sh.fs.mkdirp(self.settings.dirFiles);
        //delete all x
        self.clearDir()
    }
    p.clearDir = function clearDir(fileName) {
        var files = sh.fs.getFilesInDirectory2(self.settings.dirFiles);
        //sh.fs.deleteDir(self.settings.dirFiles);
        sh.each(files, function on(k, v) {
            sh.deleteFile(v)
        })
    }
    p.addFile = function addFile(fileName) {
        self.data.files.push(fileName)
        if (self.data.files.length > self.settings.maxFiles) {
            var top = self.data.files[0]
            self.data.files.shift();
            sh.deleteFile(top)
        }
    }

    p.getLength = function getLength(fileName) {
        var files = sh.fs.getFilesInDirectory2(self.settings.dirFiles);

        self.data.files = files;
        return files.length;
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.FileCountLimiter = FileCountLimiter;

if (module.parent == null) {
    var instance = new FileCountLimiter();
    var config = {};
    config.maxFiles = 3
    config.dirFiles = sh.fs.trash('testFileCountLimiter')
    instance.init(config)
    instance.method();

    sh.each.times(4, function onAddIt(x) {
        function sdf() {
            var file = sh.fs.join(config.dirFiles, 'test.' + Math.random() + '.txt')
            sh.writeFile(file)
            instance.addFile(file)
            console.log('added')
        }

        setTimeout(sdf, x * 1000)
    })

    setTimeout(function isLen() {
        sh.throwIf(instance.data.files.length != 3, 'what is this? ????')
        sh.throwIf(instance.getLength() != 3, 'what is this? ????')
        console.log('still works')
    }, 5000)
    sh.log.file(config.dirFiles)
}



