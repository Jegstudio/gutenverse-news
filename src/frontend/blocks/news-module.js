import { u } from 'gutenverse-core-frontend';
import OkayNav from '../okaynav/okaynav';

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

        if (this.ajax_mode === 'nextprev') {
            this.nav_next = this.nav_block.find('.next');
            this.nav_prev = this.nav_block.find('.prev');

            // assign click
            this.nav_next.on('click', this.click_next.bind(this));
            this.nav_prev.on('click', this.click_prev.bind(this));
        }

        if (this.ajax_mode === 'loadmore' || this.ajax_mode === 'scrollload') {
            this.nav_next = this.load_more_block.find('a');
            this.nav_next.on('click', this.load_more.bind(this));
        }

        if (this.ajax_mode === 'scrollload') {
            this.load_limit = this.data.attribute.pagination_scroll_limit;
            this.load_scroll();
        }

        this.masonry_init();
        this.init();

        this.element.trigger('gvnews_module_init', [this]);
    }

    load_more() {

    }

    click_next() {

    }

    click_prev() {

    }

    init() {
        // call subcat
        this.subcat = this.header.find('.gvnews_subcat');

        // heading subset.
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

    assign_header() {
        this.header.on('click', '.subclass-filter', this.subclass_click.bind(this));
    }

    subclass_click(event) {
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

    toFormParams(obj, prefix = '') {
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

    request_ajax(type) {
        this.lock_action = true;

        var action = window.GVNewsConfig.module_prefix + this.data.attribute.class;
        var parameter = {
            action: action,
            module: true,
            data: this.data,
        };
        var result = this.cache_get(parameter);

        if (result) {
            this.before_ajax_request(type, false);
            // setTimeout(function () {
            //     this.load_ajax(type, parameter, result);
            //     this.element.trigger('gvnews_module_ajax');
            // }, 100);
        } else {
            this.before_ajax_request(type, true);
            const params = new URLSearchParams(this.toFormParams(parameter));

            fetch(window.GVNewsConfig.ajax_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params,
            }).then(res => res.json()).then(response => {
                this.load_ajax(type, parameter, response);
                // this.cache_save(parameter, response);
                // this.element.trigger('gvnews_module_ajax', response);
            }).catch(err => console.error('AJAX error:', err));
        }
    }

    before_ajax_request(type, show_loading) {
        this.element.removeClass('loaded next prev more scroll subclass').addClass('loading');

        if ((type === 'next' || type === 'prev' || type === 'subclass') && show_loading) {
            // this.module_overlay.css('display', 'block');
        }

        if (type === 'more' || type === 'scroll') {
            // this.load_more_block.find('a').text(this.load_more_block.find('a').data('loading')).addClass('active');
        }
    }

    load_ajax(type, parameter, response) {
        this.lock_action = false;

        switch (this.ajax_mode) {
            case 'loadmore':
                // this.load_ajax_load_more(response, type);
                break;
            case 'scrollload':
                // this.load_scroll_more(response, type);
                break;
            case 'nextprev':
            default:
                this.load_ajax_next_prev(response, type);
                break;
        }

        // if (gvnews.share) gvnews.share.init();
    }

    load_ajax_next_prev(response, load_type) {
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

        // we done :)
        this.after_ajax_request(load_type);
        // this.masonry_init();
        u(window).trigger('resize');
    }

    after_ajax_request(type) {
        this.element.removeClass('loading').addClass('loaded').addClass(type);

        if (type === 'next' || type === 'prev' || type === 'subclass') {
            this.module_overlay.hide();
        }

        if (type === 'more' || type === 'scroll') {
            this.load_more_block.find('a').text(this.load_more_block.find('a').data('load')).removeClass('active');
            if (typeof this.load_more_block.find('a').data('icon') !== 'undefined') {
                this.load_more_block.find('a').html(this.load_more_block.find('a').html() + ' <i class="fa ' + this.load_more_block.find('a').data('icon') + '"></i>');
            }
        }
    }


    replace_content(content) {
        this.container.children().each(function () {
            if (!u(this).hasClass('module-overlay')) {
                u(this).remove();
            }
        });
        this.container.prepend(content);
    }

    cache_get(parameter) {
        var jsonparam = JSON.stringify(parameter);

        for (var i = 0; i < this.xhr_cache.length; i++) {
            if (this.xhr_cache[i].param == jsonparam) {
                return this.cache_prepare(this.xhr_cache[i].result);
            }
        }

        return false;
    }

    masonry_init() {

    }

    load_scroll() {

    }

}

const selected = u('.gvnews_module_hook');

if (selected) {
    selected.map(element => {
        new GutenverseNewsModule(element);
    });
}