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
import { CopyElementToolbar } from 'gutenverse-core/components';
import getSliderStyle from '../../control-panel/panel-styles/slider-styles';
import { getModuleOptions } from '../../utils/helper';

const moduleOption = getModuleOptions();

const Slider1Block = compose(
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
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        hoverEffect,
        autoplayDelay,
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getSliderStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

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
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [postData, getTrim] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(false);

    const firstRender = useRef(true);

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
                <div className="gvnews_slider_type_1 gvnews_slider" data-autoplay={autoplay ? true : ''} data-delay={autoplayDelay} data-hover-action={hoverEffect ? true : ''}>
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
                <div className={'gvnews_slider_wrapper gvnews_slider_type_1_wrapper'}>
                    <RenderColumn {...moduleData} />
                    {(overlay && !firstRender.current) && <ModuleOverlay />}
                </div>
            );
        } else {
            setBlock(
                <div className="gvnews_empty_module">{moduleOption.string.no_content}</div>
            );
        }
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setOverlay(true);

            let attr = {
                contentType,
                uniqueContent,
                includeOnly,
                postType,
                numberPost,
                includePost,
                excludePost,
                includeCategory,
                excludeCategory,
                includeAuthor,
                includeTag,
                excludeTag,
                sortBy,
                postOffset,
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
            });
        }, 150);
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
        numberPost,
        postOffset,
    ]);

    useEffect(() => {
        if(firstRender.current) {
            return;
        }
        setBlock(false);
        setTimeout(function () {
            resetblock();
        }, 100);
    }, [
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        autoplay,
        autoplayDelay,
        hoverEffect,
    ]);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        if ('function' === typeof window.gvnews.slider && postData.length > 0 && block) {
            setTimeout(() => {
                const gvnewsLibrary = window.gvnews.library;
                var slider = document.querySelectorAll(`.${elementId} .gvnews_slider_wrapper .gvnews_slider`);
                if (slider.length) {
                    gvnewsLibrary.forEach(slider, function (ele) {
                        window.gvnews.slider({
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
    }, [block]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block ? block : <ModuleSkeleton />}
            </div>
        </div>
    </>;
});

export default Slider1Block;