var nlp = require('compromise')

var doc = nlp('London is calling')
doc.sentences().toNegative()
// 'London is not calling'
var sentence = '	A deep soft voice said to me, quietly:'
var y = nlp(sentence).nouns().out('array');

console.log('y', y)
y = nlp(sentence).verbs().out('array');
console.log('y', y)
console.log(nlp(sentence).terms().out('array'))

sentence = 'The big man stared at me solemnly and went on wrecking my shoulder with his hand.'
y = nlp(sentence).nouns().out('array');
console.log('y', y)
y = nlp(sentence).verbs().out('array');
console.log('y', y)
y = nlp(sentence).nouns().out('array');
console.log('y', y)


txt = "He wasn't listening to me. Steve went home to Maryland"
txt = "Pick it up I said. Why are you here?"
//txt = "He wasn't listening to me lately."
var nlpOutput = nlp(txt)
var sh = require('shelpers').shelpers;

sh.each(nlpOutput, function ok(k,v) {
    try {
        console.log('v', v)
        console.log('...', nlpOutput[v]())
    } catch ( e ) {

    }
})


sh.each(nlpOutput.__proto__, function ok(k,v) {
    try {
        console.log('ss', k, v.name)
        //var yy = eval('nlpOutput[v.name]()')
        var output = nlpOutput[k]().out('array')
        console.log('...', output)
    } catch ( e ) {

     //   console.error('e', e)
    }
})

var nouns = nlpOutput.nouns().out('array')
console.log('nouns', nlpOutput.topics().out('array'))
console.log('nouns', nouns)
console.log('debug', nlpOutput.debug().out('array'))
console.log('verbs', nlpOutput.verbs().out('array'))
