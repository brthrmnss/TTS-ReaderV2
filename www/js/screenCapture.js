/*
 Capture screen of target div, and uploads
 */

function ScreenCapture() {
    var self = this;
    var p = this;

    p.init = function init() {

        var formToAdd = '<form method="POST" xonSubmit="captureForm()"'+
            'enctype="multipart/form-data"'+
            'action="http://127.0.0.1:6006/doUp2/"'+
            'id="myForm">'+
            '     <input type="hidden" name="img_val" id="img_val" value="" />'+
            '     </form>'

        var holder = $('<div></div>')
        holder.attr("id", 'screenCaptureHolder')
        $('#screenCaptureHolder').remove()
        holder.append($(formToAdd))
        $('body').append(holder)



    }

    p.capture =  function capture(target,data) {
        var config = {}
        if ( target.target ) {
            config = target
        }
        if ( config.target == null ) config.target = '#target';
        config.data = data;
        $( config.target).html2canvas({
            onrendered: function (canvas) {
                //Set hiddeen field's value to image data (base-64 string)
                $('#img_val').val(canvas.toDataURL("image/png"));
                //Submit the form manually
                /* document.getElementById('myForm').onsubmit=function() {
                 alert('hi');
                 return false;
                 }*/
                var d = document.getElementById("myForm").submit
                $('#myForm').submit(function (event) {
                    // sendContactForm();
                    console.log('go')
                    event.preventDefault();
                    console.log('go')
                    var formData = new FormData($(this)[0]);
                    // formData.name = 'd3'
                    $.each(data, function copyToFormData(k,v) {
                        formData.append(k, v)
                    })

                    //debugger;
                    $.ajax({
                        url: "http://127.0.0.1:6006/doUp2/",
                        type: 'POST',
                        data: formData,
                        async: true,
                        success: function (data) {
                            // alert(data)
                            if ( config.fx ) config.fx(config)
                        },
                        cache: false,
                        contentType: false,
                        processData: false
                    });


                    return false;
                });
                $('#myForm').submit()
                return;
            }
        });
    }


}

