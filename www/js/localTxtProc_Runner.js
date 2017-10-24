/*
 call with name and path and ur good
 */

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
socket.on('window.invoke', function (data) {
    console.log('what is data', data)
    if (data.endsWith(fileMatch) || data.endsWith(fileMatch2)) {
        console.log('ok...')
        runFile()
    }
    if (data.includes('V2Z') ) {
        console.log('ok...')
        runFile()
    }
});
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