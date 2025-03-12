// Simple mobile navigation handler
(function($) {
    $(document).ready(function() {
        // Get the hamburger button and mobile menu
        var $hamburger = $('.hamburger');
        var $mobileMenu = $('.navmobile-wrapper');
        var $body = $('body');
        
        // Toggle menu on hamburger click
        $hamburger.on('click', function(e) {
            e.preventDefault();
            $mobileMenu.toggleClass('active');
            $body.toggleClass('menu-open');
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.navmobile-wrapper, .hamburger').length) {
                $mobileMenu.removeClass('active');
                $body.removeClass('menu-open');
            }
        });

        // Close menu when clicking a menu item
        $mobileMenu.find('a').on('click', function() {
            $mobileMenu.removeClass('active');
            $body.removeClass('menu-open');
        });
    });
})(jQuery); 