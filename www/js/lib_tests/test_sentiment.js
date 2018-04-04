var sentiment = require('sentiment');

var r1 = sentiment('Cats are stupid.');
console.dir(r1);        // Score: -2, Comparative: -0.666

var r2 = sentiment('Cats are totally amazing!');
console.dir(r2);


var sent = 'This is an outrageous example of malicious use of the power of the judicial system.'
var r2 = sentiment(sent)
console.dir(r2);


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var uiUtils = {};

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

sent = 'She arrived at the polling place, provided identification, and filed a provisional ballot with the aide of a precinct worker when her name was not on the voter roll. Her provisional ballot was rejected and her vote was not counted. For this she will spend five years in prison? '
var nouns = GetNouns2(sent);

var nouns = GetNouns2(sent);

console.log('nouns', nouns)


//var SummaryTool = require('node-summary');



var title = "Swayy is a beautiful new dashboard for discovering and curating online content [Invites]";
var content = `
She arrived at the polling place, provided identification, 
and filed a provisional ballot with the aide of a precinct 
worker when her name was not on the voter roll. 
Her provisional ballot was rejected and her vote was not counted. 
For this she will spend five years in prison? 
This is an outrageous example of malicious use of 
the power of the judicial system.
`
content = content.replace(/\n/gi, '')


console.error('content', content)
var html = sh.html.wrapInHTMLTag(content, 'html')
var summarize = require('summarize');
//var superagent = require('superagent');
var y = summarize('', null, content)
//superagent
  //  .get('http://kotaku.com/an-album-a-minecraft-style-game-both-1625202335')
    //.end(function(res) {
        console.log(y);
    //});


/*




SummaryTool.summarize(title, content, function(err, summary) {
    if(err) console.log("Something went wrong man!");

    console.log(summary);

    console.log("Original Length " + (title.length + content.length));
    console.log("Summary Length " + summary.length);
    console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
});
*/
var summarize = require ("text-summary");

var text =content;
var numberSentences = content.split('.').length
var question = "What is the price of an umbrella?";

var summary = summarize.summary(text, numberSentences);

var summaryWithQuestion = summarize.summaryWithQuestion(question, text, numberSentences);
console.log('summary:')
console.log(summary);



var SummaryBot = require('summarybot');
var summarizer = new SummaryBot()
var summary = summarizer.run(text, numberSentences, true)

console.log('summary2:')
console.log(summary)