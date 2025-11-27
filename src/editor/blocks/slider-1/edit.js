import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { SliderCaption } from '../../part/slider';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar, u } from 'gutenverse-core/components';
import { addIconOnSlidernavigation, getModuleOptions } from '../../utils/helper';
import { getBolockStyle } from './style/block-style';

const defaultOptions = getModuleOptions();

const Slider1Block = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        setAttributes,
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
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        hoverEffect,
        autoplayDelay,
        nextButtonIcon,
        prevButtonIcon,
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
    } = attributes;

    const metaSettings = {
        meta_show: showMeta,
        meta_date: showMetaDate,
        meta_author: showMetaAuthor
    };

    const moduleOption = {
        ...defaultOptions,
        option: {
            ...defaultOptions.option,
            ...metaSettings
        }
    };

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBolockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element-full',
            'gvnews-slider-1',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [postData, getTrim] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postLoaded, setPostLoaded] = useState(5);
    const [postStart, setPostStart] = useState(0);
    const [sliderDelay, setSliderDelay] = useState(0);

    const firstRender = useRef(true);
    const blockRef = useRef(null);

    function RenderContent(props) {
        return (
            <div className="gvnews_slide_item">
                <a className="gvnews_slide_img">
                    <div className="thumbnail-container size-500">
                        <img src={props.post.thumbnail.url} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" />
                    </div>
                </a>
                <SliderCaption {...props} />
            </div>
        );
    }

    function RenderSlider(props) {
        return (
            <div className="gvnews_slide_thumbnail_item_wrapper">
                <div className="gvnews_slide_thumbnail_item">
                    <a>
                        <div className="thumbnail-container size-715">
                            <img src={props.post.thumbnail.url} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" />
                        </div>
                    </a>
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
        const slider = [];
        if (props.postData && props.moduleOption) {
            for (let i = 0; i < props.postData.length; i++) {
                content.push(<RenderContent attr={attr} index={i} post={props.postData[i]} />);
                slider.push(<RenderSlider attr={attr} index={i} post={props.postData[i]} />);
            }
        }
        return (
            <>
                <div ref={blockRef} className="gvnews_slider_type_1 gvnews_slider" data-autoplay={autoplay ? true : ''} data-delay={sliderDelay} data-hover-action={hoverEffect ? true : ''}>
                    {content}
                </div>
                <div className="gvnews_slider_thumbnail_wrapper">
                    <div className="gvnews_slider_thumbnail">
                        {slider}
                    </div>
                </div>
            </>
        );
    }

    function resetblock() {
        if (postData.length > 0) {
            const moduleData = {
                excerptLength,
                excerptEllipsis,
                moduleOption,
                postData,
                metaDateType,
                metaDateFormat,
                metaDateFormatCustom,
            };
            setBlock(
                <div key={Math.random().toString(36).substring(2)} className={'gvnews_slider_wrapper gvnews_slider_type_1_wrapper'}>
                    <RenderColumn {...moduleData} />
                </div>
            );
        } else {
            setBlock(
                <div className="gvnews_empty_module">{moduleOption.string.no_content}</div>
            );
        }
    }

    useEffect(() => {
        if (numberPost > 0) {
            setPostLoaded(parseInt(numberPost));
        } else {
            setAttributes({
                ...attributes,
                numberPost: 5
            });
        }
    }, [numberPost]);

    useEffect(() => {
        if (postOffset >= 0) {
            setPostStart(parseInt(postOffset));
        } else {
            setAttributes({
                ...attributes,
                postOffset: 0
            });
        }
    }, [postOffset]);

    useEffect(() => {
        if (autoplayDelay >= 1000) {
            setSliderDelay(parseInt(autoplayDelay));
        } else {
            setAttributes({
                ...attributes,
                autoplayDelay: 2000
            });
        }
    }, [autoplayDelay]);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setOverlay(true);

            let attr = {
                contentType,
                uniqueContent,
                includeOnly,
                postType,
                numberPost: postLoaded,
                includePost,
                excludePost,
                includeCategory,
                excludeCategory,
                includeAuthor,
                includeTag,
                excludeTag,
                sortBy,
                postOffset: postStart,
            };
            apiFetch({
                path: addQueryArgs('/gvnews-client/v1/get-post'),
                method: 'POST',
                data: {
                    attr: attr
                }
            }).then((data) => {
                const parsed = JSON.parse(data);
                getTrim(parsed);
            }).finally(() => {
                setOverlay(false);
                if (firstRender.current) {
                    firstRender.current = false;
                }
            });
        }, 300);
        return () => clearTimeout(timeoutID);
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
        postStart,
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        resetblock();
    }, [
        excerptLength,
        excerptEllipsis,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        sliderDelay,
        hoverEffect,
        showMeta,
        showMetaDate,
        showMetaAuthor,
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        if ('function' === typeof window.gvnewsSliderModule && postData.length > 0 && block) {
            let target = document;
            const iframe = document.querySelector('iframe[name="editor-canvas"]');
            if (iframe) {
                target = iframe.contentDocument;
            }
            let slider = target.querySelectorAll(`.${elementId} .gvnews_slider_wrapper .gvnews_slider`);
            if (slider.length) {
                u(slider).each(function (ele) {
                    window.gvnewsSliderModule(ele, {
                        container: ele,
                        onInit: function (info) {
                            if ('undefined' !== typeof info.nextButton) {
                                u(info.nextButton).addClass('tns-next');
                            }
                            if ('undefined' !== typeof info.prevButton) {
                                u(info.prevButton).addClass('tns-prev');
                            }
                        },
                    });
                });
            }
        }
    }, [block]);

    useEffect(() => {
        addIconOnSlidernavigation(elementRef, nextButtonIcon, prevButtonIcon);
    }, [nextButtonIcon, prevButtonIcon, block]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block}
                {(overlay && !firstRender.current) && <ModuleOverlay />}
            </div>
        </div>
    </>;
});

export default Slider1Block;