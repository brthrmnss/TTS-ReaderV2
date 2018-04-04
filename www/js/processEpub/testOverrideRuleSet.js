var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
//var nlp = require('compromise')

function OverrideEpubRuleSet() {
    var p = OverrideEpubRuleSet.prototype;
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

function OverrideEpubRuleSet_Container() {
    var p = OverrideEpubRuleSet_Container.prototype;
    p = this;
    var self = this;
    self.data = {};
    self.data.epubOvers = []
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.addEpubOver = function addEpubOver(item) {
        self.data.epubOvers.push(item)
    }

    p.getEpubOverForSi = function getEpubOverForSi(sI, dict0, autoRun) {
        var validEpubs = []
        sh.each(self.data.epubOvers, function onK(k, v) {
            var validEpub = true;
            if (v.settings.startRange) {
                if (sI >= v.settings.startRange) {

                } else {
                    validEpub = false
                }
            }
            if (v.settings.endRange) {
                if (sI <= v.settings.endRange) {
                } else {
                    validEpub = false
                }
            }
            if (v.settings.sI) {
                if (v.settings.sI != sI) {
                    validEpub = false
                }
            }

            if (validEpub) {
                validEpubs.push(v)
            }
        })
        self.data.lastValidEpubs = validEpubs;
        if (autoRun != false) {
            self.runEpubOverrides(dict0)
        }
        return validEpubs;
    }
    p.runEpubOverrides = function runEpubOverides(dictO, debug) {
        sh.each(self.data.lastValidEpubs, function onAutoRUn(k, v) {
            if (self.settings.debugEpubOMatches) {
                console.log('match', v)
            }
            v.settings.fxOverrideEpub(dictO)
        })
        self.data.lastvalidEbpubs = null;
    }
    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.OverrideEpubRuleSet = OverrideEpubRuleSet;
exports.OverrideEpubRuleSet_Container = OverrideEpubRuleSet_Container;

if (module.parent == null) {
    var i = new OverrideEpubRuleSet();
    var config = {};
    config.startRange = 162
    config.endRange = 180
    config.fxOverrideEpub = function fxOverrideEpub(dictO) {

        console.log('hit it', dictO)
    }
    i.init(config)

    var c = new OverrideEpubRuleSet_Container();
    var config = {};
    config.debugEpubOMatches = true;
    c.init(config)
    c.addEpubOver(i)

    var dO = {}

    c.getEpubOverForSi(80, dO)
    c.getEpubOverForSi(161, dO)
    c.getEpubOverForSi(162, dO)
    c.getEpubOverForSi(179, dO)
    c.getEpubOverForSi(181, dO)
}





