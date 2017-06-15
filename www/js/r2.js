/**
 * Created by user2 on 2/14/16.
 */

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

window.showPDFWorkerOperations = false;
window.showPDFWorkerOperations2 = false;

// alert('whs')
var rip = {}
rip.settings = {}

rip.settings.autoRead = true;
rip.settings.autoAnnotate = true;
rip.settings.scrollReader = false;
rip.settings.hideAnnotations = false;
rip.settings.showRipPreview = true;
rip.settings.showRipPreview = false;

//rip.settings.autoRead = false;'
rip.settings.debugRowBlock = true;
rip.settings.debugRowBlock = false;
rip.settings.showSpanNumbers = true;
rip.settings.newSentenceOnOrigFont = true;
rip.settings.margin = null
rip.settings.margin = {l: 10, t: 10, r: 10, b: 10};
rip.settings.margin_show = true;
rip.settings.newSentence_OnWideSpace = true;

rip.settings.newSentence_OnVerticalSpace = true;
rip.settings.newSentence_OnVerticalSpace_log2 = true;

rip.settings.newSentence_OnVerticalSpace_log2_displayPurple = true;
rip.settings.processors = []
rip.settings.addDashesOnVGap = false;
//rip.settings.stopAfterSorting = true
rip.dbg = {}
rip.dbg.sorting = false;
rip.dbg.finalSentenceParsedList = false;
rip.dbg.finalSpans = false


rip.dictSettings = {};


var bookSettings = {};
bookSettings.margin = {l: 10, t: 8, r: 10, b: 10};
rip.dictSettings['cameronmoll_bio.pdf'] = bookSettings;
bookSettings = sh.clone(bookSettings)
bookSettings.tryToDetect3Columns = true;
bookSettings.margin = {l: 8, t: 5, r: 9, b: 10};
rip.dictSettings["[Eric_Nash]_Manhattan_Skyscrapers(bookzz.org).pdf"] = bookSettings;

//TODO: fox F on page $scope.pdfCurrentPage 144
//$scope.pdfViewerAPI.goToPage(144)
//1.2
rip.settings.margin.b = 10


console.log2 = function filterLog() {
    var args = uiUtils.args(arguments)
    return;
    console.log.apply(console, args)
}

bookSettings = sh.clone(bookSettings)
//bookSettings.tryToDetect3Columns = true;
bookSettings.margin = {l: 8, t: 5, r: 9, b: 6};
rip.dictSettings["[Stephen_Biddle]_Military_Power_Explaining_Victor(Book4You).pdf"] = bookSettings;

rip.settings.sentenceSizeRatio = 0.4
bookSettings = sh.clone(bookSettings)
//bookSettings.tryToDetect3Columns = true;
bookSettings.margin = {l: 5, t: 8, r: 7, b: 7};
rip.dictSettings["[Various]_Edge_-.August.2016(bookzz.org).pdf"] = bookSettings;


bookSettings = sh.clone(bookSettings)
//bookSettings.tryToDetect3Columns = true;
bookSettings.margin = {l: 2, t: 4, r: 2, b: 7};
rip.dictSettings["LEVEL-1 LISA BAKER 194P (NXPowerLite Copy).pdf"] = bookSettings;

function defineBookSettingOverrides() {
    var bookSettings = {};
    //bookSettings = sh.clone(bookSettings)
    bookSettings.tryToDetect3Columns = true;
    bookSettings.margin = {l: 8, t: 9, r: 9, b: 9};
    //rip.settings.margin.b = 10
    bookSettings.startOnPage = null;
    bookSettings.combineDivsToSentMode = true;
    bookSettings.fontSizeX = 0.4;
    rip.dictSettings['Skyscraper  The Making of a Building Karl Sabbagh 400p_0140152849 (NXPowerLite Copy).pdf'] = bookSettings;
}

defineBookSettingOverrides();



//rip.settings.margin.t = 20

var rUtils = {};

function defineColorHelpers()  {
    var str = 'FAEADD,F38898,F0D1B5,E8A789,653C26'
    rUtils.colors = {};
    rUtils.colors.addColorSet = function addColorSet(name, str) {
        var y = '#' + str.split(',').join(',#')
        var colors = y.split(',')
        rUtils.colors[name] = colors;
    }
    rUtils.colors.makeCircle = function makeCircle(name) {
        if ($.isString(name)) {
            colors = rUtils.colors[name]
        }

        var y = new rUtils.GoThroughEach(colors)
        y.dictColorVals = {};
        y.dictColorVal = function di(v) {
            var oldVal = y.dictColorVals[v]
            if ( oldVal ) {
                return oldVal
            }
            var color = y.next();
            y.dictColorVals[v] = color;
            return color;
        }
        return y;
    }
    rUtils.colors.addColorSet('sizeAnd7', str)



    var str = '000000,283346,5f717b,49837c,f5efef'
    rUtils.colors.addColorSet('DPG385', str)

}
defineColorHelpers();

rUtils.t = '\t'
rUtils.n = '\n'


rUtils.eachNumber = function eachNumber(i) {
    return (i + 1) + '.'
}


rUtils.clearPixels = function clearPixels(px) {
    if (false == px.includes('px')) {
        return px;
    }

    var fontSize = px;
    fontSize = fontSize.replace('px', '');
    fontSize = parseFloat(fontSize);
    return fontSize;
}

rUtils.getFontSize = function getFontSize(ui) {
    var fontSizeOrig = ui.css('font-size')
    if (fontSizeOrig == null) {
        return null;
    }
    var fontSize = rUtils.clearPixels(fontSizeOrig)
    if (isNaN(fontSize)) {
        console.warn('fontSize is null', fontSize, fontSizeOrig)
        return null;
    }

    return fontSize;
}
rUtils.removeUiWithClass = function removeUiWithClass(cssclass) {
    $('.' + cssclass).remove();
    //console.log2('y',  $('.'+cssclass))
}
rUtils.removeAllClassesOfClass = function removeAllClassesOfClass(cssclass) {
    $('.' + cssclass).removeClass(cssclass)
    //console.log2('y',  $('.'+cssclass))
}

rUtils.isSpaceWide = function isSpaceWide(a, b, range) {
    var diff = Math.abs(a - b);
    if (diff < range)
        return true
    return false
}

rUtils.addToArrayDict = function addToArrayDict(dict, key, val) {
    var arr = dict[key];
    if (arr == null) arr = [];
    arr.push(val);
    dict[key] = arr;
}

rUtils.getXY = function getXY(ui) {
    var xy = {}
    xy.x = ui.css('left')
    xy.y = ui.css('top')
    xy.x = rUtils.clearPixels((xy.x))
    xy.y = rUtils.clearPixels((xy.y))
    return xy;
}

rUtils.getSpanDimensions = function getSpanDimensions(ui) {

    var span = ui;
    /*
     var top = span.css('top').replace('px','')
     top = parseFloat(top);

     var left = span.css('left').replace('px','')
     left = parseFloat(left);*/

    var styles = {};

    styles.x = ui.css('left')
    styles.left = styles.x = rUtils.clearPixels(styles.x)
    styles.y = ui.css('top')
    // console.log2('detectColumns', styles.y)
    styles.top = styles.y = rUtils.clearPixels(styles.y)
    /* tyles.x = ui.css('left')
     styles.y = ui.css('top')
     styles.x= rUtils.clearPixels((xy.x))
     styles.y= rUtils.clearPixels((xy.y))*/


    styles.fontFamily = ui.css('font-family');
    styles.fontFamilyOrig = ui.attr('origFont');
    styles.markup = ui.attr('markup');
    styles.fontSize = ui.css('font-size')
    styles.fontSizeAsNumber = rUtils.clearPixels(( styles.fontSize))
    styles.yQuantized = ui.attr('yQuantized');

    //styles.top = top;
    //console.log2('what is width', span.width() );
    styles.width = span.width();
    styles.maxX = styles.right = span.width() + styles.left;

    styles.height = span.height();
    styles.maxY = styles.bottom = span.height() + styles.top;

    //console.log2('detectColumns', styles.top, span.height(),  styles.y, styles.maxY ,  styles.height)


    //console.log2('what is width', styles.width,
    //    styles.right, left);
    styles.text = span.text();

    ui._pStyles = styles;

    return styles;
}

rUtils.average = function getAvg(nums) {
    return nums.reduce(function (p, c) {
            return p + c;
        }) / nums.length;
}

rUtils.annot = function sdf(x, str) {
    console.log2('ok...')
}


function xT() {
    sh.join = function joinArray() {
        var args = sh.convertArgumentsToArray(arguments);
        if (args.length == 1 && sh.isArray(args[0])) {
            args = args[0]; //if first arg is array, join array
        }
        return args.join(' ')
    }

    if (sh.each == null) {
        sh.each = $.each
    }
    sh.joinStr = function joinArray(obj, props) {
        var args = sh.convertArgumentsToArray(arguments);
        var strArr = [];
        sh.each(args, function additems(k, v) {
            if (k == 0) return;
            strArr.push(obj[v])
        })

        return strArr.join(' ')
    }
}
xT();
function asdf() {

    function GoThroughEach(items) {
        //  var async = require('async')
        var self = this;
        var p = GoThroughEach.prototype;

        p.setIndex = function setIndex(newIndex) {
            self.currentIndex = newIndex;
        }


        self.data = {};
        self.settings = {};

        self.data.items = items
        self.data.currentIndex = 0;

        self.config = {};

        self.go = function go(arr, fxItemCallback, fxComplete, timeDelay_, autoStart) {
            self.complete = false;
            if (arr instanceof Array) {
                self.items = arr;
                self.fxComplete = fxComplete
                self.fxItemCallback = fxItemCallback;
            } else {
                var config = arr; //user sent in obj
                self.items = config.items;
                if (config.fxDone == null) {
                    throw 'supply fxDone'
                }
                self.fxComplete = config.fxDone;
                self.fxItemCallback = config.fxItem;
                ;
                self.config = config;
                autoStart = self.autoStart;///// = config;
            }
            self.currentIndex = -1
            self.timeDelay = timeDelay_
            if (self.timeDelay > 0) {
                /*if ( timer != null )
                 timer.removeEventListener(TimerEvent.TIMER, this.nextTimerComplete )
                 timer = new Timer(timeDelay,1 )
                 timer.addEventListener(TimerEvent.TIMER, this.nextTimerComplete )*/
            }
            if (autoStart != false) {
                // self.nextItem(null, true);
                self.start()
            }


        }

        self.start = function start() {
            var limit = sh.defaultValue(self.config.concurrency, 1)
            async.forEachLimit(self.items, limit, function (item, callback) {
                //db.delete('messages', messageId, callback);
                //fx(callbackPlay)
                self.fxItemCallback(item, callback)
            }, function (err) {
                if (err) console.error(err)
                self.fxComplete();

            });
        }

        //remove this method .... use async callback only
        self.XnextItem = function nextItem(e, timed, internallySet) {
            /*if ( self.currentIndex != -1 && ( self.currentIndex != self.items.length ) ||  PauseFirstAndLast )
             {
             if ( self.items.length != 0 )
             {
             if ( timeDelay != 0 && timed == false  )
             {
             this.timer.reset();
             this.timer.start();
             return;
             }
             }
             }*/
            if (self.config.concurrent != null && internallySet != true) {
                self.handleConcurrency()
                return;
            }
            if (this.complete == true)
                return;
            self.currentIndex++
            if (self.currentIndex >= self.items.length) {
                self.end();
                return;
            }
            var currentItem = self.items[self.currentIndex]
            self.fxItemCallback(currentItem, self.nextItem);
            //self.execution.waitingFor.add()
        }


        self.handleConcurrency = function handleConcurrency() {
            //how many ouconing requests

        }

        /*self.start = function start() {
         self.currentIndex=-1;
         self.running = false;
         self.complete = false;
         self.nextItem()
         }*/
        self.next = function next() {

            self.data.currentIndex++
            if (self.data.currentIndex >= self.data.items.length) {
                self.data.currentIndex = 0
                //  self.end();
                //return;
            }
            var currentItem = self.data.items[self.data.currentIndex]
            self.data.currentItem = currentItem
            return currentItem;
            self.nextItem()
        }

        self.end = function end(callEndFxCallback) {
            //if ( this.timer != null ) 	this.timer.stop() ;
            self.complete = true;  //call complete first so we do not interfere wtih starting again ...
            //self.items = [] ; //

            var fxFinal = self.fxComplete
            //self.fxComplete = null

            //call final fx last to prevent anything that has restarted the loop and reused
            //this instance from losign variables ...
            if (callEndFxCallback != false) {
                if (fxFinal != null)
                    fxFinal();
            }
        }

        self.last = function last() {
            index = self.items.length - 1
            return self.items[index];
        }

        self.reset = function reset(sendEndFx) {
            self.currentIndex = 0;
            self.running = false;
            self.complete = false;
            if (sendEndFx == true) {
                sh.callIfDefined(fxComplete)
            }
        }


    }

    rUtils.GoThroughEach = GoThroughEach;
}
asdf();


function createPreviewPanel() {
    var cfg = {}
    cfg.id = 'testTransportPanel';
    cfg.clearIfFound = true
    if (window.uiUtils.makePanel(cfg)) {
        return; //already made
    }
    $(cfg.id).empty()


    if (rip.settings.showRipPreview != true) {
        return;
    }

    uiUtils.flagCfg = {};
    //uiUtils.flagCfg.id = cfg.id;
    uiUtils.flagCfg.addTo = $(cfg.id);
    window.uiUtils.addLabel('Preview', 'txtCurrentStepIndex');
    window.uiUtils.addDiv({id: 'divPreview'});


}
createPreviewPanel();


