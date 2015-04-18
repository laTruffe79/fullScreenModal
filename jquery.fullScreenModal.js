/* 
 * fullScreenModal is a jQuery plugin that allows you to create
 * Windows 8 style login page or something else that replace your old 
 * modals pages
 */

(function ($)
{
    $.fn.fullScreenModal = function (options, action)
    {
        // default settings
        var settings = $.extend({
            backgroundImage: null, // your image url
            speedStart: 500, // default speed
            speedEnd: 500, // default speed
            direction: "right", //default direction
            easing: 'easeOutExpo', //default easing
            htmlContent: null, // html content
            ajaxContent: null, // optional ajax content
            offsetMarginTop: 0,
            closeTag: '<a href="javascript:void(0)" onclick="$(this).fullScreenModal(\'close\');">Close</a>', // default Close anchor html format
            callbackOpen: function () {
            },
            callbackClosed: function () {
            }

        }, options);
        
        if (action === 'close') {
            var fsw = $("body").find('.fsmContainer');
            /* Animate */
            if (settings.direction === 'right') {
                var directionClosed = {right: "100%"};
            } else if (settings.direction === "left") {
                var directionClosed = {left: "100%"};
            }else{
                var directionClosed = {right: "100%"};
            }
            fsw.animate(
                directionClosed
                , settings.speedEnd
                , settings.easing,
                // On complete delete fsm div
                function () {
                    fsw.remove();
                    // enable scrollbars
                    $('body').css('overflow', 'auto');
                    settings.callbackClosed.call(this);
                }
            );
        }

        return this.each(function ()
        {
            var thisO = $(this);

            thisO.on("click touchstart", function () {
                // We create the full screen div after the element
                $("body").append('<div class="fsmContainer"></div>');
                //Apply css basic style (full screen, hide & position)
                var fsw = $("body").find('.fsmContainer');
                
                // retrieve ajax content
                if (settings.ajaxContent !== null) {
                    try {
                        $.ajax({
                            type: 'GET',
                            dataType: 'html',
                            url: settings.ajaxContent,
                            error: function (jqXHR, textStatus, errorThrown) {
                                throw "errorThrown : " + errorThrown + " | textStatus : " + textStatus + " | Error : AjaxContent has not a valid path";
                            },
                            success: function (data, jqXHR, textStatus) {
                                fsw.append(data);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }

                //get the scrollTop value of the window
                var scrollTop = $(window).scrollTop();
                fsw.css("top", scrollTop);
                //alert("fsw top : "+fsw.css("top"));

                //Disable mousewheel events in fsm window
                fsw.on('mousewheel', function () {
                    return false;
                });

                //hide scrollbar
                $('body').css('overflow', 'hidden');
                fsw.css("margin-top", settings.offsetMarginTop).append('<div class="closeTrigger"></div>');
                // identify close trigger
                fswClose = $(document).find('div.closeTrigger');
                //apply default or custom close icon
                fswClose.each(function () {
                    $(this).append(settings.closeTag);
                });


                if (settings.backgroundImage !== null) {
                    try {
                        /* testing image url is valid*/
                        $.ajax({
                            url: settings.backgroundImage,
                            type: "HEAD",
                            error: function () {
                                throw "Error : background-image url is not valid...Oops I replace it by background-color:purple";
                            }
                        });
                        /* testing image format */
                        var regMatchFormat = /[.jpg|.gif|.jpeg|.png]$/i;
                        if (!regMatchFormat.test(settings.backgroundImage)) {
                            throw "Error : background image must be jpg jpeg gif or png... I replace it by background-color:purple";
                        }

                        fsw.css('background-image', 'url(' + settings.backgroundImage + ')');
                    } catch (e) {
                        console.log(e);
                    } finally {
                        fsw.css("background-color", "#9686FF");
                    }

                }
                /* Animate */
                if (settings.direction === "right") {
                    fsw.css('float', 'right').css('right', '100%');
                    var directionOpen = {right: "0%"};
                } else if (settings.direction === "left") {
                    fsw.css('float', 'left').css('left', '100%');
                    var directionOpen = {left: "0%"};
                }

                fsw.animate(
                        directionOpen,
                        settings.speedStart,
                        settings.easing,
                        settings.callbackOpen.call(this));

                //Close trigger
                fswClose.click(function () {
                    $(this).fullScreenModal(settings, 'close');
                    //closeIt();
                });
            });

        });
    };
})(jQuery);
