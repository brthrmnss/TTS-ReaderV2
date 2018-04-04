/**
 * Created by user1 on 1/27/2018.
 */
var sh = require('shelpers').shelpers;

var sentiment = require('sentiment');
var nlp = require('compromise')


var r1 = sentiment('Cats are stupid.');
console.dir(r1);        // Score: -2, Comparative: -0.666

var sentence = 'Cats are totally amazing!'
sentence = 'bitches are shits, and liars'
var r2 = sentiment(sentence);
console.log(r2)

var speak = require("speakeasy-nlp");

// Analyze sentences at a basic level
// ------------------------------------- //
speak.classify("What is your name?")             //=> { action: "what", owner: "listener", subject: "name" }
speak.classify("Do you know what time it is?")   //=> { action: "what", owner: "it", subject: "time" }


var sentences = ['bitches are shits, and liars',

];
txt = "He wasn't listening to me" //. Steve went home to Maryland"
sentences.push(txt)
txt = "Pick it up I said." // "
sentences.push(txt)
txt = "Why are you here?"
sentences.push(txt)

sh.each(sentences, function classify(k,v) {
    console.log()
    console.log(v)
    var yyy = speak.classify(v)
    console.log(yyy)

    y = nlp(v).topics().out('array');
    console.log(y)
    y = nlp(v).nouns().out('array');
    console.log(y)
})
// Sentiment analysis
// ------------------------------------- //
speak.sentiment.negativity("I hate your guts")   //=> { score: 1, words: [hate] }
speak.sentiment.positivity("I love you")         //=> { score: 1, words: [love] }

speak.sentiment.analyze("I love you, but you smell something aweful")