(function ($) {
    'use strict';

    window.gvnews = window.gvnews || {};
    window.gvnews.tnsGallery = window.gvnews.tnsGallery || {};

    window.gvnews.tnsGallery.init = function ($container) {
        let base = this;
        base.container = $container && $container.length ? $container : $('body');

        let featuredGallery = base.container.find('.featured_gallery');

        if (featuredGallery.length) {
            featuredGallery.each(function (i, ele) {
                if (!$(ele).hasClass('jeg_tns_active')) {
                    let tnsInit = typeof window.gvnews.tns === 'function' ? window.gvnews.tns : window.tns;

                    if (typeof tnsInit !== 'function') {
                        return; // tiny-slider tidak tersedia
                    }

                    let featured_slider = tnsInit({
                        container: ele,
                        textDirection: window.gvnews.option?.rtl == 1 ? 'rtl' : 'ltr',
                        controls: true,
                        controlsText: ['', ''],
                        nav: true,
                        items: 1,
                        mouseDrag: true,
                        autoplay: false,
                        autoplayTimeout: 3000,
                        loop: false,
                        onInit: function (info) {
                            if (info.nextButton) {
                                info.nextButton.setAttribute('aria-label', 'Next button');
                                $(info.nextButton).addClass('tns-next');
                            }
                            if (info.prevButton) {
                                info.prevButton.setAttribute('aria-label', 'Previous button');
                                $(info.prevButton).addClass('tns-prev');
                            }
                        },
                    });

                    if (featured_slider && featured_slider.events) {
                        featured_slider.events.on('dragStart', function (info) {
                            if (info.event) {
                                info.event.preventDefault();
                                info.event.stopPropagation();
                            }
                        });
                        $(ele).addClass('jeg_tns_active');
                        $(ele).data('tiny-slider', featured_slider);
                    }
                }
            });
        }
    };

    $(function () {
        gvnews.tnsGallery.init();
    });

})(jQuery);
