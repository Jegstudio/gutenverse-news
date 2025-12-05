import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { formatDateString } from '../../utils/date-util';
import { ModuleSkeleton } from '../../part/placeholder';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';
import { getModuleOptions } from '../../utils/helper';
import { isNotEmpty } from 'gutenverse-core/helper';
import { timeDifference } from '../../utils/date-util';

const moduleOption = getModuleOptions();

const NewsTickerBlock = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes
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
        nextIcon,
        prevIcon,
        contentBorder,
        contentBorderResponsive,
        contentHeight,
        contentHeightResponsive,
        showMeta
    } = attributes;

    const elementRef = useRef(null);
    const blockRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [postLoaded, setPostLoaded] = useState(0);
    const [offsetLoaded, setOffsetLoaded] = useState(0);
    const [postData, getTrim] = useState(false);
    const [ticker, initTicker] = useState(false);

    useEffect(() => {
        if (numberPost > 0) {
            setPostLoaded(parseInt(numberPost));
        } else {
            setAttributes({
                ...attributes,
                numberPost: '1'
            });
        }
        if (postOffset > -1) {
            setOffsetLoaded(parseInt(postOffset));
        } else {
            setAttributes({
                ...attributes,
                postOffset: '0'
            });
        }
    }, [numberPost, postOffset]);

    useEffect(() => {
        let attr = {
            contentType,
            uniqueContent,
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
            postOffset: offsetLoaded,
            numberPost: postLoaded,
        };
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            getTrim(JSON.parse(data));
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
        postLoaded,
        offsetLoaded,
    ]);

    useEffect(() => {
        setAttributes({
            ...attributes,
            tickerLineHeight: getLineHeight(attributes)
        });
    }, [contentBorder, contentBorderResponsive, contentHeight, contentHeightResponsive]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-news-ticker',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
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
                {showMeta && <span className="post-date">
                    {'custom' == props.attr.date.format ? formatDateString(date, props.attr.date.custom) : 'ago' == props.attr.date.format ? timeDifference(timestamp) : formatDateString(date, props.attr.option.option.date_format)}
                </span>}
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
                {postData ? <RenderColumn {...moduleData} /> : postData ? <div className="gvnews_news_ticker_item gvnews_news_ticker_active"><span>{moduleOption.string.no_content}</span></div> : <ModuleSkeleton />}
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
        showMeta
    ]);

    useEffect(() => {
        if (blockRef.current && postData.length > 0) {
            setTimeout(() => {
                window.gvnewsNewsticker(blockRef.current);
            }, 100);
        }
    }, [blockRef, postData, animationDirection, showMeta]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div ref={blockRef} className="gvnews_breakingnews clearfix">
                    <div className="gvnews_breakingnews_title">
                        <i className={icon}>&nbsp;</i>
                        <span>{title}</span>
                    </div>
                    <div className="gvnews_news_ticker" data-autoplay={autoplay ? 1 : ''} data-delay={autoplayDelay} data-animation={animationDirection}>
                        <div className="gvnews_news_ticker_items">
                            {block ? block : 'loading'}
                            {ticker && initTicker(false)}
                        </div>
                    </div>
                    <div className="gvnews_news_ticker_control">
                        <div className="gvnews_news_ticker_prev gvnews_news_ticker_arrow"><i className={prevIcon}></i></div>
                        <span className="nav-separator"></span>
                        <div className="gvnews_news_ticker_next gvnews_news_ticker_arrow"><i className={nextIcon}></i></div>
                    </div>
                </div>
            </div>
        </div>
    </>;
});

const getLineHeight = (attributes) => {
    let lineHeight = attributes?.contentHeight?.desktop || '38';
    let topWidth = 1;
    let bottomWidth = 1;
    let value = {};
    ['Desktop', 'Tablet', 'Mobile'].forEach((item) => {
        lineHeight = attributes?.contentHeight?.[item] || lineHeight;

        if (isNotEmpty(attributes['contentBorder'])) {
            topWidth = attributes?.contentBorder?.all?.width || topWidth;
            bottomWidth = attributes?.contentBorder?.all?.width || bottomWidth;
            topWidth = attributes?.contentBorder?.top?.width || topWidth;
            bottomWidth = attributes?.contentBorder?.bottom?.width || bottomWidth;
        }
        if (item !== 'Desktop') {
            if (isNotEmpty(attributes['contentBorderResponsive']) && isNotEmpty(attributes['contentBorderResponsive'][item])) {
                topWidth = attributes?.contentBorderResponsive?.[item]?.all?.width || topWidth;
                bottomWidth = attributes?.contentBorderResponsive?.[item]?.all?.width || bottomWidth;
                topWidth = attributes?.contentBorderResponsive?.[item]?.top?.width || topWidth;
                bottomWidth = attributes?.contentBorderResponsive?.[item]?.bottom?.width || bottomWidth;
                value[item] = parseInt(lineHeight) - topWidth - bottomWidth;
            }

        } else {
            value[item] = parseInt(lineHeight) - topWidth - bottomWidth;
        }
    })

    return value;

}

export default NewsTickerBlock;