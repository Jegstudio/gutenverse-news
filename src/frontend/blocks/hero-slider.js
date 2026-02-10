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
                            u(info.nextButton).attr('aria-label', 'next slide');
                            u(info.nextButton).html('<div class="gutenverse-icon-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>');
                        }
                        if ('undefined' !== typeof info.prevButton) {
                            u(info.prevButton).addClass('tns-prev');
                            u(info.prevButton).attr('aria-label', 'previous slide');
                            u(info.prevButton).html('<div class="gutenverse-icon-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg></div>');
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
