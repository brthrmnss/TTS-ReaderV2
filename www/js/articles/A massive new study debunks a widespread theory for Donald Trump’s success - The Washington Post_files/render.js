
(function() {
  try {
    var socialTools = {
        myRoot: '.top-sharebar-wrapper',
        init: function() {
        	$('.pb-f-sharebars-top-share-bar').each(function(index, root) {
        		//vertical-sticky-top-sharebar has no mobile view
            	if (!TWPHead.desktop && !$(root).find('.top-sharebar-wrapper').data('pb-prevent-ajax') && $(root).find('.vertical-sticky-top-sharebar').size() == 0) {
            		var contentUriPath = $(root).find('.top-sharebar-wrapper').data('pb-canonical-url');
            		if (contentUriPath.indexOf('.washingtonpost.com') >= 0) {
            			$.ajax({
	        	            url:'/pb/api/v2/render/feature',
	        	            dataType:'json',
	        	            data: {
	        	            	id: $(root)[0].id,
	        	                uri: window.location.pathname,
	        	                contentUri: contentUriPath,
	        	                desktop: TWPHead.desktop,
	        	                mobile: TWPHead.mobile
	        	            },
	        	            cache:true,
	        	            jsonCallback:'wpTopShareBarAjax',
	        	            success:function(data) {
	        	            	$(root).empty();
	        	            	$(root).append($(data.rendering).children());
	        	            	socialTools.originalInit();
	        	            },
	        	            error:function(data){
	        	            	socialTools.originalInit();
	        	            }
	        	        });
            		} else {
            			socialTools.originalInit();
            		}
            		$(root).find('.top-sharebar-wrapper').data('pb-prevent-ajax','true');
            	} else {
            		socialTools.originalInit();
            	}
            });
        },
        originalInit: function(myRoot) {
            var self = this;
            myRoot = myRoot || this.myRoot;
            $myRoot = $(myRoot);

            //handle sticky behavior
            if ($myRoot.hasClass('sticky-top-sharebar')) {
            	stickyHorizontalShareBar.init();
            }

            $myRoot.each(function(index, myRootElement) {
            	//handle vertical-sticky behavior for each element that is vertical-sticky
            	if ($(myRootElement).hasClass('vertical-sticky-top-sharebar')) {
            		stickyVerticalShareBar.init($(myRootElement));
            	}
                if (wp_pb.StaticMethods.staticPostShare) {
                    wp_pb.StaticMethods.staticPostShare.init($(myRootElement), $(myRootElement).data('postshare'));
                }
                var $root = $(myRootElement),
                    $individualTool = $('.tool:not(.more, .read-later-bookmark, .read-later-list)', $root),
                    $socialToolsWrapper = $('.social-tools-wrapper', $root),
                    $socialToolsMoreBtn = $('.tool.more', $socialToolsWrapper),
                    $socialToolsAdditional = $('.social-tools-additional', $root),
                    width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
                    isMobile = (mobile_browser === 1 && width < 480) ? true : false;

                $socialToolsMoreBtn.off('click').on('click', this, function(ev) {
                    $socialToolsMoreBtn.hide();
                    $socialToolsAdditional.show('fast', function(ev) {
                        $root.addClass("expanded");
                        $('.social-tools', $socialToolsAdditional).animate({
                            "margin-left": 0
                        }, 4250);
                    }).addClass('more-open'); //end addtl show
                }); //end more click
                $individualTool.bind({
                    click: function(event) {
                        //event.stopPropagation();
                        var shareType = $(this).attr('class');
                        shareType = (typeof shareType != 'undefined') ? shareType.split(" ")[0].trim() : '';
                        self.trackTraffic('share.' + shareType, shareType + '_bar');
                    }
                });
                if (wp_pb && wp_pb.BrowserInfo && wp_pb.BrowserInfo.tablet) {
                    $root.addClass("tablet");
                }
                //vertical-sticky-top-sharebar has no mobile-view
                if (TWPHead.mobile && $root.find('.vertical-sticky-top-sharebar').size() > 0) {
                	var calcMobileIcons = function() {
                		var width = $root.find('.social-tools-wrapper').width()-5;
                		var shareIconWidth =  Math.ceil($root.find('.social-tools-primary .social-tools .tool').first().outerWidth(true));
                		$root.find('.social-tools-primary .social-tools .tool.more').hide();
                		var allShare  = $root.find('.social-tools-primary .social-tools .tool:not(.more), .social-tools-additional .social-tools .tool').hide();
                		if ($root.find('.social-tools-readlater').length > 0) {
                			width = width-Math.ceil($root.find('.social-tools-readlater').width());
                		}
                		var numShare = Math.floor(width/shareIconWidth);
                		for (var int = 0; int < allShare.length; int++) {
                			try {
                				if (int < numShare) {
                					$(allShare.get(int)).fadeIn();
                				} else {
                					$(allShare.get(int)).hide();
                				}
                			} catch (e) {
                			}
                		}
                	}
                	$( window ).resize(function() {
                		calcMobileIcons();
                	});
                	calcMobileIcons();
                } else {
                	$root.find('.social-tools-primary .social-tools .tool').fadeIn();
                }
                $root.removeClass("unprocessed");
            });
            if (typeof wp_pb.StaticMethods.initReadLater == 'function'){
            	wp_pb.StaticMethods.initReadLater($myRoot, 'top-share-bar');
            }
        },
        trackTraffic: function(name, eVar27) {
            if (typeof window.sendDataToOmniture === 'function') {
                var omnitureVars = {
                    "eVar1": (typeof window.s == 'object') && s && s.eVar1,
                    "eVar2": (typeof window.s == 'object') && s && s.eVar2,
                    "eVar8": (typeof window.s == 'object') && s && s.eVar8,
                    "eVar17": (typeof window.s == 'object') && s && s.eVar17,
                    "eVar27": eVar27
                };
                try {
                    sendDataToOmniture(name, 'event6', omnitureVars);
                } catch (e) {}
            }
        }
    };

    var stickyVerticalShareBar = {
    		init : function($myRoot) {
    			$myRoot.closest('.pb-f-sharebars-top-share-bar').insertBefore('#pb-root');
    			if (window.innerWidth > 992) {
    				//center vertically [+25px for half the header-v2]
	    			$myRoot.css({top: (($(window).height()-$myRoot.outerHeight()+25)/2)+'px'});
	    			$myRoot.animate({left: '-1px'});
	    			$(window).resize(function() {
	    				$myRoot.animate({top: (($(window).height()-$myRoot.outerHeight()+25)/2)+'px'},50);
	    			});
    			}
    			
                //handle content collision
                stickyVerticalShareBar.enableCollisionDetection($myRoot);
                wp_pb.register('sticky-vertical-sharebar', 'collides_with_main_content', function(collides) {
                    $myRoot.closest('.pb-f-sharebars-top-share-bar').css('opacity', collides ? '0' : '');
                });

    			//handle magnet strip
    			wp_pb.register('magnet', 'start_open', function(){
    				$myRoot.animate({top: (($(window).height()-$myRoot.outerHeight()+$('.pb-f-page-magnet .pb-module-area').height()+25)/2)+'px'},50);
    			});
    			wp_pb.register('magnet', 'start_close', function(){
    				$myRoot.animate({top: (($(window).height()-$myRoot.outerHeight()+25)/2)+'px'},50);
    			});
    			
    			//handle left-side hamburger menu
    			wp_pb.register('nav', 'menu_start_open', function(){
    				$myRoot.hide();
    				$myRoot.css('left', '-' + $myRoot.outerWidth() + 'px');
    			});
    			wp_pb.register('nav', 'menu_finish_close', function(){
    				if (window.innerWidth > 992) {
	    				setTimeout(function(){
	    					$myRoot.show();
	        				$myRoot.animate({left: '-1px'});
	    				}, 100);
    				}
    			});
    		},
            enableCollisionDetection: function(supported) {
                var INTERVAL_MS = 600;
                var MAX_INTERVALS = 3;
                var intervalCount = 0;

                return function($myRoot) {
                    var job;

                    if (!supported || intervalCount > MAX_INTERVALS) return;

                    job = setInterval(function() {
                        var $sb = $myRoot.closest('.pb-f-sharebars-top-share-bar');
                        var $sbw = $sb.find('.top-sharebar-wrapper');
                        var $mc = $('html').hasClass('gallery_story') ? $('.pb-f-gallery-gallery') : $('#main-content');
                        var oldcollides = $sb.data('__mccollides');
                        var newcollides = { 'value': undefined };

                        if ( !$sb.length || !$sbw.length || !$mc.length ) {
                            // kill interval since document no longer supports this feature
                            clearInterval(job);
                        } else {
                            newcollides.value = collision($mc[0], $sbw[0]);

                            if ( !oldcollides || newcollides.value !== oldcollides.value ) {
                                wp_pb.report('sticky-vertical-sharebar', 'collides_with_main_content', newcollides.value);
                                $sb.data('__mccollides', { 'value': newcollides.value });
                            }
                        }
                    }, INTERVAL_MS);

                    intervalCount++;

                    function collision(element1, element2) {
                        var rect1 = element1.getBoundingClientRect(),
                            rect2 = element2.getBoundingClientRect();

                        return !(
                            rect1.top > rect2.bottom ||
                            rect1.right < rect2.left ||
                            rect1.bottom < rect2.top ||
                            rect1.left > rect2.right
                        );
                    }
                }
            }( 'getBoundingClientRect' in document.documentElement )
    };

    var stickyHorizontalShareBar = {
        setElmTop: function($sharebarElm, y) {
            var style = y? 'translate3d(0px, ' + y + 'px, 0px)':'initial';
            $sharebarElm.css({
                'transform': style
            });
        },
        navMenuToggle: function($sharebarElm) {
            wp_pb.register('nav', 'finish_open', function() {
                this.setElmTop($sharebarElm, 0);
            }, this);
            wp_pb.register('nav', 'finish_close', function() {
                this.setElmTop($sharebarElm, -50);
            }, this);
            wp_pb.register('magnet', 'start_open', function() {
                //this.setElmTop($sharebarElm, 115);
            }, this);
        },
        fixedPosition: function($sharebarElm, sharebarTop) {
            var currentTop = $(window).scrollTop();
            if (currentTop > sharebarTop) {
                if (!$sharebarElm.hasClass('top-sharebar-fixed')) {
                    $sharebarElm.addClass('top-sharebar-fixed');
                    wp_pb.report('sticky-top-sharebar', 'sharebar_fixed', true);
                }
            } else {
                $sharebarElm.removeClass('top-sharebar-fixed');
                wp_pb.report('sticky-top-sharebar', 'sharebar_unfixed', true);
            }

            if ($(".shareBar-follow-modal").css('display') == 'block') {
                if ($('#wp-header').height() > 0) {
                    $(".shareBar-follow-modal").addClass('fixedModalNav').removeClass('fixedModal');
                } else {
                    $(".shareBar-follow-modal").addClass('fixedModal').removeClass('fixedModalNav');
                }
            }
        },
        moveOutOfRoot: function($sharebarElm) {
            //This is hacky!! Have to move leaderboard and sharebar outside of pb-root if it has max-width.
            var $pbRoot = $('#pb-root');
            if ($pbRoot.css('max-width') !== 'none') {
                var $sharebarRoot = $sharebarElm.parent();
                var $leaderboard = $('.pb-f-ad-leaderboard');
                $sharebarRoot.find('.sticky-top-sharebar').css('padding-top', '55px');
                $pbRoot.before($sharebarRoot);
                $pbRoot.before($leaderboard);
            }
        },
        detectMobileForSMS: function() {
            if (mobile_browser) {
                var shareString = '';
                if (windows_browser) {
                    shareString = 'sms://?body=';
                } else if (android_browser || android233_browser) {
                    shareString = 'sms:?body=';
                }

                if (shareString.length > 0) {
                    $('.pb-f-sharebars-top-share-bar .sms-share-device.unprocessed').each(function() {
                        $(this).attr('onclick', $(this).attr('onclick').replace(/sms:\?&body=/g, shareString));
                        $(this).removeClass('unprocessed');
                    });
                } else {
                    //iOS is used as default and does not require change
                    $('.pb-f-sharebars-top-share-bar .sms-share-device.unprocessed').removeClass('unprocessed');
                }
            }
        },
        init: function() {
            var $sharebarElm = $('.sticky-top-sharebar'),
                self = this;
            if (!$sharebarElm.length) return;
            this.moveOutOfRoot($sharebarElm);
            var sharebarTop = $sharebarElm.offset().top;
            var $header = $('#wp-header');
            if ($header.css('position') === 'fixed' && $(window).scrollTop() > sharebarTop) {
                this.fixedPosition($sharebarElm, sharebarTop);
            }
            $(window).off('scroll.sharebar').on('scroll.sharebar', function() {
                self.fixedPosition($sharebarElm, sharebarTop);
            });
            $(document).ready(function() {
                self.navMenuToggle($sharebarElm);
            });

            this.detectMobileForSMS();
        }
    };

    var userId = ((document.cookie.match(/wapo_login_id=([^;]+)/)) ? RegExp.$1 : '');
    var userSecureId = ((document.cookie.match(/wapo_secure_login_id=([^;]+)/)) ? RegExp.$1 : '');
    var userAgent = navigator.userAgent;

    var follow = {

        init: function() {

            var userSignedIn = (userId !== '') ? true : false,
                userApiUrl = "",
                jsonData = {},
                getUserData = true,
                followed = []; // Check which categories are followed

            $("#shareBar-follow").removeClass('hide');

            // Get user data
            if (userSignedIn) {
                userApiUrl = "https://follow.washingtonpost.com/Follow/api/user";
                jsonData = {
                    washPostId: userId,
                    wapoLoginID: userId,
                    wapoSecureID: userSecureId,
                    userAgent: userAgent
                };
            } else if (localStorage.getItem('wp_follow_modal_email')) {
                userApiUrl = "https://follow.washingtonpost.com/Follow/api/anonymous-user"; // TO DO change
                jsonData = {
                    emailId: localStorage.getItem('wp_follow_modal_email')
                };
            } else {
                getUserData = false; // Unanimous user, no data to fetch
            }

            if (getUserData) {

                $.ajax({
                    type: 'POST',
                    url: userApiUrl,
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(jsonData),
                    success: function(data) {
                        if (data.emailId) {
                            localStorage.setItem('wp_follow_modal_email', data.emailId);
                        }

                        if (data.tags) {
                            for (var i = 0, len = data.tags.length; i < len; i++) {
                                if (data.tags[i].type === 'category') {
                                    followed.push(data.tags[i].slug);
                                }
                            }
                        }

                        if (followed.indexOf($("#subtitle-follow").data('categorySlug')) >= 0) {
                            $("#shareBar-follow").addClass('following');
                            $("#shareBar-follow .followLbl").text('Following');
                        }
                    }
                });
            }

            // Click follow button
            $("#shareBar-follow").on('click', function() {
                var $this = $(this);
                var endpoint = ($this.hasClass('following') ? 'unfollow' : 'follow'),
                    categorySlug = $this.data('categorySlug'),
                    categoryTitle = $this.data('categoryTitle'),
                    position = {};

                position.top = 55;
                position.left = 650;

                function applyCallBack(data) {
                    // change button text
                    if (endpoint === 'follow')
                        $this.addClass('following').find('.followLbl').text('Following');
                    else
                        $this.removeClass('following').find('.followLbl').text('Follow');

                    // send omniture events
                    if (endpoint === 'follow') {
                        s.sendDataToOmniture('Follow', 'event103', {
                            eVar1: s.eVar1,
                            eVar2: s.eVar2,
                            eVar26: 'fl_sharebar_topic_' + categorySlug.replace(/-/g, '')
                        });
                    } else {
                        s.sendDataToOmniture('Unfollow', 'event104', {
                            eVar1: s.eVar1,
                            eVar2: s.eVar2,
                            eVar26: 'fl_sharebar_topic_' + categorySlug.replace(/-/g, '')
                        });
                    }
                }

                var data = {
                    categorySlug: categorySlug,
                    categoryTitle: categoryTitle,
                    signedIn: userSignedIn,
                    endpoint: endpoint,
                    callBack: applyCallBack
                };

                // Follow
                if (endpoint === 'follow') {
                    data.position = position;

                    if (localStorage.getItem('wp_follow_modal_seen') !== 'true' || !localStorage.getItem('wp_follow_modal_email')) {
                        var tagData = {
                            "tag": {
                                "slug": categorySlug,
                                "type": "category"
                            }
                        };

                        // Get pip description: TO DO this will be moved to site service later
                        $.ajax({
                            type: 'POST',
                            url: "https://follow.washingtonpost.com/Follow/api/tag",
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(tagData),
                            success: function(result) {
                                data.categoryDesc = result.tag.description;
                                follow.displayPip(data);
                            },
                            error: function(reason) {
                                follow.displayPip(data);
                            }
                        });
                    } else {
                        data.email = localStorage.getItem('wp_follow_modal_email');

                        follow.followApi(data);
                    }
                } else { // Unfollow
                    follow.unfollowApi(data);
                }

                return false;
            });

            if (typeof Hammer === 'function' && wp_pb.BrowserInfo.mobile_browser) {
                try {
                    var hammertime = new Hammer($('#shareBar-follow')[0], {
                        prevent_mouseevents: true
                    });
                    hammertime.on("tap", handleTap);
                } catch (err) {}
            }

            /* hammer.js tap */

            function handleTap(ev) {
                ev.gesture.preventDefault();
                ev.gesture.stopPropagation();
                $(ev.gesture.target).click();
                $(ev.gesture.target).blur();
            }

        },

        displayPip: function(data) {

            var modal = $('.shareBar-follow-modal');

            if (data.signedIn === false) {
                modal.find('.not-signed-In.before').removeClass('hide');
                modal.find('.not-signed-In.after').addClass('hide');
                modal.find('.signed-In').addClass('hide');

                if (localStorage.getItem('wp_follow_modal_email')) {
                    modal.find('#follow-modal-input').val(localStorage.getItem('wp_follow_modal_email'));
                }
            } else {
                modal.find('.not-signed-In').addClass('hide');
                modal.find('.signed-In').removeClass('hide');

                data.position.top += 20;
            }

            modal.find('.category-desc').text(data.categoryDesc ? data.categoryDesc : "");

            // set correct position
            modal.css('top', data.position.top);
            modal.css('left', data.position.left);

            if ($('#wp-header').css('position') === 'fixed') {
                if ($('#wp-header').height() > 0) {
                    modal.addClass('fixedModalNav');
                } else {
                    modal.addClass('fixedModal');
                }
            }

            modal.jqm({
                overlayClass: 'sharebar-follow-modal',
                overlay: 0,
                onHide: function(hash) {
                    modal.find('.sign-up').off('click');
                    modal.find('.follow-modal-close').off('click');
                    modal.find('.got-it').off('click');

                    hash.w.hide() && hash.o && hash.o.remove();
                    return true;
                }
            });

            // Close modal
            modal.find('.sign-up').click(function() {
                var email = modal.find('#follow-modal-input').val();
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

                if (email === '' || !re.test(email)) {
                    $(".invalid-email").show();
                } else {
                    $(".invalid-email").hide();
                    data.email = email;

                    localStorage.setItem('wp_follow_modal_email', email);

                    follow.followApi(data, function() {
                        modal.find('.not-signed-In.before').addClass('hide');
                        modal.find('.not-signed-In.after').removeClass('hide');
                    });
                }
            });

            modal.find('.follow-modal-close').click(function() {
                modal.jqmHide();
            });

            modal.find('.got-it').click(function() {
                modal.jqmHide();
            });

            if (data.signedIn) {
                follow.followApi(data, function() {
                    if (localStorage.getItem('wp_follow_modal_seen') !== 'true') {
                        modal.jqmShow();
                        localStorage.setItem('wp_follow_modal_seen', 'true');
                    }
                });
            } else {
                if (localStorage.getItem('wp_follow_modal_seen') !== 'true' || !localStorage.getItem('wp_follow_modal_email')) {

                    modal.jqmShow();

                    s.sendDataToOmniture('Follow', 'event101', {
                        eVar1: s.eVar1,
                        eVar2: s.eVar2,
                        eVar26: 'fl_sharebar_topic_' + data.categorySlug.replace(/-/g, '')
                    });

                    localStorage.setItem('wp_follow_modal_seen', 'true');
                } else {
                    data.email = localStorage.getItem('wp_follow_modal_email');

                    follow.followApi(data);
                }
            }
        },

        followApi: function(data, callBack) {
            var serviceBase = "https://follow.washingtonpost.com",
                jsonData = {
                    washPostId: userId,
                    tags: []
                };

            // user is not signed in
            if (data.email && data.signedIn === false) {
                serviceBase += "/Follow/api/anonymous-follow";

                jsonData.emailId = data.email;

                jsonData.tags = [{
                    slug: data.categorySlug,
                    type: 'category'
                }];
            } else {
                serviceBase += "/Follow/api/follow";

                jsonData.tags = [{
                    slug: data.categorySlug,
                    title: data.categoryTitle,
                    level: 1,
                    type: 'category'
                }];
            }

            $.ajax({
                type: 'POST',
                url: serviceBase,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(jsonData),
                success: function(result) {
                    if (result.status === true) {
                        data.callBack(data);
                        if (callBack) {
                            callBack();
                        }
                    }
                }
            });
        },

        unfollowApi: function(data) {
            var serviceBase = "https://follow.washingtonpost.com";

            var tags = [{
                slug: data.categorySlug,
                title: data.categoryTitle,
                level: 1,
                type: 'category'
            }];

            var jsonData = {
                washPostId: userId,
                wapoLoginID: userId,
                wapoSecureID: userSecureId,
                userAgent: userAgent,
                tags: tags
            };

            if (data.signedIn) {
                serviceBase += "/Follow/api/unfollow";
            } else {
                serviceBase += "/Follow/api/anonymous-unfollow";
                jsonData.emailId = localStorage.getItem('wp_follow_modal_email');
            }

            $.ajax({
                type: 'POST',
                url: serviceBase,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(jsonData),
                success: function(responce) {
                    if (responce.status === true && data.callBack)
                        data.callBack(responce);
                }
            });
        },

        localStorageAvailable: function() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    /**
     * Utilities START
     * Note: Same code in sharebars\utlity-bar
     */
    var textResizer = {
	    currIncrementMax: 9,
	    currIncrementUnit: 2,
	    currIncrementIndex: 0,
	    init: function(myRoot, resizeableElementList, clickElement) {
	        myRoot = myRoot || '#article-body article, .related-story, .liveblog-intro, #liveblog-story-list .description, #full-recipe .article-content';
	        resizeableElementList = resizeableElementList || 'p, li';
	        clickElement = clickElement || '.tool.textresizer';
	        this.root = $(myRoot);
	        this.resizeableElements = $(resizeableElementList, this.root);

	        // add "Next up" lable to the resizable element's list
	        if ($(".related-story").prev('h3').length > 0) {
	            this.resizeableElements.push($('.related-story').prev('h3'));
	            this.resizeableElements.push($('.related-story h4 a'));
	        }
	        $(clickElement).on('click', this, this.resize);
	    },
	    resize: function(event) {
	        var currObj = event.data;
	        if (currObj.currIncrementIndex == currObj.currIncrementMax) {
	            currObj.currIncrementIndex = 0;
	            currObj.currIncrementUnit = (currObj.currIncrementUnit == 2) ? -2 : 2;
	        }
	        currObj.currIncrementIndex = currObj.currIncrementIndex + 1;
	        currObj.resizeableElements.each(function() {
	            elm = $(this);
	            currSize = parseFloat(elm.css('font-size'), 5);
	            var result = currSize + currObj.currIncrementUnit;
	            elm.css('font-size', result);
	            wp_pb.report('textresizer', 'resized', result);
	        });
	    }
	};

	var trackTraffic = function(name) {
	    if (typeof window.sendDataToOmniture === 'function') {
	        var omnitureVars = {
	            "eVar1": (typeof window.s == 'object') && s && s.eVar1,
	            "eVar2": (typeof window.s == 'object') && s && s.eVar2,
	            "eVar8": (typeof window.s == 'object') && s && s.eVar8,
	            "eVar17": (typeof window.s == 'object') && s && s.eVar17,
	            "eVar27": name
	        };
	        try {
	            sendDataToOmniture(name + '.click', 'event6', omnitureVars);
	        } catch (e) {}
	    }
	};
	$('.social-tools-wrapper .tool.textresizer, .social-tools-wrapper .tool.print').bind('click', function() {
	    var name = $(this).attr('class').split(" ")[0].trim();
	    trackTraffic(name);
	});

    /**
     * Utilities END
     */

    // Turn off the experience

    // $(window.document).on('abtest-ready', function(e, ABT) {

    //     var test = ABT.get('follow-powerPostTop');

    //     if (test.is('sharebar')) {
    //         follow.init();
    //     }
    // });

    window.TWP = TWP || {};
    TWP.SocialTools = TWP.SocialTools || socialTools;
    TWP.SocialTools.init();

    TWP.TextResizer = TWP.TextResizer || textResizer;
    TWP.TextResizer.init();

    var tablet = isMobile.tablet();

    window.VisitorSegment && VisitorSegment('tablet', function() {
        return (tablet && $(window).width() > 768);
    });

    /*
     * POPOUT code for later var $article = $('#article-topper'); // START:
     * Social share pop-out var $socialToolsMoreBtn = $('.social-tools
     * .more',$article), $socialToolsPopOut =
     * $('.social-tools.pop-out',$article) ;
     * $socialToolsMoreBtn.on('click',function(ev){ var targetTop =
     * $socialToolsMoreBtn.position().top +
     * $socialToolsMoreBtn.outerHeight()-1-14; var targetLeft =
     * $socialToolsMoreBtn.position().left-1-3;
     * $socialToolsPopOut.css({"top":targetTop,"left":targetLeft});
     * $socialToolsPopOut.toggle(); });
     * $socialToolsPopOut.on('mouseout',function(ev){
     * $socialToolsPopOut.toggle(); }); // END: Social share pop-out
     */

  } catch (err) {
  }
})();

(function($,TWP,undefined){var AD_LOAD_TIMER=2E3;var AD_MIN_VISIBLE=4E3;var AD_HEIGHT_LIMITED=150;var ANIM_SPEED=250;var console=new TWP.Tools.logger("leaderboard");if($(".layout_article #pb-root .pb-f-ad-leaderboard.full").length){var $leaderboard=$(".pb-f-ad-leaderboard");$("#pb-root").before($leaderboard)}var applyStickiness=function(){var isLoginUser=document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:"";if(wp_pb.BrowserInfo&&wp_pb.BrowserInfo.tablet||isLoginUser)return;$(function(){var $html=
$("html"),$feature=getFeature().find(".leaderboard"),$window=$(window),timer,slotId="slug_leaderboard",$slotAd=$feature.find("#"+slotId),$closeBtn=$feature.find(".leaderboard-close");if(!$feature.length)return;function removeSticky(){setTimeout(function(){console.log("remove sticky leaderboard.");$feature.slideUp(ANIM_SPEED,function(){$html.removeClass("lb-persist-top-true");$feature.slideDown(ANIM_SPEED)})},AD_MIN_VISIBLE)}function applySticky(){if($window.scrollTop()>100)$html.addClass("lb-persist-top-true");
else $html.removeClass("lb-persist-top-true")}function bindEvents(){$window.on("scroll.lb-sticky",function(e){e.stopPropagation();applySticky();var bnbHeight=$(".pb-f-page-breaking-news-bar .breaking-news-bar").outerHeight();if(bnbHeight>0){$feature.addClass("pb-has-breaking-news");$feature.css("margin-top",bnbHeight+"px");wp_pb.register("breakingnews","close",function(){$feature.removeClass("pb-has-breaking-news");$feature.css("margin-top","")})}});wp_pb.register("nav","finish_open",function(){$feature.removeClass("pb-navheader-hidden")});
wp_pb.register("nav","finish_close",function(){$feature.addClass("pb-navheader-hidden")});$closeBtn.on("click.lb-sticky",function(e){AD_MIN_VISIBLE=0;afterLoaded();if(typeof window.sendDataToOmniture==="function"){var data={pageName:window.wp_page_name,eVar1:window.wp_page_name,prop2:window.wp_subsection,eVar2:window.wp_channel,prop3:window.wp_content_type,eVar17:window.wp_content_type,eVar26:"leaderboard-close"};sendDataToOmniture("leaderboard-close","event80",data)}})}function afterLoaded(){var $featureContainer=
getFeature();if($feature.height()>$featureContainer.outerHeight())$featureContainer.height($feature.height()+30);$feature.addClass("leaderboard-ad-loaded");$window.off("scroll.lb-sticky");if($html.hasClass("lb-persist-top-true"))removeSticky()}function afterAdInserted(){timer=setTimeout(function(){console.log("from second timeout: prevent ad load fail.");afterLoaded()},7E3);if(window.googletag&&googletag.pubadsReady)googletag.pubads().addEventListener("slotRenderEnded",function(event){console.log("ad slot: "+
event.slot.getSlotElementId()+" inserted success");if(event.slot.getSlotElementId()===slotId){clearTimeout(timer);setTimeout(function(){console.log("leaderboard ad load success.");afterLoaded()},AD_LOAD_TIMER)}})}applySticky();bindEvents();setTimeout(function(){$closeBtn.addClass("fa-remove")},8E3);if($slotAd.children().length)timer=setTimeout(function(){console.log("from first timeout: if ad is already loaded");afterLoaded()},AD_LOAD_TIMER);$feature.on("DOMNodeInserted",function(e){var $el=$(e.target),
id=$el.attr("id");if($el.is("iframe")&&id&&!/(hidden)/g.test(id)){clearTimeout(timer);$feature.off("DOMNodeInserted");afterAdInserted()}});$feature.on("disableSticky.lb-sticky",function(e){clearTimeout(timer);$window.off("scroll.lb-sticky");$feature.off("DOMNodeInserted");$html.removeClass("lb-persist-top-true");TWP.Features.Ad.Leaderboard.sticky=false})})};if(!!TWP.Features.Ad.Leaderboard.sticky)applyStickiness();if(!!TWP.Features.Ad.Leaderboard.belowSharebar)applySharebarPosition();$(window.document).on("abtest-ready",
function(e,ABT){var test=ABT.get("ads-leaderboard");getFeature().attr("moat-test-id",[getFeature().attr("moat-id")||"unknown/unknown",test.name||"control"].join("-"));if(test.is("below_sharebar"))applySharebarPosition();if(test.is("sticky"))applyStickiness()});function applySharebarPosition(){var $leaderboard=getFeature();var $shareBar=getSharebar();$leaderboard.addClass("after-sharebar-leaderboard");return $leaderboard.insertAfter($shareBar)}function getFeature(){return $(".pb-f-ad-leaderboard")}
function getSharebar(){return $(".pb-f-sharebars-top-share-bar")}})(jQuery,TWP);
(function($){try{var $w=$(window);var feature={remarryHeadlines:function(){var remarryHeadlinesSelector=".pb-f-article-article-topper h1";try{wp_pb.StaticMethods.remarryHeadline(remarryHeadlinesSelector)}catch(e){}},init:function(){this.remarryHeadlines()}};var userId=document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:"";var userSecureId=document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:"";var userAgent=navigator.userAgent;if($("#article-topper #slug_tiffany_tile:visible").length){$("#topper-headline-wrapper").addClass("col-sm-8").removeClass("col-sm-12");
$("#topper-headline-wrapper").addClass("col-lg-9").removeClass("col-lg-12")}function initAlignToggle(){if($(".header-tool")!==undefined&&$(".header-tool").length>0)if($(".header-tool").position().left==0)$(".header-tool").css("margin-left","0");else $(".header-tool").css("margin-left","30px")}initAlignToggle();$(window).resize(initAlignToggle);var langdivs=$('span[id^\x3d"translate-text-"]').hide(),divi=0;(function cycle(){langdivs.eq(divi).fadeIn("slow").delay(3E3).fadeOut("slow",cycle);divi=++divi%
langdivs.length})();function initToggle(){var $toggleOption=$(".header-wp-language-button");$toggleOption.click(function(e){var $this=$(".header-lang-dropdown");if($this.hasClass("wp-language-button-clicked")){$this.removeClass("wp-language-button-clicked");$toggleOption.removeClass("wp-language-button-clicked-wrapper");$(".header-tool").removeClass("header-tool-selected")}else{$this.addClass("wp-language-button-clicked");$toggleOption.addClass("wp-language-button-clicked-wrapper");$(".header-tool").addClass("header-tool-selected")}});
$(document).click(function(e){var target=e.target;if(!$(target).is(".header-wp-language-button")&&!$(target).parents().is(".header-wp-language-button")){$(".header-lang-dropdown").removeClass("wp-language-button-clicked");$(".header-wp-language-button").removeClass("wp-language-button-clicked-wrapper");$(".header-tool").removeClass("header-tool-selected")}})}initToggle();var follow={init:function(){var userSignedIn=userId!==""?true:false,userApiUrl="",jsonData={},getUserData=true,followed=[];$("#subtitle-follow").removeClass("hide");
if(userSignedIn){userApiUrl="https://follow.washingtonpost.com/Follow/api/user";jsonData={washPostId:userId,wapoLoginID:userId,wapoSecureID:userSecureId,userAgent:userAgent}}else if(follow.localStorageAvailable()&&localStorage.getItem("wp_follow_modal_email")){userApiUrl="https://follow.washingtonpost.com/Follow/api/anonymous-user";jsonData={emailId:localStorage.getItem("wp_follow_modal_email")}}else getUserData=false;if(getUserData)$.ajax({type:"POST",url:userApiUrl,contentType:"application/json",
dataType:"json",data:JSON.stringify(jsonData),success:function(data){if(follow.localStorageAvailable()&&data.emailId)localStorage.setItem("wp_follow_modal_email",data.emailId);if(data.tags)for(var i=0,len=data.tags.length;i<len;i++)if(data.tags[i].type==="category")followed.push(data.tags[i].slug);if(followed.indexOf($("#subtitle-follow").data("categorySlug"))>=0){$("#subtitle-follow").addClass("following");$("#subtitle-follow .followLbl").text("Following")}}});$("#subtitle-follow").on("click",function(){var $this=
$(this);var endpoint=$this.hasClass("following")?"unfollow":"follow",categorySlug=$this.data("categorySlug"),categoryTitle=$this.data("categoryTitle"),position={};position.top=35;position.left=485;function applyCallBack(data){if(endpoint==="follow")$this.addClass("following").find(".followLbl").text("Following");else $this.removeClass("following").find(".followLbl").text("Follow");if(endpoint==="follow")s.sendDataToOmniture("Follow","event103",{eVar1:s.eVar1,eVar2:s.eVar2,eVar26:"fl_top_topic_"+categorySlug.replace(/-/g,
"")});else s.sendDataToOmniture("Unfollow","event104",{eVar1:s.eVar1,eVar2:s.eVar2,eVar26:"fl_top_topic_"+categorySlug.replace(/-/g,"")})}var data={categorySlug:categorySlug,categoryTitle:categoryTitle,signedIn:userSignedIn,endpoint:endpoint,callBack:applyCallBack};if(endpoint==="follow"){data.position=position;if(follow.localStorageAvailable()&&(localStorage.getItem("wp_follow_modal_seen")!=="true"||!localStorage.getItem("wp_follow_modal_email"))){var tagData={"tag":{"slug":categorySlug,"type":"category"}};
$.ajax({type:"POST",url:"https://follow.washingtonpost.com/Follow/api/tag",contentType:"application/json",dataType:"json",data:JSON.stringify(tagData),success:function(result){data.categoryDesc=result.tag.description;follow.displayPip(data)},error:function(reason){follow.displayPip(data)}})}else{data.email=follow.localStorageAvailable()?localStorage.getItem("wp_follow_modal_email"):"";follow.followApi(data)}}else follow.unfollowApi(data);return false});if(typeof Hammer==="function"&&wp_pb.BrowserInfo.mobile_browser)try{var hammertime=
new Hammer($("#subtitle-follow")[0],{prevent_mouseevents:true});hammertime.on("tap",handleTap)}catch(err){}function handleTap(ev){ev.gesture.preventDefault();ev.gesture.stopPropagation();$(ev.gesture.target).click();$(ev.gesture.target).blur()}},displayPip:function(data){var modal=$(".subTitle-follow-modal");if(data.signedIn===false){modal.find(".not-signed-In.before").removeClass("hide");modal.find(".not-signed-In.after").addClass("hide");modal.find(".signed-In").addClass("hide");if(follow.localStorageAvailable()&&
localStorage.getItem("wp_follow_modal_email"))modal.find("#follow-modal-input").val(localStorage.getItem("wp_follow_modal_email"))}else{modal.find(".not-signed-In").addClass("hide");modal.find(".signed-In").removeClass("hide");data.position.top+=20}modal.find(".category-desc").text(data.categoryDesc?data.categoryDesc:"");modal.css("top",data.position.top);modal.css("left",data.position.left);modal.jqm({overlayClass:"article-topper-follow-modal",overlay:0,onHide:function(hash){modal.find(".sign-up").off("click");
modal.find(".follow-modal-close").off("click");modal.find(".got-it").off("click");hash.w.hide()&&hash.o&&hash.o.remove();return true}});modal.find(".sign-up").click(function(){var email=modal.find("#follow-modal-input").val();var re=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;if(email==""||!re.test(email))$(".invalid-email").show();else{$(".invalid-email").hide();data.email=email;if(follow.localStorageAvailable())localStorage.setItem("wp_follow_modal_email",email);follow.followApi(data,function(){modal.find(".not-signed-In.before").addClass("hide");
modal.find(".not-signed-In.after").removeClass("hide")})}});modal.find(".follow-modal-close").click(function(){modal.jqmHide()});modal.find(".got-it").click(function(){modal.jqmHide()});if(data.signedIn)follow.followApi(data,function(){if(follow.localStorageAvailable()&&localStorage.getItem("wp_follow_modal_seen")!=="true"){modal.jqmShow();localStorage.setItem("wp_follow_modal_seen","true")}else modal.jqmShow()});else if(follow.localStorageAvailable()&&(localStorage.getItem("wp_follow_modal_seen")!==
"true"||!localStorage.getItem("wp_follow_modal_email"))){modal.jqmShow();s.sendDataToOmniture("Follow","event101",{eVar1:s.eVar1,eVar2:s.eVar2,eVar26:"fl_top_topic_"+data.categorySlug.replace(/-/g,"")});localStorage.setItem("wp_follow_modal_seen","true")}else{if(follow.localStorageAvailable())data.email=localStorage.getItem("wp_follow_modal_email");follow.followApi(data)}},followApi:function(data,callBack){var serviceBase="https://follow.washingtonpost.com",jsonData={washPostId:userId,tags:[]};if(data.email&&
data.signedIn==false){serviceBase+="/Follow/api/anonymous-follow";jsonData.emailId=data.email;jsonData.tags=[{slug:data.categorySlug,type:"category"}]}else{serviceBase+="/Follow/api/follow";jsonData.tags=[{slug:data.categorySlug,title:data.categoryTitle,level:1,type:"category"}]}$.ajax({type:"POST",url:serviceBase,contentType:"application/json",dataType:"json",data:JSON.stringify(jsonData),success:function(result){if(result.status==true){data.callBack(data);if(callBack)callBack()}}})},unfollowApi:function(data){var serviceBase=
"https://follow.washingtonpost.com";var tags=[{slug:data.categorySlug,title:data.categoryTitle,level:1,type:"category"}];var jsonData={washPostId:userId,wapoLoginID:userId,wapoSecureID:userSecureId,userAgent:userAgent,tags:tags};if(data.signedIn)serviceBase+="/Follow/api/unfollow";else{serviceBase+="/Follow/api/anonymous-unfollow";jsonData.emailId=localStorage.getItem("wp_follow_modal_email")}$.ajax({type:"POST",url:serviceBase,contentType:"application/json",dataType:"json",data:JSON.stringify(jsonData),
success:function(responce){if(responce.status==true&&data.callBack)data.callBack(responce)}})},localStorageAvailable:function(){var test="test";try{localStorage.setItem(test,test);localStorage.removeItem(test);return true}catch(e){return false}}};var tablet=isMobile.tablet();window.VisitorSegment&&VisitorSegment("tablet",function(){return tablet&&$(window).width()>768});window._essentials_onrender=function(Essentials){var $target=$("#essentials-topper");var name=Essentials.name;var data=Essentials.data;
var pdata=Essentials.getPersistentData();var status=pdata[Essentials.contentPath];var count=!!name&&!!data?data.results.length:undefined;var tcount;if(!!Essentials.name&&$(".cf-essentials-module").length!=0){$target.show();$(function(){if(count){switch(count){case 1:tcount="One";break;case 2:tcount="Two";break;case 3:tcount="Three";break;case 4:tcount="Four";break;case 5:tcount="Five";break;default:tcount="";break}$(('\x3ch2\x3e\x3cspan class\x3d"status vg-check status-icon status-%s"\x3e\x3c/span\x3e '+
'\x3cspan class\x3d"status-count"\x3e'+tcount+" Essentials\x3c/span\x3e "+'\x3cspan class\x3d"status-kicker"\x3e%k\x3c/span\x3e'+"\x3c/h2\x3e").replace("%s","undefined"==typeof status?"scroll":"read").replace("%k",data.kicker.text)).appendTo($target);$target.on("click.essentials-topper",function(e){wp_pb.report("essentials-topper","click",{$target:$target});wp_pb.report("essentials","scrollto",{$from:$target})})}})}}}catch(err){}})(jQuery);
(function($){})(jQuery);
(function($){var $article=$("#article-body"),$d=$(document),$w=$(window),$b=$("body");if($(".layout_article #pb-root .pb-f-article-article-topper .headline-kicker").length){var $kicker=$(".pb-f-article-article-topper .headline-kicker").clone();$(".layout_article #pb-root .pb-f-article-article-body .pb-timestamp").before($kicker)}window.cr_on=false;$("iframe[data-src]",$article).each(function(i){var $this=$(this);$this.attr("src",$this.attr("data-src"))});$("#about-the-authors").click(function(e){var $this=
$(this);var $container=$this.closest(".multi-author-bio");if(!!$container){if($container.hasClass("open"))$container.removeClass("open").addClass("closed");else $container.removeClass("closed").addClass("open");wp_pb.report("global","domChanged")}});var $tables=$("div.extra table",$article);$tables.each(function(){var $table=$(this),$bars=$(".barchart",$table),longestBar=0;$bars.each(function(i){var $bar=$(this),w=$bar.attr("width");if(!isNaN(w)){w=w*1;longestBar=w>longestBar?w:longestBar}});$bars.each(function(i){var $bar=
$(this),w=$bar.attr("width");if(!isNaN(w)){w=w*1;var scale=$article.width()>480?.85:.75;relativeWidth=scale*(Math.ceil(100*(w/longestBar)*100)/100);$bar.css("width",relativeWidth+"%")}})});$(".pb-f-gallery-gallery",$article).each(function(i){var $gallery=$(this).children("div:first");var $gtitle=$gallery.attr("data-title");var $gurl=$gallery.attr("data-permalink");var $guuid=$gallery.attr("data-uuid");if($gurl.indexOf("js.")>-1)var $gurl=$gurl.replace("js.","www.");var $genctitle=encodeURI($gtitle);
var $gencurl=encodeURI($gurl);var $gmain=$gallery.find(".wp-volt-gal-main");var $gheadline=$gallery.find(".wp-volt-gal-embed-promo-top");var $gpromotop=$gallery.find(".wp-volt-gal-embed-promo-top span.cell");if($gtitle&&$gurl){$gheadline.html('\x3ch3 class\x3d"promo-top-title"\x3e'+$gpromotop.html()+"\x3c/h3\x3e");var gshare='\x3cspan class\x3d"wp-article-sharing"\x3e\x3cspan class\x3d"wp-tooltip-button wp-article-embed"\x3e\x3cspan class\x3d"title"\x3eEmbed\x3c/span\x3e\x3ci class\x3d"fa fa-code icon-code"\x3e\x3c/i\x3e\x3cspan class\x3d"wp-tooltip"\x3e\x3cspan class\x3d"wp-sharing-copy"\x3e\x3cspan class\x3d"wp-sharing-copy-input-wrap"\x3e\x3cinput type\x3d"text" class\x3d"wp-sharing-copy-input" value\x3d"\x3ciframe width\x3d\'480\' height\x3d\'700\' scrolling\x3d\'no\' src\x3d\''+
$gurl+'?_template\x3dgallery-embed\' frameborder\x3d\'0\' webkitallowfullscreen mozallowfullscreen allowfullscreen\x3e\x3c/iframe\x3e"\x3e\x3c/span\x3e\x3cspan class\x3d"wp-sharing-copy-button"\x3eCopy\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"wp-tooltip-button wp-article-social"\x3e\x3cspan class\x3d"title"\x3eShare\x3c/span\x3e\x3ci class\x3d"fa fa-share icon-share-alt"\x3e\x3c/i\x3e\x3cspan class\x3d"wp-tooltip"\x3e\x3ci class\x3d"wp-sharing-button fa fa-facebook icon-facebook"\x3e\x3c/i\x3e\x3ci class\x3d"wp-sharing-button fa fa-twitter icon-twitter"\x3e\x3c/i\x3e\x3ci class\x3d"wp-sharing-button fa fa-google-plus icon-google-plus"\x3e\x3c/i\x3e\x3ca class\x3d"wp-sharing-button-email" href\x3d"mailto:?subject\x3d'+
$genctitle+" from The Washington Post\x26body\x3d"+$gencurl+'%3Ftid\x3dss_mail"\x3e\x3ci class\x3d"fa fa-envelope"\x3e\x3c/i\x3e\x3c/a\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e';$(gshare).insertAfter($gmain);var $facebook=$gallery.find(".fa-facebook");$facebook.click(function(){var shareWindow=window.open("https://www.facebook.com/sharer/sharer.php?u\x3d"+$gencurl+"%3Ftid\x3dss_fb","share_facebook","width\x3d658,height\x3d354,scrollbars\x3dno");return false});var $twitter=$gallery.find(".fa-twitter");
$twitter.click(function(){var shareWindow=window.open("https://twitter.com/share?url\x3d"+$gencurl+"%3Ftid\x3dss_tw\x26text\x3d"+$genctitle,"share_twitter","width\x3d550,height\x3d350,scrollbars\x3dno");return false});var $google=$gallery.find(".fa-google-plus");$google.click(function(){var shareWindow=window.open("https://plus.google.com/share?url\x3d"+$gencurl+"%3Ftid\x3dss_gp","share_google-plus","width\x3d832,height\x3d472,scrollbars\x3dno");return false});var $copybtn=$gallery.find(".wp-sharing-copy-button");
$copybtn.click(function(event){event.stopPropagation();$(event.currentTarget).parent().find(".wp-sharing-copy-input").select();try{document.execCommand("copy")}catch(err){}})}});function initToggle(){var $toggleOption=$(".wp-tooltip-button");$toggleOption.click(function(e){var $this=$(this);if($(e.target).is("span")||$(e.target).is("i.wp-sharing-button")||$(e.target).is("i.icon-envelope")||$(e.target).is("input")){e.preventDefault();return}else if($(this).hasClass("wp-tooltip-button-clicked"))$this.removeClass("wp-tooltip-button-clicked");
else{$toggleOption.filter(".wp-tooltip-button-clicked").removeClass("wp-tooltip-button-clicked");$this.addClass("wp-tooltip-button-clicked")}})}initToggle();var hasResizableIframe=false;$("iframe[width][height]",$article).each(function(i){var $iframe=$(this),w=$iframe.attr("width"),h=$iframe.attr("height");if(!isNaN(w)&&!isNaN(h)){$iframe.attr("data-aspect-ratio",w/h);if($iframe.attr("width")!=$article.width()){var hFudgeFactor=!!$iframe.attr("src")&&$iframe.attr("src").match(/instagram.com/)?40:
0;$iframe.attr("width",Math.round($article.width()));$iframe.attr("height",Math.round($article.width()/$iframe.attr("data-aspect-ratio"))+hFudgeFactor)}if(!hasResizableIframe){hasResizableIframe=true;$w.resize(function(ev){$("iframe[data-aspect-ratio]",$article).each(function(i){var $ifr=$(this);hFF=!!$iframe.attr("src")&&$iframe.attr("src").match(/instagram.com/)?40:0;$ifr.attr("width",Math.round($article.width()));$ifr.attr("height",Math.round($article.width()/$ifr.attr("data-aspect-ratio"))+hFF)})})}}});
$("audio").each(function(){if(!!$(this).find("source")[0]){var audioSrc=$(this).find("source")[0].src;var audioId=$(this)[0].id;$(this).replaceWith('\x3cdiv class\x3d"audio-wrapper" id\x3d"'+audioId+'"\x3e\x3caudio preload\x3d"none"\x3e\x3csource src\x3d"'+audioSrc+'" type\x3d"audio/mp3" /\x3e\x3ca href\x3d"'+audioSrc+'"\x3e'+audioSrc+'\x3c/a\x3e\x3c/audio\x3e\x3cdiv class\x3d"audio-player"\x3e\x3cdiv class\x3d"play-button play"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress-bar"\x3e\x3cdiv class\x3d"elapsed-bar"\x3e\x3c/div\x3e\x3cdiv class\x3d"playhead"\x3e\x3c/div\x3e\x3cdiv class\x3d"time"\x3e \x3cspan class\x3d"elapsed-time"\x3e00:00\x3c/span\x3e / \x3cspan class\x3d"total-time"\x3e00:00\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e')}});
$(".audio-wrapper").each(function(){var $this=$(this);var $audio=$this.find("audio");var audio=$audio[0];var $audioPlayer=$this.find(".audio-player");var $playButton=$audioPlayer.find(".play-button");var $progressBar=$audioPlayer.find(".progress-bar");var $elapsedBar=$audioPlayer.find(".elapsed-bar");var $playhead=$audioPlayer.find(".playhead");var $time=$progressBar.find(".time");var $elapsedTime=$time.find(".elapsed-time");var $totalTime=$time.find(".total-time");var duration;$audio.on("loadedmetadata",
function(){duration=audio.duration;$totalTime.text(formatDuration(duration))});$audio.trigger("load");var playheadWidth=$playhead.outerWidth();var progressBarWidth=$progressBar.outerWidth();var progressBarLeft=$progressBar.offset().left;var firstPlayed=false;var dragging=false;var draggingWhilePaused=false;$playButton.click(function(){if(audio.paused){audio.play();$(this).removeClass("play").addClass("pause");if(firstPlayed==false){firstPlayed=true;$playhead.show()}}else{audio.pause();$(this).removeClass("pause").addClass("play")}});
$audio.on("timeupdate",audioUpdate);$w.on("resize",function(){progressBarWidth=$progressBar.outerWidth();progressBarLeft=$progressBar.offset().left;audioUpdate()});$progressBar.on("mousedown",function(e){if(e.which==1&&firstPlayed==true){e.preventDefault();dragging=true;if(audio.paused)draggingWhilePaused=true;else audio.pause();$w.on("mousemove",drag);$audio.off("timeupdate",audioUpdate)}});$w.on("mouseup",function(e){if(dragging==true){drag(e);$w.off("mousemove",drag);audio.currentTime=duration*
((e.pageX-progressBarLeft)/progressBarWidth);if(audio.currentTime>=duration){audio.pause();$playButton.removeClass("pause").addClass("play")}else if(!draggingWhilePaused)audio.play();$audio.on("timeupdate",audioUpdate)}dragging=false;draggingWhilePaused=false});function drag(e){var newLeft=e.pageX-progressBarLeft;if(newLeft>=0&&newLeft<=progressBarWidth){$playhead.css("left",newLeft-playheadWidth/2+"px");$elapsedBar.css("width",newLeft+"px")}if(newLeft<0){$playhead.css("left",-(playheadWidth/2)+"px");
$elapsedBar.css("width","0px")}if(newLeft>progressBarWidth){$playhead.css("left",progressBarWidth-playheadWidth/2+"px");$elapsedBar.css("width",progressBarWidth+"px")}}function audioUpdate(){var elapsedBarWidth=progressBarWidth*(audio.currentTime/duration);$playhead.css("left",elapsedBarWidth-playheadWidth/2+"px");$elapsedBar.css("width",elapsedBarWidth+"px");if(audio.currentTime>=duration)$playButton.removeClass("pause").addClass("play");$elapsedTime.text(formatDuration(audio.currentTime))}});function formatDuration(duration){sec=
Math.floor(duration);min=Math.floor(sec/60);min=min>=10?min:"0"+min;sec=Math.floor(sec%60);sec=sec>=10?sec:"0"+sec;return min+":"+sec}$article.find(".inline-video").each(function(){var $this=$(this);var $wpvPlayer=$this.find(".wpv-player");if($wpvPlayer.attr("data-show-caption")!=="1")$this.find(".inline-video-caption").show();else;});$(document).on("abtest-ready",function(e,ABT){if("article-politics"===wp_pb.pageName)politicsCrbtnTest();function politicsCrbtnTest(){var articleUuid=$('meta[name\x3d"eomportal-uuid"]').attr("content");
var version=ABT.get("politics-cr_button").name;var strVar="";if("b"==version){switch(articleUuid){case "e9cb3eaa-e544-11e5-bc08-3e03a5b41910":strVar+='\x3ca href\x3d"https://wapo.st/lookingforamerica2?tid\x3dlfa-b-1" class\x3d"normal cr_button-b"\x3e\x3cdiv class\x3d"navbox"\x3e';strVar+='\x3cimg src\x3d"https://www.washingtonpost.com/rf/image_358w/2010-2019/WashingtonPost/2016/03/15/National-Politics/Graphics/L4A_part2.jpg"\x3e';strVar+='\x3cp\x3eCome with us to New Hampshire to hear more voters\' answers.\x26nbsp;\x3ci class\x3d"fa  fa-arrow-right"\x3e\x3c/i\x3e\x3c/p\x3e';
strVar+="\x3c/div\x3e\x3c/a\x3e";break;case "c10b4b8a-e545-11e5-bc08-3e03a5b41910":strVar+='\x3ca href\x3d"https://wapo.st/lookingforamerica3?tid\x3dlfa-b-2" class\x3d"normal cr_button-b"\x3e\x3cdiv class\x3d"navbox"\x3e';strVar+='\x3cimg src\x3d"https://www.washingtonpost.com/rf/image_358w/2010-2019/WashingtonPost/2016/03/15/National-Politics/Graphics/L4A_part3.jpg"\x3e';strVar+='\x3cp\x3eCome with us South Carolina and Nevada to hear more voters\' answers.\x26nbsp;\x3ci class\x3d"fa  fa-arrow-right"\x3e\x3c/i\x3e\x3c/p\x3e';
strVar+="\x3c/div\x3e\x3c/a\x3e";break;case "be970d52-e546-11e5-bc08-3e03a5b41910":strVar+='\x3ca href\x3d"https://wapo.st/lookingforamerica4?tid\x3dlfa-b-3" class\x3d"normal cr_button-b"\x3e\x3cdiv class\x3d"navbox"\x3e';strVar+='\x3cimg src\x3d"https://www.washingtonpost.com/rf/image_358w/2010-2019/WashingtonPost/2016/03/15/National-Politics/Graphics/L4A_part4.jpg"\x3e';strVar+='\x3cp\x3eCome with us to Michigan, Texas, Kentucky and Arkansas to hear more voters\' answers.\x26nbsp;\x3ci class\x3d"fa  fa-arrow-right"\x3e\x3c/i\x3e\x3c/p\x3e';
strVar+="\x3c/div\x3e\x3c/a\x3e";break;default:}if(strVar)$article.find(".inline-html a.normal .navbox").parent().replaceWith(strVar)}else{switch(articleUuid){case "e9cb3eaa-e544-11e5-bc08-3e03a5b41910":strVar+="https://wapo.st/lookingforamerica2?tid\x3dlfa-default-1";break;case "c10b4b8a-e545-11e5-bc08-3e03a5b41910":strVar+="https://wapo.st/lookingforamerica3?tid\x3dlfa-default-2";break;case "be970d52-e546-11e5-bc08-3e03a5b41910":strVar+="https://wapo.st/lookingforamerica4?tid\x3dlfa-default-3";
break;default:}if(strVar)$article.find(".inline-html a.normal .navbox").parent().attr("href",strVar)}}});var inlineLinkConfig={ctx:"#article-body article",selector:'p a[href*\x3d"www\\.washingtonpost\\.com"]',param:"tid",getParamValue:function($link,ev){return this.param+"\x3da_inl"}};var inlineBioConfig={ctx:"#article-body article",selector:'.inline-content.author-bio a[href*\x3d"www\\.washingtonpost\\.com"]',param:"tid",getParamValue:function($link,ev){return this.param+"\x3da_bio"}};try{wp_pb.StaticMethods.parametrizeLinks.init([inlineLinkConfig,
inlineBioConfig])}catch(e){}var authorBioBoxHandler={init:function(){try{if(mobile_browser||$(window).width()<975)$(".pb-f-article-article-body .pb-author-wrapper").each(function(){var $this=$(this);if($this.find(".pb-author-modal-wrapper").length>0){$this.addClass("handle-as-mobile");var $modal=$this.find(".pb-author-modal-wrapper .slide-layer"),$otherModal=$this.siblings().find(".pb-author-modal-wrapper .slide-layer"),$modalWrapper=$this.find(".pb-author-modal-wrapper"),$closeBtn=$this.find(".pb-author-modal-wrapper .close-btn");
var modalFadeIn=function(ev){if($modal.is(":hidden")){modalFadeOut();ev.preventDefault();ev.stopPropagation();$modal.find(".pb-author-modal").css("width",window.innerWidth*.75+"px");$modalWrapper.css("margin-left","-"+$modal.outerWidth()/2+"px");$modal.show(200);$("body").on("click",modalFadeOut)}else if(ev.target.nodeName!="A"&&ev.target.nodeName!="IMG"){ev.preventDefault();ev.stopPropagation()}};var modalFadeOut=function(){$otherModal.hide(200);$modal.hide(200);$("body").off("click",modalFadeOut)};
$this.on("click",modalFadeIn);$closeBtn.on("click",modalFadeOut)}});else{$(".pb-f-article-article-body").prepend('\x3cdiv id\x3d"pb-article-body-author-modals"\x3e\x3c/div\x3e');$(".pb-f-article-article-body .pb-author-wrapper").each(function(){var $this=$(this);if($this.find(".pb-author-modal-wrapper").length>0){var $modal=$this.find(".pb-author-modal-wrapper .slide-layer"),transitionTimer,thisTop;$modal.appendTo($this.closest(".article-body").siblings("#pb-article-body-author-modals"));$this.add($modal).hover(function(ev){if(thisTop!=
$this.closest(".pb-sig-line").position().top){var top=0,left=0;if($(".pb-f-article-article-body .headshot-to-the-left").length>0){top=parseFloat($(".article-body").css("margin-top"))+$this.height()+$this.position().top+5;left=$this.position().left+20}else{top=parseFloat($(".article-body").css("margin-top"))+$this.position().top+$this.height()+5;left=$this.position().left+20}$modal.css({top:top+"px",left:left+"px"});thisTop=$this.closest(".pb-sig-line").position().top}if(transitionTimer){clearTimeout(transitionTimer);
transitionTimer=null}transitionTimer=setTimeout(function(){$modal.show(200)},100)},function(ev){if(transitionTimer){clearTimeout(transitionTimer);transitionTimer=null}var targetElement=ev.toElement;if(targetElement==undefined)targetElement=ev.relatedTarget;if($modal.has(targetElement).length==0&&$this.has(targetElement).length==0)$modal.hide(200)})}})}}catch(err){}}};authorBioBoxHandler.init()})(jQuery);
(function($){var userId=document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:"",userSecureId=document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:"",userAgent=navigator.userAgent,wp_pb=window.wp_pb||{},env=wp_pb.environment||"production";function Newsletter(objValue){var obj=objValue||{};this.id=obj.id||"";this.name=obj.name||"";this.headline=obj.headline||"";this.blurb=obj.blurb||""}function InLineNewsletter($rootSelector){var isHomepage=$rootSelector.find(".newsletter-inline-unit").hasClass("homepage"),
codedNewsletter=$rootSelector.find(".newsletter-inline-unit").hasClass("codedNewsletter"),keywordExists=$rootSelector.find(".newsletter-inline-unit").hasClass("keywordExists"),showdefault=$rootSelector.find(".hidden-data .show-default").text()=="true"?true:false,newsletter={value:new Newsletter};if($rootSelector.find(".newsletter-inline-unit").hasClass("rightRail"))$rootSelector.addClass("rightRail");if(isHomepage)$rootSelector.addClass("homepage");var newsletterInLine={showConfirmation:function(){$rootSelector.find(".signup-module").addClass("hide");
$rootSelector.find(".success-confirmation, .title-container").removeClass("hide")},showError:function(message){$rootSelector.find(".error").text(message).removeClass("hide")},hideError:function(){$rootSelector.find(".error").addClass("hide")},getPageData:function(){var section=$rootSelector.find(".section-instream").text(),subSection=$rootSelector.find(".subsection-instream").text(),blog=$rootSelector.find(".blogname-instream").text(),data={};if(userId!=="")data.washPostId=userId;if(blog)data.blog=
blog;if(subSection)data.subSection=subSection;if(section)data.section=section;return data},getInLineNewsletter:function(){var data=newsletterInLine.getPageData(),url="https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletter";return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data)})},subscribe:function(email){var data,url;if(userId!==""){if(env=="production")url="https://subscribe.washingtonpost.com/person/newsletter/subscribe";else url=
"https://subscribe.digitalink.com/person/newsletter/subscribe";data={"wapoLoginID":userId,"wapoSecureID":userSecureId,"userAgent":navigator.userAgent,"newsletterName":newsletter.value.id,"metadata":[{"name":"nl_start_method","value":"S"},{"name":"nl_start_location","value":"IS"}]}}else if(email){if(env=="production")url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-email";else url="https://subscribe.digitalink.com/person/newsletter/subscribe-email";data={"email":email,"newsletterName":newsletter.value.id,
"metadata":[{"name":"nl_start_method","value":"S"},{"name":"nl_start_location","value":"IS"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){newsletterInLine.showConfirmation();s.sendDataToOmniture("Newsletter In Line Unit","event91",newsletterInLine.trackProps("nl_instream_simple_"+newsletter.value.name.toLowerCase().split(" ").join("-")+"_1"),{wait:true})}else newsletterInLine.showError("Error while subscribing, please try later.")},
error:function(request,status,error){newsletterInLine.showError("Error while subscribing, please try later.")}})},applyNewsletterData:function(){if(codedNewsletter&&keywordExists||isHomepage&&codedNewsletter){$rootSelector.addClass("codedNewsletter");var data={};data.headline=data.name=$rootSelector.find(".coded-nl-headline").text();data.blurb=$rootSelector.find(".coded-nl-tagline").text();data.id=$rootSelector.find(".coded-nl-id").text();newsletter.value=new Newsletter(data);$rootSelector.find(".headline").text(newsletter.value.headline);
$rootSelector.find(".tagline").text(newsletter.value.blurb);return}else if(!codedNewsletter||showdefault)newsletterInLine.getInLineNewsletter().done(function(data){if(!$.isEmptyObject(data.newsletter)){newsletter.value=new Newsletter(data.newsletter);$rootSelector.find(".headline").text(newsletter.value.headline);$rootSelector.find(".tagline").text(newsletter.value.blurb)}else $rootSelector.addClass("hide")})},positionNewsletter:function(){var position=$rootSelector.find(".newsletter-position").text();
if(position=="after3th"){if($("#article-body article").length>0&&$("#article-body article").children("p").length<3){$rootSelector.addClass("hide");return false}var paragraph;if($("#article-body article").children()[2].nodeName=="DIV"||$("#article-body article").children()[3].nodeName=="DIV")paragraph=$("#article-body article").find(" \x3e p")[1];else paragraph=$("#article-body article").find(" \x3e p")[2];$(paragraph).after($rootSelector);$("#article-body article").children().each(function(index){if(index<=
5)if($(this).hasClass("inline-photo-right")){$(this).before($rootSelector);return}});return true}else{if($("#article-body article").length>0&&$("#article-body article").children("p").length<8){$rootSelector.addClass("hide");return false}var paragraphs=$("#article-body article").find(" \x3e p");var last=$(paragraphs).last();$(paragraphs).find(" \x3e strong, \x3e b").each(function(data,index){var text=$(this).text();var linkT=$(this).find("a").text();if(linkT.indexOf("Read More")>=0||linkT.indexOf("Read more")>=
0||text.indexOf("Read More")>=0||text.indexOf("Read more")>=0||linkT.indexOf("Also Read")>=0||linkT.indexOf("Also read")>=0||text.indexOf("Also Read")>=0||text.indexOf("Also read")>=0)last=$(this).parent()});var paragraph=$(last).prev().prev().prev().prev();if($(last).text().trim()=="")paragraph=paragraph.prev();if($(last).prev().text().trim()=="")paragraph=paragraph.prev();if($(last).prev().prev().text().trim()=="")paragraph=paragraph.prev();if($(last).prev().prev().prev().text().trim()=="")paragraph=
paragraph.prev();$(paragraph).before($rootSelector);var prevContent=$rootSelector.prev(),prevprevContent=$rootSelector.prev().prev(),prevprevprevContent=$rootSelector.prev().prev().prev();if($(prevContent).hasClass("inline-photo-left")||$(prevContent).hasClass("inline-photo-right"))$(prevContent).before($rootSelector);if($(prevprevContent).hasClass("inline-photo-left")||$(prevprevContent).hasClass("inline-photo-right"))$(prevprevContent).before($rootSelector);if($(prevprevprevContent).hasClass("inline-photo-left")||
$(prevprevprevContent).hasClass("inline-photo-right"))$(prevprevprevContent).before($rootSelector);return true}},init:function(){var showUnit=true,newsletterpositioned=true;if(codedNewsletter&&keywordExists==false&&showdefault==false&&isHomepage==false)showUnit=false;if(showUnit){if(isHomepage==false)newsletterpositioned=newsletterInLine.positionNewsletter();if(newsletterpositioned!==false){newsletterInLine.applyNewsletterData();$rootSelector.find(".sign-up-btn").click(function(){if(userId!=="")newsletterInLine.subscribe();
else if($rootSelector.find(".title-container").hasClass("hide")){var email=$rootSelector.find(".sign-up-input").val(),re=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;if(email==""||!re.test(email))newsletterInLine.showError("Please enter a valid email address");else{newsletterInLine.hideError();newsletterInLine.subscribe(email)}}else{$rootSelector.find(".title-container").addClass("hide");$rootSelector.find(".input-container").removeClass("hide")}});setTimeout(function(){$(window).off("scroll.newsletterInLine").on("scroll.newsletterInLine",
newsletterInLine.onVisibilityChange($(".pb-f-page-newsletter-inLine"),newsletterInLine.trackOmniture))},3E3)}}else $rootSelector.addClass("hide")},trackOmniture:function(){s.sendDataToOmniture("Newsletter In Line Unit","event59",newsletterInLine.trackProps("nl_instream_simple_"+newsletter.value.name.toLowerCase().split(" ").join("-")+"_1"),{wait:true});$(window).off("scroll.newsletterInLine")},trackProps:function(enhancedKey){var subsection=window.wp_subsection||"";var contentType=window.wp_content_type||
"";var channel=window.wp_channel||"";var props={"eVar2":"wp - "+subsection,"prop2":"wp - "+subsection,"prop3":contentType,"eVar17":contentType,"channel":channel};props.eVar26=enhancedKey;return props},isElementInViewport:function(el){if(typeof jQuery==="function"&&el instanceof jQuery)el=el[0];var rect=el.getBoundingClientRect();return rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth)},
onVisibilityChange:function(el,callBack){return function(){if(newsletterInLine.isElementInViewport(el))callBack()}}};newsletterInLine.init()}$(".pb-f-page-newsletter-inLine").each(function(index,value){var Newsletter=new InLineNewsletter($(this))})})(jQuery);
$(function() {
    wp_pb = window.wp_pb || {};
    wp_pb.CommentLoader = wp_pb.CommentLoader || function(){
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            isMobile = ((wp_pb && wp_pb.BrowserInfo && wp_pb.BrowserInfo.mobile_browser === 1) && width < 480 ) ? true : false,
            isArticle = $('html').hasClass("layout_article") ? true : false,
            commentsClosed = ($('.echo_container .closed').length > 0) ? true : false,
            loadDeferred = ($('.echo_container.defer').length > 0) ? true : false,
            triggerLoad = ($('.echo_container.triggerLoad').length > 0) ? true : false,
            loadDeferredMobile = ($('.echo_container.deferMobile').length > 0) ? true : false,
            noMobile = ($('.echo_container.no-mobile').length > 0 && isMobile) ? true : false,
            noDesktop = ($('.echo_container.no-desktop').length > 0) ? true : false,
            $window = $(window),
            $echoPlaceholder = $('.echo_container_placeholder'),
            loadThreshhold = .70,
            env = wp_pb.environment || "production",
            apiBaseURL = (env == 'production')?'https://comments-api.ext.nile.works':'https://comments-api-staging.ext.nile.works',
            forceShowComments = $(document).getUrlParam("sc"), //get any relevant QS parameters
            commentOverlay = {
                    overlayElements: {
                        overlay: '#comment_overlay',
                        articleWrapper: '.article-wrapper',
                        articleTopper: '.article-topper',
                        articleParent: '.story-stream',
                    },
                    onClose: function(data) {
                        data.overlay = data.overlay || $(commentOverlay.overlayElements.overlay);
                        data.overlay.addClass('overlay-closed');

                        /*** STORYLINE COMMENTS CODE; DEPRECATED ***/
                        /*  $(window.document).off('scroll.TWP.Comments');
                            if (!data.action || data.action != 'story_closed') {
                                $('#story-stream-tools').css('display','block');
                            }
                        */
                    },
                    onOpen: function(data) {
                        //hack to make the comments overlay work with the site menu open. LP will revisit.
                        if($('body').is('.left-menu')) {
                            $('#site-menu-btn').click();
                            setTimeout(function() {
                                data.overlay.addClass('overlay-fixed').removeClass('overlay-absolute');
                                data.overlayWrapper.removeClass('overlay-closed');
                            }, 600);
                        } else {
                            data.overlay.addClass('overlay-fixed').removeClass('overlay-absolute');
                            data.overlayWrapper.removeClass('overlay-closed');
                        }

                    },
                    onScroll: function(event){

                    },
                    closeSelector: "a.close"};


        var loadComments = function() {
            if (!noMobile && !noDesktop) {
                if (typeof wp_e2 == 'undefined' || typeof wp_e2.initStatus == 'undefined') {
                    var domain = (env == "production") ? "//js.washingtonpost.com/pb" : "/pb";
                    var outputtype = (env == "production") ? "&outputType=javascript" : "&outputType=javascript";
                    var resourceToken = wp_pb.resourceToken || '201504300950';
                    var commentsFile = [domain + "/1d/hjs/twp-comments.js" + "?token=" + resourceToken + outputtype];
                    //window.wp_import && window.wp_import.withStyleId("pb-r-comments-loader",commentsFile);
                    window.TWPHead && TWPHead.load(commentsFile);
                }
            }
        };


        var showComments = function(data) {
            loadComments();
            $window.off('scroll.showComments');
            var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element

            if ($overlay.length === 0) {  //standard functionality
                $('.comment-summary.summary-expanded, .comment-summary.summary-expanded-mobile, .comment-summary.summary-expanded-desktop')
                    .slideUp('fast', function() {
                        $('.echo_container.comments-collapsed').removeClass('comments-collapsed')
                            .addClass('comments-expanded')
                            .slideDown('fast', function() {
                                wp_pb.report('global', 'domChanged');
                            });
                        $(this).addClass('summary-collapsed').removeClass('summary-expanded summary-expanded-mobile summary-expanded-desktop');
                        if (typeof window.sendDataToOmniture === 'function') {
                            try {
                                sendDataToOmniture('echo.gotoComments', 'event5', {
                                    "eVar26": "go to comments"
                                });
                            } catch (err) {}
                        }
                    });
                    var bottomOffset = $(document).height() - $($echoPlaceholder.parent()[0]).offset().top;
                    var windowHeight = $(window).height()
                    if ( bottomOffset < windowHeight){
                      $($echoPlaceholder.parent()[0]).height(windowHeight - bottomOffset);
                    }
                    $echoPlaceholder.parent()[0].scrollIntoView();
            } else {
                //comments displayed in side/overlay
                //comments moved to appropriate place in DOM, positioned, and refreshed.

                if (typeof data == 'undefined') {
                    //do nothing
                    return;
                }

                $overlayWrapper = data.elm.parents(commentOverlay.overlayElements.articleWrapper);

                if(!$overlay.is('.overlay-closed')) {
                    //if the comments are open, close them
                    wp_pb.report('comments', 'commentsMultiClosed', {'overlay': $overlay, 'overlayWrapper': $overlayWrapper})
                } else {
                    //otherwise, open the comments
                    $overlay.find(commentOverlay.closeSelector).on('click',function(event){
                        event.stopPropagation();
                        wp_pb.report('comments','commentsMultiClosed', {'overlay':$overlay,'overlayWrapper':$overlayWrapper})
                    });

                    //move to appropriate place in DOM
                    $overlayWrapper.after($overlay);
                    var top = (data && data.location && data.location.offset().top) || $(document).scrollTop();

                    //refresh
                    if (typeof data.guid !== 'undefined') {
                        var allow_comments = ($overlayWrapper.find('.pb-comment-wrapper').attr('data-allow-comments')==='true')?true:false;
                        wp_e2.refreshComments({"id":"#" + $overlay.find('.echo_container.comments').attr('id'), "url":data.guid, "allow_comments":allow_comments});
                    }

                    wp_pb.report('comments', 'commentsMultiOpened',{'parent':$overlayWrapper.parent($(commentOverlay.overlayElements.articleParent)),'overlay':$overlay,'overlayWrapper':$overlayWrapper});
                }
            }

        };

        var loadCommentCount = function (elms){
            //echo code.  comment out for in-house
            //var apiBaseURL = '//api.echoenabled.com';//production (Echo)
            //end echo

            var echoCountApi =  apiBaseURL + '/v2/mux' +
                                '?appkey='  + ((TWP.Data.echo_appkey != 'undefined')?TWP.Data.echo_appkey:'prod.washpost.com') +
                                '&requests=';
            var query = "(childrenof:'{guid}'" +
             encodeURI("source:washpost.com (((state:Untouched AND user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved,ModeratorDeleted AND -user.state:ModeratorBanned,ModeratorDeleted) )))"
                + ' children: 2 (((state:Untouched AND user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved AND -user.state:ModeratorBanned,ModeratorDeleted) ) )');

            /*
    [{  "id":"count1",
        "method":"count",
        "q":"((childrenof: //www.washingtonpost.com/world/middle_east/palestinians-form-new-unity-government-including-hamas/2014/06/02/c681d5c6-ea46-11e3-9f5c-9075d5508f0a_story.html source:washpost.com (((state:Untouched user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved,ModeratorDeleted -user.state:ModeratorBanned,ModeratorDeleted) OR (-state:SystemFlagged,ModeratorFlagged user.id:'http://washingtonpost.com/vr5H9gYg8K7QKi4eY3QuCsBEPSO0NNloQjBe0ZqhSs1oGeVxxhJF5A==/')) AND ( -markers:ignore ) ) )) itemsPerPage: 15 sortOrder:reverseChronological safeHTML:aggressive children: 2 childrenSortOrder:chronological childrenItemsPerPage:3 (((state:Untouched user.state:ModeratorApproved) OR (state:CommunityFlagged,ModeratorApproved -user.state:ModeratorBanned,ModeratorDeleted) OR (-state:SystemFlagged,ModeratorFlagged user.id:'http://washingtonpost.com/vr5H9gYg8K7QKi4eY3QuCsBEPSO0NNloQjBe0ZqhSs1oGeVxxhJF5A==/')) AND ( -markers:ignore ) )"}]
            */
            var muxArray = new Array();

            var dataUrl;

            $(elms).each(function(index,el) {
                var thisData =  $(el).attr('guid') || $(el).attr('data');
                if (typeof thisData != 'undefined') {
                    query = query.replace("{guid}",thisData);
                    muxArray.push( {"id":thisData,"method":"count","q":query});
                 }
            });
            jQuery.ajax({
                url: echoCountApi + JSON.stringify(muxArray),
                dataType: 'jsonp',
                cache: true})
                .done(function(data,status ){
                    if (status != "error") {
                        $.each(data,function(index,el){
                            var count = (el.result != 'error')?parseInt(el.count):'';
                            var counterTarget = $(".echo-counter[guid='"+index +"']");
                            formatCount(count, counterTarget);
                        })
                    }
                });

        };

        var formatCount = function(rawCount, uiTargets){
          for (i = 0; i < uiTargets.length; i++){
            if (rawCount >= 1000 && uiTargets[i].classList.contains('format_short')){
              var shortCount = (Math.floor(10 * (rawCount/1000))/10).toFixed(1);
              uiTargets[i].innerHTML = shortCount + "k";
            } else {
              uiTargets[i].innerHTML = rawCount;
            }
          }
        };

        var resetFixed = function(data) {
            var $shareBarHeight = $('.sticky-top-sharebar'), $streamHeader = $('.echo-apps-conversations-streamHeader');
            if (data == 'opened' && $('.bar-hidden').length === 0 ) {
                $streamHeader.addClass('nav-open');
            } else {
                $streamHeader.removeClass('nav-open');
            }
        };

        var init = function() {
            
            //register that a closed comments message has replaced link display in article
            if (commentsClosed && isArticle){
              $(".pb-f-page-comments").addClass("closed-message");
              $(".social-tools-wrapper-bottom").addClass("align-left").removeClass("align-right");
            }
            
            if (window.location.hash == "#comments") {
                showComments();
            }

            //register callbacks
            wp_pb.register('comments', 'showComments', showComments, this);

            //Initalize showComments immediately if URL includes #comments
            wp_pb.register('comments', 'commentsReady', function() {
                if (forceShowComments === '1') {
                    showComments();
                }
                if (window.location.hash == "#comments") {
                    $echoPlaceholder.parent()[0].scrollIntoView();
                }
                
                $($echoPlaceholder.parent()[0]).height('auto');
            });

            wp_pb.register('nav', 'finish_open', function() {
                resetFixed('opened');
            });

            wp_pb.register('nav', 'finish_close', function(){
                resetFixed('closed');
            });

            wp_pb.register('sticky-top-sharebar', 'sharebar_fixed', function(){
                $('.echo-apps-conversations-streamHeader').addClass('top-sharebar-fixed');
            });

            wp_pb.register('sticky-top-sharebar', 'sharebar_unfixed', function(){
                $('.echo-apps-conversations-streamHeader').removeClass('top-sharebar-fixed');
            });

            wp_pb.register('nav', 'menu_start_open', function(){
                var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element
                if ($overlay.length > 0) {  //standard functionality
                    $overlay.parent().hide();
                }
            });

            wp_pb.register('nav', 'menu_finish_close', function(){
                var $overlay = $(commentOverlay.overlayElements.overlay);  //check for overlay element
                if ($overlay.length > 0) {  //standard functionality
                    $overlay.parent().show();
                }
            });


            wp_pb.register('comments', 'commentsMultiOpened',commentOverlay.onOpen);
            wp_pb.register('comments', 'commentsMultiClosed',commentOverlay.onClose);

            //add events
            $('.comment-summary').click(function() {
                //showComments();
                //populating the data object so that the overlay comments panel has enough info to open
                var data = {
                    elm: $(this),
                    guid: $(this).find('.echo_container').attr('guid')
                };
                history.pushState(null, null, '#comments')
                wp_pb.report('comments', 'showComments', data);
            });
            
            $('.comment-jump').click(function() {
                history.pushState(null, null, '#comments')
            });
            
            if (isMobile) {
                $('.comment-summary.jump').hide();
            }


            //load comments as appropriate
            if (isMobile && loadDeferredMobile || !isMobile && triggerLoad ) {
                //only load count on standard count element.  Comments loaded on click of comment-summary
                loadCommentCount('.echo-counter');
            } else if (!isMobile && loadDeferred) {
                //load comment count on standard count element first
                loadCommentCount('.echo-counter');
                //set up scroll events.  Comments will load on scroll or click of comment count, comment-summary
                $window.on('scroll.showComments', function() {
                    if ($window.scrollTop() / $echoPlaceholder.offset().top >= loadThreshhold) {
                        //showComments();
                        loadComments();
                    }
                    if ($window.scrollTop() >= $echoPlaceholder.offset().top ) {
                        showComments();
                    }
                });
            } else {
                loadComments();
            }

            if (triggerLoad) {
                var triggerLoadLogger = new TWP.Tools.logger("LOAD-BLOCKER-COMMENTS");

                // ensure fields are set
                TWP.loadImmediatelyBlockers = TWP.loadImmediatelyBlockers || {};
                TWP.loadImmediatelyBlockers.comments = TWP.loadImmediatelyBlockers.comments || [];

                // check if fields are empty
                var checkCommentsBlockers = function() {
                    triggerLoadLogger.log("checkCommentsBlockers: " + TWP && TWP.loadImmediatelyBlockers && TWP.loadImmediatelyBlockers.comments && TWP.loadImmediatelyBlockers.comments.length != 0);
                    return TWP && TWP.loadImmediatelyBlockers && TWP.loadImmediatelyBlockers.comments && TWP.loadImmediatelyBlockers.comments.length != 0;
                }

                // load display ads required code
                var loadCommentsLoader = function(forceAdd) {
                    if ( (!checkCommentsBlockers() || !!forceAdd) && !!!TWP.loadImmediatelyBlockers.loadedComments) {
                        triggerLoadLogger.log("loadCommentsLoader");
                        try {
                            loadComments();
//                          TODO: only works for Gallery pages !
                            TWP.loadImmediatelyBlockers.loadedComments = true;
                        } catch (err) {}
                    }
                }

                // add event handling from TWP.loadImmediatelyBlockers
                if (checkCommentsBlockers()) {
                    $.each(TWP.loadImmediatelyBlockers.comments, function(i, val){
                        $(window.document).on(val, function(){
                            triggerLoadLogger.log("comments inEvent: "+val);
                            loadCommentsLoader();
                        });
                        setTimeout(function(){
                            triggerLoadLogger.log("comments inTimeout");
                            $(window.document).off(val);
                            loadCommentsLoader(true);
                        }, 5000);
                    });
                } else {
                    triggerLoadLogger.log("comments inElse");
                    loadCommentsLoader(true);
                }
            }
        }
        return{init:init,showComments:showComments,loadCommentCount:loadCommentCount};
    } ();
    wp_pb.CommentLoader.init();
});

