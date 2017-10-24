console.log('test?')
console.log('ok')


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var x = 'G:/Dropbox/projects/delegation/Reader/TTS-Reader/www/js/speakHTMLText_CleanedV2Z_noreload.js'
var window = {};
//var yyy = require(x)

console.log('ok')
console.log('')


 function offsetPort(url, portOffset, showErr) {
    if (portOffset == null) {
        return url
    }
    if (url.includes(':') == false) {
        if (showErr != false)
            sh.throw('n.... o port', url)
        return url
    }
    var splitProtocol = url.split('://')

    if (splitProtocol.length == 1) {
        protocol = ''
        rest = url
    } else {
        var protocol = splitProtocol[0]
        protocol += '://'
        rest = splitProtocol[1]
    }

    var splitOnPortColon = rest.split(':')
    var hostWithoutPort = splitOnPortColon[0] + ':'
    var rest = splitOnPortColon[1]
    var splitOnDirs = rest.split('/')
    var port = splitOnDirs[0]


    if ( splitOnDirs.length == 1 ) {
        if ( port.includes('?')) {
            var splitOnParams = rest.split('?')
            port = splitOnParams[0]
            rest = '?'+splitOnParams[1]
        }
    } else {
        rest = '/'+splitOnDirs.slice(1).join('/');
    }

   // var split = rest.split('/')
   // var port = split[0]
    port = parseInt(port)
    console.log('|', rest)
    port += portOffset;

    var output = [protocol, hostWithoutPort, port, rest].join('')
    return output;
}

var testUrls = [
    'www.yahoo.com',
    'http://127.0.05.5:5465/btp',
    'localhost:2465',
    'http://127.0.05.5:5465?boo=testbtp&j=5',
    'http://127.0.05.5:5465?/request?boo=testbtp&j=5',
]
sh.each(testUrls, function showTest(k, url) {
    var y = offsetPort(url, 2, false)
    console.log('output', url, '-->', y)
})
