(function () {
    'use strict';
    window.gvnews = window.gvnews || {};
    window.gvnews.slider = window.gvnews.slider || {};
    var gvnews_slider = (function () {
        'use strict';
        var isGvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
            isTnsActive = 'function' === typeof gvnews.tns;
        if (isTnsActive && isGvnewsLibrary) {
            var gvnewsLibrary = gvnews.library,
                setNavCenter = function (element, wrapper) {
                    var slider_nav = wrapper.getElementsByClassName('tns-controls button');
                    if (slider_nav.length) {
                        var thumb = element.getElementsByClassName('thumbnail-container');
                        if (thumb.length) {
                            var thumb_height = thumb[0].getBoundingClientRect().height;
                            gvnewsLibrary.forEach(slider_nav, function (ele, i) {
                                var nav_height = ele.getBoundingClientRect().height,
                                    top = thumb_height * 0.5 - nav_height * 0.5;

                                ele.style.top = top + 'px';
                            });
                        }
                    }
                },
                gvnews_slider = function (options) {
                    var slideType,
                        debounceResize,
                        defaultOption = (function (options) {
                            var jsliderDefault = {
                                    container: options.container,
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
                                    onInit: false,
                                },
                                wrapper,
                                items_desktop,
                                items_tablet,
                                items_phone;

                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_1')) {
                                slideType = 1;
                                jsliderDefault = {
                                    container: options.container,
                                    textDirection: 'ltr',
                                };
                                return jsliderDefault;
                            }

                            jsliderDefault.autoplay = jsliderDefault.container.dataset.autoplay;
                            jsliderDefault.autoplayTimeout = jsliderDefault.container.dataset.delay;
                            jsliderDefault.textDirection = 'ltr';

                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_2')) {
                                slideType = 2;
                                jsliderDefault.controls = false;
                                jsliderDefault.mouseDrag = true;
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_3')) {
                                slideType = 3;
                                wrapper = gvnewsLibrary.getParents(jsliderDefault.container, '.gvnews_slider_wrapper');
                                wrapper = wrapper.length ? wrapper[wrapper.length - 1] : gvnewsLibrary.doc;
                                jsliderDefault.items = jsliderDefault.container.dataset.items;
                                items_desktop = jsliderDefault.items;
                                items_tablet = jsliderDefault.items < 3 ? jsliderDefault.items : 3;
                                items_phone = jsliderDefault.items < 2 ? jsliderDefault.items : 2;
                                // Main Content
                                if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_2o3')) {
                                    if (items_desktop > 3 && gvnewsLibrary.windowWidth() == 1024) items_desktop = 3;
                                    // Sidebar
                                } else if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_1o3')) {
                                    items_tablet = 1;

                                    if (gvnewsLibrary.windowWidth() >= 1024) items_desktop = 1;
                                }
                                jsliderDefault.nav = false;
                                jsliderDefault.controlsText = ['', ''];
                                jsliderDefault.mouseDrag = true;
                                jsliderDefault.edgePadding = 35;
                                jsliderDefault.gutter = 5;
                                jsliderDefault.lazyload = true;
                                jsliderDefault.lazyloadSelector = '.gvnews_slide_item .owl-lazy';
                                jsliderDefault.responsive = {
                                    0: { items: 1 },
                                    568: { items: items_phone },
                                    768: { items: items_tablet },
                                    1024: { items: items_desktop },
                                };
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_4')) {
                                slideType = 4;
                                jsliderDefault.mode = 'gallery';
                                jsliderDefault.controlsText = ['', ''];
                                jsliderDefault.mouseDrag = true;
                                jsliderDefault.speed = 1000;
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_5')) {
                                slideType = 5;
                                jsliderDefault.nav = false;
                                jsliderDefault.controlsText = ['', ''];
                                jsliderDefault.mouseDrag = true;
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_6')) {
                                slideType = 6;
                                jsliderDefault.nav = false;
                                jsliderDefault.controlsText = [jsliderDefault.container.dataset.navPrev, jsliderDefault.container.dataset.navNext];
                                jsliderDefault.mouseDrag = true;
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_7')) {
                                slideType = 7;
                                jsliderDefault.nav = false;
                                jsliderDefault.controls = false;
                                jsliderDefault.mode = 'gallery';
                                jsliderDefault.speed = 500;
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_8')) {
                                slideType = 8;
                                wrapper = gvnewsLibrary.getParents(jsliderDefault.container, '.gvnews_slider_wrapper');
                                wrapper = wrapper.length ? wrapper[wrapper.length - 1] : gvnewsLibrary.doc;
                                jsliderDefault.items = jsliderDefault.container.dataset.items;
                                items_desktop = jsliderDefault.items;
                                items_tablet = jsliderDefault.items < 3 ? jsliderDefault.items : 3;
                                items_phone = jsliderDefault.items < 2 ? jsliderDefault.items : 2;

                                // Main Content
                                if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_2o3')) {
                                    if (items_desktop > 3 && gvnewsLibrary.windowWidth() == 1024) items_desktop = 3;
                                    // Sidebar
                                } else if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_1o3')) {
                                    items_tablet = 1;
                                    if (gvnewsLibrary.windowWidth() >= 1024) items_desktop = 1;
                                }
                                jsliderDefault.nav = false;
                                jsliderDefault.controls = true;
                                jsliderDefault.controlsText = ['', ''];
                                jsliderDefault.mouseDrag = true;
                                jsliderDefault.edgePadding = 30;
                                jsliderDefault.responsive = {
                                    0: { items: 1 },
                                    568: { items: items_phone },
                                    768: { items: items_tablet },
                                    1024: {
                                        items: items_desktop,
                                        edgePadding: items_desktop > 1 ? 50 : 30,
                                    },
                                };
                                jsliderDefault.onInit = function () {
                                    setNavCenter(jsliderDefault.container, wrapper);
                                };
                                return jsliderDefault;
                            }
                            if (gvnewsLibrary.hasClass(jsliderDefault.container, 'gvnews_slider_type_9')) {
                                slideType = 9;
                                jsliderDefault.nav = false;
                                jsliderDefault.controls = false;
                                jsliderDefault.mode = 'gallery';
                                return jsliderDefault;
                            }

                            return jsliderDefault;
                        })(options);
                    options = gvnewsLibrary.extend(defaultOption, options || {});
                    if (slideType) {
                        if (1 !== slideType) {
                            if (!gvnewsLibrary.hasClass(options.container, 'gvnews_tns_active')) {
                                var JegSlider = gvnews.tns(options);
                                if ('undefined' !== typeof JegSlider) {
                                    JegSlider.events.on('dragStart', function (info) {
                                        info.event.preventDefault();
                                        info.event.stopPropagation();
                                    });
                                    gvnewsLibrary.addClass(options.container, 'gvnews_tns_active');
                                    gvnewsLibrary.dataStorage.put(options.container, 'tiny-slider', JegSlider);

                                    switch (slideType) {
                                        case 7:
                                            gvnewsLibrary.forEach(options.container.querySelectorAll('.gvnews_block_nav a'), function (ele, i) {
                                                gvnewsLibrary.addEvents(ele, {
                                                    click: function (e) {
                                                        e.preventDefault();
                                                        if (gvnewsLibrary.hasClass(this, 'next')) {
                                                            JegSlider.goTo('next');
                                                        } else {
                                                            JegSlider.goTo('prev');
                                                        }
                                                    },
                                                });
                                            });
                                            break;
                                        case 8:
                                            var wrapper = gvnewsLibrary.getParents(options.container, '.gvnews_slider_wrapper');
                                            wrapper = wrapper.length ? wrapper[wrapper.length - 1] : gvnewsLibrary.doc;
                                            gvnewsLibrary.addEvents(gvnewsLibrary.win, {
                                                resize: function () {
                                                    if (debounceResize) {
                                                        gvnewsLibrary.cancelAnimationFrame.call(gvnewsLibrary.win, debounceResize);
                                                    }
                                                    debounceResize = gvnewsLibrary.requestAnimationFrame.call(gvnewsLibrary.win, function () {
                                                        setNavCenter(options.container, wrapper);
                                                    });
                                                },
                                            });
                                            break;
                                        case 9:
                                            var parent = gvnewsLibrary.getParents(options.container, '.gvnews_slider_wrapper');
                                            parent = parent.length ? parent[parent.length - 1] : gvnewsLibrary.doc;
                                            gvnewsLibrary.forEach(parent.querySelectorAll('.gvnews_slider_type_9_thumb article'), function (ele, i) {
                                                gvnewsLibrary.addEvents(ele, {
                                                    click: function (e) {
                                                        e.preventDefault();
                                                        var indexSlider = this.dataset.index;
                                                        JegSlider.goTo(indexSlider);
                                                    },
                                                });
                                            });
                                            break;
                                    }
                                }
                            }
                        } else {
                            gvnews.owlslider(options);
                        }
                    }
                };
        } else {
            if (!isTnsActive) {
                console.warn('Tiny Slider could not be found');
            }
            if (!isGvnewsLibrary) {
                console.warn('GVNews Library could not be found');
            }
        }
        return gvnews_slider;
    })();
    window.gvnews.slider = gvnews_slider;
})();
