/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;


function ListFilesInDirectoryMiddleware() {
    var p = ListFilesInDirectoryMiddleware.prototype;
    p = this;
    var self = this;
    self.data = {}

    p.init = function init(config) {
        self.settings = config;

        var dir = self.settings.dirFiles
        //var files = sh.fs.getFilesInDirectory2(self.settings.dirFiles)
        files = sh.fs.getFilesInDirectory3({
                dir: dir,
                dirsOnly: true,
                sortByTime: true,
                rev: true,
                addPath:true
            }
        );
        console.log('files', files)
        self.data.files = files;
    }
    p.getStr = function getStr() {
        var str = '';
        var html = [];
        sh.each(self.data.files, function addLink(k, file) {
            /* if (!sh.includes(file, '.html')) {
             return;
             }*/
            var fileUrl = file;
            if (self.settings.fxItemUrl) {
                fileUrl = self.settings.fxItemUrl(file, self)
            }
            var fileName = sh.getFilename(file)

            /*
             var fileRaw = file.replace(dirArticles, '');
             var fileUrl = encodeURI(fileRaw)
             fileUrl = '/js/articles/' + fileUrl
             var fileName = sh.getFilename(fileRaw)
             */

            console.log(file, fileUrl)
           str = sh.join(['<a href=', sh.qq(fileUrl), 'target="_blank"', '>', fileName, '</a>', sh.br]);
            html.push(str)
        })

        return html.join(sh.n);
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
    var t = new ListFilesInDirectoryMiddleware()
    var config = {}
    var dirFiles = sh.fs.join(__dirname, 'rips', 'testPages')
    config.dirFiles = dirFiles;
    config.fxItemUrl = function fxItemUrl(input)  {
        var url = sh.str.after(input, 'testPage/')
        var leaf = sh.fs.leaf(url)
        url = `http://127.0.0.1:8080/pdf_book_processor_reload_viewer.html?loadBookFile=testPages/${leaf}/${leaf}_toc.json`
        return url;
    }
    t.init(config)
    var str = t.getStr()
    console.log('str', str)
    //options.port = 7789
    // t.loadConfig(options);
    return;

}


