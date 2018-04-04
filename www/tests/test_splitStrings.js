/**
 * Created by user1 on 1/27/2018.
 */
var sh = require('shelpers').shelpers;

function repl(str, wrod) {
    str2 = str.replace(new RegExp('\\b'+wrod+"\\b", "gi"), "aaaa");
    console.log(str)
    console.log(str2)
    var splitStr = str.split(new RegExp('\\b'+wrod+"\\b", "gi"))
    console.log(splitStr)
    return splitStr;
}

var str = 'He ran all the way home'
repl(str, 'he')
str = 'She ran into him, and he was angry'
repl(str, 'he')
str = 'They went and gave it to he'
repl(str, 'he')
str = 'They went he\'s house and gave it to he'
repl(str, 'he')
var str = 'She ran all the way home'
repl(str, 'he')