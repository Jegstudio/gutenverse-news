(function ($) {
    'use strict';
    var isGvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
        gvnewsLibrary = isGvnewsLibrary ? gvnews.library : false;

    var Module = function (element, options) {
        if (gvnewsLibrary) {
            var base = this;
            base.element = $(element);
            base.options = options;
            base.xhr = null;
            base.xhr_cache = [];
            base.lock_action = false;

            base.unique = base.element.data('unique');
            base.data = {
                filter: 0,
                filter_type: 'all',
                current_page: 1,
                attribute: window[base.unique] || {},
            };
            base.ajax_mode = base.data.attribute.pagination_mode;

            // Populate Element
            base.header = base.element.find('.gvnews_block_heading');
            base.container = base.element.find('.gvnews_block_container');
            base.nav_block = base.element.find('.gvnews_block_navigation');
            base.ad_code = base.element.find('.gvnews_ad_code').val();
            base.nav_next = null;
            base.nav_prev = null;
            base.module_overlay = base.container.find('.module-overlay');
            base.load_more_block = base.nav_block.find('.gvnews_block_loadmore');

            if (base.ajax_mode === 'nextprev') {
                base.nav_next = base.nav_block.find('.next');
                base.nav_prev = base.nav_block.find('.prev');

                // assign click
                base.nav_next.on('click', $.proxy(base.click_next, base));
                base.nav_prev.on('click', $.proxy(base.click_prev, base));
            }

            if (base.ajax_mode === 'loadmore' || base.ajax_mode === 'scrollload') {
                base.nav_next = base.load_more_block.find('a');
                base.nav_next.on('click', $.proxy(base.load_more, base));
            }

            if (base.ajax_mode === 'scrollload') {
                base.load_limit = base.data.attribute.pagination_scroll_limit;
                base.load_scroll();
            }

            base.masonry_init();
            base.init();

            base.element.trigger('gvnews_module_init', [base]);
        }
    };

    Module.DEFAULTS = {};

    Module.prototype.init = function () {
        var base = this;

        // call subcat
        base.subcat = base.header.find('.gvnews_subcat');
        if (base.subcat.length) {
            base.subcat.okayNav({ swipe_enabled: false, threshold: 80, toggle_icon_content: '<span></span><span></span><span></span>' });
        }

        /** Block Heading */
        base.assign_header();
    };

    Module.prototype.load_scroll = function () {
        var base = this;

        if (!base.nav_next.hasClass('disabled')) {
            if (base.load_limit > base.data.current_page || base.load_limit == 0) {
                $(window).on('scroll', function () {
                    var windowHeight = $(window).height();
                    var scrollTop = $(window).scrollTop();
                    var elementOffset = base.nav_next.offset().top;
                    var offset = 0; // Adjust this value if needed

                    if (elementOffset - scrollTop <= windowHeight + offset) {
                        base.data.current_page = base.data.current_page + 1;
                        base.request_ajax('scroll');
                        $(window).off('scroll'); // Remove the scroll event handler
                    }
                });
            }
        }
    };

    Module.prototype.click_next = function (event) {
        var base = this;
        var element = base.nav_next;
        event.preventDefault();
        if (!$(element).hasClass('disabled') && !base.lock_action) {
            base.data.current_page = base.data.current_page + 1;
            base.request_ajax('next');
        }
    };

    Module.prototype.click_prev = function (event) {
        var base = this;
        var element = base.nav_prev;
        event.preventDefault();

        if (!$(element).hasClass('disabled') && !base.lock_action) {
            base.data.current_page = base.data.current_page - 1;
            base.request_ajax('prev');
        }
    };

    Module.prototype.load_more = function (event) {
        var base = this;
        var element = base.nav_next;
        event.preventDefault();

        if (!$(element).hasClass('disabled') && !base.lock_action) {
            base.data.current_page = base.data.current_page + 1;
            base.request_ajax('more');
        }
    };

    Module.prototype.assign_header = function () {
        var base = this;
        $(base.header).on('click', '.subclass-filter', $.proxy(base.subclass_click, base));
    };

    Module.prototype.subclass_click = function (event) {
        var base = this;
        var target = event.target;
        event.preventDefault();

        if (!base.lock_action) {
            this.header.find('.subclass-filter').removeClass('current');
            $(target).addClass('current');

            base.data.filter = $(target).data('id');
            base.data.filter_type = $(target).data('type');
            base.data.current_page = 1;

            base.request_ajax('subclass');
        }
    };

    Module.prototype.request_ajax = function (type) {
        var base = this;
        base.lock_action = true;

        var action = GVNewsConfig.module_prefix + base.data.attribute.class;
        var parameter = {
            action: action,
            module: true,
            data: base.data,
        };
        var result = base.cache_get(parameter);

        if (result) {
            base.before_ajax_request(type, false);
            setTimeout(function () {
                base.load_ajax(type, parameter, result);
                base.element.trigger('gvnews_module_ajax');
            }, 100);
        } else {
            base.before_ajax_request(type, true);
            base.xhr = $.ajax({
                url: GVNewsConfig.ajax_url,
                type: 'post',
                dataType: 'json',
                data: parameter,
                success: function (response) {
                    base.load_ajax(type, parameter, response);
                    base.cache_save(parameter, response);
                    base.element.trigger('gvnews_module_ajax');
                },
            });
        }
    };

    Module.prototype.cache_get = function (parameter) {
        var base = this;
        var jsonparam = JSON.stringify(parameter);

        for (var i = 0; i < base.xhr_cache.length; i++) {
            if (base.xhr_cache[i].param == jsonparam) {
                return base.cache_prepare(base.xhr_cache[i].result);
            }
        }

        return false;
    };

    Module.prototype.cache_prepare = function (response) {
        response.content = '<div>' + response.content + '</div>';

        var content = $(response.content);

        content.find('img').each(function () {
            var src = $(this).data('src');
            $(this).attr('src', src).removeClass('lazyload').addClass('lazyloaded');
        });

        response.content = content.html();

        return response;
    };

    Module.prototype.cache_save = function (parameter, response) {
        var base = this;
        var jsonparam = JSON.stringify(parameter);

        base.xhr_cache.push({
            param: jsonparam,
            result: response,
        });
    };

    Module.prototype.load_ajax = function (type, parameter, response) {
        var base = this;
        base.lock_action = false;

        switch (base.ajax_mode) {
            case 'loadmore':
                base.load_ajax_load_more(response, type);
                break;
            case 'scrollload':
                base.load_scroll_more(response, type);
                break;
            case 'nextprev':
            default:
                base.load_ajax_next_prev(response, type);
                break;
        }

        if (gvnews.share) gvnews.share.init();
    };

    Module.prototype.before_ajax_request = function (type, show_loading) {
        var base = this;

        // remove necessary class
        base.element.removeClass('loaded next prev more scroll subclass').addClass('loading');

        if ((type === 'next' || type === 'prev' || type === 'subclass') && show_loading) {
            base.module_overlay.show();
        }

        if (type === 'more' || type === 'scroll') {
            base.load_more_block.find('a').text(base.load_more_block.find('a').data('loading')).addClass('active');
        }
    };

    Module.prototype.after_ajax_request = function (type) {
        var base = this;

        // loading class
        base.element.removeClass('loading').addClass('loaded').addClass(type);

        if (type === 'next' || type === 'prev' || type === 'subclass') {
            base.module_overlay.hide();
        }

        if (type === 'more' || type === 'scroll') {
            base.load_more_block.find('a').text(base.load_more_block.find('a').data('load')).removeClass('active');
            if (typeof base.load_more_block.find('a').data('icon') !== 'undefined') {
                base.load_more_block.find('a').html(base.load_more_block.find('a').html() + ' <i class="fa ' + base.load_more_block.find('a').data('icon') + '"></i>');
            }
            // base.navigation_overlay.hide();
        }
    };

    Module.prototype.replace_content = function (content) {
        var base = this;

        base.container.children().each(function () {
            if (!$(this).hasClass('module-overlay')) {
                $(this).remove();
            }
        });
        base.container.prepend(content);
    };

    Module.prototype.load_ajax_next_prev = function (response, load_type) {
        var base = this;

        var content = $(response.content);
        if (content.find('.gvnews_ad_module').length && base.ad_code) {
            content.find('.ads-wrapper').html(base.ad_code);
        }
        // change content
        base.replace_content(content);

        // change navigation
        if (base.nav_next !== null) {
            if (response.next) {
                base.nav_next.removeClass('disabled');
            } else {
                base.nav_next.addClass('disabled');
            }
        }

        if (base.nav_prev !== null) {
            if (response.prev) {
                base.nav_prev.removeClass('disabled');
            } else {
                base.nav_prev.addClass('disabled');
            }
        }

        if (!(response.next || response.prev)) {
            if (base.nav_next !== null) {
                base.nav_next.parent().addClass('inactive');
            }
        } else {
            if (base.nav_prev !== null) {
                base.nav_next.parent().removeClass('inactive');
            }
        }

        // we done :)
        base.after_ajax_request(load_type);
        base.masonry_init();
        $(window).trigger('resize');
    };

    Module.prototype.load_ajax_load_more = function (response, load_type) {
        var base = this;
        var content = $(response.content);

        // add ajax flag class for animation
        var count = 0;
        content.each(function () {
            if ($(this).hasClass('gvnews_ad_module') && base.ad_code) {
                $(this).find('.ads-wrapper').html(base.ad_code);
            }

            if ($(this).hasClass('gvnews_post')) {
                $(this).addClass('gvnews_ajax_loaded anim_' + count);
            } else {
                var posts = $(this).find('.gvnews_post');
                posts.each(function () {
                    $(this).addClass('gvnews_ajax_loaded anim_' + count);
                    count++;
                });
            }

            count++;
        });

        base.container.find('.gvnews_post').removeClass('gvnews_ajax_loaded');
        base.container.find('.gvnews_ad_module').removeClass('gvnews_ajax_loaded');

        if (base.data.current_page == 1) {
            base.replace_content(content);
        } else {
            base.element.find('.gvnews_load_more_flag').append(content);
        }

        if (response.next) {
            base.nav_next.removeClass('disabled');
        } else {
            base.nav_next.addClass('disabled');
        }

        base.after_ajax_request(load_type);
        base.masonry_load_more(content);
        $(window).trigger('resize');
    };

    Module.prototype.load_scroll_more = function (response, load_type) {
        var base = this;
        var content = $(response.content);

        var count = 0;
        content.each(function () {
            if ($(this).hasClass('gvnews_ad_module') && base.ad_code) {
                $(this).find('.ads-wrapper').html(base.ad_code);
            }

            if ($(this).hasClass('gvnews_post')) {
                $(this).addClass('gvnews_ajax_loaded anim_' + count);
            } else {
                var posts = $(this).find('.gvnews_post');
                posts.each(function () {
                    $(this).addClass('gvnews_ajax_loaded anim_' + count);
                    count++;
                });
            }

            count++;
        });

        base.container.find('.gvnews_post').removeClass('gvnews_ajax_loaded');
        base.container.find('.gvnews_ad_module').removeClass('gvnews_ajax_loaded');

        if (base.data.current_page == 1) {
            base.container.html('').html(content);
        } else {
            base.element.find('.gvnews_load_more_flag').append(content);
        }

        if (response.next) {
            base.nav_next.removeClass('disabled');
        } else {
            base.nav_next.addClass('disabled');
        }

        base.after_ajax_request(load_type);
        base.masonry_load_more(content);
        $(window).trigger('resize');

        setTimeout(function () {
            base.load_scroll();
        }, 500);
    };

    Module.prototype.masonry_load_more = function (content) {
        var base = this;

        if (base.container.find('.gvnews_posts_masonry').length) {
            setTimeout(function () {
                base.masonry.isotope('appended', content);
            }, 150);
        }
    };

    Module.prototype.masonry_init = function () {
        var base = this;

        if (base.container.find('.gvnews_posts_masonry').length) {
            setTimeout(function () {
                base.masonry = base.container.find('.gvnews_posts_masonry .gvnews_posts').isotope({
                    itemSelector: '.gvnews_post',
                    layoutMode: 'masonry',
                });

                base.masonry.imagesLoaded().progress(function () {
                    base.masonry.isotope('layout');
                });
            }, 150);

            $(window).on('resize', function () {
                setTimeout(function () {
                    base.masonry.isotope('layout');
                }, 1000);
            });
        }
    };

    function Plugin(option) {
        return $(this).each(function () {
            var $this = $(this);
            var options = $.extend({}, Module.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var data = $this.data('jeg.module');

            if (!data) $this.data('jeg.module', (data = new Module(this, options)));
        });
    }

    var old = $.fn.jmodule;

    $.fn.jmodule = Plugin;
    $.fn.jmodule.Constructor = Module;

    $.fn.jmodule.noConflict = function () {
        $.fn.jmodule = old;
        return this;
    };

    $('.gvnews_module_hook').jmodule();
})(jQuery);