function createTransportPanel() {

    var prepReadeMode = false;
    prepReadeMode = true;


    window.IInitSpeaker = true;
    window.initTCustomDir = true;


     
    if (rip.settings.autoRead != true) {
        return;
    }

    debugger
    
    var cfg = {}
    cfg.id = 'test_createTransportPanel';
    cfg.clearIfFound = true
    if (window.uiUtils.makePanel(cfg)) {
        //return; //already made
    }
    //  debugger;
    $(cfg.id).empty()
    var ui = $(cfg.id);
    uiUtils.flagCfg = {};
    // uiUtils.lastUI.css('right', '10px')
    uiUtils.lastUI.css('left', '10px')
    //uiUtils.flagCfg.id = cfg.id;
    uiUtils.flagCfg.addTo = $(cfg.id);
    window.uiUtils.addLabel('>>>', 'txtCurrentStepIndex');
    //window.uiUtils.addDiv( {id:'divTransport'} );
    //debugger
    $.get('/js/speak.html', function (loadedHTML) {


        var h = $('<div>' + loadedHTML + '</div>')
        var contentToApped = $(h).find('#appendToApp'); //don't get entire html container
        $('#appendToApp').remove();//support hot-reload
        if (contentToApped != null) {
            //   $('body').append(contentToApped);
            ui.append(contentToApped);
            //  initSpeaker()
        }

        if (prepReadeMode) {
            onScanBookForREadableSentences();
        }

    })
    window.uiUtils.addBtn({text: 'Proc'},
        function onScanBookForREadableSentences(startReadingWhenProcesse) {
            window.u = uiUtils;
            //if (window.pH == null) {
            window.processPage();
            // }
        });


    if (rip.settings.autoAnnotate && window.processedPdf1x != true) {
        setTimeout(function processPage() {
            window.processPage()
        }, 1200)
        //window.processPage();
    }

    window.uiUtils.addBtn({text: 'Name'},
        function onScanBookForREadableSentences(startReadingWhenProcesse) {
            console.log2(pH.data.bookname)
        });
    window.uiUtils.addBtn({text: 'Next'},
        function onScanBookForREadableSentences2(startReadingWhenProcesse) {
            onScanBookForREadableSentences(true, true)
        });
    window.uiUtils.addBtn({text: 'Scan'}, onScanBookForREadableSentences)
    function onScanBookForREadableSentences(startReadingWhenProcesse, processCurrengPage) {
        window.u = uiUtils;
        if (window.pH == null) {
            window.processPage();
        }
        if (processCurrengPage) { //otherwise will play the last page
            window.processPage();
        }
        var cfg = {}
        pH.currentPage = window.$scope.pdfCurrentPage;
        var id = '#page_Y_' + (window.$scope.pdfCurrentPage - 1)
        cfg.divProcess = '' + id


        var cloneContainer = false;

        if (cloneContainer) {
            $(id).css('display', 'none')
            var id = '#page_' + (window.$scope.pdfCurrentPage - 1)
            var ui = $(id).find('#XLayer')//.hide();
            var uiPageCloned = ui.clone()
            //var uiPageCloned
            var classSentenceScroller = 'sentenceScrollableContainer'
            $('.' + classSentenceScroller).remove();
            uiPageCloned.attr('id', 'Xlayer2');
            uiPageCloned.addClass(classSentenceScroller);
            ui.parent().append(uiPageCloned)
            cfg.divProcess = uiPageCloned
        } else {
            $(id).css('display', 'inherit')
            /*
             var id = '#page_' + (window.$scope.pdfCurrentPage - 1)
             var ui = $(id).find('#XLayer')//.hide();
             var uiPageCloned = ui.clone()
             //var uiPageCloned
             var classSentenceScroller = 'sentenceScrollableContainer'
             $('.'+classSentenceScroller).remove();
             uiPageCloned.attr('id', 'Xlayer2');
             uiPageCloned.addClass(classSentenceScroller);
             ui.parent().append(uiPageCloned)
             cfg.divProcess = uiPageCloned
             */
        }

        var removeMarkings = true;
        if (removeMarkings) {
            function removeAllUIWithClass(cssclass) {
                $('.' + cssclass).remove()
            }

            function removeAllClassesOfClass(cssclass) {
                $('.' + cssclass).removeClass(cssclass)
                //$('.'+cssclass).remove()
                //console.log2('y',  $('.'+cssclass))
            }

            // removeAllClassesOfClass('highlight2')
            // removeAllClassesOfClass('highlight3')
            // removeAllClassesOfClass('highlight4')

            var classes2 = ['spanMargins',
                'spanSortAnnotations', 'brokenLine',
                //'highlight2', 'highlight3', 'highlight4'
                'annottatino_Columns',

            ]
            $.each(classes2, function onCl(k, classNameToRemove) {
                removeAllUIWithClass(classNameToRemove)
            })


            var classes = ['spanMargins',
                'spanSortAnnotations', 'brokenLine',
                'highlight2', 'highlight3', 'highlight4']
            $.each(classes, function onCl(k, classNameToRemove) {
                removeAllClassesOfClass(classNameToRemove)
            })
        }


        cfg.skipHandleFrames = true;

        cfg.fxScroll = function fxScroll(target, self) {
            if (rip.settings.scrollReader == false) {
                return;
            }
            var posSentenceDiv = u.getPos(target)
            var page = u.getPos('#page_' + (window.$scope.pdfCurrentPage - 1))
            var scrollContainer = $('pdf-viewer')
            var scrollY = u.getScrollPosition(scrollContainer)

            var posScrollContainer = u.getPos(scrollContainer);

            var setT = scrollY - 60 + posSentenceDiv.top - posScrollContainer.top;
            u.setScrollPosition(scrollContainer, setT)
            console.log2('scrollto', setT)
            //pageY = pageY.top
            //$('pdf-viewer').scrollTop
            //console.log2('scrollX', target, setT, posSentenceDiv.top, page.top)
        }

        cfg.fxDone = function onFxDoe() {
            console.log2('done with everything ...');

            if (window.$scope.pdfCurrentPage == window.$scope.pdfTotalPages) {
                console.log2('end of book')
                return;
            }

            window.$scope.pdfViewerAPI.goToNextPage();
            setTimeout(onScanBookForREadableSentences, 1500, true, true);
        }

        cfg.dbgSettings = {};
        // cfg.dbgSettings.colorizeBackgrounds = true;


        cfg.sentences = cSH.sentences;
        cfg.dictSentencesToSpans = cSH.dictSentencesToSpans;

        window.initSpeakerControls(cfg)
        setTimeout(function startLAter() {
            if (startReadingWhenProcesse) {
                window.sentenceHelper.onPlay2()
            }
        }, 500)
    }


}
createTransportPanel();


