import { u } from 'gutenverse-core-frontend';

class GutenverseNewstickerModule {
    constructor(newsTicker, options = {}) {
        this.options = {
            ...{
                container: '.gvnews_news_ticker',
                autoplay: true,
                delay: 3000,
                animation: 'vertical',
                item: '.gvnews_news_ticker_item',
                classes: {
                    active_class: 'gvnews_news_ticker_active',
                },
            },
            ...options,
        };

        ['container', 'item'].forEach((item) => {
            if (typeof this.options[item] === 'string') {
                let str = this.options[item];
                let el = 'item' === item && this.options.container && this.options.container.nodeName ? this.options.container.querySelectorAll(str) : newsTicker.querySelector(str);

                if (el && (el.nodeName || ('object' === typeof el && el.length))) {
                    this.options[item] = el;
                } else {
                    return;
                }
            }
        });

        if (!this.options.container.children || this.options.container.children.length < 1) {
            return;
        }

        this.container = this.options.container;
        this.item = this.options.item;
        this.current_slider = 0;
        this.trailing_slider = null;
        this.previous_slider = null;
        this.number_slider = 0;
        this.advance_timeout = null;
        this.active_class = 'gvnews_news_ticker_active';
        this.horizontal_effect = ['fadeInLeft', 'fadeInRight', 'fadeOutLeft', 'fadeOutRight'];
        this.vertical_effect = ['fadeInUp', 'fadeInDown', 'fadeOutDown', 'fadeOutUp'];
        this.slide_effect = null;

        this.init();
    }

    init = () => {
        this.options.animation = this.container.dataset.animation;
        this.options.autoplay = this.container.dataset.autoplay;
        this.options.delay = this.container.dataset.delay;
        this.number_slider = this.item.length;

        if (this.number_slider > 1) {
            if ('horizontal' === this.options.animation) {
                this.slide_effect = this.horizontal_effect;
            } else if ('vertical' === this.options.animation) {
                this.slide_effect = this.vertical_effect;
            }
            this.bind_direction();
            this.do_autoplay();
            this.do_slide('next');
        } else {
            this.item[0].classList.add(this.active_class);
        }
    }

    bind_direction = () => {
        this.container.querySelector('.gvnews_news_ticker_control .gvnews_news_ticker_next').addEventListener('click', (e) => {
            this.do_slide('next');
        });
        this.container.querySelector('.gvnews_news_ticker_control .gvnews_news_ticker_prev').addEventListener('click', (e) => {
            this.do_slide('prev');
        });

        this.item.forEach((element, index) => {
            element.addEventListener('mouseover', () => {
                clearTimeout(this.advance_timeout);
            });
            element.addEventListener('mouseout', () => {
                this.do_autoplay();
            });
        });
    }

    do_autoplay = () => {
        if (this.options.autoplay) {
            this.autoplay();
        }
    }

    autoplay = () => {
        window.clearTimeout(this.advance_timeout);
        this.advance_timeout = window.setTimeout(() => {
            this.do_slide('next');
        }, this.options.delay);
    }

    do_slide = (goto) => {
        this.remove_class_trailing_slider();
        this.add_active_class(goto);
        this.advance_slider(goto);
        this.do_autoplay();
    }

    remove_class_trailing_slider = () => {
        if (null !== this.trailing_slider) {
            let trailing_item = this.item[this.trailing_slider];
            this.slide_effect.forEach(function (element, index) {
                trailing_item.classList.remove(element);
            });
        }
    }

    add_active_class = (goto) => {
        let current = this.item[this.current_slider];
        let previous = this.item[this.previous_slider];
        this.trailing_slider = this.previous_slider;

        if ('next' === goto) {
            if (null !== this.previous_slider) {
                previous.classList.remove(this.active_class, this.slide_effect[0], this.slide_effect[1]);
                previous.classList.add(this.slide_effect[3]);
            }
            current.classList.add(this.active_class, this.slide_effect[0]);
        } else {
            if (null !== this.previous_slider) {
                previous.classList.remove(this.active_class, this.slide_effect[0], this.slide_effect[1]);
                previous.classList.add(this.slide_effect[2]);
            }
            current.classList.add(this.active_class, this.slide_effect[1]);
        }
    }

    advance_slider = (goto) => {
        this.previous_slider = this.current_slider;

        if ('next' === goto) {
            this.current_slider++;
        } else {
            this.current_slider--;
        }

        if (this.current_slider >= this.number_slider) {
            this.current_slider = 0;
        }

        if (this.current_slider < 0) {
            this.current_slider = this.number_slider - 1;
        }
    }
}


(() => {

    const selected = u('.gvnews_breakingnews');

    if (selected) {
        selected.map(element => {
            new GutenverseNewstickerModule(element);
        });
    }

    window.gvnewsNewsticker = (element) => {
        new GutenverseNewstickerModule(element);
    };
})();

export default GutenverseNewstickerModule;