function fc(){

    function BindingUtil() {
        //why: binds to text inputs and checkboxes to variables on object
        //when 'render()' called, updates binding

        //domain
        //ui controls,
        //activte

        var self = this;
        var p = this;

        self.settings = {}
        self.data = {};

        p.init = function init(config) {
           /* $.each(config.bindings, function addBidning(b,c) {

            })*/
        }

        p.update = function update_ui2data() {
            $.each(self.settings.bindings, function pushValuesToUI(b,c) {
                self.data
            })
        }

        p.render = function render_data2ui() {
            $.each(self.settings.bindings, function pushValuesToUI(b,c) {

            })
        }

        p.addCheckbox = function addCheckbox(jquery, dataValue) {

        }

        p.addTextInput = function addTextInput(jquery, dataValue) {

        }

        p.updateTarget = function updateTarget(newTarget, dataValue) {
            //can redirect object pull and set values too
            self.data.targetDataObject = newTarget;
        }

    }
    window.BindingUtil = BindingUtil;
}


if ( $.isReady ) {
    setTimeout(fc, 5);
} else {
    $( document ).ready( fc ) ;
}

