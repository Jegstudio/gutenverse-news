import { u } from 'gutenverse-core-frontend';

class GutenverseCarouselModule {
    constructor(element, options = {}) {
        this.block = u(element);
        this.options = options;

        this.init();
    }

    carousel_1 = (carouselDefault) => {
        let carouselType = 1;

        /* Fullwidth (column 12) */
        if (u(this.block).hasClass('gvnews_col_12')) {
            carouselDefault.items = 'undefined' === typeof carouselDefault.container.dataset.items ? 5 : parseInt(carouselDefault.container.dataset.items);
        }
        carouselDefault.controlsPosition = 'bottom';
        carouselDefault.responsive = {
            0: { items: 1 },
            321: { items: 2, gutter: carouselDefault.gutter > 15 ? 15 : carouselDefault.gutter },
            568: { items: 3, gutter: carouselDefault.gutter > 15 ? 15 : carouselDefault.gutter },
            1024: { items: carouselDefault.items },
        };

        return { carouselType, carouselDefault };
    }

    carousel_2 = (carouselDefault) => {
        let carouselType = 2;

        carouselDefault.items = 'undefined' === typeof carouselDefault.container.dataset.items ? 3 : parseInt(carouselDefault.container.dataset.items);
        carouselDefault.autoHeight = false;
        carouselDefault.responsive = {
            0: { items: 1 },
            568: { items: 2 },
            768: { items: carouselDefault.items > 3 ? 3 : carouselDefault.items },
            1024: { items: carouselDefault.items },
        };

        return { carouselType, carouselDefault };
    }

    carousel_3 = (carouselDefault) => {
        let carouselType = 3;

        /* Fullwidth (column 12) */
        if (u(this.block).hasClass('gvnews_col_12')) {
            const parentWidth = carouselDefault.container.getBoundingClientRect().width;
            if (parentWidth < 321) {
                carouselDefault.items = 1;
            } else if (parentWidth < 568) {
                carouselDefault.items = 2;
            } else {
                carouselDefault.items = 'undefined' === typeof carouselDefault.container.dataset.items ? 3 : parseInt(carouselDefault.container.dataset.items);
            }
            carouselDefault.responsive = {
                0: { items: 1 },
                568: { items: 2 },
                768: { items: carouselDefault.items > 3 ? 3 : carouselDefault.items },
                1024: { items: carouselDefault.items },
            };
            /* Main content w/ sidebar (column 8) */
        } else if (u(this.block).hasClass('gvnews_col_6') || u(this.block).hasClass('gvnews_col_7') || u(this.block).hasClass('gvnews_col_8')) {
            carouselDefault.items = 'undefined' === typeof carouselDefault.container.dataset.items ? 2 : parseInt(carouselDefault.container.dataset.items);
            carouselDefault.responsive = {
                0: { items: 1 },
                568: { items: 2 },
                1024: { items: carouselDefault.items > 2 ? 2 : carouselDefault.items },
            };
        } else {
            carouselDefault.items = 1;
            carouselDefault.responsive = {
                0: { items: 1 },
                568: { items: 2 },
                1024: { items: carouselDefault.items },
            };
        }

        return { carouselType, carouselDefault };
    }

    getDefaultOption = (options, wrapper) => {
        let carouselDefault = {
            textDirection: 'ltr',
            container: wrapper.nodes[0],
            controls: false,
            gutter: 20,
            controlsText: ['', ''],
            nav: false,
            loop: true,
            items: 3,
            autoplay: false,
            autoplayTimeout: 3000,
            animateOut: 'tns-fadeOut',
            autoHeight: true,
            mouseDrag: true,
            responsive: false,
            edgePadding: 0,
            lazyload: false,
            lazyloadSelector: 'img',
            mode: 'carousel',
            speed: 300,
            onInit: function (info) {
                if ('undefined' !== typeof info.nextButton) {
                    u(info.nextButton).addClass('tns-next');
                }
                if ('undefined' !== typeof info.prevButton) {
                    u(info.prevButton).addClass('tns-prev');
                }
            },
        };

        carouselDefault.items = options?.items ? options.items : ('undefined' === typeof carouselDefault.container.dataset.items ? 3 : parseInt(carouselDefault.container.dataset.items));
        carouselDefault.controls = 'undefined' === typeof carouselDefault.container.dataset.nav ? carouselDefault.controls : carouselDefault.container.dataset.nav;
        carouselDefault.autoplay = 'undefined' === typeof carouselDefault.container.dataset.autoplay ? carouselDefault.autoplay : carouselDefault.container.dataset.autoplay;
        carouselDefault.autoplayTimeout = 'undefined' === typeof carouselDefault.container.dataset.delay ? carouselDefault.autoplayTimeout : parseInt(carouselDefault.container.dataset.delay);
        carouselDefault.gutter = options?.gutter ? options.gutter : ('undefined' === typeof carouselDefault.container.dataset.margin ? carouselDefault.gutter : parseInt(carouselDefault.container.dataset.margin));

        // Bypass lazyload tinyslider.
        carouselDefault.lazyload = 'undefined' === typeof carouselDefault.container.dataset.lazyload ? carouselDefault.lazyload : carouselDefault.container.dataset.lazyload;
        carouselDefault.lazyloadSelector = 'undefined' === typeof carouselDefault.container.dataset.lazyload ? carouselDefault.lazyloadSelector : 'imgs';
        carouselDefault.textDirection = 'ltr';


        /*** Postblock Carousel 1 ***/
        if (u(this.block).hasClass('gvnews_postblock_carousel_1')) {
            return this.carousel_1(carouselDefault);
        }

        /*** Postblock Carousel 2 ***/
        if (u(this.block).hasClass('gvnews_postblock_carousel_2')) {
            return this.carousel_2(carouselDefault);
        }

        /*** Postblock Carousel 3 ***/
        if (u(this.block).hasClass('gvnews_postblock_carousel_3')) {
            return this.carousel_3(carouselDefault);
        }

        return null;
    };

    init = () => {
        this.block.each((carousel) => {
            if (!u(carousel).hasClass('gvnews_tns_active')) {
                let container = u(carousel).find('.gvnews_carousel_post');
                if (container.length) {
                    let { carouselType, carouselDefault } = this.getDefaultOption(this.options, container);

                    if (carouselType) {
                        let carouselSlider = window.tns(carouselDefault);

                        carouselSlider.events.on('dragStart', function (info) {
                            info.event.preventDefault();
                            info.event.stopPropagation();
                        });

                        u(this.block).addClass('gvnews_tns_active');
                    }
                }
            }
        });
    }
}

(() => {
    const selected = u('.gvnews_postblock_carousel');

    if (selected) {
        selected.map(element => {
            new GutenverseCarouselModule(element);
        });
    }

    window.gvnewsCarouselSlider = (element) => {
        new GutenverseCarouselModule(element);
    };
})();

export default GutenverseCarouselModule;