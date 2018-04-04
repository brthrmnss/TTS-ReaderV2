/**
 * Created by user1 on 10/2/2017.
 */

window.uiCompUrlBase = 'http://localhost:10110/grid/grid/' +
    'G:/Dropbox/projects/crypto/mp/GrammarHelperServer/sharedResourcesGrid/' +
    'comps/'

function EmoteDialog() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        //window.sListOld.destroy()`
        cfg = sh.dv(cfg);
        self.settings = cfg;
        cfg.div = '#quickCrudDemo'
        cfg.divMakeIfNotFound = true;
        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.doNotUrlBase = true;
        cfg2.fileName = 'js/uicomps/emoteDialog.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        //cfg2.doNotModify = true
        cfg2.isDialog = true;
        self.data.ui.init(cfg2);
        self.render();


        window.emoteDialog = self;
        uiUtils.listenForStr('eee', function onEEECmdToOpenTriggered() {
            window.emoteDialog.openEmoteDialog();
        })

        uiUtils.listenForCode(uiUtils.keys.num1, function onNumb1() {
            console.log('...', 'num1')
        })
        self.data.id = Math.random();
        window.emoteDialogId = self.data.id;

        $('body').click(function openWhenClickSentence(e) {
            if (self.data.id != window.emoteDialogId) {
                $('body').off('click', openWhenClickSentence)
                return;
            }
            if ( e.ctrlKey == false ) {
                return;
            }
            var ui = $(e.target)
            var sentenceindex = ui.attr('sentence-index')
            console.log('click', ui, sentenceindex)
            if (sentenceindex == null) {
                return
            }
            //window.contextMenuHelper.
            $('#txtAreaforBookMark').text(ui.text());
            window.emoteDialog.openEmoteDialog();

            window.emoteDialog.loadDataIntoEmoteDialog(ui, sentenceindex)
            //window.contextMenuHelper.openAddNoteDialog();
            /*if(!$(e.target).parents('.option').length && !$(e.target).hasClass('.option')) {
             $('.archive').hide();
             }*/
        });

    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
        //self.data.ui.hide()
    };

    p.postRender = function postRender(query) {
        self.data.ui.addClickToDom(self.data.ui.data.ui, self)
         self.data.ui.data.ui.hide()
       // self.data.ui.data.ui.show()
             //self.data.ui.data.ui
        /*
         var i = new SList();
         var cfg = {}
         cfg.list = self.settings.list;
         cfg.comp = SListInner
         cfg.div = self.data.ui.data.ui.find('#listEmotes')
         //debugger
         cfg.listGridMode = self.settings.listGridMode;
         //cfg.listPartial = self.settings.listPartial;

         if (self.settings.listInnerPartial) {
         cfg.listPartial = self.data.ui.data.ui.find(self.settings.listInnerPartial);
         }


         cfg.fxClickPartial = function clickF(ui, itemData, _self, event) {
         console.log('itemData', itemData, ui)
         sh.forwardArgsTo(self.settings.fxClickPartial, arguments)
         }
         cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, _self) {
         sh.forwardArgsTo(self.settings.fxRenderPartial, arguments)
         }


         i.init(cfg)*/

        self.render.createEmotionList();
        self.render.createEmotionList2();

        self.render.createFlowList();
        self.render.createFlowList2();

    };
    p.loadDataIntoEmoteDialog = function loadDataIntoEmoteDialog(ui, sentenceindex) {
        var txtNotes = self.data.ui.data.ui.find('#txtNotes');
        var txtContent = self.data.ui.data.ui.find('#txtContent');
        var txtCurrentIndex = self.data.ui.data.ui.find('#txtCurrentIndex');

        self.data.sentenceindex = sentenceindex;


        var sentenceindex = ui.attr('sentence-index')
        console.log('click', ui, sentenceindex, txtContent)

        uiUtils.setText(txtContent, ui.text())
        txtContent.text(ui.text())
        uiUtils.show(self.data.ui.data.ui)
        uiUtils.setFocus(txtNotes);


        txtCurrentIndex.text(sentenceindex)

    }
    p.openEmoteDialog = function oed() {
        //debugger
        uiUtils.show(self.data.ui.data.ui)
        uiUtils.setFocus(self.data.ui.data.ui.find('#txtNotes'))

        self.data.emotesCollector.onRemoveAllItems();
        self.data.flowCollector.onRemoveAllItems()

        self.data.ui.data.ui.find('#txtNotes').val('')
    }

    p.closeEmoteDialog = function oed() {
        console.log('sadsf', 'closeEmoteDialog')
        uiUtils.hide(self.data.ui.data.ui)
    }

    p.acceptEmoteDialog = function oed() {
        console.log('sadsf', 'acceptEmoteDialog')
        var rake = {}

        rake.tags = self.data.flowCollector.getListItems()

        rake.tags = rake.tags.concat(self.data.emotesCollector.getListItems())

        rake.notes = self.data.ui.data.ui.find('#txtNotes').val()
        rake.sentence_index = self.data.sentenceindex;
        var loadBookFile = uiUtils.getUrlVal('loadBookFile');
        rake.book_name = loadBookFile
        console.log('rake', rake)
        // uiUtils.hide(self.data.ui.data.ui)

        uiUtils.utils.getR('addEmote', function onSAvedEmotes(result) {
            console.log('on saved', result)
            self.closeEmoteDialog();
        }, rake)
    }
    p.onProccessFLows = function onProccessFLows() {
        console.log('sadsf', 'acceptEmoteDialog')
        var rake = {};
        var loadBookFile = uiUtils.getUrlVal('loadBookFile');
        rake.book_name = loadBookFile
        uiUtils.utils.getR('processEmotes', function onSAvedEmotes(result) {
            console.log('on saved', result)
        }, rake)
    }


    p.render.createEmotionList = function createEmotionList() {
        var i = new SList();
        var cfg = {}
        cfg.list = self.settings.list;
        cfg.comp = SListInner
        cfg.div = self.data.ui.data.ui.find('#listEmotes')
        //debugger
        cfg.listGridMode = self.settings.listGridMode;
        //cfg.listPartial = self.settings.listPartial;

        if (self.settings.listInnerPartial) {
            cfg.listPartial = self.data.ui.data.ui.find(self.settings.listInnerPartial);
        }

        cfg.fxClickPartial = function clickF(ui, itemData, _self, event) {
            console.log('itemData', itemData, ui)
            self.data.emotesCollector.addListItem(itemData)
            //sh.forwardArgsTo(self.settings.fxClickPartial, arguments)
        }
        cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, _self) {
            //  sh.forwardArgsTo(self.settings.fxRenderPartial, arguments)
/*

            console.log('xy', '---', itemData)
            ui.find('#holderIcon').text(itemData)
            // ui.css('background-color', '#e0e0e0')
            //asdf.g
            if (itemData) {
                icon = u.tag('span')
                // ui.append(itemData.icon)
                icon.addClass('useFingerPointerCursor')
                icon.addClass('ec ' + 'ec-' + itemData)
                ui.append(icon)
            }
*/

            uiUtils.forwardArgsTo(self.settings.fxRenderPartial, sh.args(arguments) )
            /*
             ui.find('#holderIcon').text(itemData)
             //asdf.g
             icon = u.tag('span')
             ui.append(icon)
             icon.addClass('useFingerPointerCursor')
             icon.addClass('ec ' + 'ec-' + itemData)
             */
        }


        i.init(cfg)


    }
    p.render.createEmotionList2 = function createEmotionList2() {

        var i = new SList();
        // self.data.collectEmotes = t;
        var cfg = {}
        cfg.list = [];
        cfg.comp = SListInner
        cfg.div = self.data.ui.data.ui.find('#listEmotes_Collector')
        //debugger
        cfg.listGridMode = self.settings.listGridMode;
        cfg.showRemoveAll = true;
        //cfg.listPartial = self.settings.listPartial;

        if (self.settings.listInnerPartial) {
            cfg.listPartial = self.data.ui.data.ui.find(self.settings.listInnerPartial);
        }


        cfg.fxClickPartial = function clickF(ui, itemData, _self, event) {
            console.log('itemData', itemData, ui)
            self.data.emotesCollector.removeListItem(itemData)
            //sh.forwardArgsTo(self.settings.fxClickPartial, arguments)
        }
        cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, _self) {
            //  sh.forwardArgsTo(self.settings.fxRenderPartial, arguments)

            var args = sh.args(arguments)
            args.push(true)
            console.log('yargs', args)
            uiUtils.forwardArgsTo(self.settings.fxRenderPartial, args )

            return;

            console.log('xy', '---', itemData)
            ui.find('#holderIcon').text(itemData)
            // ui.css('background-color', '#e0e0e0')
            //asdf.g
            if (itemData) {
                icon = u.tag('span')
                // ui.append(itemData.icon)
                icon.addClass('useFingerPointerCursor')
                icon.addClass('ec ' + 'ec-' + itemData)
                ui.append(icon)
            }

        }


        i.init(cfg)

        self.data.emotesCollector = i;
    }

    p.render.createFlowList = function createFlowList() {

        var i = new SList();
        var cfg = {}
        cfg.list = self.settings.flows;
        cfg.comp = SListInner
        cfg.div = self.data.ui.data.ui.find('#listFlows')
        //debugger
        cfg.listGridMode = self.settings.listGridMode;
        //cfg.listPartial = self.settings.listPartial;

        if (self.settings.listInnerPartial) {
            cfg.listPartial = self.data.ui.data.ui.find(self.settings.listInnerPartial);
        }


        cfg.fxClickPartial = function clickF(ui, itemData, _self, event) {
            console.log('itemData', itemData, ui)
            self.data.flowCollector.addListItem(itemData)
            //sh.forwardArgsTo(self.settings.fxClickPartial, arguments)
        }
        cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, _self) {
            //  sh.forwardArgsTo(self.settings.fxRenderPartial, arguments)

            console.log('xy', '---', itemData)
            ui.find('#holderIcon').text(itemData.name)
            ui.css('background-color', '#e0e0e0')
            //asdf.g
            if (itemData.icon) {
                icon = u.tag('span')
                // ui.append(itemData.icon)
                icon.addClass('useFingerPointerCursor')
                icon.addClass('ec ' + 'ec-' + itemData.icon)
                ui.append(icon)
            }

        }


        i.init(cfg)
    }

    p.render.createFlowList2 = function createFlowList2() {

        var i = new SList();
        var cfg = {}
        cfg.list = []; //self.settings.flows;
        cfg.comp = SListInner
        cfg.div = self.data.ui.data.ui.find('#listFlows_Collector')
        //debugger
        cfg.listGridMode = self.settings.listGridMode;
        //cfg.listPartial = self.settings.listPartial;

        cfg.showRemoveAll = true;
        if (self.settings.listInnerPartial) {
            cfg.listPartial = self.data.ui.data.ui.find(self.settings.listInnerPartial);
        }


        cfg.fxClickPartial = function clickF(ui, itemData, _self, event) {
            console.log('itemData', itemData, ui)
            self.data.flowCollector.removeListItem(itemData)
            //sh.forwardArgsTo(self.settings.fxClickPartial, arguments)
        }
        cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, _self) {
            //  sh.forwardArgsTo(self.settings.fxRenderPartial, arguments)

            console.log('xy', '---', itemData)
            ui.find('#holderIcon').text(itemData.name)
            ui.css('background-color', '#e0e0e0')
            //asdf.g
            if (itemData.icon) {
                icon = u.tag('span')
                // ui.append(itemData.icon)
                icon.addClass('useFingerPointerCursor')
                icon.addClass('ec ' + 'ec-' + itemData.icon)
                ui.append(icon)
            }

        }


        i.init(cfg)
        self.data.flowCollector = i;
    }


    /*
     click to change
     open with eee
     if open set to current index
     press num pad to determ eomtionas
     can write a note

     */

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

