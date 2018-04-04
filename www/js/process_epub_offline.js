window = {};
var cheerio = require('cheerio');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
//var nlp = require('compromise')

//var doc = nlp('London is calling')
var TOES = require('./processEpub/testOverrideRuleSet.js')
var OverrideEpubRuleSet = TOES.OverrideEpubRuleSet;
var OverrideEpubRuleSet_Container = TOES.OverrideEpubRuleSet_Container;

$ = null;
u = null;
function upgradeShelpers() {
    sh.str.normSpaces = function normSpaces(str) {
        str2 = str.replace(/\s\s+/g, ' ');
        return str2
    }

    sh.str.splitSentenceOnWord = function splitSentenceOnWord(str, wrod) {
        str = str.split('  ').join(' ')
        var str2 = str.replace(new RegExp('\\b' + wrod + "\\b", "gi"), "aaaa");
        var dbg = true
        if (dbg) {
            console.log(str)
            console.log(str2)
        }
        var splitStr = str.split(new RegExp('\\b' + wrod + "\\b", "gi"))
        if (dbg) {
            console.log(splitStr)
        }
        return splitStr;
    }
}
upgradeShelpers()


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

        /* if (self.data.lastSpeaker)
         var yyy = self.data.lastSpeaker.speaker
         var prevLastSpeaker = self.data.lastSpeaker;*/

        self.data.lastSpeaker = self.data.currentSpeaker;
        if (self.data.currentSpeaker.speaker == 'unknown' /*&& prevLastSpeaker*/) {
            var prevLastSpeaker2 = self.data.speakers.slice(-3)[0]
            if (prevLastSpeaker2 && prevLastSpeaker2.speaker != 'unknown') {
                self.data.currentSpeaker.speaker = prevLastSpeaker2.speaker;
                self.data.currentSpeaker.speaker.questionable = true;

                /*     if ( self.data.currentSpeaker.items.length > 0 ) {
                 var spans = self.data.currentSpeaker.items[0].spans;
                 var last = null;
                 sh.each(spans, function ok(k,v) {
                 last = v
                 })

                 if ( last ) {
                 last.append('77777777777777777777')
                 debugger
                 }
                 }*/
            }
            // debugger;
        } else {

        }

        if (self.data.currentSpeaker.items.length > 0) {
            return;
            /*var spans = self.data.currentSpeaker.items.slice(-1)[0];
             spans = spans.spans; //.spans;
             var last = null;
             sh.each(spans, function ok(k, v) {
             last = v
             // return false;
             })
             */
            var spans = self.data.currentSpeaker.items;
            var last = null;
            sh.each(spans, function ok(k, v) {
                last = v
            })
            if (last) {

                /* if ( last.children.length  > 0 ) {
                 last =  last.last()
                 }*/
                /*     uiUtils.addFloatingDiv = function addFl(holder2, txt) {
                 var holder = u.tag('span')
                 holder.css('background-color', 'brown')
                 holder.text(txt)
                 holder.css('position', 'relative')
                 holder.css('display', 'inline-block')


                 var div = u.tag('div')
                 holder.append(div)
                 div.css('right', '0px')
                 div.text(txt)

                 //div.css('background-color', 'gray')
                 u.styleDialog();
                 u.padding(5)
                 // if (nouns.length > 0) {
                 holder2.append(holder) //.
                 // }

                 return div;
                 }
                 */

                uiUtils.addFloatingDivLeft = function addFl(holder2, txt) {
                    var div = u.tag('div')
                    // holder.append(div)
                    div.css('right', '0px')
                    // div.css('right', '20px')
                    div.text(txt)

                    div.css('margin-left', '70%')
                    div.css('margin-top', '-20px')
                    // div.css('background-color', 'gray')
                    // u.styleDialog();
                    u.padding(5)
                    // if (nouns.length > 0) {
                    holder2.ui.append(div) //.
                    uiUtils.bg('#1E90FF', d, 0.3)
                    return div;
                }

                var txtToAdd = sh.paren('spk:' + self.data.currentSpeaker.speaker);
                var d = uiUtils.addFloatingDivLeft(last, txtToAdd)
                //  uiUtils.bg( '#1E90FF', d, 0.3)


                // last.append(' ' + sh.paren('spk:' + self.data.currentSpeaker.speaker))
                //debugger
            } else {
                debugger
            }
        }

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
        self.data.quotes.push(dictObj);
        if (dictObj.txt.includes('Sugar King')) {
            asdf.g
        }
        dictObj.isQuote = true;
        self.addToSpeaker(dictObj)
    }

    p.addSpeakerName = function addSpeakerName(currentSentence) {
        var proc_currentSentence = currentSentence.replace(',', '')
        //var y = nlp(proc_currentSentence)
        var nouns = GetNouns2(proc_currentSentence)
        //debugger
        //self.lastObj.speaker
        if (self.data.currentSpeaker) {
            if (self.data.currentSpeaker.speaker.includes('reassur')) {
                asdf.g
            }
            if (self.data.currentSpeaker.speaker == 'unknown') {
                self.data.currentSpeaker.speaker = nouns[0]
                if (nouns.length == 0) {
                    self.data.currentSpeaker.speaker = proc_currentSentence.split(' ')[0]
                }
            }
        }
    }

    p.getNouns = function getNouns(dictObj) {
        var currentSentence = dictObj.txt;
        var proc_currentSentence = currentSentence.replace(',', '')
///        var y = nlp(proc_currentSentence)
        // var nouns = y.nouns().out('array')
        //  var nouns = y.topics().out('array')

        var nouns = GetNouns2(dictObj.txt)
        if (currentSentence.includes('reassured')) {
            // var dbg  =   uiUtils.lastTaggedWords
            //   debugger
            // nouns = nouns2;
        }

        dictObj.nouns = nouns;
        self.data.nouns = sh.dv(self.data.nouns, [])
        self.data.nouns = self.data.nouns.concat(nouns)//;)
        if (nouns.length > 0) {
            //asdf.g
        }

        sh.spltiIntoWords = function splitINtowords(str) {
            return str.split(' ')
        }
        var words = sh.spltiIntoWords(proc_currentSentence)

        var properNouns = [];
        sh.each(words, function findREalWrods(k, v) {
            if (sh.str.isFirstLetterCapitalized(v)) {
                properNouns.push(v)
            }
        })

        nouns = nouns.concat(properNouns);

        var last = null
        $.each(dictObj.spans, function k(k, v) {
            last = v;
            return false;
        });

        var holder = u.tag('div')
        holder.css('position', 'relative')
        holder.css('display', 'inline-block')
        var div = u.tag('div')
        holder.append(div)
        div.css('right', '0px')
        div.text(nouns.join(', '))
        //div.css('background-color', 'gray')
        u.styleDialog();
        u.padding(5)
        var showStuff = false
        if (showStuff && nouns.length > 0) {
            last.append(holder) //.
        }
        //debugger
        return;

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
        dictObj.speaker = self.data.currentSpeaker
        self.data.currentSpeaker.items.push(dictObj)
        self.data.currentSpeaker.quotes.push(dictObj.txt)
    }
    p.createNewSpeaker = function createNewSpeaker(isNew) {

        if (isNew != false) {
            self.data.lastSpeaker = self.data.currentSpeaker
            var cs = self.data.currentSpeaker = {}
            //self.data.lastSpeaker = self.data.currentSpeaker;
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

function STBlockParser() {
    var p = STBlockParser.prototype;
    var self = this;


    self.data = {};

    p.init = function init() {
    }


    self.data.gSpeakers = [];
    self.data.dictGlobalSpeakers = {}
    self.brokenLink = false
    self.nonQuotes = [];
    self.abbrv = false;
    self.abbrv2 = false;
    self.abbrv = false;
    self.startAt = null;
    self.endAt = null;
    self.blocks = [];
    p.getNounsImp = function getNounsImp(sntence) {
        var pos = require('pos')
        var nouns = [];

        var words = new pos.Lexer().lex(sntence);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        var i = 0;
        sh.each(taggedWords, function addWord(i, work_) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            //  console.log(word + " /" + tag);


            if (nouns.includes(word)) {
                return;
            }
            var firstChar = word.slice(0, 1)
            if (u.isUpperCase(firstChar) && false == sh.isNumber(firstChar)) {
                if (word.length > 5 /*&& sh.isNumber()*/) {
                    nouns.push(word)
                    return;
                }
            }

            if (tag.startsWith('NN')) {
                if (word.length < 7) {
                    return;
                }

                nouns.push(word)

            }
        })
        return nouns;
    }
    p.getNounsImpHigh = function getNounsImpHigh(sntence) {
        var pos = require('pos')
        var nouns = [];
        // sntence = 'barf barf barf'
        var words = new pos.Lexer().lex(sntence);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        var i = 0;
        var allWords = [];

        var dict = new sh.DictArray()
        dict.settings.allowDupes = true
        sh.each(taggedWords, function addWord(i, work_) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            //  console.log(word + " /" + tag);


            if (word.length < 4) {
                return
            } //the adn stuff
            dict.add(word, word)
        })

        var countRepeatedWords = 0
        sh.each(dict.data.dict, function onFreq(k, v) {
            dict.data.dict[k] = v.length
            if (v.length > 2) {
                countRepeatedWords++
                //  debugger
            } else {
                delete dict.data.dict[k]
            }
        })
        if (countRepeatedWords == 0) {
            return null;
        }
        return dict.data.dict;
    }


    p.updateRow = function updateRow(k, v) {
        u.table.updateLastRow(k, v, self.datarow)
    }

    p.addNewSTBBlock = function addNewSTBBlock() {

        var speakerTextBlock = new SpeakerTextBlock()
        sTB = speakerTextBlock

        self.prev2Block = self.prevBlock;
        self.prevBlock = self.currentBlock;
        self.currentBlock = sTB

        self.blocks.push(sTB)
        return sTB;
    }

    function defineUtils() {
        p.utils = {}
    }

    defineUtils()
}

