/**
 * Created by user1 on 6/3/2017.
 */
function initStyles() {
    /*
     background-color: #EEF8C8;
     opacity: 1;
     */
    var head = $($('iframe')[1]).contents().find("head")
    var css = '<style type="text/css">' +
        '.highlight{background-color: #EEF8C8; opacity: 1;}; ' +
        '</style>';
    $(head).append(css);
}
setTimeout(initStyles, 2000)

window.handleIframes = false
var c = {};

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

c.speakCurrentElement = function () {
    console.log('speak current');

    var ui = $(c.element);

    var text = ui.text().trim();
    $('#txtEdit').text(text);
    $('#speakingBox').show();
    $('#speakingBox').attr('title', text);
    c.status('speking:'+text)
    console.log('speak current element');
    window.speak({text:text });
    ui.addClass('highlight')
}

c.status = function (c) {
    console.log('speak current');
    $('#txtConsole').text(c);
}

c.highlight =function highligiht() {

}

c.removeHighlight = function removeHighlight() {
    if ( tinyMCE.get('mainContent') == null  )
        return;
    var content = tinyMCE.get('mainContent').getContent();
    var b = $(tinyMCE.get('mainContent').getBody());
    var content = b.text();
    var children = b.children();
    var children = b.find('*');
    children.removeClass('highlight');
}

c.dbg = {}
c.dbg.debugKeyEvents = false;
c.dbg.debugKeyUpEvents = false;
c.dbg.debugNodeChangeEvents = false;

tinymce.init({ selector:'textarea',
    //height: 500,
    theme: 'modern',
    plugins: "noneditable, autoresize",

    autoresize_bottom_margin: -10,
    autoresize_min_height: 50,
    autoresize_on_init: true,
    statusbar: false,
    //menubar: "tools",
    external_plugins: {"nanospell": "/nanospell/plugin.js"},
    /*plugins: "spellchecker",
     menubar: "tools",
     toolbar: "spellchecker",*/
    // toolbar: "file edit insert view format table tools undo redo | currentdate",
    toolbar: [
        'undo redo | styleselect | bold italic | link image',
        'alignleft aligncenter alignright | bullist numlist, spellchecker'
    ],
    setup: function(editor) {

        window.ed = editor;

        var ed = editor;
        ed.on('keydown', function onCatchATab(event) {


            if ( event.keyCode == 9 && window.autoCompleteOpen ) {
                console.log('accept')
                var firstItem = c.content[0]
                console.debug('testing', ';', firstItem)
                event.preventDefault()
                window.ac.acceptTag(firstItem.label)
                return
            }

            if (event.keyCode == 9) { // tab pressed
                if (event.shiftKey) {
                    ed.execCommand('Outdent');
                    //ed.execCommand('Strikeout');
                    //ed.execCommand('Strikethrough');
                }
                else {
                    ed.execCommand('Indent');
                }

                event.preventDefault();
                return false;
            }

            // if (event.keyCode == 83) { // ctrl alt s
            if (event.keyCode == 68) { // ctrl alt d

                //strick through .....
                if (event.ctrlKey && event.altKey ) {
                    ed.execCommand('Strikethrough');
                    window.ed.selection.select(c.element)
                    event.preventDefault();
                    return false;
                }
                else {
                    //ed.execCommand('Indent');
                }
            }




        });

        editor.on('change', function(e) {
            console.log('change event', e);
        });
        editor.on('undo', function(e) {
            console.log('undo event', e);
        });

        var play2 =  debounce( c.speakCurrentElement,500);
        editor.on('keyup',function onKeyUp(e) {
            if ( c.dbg.debugKeyUpEvents)
                console.debug('Key up event: ' + e.keyCode);
            var content = tinyMCE.get('mainContent').getContent();
            Cookies.set('prevContent', content);

            if (e.keyCode == 86 && e.ctrlKey ) {
                console.debug('paste')
                c.pasted = true;
                setTimeout(function playAllSenctencesLater(){
                    tHelper.playAllSentences();
                }, 300)
                return;
            }

            if ( c.dbg.debugKeyEvents ) {
                console.debug(e.keyCode, e.ctrlKey)
            }

            var txt = c.ui.text();
            var currentNode = $(tinyMCE.activeEditor.selection.getNode())
            txt = $(tinyMCE.activeEditor.selection.getNode()).text()

            val2 = txt = currentNode.contents().filter(function(){
                return this.nodeType == 3;
            })[0].nodeValue


            tagTxt = txt
            if ( tagTxt.includes(':')) {
                var tagTxt = txt.split(':')[0]
            }
            var tags = tagTxt.split(', ')
            var acOn = tags.slice(-1)[0];

            var ac = $('#tags')
            ac.val(acOn)

            //
            ac.autocomplete( "search", acOn );
            //debugger


            console.debug('\t', '---', acOn, val2, tags);
            return;

            play2()
        });

        editor.on('dblclick',function(e) {
            console.debug('dblclick: ' + e.keyCode);
            c.status('doubleclick')
            helper.playAllSentences();
        });




        editor.on('dblclick',function(e) {
            console.debug('dblclick: ' + e.keyCode);
            c.status('doubleclick')
            helper.playAllSentences();
        });



        editor.on('focus',function(e) {
            console.debug('on focued: ' + e.keyCode);

        });


        /*  editor.on('nodeChangeX', function(e) {
         console.log('node event', e.element);
         if (  c.element == e.element ) {
         return
         }
         c.element = e.element
         var ui = $(e.element);
         c.ui = ui;
         // var ui = $(c.element)
         // var text = ui.text()
         // debugger;
         // console.debug(text, content.split(text)[1]);
         // var final = text  + content.split(text)[1];
         console.debug('txt to speac', text);
         window.speak(text)
         // play2()
         })
         */
        editor.on('nodeChange', function onNodeChanged(e, wait) {
            if ( wait != false ) {
                setTimeout(function waitFewSecs(){
                    onNodeChanged(e, false)
                },100)
                return;
            }
            if  ( c.dbg.debugNodeChangeEvents ) {
                console.log('node event', e.element, c.pasted);
            }
            if ( c.pasted == true ) {
                c.pasted = false;
                return;
            }
            if (  c.element == e.element ) {
                return
            }
            c.element = e.element
            var ui = $(e.element);
            c.ui = ui;

            $('#txtEdit').text(ui.text())
            c.removeHighlight()
            window.speak({text:ui.text() })
            ui.addClass('highlight')

            var pos = uiUtils.getPos(ui)
            console.debug('pos', pos)
            window.tagger.goTo(ui)
        });

        /*

         ed.addButton('check', {
         type:'checkbox',
         text: 'some descriptive label',
         });

         */
        editor.addButton('mybutton', {
            text: "My Button",
            onclick: function () {
                alert("My Button clicked!");
            }
        });



        editor.addButton('strikeout', {
            icon: 'strikethrough',
            onclick: function() {
                editor.execCommand('mceToggleFormat', false, 'strikethrough');
            }
        });
    }
});

