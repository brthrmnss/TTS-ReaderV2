var TWP = window.TWP || {}; TWP.Status = TWP.Status || {}; TWP.Status.Identity = TWP.Status.Identity || {}; (function() { var env = "production"; wp_e2 = window.wp_e2 || {}; wp_e2.echo_version = "3.1"; var fileList = []; fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_css/65a4176fb3.css?_=26163&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_utils/c1b61e7ebc.js?_=6ce2e&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_core-production/499c2b4a02.js?_=053df&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_twp_plugins/1a4ed9a5cb.js?_=16fb5&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_controls-production/3f788937d5.js?_=ed269&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_wapo-production/6d91ec22a1.js?_=33d96&v=3.1");fileList.push("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_twpapp/0a94f055ec.js?_=0c474&v=3.1"); if (window.jQuery && typeof jQuery.cookie === 'undefined') { fileList.unshift("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_cookie/4cc3c1bef0.js?_=84594" ); } if (typeof jQuery === 'undefined') { fileList.unshift("//js.washingtonpost.com/pb/gr/c/javascript/rCVQKv1pAC5xap/twp-comments_jquery/c85562b39d.js?_=f1652" ); } (function() { var wpiInit = function() { wp_import.option('defer', false); wp_import.option('objectPreload', false); if ( TWP.Status.Identity && TWP.Status.Identity.status ) { ResourceBundle.when('pb-r-identity').then(function(){ console && console.time && console.time("Comments load"); wp_import(fileList) .always(function() { $(window.document).trigger('twp.page|comments.load.complete'); console && console.time && console.timeEnd("Comments load"); }) .fail(function(a, b) { try { console.error(a, b); } catch(e) { } }); }); } else { console && console.time && console.time("Comments load"); wp_import(fileList) .always(function() { $(window.document).trigger('twp.page|comments.load.complete'); console && console.time && console.timeEnd("Comments load"); }) } }; ;(function(b,h,c,a,g,e){function f(a,b){k(l,a[0],a[1],function(){b&& b()})}function k(a,b,c,e){var d=document.createElement("script");d. id=b;d.type="text/javascript";d.src=c;d.onreadystatechange=d.onload= function(){d.onreadystatechange=d.onload=null;e()};a.appendChild(d); a.parentNode.insertBefore(d,a)}var l=b.getElementsByTagName(c)[0];c= b.getElementById(a[0]);b=b.getElementById(g[0]);if(h.wp_import||c||b) {if("function"==typeof h.wp_import){e();return}if(c&&"loaded"!=c. readyState&&"complete"!=c.readyState){c.addEventListener("load", function(){e()});return}if(b&&"loaded"!=b.readyState&&"complete"!=b. readyState&&"undefined"==typeof jQuery){b.addEventListener("load", function(){a[1]=a[1].replace("%nd","");f(a,e)});return}}"undefined" ==typeof jQuery?(a[1]=a[1].replace("%nd",g[1]?"":"-nd"),g[1]?f(g, function(){f(a,e)}):f(a,e)):(a[1]=a[1].replace("%nd",""),f(a,e))})( document,window,"script",["wpi-js","//www.washingtonpost.com/pb/reso"+ "urces/wp_import/wp_import%nd.js"],window.wpiJquery||[],"undefined" !=typeof wpiInit?wpiInit:function(){}); })(); })();