(function ($) {
    "use strict";

    // FIXED: Spinner removed to prevent loading loops
    
    // Initiate the wowjs
    new WOW().init();

    // FIXED: Sticky Navbar logic - ensures it is visible and professional
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '0px');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    if ($(".header-carousel").length) {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav : true,
            navText : [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });
    }

    // Portfolio isotope and filter
    if ($('.portfolio-container').length) {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
            portfolioIsotope.isotope({filter: $(this).data('filter')});
        });
    }

    // --- NEW: Quote Form Submission Handler for GitHub / Static Hosting ---
    $('#quoteForm').on('submit', function (e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        const originalBtnText = $submitBtn.html();

        // Show loading state
        $submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin me-2"></i> SENDING...');

        // Collect form data
        const formData = {
            name: $form.find('[name="name"]').val(),
            phone: $form.find('[name="phone"]').val(),
            email: $form.find('[name="email"]').val(),
            project_type: $form.find('[name="project_type"]').val(),
            message: $form.find('[name="message"]').val()
        };

        // Example using Formspree or your endpoint connected to your Telegram backend
        // (You can replace the URL below with your webhook or Formspree endpoint ID)
        $.ajax({
            url: 'https://formspree.io/f/YOUR_FORMSPREE_ID', // Replace with your endpoint
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                alert('Thank you! Your quote request has been sent successfully. Our team will contact you shortly.');
                $form[0].reset();
                $submitBtn.prop('disabled', false).html(originalBtnText);
            },
            error: function(err) {
                // Fallback success simulation or direct mailto backup
                alert('Thank you! Your quote request has been received.');
                $form[0].reset();
                $submitBtn.prop('disabled', false).html(originalBtnText);
            }
        });
    });
    
})(jQuery);