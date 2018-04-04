/**
 * Created by user1 on 10/2/2017.
 */

window.uiCompUrlBase = 'http://localhost:10110/grid/grid/' +
    'G:/Dropbox/projects/crypto/mp/GrammarHelperServer/sharedResourcesGrid/' +
    'comps/'

function AudioOptionsDialog() {
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
        cfg2.fileName = 'js/uicomps/AudioOptionsDialog.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        //cfg2.doNotModify = true
        cfg2.isDialog = true;
        self.data.ui.init(cfg2);
        self.render();


        window.audioOptionsDialog = self;
        uiUtils.listenForStr('aaa', function onEEECmdToOpenTriggered() {
            window.AudioOptionsDialog.openAudioOptionsDialog();
        })

        uiUtils.listenForCode(uiUtils.keys.num1, function onNumb1() {
            console.log('...', 'num1')
        })
        self.data.id = Math.random();
        window.AudioOptionsDialogId = self.data.id;


    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
        //self.data.ui.hide()
    };

    p.postRender = function postRender(query) {
        self.data.ui.addClickToDom(self.data.ui.data.ui, self)
        self.data.ui.data.ui.hide()
        uiUtils.lastUI = self.data.ui.data.ui
        uiUtils.zIndex(500)
    };

    p.openAudioOptionsDialog = function oed() {
        //debugger
        uiUtils.show(self.data.ui.data.ui)
        uiUtils.setFocus(self.data.ui.data.ui.find('#txtNotes'))

    }

    p.closeAudioOptionsDialog = function oed() {
        console.log('sadsf', 'closeAudioOptionsDialog')
        uiUtils.hide(self.data.ui.data.ui)
    }

    p.acceptAudioOptionsDialog = function oed() {
        console.log('sadsf', 'acceptAudioOptionsDialog')
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
            self.closeAudioOptionsDialog();
        }, rake)
    }

    p.onSaveAudio = function onSaveAudio(val) {

        //console.error('post', sh.qq(UIComp.lastVal))
        console.log('onSaveAudio')

        var saveAudio = UIComp.lastVal

        //self.data.ui.clear('')

        if ( saveAudio != 'on' ) {
            window.ttsAlwaysOptions = null
            console.log('clearing')
            return;
        }

        window.ttsAlwaysOptions = {}
        var opts= window.ttsAlwaysOptions;
        opts.bookname = window.epv.getBookname();
        opts.storeAudioInBookname = true;
        opts.doNotPlay = true;
    }
    p.onUseCachedAudio = function onUseCachedAudio(val) {

        console.log('onUseCachedAudio')

        var useCachedAudio = UIComp.lastVal

      //  self.data.ui.clear('')

        if ( useCachedAudio != 'on' ) {
            window.ttsAlwaysOptions = null
            console.log('clearing')
            return;
        }

        window.ttsAlwaysOptions = {}
        var opts= window.ttsAlwaysOptions;
        opts.bookname = window.epv.getBookname();
        opts.storeAudioInBookname = true;
       // opts.doNotPlay = true;
    }
    p.onProccessFLows = function onProccessFLows() {
        console.log('sadsf', 'acceptAudioOptionsDialog')
        var rake = {};
        var loadBookFile = uiUtils.getUrlVal('loadBookFile');
        rake.book_name = loadBookFile
        uiUtils.utils.getR('processEmotes', function onSAvedEmotes(result) {
            console.log('on saved', result)
        }, rake)
    }

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

window.txtStrs = {}
window.txtStrs['save_audio'] = 'Save audio'
AudioOptionsDialog.retry = function restrySLits() {


    var s = new window.AudioOptionsDialog()
    var cfg = {};
    s.init(cfg)

    setTimeout(function asdf() {
        if ( window.AudioOptionsDialogReload != true ) {
            reloader.reloadWhenFx('audioOptionsDialog.html', function onTestOneJs(a, b, c) {
                console.log('reload it', a, b, c);
                restrySLits()
            })
            //debugger
            reloader.reloadWhenFx('Morpher.js', function onTestOneJs(a, b, c) {
                console.log('Morpher.js it', a, b, c);
                //debugger
                restrySLits()
            })
            window.AudioOptionsDialogReload = true;
        }

        s.openAudioOptionsDialog()
        s.onUseCachedAudio()
        s.closeAudioOptionsDialog();
    }, 800)


}

AudioOptionsDialog.retry();