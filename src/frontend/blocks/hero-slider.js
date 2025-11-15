import { u } from 'gutenverse-core-frontend';

class GutenverseHeroModule {
    constructor(element, options = {}) {
        let block = u(element).find('.gvnews_hero_wrapper:not(.gvnews_tns_active)');
        let autoplay = u(block).data('autoplay');
        let delay = u(block).data('delay');

        block.each((hero) => {
            if (!u(hero).hasClass('gvnews_tns_active')) {
                const defaultOptions = {
                    container: hero,
                    textDirection: 'ltr',
                    items: 1,
                    controlsText: ['', ''],
                    controls: true,
                    nav: false,
                    loop: true,
                    autoplay: autoplay,
                    autoplayTimeout: delay,
                    mouseDrag: true,
                    onInit: function (info) {
                        if ('undefined' !== typeof info.nextButton) {
                            u(info.nextButton).addClass('tns-next');
                        }
                        if ('undefined' !== typeof info.prevButton) {
                            u(info.prevButton).addClass('tns-prev');
                        }
                    },
                };

                let heroSlider = window.tns({
                    ...defaultOptions,
                    options
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

    window.heroSlider = (element) => {
        new GutenverseHeroModule(element);
    };
})();

export default GutenverseHeroModule;