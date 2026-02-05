import { u } from 'gutenverse-core-frontend';
import OkayNav from '../okaynav/okaynav';
import Shuffle from 'shufflejs';

class GutenverseNewsModule {
    constructor(element) {
        this.element = u(element);
        this.xhr = null;
        this.xhr_cache = [];
        this.lock_action = false;
        this.unique = this.element.data('unique');

        let attr = window[this.unique] || {};
        if (!attr.included_only) {
            attr.included_only = '';
        }

        this.data = {
            filter: 0,
            filter_type: 'all',
            current_page: 1,
            attribute: attr,
        };
        this.ajax_mode = this.data.attribute.pagination_mode;

        // Populate Element
        this.header = this.element.find('.gvnews_block_heading');
        this.container = this.element.find('.gvnews_block_container');
        this.nav_block = this.element.find('.gvnews_block_navigation');
        this.ad_code = this.element.find('.gvnews_ad_code').first().value;
        this.module_overlay = this.container.find('.module-overlay');
        this.load_more_block = this.nav_block.find('.gvnews_block_loadmore');
        this.nav_next = null;
        this.nav_prev = null;
        this.isMasonry = this.container.find('.gvnews_posts_masonry').length > 0;
        this.shuffleInstance = null;

        if (this.ajax_mode === 'nextprev') {
            this.nav_next = this.nav_block.find('.next');
            this.nav_prev = this.nav_block.find('.prev');

            // assign click
            this.nav_next.on('click', this.click_next);
            this.nav_prev.on('click', this.click_prev);
        }

        if (this.ajax_mode === 'loadmore' || this.ajax_mode === 'scrollload') {
            this.nav_next = this.load_more_block.find('a');
            this.nav_next.on('click', this.load_more);
        }

        if (this.ajax_mode === 'scrollload') {
            this.load_limit = this.data.attribute.pagination_scroll_limit;
            this.load_scroll();
        }

        this.masonry_init();
        this.init();

        this.element.trigger('gvnews_module_init', [this]);
    }

    load_scroll = () => {
        if (!this.nav_next.hasClass('disabled')) {
            if (this.load_limit > this.data.current_page || this.load_limit == 0) {
                window.addEventListener('scroll', this.listen_scroll);
            }
        }
    };

    listen_scroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const elementOffset = this.nav_next.size().top;
        const offset = 0; // Adjust this value if needed