EmoteDialog.retry = function restrySLits() {


    var s = new EmoteDialog()
    var cfg = {};
    cfg.listInnerPartial = '#listEmotes_partial'
    //  self.data.ui.data.ui.find('#listEmotes_partial');
    cfg.listGridMode = true
    cfg.list = [
        {name:'happy', icon:'slightly-smiling-face'},
        {name:'sad', icon:'slightly-frowning-face' },
        'cry',  'br',
        'fearful', 'hugs', 'rage', '100',
       'br',   'plus1', '-1', 'br',
        {icon:'zzz', name:'boring'}];

    cfg.fxRenderPartial = function fxRenderPartial(ui, itemData, comp, noTitle) {

        console.log('render', itemData)
        var cfg = {}
        cfg.ui = ui
        cfg.itemData = itemData
        cfg.comp = comp

        //debugger
        if ( noTitle != true ) {
            var itemText = itemData;
            if (itemData.name) {
                itemText = itemData.name;
            }
            ui.find('#holderIcon').text(itemText)
        } else {
            ui.find('#holderIcon').text('')
        }
        if ( itemData == 'br' ) {
            ui.find('#holderIcon').text('')
           // ui.parent().append('<br />')
            ui.css('width', '100%')
            return;
        }

        //asdf.g
        icon = u.tag('span')
        ui.append(icon)
        icon.addClass('useFingerPointerCursor')
        var iconClass = itemData
        if ( itemData.icon ) {
            iconClass = itemData.icon;
        }
        icon.addClass('ec ' + 'ec-' + iconClass)
        uiUtils.lastUI =  ui.find('#holderIcon'); //.text('');
        uiUtils.makeAbs()
        //uiUtils.pos(0)
        uiUtils.pos.bl()
        uiUtils.lastUI.css('left', '0px')
        uiUtils.lastUI.css('bottom', '-8px')
        uiUtils.pad(10)
        uiUtils.jumpToParent();
        uiUtils.makeRel();
        icon.css('fontSize', '40px')
    }

    cfg.flows = {
        "sounds": {name: "sounds", icon: "speaker"},
        //"sounds":"",
        "text": {},
        "character": {},
        "annotation": {}
    }

    s.init(cfg)


    setTimeout(function asdf() {
        var ui = $('[sentence-index=7]')

        var demoFile = uiUtils.getUrlVal('demoFile');
        console.log('rake', demoFile)
        if ( demoFile != 'true'){
            return
        }
        debugger
        ui.click()
    }, 800)


}

EmoteDialog.retry();