function SpeakerTextBlock() {
    var p = this;
    var self = this;
    self.data = {};
    self.data.dictObjs = [];
    self.data.nonQuote = [];
    self.data.nonQuote2 = [];
    self.data.quotes = [];
    self.data.nounsQuotes = []
    self.data.sI = {}
    //asdf.g
    self.data.ui = u.tag('div')
    self.data.ui2 = u.tag('div')
    self.data.txt = ''
    //u.makeAbs() /float it
    self.data.ui.css('text-align', 'right')
    self.data.sentenceIndexes = [];
    self.data.sIs = [];
    u.pos.tr()
    p.init = function init() {
        debbuger
    }
    p.updateRow = function updateRow(k, v) {
        u.table.updateLastRow(k, v, self.datarow)
    }
    p.addText = function addText(k, v) {
        if (self.data.prevDictObj == null) {
            return;
        }
        self.data.prevDictObj.ui.append(k)
    }
    p.addDO = function addDO(dictObj) {
        var sI = dictObj.sentenceIndex;
        if (self.data.sIs.includes(sI)) {
            return;
        }
        self.data.sIs.push(sI)
        self.data.dictObjs.push(dictObj)
    }
    p.showDOTexts = function showDOTexts() {
        console.log(sh.t, 'added ' + self.data.dictObjs[0].txt)
        $.each(self.data.dictObjs, function on(k, v) {
            if (k < 1) return
            console.log(sh.t, sh.t, k + 1, v.txt)
        })
    }
    p.hasTxt = function hasTxt(txt) {
        return self.data.txtNorm.includes(txt)
    }
    p.hasSentenceIndex = function hasSentenceIndex(dOIndex) {
        return self.data.sentenceIndexes.includes(dOIndex)
    }
    p.processQuotesInBlock = function processQuotesInBlock() {

        if (self.data.dictObjs.length > 0) {
            //asdf.g
        }


        var inActiveQuote = false
        var allNouns = [];
        var blockTxt = ''
        self.data.txt = ''
        $.each(self.data.dictObjs, function processAllSentencesIn_AutoQuote_Block(k, dictObj) {

            var prevDO = self.data.dictObjs[k - 1];

            var txt = dictObj.txt;
            self.data.txt += txt
            blockTxt += txt
            /* if (txt.includes('Sugar King')) {
             asdf.g
             }*/


            if (txt.includes('Rachel s')) {
                ///asdf.g
                // debugger
            }

            //why?
            var numQuotes = txt.split('"').length - 1
            if (numQuotes == 1) {
                inActiveQuote = !inActiveQuote;
                //dictObj.inActiveQuote =
                dictObj.isQuote = true;
            }
            if (numQuotes == 2) {
                dictObj.isQuote = true;
                inActiveQuote = false
            }
            if (numQuotes == 0) {
                if (inActiveQuote) {
                    dictObj.isQuote = true
                } else {
                    if (prevDO && prevDO.isQuote !== true) {
                        dictObj.ignoreDOBcNoQuotes = true;
                    }
                    dictObj.isQuote = false
                }
            }

            console.log(sh.t, sh.t, 'processQuotesInBlock', k + 1, dictObj.txt, dictObj.isQuote, inActiveQuote)


            //Bookmark.quotes reprocessing the pp.isQuote setting
            if (dictObj.txt.includes('King"')) {
                // return
                // asdf.g
                //debugger
                //  dictObj.ui.append('sdf')
            }


            if (dictObj.txt.includes('eyebrows')) {
                // return
                debugger
                dictObj.ui.append('sdf')

            }
            if (dictObj.ui == null) {
                console.log(sh.t, 'no quotes....')
            } else {
                if (self.data.debugModeMarkings) {
                    dictObj.ui.css('border-top', '#A5C69D 2px solid')
                }
                dictObj.ui.addClass('nonQuoteStr')
            }
            if (dictObj.isQuote /*&& dictObj.ui*/) {


                self.data.quotes.push(dictObj)
                //self.lastObj.speaker
            } else {
                self.data.nonQuote.push(dictObj)
                self.data.nonQuote2.push(dictObj.txt)
                /*
                 var nlpOutput = nlp(dictObj.txt)
                 var nouns = nlpOutput.nouns().out('array')
                 allNouns = allNouns.concat(nouns)
                 var div = u.tag('div')
                 u.bg('blue')
                 div.append(' '+nouns.join(', '))

                 self.data.ui.append(div)*/

            }
        })

        if (inActiveQuote) {
            // debugger
        }

        self.data.txtNorm = sh.str.normSpaces(self.data.txt)
        if (self.data.quotes.length == 0) {

            console.log(sh.t, 'no quotes')
            return;
        }

        /*
         var div = u.tag('div')
         div.text('is quote')
         */
        self.data.ui.append(u.wordTagSpan('is quote', 'skyblue'))

        u.br(self.data.ui)
        //var yy = nlp('')

        var allVerbs = []
        self.data.nouns = allNouns;
        $.each(self.data.dictObjs, function on(k, dictObj) {

            self.data.sentenceIndexes.push(dictObj.dOIndex)
            if (dictObj.ignoreDOBcNoQuotes) {
                return;
            }
            console.log(sh.t, sh.t, k + 1, dictObj.txt)


            if (dictObj.txt.includes('Rachel s')) {
                ///asdf.g
                // debugger
            }


            if (dictObj.quoteMode == true || dictObj.isQuote == true) {
                self.data.nounsQuotes = self.data.nounsQuotes.concat(nouns)
            } else {
                //self.data.nonQuote.push(dictObj)
                //self.data.nonQuote2.push(dictObj.txt)

                var nlp = require('compromise')
                var nlpOutput = nlp(dictObj.txt)
                //var nouns = nlpOutput.nouns().out('array')
                var nouns = GetNouns2(dictObj.txt)
                var valNouns = ['I', 'me', 'he', 'she', 'they']
                var txt = dictObj.txt.toLowerCase();
                txt = sh.alphaOnly(txt)
                words = sh.str.words(txt)

                sh.each(valNouns, function fixIssueWithPRonounsMissing(k, v) {
                    v = v.toLowerCase();
                    if (words.includes(v)) {
                        nouns.push(v)
                        return;
                    }
                    return;
                })


//bookmark, get nouns

                /*    if ( nouns.includes('eyebrow')) {
                 debugger
                 }*/

                if (dictObj.txt.includes('Sugar King')) {
                    asdf.g
                }
                if (dictObj.txt.includes('Colin\'s')) {
                    ///asdf.g
                }

                //sorting b/c nlp reorders ... this is removed
                //  nouns = self.utils.sortNouns(txt, nouns);
                //allNouns = allNouns.concat(nouns)
                // if (dictObj.quoteMode != true) {
                self.data.nouns = self.data.nouns.concat(nouns)

                //self.data.nouns = nouns;

                var verbs = nlpOutput.verbs().out('array')
                allVerbs = allVerbs.concat(verbs)

                nouns2 = self.utils.getNounsImp(txt);
                var div = u.tag('span')
                u.bg('#E8BFA2')
                console.log(sh.t, sh.t, 'nouns2', nouns2)
                if (nouns2.length > 0) {

                    div.append(' nouns2:' + nouns2.join(', '))
                    self.data.ui.append(div)
                    u.br(self.data.ui)
                    dictObj.nouns2 = nouns2;
                }


                var div = u.tag('span')
                u.bg('#E8BFA2')
                console.log(sh.t, sh.t, 'alllNouns', nouns)
                if (nouns.length == 0) {
                    return
                }
                div.append(' nouns:' + nouns.join(', '))
                self.data.ui.append(div)
                u.br(self.data.ui)

                //  }
                // u.br(self.data.ui)

            }
        })


        if (self.data.txtNorm.includes('Rachel sai')) {
            ///asdf.g
            // debugger
        }

        if (inActiveQuote) {
            // debugger
        }
        var divVerbs = u.tag('span')
        u.bg('#E5B9D3')
        //console.log(sh.t, sh.t, 'verbs', allVerbs)
        if (allVerbs.length > 0) {
            divVerbs.append(' verbs:' + allVerbs.join(', '))
            self.data.ui.append(divVerbs)
            u.br(self.data.ui)
        }

        self.data.allVerbs = allVerbs

        //divVerbs.append('looooooooooooo')

        let nonQuote2 = self.data.nonQuote2.join(' ')
        self.data.ui.append(nonQuote2)
    }


    p.getGlobalSpeaker = function getGlobalSpeaker(itH) {

        //post process asdf.g
        if (self.data.nouns) {
            self.data.speaker = self.data.nouns[0]
            if (self.data.speaker && self.data.speaker.includes('colin')) {
                debugger
            }
            self.data.ui.append(
                u.wordTagSpan(self.data.speaker, '#E59B8E')) //pale green

            var noun =
                u.wordTagSpan(self.data.speaker, '#E59B8E')
            //noun.css('top', '0px')
            u.makeAbs()
            u.position(0, 30)
            u.fontSize(25)
            noun.css('font-style', 'italic')

            if (self.data.nouns.includes('colins')) {
                debugger
            }

            if (self.data.nouns.includes('week')) {
                debugger
            }

            self.data.ui.append(noun)
            if (self.data.nouns.length == 0) {
                noun.text('???')

                if (self.data.globalSpeaker == null) {

                    function reverseSpeaker() {


                        //TODO: go back until see a match
                        //itH.blocks
                        var blocksRev = itH.blocks.concat().reverse(); //doesn't need to b eresversed

                        var gmaePlayers = [];
                        var gmaePlayers2 = [];
                        var prevSpeaker
                        sh.each(blocksRev, function findPrev2Speaker_SkipBlanks(k, v) {
                            gmaePlayers.push(v.data.globalSpeaker)
                            var why = v.data.globalSpeaker
                            if (why == null) {
                                return
                            }
                            gmaePlayers2.push(v.data.globalSpeaker)
                            if (gmaePlayers2.length == 2) {
                                prevSpeaker = v.data.globalSpeaker
                            }
                        })

                        if (prevSpeaker) {
                            console.log('???-rev-global speaker', prevSpeaker, ':',
                                self.data.txt)
                            self.data.globalSpeaker = prevSpeaker;
                            noun.append(u.glyph('share-alt'))
                            noun.append(self.data.globalSpeaker)
                        }

                        return;


                        blocksRev.shift();//remove current
                        var prev2_lastSpeaker = null;
                        var lastSpeaker = null;

                        sh.each(blocksRev, function findPrev2Speaker_SkipBlanks(k, v) {
                            if (lastSpeaker != null) {
                                if (v.data.globalSpeaker != null) {
                                    if (v.data.globalSpeaker.toLowerCase() != lastSpeaker.toLowerCase()) {
                                        prev2_lastSpeaker = v.data.globalSpeaker
                                        console.log('2ns ', k, v.data.globalSpeaker, v.data.txt)
                                        return false;
                                    }
                                }
                            }
                            if (v.data.globalSpeaker != null) {
                                //if ( lastSpeaker != )
                                console.log('first ', k, v.data.globalSpeaker, v.data.txt)
                                lastSpeaker = v.data.globalSpeaker
                            }
                        })


                        if (itH.prev2Block &&
                            itH.prev2Block.data.globalSpeaker == null && prev2_lastSpeaker) {
                            console.log('???-rev-global speaker', prev2_lastSpeaker, ':',
                                self.data.txt)
                            self.data.globalSpeaker = prev2_lastSpeaker;
                            noun.append(u.glyph('share-alt'))
                            noun.append(self.data.globalSpeaker)
                        } else {
                            if (itH.prev2Block) {
                                self.data.globalSpeaker = itH.prev2Block.data.globalSpeaker;
                                noun.append(u.glyph('share-alt'))
                                noun.append(self.data.globalSpeaker)
                            }
                        }

                    }

                    reverseSpeaker();
                }

            } else {
                self.data.globalSpeaker = self.data.speaker
            }


            itH.addGlobalSpeaker(self)
        }

        if (self.data.allVerbs && self.data.allVerbs.length > 0) {
            self.data.verb = self.data.allVerbs[0]
            self.data.ui.append(u.wordTagSpan(self.data.verb, '#CBEDD3'))
        }


    }


    p.markGlobalSpeaker = function markGlobalSpeaker(globalSpeaker) {
        var noun =
            u.wordTagSpan(globalSpeaker.getGSName(), '#E6E6FF') //lavendar
        //noun.css('top', '0px')
        u.makeAbs()
        u.position(150, 30)
        u.fontSize(25)
        noun.css('font-style', 'italic')
        self.data.ui.append(noun)
        self.data.ui2.append(noun)
        self.data.gsSpeaker = globalSpeaker;
//asdf.g
        //  console.log('spk', globalSpeaker.data.globalSpeakerName, self.data.quotes.length)
        if (globalSpeaker) {
            //add to status speaker name
            sh.each(self.data.quotes, function addSpeakerNameAndVoicing(k, dictObj) {
                if (dictObj.ui == null) {
                    console.error('cannot find', dictObj.sentenceIndex, dictObj.txt)
                    return
                    debugger
                }
                if (globalSpeaker.data.json == null) {
                    console.log('no spkr right')//, self.data.txtNorm)
                } else {
                    dictObj.ui.attr('gspkName', globalSpeaker.data.json.name)
                    dictObj.ui.attr('voicing', globalSpeaker.data.json.voice)
                }

                // asdf.g
                dictObj.ui.attr('gsIndex', globalSpeaker.data.gsIndex)
            })
        }
    }


    p.replaceTextNounStr = function replaceTextNounStr(orig, spkName) {
        // return;

        sh.each(self.data.dictObjs, function replaceNameINStr(k, v) {
            dO = v;
            if (dO.txt == null) {
                return
            }
            if (dO.ui == null) {
                return
            }

            var txt = dO.txt;

            var split = sh.str.splitSentenceOnWord(txt, orig)
            if (split.length > 1) {
                var spanSplitSentence = u.span()
                sh.each(split, function sdf(k, strPiece) {
                    var isLastSplit = k == split.length - 1;
                    /* if ( isLastSplit && strPiece == '' ) {
                     return //why?
                     }
                     if ( isLastSplit   ) {
                     debugger
                     }*/

                    var part = u.span()
                    part.text(strPiece)
                    if (strPiece.length > 0) {
                        spanSplitSentence.append(part)
                    }

                    if (isLastSplit) {
                        return; //do not append speaker on last snecne
                    }
                    var part = u.span()

                    part.text(sh.str.cap(orig))
                    u.addClass('personQuoteSpeaker')
                    part.attr('whoSpk', spkName)
                    // u.underline('2px', 'lightblue')
                    spanSplitSentence.append(part)
                })

                var span = sh.dict.getFirst(dO.spans)
                span.html(spanSplitSentence.html())
                //dO.ui.html(spanSplitSentence.html())
                // dO.ui.html('zzzzzzzzzzzzzzzzzzz')
            } else {

            }

        })
    }

    p.getSentenceIndex = function getSentenceIndex(sentenceIndex) {
        var ui = $('[sentenceindex' + '=' + sentenceIndex + ']')
        if (ui.length == 0) {
            var ui = $('[sentence-index' + '=' + sentenceIndex + ']')
        }
        if (ui.length == 0) {
            var ui = $('[sent-index' + '=' + sentenceIndex + ']')
        }
        if (ui.length == 0) {
            ui = null;
        }
        if (ui != null) {
            //asdf.g
        }
        return ui;
    }
    p.getBlockSI = function getBlockSI() {
        var sI = null
        sh.each(self.data.dictObjs, function onAddObj(k, dO) {
            sI = dO.sentenceIndex

        })
        return sI;
    }

    p.pushX = function pushX(dO, newUI) {
        newUI = newUI.clone()
        if (dO && dO.ui && dO.ui.text().includes('continued Lord')) {
            var tag = uiUtils.tag('div')
            tag.text('got you ....')
            //  fd.f
            // asdf.g
            //var body = $('body')
            //dO.ui.parent().append(tag)
            //$('body').css('background-color', 'yellow')
            dO.ui.append(tag)
            // newUI.text('got you ... boooooooo')
            // asdf.g
        }
        dO.ui.append(tag)
        newUI.text('got you ... boooooooo')
    }

    p.prependDO = function prependDO(newUI) {
        asdf.g
        var dO = self.data.dictObjs[0]
        if (dO == null || dO.ui == null) {

            //dO.ui = self.getSentenceIndex(dO.sentenceIndex)
            dO = self.utils.getUIFromElement()
            if (dO == null || dO.ui == null) {
                console.log('dO.ui prependDO is null')
                return;

            }
        }
        self.pushX(dO, newUI)
        //dO.ui.prepend(newUI)
        dO.ui.parent()/*.parent()*/.append(newUI)
        //dO.ui.parent()/*.parent()*/.prepend(newUI)
    }
    p.appendDO = function appendDO(newUI) {
        var dO = self.data.dictObjs.slice(-1)[0]
        if (dO == null || dO.ui == null) {
            console.log('dO.ui is null')
            return;
        }
        //  self.pushX(dO, newUI)
        dO.ui.append(newUI)
    }

    p.prependDO2 = function prependDO2(newUI) {
        dO = self.utils.getUIFromElement() //first one
        if (dO == null || dO.ui == null) {
            if (self.data.quotes.length > 0) {
                //debugger
            }
            if (self.data.txt.includes('big ')) {
                debugger
                self.utils.getUIFromElement()
            }
            console.log('dO.ui prependDO2 is null', self.getBlockSI(), self.data.txt)
            return;
        }
        //   dO.ui.parent()/*.parent()*/.prepend(newUI)
        //self.pushX(dO, newUI)
        dO.ui.parent().prepend(newUI)
        // dO.ui.append(newUI)
    }

    function defineUtils() {
        p.utils = {}
        p.utils.getNounsImp = function getNounsImp(sntence) {
            var pos = require('pos')
            var nouns = [];

            var words = new pos.Lexer().lex(sntence);
            var tagger = new pos.Tagger();
            var taggedWords = tagger.tag(words);
            var i = 0;
            sh.each(taggedWords, function addWord(i, work_) {
                var taggedWord = taggedWords[i];
                var word = taggedWord[0];
                var tag = taggedWord[1];
                //  console.log(word + " /" + tag);
                if (tag.startsWith('NN')) {
                    if (word.length < 6) {
                        return;
                    }

                    nouns.push(word)

                }
            })
            return nouns;
        }
        p.utils.sortNouns = function sortNouns(txt, nouns) {
            //var nouns = self.data.nouns;
            var txt2 = txt.replace(/\s\s+/g, ' ');
            var dictOrder = {}
            sh.each(nouns, function sortNouns(k, noun) {
                var charIndex = txt2.indexOf(noun)
                dictOrder[charIndex] = noun
            })

            function sortOnKeys(dict) {
                var sorted = [];
                for (var key in dict) {
                    sorted[sorted.length] = key;
                }
                sorted.sort();
                var tempDict = {};
                for (var i = 0; i < sorted.length; i++) {
                    tempDict[sorted[i]] = dict[sorted[i]];
                }
                return tempDict;
            }

            dictOrder = sortOnKeys(dictOrder);

            var arr = [];
            sh.each(dictOrder, function asdf(k, v) {
                arr.push(v)
            })
            return arr;
        }

        p.utils.getUIFromElement = function getUIFromElement() {
            var foundDo = null
            sh.each(self.data.dictObjs, function onAddObj(k, dO) {

                if (dO.ui == null) {
                    dO.ui = self.getSentenceIndex(dO.sentenceIndex)
                    if (dO.ui == null) {
                        if (self.data.quotes.length > 0) {
                            //debugger
                        }
                        console.log('dO.ui getUIFromElement is null', k, dO.sentenceIndex)
                        return;
                    }
                    foundDo = dO
                    return false;
                } else {
                    foundDo = dO
                    return false;
                }

            })

            return foundDo
        }
    }

    defineUtils()
}

