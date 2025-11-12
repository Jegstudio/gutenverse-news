import { u } from 'gutenverse-core-frontend';

class GutenverseHeroModule {
    constructor(element) {
        let block = u(element).find('.gvnews_hero_wrapper:not(.gvnews_tns_active)');
        let autoplay = u(block).data('autoplay');
        let delay = u(block).data('delay');

        block.each((hero) => {
            if (!u(hero).hasClass('gvnews_tns_active')) {
                let heroSlider = window.tns({
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
                            u(info.nextButton).addClass('tns-prev');
                        }
                    },
                });
                console.log(heroSlider);
            }
        });
    }
}

const selected = u('.gvnews_heroblock.tiny-slider');

if (selected) {
    selected.map(element => {
        new GutenverseHeroModule(element);
    });
}