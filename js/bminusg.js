// General Vars
    //var body = document.body; //IE 'quirks'
    //var document = document.documentElement; //IE with doctype
    //document = (document.clientHeight) ? document : body;
    var btnMenu, header, pos, h, hero, navListItem;

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

    // NAVIGATION
    function nav_BG(scrollPosition,lastScrollTop,pos) {

        scrollPosition = (scrollPosition) ? scrollPosition : window.pageYOffset;

        if (hero) {
            if (scrollPosition < hero.clientHeight) {
                console.log("ON HERO");
                header.dataset.pos = "on-hero";
                header.classList.remove("hidden");
            }
            if (scrollPosition > hero.clientHeight) {
                console.log("APRES HERO");
                header.dataset.pos = "apres-hero";
                
                if (scrollPosition > lastScrollTop){
                    header.classList.add("hidden");
                } else {
                    header.classList.remove("hidden");
                }
            }  
        }

             

    }

    function menu_BG() {
        btnMenu.onclick = function() {
            this.classList.toggle('active');
            header.classList.toggle('active');
        }

        if (window.matchMedia("(orientation: portrait)").matches) {
            navListItem.forEach(function(elem){
                elem.onclick = function() {
                    btnMenu.classList.toggle('active');
                    header.classList.toggle('active');
                }
            });
        }


    }



// init framework

    function bminusg() {

        // DEFINE GENERAL VARS
        initScrollTo = document.querySelectorAll('.scroll-to-link');
        btnMenu = document.querySelector("#btn-menu");
        header = document.querySelector("#header-primary-wrapper");
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        hero = document.querySelector("#hero");
        pos = header.dataset.pos;
        navListItem = document.querySelectorAll('.nav-list-item');

        // INIT SCROLLTO FUNCTION
        initScrollTo.forEach(function(item){
            item.onclick = function() {
 
                if (window.location.href != document.querySelector('body').dataset.url) {
                    window.location.href = document.querySelector('body').dataset.url + '/#' + item.href.split('#')[1];
                }

            }
        });

        // INIT MOBILE MENU
        if (btnMenu) {
            menu_BG();
        }

        // INIT NAVIGATION SETUP        
        nav_BG();

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

            nav_BG(scrollPosition,lastScrollTop,pos);
            lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling
        }
    }, 250 );
   



    

    