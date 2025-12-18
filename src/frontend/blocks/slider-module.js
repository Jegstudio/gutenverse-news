import { u, renderIcon } from 'gutenverse-core-frontend';

/**
 * Slider 01.
 */
class GutenverseFirstSlider {
    constructor(sliderOptions = {}) {
        this.container = sliderOptions.container;
        this.options = {
            ...{
                container: '.gvnews_slider_type_1',
                items: 5,
                responsive: {
                    0: {
                        items: 4,
                        sliderBy: 4,
                    },
                    768: {
                        items: 6,
                        sliderBy: 6,
                    },
                    1024: {
                        items: 7,
                        sliderBy: 7,
                    },
                },
                gutter: 10,
                controls: true,
                autoplay: true,
                mouseDrag: true,
                speed: 500,
                autoplayTimeout: 5000,
                textDirection: 'ltr',
                navAsThumbnails: true,
                navContainer: '.gvnews_slider_thumbnail',
            },
            ...sliderOptions,
        };

        this.init();
    }

    stopPropagationDrag = (info) => {
        info.event.preventDefault();
        info.event.stopPropagation();
    }

    currentThumbnail = (e) => {
        let mainSliderInfo = this.mainSlider.getInfo();
        let thumbnailSliderInfo = this.thumbnailSlider.getInfo();
        let indexToGoTo = mainSliderInfo.displayIndex;
        let prev = mainSliderInfo.indexCached;

        thumbnailSliderInfo.slideItems[prev - 1].classList.remove('current');
        this.thumbnailSlider.goTo(indexToGoTo - 1);
        thumbnailSliderInfo.slideItems[indexToGoTo - 1].classList.add('current');
    }

    objKeys = (object) => {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    }

    setCurrentThumbnail = (thumbnailSliderInfo) => {
        let current = thumbnailSliderInfo.index;
        thumbnailSliderInfo.slideItems[current].classList.add('current');

        if ('object' === typeof thumbnailSliderInfo.slideItems && thumbnailSliderInfo.slideItems) {
            this.in_drag = false;
            this.objKeys(thumbnailSliderInfo.slideItems).map(key => {
                let value = thumbnailSliderInfo.slideItems[key];
                let thumbnailEvent = (e) => {
                    var hover = 'mouseover' === e.type ? !this.in_drag : false,
                        click = 'click' === e.type ? !this.in_drag : false;
                    if (click) {
                        e.preventDefault();
                    }
                    if (hover || click) {
                        this.mainSlider.goTo(key);
                    }
                };
                value.addEventListener('mousedown', function () {
                    this.in_drag = true;
                });
                value.addEventListener('mouseup', function () {
                    this.in_drag = false;
                });
                value.addEventListener('mouseleave', function () {
                    this.in_drag = false;
                });
                if (this.options.hover) {
                    value.addEventListener('mouseover', thumbnailEvent);
                }
                value.addEventListener('click', thumbnailEvent);
            });
        }
    }

