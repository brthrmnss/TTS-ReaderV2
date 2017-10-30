/*
 call with name and path and ur good
 */



var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var ReloadWatcher = require('./ReloaderWatcher.js').ReloadWatcher;



if (module.parent == null) {
    var instance = new ReloadWatcher();
    var config = {};
    instance.init(config);
    //instance.watchFileOnSOcket2('bookCvert')
    instance.watchFileAndRunner('proj1_text');
}


