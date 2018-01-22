window = {};
var cheerio = require('cheerio');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


var file = "G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Farewell My Lovely  Raymond Chandlerepub/epub.html"
file = "G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/testquotesepub/epub.html"
file = "G:/dropbox/books2/Unknown/Skyscraper The Making of a Building (4718)/Skyscraper The Making of a Buil - Unknown.txt"
file = "G:/Dropbox/Books2/Unknown/Skyscraper Dreams The Great Real Es (4719)/Skyscraper Dreams The Great Rea - Unknown.txt"
file = "G:/dropbox/books2/Unknown/Colin C. Williams-The Hidden Enterp (4742)/Colin C. Williams-The Hidden En - Unknown.txt"
file = "G:/dropbox/books2/Unknown/beyond the babble leadership c (4744)/beyond the babble leadership c - Unknown.txt"
file = "G:/dropbox/books2/Unknown/[Pam Fox Rollin] 42 Rules for Your (4754)/[Pam Fox Rollin] 42 Rules for Y - Unknown.txt"

//var fileInput = "G:\\dropbox\\books2\\Kevan Hall\\Speed Lead (4792)\\Speed Lead - Kevan Hall.pdf"

file = "G:\\dropbox\\books2\\areidersf\\Fujishin_final.indb (4794)\\Fujishin_final.indb - areidersf.pdf"
file = "C:/Users/user1/Downloads/Documents/High Rise  How 1,000 Men and Women Worked Around the Clock for Five Years and Lost $200 Million Building a Skyscraper Jerry Adler 374p_0060167017"
//fileInput = "F:\\Users\\user1\\Downloads\\Documents\\[Ravindra_S._Goonetilleke]_The_Science_of_Footwear(book4you.org).pdf"
file = "G:/dropbox/books2/Admin/The science of footwear (4795)/The science of footwear - Admin"
file += '.txt'

file=  "C:/Users/user1/Downloads/Documents/[Martin_Weinmann_(auth.)]_Reconstruction_and_Analy(book4you.org).txt"



/*
 var contents = sh.readFile(file);
 if ( contents.length > 50*1000 ) {
 contents = contents.slice(0, contents.length * .1)
 }


 var contentsHTML = '<div id="txtWrapper">' + contents + '</div>'
 let $ = cheerio.load(contentsHTML);
 global.$ = $;
 $.each = sh.each;
 console.debug = function debug() {
 var args = sh.args(arguments)
 console.log.apply(console, args)
 }
 */

//var contentsHTML = '<div id="txtWrapper">' + contents + '</div>'
let $ = cheerio.load('');
global.$ = $;
$.each = sh.each;

var uiUtils = require('./ui_utils.js').uiUtils;
var u = uiUtils;

//console.log('dddd')


