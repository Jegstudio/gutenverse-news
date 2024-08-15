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
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { MetaCategory, MetaModule1 } from '../../part/meta';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import ThumbModule from '../../part/thumbnail';
import { SliderMeta } from '../../part/slider';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const Slider8Block = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        isSelected,
        setElementRef
    } = props;

    const {
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
        columnWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        showNav,
        autoplay,
        ncolumn,
        autoplayDelay,
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);

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
        if (columnWidth == 'auto') {
            if (deviceType === 'Desktop') {
                getWidth(12);
            } else if (deviceType === 'Tablet') {
                getWidth(8);
            } else {
                getWidth(4);
            }
        } else {
            getWidth(columnWidth);
        }
    }, [
        columnWidth,
        deviceType
    ]);

    useEffect(() => {
        postBulk ? setOverlay(true) : null;
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
            setOverlay(false);
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

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element-full',
            'gvnews-slider-8',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
    });

    const moduleData = {
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    };

    function RenderContent(props) {
        return (
            <div className="gvnews_slide_item_wrapper">
                <div className="gvnews_slide_item">
                    <a>
                        <ThumbModule size={715} cat={false} post={props.post} />
                    </a>
                    <div className="gvnews_item_caption">
                        <div className="gvnews_caption_container">
                            <MetaCategory post={props.post} />
                            <h2 className="gvnews_post_title">
                                <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                            </h2>
                            <SliderMeta {...props} date />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function RenderColumn(props) {
        const attr = {
            option: props.moduleOption,
            length: props.excerptLength,
            elipsis: props.excerptEllipsis,
            date: {
                type: props.metaDateType,
                format: props.metaDateFormat,
                custom: props.metaDateFormatCustom,
            }
        };
        const content = [];
        if (props.postData && props.moduleOption) {
            for (let i = 0; i < props.postData.length; i++) {
                content.push(<RenderContent attr={attr} index={i} post={props.postData[i]} />);
            }
        }
        return (
            <div className="gvnews_slider_type_8 gvnews_slider" data-items={ncolumn} data-autoplay={autoplay ? true : ''} data-delay={autoplayDelay}>
                {content}
            </div>
        );
    }

    const [block, setBlock] = useState(false);
    function resetblock() {
        setBlock(
            <div className={'gvnews_slider_wrapper gvnews_slider_type_8_wrapper'}>
                {postData ? <RenderColumn {...moduleData} /> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string.no_content}</div> : <ModuleSkeleton />}
                {overlay && <ModuleOverlay />}
            </div>
        );
    }

    useEffect(() => {
        setBlock(false);
        setTimeout(function () {
            resetblock();
        });
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        overlay,
        showNav,
        autoplay,
        autoplayDelay,
        ncolumn,
    ]);

    if ('function' === typeof gvnews.slider && postData && !overlay) {
        setTimeout(function () {
            let gvnewsLibrary = window.gvnews;
            gvnewsLibrary = gvnews.library;
            var slider = document.querySelectorAll('.gvnews_slider_wrapper .gvnews_slider');
            if (slider.length) {
                gvnewsLibrary.forEach(slider, function (ele, i) {
                    gvnews.slider({
                        container: ele,
                        onInit: function (info) {
                            if ('undefined' !== typeof info.nextButton) {
                                gvnewsLibrary.addClass(info.nextButton, 'tns-next');
                            }
                            if ('undefined' !== typeof info.prevButton) {
                                gvnewsLibrary.addClass(info.prevButton, 'tns-prev');
                            }
                        },
                    });
                });
            }
        }, 1000);
    }

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block ? block : 'loading'}
            </div>
        </div>
    </>;
});

export default Slider8Block;