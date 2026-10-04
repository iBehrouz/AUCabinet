(function ($) {
    "use strict";

    // 1. Initiate WOW.js safely if present
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // 2. Sticky Navbar & Header Elevation
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 40) {
            $('.desktop-header, .sticky-top').addClass('shadow-sm').css('background', 'rgba(10, 10, 12, 0.98)');         } else {$('.desktop-header, .sticky-top').removeClass('shadow-sm').css('background', 'rgba(10, 10, 12, 0.94)');
        }
    });

    // 3. Back to Top Button
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {$('.back-to-top').fadeIn('fast');
        } else {
            $('.back-to-top').fadeOut('fast');
        }
    });

    $('.back-to-top').on('click', function (e) {         e.preventDefault();$('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // 4. Smooth Anchor Link Scrolling
    $('a[href^="#"]').on('click', function (e) {
        const targetId = $(this).attr('href');
        if (targetId && targetId !== '#' && $(targetId).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(targetId).offset().top - 70
            }, 500);
        }
    });

    // 5. Telegram Quote Form Handler (Synchronized with Bot)
    $('#quoteForm').off('submit').on('submit', function (e) {
        e.preventDefault();

        const $form =$(this);
        const $submitBtn =$form.find('button[type="submit"]');
        const $alertBox =$('#formAlert');
        const originalBtnText = $submitBtn.html();

        // Loading state
        $submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin me-2"></i> SENDING...');

        const name = $form.find('[name="name"]').val() || '';
        const phone = $form.find('[name="phone"]').val() || '';
        const email = $form.find('[name="email"]').val() || '';
        const project = $form.find('[name="project_type"]').val() || 'General Joinery';
        const message = $form.find('[name="message"]').val() || 'No additional details';

        const telegramMessage = `🚨 *New AU Cabinet Quote Request!*\n\n` +
                                `👤 *Name:* ${name}\n` +
                                `📞 *Phone:* ${phone}\n` +
                                `✉️ *Email:* ${email}\n` +
                                `🏠 *Project:* ${project}\n` +
                                `💬 *Details:* ${message}`;

        const botToken = "8873455228:AAF8EpOclWq9Zk98Bema62oKJ0RulYMGve8";
        const chatId = "-1004303472281";
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        })
        .then(response => {
            if (response.ok) {
                if ($alertBox.length) {$alertBox.attr('class', 'form-alert success text-center')
                             .html('<i class="fa fa-check-circle me-1"></i> Quote request sent! We will get back to you shortly.')
                             .slideDown();
                } else {
                    alert('Quote request sent! AU Cabinet will contact you shortly.');
                }
                $form[0].reset();
            } else {
                throw new Error('Telegram API failure');
            }
        })
        .catch(() => {
            if ($alertBox.length) {$alertBox.attr('class', 'form-alert danger text-center')
                         .html('<i class="fa fa-exclamation-circle me-1"></i> Unable to send online. Please call <a href="tel:+61412270000" class="text-white fw-bold">+61 412 270 000</a>.')
                         .slideDown();
            } else {
                alert('Could not send online. Please contact +61 412 270 000 directly.');
            }
        })
        .finally(() => {
            $submitBtn.prop('disabled', false).html(originalBtnText);
        });
    });

})(jQuery);