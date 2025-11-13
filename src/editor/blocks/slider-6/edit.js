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
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getSliderStyle from '../../control-panel/panel-styles/slider-styles';
import { getModuleOptions } from '../../utils/helper';
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const defaultOptions = getModuleOptions();

const Slider6Block = compose(
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
        showNav,
        autoplay,
        autoplayDelay,
        overlayOption,
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
    useDynamicStyle(elementId, attributes, getSliderStyle, elementRef);

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
            'gvnews-slider-6',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [postData, getTrim] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postLoaded, setPostLoaded] = useState(5);
    const [postStart, setPostStart] = useState(0);
    const [sliderDelay, setSliderDelay] = useState(0);

    const firstRender = useRef(true);
    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews-raw-wrapper gvnews-editor${isDeprecated ? ' gvnews-deprecated-block' : ''}`;

    function RenderContent(props) {
        return (
            <div className="gvnews_slide_item" style={props.post?.thumbnail?.url ? { backgroundImage: 'url(' + props.post.thumbnail.url + ')' } : {}}>
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
            <div className="gvnews_slider_type_6 gvnews_slider" data-autoplay={autoplay ? true : ''} data-delay={sliderDelay} data-nav-prev={'PREV'} data-nav-next={'NEXT'}>
                {content}
            </div>
        );
    }

    function resetblock() {
        const moduleData = {
            excerptLength,
            excerptEllipsis,
            moduleOption,
            postData,
            metaDateType,
            metaDateFormat,
            metaDateFormatCustom,
        };
        if (postData.length > 0) {
            setBlock(
                <div key={Math.random().toString(36).substring(2)} className={`gvnews_slider_wrapper gvnews_slider_type_6_wrapper ${overlayOption == 'no' ? 'no-overlay' : ''}`}>
                    <RenderColumn {...moduleData} />
                </div>
            );
        } else {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
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
        overlay,
        showNav,
        autoplay,
        sliderDelay,
        overlayOption,
        showMeta,
        showMetaDate,
        showMetaAuthor,
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        if ('function' === typeof window.gvnews.slider && postData.length > 0 && block) {
            const gvnewsLibrary = window.gvnews.library;
            let target = document;
            const iframe = document.querySelector('iframe[name="editor-canvas"]');
            if (iframe) {
                target = iframe.contentDocument;
            }
            var slider = target.querySelectorAll(`.${elementId} .gvnews_slider_wrapper .gvnews_slider`);
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
        }
    }, [block]);

    return (
        <>
            {isDeprecated ? (
                <PanelUpgradePro title="Slider 6" />
            ) : (
                <>
                    <CopyElementToolbar {...props} />
                    <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
                    <InspectorControls>
                        {applyFilters(
                            'gutenverse.blocks-pro.upgrade-banner-professional',
                            null,
                            props
                        )}
                    </InspectorControls>
                </>
            )}

            <div {...blockProps}>
                <div className={wrapperClass}>
                    <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                    {block}
                    {(overlay && !firstRender.current) && <ModuleOverlay />}
                    {isDeprecated && <UpgradeProOverlay />}
                </div>
            </div>
        </>
    );
});

export default Slider6Block;