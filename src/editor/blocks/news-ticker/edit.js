import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { formatDateString } from '../../utils/date-util';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { ModuleSkeleton } from '../../part/placeholder';

const NewsTickerBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        title,
        icon,
        elementId,
        contentType,
        uniqueContent,
        includeOnly,
        postType,
        postOffset,
        numberPost,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        autoplayDelay,
        animationDirection,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [postCount, setPostCount] = useState(0);
    const [ticker, initTicker] = useState(false);
    const newsTickerRef = useRef();

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(numberPost);
        let count = parseInt(postCount);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost + 15);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                count > off ? loadMore(loadPost + 15) : count != postCount ? loadMore(count) : null;
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [
        numberPost,
        postBulk,
        postOffset
    ]);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
            if (parsedData.option.post_count) {
                setPostCount(parsedData.option.post_count.publish);
            }
        });
    }, []);

    useEffect(() => {
        let attr = {
            contentType,
            uniqueContent,
            includeOnly,
            postType,
            numberPost: loadPost,
            includePost,
            excludePost,
            includeCategory,
            excludeCategory,
            includeAuthor,
            includeTag,
            excludeTag,
            sortBy,
        };
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            getPost(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, [
        contentType,
        includeOnly,
        postType,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        loadPost
    ]);

    useEffect(() => {
        if (newsTickerRef.current) {
            setElementRef(newsTickerRef.current);
        }
    }, [newsTickerRef.current]);

    function newsTickerInit() {
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
                    el = 'item' === item && options['container'] && options['container'].nodeName ? options['container'].querySelectorAll(str) : newsTickerRef.current.querySelector(str);
                optionsElements[item] = str;
                if (el && (el.nodeName || ('object' === typeof el && el.length))) {
                    options[item] = el;
                } else {
                    console.warn('Can\'t find', options[item]);
                    return;
                }
            }
        });

        if (options.container.children.length < 1) {
            console.warn('No item found in', options.container);
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

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-news-ticker',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: newsTickerRef
    });

    const moduleData = {
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    };

    function RenderBlock(props) {
        let date = new Date(props.post.date.modified * 1000).toISOString();
        let timestamp = props.post.date.modified * 1000;
        return (
            <div className={`gvnews_news_ticker_item gvnews_news_ticker_animated ${props.index == 0 && 'gvnews_news_ticker_active'}`}>
                <span>
                    <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                </span>
                <span className="post-date">
                    {'custom' == props.attr.date.format ? formatDateString(date, props.attr.date.custom) : 'ago' == props.attr.date.format ? timeDifference(timestamp) : formatDateString(date, props.attr.option.option.date_format)}
                </span>
            </div>
        );
    }

    function RenderColumn(props) {
        const attr = {
            option: props.moduleOption,
            date: {
                type: props.metaDateType,
                format: props.metaDateFormat,
                custom: props.metaDateFormatCustom,
            }
        };
        const rows = [];
        if (props.postData && attr.option.option) {
            for (let i = 0; i < props.postData.length; i++) {
                rows.push(<RenderBlock attr={attr} index={i} post={props.postData[i]} />);
            }
        }
        rows.length && initTicker(true);
        return rows;
    }

    const [block, setBlock] = useState(false);
    useEffect(() => {
        setBlock(
            <div className="gvnews_item_container">
                {postData ? <RenderColumn {...moduleData} /> : postBulk ? <div className="gvnews_news_ticker_item gvnews_news_ticker_active"><span>{moduleOption.string.no_content}</span></div> : <ModuleSkeleton />}
            </div>
        );
    }, [
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        autoplayDelay,
        animationDirection,
    ]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews_breakingnews clearfix">
                    <div className="gvnews_breakingnews_title">
                        <i className={icon}>&nbsp;</i>
                        <span>{title}</span>
                    </div>
                    <div className="gvnews_news_ticker" data-autoplay={autoplay ? 1 : ''} data-delay={autoplayDelay} data-animation={animationDirection}>
                        <div className="gvnews_news_ticker_items">
                            {block ? block : 'loading'}
                            {ticker && newsTickerInit()}
                            {ticker && initTicker(false)}
                        </div>
                        <div className="gvnews_news_ticker_control">
                            <div className="gvnews_news_ticker_next gvnews_news_ticker_arrow"><span><i class="fas fa-angle-right"></i></span></div>
                            <div className="gvnews_news_ticker_prev gvnews_news_ticker_arrow"><span><i class="fas fa-angle-left"></i></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
});

export default NewsTickerBlock;