(function($){var $socialToolsBottom=$(".social-tools-bottom"),$individualTools=$socialToolsBottom.children(),config={"omnitureEvent":"event6"};$(".social-tools-wrapper-bottom").each(function(index,myRootElement){if(wp_pb.StaticMethods.staticPostShare)wp_pb.StaticMethods.staticPostShare.init($(myRootElement),$(myRootElement).data("postshare"))});$individualTools.on("click",function(e){if(typeof window.sendDataToOmniture==="function"){var shareType=$(this).data("sharetype"),eventName=config.omnitureEvent,
omnitureVars={"eVar1":typeof window.s=="object"&&s&&s.eVar1,"eVar2":typeof window.s=="object"&&s&&s.eVar2,"eVar8":typeof window.s=="object"&&s&&s.eVar8,"eVar17":typeof window.s=="object"&&s&&s.eVar17,"eVar27":""};omnitureVars.eVar27=shareType+"_bottom";try{sendDataToOmniture("share."+shareType,eventName,omnitureVars)}catch(e){console.log(e)}}})})(jQuery);
(function($){$(".pb-f-article-article-author-bio").each(function(){var numAuthors=$(this).find(".pb-bottom-author").length;if(numAuthors==0)$(this).hide();else if(numAuthors>1)$(this).find(".pb-bottom-author").addClass("hide-images")})})(jQuery);
(function(){var $=jQuery;var TWP=window.TWP||{};TWP.Perso=TWP.Perso||{};TWP.Perso.Tools=TWP.Perso.Tools||{};var T=TWP.Perso.Tools;var $sponsored=null;var $container=null;var $pbcontainer=null;var log=new TWP.Tools.logger("HYBRID");var output="";var validOnes=[];var client=null;var clientName="recommend-strip-v1";var status="";var visible=false;var trackRenderedAllCalled=false;function _failure(error){log.debug("Failure",function(){$pbcontainer.hide();trackError(error);status="failed"})}function isValid(recommendation){return recommendation&&
recommendation.url&&recommendation.responsetype&&recommendation.headline&&recommendation.summary&&recommendation.photo&&recommendation.photo.path}function render(recommendations){if(!recommendations||recommendations.length==0)return _failure("no-recommendations");for(var i=0;i<recommendations.length;i++)if(isValid(recommendations[i]))validOnes.push(recommendations[i]);if(validOnes.length==0)return _failure("no-valid-recommendations");log.debug("Render",function(){_renderArticle(validOnes)});status=
"rendered";trackVisible()}function _renderArticle(recommendations){var idx=0;var html="";var classes="";for(var i=0;i<recommendations.length;i++){log.debug("Render item ("+i+")");html=html+renderItem(recommendations[i],idx,recommendations.length);idx=idx+1}html='\x3cdiv class\x3d"postrecommends contentfeed'+classes+'"\x3e'+'\x3cdiv class\x3d"content-strip"\x3e'+'\x3cdiv class\x3d"label-wrapper"\x3e'+'\x3cspan class\x3d"label label-kicker"\x3eThe Post Recommends\x3c/span\x3e'+"\x3c/div\x3e"+'\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e'+
html+'\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e'+"\x3c/div\x3e"+"\x3c/div\x3e";if(html!=output){output=html;$sponsored=$("#slug_postrecommends");$sponsored.remove();$container.html(output);$container.find(".content-strip \x3e .label-wrapper").before($sponsored);$pbcontainer.show();$pbcontainer.after('\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e')}}function renderURL(recommendation){return recommendation.url+"?tid\x3d"+recommendation.responsetype}function renderImgURL(recommendation,w,h){var url=recommendation.photo.path;
return"https://img.washingtonpost.com/wp-apps/imrs.php?src\x3d"+encodeURIComponent(url)+"\x26w\x3d"+w+"\x26h\x3d"+h}function renderClasses(recommendation,index,total){var classes="";if(recommendation.responsetype.match(/video/))classes=classes+"video ";if(index==0)classes=classes+"first ";if(index==total-1)classes=classes+"last";return classes}function renderItem(recommendation,index,total){var node=$($("#postrecommends-article-template").html());node.addClass(renderClasses(recommendation,index,total));
var headline=node.find(".headline a");headline.html(recommendation.headline);headline.attr("href",renderURL(recommendation));var linkImg=node.find(".photo-wrapper a");linkImg.attr("href",renderURL(recommendation));var blurb=node.find(".blurb");blurb.html(recommendation.summary);var img='\x3cimg alt\x3d"" src\x3d"'+renderImgURL(recommendation,480,320)+'"'+' data-hi-res-src\x3d"'+renderImgURL(recommendation,480,320)+'"'+' data-low-res-src\x3d"'+renderImgURL(recommendation,112,75)+'"'+' data-threshold\x3d"112" class\x3d"courtesy-of-the-resizer"\x3e';
node.find(".photo-wrapper img").replaceWith(img);if(recommendation.responsetype.match(/video/)){var time="";if(recommendation.videoDuration&&recommendation.videoDuration>1E3){var seconds=Math.floor(recommendation.videoDuration/1E3);var minutes=Math.floor(seconds/60);seconds=seconds%60;if(seconds<10)seconds="0"+seconds.toString();time=minutes+":"+seconds}var caption='\x3cdiv class\x3d"standalone-overlay posttv-playlist-text-play-btn"\x3e'+'\x3ca class\x3d"video-play" href\x3d"'+renderURL(recommendation)+
'"\x3e'+'\x3cspan class\x3d"fa fa-play icon-left"\x3e\x3c/span\x3e\x3cspan\x3ePlay Video\x3c/span\x3e'+'\x3cspan class\x3d"duration"\x3e'+time+"\x3c/span\x3e"+"\x3c/a\x3e"+"\x3c/div\x3e";blurb.after(caption)}return node[0].outerHTML}function trackClicks(){$container.on("click","a",null,function(){var link=this;log.debug("Click",function(){var href=link.href;var tid=href.replace(/.*\?tid=/,"");log.debug("URL : "+href);trackClicked(client,href,tid);setTimeout(function(){log.debug("Redirecting");document.location=
href},200)});return false})}function trackClicked(client,url,tid){T.Omniture.send("post_recommends","",{prop69:tid},log);client.clicked(url)}function trackVisible(){if(status=="rendered"&&visible&&!trackRenderedAllCalled){trackRenderedAllCalled=true;var param=[];for(var i=0;i<validOnes.length;i++)param.push(validOnes[i].responsetype);T.Omniture.send("post_recommends","",{prop72:param.join(",")},log);client.rendered()}}function trackError(error){T.noticeError(clientName,error)}function _preload(){log.debug("Setting up click handlers");
trackClicks();log.debug("Requesting recommendations");client=new TWP.Perso.Recommend(clientName,3);client.recommend().done(function(data){render(data["results"])})}function _visible(){log.debug("Visible",function(){visible=true;trackVisible()})}$(function(){log.debug("DOM Ready",function(){try{log.debug("Finding containers");$container=$("#post-recommends");$pbcontainer=$container.parent();if($container.length==1){log.debug("Setting up scroll listener");T.Events.smartPreload($pbcontainer,{preload:_preload,
visible:_visible,screens:2})}}catch(e){trackError("init-error")}})})})();
(function(){$(window.document).on("abtest-ready",function(e,ABT){var test=ABT.get("ads-outbrain");if(test.is("enabled")){var $feature=$(".pb-f-page-outbrain");$feature.show();var $container=$("#outbrain-container");$container.addClass("OUTBRAIN");var obSc=document.createElement("script");obSc.src="//widgets.outbrain.com/outbrain.js";obSc.async="async";obSc.type="text/javascript";$container.append(obSc)}})})(jQuery);
(function($){$(window.document).on("abtest-ready",function(e,ABT){var variation=ABT.get("recommendation-mostread");if(variation.is("chartbeat")){$("ul.def-feed").hide();$("ul.alt-feed").show()}})})(jQuery);

