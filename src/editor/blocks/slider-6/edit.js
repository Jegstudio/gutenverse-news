import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { SliderCaption } from '../../part/slider';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getSliderStyle from '../../control-panel/panel-styles/slider-styles';
import { useSelect } from '@wordpress/data';
import { getModuleOptions, getParentColumnWidth } from '../../utils/helper';
import PanelDeprecated from '../../panels/panel-deprecated';
import DeprecatedOverlay from '../../part/deprecated-overlay';

const moduleOption = getModuleOptions();
const postCount = moduleOption ? moduleOption.option.post_count.publish : 0;

const Slider6Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        isSelected,
        clientId,
        setBlockRef
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
        autoplayDelay,
        overlayOption,
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getSliderStyle, elementRef);

    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
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
        if (columnWidth == 'auto') {
            if (deviceType === 'Desktop') {
                getWidth(getParentColumnWidth(getBlockRootClientId(props.clientId), getBlock));
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
            'gvnews-slider-6',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
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
            <div className="gvnews_slide_item" style={{ backgroundImage: 'url(' + props.post.thumbnail.url + ')' }}>
                {props.index == 0 && <img className="thumbnail-prioritize" src={props.post.thumbnail.url} style={{ display: 'none' }} />}
                <SliderCaption {...props} excerpt />
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
            <div className="gvnews_slider_type_6 gvnews_slider" data-autoplay={autoplay ? true : ''} data-delay={autoplayDelay} data-nav-prev={'PREV'} data-nav-next={'NEXT'}>
                {content}
            </div>
        );
    }

    const [block, setBlock] = useState(false);
    function resetblock() {
        setBlock(
            <div className={`gvnews_slider_wrapper gvnews_slider_type_6_wrapper ${overlayOption == 'no' ? 'no-overlay' : ''}`}>
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
        overlayOption,
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
        <PanelDeprecated title="Slider 6" />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor gvnews-deprecated-block">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block ? block : 'loading'}
                <DeprecatedOverlay />
            </div>
        </div>
    </>;
});

export default Slider6Block;