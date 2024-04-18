function newsTickerInit(newsTicker) {
    let options = extend(
        {
            container: '.gvnews_news_ticker',
            autoplay: true,
            delay: 3000,
            animation: 'vertical',
            item: '.gvnews_news_ticker_item',
            classes: {
                active_class: 'gvnews_news_ticker_active',
            },
        },
        options || {}
    );
    let gvnewstickerList = ['container', 'item'],
        optionsElements = {};
    gvnewstickerList.forEach(function (item) {
        if (typeof options[item] === 'string') {
            let str = options[item],
                el = 'item' === item && options['container'] && options['container'].nodeName ? options['container'].querySelectorAll(str) : newsTicker.querySelector(str);
            optionsElements[item] = str;
            if (el && (el.nodeName || ('object' === typeof el && el.length))) {
                options[item] = el;
            } else {
                return;
            }
        }
    });

    if (!options.container.children || options.container.children.length < 1) {
        return;
    }

    let container = options.container,
        item = options.item,
        current_slider = 0,
        trailing_slider = null,
        previous_slider = null,
        number_slider = 0,
        advance_timeout = null,
        active_class = 'gvnews_news_ticker_active',
        horizontal_effect = ['fadeInLeft', 'fadeInRight', 'fadeOutLeft', 'fadeOutRight'],
        vertical_effect = ['fadeInUp', 'fadeInDown', 'fadeOutDown', 'fadeOutUp'],
        slide_effect = null;

    function init() {
        options.animation = container.dataset.animation;
        options.autoplay = container.dataset.autoplay;
        options.delay = container.dataset.delay;
        number_slider = item.length;

        if (number_slider > 1) {
            if ('horizontal' === options.animation) {
                slide_effect = horizontal_effect;
            } else if ('vertical' === options.animation) {
                slide_effect = vertical_effect;
            }
            bind_direction();
            do_autoplay();
            do_slide('next');
        } else {
            item[0].classList.add(active_class);
        }
    }
    function bind_direction() {
        container.querySelector('.gvnews_news_ticker_control').addEventListener('click', function (e) {
            let action = '';
            if (e.target.classList.contains('gvnews_news_ticker_next')) {
                action = 'next';
            }
            if (e.target.classList.contains('gvnews_news_ticker_prev')) {
                action = 'prev';
            }
            if ('' !== action) {
                do_slide(action);
            }
        });
        item.forEach(function (element, index) {
            element.addEventListener('mouseover', function () {
                clearTimeout(advance_timeout);
            });
            element.addEventListener('mouseout', function () {
                do_autoplay();
            });
        });
    }
    function do_slide(goto) {
        remove_class_trailing_slider();
        add_active_class(goto);
        advance_slider(goto);
        do_autoplay();
    }
    function do_autoplay() {
        if (options.autoplay) {
            autoplay();
        }
    }
    function autoplay() {
        window.clearTimeout(advance_timeout);
        advance_timeout = window.setTimeout(function () {
            do_slide('next');
        }, options.delay);
    }
    function remove_class_trailing_slider() {
        if (null !== trailing_slider) {
            let trailing_item = item[trailing_slider];
            slide_effect.forEach(function (element, index) {
                trailing_item.classList.remove(element);
            });
        }
    }
    function add_active_class(goto) {
        let current = item[current_slider],
            previous = item[previous_slider];
        trailing_slider = previous_slider;

        if ('next' === goto) {
            if (null !== previous_slider) {
                previous.classList.remove(active_class, slide_effect[0], slide_effect[1]);
                previous.classList.add(slide_effect[3]);
            }
            current.classList.add(active_class, slide_effect[0]);
        } else {
            if (null !== previous_slider) {
                previous.classList.remove(active_class, slide_effect[0], slide_effect[1]);
                previous.classList.add(slide_effect[2]);
            }
            current.classList.add(active_class, slide_effect[1]);
        }
    }
    function advance_slider(goto) {
        previous_slider = current_slider;

        if ('next' === goto) {
            current_slider++;
        } else {
            current_slider--;
        }

        if (current_slider >= number_slider) {
            current_slider = 0;
        }

        if (current_slider < 0) {
            current_slider = number_slider - 1;
        }
    }
    init();
}

function extend() {
    let obj,
        name,
        copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;
    for (; i < length; i++) {
        if ((obj = arguments[i]) !== null) {
            for (name in obj) {
                copy = obj[name];
                if (target === copy) {
                    continue;
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

let ticker = document.querySelectorAll('.gvnews_breakingnews');

ticker.forEach(newsTicker => {
    newsTickerInit(newsTicker);
});
