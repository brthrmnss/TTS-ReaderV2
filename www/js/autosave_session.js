/**
 * Created by user1 on 1/1/2017.
 */

function bendIt () {


    console.log('...ddd')



    function TASave() {
        var self = this;
        self.data = {}
        self.data.ui = {};

        self.data.dbg = {};
        self.data.dbg.autosaving = false;
        var p = this;

        p.init = function init() {
            self.data.active = true;

            var instance = new JSONFileHelper();
            var config = {};
            config.file = 'recentThing';
            config.propUpsert = 'name';
            config.fxSave = self.onSavedList;
            instance.init(config);

            self.data.list = instance;
            self.createUI();
            self.onSavedList();

        }


        p.onSavedList = function onSavedList() {
            var vals = self.data.list.readFile();
            console.log('saved', vals)
            var str = JSON.stringify(vals, null, 2);
            uiUtils.setHtml(self.data.ui.txtPreviewList, str)
        }


        p.createUI = function createUI() {

            $('#divSaveArea').html('')
            var div = $('#divSaveArea');
            uiUtils.addDefaultCfg( {addTo:div} );


            uiUtils.br(); uiUtils.br();
            div.append('Example');



            uiUtils.br();

            uiUtils.addBtn(
                {
                    text: 'Add Top',
                },
                function onAddTop(){
                    self.data.list.upsertRecent({name: 'b', desc: '3'})
                }
            )

            uiUtils.addBtn(
                {
                    text: 'Add Random',
                },
                function onRetrieve(){
                    self.data.list.add({name: Math.random(), desc: '3'})
                }
            )


            uiUtils.addBtn(
                {
                    text: 'Remove Random',
                },
                function onRetrieve(){
                    var items = self.data.list.data.file
                        var item = items[Math.floor(Math.random()*items.length)];
                    self.data.list.removeRecent(item)
                }
            )


            uiUtils.addBtn(
                {
                    text: 'Clear',
                },
                function onRetrieve(){
                    self.data.list.clearRecentList()
                }
            )


            uiUtils.br()
            uiUtils.br()


            uiUtils.br()
            uiUtils.addDiv({
                text:'yeah',
                tag:'pre',
                id:'txtPreviewList',
            })
            self.data.ui.txtPreviewList = uiUtils.lastId();

            uiUtils.br()
            uiUtils.br()
            return;
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
    // t.getRecentPageList();
    if ( window.t) {
        window.t.destroyTAS()
    }
    window.t = t;


}


bendIt()