window.fx = function onProcessPageAndDefineUtils() {
    console.log2('reloadYYY');
    //debugger
    function defineUtils() {
        if ($.async != null) {
            return;
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

            if (delay == null && $.isNumeric(fxAllDone)) {
                delay = fxAllDone;
            }

            function goToNextSpan() {
                var item = items[asyncController.index];
                console.log2('playindex', asyncController.index)
                if (asyncController.index > items.length - 1) {
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

    if (window.$scope == null) {
        console.debug('not ready yet, $scope is null')
        return
    }
    var page = window.$scope.pdfCurrentPage;


    var helper = {};

    var $scope = window.$scope;
    window.helper = helper;

    function defineTransport() {
        var transport = {};
        helper.t = transport;
        helper.transport = transport;

        window.iterationMarkerPdf = null; //stop if playing currently
        $scope.playerForm.isPlaying = false;
        $scope.isPlaying = false;
        $scope.isPaused = false;
        //$scope.playerForm.player.pause();
        helper.pauseId = null;

        helper.stop = function stop() {
            window.iterationMarkerPdf = null;
            $scope.playerForm.isPlaying = false;
            $scope.isPlaying = false;
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200)
        };
        helper.pause = function pplaause() {
            $scope.playerForm.isPlaying = false;
            $scope.isPlaying = false;
            $scope.isPaused = true;
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200)

            helper.pauseId = window.iterationMarkerPdf
            window.iterationMarkerPdf = null;

        };

        helper.playNextSentence = function playNextSentence() {
            //$scope.playerForm.isPlaying = false;
            //$scope.isPlaying = false;
            //$scope.isPaused = true;
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200);

            if (window.async.index >= window.async.length) {
                window.$scope.pdfViewerAPI.goToNextPage();
                setTimeout(function () {
                    console.info('play next page');
                    helper.speak.clearCache()
                    window.fx2(true, 1)
                }, 350)
                return;
            }
            //window.async.index++; //is already on next idnex
            window.async.runIteration()
            return;
            helper.pauseId = window.iterationMarkerPdf
            window.iterationMarkerPdf = null;
        }

        helper.playPrevSentence = function playPrevSentence() {
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200)

            if (window.async.index <= 1) {
                window.$scope.pdfViewerAPI.goToPrevPage();
                setTimeout(function () {
                    console.info('play prev page');
                    helper.speak.clearCache()
                    window.fx2(true, -2)
                }, 350);
                return;
            }
            console.log2('async', window.async.index)
            window.async.index -= 2;
            window.async.runIteration()
            return;
        }

        helper.play = function play() {
            $scope.playerForm.isPlaying = true;
            $scope.isPlaying = true;
            $scope.isPaused = false;
            window.iterationMarkerPdf = Math.random();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200)
            /* if ( helper.playSelection != null ) { //on selection, restart playback from selection
             helper.playSelectionMode = true;
             //playPage();
             window.fx2(true)
             helper.playSelection = null;
             return;
             }*/

            if (helper.pauseId) { //resume paused player
                console.log2('resumign pause')
                window.iterationMarkerPdf = helper.pauseId;
                helper.pauseId = null;
                window.fxIteration();
                return;
            }
            /*playPage()*/
            window.fx2(true)
            if (window.helper.selectionNode) {
                window.helper.selectionNode = null;
            }
        };
        helper.goToNextPage = function nexp() {
            console.info('jump to play next page');
            window.$scope.pdfViewerAPI.goToNextPage();
            setTimeout(function () {
                console.info('play next page');
                //playPage()
                helper.speak.clearCache()
                window.fx2(true)

            }, 350)
        }


    }

    defineTransport();


    function defineSpeak() {


        helper.speak = function speak(txt, fxDone, rate, cacheRequest) {
            var url = 'http://127.0.0.1:8080/speak';
            var data = {}
            data.text = txt + '.';
            var txtLbl = txt.slice(0, 15)
            var txtReg = txt.replace(/ /g, "_");
            var enableCaching = true;
            enableCaching = false;
            if (enableCaching == false && cacheRequest) {
                return;
            }
            ;

            console.log2('speak text', txtLbl, 'cache?', cacheRequest);
            var cachedResp = helper.speak.cache[txtReg];

            if (enableCaching && cachedResp != null) {
                console.log2('playback cache', txt);
                onWavDataResponseRecieved(cachedResp);
                return;
            }
            //create a cache

            var timerResetTime = new Date();

            /*setTimeout(function retryLongRequest(){
             if ( data.requestFinished  ) {
             return;
             }
             if ( cacheRequest != true  ) {
             return;
             }
             console.log2('retry request ....' , txt)
             speak(txt, fxDone, rate, cacheRequest);
             },1500);*/

            function onWavDataResponseRecieved(dataResp, resultStatus) {
                var isCachedRequest = resultStatus == null;
                if (isCachedRequest == false) {
                    var timeDiff = new Date().getTime() - timerResetTime;
                    if (timeDiff > 3000) {
                        console.error('took to long for x to respond', txt); //prevent text from playing after minutes
                        return;
                    }
                }
                if (cacheRequest == true && enableCaching) {
                    console.log2('storing in cache', txtLbl)
                    helper.speak.cache[txtReg] = dataResp;
                    helper.speak.cache[txtReg] = $scope.trustSrc('cache/sound.wav');
                    return
                }
                data.requestFinished = true

                // console.log2('data', dd)
                // UPDATE CURRENT AUDIO SRC
                //$scope.playerForm.src=dataResp;
                //$scope.playerForm.player.src=$scope.trustSrc($scope.playerForm.src);
                $scope.playerForm.player.src = $scope.trustSrc('cache/sound.wav');
                //$scope.playerForm.player.src=$scope.trustSrc(dataResp);
                console.log2("new source: ", txtLbl, resultStatus)//$scope.playerForm.player.src);
                // PLAY !!
                $scope.playerForm.player.play();

                $scope.playerForm.player.onended = function asdf() {
                    if (fxDone) {
                        fxDone()
                    }
                };
            }


            $.ajax({
                url: url,
                type: 'post',
                data: data,
                success: onWavDataResponseRecieved,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
                //dataType: dataType
            });
        }
        helper.speak.cache = {};
        helper.speak.clearCache = function () {
            //{}
            helper.speak.cache = {};
        };
    }

    defineSpeak();
    //helper.speak('hello from reader.')
}
//window.showImages = true
//window.showImages2 = true;
window.fx2 = function fx2(play, playIndex) {


    if (typeof $scope === 'undefined') {
        console.debug('not ready yet, $scope is null')
        return;
    }
    console.clear()
    console.log2('the thing', $scope)
    // debugger;


    var procHelper = {}
    var pH = procHelper;
    window.pH = pH;


    pH.data = {};
    pH.data.bookname = window.$scope.pdfURL.split('/').slice(-1);


    // bookSettings.margin = {l:10,t:8,r:10,b:10};

    var bookSettings = {};
    bookSettings = rip.dictSettings[pH.data.bookname];

    window.createBookSettings = function createBookSettings() {

        var bookStr = `       var bookSettings = {};
        //bookSettings = sh.clone(bookSettings)
        bookSettings.tryToDetect3Columns = true;
        bookSettings.margin = {l:8,t:5,r:9,b:10};
        rip.settings.margin.b = 10
        bookSettings.startOnPage = null;
        rip.dictSettings['pH.data.bookname'] = bookSettings;
 `
        bookStr = bookStr.replace('pH.data.bookname', pH.data.bookname)
        console.log2(bookStr)
//TODO: fox F on page $scope.pdfCurrentPage 144
//$scope.pdfViewerAPI.goToPage(144)
//1.2

    }

    if (bookSettings) {
        $.each(bookSettings, function ok(k, v) {
            rip.settings[k] = v;
        })
    }

    pH.defineUtils = function defineUtils() {
        pH.utils = {};
        pH.utils.getFontSize = function getFontSize(span) {
            var span = $(span);
            var fontSize = span.css('font-size')
            fontSize = span.css('font-size').replace('px', '')
            fontSize = parseFloat(fontSize)
            return fontSize;
        }
        pH.utils.getPos = function getUIPosition(span) {
            var span = $(
                span);
            var pos = {};
            pos.top = span.css('top').replace('px', '')
            pos.top = parseFloat(pos.top)
            pos.topOverride = span.attr('top-override')
            if (pos.topOverride) {
                pos.topOverride = span.attr('top-override').replace('px', '')
                pos.topOverride = parseFloat(pos.topOverride)
            }
            pos.left = span.css('left').replace('px', '')
            pos.left = parseFloat(pos.left)
            pos.width = span.width();
            pos.height = span.height();
            pos.right = span.width() + pos.left;
            return pos;
        }
        pH.utils.quantize = function quantize(xxx, quantizeTo) {
            var rem = xxx % quantizeTo
            var yTop = xxx - rem;
            yTop = Math.floor(yTop);
            // yTop = Math.round(yTop);
            return yTop;
        }

        pH.utils.quantize2 = function quantize2(xxx, quantizeTo) {
            var rem = xxx % quantizeTo
            var yTop = xxx - rem;
            yTop = Math.floor(yTop);
            // yTop = Math.round(yTop);
            return yTop;
        }

        pH.utils.clearAllspans = function clearAllspans() {
            $('span.highlight').each(function () {
                var $this = $(this);
                $this.removeClass('highlight');
            });
        }
    }
    pH.defineUtils();


    var spans = window.$scope.getSpans();

    function l() {
        console.error.apply(console, arguments);
    }


    pH.createPage = function createPage() {
        //l('lll', window.$scope)
        //return

        pH.currentPage = window.$scope.pdfCurrentPage;
        var id = 'page_Y_' + (window.$scope.pdfCurrentPage - 1)
        var page = $('#page_' + (window.$scope.pdfCurrentPage - 1));
        var page_ = page.find('#XLayer')
        pH.pageHeight = page_.css('height');
        pH.pageHeight = pH.pageHeight.replace('px', '');
        pH.pageHeight = parseFloat(pH.pageHeight);

        pH.errors = [];

        //console.error(pH.pageHeight, 'pageHeight' )
        var pageCustom = $('#' + id);
        if (pageCustom.length == 0) {
            //l('lll',page, page.parent())
            pageCustom = $(page_[0].outerHTML);
            //pageCustom.html(page_.html())
            pageCustom.attr('id', id)
            page.append(pageCustom);
        } else {
            // l('lll createPage alreayd existed',page, page.parent())
        }
        pageCustom.html('')
        pageCustom.html(page_.html())
        pH.data.ui = pageCustom;
        var psans = pageCustom.children('span')
        return psans
    }

    pH.createPageDocument = function createPageFromDocument() {
        // var spans = $('body').children();
        var body = $("#frameX").contents().find("body");
        var body = $("#frameX").contents().find("body");
        $("#frameX").contents().find('.coverFlowX').remove();
        var html = $("#frameX").contents().find("body").html();

        var newBody = $('<div class="coverFlowX">' + '</div>');
        newBody.html(html)
        newBody.css({'top': '-10px', /*, 'left':'0px', */'position': 'absolute'})
        body.append(newBody)
        //  debugger
        var spans = newBody.children();
        return spans;
    }

    spans = pH.createPage();

    pH.sortSpans = function sortSpans(_spans) {
        //why: spans come in strange order. this will order they by y then x
        var utilsSort = {};

        utilsSort.sortByY = function sortByY(a, b) {
            a = $(a);
            b = $(b);
            var aName = a.css('top').replace('px', '')
            var bName = b.css('top').replace('px', '')
            aName = parseFloat(aName)
            bName = parseFloat(bName)
            //console.log2('comparison y', aName, bName)
            var result = ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            var meth = 'sortY b007'
            var b2 = 'By changing'
            if (a.text().includes('time.') || b.text().includes('time.')) {
                if (a.text().includes(b2) || b.text().includes(b2)) {
                    console.log2(meth,
                        aName, bName,
                        "\n", "\t", a.text(),
                        'vs', "\n", "\t", b.text(), result)
                }
            }
            return result;
        };
        utilsSort.sortByX = function sortByX(a, b) {
            a = $(a);
            b = $(b);
            var aName = a.css('left').replace('px', '')
            var bName = b.css('left').replace('px', '')
            aName = parseFloat(aName)
            bName = parseFloat(bName)
            //console.log2('comparison x', aName, bName)
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        };
        utilsSort.sortByXY = function sortByXY(a, b) {
            a = $(a);
            b = $(b);


            var aY = a.css('top').replace('px', '')
            var bY = b.css('top').replace('px', '')
            aY = parseFloat(aY)
            bY = parseFloat(bY)

            var lineHeight = a.css('font-size');
            if (lineHeight == null) {
                lineHeight = pH.pageHeight * (7 / 480)
            }
            lineHeight = rUtils.clearPixels(lineHeight)

            //why?
            var yDiff = Math.abs(aY - bY)
            var minDifference_To_ConsiderNewLine = aY * .05;
            minDifference_To_ConsiderNewLine = lineHeight * .05;
            rUtils.f = function toFixed(v) {
                return v.toFixed(2);
            }
            aY = rUtils.f(aY)
            bY = rUtils.f(bY)
            yDiff = rUtils.f(yDiff)
            minDifference_To_ConsiderNewLine = rUtils.f(minDifference_To_ConsiderNewLine)


            var meth = 'sortXY b007'
            console.log2(meth, "\t", a.text(), 'vs', b.text())
            if (yDiff > minDifference_To_ConsiderNewLine) {
                console.error('b00', 'comparison y', aY,
                    bY, yDiff, minDifference_To_ConsiderNewLine)
                //yDiff = 0
                return ((aY < bY) ? -1 : ((aY > bY) ? 1 : 0));
            }
            console.log2('b00', 'comparison y', aY,
                bY, yDiff, minDifference_To_ConsiderNewLine, lineHeight)


            var aX = a.css('left').replace('px', '')
            var bX = b.css('left').replace('px', '')
            aX = parseFloat(aX)
            bX = parseFloat(bX)
            //console.log2('comparison x', aName, bName)
            return ((aX < bX) ? -1 : ((aX > bX) ? 1 : 0));
        };
        /*
         var sortedSpans = _spans.sort(utilsSort.sortByX);
         sortedSpans = sortedSpans.sort(utilsSort.sortByXY);
         sortedSpans = sortedSpans.sort(utilsSort.sortByY);
         */
        //var sortedSpans = _spans.sort(utilsSort.sortByXY);
        //var sortedSpans = _spans.sort(utilsSort.sortByY);
        //var sortedSpans = _spans.sort(utilsSort.sortByX);
        var sSH = {};
        sSH.detectTwoPages = function detectTwoPages(__spans) {
            // var sortedByX = __spans.sort(utilsSort.sortByX);


            //count number at x
            //if two rows appear ... then two rows
            var xVals = {};
            $.each(__spans, function (indexSpan, v) {
                var span = $(v);
                //var fontSize = pH.utils.getFontSize(v);
                var left = pH.utils.getPos(v).left;

                var lineHeight = rUtils.getFontSize(span)

                left = pH.utils.quantize(left, 5)

                var arr = xVals[left];
                if (arr == null) arr = [];
                arr.push(span)
                xVals[left] = arr;


                // rUtils.addToArrayDict(dictYRowToSentence, )
            })
            var colCount = 0;
            var maxColX = 0;
            console.log2('sorted by x spans', xVals) //,  sortedByX)
            $.each(xVals, function (width, spansAtX) {
                /*   if ( spansAtX.length > _spans.length*.){
                 console.log2('sorted by x spans', 'has 2 columns')
                 }*/
                if (spansAtX.length > 10) {
                    if (maxColX < width) maxColX = width;
                    colCount++
                    console.log2('sorted by x spans', 'found column', width)
                }
            })

            if (colCount == 2) {
                console.log2('sorted by x spans', 'found column', 'has 2 columns')
                //add and override property to all spans
                $.each(__spans, function (indexSpan, v) {
                    var span = $(v);
                    //var fontSize = pH.utils.getFontSize(v);
                    var left = pH.utils.getPos(v).left;
                    left = pH.utils.quantize(left, 5)
                    if (left >= maxColX) {
                        var top = pH.utils.getPos(v).top;
                        span.attr('top-override', top + pH.pageHeight);
                    }

                })

            }

            return __spans;
        }
        sSH.addMargins = function addMargins(_spans_, margins) {
            var filteredSpans = [];
            var parent = $(_spans_[0]).parent()
            var classMargins = 'spanMargins'
            rUtils.removeUiWithClass(classMargins);
            var div = $("<div />");
            div.addClass(classMargins)
            var div2 = div.clone();

            var parentWidth = parent.width()
            var parentHeight = parent.height()

            margins.parentWidth = parentWidth;
            margins.parentHeight = parentHeight;

            if (margins.l) {
                div2 = div.clone();
                div2.css('background-color', 'blue')
                div2.css('opacity', '0.3')
                div2.text('left margin')
                div2.css('left', '0px')
                var width = parent.width() * (margins.l / 100);
                div2.css('width', width)
                div2.css('bottom', '0px')
                div2.css('top', '0px')
                div2.css('position', 'absolute')
                parent.append(div2)
                margins.minX = width;
            }

            if (margins.t) {
                div2 = div.clone();
                div2.css('background-color', 'red')
                div2.css('opacity', '0.3')
                div2.text('top margin')
                uiUtils.absHelper(div2, 0, 0, 0)
                var height = parent.height() * (margins.t / 100);
                div2.css('height', height)
                margins.minY = height;
                parent.append(div2)
            }

            if (margins.r) {
                div2 = div.clone();
                div2.css('background-color', 'green')
                div2.css('opacity', '0.3')
                div2.text('right margin')
                uiUtils.absHelper(div2, null, 0, 0, 0)
                var marginWidth = parent.width() * (margins.r / 100);
                margins.maxX = parentWidth - width;
                div2.css('width', marginWidth)
                parent.append(div2)
            }

            if (margins.b) {
                div2 = div.clone();
                div2.css('background-color', 'yellow')
                div2.css('opacity', '0.3')
                div2.text('bottom margin')
                uiUtils.absHelper(div2, 0, null, 0, 0);
                var marginHeight = parent.height() * (margins.b / 100);
                div2.css('height', marginHeight);
                margins.maxY = parentHeight - marginHeight;
                parent.append(div2)
            }

            console.log2('margins', margins)

            $.each(_spans_, function filterSpansInMargin(k, span) {


                span = $(span)
                var spanText = span.text();
                var xy = rUtils.getXY(span);
                if (xy.x < margins.minX) {
                    console.error('removing', 'x too small', xy, spanText)
                    return;
                }
                if (xy.x > margins.maxX) {
                    console.error('removing', 'x too big', xy, spanText)
                    return;
                }
                if (xy.y < margins.minY) {
                    console.error('removing', 'y too small', xy, spanText)
                    return;
                }
                if (xy.y > margins.maxY) {
                    console.error('removing', 'y too big', xy, spanText)
                    return;
                }

                //return;
                filteredSpans.push(span)
            })


            return filteredSpans
        }


        sSH.getSizeOfColumn = function getSizeOfColumn(columnSet, ___allSpans) {

            var colDimensions;// = {};


            var fontSizeAvg = [];


            $.each(columnSet.spans, function filterSpansInMargin(k, span) {
                span = $(span)
                var spanText = span.text();
                var xy = rUtils.getSpanDimensions(span);

                fontSizeAvg.push(xy.fontSizeAsNumber)


                if (colDimensions == null) {
                    colDimensions = {};
                    colDimensions.x = xy.x;
                    colDimensions.y = xy.y;
                    colDimensions.maxX = xy.maxX;
                    colDimensions.maxY = xy.maxY;
                }

                if (xy.x < colDimensions.x) {
                    colDimensions.x = xy.x;
                }
                if (xy.y < colDimensions.y) {
                    colDimensions.y = xy.y;
                }

                if (xy.maxX > colDimensions.maxX) {
                    colDimensions.maxX = xy.maxX;
                }

                if (xy.maxY > colDimensions.maxY) {
                    colDimensions.maxY = xy.maxY;
                }

                /*
                 if ( xy.x < margins.minX ) {
                 console.error('removing', 'x too small', xy, spanText)
                 return;
                 }
                 if ( xy.x > margins.maxX ) {
                 console.error('removing', 'x too big', xy, spanText)
                 return;
                 }
                 if ( xy.y < margins.minY ) {
                 console.error('removing', 'y too small', xy, spanText)
                 return;
                 }
                 if ( xy.y > margins.maxY ) {
                 console.error('removing', 'y too big', xy, spanText)
                 return;
                 }
                 */
                //return;
                //filteredSpans.push(span)
            })

            var avgFontSize = rUtils.average(fontSizeAvg);


            colDimensions.height = colDimensions.maxY - colDimensions.y;
            colDimensions.width = colDimensions.maxX - colDimensions.x;

            var extTopOfCol = sh.clone(colDimensions)

            var heightOfSearchBox = avgFontSize * 1.8
            extTopOfCol.height = heightOfSearchBox
            extTopOfCol.y = extTopOfCol.y - extTopOfCol.height
            extTopOfCol.height = heightOfSearchBox * 1.4 //add a litle overhang JIC
            extTopOfCol.maxY = extTopOfCol.y + extTopOfCol.height;

            var extraSpans = rUtils.searchForSpansInArea(___allSpans, extTopOfCol)

            extTopOfCol.color = 'orange'
            rUtils.drawBlock(extTopOfCol, 'extra search area')

            rUtils.enlarge = function enlarge(box, elnargeWit) {
                if ($.isArray(elnargeWit)) {
                } else {
                    elnargeWit = [elnargeWit];
                }

                var fxName = 'detectColumns.enlarge';


                var c = sh.clone(box)
                $.each(elnargeWit, function filterSpansInMargin(k, span) {
                    span = $(span)
                    var spanText = span.text();
                    var xy = rUtils.getSpanDimensions(span);
                    //if ( spanText.includes('XYZ')) {
                    //  console.log2(fxName, xy, spanText)
                    //}/
                    //debugger;
                    if (xy.x < box.x) {
                        box.x = xy.x;
                    }

                    if (xy.y < box.y) {
                        box.y = xy.y;
                    }

                    if (xy.maxX > box.maxX) {
                        box.maxX = xy.maxX;
                    }

                    if (xy.maxY > box.maxY) {
                        box.maxY = xy.maxY;
                    }

                    console.log2(fxName, box, c, xy)
                })

                box.height = box.maxY - box.y
                box.width = box.maxX - box.x
            }

            if (extraSpans.length > 0) {

                //add to annotation to thsi ...
                rUtils.annot(extraSpans, 'Add ed this to a column')

                $.each(extraSpans, function onAdd(k, v) {
                    columnSet.spans.push(v);
                    rUtils.enlarge(colDimensions, v)
                })
            }

            //catch all things in spring
            var extraSpans2 = rUtils.searchForSpansInArea(___allSpans, colDimensions)
            if (extraSpans2.length > 0) {
                fxName = 'detectColumns.addextra'
                //add to annotation to thsi ...
                //rUtils.annot(extraSpans2, 'Add ed this to a column')

                var rawColumSetSpans = []
                $.each(columnSet.spans, function addRaw(k, v) {
                    rawColumSetSpans.push(v[0]);
                })

                //    debugger
                $.each(extraSpans2, function onAdd(k, v) {
                    var rawUI = v[0]
                    var included = rawColumSetSpans.includes(rawUI)
                    if (included == true) {
                        return;
                    }

                    span = $(v)
                    // span.css('border-bottom', 'solid 2px '+ 'red')
                    span.addClass('wasGrabbedToColoumn')
                    console.log2(fxName, 'a name', span.text(), rawUI)
                    // return;

                    columnSet.spans.push(v);
                    //rUtils.enlarge(colDimensions, v)
                })
            }

            var fxName = 'detectColumns.size'
            console.log2(fxName, 'maxV', avgFontSize, colDimensions, extraSpans)

            return colDimensions
        }

        rUtils.drawBlock = function drawBlock(size, name, size2) {
            var div2 = $('<div/>')
            // div2 = div.clone();
            div2.css('background-color', 'blue')
            if (size.color) {
                div2.css('background-color', size.color)
            }
            div2.css('opacity', '0.5')
            div2.text(name)
            div2.css('left', size.left + 'px')
            div2.css('width', size.width + 'px')
            div2.css('top', size.top + 'px')

            if (size.x) {
                div2.css('left', size.x + 'px')
            }
            div2.css('height', size.height + 'px')
            if (size.y) {
                div2.css('top', size.y + 'px')
            }
            console.log2('detectColumns', '---size', size)

            div2.css('position', 'absolute')
            if (size.addClass) {
                div2.addClass(size.addClass)
            } else {
                div2.addClass('annottatino_Columns')
            }

            // parent.append(div2)
            // margins.minX = width;
            pH.data.ui.append(div2)

            return div2
        }


        rUtils.removeUiWithClass('annottatino_Columns')

        sSH.detectColumns = function detectColumns(___spans_dC) {
            //if two rows appear ... then two rows
            var fxName = 'detectColumns';


            var dictSpansByRow = {}
            var xVals = {};
            // debugger
            $.each(___spans_dC, function (indexSpan, v) {
                var span = $(v);
                //var fontSize = pH.utils.getFontSize(v);
                var spanPos = pH.utils.getPos(v);
                var left = spanPos.left;

                var lineHeight = rUtils.getFontSize(span)

                left = pH.utils.quantize(left, 5)

                //search out 10px to see if there is an adjacent item

                //console.log2(fxName,'sorted by x spans',lineHeight)

                var arr = xVals[left];
                if (arr == null) arr = [];
                arr.push(span)
                xVals[left] = arr;

                var yVal_Quantized = pH.utils.quantize(spanPos.top, 5)
                var dictSpansAtRow_ByX = dictSpansByRow[yVal_Quantized];
                if (dictSpansAtRow_ByX == null) dictSpansAtRow_ByX = {};
                dictSpansAtRow_ByX[left] = span //add if array
                dictSpansByRow[yVal_Quantized] = dictSpansAtRow_ByX;

                //var rowSpans = []
                //dictSpansByRows[]
                // rUtils.addToArrayDict(dictYRowToSentence, )
            })

            $.each(xVals, function onRemoveItems_FromCol_ThatDoNotIndicateColumn(xVal, colSpans) {

                //return;
                //debugger
                var colSpansFiltered = [];
                //colSpansFiltered = colSpans
                $.each(colSpans, function onRemoveIfBad(k, _span) {
                    var span = $(_span);
                    var spanPos = pH.utils.getPos(_span);
                    var yVal_Quantized = pH.utils.quantize(spanPos.top, 5)
                    var dictSpansAtRow_ByX = dictSpansByRow[yVal_Quantized]
                    var xMin = spanPos.right
                    var xMax = spanPos.right + 10

                    var remove = false;
                    $.each(dictSpansAtRow_ByX, function onGoThrough(k, v) {
                        var spanPos2 = pH.utils.getPos(v);
                        if (spanPos2.left > xMin && spanPos2.left < xMax) {
                            //debugger
                            remove = true
                            return false;
                        }
                    })
                    if (remove == true) {
                        return;
                    }
                    colSpansFiltered.push(_span)
                })
                xVals[xVal] = colSpansFiltered

                return;
                var span = $(v);
                //var fontSize = pH.utils.getFontSize(v);
                var spanPos = pH.utils.getPos(v);

                var yVal_Quantized = pH.utils.quantize(spanPos.top, 5)

                var dictSpansAtRow_ByX = dictSpansByRow[yVal_Quantized];


                return;

                var span = $(v);
                //var fontSize = pH.utils.getFontSize(v);
                var spanPos = pH.utils.getPos(v);
                var left = spanPos.left;

                var lineHeight = rUtils.getFontSize(span)

                left = pH.utils.quantize(left, 5)

                //search out 10px to see if there is an adjacent item


                //console.log2(fxName,'sorted by x spans',lineHeight)

                var arr = xVals[left];
                if (arr == null) arr = [];
                arr.push(span)
                xVals[left] = arr;

                var yVal_Quantized = pH.utils.quantize(spanLeft.top, 5)
                var dictSpansAtRow_ByX = dictSpansByRow[yVal_Quantized];
                if (dictSpansAtRow_ByX == null) dictSpansAtRow_ByX = {};
                dictAtRow[left] = span //add if array
                dictSpansByRow[yVal_Quantized] = dictSpansAtRow_ByX;

                //var rowSpans = []
                //dictSpansByRows[]
                // rUtils.addToArrayDict(dictYRowToSentence, )
            })


            var colCount = 0;
            var maxColX = 0;
            var columnSets = [];

            var drawBBB = true;
            /*

             TODO:
             store the x values
             try to find if all the items do not width
             use width to limti items
             get width of all tiems at oclumn adn draw column
             push the x down fo items int eh colum
             if any go over .. there is aproblem and abort operation


             */


            rUtils.defineSearchFx = function defineSearchFx(___spans_dC2) {
                ___spans_dC2
                rUtils.searchForSpansInArea = function findItemsInBox(spansToSearch, box) { //searchForSpansInArea
                    var dictX = {}
                    var dictY = {}
                    var fxName = 'detectColumns.findItemsInBox';
                    console.log2(fxName, 'find a box for', spansToSearch.length, box)

                    var foundSpans = [];

                    if (box.maxX == null) {
                        box.maxX = box.x + box.width
                    }
                    if (box.maxY == null) {
                        box.maxY = box.y + box.height
                    }

                    $.each(spansToSearch, function filterSpansInMargin(k, span) {
                        span = $(span)
                        var spanText = span.text();
                        var xy = rUtils.getSpanDimensions(span);
                        if (spanText.includes('XYZ')) {
                            //  console.log2(fxName, xy, spanText)
                        }
                        if (xy.x >= box.x) {
                            if (xy.maxX <= box.maxX) {
                                if (xy.y >= box.y) {
                                    if (xy.maxY <= box.maxY) {
                                        foundSpans.push(span)
                                    }
                                }
                            }
                        }
                    })
                    console.log2(fxName, 'find a box Result ', foundSpans.length, foundSpans)
                    return foundSpans;
                    //go to page 144
                }
                /*   rUtils.searchForSpansInArea = function findItemsInBox(spansToSearch, box) { //searchForSpansInArea
                 var dictX = {}
                 var dictY = {}
                 var fxName = 'detectColumns.findItemsInBox';
                 console.log2(fxName, 'find a box for', spansToSearch.length, box)


                 var foundSpans = [];

                 if (box.maxX == null) {
                 box.maxX = box.x + box.width
                 }
                 if (box.maxY == null) {
                 box.maxY = box.y + box.height
                 }

                 $.each(spansToSearch, function filterSpansInMargin(k, span) {
                 span = $(span)
                 var spanText = span.text();
                 var xy = rUtils.getSpanDimensions(span);
                 if (spanText.includes('XYZ')) {
                 //  console.log2(fxName, xy, spanText)
                 }
                 if (xy.x >= box.x) {
                 if (xy.maxX <= box.maxX) {
                 if (xy.y >= box.y) {
                 if (xy.maxY <= box.maxY) {
                 foundSpans.push(span)
                 }
                 }
                 }
                 }
                 })
                 console.log2(fxName, 'find a box Result ', foundSpans.length, foundSpans)
                 return foundSpans;
                 //go to page 144
                 }*/
            }
            rUtils.defineSearchFx(___spans_dC);





            var colorLoop_colColors = rUtils.colors.makeCircle('sizeAnd7')

            console.log2(fxName, 'sorted by x spans', xVals)
            //,  sortedByX)
            $.each(xVals, function onDoXToColumns(xPosition, spansAtX) {
                /*   if ( spansAtX.length > _spans.length*.){
                 console.log2('sorted by x spans', 'has 2 columns')
                 }*/
                if (spansAtX.length > 10) {
                    if (maxColX < xPosition) maxColX = xPosition;
                    colCount++
                    console.log2(fxName, 'sorted by x spans', 'found column', xPosition)
                    var columnSet = {};
                    columnSet.spans = spansAtX
                    columnSet.size = spansAtX.length
                    columnSet.name = 'Column ' + columnSets.length + 1
                    //columnSets[xPosition] = columnSet;
                    columnSets.push(columnSet)
                    columnSet.dim = sSH.getSizeOfColumn(columnSet, ___spans_dC)
                    //console.log2(fxName, '~~~~~~s',  columnSet.dim)
                    columnSet.dim.color = colorLoop_colColors.next();


                    if (drawBBB) {
                        //return;
                        rUtils.drawBlock(
                            columnSet.dim,
                            sh.join(columnSet.name, spansAtX.length),
                            sh.joinStr(columnSet.dim, 'x', 'y', 'width', 'height')
                        )

                    }


                    if (columnSets.length > 1) {
                        $.each(spansAtX, function (k, span) {
                            var top = pH.utils.getPos(span).top;
                            console.log2(fxName, '--- overriding', columnSets.length, span.text())
                            span.attr('top-override', top + pH.pageHeight * columnSets.length);
                        })
                    }

                }
            })
            console.log2(fxName, 'column list', columnSets)
            /*if ( colCount > 1) {
             console.log2(fxName,  'found column', 'has',colCount,'columns')
             //add and override property to all spans
             $.each(___spans_dC, function (indexSpan,v) {
             var span = $(v);
             //var fontSize = pH.utils.getFontSize(v);
             var left = pH.utils.getPos(v).left;
             left = pH.utils.quantize(left, 5)
             if ( left >= maxColX ) {
             //console.log2(fxName,   'found column @', 'has',left,maxColX)
             var top = pH.utils.getPos(v).top;
             span.attr('top-override', top+pH.pageHeight);
             }

             })

             }*/

            return ___spans_dC;
        }


        if (rip.settings.margin) {
            _spans = sSH.addMargins(_spans, rip.settings.margin)
        }


        if (rip.settings.tryToDetect2Columns) {
            //fix an add visual anotations
            _spans = sSH.detectTwoPages(_spans);
        }


        if (rip.settings.tryToDetect3Columns) {
            //fix an add visual anotations
            _spans = sSH.detectColumns(_spans);
        }


        rUtils.classNameBroken = 'brokenLine'
        rUtils.removeUiWithClass(rUtils.classNameBroken);


        utilsSort.putSpansIntoRows = function putSpansIntoRows(__Allspans) {

            //collect all by y
            var yDict = {};
            var yDict2 = {};
            var idx = 0

            function Ranger() {

                var self = this;
                var p = this;
                self.settings = {};
                self.data = {};
                self.data.d = {};
                self.data.list = {};
                p.setInRange = function setInRange(testVal, rangeUpDown) {
                    //self.data.d[k]
                    testVal = parseInt(testVal);
                    var yMin = parseInt(testVal) - rangeUpDown
                    var yMax = parseInt(testVal) + rangeUpDown

                    var returnValue = null;
                    $.each(self.data.list, function on(k, v) {
                        if (v.minRange <= testVal && testVal <= v.maxRange) {
                            returnValue = v.val
                            return false;
                        }
                    })

                    if (returnValue) {
                        return returnValue;
                    }

                    var returnValue2 = null;
                    $.each(self.data.list, function on(k, v) {
                        if (v.minRange <= yMin && yMin <= v.maxRange) {
                            returnValue2 = v.val
                            return false;
                        }
                    })

                    if (returnValue2) {
                        return returnValue2;
                    }


                    self.data.list[testVal] = {
                        minRange: yMin,
                        maxRange: yMax,
                        val: testVal
                    };
                    return testVal

                }
            }

            var ranger = new Ranger();

            window.ranger = ranger;
            var colorLoop_colColors = rUtils.colors.makeCircle('DPG385')
            $('.quantizedDebug').remove()
            $.each(_spans, function arrangeSpansIntoRows(indexSpan, v) {
                var span = $(v);
                var fontSize = pH.utils.getFontSize(v);
                var spanPos = pH.utils.getPos(v)
                var top = spanPos.top;
                var topOverride = pH.utils.getPos(v).topOverride;
                if (topOverride) {
                    //console.log2('replaced override', top, topOverride)
                    top = topOverride;
                }

                /* var rem = top % fontSize/2
                 var yTop = top - rem;
                 yTop = Math.floor(yTop);

                 //add buffer of 5 anything
                 var  rem1 = yTop % 5;
                 var yTop = yTop - rem1;*/
                var rowHeight = 10;
                rowHeight = fontSize / 2; //will break out items at different heights
                rowHeight = fontSize * 0.7;
                rowHeight = fontSize * 0.9;
                //rowSize = pH.totalPageHeight/20; //twenty rows in a page
                var rem = top % rowHeight
                //var yTop = top - rem;
                //yTop = Math.round(yTop);


                var quantizeSize = fontSize;
                quantizeSize = 10;
                var yQuantized = pH.utils.quantize(top, quantizeSize)


                var yMin = parseInt(top) - 5
                var yMax = parseInt(top) + 5
                // if (  ) {


                // var yTop = ranger.setInRange(top, fontSize*0.6);
                var yTop = ranger.setInRange(top, fontSize * 0.5);
                yQuantized = yTop
                // console.log(span.text(), 'ooo', '...', yTop, top)
                //   }







                //console.log2('quantize', top, yQuantized, fontSize, span.text())
                //span.attr('yQuantized', yQuantized)
                span.attr('yQuantized', yTop)
                span.attr('yQuantized2', yTop)
                rUtils.addToArrayDict(yDict, yQuantized, span);

                rUtils.addToArrayDict(yDict2, yQuantized, span.text());

                spanPos.addClass = 'quantizedDebug'
                spanPos.y = yQuantized;
                spanPos.y = yTop;
                if (rip.settings.debugRowBlock) {
                    var div = rUtils.drawBlock(spanPos, yTop)
                    div.css('color', 'white')

                    //var alpha = yTop / pH.pageHeight;
                    //div.css('opacity', alpha)

                    bgColor = colorLoop_colColors.dictColorVal(yQuantized)
                    div.css('background-color', bgColor)
                }


                //sort spans based on x values

                /*
                 var spansAtRow = yDict[yTop];
                 if ( spansAtRow== null ) {spansAtRow = [];}
                 spansAtRow.push(span)
                 var spansAtRow = spansAtRow.sort(utilsSort.sortByX);
                 yDict[yTop] = spansAtRow
                 */

            })

            //return sortedSpans
            if (rip.dbg.sorting) {
                console.error('spans organized by row.',
                    ' with x values considered', yDict, yDict2);

                console.info('yDict', JSON.stringify(yDict2, null, 2))
            }
            return yDict;
        };

        utilsSort.flattendRows = function flattendRows(dictSpansByRow) {
            var spans = [];
            $('.spanSortAnnotations').remove();
            var count = 0;
            window.dc = dictSpansByRow
            $.each(dictSpansByRow, function (indexRow, spansAtRow) {

                //sort each row
                var sortedSpansAtRow = spansAtRow.sort(utilsSort.sortByX);
                var sortedSpansAtRowTxt = [];

                $.each(sortedSpansAtRow, function (indexSpan, span) {
                    spans.push(span);
                    sortedSpansAtRowTxt.push(span.text());
                    if (rip.settings.showSpanNumbers) {
                        var spanClone = $(span);
                        var cloneSpanNumber = spanClone.clone()
                        var p = spanClone.parent();

                        cloneSpanNumber.addClass('spanSortAnnotations')
                        p.append(cloneSpanNumber);
                        cloneSpanNumber.text(count + 1)
                        cloneSpanNumber.attr('pen', span.text());
                        cloneSpanNumber.css('color', 'blue')
                        cloneSpanNumber.css('font-family', 'Arial')
                        //cloneSpanNumber.css('color', blue)
                        //cloneSpanNumber.text('ddddd')
                        cloneSpanNumber.css('font-size', '16px')
                        cloneSpanNumber.css('letter-spacing', '-3px')
                        //console.log2('adding to', p[0], cloneSpanNumber[0])
                        count++
                    }

                })


                // console.log2('sortedSpansAtRowTxt', sortedSpansAtRowTxt)
            })
            return spans;
        };

        var yDict = utilsSort.putSpansIntoRows(_spans);

        var spansZ = utilsSort.flattendRows(yDict);
        return spansZ
    }

    pH.totalPageHeight = $($(spans[0]).parent()).height();
    spans = pH.sortSpans(spans);


    if (rip.dbg.finalSpans) {
        console.error('spans', spans);
    }


    var selectionElement = window.helper.selectionNode;

    pH.highlightSpans = function highlightSpans(_spans, addNumbers) {
        var idx = 0

        function removeAllClassesOfClass(cssclass) {
            $('.' + cssclass).removeClass(cssclass)
            //console.log2('y',  $('.'+cssclass))
        }

        removeAllClassesOfClass('highlight2')
        removeAllClassesOfClass('highlight3')
        removeAllClassesOfClass('highlight4')
        var classes = ['highlight2', 'highlight3', 'highlight4']
        //return
        $.each(_spans, function (indexSpan, v) {
            if (idx > classes.length - 1) {
                idx = 0;
            }
            var classNameHighlight = classes[idx]

            var span = $(v)

            if (addNumbers) {
                span.html(indexSpan)
                span.css('color', 'black')
                var fS = pH.utils.getFontSize(span) * 2
                fS += 'px'
                span.css('font-size', fS)
            }

            if ($.isArray(v)) {

            } else {
                v = [v]
            }
            $.each(v, function (kI, kV) {
                $(kV).addClass(classNameHighlight)
            })
            idx++
        })
    }
    pH.highlightSpans(spans);

    if (rip.settings.stopAfterSorting) {
        return;
    }

    window.scrollToSpan = function scrollToSpan() {
        // REPLACE
        //iframeDoc.body.childNodes[0].innerHTML=newC;
        // GET DOM ELEMENT
        //var elem=iframeDoc.body.childNodes[0].getElementsByTagName('SPAN')[0];
        var elem = pH.currentSpan;
        if (elem == null) {
            console.error('current span is null')
            return
        }
        // SCROLL INTO VIEW
        elem.get(0).scrollIntoView({block: "end", behavior: "smooth"})
        //elem.scrollIntoView({block: "end", behavior: "smooth"});
        window.scrollBy(0, 50);
    }


    pH.determineAverageFontSize = function determineAverageFontSize(spans) {
        var dbg = false;
        var tagName = 'determineAverageFontSize'
        pH.averageFontSize_PerSpan = 0;
        pH.averageFontSize_PerChar = 0;
        var charLength = 0;
        $.each(spans, function onF(kk, vv) {
            var ui = $(vv);
            var fontSize = rUtils.getPx(ui.css('fontSize'), true);
            // fontSize = parseFloat(fontSize)
            var text = ui.text();
            charLength += text.length;
            var allFontSizePerChar = fontSize * text.length;

            if (dbg)
                console.log2(tagName, fontSize, pH.averageFontSize_PerSpan)
            pH.averageFontSize_PerSpan += fontSize
            pH.averageFontSize_PerChar += allFontSizePerChar
        })

        pH.averageFontSize_PerSpan = pH.averageFontSize_PerSpan / spans.length;
        pH.averageFontSize_PerChar = pH.averageFontSize_PerChar / charLength;
        pH.averageFontSize = pH.averageFontSize_PerChar
        console.log2(tagName, 'avgs', pH.averageFontSize_PerSpan, pH.averageFontSize_PerChar)
        //asdf.g

    }
    pH.determineAverageFontSize(spans)

    pH.markUpSpans = function markUpSpans(spans) {

        $.each(spans, function clearSpanAnnotations(k, ui) {
            ui = $(ui);
            ui.css('border-left', 'none')
        })

        $.each(rip.settings.processors, function runPreProcessor(kk, fxPreProcessor) {
            fxPreProcessor(spans)
        })

    }

    //debugger;
    pH.markUpSpans(spans)

    pH.createSentences = function createSentence(spans) {

        var cSH = {};
        cSH.sentences = [];
        cSH.uiElements = [];
        cSH.uiElements_markup = $()
        cSH.uiElementsClear = function uiElementsClear(reason, addIn) {
            if (reason == null) {
                throw new Error('need a reason')
            }
            var newElement = cSH.currentStyle.span.clone();
            newElement.text('');
            if (addIn) {
                cSH.uiElements.push(addIn);
            }
            cSH.uiElementsPush(newElement, true)
        }
        cSH.uiElementsPush = function uiElementsPush(elE) {
            var tagName = 'hasMarkcup';
            //var markup =  elE.attr('markup');
            var markupCurrent = cSH.currentSpan.attr('markup');
            if (cSH.lastSpan) {
                var markup = cSH.lastSpan.attr('markup');
            }
            elE.css('color', '');
            console.log2(tagName, 'span has markup',
                cSH.currentSpan.attr('markup')
            )
            if (cSH.currentStyle.clearAll) {
                var clearAll = cSH.currentStyle.clearAll
            }
            /*    , elE.text(),
             elE[0].outerHTML);*/
            if (markup && clearAll != true  /*&& markup == markupCurrent*/) {

                console.log2(tagName, 'span has markup');
                if (cSH.uiElements_markup.attr('markupFor') != markup) {
                    cSH.uiElements_markup = $('<pre />');
                    cSH.uiElements_markup.css('padding', '10px');
                    cSH.uiElements_markup.css('background-color', '#f2f2f2');
                    cSH.uiElements_markup.attr('markupFor', markup);
                    cSH.uiElements.push(cSH.uiElements_markup);
                    console.log2(tagName, 'new one')
                }
                cSH.uiElements_markup.append(elE);
                cSH.uiElements_lastElement = elE;
                return;
            }

            if (clearAll) {
                console.log2('ok ok ok ok ', '-markup')
            }
            cSH.uiElements.push(elE);
            cSH.uiElements_lastElement = elE;


        }

        cSH.uiElement = null
        cSH.currentSentence = ''
        cSH.dictSentencesToSpans = {};
        cSH.currentSentenceSpans = [];
        cSH.totalPageHeight = $($(spans[0]).parent()).height();
        cSH.spans = [];
        cSH.sentenceNotEmpty = function sentenceNotEmpty() {
            var sentenceNotEmpty_ = cSH.currentSentence != ''
            return sentenceNotEmpty_
        }
        pH.cSH = cSH;
        $.each(spans, function processSpan(k, v) { //find spans
            console.log2('...', v);

            var span = $(v)
            if (selectionElement != null) {
                if (span.html() == $(selectionElement).html()) {
                    cSH.currentSelectedSpan = true;
                }
            }
            cSH.refernceFoundThisIteration = false;

            // if (cSH.currentSpan) {
            cSH.lastSpan = cSH.currentSpan;
            // }
            cSH.currentSpan = span;

            var cSI = {};
            cSI.getStyles = function getStyle(span) {
                var top = span.css('top').replace('px', '')
                top = parseFloat(top);

                var left = span.css('left').replace('px', '')
                left = parseFloat(left);

                var styles = {};
                styles.fontFamily = span.css('font-family');
                styles.fontFamilyOrig = span.attr('origFont');
                styles.markup = span.attr('markup');
                styles.fontSize = span.css('font-size')
                styles.fontSizeAsNumber = span.css('font-size').replace('px', '')
                styles.fontSizeAsNumber = parseFloat(styles.fontSizeAsNumber)
                styles.yQuantized = span.attr('yQuantized');

                styles.top = top;
                //console.log2('what is width', span.width() );
                styles.width = span.width();
                styles.right = span.width() + left;
                //console.log2('what is width', styles.width,
                //    styles.right, left);
                styles.text = span.text();


                styles.isFontStyleSame = function isFontStyleSame(otherStyles) {

                    var different = null;
                    var props = ['fontFamily', 'fontSize']
                    $.each(props, function isSame(k, propName) {
                        var a = styles[propName]
                        var b = otherStyles[propName]

                        if (a.includes('px')) {
                            a = rUtils.clearPixels(a)
                            a = Math.floor(a)
                        }
                        if (b.includes('px')) {
                            b = rUtils.clearPixels(b)
                            b = Math.floor(b)
                        }

                        if (a != b) {
                            console.log2('differe ont', propName, a, b);
                            different = propName
                            return false;
                        }
                    })

                    if (different != null) {
                        return false;
                    }
                    return true;

                    if (cSH.currentStyle.fontFamilyOrig != cSH.lastStyle.fontFamilyOrig) {
                        var arr = [
                            cSH.currentStyle.fontFamilyOrig,
                            cSH.lastStyle.fontFamilyOrig,
                            cSH.currentStyle.fontFamily, cSH.lastStyle.fontFamily,
                            cSH.currentStyle.fontSize, cSH.lastStyle.fontSize]
                        cSI.addSentenceToList('fonts Orig different ' + arr);
                    }
                }


                styles.isLargeVerticalGap = function isLargeVerticalGap(otherStyles) {
                    var expectedNewlineYDiff = styles.fontSizeAsNumber * 1.7
                    var maxYPosition = styles.top + expectedNewlineYDiff;

                    var diffY = styles.top - otherStyles.top

                    var vGapIsLargerThan1Line = diffY > expectedNewlineYDiff

                    diffY = diffY.toFixed(2)
                    expectedNewlineYDiff = expectedNewlineYDiff.toFixed(2)
                    // console.log2('broken', span.text());
                    /*console.log2('broken', otherStyles.top - maxYPosition,
                     expectedNewlineYDiff, maxYPosition);*/
                    if (rip.settings.newSentence_OnVerticalSpace_log2) {
                        console.log2('\t', 'broken', vGapIsLargerThan1Line,
                            otherStyles.top, styles.top, '-',
                            diffY, '<', expectedNewlineYDiff,
                            '|', styles.fontSizeAsNumber)
                        console.log2(rUtils.t, rUtils.t, '1.broken', otherStyles.text, vGapIsLargerThan1Line);
                        console.log2(rUtils.t, rUtils.t, '2.broken', '/|/', styles.text)
                    }
                    if (vGapIsLargerThan1Line) {
                        if (rip.settings.newSentence_OnVerticalSpace_log2) {
                            console.error('brokenline', 'match', styles.text)
                        }


                        /* if (rip.settings.newSentence_OnVerticalSpace_log2) {
                         console.log2('\t', 'broken',
                         otherStyles.top, styles.top, '-',
                         diffY, expectedNewlineYDiff,
                         '|', styles.fontSizeAsNumber, styles.text, '/|/', otherStyles.text);
                         }
                         if ( diffY > expectedNewlineYDiff ) {
                         if (rip.settings.newSentence_OnVerticalSpace_log2) {
                         console.error('brokenline', 'match')
                         }
                         }*/


                        if (rip.settings.newSentence_OnVerticalSpace_log2_displayPurple_Detect) {
                            var parent = $(span[0]).parent()
                            var div = $("<div />");
                            div.addClass(rUtils.classNameBroken)
                            var div2 = div.clone();

                            div2 = div.clone();
                            div2.css('background-color', 'purple')
                            div2.css('opacity', '0.3')
                            div2.text('broken after ' + otherStyles.text)
                            div2.css('left', '0px')
                            div2.css('min-height', '2px')
                            div2.css('width', '90%')
                            div2.css('font-size', styles.fontSizeAsNumber * 0.5)
                            div2.css('top', maxYPosition)
                            div2.css('position', 'absolute')
                            parent.append(div2)
                        }


                        return true;
                    }
                    return false;
                }

                styles.span = span;

                return styles;
            };

            cSI.flattenText = function flattenText(span) {
                var txt = span.html();
                var txtOrig = txt;
                //detect strange formatting with spaces g o d is the b e s t
                if (txt.indexOf('  ') != -1 && txt.split(' ').length > 12) {
                    //txt = txt.replace(/\s\s/gi, ' ');
                    var finalStr = '';
                    var wordOnDblSplit = txtOrig.split('  ')
                    $.each(wordOnDblSplit, function (k, v) {
                        var word = v.split(' ').join('');
                        //   console.error(word, '--', v.split(' '))
                        finalStr += ' ' + word;
                    });
                    //console.log2('|',txt,'|-->',finalStr, txtOrig.split(' '));
                    // console.log2('|',txt,'|-->',finalStr);
                    txt = finalStr;
                }
                ;

                //console.log2('---', span.html(),'||', txt, txtOrig, wordOnDblSplit)
                return txt;
            }

            cSH.currentStyle = cSI.getStyles(span)

            cSI.currentText = cSI.flattenText(span);


            cSH.addAVGapElement = function addAVGapElement(why, span) {
                var spanText = span.text();
                if (cSH.addedNotEmptySpacing === true) {
                    console.log2('broken skip', 'addedNotEmptySpacing')

                    if (cSH.currentSentence != '') {
                        console.error('vgap b00', spanText)
                    } else {
                        console.warn('broken skip', 'aborting adding broken line b/c would be redunant', 'addedNotEmptySpacing')
                        return; //do not add double vgap , even if itrem missing
                    }
                }

                //cSH.uiElement = null;

                if (rip.settings.newSentence_OnVerticalSpace_noNewElements) {
                    console.warn('broken skip', 'rip.settings.newSentence_OnVerticalSpace_noNewElements', 'user request')
                    return;
                }

                var lastElement = cSH.uiElements_lastElement//.slice(-1)[0]

                if (lastElement == null) {
                    console.log2('broken slip - exit', null)
                    return

                }

                if (lastElement.hasClass('vGap')) {
                    console.log2('broken skip', 'vgap alreayd on last class')
                    return
                }
                //TDOD: remove and use something else
                if (lastElement.hasClass('after_vGap')) {
                    console.log2('broken skip', 'after_vGap was last class so skip')
                    // return
                }

                console.error('bad add', 'broken', spanText,
                    'Will break here...',
                    'want to add a sentence on this span, but the sentnce is emtpy ... ')
                console.error(rUtils.t, 'bad add',
                    cSH.addedNotEmptySpacing,
                    cSH.currentSentence,
                    lastElement[0].outerHTML
                );

                if (cSH.uiElement == null) {
                    return;
                }
                //create a new vgap element to for p tag
                cSH.addedNotEmptySpacing = true;

                //cSH.uiElementsPush( cSH.uiElement )

                /*
                 var uiEl = uiUtils.tag('p');
                 uiEl.attr('why', why);
                 uiEl.addClass('vGap');
                 uiEl.css('font-size', '7px')
                 uiEl.css('color', '#666666')
                 uiEl.html(['..... >>>',
                 cSH.uiElement.text(),
                 cSH.currentSentence,
                 spanText,
                 ].join('<br /> _____   '));
                 cSH.uiElementsPush(uiEl);
                 */
                console.error('bad size', cSH.uiElements.length)


                var uiEl = uiUtils.tag('p');
                uiEl.attr('why', why);
                uiEl.addClass('vGap');
                uiEl.css('font-size', '7px')
                uiEl.css('color', '#666666')
                uiEl.css('background-color', 'red')
                uiEl.css('height', '8px')
                uiEl.css('width', '100%')
                uiEl.html();
                //cSH.uiElementsPush(uiEl);

                //if () {
                cSH.uiElementsClear('breaking a loop of sentence', null, uiEl)
                // }


                if (rip.settings.addDashesOnVGap) {
                    var uiEl = cSH.uiElement.clone();
                    cSH.uiElement = uiEl.clone(); //don't change font color that's why
                    uiEl.css('color', 'blue');
                    uiEl.text(cSH.currentSentence)
                    uiEl.text('///');
                    cSH.uiElementsPush(uiEl);
                }

                if (rip.settings.addDashesOnVGap) {
                    var uiEl = cSH.uiElement.clone();
                    uiEl.text('\\\\\\')
                    uiEl.attr('why', why);
                    //  uiEl.addClass('vGap');
                    uiEl.css('color', 'red')
                    cSH.uiElementsPush(uiEl);
                }

                //cSH.currentSentence += 'yyuyisdf'

                //cSI.addSentenceToList('inside of loop ' + 'breaking the line')//+'yQuantizedSame ' + 'lastFormat') //why .. the next one is broken not this one

                //cSI.addSentenceToList('inside of loop '+'yQuantizedSame ' + 'lastFormat') //why .. the next one is broken not this one


                if (rip.settings.newSentence_OnVerticalSpace_log2_displayPurple) {
                    var parent = $(span[0]).parent()
                    var div = $("<div />");
                    div.addClass(rUtils.classNameBroken)
                    var div2 = div.clone();

                    div2 = div.clone();
                    div2.css('background-color', 'purple')
                    div2.css('opacity', '0.3')
                    //div2.text('broken after '+otherStyles.text)
                    div2.css('left', '0px')
                    div2.css('min-height', '2px')
                    div2.css('width', '90%')
                    // div2.css('font-size', styles.fontSizeAsNumber*0.5 )
                    // div2.css('top',maxYPosition)
                    div2.css('top', span.css('top'))
                    div2.css('position', 'absolute')
                    parent.append(div2)
                }

                //split old element by,
                //making a new element
                var uiEl = cSH.uiElement.clone();
                var uiEl = $('<p />') //what is consequene of nto cloning?
                cSH.uiElement = uiEl;
                uiEl.text('')
                uiEl.addClass('after_vGap');
                cSH.uiElementsPush(uiEl);
                //...
            }
            //console.log2('---', span.html(),'||', cSI.currentText)
            cSI.addSentenceToList = function addSentenceToList(why, addCurrentSpan) {
                /*console.log2('add sentence', currentSentence, k, why)
                 pH.sentences.push(currentSentence)
                 //if ( prevSentence ) //Page 9 ... issue replaying b/c arthur is used so any times
                 //append number on string
                 pH.dictSentToDivs[currentSentence] = currentSentenceSpans;
                 currentSentence = '';
                 currentSentenceSpans = [];*/
                //debugger



                var isOnSameLine = why.includes('yQuantizedSame');

                var spanText = span.text();
                var fxName3 = 'addSentenceToList';


                console.debug(fxName3, 'breaking a line???', why, cSH.currentSentence, spanText)
                if ( spanText.includes('ground')) {
                    debugger
                }


                if (!cSH.sentenceNotEmpty() && isOnSameLine == false) {

                    //console.debug(fxName3, 'breaking a line???', why, spanText)
                    console.log2('.....', 'isonsame', isOnSameLine, why)
                    cSH.addAVGapElement(why, span)
                    return
                }
                cSH.addedNotEmptySpacing = false;

                console.log2('why add sentence?', why, cSH.currentSentence);
                console.log2(rUtils.t, 'why add sentence?', '>>>', spanText);
                var dbgWhyAdding = false;
                var spanCopiedProps = span.clone();
                //spanCopiedProps.css('fontFamily', span.attr('origFont'));
                // debugger
                var t = "\t"
                var n = "\n"
                if (cSH.uiElement == null) {
                    var uiEl = uiUtils.tag('p');
                    uiUtils.utils.copyStyles(span, uiEl);
                    cSH.uiElement = uiEl;
                    cSH.uiElementsPush(uiEl);
                    // console.log2('why add', n,n,n,n,n,n)
                    // console.clear()
                    //uiEl.append( cSH.currentSentence + ' ')
                } else {
                    uiEl = cSH.uiElement;
                }
                ;


                var isDifferent = uiUtils.utils.stylesDifferent(uiEl, span, true)
                if (dbgWhyAdding) {
                    console.error(t, 'why add sentence? compareTwo', isDifferent,
                        n, t, cSH.currentSentence,
                        n, t, cSH.uiElement[0].outerHTML,
                        n, t, span[0].outerHTML);
                }
                if (isDifferent || why.includes('fonts Orig')) {
                    uiEl = uiUtils.tag('p');

                    if (why.includes('yQuantizedSame')) {
                        // asdf.g
                        uiEl = uiUtils.tag('span');
                        if (cSH.uiElement) {
                            cSH.uiElement.css('display', 'inline');
                        }
                    }

                    uiUtils.utils.copyStyles(span, uiEl);

                    if (why.includes('lastFormat')) {
                        if (cSH.uiElement) {
                            uiEl.css({});
                            uiUtils.utils.copyStyles(cSH.uiElement, uiEl);
                        }
                    }

                    console.log2(t, 'why add', 'changed', uiEl)
                    //var uiEl = uiUtils.tag('p');
                    //uiUtils.utils.copyStyles(span, uiEl);
                    cSH.uiElement = uiEl;
                    cSH.uiElementsPush(uiEl);
                    // uiEl.append( cSH.currentSentence + ' ')
                } else {
                    console.error(t, 'why add sentence?',
                        n, t, cSH.uiElement[0].outerHTML,
                        n, t, span[0].outerHTML);
                }

                cSI.sentenceNotAdded = false;

                if (addCurrentSpan != false) {
                    cSH.currentSentenceSpans.push(span);
                }
                if (cSH.foundReferences != true) {
                    cSH.currentSentence = cSH.currentSentence.replace(/“/gi, '"')
                    cSH.currentSentence = cSH.currentSentence.replace(/”/gi, '"')
                    cSH.sentences.push(cSH.currentSentence)
                    cSH.dictSentencesToSpans[cSH.currentSentence] = cSH.currentSentenceSpans;

                }
                if (cSH.currentSelectedSpan) {
                    cSH.playbackIndexSelectedSpan = cSH.currentSentenceSpans.length - 1;
                    cSH.currentSelectedSpan = false;
                }


                uiEl.append(cSH.currentSentence + ' ');
                console.debug("\t", 'why add sentence?', cSH.uiElement.html(),
                    span.html());

                cSH.currentSentenceSpans = [];
                cSH.currentSentence = '';

                //  console.error("\t", 'why add current span', cSH.currentSentence );

            }

            cSI.skipDivs = function skipDivs(_span) {

                var sDH = {};
                sDH.headerRatio = 40 / 480;
                sDH.footerRatio = 430 / 480;
                /*
                 var top = _span.css('top').replace('px','')
                 top = parseFloat(top);
                 var styles = {};
                 styles.fontFamily = _span.css('font-family')
                 styles.fontSize = _span.css('font-size')
                 styles.fontSizeAsNumber = _span.css('font-size').replace('px','')
                 styles.fontSizeAsNumber =  parseFloat(styles.fontSizeAsNumber)
                 styles.top = top;
                 styles.fontFamilyOrig = _span.attr('origFont');
                 //console.log2('skipDivs', cSI.currentText)*/
                var styles = cSI.getStyles(span);
                cSH.currentStyle = styles;

                //console.error('skip title ledger ',top,cSH.totalPageHeight , sDH.headerRatio, cSI.currentText)
                if (top / cSH.totalPageHeight < sDH.headerRatio) {
                    console.log2('skip title ledger ', cSI.currentText)
                    // addSentenceToList(); //end of line
                    return true
                }
                if (top / cSH.totalPageHeight > sDH.footerRatio) {
                    console.log2('skip page number / gutter', cSI.currentText)
                    //addSentenceToList('total page hiehgt'); //end of line
                    return true
                }

                function detectReference() {
                    if (cSH.lastStyle == null) {
                        console.error('21...no last style')
                        return false;
                    }
                    //starts with number
                    //txt.startsWith
                    var number = cSI.currentText.trim().slice(0, 1)
                    // console.error(number, '.what is detected number' , cSI.currentText)
                    if (false == $.isNumeric(number)) { //check if starts with number TODO: number and period?
                        return false
                    }

                    //require font sizes to be different ...
                    if (cSH.lastStyle.fontSize == styles.fontSize) {
                        //log2(gave size, not a foot note
                        //switches.footNotesMustChangeSize
                        //debugger;
                        return false;
                    }
                    var expectedTopOfNextLine = cSH.lastStyle.top + cSH.lastStyle.fontSizeAsNumber * 2
                    if (isNaN(expectedTopOfNextLine)) {
                        return false;
                    }
                    //skipped 1 line
                    if (styles.top < expectedTopOfNextLine) {
                        return false;
                    }
                    console.error('dbg detect ref', styles.top,
                        expectedTopOfNextLine, cSH.lastStyle.top, cSH.lastStyle.fontSize * 2)
                    return true
                }

                function detectReferenceIndicator() {
                    //require font sizes to be different ...
                    if (cSH.lastStyle &&
                        cSH.lastStyle.fontSize == styles.fontSize &&
                        cSH.lastStyle.top + styles.fontSizeAsNumber < styles.top //new line (refernces are never on new line)
                    ) {
                        //log2(gave size, not a foot note
                        //switches.footNotesMustChangeSize
                        //debugger;
                        //return false;
                    }
                    if ($.isNumeric(cSI.currentText)) {
                        return true
                    }
                    return false;
                }

                //console.log2('detectReference', cSI.currentText)
                if (rip.settings.detectReferences && detectReference()) {
                    console.log2('skip reference', cSI.currentText)
                    if (cSH.foundReferences != true)
                        cSI.addSentenceToList('skip ref', false); //add last sentence before reference
                    cSH.foundReferences = true;
                    //cSH.refernceFoundThisIteration = true

                    return true; //hit false bottom. no more
                }

                if (rip.settings.detectReferences && detectReferenceIndicator()) {
                    console.log2('skip reference indicator', cSI.currentText)
                    //  cSI.addSentenceToList('skip ref indicator');
                    return true;
                }

            };

            if (cSI.skipDivs(span)) {
                console.error('skip span', span, cSI.currentText)
                return;
            }
            ;

            if (cSH.foundReferences != true) {
                cSH.spans.push(span)
                cSH.currentSentenceSpans.push(span)
            }
            /*if ( cSH.refernceFoundThisIteration ) {
             if ( k == spans.length -1 ) { //last one
             cSI.addSentenceToList('last one');
             }
             }*/

            cSI.sentenceNotAdded = true

            if (cSH.lastStyle != null) {



                //if currentSentence is not empty ('mioght have alreayd switched')
                if (/* cSI.sentenceNotAdded &&*/
                    rip.settings.newSentence_OnVerticalSpace) {

                    //if font and size is same
                    var largeGapMeansNewLine = cSH.currentStyle.isLargeVerticalGap(cSH.lastStyle)

                    if (largeGapMeansNewLine) {
                        if (rip.settings.newSentence_OnVerticalSpace_log2)
                            console.log2('breaking the line here ---->| broken')

                        // cSI.addSentenceToList('large gap ' );
                        cSH.addAVGapElement('arge gap2', span)
                        //var Break = rUtils.isSpaceWide(cSH.lastStyle.right,
                        //    cSH.currentStyle.left, cSH.currentStyle.fontSizeAsNumber * 2)

                    }

                }


                var fontIsDiff = cSH.currentStyle.fontSizeAsNumber != cSH.lastStyle.fontSizeAsNumber

                rUtils.isRatioLessThan = function isRatioLessThan(a,b,targetRatio) {
                    var val = a - b
                    val = Math.abs(val)
                    max =  Math.max(a,b)

                    var ratio = val/max;

                    if ( ratio < targetRatio ) {
                        return true;
                    }
                    return false;
                }
/*

                if ( fontIsDiff && rip.settings.fontSizeX ) {
                    var isValid = rUtils.isRatioLessThan(
                        cSH.currentStyle.fontSizeAsNumber , cSH.lastStyle.fontSizeAsNumber,
                    rip.settings.fontSizeX )
                    console.debug('fontSizeX', isValid, cSH.currentStyle.fontSizeAsNumber , cSH.lastStyle.fontSizeAsNumber)
                }

*/




                // debugger
                if (rip.settings.combineDivsToSentMode) {
                    //console.log2('why add sen test fontsize quantdiff',
                    //    fontSize_Diff, fontSize, fontSize1)
                    var fontSize = rUtils.clearPixels(cSH.currentStyle.fontSize)
                    var fontSize1 = rUtils.clearPixels(cSH.lastStyle.fontSize)
                    var fontSize_Diff = fontSize1 - fontSize
                    var fxT = 'why add sen'
                    fxT = '';
                    console.log2('combineDivsToSentMode', fxT,
                        fontSize_Diff, fontSize, fontSize1)

                    if (fontSize_Diff < Math.max(fontSize, fontSize1) * rip.settings.sentenceSizeRatio  ) {

                        //var fontIsQuantizedDiff =   cSH.currentStyle.fontSize != cSH.lastStyle.fontSize
                        if (fontIsDiff) {
                            fontIsDiff = false;
                            console.log2('combineDivsToSentMode',
                                fxT, 'is smaller')
                        }
                    }
                    //return;
                }

                var fontFamilyIsDiff = cSH.currentStyle.fontFamily != cSH.lastStyle.fontFamily

                if (cSI.sentenceNotAdded &&
                    (  fontIsDiff || fontFamilyIsDiff )) {
                    var arr = [cSH.currentStyle.fontFamily, cSH.lastStyle.fontFamily,
                        cSH.currentStyle.fontSize, cSH.lastStyle.fontSize]

                    var same = '';
                    if (cSH.currentStyle.yQuantized == cSH.lastStyle.yQuantized) {
                        same = ' ' + 'yQuantizedSame';
                        //sdf.g
                        console.error('error quantized')
                    }
                    console.log2('-yQuantized', cSH.currentStyle.yQuantized);


                    //cSI.addSentenceToList('fonts Orig different ' + arr + same);
                    cSI.addSentenceToList('fonts different ' + arr + same);


                }
                /*      }

                 if (cSH.lastStyle != null ) {*/

                if (rip.settings.newSentenceOnOrigFont) {
                    if (cSI.sentenceNotAdded &&
                        cSH.currentStyle.fontFamilyOrig != cSH.lastStyle.fontFamilyOrig) {
                        var arr = [
                            cSH.currentStyle.fontFamilyOrig,
                            cSH.lastStyle.fontFamilyOrig,
                            cSH.currentStyle.fontFamily, cSH.lastStyle.fontFamily,
                            cSH.currentStyle.fontSize, cSH.lastStyle.fontSize]

                        var same = '';
                        if (cSH.currentStyle.yQuantized == cSH.lastStyle.yQuantized) {
                            same = ' ' + 'yQuantizedSame';
                        }
                        console.log2('-yQuantized', cSH.currentStyle.yQuantized);
                        cSI.addSentenceToList('fonts Orig different ' + arr + same);
                    }
                }
                ;

                if (rip.settings.newSentence_Markup != false) {
                    var arr = [
                        cSH.currentStyle.markup,
                        cSH.lastStyle.markup,
                    ]
                    var markupChanged = cSH.currentStyle.markup != cSH.lastStyle.markup;
                    if (markupChanged) {
                        // console.log2('-markup changed', markupChanged, cSI.sentenceNotAdded, arr);
                        if (markupChanged) {
                            var same = '';
                            console.log2('-markup changed', arr, cSH.currentSentence, cSH.currentStyle.text);
                            cSH.currentStyle.clearAll = true;
                            var newElement = cSH.currentStyle.span.clone();
                            newElement.text('');
                            cSH.uiElementsPush(newElement, true)
                            // cSI.addSentenceToList('-markup different ' + arr + same);
                        }
                    }
                }
                ;

                //if currentSentence is not empty ('mioght have alreayd switched')
                if (cSI.sentenceNotAdded &&
                    rip.settings.newSentence_OnWideSpace) {
                    rUtils.isSpaceWide = function isSpaceWide(a, b, range) {
                        var diff = Math.abs(a - b);
                        if (diff < range)
                            return true
                        return false
                    }


                    //if font and size is same

                    var isFontSame = cSH.currentStyle.isFontStyleSame(cSH.lastStyle)

                    if (isFontSame) {
                        var Break = rUtils.isSpaceWide(cSH.lastStyle.right,
                            cSH.currentStyle.left, cSH.currentStyle.fontSizeAsNumber * 2)

                    }
                    /*if (cSH.currentStyle.fontFamilyOrig != cSH.lastStyle.fontFamilyOrig) {
                     var arr = [
                     cSH.currentStyle.fontFamilyOrig,
                     cSH.lastStyle.fontFamilyOrig,
                     cSH.currentStyle.fontFamily, cSH.lastStyle.fontFamily,
                     cSH.currentStyle.fontSize, cSH.lastStyle.fontSize]
                     cSI.addSentenceToList('fonts Orig different ' + arr);
                     }*/
                }


            }

            cSI.getHTML = function getHTML() {
                var html = span.html();
                var htmlArr = [];
                for (var i = 0; i < html.length; i++) {
                    var char = html[i];
                    htmlArr.push(char)
                }
                var endingStr = ['. ', '! ', '? ',
                    '."', '!"', '?"',
                    '.”', '!”', '?”'
                ]

                if (rip.settings.extendedEndings != false) {
                    endingStr = endingStr.concat([
                        ': ', '; '
                    ])
                }


                $.each(htmlArr, function (k, char) {
                    if (k == 0) {
                        if (cSH.lastStyle != null) {
                            if (cSH.currentStyle.top > cSH.lastStyle.top + 1) {
                                if (char != ' ' && char.toLowerCase() == char) {
                                    cSH.currentSentence += ' ' //add space if first char of div is not space
                                }
                            }
                        }

                    }
                    var threeChars = '   '
                    var twoChars = '  '

                    function getNextChars(numChars) {
                        var nextXChars = char;
                        if (numChars > 1) {
                            if (k < htmlArr.length - 2) {
                                nextXChars += htmlArr[k + 1]
                            }
                        }
                        if (numChars > 2) {
                            if (k < htmlArr.length - 3) {
                                nextXChars += htmlArr[k + 2]
                            }
                        }
                        nextXChars = nextXChars.replace(/”/gi, '"')
                        return nextXChars;
                    }

                    twoChars = getNextChars(2)
                    threeChars = getNextChars(3)

                    if (endingStr.indexOf(twoChars) != -1) {
                        cSH.currentSentence += twoChars;
                        cSI.addSentenceToList('hit..., ' + endingStr)
                        return;
                    }
                    if (endingStr.indexOf(threeChars) != -1) {
                        cSH.currentSentence += threeChars;
                        cSI.addSentenceToList('hit___, ' + endingStr)
                        return;
                    }

                    //console.log2('at end', twoChars, threeChars)

                    var lastChar2 =  cSH.currentSentence.slice(-2)[0]
                    var lastChar  = cSH.currentSentence.slice(-1)[0]
                    if ( lastChar2 == '-' && lastChar == ' ') {
                        console.debug('char_', lastChar2, lastChar, char)
                        //task: removing hyphen
                        cSH.currentSentence = cSH.currentSentence.slice(0,-2)
                    }
                    if ( lastChar == '-') {
                        //console.debug('char--', lastChar2, lastChar)
                    }

                    cSH.currentSentence += char;
                });

                var endingStr2 = endingStr.concat(['.', '?', '!',]) //single string is valid here
                $.each(endingStr2, function (k, v) {
                    if (cSH.currentSentence.endsWith(v)) {
                        cSI.addSentenceToList('txt.endsWith ' + v)
                        return;
                    }
                });


                return;
            }

            cSI.getHTML();

            /*if ( cSH.foundReferences != true ) {
             cSH.currentSentenceSpans.push(span)
             }*/

            cSH.lastStyle = cSH.currentStyle;
            console.log2('getSentV20', 'k', cSH.currentStyle, span.html(), cSI.currentText, k, spans.length);

            var atLastSpan = k == spans.length - 1;
            if (atLastSpan) {
                if (cSH.currentSentence.indexOf("\n") != -1) {
                    //split sentence
                    debugger;
                    console.log2('getSent', 'split sentence')
                    var split = cSH.currentSentence.split("\n");
                    $.each(split, function (k, sent) {
                        cSH.currentSentence = sent;
                        cSI.addSentenceToList('last sentence, always added', true)
                    })

                } else {
                    //debugger
                    cSI.addSentenceToList('last sentence, always added', true);
                }

            }

            //console.log2('as an am', k)
            cSH.cSI = cSI; //export
        });


        if (cSH.currentSentence != '') {
            cSH.cSI.addSentenceToList('last sentence, always added', true);
        }
        window.processedPdf1x = true

        window.cSH = cSH;
        cSH.printUI = function printUIElements(display) {
            // cSH.uiElements = $(cSH.uiElements);
            console.log2('length', cSH.uiElements.length);
            window.cSH.pageHTML = ''
            // var list = [];
            $.each(cSH.uiElements, function onP(k, v) {
                // list.push(v[0]);
                //console.log2(v.html())
                var ui = v.clone();
                if (display == false) {
                    var scale = window.$scope.pdfScale
                    var fontSize = rUtils.getFontSize(ui)

                    if (scale != 1 && fontSize > 0) {
                        var scaleInverse = 1 / scale;

                        //console.log2('printUI', fontSize)
                        var newFontSize = fontSize * scaleInverse;

                        var isNewSizeValid = isNaN(newFontSize) == false
                        if (isNewSizeValid) {
                            ui.css('font-size', newFontSize + 'px');
                        }
                        // console.log2(scale, scaleInverse, size, newSize, ui.text())

                    }
                }
                var html = ui[0].outerHTML;
                if (display != false)
                    console.log2('printUI', html);
                window.cSH.pageHTML += html + "\n"

            });
            //  cSH.uiElements = $(list);
        }

        cSH.printUI(false)

        if (rip.settings.showUIElements)
            setTimeout(cSH.printUI, 1500)
        if (rip.settings.previewUIElements != false) {
            // debugger
            $('#divPreview').html('')
            $('#testTransportPanel').css('background', 'white');//('')
            var elements = $();
            $.each(cSH.uiElements, function onAddElements(k, v) {
                var ui = $(v)
            })
            $('#divPreview').append(cSH.uiElements)
            $('#divPreview').css('opacity', 0.7);//(cSH.uiElements)
            $('#divPreview').css('opacity', 1);//(cSH.uiElements)
            $('#divPreview').css('zoom', 0.8);//(cSH.uiElements)
            $('#divPreview').css('height', '300px');
            $('#divPreview').css('overflow-y', 'auto');
//
            //overflow-y: auto;
            //height: 100px;
        }
        return cSH.sentences;
    }


    var sentencesX = pH.createSentences(spans);
    console.log2('sentencesX', 'k', sentencesX);
    console.log2('cSH', pH.cSH);
//pH.cSH.spans = []
    pH.highlightSpans(pH.cSH.spans);
//console.clear()
    var sentencesX = pH.createSentences(spans);
    if (rip.dbg.finalSentenceParsedList) {
        console.log2('sentencesX', 'k', sentencesX);
        console.log2('cSH', pH.cSH);
    }
//pH.cSH.spans = []
    pH.highlightSpans(pH.cSH.spans);
//console.clear()
//console.error('food...')

    pH.testSelectAllSentences = function highlightEachSentence(_sentences) {
        var idx = 0

        function removeAllClassesOfClass(cssclass) {
            $('.' + cssclass).removeClass(cssclass)
            //console.log2('y',  $('.'+cssclass))
        }

        removeAllClassesOfClass('highlight2')
        removeAllClassesOfClass('highlight3')
        removeAllClassesOfClass('highlight4')
        var classes = ['highlight2', 'highlight3', 'highlight4']
        //return
        $.each(pH.cSH.dictSentencesToSpans, function (k, v) {
            /*
             var isOdd = idx % 2 == 0
             idx++
             if ( isOdd ) {
             //console.log2('--log2ging', v)
             $.each(v, function (kI, kV) {
             $(kV).addClass('highlight2')
             })
             } else {
             //console.log2('-log2ging', v  )
             $.each(v, function (kI, kV) {
             $(kV).addClass('highlight3')
             })
             }
             */
            if (idx > 2) {
                idx = 0;
            }
            var classNameHighlight = classes[idx]
            $.each(v, function (kI, kV) {
                $(kV).addClass(classNameHighlight)
            })
            idx++
        })
    }
    pH.testSelectAllSentences(pH.cSH.sentences)

    pH.playCurPage = function playCurPage(play, playIndex) {
        if (play != true) {
            return
        }
        helper.speak.clearCache();
        var lastFoundIndex = 0;
        var sentences = pH.cSH.sentences;
        var dictSentToDivs = pH.cSH.dictSentencesToSpans;
        var marker = window.iterationMarkerPdf;
        var async = $.async(sentences, function procSentence(k, sentence, fxEnd, controller) {
                iterationWrapperFx(); //run so it can be resumed

                function iterationWrapperFx() {
                    if (window.iterationMarkerPdf != marker) {
                        //debugger
                        console.error('marker has changed.... aborting loop')
                        return;
                    }

                    //sentence = sentence.replace(/#/gi, '');
                    console.log2('looking for', sentence)
                    pH.utils.clearAllspans()
                    //pH.clearAllspans();
                    var divsToHighlight = dictSentToDivs[sentence];
                    $.each(divsToHighlight, function (kI, kV) {
                        $(kV).addClass('highlight')
                        pH.currentSpan = kV;
                    });

                    function fxEndRedirect() {
                        //window.fxIteration = iterationWrapperFx;
                        fxEnd()
                    }

                    helper.speak(sentence, fxEndRedirect)
                    var nextSentence = controller.getNext();
                    if (nextSentence != null) {
                        helper.speak(nextSentence, null, null, true)
                    }
                }

                window.fxIteration = iterationWrapperFx;

            }, function onDone_Sent() {
                helper.goToNextPage();
            }, 10,
            playIndex)
        window.async = async;

    }

    if (pH.cSH.playbackIndexSelectedSpan) {
        if (playIndex) {
            console.error('play indiex is defined and seleted value ... wtf? ... not setting')
        } else {
            playIndex = pH.cSH.playbackIndexSelectedSpan
            pH.cSH.playbackIndexSelectedSpan = -1
            console.error('play index is great')
        }
    }
    pH.playCurPage(play, playIndex)


// window.uploadCurrentPage()
    return;

}