    init() {

        let isSlider = false;
        if (typeof this.options.container === 'string') {
            isSlider = u(this.container).is(this.options.container);
        } else {
            isSlider = this.container === this.options.container;
        }

        if (isSlider) {
            this.theSlider = this.container;
        } else {
            this.theSlider = u(this.container).find(this.options.container)?.nodes[0];
        }
        this.theWrapper = u(this.theSlider).parent('.gvnews_slider_wrapper')?.nodes[0];
        this.theThumbnail = u(this.theWrapper).find(this.options.navContainer)?.nodes[0];

        this.options.hover = this.theSlider.dataset.hoverAction;
        this.options.autoplay = this.theSlider.dataset.autoplay;
        this.options.autoplayTimeout = this.theSlider.dataset.delay;

        const iconNext = this.theSlider.dataset.classNext || '';
        const iconNextType = this.theSlider.dataset.classNextType || 'icon';
        const iconNextSVG = this.theSlider.dataset.classNextSvg || '';

        const iconPrev = this.theSlider.dataset.classPrev || '';
        const iconPrevType = this.theSlider.dataset.classPrevType || 'icon';
        const iconPrevSVG = this.theSlider.dataset.classPrevSvg || '';

        const finalNextIcon = (iconNextType === 'svg' && !iconNextSVG) ? '' : iconNext;
        const finalPrevIcon = (iconPrevType === 'svg' && !iconPrevSVG) ? '' : iconPrev;

        if (!u(this.theSlider).hasClass('gvnews_tns_active')) {
            this.mainSlider = window.tns({
                container: this.theSlider,
                items: 1,
                autoplay: this.options.autoplay,
                speed: this.options.speed,
                autoplayTimeout: this.options.autoplayTimeout,
                nav: false,
                controls: true,
                controlsText: ['', ''],
                rewind: false,
                mouseDrag: this.options.mouseDrag,
                lazyload: true,
                lazyloadSelector: '.gvnews_slide_item .owl-lazy',
                textDirection: this.options.textDirection,
                onInit: function (info) {
                    if ('undefined' !== typeof info.nextButton) {
                        u(info.nextButton).addClass('tns-next');
                        u(info.nextButton).html(renderIcon(finalNextIcon, iconNextType, iconNextSVG));
                    }
                    if ('undefined' !== typeof info.prevButton) {
                        u(info.prevButton).addClass('tns-prev');
                        u(info.prevButton).html(renderIcon(finalPrevIcon, iconPrevType, iconPrevSVG));
                    }
                },
            });

            if ('undefined' !== typeof this.mainSlider) {
                u(this.theSlider).addClass('gvnews_tns_active');
                this.mainSlider.events.on('indexChanged', (e) => {
                    this.currentThumbnail(e);
                });
                this.mainSlider.events.on('dragStart', this.stopPropagationDrag);
            }
        }

        if (!u(this.theThumbnail).hasClass('gvnews_tns_active')) {
            this.thumbnailSlider = window.tns({
                container: this.theThumbnail,
                nav: false,
                controls: false,
                loop: false,
                items: this.options.items,
                gutter: this.options.gutter,
                mouseDrag: this.options.mouseDrag,
                textDirection: this.options.textDirection, // need to wait new version
                lazyload: true,
                freezable: true,
                lazyloadSelector: '.gvnews_slide_thumbnail_item .owl-lazy',
                responsive: this.options.responsive,
                onInit: (info) => {
                    if ('undefined' !== typeof info.nextButton) {
                        u(info.nextButton).addClass('tns-next');
                    }
                    if ('undefined' !== typeof info.prevButton) {
                        u(info.prevButton).addClass('tns-prev');
                    }
                    this.setCurrentThumbnail(info);
                },
            });
        }
    }
}

/**
 * Slider other than 01.
 */
class GutenverseSliderModule {
    constructor(element, options = {}) {
        this.container = element;
        this.options = options;
        this.init();
    }

    firstSlider = (sliderOptions) => {
        new GutenverseFirstSlider(sliderOptions);
    }

    getWindowWidth = () => {
        return window.innerWidth;
    }

    defaultOption = () => {
        const nextClass = this.container.dataset.classNext || 'fas fa-chevron-right';
        const prevClass = this.container.dataset.classPrev || 'fas fa-chevron-left';
        const navNext = this.container.dataset.navNext || '';
        const navPrev = this.container.dataset.navPrev || '';

        let sliderDefault = {
            container: this.container,
            nav: true,
            controls: true,
            loop: true,
            mouseDrag: false,
            items: 1,
            autoplay: false,
            autoplayTimeout: 5000,
            textDirection: 'ltr',
            controlsText: ['prev', 'next'],
            edgePadding: 0,
            gutter: 0,
            lazyload: false,
            lazyloadSelector: 'img',
            responsive: false,
            mode: 'carousel',
            animateOut: 'tns-fadeOut',
            speed: 300,
            onInit: function (info) {
                if ('undefined' !== typeof info.nextButton) {
                    u(info.nextButton).addClass('tns-next');
                    u(info.nextButton).html(`<span class="tns-nav-text">${navNext}</span><i class="${nextClass}"></i>`);
                }
                if ('undefined' !== typeof info.prevButton) {
                    u(info.prevButton).addClass('tns-prev');
                    u(info.prevButton).html(`<i class="${prevClass}"></i><span class="tns-nav-text">${navPrev}</span>`);
                }
            },
        };
        let slideType;
        let wrapper;
        let items_desktop;
        let items_tablet;
        let items_phone;

        // Slider 1.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_1')) {
            slideType = 1;
            sliderDefault = {
                container: this.container,
                textDirection: 'ltr',
            };
            return { slideType, sliderDefault };
        }