(function($){var deviceWidth=window.innerWidth>0?window.innerWidth:screen.width;var defaultNewsLetter={frequency:"Daily",headline:"Get the Today's Headlines Newsletter",id:"post_newsletter1",name:"Today's Headlines",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-heads",variable:"vars[intent_heads]"},defaultNewsLetters=[{frequency:"Daily",headline:"Get the Today's Headlines Newsletter",id:"post_newsletter1",name:"Today's Headlines",tagline:"Free daily updates delivered just for you.",
template:"signup-confirm-heads",variable:"vars[intent_heads]"},{frequency:"Daily",headline:"Get the Read In Newsletter",id:"post_newsletter112",name:"Read In",tagline:"Free daily updates delivered just for you.",template:"signup-confirm-readin",variable:"vars[intent_readin]"},{frequency:"Weekly",headline:"Get the Lean \x26 Fit Newsletter",id:"post_newsletter8",name:"Lean \x26 Fit",tagline:"Free weekly updates delivered just for you.",template:"signup-confirm-lean",variable:"vars[intent_lean]"},{frequency:"Twice-weekly",
headline:"Get the Checkpoint Newsletter",id:"post_newsletter130",name:"Checkpoint",tagline:"Free twice-weekly updates delivered just for you.",template:"signup-confirm-check",variable:"vars[intent_check]"}],subscribeEmail,washPostId,showNewsletter=function(){$("#signup-box-rr").show()},hideNewsletter=function(){$("#signup-box-rr").hide()},showSignUpForm=function(){$("#newsletter-signUp-form").show();$("#newsletter-signUp-button").hide()},showSignUpButton=function(){$("#newsletter-signUp-form").hide();
$("#newsletter-signUp-button").show()},showErrorMessage=function(message){if(message)$(".newsLetter-error-msg").text(message).show()},hideErrorMessage=function(){$(".newsLetter-error-msg").hide()},setNewsLetterValue=function(data){$("#newsletter-headline").append(data.headline);$("#newsletter-tagline").text(data.blurb)},setRecommendationsValues=function(data){$(".suggestion-list .recommended").each(function(index){$(this).find("p").text(data[index].headline);$(this).find("input[type\x3d'checkbox']").attr("value",
data[index].id);$(this).find("input[type\x3d'checkbox']").attr("name",data[index].name)})},toggleRecommendations=function(show){if(show){$("#newsletter-signUp-form, #newsletter-signUp-button, #newsletter-tagline").hide();$("#newsletter-suggestions-rr, #headline-checked, #subscribed-confirmation, #all-newsletters-lbl").show()}else $("#newsletter-suggestions-rr").hide()},showSignUpConfirmation=function(){$("#newsletter-signUp-form, #newsletter-signUp-button, #newsletter-tagline").hide();$("#headline-checked, #subscribed-confirmation, #all-newsletters-lbl").show()},
getUserId=function(){return document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:""},getWapoId=function(){return document.cookie.match(/wapo_secure_login_id=([^;]+)/)?RegExp.$1:""},getPageData=function(){var section=$("#newsletter-section").text(),subSection=$("#newsletter-subsection").text(),blog=$("#newsletter-blogname").text(),data={};washPostId=getUserId();if(washPostId!=="")data.washPostId=washPostId;if(blog)data.blog=blog;if(subSection)data.subSection=subSection;if(section)data.section=
section;return data},getMainNewsletter=function(){var data=getPageData();return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletter",data:JSON.stringify(data)})},getRecommendations=function(newsletters){var data=getPageData();data.newsletters=newsletters;return $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"https://recommendation-newsletter.wpdigital.net/Newsletter/api/newsletters",
data:JSON.stringify(data)})},subscribe=function(email){var data,url;if(washPostId!==""){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe";data={"wapoLoginID":washPostId,"wapoSecureID":getWapoId(),"userAgent":navigator.userAgent,"newsletterName":window.Newsletter.id,"metadata":[{"name":"nl_start_method","value":"EI"},{"name":"nl_start_location","value":"RR"}]}}else if(email){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-email";data={"email":email,"newsletterName":window.Newsletter.id,
"metadata":[{"name":"nl_start_method","value":"EI"},{"name":"nl_start_location","value":"RR"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){sendCustomTrackProps("event91",trackProps(window.Newsletter.name,1,"simple"),"Newsletter Right Rail Sign-up");setUpRecommendations(window.Newsletter.id)}},error:function(request,status,error){console.log(error,"Error while subscribing")}})},subscribeBundle=
function(){var data,url,newsletters=[],newsletterNames=[];$("#newsletter-suggestions-rr input:checked").each(function(index){newsletters.push($(this).val());newsletterNames.push({name:$(this).attr("name"),position:$(this).attr("data-pos")})});if(newsletters.length>0&&newsletterNames.length>0){if(washPostId!==""){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-list";data={"wapoLoginID":washPostId,"wapoSecureID":getWapoId(),"userAgent":navigator.userAgent,"newsletters":newsletters,
"metadata":[{"name":"nl_start_method","value":"EA"},{"name":"nl_start_location","value":"RR"}]}}else if(subscribeEmail){url="https://subscribe.washingtonpost.com/person/newsletter/subscribe-list-email";data={"email":subscribeEmail,"newsletters":newsletters,"metadata":[{"name":"nl_start_method","value":"EA"},{"name":"nl_start_location","value":"RR"}]}}$.ajax({type:"POST",dataType:"json",contentType:"application/json",url:url,data:JSON.stringify(data),success:function(data){if(data.status=="SUCCESS"){for(var i=
0;i<newsletterNames.length;i++)sendCustomTrackProps("event91",trackProps(newsletterNames[i].name,newsletterNames[i].position,"enhanced"),"Newsletter Right Rail Sign-up Bundle");setUpRecommendations(newsletters,true);toggleRecommendations(false)}},error:function(request,status,error){console.log(error,"Error while subscribing bundle")}})}},setUpRecommendations=function(newsletterId,confirmBundleSubscribe){var recommendations=getRecommendations([window.Newsletter.id]);recommendations.done(function(data){if(!$.isEmptyObject(data.newsletters)&&
data.newsletters.length>=3&&!confirmBundleSubscribe){window.Newsletters=data.newsletters;setRecommendationsValues(data.newsletters);toggleRecommendations(true);for(var i=0;i<data.newsletters.length-1;i++)sendCustomTrackProps("event59",trackProps(data.newsletters[i+1].name,i+1,"enhanced"),"Newsletter Right Rail Show Recommendations")}else toggleRecommendations(false);showSignUpConfirmation()});recommendations.fail(function(){if(!confirmBundleSubscribe){window.Newsletters=defaultNewsLetters;setRecommendationsValues(defaultNewsLetters);
toggleRecommendations(true)}})},setUpMainNewsletter=function(newsletter){window.Newsletter=newsletter;setNewsLetterValue(newsletter);showNewsletter();if(getUserId()!=="")showSignUpButton();else showSignUpForm();$(window).off("scroll.newsletterRR").on("scroll.newsletterRR",onVisibilityChange($(".pb-f-page-newsletter"),function(){sendCustomTrackProps("event59",trackProps(window.Newsletter.name,1,"simple"),"Newsletter Right Rail displayed in viewport");$(window).off("scroll.newsletterRR")}))},applyRrNewsletters=
function(variant,version){var mainNewsletter=getMainNewsletter();mainNewsletter.done(function(data){if(!$.isEmptyObject(data.newsletter))setUpMainNewsletter(data.newsletter);else hideNewsletter()});mainNewsletter.fail(function(){setUpMainNewsletter(defaultNewsLetter);sendCustomTrackProps("event50",trackProps(defaultNewsLetter.name,1),"Newsletter Right Rail API failure case")});$(".subscribe-newsLetter").click(function(){var re=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;subscribeEmail=$("#newsLetter-input").val();
if(this.id!=="newsletter-signUp-button"&&(subscribeEmail==""||!re.test(subscribeEmail)))showErrorMessage("Please enter a valid email address");else{hideErrorMessage();subscribe(subscribeEmail)}return false});$("#subscribe-bundle").click(function(){subscribeBundle()});$("#cancel-bundle").click(function(){sendCustomTrackProps("event58",trackProps(),"No Thanks, Newsletter Right Rail Sign-up Bundle");toggleRecommendations(false)})};$(window.document).on("abtest-ready",function(e,ABT){if(deviceWidth>460)if(window.TWP.Data.Tracking.props.content_type==
"front")applyRrNewsletters();else if(window.TWP.Data.Tracking.props.content_type=="blog"||window.TWP.Data.Tracking.props.content_type=="article"){var testArticle=ABT.get("newsletters-articleUnits");if(!testArticle.is("banner")&&!testArticle.is("bottom"))applyRrNewsletters(testArticle)}else applyRrNewsletters()});function trackProps(newsletterName,index,enhancedKey){var subsection=window.wp_subsection||"";var contentType=window.wp_content_type||"";var channel=window.wp_channel||"";var props={"eVar2":"wp - "+
subsection,"prop2":"wp - "+subsection,"prop3":contentType,"eVar17":contentType,"channel":channel};if(newsletterName&&index)props.eVar26="nl_rightrail_"+enhancedKey+"_"+newsletterName.toLowerCase().split(" ").join("-")+"_"+index;return props}function sendCustomTrackProps(eventKey,props,name){if(!!window.s)window.s.sendDataToOmniture(name||"PB Feature - Page-Newsletter",eventKey,props,{wait:true})}function onVisibilityChange(el,callBack){return function(){if(isElementInViewport(el))callBack()}}function isElementInViewport(el){if(typeof jQuery===
"function"&&el instanceof jQuery)el=el[0];var rect=el.getBoundingClientRect();return rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth)}})(jQuery);
(function($){try{function cleanUp(){$("li","#editors-picks-rr").each(function(i){var $this=$(this);var $headline=$(".headline",$this);var $number=$(".number",$this);var lineHeight=parseInt($headline.css("lineHeight"));if($headline.height()<=2*lineHeight)$headline.css({"padding-top":"7px","padding-bottom":"8px"});else if($headline.height()>3*lineHeight)while($headline.height()>3*lineHeight){$headline.text($headline.text().replace(/\.\.\.$/,""));$headline.text($headline.text().slice(0,-1));$headline.text($headline.text()+
"...")}})}cleanUp()}catch(e){}})(jQuery);
(function($,TWP){var applyStickiness=function(){var $window=$(window),$ad=$(".pb-f-ad-flex-3"),$nextStory=$(".pb-f-article-next-story"),$leaderboardAd=$(".pb-f-ad-leaderboard-2"),$rightRail=jQuery("#right-rail"),slotId="slug_flex_ss_bb_hp_3";if(!$rightRail.length)$rightRail=$ad.prev();$ad.on("DOMNodeInserted",function(e){var $el=$(e.target),id=$el.attr("id");if($el.is("iframe")&&id&&!/(hidden)/g.test(id)){$ad.off("DOMNodeInserted");afterAdInserted($el)}});var bindScrollDown=function(){var original_top=
$ad.offset().top,scrollTop,ad_left=$rightRail.offset().left,adWidth=$rightRail.width(),min_left=618;var getStopPoint=function(){var leaderboardAdTop=$leaderboardAd.length?$leaderboardAd.offset().top:$(document).height();var featureTop=$nextStory.is(":visible")?$nextStory.offset().top:leaderboardAdTop;return featureTop-$ad.height()-50};var applySticky=function(scrollTop){var stopPoint=getStopPoint();if(scrollTop>stopPoint){if($ad.hasClass("sticky")){$ad.removeClass("sticky");$ad.css({"top":stopPoint,
"position":"absolute"})}}else if(!$ad.hasClass("sticky")&&ad_left>min_left){$ad.css({"top":100,"left":ad_left,"width":adWidth,"position":"initial"});$ad.addClass("sticky")}};var removeSticky=function(){if($ad.hasClass("sticky")){$ad.attr("style","");$ad.removeClass("sticky")}};$window.off("scroll.flexAd3-sticky").on("scroll.flexAd3-sticky",function(){scrollTop=$window.scrollTop();if(scrollTop>original_top)applySticky(scrollTop);else removeSticky()});$window.off("resize.flexAd3-sticky").on("resize.flexAd3-sticky",
function(){ad_left=$rightRail.offset().left;if($ad.is(":visible")&&$ad.hasClass("sticky"))if(ad_left>min_left)$ad.css({"left":ad_left});else removeSticky()});$ad.on("flexAd3.remove_sticky",function(){$window.off("scroll.flexAd3-sticky");$window.off("resize.flexAd3-sticky");removeSticky()})};function startSticky(){if(!TWP.Features.Ad.flexAd3.sticky)return;if($ad.is(":visible"))bindScrollDown();else $window.on("resize.flexAd3-invisible",function(){if($ad.is(":visible"))bindScrollDown();else $ad.trigger("flexAd3.remove_sticky")})}
var afterAdInserted=function(){if(window.googletag&&googletag.pubadsReady)googletag.pubads().addEventListener("slotRenderEnded",function(event){if(event.slot.getSlotElementId()===slotId)startSticky()})}};if(TWP.Features.Ad.flexAd3&&TWP.Features.Ad.flexAd3.sticky)applyStickiness()})(jQuery,TWP);
(function($){TWP=window.TWP||{};TWP.PostTV=TWP.PostTV||{};TWP.PostTV.StickyPlayer=TWP.PostTV.StickyPlayer||{};var $root=$($(".pb-f-posttv-sticky-player")),$subRoot=$root.find(".posttv-sticky-player-video"),$vidWrapper=$root.find(".posttv-sticky-player-wrapper"),$textEl=$root.find(".posttv-sticky-player-text"),$caption=$root.find(".posttv-sticky-player-caption");TWP.PostTV.StickyPlayer.showPlayer=function(){$subRoot.removeClass("wpv-hidden")};TWP.PostTV.StickyPlayer.hidePlayer=function(){$subRoot.addClass("wpv-hidden")};
TWP.PostTV.StickyPlayer.showText=function(){$textEl.removeClass("wpv-hidden")};TWP.PostTV.StickyPlayer.hideText=function(){$textEl.addClass("wpv-hidden")};TWP.PostTV.StickyPlayer.updateBlurb=function(newBlurb){$caption.html(newBlurb)};var adjustSize=function(){var stickyWidth=$(window).width()*.3+12;if(stickyWidth>492)stickyWidth=492;else if(stickyWidth<156)stickyWidth=156;$root.css({"width":stickyWidth});$vidWrapper.css({"width":stickyWidth-12});$vidWrapper.css({"height":$vidWrapper.width()*9/16})};
$(window).off("resize.stickyPlayerResize").on("resize.stickyPlayerResize",function(){adjustSize()});adjustSize();function isElementInViewport(el,fract){if(typeof jQuery==="function"&&el instanceof jQuery)el=el[0];var fraction=fract||.8;var rect=el.getBoundingClientRect();var topOffsetAdjustment=0,$navBarEl=$("#nav-bar"),$breakingNewsEl=$(".pb-f-page-breaking-news-bar"),$shareBarEl=$(".top-sharebar-wrapper",".pb-f-sharebars-top-share-bar");if($navBarEl.length>0)topOffsetAdjustment+=$navBarEl.height();
if($breakingNewsEl.length>0)topOffsetAdjustment+=$breakingNewsEl.height();return rect.top+el.offsetHeight*fraction>=topOffsetAdjustment&&rect.left>=0&&rect.bottom-el.offsetHeight*fraction<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth)||rect.top<0&&rect.bottom>(window.innerHeight||document.documentElement.clientHeight)}var $players=$(".posttv-video-embed");var throttleInterval=5;var waitInterval=400;var lastTime=(new Date).getTime();
var isOut=false;var playerOutId;var waitTimeout;var $target=$("#posttv-sticky-player-wrapper");var $stickyClose=$(".posttv-sticky-player-exit");var outTracker=false;var closeTracker=false;var WAIT=false;function getExceptions(){var url="//projects.posttv.com/siteconfig/settings.json";$.getJSON(url,function(data){var excludeUrls=data["sticky-player-exclude-urls"];var isException=false;excludeUrls.forEach(function(url){if(window.location.href.indexOf(url)>-1)isException=true});if(!isException)initEventHandlers()})}
function safetyCheck(cb){clearTimeout(waitTimeout);waitTimeout=setTimeout(function(){WAIT=true;cb&&cb()},waitInterval)}function moveOut(id,$el,playerEmbed){if(!outTracker){playerEmbed.reportEvent("event8888","Sticky Player initialized");outTracker=true}playerOutId=id;isOut=true;$root.removeClass("wpv-hidden");clearTimeout(waitTimeout);if($target.get(0).style.display!="none")playerEmbed.animateTo($el,{fixed:true,zIndex:536870903,cb:function(){if(isOut)TWP.PostTV.StickyPlayer.showPlayer()}})}function moveBack($el,
playerEmbed){TWP.PostTV.StickyPlayer.hidePlayer();safetyCheck(function(){playerEmbed.animateTo($el,{cb:function(){WAIT=false}})});$root.addClass("wpv-hidden");isOut=false}function checkPlayers(){var $el=$($players.get(0));if($el.data("aspect-ratio")<.56||$el.data("aspect-ratio")>.57)return true;var id=$el.attr("id");var hasBeenVisible=$el.data("has-been-visible");var player=window.TWP&&TWP.PostTV&&TWP.PostTV.players?TWP.PostTV.players[id]:null;var playerEmbed=window.TWP&&TWP.PostTV&&TWP.PostTV.embeds?
TWP.PostTV.embeds[id]:null;var $wrap=$el.parent().hasClass("wpv-wrap")?$el.parent():$el.parent().parent().hasClass("wpv-wrap")?$el.parent().parent():null;if($wrap&&player&&player.player&&hasBeenVisible&&!closeTracker)if(isElementInViewport($wrap)&&isOut&&playerOutId===id)moveBack($wrap,playerEmbed);else if(!isElementInViewport($wrap)&&!isOut&&player.player.getState()==="playing")moveOut(id,$target,playerEmbed)}function initEventHandlers(){$(window).scroll(function(){var time=(new Date).getTime();
if(time-lastTime>throttleInterval&&isMobile&&!isMobile.any()&&!WAIT){lastTime=time;checkPlayers()}});$(window).resize(function(){if(isOut&&playerOutId)TWP.PostTV.embeds[playerOutId].animateTo($target,{fixed:true,speed:10,zIndex:536870903})});$stickyClose.click(function(){var playerEmbed=playerOutId?TWP.PostTV.embeds[playerOutId]:null;var player=TWP.PostTV.players[playerOutId];if(!closeTracker){playerEmbed.reportEvent("event8889","Sticky Player closed");closeTracker=true}if(playerEmbed){player.pause();
moveBack($("#"+playerOutId).parent(),playerEmbed)}})}var waitForPubSub=setInterval(function(){if(typeof PubSub!=="undefined"){clearInterval(waitForPubSub);PubSub.subscribe("playerCreated",function(msg,data){if(data.playerType!=="posttv-embed")return;var $el=$("#"+data.playerContainerId);$el.addClass("wpv-sticky");var $wrap=$el.parent().hasClass("wpv-wrap")?$el.parent():null;var playerEmbed=TWP&&TWP.PostTV&&TWP.PostTV.embeds?TWP.PostTV.embeds[$el.attr("id")]:null;if(!$wrap&&playerEmbed)playerEmbed.wrap()})}},
200);getExceptions();$(function(){$root.addClass("wpv-hidden")})})(jQuery);
(function(window,$,TWP){var console=new TWP.Tools.logger("re-engage");$.fn.idle=function(options){var defaults={idle:6E4,events:"mousemove keydown mousedown touchstart",onIdle:function(){},onActive:function(){},onHide:function(){},onShow:function(){},keepTracking:true,startAtIdle:false,recurIdleCall:false},idle=options.startAtIdle||false,visible=!options.startAtIdle||true,settings=$.extend({},defaults,options),lastId=null,resetTimeout,timeout;$(this).on("idle:stop",{},function(event){$(this).off(settings.events);
settings.keepTracking=false;resetTimeout(lastId,settings)});resetTimeout=function(id,settings){if(idle){settings.onActive.call();idle=false}clearTimeout(id);if(settings.keepTracking)return timeout(settings)};timeout=function(settings){var timer=settings.recurIdleCall?setInterval:setTimeout,id;id=timer(function(){idle=true;settings.onIdle.call()},settings.idle);return id};return this.each(function(){lastId=timeout(settings);$(this).on(settings.events,function(e){lastId=resetTimeout(lastId,settings)});
if(settings.onShow||settings.onHide)$(document).on("visibilitychange webkitvisibilitychange mozvisibilitychange msvisibilitychange",function(){if(document.hidden||document.webkitHidden||document.mozHidden||document.msHidden){if(visible){visible=false;settings.onHide.call()}}else if(!visible){visible=true;settings.onShow.call()}})})};var ReEngageMonitor=function(){var callback;var direction="unknown";var lastDate=-1;var lastScrollTop=-1;var thisMinimumTrackingDelayInMs=250;function init(callbackMethod){callback=
callbackMethod;window.addEventListener("scroll.reEngage",function(e){e.preventDefault();var scrollTop=$(this).scrollTop();e.timeStamp=(new Date).getTime();didScroll(e.timeStamp,scrollTop)},true);$(window).on("scroll.reEngage",function(e){var scrollTop=$(this).scrollTop();e.timeStamp=(new Date).getTime();didScroll(e.timeStamp,scrollTop)});$(window).on("touchstart",function(e){var scrollTop=$(this).scrollTop();didScroll(e.timeStamp,scrollTop)})}function didScroll(timeStamp,scrollTop){if(lastDate+thisMinimumTrackingDelayInMs<=
timeStamp){var offset=Math.abs(scrollTop-lastScrollTop);var direction=getDirection(scrollTop);var delayInMs=timeStamp-lastDate;var speedInPxPerMs=offset/delayInMs;if(speedInPxPerMs>0)callback(speedInPxPerMs,timeStamp,direction);lastDate=timeStamp}}function getDirection(scrollTop){var currentScrollTop=lastScrollTop;lastScrollTop=scrollTop;if(currentScrollTop>-1){if(currentScrollTop>=scrollTop)return"up";return"down"}return"unknown"}function reset(){direction="unknown";lastDate=-1;lastScrollTop=-1}
return{init:init}}();var ReEngageScroller=function(){var direction="unknown";var jQueryElement=null;var targetHeight=$(document).height();var requiredSpeedInPxPerMs=3;var $storyContainer=null;function init(starOverlay,clickThru){jQueryElement=starOverlay;$storyContainer=starOverlay.find(".re-engage-secondary");$(document).on("click",".re-engage-close",function(event){if($(this).hasClass("fa-chevron-down")||$(this).hasClass("fa-remove")){shrinkScroller();trackingFeature("collapse","event80")}});$(document).on("click",
".js-re-engage-sm",function(event){growScroller();trackingFeature("expand","event80")});$(document).on("click",".re-engage-ad-close",function(event){hideBigLogo()});$(document).on("click",".re-engage-ad-sm",function(event){hideSmallLogo()});ReEngageMonitor.init(function(speedInPxPerMs,timeStamp,newDirection){if(direction!=newDirection){jQueryElement.removeClass("up down").addClass(newDirection);direction=newDirection}var visible=jQueryElement.is(":visible");if(requiredSpeedInPxPerMs<=speedInPxPerMs)if(jQueryElement.length&&
!visible){$(".js-re-engage-click").on("click",function(event){event.preventDefault();window.open(clickThru)});if($("#floating-bb-content").length)return;disableAd();jQueryElement.css("opacity",1).fadeIn(3E3);if(TWP.Features.Page.ReEngage.isCarousel)repositionSlick($storyContainer);$(document).trigger("idle:stop");trackingFeature("show","event66");ReEngageRendering.trackDisplay();$(window).off("scroll.reEngage")}})}function repositionSlick($storyContainer){if(!$storyContainer.hasClass("slick-initialized"))$storyContainer.on("init",
function(){$storyContainer.slick("setPosition")});else $storyContainer.slick("setPosition")}function shrinkScroller(){var min_height=$(".re-engage-big").data("min-height");$(".re-engage-big").animate({height:min_height+"px"},function(){$(this).addClass("js-re-engage-sm");$(this).find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up")})}function growScroller(){var max_height=$(".re-engage-big").data("max-height");$(".re-engage-big").animate({height:max_height+"px"},function(){$(this).removeClass("js-re-engage-sm");
$(this).find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down")})}function hideBigLogo(){$(".re-engage-ad-big").slideUp("slow",function(){$(".re-engage-ad-sm").slideDown("slow");jQueryElement.css("opacity",1)})}function hideSmallLogo(){$(".re-engage-ad-sm").slideUp("slow",function(){$(".re-engage-ad-big").slideDown("slow");jQueryElement.css("opacity",1)})}return{init:init}}();var ReEngageRendering=function(){var client,displayStoryNum;function _failure(){$(".re-engage-wrapper").remove();
$(window).off("scroll.reEngage")}function render(recommendations){if(!recommendations||recommendations.length===0)return _failure();var content="",$storyContainer=$(".re-engage-secondary"),recommendation;for(var i=0;i<recommendations.length;i++){recommendation=recommendations[i];if(i<displayStoryNum)content+=renderItem(recommendation,i)}if($storyContainer.length&&content){$storyContainer.html(content);trackClick($storyContainer);if(TWP.Features.Page.ReEngage.isCarousel){$storyContainer.slick({arrows:true,
rtl:false});$storyContainer.on("afterChange",function(event,slick,currentSlide,nextSlide){var eVar26="swipe-"+currentSlide;trackingFeature(eVar26,"event80")})}}}function renderItem(recommendation,index){var img='\x3cimg alt\x3d"" src\x3d"'+renderImgURL(recommendation,75,75)+'"'+' data-hi-res-src\x3d"'+renderImgURL(recommendation,75,75)+'"'+' data-low-res-src\x3d"'+renderImgURL(recommendation,75,75)+'"'+' data-threshold\x3d"112" class\x3d"re-engage-photo"\x3e';return'\x3cdiv class\x3d"re-engage-recommend"\x3e\x3ca href\x3d"'+
recommendation.url+"?tid\x3da_reengage-"+index+'" class\x3d"re-engage-text-link"\x3e'+img+'\x3cdiv class\x3d"re-engage-headline"\x3e'+recommendation.headline+"\x3c/div\x3e\x3c/a\x3e\x3c/div\x3e"}function renderImgURL(recommendation,w,h){var url=recommendation.photo.path;return"https://img.washingtonpost.com/wp-apps/imrs.php?src\x3d"+encodeURIComponent(url)+"\x26w\x3d"+w+"\x26h\x3d"+h}function trackClick($storyContainer){$storyContainer.on("click","a",null,function(ev){var link=this,href=link.href;
client.clicked(href);setTimeout(function(){document.location=href},200);return false})}function trackDisplay(){client.rendered()}function preload(){displayStoryNum=1;if(TWP.Features.Page.ReEngage.isCarousel)displayStoryNum=3;client=new TWP.Perso.Recommend("re-engage-v1",displayStoryNum);client.recommend().done(function(data){render(data["results"])}).fail(_failure)}return{preload:preload,trackDisplay:trackDisplay}}();var enableReEngage=function(){var $scrollStars=$(".re-engage-wrapper"),$closeIcon=
$(".re-engage-close");if($scrollStars.length&&wp_pb.BrowserInfo.mobile_browser&&!wp_pb.BrowserInfo.tablet){ReEngageRendering.preload();TWP.Features.Page.ReEngage.isCarousel?$closeIcon.addClass("fa-remove"):$closeIcon.addClass("fa-chevron-down");var idleTimeInMiliseconds=3E4;console.log("Inactive start");$(document).idle({onIdle:function(){console.log("Showing re-engage");var $engageElm=$(".re-engage-wrapper");disableAd();if($engageElm.length&&!$engageElm.is(":visible")&&!$("#floating-bb-content").length){$(document).trigger("idle:stop");
$engageElm.css("opacity",1).fadeIn(1500);if(TWP.Features.Page.ReEngage.isCarousel)$(".re-engage-secondary").slick("setPosition");trackingFeature("show","event66");ReEngageRendering.trackDisplay()}},events:"mousemove keydown mousedown touchstart scroll",idle:idleTimeInMiliseconds});ReEngageScroller.init($scrollStars)}};var disableAd=function(){var $bottomAd=$("#slug_fixedBottom");if($bottomAd.length)$bottomAd.remove();else $("body").on("DOMNodeInserted",function(e){var $el=$(e.target),id=$el.attr("id");
if($el.is("div")&&id&&id==="slug_fixedBottom")$el.remove()})};var trackingFeature=function(ev,eNum){if(typeof window.sendDataToOmniture==="function"){var eventName="reengage-"+ev,varName="a_reengage-"+ev,subsection=window.wp_subsection;if(subsection.indexOf("wp")<0)subsection="wp - "+subsection;var data={pageName:window.wp_page_name,eVar1:window.wp_page_name,prop2:subsection,eVar2:window.wp_channel,prop3:window.wp_content_type,eVar17:window.wp_content_type,eVar26:varName};sendDataToOmniture(eventName,
eNum,data)}};$(window.document).on("abtest-ready",function(e,ABT){var test=ABT.get("reengage-recommend_i3");if(test.is("carousel"))TWP.Features.Page.ReEngage.isCarousel=true})})(window,jQuery,TWP);
(function($){})(jQuery);
(function($,window){function noticeError(app,error,context){$.ajax("https://errors.perso.nile.works/error",{contentType:"application/json",processData:false,dataType:"json",type:"POST",data:JSON.stringify({app:app,error:error,context:context,location:document.location.toString()})})}var svi="";var sviFull=document.cookie.match(/s_vi=([^;]+)/)?RegExp.$1:"";try{if(sviFull&&sviFull!==""){svi=sviFull.replace(/.*\|/,"").replace(/\[.*/,"").split("-");svi=svi[0]+"-"+svi[1]}}catch(e){svi=""}var loxodoId=
null;try{loxodoId=localStorage.getItem("wp_vi")}catch(e){}var ttlForusersegments=1;function getHoursSinceLastTime(lastTime){var datetime=(new Date(lastTime)).getTime();var now=(new Date).getTime();var milisec_diff=null;if(isNaN(datetime))return ttlForusersegments+1;if(datetime<now)milisec_diff=now-datetime;else milisec_diff=datetime-now;var date_diff=Math.floor(milisec_diff/1E3/60/60);return date_diff}function isParamValid(variable){return variable!==null&&variable!=="null"}function isUserSegmentsInvalidOrStale(){usersegments=
localStorage.getItem("usersegments");if(!isParamValid(usersegments))return true;else{var json=JSON.parse(usersegments);var usersegmentsstoragetime=json.updated;if(getHoursSinceLastTime(usersegmentsstoragetime)>=ttlForusersegments)return true}return false}function saveKeyValue(key,value){if(window.localStorage){localStorage.setItem(key,value);if(window.JSON){var obj=localStorage.getItem("usersegmentsAdops");if(!obj)obj={};else obj=JSON.parse(obj);obj[key]=value;localStorage.setItem("usersegmentsAdops",
JSON.stringify(obj))}}}function setCookies(data){if(!data||!data.segmentsFlag||!data.segmentsFlag["7688613820"])return;document.cookie="us.7688613820\x3d"+data.segmentsFlag["7688613820"]+";expires\x3d"+(new Date(Date.now()+365*24*3600*1E3)).toUTCString()+";domain\x3d"+"."+document.location.hostname.split(".").slice(-2).join(".")+";path\x3d/"}function setAdopsData(data){var value=null;if(data&&data.segmentsFlag){value=data.segmentsFlag["7978704408"];if(value=="8936"){saveKeyValue("8936",1);saveKeyValue("9868",
0);saveKeyValue("6136",0)}else if(value=="9868"){saveKeyValue("8936",0);saveKeyValue("9868",1);saveKeyValue("6136",0)}else if(value=="6136"){saveKeyValue("8936",0);saveKeyValue("9868",0);saveKeyValue("6136",1)}else{saveKeyValue("8936",0);saveKeyValue("9868",0);saveKeyValue("6136",0)}value=data.segmentsFlag["5497328667"];if(value=="7204"){saveKeyValue("7204",1);saveKeyValue("0862",0);saveKeyValue("2467",0);saveKeyValue("0668",0)}else if(value=="0862"){saveKeyValue("7204",0);saveKeyValue("0862",1);
saveKeyValue("2467",0);saveKeyValue("0668",0)}else if(value=="2467"){saveKeyValue("7204",0);saveKeyValue("0862",0);saveKeyValue("2467",1);saveKeyValue("0668",0)}else{saveKeyValue("7204",0);saveKeyValue("0862",0);saveKeyValue("2467",0);saveKeyValue("0668",1)}var newsletters=["6362","3552","3433","7543","8636","5723","2748","3522","5263"];var list=[];value=data.segmentsFlag["1599213719"];if(value&&value.length>0)list=value.split(",");for(var i=0;i<newsletters.length;i++){var nl=newsletters[i];if(list.indexOf(nl)>
-1)saveKeyValue(nl,1);else saveKeyValue(nl,0)}}}if(window.localStorage&&window.JSON)if(isUserSegmentsInvalidOrStale())$.ajax("https://usersegment.wpdigital.net/usersegments",{type:"POST",dataType:"json",processData:false,contentType:"application/json",data:'{"userid": "'+svi+'"}'}).done(function(data){if(isParamValid(data)){setCookies(data);setAdopsData(data);data.updated=new Date;localStorage.setItem("usersegments",JSON.stringify(data))}}).fail(function(errorResponse){noticeError("usersegments",
"ajax-error",errorResponse)});var hasStorage=function(){var storageTest=new Date;try{localStorage.setItem(storageTest,storageTest);localStorage.removeItem(storageTest);return true}catch(e){return false}}();function normalizeURL(url,params){var str=(url||"").trim();str=str.replace(/^(https?:)?\/\//,"");str=str.replace(/\?.*/,"");if(params)str=str.replace(/\/$/,"");return str}function extractParam(param){var rgx=new RegExp(".*[?\x26]"+param+"\x3d([^\x26]+).*");if(rgx.test(document.location.toString()))return document.location.toString().replace(rgx,
"$1");else return""}var clavisAuxiliaries=window.wp_meta_data&&wp_meta_data.clavis&&wp_meta_data.clavis.auxiliaries,canonicalUrl=$('link[rel\x3d"canonical"]').attr("href"),userId=!!document.cookie.match(/s_vi=([^;]+)/)?RegExp.$1:"unavailable";if(!canonicalUrl)canonicalUrl=[window.location.host,window.location.pathname].join("");var contentType="";try{contentType=TWP.Data.Tracking.props.content_type}catch(e){}var dataPayload={"articleid":normalizeURL(canonicalUrl,true),"referrer":normalizeURL(document.referrer),
"contentType":contentType,"wpisrc":extractParam("wpisrc"),"tid":extractParam("tid"),"userid":userId,"uuid":!!document.cookie.match(/wapo_login_id=([^;]+)/)?RegExp.$1:"","auxiliaries":!!clavisAuxiliaries?clavisAuxiliaries:[],"wp_meta_data":window.wp_meta_data||null,"isMobile":window.isMobile&&window.isMobile.any()};var targetingServerUrl=TWP&&TWP.Features&&TWP.Features.Page&&TWP.Features.Page.Targeting&&TWP.Features.Page.Targeting.endpointServer;$.ajax({url:!!targetingServerUrl?targetingServerUrl:
"//targeting.wpdigital.net/TargetingWebAPP/targeting",type:"POST",contentType:"application/json",dataType:"JSON",data:JSON.stringify(dataPayload)}).done(function(response){if(hasStorage)if(!!response){var auxMap=response.aux_map&&response.aux_map.join(",");if(auxMap)localStorage.setItem("targeting_aux_map",auxMap);else localStorage.setItem("targeting_aux_map","")}else localStorage.setItem("targeting_aux_map","")}).fail(function(errorResponse){noticeError("targeting","ajax-error",errorResponse)});
if(true){dataPayload.uuid=loxodoId;dataPayload.userid=loxodoId;$.ajax({url:"https://targeting-userprofile-arc-wpost-prod.arc.nile.works/TargetingWebAPP/targeting",type:"POST",contentType:"application/json",dataType:"JSON",data:JSON.stringify(dataPayload)})}})(jQuery,window);
(function magnetAnonymous(window,$,wp_pb,undefined){var SCROLL_INTERVAL=200;var DEFAULT_DEBOUNCE=100;var UP_OFFSET=-175;var DOWN_OFFSET=-10;var WINDOW_TOP_OFFSET=0;var SCREEN_BOTTOM_OFFSET=600;logMagnetTag();$(function(){var $w=$(window);var $d=$(document);var $r=$("html");var $h=$(".pb-f-page-header-v2");var $instance=$(".pb-f-page-magnet");$instance.each(function(){var $el=$(this);$el.insertAfter($h);init($el)});function init($container){var $modulearea=$container.find(".pb-module-area");var $isMobile=
$("html").hasClass("mobile");if($isMobile)makeTitle().insertBefore(".pb-f-page-magnet").addClass("mb-title");else{makeTitle().insertAfter(".pb-magnet-controls").addClass("desk-title");$(".desk-title").addClass("showInlineBlock")}var $ctrl={};$ctrl.$container=$container.find(".pb-magnet-controls");$ctrl.$mvleft=$ctrl.$container.find(".pb-magnet-mvleft");$ctrl.$mvright=$ctrl.$container.find(".pb-magnet-mvright");$container.data("magnetControl",$ctrl);var $title=$modulearea.find(".pb-magnet-title");
applyTitleCase($title.find(".pb-magnet-h2.magnet-title-case"));$modulearea.find('[data-pb-magnet-first\x3d"true"]').insertAfter($title);var $items=$container.find(".pb-magnet-item");var $imgs=$items.find(".pb-magnet-article-image");if($items.length==0)return;var tagname=$modulearea.data("tag");var omniParams=params($modulearea.data("omni"));tagLinks(omniParams);attachNavEvents();$modulearea.css("display","");function attachNavEvents(){applyLazyload();var edown="mousedown.magnet";if(!touchDevice()){containerScroll(function(){applyNavVisibility()});
$ctrl.$mvleft.off(edown).on(edown,function(){var value=Math.max(0,$container.scrollLeft()-computeWidth());moveScroll(value)});$ctrl.$mvright.off(edown).on(edown,function(){var value=$container.scrollLeft()+computeWidth();moveScroll(value)});registerOnce("nav","start_open",debounce(function(){down()},DEFAULT_DEBOUNCE,true))}else windowTop(function(){if(WINDOW_TOP_OFFSET>=$w.scrollTop())down()});registerOnce("nav","start_close",debounce(function(){up()},DEFAULT_DEBOUNCE,true));registerOnce("magnet",
"start_open",debounce(function(){if(tagname&&!!window.s)s.sendDataToOmniture("magnet_open","",{prop72:tagname})},DEFAULT_DEBOUNCE,true));function computeWidth(){var winwidth=$w.width();var itemwidth=$items.first().width();return Math.floor(winwidth/itemwidth)*itemwidth}}function params(value){var params=value?value.split("\x26"):[value];var result=[];if(params.length>0)$.each(params,function(index,value){var param=value.split("\x3d");result.push(param)});return result}function tagLinks(params){$modulearea.find("a").each(function(){var $a=
$(this);var url=$a.attr("href");$.each(params,function(index,param){url=updateUrlParam(url,param[0],param[1])});$a.attr("href",url)})}function registerOnce(arg1,arg2,fn){var regdata=[arg1,arg2];var regname=regdata.join(":");if(!$container.data(regname))wp_pb.register(regdata[0],regdata[1],fn);$container.data(regname,true)}function applyNavVisibility(){$ctrl.scrollleft=$container.scrollLeft();$ctrl.leftoffset=$container.scrollLeft()+$container.width();var rightbound=$modulearea[0].offsetWidth-$ctrl.leftoffset<=
0;$ctrl.$mvleft.toggle(!!$ctrl.scrollleft);$ctrl.$mvright.toggle(!rightbound)}function applyLazyload(){var sename="scroll.magnet-lazy";var reveal=0;$container.off(sename).on(sename,debounce(function(){lazy()},1,true));lazy();function lazy(){var count=Math.max(reveal,computeNumberOfImages());if(!!count&&"NaN"!==count.toString()&&reveal!==count){reveal=count;$imgs.filter(":lt("+reveal+")").each(function(){var $el=$(this);$el.attr("src",$el.data("original"))})}}function computeNumberOfImages(){return Math.ceil(($container.scrollLeft()+
($container.width()||$(window).width()))/$items.first().width())}}function nearBottom(){return $w.scrollTop()>=$d.height()-$w.height()-SCREEN_BOTTOM_OFFSET}function down(){$r.addClass("magnet");$(".mb-title").addClass("showBlock");if(!nearBottom())$r.addClass("magnet-nudge");if(touchDevice())$container.add(".mb-title").addClass("magnet-open");else $container.addClass("magnet-open").css({top:DOWN_OFFSET});wp_pb.report("magnet","start_open")}function up(){$r.removeClass("magnet magnet-nudge");$(".mb-title").removeClass("showBlock");
if(touchDevice())$container.add(".mb-title").removeClass("magnet-open");else $container.removeClass("magnet-open").css({top:UP_OFFSET});wp_pb.report("magnet","start_close")}function containerScroll(fn){var scroll;var rename="resize.magnet";$w.off(rename).on(rename,function(){scroll=true});var sename="scroll.magnet";$container.off(sename).on(sename,function(){scroll=true});var tid;setInterval(function(){if(scroll){if(tid)clearTimeout(tid);tid=setTimeout(function(){fn()},SCROLL_INTERVAL)}scroll=false},
SCROLL_INTERVAL)}function getTitleHtml(){return $("#PageMagnetTitle").html()}function makeTitle(){return $(getTitleHtml())}function windowTop(fn){var atop=false;var tid;var sename="scroll.magnet";$w.off(sename).on(sename,function(){var top=$(window).scrollTop();if(!atop&&top==0){atop=true;if(tid)clearTimeout(tid);tid=setTimeout(function(){fn()},SCROLL_INTERVAL)}else if(top>=0)atop=false})}function moveScroll(value){$container.stop().animate({scrollLeft:value},"slow")}}function touchDevice(){return $r.hasClass("touch")}
});function titleCase(strValue){var str=strValue.replace(/([^\W_]+[^\s-]*) */g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()});var lowers=["A","An","The","And","But","Or","For","Nor","As","At","By","For","From","In","Into","Near","Of","On","Onto","To","With"];var i,j;for(i=0,j=lowers.length;i<j;i++)str=str.replace(new RegExp("\\s"+lowers[i]+"\\s","g"),function(txt){return txt.toLowerCase()});var uppers=["Id","Tv"];for(i=0,j=uppers.length;i<j;i++)str=str.replace(new RegExp("\\b"+
uppers[i]+"\\b","g"),uppers[i].toUpperCase());return str}function applyTitleCase($el){var title=titleCase(($el.text()||"").replace(/_/gi," "));$el.text(title)}function updateUrlParam(url,key,value){var n=new RegExp("([?\x26])"+key+"\x3d.*?(\x26|$)","i");var i=-1!==url.indexOf("?")?"\x26":"?";return url.match(n)?url.replace(n,"$1"+key+"\x3d"+value+"$2"):url+i+key+"\x3d"+value}function logMagnetTag(){var tagname;var modulearea=document.getElementsByClassName("pb-f-page-magnet")[0].getElementsByClassName("pb-module-area")[0];
tagname=modulearea&&modulearea.getAttribute("data-tag");if(tagname&&!!window.s)s.prop55=tagname}function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args)}}})(window,jQuery,wp_pb);
(function($){function makeLoadFeatureFunc(baseConfig){baseConfig=baseConfig||{};return function(config,options){var conf=$.extend(baseConfig,config);wp_pb.StaticMethods.loadFeature(conf,options)}}var loaderInstances=$(".pb-f-tools-feature-loader");loaderInstances.each(function(i,el){var $el=$(el);var $config=$(".conditions-config",$el);var id=$el.attr("id");if(!$config||!id)return;var loadFeature=makeLoadFeatureFunc({el:id});var actionFuncs={loadFeature:loadFeature};var config=$config.data();var conditionsURL=
config.conditionsurl;var conditions=config.conditions;if(conditions)handler(conditions);if(conditionsURL)$.get(conditionsURL).then(handler).then(null,function(e){console.error(e)});function handler(configs){ConditionManager.makeFromConfig({configs:configs,conditionFuncs:wp_pb.conditions,actionFuncs:actionFuncs})}})})(window.jQuery);
(function(m,d,b){function f(a){return function(c,g,b){if(g)a[c]={when:g,setup:b},b&&(a[c]._setupResult=!!b.call(a[c]));else if(a[c])return!!a[c].when.call(a[c],a[c]._setupResult)}}function h(){var a=navigator.userAgent;return a.match(/Android/i)||a.match(/webOS/i)||a.match(/iPhone/i)||a.match(/iPad/i)||a.match(/iPod/i)||a.match(/BlackBerry/i)||a.match(/Kindle/i)||a.match(/Windows Phone/i)||a.match(/IEMobile/i)?!0:!1}function k(a){var c=localStorage.getItem("_vsData")||"{}";return JSON.parse(c)[a]}
function l(a,c){var b=localStorage.getItem("_vsData")||"{}",b=JSON.parse(b);b[a]=c;c=JSON.stringify(b);localStorage.removeItem("_vsData");localStorage.setItem("_vsData",c)}var e=d._vsdata=d._vsdata||{};b=function(a,c,b){return f(e).call(this,a,c,b)};b.clone=function(a){a=a?m.extend(!0,{},e):e;return f(a)};b("desktop",function(){return!h()});b("mobile",function(){return h()});b("touch",function(){return!!("ontouchstart"in d)});b("first_visit",function(){var a=k("first_time_start"),b=k("first_time_end");
if(a&&!b&&18E5<=(new Date).getTime()-(new Date(a)).getTime())return l("first_time_end",!0),!1;if(a)return!b;l("first_time_start",(new Date).getTime());return!0});return d.VisitorSegment=b})(jQuery,window);var TWP=window.TWP||{};TWP.ABTestUser=TWP.ABTestUser||{};
(function ABTestAnonymous($,TWP,VisitorSegment,undefined){var VERSION="1.0.2";var OPT_OUT_KEY="ABT__OO";var IGNORE_BL_KEY="ABT__ib";var LOCAL_TRUE="yes";var LOCAL_FALSE="no";var featureData={};var bucketData={};var disabled;var ignoreBlacklist;var state="uninitialized";var $d=$(window.document);var ABT={init:function(data){disabled=!data;$d.trigger("abtest-before",[ABT]);ABT.applyData(data);if(state!="initialized")$d.trigger("abtest-ready",[ABT]);state="initialized";$d.trigger("abtest-init",[ABT])},
state:function(){return state},trackBefore:function(eventHandler){bindTop($d,ABT.trackPageviewEventBefore(),eventHandler)},trackAfter:function(eventHandler){bindTop($d,ABT.trackPageviewEventAfter(),eventHandler)},trackValueDelimeter:function(){return TWP.ABTestUser.trackValueDelimeter},trackPageviewEventBefore:function(){return TWP.ABTestUser.trackPageviewEventBefore},trackPageviewEventAfter:function(){return TWP.ABTestUser.trackPageviewEventAfter},trackSendHandler:function(){var method=str2obj(TWP.ABTestUser.trackSendHandler);
return"function"==typeof method?method:function(){}},trackSetHandler:function(){var method=str2obj(TWP.ABTestUser.trackSetHandler);return"function"==typeof method?method:function(){}},trackUnsetHandler:function(){var method=str2obj(TWP.ABTestUser.trackUnsetHandler);return"function"==typeof method?method:function(){}},applyData:function(dataValue){var data;if(!disabled&&detectLocalStorage()&&!optOut()){data={features:[]};ignoreBlacklist=getLocalItem(IGNORE_BL_KEY);$.each(dataValue||[],function(index,
bucket){if("boolean"==typeof bucket.disabled&&!bucket.disabled)$.merge(data.features,bucket.features)});ABT.bucket(data)}},bucket:function(data){bucketData=data;var features;if(!data.disabled){features=data.features||[];$.each(features,function(index,feature){setFeature(feature)})}},ignoreBlacklist:function(value){if(!value){ignoreBlacklist=undefined;removeLocalItem(IGNORE_BL_KEY)}else{ignoreBlacklist=LOCAL_TRUE;setLocalItem(IGNORE_BL_KEY,LOCAL_TRUE)}},optOut:function(){setLocalItem(OPT_OUT_KEY,LOCAL_TRUE);
$d.trigger("abtest-optout",[ABT])},get:function(name,skipTrack){var feature=!disabled&&featureData[name]||{};var variation=feature.variation||new Variation(feature);if(!skipTrack&&feature.variation&&!variation._trackset){variation._trackset=true;ABT.trackBefore(function(){variation.setTrackVars()});ABT.trackAfter(function(){variation.unsetTrackVars()})}return variation},clear:function(){$.each(bucketData.features,function(i,f){unregisterVariation(f.name)})},forceTest:function(featureName,variantName){var key=
makeKeyNames(featureName);setLocalItem(key.name,variantName);setLocalItem(key.visit,LOCAL_TRUE);setLocalItem(key.computed,LOCAL_TRUE);setLocalItem(key.force,LOCAL_TRUE)}};ABT.$handlers={applyClass:function(isVariant,feature,variant){this.removeClass("abt-not-loaded").addClass("abt-"+feature+"-"+variant+"-"+isVariant)}};$.fn.extend({biAbtest:function(handlerName,name,cb){var config=getConfig(name);var ftr=ABT.get(config.feature);var is=ftr.is(config.variant);function getConfig(name){var n=name.split(".");
return{feature:n[0],variant:n[1]}}if(!config.feature||!config.variant)return;return this.each(function(){var $el=$(this);ABT.$handlers[handlerName].call($el,is,config.feature,config.variant);if(cb)cb.call($el,is,config.feature,config.variant)})}});TWP.ABTest=ABT;TWP.ABTest.version=VERSION;VisitorSegment("abtest-init:v"+VERSION,function(){return true});ABT.init(TWP.ABTestBucket);function initError(msg){$d.trigger("abtest-fail",[["init",msg].join(": ")])}function Feature(data){var name=data.name||"";
var key=makeKeyNames(name);var increment=data.increment||0;var variations=data.variations||[];var persist=data["x-persist"]||false;var blacklist=data.blacklist&&data.blacklist.referrers||[];var blacklisted=getLocalItem(key.blacklisted)==LOCAL_TRUE;var bopt={domains:blacklist,segment:{}};var segmentName;for(segmentName in data.segment)bopt.segment[segmentName]=!!data.segment[segmentName];var included=!notInSegment(bopt.segment);if(!blacklisted&&!getLocalItem(key.blacklisted)){blacklisted=isBlacklisted(bopt.domains)||
!included;setLocalItem(key.blacklisted,blacklisted?LOCAL_TRUE:LOCAL_FALSE)}var enabled=!!variations.length;var variation=variations.length&&new Variation(registerVariation(name,variations,blacklisted,increment,included,persist));if(enabled&&data.active&&!variation.nocollect){this.name=name;this.variation=variation}var defaultTrack=enabled&&data.active?data.defaultTrack:[];if(blacklisted)$.merge(defaultTrack,data.blacklist&&data.blacklist.track||[]);if(defaultTrack.length&&variation.nocollect)this.variation=
new Variation({variation:{track:!included?[]:defaultTrack}});if((!enabled||!variation||!included)&&LOCAL_TRUE!=getLocalItem(key.force))unregisterVariation(name)}function Variation(objValue){var obj=objValue||{};this.nocollect=!obj.collect;var data=obj.variation||{};this.name=data.name||"";this.trackvars=data.track||[];this.customOptions=data.customOptions||{};var _self=this;this.is=function(name){return name?name===_self.name:false};this.getTrackVar=function(name,prepend,delimiterValue){var result=
[];$.each(_self.trackvars,function(index,trackvar){if(makeTrackvarName(name)===makeTrackvarName(trackvar.name))result.push(trackvar.value)});var delimiter=delimiterValue||ABT.trackValueDelimeter();result=result.join(delimiter);return result&&(prepend?prepend+delimiter:"")+result};this.sendTrackVars=function(setOp,eventKey,extraOptions){var payload=trackingPayload();var trackargs=["Darwin - TrackVar",eventKey||"",payload,extraOptions];if(setOp)ABT.trackSetHandler().apply(ABT,[payload]);else ABT.trackSendHandler().apply(ABT,
trackargs);$d.trigger("abtest-tracksend",trackargs)};this.unsetTrackVars=function(){var payload=trackingPayload();ABT.trackUnsetHandler().apply(ABT,[payload])};this.setTrackVars=function(){var payload=trackingPayload();ABT.trackSetHandler().apply(ABT,[payload])};this.sendCustomTrackVar=function(){return undefined};this.unsetCustomTrackVar=function(){return undefined};this.setCustomTrackVar=function(){return undefined};function trackingPayload(){var payload={};$.each(_self.trackvars,function(index,
trackvar){var svar;if(!trackvar.dynamic){svar=makeTrackvarName(trackvar.name);payload[svar]=payload[svar]||[];payload[svar].push(trackvar.value)}});return payload}}function registerVariation(name,variations,blacklisted,increment,included,persist){var key=makeKeyNames(name);var his={cur:persist?"":testHash(name,variations,blacklisted,increment),old:persist?"":getLocalItem(key.hash)};var i=getLocalItem(key.name);var r=LOCAL_TRUE==getLocalItem(key.visit);var t=LOCAL_TRUE==getLocalItem(key.computed);
var f=LOCAL_TRUE==getLocalItem(key.force);var compare=function(a,b){var a=parseFloat(a.customOptions.target);var b=parseFloat(b.customOptions.target);if(a<b)return-1;if(a>b)return 1;return 0};var v=findByProp(variations,"name",i);if(included&&(!t&&!blacklisted&&("string"!==typeof i&&!v)||!f&&!!t&&his.cur!=his.old)){variations.sort(compare);var ranges=[];var g=0;var h=0;$.each(variations,function(index,variant){var v=variant.customOptions&&variant.customOptions.target;if(v){v=parseFloat(v)/100;g+=
v;var result={value:[h,g]};h+=v;ranges.push(result)}});var rc=randChance();$.each(ranges,function(index,range){if(between(rc,range.value[0],range.value[1]))i=index});v=variations[i];if(v)setLocalItem(key.name,v.name);else setLocalItem(key.name,"_default")}setLocalItem(key.visit,LOCAL_TRUE);setLocalItem(key.computed,LOCAL_TRUE);setLocalItem(key.hash,his.cur);var result=v&&(!blacklisted||r)&&{variation:v,collect:true};return result}function testHash(name,variations,blacklisted,increment){var vnames=
[];$.each(variations,function(index,variation){var o=variation.customOptions;var ostr="";if(o)for(n in o)if(o.hasOwnProperty(n))ostr+=[n,o[n]].join("\x3d");vnames.push(variation.name+ostr)});var result=[name,vnames.sort().join(""),!!blacklisted,increment].join("");return result}function unregisterVariation(name){var key=makeKeyNames(name);removeLocalItem(key.name);removeLocalItem(key.visit);removeLocalItem(key.blacklisted);removeLocalItem(key.computed);removeLocalItem(key.hash);removeLocalItem(key.force)}
function findByProp(arr,prop,value){var result;$.each(arr,function(i,item){if(item[prop]==value){result=item;return false}});return result}function makeTrackvarName(value){if(!value)throw new Error("trackvar: invalid name");return value.toLowerCase()}function makeKeyNames(name){return{name:"ABT__"+name,visit:"ABT__"+name+"__visit",blacklisted:"ABT__"+name+"__blstd",computed:"ABT__"+name+"__cmpted",hash:"ABT__"+name+"__hash",force:"ABT__"+name+"__force"}}function randChance(){return Math.random(0,
1)}function between(x,min,max){return x>=min&&x<=max}function getFeature(name){return featureData[name]}function setFeature(data){if(!data.name)throw new Error("Feature: missing name");var feature=new Feature(data);if(!$.isEmptyObject(feature))featureData[data.name]=feature}function isBlacklisted(domainsValue){var domains=domainsValue||[];function regescape(str){return str.replace(/\./g,"\\.").replace(/\-/g,"\\-")}function check(domain){var reg=new RegExp("^(http://)?(www\\.)?"+regescape(domain),
"gi");return!domain&&!document.referrer||(domain&&document.referrer.match(reg)||[]).length>0}var result;if(!ignoreBlacklist)$.each(domains,function(index,domain){result=check(domain);return!result});return result}function notInSegment(segmentValue){var segment=segmentValue||{};var result;var count=0;var segmentName;for(segmentName in segment)if(segment.hasOwnProperty(segmentName)){result=result||(!!segment[segmentName]?!!VisitorSegment(segmentName):false);if(!!segment[segmentName])count++}return 0!==
count?!result:1==Object.keys(segment).length?!VisitorSegment(segment[0]):false}function detectLocalStorage(){var str="_abti_";try{setLocalItem(str,str);removeLocalItem(str);return true}catch(e){return false}}function getLocalItem(name){return localStorage.getItem(name)}function setLocalItem(name,value){if(getLocalItem(name))removeLocalItem(name);localStorage.setItem(name,value)}function removeLocalItem(name){localStorage.removeItem(name)}function optOut(){return getLocalItem(OPT_OUT_KEY)==LOCAL_TRUE}
function str2obj(handlerStr){var parts;var method=window;try{parts=handlerStr.split(".");$.each(parts,function(i,obj){method=method[obj]})}catch(e){}return method}function bindTop($ctx,name,fn){if(!name)return;$ctx.on(name,fn);$ctx.each(function(){var handlers=$._data($ctx[0],"events")[name.split(".")[0]];var handler=handlers.pop();handlers.splice(0,0,handler)})}})(jQuery,TWP,VisitorSegment);
(function($){var TWP=window.TWP||{};TWP.JWConfig={};TWP.videoDataId="video-data-id";TWP.youtube=TWP.youtube||{};TWP.youtube.youtubeVideos=TWP.youtube.youtubeVideos||{};TWP.PostTV=TWP.PostTV||{};TWP.PostTV.Homepage=TWP.PostTV.Homepage||{};TWP.PostTV.Homepage.posttvPlayerData=TWP.PostTV.Homepage.posttvPlayerData||{};TWP.PostTV.Homepage.posttvPlaylistData=TWP.PostTV.Homepage.posttvPlaylistData||{};var posttvPlayerData=TWP.PostTV.Homepage.posttvPlayerData;var posttvPlaylistData=TWP.PostTV.Homepage.posttvPlaylistData;
var logger=new TWP.Tools.logger("PostTvPlayer");var players=$(".posttv-player-container:not([initialized])");var initPlayer=function(playerDom,i){var $root=$(playerDom),localPlayerId=$root.attr("data-moduleId");if($root.length==0){logger.error("Player root is empty, initialization failed.");return}if($root.attr("initialized")==undefined){logger.log("Initializing player: "+localPlayerId);var isYoutube=false,youtubeReadyFlag=false,jwReadyFlag=false,shareUrl=$root.attr("data-shareUrl"),finalShareTitle=
$root.attr("data-share-headline"),allowShare=$root.attr("data-allowShare")==="true",autoPlay=$root.attr("data-autoPlay")==="true",showVideoText=$root.attr("data-showVideoText"),isMuted=$root.attr("data-startMuted")==="true",$playlistSibling=undefined,userInteracted=false,youtubePlayerObj=undefined,event9sent=false,youtubeWrapper=$root.find(".posttv-player-youtube-wrapper"),isForAdmin=window.self!==window.top;var uniquePlayerToken=$root.attr("data-uniqueToken");if(uniquePlayerToken==null||uniquePlayerToken===
""){uniquePlayerToken=$root.closest(".pb-chain").attr("id");$playlistSibling=$root.closest(".pb-f-posttv-player").next();if(!$playlistSibling.hasClass("pb-f-posttv-playlist-item"))$playlistSibling=undefined;else posttvPlayerData[localPlayerId]["playerType"]="posttv-pb-playlist"}var userInteractionEventHandler=function(args){if(args.enable!=undefined&&(args.enable===true||args.enable===false))userInteractionHandler(args.enable)};var userInteractionHandler=function(enable){if(enable===undefined)enable=
false;if(isYoutube)if(!userInteracted&&enable){userInteracted=true;if(!!youtubePlayerObj&&!youtubePlayerObj.statusInterval&&TWP.PostTV.ytConfig&&TWP.PostTV.ytConfig.pingFrequency&&TWP.PostTV.ytConfig.pingFrequency.enabled){reportYTStatus();youtubePlayerObj.statusInterval=setInterval(reportYTStatus,(TWP.PostTV.ytConfig.pingFrequency.interval.streamingBar||60)*1E3)}}else if(userInteracted&&!enable){userInteracted=false;if(!!youtubePlayerObj&&youtubePlayerObj.statusInterval){clearInterval(youtubePlayerObj.statusInterval);
youtubePlayerObj.statusInterval=undefined}}};var trackingData={section:$root.attr("data-section")||"",subsection:$root.attr("data-subsection")||"",videoUuid:$root.attr("data-video-uuid")||"",displayDate:Number($root.attr("data-display-date")),videoTitle:$root.attr("data-video-title")||"",isPoolVideo:$root.attr("data-is-pool-video")==="1"};var getSectionAsPrefix=function(){var sectionAsPrefix=trackingData.section.toLowerCase();if(/^\/([^\/]+)/.test(sectionAsPrefix))sectionAsPrefix=RegExp.$1.toLowerCase();
sectionAsPrefix+=!!sectionAsPrefix?":":"";return sectionAsPrefix},getEstDateString=function(epoch){var localDate=new Date(epoch),estDate=new Date(epoch+localDate.getTimezoneOffset()*6E4-300*6E4),month=estDate.getMonth()+1;return month+"/"+estDate.getDate()+"/"+estDate.getFullYear()};var getYoutubeStatusText=function(){var status=undefined;if(youtubePlayerObj!=null&&youtubePlayerObj.getPlayerState!=undefined)status=youtubePlayerObj.getPlayerState();switch(status){case -1:return"unstarted";case 0:return"ended";
case 1:return"playing";case 2:return"paused";case 3:return"buffering";case 5:return"video cued";default:return"unknown"}};var getTrackingData=function(params){var sectionAsPrefix=getSectionAsPrefix(),uuidToken=trackingData.videoUuid,date=trackingData.displayDate,dateString=getEstDateString(date),credit={};if(params===undefined)params={};var currentVideoTitle=sectionAsPrefix+"video - "+uuidToken+" - "+dateString+" - "+trackingData.videoTitle.toLowerCase().replace(/[^\w\s[_,.-]]/gi,"");var getCookie=
function(name){var nameEQ=name+"\x3d";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" ")c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)}return null};return{"sessionId":getCookie("PBSESSIONID"),"page":currentVideoTitle,"channel":"wp - posttv","video":currentVideoTitle,"title":currentVideoTitle,"type":"video","section":!!trackingData.section?trackingData.section.toLowerCase():"","subsection":!!trackingData.subsection?
trackingData.subsection.toLowerCase():"","source":trackingData.isPoolVideo?"pool video":!!credit.source?credit.source.toLowerCase():"","videoName":!!credit.editor?credit.editor.toLowerCase():"","userInfo":wp_pb.BrowserInfo.OS.toLowerCase()+" "+wp_pb.BrowserInfo.browser.toLowerCase()+" v"+wp_pb.BrowserInfo.version,"browser":wp_pb.BrowserInfo.browser.toLowerCase(),"os":wp_pb.BrowserInfo.OS.toLowerCase(),"browserVersion":wp_pb.BrowserInfo.version,"playerType":"posttv-hp-feature","videoType":"livestream",
"isLiveStream":true,"isAd":false,"isFullEpisode":false,"isClip":false,"segment":0,"countOfClips":0,"uuidToken":uuidToken,"ytState":getYoutubeStatusText(),"timeSinceInit":params.timeSinceInit}};var sendDataToSplunk=function(n,e,params){var now=(new Date).getTime();var data={browser:params.browser,os:params.os,browserVersion:params.browserVersion,flashVersion:params.flashVersion,vendor:params.vendor,sessionId:params.sessionId,page:params.page,channel:params.channel,video:params.title,videoId:params.uuidToken,
videoName:params.title,videoType:params.videoType,videoSource:params.source,dateFirstPublished:params.dateFirstPublished,dateLastPublished:params.dateLastPublished,type:params.type,creativeType:params.creativeType,section:params.section,url:document.URL,HTTP_REFERER:document.referrer,adsDuration:params.adsDuration,playerType:params.playerType,adSetCode:params.adSetCode,evtName:n,evtType:typeof e=="string"?e:e[0]||"",evtAction:params.evtAction,evtGroup:params.evtGroup,evtModule:params.evtModule,evtTime:now,
targetUrl:params.targetUrl,errorCode:params.errorCode,errorText:params.errorText,offsetTop:params.offsetTop,nthVideoOnPage:params.nthVideoOnPage,skin:params.skin};if(params)try{e=typeof e=="undefined"?"":typeof e=="string"?e:$.isArray(e)?e[0]:"";now=params.evtTime||now;$.ajax({url:"//videotracker.washingtonpost.com/index.html",dataType:"jsonp",cache:false,timeout:3E3,data:data});if(window.TWP&&TWP.Data&&TWP.Data.Splunk&&TWP.Data.Splunk.addToHistory)TWP.Data.Splunk.addToHistory(self.methodeUuid,e,
now)}catch(e){logger.log("Unable to send tracking data: "+e.stack)}};var sendDataToSumoLogic=function(n,e,params){var now=(new Date).getTime();var data={browser:params.browser,os:params.os,browserVersion:params.browserVersion,flashVersion:params.flashVersion,vendor:params.vendor,sessionId:params.sessionId,page:params.page,channel:params.channel,video:params.title,videoId:params.uuidToken,videoName:params.title,videoType:params.videoType,videoSource:params.source,dateFirstPublished:params.dateFirstPublished,
dateLastPublished:params.dateLastPublished,type:params.type,creativeType:params.creativeType,section:params.section,url:document.URL,HTTP_REFERER:document.referrer,adsDuration:params.adsDuration,playerType:params.playerType,evtName:n,evtType:typeof e=="string"?e:e[0]||"",evtAction:params.evtAction,evtGroup:params.evtGroup,evtModule:params.evtModule,evtTime:now,targetUrl:params.targetUrl,errorCode:params.errorCode,errorText:params.errorText,offsetTop:params.offsetTop,nthVideoOnPage:params.nthVideoOnPage,
ytState:params.ytState,timeSinceInit:params.timeSinceInit};if(params)try{$.ajax({type:"GET",url:"https://livetracker.washingtonpost.com/receiver/v1/http/ZaVnC4dhaV11awI_ZBJjxjlbhKIya_6sm9GB_9S7NNJdr9HCA76L1mu36RbPhw8h8opxADP7Ee9fX4P9qQsikwWaZszHE43OFFjv3Z8XWAwy5HQiG9YAaA\x3d\x3d;",cache:false,timeout:3E3,data:data})}catch(e){logger.log("Unable to send tracking data: "+e.stack)}};var reportYTStatus=function(){var now=(new Date).getTime();if(!youtubePlayerObj.initTime)youtubePlayerObj.initTime=now;
sendTrackingData("YT State",["event400"],{slOnly:true,timeSinceInit:Math.floor((now-youtubePlayerObj.initTime)/1E3)})};var sendDataToOmniture=function(n,e,params){if(!!window.s&&typeof s.sendDataToOmniture=="function"&&!!params)try{var data=$.extend({"eVar1":params.page,"eVar2":params.channel,"eVar6":params.video,"eVar8":params.videoName,"eVar13":params.title,"eVar17":params.type,"prop19":params.evtAction?"posttv - "+params.evtModule+" - "+params.evtAction:"","eVar36":params.nthVideoOnPage&&params.offsetTop?
params.nthVideoOnPage+":"+params.offsetTop:"","eVar41":params.section,"eVar42":params.source,"eVar44":params.userInfo,"eVar45":params.page?params.page:"","eVar46":params.previousVideo,"eVar47":params.subsection,"eVar48":params.adsDuration,"eVar49":params.playerType},self.appendToOmniture,params);n=n||"";e=e||[];s.sendDataToOmniture(n,e,data,{wait:true})}catch(e){logger.log("Unable to send tracking data to omniture: "+e.stack)}};var sendDataToNielsen=function(n,e,t){var sectionAsPrefix=getSectionAsPrefix();
var currentVideoTitle=!!t.title?sectionAsPrefix+t.title.toLowerCase():"";var currentVideoCategory="";var paramCi="ci\x3dus-904793";var paramC6="\x26c6\x3dvc,b01";var paramCc="\x26cc\x3d1";var paramRnd="\x26rnd\x3d"+Math.ceil(Math.random()*1E9);var paramTl="\x26tl\x3ddav0-"+encodeURIComponent(currentVideoTitle);var paramCg="\x26cg\x3d"+encodeURIComponent(currentVideoCategory);var url="//secure-us.imrworldwide.com/cgi-bin/m?"+paramCi+paramC6+paramCc+paramRnd+paramTl+paramCg;self.imageForNielsenBeacon=
"";self.imageForNielsenBeacon=new Image;self.imageForNielsenBeacon.src=url};var sendTrackingData=function(n,e,params){params=params||{};if(e[0]=="event9")if(event9sent)return;else if(!params.dupFlag||params.dupFlag!=="false")event9sent=true;var t=getTrackingData(params);if(params&&params.slOnly)sendDataToSumoLogic(n,e,t);else{sendDataToSplunk(n,e,t);sendDataToOmniture(n,e,t)}};if(youtubeWrapper.length>0){isYoutube=true;var loadYoutubePlayer=function(args){if(!!window.YT){TWP.youtube.youtubeVideos[args.containerID]=
new YT.Player(args.containerID,{playerVars:{autohide:1,autoplay:0,controls:1,fs:1,html5:1,iv_load_policy:3,modestbranding:1,rel:0,showinfo:1,wmode:"transparent"},height:"100%",width:"100%",videoId:args.vidID,events:{"onReady":function(event){youtubeReadyFlag=true;if(mobile_browser===1){isMuted=false;videoPlaying()}if((jwToPlay||autoPlay)&&mobile_browser===0&&!isForAdmin){playVideo();sendTrackingData("autoplay",["event75"]);jwToPlay=true;if(!isMuted)sendTrackingData("interaction",["event9"])}},"onError":function(event){logger.log("Youtube embed error.")},
"onStateChange":function(event){if(event.data===YT.PlayerState.PLAYING){if(!isMuted)pausePageRefresh();if(mobile_browser&&!event9sent)sendTrackingData("interaction",["event9"])}if(event.data===YT.PlayerState.ENDED||event.data===YT.PlayerState.PAUSED){resumePageRefresh();if(event.data===YT.PlayerState.ENDED){videoStopped();sendTrackingData("videoend",["event13"])}else if(event.data===YT.PlayerState.PAUSED)sendTrackingData("videopaused",["event73"])}}}});return TWP.youtube.youtubeVideos[args.containerID]}};
var initYoutubePlayer=function(){var init=function(){var container=$root.find(".posttv-player-youtube-container");youtubePlayerObj=loadYoutubePlayer({containerID:container.attr("id"),vidID:container.attr("data-videoId")})};if(typeof window.YT=="object")window.YT.ready(init);else{if(typeof window.onYouTubeIframeAPIReady=="function"){var oldFunc=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){oldFunc();init()}}else window.onYouTubeIframeAPIReady=function(){init()};var tag=document.createElement("script");
tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag)}}}var onDemandPlayerWrapperId="posttv-player-ondemand-wrapper-"+localPlayerId,onDemandPlayerWrapper=$root.find("#"+onDemandPlayerWrapperId),jwToPlay=autoPlay,jwPlaying=false,videoQueued=undefined,jwPlayerObj,jwStartedPlaying=undefined,jwPlayheadCounter=0;if($root.find(".posttv-player-ondemand").length>0){var onPlayerCreated=function(){jwReadyFlag=
true;if(autoPlay)jwToPlay=true;setMute()};var onEmbedCodeChanged=function(){if(typeof videoQueued!=="undefined"){updateVideo(onDemandPlayerWrapper.attr("data-video-uuid"),videoQueued);return}if(mobile_browser===1){isMuted=false;videoStopped();jwToPlay=true}else if(jwToPlay)playVideo();else if(!jwToPlay&&!jwPlaying)pauseVideo()};var onPlayCompleted=function(){if(autoPlay&&isMuted&&posttvPlayerData[localPlayerId]["continuousPlay"])playVideo();else{jwToPlay=false;jwPlaying=false;isMuted=false;videoStopped();
resumePageRefresh();getJwPlayerObject().allowTrackProgress=true}if(uniquePlayerToken)wp_pb.report(uniquePlayerToken,"video_completed")};var onPause=function(){jwToPlay=false;jwPlaying=false;resumePageRefresh()};var onPlayheadTimeChanged=function(){if(jwToPlay&&!jwPlaying){jwPlaying=true;if(!isMuted)pausePageRefresh()}++jwPlayheadCounter;if(jwStartedPlaying!==true){jwStartedPlaying=true;setMute()}};var onAdStarted=function(){$root.addClass("ad-playing")};var onAdCompleted=function(){$root.removeClass("ad-playing")};
var callbacks={onPlayerCreated:onPlayerCreated,onPlayCompleted:onPlayCompleted,onEmbedCodeChanged:onEmbedCodeChanged,onPause:onPause,onPlayheadTimeChanged:onPlayheadTimeChanged,onAdStarted:onAdStarted,onAdCompleted:onAdCompleted};var shouldPlayAdOverride=function(shouldPlayAdSelection){return shouldPlayAdSelection};var initOptions=function(){var args={callbacks:callbacks,showSharingOverlay:false,hideOverlayButtons:true};if(!posttvPlayerData[localPlayerId]["isLive"]){args=$.extend({type:"html5"},args);
if(autoPlay&&isMuted)args=$.extend({allowTrackProgress:false},args)}else args=$.extend({allowTrackProgress:false},args);if(shouldPlayAdOverride()===false)args=$.extend({shouldPlayAd:false},args);else if(posttvPlayerData[localPlayerId]["isYourThree"])args=$.extend({shouldPlayAd:true},args);if(posttvPlayerData[localPlayerId]["requestLowBitRate"]==true&&!posttvPlayerData[localPlayerId]["isLive"])args=$.extend({jwPlayerConfig:{maxBitrates:{desktop:{maxBitrate:600}}}},args);return args}}var updateVideo=
function(uuid,shouldPlayAd){shouldPlayAd=shouldPlayAdOverride(shouldPlayAd);if(isJwReady()){if(shouldPlayAd!==undefined)jwPlayerObj.playUuid(uuid,{shouldPlayAd:shouldPlayAd});else jwPlayerObj.playUuid(uuid);if(jwPlaying&&!jwToPlay)jwToPlay=true;videoQueued=undefined}else videoQueued=shouldPlayAd===true};var socialEl=$root.find(".posttv-player-social");var imageOverlayEl=$root.find(".posttv-player-full-image-overlay");var muteEl=$root.find(".posttv-player-mute-overlay");var videoTextEl=$("#posttv-player-text-"+
localPlayerId);var sentinel=false;var tweetClicked=function(){window.open("https://twitter.com/share?url\x3d"+encodeURIComponent(shareUrl)+"\x26text\x3d"+encodeURIComponent(finalShareTitle),"_blank","width\x3d550,height\x3d450")};var facebookClicked=function(){var winHeight=600,winWidth=600;window.open("http://www.facebook.com/sharer.php?s\x3d100\x26p[url]\x3d"+encodeURIComponent(shareUrl)+"\x26t\x3d"+encodeURIComponent(finalShareTitle),"_blank","top\x3d"+(screen.height/2-winHeight/2)+",left\x3d"+
(screen.width/2-winWidth/2)+",toolbar\x3d0,status\x3d0,width\x3d"+winWidth+",height\x3d"+winHeight)};$root.find(".posttv-player-social-twitter").click(tweetClicked);$root.find(".posttv-player-social-facebook").click(facebookClicked);var isYoutubeReady=function(){return youtubeReadyFlag};var isJwReady=function(){return TWP.PostTV.players&&getJwPlayerObject()&&jwReadyFlag};var getJwPlayerObject=function(){return TWP.PostTV.players["posttv-player-ondemand-wrapper-"+localPlayerId]};var setMute=function(){if(isMuted)if(!isYoutube&&
isJwReady())getJwPlayerObject().player.setVolume(0);else{if(isYoutubeReady()){youtubePlayerObj.setVolume(0);youtubePlayerObj.mute()}}else if(!isYoutube&&isJwReady())getJwPlayerObject().player.setVolume(100);else if(isYoutubeReady()){youtubePlayerObj.unMute();youtubePlayerObj.setVolume(100)}};var initJwPlayer=function(){jwPlayerObj=TWP.PostTV.initPostTvPlayer(document.getElementById(onDemandPlayerWrapperId),initOptions())};var loadPlayer=function(loadOnly){loadOnly=typeof loadOnly!=="undefined"?loadOnly:
false;if(!isYoutube&&jwPlayerObj===undefined){if(TWP.PostTV.initPostTvPlayer==undefined)$(window).on("initPostTvPlayerReady",function(event){initJwPlayer()});else initJwPlayer();playerLoaded=true;if(!loadOnly)jwToPlay=true;if(mobile_browser){isMuted=false;videoPlaying()}}else if(isYoutube&&youtubePlayerObj===undefined){playerLoaded=true;initYoutubePlayer();if(!loadOnly)jwToPlay=true}else if(!loadOnly)playVideo()};var playVideo=function(){jwToPlay=true;if(!isYoutube&&isJwReady()){getJwPlayerObject().play();
if(uniquePlayerToken)wp_pb.report(uniquePlayerToken,"video_started");videoPlaying()}else if(isYoutubeReady()){if(mobile_browser!==1)youtubePlayerObj.playVideo();if(uniquePlayerToken)wp_pb.report(uniquePlayerToken,"video_started");videoPlaying()}};var pauseVideo=function(){if(!isYoutube&&isJwReady()){if(getJwPlayerObject().player.getState()!=="complete")getJwPlayerObject().pause();jwToPlay=false;jwPlaying=false}else if(isYoutubeReady())youtubePlayerObj.pauseVideo()};var loadAndPlayVideo=function(){loadPlayer(true);
playVideo()};var videoStopped=function(){imageOverlayEl.css("display","block");muteEl.css("display","none");$root.addClass("social-buttons-hidden");pauseVideo()};var videoPlaying=function(){imageOverlayEl.css("display","none");if(isMuted){$root.addClass("social-buttons-hidden");muteEl.show()}else{if(allowShare)$root.removeClass("social-buttons-hidden");muteEl.css("display","none")}setMute()};var muteVideo=function(){isMuted=true;setMute()};var unmuteVideo=function(){isMuted=false;setMute()};imageOverlayEl.click(function(){loadPlayer(false);
pausePageRefresh();userInteractionHandler(true);logPlaylistVariant()});muteEl.click(function(){isMuted=false;pausePageRefresh();videoPlaying();if(autoPlay){sendTrackingData("interaction",["event9"]);if(posttvPlayerData[localPlayerId]["isLive"])userInteractionHandler(true);else getJwPlayerObject().allowTrackProgress=true}});$root.click(function(){var overlayTimeout=4E3;if(mobile_browser===1&&!sentinel){sentinel=true;socialEl.show();window.setTimeout(function(){socialEl.hide();sentinel=false},overlayTimeout)}});
$("#posttv-player-text-"+localPlayerId).click(function(){logPlaylistVariant();window.location.href=shareUrl;return false});var playButtonTimeEl=$root.find(".posttv-player-play-time");var initPlayButton=function(){if(!posttvPlayerData[localPlayerId]["isLive"]){function padNum(n){return n>9?""+n:"0"+n}function readableDate(s){return parseInt(s/60)+":"+padNum(parseInt(s%60))}playButtonTimeEl.html(readableDate(posttvPlayerData[localPlayerId]["videoTime"]));playButtonTimeEl.show()}else playButtonTimeEl.hide()};
var initCredits=function(){if(videoTextEl.find(".posttv-player-credits").length>0)if(videoTextEl.find(".posttv-player-caption-editor").html().trim()=="")videoTextEl.find(".posttv-player-caption-separator").hide();else videoTextEl.find(".posttv-player-caption-separator").show()};var setSize=function(){var setSizeHelp=function(){if($root.width()<=235)$root.addClass("player-small");else $root.removeClass("player-small")};setSizeHelp();$(function(){setSizeHelp()});$(window).on("resize",setSizeHelp);$root.css("padding-bottom",
(posttvPlayerData[localPlayerId]["aspectRatio"]*100).toFixed(2)+"%");if(posttvPlayerData[localPlayerId]["aspectRatio"]>1){$root.css("background","url(https://img.washingtonpost.com/wp-apps/imrs.php?src\x3dhttp%3A%2F%2Fwww.washingtonpost.com%2Fpb%2Fresources%2Fimg%2Fposttv%2FWP_Grey_vertical.jpg\x26w\x3d720\x26h\x3d1280) no-repeat center center");$root.css("background-size","contain")}};var playerLoaded=false;$(window).scroll(function(){if(!playerLoaded&&mobile_browser){var videoElRect=$root.get()[0].getBoundingClientRect();
if(window.innerHeight+150>videoElRect.top)loadPlayer(true)}});var pausePageRefresh=function(){if(!!window.TWP&&!!TWP.hpRefreshTests)TWP.hpRefreshTests["posttv-player-"+localPlayerId]=function(){return false}};var resumePageRefresh=function(){if(!!window.TWP&&!!TWP.hpRefreshTests)delete TWP.hpRefreshTests["posttv-player-"+localPlayerId]};var sendTracking=function(args){sendTrackingData(args.eventName,[args.eventType],args)};var updatePlaylistVariant=function($feature){if($feature==undefined)posttvPlaylistData.playlistVariantMain=
posttvPlaylistData.playlistVariantServed=posttvPlaylistData.currentFeatureId=undefined;else{var featureId=$feature.attr("id");var variantId=$feature.attr("data-pb-variant");if(variantId!=undefined&&window.pageBuilder.variantsByFeatureId[featureId]==undefined)window.pageBuilder.variantsByFeatureId[featureId]={mainVariant:variantId,servedVariant:variantId};if(window.pageBuilder.variantsByFeatureId[featureId]!=undefined){posttvPlaylistData.playlistVariantMain=window.pageBuilder.variantsByFeatureId[featureId].mainVariant;
posttvPlaylistData.playlistVariantServed=window.pageBuilder.variantsByFeatureId[featureId].servedVariant;posttvPlaylistData.currentFeatureId=featureId;if(posttvPlaylistData.playlistVariantMain==undefined)for(var key in window.pageBuilder.variantsByFeatureId)if(window.pageBuilder.variantsByFeatureId[key].servedVariant==posttvPlaylistData.playlistVariantServed){posttvPlaylistData.playlistVariantMain=window.pageBuilder.variantsByFeatureId[key].mainVariant;break}}else posttvPlaylistData.playlistVariantMain=
posttvPlaylistData.playlistVariantServed=posttvPlaylistData.currentFeatureId=undefined}};var logPlaylistVariant=function(){posttvPlaylistData[posttvPlaylistData.currentFeatureId]=posttvPlaylistData[posttvPlaylistData.currentFeatureId]||{};if(posttvPlaylistData[posttvPlaylistData.currentFeatureId].clickLogged!==true&&posttvPlaylistData.playlistVariantMain!=undefined&&posttvPlaylistData.playlistVariantServed!=undefined){window.pageBuilder.variantLogClick(posttvPlaylistData.playlistVariantMain,posttvPlaylistData.playlistVariantServed);
posttvPlaylistData[posttvPlaylistData.currentFeatureId].clickLogged=true;window.onunload=null}};var updateOnDemandPlayer=function(args){try{var src=imageOverlayEl.find("img").attr("src"),low_res=imageOverlayEl.find("img").attr("data-low-res-src"),hi_res=imageOverlayEl.find("img").attr("data-hi-res-src"),srcPrefix=src.match("(.*php\\?src\x3d)");if(srcPrefix==null){srcPrefix="https://img.washingtonpost.com/wp-apps/imrs.php?src\x3d";imageOverlayEl.find("img").attr("src",srcPrefix+encodeURIComponent(args.image)+
"\x26w\x3d480\x26h\x3d270")}else{srcPrefix=srcPrefix[0];imageOverlayEl.find("img").attr("src",srcPrefix+encodeURIComponent(args.image)+src.match("\\\x26w\x3d.*")[0])}if(low_res!=null)imageOverlayEl.find("img").attr("data-low-res-src",srcPrefix+encodeURIComponent(args.image)+low_res.match("\\\x26w\x3d.*")[0]);if(hi_res!=null)imageOverlayEl.find("img").attr("data-hi-res-src",srcPrefix+encodeURIComponent(args.image)+hi_res.match("\\\x26w\x3d.*")[0])}catch(ex){logger.error("PostTV Player promo image couldn't be updated.")}onDemandPlayerWrapper.attr("data-video-uuid",
args.uuid);videoTextEl.find(".posttv-player-headline").html(args.title);videoTextEl.find(".posttv-player-blurb").html(args.blurb);videoTextEl.find(".posttv-player-caption-editor").html(args.editor);videoTextEl.find(".posttv-player-caption-source").html(args.source);try{wp_pb.StaticMethods.remarryHeadline(videoTextEl.find(".headline"))}catch(e){videoTextEl.find(".headline").css("width","auto")}shareUrl=args.url;finalShareTitle=args.title;posttvPlayerData[localPlayerId]["videoTime"]=args.duration;posttvPlayerData[localPlayerId]["isLive"]=
String(args.isLive)=="true";posttvPlayerData[localPlayerId]["requestLowBitRate"]=args.lowBitRate===true;initPlayButton();initCredits();$root.removeClass("ad-playing");if(isJwReady()){if(args.startPlaying||imageOverlayEl.css("display")=="none")jwToPlay=true;updateVideo(args.uuid,args.shouldPlayAd)}else if(!isJwReady()&&args.startPlaying)loadPlayer(false);else videoQueued=args.shouldPlayAd===true;if(args.playlistFeatureId!=undefined){updatePlaylistVariant($("#"+args.playlistFeatureId));if(args.startPlaying){logPlaylistVariant();
updatePlaylistVariant()}}if(args.startPlaying&&args.scrollToPlayer){var topOffsetAdjustment=30,$navBarEl=$("#nav-bar"),$liveMainEl=$(".pb-f-posttv-live-main"),$breakingNewsEl=$(".pb-f-page-breaking-news-bar"),$shareBarEl=$(".top-sharebar-wrapper",".pb-f-sharebars-top-share-bar");if($navBarEl.length>0)topOffsetAdjustment+=$navBarEl.height();if($liveMainEl.length>0)topOffsetAdjustment+=$liveMainEl.height();if($breakingNewsEl.length>0)topOffsetAdjustment+=$breakingNewsEl.height();if($shareBarEl.length>
0)topOffsetAdjustment+=$shareBarEl.height();var documentScrollTop=document.documentElement.scrollTop||document.body.scrollTop,playerTopPosition=$root.offset().top-topOffsetAdjustment;if(documentScrollTop>playerTopPosition)$("html, body").animate({scrollTop:playerTopPosition+"px"})}};$(function(){if(uniquePlayerToken){wp_pb.register(uniquePlayerToken,"new_video_selected",updateOnDemandPlayer,this);wp_pb.register(uniquePlayerToken,"play_video",loadAndPlayVideo,this);wp_pb.register(uniquePlayerToken,
"stop_video",videoStopped,this);wp_pb.register(uniquePlayerToken,"mute_video",muteVideo,this);wp_pb.register(uniquePlayerToken,"unmute_video",unmuteVideo,this);wp_pb.register(uniquePlayerToken,"send_tracking",sendTracking,this);wp_pb.register(uniquePlayerToken,"user_interacted",userInteractionEventHandler,this)}});var init=function(){if(!!$playlistSibling){$playlistSibling=$playlistSibling.find(".posttv-playlist-item-video");updateOnDemandPlayer({title:$playlistSibling.attr("data-video-title"),blurb:$playlistSibling.attr("data-video-blurb"),
image:$playlistSibling.attr("data-video-image"),url:$playlistSibling.attr("data-video-url"),uuid:$playlistSibling.attr("data-video-uuid"),duration:$playlistSibling.attr("data-video-duration"),isLive:$playlistSibling.attr("data-video-islive"),editor:$playlistSibling.attr("data-video-editor"),source:$playlistSibling.attr("data-video-source"),startPlaying:false,scrollToPlayer:false,playlistFeatureId:$playlistSibling.attr("id")})}setSize();initPlayButton();initCredits();if(mobile_browser===1)isMuted=
false;if(autoPlay&&mobile_browser===0)videoPlaying();else videoStopped();if(autoPlay===true||i==0&&mobile_browser===1)loadPlayer(true)};init();$root.attr("initialized","yeah")}else{logger.log("Skipped initializing player second time: "+localPlayerId);$root.attr("initialized","skipped")}};for(var i=0;i<players.length;i++)initPlayer(players[i],i);if(!TWP.PostTV.Homepage.playerVariantsInitialized){var updateVariant=function(variantId){var updatedEl=$(".posttv-player-container","div[data-pb-variant\x3d'"+
variantId+"']");if(updatedEl.length>0){logger.log("Variant with PostTV Player loaded: "+variantId);initPlayer(updatedEl,0)}};if(wp_pb.register!=undefined){logger.log("wp_pb.register works. Listening.");wp_pb.register("variants","loaded",updateVariant,this)}else{logger.log("wp_pb.register is not defined yet. Listening to jQuery event.");$(window).on("variantsLoaded",function(event,servedVariant){updateVariant(servedVariant)})}}TWP.PostTV.Homepage.playerVariantsInitialized=true;$(window).trigger("scroll")})(jQuery);