window.run5Pages = function run5Pages() {
    //console.clear();
    console.log2('run 5 pages')
}

window.uploadCurrentPage = function uploadCurrentPage(_fxPageComplete, processPage2) {
    //console.clear();
    console.log2('uploadCurrentPage')
//debugger
    if (processPage2 != false)
        window.processPage();

    var url = 'http://127.0.0.1:6006/upBook';
    var data = {}
    data.book_name = 'xb'
    data.book_name = window.$scope.pdfURL;
    data.page = window.pH.currentPage;
    data.contents = window.pH.cSH.sentences;
    data.htmlContents = window.pH.cSH.pageHTML;
    data.errors = window.pH.errors;

    console.log2('pageHTML', data)
    // console.log2('pageHTML', 'htmlContents', data.htmlContents)


    //if ( window.screenCaputerer ==null ) {
    var s = new ScreenCapture();
    s.init()
    window.screenCaputerer = s;
    // }
    s = window.screenCaputerer;

    function onstep2() {

        // setTimeout(function cap(){
        // s.capture('pdf-viewer',
        function uploadScreen() {
            s.capture(
                {
                    target: '#container_pdf',
                    fx: onDone_Step2
                },
                {
                    name: data.page,
                    dir: data.book_name
                })

        }

        onDone_Step2()
        // }, 2000)

    }

    function onDone_Step2(config) {

        if (_fxPageComplete == null) {
            return;
        }
        var page = window.$scope.pdfCurrentPage
        window.$scope.pdfViewerAPI.goToNextPage()

        setTimeout(function goToNextPage() {


            if (_fxPageComplete) {
                _fxPageComplete();
                /*    setTimeout(function fxDone2(){
                 var config_ = config;
                 var currentPage = window.$scope.pdfCurrentPage

                 console.log2('seeing',page, currentPage,  config_.data, config_)
                 if ( page == currentPage ) {
                 console.error('over')
                 return;
                 }
                 _fxPageComplete();
                 }, 4000)*/
                return;
            }

            window.processPage();
        }, 2000)


    }

    onDone_Step1();
    function onDone_Step1() {
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: onWavDataResponseRecieved,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            //dataType: dataType
        });

        function onWavDataResponseRecieved() {
            console.info('done')

            onstep2()

        }

    }
}


