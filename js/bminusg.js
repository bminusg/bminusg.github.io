// General Vars
    //var body = document.body; //IE 'quirks'
    //var document = document.documentElement; //IE with doctype
    //document = (document.clientHeight) ? document : body;
    var btnMenu, header;

// POLYFILLS
    /**
	*	adding forEach support for NodeLists in IE !!!
	*	see: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
	*	fix: http://stackoverflow.com/questions/15267295/nodelist-prototype-foreach-array-prototype-foreach
	*/
	if (!NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}


// Remote Functions

    // SCROLLTO FUNCTION        
    function scrollTo(element, to, duration) {
        
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
        
        var animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            console.log(element);
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    // t = current time b = start value c = change in value d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };


    // NAVIGATION
    function nav_BG(direction, scrollPosition) {
        
        //console.log(header.clientHeight);

        if (direction === "down") {
            header.classList.add("hidden");
        } else {
            header.classList.remove("hidden");
        }
    }

    function menu_BG() {
        btnMenu.onclick = function() {
            this.classList.toggle('active');
            header.classList.toggle('active');
        }
    }



// init functions

    function bminusg() {

        // INIT SCROLLTO FUNCTION
        var initScrollTo = document.querySelectorAll('.scroll-to-link');
        initScrollTo.forEach(function(item){
            item.onclick = function() {
                //scrollTo(document.body, 1000, 1250);

                console.log("scroll du");

                window.scrollBy({ top: 300, left: 0, behavior: "smooth" });
            }
        });

        // INIT MOBILE MENU
        btnMenu = document.querySelector("#btn-menu");
        header = document.querySelector("#header-primary-wrapper");
        if (btnMenu) {
            menu_BG();
        }

    }

// Event Listeners

    // WINDOW ONLOAD
    window.onload = function() {
        bminusg();
    }

    // SCROLL EVENT
    var scrolling = false;
    var lastScrollTop = 0;
    
    window.onscroll =function() {
        scrolling = true;
    };
    setInterval( function() {
        if ( scrolling ) {
            scrolling = false;
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > lastScrollTop){
                nav_BG("down");
            } else {
                nav_BG("up");
            }

            lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling
        }
    }, 250 );



    

    