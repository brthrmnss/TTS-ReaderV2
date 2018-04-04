/**
 * Created by user1 on 1/27/2018.
 */
var sh = require('shelpers').shelpers;

var pos = require('pos');
var words = new pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);
for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    console.log(word + " /" + tag);
}

var words = new pos.Lexer().lex("Do you know what time it is?");
var words = new pos.Lexer().lex("From  the  corner  of  the  divan  of  Persian  saddle-bags  on  which  he  was  lying,  smoking,  as  usual,  innumerable  cigarettes,  Lord  Henry  Wotton  could  just  catch  the  gleam  of  the  honey-sweet  and  honey-colored  blossoms  of  the  laburnum,  whose  tremulous  branches  seemed  hardly  able  to  bear  the  burden  of  a  beauty  so  flame-like  as  theirs;  and  now  and  then  the  fantastic  shadows  of  birds  in  flight  flitted  across  the  long  tussore-silk  curtains  that  were  stretched  in  front  of  the  huge  window,  producing  a  kind  of  momentary  Japanese  effect,  and  making  him  think  of  those  pallid  jade-faced  painters  who,  in  an  art  that  is  necessarily  immobile,  seek  to  convey  the  sense  of  swiftness  and  motion. ");
var words = new pos.Lexer().lex(
    "Lord  Henry  stretched  his  long  legs  out  on  the  divan  and  shook  with  laughter."
);
var words = new pos.Lexer().lex(
    "Lord Henry went out to the garden, and found Dorian Gray burying his face in the great cool lilac-blossoms, feverishly drinking in their perfume as if it had been wine."
);
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);
console.log(taggedWords)

var nouns = [];
for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    //  console.log(word + " /" + tag);
    if ( tag.startsWith('NN')) {
        nouns.push(word)
    }
}

console.log('nouns', nouns.join(', '))

var sent = 'The term "intellectual capital" seems to have been employed first in 1958, when two financial analysts, describing the stock-market valuations of several small, science-based companies (Hewlett-Packard, its annual sales then $28 million, was one of them), concluded, "The intellectual capital of such companies is perhaps their single most important element" and noted that their high stock valuations might be termed an "intellectual premium."'

function getNouns(sent) {
    var tagger = new pos.Tagger();
    var words = new pos.Lexer().lex( sent );
    var taggedWords = tagger.tag(words);


  //  console.log(taggedWords)

    var nouns = [];
    for (i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
          console.log(word + " /" + tag);
        if ( tag.startsWith('NN')) {
            nouns.push(word)
        }
    }

    return nouns;
}

console.log('nouns', getNouns(sent).join(', '))