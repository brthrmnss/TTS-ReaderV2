/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;



function TestEvalRemoteJSONPos() {
    var p = TestEvalRemoteJSONPos.prototype;
    p = this;
    var self = this;


    function defineUtils() {
        p.utils = {}
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

TestEvalRemoteJSONPos.setVal = function setVal(key, val, startingVal2) {
    start = sh.dv(startingVal2, startingVal)

    var arr = key.split('.')
    var arr2 = arr.concat();
    var last = start;
    var lastProp = arr.pop()

    function isPropAct(prop) {
        var onArray = false
        if (prop.startsWith('[')) {
            onArray = true
            prop = prop.slice(1, -1)
            prop = parseInt(prop)
        }
        if (sh.isNumber(prop)) {
            onArray = true
        }
        return {onArray: onArray, prop: prop}
    }

    sh.each(arr, function getPRo(k, prop) {
        var isProp = isPropAct(prop)
        onArray = isProp.onArray
        prop = isProp.prop
        var nextProp = arr2[k + 1]
        if (nextProp) {
            var isProp2 = isPropAct(nextProp);
            if (isProp2.onArray) {
                onArray = isProp2.onArray
            }
        }

        var curVal = last[prop]

        if (curVal == null) {
            curVal = {}

            if (onArray) {
                curVal = []
            }
            last[prop] = curVal
            last = curVal
        } else {
            last = curVal
        }
    })

    function convertPRop(last, prop, val) {
        onArray = false
        if (prop.startsWith('[')) {
            onArray = true
            prop = prop.slice(1, -1)
            prop = parseInt(prop)
        }
        if (sh.isNumber(prop)) {
            onArray = true
        }

        var curVal = last[prop]

        if (curVal == null) {
            //curVal = {}

            //if (onArray) {
                curVal = val
          //  }

            last[prop] = curVal
            //last = curVal
        } else {
            last[prop] = val
        }


    }

    // lastProp =
    convertPRop(last, lastProp, val)
    // last[lastProp]=val


    console.log(start)
}


exports.TestEvalRemoteJSONPos = TestEvalRemoteJSONPos;
if (module.parent == null) {

    var startingVal = {}


/*    var set2 = 'caster oil.[1]'
    TestEvalRemoteJSONPos.setVal(set2, {test: 'name', obj: 'frame'})
    var set2 = 'aaa.bbb.ccc'
    TestEvalRemoteJSONPos.setVal(set2, 5)
    var set2 = 'caster oil.[0]'
    TestEvalRemoteJSONPos.setVal(set2, 'yyyy')*/

    var set2 = 'caster oil.pics.[1]'
    TestEvalRemoteJSONPos.setVal(set2, {test: 'name', obj: 'frame'})
    var set2 = 'aaa.bbb.ccc'
    TestEvalRemoteJSONPos.setVal(set2, 5)
    var set2 = 'caster oil.pics.[0]'
    TestEvalRemoteJSONPos.setVal(set2, 'yyyy')

    var set2 = 'caster oil.desc'
    TestEvalRemoteJSONPos.setVal(set2, 'this is a desc')

    var set2 = 'caster oil.url'
    TestEvalRemoteJSONPos.setVal(set2, 'http://www.yahoo.com')
    var t = new TestEvalRemoteJSONPos()
    var options = {}
    //options.port = 7789
    // t.loadConfig(options);
    return;

}