function ConvertTextToHTML() {
    var p = ConvertTextToHTML.prototype;
    p = this;
    var self = this;
    self.data = {};
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.method = function method(config) {
        var contents = sh.readFile(file);
        self.proc('length', contents.length)
        var maxSize = null
        maxSize = 50 * 1000
        maxSize = null
        if (maxSize && contents.length > maxSize) {
            contents = contents.slice(0, contents.length * .01)
        }
        self.proc('length', contents.length)
        contents = sh.remove_win_newlines(contents)
        self.data.contents = contents;
    }

    p.method2 = function method2(config) {

        function isWhitespace(char) {
            if (char == null) {
                return
            }
            if (sh.isString(char) == false) {
                return false
            }
            if (char.trim() == "") {
                return true
            }
            /* isStr = sh.isAlphaNumeric(char)
             if ( isStr == false ) {
             return false;
             }*/
            return false;
        }

        var endingPunctuation = ['.', '!', '?']
        var arr = self.data.contents.split('');
        var arr2 = [];
        var skipNext = 0


        function blueBox(sn, bgColor) {
            bgColor = sh.dv(bgColor, 'blue')
            var div = u.tag('div')
            u.lastUI = div;
            u.class('blueDiv')
            u.why(sn)
            u.bg(bgColor)
            u.height('20px')
            u.width('100px')
            return ( $.html((div)) )
        }

        function spanBlock(sn, bgColor) {

            bgColor = sh.dv(bgColor, 'purple')
            var div = u.tag('span')
            u.lastUI = div;
            u.class('blueDiv')
            u.why(sn)
            u.bg(bgColor)
            u.height('15px')
            u.width('5px')
            u.blockSpan('5px')
            return ( $.html((div)) )
        }

        function addComp(ui) {
            var ui2 = $.html((ui))
            arr2.push(ui2)
        }


        sh.each(arr, function onK(k, char) {
            if (skipNext > 0) {
                skipNext--
                return
            }





            var nextChar = arr[k + 1]
            var prevChar = arr[k - 1]
            var nextNextChar = arr[k + 2]
            var nextChar3 = arr[k + 3]
            //console.log(char)
            char = char.toString();
            if (nextChar) {
                isNextCharStr = sh.isAlphaNumeric(nextChar)
                nextChar = nextChar.toString()
            }
            isStr = sh.isAlphaNumeric(char)
            var isNewline = "\n" == char

            function isNewLine(char) {
                return char == "\n"
            }

            if (char == "\n" && isNextCharStr && sh.str.isLowerCase(nextChar)) {
                // dgf.h
                return;
            }

            if (char == "\n" && isWhitespace(prevChar) && isWhitespace(nextNextChar)) {
                // dgf.h
                return;
            }

            var prevSlice = self.data.contents.slice(k - 100, k)
            if (k < 100) {
                prevSlice = self.data.contents.slice(0, k)
            }
            var forwardSlice = self.data.contents.slice(k, k + 100)
            var dbg2 = [prevSlice,
                forwardSlice]

            var dbg = [prevChar, '|', char, nextChar, nextNextChar, nextChar3]

            /*if ( prevSlice.endsWith('to them.')) {
                debugger
            }*/
            /*if ( forwardSlice.startsWith('----------------------- Page 10----------------')) {
                debugger
            }*/
            if ( char == '-') {
                var markerPage = '-----------------------'
                if ( forwardSlice.startsWith(markerPage)) {
                    var x = forwardSlice.replace(markerPage+' ', '')
                    skipNext = markerPage.length+1
                    if ( x.startsWith('Page ') ) {
                        x = x.replace('Page ', '')
                        var splitPageNumber = x.split('-')
                        var page = splitPageNumber[0]
                        //skipNext += '-'+splitPageNumber[1].length
                        skipNext += page.length+markerPage.length
                        skipNext += 5
                        var nextSlice = forwardSlice.slice(skipNext)
                        arr2.push("\n")

                        //addDiv('chompspace')
                        u.tag('div')
                        u.text('Page ' + page)
                        u.class('doNotRead')
                        u.color('darkgrey')

                        addComp(u.lastUI)

                        arr2.push("\n")
                        //-----------------------
                        return
                    }
                    //debugger
                }
            }



            if (isNewLine(char) && isNewLine(nextChar)
                && isNewLine(nextNextChar)) {
                skipNext = 2
                var div = u.tag('div')
                u.lastUI = div;
                u.class('3xRswitch')
                u.why('3xr')
                u.bg('red')
                u.height('20px')
                u.width('100px')
                arr2.push($.html((div)))
                //debugger
                return;
            }

            if (isNewLine(char) && isNewLine(nextChar)
                && nextNextChar == " "
                && nextChar3 == " "
                && isWhitespace(nextNextChar)) {
                // skipNext = 1
                //debugger
                //arr2.push('\n\t__2__')
                var div = u.tag('div')
                u.lastUI = div;
                u.class('3xRswitch')
                u.why('3xr')
                u.bg('orange')
                u.height('20px')
                u.width('100px')
                arr2.push($.html((div)))
                return;
            }

            if (isNewLine(char) &&
                isNewLine(nextChar) &&
                sh.isAlphaNumeric(nextNextChar)
            ) {
                //debugger
                arr2.push('<br/>') //condense
                skipNext = 1
                return;
            }

            if (isNewLine(char)
                &&
                isNewLine(nextChar) /*
             sh.isAlphaNumeric(nextChar)*/
            ) {
                //debugger
                arr2.push('<br/>') //condense
                skipNext = 1
                return;
            }

            function untilNextLink(str) {
                var charUntilNewLine = [];
                var lastChar = null;
                var strArr = str.split('')
                sh.each(strArr, function proc(k, char) {
                    if (isNewLine(char)) {
                        charUntilNewLine.push(char)
                        return
                    }
                    if (char.trim() == '') {
                        charUntilNewLine.push(char)
                        return;
                    }
                    lastChar = char;
                    return false;
                })
                var output = {}
                output.charUntilNewLine = charUntilNewLine
                output.lastChar = lastChar;
                return output
            }

            /* if (prevSlice.endsWith('cooperation  pos')) {
             debugger
             }*/
            //hypebs
            if (char == '-') {
                var output = untilNextLink(forwardSlice.slice(1))
                if (output.charUntilNewLine.length > 1) {
                    /*if ( output.charUntilNewLine.includes('\n') == false ) {
                     skipNext = output.charUntilNewLine.length
                     return;
                     }*/
                    if ( output.lastChar == null ) {
                        //debugger
                        output.lastChar= ''
                       // return false;
                    }
                    if (sh.isAlphaNumeric(output.lastChar) && sh.str.isLowerCase(output.lastChar)) {
                        //debugger
                        /* if ( prevChar == '.') {
                         debugger;
                         }*/
                        skipNext = output.charUntilNewLine.length+0
                        arr2.push(spanBlock('chompspace'))
                        //arr2.push("\n")
                        return;
                    } else {

                    }

                    /*if ( output.charUntilNewLine.includes('\n') == false ) {
                     skipNext = output.charUntilNewLine.length
                     return;
                     }*/

                }
            }
           /* if (prevSlice.endsWith('their jobs.')) {
                debugger
            }*/

            if (char == ' ') {
                var output = untilNextLink(forwardSlice)
                if (output.charUntilNewLine.length > 1) {
                    if ( output.lastChar == null ) {
                        //debugger
                        output.lastChar= ''
                        // return false;
                    }
                    skipNext = output.charUntilNewLine.length - 1
                    var parts = output.charUntilNewLine.join('')
                    var length = parts.split('\n').length
                    var newLineSplit = parts.split('\n')
                    if (endingPunctuation.includes(prevChar) && length > 1) {
                        //skipNext = output.charUntilNewLine.length -1
                       // debugger
                        arr2.push("\n")
                        arr2.push(blueBox( 'new line b/c sentence ended', 'green'))
                        arr2.push("\n")
                        if (newLineSplit.slice(-1).length > 1) {
                            //do something .... add a tab
                        }
                        return;

                    }

                    if (length > 3) {
                        if (sh.isAlphaNumeric(output.lastChar) && sh.str.isLowerCase(output.lastChar)) {
                            //debugger

                        } else {
                            arr2.push("\n")
                            arr2.push(blueBox('chompspace'))
                            arr2.push("\n")
                        }
                    }

                    arr2.push(' ')
                    return;
                }
            }

            /*if (prevSlice.endsWith('know')) {
             debugger
             }
             if (prevSlice.endsWith('cour-')) {
             debugger
             }*/
            /*if (prevSlice.endsWith('construction')) {
             debugger
             }*/
            if (forwardSlice.startsWith('manager.')) {
                // debugger
            }

            if ('<>&'.includes(char)) {
                char = char.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            }


            arr2.push(char)
        })
        console.log('...', arr2.length)

        self.data.output = arr2.join('')
        if ( self.settings.showOutput ) {
            console.log(self.data.output)
        }
        // self.data.output = '<span>'+self.data.output+'</span>'
        var ui = u.tag('div')
        u.lastUI = ui;
        ui.html(self.data.output)
        self.data.output = $.html((ui))


        self.saveFile()
    }

    p.saveFile = function saveFile() {
        var dirStore = sh.fs.trash('bookCvert2')
        sh.fs.mkdirp(dirStore)
        var fileOutput = sh.fs.join(dirStore, 'test_proj1_text_to_html.html')
        sh.writeFile(fileOutput, self.data.output); //.join(''))
        //  console.log('took', u.secs(h.data.timeDate))

        sh.writeFile(file+'.html', self.data.output)
        var ReloadWatcher = require('./ReloaderWatcher.js').ReloadWatcher;
        console.log('wrote', fileOutput)
        ReloadWatcher.reloadFile('bookCvert2')
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ConvertTextToHTML = ConvertTextToHTML;

if (module.parent == null) {
    var instance = new ConvertTextToHTML();
    var config = {};
    instance.init(config)
    instance.method();
    instance.method2();
}


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function ConvertTextToBook() {
    var p = ConvertTextToBook.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ConvertTextToBook = ConvertTextToBook;

if (module.parent == null) {
    var instance = new ConvertTextToBook();
    var config = {};
    config.file = "G:/dropbox/books2/Unknown/Skyscraper The Making of a Building (4718)/Skyscraper The Making of a Buil - Unknown.txt"
    config.file = "C:/Users/user1/Downloads/Documents/[Martin_Weinmann_(auth.)]_Reconstruction_and_Analy(book4you.org).txt"
    instance.init(config)
}


window.fxHtmlSpeaker = function fxHtmlSpeaker() {

    u.isUpperCase = function isUpperCase(char) {
        if (char == null) {
            return null
        }
        if (char == char.toUpperCase()) {
            return true
        }
        return false;
    }

    u.isFirstLetterLowercase = function isFirstLetterLowercase(txt) {

        if (txt == null) {
            return null
        }
        var char = txt.slice(0, 1)
        if (char == char.toLowerCase()) {
            return true
        }
        return false;
    }

    //console.log('hamb');
    function defineUtils() {
        $.async = function asyncHelper(items, fx, fxAllDone, delay, playIndex) {
            //var index = 0
            var asyncController = {};
            asyncController.index = 0;
            asyncController.getNext = function getNextItem() {
                var next = items[asyncController.index + 1];
                return next;
            }
            if (playIndex > 0) {
                asyncController.index = playIndex;
            }
            if (playIndex < 0) {
                asyncController.index = items.length - 1 + playIndex;
            }

            asyncController.length = items.length;
            if (items.length == null) {
                var itemsLength = 0
                $.each(items, function onCountItems(k, v) {
                    itemsLength++
                })
                asyncController.length = itemsLength
            }

            if (delay == null && $.isNumeric(fxAllDone)) {
                delay = fxAllDone;
            }

            function goToNextSpan() {
                var item = items[asyncController.index];
                var currentIndex = parseInt(asyncController.index)
                var isFinished = currentIndex > asyncController.length - 1
                console.log('playindex', asyncController.index, asyncController.length - 1, isFinished)
                if (isFinished) {
                    if (fxAllDone) {
                        fxAllDone();
                    }
                    return;
                }
                fx(asyncController.index, item, fxCallback, asyncController)
                asyncController.index++;

                function fxCallback() {
                    if (delay) {
                        setTimeout(goToNextSpan, delay);
                        return;
                    }
                    goToNextSpan();
                }
            }

            goToNextSpan();
            asyncController.runIteration = function runIteration() {
                goToNextSpan();
            }
            return asyncController;
        }
    }

    defineUtils();

    var helper = {};

    var $scope = window.$scope;
    window.helper = helper;

    function SentenceHelper() {

        var self = this;
        var p = this;

        self.data = {};
        self.data.repeatCountIndex = 5

        self.settings = {};

        function defineBasicTransport() {
            p.back = function onBack() {
                self.index -= 5
                if (self.index < 0) {
                    self.index = 0
                }
                ;
                self.lookFor = self.lookForAll.slice(self.index)
                self.state();
            }

            p.forward = function onNext() {
                self.index += 5
                if (self.index < 0) {
                    self.index = 0
                }
                ;
                self.lookFor = self.lookForAll.slice(self.index)
                self.state();
            }

            p.restart = function onRestart() {
                self.index = 0
                self.lookFor = self.lookForAll.concat();
                self.state();
                self.play();
            }

            p.play = function play() {
                self.pause = false
                self.goEach();
            }

            p.pause = function pause() {
                self.pause = true
                var bodyContainer = $('html,body')
                if (self.data.toDiv) {
                    bodyContainer = self.data.toDiv;
                }
                bodyContainer.clearQueue();
                bodyContainer.stop();

            }
        }

        //defineBasicTransport();
        function definePlayMode2() {
            p.clearAllSpans = function clearAllSpans() {
                var spans = $('span.highlight');
                if (self.data.toDiv) {
                    spans = self.data.toDiv.find('span.highlight');
                }
                spans.each(function () {
                    var $this = $(this);
                    $this.removeClass('highlight');
                });
            }

            p.onRecentList = function onRecentList() {
                var y = self.data.rr.getRecentList()
                console.log(y)

                $('#col2_recentList').html('' +
                    '' +
                    '<div id="users">' +

                    '<input class="search" placeholder="Search" />' +
                    '<button class="sort" data-sort="name">' +
                    'Sort' +
                    '</button>' +

                    '<ul class="list searchList"></ul>' +

                    '</div>')

                var options = {
                    valueNames: ['name', 'born',

                        {name: 'url', attr: 'href'},
                    ],
                    item: '<li>' +
                    '<span class="name"></span>' +
                    '<a href="http://javve.com" class="link url">link</a>' +
                    '<p class="born"></p>' +
                    '</li>'
                };

                var values = [
                    {
                        name: 'Jonny Strömberg',
                        born: 1986
                    },
                    {
                        name: 'Jonas Arnklint',
                        born: 1985
                    },
                    {
                        name: 'Martina Elm',
                        born: 1986
                    }
                ];

                var userList = new List('users', options, y);

                /* userList.add({
                 name: 'Gustaf Lindqvist',
                 born: 1983
                 });*/
            }

            p.onPlay2UI = function onPlay2UI(setToIndex) {
                var changeIndex = null; //donot change
                if (setToIndex) {
                    setToIndex = 'setTo_' + setToIndex
                    changeIndex = setToIndex
                }
                p.onPlay2(null, false, changeIndex, true, false);
                //keep play statse if false
            }
            p.onPlay2 = function onPlay2(event, justScrollToPosition,
                                         changeIndex, force, keepPlayState) {

                //if ( )
                if (
                    window.sentenceHelper.data.fxSafetyFailToLoad
                ) {
                    debugger;
                    window.sentenceHelper.data.fxSafetyFailToLoad();

                }
                if (keepPlayState) {
                    //for scrubbing, do nto start playing
                    if (self.data.isPlaying == true) {

                    } else {
                        justScrollToPosition = true; //just run thruogh
                    }
                }

                if (self.data.isPlaying && force != true) {
                    console.debug('alreayd palying... will pause')
                    self.onPause();
                    return;
                }


                self.data.isPlaying = true
                self.data.pause = false
                //self.goEach();

                // if ( self.fixedHTML == false ) {
                // }
                self.data.currentSentences;
                var c = {};
                c = self.data.currentSentences;
                if (c == null) {
                    console.warn(self, 'self.data.currentSentences are null')
                }
                //go rhgouh each
                var hasSelectedText = false;
                var windowSelection = null;

                if (window.getSelection().type == "Range") {
                    hasSelectedText = true
                    windowSelection = window.getSelection()
                }
                if (self.data.iframe && self.data.iframe.getSelection().type == "Range") {
                    hasSelectedText = true
                    windowSelection = self.data.iframe.getSelection()
                }


                if (hasSelectedText == false && self.data.pauseId) { //resume paused player
                    console.log('resuming pause')
                    window.iterationMarker = self.data.pauseId;
                    self.data.pauseId = null;
                    if (window.fxIteration) {
                        window.fxIteration();
                        return;
                    }
                    console.warn('not sure waht is hapening, have pause id, but not paused.')


                }

                var iterationMarker = Math.random();
                window.iterationMarker = iterationMarker
                var currentIndex = 0;
                if (changeIndex) {
                    if ($.isString(changeIndex) && changeIndex.startsWith('setTo_')) {
                        changeIndex = changeIndex.replace('setTo_', '')
                        c.currentIndex = changeIndex;
                    } else {
                        c.currentIndex += changeIndex;
                    }
                }
                var playIndex = c.currentIndex;
                if (hasSelectedText) {
                    console.debug('range type selected')
                    var startOnUIElement = windowSelection.anchorNode.parentElement
                    var foundStartingElement = false;
                    var foundStartingElement_playIndex = -1;
                    playIndex = 0; //clear current selection

                    console.log('finding element .... ', startOnUIElement)


                    if (startOnUIElement != null) {
                        $.each(c.dictSentences2, function (iSs, sentenceObj) {
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if (foundStartingElement == false) {
                                    if (kV[0] != startOnUIElement) {
                                        return;
                                    } else {
                                        foundStartingElement = kV;
                                        foundStartingElement_playIndex = iSs;
                                        //debugger;
                                    }
                                }
                            });

                            if (foundStartingElement == false) {
                                // fxEnd()
                                return;
                            }
                        })
                    }
                    console.log('finding element .... ', 'foundStartingElement', foundStartingElement)
                    if (foundStartingElement != true) {
                        playIndex = foundStartingElement_playIndex;
                    }
                    foundStartingElement = false;

                }


                var async = $.async(c.dictSentences2,
                    function procSentence(k, sentenceObj, fxEnd, controller) {


                        if (self.data.repeatCountIndex > 1) {
                            if (c.repeatCountIndex == null) {
                                c.repeatCountIndex = 0
                            }
                            if (c.repeatCountIndex > self.data.repeatCountIndex) {
                                c.repeatCountIndex = 0; //reset for next sentence
                            } else {
                                c.repeatCountIndex++;
                                controller.index--; //
                                console.debug('repeat sentence', c.repeatCountIndex, self.data.repeatCountIndex)
                            }

                        }

                        if (startOnUIElement != null) {
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if (foundStartingElement == false) {
                                    if (kV[0] != startOnUIElement) {
                                        return;
                                    } else {
                                        foundStartingElement = kV;
                                        //debugger;
                                    }
                                }
                            });

                            if (foundStartingElement == false) {
                                fxEnd()
                                return;
                            }
                        }
                        if (sentenceObj == null) {
                            debugger;
                        }
                        iterationWrapperFx(); //run so it can be resumed
                        function iterationWrapperFx() {
                            if (window.iterationMarker != iterationMarker) {
                                //debugger
                                console.error('marker has changed.... aborting loop')
                                return;
                            }

                            var sentence = sentenceObj.txt;
                            c.currentIndex = k;

                            // debugger
                            //sentence = sentence.replace(/#/gi, '');
                            console.log('looking for', sentence);
                            self.clearAllSpans()
                            //pH.clearAllspans();
                            var firstSentenceElement = null;
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if (firstSentenceElement == null) {
                                    firstSentenceElement = kV;
                                }
                                $(kV).addClass('highlight')
                                c.currentSpan = kV;
                            });
                            self.utils.scrollToElement(firstSentenceElement)

                            if (sentenceObj.images.length > 0) {
                                // debugger;

                                var imgs = $(sentenceObj.images).clone();
                                $.each(imgs, function (k, v) {
                                    $(v).css('width', '100%');
                                    $(v).css('height', 'auto');
                                });


                                $('#col2_1').html('');
                                $('#col2_1').append(imgs);
                            }


                            function fxEndRedirect() {
                                //window.fxIteration = iterationWrapperFx;
                                fxEnd()
                            }


                            self.render();


                            self.handlePositionChange()
                            self.utils.nlp(sentence)
                            if (justScrollToPosition) {
                                self.data.isPlaying = false
                                return;
                            }

                            var isHeading = false
                            if (firstSentenceElement.is('h4,h2,h1,h3')) {
                                isHeading = true;
                            } else {
                                isHeading = firstSentenceElement.parents('h4,h2,h1,h3').length > 0
                            }
                            if (self.settings.doNotDing) {
                                isHeading = false;
                            }


                            self.speakHelper.tts({
                                txt: sentence,
                                fxDone: fxEndRedirect,
                                data: sentenceObj,
                                isHeading: isHeading,
                                quote: sentenceObj.quoteMode
                            })
                            // self.speakHelper.speak(sentence, fxEndRedirect)
                            return;
                            var nextSentence = controller.getNext();
                            if (nextSentence != null) {
                                helper.speak(nextSentence, null, null, true)
                            }
                        }

                        window.fxIteration = iterationWrapperFx;

                    },
                    function onDone() {
                        // helper.goToNextPage();
                    }, 10,
                    playIndex)
                window.async = async;

                // debugger
                self.render();
            };

            p.onHardStop = function onHardStop() {
                //why: stop everythign from playing ..
                self.data.isPlaying = false;
                self.data.isPaused = false;
                self.data.pauseId = null;
                window.iterationMarker = null;
            }

            p.onPause = function onPause() {
                self.data.isPlaying = false;
                self.data.isPaused = true;
                //$scope.playerForm.player.pause();
                //  setTimeout(function applyLater() {
                //      $scope.$apply();
                // }, 200)

                self.data.pauseId = window.iterationMarker
                window.iterationMarker = null;
                self.speakHelper.tts('')
            }


            p.onPrev = function onPrev(event) {
                // console.log('startSel', self.sel)
                self.onPlay2(event, false, -1, true, true);
            }
            p.onNext = function onNext(event) {
                //console.log('startSel', self.sel)
                self.onPlay2(event, false, 1, true, true);
            }

            p.render = function rend() {
                if (self.data.currentSentences) {
                    $("#txtSentenceCount").text(self.data.currentSentences.sentences.length);
                    $("#inputCurrentSentence").val(self.data.currentSentences.currentIndex);

                    var progress = (self.data.currentSentences.currentIndex) / (self.data.currentSentences.sentences.length);
                    progress = progress * 100;
                    progress = progress.toFixed(1);

                    $('#txtProgress').text(
                        progress + '%'
                    )

                    $('#checkDebugSentences').val(self.data.colorizeBackgrounds);
                    $('#checkDebugSentences').prop('checked', self.data.colorizeBackgrounds);
                }
            }


            p.onChangeOptions = function onChangeOptions() {
                self.data.colorizeBackgrounds = $('#checkDebugSentences').is(':checked')
                window.sentenceHelper.setupSentencesRedo()
            }

        }

        //definePlayMode2();


        p.resetSentenceHelper = function resetSentenceHelper() {
            // self.data = {};
            self.data.iframe = null;
            self.data.toDiv = null;
        }


        p.setupSentencesRedo = function setupSentencesRedo() {
            self.setupSentences(self.data.lastCall_setupSentences[0],
                self.data.lastCall_setupSentences[1])
        }
        p.setupSentences = function setupSentences(fromDiv, toDiv) {
            self.data.lastCall_setupSentences = [fromDiv, toDiv]
            if (fromDiv == null) {
                $('#bookHolderContainerClone').html('');
                // $('body').prepend('<div id="bookHolderContainerClone"></div>')
                var container = $('#txtWrapper')
                var html = container.html();
                console.log('lenght of html', html.length)
                // debugger;
                // asdfl.g
                // debugger;


                self.utils.findSentencesInHtml(container);
            } else {


                if (toDiv == null)
                    toDiv = fromDiv;
                self.data.toDiv = toDiv;
                self.utils.findSentencesInHtml(toDiv);
            }
            self.fixedHTML = true


            //self.render();
        }


        p.handlePositionChange = function handlePositionChange() {
            self.data.rr.setRecentListPlayheadPosition(
                self.data.currentSentences.currentIndex,
                self.data.currentSentences.sentences.length
            );

        }

        p.setRate = function setRate(rate) {
            self.timePerWord = 1000 * 1 / (rate * 1 / 60);
            self.rate = rate;
            console.log(self.timePerWord, rate)
        }

        p.state = function state() {
            console.log('... ', self.index, self.lookFor)
        }

        p.goEach = function () {
            if (self.lookFor.length == 0) {
                console.log('done', 'or empty [] sentences')
                return;
            }
            if (self.pause == true) {
                console.log('paused')
                return;
            }
            self.index++
            var sentence = self.lookFor.shift()

            //var html = self.el.html()
            //if ( self.lastReplacement != null ) {
            //    html = html.replaceX(self.lastReplacement[1], self.lastReplacement[0]);
            //}
            var rep = "<span class='smallcaps'>" + sentence + "</span>"
            self.lastReplacement = [sentence, rep];
            //html = html.replaceX(self.lastReplacement[0], self.lastReplacement[1]);
            //self.el.html(html)
            self.el.html(self.el.html().replaceX('<span class="smallcaps">', '<span>'))
            self.el.wrapInTag({"words": [sentence], tag: 'span'});

            var target = $('.smallcaps');
            if (target.length) {
                $('html,body').clearQueue();
                $('html,body').stop();
                $('html,body').animate({
                    scrollTop: target.offset().top - 200
                }, 500);
                //return false;
            }
//return;
            console.log('update', sentence, self.lookFor.length)
            if (self.testMode == true) {
                setTimeout(self.goEach, self.timePerWord * sentence.split().length);
            } else {
                var curId = self.currentId;

                if (self.rate == null) {
                    self.rate = $('#inputRate').val()
                }

                if (self.voice == null) {
                    self.voice = 'IVONA 2 Brian'
                }

                //var rate = 7
                var voice = null;
                if (voice == null) {
                    voice = 'IVONA 2 Kendra';
                    voice = 'IVONA 2 Brian';
                    voice = self.voice;
                }
                // debugger
                console.log('trim', sentence.trim().endsWith('reply'), sentence)
                if (sentence.trim().endsWith('reply')) {
                    if (self.voice == 'IVONA 2 Brian') {
                        //self.voice = 'IVONA 2 Joey'
                        self.voice = 'IVONA 2 Kendra';
                    } else {
                        self.voice = 'IVONA 2 Brian'
                    }
                    // voice = self.voice
                    sentence = sentence.trim().slice(-5)
                    sentence += 'end comment.'
                }

                var speakOnce = false
                var cfg = {
                    text: sentence,
                    rate: self.rate,
                    playAudio: true,
                    volume: 25,
                    voice: voice,
                    speakOnce: speakOnce,
                    fx: function onDone() {
                        if (curId != self.currentId) {
                            return;
                        }
                        self.goEach();
                    }
                    //voice:'IVONA 2 Gwyneth'
                }
                window.speak(sentence, null, cfg)

                return;

                /*
                 //self.voice = voice;

                 var date = new Date();
                 $.ajax({
                 url: "http://localhost:4444/say",
                 data: {
                 text:sentence,
                 rate:self.rate,
                 playAudio:true,
                 volume:25,
                 voice:voice,
                 speakOnce:speakOnce,
                 //voice:'IVONA 2 Gwyneth'
                 },
                 type:'post',
                 success: function(result){
                 if ( curId != self.currentId ) {
                 return;
                 }

                 var endDate = new Date();
                 console.log('total time', (endDate.getTime()-date.getTime())/1000);
                 self.goEach();
                 }
                 });

                 */


            }

        }

        // http://stackoverflow.com/a/9795091
        $.fn.wrapInTag = function (opts) {
            // http://stackoverflow.com/a/1646618
            function getText(obj) {
                return obj.textContent ? obj.textContent : obj.innerText;
            }

            var tag = opts.tag || 'strong'
            var words = opts.words || []
            try {
                var regex = RegExp(words.join('|'), 'gi')
            } catch (e) {
            }
            var replacement = '<' + tag + ' class="smallcaps" >$&</' + tag + '>';

            // http://stackoverflow.com/a/298758
            $(this).contents().each(function () {
                if (this.nodeType === 3) //Node.TEXT_NODE
                {
                    try {
                        // http://stackoverflow.com/a/7698745
                        $(this).replaceWith(getText(this).replace(regex, replacement));
                    } catch (e) {
                    }
                }
                else if (!opts.ignoreChildNodes) {
                    $(this).wrapInTag(opts);
                }
            });
        };


        p.getSentencesFromSelectedElement = function getSentencesFromSelectedElement() {
            var filtered = [];
            var _children = $(self.sel).children();
            var skipTypes = ['blockquote', 'a', 'figure', 'img']


            var filtered2 = $(self.sel).find('*').filter(
                function (index) {
                    var isLeaf = $(this).children().length === 0;
                    return isLeaf;
                }
            );

            //clone
            var clone = $($(self.sel).clone())
            var clonePre = $(clone.clone())
            var cloneChildren = clone.find('*');
            var i = 0;
            var filtered3 = $(self.sel).find('*').filter(
                function stripOutLinks(index) {
                    i++;
                    var isValidText = false;
                    var ui = $(this);
                    var tagName = ui.get(0).tagName.toLowerCase();
                    var parentTagName = $(ui.parent()).get(0).tagName.toLowerCase();
                    if (skipTypes.indexOf(parentTagName) == -1 &&
                        skipTypes.indexOf(tagName) == -1) {
                        isValidText = true;
                        // console.log(tagName, ui, ui.text())
                    } else {
                        if (tagName == "a") {
                            if (ui.children().length === 0)
                                return isValidText;
                        }
                        ui.css({'background-color': 'green'});
                        var removeChild = $(cloneChildren[i]);
                        removeChild.remove();
                    }
                    // var isLeaf = ui.children().length === 0;
                    return isValidText;
                }
            );


            console.log('clone text', clone.text().length, clonePre.text() == clone.text());


            self.splitStringIntoSentences(clone.text());

            // debugger

            console.log('...');
            return filtered3;


            $.each(_children, function stripOutLinks(k, ui) {
                ui = $(ui);
                if (skipTypes.indexOf(ui.get(0).tagName.toLowerCase()) != -1) {
                    filtered.push(ui)
                } else {
                    ui.css({'background-color': 'green'});
                }
            });


            console.log('...')
            return filtered;

        }
        p.splitStringIntoSentences = function splitStringIntoSentences(str, clone) {

            //var txt = el.text();
            var sentences = str.split('. ');
            var sentences2 = [];
            $.each(sentences, function modifySentenceForNewLines(k, sentence) {
                var newSentences = sentence.split("\n");
                //sentences2 = sentences2.concat(newSentences)
                $.each(newSentences, function modifySentenceForNewLines(k, sentence) {
                    sentence = sentence.trim();
                    if (sentence == '' || sentence == null)
                        return;
                    sentences2.push(sentence)
                });
            });

            sentences = sentences2;
            self.sentences = sentences;
            return sentences;

        }

        function defineUtils() {
            var utils = {};
            utils.selectElementText = function selectElementText(el, win) {
                win = win || window;
                var doc = win.document, sel, range;
                if (win.getSelection && doc.createRange) {
                    sel = win.getSelection();
                    range = doc.createRange();
                    range.selectNodeContents(el);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (doc.body.createTextRange) {
                    range = doc.body.createTextRange();
                    range.moveToElementText(el);
                    range.select();
                }
            }

            self.utils = utils;

            utils.scrollToElement = function (target) {
                target = $(target);

                if (self.data.autoScrollingEnabled == false) {
                    return;
                }

                if (target.length) {
                    var scrollBody = $('html,body')

                    var scrollTop = target.offset().top - 200;
                    if (self.data.toDiv) {
                        scrollBody = self.data.toDiv
                        var scrollTop = target.offset().top
                            - target.parent().offset().top - 200;

                        var scrollTop = target.parent().offset().top;

                        if (target.parent().offset().top == target.parent().parent().offset().top) {
                            var scrollTop = target.parent().offset().top
                                - target.parent().parent().offset().top - 200;
                        }

                        scrollTop = scrollBody.scrollTop() + target.offset().top // - 200
                        scrollTop -= target.height()
                        scrollTop -= 100
                        scrollTop -= 200

                        if (scrollTop > target.height()) {
                            console.log('scroll top fix, is this an iframe?',
                                target.offset().top)
                            scrollTop = target.offset().top - 100;
                        }
                    }

                    console.log('scroll to top', scrollTop, target.height(),
                        scrollBody.scrollTop(), target.offset().top,
                        target.offset().top, target.parent().offset().top)

                    scrollBody.clearQueue();
                    scrollBody.stop();
                    scrollBody.animate({
                        scrollTop: scrollTop
                    }, 500);
                    //return false;
                }
            }

            utils.scrollToElement = function (target) {
                target = $(target);

                if (self.data.autoScrollingEnabled == false) {
                    return;
                }

                if (target.length) {
                    var scrollBody = $('html,body')

                    var scrollTop = target.offset().top - 200;
                    if (self.data.toDiv) {
                        scrollBody = self.data.toDiv
                        var scrollTop = target.offset().top
                            - target.parent().offset().top - 200;

                        var scrollTop = target.parent().offset().top;

                        if (target.parent().offset().top == target.parent().parent().offset().top) {
                            var scrollTop = target.parent().offset().top
                                - target.parent().parent().offset().top - 200;
                        }

                        scrollTop = scrollBody.scrollTop() + target.offset().top // - 200
                        scrollTop -= target.height()
                        scrollTop -= 100
                        scrollTop -= 200

                        if (scrollTop > target.height()) {
                            console.log('scroll top fix, is this an iframe?',
                                target.offset().top)
                            scrollTop = target.offset().top - 100;
                        }
                    }

                    if (window.scrollIntoViewDivs != true) {
                        console.log('scroll to top', scrollTop, target.height(),
                            scrollBody.scrollTop(), target.offset().top,
                            target.offset().top, target.parent().offset().top)

                        scrollBody.clearQueue();
                        scrollBody.stop();
                        scrollBody.animate({
                            scrollTop: scrollTop
                        }, 500);
                    } else {
                        target[0].scrollIntoView();
                    }
                    //return false;
                }
            }

            utils.findSentencesInHtml = function findSentencesInHtml(parent) {

                window.parent = parent;
                console.log('starting point is', parent.selector)

                if ($.isString == null) {
                    $.isString = function isString(obj) {
                        return (Object.prototype.toString.call(obj) === '[object String]');
                    }
                }
                //TODO
                //colorize all sentences
                //prev sentences add to list of 'current sentencces'

                //get all images ... and have images work with sentences
                //why: when viewing sentence, see image. so it is like tv show

                var h = {};

                function QuoteHelper() {
                    var self = this;
                    var p = this;
                    self.data = {}
                    //self.showWhenDone = true;

                    self.settings = {}

                    self.settings.showAllNounsWhenDone = true;

                    p.init = function init(par) {
                        self.data.par = par;
                        self.data.quotes = []
                        self.data.speakers = []
                        self.data.allNouns = {};
                        self.createNewSpeaker()
                    }
                    p.endQuoteForcily = function endQuoteForcily() {
                        self.data.par.data.quoteMode = false;

                        if (self.data.currentSpeaker.quotes.length == 0) {
                            self.createNewSpeaker(false)
                        }
                        if (self.data.currentSpeaker.items.length > 0) {
                            if (self.data.currentSpeaker.quotes.length == 0) {

                                self.createNewSpeaker(false)
                            } else {
                                self.createNewSpeaker()
                            }

                        }


                    }

                    p.addQuote = function addQuote(dictObj) {
                        self.lastQ = dictObj;
                        //self.data.quoteMode = false;
                        self.data.quotes.push(dictObj)

                        self.addToSpeaker(dictObj)
                    }

                    p.addNonQuote = function addNonQuote(dictObj) {
                        if (self.lastQ == dictObj) {
                            return;
                        }

                        var txt = dictObj.txt;
                        if (self.settings.collectAllNouns) {
                            var y = nlp_compromise.text(txt).nouns()
                            $.each(y, function addNoun(k, v) {
                                self.addPerson(v)
                                self.addPerson(v, true)
                            })
                        }

                        self.data.currentSpeaker.nonquotes.push(dictObj.txt)


                        //self.data.quoteMode = false;

                        // self.addToSpeaker(dictObj)
                    }
                    p.addPerson = function addPerson(nounItem, alt) {
                        var text = nounItem.text;
                        if (nounItem.tag == 'Value') {
                            return;
                        }
                        if (nounItem.tag == 'Value') {
                            return;
                        }
                        if (nounItem.text.includes('Moose  Malloy  had  left ')) {
                            debugger
                        }

                        //var words = text.split(' ')
                        var words = text.split(/(\s+)/).filter(function (e) {
                            return e.trim().length > 0;
                        });
                        text = words.join(' ')
                        //var words = text.split(/(\s+)/);
                        var secondWord = words[1]
                        if (u.isFirstLetterLowercase(secondWord)) {
                            //return; //must be capital
                            text = words[0]
                        } else {
                            if (u.isFirstLetterLowercase(words[2])) {
                                //return; //must be capital
                                text = words.slice(0, 2).join(' ')
                            }
                        }


                        var illegalEndings = ["'s", '.', ',', '?', '"', '!']
                        $.each(illegalEndings, function stripEnd(k, v) {
                            if (text.endsWith(v)) {
                                text = text.slice(0, v.length)
                            }
                        })


                        if (false == uiUtils.isUpperCase(text.slice(0, 1))) {
                            var isOk = false;
                            if (self.settings.presetNouns) {
                                $.each(self.settings.presetNouns, function checkBe(k, vPotPresetNoun) {
                                    if (text.startsWith(vPotPresetNoun)) {
                                        text = vPotPresetNoun
                                        isOk = true
                                        return false;
                                    }
                                })
                            }
                            if (isOk == false) {
                                return;
                            }
                        }

                        if (nounItem.text.includes('Moose  Malloy  had  left ')) {
                            debugger
                        }

                        self.addAs(text, nounItem, alt)

                        names = text.split(/(\s+)/).filter(function (e) {
                            return e.trim().length > 0;
                        });
                        if (alt == null && names.length > 1) {
                            var firstName = names[0]
                            self.addAs(firstName, nounItem)
                        }
                    }

                    p.addAs = function addAs(key, nounItem, alt) {
                        var dict = self.data.currentSpeaker.nouns
                        if (alt) {
                            dict = self.data.allNouns;
                        }
                        var item = dict[key];
                        if (item == null) {
                            item = nounItem;
                            item.simple = [nounItem.text, nounItem.tag].join('_')
                            item.count = 0
                        }
                        item.count++
                        dict[key] = item
                    }
                    p.addToSpeaker = function addToSpeaker(dictObj) {
                        if (self.data.currentSpeaker == null) {
                            self.createNewSpeaker()
                        }
                        self.data.currentSpeaker.items.push(dictObj)
                        self.data.currentSpeaker.quotes.push(dictObj.txt)
                    }
                    p.createNewSpeaker = function createNewSpeaker(isNew) {
                        if (isNew != false) {
                            var cs = self.data.currentSpeaker = {}
                        } else {
                            var cs = self.data.currentSpeaker
                        }

                        cs.quotes = [];
                        cs.items = [];
                        cs.nonquotes = []
                        cs.nouns = {}
                        cs.speaker = 'unknown'
                        if (isNew != false) {
                            self.data.speakers.push(cs)
                        }

                    }

                    p.showPrint = function showPrint() {
                        console.clear()
                        console.log('lll', self.data.speakers)
                        $.each(self.data.speakers, function on(k, v) {
                            k += 1;
                            k += '.'
                            console.log(k, v.speaker, v.quotes.join(''))
                            v.nouns2 = {};
                            $.each(v.nouns, function ok(k, v2) {
                                v.nouns2[k] = v2.count;
                            })
                            console.log('\t', v.nouns2)
                            if (v.nonquotes.length > 0)
                                console.log('\t', v.nonquotes.join(''))
                        })
                    }
                    p.showNouns = function showNouns() {
                        //console.clear()
                        console.log('lll', self.data.allNouns)
                        var count = 0
                        var count10 = 0;
                        var count5 = 0;
                        var countMoreThan2 = 0;
                        $.each(self.data.allNouns, function on(k, v) {
                            if (v.count > 10) {
                                count10++
                            }
                            if (v.count > 5) {
                                count5++
                            }
                            if (v.count < 3) {
                                countMoreThan2++
                            }
                            count++;
                        })
                        console.log('lll', count, countMoreThan2, count5, count10)
                    }

                    //AIzaSyA05kHVmkHmwHVpjr1F68Ijt63IBGY1xhQ
                    //015565869698212399731:dmvgtg5t-lm
                    /*
                     https://developers.google.com/apis-explorer/#s/customsearch/v1/search.cse.list?q=obama&cx=015565869698212399731%253Admvgtg5t-lm&_h=1&
                     https://developers.google.com/apis-explorer/#s/customsearch/v1/search.cse.list?q=obama&cx=015565869698212399731%253Admvgtg5t-lm&_h=1&
                     https://www.googleapis.com/customsearch/v1?q=obama&cx=015565869698212399731%3Admvgtg5t-lm&key=AIzaSyA05kHVmkHmwHVpjr1F68Ijt63IBGY1xhQ
                     https://www.googleapis.com/customsearch/v1?key=YOUR API KEY&cx=YOUR CUSTOM SEARCH ENGINE IDENTIFIER&q=your query&searchType=Image
                     https://www.googleapis.com/customsearch/v1?key=AIzaSyAXmKONMogHUQ3r8Kn-xnxF62JUQAcFmm0&cx=015565869698212399731:dmvgtg5t-lm&q=your query&searchType=Image
                     */
                }

                h.quote = new QuoteHelper();
                h.quote.init(self);
                //h.quote.settings.collectAllNouns = true;
                h.quote.settings.presetNouns = ['barman']

                h.data = {};
                h.data.timeDate = new Date();
                h.debug = {};
                h.debug.displayQuotes = false;
                h.data.debugSpanWith$ = false;
                //h.data.debugWithOpacity = true;
                //h.data.debugWithColor = true;
                h.data.debugQuotes = true;
                h.data.colorizeBackgrounds = false;
                h.data.colorizeBackgrounds = true;

                if (self.data.colorizeBackgrounds != null) {
                    h.data.colorizeBackgrounds =
                        self.data.colorizeBackgrounds;
                    asdf.g
                }

                h.data.debugAddingSentences = true;
                h.data.debugAddingSentences = false;
                h.data.debugAddingSentencesHeavy = false

                h.data.debugStopWhenAddingSentence = ' Michelle, 1959-The Executive guide to e-mail correspondence : including model letters for every sit'

                h.settings = {};
                h.settings.debugSpans = false;
                h.currentSentence = '';
                h.sentences = [];
                h.dictSentences = {};
                h.dictSentences2 = {};
                h.currentSpans = {};
                h.images = [];

                h.addSentence = function addSentence(str, ui, why) {
                    return;
                    h.sentences.push(str)
                    h.dictSentences[h.sentences.length - 1] = {txt: str, ui: ui, why: why};
                    h.currentSentence = '';
                }
                h.addSentence2 = function addSentence(str, _parent, why, child) {
                    if (h.lastExUIWasLink) {
                        h.lastExUIWasLink = false;
                        h.addSentence2('', null, 'lastExUIWasLink'); //why did this have to be placed here to split the link?
                    }
                    if (str.includes('jeromeeti')) {
                        //  debugger
                    }

                    //debugger;
                    var currentSentence = h.currentSentence + str;

                    currentSentence = currentSentence.trim()
                    if (currentSentence.trim() == '') {
                        return; //skip empty sentence
                    }
                    if (currentSentence.includes('INCREASING  ')) {
//                        debugger
                    }
                    /*if (currentSentence.includes('argon.js')) {
                     debugger
                     }*/
                    if (currentSentence.includes('jeromeeti')) {
                        //   debugger
                    }

                    //there are two modes. post hoc, and a-pro-pro
                    if (str != '') {
                        h.sentences.push(currentSentence); //if not first time add
                    } else { //why: special mode end sentence if there is one (fragment)
                        var hasSentenceBeenAdded = false;

                        var lastAddedObj = h.dictSentences2[h.sentences.length - 1]
                        var lastAddedSentence = '';
                        if (lastAddedObj == null) {
                        } else {
                            hasSentenceBeenAdded = h.currentSentence.indexOf(lastAddedObj.txt) != -1
                        }

                        //close last sentence

                        if (hasSentenceBeenAdded) {
                            if (h.data.debugAddingSentencesHeavy) {
                                console.debug('   ---', hasSentenceBeenAdded, currentSentence, why, 'close last sentence')
                            }
                            return;
                        } else {
                            h.sentences.push(currentSentence);
                            if (h.data.debugAddingSentencesHeavy) {
                                console.debug('<<<', hasSentenceBeenAdded, currentSentence, why, 'close last sentence')
                                console.debug("\t", '<<<', h.currentSentence) //, currentSentence, why, 'close last sentence')
                            }
                            // return;
                        }

                        if (hasSentenceBeenAdded) {
                            h.currentSentence = ''; //refresh
                            h.currentSpans = {};
                            return;
                        } else {
                            //update last sentence
                        }
                    }
                    var dictObj = {
                        txt: h.currentSentence + str,
                        ui: _parent, why: why,
                        spans: h.currentSpans,
                        images: h.images
                    };


                    var quotesSplit = dictObj.txt.split('"')
                    var qqCount = quotesSplit.length - 1;
                    //console.debug('dictObj.txt.split(")', qCount)
                    var startedInAQuote = self.data.quoteMode;


                    var brokenQuote_EndButNot = false;
                    var startAndEndAQuote = false;

                    if (qqCount == 1 /*&&
                     dictObj.txt.includes('"')*/) {
                        //  debugger
                        self.data.quoteMode = !self.data.quoteMode;
                        if (self.data.quoteMode) {
                            h.quote.addQuote(dictObj)
                            self.data.quoteModeCounter++;
                        } else {

                        }

                        //handle te case were xxx What happen?" said mark
                        var firstSection = quotesSplit[0]
                        if (startedInAQuote == false &&
                            qqCount == 1 && firstSection.length > 1
                            && firstSection.endsWith(' ') == false) {
                            brokenQuote_EndButNot = true;
                            // h.quote.addQuote(dictObj)
                            // debugger
                            startAndEndAQuote = true
                            self.data.quoteMode = false;
                        }
                        //TODO, if in quote and see start quoate .. then the quote neve rended
                    }

                    //debugQuotes

                    /*if ( dictObj.txt.toLowerCase().indexOf("once you") != -1 ) {
                     debugger;
                     }
                     if ( dictObj.txt.toLowerCase().indexOf("but not a good fit") != -1 ) {
                     debugger;
                     }*/
                    if (currentSentence.toLowerCase().includes("says?")) {
                        //  debugger;
                    }

                    h.dictSentences2[h.sentences.length - 1] = dictObj;
                    var span = $('<span >' + str + '</span>');

                    if (h.data.debugWithOpacity) {
                        span.css({opacity: '0.2'});
                    }
                    if (self.data.quoteMode || startedInAQuote || startAndEndAQuote) {
                        if (h.data.debugQuotes) {
                            span.css({'border-bottom': 'solid orange 2px'});
                        }
                        if (self.data.quoteMode || startedInAQuote) {
                            dictObj.quoteMode = true;
                        }
                    }
                    if (qqCount == 2) {
                        if (h.data.debugQuotes) {
                            span.css({'border-bottom': 'solid orange 4px'});
                        }
                        h.quote.addQuote(dictObj)
                    }
                    if (h.data.debugQuotes && brokenQuote_EndButNot) {
                        span.css({'border-right': 'solid red 4px'});
                    }

                    if (h.data.debugWithColor) {
                        span.css({color: 'red'});
                    }

                    if (h.data.debugAddingSentences) {
                        console.debug(currentSentence, why)
                        if (h.data.debugStopWhenAddingSentence) {
                            var index = currentSentence.toLowerCase().indexOf(
                                h.data.debugStopWhenAddingSentence.toLowerCase());
                            if (index != -1) {
                                console.debug('got sentence like', h.data.debugStopWhenAddingSentence)
                                debugger;
                            }

                        }
                    }

                    if (self.data.quoteMode == false)
                        h.quote.addNonQuote(dictObj)

                    // dictObj[str]=span;

                    if (str != '') {
                        h.currentSpans[str] = (span);
                        _parent.append(span); //add to div
                    }

                    h.currentSentence = ''; //refresh
                    h.currentSpans = {};
                    h.images = [];
                    self.lastObj = dictObj;
                }


                h.addSentence2Fragment = function addSentence2Fragment(str, _parent, why) {
                    //create span, add to currentSpans to track sentence fragement
                    var span = $('<span>' + str + '</span>');
                    span = $('<span />')
                    span.text(str) //try to put '<scritp> in tag it will fail
                    if (h.data.debugWithOpacity) {
                        span.css({opacity: '0.2'});
                    }
                    if (h.data.debugWithColor) {
                        span.css({color: 'blue'});
                    }
                    if (h.data.debugAddingSentences) {
                        console.debug('add fragment', str, h.currentSpans)
                    }

                    //if (  ) { //add sentence if starts with capital ... or add to previous sentence
                    //issue: this might be a full sentence (1 span had mutlipel sentences)
                    //in other method, handle scenairo where sentence is added as fragment
                    //}
                    _parent.append(span); //add to div
                    h.currentSpans[str] = (span);
                    if (str.includes('jeromeeti')) {
                        //debugger
                    }

                    if (str.includes('.')
                        && str.includes('/')) {
                        str = str.replace(str, 'http://', '')
                        str = str.replace(str, 'https://', '')

                        console.error('link', str)
                        str = str.split('/')[0]


                        //  debugger
                        if (str.length > 25) {
                            str = str.slice(20)
                            //  debugger
                        }
                        str = str.split('.').join(' dot ')
                        str = "link " + str
                    }

                    h.currentSentence += str;
                }


                h.colorizeSentences = function colorizeSentences() {
                    if (h.data.colorizeBackgrounds == false) {
                        return;
                    }
                    var ic = 0
                    $.each(h.dictSentences2, function processChar(i, dictObj) {
                        //var color =
                        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                        var colors = ['FFC619', '14CCA0', 'a94442']
                        ic++;
                        if (ic > colors.length - 1) {
                            ic = 0;
                        }
                        randomColor = colors[ic]

                        randomColor = '#' + randomColor

                        function hexToRgb(hex) {
                            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? {
                                r: parseInt(result[1], 16),
                                g: parseInt(result[2], 16),
                                b: parseInt(result[3], 16)
                            } : null;
                        }

                        var o = hexToRgb(randomColor)
                        var p = [o.r, o.g, o.b, 0.3].join(', ')
                        //  alert( hexToRgb("#0033ff").g );

                        randomColor = 'rgba' + sh.paren(p)
                        //rgba(54, 25, 25, .5);

                        // debugger
                        $.each(dictObj.spans, function processChar(y, span) {
                            //span.css({'color': randomColor})
                            //debugger
                            $(span).css('background-color', randomColor)
                            //  $(span).text('asdf')
                        });
                        //debugger
                        //console.log(2,'colorize', i, dictObj)
                    });

                }

                h.utils = {};
                h.utils.removeOddChars = function removeOddChars(str, b, c) {
                    str = str.replace(/”/gi, "\"");
                    str = str.replace(/“/gi, "\"");
                    str = str.replace(/“/gi, "\"");
                    str = str.replace(/”/gi, "\"");

                    return str;
                }
                h.utils.splitIntoSentencesSafe = function splitIntoSentencesSafe(str, _parent, child) {
                    /*    function isUpperCase(char) {
                     if (char == null) {
                     return null
                     }
                     if (char == char.toUpperCase()) {
                     return true
                     }
                     return false;
                     }*/

                    // debugger
                    var sentences = [];
                    var currentSentence = ''
                    //currentSentence = h.currentSentence;
                    str = str.replace(/\n/gi, '');
                    str = h.utils.removeOddChars(str)
                    var endAt = null;
                    var strArr = [];
                    for (var i = 0; i < str.length; i++) {
                        strArr.push(str[i]);
                    }


                    var validSentenceEndings = ['. ', '! ', '? ', '" ',
                        '",', ' "', '")']; //do not split numbers

                    var invalidSentenceStrs = ['Dr', 'St', 'Mr', 'Mrs', 'Ms'];
                    //check based on length of char
                    var prevStr = '';
                    var lastWord = '';
                    $.each(strArr, function processChar(i, char) {
                        var nextChar = str[i + 1]
                        var nextChar2 = str[i + 2]

                        var last2Chars = prevStr.slice(-2)
                        prevStr += char;

                        if (char == ' ') {
                            if (lastWord.toLowerCase() == 'three.js') {
                                //debugger
                            }
                            if (lastWord.toLowerCase().slice(-3) == '.js') {
                                //debugger
                                function insert(str, index, value) {
                                    return str.substr(0, index) + value + str.substr(index);
                                }

                                function replaceCharAtIndex(str, index, value) {
                                    return str.substr(0, index - 1) + value + str.substr(index);
                                }

                                function replaceCharAtIndex(str, index, value) {
                                    return str.substr(0, index - 2) + value + str.substr(index - 1);
                                }

                                /*
                                 currentSentence =
                                 replaceCharAtIndex(currentSentence,
                                 currentSentence.length - 2, ' ')
                                 */
                            }

                            // console.log('lastWord', lastWord)
                            lastWord = '';
                        } else {
                            lastWord += char;
                        }


                        var nextChar2IsUppercase = u.isUpperCase(nextChar2)
                        var join = char + nextChar;


                        // console.log(last2Chars, prevStr )
                        //bookmark.where are special cases handled
                        $.each(validSentenceEndings, function compareForEndSent(k, v) {
                            if (v == join) {

                                if (nextChar2IsUppercase == false && v == '. ') {
                                    // debugger
                                    return; //skip e.g. markio
                                }
                                if (invalidSentenceStrs.includes(last2Chars)) {
                                    return; //skip Dr. Morton , and Syncamore St. Cerryaldn Va
                                }
                                endAt = v;
                                return false;
                            }
                        })
                        currentSentence += char

                        /* if ( endAt != null ) {
                         currentSentence += nextChar
                         }*/
                        if (nextChar == ' ') {
                            currentSentence += ' ' //ensure whitespac ie maintained between sentences
                        }

                        if (i == strArr.length - 1) {

                            //console.log('...', currentSentence);
                            // debugger;

                            $.each(validSentenceEndings, function compareForEndSent(k, validEndingStrs) {
                                //debugger;
                                if (validEndingStrs.charAt(0) == char) {
                                    //  debugger;
                                    endAt = char; //this is a valid sentence
                                    return false;
                                }
                            })
                        }
                        if (endAt) {
                            sentences.push(currentSentence);
                            if (h.lastParent == null) {
                                h.lastParent = [];
                            }
                            h.addSentence(currentSentence, h.lastParent[0], 'split inside sentence')

                            h.addSentence2(currentSentence,
                                _parent, '',
                                child
                            )
                            currentSentence = ''
                            endAt = null;
                        }
                    });
                    if (currentSentence != '') {
                        sentences.push(currentSentence)
                        h.addSentence2Fragment(currentSentence,
                            _parent
                        )

                    }
                    var addSpanAgain = false;
                    if (h && addSpanAgain) {
                        //every sentence
                        $.each(sentences, function addSpansToArea(i, sentence) {
                            var span = $('<span>' + sentence + '</span>')
                            if (h.data.debugWithOpacity) {
                                span.css({opacity: '0.2'});
                            }
                            if (h.data.debugWithColor) {
                                span.css({color: 'green'});
                            }
                            //asdf.g
                            _parent.append(span)
                        });

                        // $(parent).html(sentences.join('---'))
                    }
                    // sdfg.h
                    //debugger
                    self.data.currentSentences = h;
                    h.currentIndex = 0;
                    return sentences;
                }


                h.utils.getQuotes = function getQuotes(sentences) {
                    var quotes = [];
                    var str = sentences.join(' ');
                    var strArr = [];
                    for (var i = 0; i < str.length; i++) {
                        strArr.push(str[i]);
                    }


                    try {
                        //console.clear();
                    } catch (e) {
                        console.error('no clear console')
                    }
                    var currentQuote = '';
                    var inQuote = false;
                    //TODO: Get context around quote ...
                    $.each(strArr, function processChar(i, char) {
                        var nextChar = str[i + 1]
                        if (char == '"') {
                            inQuote = !inQuote;
                        }
                        if (char == '“') {
                            inQuote = true
                        }
                        if (char == '”') {
                            inQuote = false
                        }
                        if (inQuote) {
                            currentQuote += char;
                        } else {
                            if (currentQuote != '') {
                                quotes.push(currentQuote);
                                currentQuote = ''
                            }
                        }
                        //debugger;
                    });
                    if (h.debug.displayQuotes) {
                        console.debug('quotes', quotes.length, quotes)
                    }
                    return;
                }


                function getChild(parent_, tab) {

                    var skipTagTypes = ['HEAD', 'SCRIPT', 'META', 'STYLE', 'NOSCRIPT', '#comment', 'TITLE']
                    //skipTagTypes = []
                    if (tab == null) tab = '';

                    var children = $(parent_).children('*')
                    var children = $(parent_).children('*')
                    var children = $(parent_).contents()

                    $.each(children, function process(i, child) {

                            var childOrig = child;
                            var ui = $(child)
                            if (ui.hasClass('doNotReadComp')) {
                                return;
                            }

                            /*

                             if (h.lastExUIWasLink) {
                             h.addSentence2('', null, 'lastExUIWasLink')
                             h.lastExUIWasLink = false;
                             }
                             */

                            //debugger

                            //why: debug ba d node types
                            //console.error('adding ' +  tab +  child.nodeName)
                            var nodeType = child.nodeName;
                            if (skipTagTypes.indexOf(nodeType) != -1) {
                                return;
                            }
                            var tagTypesVisibleCheck = ['SPAN', 'DIV']
                            if (tagTypesVisibleCheck.indexOf(nodeType) != -1
                                && $(child).is(':visible') == false) {
                                //console.error('skipping', child, $(child).is(':visible'))
                                return;
                            }
                            if (child.nodeName == 'PRE') {
                                console.error('skip PRE', child)
                                return;
                            }
                            if (child.nodeName == 'HEADER') {
                                console.error('skip header', child)
                                //return;
                            }
                            if (child.nodeName == 'SECTION') {
                                console.error('skip SECTION', child)
                                //share-widgget
                                //data-tweet
                                //return;
                                // return;
                            }
                            if (child.nodeName == 'DIV') {
                                var widget = false;
                                var recommended = false;

                                self.utils.elementHasClassLike = function elementHasClassLike(element, txt) {
                                    if (element.length > 0)
                                        element = element[0]
                                    txt = txt.toLowerCase();
                                    var widget = false
                                    $.each(element.classList, function goTC(k, v) {
                                        if (v.toLowerCase().indexOf(txt) != -1)
                                            widget = true;

                                    });
                                    return widget;
                                }
                                var commentWidget = self.utils.elementHasClassLike(child, 'comments')
                                $.each(child.classList, function goTC(k, v) {
                                    if (v.indexOf('widget') != -1)
                                        widget = true;
                                    if (v.indexOf('recommended') != -1)
                                        recommended = true;

                                });
                                if (widget && commentWidget == false) {
                                    console.error('skip DIV', 'is a widget', child)
                                    return;
                                }
                                //share-widgget
                                //data-tweet
                                //return;
                            }

                            if (child.nodeName == 'LI') {
                                h.addSentence2('', null, 'list tag')
                            }


                            var headingLike = false;

                            var tagsHeading = ['h1', 'h2', 'h3', 'h4']
                            $.each(tagsHeading, function on(k, tag) {
                                if ($(child).is(tag)) {
                                    headingLike = true;
                                }
                            })

                            /*     function hardBreakQuote() {
                             var breakingLine = false;
                             var tagsHeading = ['p', 'div', 'br']
                             $.each(tagsHeading, function on(k, tag) {
                             if ($(child).is(tag)) {
                             breakingLine = true;
                             }
                             })
                             if ( breakingLine ) {
                             self.data.quoteMode_HardBreakQuote = true;
                             }
                             }*/


                            //console.warn('addingX ' +  tab +  child.nodeName,child )
                            // debugger;
                            //console.warn('addingX ' +  tab +  child.nodeName,child )
                            if (child.type == 'text') {
                                child.nodeName = '#text'
                                // debugger;
                            }
                            var clearNodeText = false;
                            if ($.isString(child) || child.nodeName == '#text') {
                                var nodeTxt = child.nodeValue;
                                if (child.nodeValue.trim() != '') {
                                    if (h.settings.debugSpans)
                                        console.log('', child, parent_)
                                    var txt = child.nodeValue;

                                    if (self.data.fxFilterSpeakSentences) {
                                        var result_InclusionCheck = self.data.fxFilterSpeakSentences(txt, child)
                                        if (result_InclusionCheck == false) {
                                            return;
                                        }
                                    }
                                    //$(child).wrapInner('<span class="addIn">');
                                    //debugger
                                    //var span = document.createElement('span');


                                    var span = $('<spanj/>')


                                    //  debugger
                                    //  parent_[0].insertBefore(span, child);
                                    //parent_[0]
                                    //parent_.insertBefore(span, child)
                                    //span.text(child.nodeValue)
                                    //span.css('color', 'red')
                                    //  parent_.insertBefore(span)

                                    // console.log('index', i, $(child).index(), ui.index(), parent_.index())
                                    // $(child).replaceWith(span)
                                    //span.insertBefore(ui) //attempt 2: why is ui wrong?
                                    // span.text(child.nodeValue)
                                    parent_.append(span)
                                    //debugger;
                                    //span.append(child); //wrap in span

                                    //return false;
                                    var splitSentences = h.utils.splitIntoSentencesSafe(txt, span)
                                    if (splitSentences.length > 0 && h.settings.debugSpans) {
                                        console.log('sentences', splitSentences)
                                    }

                                    //console.error('addingX ' +  tab +  child.nodeName +  $(child).is(':visible') ,
                                    //    child , splitSentences)

                                    child.nodeValue = '';
                                    /*child.nodeValue = '';
                                     //child.nodeValue = '';
                                     if (child.data) {
                                     child.data = '';
                                     }*/
                                    clearNodeText = true
                                    //$(child).text('booty')
                                    if (h.data.debugSpanWith$)
                                        child.nodeValue = '$'; //clear content of nodes
                                    //h.currentSentence += txt;

                                    h.lastParent = parent_
                                } else {
                                    if (nodeTxt == "\n" &&
                                        h.currentSentence.trim().length > 0)
                                        h.addSentence(h.currentSentence, h.lastParent[0], 'new line')
                                }

                            }

                            //else if (child.nodeName == 'IMG') {
                            //console.log('..', child)
                            //    //TODO: addImageToCurrentDictionaryObject
                            // }
                            else if ($(child).is('img')) {
                                //debugger;
                                h.images.push(child);
                            }
                            else if ($(child).is('p')) {
                                //new sentence
                                h.addSentence2('', null, 'p');
                                h.quote.endQuoteForcily('p is breaking')
                            }
                            else if ($(child).is('br') || headingLike) {
                                //new sentence
                                h.addSentence2('', null, 'br tag like')
                                h.quote.endQuoteForcily('n is breaking')
                            }
                            else if ($(child).is('a')) {
                                h.addSentence2('', null, 'link')
                                h.lastExUIWasLink = true;
                            }
                            else {
                                // console.log('raw',child.nodeName, child)
                            }
                            /*else { //} ( child.nodeName == 'img') {
                             console.log('..', child)
                             }*/

                            //  console.log('raw',child)


                            var child = $(child)
                            tab = tab + "\t"
                            getChild(child, tab)

                            if (clearNodeText) {
                                $(childOrig).text('bpusdf')

                                //  asdf.g
                            }

                        }
                    )
                }

                getChild(parent)


                h.colorizeSentences();
                h.utils.getQuotes(h.sentences)
                window.h = h;


                if (h.currentSentence && h.currentSentence.length > 0) {
                    h.addSentence2('', null, 'last piece of sentence')
                }


                // debugger; //what is the last sentence? ...
                /*
                 console.log('display helper', window.h)
                 if (h.quote.showWhenDone) {
                 h.quote.showPrint()
                 }
                 if (h.quote.settings.showAllNounsWhenDone) {
                 h.quote.showNouns()
                 }

                 */
                var dirStore = sh.fs.trash('bookCvert')
                sh.fs.mkdirp(dirStore)
                var fileOutput = sh.fs.join(dirStore, 'test.html')
                sh.writeFile(fileOutput, $.html())
                console.log('took', u.secs(h.data.timeDate))

                var ReloadWatcher = require('./ReloaderWatcher.js').ReloadWatcher;
                ReloadWatcher.reloadFile('bookCvert')
                // debugger
                return;

            }
        }

        defineUtils();

        function defineNLP() {
            p.utils.nlp = function nlp(sentence) {

                var nlp = require('compromise')

                var doc = nlp('London is calling')
                doc.sentences().toNegative()
// 'London is not calling'
                asdf.g
                if (window.nlp_compromise == null) {
                    console.log('no nlp')
                    return;
                }
                var y = nlp_compromise.text(sentence).nouns()

                var values = []
                $.each(y, function filterFor(k, v) {
                    v.url = 'https://www.google.com/webhp?#q=' + v.text;
                    if (v.text.slice(0, 1).toUpperCase() !=
                        v.text.slice(0, 1)) {
                        return;
                    }
                    /*  v.urlImage =  "https://www.googleapis.com/customsearch/v1?q="+ v.text +
                     "&cx=015565869698212399731%3Admvgtg5t-lm&key=AIzaSyA05kHVmkHmwHVpjr1F68Ijt63IBGY1xhQ"*/
                    values.push(v);
                })

                y = values;


                $('#col2_words').html('' +
                    '' +
                    '<div id="listWords">' +

                    '<input class="search" placeholder="Search" />' +
                    '<button class="sort" data-sort="name">' +
                    'Sort' +
                    '</button>' +

                    '<ul class="list searchList"></ul>' +

                    '</div>')

                var options = {
                    valueNames: ['tag', 'text',
                        {name: 'url', attr: 'href'},
                        {name: 'urlImage', attr: 'src'},
                    ],
                    item: '<li style="padding:5px;">' +

                    '<span class="text"></span> ' +
                    '(<span class="tag"></span>) ' +
                    '<a href="http://javve.com" target="_blank" class="link url"><span class="glyphicon glyphicon-search"></span></a>' +
                    // '<p class="born"></p>' +
                    '<img style="max-height:50px" class="urlImage"></img>' +
                    '</li>'
                };


                if (values.length != 0) {
                    var userList = new List('listWords', options, values);
                }


            }
        }

        defineNLP()

        function defineSpeakHelper() {
            var speakHelper = {};
            p.speakHelper = speakHelper


            speakHelper.tts = function tts(cfgSpk) {

                if ($.isString(cfgSpk)) {
                    cfgSpk = {txt: cfgSpk}
                }

                var txt, fxDone, rate, cacheRequest
                var txt = cfgSpk.txt;
                var fxDone = cfgSpk.fxDone;
                var rate = cfgSpk.rate;
                var cacheRequest = cfgSpk.cacheRequest;
                //var quote = cfg.quote;

                var curId = self.currentId;

                //debugger;
                var sentence = txt;

                if (self.rate == null) {
                    self.rate = $('#inputRate').val()
                }


                if (self.voice == null) {
                    self.voice = 'IVONA 2 Brian'
                }

                //var rate = 7
                var voice = null;
                if (voice == null) {
                    voice = 'IVONA 2 Kendra';
                    voice = 'IVONA 2 Brian';
                    voice = self.voice;
                }
                // debugger
                console.log('trim', sentence.trim().endsWith('reply'), sentence)
                if (sentence.trim().endsWith('reply')) {
                    if (self.voice == 'IVONA 2 Brian') {
                        //self.voice = 'IVONA 2 Joey'
                        self.voice = 'IVONA 2 Kendra';
                    } else {
                        self.voice = 'IVONA 2 Brian'
                    }
                    // voice = self.voice
                    sentence = sentence.trim().slice(-5)
                    sentence += 'end comment.'
                }

                var removeBulletLikeIcons = true;
                if (removeBulletLikeIcons) {
                    sentence = sentence.replace('', '')
                    sentence = sentence.replace('', '')
                }
                window.lastSentenceRead = sentence;
                //replace UX UI ' '''
                sentence = sentence.replace(/’/gi, "'");
                sentence = sentence.replace(/‘/gi, "'");
                sentence = sentence.replace(/”/gi, "\"");
                sentence = sentence.replace(/“/gi, "\"");
                //clear hash . a "e a-yah"
                // sentence = sentence.replace(/\.'/gi, "");
                //sentence = sentence.replace(/\."/gi, "");
                sentence = sentence.replace(/—/gi, "-");
                sentence = sentence.replace(/\./gi, ".");
                sentence = sentence.replace(/\./gi, ".");

                sentence = sentence.replace(/ TIL /g, "Today I Learned");

                sentence = sentence.replace(/github/gi, "get hub");


                var sentenceChars = Array.from(sentence)
                var stripStr = [];
                $.each(sentenceChars, function showhs(k, v) {
                    var charCode = v.charCodeAt(0)
                    //console.log('ch-', k, '-'+v+'-',charCode)
                    if (charCode == 8200) { //'eh
                        return
                    }
                    if (charCode == 160) { //dot
                        v = ' '
                    }
                    stripStr.push(v)
                })
                stripStr = stripStr.join('')
                sentence = stripStr;
                sentence = sentence.trim();

                if (sentence.startsWith('"') && sentence.endsWith('"')) {
                    voice = 'IVONA 2 Kendra'
                }
                if (cfgSpk.quote) {
                    voice = 'IVONA 2 Kendra'
                }

                sentence = removeDiacritics(sentence);

                console.log('trim', sentence.trim().endsWith('reply'), sentence)
                if (sentence.length == '') {
                    u.cid(fxDone);
                    return;
                }
                //self.voice = voice;
                var speakOnce = false
                //var date = new Date();

                var rate = self.rate;
                if (cfgSpk.isHeading) {
                    rate = rate * 0.6
                    sentence = 'New Section.' +
                        ' ' + sentence

                    var beepSound = 'zzz beep zzz'
                    window.speak(beepSound, null, {text: beepSound})
                }

                var cfg = {
                    text: sentence,
                    rate: rate,
                    playAudio: true,
                    volume: 25,
                    voice: voice,
                    fx: function onSpoken(result) {
                        if (curId != self.currentId) {
                            return;
                        }
                        //var endDate = new Date();
                        //  console.log('total time', (endDate.getTime()-date.getTime())/1000);
                        fxDone();
                    },
                    speakOnce: speakOnce
                    //voice:'IVONA 2 Gwyneth'
                }

                window.speak(sentence, null, cfg)
                return;


            }
        }

        defineSpeakHelper();
    }

    window.SentenceHelper = SentenceHelper


    function initSpeaker() {
        // debugger
        console.log("starting speaker");
        var t = new SentenceHelper();
        window.sentenceHelper = t
        t.setupSentences();
    }

    if (true == true) {
        String.prototype.replaceX = function replace(find, replaceWith) {
            function escapeRegExp(string) {
                if (string == null)
                    return null;
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            }


            // So in order to make the replaceAll function above safer, it could be modified to the following if you also include escapeRegExp:

            // function replaceAll(string, find, replace) {
            if (this == null)
                return null;
            if (this.replace == null)
                return null;
            return this.replace(new RegExp(escapeRegExp(find), 'g'), replaceWith);
        }
        initSpeaker()

    }


    // initSpeakerControls()
}

console.log('loaded file speakHTMLTest_Cleaned.js')


//window.fxHtmlSpeaker();