window.uploadAllPages = function uploadAllPages(_maxPageCount) {
    var cfg = {};
    cfg.maxPageCount = 10;
    cfg.pageCount = 0;

    if (_maxPageCount) {
        cfg.maxPageCount = _maxPageCount
    }

    window.uploadCurrentPage(goToNextPage_Loop);
    function goToNextPage_Loop() {
        var page = window.$scope.pdfCurrentPage;
        //debugger;
        cfg.pageCount++;
        if (cfg.maxPageCount != -1) {
            if (cfg.pageCount > cfg.maxPageCount) {
                console.log2('ended', page, cfg.pageCount, cfg.maxPageCount)
                return;
            }
        }

        if (page == cfg.lastPage) {
            console.log2('ended early', page, cfg.pageCount, cfg.maxPageCount)
            return;
        }
        cfg.lastPage = page;
        window.uploadCurrentPage(goToNextPage_Loop)
    }
}

window.uploadEntireBook = function uploadEntireBook() {
    $scope.pdfViewerAPI.goToPage(1)
    setTimeout(function startUploading() {
        window.uploadAllPages(-1);
    }, 800)
}


function exportEntireBookFxs() {
    window.onConvertEntireBook = function onConvertEntireBook() {
        window.uploadEntireBook();
    }

    window.onCombineEntireBook = function onCombineEntireBook() {
        console.log2('CombineEntireBook()')
        var data = {}
        data.book_name = 'xb'
        data.book_name = window.$scope.pdfURL;
        var url = 'http://127.0.0.1:6006/upBookCombine';
        $.ajax({
            url: url,
            type: 'get',
            data: data,
            success: onWavDataResponseRecieved,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            error: function onError(a, b, c, d) {
                console.error(url, a, b, c, d)
            }
            //dataType: dataType
        });

        function onWavDataResponseRecieved() {
            console.info('done')
        }

        //window.uploadEntireBook();
    }
}
exportEntireBookFxs();