        if (elementOffset - scrollTop <= windowHeight + offset) {
            this.data.current_page = this.data.current_page + 1;
            this.request_ajax('scroll');
            window.removeEventListener('scroll', this.listen_scroll);
        }
    };

    load_more = (event) => {
        let element = this.nav_next;
        event.preventDefault();

        if (!u(element).hasClass('disabled') && !this.lock_action) {
            this.data.current_page = this.data.current_page + 1;
            this.request_ajax('more');
        }
    }


    click_next = (event) => {
        let element = this.nav_next;
        event.preventDefault();
        if (!u(element).hasClass('disabled') && !this.lock_action) {
            this.data.current_page = this.data.current_page + 1;
            this.request_ajax('next');
        }
    }


    click_prev = (event) => {
        let element = this.nav_prev;
        event.preventDefault();

        if (!u(element).hasClass('disabled') && !this.lock_action) {
            this.data.current_page = this.data.current_page - 1;
            this.request_ajax('prev');
        }
    }

    init = () => {
        this.subcat = this.header.find('.gvnews_subcat');
        if (this.subcat.length) {
            new OkayNav(this.subcat.nodes[0], {
                swipe_enabled: false,
                threshold: 50,
                toggle_icon_content: '<span></span><span></span><span></span>'
            });
        }

        /** Block Heading */
        this.assign_header();
    }

    assign_header = () => {
        this.header.on('click', '.subclass-filter', this.subclass_click);
    }

    subclass_click = (event) => {
        let target = event.target;
        event.preventDefault();

        if (!this.lock_action) {
            const filterID = u(target).data('id');
            const filterType = u(target).data('type');

            if (this.data.filter === filterID && this.data.filter_type === filterType) {
                return;
            }

            this.header.find('.subclass-filter').removeClass('current');
            u(target).addClass('current');

            this.data.filter = filterID;
            this.data.filter_type = filterType;
            this.data.current_page = 1;

            this.request_ajax('subclass');
        }
    }

    toFormParams = (obj, prefix = '') => {
        const params = [];
        for (let key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
            const value = obj[key];
            const paramKey = prefix ? `${prefix}[${key}]` : key;

            if (typeof value === 'object' && value !== null) {
                params.push(...this.toFormParams(value, paramKey));
            } else {
                params.push([paramKey, value]);
            }
        }
        return params;
    }

    request_ajax = (type) => {
        this.lock_action = true;

        let action = window.GVNewsConfig.module_prefix + this.data.attribute.class;
        let parameter = {
            action: action,
            module: true,
            data: this.data,
        };
        let result = this.cache_get(parameter);

        if (result) {
            this.before_ajax_request(type, false);
            setTimeout(() => {
                this.load_ajax(type, parameter, result);
                this.element.trigger('gvnews_module_ajax');
            }, 100);
        } else {
            this.before_ajax_request(type, true);
            const params = new URLSearchParams(this.toFormParams(parameter));

            fetch(window.GVNewsConfig.ajax_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params,
            }).then(res => res.json()).then(response => {
                this.load_ajax(type, parameter, response);
                this.cache_save(parameter, response);
                this.element.trigger('gvnews_module_ajax', response);
            });
        }
    }

    cache_save = (parameter, response) => {
        let jsonparam = JSON.stringify(parameter);
        let theResponse = structuredClone(response);

        this.xhr_cache.push({
            param: jsonparam,
            result: theResponse,
        });
    }

    before_ajax_request = (type, show_loading) => {
        this.element.removeClass('loaded next prev more scroll subclass').addClass('loading');

        if ((type === 'next' || type === 'prev' || type === 'subclass') && show_loading) {
            this.module_overlay.attr('style', 'display: block');
        }

        if (type === 'more' || type === 'scroll') {
            this.load_more_block.find('a').text(this.load_more_block.find('a').data('loading')).addClass('active');
        }
    }

    load_ajax = (type, parameter, response) => {
        this.lock_action = false;

        if (type === 'subclass') {
            this.load_ajax_next_prev(response, type);
        } else {
            switch (this.ajax_mode) {
                case 'loadmore':
                    this.load_ajax_load_more(response, type);
                    break;
                case 'scrollload':
                    this.load_scroll_more(response, type);
                    break;
                case 'nextprev':
                default:
                    this.load_ajax_next_prev(response, type);
                    break;
            }
        }

        // if (gvnews.share) gvnews.share.init();
    }

    load_scroll_more = (response, load_type) => {
        const content = u(response.content);

        let count = 0;
        content.each(function () {
            if (u(this).hasClass('gvnews_ad_module') && this.ad_code) {
                u(this).find('.ads-wrapper').html(this.ad_code);
            }

            if (u(this).hasClass('gvnews_post')) {
                u(this).addClass('gvnews_ajax_loaded anim_' + count);
            } else {
                const posts = u(this).find('.gvnews_post');
                posts.each(function () {
                    u(this).addClass('gvnews_ajax_loaded anim_' + count);
                    count++;
                });
            }

            count++;
        });

        this.container.find('.gvnews_post').removeClass('gvnews_ajax_loaded');
        this.container.find('.gvnews_ad_module').removeClass('gvnews_ajax_loaded');

        if (this.data.current_page == 1) {
            this.container.html('').html(content);
        } else {
            this.element.find('.gvnews_load_more_flag').append(content);
        }

        if (response.next) {
            this.nav_next.removeClass('disabled');
        } else {
            this.nav_next.addClass('disabled');
        }

        this.after_ajax_request(load_type);
        this.masonry_load_more(content);
        u(window).trigger('resize');

        setTimeout(() => {
            this.load_scroll();
        }, 500);
    };

    load_ajax_load_more = (response, load_type) => {
        let content = u(response.content);
        let isMasonry = this.isMasonry;

        // add ajax flag class for animation
        let count = 0;
        content.each(function (element) {
            if (u(element).hasClass('gvnews_ad_module') && element.ad_code) {
                u(element).find('.ads-wrapper').html(element.ad_code);
            }

            if (load_type !== 'more' && isMasonry) {
                // TODO : Create animation for masonry and load more.
            }

            if (u(element).hasClass('gvnews_post')) {
                u(element).addClass('gvnews_ajax_loaded anim_' + count);
            } else {
                let posts = u(element).find('.gvnews_post');
                let post_count = 0;
                posts.each(function (element) {
                    u(element).addClass('gvnews_ajax_loaded anim_' + post_count);
                    post_count++;
                });
            }

            count++;
        });

        this.container.find('.gvnews_post').removeClass('gvnews_ajax_loaded');
        this.container.find('.gvnews_ad_module').removeClass('gvnews_ajax_loaded');

        if (this.data.current_page == 1) {
            this.replace_content(content);
        } else {
            this.element.find('.gvnews_load_more_flag').append(content);
        }

        if (response.next) {
            this.nav_next.removeClass('disabled');
        } else {
            this.nav_next.addClass('disabled');
        }

        this.after_ajax_request(load_type);
        this.masonry_load_more(content);
        u(window).trigger('resize');
    };

    load_ajax_next_prev = (response, load_type) => {
        let content = u(response.content);
        if (content.find('.gvnews_ad_module').length && this.ad_code) {
            content.find('.ads-wrapper').html(this.ad_code);
        }
        // change content
        this.replace_content(content);

        // change navigation
        if (this.nav_next !== null) {
            if (response.next) {
                this.nav_next.removeClass('disabled');
            } else {
                this.nav_next.addClass('disabled');
            }
        }

        if (this.nav_prev !== null) {
            if (response.prev) {
                this.nav_prev.removeClass('disabled');
            } else {
                this.nav_prev.addClass('disabled');
            }
        }

        if (!(response.next || response.prev)) {
            if (this.nav_next !== null) {
                this.nav_next.parent().addClass('inactive');
            }
        } else {
            if (this.nav_prev !== null) {
                this.nav_next.parent().removeClass('inactive');
            }
        }

        this.after_ajax_request(load_type);
        this.masonry_init();
        u(window).trigger('resize');
    }

    after_ajax_request = (type) => {
        this.element.removeClass('loading').addClass('loaded').addClass(type);

        if (type === 'next' || type === 'prev' || type === 'subclass') {
            this.module_overlay.attr('style', 'display: none');
        }

        if (type === 'more' || type === 'scroll') {
            const loadMoreLink = this.load_more_block.find('a');
            const loadText = loadMoreLink.data('load');
            const iconHtml = loadMoreLink.data('icon-html');
            const iconPosition = loadMoreLink.data('icon-position');

            // Restore text
            loadMoreLink.text(loadText).removeClass('active');

            // Restore icon if exists
            if (typeof iconHtml !== 'undefined' && iconHtml) {
                if (iconPosition === 'before') {
                    loadMoreLink.html(iconHtml + ' ' + loadText);
                } else {
                    loadMoreLink.html(loadText + ' ' + iconHtml);
                }
            }
        }
    }

    replace_content = (content) => {
        this.container.children().each(function () {
            u(this).remove();
        });
        this.container.prepend(content);
    }

    cache_get = (parameter) => {
        let jsonparam = JSON.stringify(parameter);

        for (let i = 0; i < this.xhr_cache.length; i++) {
            if (this.xhr_cache[i].param == jsonparam) {
                return this.cache_prepare(this.xhr_cache[i].result);
            }
        }

        return false;
    }

    cache_prepare = (response) => {
        response.content = '<div>' + response.content + '</div>';
        let content = u(response.content);

        content.find('img').each(function () {
            let src = u(this).data('src');
            if (src) {
                u(this).attr('src', src);
            }
            u(this).removeClass('lazyload').addClass('lazyloaded');
        });

        response.content = content.html();

        return response;
    }

    masonry_init = () => {
        if (this.isMasonry) {
            this.create_masonry();
        }
    }

    masonry_load_more = (content) => {
        if (this.isMasonry) {
            this.shuffleInstance.add(content.nodes);
        }
    }

    create_masonry = () => {
        let posts = this.container.find('.gvnews_posts_masonry .gvnews_posts').nodes[0];
        let gutter = parseInt(this.data.attribute.gutter_width);
        this.shuffleInstance = new Shuffle(posts, {
            itemSelector: '.gvnews_post',
            gutterWidth: gutter,
            speed: 0
        });
        return this.shuffleInstance;
    };
}

(() => {
    const selected = u('.gvnews_module_hook');

    if (selected) {
        selected.map(element => {
            new GutenverseNewsModule(element);
        });
    }

    window.gvnewsNewsModule = (element) => {
        new GutenverseNewsModule(element);
    };
})();

export default GutenverseNewsModule;