function GlobalSpeaker() {
    var p = this;
    var self = this;
    self.data = {};
    self.data.blocks = [];
    p.init = function init() {

    }
    p.addSpeakerTextBlockToSpeaker = function addSpeakerTextBlockToSpeaker(sTB) {
        self.data.blocks.push(sTB)
        sTB.markGlobalSpeaker(self)
    }
    p.getGSName = function getGSName(sTB) {
        return sh.join(self.data.globalSpeakerName, sh.paren(self.data.gsIndex))
    }


}

function SpeakerConfigOverrides() {
    var p = this;
    var self = this;
    self.data = {};
    self.data.blocks = [];
    self.data.dictVoices = {};

    p.init = function init(config) {


        self.settings = config;

        self.data.flowIndex = new sh.DictArray()
        if (self.settings.annFlows) {
            sh.each(self.settings.annFlows, function okn(k, flow) {
                self.addFlow('global_' + k, flow)
            })
        }
        // self.data.flows = self.data.flows.concat(self.settings.annFlows)
        self.settings.chapters = sh.dv(self.settings.chapters, [])
        var chapterSettings = [];
        sh.each(self.settings.chapters, function asdf(k, chapterInfo) {
            chapterInfo.index = k;
            chapterInfo.chapterIndexName = k;
            chapterSettings.push(chapterInfo)
            if (chapterSettings.annFlows) {
                sh.each(self.settings.annFlows, function okn(k, flow) {
                    self.addFlow('global_' + k, flow)
                })
            }
            var exportChapterInfo = eCI = sh.clone(chapterInfo)
            delete eCI.nounTags
            delete eCI.annFlows
            self.data.exportChapters = exportChapterInfo;

            if (chapterInfo.mergeVoices) {
                sh.each(chapterInfo.mergeVoices, function storeAsLowerCase(voiceName, voiceDef) {
                    chapterInfo.mergeVoices[voiceName.toLowerCase()] = voiceDef
                    /*if ( voiceDef.annFlows ) {
                     sh.each(voiceDef.annFlows, function okn(k, flow) {
                     self.addFlow(/!*'global_' +*!/ k, flow)
                     })
                     }*/
                })
            }


            /*  if ( chapterObj.mergeVoices ) {
             sh.each(chapterObj.mergeVoices, function ok(voiceName,voiceObj) {
             var exists =
             if ( exists ) {
             console.log('what is going on ...? you have 2 voices named same?')
             }
             self.data.dictVoices[voiceName] = voiceObj;
             })
             }*/
        })
        if (chapterSettings.length == 0) {
            var c = {}
            console.log('what is this?.... had tomake up chapter')
            c.auto = 'autochapter1'
            c.mergeVoices = {}
            chapterSettings.push(c)
        }
        self.data.chapters = chapterSettings;
        self.data.current = chapterSettings[0]

        self.data.currentChapterIndex = 0

    }

    p.addFlow = function addFlow(flowname, flow) {
        // debugger
        sh.each(flow, function onMerge_Processes(k, flowElem) {
            var index = flowElem.sI;
            flowElem.name = flowname;
            self.data.flowIndex.add(index, flowElem)
        });
    }

    p.addSpeakerTextBlockToSpeaker = function addSpeakerTextBlockToSpeaker(sTB) {
        self.data.blocks.push(sTB)
        sTB.markGlobalSpeaker(self)
    }
    p.getGSName = function getGSName(sTB) {
        return sh.join(self.data.globalSpeakerName, sh.paren(self.data.gsIndex))
    }
    p.getChapter = function getChapter(sTB) {
        //self.data.blocks.push(sTB)
        //sTB.markGlobalSpeaker(self)
        //debugger
        //if (self.data.blocks)

        if (self.data.current && self.data.current.ends) {
            console.log('bloc ktext', sTB.data.txtNorm)
            if (sTB.data.txtNorm.includes(self.data.current.ends)) {
                //debugger
                var chpEndIndex = sTB.data.dictObjs[0].dOIndex;
                //    asdf.g
                self.data.currentChapterIndex++
                if (self.data.current.chapterStartsAtSI == null) {
                    self.data.current.chapterStartsAtSI = 0;
                }
                self.data.current.chapterEndsAtSI = chpEndIndex - 1;
                self.data.current = self.data.chapters[self.data.currentChapterIndex]
                if (self.data.current && self.data.chapterStartsAtSI == null) {
                    self.data.current.chapterStartsAtSI = chpEndIndex;
                }
            }
        }

    }

    p.fixSpeaker = function fixSpeaker(sTB) {
        var speaker = sTB.data.globalSpeaker
        var current = self.data.current
        var replaceWith = null;
        if (current.mergeVoices) {
            sh.each(current.mergeVoices, function onMerge_Processes(voiceName, voiceDef) {
                if (sh.isArray(voiceDef)) {
                    voiceDef = {nounTags: voiceDef}
                }

                self.data.dictVoices[voiceName]

                if (voiceDef.nounTags && voiceDef.nounTags.includes(speaker)) {
                    //debugger
                    replaceWith = voiceName
                    return false;
                }
                var grabSentences = voiceDef.grabSentences
                if (grabSentences) {
                    var replaceWithGrabSentenceIndex = false;
                    var replacedIndex = -1;
                    console.log('match', sTB.data.sentenceIndexes, sTB.data.txtNorm)
                    sh.each(grabSentences, function checkIfHasSentence(k, v) {
                        if (sTB.hasSentenceIndex(v - 1)) {
                            replaceWithGrabSentenceIndex = voiceName.toLowerCase()
                            replacedIndex = v;
                            return false;
                            //asdf.g
                        }
                    })
                    if (replaceWithGrabSentenceIndex) {
                        replaceWith = replaceWithGrabSentenceIndex
                        var changedByIndex = uiUtils.spanTag('changed-by-index ' + replacedIndex, 'orange')
                        sTB.data.ui.append(uiUtils.br())
                        sTB.data.ui.append(changedByIndex)
                        //sTB.data.ui.append('boograb'+replacedIndex)
                        return false;
                    }
                }
            })
        }
        if (sTB.hasTxt('All what time')) {
            //asdf.g
        }
        /* if ( sTB.hasSentenceIndex('All what time') ) {
         asdf.g
         }*/
        if (replaceWith) {
            sTB.data.globalSpeaker = replaceWith;
            sTB.data.globalSpeakerOrig = speaker
        }

        // debugger
        return sTB.data.globalSpeaker;
        //self.data.blocks.push(sTB)
        //sTB.markGlobalSpeaker(self)
        //debugger
        //if (self.data.blocks)

        if (self.data.current && self.data.current.ends) {
            if (sTB.data.txt.includes(self.data.current.ends)) {
                asdf.g
                self.data.currentChapterIndex++
                self.data.current = self.data.chapters[self.data.currentChapterIndex]
            }
        }

    }

    p.postProcSCO = function postProcSCO() {
        self.data.chapterFlowIndex = new sh.DictArray()
        sh.each(self.data.chapters, function addChaptersToFlow(k, chp) {
            self.data.chapterFlowIndex.add(chp.chapterStartsAtSI, {
                action: 'start_chapter',
                chapterKey: chp.chapterIndexName,
                name: chp.name
            })
            if (chp.chapterEndsAtSI == null) {
                return
            }
            self.data.chapterFlowIndex.add(chp.chapterEndsAtSI, {
                action: 'end_chapter',
                chapterKey: chp.chapterIndexName,
                name: chp.name
            })
        })

        self.settings.chapterFlow = self.data.chapterFlowIndex.data.dict


    }


}

