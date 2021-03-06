var inBrowser = false;
if ( typeof window == 'undefined') {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
}
else {
    inBrowser = true;
    var sh = {}
    sh.sLog = function sLog(a,b,c) {
        console.log(a,b,c)
    }

    sh.readJSONFile = function readJSONFile(key) {
        var val = localStorage.getItem(key)
        var json = JSON.parse(val);
        return json;
    }

    sh.writeJSONFile = function writeJSONFile(key, val) {
        var json = JSON.stringify(val)
        localStorage.setItem(key, json)
        return json
    }


    sh.dv = function defaultValue(input, ifNullUse) {
        if (input == null) {
            return ifNullUse
        }
        return input;
    }


    sh.isArray =  function isArray(itemOrArray) {
        return (itemOrArray instanceof Array)
    }

    sh.each = $.each;


    sh.isNull = function isNull(val) {
        if ( val == null ) {
            return true
        }

        return false;
    }


    sh.isNull = function isNull(val) {
        if ( val == null ) {
            return true
        }

        return false;
    }

    sh.removeFromArray =
        function removeFromArray(array, value, clone ) {
            var index = array.indexOf(value)
            if ( index == -1 )
                return array;

            array.splice(index, 1);
            return array;
        }

    sh.removeFromArray =
        function removeFromArray(array, value, clone ) {
            var index = array.indexOf(value)
            if ( index == -1 )
                return array;

            array.splice(index, 1);
            return array;
        }


    sh.copyProps = function copyProps(from, to) {
        sh.each(from, function(k,v){
            to[k]=v;
        })
    };


    sh.assert = function assert(val, val2, error) {
        if (val != val2) {
            throw new Error([val, '!=', val2, error].join(', '))
        }
    }

}
function JSONFileHelper() {
    var p = JSONFileHelper.prototype;
    p = this;
    var self = this;
    self.data = {}
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.propUpsert =
            sh.dv(self.settings.propUpsert, 'name');
        self.settings.addToTop =
            sh.dv(self.settings.addToTop, true);
        self.readFile();
    };

    p.addRecent = function addRecent(data, upsert, propMatch) {
        if ( upsert ) {
            propMatch = sh.dv(propMatch, self.settings.propUpsert);
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

    p.add = p.addRecent

    p.upsertRecent = function upsertRecent(data) {
        self.addRecent(data, true)
    }


    p.removeRecent = function removeRecent(data, propMatch) {
        propMatch = sh.dv(propMatch, self.settings.propUpsert);
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
            self.data.file = sh.removeFromArray(self.data.file, match)
            sh.copyProps(data, match)


            self.proc('item removed')
            /* }else {
             self.data.file.push(match)
             }*/
            self.saveFile()
            return data
        }

        self.proc('item not found', data)

        return data;
    };

    p.clearRecentList = function clearRecentList() {
        self.data.file = [];
        self.saveFile();
    }

    p.size = function size() {
        return self.data.file.length;
    }

    p.saveFile = function saveFile() {
        sh.writeJSONFile(self.settings.file, self.data.file);
        if ( self.settings.fxSave ) self.settings.fxSave();
    }

    p.readFile = function readFile() {
        self.data.file = sh.readJSONFile(self.settings.file, [], true)

        if ( sh.isArray(self.data.file) == false ) {
            console.error('problem reading file', 'reverting:');
            console.error(self.data.file);
            self.data.file = [];
            self.proc('problem with file');
        };

        return self.data.file;
    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

if ( inBrowser == false ) {
    exports.JSONFileHelper = JSONFileHelper;
}
if (inBrowser || module.parent == null) {
    var instance = new JSONFileHelper();
    var config = {};
    config.file = 'recentFiles2.json';
    config.propUpsert = 'name';

    sh.writeJSONFile(config.file, []);
    instance.init(config);


    instance.add({name: 'b', desc: '3'});
    instance.add({name: 'c', desc: '3'}, true);
    //instance.add({name:'d', desc:'3'})
    instance.upsertRecent({name: 'd', desc: '3'});
    instance.addRecent({name: 'b', desc: '3'}, true);
    instance.upsertRecent({name: 'b', desc: '3'});

    sh.assert(instance.size(), 3, 'size did not eq 3', 'upsert is working')
    sh.assert(instance.readFile().length, 3, 'size did not eq 3', 'upsert is working')


    instance.removeRecent({name: 'b', desc: '3'});
    instance.removeRecent({name: 'y', desc: '3'});

    sh.assert(instance.size(), 2, 'size did not eq 2', 'removeRecent is not working')
    sh.assert(instance.readFile().length, 2, 'size did not eq 3', 'removeRecent is not working')

    instance.clearRecentList();
    sh.assert(instance.size(), 0, 'size did not eq 2', 'removeRecent is not working')
}


