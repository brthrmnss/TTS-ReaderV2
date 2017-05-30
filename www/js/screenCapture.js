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
                        success: function onSuccess(data) {
                            // alert(data)
                            console.log('uploaded ....')
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



function uploadPicture(data, name) {
    // sendContactForm();
    var cdata = {}
    cdata.data = data;
    cdata.name = name;
    //debugger;
    /*

     $.ajax({
     type: "POST",
     url: "script.php",
     data: {
     imgBase64: dataURL
     }
     }).done(function(o) {
     console.log('saved');
     // If you want the file to be visible in the browser
     // - please modify the callback in javascript. All you
     // need is to return the url to the file, you just saved
     // and than put the image in your browser.
     });

     */


    console.warn(
        'no uploading this picture'
    )



    return;


    curretnPage
    if ( currentPage != lastPage ) {
        window.picCount = 0
    }
    picCount ++

    var name = bookName = window.pickCount + '.png'

    $.ajax({
        url: "http://127.0.0.1:6006/doUp3/",
        type: 'POST',
        data: cdata,
        data : JSON.stringify(cdata),
        contentType : 'application/json',
        // async: true,
        success: function (data) {
            console.log('save', name)
            // alert(data)
            //if ( config.fx ) config.fx(config)
        },
        error: function onError(a,b,c) {
            console.error(a,b,c)
        },
        cache: false,
        //contentType: false,
        //contentType: 'json',
        processData: false
    });
}

window.uploadPicture = uploadPicture