function upgradeUiutils() {
    sh.convertToArray = function asdf(input) {
        if (sh.isArray(input)) {
            return input
        }
        var arr = []
        sh.each(input, function addto(k, v) {
            arr.push(v)
        })

        return arr;
    }


}

function extendUIUtils2() {
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


    uiUtils.absHelper = function abs(div2, l, t, r, b) {
        div2.css('position', 'absolute')
        if (l == 0) {
            l = '0px'
        }
        if (t == 0) {
            t = '0px'
        }
        if (r == 0) {
            r = '0px'
        }
        if (b == 0) {
            b = '0px'
        }
        if (l)
            div2.css('left', l)
        if (t)
            div2.css('top', t)
        if (r)
            div2.css('right', r)
        if (b)
            div2.css('bottom', b)
    }

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
}


//console.log('hamb');
function defineUtils2() {
    $.each = sh.each;
    $.isNumeric = sh.isNumber;
    console.debug = function debug() {
        var args = sh.args(arguments)
        console.log.apply(console, args)
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


    if ($.isString == null) {
        $.isString = function isString(obj) {
            return (Object.prototype.toString.call(obj) === '[object String]');
        }
    }

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

upgradeUiutils()


GetNouns2 = function getNouns2(sntence, limitSize) {
    var pos = require('pos')
    var nouns = [];

    var words = new pos.Lexer().lex(sntence);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    var i = 0;
    var skipNext = false;
    var dualSet = ['Mrs', 'Dr', 'Ms', 'Mr']
    sh.each(taggedWords, function addWord(i, work_) {
        if (i < skipNext) {
            return;
        }
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        //  console.log(word + " /" + tag);
        if (tag.startsWith('NN')) {
            if (limitSize && word.length < 6) {
                return;
            }
            if (dualSet.includes(word)) {
                skipNext = i + 2;
                word += '. ' + taggedWords[i + 2][0]
            }
            nouns.push(word)
        }
    })
    /* if ( nouns.includes('jam')) {
     debugger
     }
     */
    if (nouns.includes('Mrs')) {
        debugger
    }
    if (sntence.includes('Mrs. Lim')) {
        //debugger
    }

    uiUtils.lastTaggedWords = taggedWords
    return nouns;
}


function SentenceHelper() {

    var self = this;
    var p = this;

    self.data = {};
    self.data.repeatCountIndex = 5

    self.settings = {};


    p.setupSentencesRedo = function setupSentencesRedo() {
        self.setupSentences(self.data.lastCall_setupSentences[0],
            self.data.lastCall_setupSentences[1])
    }
    p.init = function init() {
        var dirStore = sh.fs.trash('bookCvert')
        sh.fs.mkdirp(dirStore)
        var fileOutput = sh.fs.join(dirStore, 'test.html')
        self.data.fileOutput = fileOutput;
        self.data.fileOutputHTMLTemp = fileOutput + '.tmp.html'
        self.data.fileOutputJSONTemp = fileOutput + '.tmp.json'

        var file = self.settings.file;
        var path = sh.fs.path(file)


        fileOutput = sh.fs.join(path, 'epub_offline')

        if (self.settings.jsonMode) {
            //sh.fs.mkdirp(dirJSONSets)
            // fileOutput = sh.fs.join(dirJSONSets,  'epub_offline')
            fileOutput = self.settings.dirJSONSets
            fileOutput += '/' + self.settings.currentJSONFilename
            var fileOutputDir = sh.fs.base(fileOutput)
            sh.fs.mkdirp(fileOutputDir)

            if (self.data.dictSentences2 && self.data.dictSentences2.length) {
                self.data.lastSentencesSize += self.data.dictSentences2.length
            }
            if (self.data.currentSentences) {
                if (self.data.currentSentences.dictSentences2 && self.data.currentSentences.dictSentences2.length) {
                    self.data.currentSentences.dictSentences2 = []
                    self.data.currentSentences.images = []
                    self.data.currentSentences.sentences = []
                    self.data.lastSentencesSize = self.data.currentSentences.dictSentences2.length
                }
            }
            self.settings.offsetDoSentenceIndex = self.data.lastSentencesSize
        } else {
            self.settings.offsetDoSentenceIndex = 0;
        }

        self.data.fileOutputHTMLTemp2 = fileOutput + '.html'
        self.data.fileOutputJSONTemp2 = fileOutput + '.html.json'


        //asdf.g


        self.settings.showVoicing = sh.dv(self.settings.showVoicing, false);
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
        p.utils = utils;

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

            //TODO
            //colorize all sentences
            //prev sentences add to list of 'current sentencces'

            //get all images ... and have images work with sentences
            //why: when viewing sentence, see image. so it is like tv show

            var h = {};


            h.quote = new QuoteHelper();
            h.quote.init(self);
            //h.quote.settings.collectAllNouns = true;
            h.quote.settings.presetNouns = ['barman']

            h.data = {};
            h.data.timeDate = new Date();
            h.debug = {};
            h.debug.displayQuotes = false;
            h.debug.displayQuotes2 = true;
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
            h.addSentence2Force = function addSentence2Force(str, _parent, why, child) {
                h.addSentence2(str, _parent, why, child, true)
            }
            h.addSentence2 = function addSentence(str, _parent, why, child, forceAddingSentence) {
                if (h.lastExUIWasLink) {
                    h.lastExUIWasLink = false;
                    h.addSentence2('', null, 'lastExUIWasLink'); //why did this have to be placed here to split the link?
                }
                if (str.includes('jeromeeti')) {
                    //  debugger
                }

                //debugger;
                var currentSentence = h.currentSentence + str;
                currentSentence = sh.str.normSpaces(currentSentence)
                //h.utils.getQuotes2(currentSentence)

                currentSentence = currentSentence.trim()
                if (currentSentence.trim() == '' && forceAddingSentence != true) {
                    return; //skip empty sentence
                }
                if (currentSentence.includes('INCREASING  ')) {
//                        debugger
                }
                // asdf.g
                if (currentSentence.includes('AFTERW')) {
                    //  debugger
                }
                if (currentSentence.includes('Sugar') && currentSentence.includes('King')) {
                    // debugger
                    // asdf.g
                }
                if (currentSentence.includes('Copyright Page')) {
                    debugger
                }
                /*if (currentSentence.includes('Praise ')) {
                 global.debugAddingSpanJ = true;
                 console.error('toggling',  global.debugAddingSpanJ )
                 // debugger
                 }*/
                /*if (currentSentence.includes('argon.js')) {
                 debugger
                 }*/
                if (currentSentence.includes('jeromeeti')) {
                    //   debugger
                }
                //console.log('--->', sh.qq(str))
                if (str.trim() == 'R.') {
                    debugger;
                }
                if (str.trim() == '"where  are  you?"') {
                    debugger;
                }


                /*if ( forceAddingSentence && str.trim() == '' ) {
                 var lastSentenceWasEmpty = false;

                 if (forceAddingSentence && str.trim() == '') {
                 if (h.data.lastSentenceAddedWasEmpty) {
                 forceAddingSentence = false;
                 var resetLastSentence = true
                 console.log('block duplicate', currentSentence,  str, why, $(_parent).html() )
                 }
                 }

                 h.data.lastSentenceAddedWasEmpty = str.trim() == '';
                 if (resetLastSentence) {
                 h.data.lastSentenceAddedWasEmpty = false;
                 }
                 }*/
                //remove br tag like..
                h.data.lastSentenceAdded = str;

                //there are two modes. post hoc, and a-pro-pro
                if (str != '' || forceAddingSentence == true) {
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
                    images: h.images,
                    breaksLink: h.breaksLine
                };

                dictObj.txt = sh.str.normSpaces(dictObj.txt)


                h.breaksLine = null;

                var quotesSplit = dictObj.txt.split('"')
                var qqCount = quotesSplit.length - 1;
                //console.debug('dictObj.txt.split(")', qCount)
                var startedInAQuote = self.data.quoteMode;


                if (qqCount == 2) {
                    var punt = ['.', '?', ',', '!']
                    //"Sugar Kings"
                    var isMatch = sh.isAnyInAny(dictObj.txt, punt);
                    if (isMatch == false) {
                        self.parseWarnings.addWarning('quote had no puntcuations', dictObj)
                        qqCount = 0
                    }

                }

                var brokenQuote_EndButNot = false;
                var startAndEndAQuote = false;

                if (qqCount == 1 /*&&
                 dictObj.txt.includes('"')*/) {
                    //  debugger
                    if (self.data.quoteMode == true) {
                        if (currentSentence.endsWith('"')) {
                            //leave the quote and ignore the rest
                        }
                    }
                    self.data.quoteMode = !self.data.quoteMode;
                    if (self.data.quoteMode) {
                        h.quote.addQuote(dictObj)
                        self.data.quoteModeCounter++;
                    } else {

                    }

                    //handle te case were xxx What happen?" said mark
                    var firstSection = quotesSplit[0]
                    //console.log(sh.t, 'q', quotesSplit)
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

                if (currentSentence.startsWith(',') == true && self.lastObj &&
                    self.lastObj.isQuote) {
                    var proc_currentSentence = currentSentence.replace(',', '')
                    var y = nlp(proc_currentSentence)
                    var nouns = y.nouns().out('array')
                    var nouns = uiUtils.getNouns2(proc_currentSentence)
                    self.lastObj.speaker

                    if (h.quote.data.currentSpeaker) {
                        if (h.quote.data.currentSpeaker.speaker == 'unknown') {
                            h.quote.data.currentSpeaker.speaker = nouns[0]
                        }
                    }

                    h.quote.addSpeakerName(proc_currentSentence)
                    //   debugger
                }

                if (currentSentence.trim().endsWith(',') == true && self.lastObj &&
                    self.lastObj.isQuote) {
                    var proc_currentSentence = currentSentence.replace(',', '')
                    // var y = nlp(proc_currentSentence)
                    // var nouns = y.nouns().out('array')
                    var nouns = GetNouns2(proc_currentSentence)
                    self.lastObj.speaker
                    if (h.quote.data.currentSpeaker) {
                        if (h.quote.data.currentSpeaker.speaker == 'unknown') {
                            h.quote.data.currentSpeaker.speaker = nouns[0]

                            if (nouns.length == 0) {
                                h.quote.data.currentSpeaker.speaker = proc_currentSentence.split(' ')[0]
                            }
                        }
                    }

                    h.quote.addSpeakerName(proc_currentSentence)
                    //debugger
                }

                h.dictSentences2[h.sentences.length - 1] = dictObj;
                var dOSentenceIndex = h.sentences.length
                dOSentenceIndex += self.settings.offsetDoSentenceIndex;
                dictObj.sentenceIndex = dOSentenceIndex
                //Bookmark.assign sentence index
                $.each(dictObj.spans, function onChange(k, v) {
                    var ui = $(v)
                    ui.attr('sent-index', dOSentenceIndex)
                })
                var span = $('<span >' + str + '</span>');
                span.attr('sentence-index', dOSentenceIndex)


                if (h.data.debugWithOpacity) {
                    span.css({opacity: '0.2'});
                }


                if (currentSentence.includes('Rachel s')) {
                    ///asdf.g
                    //debugger
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
                    if (global.debugAddingSpanJ) {
                        debugger
                    }

                    // var  txt = [h.sentences.length].join(' ') + ' ' + txt
                    if (self.settings.dbgSentenceWithIndex) {
                        var spanNum = uiUtils.tag('span')
                        uiUtils.marginRight(5)
                        uiUtils.marginLeft(5)
                        /* uiUtils.bg('lightgray');
                         uiUtils.bg('#B2DED4');
                         uiUtils.pad(5, 5, 5, 5)*/
                        spanNum.addClass('spanSentenceIndexNumber')
                        spanNum.text(h.sentences.length)
                        _parent.append(spanNum);
                    }
                    _parent.append(span); //add to div
                    if (global.debugAddingSpanJ) {
                        debugger
                    }
                }


                h.quote.getNouns(dictObj)
                h.currentSentence = ''; //refresh
                h.currentSpans = {};
                h.images = [];
                h.breaksLine = null;
                self.lastObj = dictObj;
            }


            h.addSentence2Fragment = function addSentence2Fragment(str, _parent, why) {
                if (global.debugFragAll) {
                    var prev = self.data.prevChild;
                    var txt = self.data.prevChild.text()
                    if (txt.trim() != '') {
                        // debugger
                    }
                }
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

                if (global.debugFragAll) {
                    if (txt.trim() != '') {
                        debugger
                    }
                }
                //if (  ) { //add sentence if starts with capital ... or add to previous sentence
                //issue: this might be a full sentence (1 span had mutlipel sentences)
                //in other method, handle scenairo where sentence is added as fragment
                //}
                if (self.settings.dbgSentenceWithIndex) {
                    var spanNum = uiUtils.tag('span')
                    uiUtils.bg('lightgray');
                    spanNum.text(h.sentences.length)
                    _parent.append(spanNum);
                }
                _parent.append(span); //add to div
                h.currentSpans[str] = (span);
                if (str.includes('jeromeeti')) {
                    //debugger
                }
                if (str.includes('Copyright Page')) {
                    debugger
                }
                if (str.includes('Praise ')) {
                    debugger
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
                var classes = ['highlight2', 'highlight3', 'highlight4']
                //return
                var idx = 0
                $.each(h.dictSentences2, function processChar(i, dictObj) {
                    //var color =


                    $.each(dictObj.spans, function processChar(y, span) {
                        //span.css({'color': randomColor})
                        //debugger
                        if (idx > classes.length - 1) {
                            idx = 0;
                        }
                        var classNameHighlight = classes[idx]
                        idx++
                        $(span).addClass(classNameHighlight)
                        //  $(span).text('asdf')
                    });

                    return;


                    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

                    sh.each(dictObj.spans, function setIndexOnSpance(k, span) {
                        var ui = $(span)
                        ui.attr('sentenceindex', i)
                    })
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
                str = str.replace(/’/gi, "\'");
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
                var replaceWordsAlways = [['. . .', '...']]
                sh.each(replaceWordsAlways, function onRepl(k, pair) {
                    var first = pair[0]
                    if (str.includes(first)) {
                        str = str.replace(first, pair[1])
                    }
                })

                /*if (str.includes('Copyright Page')) {
                 global.debugFragAll =true
                 console.error('global.debugFragAll ', global.debugFragAll )
                 //  debugger
                 }*/
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
                    var nextChar3 = str[i + 3]

                    var prevChar = prevStr.slice(-1)
                    var prev2Char = prevStr.slice(-2, -1)
                    var last2Chars = prevStr.slice(-2)
                    var last3Chars = prevStr.slice(-3)
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

                    if (currentSentence.trim() == 'R') {
                        //debugger;
                    }
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
                            if (invalidSentenceStrs.includes(last3Chars)) {
                                return; //skip Dr. Morton , and Syncamore St. Cerryaldn Va
                            }
                            if (currentSentence.trim().length == 1) {
                                return; //R. L. Stient
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
                                if (currentSentence.trim() == 'R.') {
                                    debugger;
                                }
                                endAt = char; //this is a valid sentence
                                return false;
                            }
                        })
                    }

                    //Middle inidials //todo add check to see if previous word started witha capital?
                    /*if ( prevChar == ' ' && sh.isAlpha(char) &&
                     nextChar == '.' && nextChar2 == ' ' &&
                     sh.isAlpha(nextChar3) &&
                     sh.str.isCapitalized(nextChar3) ) {
                     debugger
                     // asdf.g
                     //bookmark: fixed issue with names
                     endAt = false;
                     }*/
                    if (prev2Char == ' ' && sh.isAlpha(prevChar) &&
                        char == '.' && nextChar == ' ' &&
                        sh.isAlpha(nextChar2) &&
                        sh.str.isCapitalized(nextChar2)) {
                        //debugger
                        // asdf.g
                        //bookmark: fixed issue with names
                        endAt = null;
                    }

                    if (endAt) {
                        if (global.debugAddingSpanJ) {
                            debugger
                        }
                        if (currentSentence.trim() == 'R.') {
                            debugger;
                        }
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
                if (currentSentence == 'R. ') {
                    debugger;
                }
                if (global.debugAddingSpanJ) {
                    debugger
                }
                if (currentSentence != '') {
                    sentences.push(currentSentence)
                    h.addSentence2Fragment(currentSentence,
                        _parent
                    )

                }
                //console.log('.dsfs.', h)
                var addSpanAgain = false;
                if (h && addSpanAgain) {
                    //every sentence
                    $.each(sentences, function addSpansToArea(i, sentence) {
                        var span = $('<span>' + key + sentence + '</span>')
                        if (h.data.debugWithOpacity) {
                            span.css({opacity: '0.2'});
                        }
                        if (h.data.debugWithColor) {
                            span.css({color: 'green'});
                        }
                        //asdf.g
                        if (global.debugAddingSpanJ) {
                            debugger
                        }
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

                asdf.g

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
                            /* if (h.debug.displayQuotes2) {
                             console.debug('currentQuote', currentQuote, str)
                             }*/
                        }
                    }
                    //debugger;
                });
                if (h.debug.displayQuotes) {
                    console.debug('quotes', quotes.length, quotes)
                }
                return;
            }

            h.utils.getQuotes2 = function getQuotes(sentence) {
                var quotes = [];
                var strArr = [];

                var strArr = sentence.split('')


                try {
                    //console.clear();
                } catch (e) {
                    console.error('no clear console')
                }

                asdf.g

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
                            /* if (h.debug.displayQuotes2) {
                             console.debug('currentQuote', currentQuote, str)
                             }*/
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

                var skipTagTypes = ['HEAD', 'SCRIPT', 'META', 'STYLE', 'NOSCRIPT',
                    'COMMENT',
                    '#comment', 'TITLE']
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
                        //console.log(nodeType, child.type)
                        if (skipTagTypes.indexOf(nodeType) != -1) {
                            return;
                        }
                        if (nodeType == null &&
                            skipTagTypes.indexOf(child.type.toUpperCase()) != -1) {
                            return;
                        }
                        if (child.nodeName == null && child.name) {
                            child.nodeName = child.name.toUpperCase() //cheerio oddness
                        }
                        if (child.nodeName) {
                            child.nodeName = child.nodeName.toUpperCase()
                            //asdf.g
                        }
                        var tagTypesVisibleCheck = ['SPAN', 'DIV']
                        if (tagTypesVisibleCheck.indexOf(nodeType) != -1
                            && $(child).is(':visible') == false) {
                            //console.error('skipping', child, $(child).is(':visible'))
                            return;
                        }
                        if (i == 27) {
                            // debugger
                        }
                        if (child.nodeName == 'PRE') {
                            console.error('skip PRE', child)
                            return;
                        }
                        if (child.nodeName == 'TITLE') {
                            console.error('skip TITLE', ui.html())
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

                            if (child.html == null) {
                                //child = ui;
                                //debugger
                            }
                            if (self.settings.debugAddingITem) {
                                console.log('--', 'div', child, ui.html())
                            }
                            //
                            self.utils.elementHasClassLike = function elementHasClassLike(element, txt) {
                                if (element.length > 0)
                                    element = element[0]
                                txt = txt.toLowerCase();
                                var widget = false
                                if (element.classList == null) {
                                    // debugger
                                    return false;
                                }
                                $.each(element.classList, function goTC(k, v) {
                                    if (v.toLowerCase().indexOf(txt) != -1)
                                        widget = true;

                                });
                                return widget;
                            }

                            var commentWidget = self.utils.elementHasClassLike(child, 'comments')
                            var widget = self.utils.elementHasClassLike(child, 'widget')
                            var recommended = self.utils.elementHasClassLike(child, 'recommended')

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
                            child.nodeValue = child.data;
                            // debugger;
                        }
                        var clearNodeText = false;
                        if ($.isString(child) || child.nodeName == '#text') {

                            var nodeTxt = child.nodeValue;

                            if (i > 270) {
                                if (nodeTxt == "\n") {
                                    var a_debug = h.currentSentence
                                }
                                if (nodeTxt != "\n" && nodeTxt.includes("\n") && i > 265) {
                                    var a_debug = h.currentSentence
                                    //debugger
                                }
                            }
                            /* if ( child.nodeValue == null) {
                             child.nodeValue = child.data;
                             if( child.nodeValue == null ) {
                             child.nodeValue = ''
                             }
                             debugger
                             }*/
                            if (child.nodeValue && child.nodeValue.trim() != '') {
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


                                var spanJ = $('<spanj/>')


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
                                /*if ( global.debugAddingSpanJ) {
                                 debugger
                                 }*/
                                if (txt.includes('Praise for')) {
                                    // debugger
                                }


                                /*
                                 function insertAtIndex(i) {
                                 if(i === 0) {
                                 $("#controller").prepend("<div>okay things</div>");
                                 return;
                                 }
                                 $("#controller > div:nth-child(" + (i) + ")").after("<div>great things</div>");
                                 }
                                 */


                                if (i == 0 && child.nodeName == '#text') {
                                    parent_.prepend(spanJ)
                                } else {
                                    parent_.append(spanJ)
                                }


                                //bookmark: best place to debug creating of child dom statements
                                //parent_.parent().append(spanJ) //if first val is text node?
                                if (global.debugAddingSpanJ) {
                                    debugger
                                }
                                //debugger;
                                //span.append(child); //wrap in span

                                //return false;
                                var splitSentences = h.utils.splitIntoSentencesSafe(txt, spanJ)
                                if (splitSentences.length > 0 && h.settings.debugSpans) {
                                    console.log('sentences', splitSentences)
                                }

                                //console.error('addingX ' +  tab +  child.nodeName +  $(child).is(':visible') ,
                                //    child , splitSentences)

                                child.nodeValue = ''
                                if (self.settings.dbgValueAndTextForSpans) {
                                    child.nodeValue = h.sentences.length + '[' + child.nodeValue + ']';
                                }
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
                                    h.currentSentence.trim().length > 0) {
                                    h.addSentence(h.currentSentence, h.lastParent[0], 'new line \\n')
                                }
                                if (nodeTxt && nodeTxt != "\n" && nodeTxt.includes('\n') &&
                                    h.currentSentence.trim().length > 0) {
                                    h.addSentence(h.currentSentence, h.lastParent[0], 'new line \\n -multiple')
                                }
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
                            h.breaksLine = true
                            //new sentence
                            h.addSentence2Force('', null, 'p');
                            h.quote.endQuoteForcily('p is breaking')
                        }
                        else if ($(child).is('br') || headingLike) {
                            //new sentence
                            h.breaksLine = true
                            h.addSentence2Force('', null, 'br tag like')
                            h.quote.endQuoteForcily('n is breaking')
                        }
                        else if ($(child).is('a')) {
                            h.addSentence2Force('', null, 'link')
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

                        self.data.prevChild = child;

                        if (clearNodeText) {
                            $(childOrig).text('bpusdf')

                            //  asdf.g
                        }

                    }
                )
            }

            getChild(parent)


            h.colorizeSentences();
//asdf.quotes h.utils.getQuotes(h.sentences)
            window.h = h;


            if (h.currentSentence && h.currentSentence.length > 0) {
                h.addSentence2('', null, 'last piece of sentence')
            }


            h.quote.endQuoteForcily()

            self.data.h = h;
            sh.writeFile(self.data.fileOutputHTMLTemp, $.html())
            //asdf//.2.10.2.is.this.in.rightplace
            // sh.writeFile(self.data.fileOutputHTMLTemp2, $.html())

            var ds2 = [];
            sh.each(h.dictSentences2, function onOPY(c, v) {
                var newO = {}
                sh.copyProps(v, newO)
                if (v.ui) {
                    //    asdf.g
                }
                sh.removeProps(newO, ['spans', 'ui', 'speaker', 'images'])
                ds2.push(newO)
                //console.log('c', c)
                try {
                    sh.clone(newO)
                } catch (e) {
                    console.error('no copy', e)
                    debugger
                }
            })
            var h2 = {}
            h2.dictSentences2 = ds2
            sh.writeJSONFile(self.data.fileOutputJSONTemp, h2)
            sh.log.file(self.data.fileOutputJSONTemp)
            /// sh.writeJSONFile(self.data.fileOutputJSONTemp2, h2)
        }
    }

    defineUtils();


    function defineWarnings() {
        self.data.warnings = [];
        p.parseWarnings = {}
        p.parseWarnings.addWarning = function addWarning(str, dO) {
            self.data.warnings.push({msg: str, dO: dO})
        }
    }

    defineWarnings()

    p.reviveSetupSentences = function reviveSetupSentences() {

        var contentsHTML = sh.readFile(self.data.fileOutputHTMLTemp)
        $ = cheerio.load(contentsHTML);

        global.$ = $;

        uiUtils = require('./ui_utils.js').uiUtils;
        u = uiUtils;

        extendUIUtils2()
        defineUtils2();

        var h = {};
        h = sh.readJSONFile(self.data.fileOutputJSONTemp)
        h.data = {}
        h.data.timeDate = new Date()
        self.data.h = h;


        /*sh.each(h.dictSentences2, function onOPY(c, v) {
         var newO = {}
         sh.copyProps(v, newO, ['spans'])
         ds2.push(newO)
         })*/

        var spans = $('[sentenceindex]')

        /* if ( spans.length == 0   ) {
         spans  = $('[sent-index]')
         }
         */
        if (spans.length == 0) {
            spans = $('[sentence-index]')
        }

        sh.each(spans, function onCopy(c, v) {
            var ui = $(v)
            var si = ui.attr('sentenceindex')
            if (si == null) {
                si = parseInt(ui.attr('sentence-index'))
                si -= 1
            }
            var dictObj = h.dictSentences2[si]


            if (dictObj.spans == null) {
                dictObj.spans = sh.dv(dictObj.spans, [])
                dictObj.ui = ui;
            } else {
                var y = {}
            }
            //dictObj.spans.push(ui)
            dictObj.spans.push(ui)
        })


    }

    p.processMeta = function processMeta() {

        var h = self.data.h;
        console.log('took-preprocess', u.secs(h.data.timeDate))
        self.findQuoteSpeakers();
        console.log('took-speakerprocess', u.secs(h.data.timeDate))
    }
    p.saveStuff = function saveStuff() {

        var h = self.data.h;
        //sh.x()

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

        var script =
            `
                    function setTimeout2() { 
                        var sH = window.sentenceHelper; 
                        console.log('sh', sH)
                        $.each(window.sentences, function reConsistute(k,v) { 
                            if(v.images == null) {
                             v.images = []
                            }
                        });
                       // debugger
                        sH.sideLoadSentences(window.sentences)
                        
                        //$('#debugCharactersDialog').remove()
                    }
                    setTimeout(setTimeout2, 750)
                    `
        script += sh.n
        if (self.settings.showVoicing == false) {
            script += "$('#debugCharactersDialog').remove()"
        } else {
            //asdf.g
        }

        script += sh.n
        var scripts = '';
        scripts += sh.html.wrapInHTMLTag(script, 'script')

        //console.log()

        var script = '' + 55
        //var clone = sh.clone(h.dictSentences2)
        var clone = (h.dictSentences2)
        //console.log('clone', clone)
        sh.each(clone, function rem(k, v) {
            v.spans = null
            delete v.spans
            delete v.breaksLink
            delete v.ui
            delete v.speaker
            delete v.images

            return;
            try {
                sh.clone(v)
            } catch (e) {
                console.log('cant cag', k)
                debugger
            }
        })
        script = 'window.sentences = ' + sh.toJSONString(clone)


        scripts += sh.html.wrapInHTMLTag(script, 'script')


        sh.writeFile(fileOutput, $.html() + scripts)
        sh.writeFile(fileOutput + 'sentences.json', sh.toJSONString(clone))
        sh.log.file(fileOutput + 'sentences.json')

        //sh.writeJSONFile(fileOutput + 'dictVoices.json', self.data.scO.dictVoices)


        sh.writeJSONFile(fileOutput + '.flowIndex.json', self.data.scO.data.flowIndex.data.dict)
        sh.writeJSONFile(fileOutput + '.speaker.rules.json', self.data.scO.settings)
        self.data.scO

        $('#debugCharactersDialog').remove()

        sh.writeFile(self.data.fileOutputHTMLTemp2 + '.dbg.html', $.html())
        if (self.settings.showDbgBlocks != true) {
            //asdf.g
            //Plz use the dbg version ...
            $('.debugBlockTxt').remove()
        } else {
        }
        if (self.settings.debugSentencesColoring != true) {
            $('.highlight2').removeClass('highlight2')
            $('.highlight3').removeClass('highlight3')
            $('.highlight4').removeClass('highlight4')
            //  asdf.g
        }
        sh.writeFile(self.data.fileOutputHTMLTemp2, $.html())
        sh.writeFile(self.data.fileOutputHTMLTemp2 + '.sentences.json', sh.toJSONString(clone))
        if (self.settings.jsonMode != true) {
            sh.writeJSONFile(self.data.fileOutputHTMLTemp2 + '.flowIndex.json', self.data.scO.data.flowIndex.data.dict)
            sh.writeJSONFile(self.data.fileOutputHTMLTemp2 + '.speaker.rules.json', self.data.scO.settings)
        }
        sh.log.file(self.data.fileOutputHTMLTemp2, 'output in dir');
        link = sh.deos(self.data.fileOutputHTMLTemp2)
        link = sh.fs.slash(link)
        link = sh.str.after(link, 'extracted/')
        // link = sh.str.before(link, '/epub_offline.html')
        link = 'http://127.0.0.1:8080/epub_reload_viewer.html?loadBookFile=' + link
        link = encodeURI(link)

        console.log(link)
        // sh.log.file('http://127.0.0.1:8080/epub_reload_viewer.html?loadBookFile='+link)
        var q = h.quote
        console.log('took', u.secs(h.data.timeDate))

        //sh.log.file(self.data.fileOutputHTMLTemp );
//  console.log('q', q.data.nouns)
        if (module.parent == null || self.settings.updateViewer) {
            var ReloadWatcher = require('./ReloaderWatcher.js').ReloadWatcher;
            ReloadWatcher.reloadFile('bookCvert')
        }
// debugger
        return;
    }

    p.defineEpubsOverrides = function defineEpubsOverrides() {
        var i = new OverrideEpubRuleSet();
        var config = {};
        config.startRange = 162
        config.endRange = 180
        config.fxOverrideEpub = function fxOverrideEpub(dictO) {
            // asdf.g
            //  return;
            var txt = dictO.txt
            txt = txt.trim();
            if (txt.startsWith('BigSis:')) {
                dictO.speakInVoice = 'Rachel'
                txt = txt.replace('BigSis:', 'BigSis:, "')
                // dsdf.g
                dictO.txt = txt;
                dictO.ui.text(txt)
                //dictO.span.text(txt)
            }

            if (txt.startsWith('Celine Lim:')) {
                dictO.speakInVoice = 'Rachel'
                txt = txt.replace('Celine Lim:', 'Celine Lim:, "')
                // dsdf.g
                dictO.txt = txt;
                dictO.ui.text(txt)
                //  dictO.span.text(txt)
            }


            //if ( )
            console.log('hit it', dictO)
            //process.exit();
        }
        i.init(config)

        var c = new OverrideEpubRuleSet_Container();
        var config = {};
        config.debugEpubOMatches = true;
        c.init(config)
        c.addEpubOver(i)

        self.data.cEpubOv = c;

        return;
        var dO = {}

        c.getEpubOverForSi(80, dO)
        c.getEpubOverForSi(161, dO)
        c.getEpubOverForSi(162, dO)
        c.getEpubOverForSi(179, dO)
        c.getEpubOverForSi(181, dO)
    }


    p.findQuoteSpeakers = function findQuoteSpeakers_V2() {


        var panel = uiUtils.addDialog({})
        u.pos.tl()

        var btn = $('<button/>')
        btn.text('close')
        btn.attr('onclick', ' $("#debugCharactersDialog").remove()')
        panel.append(btn)


        u.table.makeTable()
        time = 56
        //u.table.addRow('x', 'y')
        // u.table.addRow('time', time)

        panel.append(uiUtils.lastTable)
        panel.css('position', 'fixed')
        panel.css('overflow-y', 'auto')
        panel.css('height', '350px')
        panel.css('width', 'calc(100% - 350px)')
        panel.css('z-index', '1001')
        panel.attr('id', 'debugCharactersDialog')
        panel.addClass('debugCharactersDialog')
        //panel.css('opacity', 0.8)
        panel.css('right', '10px')
        $('body').prepend(panel)

        //bookmark: parsing speaking quotes

        function getIndex(i) {
            var dictObj = h.dictSentences2[i]
            if (dictObj) {
                if (dictObj.stats == null) {
                    var s = {}
                    var nlp = require('compromise')
                    var y = nlp(dictObj.txt)//.nouns()
                    s.verbs = y.verbs().out('array')
                    var speakingWords = ['said']
                    var y = sh.isAnyInAny2(speakingWords, s.verbs, false)
                    if (y.length > 0) {
                        // debugger
                    }
                    s.speakingVerbs = y;
                    dictObj.stats = s;
                }
            }

            return dictObj;
        }

        function searchForward(i) {
            var o = h.dictSentences2[i]
            var d = {};
            d.sents = {};
            d.sents.dictObjs = []
            d.sents.txt = [];
            //for ( var id = i; i < i+5; i++)
            var times = '123456789123456789'.split('')
            $.each(times, function searchForwardUntilNextQuote(k, v) {
                var idx = i + k;
                var dictObj = h.dictSentences2[idx + 0]
                var dictObjNext = h.dictSentences2[idx + 1]
                // console.log('ok', k,v)
                if (dictObj == null) {
                    return false;
                }
                d.sents.dictObjs.push(dictObj)
                d.sents.txt.push(dictObj.txt);
                dictObj.processedQuotes = true

                if (dictObjNext == null) {
                    return false;
                }

                d.sents.dictObjs.push(dictObj);

                if (dictObjNext.breaksLink) {
                    d.lastDictObjIndex = idx + 1;
                }
                /*if (k == 0) {
                 var split = dictObj.txt.slice(1).split('"')

                 if (dictObj.txt.slice(1).includes('"')) {
                 d.sents.firstOne
                 d.sents.firstOneQuote = split[0]
                 d.sents.firstOnceEnding = split[1]
                 endQuote = true;
                 d.next = dictObjNext
                 d.lastDictObjIndex = idx;
                 ///d.next = null
                 // d.sents.nextText =  d.sents.firstOnceEnding
                 return false;
                 }
                 } else {
                 if (dictObj.txt.includes('"')) {

                 endQuote = true;
                 d.next = dictObjNext
                 d.lastDictObjIndex = idx;
                 return false;
                 }
                 }*/


            })

            d.prev = h.dictSentences2[i - 1]
            if (d.prev) {
                d.sents.prevText = (d.prev.txt);
                if (o.breaksLink) {
                    d.sents.prevText = '~pb'
                }
            }
            if (d.next) {
                d.sents.nextText = (d.next.txt);
                var nextSpan = getFirstSpan(d.next)

                if (o.breaksLink) {
                    //  d.sents.nextText = '_b'
                }

                if (d.next.breaksLink) {
                    d.sents.nextText = '~nb'
                }
            }


            if (o.txt.includes('ding')) {
                //debugger
            }
            if (o.txt.includes('did you expect')) {
                debugger
            }
            function getFirstSpan(o) {
                var firstSpan = null;

                $.each(o.spans, function getF(k, v) {
                    v = $(v)
                    firstSpan = v;
                    return false;
                })
                return firstSpan
            }

            var firstSpan = getFirstSpan(o)
            var yy = $(firstSpan).css('top')
            d.sents.txt = d.sents.txt.join(' ')

            /*$.each(times, function searchBackwards(k,v) {
             var dictObj = h.dictSentences2[i+k+1]
             console.log('ok', k,v)
             if (dictObj == null) {
             return false;
             }
             d.sents.push(dictObj)
             if ( dictObj.txt.includes('"')) {
             endQuote = true;
             d.next = h.dictSentences2[i+k+1+1]
             return false;
             }

             })*/


            return d;

        }

        function getSpeakerInfo(ith) {
            var speakerInfo = {}
            var sI = speakerInfo;

            var txt = ith.nonQuotes.join(' ')

            //txt = txt.toLowerCase();

            words = txt.match(/\S+/g) || []

            if (txt.includes('said')) {
                asdxf.g.s
                speakerInfo.speakingVerb = 'said'
                var i = words.indexOf('said')
                var prev = words[i - 1]
                var next = words[i + 1]

                if (sh.str.isCapitalized(prev)) {
                    sI.speaker = prev;
                }
                if (sh.str.isCapitalized(next)) {
                    sI.speaker = next;
                }
                if (sI.speaker == null) {
                    sI.speakerLastResort = 'prev'
                    sI.speaker = prev;
                }
                if (sI.speaker == null) {
                    sI.speakerLastResort = 'next'
                    sI.speaker = next;
                }
            }

            var validVerbs = ['purred']

            var validPeople = ['big man']
            if (txt.includes('reassured')) {
                debugger
            }

            if (speakerInfo.speakingVerb == null) {
                var verbs = nlp(txt).verbs().out('array');
                if (itH.debugAllQuotes)
                    console.log('verbs', verbs)
                sI.verbs = verbs;
            }


            if (speakerInfo.speakingVerb == null) {
                var verbs = nlp(txt).verbs().out('array');
                if (verbs.length == 0) {
                    var forcedVerbs = sh.isAnyInAny2(words, validVerbs, false)
                    var i = words.indexOf(forcedVerbs[0])
                    var prev = words[i - 1]
                    var next = words[i + 1]
                    asd.f.g
                    sI.speaker = prev
                    sI.verbs = verbs
                    speakerInfo.speakingVerb = forcedVerbs[0]
                }

                //console.log(verbs)
            }

            //console.log('speakerInfo', speakerInfo)

            return speakerInfo;
        }


        wroteHeader = false;
        var ic = 0
        var itH = new STBlockParser();
        itH.init();
        //itH.startAt = 100;
        //itH.endAt = 110;
        //  itH.startAt = 50; //Velma issue?
        // itH.startAt = 95;
        // itH.startAt = 60;
        //itH.endAt = 70;
        //itH.endAt = 8;

        //start at quotes
        //itH.startAt = 55;
        //itH.startAt = 45;

        /*
         var speakerTextBlock = new SpeakerTextBlock()
         sTB = speakerTextBlock
         itH.currentBlock = sTB
         itH.blocks.push(sTB)
         */
        itH.addNewSTBBlock();

        itH.data.unknowns = [];
        //return;

        itH.addGlobalSpeaker = function addGlobalSpeaker(sTB) {
            var gSName = sTB.data.globalSpeaker;
            if (gSName == null) {
                gSName = sh.join('item', itH.data.unknowns.length)
                // sh.throw('sdflskdjflskdjflk no name')
            }
            var origGSName = gSName;
            gSName = itH.data.scO.fixSpeaker(itH.currentBlock)

            if (gSName) {
                gSName = gSName.toLowerCase();
            }

            var s = itH.data.dictGlobalSpeakers[gSName];

            if (s == null) {
                s = new GlobalSpeaker();
                s.data.globalSpeakerName = sTB.data.globalSpeaker;
                s.data.json = itH.data.scO.data.current.mergeVoices[s.data.globalSpeakerName];
                itH.data.gSpeakers.push(s);
                s.data.gsIndex = itH.data.gSpeakers.length;
            }
            itH.data.dictGlobalSpeakers[gSName] = s;
            s.addSpeakerTextBlockToSpeaker(sTB);
            // self.settings.skipHihglihSpeaker= false
            if (self.settings.skipHihglihSpeaker != false) {
                sTB.replaceTextNounStr(origGSName, gSName)
            }

            // debugger
            return s;
        }
        var h = self.data.h;


        var scO = new SpeakerConfigOverrides()
        scO.init(self.data.speakerConfigFile)
        itH.data.scO = scO;
        self.data.scO = scO;


        if (sh.isArray(h.dictSentences2) == false) {
            h.dictSentences2 = sh.convertToArray(h.dictSentences2)
        }

        var colorRangeSentiment = u.convertColor('#0000ff', '#ff3300', 20)
        colorRangeSentiment = JSON.parse(colorRangeSentiment)
        $.each(h.dictSentences2, function createModelForDOs(i, dictObj) {
                dictObj.dOIndex = i;

                if (dictObj.txt.includes('eyebrows')) {
                    debugger
                }

                dictObj.nouns2 = itH.getNounsImp(dictObj.txt);
                dictObj.highfreq = itH.getNounsImpHigh(dictObj.txt);
                if (dictObj.highfreq == null) {
                    delete dictObj.highfreq
                }
                var sentiment = require('sentiment');
                var r2 = sentiment(dictObj.txt);
                //console.dir(r2);
                delete r2.tokens

                if (r2.words.length == 0) {
                    r2 = null
                } else {
                    dictObj.sentiment = r2
                    var sScore = r2.comparative.toString().slice(0, 4)
                    var div = u.wordTag(sScore, 'orange')
                    u.makeAbs();
                    //u.pos(null, null, 10, null)
                    u.pos(null, null, null, null)
                    u.pos(0, -30, null, null)
                    sScore = parseFloat(sScore);
                    //u.
                    //u.setBgScale(sScore, div)
                    if (sScore > 0) {
                        bgColor = 'green'
                    } else {
                        bgColor = 'red'
                    }
                    u.bg(bgColor)
                    u.color('white')
                    //u.opacity(Math.abs(sScore) )

                    var sScore2 = (sScore + 1) / 2
                    var bgColor = u.convertValRange(sScore2, colorRangeSentiment);
                    u.bg(bgColor)

                    if (dictObj.ui == null || dictObj.ui.length == 0) {
                        dictObj.ui = sTB.getSentenceIndex(dictObj.sentenceIndex)
                    }
                    if (dictObj.ui) {
                        var addToSpan = dictObj.ui;
                    } else {
                        var addToSpan = sh.dict.getFirst(dictObj.spans)
                        debugger
                    }
                    var addToSpan = sh.dict.getFirst(dictObj.spans)
                    //debugger

                    if (addToSpan) {
                        u.makeRel(addToSpan)
                        addToSpan.append(div)
                    }

                }


                if (dictObj.nouns2.length == 0) {
                    delete dictObj.nouns2
                }

                //return

                if (itH.catchUpToIndex > i) {
                    console.log('createModelForDOs', 'skip to', itH.catchUpToIndex, i)
                    return;
                }
                /*  if (itH.abbrv && i > 70) {
                 return false;
                 }

                 if (itH.abbrv2 && i < 60) {
                 return;
                 }
                 */

                if (itH.startAt && i < itH.startAt) {
                    return;
                }

                if (itH.endAt && i > itH.endAt) {
                    return false;
                }

                //bookmark. this is prevent sbreaking
                // return;
                itH.currentBlock.addDO(dictObj)

                //asdf.g
                //fix for breaking link?
                for (var ix = i + 1 - 1; ix < h.dictSentences2.length; ix++) {
                    var nextDO = h.dictSentences2[ix]
                    nextDO.dOIndex = ix;

                    if (nextDO.breaksLink) {
                        itH.catchUpToIndex = ix + 0
                        console.log('createModelForDOs', 'catch up to ', ix, nextDO.txt)
                        itH.currentBlock.processQuotesInBlock()
                        scO.getChapter(itH.currentBlock)
                        itH.currentBlock.showDOTexts();
                        //scO.fixSpkeaer(itH.currentBlock)
                        if (nextDO.txt.includes('What  is that?')) {
                            debugger
                        }
                        itH.currentBlock.getGlobalSpeaker(itH, scO)
                        itH.addNewSTBBlock()
                        break;
                    } else {
                        itH.currentBlock.addDO(nextDO)
                        if (self.settings.file.includes('Crazy Rich')) {
                            if (self.data.overridesEpub) {

                                self.data.cEpubOv.getEpubOverForSi(nextDO.sentenceIndex, nextDO)
                            } else {
                                self.data.overridesEpub = true;
                                self.defineEpubsOverrides()
                            }
                        }
                    }
                }
                return;

            }
        );

        //self.settings.skipProcessBlocks = true;
        //return;
        var divFile = self.data.speakerConfigFile

        var dictChars = {}
        var actors = [];
        //sh.x('blovcks', itH.blocks.length)
        $.each(itH.blocks, function postProcessBlocks(i, block) {

            if (block.data.txt == '') {
                return;//skip empty blocks

            }
            if (self.settings.skipProcessBlocks) {
                console.log('skipprocess blocks')
                asdf.g
                return;
            }

            block.data.htmlsize = block.data.ui.html().length

            var prevBlock = itH.blocks[i - 1]
            var prev2Block = itH.blocks[i - 2]
            var nextBlock = itH.blocks[i + 1]

            /*
             var div = u.tag('div')

             u.styleDialog(null, false)
             div.addClass('debugBlockTxt')
             u.bg('#DEDEDE')
             div.text('start-blocka ' + i)
             //asdf.g
             block.prependDO(div)
             //block.appendDO(div)
             u.makeRel(div)
             */

            /* if (block.data.ui.parent().length == 0) {
             //prepending will not work here
             console.log('postProcessBlocks', i,'args',  'zer zero zeo', i)
             }*/

//asdf.g
            function addBlockDebugUIToDOM() {
                //append pre-block
                var div = u.tag('div')
                u.bg('#c6c6c6')
                div.text('start-block ' + i)
                div.addClass('debugBlockTxt')
                u.makeRel(div)

                ///////////////
                //block.prependDO2(div)
                //
                div.append(block.data.ui)
                //return;
                if (block.data.ui2.html().length > 0) {
                    // debugger
                }

                div.append(block.data.ui2)

                block.prependDO2(div)
// block.appendDO(div) //the compromise

                var div = u.tag('div')
                u.bg('#f2f2f2')
                div.text('end-block ' + i)
                div.addClass('debugBlockTxt')
                block.appendDO(div)
            }

            addBlockDebugUIToDOM()
            ////console.log('...', '')
            if (block.data.sI == null) {
                debugger
            }

            return;


        });


        self.data.scO.postProcSCO()
        return;

    }

}

function ProcessEpubOffline() {
    var p = ProcessEpubOffline.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        // if ( sh.fs.exists())
        var ignoreJSONEpubErrors = sh.dv(self.settings.ignoreJSONEpubErrors, false);

        self.data.speakerConfigFile = sh.readJSONFile(self.settings.file + '.speaker.rules.json', {}, ignoreJSONEpubErrors)
        return
    }

    p.loadJSONToc = function loadJSONToc() {
        //  self.settings.maxJSONRuns = 2
        sh.throwIf(self.settings.breakEpubJSON)
        if (self.settings.jsonMode) {
            self.settings.fileOrig = (self.settings.file)
            var dir = sh.fs.base(self.settings.fileOrig)
            if (self.data.jsonTOC == null) {
                var dir = sh.fs.base(self.settings.file)
                var fileJSONTOC = sh.fs.join(dir, 'toc.json')
                self.data.jsonTOC = sh.readJSONFile(fileJSONTOC)
                self.data.jsonFlat = self.data.jsonTOC.flat
                self.data.flat = self.data.jsonFlat.concat();
                if (self.settings.maxJSONRuns) {
                    var startIndex = 0
                    if (self.settings.maxJSONRunsOffset) {
                        startIndex = self.settings.maxJSONRunsOffset;
                    }
                    // startIndex += 2
                    self.data.flat = self.data.jsonFlat.slice(startIndex, startIndex + self.settings.maxJSONRuns)

                    console.log('run with')
                    console.log(self.data.flat)
                }
            }

            self.settings.showDbgBlocks = false;
            self.goToNextSetJSONMode()
        }
    }
    p.loadFile = function loadFile() {
        if (self.data.loadedJSON != true) {
            self.loadJSONToc();
            self.data.loadedJSON = true
        }
        //  asdf.g
        var maxSize = 50 * 1000
        if (self.settings.maxSize !== undefined) {
            maxSize = self.settings.maxSize;
        }

        console.log('starting with file', self.settings.file, 'maxSize', maxSize)
        sh.log.file(self.settings.file)
        sh.log.file(sh.fs.path(self.settings.file))
        self.settings.file = sh.deos(self.settings.file)

        //  asdf.mon3.day30.howtosetfilter
//file = "G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/testquotesepub/epub.html"
//file = "G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/testquotesepub/epub_text.html"
        var contents = sh.readFile(self.settings.file);
        console.log(self.settings.file)
        console.log('orig', contents.length)
        if (maxSize && contents.length > maxSize) {
            //contents = contents.slice(0, contents.length *
            contents = contents.slice(0, maxSize)//contents.length * .03)
        }


//settings.showVoicing = false;
        var contentsHTML = '<div id="txtWrapper">' + contents + '</div>'
        var $ = cheerio.load(contentsHTML);
        global.$ = $;

        uiUtils = require('./ui_utils.js').uiUtils;
        u = uiUtils;

        extendUIUtils2()
        defineUtils2();

        self.data.contents = contents
    }

    p.convertFile = function convertFile(quickMode) {

        var helper = {};

        var $scope = window.$scope;
        window.helper = helper;


        console.log("starting speaker");
        var t = new SentenceHelper();
        window.sentenceHelper = t
        t.settings = self.settings;

        function runXEpub() {
            t.init();
            if (quickMode != true) {
                t.setupSentences();
            } else {
                t.reviveSetupSentences();
            }
            t.data.speakerConfigFile = self.data.speakerConfigFile
            t.processMeta();
            t.saveStuff()
            console.log('saved stuff')
            if (self.settings.jsonMode) {
                self.goToNextSetJSONMode(runXEpub);
            }
        }

        runXEpub()


    }


    defineUtils = function defineUtils() {

    }
    defineUtils()

    p.goToNextSetJSONMode = function goToNextSetJSONMode(redo) {
        var dir = sh.fs.base(self.settings.fileOrig)
        self.settings.currentFile = self.data.flat.shift()
        console.log('remaining', self.data.flat.length, 'on next?', self.settings.currentFile != null)

        if (self.settings.currentFile == null) {
            console.log('done')
            return;
        }
        //self.settings.currentJSONFilename = sh.fs.leaf(self.settings.currentFile.file)
        self.settings.currentJSONFilename = self.settings.currentFile.file

        self.settings.dirJSONSets = sh.fs.join(dir, 'jsonSets');
        sh.fs.mkdirp(self.settings.dirJSONSets)

        self.settings.file = sh.fs.join(dir, self.settings.currentFile.file);

        if (redo && self.settings.currentFile) {
            self.loadFile();
            console.log(sh.n, 'again')
            redo()
        }
    }
    p.saveFile = function saveFile() {
        return;
        var dirStore = sh.fs.trash('bookCvert')
        sh.fs.mkdirp(dirStore)
        var fileOutput = sh.fs.join(dirStore, 'test_pdf.html')

        if (self.settings.fileOutput) {
            fileOutput = self.settings.fileOutput;
        }

        sh.writeFile(fileOutput, $.html())
        // sh.writeFile(fileOutput, self.data.contents)

        var fileMetas = fileOutput + self.data.bookname + '.xlist.json';
        sh.writeFile(fileMetas, sh.toJSONString(self.data.pH.cSH.sentenceObjs))
        var fileJSONs = fileOutput + '.json';
        sh.writeFile(fileJSONs, sh.toJSONString(self.data.pH.cSH.sentenceObjs))
        //  console.log('q', q.data.nouns)
        sh.log.file(fileJSONs)
        sh.log.file(fileMetas)

        self.data.fileJSONSentences = fileJSONs
        self.data.sentenceLength = self.data.pH.cSH.sentenceObjs.length;
        //

        if (self.settings.fileOutput == null) {
            var ReloadWatcher = require('./../ReloaderWatcher.js').ReloadWatcher;
            ReloadWatcher.reloadFile('bookCvert2')
            // debugger
        }
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ProcessEpubOffline = ProcessEpubOffline;

if (module.parent == null) {
    var i = new ProcessEpubOffline();
    var config = {};

    let file = "G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Farewell My Lovely  Raymond Chandlerepub/epub.html"

    file =
        'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/Wilde_Oscar_The_Picture_Of_Do  Unknownepub/epub.html'
    /*
     file =
     'G:/Dropbox/projects/delegation/Reader/TTS-Reader/uploads/extracted/The Mind Illuminated_ A Complet  John Yatesepub/epub.html'

     config.maxSize =  null
     */

    config.file = file

    i.init(config)
    var quickMode = true;
    //quickMode = false;
    if (quickMode == false) {
        i.loadFile()
    } else {

    }

    i.convertFile(quickMode)
    i.saveFile()
}

console.log('loaded file speakHTMLTest_Cleaned.js')



