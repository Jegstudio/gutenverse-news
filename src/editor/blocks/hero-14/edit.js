import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { panelList } from './panels/panel-list';
import { useAnimationEditor, useInitializeIconToSvg } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { useRef } from '@wordpress/element';
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';
import { getModuleOptions } from '../../utils/helper';


const defaultOptions = getModuleOptions();

const Hero14Block = compose(
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
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
        readmoreButtonDisabled = false,
        postTitleHtmlTag = 'h3',
        showMetaReview = false,
        showPostFormatIcon = false,
        galleryFormatIcon = '',
        galleryFormatIconType = 'icon',
        galleryFormatIconSVG = '',
        videoFormatIcon = '',
        videoFormatIconType = 'icon',
        videoFormatIconSVG = '',
        allowOverrideCategoryColor = false
    } = attributes;

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

    const metaSettings = {
        meta_show: showMeta,
        meta_date: showMetaDate,
        meta_author: showMetaAuthor,
        meta_review: showMetaReview,
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
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useInitializeIconToSvg({
        elementId,
        attributes,
        setAttributes,
        icons: [
            { type: 'galleryFormatIconType', svg: 'galleryFormatIconSVG' },
            { type: 'videoFormatIconType', svg: 'videoFormatIconSVG' },
        ],
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-hero-14', elementId, animationClass, displayClass),
        ref: elementRef
    });

    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postStart, setPostStart] = useState(0);

    const firstRender = useRef(true);
    const isDeprecated = !gutenverseProActive;
    const wrapperClass = `gvnews-raw-wrapper gvnews-editor${isDeprecated ? ' gvnews-deprecated-block' : ''} ${allowOverrideCategoryColor ? 'gvnews_override_category' : ''}`;

    function RenderBlock1(props) {
        return (
            <article className={'gvnews_post center gvnews_pl_lg_7'}>
                <ThumbModule cat={true} size={715} post={props.post} overlayIconData={overlayIconData} />
                <ContentModule meta={3} title={true} excerpt={true} read={!props.readmoreButtonDisabled} post={props.post} attr={props.attr} />
            </article>
        );
    }

    function RenderBlock2(props) {
        return (
            <article className={`gvnews_post left gvnews_pl_sm_2 gvnews_hero_item_${props.index}`}>
                <ContentModule cat={true} meta={2} title={true} post={props.post} attr={props.attr} />
            </article>
        );
    }

    function RenderBlock3(props) {
        return (
            <article className={`gvnews_post right gvnews_pl_md_box gvnews_hero_item_${props.index}`}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={false} post={props.post} overlayIconData={overlayIconData} />
                    <ContentModule cat={false} meta={2} title={true} read={false} excerpt={false} post={props.post} attr={props.attr} />
                </div>
            </article>
        );
    }

    function BuildColumn3(props) {
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

        const rows = [];
        const rows2 = [];

        if (props.postData) {
            for (let i = 1; i < props.postData.length; i++) {
                if (i < 5) {
                    rows.push(<RenderBlock2 attr={attr} post={props.postData[i]} index={i} />);
                } else {
                    rows2.push(<RenderBlock3 attr={attr} post={props.postData[i]} index={i - 4} />);
                }
            }
        }
        return (
            <>
                <div className="gvnews_postbig">{props.postData && <RenderBlock1 attr={attr} post={props.postData[0]} readmoreButtonDisabled={props.readmoreButtonDisabled} />}</div>
                <div className="gvnews_postsmall left">{rows}</div>
                <div className="gvnews_postsmall right">{rows2}</div>
            </>
        );
    }

    function RenderColumn(props) {
        return <BuildColumn3 {...props} />;
    }


    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(12);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

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
                postOffset: postStart,
            };
            apiFetch({
                path: addQueryArgs('/gvnews-client/v1/get-post'),
                method: 'POST',
                data: {
                    attr: attr,
                },
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
        numberPost
    ]);

    useEffect(() => {
        if (firstRender.current) {
            return;
        }
        const moduleData = {
            blockWidth,
            excerptLength,
            excerptEllipsis,
            moduleOption,
            postData,
            metaDateType,
            metaDateFormat,
            metaDateFormatCustom,
            readmoreButtonDisabled
        };
        if (postData.length > 0) {
            setBlock(
                <RenderColumn {...moduleData} />
            );
        } else {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string.no_content}</div>);
        }
    }, [
        blockWidth,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        overlay,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        showMetaReview,
        readmoreButtonDisabled,
        postTitleHtmlTag,
        showPostFormatIcon,
        galleryFormatIcon,
        galleryFormatIconType,
        galleryFormatIconSVG,
        videoFormatIcon,
        videoFormatIconType,
        videoFormatIconSVG,
    ]);

    return (
        <>
            {isDeprecated ? (
                <PanelUpgradePro title="Hero 14" />
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
                    <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                    <div className={'gvnews_heropost gvnews_heropost_14 gvnews_heropost_1 gvnews_postblock'}>
                        {block}
                        {(overlay && !firstRender.current) && <ModuleOverlay />}
                    </div>
                    {isDeprecated && <UpgradeProOverlay />}
                </div>
            </div>
        </>
    );
});

export default Hero14Block;