window.uploadRemainingPages = function uploadRemainigPages() {
    setTimeout(function startUploading() {
        window.uploadAllPages(-1);
    }, 800)
}

rip.settings.processors.push(function getCodeSnippets(spans) {
    var tagName = 'codeSearch';
    var dbg = false
    var inBlock = false;

    var procHelper = {};
    procHelper.codeBlockNumber = 0;
    function markup(asdf) {
        asdf.css('border-left', '50px orange solid')
        asdf.attr('markup', 'codeBlock' + procHelper.codeBlockNumber)
    }

    $.each(spans, function processSpan_forMarkup(k, v) { //find spans

        v = $(v);
        var prev = $(spans[k - 1]);
        var next = $(spans[k + 1]);
        var font = $(v).css('fontFamily')

        var textIsNumber = isNaN(parseInt(v.text())) == false;
        if (v.text().includes('.')) {
            textIsNumber = false;  //block 5.1 Performance Trees, must have at least 2 valid spans to start
        }
        var left = v.css('left').replace('px', '');
        var width = $('.page').css('width').replace('px', '');
        left = parseInt(left);
        width = parseInt(width);
        var xIsNearCodeArea = left / width < 130 / 545;
        var numberAndInRightPosition = xIsNearCodeArea && textIsNumber;
        //  console.warn(tagName, left, width,xIsNearCodeArea,
        //      left/width , 130/545, textIsNumber )

        if (numberAndInRightPosition && inBlock == false) {
            //go bcakwards to get any previous items
            //previousItems.reverse(); ... if is monospaced, mark it up ...
        }

        //var nextSpanIsValid = false; //block 5.1 Performance Trees, must have at least 2 valid spans to start
        //nextSpanIsValid = $(next).css('fontFamily') == 'monospace';

        //if ( nextSpanIsValid ) {
        if (font == 'monospace' || numberAndInRightPosition) {
            if (prev.text() == '1' || next.text() == '1' || numberAndInRightPosition) {
                if (dbg)
                    console.debug(tagName, 'start code block')
                if (inBlock == false) {
                    procHelper.codeBlockNumber++;
                }
                if (inBlock == true) {
                    if (dbg)
                        console.error(tagName, 'inblock twice')
                }
                inBlock = true
                if (prev.text() == '1') {
                    if (dbg)
                        console.debug(tagName, 'gobackwards', prev.text())
                    markup(prev)
                }
            }
        }
        // }
        if (dbg)
            console.log2(tagName, 'spans', font, v.text());
        if (inBlock)
            markup(v)

        if (inBlock) {
            if (next.css('fontFamily') != 'monospace') {
                var number = parseInt(next.text())
                if (isNaN(number)) {
                    inBlock = false;
                    if (dbg)
                        console.debug(tagName, 'leave code block', next.text())
                }
            }

        }


    })
})

