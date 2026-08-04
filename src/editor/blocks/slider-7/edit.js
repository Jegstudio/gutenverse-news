import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
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
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';
import { getOverlayIconData } from '../../part/thumbnail';
import { renderIcon } from 'gutenverse-core/helper';

const defaultOptions = getModuleOptions();

const Slider7Block = compose(
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
        fimagePosition,
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
        readmoreButtonDisabled = false,
        showPostFormatIcon = false,
        galleryFormatIcon = '',
        galleryFormatIconType = 'icon',
        galleryFormatIconSVG = '',
        videoFormatIcon = '',
        videoFormatIconType = 'icon',
        videoFormatIconSVG = '',
        nextButtonIcon,
        nextButtonIconType,
        nextButtonIconSVG,
        prevButtonIcon,
        prevButtonIconType,
        prevButtonIconSVG,
        postTitleHtmlTag = 'h2',
        gutenversePreviewBlock = '',
        allowOverrideCategoryColor = false
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
    const overlayIconData = {
        show: showPostFormatIcon,
        gallery: {
            icon: galleryFormatIcon,
            type: galleryFormatIconType,
            svg: galleryFormatIconSVG
        },
        video: {
            icon: videoFormatIcon,
            type: videoFormatIconType,
            svg: videoFormatIconSVG
        }
    };

    const elementRef = useRef(null);
    const blockRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getSliderStyle, elementRef);

    useInitializeIconToSvg({
        elementId,
        attributes,
        setAttributes,
        icons: [
            { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
            { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
            { type: 'nextButtonIconType', svg: 'nextButtonIconSVG' },
            { type: 'prevButtonIconType', svg: 'prevButtonIconSVG' },
        ],
    });


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
    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-element-full',
            'gvnews-slider-7',
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
    const [postLoaded, setPostLoaded] = useState(5);
    const [postStart, setPostStart] = useState(0);
    const [sliderDelay, setSliderDelay] = useState(0);

    const firstRender = useRef(true);
    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews-raw-wrapper gvnews-editor${isDeprecated ? ' gvnews-deprecated-block' : ''} ${allowOverrideCategoryColor ? 'gvnews_override_category' : ''}`;

    function RenderContent(props) {
        const format = props.post?.format || 'standard';
        const { withIcon, type, icon, svg } = getOverlayIconData(overlayIconData, format);
        return (
            <div className={`gvnews_slide_item format-${format}`} style={props.post?.thumbnail?.url ? { backgroundImage: 'url(' + props.post.thumbnail.url + ')' } : {}}>
                {props.index == 0 && <img className="thumbnail-prioritize" src={props.post.thumbnail.url} style={{ display: 'none' }} />}
                <div className={`gvnews_slide_image ${withIcon ? 'with-overlay-icon' : ''}`} style={props.post?.thumbnail?.url ? { backgroundImage: 'url(' + props.post.thumbnail.url + ')' } : {}}>
                    {withIcon && <div className="gvnews-thumb-overlay-icon">{renderIcon(icon, type, svg)}</div>}
                </div>
                <SliderCaption
                    {...props}
                    excerpt
                    navigation
                    withElipsis={true}
                    withMeta={false}
                    withReadmore={!readmoreButtonDisabled}
                    nextButtonIcon={nextButtonIcon}
                    nextButtonIconType={nextButtonIconType}
                    nextButtonIconSVG={nextButtonIconSVG}
                    prevButtonIcon={prevButtonIcon}
                    prevButtonIconType={prevButtonIconType}
                    prevButtonIconSVG={prevButtonIconSVG}
                />
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
            },
            titleTag: postTitleHtmlTag
        };
        const content = [];
        if (props.postData && props.moduleOption) {
            for (let i = 0; i < props.postData.length; i++) {
                content.push(<RenderContent attr={attr} index={i} post={props.postData[i]} />);
            }
        }

        return (
            <div
                ref={blockRef}
                className={`gvnews_slider_type_7 gvnews_slider gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 featured-${fimagePosition}`}
                data-autoplay={autoplay ? true : ''}
                data-delay={sliderDelay}
                data-nav-prev={__('prev', 'gutenverse-news')}
                data-nav-next={__('next', 'gutenverse-news')}
                data-class-next={nextButtonIcon}
                data-class-next-type={nextButtonIconType}
                data-class-next-svg={nextButtonIconSVG}
                data-class-prev={prevButtonIcon}
                data-class-prev-type={prevButtonIconType}
                data-class-prev-svg={prevButtonIconSVG}
            >
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
                <div key={Math.random().toString(36).substring(2)} className={`gvnews_slider_wrapper gvnews_slider_type_7_wrapper ${overlayOption == 'no' ? 'no-overlay' : ''}`}>
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
        if (gutenversePreviewBlock === 'noContent') {
            setBlock(
                <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>
            );
            return;
        }
        resetblock();
    }, [
        blockWidth,
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
        fimagePosition,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        readmoreButtonDisabled,
        nextButtonIcon,
        nextButtonIconType,
        nextButtonIconSVG,
        prevButtonIcon,
        prevButtonIconType,
        prevButtonIconSVG,
        postTitleHtmlTag,
        gutenversePreviewBlock,
        showPostFormatIcon
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        if (blockRef.current) {
            window.gvnewsSliderModule(blockRef.current);
        }
    }, [block]);

    return (
        <>
            {isDeprecated ? (
                <PanelUpgradePro title="Slider 7" />
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

export default Slider7Block;
