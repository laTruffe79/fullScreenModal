# fullScreenModal
Beautiful jQuery plugin wick allows you to load a fullscreen modal window

Example of usage : 
1 - load your jquery library first
2 - load this jquery.fullScreenModal.js
3 - initialize the function like this : 

        var url = 'http://your_ajax_content_url';  
        /* Fullscreen login form */
        var connectLink = $("#connect").fullScreenModal({ //#connect is the element' ID wich trigger the function
            backgroundImage: "/assets/images/loginPict/6.jpg", //path to my beautiful wallpaper
            offsetMarginTop: 0, // would I an Offset on the top ?
            speedStart: 800, // default speed
            speedEnd: 500, // default speed
            easing: 'linear', // jquery easing type
            direction: "left", // the direction
            closeTag: '<a class="loginFormLink" href="javascript:void(0);">Fermer</a>', // your custom closing tag
            ajaxContent: url // your ajax content
            callbackOpen: function(){alert('callback1');},// callback function after successfull open
            callbackClosed: function(){alert('callback2');} // callback function after successfull close
        });
