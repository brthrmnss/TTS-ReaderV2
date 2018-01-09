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