function reverse() {
    var val = Cookies.get('prevContent');
    console.log('set to ', val)
    tinyMCE.get('mainContent').setContent(val)
}


var tHelper = {};
window.tHelper = tHelper;

tHelper.setupPaste = function setupPaste() {
    $("body").on("change keyup paste", tHelper.pasteHandle)
}

tHelper.pasteHandle = function pasteHandle  (event, txt) {

    console.log('pasted')

    if ( txt == null ) {
        var currentVal = $(this).val();

    } else {
        currentVal = txt;
    }
    var txtOrig = currentVal;

    //fix issues with text
    currentVal = currentVal.replace(//gm, "");
    currentVal = currentVal.replace(/’/gm, "'");

    if (currentVal == oldVal) {
        return; //check to prevent multiple simultaneous triggers
    }
};

tHelper.playAllSentences = function readText() {
    var tiny = tinyMCE.get('mainContent');
    var content = tinyMCE.get('mainContent').getContent();
    var b = $(tinyMCE.get('mainContent').getBody());
    var content = b.text();
    var children = b.children();
    var foundElement = false;
    console.debug('dblclick: ', children);
    var text = '';

    var toDiv = $($('iframe')[1]).contents().find('body')
    window.sentenceHelper.setupSentences(toDiv,toDiv);
    window.speak('paste command')
    window.speak('paste')
    setTimeout(function call() {
        console.debug('go play all ..')
        window.sentenceHelper.onPlay2UI()
        return;
        setTimeout(function call() {
            console.debug('go play all ..')
            window.sentenceHelper.onPlay2UI()
        },200)
    },700)

    return;
    $.each(children, function addEachChild(k,v) {
        var ui = $(v)
        var p = $(c.element).parent()[0]
        console.log(v, ui, p)
        if ( v == c.element )
            foundElement = true
        if ( v == p )
            foundElement = true
        if ( foundElement )
            text +=  ui.text().trim() +  ' ';
    })

    // var ui = $(c.element)
    // var text = ui.text()
    // debugger;
    // console.debug(text, content.split(text)[1]);
    // var final = text  + content.split(text)[1];
    console.debug('txt to speac', text);
    window.speak(text)
    // play2()
};


function setup() {

    var mces = $('.mce-tinymce.mce-panel')
    mces.each(function grabTOolbar(k,v) {
        var ui = $(v)
        var c = ui.find('.mce-container.mce-menubar')
        var t = ui.find('.mce-container.mce-toolbar')
        var parent = c.parent();
        var u = uiUtils.tag('div');
        u.addClass('booToolbar')
        u.append(c);
        u.append(t);

        ui.css('border-top', '0px')
        ui.css('margin-top', '-1px')


        ui.find('.mce-toolbar-grp').hide();
        u.css('position', 'fixed')
        u.css('background-color', '#F0F0F0')
        u.css('top','0px');
        $('body').append(u)

    })
}
setTimeout(setup, 1500)

//   debugger
tHelper.setupPaste()

tHelper.setupControlBox = function setup() {
    //utils.addCheckbox('Speak On Paste')
    //utils.ignoreAddLinkThings('Speak On Paste')
}
tHelper.setupControlBox();



