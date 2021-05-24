(function ($) {

    ///////////////
    //
    // nav desktop
    //
    ///////////////

    function navDesktop() {

        // disable default display on hover behaviour
        $('.jq_megamenu').hide();
        $('body, html').removeClass('no-scroll');
        $('.nav__link').removeClass('nav__link--active');
        // open on click
        $('.jq_nav-link').click(function(e) {
            e.preventDefault();
            $('.nav__link').removeClass('nav__link--active');
            var dislpay = $(this).next('.jq_megamenu').css('display');
            if (dislpay == 'none') {
                // close all previously opened megamenus
                $('.jq_megamenu').hide();
                // open current one
                $(this).next('.jq_megamenu').css('display', 'block');
                $(this).addClass('nav__link--active');
            }
            else {
                $(this).next('.jq_megamenu').css('display', 'none');
                $(this).removeClass('nav__link--active');
            }
        });

        // close
        $('.jq_megamenu-close').click(function(e) {
            $('.jq_nav-link').removeClass('nav__link--active');
            $(this).parent('.jq_megamenu').hide();
        });

        $('body').click(function(e) {
            if( !$(e.target).hasClass('jq_megamenu') && $(e.target).closest('.jq_megamenu').length === 0 && $(e.target).parents('.nav__list').length === 0 ) {
                $('.jq_megamenu').each(function(){
                    if ( $(this).css('display') == 'block' ) {
                        $(this).hide();
                        $('.jq_nav-link').removeClass('nav__link--active');
                    }

                });
            }
        });

    }

    function navMobile() {
        // remove display none from desktop
        $('.jq_megamenu').removeAttr('style');
        $('.jq_nav-link').removeClass('nav__link--open');

        // hamburger and nav toggle
        function toggleNav(menu) {
            menu.toggleClass('menu-is-open');
            $('#jq_nav').toggleClass('header__inner-wrap--open');
            $('body, html').toggleClass('no-scroll');
        }

        $('#jq_hamburger').on('click', function(){
            toggleNav($(this));
            if ($(this).hasClass('menu-is-open')) {
                $('#jq_header').addClass('header--open');
            }
            else {
                setTimeout(function(){
                    $('#jq_header').removeClass('header--open');
                }, 0)
            }
        });

        // megamenu
        $('.jq_nav-link').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('nav__link--open');
            $(this).next('.jq_megamenu').slideToggle();
        });
    }

    
    $('.nav__megamenu__featured__item a[href*="/node"]').each(function() {
        $(this).addClass("kuk");
    });

    function removeEvents($el) {
        $el.each(function(){
            $(this).off();
        })
    }

    function initNav() {
        if(isDesktop) {
            removeEvents( $('body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger') );
            navDesktop()
        } else {
            removeEvents( $('body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger') );
            navMobile()
        }
    }

    // init nav after load
    var isDesktop = window.matchMedia("(min-width: 62.5em)").matches;
    initNav();

    // check nav state on resize
    window.addEventListener('resize', function(){
        if (isDesktop !== window.matchMedia("(min-width: 62.5em)").matches) {
            isDesktop = window.matchMedia("(min-width: 62.5em)").matches;
            initNav();
        }
    });


    ///////////////
    //
    // sticky nav - mobile
    //
    ///////////////

    // grab an element
    var myElement = document.getElementById("jq_header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement);
    // initialise
    headroom.init();



    ///////////////
    //
    // sticky nav - desktop
    //
    ///////////////

    $(window).scroll(function(){
        var winTop = $(window).scrollTop();
        if (winTop >= 30){
          $("#jq_header").addClass("header--squeezed");
          $("#content-wrap").addClass("header-fixed");
        } else {
          $("#jq_header").removeClass("header--squeezed");
          $("#content-wrap").removeClass("header-fixed");
        }
    });



    ///////////////
    //
    // slider
    //
    ///////////////

    var slider = $('.jq_slider').lightSlider({
        item: 1,
        galleryMargin: 0,
        controls: false,
        onSliderLoad: function(el){
            el[0].classList.add("slider__list--loaded");
            setTimeout(function(){
                adjustSliderButtons()
            }, 0)
        }
    });

    // window.addEventListener('resize', function(){
    //     slider.refresh();
    // });

    function adjustSliderButtons() {
        var $navUl = $('.slider').find('ul.lSPager');
        $( $navUl[0].children ).each(function(key, value){
            $(this).css('width', (100/$navUl[0].children.length) + '%' );
            $(this).find('a').html( $( $($('.slider__list')[0].children).get(key) ).data('title') )
        });
    }


    ///////////////
    //
    // no focus on mousedown
    //
    ///////////////

    $("body").on("mousedown", "*", function(e) {
        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") == "none") {
            $(this).css("outline", "none").on("blur", function() {
                $(this).off("blur").css("outline", "");
            });
        }
    });


    ///////////////
    //
    // footer nav on mobile
    //
    ///////////////

    function navMobileFooter() {
        $('.footer__nav__item').click(function(e) {
            $(this).toggleClass('footer__nav__item--open');
            $(this).find('.footer__nav__sublist').slideToggle();
        });
    }

    function initFooterNav() {
        if(isDesktopFooter) {
            removeEvents( $('.footer__nav__item') );
        } else {
            navMobileFooter();
        }
    }

    // init nav after load
    var isDesktopFooter = window.matchMedia("(min-width: 40.625em)").matches;
    initFooterNav();

    // check nav state on resize
    window.addEventListener('resize', function(){
        if (isDesktopFooter !== window.matchMedia("(min-width: 40.625em)").matches) {
            isDesktopFooter = window.matchMedia("(min-width: 40.625em)").matches;
            initFooterNav();
        }
    });



    ///////////////
    //
    // side nav
    //
    ///////////////

    if ( $('.jq_side-nav').length ) {
        $('.jq_side-navToggle').on('click keypress', function(e){
            if (e.type == 'click' || e.which == 13) {
                // close all open tabs
                $('.jq_side-navSubmenu').not( $(this).siblings('ul') ).slideUp();
                $('.jq_side-navToggle').each(function(){
                    $(this).html() == '–' ? $(this).html('+') : null;
                });
                // clicking on active one, hide it
                if ($(this).siblings('ul').is(':visible')) {
                    $(this).siblings('ul').slideUp();
                    $(this).html('+')
                // open current
                } else {
                    $(this).siblings('ul').slideDown();
                    $(this).html('–')
                }
            }
        });
    }


    $('#jq_side-nav-toggle').click(function(){
        $('.jq_side-nav').slideToggle();
    });


    ///////////////
    //
    // responsive tables
    //
    ///////////////

    $('.body table').each(function(){
        var labels = [];
        var ths = $(this).find('thead th');
        for (var i = 0; i < ths.length; i++) {
            labels.push( ths[i].innerText );
        }
        var trs = $(this).find('tbody tr');
        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].children;
            for (var j = 0; j < tds.length; j++) {
                if (labels[j]) {
                    tds[j].setAttribute('data-label', labels[j]);
                }
            }
        }
    });


    ///////////////
    //
    // galleries
    //
    ///////////////

    // wait for the lazisizes to take care of images first
    setTimeout(function(){
        var slideGallery = $('.jq_slideGallery').lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            thumbItem: 4,
            slideMargin: 0,
            enableDrag: false,
            slideMargin: 15,
            galleryMargin: 15,
            thumbMargin: 15,
            currentPagerPosition: 'left',
            responsive : [
                {
                    breakpoint:480,
                    settings: {
                        thumbItem: 2
                    }
                }
            ],
            onSliderLoad: function(el) {
                el.lightGallery({
                    selector: '.jq_slideGallery .lslide'
                });
            }
        });
    }, 0);

    $('.jq_gallery').lightGallery({
        thumbnail: true
    });


    //////////
    //
    // print
    //
    //////////

    $('#jq_print').on('click', function(){
        window.print();
    });



    ///////////////
    //
    // switch tabs with arrow keys
    //
    ///////////////

    jQuery('[role="tab"]').on('keydown', function(e) {

        // define current, previous and next (possible) tabs
        // TODO: remove classes
        var $original = jQuery(this);
        var $prev = jQuery(this).parents('.contact__filter__tabs__item').prev().children('[role="tab"]');
        var $next = jQuery(this).parents('.contact__filter__tabs__item').next().children('[role="tab"]');
        var $target;

        // find the direction (prev or next)

        switch (e.keyCode) {
            case 37:
                $target = $prev;
                break;
            case 39:
                $target = $next;
                break;
            default:
                $target = false
                break;
        }

        if ($target.length) {
            $original.attr({
                'tabindex' : '-1',
                'aria-selected' : null,
                'aria-hidden' : true
            });
            $original.next().attr('aria-hidden', true);
            $target.attr({
                'tabindex' : '0',
                'aria-selected' : true,
                'aria-hidden' : false
            }).focus();
            $target.next().attr('aria-hidden', false);
            // switch panel
            $target.prev('input').trigger('click');
        }

    });





    ///////////////
    //
    // filter autosubmit
    //
    ///////////////

    var $exposedViewsWrapper = $('.view-form-autosubmit').parent();
    $.each($exposedViewsWrapper, function() {
        $(this).on('change', '.views-exposed-form input:not(:submit), .views-exposed-form select:not(.shs-select)', (function($view) {
            return function() {
                var $exposedViews = $('.view-form-autosubmit');
                var runBeforeSubmit = $exposedViews.data('run-before-submit');
                var $submit = $view.find('.views-exposed-form input[type="submit"]');

                $('#jq_loader').addClass('loader--open');
                $submit.click();
            };
        })($(this)));
    });




    ///////////////
    //
    // loader
    //
    ///////////////

    $( document ).ajaxStop(function() {
        setTimeout(function(){
            $('#jq_loader').removeClass('loader--open');
        }, 0);
    });


    ///////////////
    //
    // mobile search
    //
    ///////////////

    var $search = $('.jq_search-mobile');
    $search.find('input[type=search]').keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            $search.removeClass('search-mobile--open');
        }
    });

    $('#jq_search-toggle').on('click', function(){
        $search.addClass('search-mobile--open').attr('aria-hidden', 'false');
        $search.find('input[type=search]').focus();
        if ( !$('body, html').hasClass('no-scroll') ) {
            $('body, html').addClass('no-scroll');            
        }
    });

    $('#jq_search-close').on('click', function(){
        $search.removeClass('search-mobile--open').attr('aria-hidden', 'true');
        if ( !$('#jq_hamburger').hasClass('menu-is-open') ) {
            $('body, html').removeClass('no-scroll');            
        }
    });


    ///////////////
    //
    // cookies
    //
    ///////////////

    if ( !localStorage.getItem('fsvuk_cookies_agreed') ) {
        $('#jq_cookies').addClass('cookies--visible')
    }

    $('#jq_cookiesClose').click(function(){
        $('#jq_cookies').hide()
        if (localStorage) {
            localStorage.setItem('fsvuk_cookies_agreed', true);
        }
    });


    ///////////////
    //
    // newsletter
    //
    ///////////////

    $('form.fsv-newsletter-subscription-form input[name="email"]').on('keyup', function(e) {
        var $checkbox = $('form.fsv-newsletter-subscription-form .form-item-checkbox');
        if ($(this).val().length > 0) {
            $checkbox.addClass('show');
        } else {
            $checkbox.removeClass('show');
        }
    });


    ///////////////
    //
    // anchor smooth scroll
    //
    ///////////////

    // Select all links with hashes
    $('.body a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - 183 // minus height of the header
            }, 1000);
          }
        }
      });


})(jQuery);