rUtils.getPx = function getPx(px, roundOff) {
    if (px == null)
        return null
    var sizePre = px.replace('px', '')
    var size = parseFloat(sizePre);
    if (isNaN(size)) {
        console.log2('size is nan', px)
        throw new Error('size is nan ' + px)
    }
    if (roundOff) {
        size = size.toFixed(2)
        size = parseFloat(size)
    }
    return size;
}

rUtils.badError = function badError(msg) {
    pH.errors.push(msg)
}

rUtils.processHelper = function processHelper(k, v, spans, tagName) {
    var h = {}
    var prev = $(spans[k - 1]);
    var cur = $(spans[k - 0]);
    var next = $(spans[k + 1]);
    var nextNext = $(spans[k + 2]);

    var pageWidth = $('.page').css('width').replace('px', '');

    h.prev = prev;
    h.cur = cur;
    h.next = next;
    h.nextNext = nextNext;

    function setTo(h, ui, prop, i) {
        h[prop] = ui;
        ui.font = ui.css('fontFamily');
        ui.origfont = ui.attr('origfont');
        ui.left = rUtils.getPx(ui.css('left'), true);
        ui.top = rUtils.getPx(ui.css('top'), true);
        ui.y = ui.top;
        ui.x = ui.left;
        ui.fontSize = rUtils.getPx(ui.css('fontSize'), true);
    }

    setTo(h, prev, 'prev');
    setTo(h, cur, 'cur');
    setTo(h, next, 'next');
    setTo(h, nextNext, 'nextNext');

    h.xPercentageGreatherThan = function xPercentageGreatherThan(xRatio) {
        //130/545
        var textIsNumber = isNaN(parseInt(cur.text())) == false;
        var left = v.css('left').replace('px', '');
        var width = $('.page').css('width').replace('px', '');
        left = parseInt(left);
        width = parseInt(width);
        var xIsNearCodeArea = left / width > xRatio;
        var tagName = 'xPercentageGreatherThan figureSearch'
        var dbg = false;
        if (dbg)
            console.warn("\t", tagName, (left / width).toFixed(2), '>', xRatio.toFixed(2), rUtils.t, 'x', left, 'y', width)
        return xIsNearCodeArea;
        // var numberAndInRightPosition = xIsNearCodeArea && textIsNumber;
    }


    h.searchOnRow5050_any_xPercentageGreatherThan = function searchOnRow5050_any_xPercentageGreatherThan(xRatio) {

        var spansOnRow = [];
        var spansOnRowText = [];
        var y = h.cur.top;
        //console.log2(tagName, 'what is y',y)
        //asdf.g
        var rowFontSizeX = h.cur.fontSize;
        //if ( rowFontSize ) {
        var rowFontSize = pH.averageFontSize;
        // }
        var ymin = h.cur.top - rowFontSize * .5;
        var ymax = h.cur.top + rowFontSize * .5;

        ymin = parseFloat(ymin.toFixed(2));
        ymax = parseFloat(ymax.toFixed(2));

        var dbg = false;
        if (dbg) {
            console.debug(rUtils.t, tagName, 'findSpansOrRow-start', y, ymin, ymax, 'looking for-->', h.cur.text())
            console.debug(rUtils.t, tagName, 'findSpansOrRow-start::', rowFontSizeX, rowFontSize)
        }
        // asdf.g

        $.each(spans, function findSpansOrRow(k, v) { //find spans
            //y higher or lower than this 50-50


            var potentialRowSpan = $(v)
            var text = potentialRowSpan.text();
            setTo({}, potentialRowSpan, 'potentialrowmatch');

            if (dbg) {
                console.debug(rUtils.t, rUtils.t, rUtils.eachNumber(k), tagName, 'findSpansOrRow', potentialRowSpan.y, ymin, ymax,
                    rUtils.n, rUtils.t, rUtils.t, rUtils.t, text)
            }

            if (potentialRowSpan && potentialRowSpan.y > ymin && potentialRowSpan.y < ymax) {
                console.warn(tagName, 'findSpansOrRow', potentialRowSpan.y, '-in-', text)
                spansOnRow.push(potentialRowSpan);
                spansOnRowText.push(text);
            }
        });

        //if ( dbg ) {
        console.debug(tagName, 'findSpansOrRow-length found', spansOnRow.length, '-in-', spansOnRowText, spansOnRow)
        //}

        var doAnyHaveXRatio_LessThanMin = false;

        $.each(spansOnRow, function _findSpansOrRow_xRatioCheck(k, v) {
            var potentialRowSpan = $(v)
            setTo({}, potentialRowSpan, 'potentialrowmatch')
            var xRatio_of_span = potentialRowSpan.x / pageWidth
            var xIsLessThanRatio = xRatio_of_span < xRatio;

            if (xIsLessThanRatio) {
                doAnyHaveXRatio_LessThanMin = true;
                console.warn("\t", 'figureSearch', xIsLessThanRatio, (xRatio_of_span).toFixed(2), '>', xRatio.toFixed(2), rUtils.t,
                    'x', potentialRowSpan.x, 'y', pageWidth)
                return false;
            }
            // var numberAndInRightPosition = xIsNearCodeArea && textIsNumber;

        });

        console.debug(tagName, 'findSpansOrRow-length output', doAnyHaveXRatio_LessThanMin)

        // asdf.g
        return doAnyHaveXRatio_LessThanMin;
    }


    h.lookAheadForSpan_startsWith = function lookAheadForSpan_startsWith(startWith) {
        var found = false;
        var remainingSpans = spans.slice(k);
        $.each(remainingSpans, function searchRemainingSpans(k, v) { //find spans

            var text = $(v).text()
            if (text.startsWith(startWith)) {
                console.debug(tagName, 'did get match', startWith, '-in-', text)
                found = true
                return false;
            }
        });

        return found;
    }
    return h;
}

