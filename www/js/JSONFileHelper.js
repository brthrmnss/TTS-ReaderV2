var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONFileHelper() {
    var p = JSONFileHelper.prototype;
    p = this;
    var self = this;
    self.data = {}
    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        self.data.file = sh.readJSONFile(self.settings.file, [], true)

        if ( sh.isArray(self.data.file) == false ) {
            console.error('problem reading file', 'reverting:');
            console.error(self.data.file);
            self.data.file = [];
            self.proc('problem with file');
        };

    };

    p.add = function add(data, upsert, propMatch) {
        if ( upsert ) {

            sh.isNull = function isAnyItemNullOrBlankOrEmpty() {
                var args = sh.convertArgumentsToArray(arguments)
                var isNull = false;
                sh.each(args, function isAnyNull(k,v){
                    if  ( v == '' ) {
                        isNull = true
                        return true;
                    }
                    if  ( v == null ) {
                        isNull = true
                        return true;
                    }
                });
                return isNull;
            };
            propMatch = sh.dv(propMatch, 'name');
            var match = null;
            sh.each(self.data.file, function findMatch(k,v) {
                var fromVal = data[propMatch];
                var toVal = v[propMatch];
                if ( sh.isNull(fromVal, toVal )) { return; }
                if ( fromVal == toVal ) {
                    match = v;
                    return false;
                }
            });

            if ( match ){
                if ( self.settings.addToTop != false) { //move to top
                    self.data.file = sh.removeFromArray(self.data.file, match)
                    self.data.file.unshift(match)
                }
                sh.copyProps(data, match)
                
               /* }else {
                    self.data.file.push(match)
                }*/
                self.saveFile()
                return data
            }
        }
        if ( self.settings.addToTop != false) {
            self.data.file.unshift(data)
        } else {
            self.data.file.push(data)
        }
        self.saveFile()
        return data; 
    };

    p.size = function size() {
        return self.data.file.length;
    }

    p.saveFile = function saveFile() {
        sh.writeJSONFile(self.settings.file, self.data.file);
    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.JSONFileHelper = JSONFileHelper;

if (module.parent == null) {
    var instance = new JSONFileHelper();
    var config = {};
    config.file = 'recentFiles2.json'


    sh.writeJSONFile(config.file, [])
    instance.init(config)

    instance.add({name:'b', desc:'3'})
    instance.add({name:'c', desc:'3'},true)
    instance.add({name:'d', desc:'3'})
    instance.add({name:'b', desc:'3'},true)

    sh.assert(instance.size(), 3, 'size did not eq 3', 'upsert is working')

}



