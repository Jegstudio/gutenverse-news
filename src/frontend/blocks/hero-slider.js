import { u } from 'gutenverse-core-frontend';

class GutenverseHeroModule {
    constructor(element, options = {}) {
        this.block = u(element).find('.gvnews_hero_wrapper:not(.gvnews_tns_active)');
        this.autoplay = u(this.block).data('autoplay');
        this.delay = u(this.block).data('delay');
        this.options = options;
        this.init();
    }

    init = () => {
        this.block.each((hero) => {
            if (!u(hero).hasClass('gvnews_tns_active')) {
                const defaultOptions = {
                    container: hero,
                    textDirection: 'ltr',
                    items: 1,
                    controlsText: ['', ''],
                    controls: true,
                    nav: false,
                    loop: true,
                    autoplay: this.autoplay,
                    autoplayTimeout: this.delay,
                    mouseDrag: true,
                    onInit: function (info) {
                        if ('undefined' !== typeof info.nextButton) {
                            u(info.nextButton).addClass('tns-next');
                            u(info.nextButton).html('<i class="fas fa-chevron-right"></i>');
                        }
                        if ('undefined' !== typeof info.prevButton) {
                            u(info.prevButton).addClass('tns-prev');
                            u(info.prevButton).html('<i class="fas fa-chevron-left"></i>');
                        }
                    },
                };

                let heroSlider = window.tns({
                    ...defaultOptions,
                    ...this.options
                });

                if ('undefined' !== typeof heroSlider) {
                    heroSlider.events.on('dragStart', function (info) {
                        info.event.preventDefault();
                        info.event.stopPropagation();
                    });
                    u(hero).addClass('gvnews_tns_active');
                }
            }
        });
    }
}

(() => {
    const selected = u('.gvnews_heroblock.tiny-slider');

    if (selected) {
        selected.map(element => {
            new GutenverseHeroModule(element);
        });
    }

    window.gvnewsHeroSlider = (element) => {
        new GutenverseHeroModule(element);
    };
})();

export default GutenverseHeroModule;