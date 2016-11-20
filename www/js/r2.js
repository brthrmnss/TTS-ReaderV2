/**
 * Created by user2 on 2/14/16.
 */



window.fx = function fc(){
    //console.log('hamb');
    function defineUtils() {
        $.async = function asyncHelper(items, fx, fxAllDone, delay, playIndex) {
            //var index = 0
            var asyncController = {};
            asyncController.index = 0;
            asyncController.getNext = function getNextItem() {
                var next = items[asyncController.index+1];
                return next;
            }
            if(playIndex>0){
                asyncController.index = playIndex;
            }
            if(playIndex<0){
                asyncController.index = items.length-1+playIndex;
            }

            asyncController.length = items.length;

            if ( delay == null && $.isNumeric(fxAllDone)) {
                delay = fxAllDone;
            }

            function goToNextSpan() {
                var item = items[asyncController.index];
                console.log('playindex', asyncController.index)
                if (asyncController.index > items.length - 1) {
                    if ( fxAllDone ) {
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

    var page = window.$scope.pdfCurrentPage;


    var helper = {};

    var $scope = window.$scope;
    window.helper = helper;

    function defineTransport() {
        var transport = {};
        helper.t = transport;
        helper.transport = transport;

        window.iterationMarker = null; //stop if playing currently
        $scope.playerForm.isPlaying = false;
        $scope.isPlaying = false;
        $scope.isPaused = false;
        //$scope.playerForm.player.pause();
        helper.pauseId = null;

        helper.stop = function stop() {
            window.iterationMarker = null;
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

            helper.pauseId = window.iterationMarker
            window.iterationMarker = null;

        };

        helper.playNextSentence = function    playNextSentence(){
            //$scope.playerForm.isPlaying = false;
            //$scope.isPlaying = false;
            //$scope.isPaused = true;
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200);

            if ( window.async.index >= window.async.length) {
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
            helper.pauseId = window.iterationMarker
            window.iterationMarker = null;
        }

        helper.playPrevSentence = function playPrevSentence(){
            $scope.playerForm.player.pause();
            setTimeout(function applyLater() {
                $scope.$apply();
            }, 200)

            if ( window.async.index <= 1) {
                window.$scope.pdfViewerAPI.goToPrevPage();
                setTimeout(function () {
                    console.info('play prev page');
                    helper.speak.clearCache()
                    window.fx2(true, -2)
                }, 350);
                return;
            }
            console.log('async', window.async.index )
            window.async.index-=2;
            window.async.runIteration()
            return;
        }

        helper.play = function play() {
            $scope.playerForm.isPlaying = true;
            $scope.isPlaying = true;
            $scope.isPaused = false;
            window.iterationMarker = Math.random();
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
                console.log('resumign pause')
                window.iterationMarker =  helper.pauseId;
                helper.pauseId = null;
                window.fxIteration();
                return;
            }
            /*playPage()*/
            window.fx2(true)
            if (window.helper.selectionNode ){
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


        helper.speak = function speak(txt,  fxDone, rate, cacheRequest) {
            var url = 'http://127.0.0.1:8080/speak';
            var data = {}
            data.text = txt+'.';
            var txtLbl = txt.slice(0,15)
            var txtReg = txt.replace(/ /g,"_");
            var enableCaching = true;
            enableCaching = false;
            if ( enableCaching == false  && cacheRequest ) {
                return;
            };

            console.log('speak text', txtLbl, 'cache?',  cacheRequest);
            var cachedResp = helper.speak.cache[txtReg];

            if ( enableCaching && cachedResp != null ) {
                console.log('playback cache', txt);
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
             console.log('retry request ....' , txt)
             speak(txt, fxDone, rate, cacheRequest);
             },1500);*/

            function onWavDataResponseRecieved(dataResp,resultStatus){
                var isCachedRequest = resultStatus == null;
                if ( isCachedRequest == false ) {
                    var timeDiff = new Date().getTime() - timerResetTime;
                    if ( timeDiff > 3000 ) {
                        console.error('took to long for x to respond', txt); //prevent text from playing after minutes
                        return;
                    }
                }
                if ( cacheRequest == true && enableCaching ){
                    console.log('storing in cache', txtLbl)
                    helper.speak.cache[txtReg] = dataResp;
                    helper.speak.cache[txtReg]=$scope.trustSrc('cache/sound.wav');
                    return
                }
                data.requestFinished = true

                // console.log('data', dd)
                // UPDATE CURRENT AUDIO SRC
                //$scope.playerForm.src=dataResp;
                //$scope.playerForm.player.src=$scope.trustSrc($scope.playerForm.src);
                $scope.playerForm.player.src=$scope.trustSrc('cache/sound.wav');
                //$scope.playerForm.player.src=$scope.trustSrc(dataResp);
                console.log("new source: ", txtLbl, resultStatus)//$scope.playerForm.player.src);
                // PLAY !!
                $scope.playerForm.player.play();

                $scope.playerForm.player.onended=function asdf() {
                    if ( fxDone ) {
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
    //helper.speak('you dog.')

    helper.clearspans;




}

window.fx2 = function fx2 (play, playIndex) {
    console.clear()
    console.log('the thing', $scope)

    var procHelper = {}
    var pH = procHelper;
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
            return pos;
        }
        pH.utils.quantize = function quantize(xxx, quantizeTo) {
            var rem = xxx % quantizeTo
            var yTop = xxx - rem;
            yTop = Math.floor(yTop);
            return yTop;
        }
    }
    pH.defineUtils();

    function clearAllspans() {
        $('span.highlight').each(function () {
            var $this = $(this);
            $this.removeClass('highlight');
        });
    }

    var spans = window.$scope.getSpans();

    function l() {
        console.error.apply(console, arguments);
    }


    pH.createPage = function createPage() {
        //l('lll', window.$scope)
        //return

        var id = 'page_Y_' + (window.$scope.pdfCurrentPage - 1)
        var page = $('#page_' + (window.$scope.pdfCurrentPage - 1));
        var page_ = page.find('#XLayer')
        pH.pageHeight = page_.css('height');
        pH.pageHeight = pH.pageHeight.replace('px', '');
        pH.pageHeight = parseFloat(pH.pageHeight);

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
        var psans = pageCustom.children('span')
        return psans
    }
    
    pH.createPageDocument = function createPageFromDocument() {
       // var spans = $('body').children();
        var body = $("#frameX").contents().find("body");
        var body = $("#frameX").contents().find("body");
        $("#frameX").contents().find('.coverFlowX').remove();
        var html = $("#frameX").contents().find("body").html();

        var newBody =  $('<div class="coverFlowX">'+'</div>');
        newBody.html(html)
        newBody.css({'top':'-10px', /*, 'left':'0px', */'position':'absolute'})
        body.append(newBody)
      //  debugger
        var spans = newBody.children();
        return spans;
    }

    if (window.$scope.playerForm.documentMode == false) {
        spans = pH.createPage();
    } else {
        spans = pH.createPageDocument();
    }

    pH.sortSpans = function sortSpans(_spans) {
        //why: spans come in strange order. this will order they by y then x
        function sortByY(a, b){
            a = $(a);
            b = $(b);
            var aName = a.css('top').replace('px','')
            var bName = b.css('top').replace('px','')
            aName = parseFloat(aName)
            bName = parseFloat(bName)
            //console.log('comparison y', aName, bName)
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }
        function sortByX(a, b){
            a = $(a);
            b = $(b);
            var aName = a.css('left').replace('px','')
            var bName = b.css('left').replace('px','')
            aName = parseFloat(aName)
            bName = parseFloat(bName)
            //console.log('comparison x', aName, bName)
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }
        function sortByXY(a, b){
            a = $(a);
            b = $(b);


            var aY = a.css('top').replace('px','')
            var bY = b.css('top').replace('px','')
            aY = parseFloat(aY)
            bY = parseFloat(bY)

            var lineHeight = a.css('font-size');
            if (lineHeight == null ) {
                lineHeight = pH.pageHeight*(7/480)
            }

            if ( Math.abs(aY-bY) > aY*.05) {
                //yDiff = 0
                return ((aY < bY) ? -1 : ((aY > bY) ? 1 : 0));
            }
            //console.log('comparison y', aName, bName)


            var aX = a.css('left').replace('px','')
            var bX = b.css('left').replace('px','')
            aX = parseFloat(aX)
            bX = parseFloat(bX)
            //console.log('comparison x', aName, bName)
            return ((aX < bX) ? -1 : ((aX > bX) ? 1 : 0));
        }
        var sortedSpans = _spans.sort(sortByX);
        sortedSpans = sortedSpans.sort(sortByXY);
        sortedSpans = sortedSpans.sort(sortByY);


        var sSH = {};
        sSH.detectTwoPages = function detectTwoPages(__spans) {
            var sortedByX = __spans.sort(sortByX);

            //count number at x
            //if two rows appear ... then two rows
            var xVals = {};
            $.each(__spans, function (indexSpan,v) {
                var span = $(v);
                //var fontSize = pH.utils.getFontSize(v);
                var left = pH.utils.getPos(v).left;
                left = pH.utils.quantize(left, 5)
                var arr = xVals[left];
                if ( arr == null ) arr = [];
                arr.push(span)
                xVals[left] = arr;
            })
            var colCount = 0;
            var maxColX = 0;
            console.log('sorted by x spans',xVals) //,  sortedByX)
            $.each(xVals, function (width,spansAtX) {
                /*   if ( spansAtX.length > _spans.length*.){
                 console.log('sorted by x spans', 'has 2 columns')
                 }*/
                if ( spansAtX.length > 10){
                    if ( maxColX < width ) maxColX = width;
                    colCount++
                    console.log('sorted by x spans', 'found column',  width)
                }
            })

            if ( colCount == 2) {
                console.log('sorted by x spans', 'found column', 'has 2 columns')
                //add and override property to all spans
                $.each(__spans, function (indexSpan,v) {
                    var span = $(v);
                    //var fontSize = pH.utils.getFontSize(v);
                    var left = pH.utils.getPos(v).left;
                    left = pH.utils.quantize(left, 5)
                    if ( left >= maxColX ) {
                        var top = pH.utils.getPos(v).top;
                        span.attr('top-override', top+pH.pageHeight);
                    }

                })

            }

            return __spans;
        }
        _spans = sSH.detectTwoPages(_spans)


        //collect all by y
        var yDict = {};
        var idx = 0
        $.each(_spans, function (indexSpan,v) {
            var span = $(v);
            var fontSize = pH.utils.getFontSize(v);
            var top = pH.utils.getPos(v).top;
            var topOverride = pH.utils.getPos(v).topOverride;
            if ( topOverride ) {
                //console.log('replaced override', top, topOverride)
                top = topOverride;
            }

            /* var rem = top % fontSize/2
             var yTop = top - rem;
             yTop = Math.floor(yTop);

             //add buffer of 5 anything
             var  rem1 = yTop % 5;
             var yTop = yTop - rem1;*/
            var rowHeight = 10;
            //rowSize = pH.totalPageHeight/20; //twenty rows in a page
            var rem = top % rowHeight
            var yTop = top - rem;
            yTop = Math.floor(yTop);


            var spansAtRow = yDict[yTop];
            if ( spansAtRow== null ) {spansAtRow = [];}
            spansAtRow.push(span)
            var spansAtRow = spansAtRow.sort(sortByX);
            yDict[yTop] = spansAtRow


        })

        //return sortedSpans
        console.error('spans organized by row. with x values considered', yDict);

        function flattendRows(dictSpansByRow) {
            var spans = [];
            $.each(dictSpansByRow, function (indexRow,spansAtRow) {
                $.each(spansAtRow, function (indexSpan,span) {
                    spans.push(span)
                })
            })
            return spans;
        }
        var spansZ = flattendRows(yDict);
        return spansZ
    }
    pH.totalPageHeight = $($(spans[0]).parent()).height();
    spans = pH.sortSpans(spans) ;
    console.error('spans', spans);

    var selectionElement = window.helper.selectionNode;
    /*if (selectionElement != null ) {
     console.error('selectionElement', selectionElement, spans.indexOf(selectionElement));

     var matchedIndex = null;
     $(spans).each(function(i, span){
     if ( span.html() == $(selectionElement).html() ) {
     matchedIndex = i;
     console.error('selectionElement', 'check', 'match', matchedIndex, spans.length, span.html())
     }
     });

     if ( matchedIndex  ) {
     spans = spans.slice(matchedIndex);
     console.error('selectionElement', 'check', 'ok', matchedIndex, spans.length)
     }
     };*/

    //spans = spans.slice(-9);
    pH.highlightSpans = function highlightSpans(_spans, addNumbers) {
        var idx = 0
        function removeAllClassesOfClass(cssclass){
            $('.'+cssclass).removeClass(cssclass)
            //console.log('y',  $('.'+cssclass))
        }
        removeAllClassesOfClass('highlight2')
        removeAllClassesOfClass('highlight3')
        removeAllClassesOfClass('highlight4')
        var classes = ['highlight2', 'highlight3', 'highlight4']
        //return
        $.each(_spans, function (indexSpan,v) {
            if ( idx > classes.length - 1) {
                idx = 0;
            }
            var classNameHighlight = classes[idx]

            var span = $(v)

            if (addNumbers) {
                span.html(indexSpan)
                span.css('color', 'black')
                var fS = pH.utils.getFontSize(span)*2
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


    window.scrollToSpan = function scrollToSpan() {
        // REPLACE
        //iframeDoc.body.childNodes[0].innerHTML=newC;
        // GET DOM ELEMENT
        //var elem=iframeDoc.body.childNodes[0].getElementsByTagName('SPAN')[0];
        var elem = pH.currentSpan;
        if ( elem == null ) {
            console.error('current span is null')
            return
        }
        // SCROLL INTO VIEW
        elem.get(0).scrollIntoView({block: "end", behavior: "smooth"})
        //elem.scrollIntoView({block: "end", behavior: "smooth"});
        window.scrollBy(0, 50);
    }

    pH.createSentences = function createSentence(spans) {

        var cSH  = {};
        cSH.sentences = [];
        cSH.currentSentence = ''
        cSH.dictSentencesToSpans = {};
        cSH.currentSentenceSpans = [];
        cSH.totalPageHeight = $($(spans[0]).parent()).height();
        cSH.spans = [];
        pH.cSH = cSH;
        $.each(spans, function processSpan(k,v) { //find spans
            console.log('...', v);

            var span = $(v)
            if (selectionElement != null ) {
                if ( span.html() == $(selectionElement).html() ) {
                    cSH.currentSelectedSpan = true;
                }
            }
            cSH.refernceFoundThisIteration = false;

            var cSI = {};
            cSI.getStyles = function getStyle(span){
                var top = span.css('top').replace('px','')
                top = parseFloat(top);
                var styles = {};
                styles.fontFamily = span.css('font-family')
                styles.fontSize = span.css('font-size')
                styles.fontSizeAsNumber = span.css('font-size').replace('px','')
                styles.fontSizeAsNumber =  parseFloat(styles.fontSizeAsNumber)
                styles.top = top;
                return styles;
            };

            cSI.flattenText = function flattenText(span){
                var txt = span.html();
                var txtOrig = txt;
                //detect strange formatting with spaces g o d is the b e s t
                if (txt.indexOf('  ') != -1 && txt.split(' ').length > 12 ) {
                    //txt = txt.replace(/\s\s/gi, ' ');
                    var finalStr = '';
                    var wordOnDblSplit = txtOrig.split('  ')
                    $.each(wordOnDblSplit, function (k,v) {
                        var word = v.split(' ').join('');
                        //   console.error(word, '--', v.split(' '))
                        finalStr += ' ' + word;
                    });
                    //console.log('|',txt,'|-->',finalStr, txtOrig.split(' '));
                    // console.log('|',txt,'|-->',finalStr);
                    txt = finalStr;
                };

                //console.log('---', span.html(),'||', txt, txtOrig, wordOnDblSplit)
                return txt;
            }

            cSH.currentStyle = cSI.getStyles(span)

            cSI.currentText = cSI.flattenText(span)
            //console.log('---', span.html(),'||', cSI.currentText)
            cSI.addSentenceToList = function addSentenceToList(why, addCurrentSpan) {
                /*console.log('add sentence', currentSentence, k, why)
                 pH.sentences.push(currentSentence)
                 //if ( prevSentence ) //Page 9 ... issue replaying b/c arthur is used so any times
                 //append number on string
                 pH.dictSentToDivs[currentSentence] = currentSentenceSpans;
                 currentSentence = '';
                 currentSentenceSpans = [];*/
                //debugger
                console.log('why add sentence?', why, cSH.currentSentence)
                if ( addCurrentSpan != false )
                    cSH.currentSentenceSpans.push(span);
                if ( cSH.foundReferences != true) {
                    cSH.currentSentence = cSH.currentSentence.replace(/“/gi,'"')
                    cSH.currentSentence = cSH.currentSentence.replace(/”/gi,'"')
                    cSH.sentences.push(cSH.currentSentence)
                    cSH.dictSentencesToSpans[cSH.currentSentence] = cSH.currentSentenceSpans;
                }
                if (cSH.currentSelectedSpan ) {
                    cSH.playbackIndexSelectedSpan = cSH.currentSentenceSpans.length -1;
                    cSH.currentSelectedSpan = false;
                }

                cSH.currentSentenceSpans = [];
                cSH.currentSentence = ''

            }

            cSI.skipDivs = function skipDivs(_span) {

                var sDH = {};
                sDH.headerRatio =  40/480;
                sDH.footerRatio = 430/480;

                var top = _span.css('top').replace('px','')
                top = parseFloat(top);
                var styles = {};
                styles.fontFamily = _span.css('font-family')
                styles.fontSize = _span.css('font-size')
                styles.fontSizeAsNumber = _span.css('font-size').replace('px','')
                styles.fontSizeAsNumber =  parseFloat(styles.fontSizeAsNumber)
                styles.top = top;
                //console.log('skipDivs', cSI.currentText)

                cSH.currentStyle = styles;
                //console.error('skip title ledger ',top,cSH.totalPageHeight , sDH.headerRatio, cSI.currentText)
                if ( top/cSH.totalPageHeight < sDH.headerRatio ) {
                    console.log('skip title ledger ', cSI.currentText)
                    // addSentenceToList(); //end of line
                    return true
                }
                if ( top/cSH.totalPageHeight > sDH.footerRatio ) {
                    console.log('skip page number / gutter', cSI.currentText)
                    //addSentenceToList('total page hiehgt'); //end of line
                    return true
                }

                function detectReference(){
                    if ( cSH.lastStyle == null ){
                        console.error('21...no last style')
                        return false;
                    }
                    //starts with number
                    //txt.startsWith
                    var number = cSI.currentText.trim().slice(0,1)
                    // console.error(number, '.what is detected number' , cSI.currentText)
                    if (false ==$.isNumeric(number)) { //check if starts with number TODO: number and period?
                        return false
                    }

                    //require font sizes to be different ...
                    if ( cSH.lastStyle.fontSize == styles.fontSize ) {
                        //log(gave size, not a foot note
                        //switches.footNotesMustChangeSize
                        //debugger;
                        return false;
                    }
                    var expectedTopOfNextLine = cSH.lastStyle.top + cSH.lastStyle.fontSizeAsNumber*2
                    if ( isNaN(expectedTopOfNextLine)) {
                        return false;
                    }
                    //skipped 1 line
                    if ( styles.top < expectedTopOfNextLine ) {
                        return false;
                    }
                    console.error('dbg detect ref', styles.top,
                        expectedTopOfNextLine ,cSH.lastStyle.top, cSH.lastStyle.fontSize*2)
                    return true
                }

                function detectReferenceIndicator() {
                    //require font sizes to be different ...
                    if ( cSH.lastStyle &&
                        cSH.lastStyle.fontSize == styles.fontSize &&
                        cSH.lastStyle.top + styles.fontSizeAsNumber < styles.top //new line (refernces are never on new line)
                    ) {
                        //log(gave size, not a foot note
                        //switches.footNotesMustChangeSize
                        //debugger;
                        //return false;
                    }
                    if ( $.isNumeric(cSI.currentText)) {
                        return true
                    }
                    return false;
                }
                //console.log('detectReference', cSI.currentText)
                if ( detectReference() ) {
                    console.log('skip reference', cSI.currentText)
                    if ( cSH.foundReferences != true )
                        cSI.addSentenceToList('skip ref', false); //add last sentence before reference
                    cSH.foundReferences = true ;
                    //cSH.refernceFoundThisIteration = true

                    return true; //hit false bottom. no more
                }

                if (detectReferenceIndicator() ) {
                    console.log('skip reference indicator', cSI.currentText)
                    //  cSI.addSentenceToList('skip ref indicator');
                    return true;
                }

            };
            if ( cSI.skipDivs(span) ) {
                console.error('skip span', span, cSI.currentText)
                return;
            };

            if ( cSH.foundReferences != true ) {
                cSH.spans.push(span)
                cSH.currentSentenceSpans.push(span)
            }
            /*if ( cSH.refernceFoundThisIteration ) {
             if ( k == spans.length -1 ) { //last one
             cSI.addSentenceToList('last one');
             }
             }*/

            if (cSH.lastStyle != null ) {
                if (cSH.currentStyle.fontFamily != cSH.lastStyle.fontFamily ||
                    cSH.currentStyle.fontSize != cSH.lastStyle.fontSize   ){
                    var arr = [cSH.currentStyle.fontFamily , cSH.lastStyle.fontFamily ,
                        cSH.currentStyle.fontSize, cSH.lastStyle.fontSize]
                    cSI.addSentenceToList('fonts different ' + arr);
                }
            }

            cSI.getHTML = function getHTML(){
                var html = span.html();
                var htmlArr = [];
                for (var i = 0; i< html.length; i++) {
                    var char = html[i];
                    htmlArr.push(char)
                }
                var endingStr = ['. ','! ', '? ',
                    '."', '!"', '?"',
                    '.”', '!”', '?”'
                ]
                $.each(htmlArr, function (k,char) {
                    if ( k == 0 ) {
                        if (cSH.lastStyle != null ) {
                            if (cSH.currentStyle.top > cSH.lastStyle.top +1    ){
                                if ( char != ' ' && char.toLowerCase() == char )
                                {
                                    cSH.currentSentence += ' ' //add space if first char of div is not space
                                }
                            }
                        }

                    }
                    var threeChars = '   '
                    var twoChars = '  '
                    function getNextChars(numChars) {
                        var nextXChars = char;
                        if ( numChars > 1) {
                            if (k < htmlArr.length - 2) {
                                nextXChars += htmlArr[k + 1]
                            }
                        }
                        if ( numChars > 2) {
                            if (k < htmlArr.length - 3) {
                                nextXChars += htmlArr[k + 2]
                            }
                        }
                        nextXChars = nextXChars.replace(/”/gi, '"')
                        return nextXChars;
                    }
                    twoChars = getNextChars(2)
                    threeChars = getNextChars(3)

                    if ( endingStr.indexOf(twoChars) != -1 ) {
                        cSH.currentSentence += twoChars;
                        cSI.addSentenceToList('hit..., ' + endingStr)
                        return;
                    }
                    if ( endingStr.indexOf(threeChars) != -1 ) {
                        cSH.currentSentence += threeChars;
                        cSI.addSentenceToList('hit___, ' + endingStr)
                        return;
                    }

                    //console.log('at end', twoChars, threeChars)

                    cSH.currentSentence += char;
                });

                var endingStr2 = endingStr.concat(['.', '?', '!',]) //single string is valid here
                $.each(endingStr2, function (k,v) {
                    if ( cSH.currentSentence.endsWith(v) ) {
                        cSI.addSentenceToList('txt.endsWith '+ v)
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
            console.log('getSentV20', 'k', cSH.currentStyle, span.html(), cSI.currentText, k, spans.length );

            if ( k == spans.length -1 ) {
                if ( cSH.currentSentence.indexOf("\n") != -1 ) {
                    //split sentence
                    debugger;
                    console.log('getSent', 'split sentence')
                    var split = cSH.currentSentence.split("\n");
                    $.each(split, function (k,sent){
                        cSH.currentSentence = sent;
                        cSI.addSentenceToList('last sentence, always added', true)
                    })

                } else {
                    //debugger
                    cSI.addSentenceToList('last sentence, always added', true);
                }

            }

            //console.log('as an am', k)
            cSH.cSI = cSI; //export
        });


        if ( cSH.currentSentence != '' ) {
            cSH.cSI.addSentenceToList('last sentence, always added', true);
        }



        return cSH.sentences;
    }

    var sentencesX = pH.createSentences(spans);
    console.log('sentencesX', 'k', sentencesX);
    console.log('cSH', pH.cSH);
    //pH.cSH.spans = []
    pH.highlightSpans(pH.cSH.spans);
    //console.clear()
    //console.error('food...')

    pH.testSelectAllSentences =  function highlightEachSentence(_sentences) {
        var idx = 0
        function removeAllClassesOfClass(cssclass){
            $('.'+cssclass).removeClass(cssclass)
            //console.log('y',  $('.'+cssclass))
        }
        removeAllClassesOfClass('highlight2')
        removeAllClassesOfClass('highlight3')
        removeAllClassesOfClass('highlight4')
        var classes = ['highlight2', 'highlight3', 'highlight4']
        //return
        $.each(pH.cSH.dictSentencesToSpans, function (k,v) {
            /*
             var isOdd = idx % 2 == 0
             idx++
             if ( isOdd ) {
             //console.log('--Logging', v)
             $.each(v, function (kI, kV) {
             $(kV).addClass('highlight2')
             })
             } else {
             //console.log('-Logging', v  )
             $.each(v, function (kI, kV) {
             $(kV).addClass('highlight3')
             })
             }
             */
            if ( idx > 2) {
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

    pH.playCurPage =  function playCurPage(play, playIndex) {
        if  ( play != true ) {
            return
        }
        helper.speak.clearCache();
        var lastFoundIndex = 0;
        var sentences = pH.cSH.sentences;
        var dictSentToDivs = pH.cSH.dictSentencesToSpans;
        var marker = window.iterationMarker;
        var async = $.async(sentences, function procSentence(k, sentence, fxEnd, controller) {
                iterationWrapperFx(); //run so it can be resumed
                function iterationWrapperFx() {
                    if (window.iterationMarker != marker) {
                        //debugger
                        console.error('marker has changed.... aborting loop')
                        return;
                    }

                    //sentence = sentence.replace(/#/gi, '');
                    console.log('looking for', sentence)
                    clearAllspans()
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
                    if ( nextSentence != null ) {
                        helper.speak(nextSentence, null, null, true)
                    }
                }
                window.fxIteration = iterationWrapperFx;

            }, function onDone(){
                helper.goToNextPage();
            }, 10,
            playIndex)
        window.async = async;

    }

    if ( pH.cSH.playbackIndexSelectedSpan ) {
        if ( playIndex ) {
            console.error('play indiex is defined and seleted value ... wtf? ... not setting')
        } else {
            playIndex =pH.cSH.playbackIndexSelectedSpan
            pH.cSH.playbackIndexSelectedSpan = -1
            console.error('play index is great')
        }
    }
    pH.playCurPage(play,playIndex)


    // window.uploadCurrentPage()
    return;

}

window.uploadCurrentPage = function uploadCurrentPage(_fxPageComplete) {

    var url = 'http://127.0.0.1:6006/upBook';
    var data = {}
    data.book_name = 'xb'
    data.page = window.pH.currentPage;
    data.contents = window.pH.cSH.sentences;

    //if ( window.screenCaputerer ==null ) {
    var s = new ScreenCapture();
    s.init()
    window.screenCaputerer = s;
    // }
    s = window.screenCaputerer;

    function onstep2() {

        // setTimeout(function cap(){
        // s.capture('pdf-viewer',
        s.capture(
            {
                target:'#container_pdf',
                fx:  onDone_Step2
            },
            {name: data.page,
                dir:data.book_name})
        // }, 2000)

    }

    function onDone_Step2 ( config ) {

        var page = window.$scope.pdfCurrentPage
        window.$scope.pdfViewerAPI.goToNextPage()

        setTimeout(function goToNextPage(){
            window.fx2();
        }, 2000)


        if ( _fxPageComplete ) {
            setTimeout(function fxDone2(){
                var config_ = config;
                var currentPage = window.$scope.pdfCurrentPage

                console.log('seeing',page, currentPage,  config_.data, config_)
                if ( page == currentPage ) {
                    console.error('over')
                    return;
                }
                _fxPageComplete();
            }, 4000)
        }




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


    var url = 'http://127.0.0.1:6006/upBook';
    var data = {}
    data.book_name = 'xb'
    data.page = window.pH.currentPage;
    data.contents = window.pH.cSH.sentences;


    //if ( window.screenCaputerer ==null ) {
    var s = new ScreenCapture();
    s.init()
    window.screenCaputerer = s;
    // }
    s = window.screenCaputerer;

    function onstep2() {

        // setTimeout(function cap(){
        // s.capture('pdf-viewer',
        s.capture(
            {
                target:'#container_pdf',
                fx:  onDone_Step2
            },
            {name: data.page,
                dir:data.book_name})
        // }, 2000)

    }
}



window.uploadAllPages = function  uploadAllPages() {
    window.uploadCurrentPage(goToNextPage_Loop)
    function goToNextPage_Loop() {
        //debugger;
        window.uploadCurrentPage(goToNextPage_Loop)
    }
}







window.fx()

window.fx2()
console.log('doddddddmde2')