rip.settings.books = {}
rip.settings.books.ai = {}
rip.settings.books.ai.maxXPercentage = 130 / 545;

rip.settings.processors.push(function getFigures(spans) {
    var tagName = 'figureSearch';
    var inBlock = false;

    var dbg = false;

    function markup(asdf) {
        asdf.css('border-left', '50px blue solid')
        asdf.attr('markup', 'figureBlock')
    }

    $.each(spans, function processSpan_forMarkup(k, v) { //find spans
        var h = rUtils.processHelper(k, v, spans, tagName);
        // h.cur.css('border-left', 'none');
        /*   var textIsNumber = isNaN(parseInt(v.text())) == false;
         var left = v.css('top').replace('px', '');
         var width = $('.page').css('width').replace('px', '');
         left = parseInt(left);
         width = parseInt(width);
         var xIsNearCodeArea = left/width < 130/545 ;
         var numberAndInRightPosition = xIsNearCodeArea && textIsNumber;
         console.warn(tagName, left, width,xIsNearCodeArea,
         left/width , 130/545, textIsNumber )

         if ( numberAndInRightPosition && inBlock == false ) {
         //go bcakwards to get any previous items
         //previousItems.reverse(); ... if is monospaced, mark it up ...
         }*/
        //console.log2(tagName, h.cur.origfont)

        /*if ( h.cur.origfont  == 'g_font_21'  ) {
         console.debug(tagName, 'start code block');
         if ( inBlock == true ) {
         console.error(tagName,'inblock twice');
         }
         inBlock = true;
         };*/

        if (dbg) {
            console.log2(tagName, '---------------------------');
            console.log2(tagName, k, 'text:', h.cur.text());
        }
        if (h.xPercentageGreatherThan(rip.settings.books.ai.maxXPercentage)) {
            if (h.lookAheadForSpan_startsWith('Figure ')) {
                if (dbg)
                    console.debug(tagName, 'start code block.2');
                if (inBlock == true) {
                    if (dbg)
                        console.error(tagName, 'inblock twice');
                }
                inBlock = true;
                if (h.searchOnRow5050_any_xPercentageGreatherThan(rip.settings.books.ai.maxXPercentage)) {
                    if (dbg)
                        console.debug(tagName, 'undoing--start code block.2');
                    inBlock = false;
                }
            }

        }


        if (false && inBlock == false) {
            if (dbg) {
                console.debug(tagName, 'start code block.3',
                    h.xPercentageGreatherThan(rip.settings.books.ai.maxXPercentage),
                    h.lookAheadForSpan_startsWith('Figure '));
            }
        }

        if (inBlock) {
            //asdf.g
            markup(h.cur)
        }

        if (inBlock) {
            if (h.next.origfont == h.nextNext.origfont) {
                if (h.next.text().includes('Figure')) {
                    inBlock = false;
                    if (dbg)
                        console.debug(tagName, 'leave code block', h.next.text())
                    markup(h.next)
                    markup(h.nextNext)
                }
            }
            /*if ( next.css('origfont') != 'monospace') {
             var number = parseInt(next.text())
             if ( isNaN(number)) {
             inBlock = false;

             }
             }
             */
        }


    })

    if (inBlock) {
        rUtils.badError('did not leave block mode')
    }
})

window.fx()

window.fx2()

window.processPage = window.fx2;
console.log2('doddddddmde2')


function defineTestable() {
    ///(\n\n\s?)[a-z]

    //load ai book
    function toc() {
        //gt page 7
    }

    //function goexampleofspacingdiffAndMargin()
    //page 250
    window.goToDiagramPage = function goToDiaOage() {
        $scope.pdfViewerAPI.goToPage(251)
    }
    window.goTtoNewPage = function goToDiaOage() {
        $scope.pdfViewerAPI.goToPage(254)
    }
    window.goToDescicionChapter = function goToDescicionChapter() {
        $scope.pdfViewerAPI.goToPage(318)
    }
    window.goToPage = function goToPage(page) {
        $scope.pdfViewerAPI.goToPage(page + 25)
    }

    window.taskHitDescriptionChapter = function taskHitDescriptionChapter() {
        $scope.pdfViewerAPI.goToPage(318);
        console.clear();
        console.error('waiting to upload the pages')
        setTimeout(function onUploadPage() {
            uploadAllPages(250)
        }, 2000)
    }
    //fix bug on page 489 ... need to go backwards to find monospace text items ...
}
defineTestable()

if (rip.settings.stopAfterSorting != true) {
    setTimeout(uploadCurrentPage, 2500, null, false)
}

//window.handlePage()
var targetZoom = 1.2; //zoom for pics
targetZoom = 1.3
if (window.$scope && window.$scope.pdfViewerAPI &&
    window.$scope.pdfViewerAPI.getZoomLevel() != targetZoom) {
    window.$scope.pdfViewerAPI.zoomTo(targetZoom)
    debugger;
    setTimeout(function () {
        window.processPage();
    }, 1500);
}


window.fxStartPdf = function fxStartPdf() {
    if (window.$scope == null) {
        console.debug('not ready yet')
        setTimeout(fxStartPdf, 500)
        return;
    }
    //TODO where was another ...
    var targetZoom = 1.2; //zoom for pics
    targetZoom = 1.3

    if (window.$scope.pdfViewerAPI.getZoomLevel() != targetZoom) {
        window.$scope.pdfViewerAPI.zoomTo(targetZoom)
        debugger;
        setTimeout(function () {
            window.processPage();
        }, 1500);
    }

}
