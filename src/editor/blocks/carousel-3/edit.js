import { compose } from '@wordpress/compose';
import { useState, useEffect, useRef } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { SliderMeta } from '../../part/slider';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getCarouselStyle from '../../control-panel/panel-styles/carousel-style';
import { getModuleOptions, getParentColumnWidth, gutenverseProActive } from '../../utils/helper';
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { useSelect } from '@wordpress/data';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';
const moduleOption = getModuleOptions();

const Carousel3Block = compose(
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
        hoverEffect,
        autoplayDelay,
        ncolumn,
        iMargin,
        columnWidth,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element-full',
            'gvnews-carousel-3',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postLoaded, setPostLoaded] = useState(0);
    const [postStart, setPostStart] = useState(0);
    const [sliderDelay, setSliderDelay] = useState(0);
    const [sliderColumn, setSliderColumn] = useState(0);

    const firstRender = useRef(true);
    const elementRef = useRef(null);
    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getCarouselStyle, elementRef);
    const deviceType = getDeviceType();
    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const initSlider = () => {
        if ('function' === typeof window.gvnews.carousel && postData.length > 0 && block) {
            let gvnewsLibrary = window.gvnews;
            gvnewsLibrary = window.gvnews.library;
            let target = document;
            const iframe = document.querySelector('iframe[name="editor-canvas"]');
            if (iframe) {
                target = iframe.contentDocument;
            }
            var blockCarousel = target.querySelectorAll(`.${elementId} .gvnews_postblock_carousel`);

            if (blockCarousel.length) {
                gvnewsLibrary.forEach(blockCarousel, function (ele) {
                    window.gvnews.carousel({
                        container: ele,
                        textDirection: 'ltr',
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
    };

    function RenderContent(props) {
        return (
            <div className="gvnews_post_wrapper">
                <article className="gvnews_post">
                    <div className="gvnews_thumb">
                        <a>
                            <div className="thumbnail-container size-1000">
                                <img src={props.post.thumbnail.url} style={{ objectFit: 'cover', verticalAlign: 'middle', maxHeight: '100%', maxWidth: '100%' }} className="lazyloaded" />
                            </div>
                        </a>
                    </div>
                    <div className="overlay_content">
                        <div className="gvnews_postblock_content">
                            <h3 className="gvnews_post_title">
                                <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                            </h3>
                            <SliderMeta {...props} date />
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    const RenderColumn = props => {
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
        if (props.postData) {
            for (let i = 0; i < props.postData.length; i++) {
                content.push(<RenderContent attr={attr} index={i} post={props.postData[i]} />);
            }
        }
        return (<div className="gvnews_carousel_post" data-nav={showNav ? true : ''} data-autoplay={autoplay ? true : ''} data-delay={sliderDelay} data-items={sliderColumn} data-margin={iMargin}>
            {content}
        </div>
        );
    };

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
                <div key={Math.random().toString(36).substring(2)} className={`gvnews_postblock_carousel gvnews_postblock_carousel_3 gvnews_postblock  gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '6' : '12'} ${showNav ? 'shownav' : ''}`}>
                    <RenderColumn {...moduleData} />
                </div>
            );
        } else {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
        }
    }

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
        if (numberPost > 1) {
            setPostLoaded(parseInt(numberPost));
        } else {
            setAttributes({
                ...attributes,
                numberPost: 8
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
        if (ncolumn >= 1) {
            setSliderColumn(parseInt(ncolumn));
        } else {
            setAttributes({
                ...attributes,
                ncolumn: 3
            });
        }

    }, [ncolumn]);

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
                postOffset: postStart
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
        postStart,
        postLoaded
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        resetblock();
    }, [
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
        sliderDelay,
        hoverEffect,
        sliderColumn,
        iMargin,
        blockWidth
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        initSlider();
    }, [block]);

    if (!gutenverseProActive) {
        return <>
            <PanelUpgradePro title="Carousel 3" />
            <div  {...blockProps}>
                <div className="gvnews-raw-wrapper gvnews-editor gvnews-deprecated-block">
                    <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                    {block}
                    <UpgradeProOverlay />
                </div>
            </div>
        </>;
    }
    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <InspectorControls>
            {applyFilters(
                'gutenverse.blocks-pro.upgrade-banner-professional',
                null,
                props
            )}
        </InspectorControls>
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className="gvnews-element-overlay" style={{ 'pointerEvents': isSelected ? 'none' : 'auto' }}></div>
                {block}
                {(overlay && !firstRender.current) && <ModuleOverlay />}
            </div>
        </div>
    </>;
});

export default Carousel3Block;