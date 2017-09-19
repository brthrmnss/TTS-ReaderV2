window.fxHtmlSpeaker = function fxHtmlSpeaker(){
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

    var helper = {};

    var $scope = window.$scope;
    window.helper = helper;


    function RecentAndResume() {
        var self = this;
        var p = this;

        p.init = function init() {

        }

        p.getRecentList = function getRecentList() {
            var list = Cookies.getJSON('epub_recent_list')
            if ( list == null ) list = [];
            return list;
        }

        p.addToRecentList = function addToRecentList() {
            var list = self.getRecentList();
            var foundBook = null;
            var  bookName = self.getBookName()
            $.each(list, function p(k, book) {
                if ( book != null && book.name == bookName )
                {
                    list.splice(k,1)
                    return;
                }
            })  ;


            if ( foundBook ) {
                list.unshift(foundBook)
            } else {
                var newBookEntry = {name:self.getBookName(), url:window.location.href}
                list.unshift(newBookEntry)
                Cookies.set('epub_recent_list', JSON.stringify(list));
                window.epublist = list;
            }
            return list;
        }

        p.getRecentListPlayheadPosition = function getRecentListPlayheadPosition(index, length) {
            var position = Cookies.getJSON('epub_recent_list_'+self.getBookName());

            return position;
        }

        p.setRecentListPlayheadPosition = function setRecentListPlayheadPosition(currentIndex, length) {
            console.debug('set new position', currentIndex, length)
            Cookies.set('epub_recent_list_'+self.getBookName(), JSON.stringify({currentIndex:currentIndex, length:length}));

        }

        p.getBookName = function getBookName() {
            var location = window.location.pathname;
            if ( location.indexOf('?') != -1 ){
                location = location.split('?')[0];
            }
            location = location.split('/').slice(2).join('/')
            return location;
        }

    }

    function SentenceHelper() {

        var self = this;
        var  p = this;

        self.data = {};
        self.data.repeatCountIndex = 5
        self.data.rr = new RecentAndResume();

        p.startOnSel = function startOnSel() {
            console.log('startSel', self.sel)
            self.start(self.sel)
        }

        p.start = function (jquery, words) {
            var el = $(jquery);
            if (el.attr('id')=='appendToApp') {
                el = $(self.sel2);
            }

            self.currentId = Math.random();
            self.el = el;
            var txt = el.text();
            var sentences = txt.split('. ');
            var sentences2 = [];
            $.each(sentences, function modifySentenceForNewLines(k,sentence) {
                var newSentences = sentence.split("\n");
                sentences2 = sentences2.concat(newSentences)
            });
            sentences =sentences2


            function cleanSentences(_sentences) {
                var sentencesCleaned = [];
                $.each(_sentences, function modifySentenceForNewLines(k,sentence) {
                    sentence = sentence.trim();
                    if ( sentence == '' || sentence == null )
                        return;
                    sentencesCleaned.push(sentence)
                });
                return sentencesCleaned;
            }
            sentences2 = cleanSentences(sentences2);

            self.lookFor = sentences;
            self.timePerWord = 200
            self.rate = 300;
            self.rate = 350;
            //var sentences = self.el.html().split('.');
            //self.lookFor = sentences;


            //var words = txt.split(' ');
            //self.lookFor = words;
            var newSentences = [];
            $.each(sentences, function breakDownMore(i,sentence) {
                var words = sentence.split(' ');
                var count = 0;
                var newSent = [];
                for ( var i = 0; i < words.length; i ++ ) {
                    /*if ( i % 5 == 0 ) {
                     sentNew.push( words.slice(0,5).join(' ') )
                     words = words.slice(6)
                     }*/
                    var word = words[i]
                    var y = word.replaceX("\n", "")
                    word = word.replace("\n", '')
                    if ( word == "\n")
                        continue;
                    if ( word.trim() == '')
                        continue;
                    newSent.push(word)
                    count++
                    if ( count == 5 ) {
                        newSentences.push( newSent.join(' ') )
                        newSent = [];
                        count = 0
                    };

                }
                if ( newSent.length > 0 ) {
                    newSentences.push( newSent.join(' ') )
                }
            })


            //back to sentences

            var newSentences = txt.match( /[^\.!\?]+[\.!\?]+/g );
            //sentences with whitespace after
            // newSentences = txt.replace(/([.?!\n\r])\s*(?=[A-Z])/gi, "$1|").split("|")

            var txtTransformed =  txt.replace(/(?:\r\n|\r|\n)/g, '|');
            txtTransformed =  txt.replace(/[\W+](?:\r\n|\r|\n)/gi, '|');

            txtTransformed = txtTransformed.replace(/([.?!])\s*(?=[A-Z])/gi, "$1|")
            newSentences =  txtTransformed.split("|");

            self.index = 0;
            self.lookFor = newSentences;
            self.lookFor = sentences2;
            self.lookFor = self.sentences;
            self.lookForAll = self.lookFor.concat();
            self.goEach();
            window.speakText = txt;
            console.log('starting...', newSentences.length ) //, newSentences)
        }

        p.back = function onBack() {
            self.index -= 5
            if ( self.index < 0 ) { self.index = 0 };
            self.lookFor = self.lookForAll.slice( self.index)
            self.state();
        }

        p.forward = function onNext() {
            self.index += 5
            if ( self.index < 0 ) { self.index = 0 };
            self.lookFor = self.lookForAll.slice( self.index)
            self.state();
        }

        p.restart = function onRestart() {
            self.index  = 0
            self.lookFor = self.lookForAll.concat();
            self.state();
            self.play();
        }

        p.play = function play() {
            self.pause = false
            self.goEach();
        }

        p.pause = function pause() {
            self.pause = true
            var bodyContainer = $('html,body')
            if ( self.data.toDiv) {
                bodyContainer = self.data.toDiv;
            }
            bodyContainer.clearQueue();
            bodyContainer.stop();

        }


        function definePlayMode2() {
            p.clearAllSpans = function clearAllSpans() {
                var spans = $('span.highlight');
                if ( self.data.toDiv) {
                    spans = self.data.toDiv.find('span.highlight');
                }
                spans.each(function () {
                    var $this = $(this);
                    $this.removeClass('highlight');
                });
            }

            p.onRecentList = function onRecentList() {
                var y = self.data.rr.getRecentList()
                console.log(y)

                $('#col2_recentList').html('' +
                    '' +
                    '<div id="users">' +

                    '<input class="search" placeholder="Search" />' +
                    '<button class="sort" data-sort="name">' +
                    'Sort' +
                    '</button>' +

                    '<ul class="list"></ul>' +

                    '</div>')

                var options = {
                    valueNames: [ 'name', 'born',

                        { name: 'url', attr: 'href' },
                    ],
                    item: '<li>' +
                    '<span class="name"></span>' +
                    '<a href="http://javve.com" class="link url">link</a>'+
                    '<p class="born"></p>' +
                    '</li>'
                };

                var values = [
                    {
                        name: 'Jonny Strömberg',
                        born: 1986
                    },
                    {
                        name: 'Jonas Arnklint',
                        born: 1985
                    },
                    {
                        name: 'Martina Elm',
                        born: 1986
                    }
                ];

                var userList = new List('users', options, y);

                /* userList.add({
                 name: 'Gustaf Lindqvist',
                 born: 1983
                 });*/
            }

            p.onPlay2UI = function onPlay2UI() {
                p.onPlay2(null, false, null, true, false);
                //keep play statse if false
            }
            p.onPlay2 = function onPlay2(event, justScrollToPosition,
                                         changeIndex, force, keepPlayState) {

                //if ( )
                if (
                    window.sentenceHelper.data.fxSafetyFailToLoad
                ){
                    debugger;
                    window.sentenceHelper.data.fxSafetyFailToLoad();

                }
                if ( keepPlayState ) {
                    //for scrubbing, do nto start playing
                    if ( self.data.isPlaying == true ) {

                    } else {
                        justScrollToPosition = true; //just run thruogh
                    }
                }

                if ( self.data.isPlaying && force != true ) {
                    console.debug('alreayd palying... will pause')
                    self.onPause();
                    return;
                }


                self.data.isPlaying = true
                self.data.pause = false
                //self.goEach();

                // if ( self.fixedHTML == false ) {
                // }
                self.data.currentSentences;
                var c = {};
                c = self.data.currentSentences;
                if ( c == null ) {
                    console.warn(self, 'self.data.currentSentences are null')
                }
                //go rhgouh each
                var hasSelectedText = false;
                var windowSelection = null;

                if ( window.getSelection().type == "Range" ) {
                    hasSelectedText = true
                    windowSelection = window.getSelection()
                }
                if ( self.data.iframe && self.data.iframe.getSelection().type == "Range" ) {
                    hasSelectedText = true
                    windowSelection = self.data.iframe.getSelection()
                }


                if ( hasSelectedText == false && self.data.pauseId  ) { //resume paused player
                    console.log('resuming pause')
                    window.iterationMarker =   self.data.pauseId;
                    self.data.pauseId = null;
                    if ( window.fxIteration ) {
                        window.fxIteration();
                        return;
                    }
                    console.warn('not sure waht is hapening, have pause id, but not paused.')


                }

                var iterationMarker = Math.random();
                window.iterationMarker = iterationMarker
                var currentIndex = 0;
                if ( changeIndex ) {
                    c.currentIndex += changeIndex;
                }
                var playIndex = c.currentIndex;
                if ( hasSelectedText ) {
                    console.debug('range type selected')
                    var startOnUIElement = windowSelection.anchorNode.parentElement
                    var foundStartingElement = false;
                    var foundStartingElement_playIndex = -1;
                    playIndex = 0 ; //clear current selection

                    console.log('finding element .... ', startOnUIElement)


                    if ( startOnUIElement  != null )  {
                        $.each(c.dictSentences2, function (iSs, sentenceObj) {
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if (foundStartingElement == false) {
                                    if (kV[0] != startOnUIElement) {
                                        return;
                                    } else {
                                        foundStartingElement = kV;
                                        foundStartingElement_playIndex = iSs;
                                        //debugger;
                                    }
                                }
                            });

                            if (foundStartingElement == false) {
                                // fxEnd()
                                return;
                            }
                        })
                    }
                    console.log('finding element .... ', 'foundStartingElement', foundStartingElement)
                    if ( foundStartingElement != true ) {
                        playIndex = foundStartingElement_playIndex;
                    }
                    foundStartingElement = false;

                }


                var async = $.async(c.dictSentences2,
                    function procSentence(k, sentenceObj, fxEnd, controller) {



                        if ( self.data.repeatCountIndex > 1 ) {
                            if ( c.repeatCountIndex == null ) {
                                c.repeatCountIndex=0
                            }
                            if ( c.repeatCountIndex > self.data.repeatCountIndex ) {
                                c.repeatCountIndex=0; //reset for next sentence
                            } else {
                                c.repeatCountIndex++;
                                controller.index--; //
                                console.debug('repeat sentence', c.repeatCountIndex,self.data.repeatCountIndex )
                            }

                        }

                        if ( startOnUIElement  != null )  {
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if ( foundStartingElement == false ) {
                                    if  ( kV[0] != startOnUIElement ) {
                                        return;
                                    } else {
                                        foundStartingElement = kV;
                                        //debugger;
                                    }
                                }
                            });

                            if ( foundStartingElement == false) {
                                fxEnd()
                                return;
                            }
                        }

                        iterationWrapperFx(); //run so it can be resumed
                        function iterationWrapperFx() {
                            if (window.iterationMarker != iterationMarker) {
                                //debugger
                                console.error('marker has changed.... aborting loop')
                                return;
                            }
                            var sentence = sentenceObj.txt;
                            c.currentIndex = k;

                            // debugger
                            //sentence = sentence.replace(/#/gi, '');
                            console.log('looking for', sentence);
                            self.clearAllSpans()
                            //pH.clearAllspans();
                            var firstSentenceElement=null;
                            $.each(sentenceObj.spans, function (kI, kV) {
                                if ( firstSentenceElement == null ) {
                                    firstSentenceElement = kV;
                                }
                                $(kV).addClass('highlight')
                                c.currentSpan = kV;
                            });
                            self.utils.scrollToElement(firstSentenceElement)

                            if (sentenceObj.images.length > 0) {
                                // debugger;

                                var imgs = $(sentenceObj.images).clone();
                                $.each(imgs, function (k,v) {
                                    $(v).css('width','100%');
                                    $(v).css('height','auto');
                                });



                                $('#col2_1').html('');
                                $('#col2_1').append(imgs);
                            }


                            function fxEndRedirect() {
                                //window.fxIteration = iterationWrapperFx;
                                fxEnd()
                            }


                            self.render();



                            self.handlePositionChange()
                            self.utils.nlp(sentence)
                            if ( justScrollToPosition ) {
                                self.data.isPlaying = false
                                return;
                            }

                            self.speakHelper.speak(sentence, fxEndRedirect)
                            return;
                            var nextSentence = controller.getNext();
                            if (nextSentence != null) {
                                helper.speak(nextSentence, null, null, true)
                            }
                        }

                        window.fxIteration = iterationWrapperFx;

                    },
                    function onDone() {
                        // helper.goToNextPage();
                    }, 10,
                    playIndex)
                window.async = async;

                // debugger
                self.render();
            };

            p.onHardStop = function onHardStop() {
                //why: stop everythign from playing ..
                self.data.isPlaying = false;
                self.data.isPaused = false;
                self.data.pauseId  = null;
                window.iterationMarker = null;
            }

            p.onPause = function onPause() {
                self.data.isPlaying = false;
                self.data.isPaused = true;
                //$scope.playerForm.player.pause();
                //  setTimeout(function applyLater() {
                //      $scope.$apply();
                // }, 200)

                self.data.pauseId = window.iterationMarker
                window.iterationMarker = null;
                self.speakHelper.speak('')
            }



            p.onPrev = function onPrev(event) {
                // console.log('startSel', self.sel)
                self.onPlay2(event, false, -1, true, true );
            }
            p.onNext = function onNext(event) {
                //console.log('startSel', self.sel)
                self.onPlay2(event, false, 1,true, true );
            }

            p.render = function rend() {
                if (self.data.currentSentences) {
                    $("#txtSentenceCount").text(self.data.currentSentences.sentences.length);
                    $("#inputCurrentSentence").val(self.data.currentSentences.currentIndex);

                    var progress = (self.data.currentSentences.currentIndex)/(self.data.currentSentences.sentences.length);
                    progress = progress *100;
                    progress = progress.toFixed(1);

                    $('#txtProgress').text(
                        progress + '%'
                    )

                    $('#checkDebugSentences').val(self.data.colorizeBackgrounds);
                    $('#checkDebugSentences').prop('checked', self.data.colorizeBackgrounds);
                }
            }


            p.onChangeOptions = function onChangeOptions() {
                self.data.colorizeBackgrounds = $('#checkDebugSentences').is(':checked')
                window.sentenceHelper.setupSentencesRedo()
            }

        }

        definePlayMode2();


        p.resetSentenceHelper = function resetSentenceHelper () {
            // self.data = {};
            self.data.iframe = null;
            self.data.toDiv = null;
        }


        p.setupSentencesRedo = function setupSentencesRedo() {
            self.setupSentences( self.data.lastCall_setupSentences[0],
                self.data.lastCall_setupSentences[1])
        }
        p.setupSentences = function setupSentences(fromDiv, toDiv ) {
            self.data.lastCall_setupSentences = [fromDiv, toDiv]
            if ( fromDiv == null ) {
                $('#bookHolderContainerClone').html('');
                // $('body').prepend('<div id="bookHolderContainerClone"></div>')
                var html = $('#bookHolderContainer').clone().html()

                // debugger;
                if (window.xHTMLInner && window.xHTMLInner.length > 0) {
                    //debugger;
                    console.warn('something is off with whole ... situation ')
                    html = window.xHTMLInner;
                    html = $(html).clone()
                    //window.xHTMLInner = null
                    $('#bookHolderContainerClone').html(html);//no append errors
                } else {
                    $('#bookHolderContainerClone').append(html);
                }
                //debugger;

                self.utils.findSentencesInHtml($('#bookHolderContainerClone'));
            } else {


                /*
                 toDiv.html('');var html = $('#bookHolderContainer').clone().html()

                 // debugger;
                 if (window.xHTMLInner && window.xHTMLInner.length > 0) {
                 debugger;
                 html = window.xHTMLInner;
                 html = $(html).clone()
                 //window.xHTMLInner = null
                 $('#bookHolderContainerClone').html(html);//no append errors
                 } else {
                 $('#bookHolderContainerClone').append(html);
                 }
                 //debugger;
                 */
                if ( toDiv == null )
                    toDiv = fromDiv;
                self.data.toDiv = toDiv;
                self.utils.findSentencesInHtml(toDiv);
            }
            self.fixedHTML = true



            self.render();
            self.handleResume()
        }

        p.handleResume = function handleResume() {
            //do x to x y
            if ( self.data.rr == null ) {
                return;
            }
            if (  self.data.rr.getBookName() == '' )
            {
                return
            }
            self.data.rr.addToRecentList();

            var position = self.data.rr.getRecentListPlayheadPosition()
//            debugger
            if ( position && position.length != null ) {
                if ( position.length !=
                    self.data.currentSentences.sentences.length ) {
                    alert('size changed ...')
                }

                if ( position.currentIndex >
                    self.data.currentSentences.sentences.length ) {
                    console.error('changed index b/c too big')
                    self.onPlay2(null, true)
                    return;
                }

                self.data.currentSentences.currentIndex = position.currentIndex;
                console.debug('set resume index to ', position)
                self.render();
                self.onPlay2(null, true)
            }

        }


        p.handlePositionChange = function handlePositionChange()  {
            self.data.rr.setRecentListPlayheadPosition(
                self.data.currentSentences.currentIndex,
                self.data.currentSentences.sentences.length
            );

        }

        p.setRate = function setRate(rate) {
            self.timePerWord =1000* 1/(rate*1/60);
            self.rate = rate;
            console.log(self.timePerWord, rate)
        }

        p.state = function state() {
            console.log('... ', self.index, self.lookFor)
        }

        p.goEach = function () {
            if ( self.lookFor.length == 0 ) {
                console.log('done', 'or empty [] sentences')
                return;
            }
            if (  self.pause == true ) {
                console.log('paused')
                return;
            }
            self.index ++
            var sentence = self.lookFor.shift()

            //var html = self.el.html()
            //if ( self.lastReplacement != null ) {
            //    html = html.replaceX(self.lastReplacement[1], self.lastReplacement[0]);
            //}
            var rep = "<span class='smallcaps'>"+sentence+"</span>"
            self.lastReplacement = [sentence, rep];
            //html = html.replaceX(self.lastReplacement[0], self.lastReplacement[1]);
            //self.el.html(html)
            self.el.html(self.el.html().replaceX('<span class="smallcaps">','<span>'))
            self.el.wrapInTag({"words" : [sentence], tag:'span'});

            var target = $('.smallcaps');
            if (target.length) {
                $('html,body').clearQueue();
                $('html,body').stop();
                $('html,body').animate({
                    scrollTop: target.offset().top-200
                }, 500);
                //return false;
            }
//return;
            console.log('update', sentence, self.lookFor.length)
            if ( self.testMode == true ) {
                setTimeout(self.goEach, self.timePerWord * sentence.split().length);
            } else {
                var curId = self.currentId;

                if ( self.rate == null ) {
                    self.rate  = $('#inputRate').val()
                }

                if ( self.voice == null ) {
                    self.voice =  'IVONA 2 Brian'
                }

                //var rate = 7
                var voice = null;
                if ( voice == null ) {
                    voice = 'IVONA 2 Emma';
                    voice = 'IVONA 2 Brian';
                    voice = self.voice;
                }
                // debugger
                console.log('trim',  sentence.trim().endsWith('reply'), sentence)
                if (  sentence.trim().endsWith('reply') ) {
                    if ( self.voice == 'IVONA 2 Brian' ) {
                        //self.voice = 'IVONA 2 Joey'
                        self.voice = 'IVONA 2 Emma';
                    } else{
                        self.voice = 'IVONA 2 Brian'
                    }
                    // voice = self.voice
                    sentence = sentence.trim().slice(-5)
                    sentence += 'end comment.'
                }
                //self.voice = voice;
                var speakOnce = false
                var date = new Date();
                $.ajax({
                    url: "http://localhost:4444/say",
                    data: {
                        text:sentence,
                        rate:self.rate,
                        playAudio:true,
                        volume:25,
                        voice:voice,
                        speakOnce:speakOnce,
                        //voice:'IVONA 2 Gwyneth'
                    },
                    type:'post',
                    success: function(result){
                        if ( curId != self.currentId ) {
                            return;
                        }

                        var endDate = new Date();
                        console.log('total time', (endDate.getTime()-date.getTime())/1000);
                        self.goEach();
                    }
                });





                return;
                $.ajax({
                    url: "https://local.helloworld3000.com:4444/say",
                    data:{text:sentence,
                        rate:self.rate},
                    success: function f(d){
                        if ( curId != self.currentId ) {
                            return;
                        }
                        self.goEach();
                    },
                    dataType: "text"
                }).done(function( html ) {
                    //console.log('d', html)
                });;
            }

        }

        // http://stackoverflow.com/a/9795091
        $.fn.wrapInTag = function (opts) {
            // http://stackoverflow.com/a/1646618
            function getText(obj) {
                return obj.textContent ? obj.textContent : obj.innerText;
            }

            var tag = opts.tag || 'strong'
            var    words = opts.words || []
            try {
                var regex = RegExp(words.join('|'), 'gi')
            } catch ( e ) {}
            var  replacement = '<' + tag + ' class="smallcaps" >$&</' + tag + '>';

            // http://stackoverflow.com/a/298758
            $(this).contents().each(function () {
                if (this.nodeType === 3) //Node.TEXT_NODE
                {
                    try {
                        // http://stackoverflow.com/a/7698745
                        $(this).replaceWith(getText(this).replace(regex, replacement));
                    } catch ( e ) {}
                }
                else if (!opts.ignoreChildNodes) {
                    $(this).wrapInTag(opts);
                }
            });
        };


        p.getSentencesFromSelectedElement = function getSentencesFromSelectedElement() {
            var filtered = [];
            var _children = $(self.sel).children();
            var skipTypes =['blockquote', 'a', 'figure', 'img']


            var filtered2 = $(self.sel).find('*').filter(
                function(index) {
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
                function stripOutLinks (index) {
                    i++;
                    var isValidText= false;
                    var ui  = $(this);
                    var tagName = ui.get(0).tagName.toLowerCase();
                    var parentTagName = $(ui.parent()).get(0).tagName.toLowerCase();
                    if ( skipTypes.indexOf(parentTagName) == -1 &&
                        skipTypes.indexOf(tagName) == -1 ) {
                        isValidText = true;
                        // console.log(tagName, ui, ui.text())
                    } else {
                        if ( tagName == "a") {
                            if ( ui.children().length === 0 )
                                return isValidText;
                        }
                        ui.css({'background-color':'green'});
                        var removeChild = $(cloneChildren[i]);
                        removeChild.remove();
                    }
                    // var isLeaf = ui.children().length === 0;
                    return isValidText;
                }
            );


            console.log('clone text', clone.text().length, clonePre.text()==clone.text());


            self.splitStringIntoSentences( clone.text() );

            // debugger

            console.log('...');
            return filtered3;


            $.each(_children, function stripOutLinks(k,ui) {
                ui = $(ui);
                if ( skipTypes.indexOf(ui.get(0).tagName.toLowerCase()) != -1 ) {
                    filtered.push(ui)
                } else {
                    ui.css({'background-color':'green'});
                }
            });


            console.log('...')
            return filtered;

        }
        p.splitStringIntoSentences = function splitStringIntoSentences(str, clone) {

            //var txt = el.text();
            var sentences = str.split('. ');
            var sentences2 = [];
            $.each(sentences, function modifySentenceForNewLines(k,sentence) {
                var newSentences = sentence.split("\n");
                //sentences2 = sentences2.concat(newSentences)
                $.each(newSentences, function modifySentenceForNewLines(k,sentence) {
                    sentence = sentence.trim();
                    if ( sentence == '' || sentence == null )
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

            self.utils = utils;

            utils.scrollToElement = function (target) {
                target = $(target);

                if ( self.data.autoScrollingEnabled == false ) {
                    return;
                }

                if (target.length) {
                    var scrollBody = $('html,body')

                    var scrollTop = target.offset().top-200;
                    if ( self.data.toDiv )  {
                        scrollBody = self.data.toDiv
                        var scrollTop = target.offset().top
                            - target.parent().offset().top-200;

                        var scrollTop =  target.parent().offset().top;

                        if ( target.parent().offset().top == target.parent().parent().offset().top) {
                            var scrollTop = target.parent().offset().top
                                - target.parent().parent().offset().top-200;
                        }

                        scrollTop =  scrollBody.scrollTop() + target.offset().top // - 200
                        scrollTop -= target.height()
                        scrollTop -= 100
                        scrollTop -= 200

                        if ( scrollTop > target.height() ) {
                            console.log('scroll top fix, is this an iframe?',
                                target.offset().top )
                            scrollTop = target.offset().top-100;
                        }
                    }

                    console.log('scroll to top', scrollTop,target.height(),
                        scrollBody.scrollTop(),  target.offset().top,
                        target.offset().top , target.parent().offset().top)

                    scrollBody.clearQueue();
                    scrollBody.stop();
                    scrollBody.animate({
                        scrollTop:scrollTop
                    }, 500);
                    //return false;
                }
            }

            utils.scrollToElement = function (target) {
                target = $(target);

                if ( self.data.autoScrollingEnabled == false ) {
                    return;
                }

                if (target.length) {
                    var scrollBody = $('html,body')

                    var scrollTop = target.offset().top-200;
                    if ( self.data.toDiv )  {
                        scrollBody = self.data.toDiv
                        var scrollTop = target.offset().top
                            - target.parent().offset().top-200;

                        var scrollTop =  target.parent().offset().top;

                        if ( target.parent().offset().top == target.parent().parent().offset().top) {
                            var scrollTop = target.parent().offset().top
                                - target.parent().parent().offset().top-200;
                        }

                        scrollTop =  scrollBody.scrollTop() + target.offset().top // - 200
                        scrollTop -= target.height()
                        scrollTop -= 100
                        scrollTop -= 200

                        if ( scrollTop > target.height() ) {
                            console.log('scroll top fix, is this an iframe?',
                                target.offset().top )
                            scrollTop = target.offset().top-100;
                        }
                    }

                    console.log('scroll to top', scrollTop,target.height(),
                        scrollBody.scrollTop(),  target.offset().top,
                        target.offset().top , target.parent().offset().top)

                    scrollBody.clearQueue();
                    scrollBody.stop();
                    scrollBody.animate({
                        scrollTop:scrollTop
                    }, 500);
                    //return false;
                }
            }

            utils.findSentencesInHtml = function findSentencesInHtml(parent) {

                window.parent = parent;
                console.log('starting point is', parent)

                if ($.isString == null) {
                    $.isString = function isString(obj) {
                        return (Object.prototype.toString.call(obj) === '[object String]');
                    }
                }
                //TODO
                //colorize all sentences
                //prev sentences add to list of 'current sentencces'

                //get all images ... and have images work with sentences
                //why: when viewing sentence, see image. so it is like tv show

                var h = {};
                h.data = {};
                h.data.debugSpanWith$ = false;
                //h.data.debugWithOpacity = true;
                //h.data.debugWithColor = true;
                h.data.colorizeBackgrounds = false;
                //h.data.colorizeBackgrounds = true;

                if ( self.data.colorizeBackgrounds != null ) {
                    h.data.colorizeBackgrounds =
                        self.data.colorizeBackgrounds;

                }

                //h.data.debugAddingSentences = true;
                h.data.debugAddingSentencesHeavy  = false

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
                h.addSentence2 = function addSentence(str, _parent, why, child) {
                    var currentSentence = h.currentSentence + str;

                    currentSentence  = currentSentence.trim()
                    if ( currentSentence.trim() == '' ) {
                        return; //skip empty sentence
                    }
                    //there are two modes. post hoc, and a-pro-pro
                    if ( str != '' ) {
                        h.sentences.push(currentSentence); //if not first time add
                    } else { //why: special mode end sentence if there is one (fragment)
                        var hasSentenceBeenAdded = false;

                        var lastAddedObj = h.dictSentences2[h.sentences.length - 1]
                        var lastAddedSentence = '';
                        if ( lastAddedObj == null ) {
                        } else {
                            hasSentenceBeenAdded = h.currentSentence.indexOf(lastAddedObj.txt)  != -1
                        }

                        //close last sentence

                        if ( hasSentenceBeenAdded ) {
                            if ( h.data.debugAddingSentencesHeavy ) {
                                console.debug('   ---', hasSentenceBeenAdded, currentSentence, why, 'close last sentence')
                            }
                            return;
                        } else {
                            h.sentences.push(currentSentence);
                            if ( h.data.debugAddingSentencesHeavy ) {
                                console.debug('<<<', hasSentenceBeenAdded, currentSentence, why, 'close last sentence')
                                console.debug("\t", '<<<', h.currentSentence) //, currentSentence, why, 'close last sentence')
                            }
                            // return;
                        }

                        if ( hasSentenceBeenAdded ) {
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
                        images:h.images
                    };
                    /*if ( dictObj.txt.toLowerCase().indexOf("once you") != -1 ) {
                     debugger;
                     }
                     if ( dictObj.txt.toLowerCase().indexOf("but not a good fit") != -1 ) {
                     debugger;
                     }*/
                    h.dictSentences2[h.sentences.length - 1] = dictObj;
                    var span = $('<span >' + str + '</span>');

                    if  ( h.data.debugWithOpacity ) {
                        span.css({opacity:'0.2'});
                    }
                    if  ( h.data.debugWithColor ) {
                        span.css({color:'red'});
                    }

                    if ( h.data.debugAddingSentences ) {
                        console.debug(currentSentence, why)
                        if ( h.data.debugStopWhenAddingSentence ) {
                            var index = currentSentence.toLowerCase().indexOf(
                                h.data.debugStopWhenAddingSentence.toLowerCase()) ;
                            if ( index != -1 ) {
                                console.debug('got sentence like', h.data.debugStopWhenAddingSentence )
                                debugger;
                            }

                        }
                    }
                    // dictObj[str]=span;

                    if ( str != '' ) {
                        h.currentSpans[str] = (span);
                        _parent.append(span); //add to div
                    }

                    h.currentSentence = ''; //refresh
                    h.currentSpans = {};
                    h.images = [];
                    self.lastObj = dictObj;
                }


                h.addSentence2Fragment = function addSentence2Fragment(str, _parent, why) {
                    //create span, add to currentSpans to track sentence fragement
                    var span = $('<span>' + str + '</span>');
                    span = $('<span />')
                    span.text(str) //try to put '<scritp> in tag it will fail
                    if  ( h.data.debugWithOpacity ) {
                        span.css({opacity:'0.2'});
                    }
                    if  ( h.data.debugWithColor ) {
                        span.css({color:'blue'});
                    }
                    if ( h.data.debugAddingSentences ) {
                        console.debug('add fragment', str,h.currentSpans )
                    }

                    //if (  ) { //add sentence if starts with capital ... or add to previous sentence
                    //issue: this might be a full sentence (1 span had mutlipel sentences)
                    //in other method, handle scenairo where sentence is added as fragment
                    //}
                    _parent.append(span); //add to div
                    h.currentSpans[str] = (span);

                    h.currentSentence += str;
                }


                h.colorizeSentences = function colorizeSentences() {
                    if ( h.data.colorizeBackgrounds == false ) {
                        return;
                    }

                    var ic = 0

                    $.each(h.dictSentences2, function processChar(i, dictObj) {
                        //var color =
                        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                        var colors = ['FFC619','14CCA0', 'a94442']
                        ic++;
                        if ( ic > colors.length-1 ) {
                            ic = 0;
                        }
                        randomColor = colors[ic]

                        randomColor = '#' + randomColor
                        $.each(dictObj.spans,  function processChar(y, span) {
                            //span.css({'color': randomColor})
                            $(span).css('background-color', randomColor)
                        });
                        console.log('colorize', i, dictObj)
                    });

                }

                h.utils = {};
                h.utils.splitIntoSentencesSafe = function splitIntoSentencesSafe(str, _parent, child) {
                    var sentences = [];
                    var currentSentence = ''
                    //currentSentence = h.currentSentence;
                    str = str.replace(/\n/gi, '' );
                    var endAt = null;
                    var strArr = [];
                    for (var i = 0; i < str.length; i++) {
                        strArr.push(str[i]);
                    }

                    var validSentenceEndings = ['. ', '! ', '? ', '" ']; //do not split numbers

                    $.each(strArr, function processChar(i, char) {
                        var nextChar = str[i + 1]

                        var join = char + nextChar;
                        $.each(validSentenceEndings, function compareForEndSent(k, v) {
                            if (v == join) {
                                endAt = v;
                                return false;
                            }
                        })
                        currentSentence += char
                        if (i == strArr.length - 1 ) {

                            //console.log('...', currentSentence);
                            // debugger;

                            $.each(validSentenceEndings, function compareForEndSent(k, validEndingStrs) {
                                //debugger;
                                if ( validEndingStrs.charAt(0) ==  char  ) {
                                    //  debugger;
                                    endAt = char; //this is a valid sentence
                                    return false;
                                }
                            })
                        }
                        if (endAt) {
                            sentences.push(currentSentence);
                            if ( h.lastParent == null ) {
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
                    if (currentSentence != '') {
                        sentences.push(currentSentence)
                        h.addSentence2Fragment(currentSentence,
                            _parent
                        )

                    }
                    if (h && false) {
                        //every sentence
                        //var parent = h.lastParent[0]
                        //debugger;
//            var span = $('<span style="opacity: 0.2;">'+sentences.join(",")+'</span>')
//            _parent.append(span)
                        $.each(sentences, function addSpansToArea(i, sentence) {
                            var span = $('<span>' + sentence + '</span>')
                            if  ( h.data.debugWithOpacity ) {
                                span.css({opacity:'0.2'});
                            }
                            if  ( h.data.debugWithColor ) {
                                span.css({color:'green'});
                            }
                            _parent.append(span)
                        });

                        // $(parent).html(sentences.join('---'))
                    }

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
                    } catch ( e ) {
                        console.error('no clear console')
                    }
                    var currentQuote = '';
                    var inQuote = false;
                    //TODO: Get context around quote ...
                    $.each(strArr, function processChar(i, char) {
                        var nextChar = str[i + 1]
                        if ( char == '"') {
                            inQuote = ! inQuote;
                        }
                        if ( char == '“') {
                            inQuote = true
                        }
                        if ( char == '”') {
                            inQuote = false
                        }
                        if ( inQuote ) {
                            currentQuote += char;
                        } else {
                            if ( currentQuote != '' ) {
                                quotes.push(currentQuote);
                                currentQuote = ''
                            }
                        }
                        //debugger;
                    });
                    console.debug('quotes', quotes.length, quotes)

                    return;
                }



                function getChild(parent_, tab) {

                    var skipTagTypes = ['HEAD', 'SCRIPT', 'META', 'STYLE', 'NOSCRIPT', '#comment', 'TITLE']
                    //skipTagTypes = []
                    if ( tab == null ) tab= '';

                    var children = $(parent_).children('*')
                    var children = $(parent_).children('*')
                    var children = $(parent_).contents()

                    $.each(children, function process(i, child) {

                        //debugger
                        var ui = $(child)
                        if ( ui.hasClass('doNotReadComp')) {
                            return;
                        }

                        //why: debug ba d node types
                        //console.error('adding ' +  tab +  child.nodeName)
                        var nodeType = child.nodeName;
                        if (skipTagTypes.indexOf(nodeType) != -1) {
                            return;
                        }
                        var tagTypesVisibleCheck = ['SPAN','DIV']
                        if (tagTypesVisibleCheck.indexOf(nodeType) != -1
                            && $(child).is(':visible') == false ) {
                            //console.error('skipping', child, $(child).is(':visible'))
                            return;
                        }
                        if ( child.nodeName == 'PRE') {
                            console.error('skip PRE', child)
                            return;
                        }
                        if ( child.nodeName == 'HEADER') {
                            console.error('skip header', child)
                            //return;
                        }
                        if ( child.nodeName == 'SECTION') {
                            console.error('skip SECTION', child)
                            //share-widgget
                            //data-tweet
                            //return;
                            // return;
                        }
                        if ( child.nodeName == 'DIV') {
                            var widget = false;
                            var recommended = false;

                            self.utils.elementHasClassLike = function elementHasClassLike(element, txt) {
                                if ( element.length > 0)
                                    element = element[0]
                                txt = txt.toLowerCase();
                                var widget = false
                                $.each(element.classList, function goTC(k,v) {
                                    if ( v.toLowerCase().indexOf(txt) != - 1 )
                                        widget = true;

                                });
                                return widget;
                            }
                            var commentWidget = self.utils.elementHasClassLike(child, 'comments')
                            $.each(child.classList, function goTC(k,v) {
                                if ( v.indexOf('widget') != - 1 )
                                    widget = true;
                                if ( v.indexOf('recommended')!= - 1 )
                                    recommended = true;

                            });
                            if ( widget && commentWidget == false ) {
                                console.error('skip DIV', 'is a widget',  child)
                                return;
                            }
                            //share-widgget
                            //data-tweet
                            //return;
                        }

                        if ( child.nodeName == 'LI') {
                            h.addSentence2('',null, 'list tag')
                        }
                        //console.warn('addingX ' +  tab +  child.nodeName,child )
                        // debugger;
                        if ($.isString(child) || child.nodeName == '#text') {
                            var nodeTxt = child.nodeValue;
                            if (child.nodeValue.trim() != '') {
                                if (h.settings.debugSpans)
                                    console.log('', child, parent_)
                                var txt = child.nodeValue;

                                if ( self.data.fxFilterSpeakSentences ) {
                                    var result_InclusionCheck = self.data.fxFilterSpeakSentences(txt, child)
                                    if ( result_InclusionCheck == false ) {
                                        return;
                                    }
                                }
                                //$(child).wrapInner('<span class="addIn">');

                                var span = document.createElement('span');
                                parent_[0].insertBefore(span, child);
                                // debugger;
                                span.appendChild(child); //wrap in span

                                //return false;
                                var splitSentences = h.utils.splitIntoSentencesSafe(txt, $(span))
                                if (splitSentences.length > 0 && h.settings.debugSpans) {
                                    console.log('sentences', splitSentences)
                                }

                                //console.error('addingX ' +  tab +  child.nodeName +  $(child).is(':visible') ,
                                //    child , splitSentences)

                                child.nodeValue = '';
                                if ( h.data.debugSpanWith$ )
                                    child.nodeValue = '$'; //clear content of nodes
                                //h.currentSentence += txt;

                                h.lastParent = parent_
                                //h.currentSpans.push
                            } else {
                                if (nodeTxt == "\n" &&
                                    h.currentSentence.trim().length > 0)
                                    h.addSentence(h.currentSentence, h.lastParent[0], 'new line')
                            }

                        }

                        //else if (child.nodeName == 'IMG') {
                        //console.log('..', child)
                        //    //TODO: addImageToCurrentDictionaryObject
                        // }
                        else if ( $(child).is('img') ) {
                            //debugger;
                            h.images.push(child);
                        }
                        else if ( $(child).is('p') ) {
                            //new sentence
                            h.addSentence2('',null, 'p')
                        }
                        else if ( $(child).is('br') || $(child).is('h1') ) {
                            //new sentence
                            h.addSentence2('',null, 'br tag like')
                        }
                        else {
                            // console.log('raw',child.nodeName, child)
                        }
                        /*else { //} ( child.nodeName == 'img') {
                         console.log('..', child)
                         }*/

                        //  console.log('raw',child)
                        var child = $(child)
                        tab = tab +  "\t"
                        getChild(child, tab)
                    })
                }

                getChild(parent)


                h.colorizeSentences();
                h.utils.getQuotes(h.sentences)
                window.h = h;

                console.log('h', window.h)


                return;
                $.each()
                x.contents();
                $.isString()

            }
        }

        defineUtils();

        function defineNLP() {
            p.utils.nlp = function nlp(sentence) {

                if ( window.nlp_compromise == null ) {
                    console.log('no nlp')
                    return;
                }
                var y =  nlp_compromise.text(sentence).nouns()

                var values = []
                $.each(y, function filterFor(k,v) {
                    v.url = 'https://www.google.com/webhp?#q='+v.text;
                    if ( v.text.slice(0,1).toUpperCase() !=
                        v.text.slice(0,1)  ) {
                        return;
                    }
                    values.push(v);
                })

                y = values;


                $('#col2_words').html('' +
                    '' +
                    '<div id="listWords">' +

                    '<input class="search" placeholder="Search" />' +
                    '<button class="sort" data-sort="name">' +
                    'Sort' +
                    '</button>' +

                    '<ul class="list"></ul>' +

                    '</div>')

                var options = {
                    valueNames: [ 'tag', 'text',
                        { name: 'url', attr: 'href' },
                    ],
                    item: '<li>' +
                    '<span class="tag"></span> ' +
                    '<span class="text"></span> ' +
                    '<a href="http://javve.com" class="link url">link</a>'+
                    '<p class="born"></p>' +
                    '</li>'
                };


                if ( values.length != 0 ) {
                    var userList = new List('listWords', options, values);
                }


            }
        }
        defineNLP()

        function defineSpeakHelper() {
            var speakHelper  ={};
            p.speakHelper = speakHelper


            speakHelper.speak = function speak(txt,  fxDone, rate, cacheRequest) {
                var curId = self.currentId;

                var sentence = txt;

                if ( self.rate == null ) {
                    self.rate  = $('#inputRate').val()
                }

                if ( self.voice == null ) {
                    self.voice =  'IVONA 2 Brian'
                }

                //var rate = 7
                var voice = null;
                if ( voice == null ) {
                    voice = 'IVONA 2 Emma';
                    voice = 'IVONA 2 Brian';
                    voice = self.voice;
                }
                // debugger
                console.log('trim',  sentence.trim().endsWith('reply'), sentence)
                if ( false &&  sentence.trim().endsWith('reply') ) {
                    if ( self.voice == 'IVONA 2 Brian' ) {
                        //self.voice = 'IVONA 2 Joey'
                        self.voice = 'IVONA 2 Emma';
                    } else{
                        self.voice = 'IVONA 2 Brian'
                    }
                    // voice = self.voice
                    sentence = sentence.trim().slice(-5)
                    sentence += 'end comment.'
                }

                sentence = sentence.replace(/’/gi, "'");
                //self.voice = voice;
                var speakOnce = false
                var date = new Date();
                $.ajax({
                    url: "http://localhost:4444/say",
                    data: {
                        text:sentence,
                        rate:self.rate,
                        playAudio:true,
                        volume:25,
                        voice:voice,
                        speakOnce:speakOnce,
                        //voice:'IVONA 2 Gwyneth'
                    },
                    type:'post',
                    success: function(result){
                        if ( curId != self.currentId ) {
                            return;
                        }

                        var endDate = new Date();
                        console.log('total time', (endDate.getTime()-date.getTime())/1000);
                        fxDone();
                    }
                });
            }
        }
        defineSpeakHelper();
    }
    window.SentenceHelper = SentenceHelper

    function initSpeakerControls () {
        loadHTML();
        function loadHTML() {
            $.get( '/js/speak.html', function( loadedHTML ) {


                var h = $('<div>'+loadedHTML+'</div>')
                var contentToApped = $(h).find('#appendToApp'); //don't get entire html container
                $('#appendToApp').remove();//support hot-reload
                if ( contentToApped != null ) {
                    $('body').append(contentToApped);
                    initSpeaker()
                }
            })
        }
        function initSpeaker() {

            //var utils = {};
            //utils.

            if (  $('#voc_startOnSelection').length == 0 ) {
                console.log('injected html not found, try do ready again...')
                setTimeout(doReady, 300)
                return;
            }

            // debugger
            console.log( "starting speaker" );
            var t = new SentenceHelper();
            if ( window.sentenceHelper) {
                if ( window.sentenceHelper.removeEvents )
                    window.sentenceHelper.removeEvents()
            }
            window.sentenceHelper = t
            t.setupSentences();

            $('#voc_startOnSelection').click(t.startOnSel)

            $('#btnPrev').click(t.onPrev)
            $('#btnNext').click(t.onNext)


            $('#txtIframeLoaderStatus').click(t.on)

            $('#doSel').change(changeEnabled);





            function changeEnabled(event) {
                t.enabled = this.checked;
                console.log('on',  t.enabled, this.checked, $('#doSel').val());
                //debugger
                localStorage.setItem('reader_Enabled', t.enabled );
                console.log( 'value',
                    localStorage.getItem('reader_Enabled'),
                    localStorage.getItem('reader_Enabled')==true,
                    localStorage.getItem('reader_Enabled')=='true'
                )
            }
            //changeEnabled();


            $('#voc_btnBack').click(t.back)
            $('#voc_btnFor').click(t.forward)
            $('#voc_btnRestart').click(t.restart)
            $('#voc_btnPlay').click(t.play);
            // $('#voc_btnPlay2').click(t.onPlay2UI);
            $('#voc_btnPlay2').click(t.onPlay2 );

            $('#voc_btnRecent').click(t.onRecentList);


            $('#checkDebugSentences').click(t.onChangeOptions);

            var uiHelpers = {};
            uiHelpers.bindCheckbox = function bindCheckbox(id, toProp, defval) {
                $('#'+id).click(onChangeOptionsX);
                function onChangeOptionsX() {
                    t.data[toProp] = $('#'+id).is(':checked')
                }

                if ( defval == true ) {
                    $('#'+id).prop('checked', true);
                } else {
                    $('#'+id).prop('checked', true);
                }
            }
            uiHelpers.bindCheckbox('checkAutoScrollingEnabled', 'autoScrollingEnabled', true)

            sentenceHelper.removeEvents = function (){
                addEventListeners(true)
            }
            function onKeyUp(e) {
                if ( t != window.sentenceHelper ) {
                    debugger
                    console.error('should not be firiring')
                }
                if (e.keyCode == 8) {
                    // user has pressed backspace
                    // array.pop();
                }
                if (e.keyCode == 32) {
                    // user has pressed space
                    //array.push('');
                    // console.log(e.target)
                    // debugger;
                    if ( e.target.nodeName == 'TEXTAREA') {
                        console.log('skip space on textarea')
                        return;
                    }
                    //return
                    //debugger;
                    t.onPlay2();
                }
                if ( e.keyCode == 40 &&   e.shiftKey == true) {
                    t.onPlay2(null, false, 1, true, true)
                }
                if ( e.keyCode == 38 &&   e.shiftKey == true) {
                    t.onPlay2(null, false, -1, true, true)
                }

                if ( e.keyCode == 27 )   {
                    t.onHardStop();
                }
            }

            function addEventListeners(remove) {
                if (remove !== true ) {
                    $('body').keyup(onKeyUp);
                } else {
                    $('body').off('keyup',onKeyUp);
                }

            }


            addEventListeners();



            $('#voc_btnPause2').click(t.onPause);

            $('#voc_btnPause').click(t.pause)
            $('#inputRate').change(function onChanged(event) {
                var val = $(event.target).val()
                console.log('changed', $(event.target).val() );
                t.setRate(val)
            });
            function onChanged_inputRepeatSentence(event) {
                var val = $('#inputRepeatSentence').val()
                console.log('onChanged_inputRepeatSentence', val );
                t.data.repeatCountIndex = (val)
            }
            $('#inputRepeatSentence').change(onChanged_inputRepeatSentence);
            onChanged_inputRepeatSentence();

            $('html').click(clickToSetPosition);
            function clickToSetPosition (event, doNotUseParent) {
                //Hide the menus if visible
                // console.log('click it',event)

                //console.log('clicked',  $('#doSel')[0].checked)
//debugger
                if ( t.enabled == false ) {
                    // console.log('not enabled')
                    return;
                }
                console.log('starting selection')
                var tar = $(event.target)
                var ancestor = $(tar).closest("article");
//if parent is control box
                if (tar.parents('.container-controls').length) {
                    return;
                }


                t.utils.selectElementText(event.target);


                var p = tar.parent();

                t.sel = t.sel2;
                t.sel2 = p


                var target = event.target.parentNode;
                if ( doNotUseParent ) {
                    target = event.target;
                }

                t.utils.selectElementText(target);
                var y = p.children()
                $.each(y, function (i, j ) {
                    //  console.log(j);
                    // selectElementText(j);
                })

                //console.log('SetSelection to', 'click for sel', tar, tar.text(),  t.sel,  t.sel2);

                //t.sel = tar; //override existing code
                t.sel = target; // 7/10/2016 - upgrade parent node
                console.log('SetSelection to', 'click for sel', tar, 'text length',  tar.text().length,  t.sel,  t.sel2);
                //console.log('click', tar, tar.text());


                var yyy = t.getSentencesFromSelectedElement();

                // t.setPlayheadBasedOnSelectedTest(t.sel)

            };

            t.clickToSetPosition = clickToSetPosition

            function loadStorage() {
                // false;
                t.enabled = localStorage.getItem('reader_Enabled')=="true"
                $('#doSel')[0].checked = t.enabled;
                console.log('storage', t.enabled, $('#doSel')[0].checked,
                    localStorage.getItem('reader_Enabled'), $('#doSel')[0].checked )


            }

            loadStorage();



            function handleIframes() {
                if ( window.handleIframes == false ) {
                    return false; //why: do not modify iframes on tinymce
                }
                $('iframe[notKeep!="true"]').remove();

                function iframeReady() {
                    var contents = $('iframe[notKeep="true"]').contents().get(0)
                    if ( contents == null ) {
                        return;
                    }
                    if ( contents.body == null )
                        return; //warning function is called later
                    var innerHTML = contents.body.innerHTML;

                    t.iframeTouched = true
                    //debugger;
                    var html = $(innerHTML);

                    if ( html.length == 0 ) {
                        console.log('iframe src 0')
                        return;
                    }
                    html.find('script').remove()
                    html.find('noscript').remove()
                    html = $.parseHTML(innerHTML)
                    html = $(html)
                    html.find('[class*="header"]').remove()
                    html.find('[class*="sharebar"]').remove()
                    html.find('[class*="share"]').remove()
                    html.find('[class*="modal"]').remove()
                    html.find('[class*="sections-nav"]').remove()
                    html.find('[class*="logo"]').remove()
                    html.find('[class*="tweet"]').remove()
                    html.find('[class*="follow"]').remove()
                    html.find('[class*="newsletter"]').remove()
                    //does have commadn 'article-body')
                    // html.
                    //innerHTML = innerHTML.replace(/script/gi, 'script___');
                    ///innerHTML = innerHTML.replace(/type="application\/javascript"/gi, 'app/noshow');
//debugger;
                    innerHTML = html;


                    //debugger;
                    // $('#xIdFrame').html( innerHTML) ;
                    $('#bookHolderContainer').html( innerHTML) ;
                    window.xHTMLInner = innerHTML

                    t.setupSentences();
                    // onInit()
                    // $('#xIdFrame').html( innerHTML) ;
                }
                $('iframe').ready(iframeReady);
                $('iframe').load( iframeReady );
                // iframeReady()

                setTimeout(function testIfIframeNeverLoaded()  {
                    if ( t.iframeTouched != true )
                        iframeReady()
                }, 3000)
            }

            handleIframes();

        }
    };
    if ( self == top ) {
        String.prototype.replaceX = function replace( find, replaceWith) {
            function escapeRegExp(string) {
                if ( string == null )
                    return null;
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            }


            // So in order to make the replaceAll function above safer, it could be modified to the following if you also include escapeRegExp:

            // function replaceAll(string, find, replace) {
            if ( this == null )
                return null;
            if ( this.replace == null )
                return null;
            return this.replace(new RegExp(escapeRegExp(find), 'g'), replaceWith);
        }
        console.log( "ready!", self!==top );
        //   $( document ).ready( doReady ) ;
        // doReady()

        setTimeout(initSpeakerControls, 500)


        window.speak = function speak(text, fx, cfg) {
            if ( text.text != null ) {
                cfg = text;
            }
            if( cfg == null ) {
                cfg = {}
                cfg.text = text;

            }
            cfg.fx = fx;
            if ( cfg.rate == null ) {
                cfg.rate  = $('#inputRate').val();
            }
            if ( cfg.rate == null ) {
                cfg.rate  = 6
            }

            if ( cfg.voice == null ) {
                cfg.voice =  'IVONA 2 Brian';
            }

            cfg.text = cfg.text.trim();
            cfg.text = cfg.text.replace(/&nbsp;/gi,' ');
            cfg.text = cfg.text.replace(/OMG/g,' oh-my-god ');
            cfg.text = cfg.text.replace(/UX/g,' you-eye ');
            cfg.text = cfg.text.replace(/UI/g,' you-x ');
            console.log('speak:', 'trim',  cfg.text.trim().endsWith('reply'), cfg.text)
            var speakOnce = false
            var date = new Date();

            cfg.text = cfg.text.replace('->', ' refers to ');

            $.ajax({
                url: "http://localhost:4444/say",
                data: {
                    text:cfg.text,
                    rate:cfg.rate,
                    playAudio:true,
                    volume:25,
                    voice:cfg.voice,
                },
                type:'post',
                success: function(result){
                    var endDate = new Date();
                    console.log('total time',
                        (endDate.getTime()-date.getTime())/1000);
                    if ( cfg.fx ) cfg.fx()
                }
            });


        }

    }
}

console.log('loaded file speakHTMLTest_Cleaned.js')


function onInit() {
    // debugger;
    window.fxHtmlSpeaker();
    // doReady();
}
if ( $.isReady ) {
    //debugger;
    setTimeout(onInit, 5);
} else {
    $( document ).ready( onInit ) ;
}

 