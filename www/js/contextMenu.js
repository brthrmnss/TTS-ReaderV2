$(document).ready(function () {

    if ($("#test").addEventListener) {
        $("#test").addEventListener('contextmenu', function (e) {
            alert("You've tried to open context menu"); //here you draw your own menu
            e.preventDefault();
        }, false);
    } else {

        //document.getElementById("test").attachEvent('oncontextmenu', function() {
        //$(".test").bind('contextmenu', function() {
        $('body').on('contextmenu', function (e) {

            window.contextMenuHelper.storeSelection();
            if (window.contextMenuHelper.data.txt == null ||
                window.contextMenuHelper.data.txt == '') {
                return;
            }
            // console.error('ctx',e.target)

            // alert("contextmenu"+event);
            document.getElementById("rmenu").className = "showContextMenu";
            document.getElementById("rmenu").style.top = event.clientY//mouseY(event);
            document.getElementById("rmenu").style.left = event.clientX //mouseX(event);


            $('#rmenu').css('top', event.clientY);
            $('#rmenu').css('left', event.clientX - $('#rmenu').width() - 10);
            //debugger
            //window.event.returnValue = false;


            window.contextMenuHelper.openAddNoteDialog();
        });
    }

    $('#btnAddNote').click(function onClickAddNote() {
        window.contextMenuHelper.data.overrideNotes = $("#contextAddBookmark_txt").val();
        window.contextMenuHelper.copy();
        window.contextMenuHelper.hideAddNoteDialog();
    })

    $('#btnContextMenuClose').click(function btnContextMenuClose() {
        window.contextMenuHelper.hideAddNoteDialog();
    })

    $('#btnBar').find('button').addClass('btns');
    $('#btnBar').click(function onClickButtonSentiment(e) {
        var t = e.target;
        var sentiment = $(t).text()
        console.debug('sentiment', sentiment)
        //window.contextMenuHelper.data.overrideNotes = $("#contextAddBookmark_txt").val();
        //window.contextMenuHelper.copy();
        //window.contextMenuHelper.hideAddNoteDialog();
        var index = window.contextMenuHelper.data.sentiments.indexOf(sentiment)
        if (index == -1) {
            window.contextMenuHelper.data.sentiments.push(sentiment)
        } else {
            window.contextMenuHelper.data.sentiments.splice(index, 1)
        }
        $('#contextSentiments').text(
            window.contextMenuHelper.data.sentiments.join(', ')
        )

    })

    uiUtils.listenForKeyCode({
        keyCode: uiUtils.keys.esc,
        fx: function onClosePopup() {
            window.contextMenuHelper.hideAddNoteDialog();
        }
    })

    /*

     uiUtils.listenForKeyCode({
     codeMode:uiUtils.keys.esc,
     fx:function onClosePopup() {
     window.contextMenuHelper.hideAddNoteDialog();
     }
     })
     */
    uiUtils.listenForStr('bbb', function onK() {
        window.contextMenuHelper.openAddNoteDialog();

    })

    $('body').click(function openWhenClickSentence (e) {
        var ui = $(e.target)
        var sentenceindex = ui.attr('sentenceindex')
        if ( sentenceindex == null ) { return }
        //window.contextMenuHelper.
        $('#txtAreaforBookMark').text(ui.text());
        window.contextMenuHelper.openAddNoteDialog();
        /*if(!$(e.target).parents('.option').length && !$(e.target).hasClass('.option')) {
         $('.archive').hide();
         }*/
    });

    function ContextMenuHelper() {
        var self = this;
        var p = this;

        self.data = {};

        p.copy = function copy() {
            var txt = self.getCurrentSelectionText();
            txt = self.data.txt;
            var bookname = window.sentenceHelper.data.rr.getBookName();
            //debugger
            if (self.data.overrideBookname) {
                bookname = 'free'
                var article = self.data.overrideBookname; //why: let bookname be override for iframe articles
                //  self.data.overrideBookname = null;

            }

            if (self.data.overrideNotes) {
                var notes = self.data.overrideNotes; //why: let bookname be override for iframe articles
            }
            console.log('selected text', txt, bookname)

            $.ajax({
                url: "/store_doc",
                data: {
                    text: txt,
                    dir: bookname,
                    article: article,
                    notes: notes,
                    sentiments: self.data.sentiments,
                    currentIndex: window.sentenceHelper.data.currentSentences.currentIndex
                },
                type: 'post',
                success: function (result) {
                    console.log('saved bookmark');
                }
            });

        }

        p.play = function play() {
            window.sentenceHelper.onPlay2()
        }

        p.getCurrentSelectionText = function getSelectionText(documentOverride) {
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
            }
            if (documentOverride && documentOverride.getSelection) {
                text = documentOverride.getSelection().toString();
            }
            return text;
        }
        p.storeSelection = function storeSelection(iframeDocument) {
            //why: have to store selected text before context action of clickn
            // on faux context menu
            self.data.txt = self.getCurrentSelectionText(iframeDocument);
            $('#txtAreaforBookMark').text(self.data.txt);
        }

        p.openAddNoteDialog = function openAddNoteDialogDialog() {
            document.getElementById("contextAddBookmark").className = "showContextMenu";
            $('contextAddBookmark_lbl').html(window.contextMenuHelper.data.txt)
            $("#contextAddBookmark_txt").val('');

            window.contextMenuHelper.data.sentiments = [];

            $("#contextSentiments").val('');


        }

        p.hideAddNoteDialog = function hideAddNoteDialog() {
            document.getElementById("contextAddBookmark").className = "hideContextMenu";
        }

        p.addIframe = function addIframe(iframeDocument, src) {
            //debugger
            $(iframeDocument).find('body').on('contextmenu', function (event) {
                // alert("contextmenu"+event);
                document.getElementById("rmenu").className = "showContextMenu";
                document.getElementById("rmenu").style.top = event.clientY//mouseY(event);
                document.getElementById("rmenu").style.left = event.clientX //mouseX(event);

                var text = window.contextMenuHelper.storeSelection(iframeDocument);
                window.contextMenuHelper.data.overrideBookname = src; //(iframeDocument);

                // debugger;
                $('#rmenu').css('top', event.clientY);
                $('#rmenu').css('left', event.clientX - $('#rmenu').width() - 10);
                //debugger
                //window.event.returnValue = false;
                window.contextMenuHelper.openAddNoteDialog();
            });
        }
    }

    window.contextMenuHelper = new ContextMenuHelper();

});

// this is from another SO post...  
$(document).bind("click", function (event) {
    if (document.getElementById("rmenu")) {
        document.getElementById("rmenu").className = "hideContextMenu";
    }

});


function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
        return evt.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
    } else {
        return null;
    }
}

function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
        return evt.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
    } else {
        return null;
    }
}