/*
 call with name and path and ur good
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function ReloadWatcher() {
    var p = ReloadWatcher.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.watchFileOnSOcket = function watchFileOnSOcket(config) {
        hjkl.j
        //var art = process.argv.slice(2);;
        art = 'lklsdf'
        var art = process.argv.slice(2)[0]
        if (art == null) {
            art = ''
        }
        console.log('not now', new Date(), art)

        var sh = require('shelpers').shelpers;
        var shelpers = require('shelpers');

        var fileMatch = sh.fs.leaf(__filename)
        fileMatch = sh.replace(fileMatch, '_Runner', '')
        var fileMatch2 = 'MaryTTS.js'
        console.log(fileMatch)

        var useSecureServer = false;
        if (useSecureServer) {
            //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
        } else {
            var socket = require('socket.io-client')('http://127.0.0.1:14002/');
        }
        socket.on('connect', function () {
            console.log('connected...')
            //p.trigger(art);
        });
        socket.on('event', function (data) {
        });
        /* socket.on('window.invoke', function (data) {
         console.log('what is data', data)
         if (data.endsWith(fileMatch) || data.endsWith(fileMatch2)) {
         console.log('ok...')
         runFile()
         }
         if (data.includes('V2Z') ) {
         console.log('ok...')
         runFile()
         }
         });*/
        socket.on('disconnect', function () {
        });

//sh.run(['node', fileMatch].join(' '))
        var fileToRun = fileMatch;

        var self = {}

        self.data = {};
        self.settings = {}


        function runFile() {
            self.data.count++;

//self.proc('running', fileToRun, self.data.count)
            var cmdNode = 'node';
            if (sh.isWin() == false) {
                cmdNode = '/home/user/.nvm/versions/node/v6.9.5/bin/node'
            }
            cmdNode = sh.dv(self.settings.cmdNode, cmdNode)
            var y = sh.runAsync(cmdNode + ' ' + fileToRun)

// var  y = sh.runAsync('node '+ fileToRun)
//spit stdout to screen
            y.stdout.on('data', function (data) {
                process.stdout.write(data.toString());
            });
//spit stderr to screen
            y.stderr.on('data', function (data) {
                process.stderr.write(data.toString());
            });

        }

        runFile();
    }

    p.watchFileOnSOcket2 = function watchFileOnSOcket2(file) {

        console.log('not now', new Date(), file)

        console.log(file)

        if (self.socket == null) {
            var useSecureServer = false;
            if (useSecureServer) {
                //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
            } else {
                var socket = require('socket.io-client')('http://127.0.0.1:14002/');
            }
            self.socket = socket;
        } else {
            socket = self.socket;
        }

        socket.on('connect', function () {
            console.log('connected...')
            //p.trigger(art);
            socket.emit('window.invoke', file)
            console.log('exiting....')
            setTimeout(process.exit, 120); //sh.exit();
        });
        socket.on('event', function (data) {
        });
        socket.on('window.invoke', function (data) {

        });
        socket.on('disconnect', function () {
        });

    }

    p.watchFileAndRunner = function watchFileAndRunner(file) {
        console.log('not now', new Date(), file)

        console.log(file)

        if (self.socket == null) {
            var useSecureServer = false;
            if (useSecureServer) {
                //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
            } else {
                var socket = require('socket.io-client')('http://127.0.0.1:14002/');
            }
            self.socket = socket;
        } else {
            socket = self.socket;
        }

        socket.on('connect', function () {
            console.log('connected...')
            //socket.emit('window.invoke', file)
        });
        socket.on('event', function (data) {
        });
        socket.on('window.invoke', function (data) {

            if (data.includes(file)) {
                console.log('connected...', data)
                self.runFile(data)
            }
            // socket.emit('window.invoke', data)
        });
        socket.on('disconnect', function () {
        });

    }


    p.runFile = function runFile(fileToRun) {
        console.log(sh.n, sh.n)
        self.data.count++;
        var cmdNode = 'node';
        if (sh.isWin() == false) {
            cmdNode = '/home/user/.nvm/versions/node/v6.9.5/bin/node'
        }
        cmdNode = sh.dv(self.settings.cmdNode, cmdNode)
        var y = sh.runAsync(cmdNode + ' ' + fileToRun)

// var  y = sh.runAsync('node '+ fileToRun)
//spit stdout to screen
        y.stdout.on('data', function (data) {
            process.stdout.write(data.toString());
        });
//spit stderr to screen
        y.stderr.on('data', function (data) {
            process.stderr.write(data.toString());
        });
    }
    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ReloadWatcher = ReloadWatcher;

ReloadWatcher.reloadFile = function reloadFile(file) {
    var instance = new ReloadWatcher();
    var config = {};
    instance.init(config)
    instance.watchFileOnSOcket2(file)
}

if (module.parent == null) {
    var instance = new ReloadWatcher();
    var config = {};
    instance.init(config)
    instance.watchFileOnSOcket2('bookCvert')
}


