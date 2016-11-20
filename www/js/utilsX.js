var utilsx = {};
window.utilsx = utilsx;

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
}
defineUtils();

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

var uiHelpers = {};
utilsx.uiHelpers = uiHelpers;

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

uiHelpers.click = function bindCheckbox(id, fx) {
    $('#'+id).click(onChangeOptionsX);
    function onChangeOptionsX() {
        fx()
    }
}

uiHelpers.addButton = function addButton(cfg) {
    var btn = $('<button/>');
    btn.addClass('btn btn-default')
    btn.attr('title',cfg.title);
    btn.html(cfg.text);

    if ( cfg.fx ) btn.click(cfg.fx)

    var container = cfg.parent;
    if ( container )
        container.append(btn)

    return btn;
}

uiHelpers.wrapUIIn = function wrapUIIn(c, tag) {
    var wrapperUI = $('<'+tag+'/>');
    wrapperUI.append(c)
    return wrapperUI;
}

uiHelpers.addCheckbox = function addCheckbox(cfg) {
    var chk = $('<input/>');
    chk.attr('type','checkbox');
    //btn.addClass('btn btn-default')
    chk.attr('title',cfg.title);

    var chkOrig = chk;
    if ( cfg.name ) {
        var lbl = uiHelpers.wrapUIIn(chk, 'label')
        lbl.append(cfg.name);
        chk = lbl;
    }

    var span = uiHelpers.wrapUIIn(chk, 'span')
    span.addClass('checkbox');
    //chk = span;

    chkOrig.change(function onCheckboxChanged() {
        var ui =  $(this)
        var checked = ui.is(":checked")
        if( checked ) {

        }
        if (cfg.bindTo) {
            cfg.bindTo.obj[cfg.bindTo.prop] = checked;
        }
        if ( cfg.fxChange ) {
            cfg.fxChange(checked, ui);
        }
    });

    if ( cfg.val !== undefined ) {
        chkOrig.val(cfg.val)
    }

    //if ( cfg.fx ) btn.click(cfg.fx)

    var container = cfg.parent;
    if ( cfg.addTo ) {
        container = $(cfg.addTo)
    }
    if ( container )
        container.append(chk)


    return span;
}



utilsx.selectElementText = function selectElementText(el, win) {
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


utilsx.scrollToElement = function (target) {
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





