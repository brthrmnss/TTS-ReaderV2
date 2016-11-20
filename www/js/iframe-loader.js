window.fxIframeLoader = function fxIframeLoader(){

    var helper = {};

    var $scope = window.$scope;
    window.helper = helper;


    function IFrameLoader() {
        var self = this;
        var p = this;

        self.settings = {};
        p.init = function init() {

            self.settings.target = '#col2divY'
            self.settings.testMode = true
            self.makeReadingList()
        }

        p.addUrlTxt= function addUrlTxt( ) {
            var txt = $("<input/>");
            txt.attr('id', 'txtUrl')

            txt.keypress(onChangedTextField);
            txt.on("paste", onChangedTextField2)
            function onChangedTextField(event) {
                if (event.which == 13) {
                    var url = txt.val();
                    // url = self.utils.testModeUrl(url)
                    var iframe = $('#iframeContent')
                    console.log('changed text')
                    iframe.attr('src', url);
                    $('#txtIframeLoaderStatus').html('loading...')
                }
            }

            function onChangedTextField2(event) {
                event.which = 13
                // debugger;
                onChangedTextField(event)
            }

            /* txt.on('change', function ch(event) {
             var url = txt.val();
             // url = self.utils.testModeUrl(url)
             var iframe = $('#iframeContent')
             console.log('changed text')
             iframe.attr('src', url);
             })*/
            $(self.settings.target).append(txt)
            var span = $("<span>&nbsp;</span>");
            $(self.settings.target).append(span)
            var span = $("<span/>");
            span.attr('id', 'txtIframeLoaderStatus')
            $(self.settings.target).append(span)
            // $('#col2div').append(iframe)
            // $("div").html("<iframe src='"+url+"'></iframe>");
        }
        p.addIframe= function addIframe(url, test) {
            url = self.utils.testModeUrl(url)
            var iframe = $("<iframe/>");
            iframe.attr('src', url);
            iframe.attr('id', 'iframeContent');

            iframe.css("min-width", "640px");
            iframe.css("min-height", "640px");
            iframe.css("width", "100%");
            iframe.css("height", "calc(100% - 30px)");
            iframe.attr("frameBorder", "0");
            iframe.attr('notKeep', "true")
            iframe.on("load", onIFrameLoaded )
            /* iframe.on("change", function () {
             alert('on change')
             } )
             iframe.on("load", function () {
             alert('on load')
             } )*/
            function onIFrameLoaded(event) {
                if (window.sentenceHelper)
                    window.sentenceHelper.data.fxSafetyFailToLoad = null;
                //TODO: If user presse play .. and nothing setup ... but is blank ... do a reload
                // alert('loading finish')
                //  alert(1);
                //if ( console.clear ) console.clear()
                var contents = iframe.contents().get(0)
                var innerHTML = contents.body.innerHTML;
                var script = $('<script></script>')
                //script.html("alert('dn')")
                $(contents.body).append(script)


                if ( window.sentenceHelper == null ) {
                    console.log('error not ready')
                    setTimeout(onIFrameLoaded,500, event)
                    return;
                }
                console.info('iframe loaded')
                $('#txtIframeLoaderStatus').html('ready')
                window.sentenceHelper.data.iframe = contents

                window.contextMenuHelper.addIframe(contents,url)

                var style = $('<style></style>')
                style.html(
                    "   <style>"+
                    ".highlight {"+
                    "/*injected from iframe-loader.js*/"+
                    "background-color: #FFC619;"+
                    "opacity: 0.9;"+
                    "}"
                )
                $(contents.body).append(style)


                /*$(contents.body).click(function clickToSetPosition (event) {
                 window.sentenceHelper.clickToSetPosition(event, true)
                 })*/

                self.processIFrame()
            };


            function createClickerLater() {
                $('#txtIframeLoaderStatus').click(function onClickReadyIcon() {
                    //why... damn thing taking too long or hung
                    onIFrameLoaded({})
                })
                var dbg = $('#txtIframeLoaderStatus')
            }

            setTimeout(createClickerLater, 500)

            //"<script src="js/list.js"></script>"
            $(self.settings.target).html('')
            self.addUrlTxt();
            $(self.settings.target).append($("<br/>"))
            $(self.settings.target).append(iframe)

            if (window.sentenceHelper)
                window.sentenceHelper.data.fxSafetyFailToLoad = onIFrameLoaded
            // $('#col2div').append(iframe)
            // $("div").html("<iframe src='"+url+"'></iframe>");
        }

        p.processIFrame= function processIFrame() {
            var iframe = $('#iframeContent');

            var contents = iframe.contents().get(0)
            var innerHTML = contents.body.innerHTML;

            var toDiv = $(contents.body)
            window.sentenceHelper.setupSentences(toDiv)
            //debugger;
            //console.log('changed text', contents, innerHTML)

        }

        p.utils = {};

        p.utils.testModeUrl= function testModeUrl(url, test) {
            if ( self.settings.testMode && url.indexOf('http') != 0 ) {
                url = "http://127.0.0.1:8080/js/articles/" + url
            }
            return url;
        }



        function handleIframes() {
            $('iframe[notKeep!="true"]').remove();

            function iframeReady() {
                var contents = $('iframe[notKeep="true"]').contents().get(0)
                if ( contents.body == null )
                    return; //warning function is called later
                var innerHTML = contents.body.innerHTML;

                t.iframeTouched = true
                //debugger;
                var html = $(innerHTML);

                if ( html.length == 0 ) {
                    console.log('iframe src 0')
                    return;
                }
                html.find('script').remove()
                html.find('noscript').remove()
                html = $.parseHTML(innerHTML)
                html = $(html)
                html.find('[class*="header"]').remove()
                html.find('[class*="sharebar"]').remove()
                html.find('[class*="share"]').remove()
                html.find('[class*="modal"]').remove()
                html.find('[class*="sections-nav"]').remove()
                html.find('[class*="logo"]').remove()
                html.find('[class*="tweet"]').remove()
                html.find('[class*="follow"]').remove()
                html.find('[class*="newsletter"]').remove()
                //does have commadn 'article-body')
                // html.
                //innerHTML = innerHTML.replace(/script/gi, 'script___');
                ///innerHTML = innerHTML.replace(/type="application\/javascript"/gi, 'app/noshow');
//debugger;
                innerHTML = html;


                //debugger;
                // $('#xIdFrame').html( innerHTML) ;
                $('#bookHolderContainer').html( innerHTML) ;
                window.xHTMLInner = innerHTML

                t.setupSentences();
                // onInit()
                // $('#xIdFrame').html( innerHTML) ;
            }
            $('iframe').ready(iframeReady);
            $('iframe').load( iframeReady );
            // iframeReady()

            setTimeout(function testIfIframeNeverLoaded()  {
                if ( t.iframeTouched != true )
                    iframeReady()
            }, 3000)
        }

        // handleIframes();



        function defineReadingList() {
            p.makeReadingList = function makeReadingList(sentence) {

                var values = [
                    {url:'https://news.ycombinator.com'},
                    {url:'http://google.com'},
                    {url:'http://gazebosim.org/tutorials'},
                    {url:'http://www.newyorker.com/magazine/2016/05/30/roy-kim-a-korean-idol-in-college'},
                    {url:'http://fivethirtyeight.com/features/why-women-are-no-longer-catching-up-to-men-on-pay/'},{url:'11111'}
                ]

                $.each(values, function ( k,v) {
                    v.text= v.url;
                })

                $('#col3_ReadingList').html('' +
                    '' +
                    '<div id="listArticles">' +

                    '<input class="search" placeholder="Search" />' +
                    '<button class="sort" data-sort="name">' +
                    'Sort' +
                    '</button>' +

                    '<ul class="list"></ul>' +

                    '</div>')
                /*width: 250px;
                 white-space: nowrap;
                 overflow: hidden;
                 text-overflow: ellipsis;
                 */
                var options = {
                    valueNames: [
                        'tag', 'text',
                        { name: 'url', attr: 'href' },
                    ],
                    item: '<li>' +
                    '<span class="tag"></span> ' +
                    '<div class="text" style="max-width: 100px; text-align: right;"></div> ' +
                    '<span class="name">name</span> ' +
                    '<button   href="http://javve.com" class="link url urlGoLink">read</button>'+
                    '<button   href="http://javve.com" class="link url">x</button>'+
                    '<p class="born"></p>' +
                    '</li>'
                };


                var userList = new List('listArticles', options, values);


                var txtNewArticle = $("<input/>");
                txtNewArticle.attr('id', 'txtNewArticle')

                txtNewArticle.keypress(onChangedTextField);
                txtNewArticle.on("paste", onChangedTextField2)
                function onChangedTextField(event) {
                    if (event.which == 13) {
                        var url = txtNewArticle.val();
                        console.log('changed text', url)
                        values = []
                        values.unshift({name:url, tag:url, url:url})
                        var userList = new List('listArticles', options, values);
                    }
                }
                function onChangedTextField2(event) {
                    event.which = 13
                    setTimeout(function waitTilPasteDone(){
                        onChangedTextField(event)
                    })

                }

                /*   debugger;
                 $(document).bind("click", function(event) {
                 var t = event.target;
                 debugger;
                 // document.getElementById("rmenu").className = "hideContextMenu";
                 });
                 */
                var fUtils = {};
                fUtils.changeToPage = function changeToPage(url) {
                    $("#txtUrl").val(url + '\n')
                    $('#txtUrl').trigger(jQuery.Event('keypress', {which: 13}));
                }

                fUtils.addItem = function addItem(url) {
                    var values = []
                    values.unshift({name:url, text:url, url:url})
                    var userList = new List('listWords', options, values);
                }

                $(document).click(function(e) {
                    var t = event.target;
                    t = $(t)
                    var href = $(t).attr('href')
                    if ( t.hasClass('urlGoLink') == false ) {
                        return
                    }
                    fUtils.changeToPage(href)
                    //debugger;
                });
                $('#col3_ReadingList').prepend(txtNewArticle)

            }
        }
        defineReadingList();



    }



    if ( self == top ) {
        var i = new IFrameLoader();
        //console.clear()
        var testMode = true;
        var mode2 = true
        if ( window.iframeLoader == null )
            window.iframeLoader  = 0 ;
        if ( mode2 && window.iframeLoader < 1 ) {
            //debugger;;
            window.iframeLoader++
            i.init()
            i.addIframe('simple.html', testMode);
            //i.addIframe('I Lived Like a Baller for a Month in Venezuela on Just £75 _ VICE _ United Kingdom.html', testMode)
        } else {
            //  debugger;
            i.processIFrame()
        }
    }
}

console.log('loaded file fxIframeLoader.js')


function onInit() {
    // debugger;
    window.fxIframeLoader();
    // doReady();
}
if ( $.isReady ) {
    //debugger;
    setTimeout(onInit, 5);
} else {
    $( document ).ready( onInit ) ;
}

 