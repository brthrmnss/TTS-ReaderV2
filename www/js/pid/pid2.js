$( function() {
    window.speak = function speakFake() { }

    //debugger
    function AcHelper() {
        var self = this;
        var p = self;

        self.data = {}
        var availableTags = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
        ];
        self.data.tags = availableTags;

        p.init = function init() {
            self.data.ui = $('#tags');

            //debugger
            self.loadTags(availableTags)

            $( "#tags" ).on( "autocompleteopen",
                function onAutocompleteopen( event, ui ) {
                    console.info('acopen')
                    window.autoCompleteOpen = true;
                } )
            $( "#tags" ).on( "autocompleteclose",
                function onAutocompleteClose( event, ui ) {
                    //console.log('yyy', event, ui, ui.item)
                    console.info('acclosed')
                    window.autoCompleteOpen = false;
                    // console.log('txt', txt)
                } )



            $( "#tags" ).on( "autocompleteresponse",
                function onAutocompleteResponse( event, ui ) {
                    // store for later if user presses tab
                    c.content = ui.content;
                    //console.log('autocompleteresponse', ui.content.length)
                } )



            $( "#tags" ).on( "autocompleteselect",
                function onSelected( event, item ) {
                    console.log(event, item)
                    self.acceptTag(item);
                } );

        }

        p.loadTags = function loadTags(newTags) {
            self.data.tags = newTags;
            $( "#tags" ).autocomplete({
                source: self.data.tags
            });
        }


        //make it move b/c it is annoying being on the bottom
        window.t = $('.ui-widget')
        function UIMove() {
            var self = this;
            self.settings = { }
            self.data = {};
            var p = this;

            p.init = function init(config) {
                self.settings = config;
                if ( config.jq ) {
                    self.data.ui = $(config.jq)
                }
                self.data.ui.css('position', 'absolute')
                self.data.ui.css('z-index', 1000)
            }

            p.goTo = function goToUI(ui) {
                //var pos = uiUtils.getPos(ui);
                uiUtils.goTo = function goTo(placeUI, here) {
                    var pos = uiUtils.getPos(here);
                    uiUtils.xy(placeUI, pos)
                }
                uiUtils.xy = function setXY(ui, x, y ) {
                    var cfg = {}
                    cfg.ui = ui;
                    cfg.x = x
                    cfg.y = y
                    if ( ui.ui ) {
                        cfg = ui;
                    }
                    if ( cfg.moveTo ) {
                        var pos = uiUtils.getPos(cfg.moveTo)
                        cfg.x = pos.left;
                        cfg.y = pos.top
                    }
                    if ( cfg.x && cfg.x.top != null ) {
                        cfg.y = x.top;
                        cfg.x = x.left
                    }

                    if ( cfg.xOffset ) { cfg.x += cfg.xOffset }
                    if ( cfg.yOffset ) { cfg.y += cfg.yOffset }

                    cfg.ui.css('top', cfg.y+'px');
                    cfg.ui.css('left', cfg.x+'px');

                    console.debug('move to', ui, cfg.x,cfg.y)
                }
                uiUtils.goTo({ui:self.data.ui,  moveTo:ui,
                    xOffset:0, yOffset:130})

            }

            //goal is to simplify things ...
            //how so?
            //start and autocomplete in the begining
            //workflow
            //user autocompeltes a workflow
            //the work flow is loaded in the document


            p.moveToPoint = function moveToPoint(x,y) {

            }
        }

        window.tagger = new UIMove();
        tagger.init({jq:'.ui-widget'})


        p.acceptTag = function acceptTag(newTag) {
            console.debug('-->', newTag)

            // item = newTag;
            console.log('item', newTag)
            //window.sr.onAction(ui.item.label);
            c.ui.attr('tags', newTag)

            $( "#tags" ).val('')
            setTimeout(function ok() {
                $( "#tags" ).val('')
            }, 250)
            // var c = uiUtils.makeFloatingContainer('randomThingx')

            var div = uiUtils.addDiv('boxStuff').ui;
            div.css('top', '0px')
            div.css('right', '0px')
            // $('body').append(div);
            uiUtils.addDefaultCfg( {addTo:div} );
            uiUtils.makeAbs(div)
            /* uiUtils.addBtn({text:'x-'+newTag}, function onF() {
             console.log('onF')
             })
             console.log('div', div)*/

            var cNodeRaw = tinyMCE.activeEditor.selection.getNode()
            var currentNode = $(cNodeRaw)
            var cTxt = currentNode.text()
            // var dbg = currentNode.get(0).lastChild.nodeValue
            // debugger;
            //  currentNode.text(cTxt + newTag + ', ')
            currentNode.get(0).lastChild.nodeValue =  cTxt + newTag + ', '
            var sO = tinyMCE.activeEditor.selection.getRng().startOffset;
            setTimeout(function onLater() {
                //tinyMCE.activeEditor.selection.setCursorLocation(cNodeRaw, sO+newTag.length)
                //window.ed.selection.select(cNodeRaw)
                //window.ed.selection.collapse(false)
                return;
                var range = ed.selection.getRng();
                range.setStart(cNodeRaw, sO );
                range.setEnd(cNodeRaw, sO+1);
                ed.selection.setRng(range);
                window.ed.selection.collapse(false)

            }, 150)
            console.debug('\t', 'what-->', sO, cTxt, newTag)
            console.debug('\t',  'setto:',  currentNode.get(0).lastChild.nodeValue)

            //tinyMCE.activeEditor.selection.setCursorLocation

            uiUtils.abs = {}
            uiUtils.abs.addRelativeWrapper = function addRelativeWrapper() {
                var div = $('<div />')
                div.css('position', 'relative')
                return div;
            }

            var tagMetaHolder = 'metaDataHolder'
            var div = uiUtils.abs.addRelativeWrapper();
            div.css('text-align', 'right');
            div.addClass('mceNonEditable');
            div.addClass(tagMetaHolder)

            var metaHolder = c.ui.find('.'+tagMetaHolder)
            //console.debug('make another on', metaHolder.length)
            if ( metaHolder.length == 0 ) {
                metaHolder = div;
                c.ui.append(metaHolder);
                var metaHolder = c.ui.find('.'+tagMetaHolder)
                //console.debug('make another one')
            }
            uiUtils.addDefaultCfg( {addTo:metaHolder} );
            //uiUtils.makeAbs(div)
            uiUtils.addBtn({text:'x-'+newTag}, function onF() {
                console.log('onClickedTag', newTag)
            })


            // c.ui.append(div)

            //   console.log('what', $('#tags').val());
        }


    }




    var ac = new AcHelper()
    ac.init();
    window.ac = ac;

    /* $( "#tags" ).on( "autocompletechange",
     function onSelected( event, ui ) {
     console.log(event, ui)
     console.log('item', ui)
     console.log('what', $('#tags').val());
     } );*/

} );