        sliderDefault.autoplay = sliderDefault.container.dataset.autoplay;
        sliderDefault.autoplayTimeout = sliderDefault.container.dataset.delay;
        sliderDefault.textDirection = 'ltr';

        // Slider 2.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_2')) {
            slideType = 2;
            sliderDefault.controls = false;
            sliderDefault.mouseDrag = true;
            return { slideType, sliderDefault };
        }

        // Slider 3.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_3')) {
            slideType = 3;
            wrapper = u(sliderDefault.container).parent('.gvnews_slider_wrapper');
            sliderDefault.items = sliderDefault.container.dataset.items;
            items_desktop = sliderDefault.items;
            items_tablet = sliderDefault.items < 3 ? sliderDefault.items : 3;
            items_phone = sliderDefault.items < 2 ? sliderDefault.items : 2;

            // Main Content
            if (u(wrapper).find('gvnews_col_2o3')) {
                if (items_desktop > 3 && this.getWindowWidth() == 1024) {
                    items_desktop = 3;
                }
            } else if (u(wrapper).find('gvnews_col_1o3')) {
                items_tablet = 1;

                if (this.windowWidth() >= 1024) items_desktop = 1;
            }

            sliderDefault.nav = false;
            sliderDefault.controlsText = ['', ''];
            sliderDefault.mouseDrag = true;
            sliderDefault.edgePadding = 35;
            sliderDefault.gutter = 5;
            sliderDefault.lazyload = true;
            sliderDefault.lazyloadSelector = '.gvnews_slide_item .owl-lazy';
            sliderDefault.responsive = {
                0: { items: 1 },
                568: { items: items_phone },
                768: { items: items_tablet },
                1024: { items: items_desktop },
            };

            return { slideType, sliderDefault };
        }

        // Slider 4.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_4')) {
            slideType = 4;
            sliderDefault.mode = 'gallery';
            sliderDefault.controlsText = ['', ''];
            sliderDefault.mouseDrag = true;
            sliderDefault.speed = 1000;

            return { slideType, sliderDefault };
        }

        // Slider 5.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_5')) {
            slideType = 5;
            sliderDefault.nav = false;
            sliderDefault.controlsText = ['', ''];
            sliderDefault.mouseDrag = true;

            return { slideType, sliderDefault };
        }

        // Slider 6.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_6')) {
            slideType = 6;
            sliderDefault.nav = false;
            sliderDefault.controlsText = [sliderDefault.container.dataset.navPrev, sliderDefault.container.dataset.navNext];
            sliderDefault.mouseDrag = true;

            return { slideType, sliderDefault };
        }

        // Slider 7.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_7')) {
            slideType = 7;
            sliderDefault.nav = false;
            sliderDefault.controls = false;
            sliderDefault.mode = 'gallery';
            sliderDefault.speed = 500;

            return { slideType, sliderDefault };
        }

        // Slider 8.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_8')) {
            const nextClass = this.container.dataset.classNext || 'fas fa-chevron-right';
            const prevClass = this.container.dataset.classPrev || 'fas fa-chevron-left';

            slideType = 8;
            wrapper = u(sliderDefault.container).parent('.gvnews_slider_wrapper');
            sliderDefault.items = sliderDefault.container.dataset.items;
            items_desktop = sliderDefault.items;
            items_tablet = sliderDefault.items < 3 ? sliderDefault.items : 3;
            items_phone = sliderDefault.items < 2 ? sliderDefault.items : 2;

            if (u(wrapper).find('gvnews_col_2o3')) {
                if (items_desktop > 3 && this.windowWidth() == 1024) items_desktop = 3;
            } else if (u(wrapper).find('gvnews_col_1o3')) {
                items_tablet = 1;
                if (this.windowWidth() >= 1024) items_desktop = 1;
            }

            sliderDefault.nav = false;
            sliderDefault.controls = true;
            sliderDefault.controlsText = ['', ''];
            sliderDefault.mouseDrag = true;
            sliderDefault.edgePadding = 30;
            sliderDefault.responsive = {
                0: { items: 1 },
                568: { items: items_phone },
                768: { items: items_tablet },
                1024: {
                    items: items_desktop,
                    edgePadding: items_desktop > 1 ? 50 : 30,
                },
            };

            sliderDefault.onInit = (info) => {
                this.setNavCenter(sliderDefault.container, wrapper);
                if ('undefined' !== typeof info.nextButton) {
                    u(info.nextButton).addClass('tns-next');
                    u(info.nextButton).html(`<i class="${nextClass}"></i>`);
                }
                if ('undefined' !== typeof info.prevButton) {
                    u(info.prevButton).addClass('tns-prev');
                    u(info.prevButton).html(`<i class="${prevClass}"></i>`);
                }
            };

            return { slideType, sliderDefault };
        }

        // Slider 9.
        if (u(sliderDefault.container).hasClass('gvnews_slider_type_9')) {
            slideType = 9;
            sliderDefault.nav = false;
            sliderDefault.controls = false;
            sliderDefault.mode = 'gallery';

            return { slideType, sliderDefault };
        }
    }

    setNavCenter = (element, wrapper) => {
        let slider_nav = u(wrapper).find('.tns-controls button');
        if (slider_nav.nodes.length) {
            let thumb = u(element).find('.thumbnail-container');
            if (thumb.length) {
                let thumb_height = thumb?.nodes[0].getBoundingClientRect().height;
                slider_nav.map((ele) => {
                    let nav_height = ele.getBoundingClientRect().height;
                    let top = thumb_height * 0.5 - nav_height * 0.5;
                    ele.style.top = top + 'px';
                });
            }
        }
    }

    init = () => {
        let debounceResize;
        let { slideType, sliderDefault: defaultOption } = this.defaultOption(this.options);

        let sliderOption = {
            ...defaultOption,
            ...this.options
        };

        if (slideType) {
            if (1 !== slideType) {
                if (!u(this.container).hasClass('gvnews_tns_active')) {
                    const theSlider = window.tns(sliderOption);

                    if ('undefined' !== typeof theSlider) {
                        theSlider.events.on('dragStart', function (info) {
                            info.event.preventDefault();
                            info.event.stopPropagation();
                        });

                        u(sliderOption.container).addClass('gvnews_tns_active');

                        switch (slideType) {
                            case 7:
                                u(sliderOption.container).find('.gvnews_block_nav a').map((element) => {
                                    u(element).on('click', (e) => {
                                        e.preventDefault();
                                        if (u(element).hasClass('next')) {
                                            theSlider.goTo('next');
                                        } else {
                                            theSlider.goTo('prev');
                                        }
                                    });
                                });
                                break;
                            case 8:
                                const wrapper = sliderOption.container.closest('.gvnews_slider_wrapper');
                                u([window]).on('resize', () => {
                                    clearTimeout(debounceResize);
                                    debounceResize = setTimeout(() => {
                                        this.setNavCenter(sliderOption.container, wrapper);
                                    }, 150);
                                }); break;
                            case 9:
                                const parent = sliderOption.container.closest('.gvnews_slider_wrapper');
                                u(parent).find(('.gvnews_slider_type_9_thumb article')).map(element => {
                                    u(element).on('click', (e) => {
                                        e.preventDefault();
                                        const indexSlider = element.dataset.index;
                                        theSlider.goTo(indexSlider);
                                    });
                                });
                                break;
                        }
                    }
                }
            } else {
                this.firstSlider(sliderOption);
            }
        }
    }
}

(() => {
    const selected = u('.gvnews_slider_wrapper .gvnews_slider');

    if (selected) {
        selected.map(element => {
            new GutenverseSliderModule(element);
        });
    }

    window.gvnewsSliderModule = (element, options = {}) => {
        new GutenverseSliderModule(element, options);
    };
})();

export default GutenverseSliderModule;
