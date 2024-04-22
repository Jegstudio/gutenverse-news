(function () {
    'use strict';
    window.gvnews = window.gvnews || {};
    window.gvnews.owlslider = window.gvnews.owlslider || {};
    var jowlslider = (function () {
        'use strict';
        var isGvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
            isTnsActive = 'function' === typeof gvnews.tns;
        var jowlslider = function (options) {
            if (isGvnewsLibrary) {
                var gvnewsLibrary = gvnews.library;
                options = gvnewsLibrary.extend(
                    {
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
                    options || {}
                );
                var JSlider = {
                    init: function init() {
                        var base = this;
                        base.options = options;
                        base.$slider = base.query(base.options.container);
                        base.wrapper = gvnewsLibrary.getParents(base.$slider, '.gvnews_slider_wrapper');
                        base.wrapper = base.wrapper.length ? base.wrapper[base.wrapper.length - 1] : gvnewsLibrary.doc;
                        base.$thumbnail = base.wrapper.querySelector(base.options.navContainer);

                        base.options.hover = base.$slider.dataset.hoverAction;
                        base.options.autoplay = base.$slider.dataset.autoplay;
                        base.options.autoplayTimeout = base.$slider.dataset.delay;

                        if (isTnsActive) {
                            if (!gvnewsLibrary.hasClass(base.$slider, 'gvnews_tns_active')) {
                                base.mainSlider = gvnews.tns({
                                    container: base.$slider,
                                    items: 1,
                                    autoplay: base.options.autoplay,
                                    speed: base.options.speed,
                                    autoplayTimeout: base.options.autoplayTimeout,
                                    nav: false,
                                    controls: true,
                                    controlsText: ['', ''],
                                    rewind: false,
                                    mouseDrag: base.options.mouseDrag,
                                    lazyload: true,
                                    lazyloadSelector: '.gvnews_slide_item .owl-lazy',
                                    textDirection: base.options.textDirection,
                                    onInit: function (info) {
                                        if ('undefined' !== typeof info.nextButton) {
                                            gvnewsLibrary.addClass(info.nextButton, 'tns-next');
                                        }
                                        if ('undefined' !== typeof info.prevButton) {
                                            gvnewsLibrary.addClass(info.prevButton, 'tns-prev');
                                        }
                                    },
                                });
                                if ('undefined' !== typeof base.mainSlider) {
                                    gvnewsLibrary.addClass(base.$slider, 'gvnews_tns_active');
                                    gvnewsLibrary.dataStorage.put(base.$slider, 'tiny-slider', base.mainSlider);

                                    base.mainSlider.events.on('indexChanged', function (e) {
                                        base.currentThumbnail(e);
                                    });
                                    base.mainSlider.events.on('dragStart', base.stopPropagationDrag);
                                }
                            }

                            if (!gvnewsLibrary.hasClass(base.$thumbnail, 'gvnews_tns_active')) {
                                base.thumbnailSlider = gvnews.tns({
                                    container: base.$thumbnail,
                                    nav: false,
                                    controls: false,
                                    loop: false,
                                    items: base.options.items,
                                    gutter: base.options.gutter,
                                    mouseDrag: base.options.mouseDrag,
                                    textDirection: base.options.textDirection, // need to wait new version
                                    lazyload: true,
                                    freezable: true,
                                    lazyloadSelector: '.gvnews_slide_thumbnail_item .owl-lazy',
                                    responsive: base.options.responsive,
                                    onInit: function (info) {
                                        if ('undefined' !== typeof info.nextButton) {
                                            gvnewsLibrary.addClass(info.nextButton, 'tns-next');
                                        }
                                        if ('undefined' !== typeof info.prevButton) {
                                            gvnewsLibrary.addClass(info.prevButton, 'tns-prev');
                                        }
                                        base.setCurrentThumbnail(info);
                                    },
                                });
                                if ('undefined' !== typeof base.thumbnailSlider) {
                                    base.thumbnailSlider.events.on('dragStart', base.stopPropagationDrag);
                                    gvnewsLibrary.addClass(base.$thumbnail, 'gvnews_tns_active');
                                    gvnewsLibrary.dataStorage.put(base.$thumbnail, 'tiny-slider', base.thumbnailSlider);
                                }
                            }
                        }
                    },
                    query: function query(value) {
                        if ('string' === typeof value) {
                            value = gvnewsLibrary.doc.querySelector(value);
                        }
                        return value;
                    },
                    stopPropagationDrag: function stopPropagationDrag(info) {
                        info.event.preventDefault();
                        info.event.stopPropagation();
                    },
                    setCurrentThumbnail: function setCurrentThumbnail(thumbnailSliderInfo) {
                        var base = this,
                            current = thumbnailSliderInfo.index;
                        thumbnailSliderInfo.slideItems[current].classList.add('current');
                        if ('object' === typeof thumbnailSliderInfo.slideItems && thumbnailSliderInfo.slideItems) {
                            base.in_drag = false;
                            gvnewsLibrary.objKeys(thumbnailSliderInfo.slideItems).forEach(function (key) {
                                var value = thumbnailSliderInfo.slideItems[key],
                                    thumbnailEvent = function (e) {
                                        var hover = 'mouseover' === e.type ? !base.in_drag : false,
                                            click = 'click' === e.type ? !base.in_drag : false;
                                        if (click) {
                                            e.preventDefault();
                                        }
                                        if (hover || click) {
                                            base.mainSlider.goTo(key);
                                        }
                                    };
                                value.addEventListener('mousedown', function () {
                                    base.in_drag = true;
                                });
                                value.addEventListener('mouseup', function () {
                                    base.in_drag = false;
                                });
                                value.addEventListener('mouseleave', function () {
                                    base.in_drag = false;
                                });
                                if (base.options.hover) {
                                    value.addEventListener('mouseover', thumbnailEvent);
                                }
                                value.addEventListener('click', thumbnailEvent);
                            });
                        }
                    },
                    currentThumbnail: function currentThumbnail(e) {
                        var mainSliderInfo = this.mainSlider.getInfo(),
                            thumbnailSliderInfo = this.thumbnailSlider.getInfo(),
                            indexToGoTo = mainSliderInfo.displayIndex,
                            prev = mainSliderInfo.indexCached;

                        thumbnailSliderInfo.slideItems[prev - 1].classList.remove('current');
                        this.thumbnailSlider.goTo(indexToGoTo - 1);
                        thumbnailSliderInfo.slideItems[indexToGoTo - 1].classList.add('current');
                    },
                };
                JSlider.init();
            }
        };
        return jowlslider;
    })();
    window.gvnews.owlslider = jowlslider;
})();
