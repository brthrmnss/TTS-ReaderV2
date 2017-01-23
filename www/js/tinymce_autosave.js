/**
 * Created by user1 on 1/1/2017.
 */

function bendIt () {


    console.log('...ddd')



    function TASave() {
        var self = this;
        self.data = {}
        self.data.ui = {};
        self.data.timeAutosave = 10;
        self.data.timeRecentPages = 10;
        self.data.countAutosave = 0;

        self.data.dbg = {};
        self.data.dbg.autosaving = false;
        var p = this;

        p.init = function init() {
            self.data.active = true;
            self.autoSave(true);
            var cfg = uiUtils.callMethodRepeat(self.getRecentPageList, self.data.timeRecentPages, self.data, 'active')
            //cfg.log = 'updated'

            setTimeout(function init2() {
                self.getRecentPageList(self.haveNewListLoadFirstOne)
            }, 1000)
        }


        function defineRemote() {
            p.autoSave = function autoSave(repeat, fxDone) {
                if (self.data.active != true) {
                    console.warn('done with this tas');
                    return;
                }
                self.data.countAutosave++;
                if ( self.data.dbg.autosaving )
                    console.info('autosavesave', self.data.countAutosave);

                if (repeat) {
                    setTimeout(self.autoSave, self.data.timeAutosave * 1000, true)
                }


                self.onSave(function onSaved(){
                    if ( self.data.dbg.autosaving )
                        console.log('autosaved...')
                    callIfDefined(fxDone)
                })
            }

            p.getRecentPageList = function getRecentPageList(fxDone) {
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/listFiles';
                uiUtils.getUrl(url, function onGotRecentList(sdf){
                   // console.log('onGotRecentList', sdf)
                    uiUtils.setSelect(self.data.ui.recentPages,
                        sdf, 'name', 'name');
                    callIfDefined(fxDone);
                }, null, function onError(){
                    alert('server is not running start autoaveserver')
                });
            }

            p.onSave = function onSave(fxDone, nameOverride){

                var tM = tinyMCE.get('mainContent')
                if ( tM == null ) {
                    console.warn('tinyMCE was null')
                    return;
                }
                var b = $(tM.getBody());
                var content = b.html();
                if ( self.data.dbg.saveContent )
                    console.log('saving content', content);
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/saveFile';
                var data = {name:'test2', body:content}

                data.name = self.data.currentName;
                if ( nameOverride){
                    data.name = nameOverride;
                }
                if ( data.name == null  ) {
                    //ignoring pointless save
                    console.warn('ignoring save, b/c player is blank')
                    callIfDefined(fxDone)
                    return;
                }
                uiUtils.postUrl(url, data, function onData(sdf){
                    if ( self.data.dbg.saveContent )
                        console.log('response', sdf)
                    // tinyMCE.get('mainContent').setContent(sdf)
                    callIfDefined(fxDone)
                });
            };

            p.removeFile = function removeFile(name, fxDone) {
                //fxDone = uiUtils.ifFxReplace(nameOverride, fxDone)
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/removeFile';
                var data = {}
                data.name =  name
                console.log('removing file named:', data.name);
                uiUtils.getUrl(url, data, function onRemovedOldName(sdf){
                    console.log('removed old name', data.name, sdf)
                    callIfDefined(fxDone)
                });
            }



            p.onSaveTest = function onSaveTest(){
                self.onSave(function onSaveTest(){
                    console.log('saved it')
                }, 'test2');
            };

            p.onRetrieve = function onRetrieve(fxDone, nameOverride){
                // console.log('go');
                var url = 'http://'+ window.location.hostname + ':' + 6007
                    + '/readFile';
                var data  =  {name:'test2'};
                data.name = self.data.currentName;
                if ( nameOverride){
                    data.name = nameOverride;
                }
                uiUtils.getUrl(url,data, function onRetrievedData(sdf){
                    console.log('onRetrievedData', sdf)
                    tinyMCE.get('mainContent').setContent(sdf)
                    callIfDefined(fxDone)
                });
            }

            p.onRetrieveTest = function onRetrieveTest(){
                self.onRetrieve(null, 'test2');
            }


            p.haveNewListLoadFirstOne = function haveNewListLoadFirstOne(){
                console.log('loading first one in list')
                var newName = uiUtils.getVal2(self.data.ui.recentPages);
                if ( newName == null ) {
                    console.info('no other files left ')
                    return; //finished
                }
                self.data.currentName = newName;
                self.onRetrieve(function onRetrieved(){
                    console.log('retrieved')
                    self.render();
                    tinyMCE.activeEditor.focus();
                });

            };

            self.onNew = function onNew() {
                self.data.currentName = null ;
                self.data.currentName = Math.random();
                self.utils.setFocus()
                self.render();
            }
        }
        defineRemote();


        p.createUI = function createUI() {

            $('#divSaveArea').html('')
            var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br(); uiUtils.br();
            div.append('Name');
            uiUtils.br()
            uiUtils.addTextInput({
                text:'yeah',
                id:'txtNameOfDoc',
                onDebounce:function onChanged(newName) {
                    console.log('debouched', newName)
                    //return;
                    self.autoSave(false, onSaved_SaveWithNewName)

                    function onSaved_SaveWithNewName(){
                        console.debug('saved content');
                        self.onSave(onSaved_WithNewName_DeleteOldName, newName)
                    }

                    function onSaved_WithNewName_DeleteOldName(){
                        self.data.lastSaveName = self.data.currentName;
                        console.debug('delete old name', self.data.lastSaveName);
                        self.removeFile( self.data.lastSaveName, onRemovedOldFile)
                        self.data.currentName = newName;
                    }

                    function onRemovedOldFile(){
                        console.debug('complete')
                        self.getRecentPageList();
                    }

                }
            })
            self.data.ui.txtName = uiUtils.lastId();



            uiUtils.br()

            uiUtils.addSelect({
                text:'yeah',
                id:'ddPaper',
            })
            self.data.ui.recentPages = uiUtils.lastId();
            uiUtils.updateSelect('ddPaper', [1,2,3,4,5]);


            uiUtils.addSpace()
//uiUtils.addBtn()
            uiUtils.addBtn(
                {
                    text: 'Load',
                },
                function onRetrieve(){
                    var newName = uiUtils.getVal2(self.data.ui.recentPages);
                    console.log('onRetrieve',  newName);
                    //return;
                    self.autoSave(false, function onSaveDone(){
                        //self.data.lastSaveName = self.data.currentName;
                        //self.removeOldName( self.data.lastSaveName);
                        console.log('auto saved damn thing')
                        self.data.currentName = newName;
                        self.onRetrieve(function onRetrieved(){
                            console.log('saved and rerieved')
                            self.render();
                        });
                    });
                }
            )



            uiUtils.spacer();

            uiUtils.addBtn(
                {
                    text: 'Delete',
                },
                function onDelete(){
                    var newName = uiUtils.getVal2(self.data.ui.recentPages);
                    console.log('onDelete - remove from recents', newName);
                    self.autoSave(false, onSaveDone_RemoveFromList)
                    function onSaveDone_RemoveFromList(){
                        console.log('auto saved damn thing')
                        self.removeFile(newName, onRemovedFromList_UpdateUI)

                    };

                    function onRemovedFromList_UpdateUI(){
                        console.log('file removed, update ui')
                        if ( self.data.currentName != newName ) ;{
                            self.getRecentPageList();
                            return; //finished
                        }

                        self.getRecentPageList(self.haveNewListLoadFirstOne);

                    };
                }
            )


            uiUtils.spacer();
            uiUtils.addBtn(
                {
                    text: 'New',
                },
                function onNew(){
                    var newName = uiUtils.getVal2(self.data.ui.recentPages);
                    console.log('onNew - remove from recents', newName);
                    self.autoSave(false, onSaveDone_RemoveFromList)
                    function onSaveDone_RemoveFromList(){
                        console.log('auto saved ');
                       // self.removeFile(newName, onRemovedFromList_UpdateUI)

                        self.onNew();
                    }
                }
            )



            uiUtils.br()

            uiUtils.addBtn({
                text:'Test Save',
            }, self.onSaveTest)

            uiUtils.spacer();

            uiUtils.addBtn({
                text:'Test Retrieve',
            }, self.onRetrieveTest)

            uiUtils.spacer();

            uiUtils.addBtn({
                text:'Refresh',
            },  self.getRecentPageList);


            uiUtils.br(); uiUtils.br();

        }



        p.keyup = function onKeyup(content, e) {
            if ( content == '' ) {
                console.log('cleared')
                self.autoSave();
                self.data.currentName = null;
            }
            if ( self.data.currentName == null ) {
                self.data.currentName = Math.random()
                self.render();
            }
        }


        p.render = function render() {
            console.log('render', self.data.ui.txtName)
            uiUtils.setText(self.data.ui.txtName, self.data.currentName)
        }

        function createUtils() {
            p.utils = {};
            p.utils.setFocus = function setFocus() {
                tinyMCE.activeEditor.focus();
               // $("#mainContent").tinymce().focus();
                tinymce.execCommand('mceFocus',false,'mainContent');
                uiUtils.later( tinymce.execCommand, 'mceFocus',false,'mainContent')//;)
            }
        }
        createUtils()

        p.destroyTAS = function destroyTAS() {
            self.data.active = false;
        }
    }



    var t = new TASave()
    t.init()
    t.createUI();
    // t.getRecentPageList();
    if ( window.t) {
        window.t.destroyTAS()
    }
    window.t = t;


    function createNewOptions() {

        uiUtils.makeCheckbox({
            name:'showExtraControls',
            windowProp:'showExtraControls',
            tooltip:'Show additional controls for page and flow options ',
            label:'Show Ex Controls',
            defaultValue:true,
            fxChange:function onShowHideControls(setting) {
                console.log('change setting', setting, $('#newcontrols'))
                uiUtils.ifShow(setting, '#newcontrols')
            }
        })

        uiUtils.addSpace();
        uiUtils.addDiv('newcontrols')
        uiUtils.addBorder(); 
        uiUtils.makeInline(); 
        uiUtils.changeContainer();
        //uiUtils.addLabel('controls')
         uiUtils.addIcon('play-circle');
        uiUtils.makeCheckbox({name:'speakWhenNodeChanged',
            windowProp:'speakWhenNodeChanged',
            tooltip:'Speak when changed'});

        window.editSpeakDebouncer = uiUtils.debouncer(null, 'debounce name', 800); //window.speakCurrentNode)

        uiUtils.makeCheckbox({name:'showChangeWhenHere',
            windowProp:'showChangeWhenHere',
            tooltip:'Trace out change events',
            why: "change events are annoying"});


        uiUtils.makeCheckbox({name:'clickToGoToNextLine',
            windowProp:'clickToGoToNextLine',
            tooltip:'Click to go to next line'});




        //window.editSpeakDebouncer = uiUtils.debouncer(null, 'debounce name', 800); //window.speakCurrentNode)

        uiUtils.popContainer();

        uiUtils.addBtn({text:'play all', fxClick:function () {
            console.log('...sdf', 'play all')
            tHelper.playAllSentences();
        }})


    }
    createNewOptions();

}


bendIt()