import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor, useIsFirstRender } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import PaginationModule from './pagination';
import HeaderModule from './header';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from '../control-panel/panel-styles/block-style';
import { useSelect } from '@wordpress/data';
import { getModuleOptions, getParentColumnWidth, getImageSizeDetail } from '../utils/helper';
import { ModuleSkeleton, ModuleOverlay } from './placeholder';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const defaultOptions = getModuleOptions();

const BlockModule = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        setBlockRef,
        moduleName,
        columnAttr,
        panelList,
        freeModule = false,
        defaultImageSizeMain = {},
        defaultImageSizeSecond = {},
        mainThumbnailClass,
        secondThumbnailClass,
        useDedicatedStyle = false,
        dedicatedStyle = () => [],
        isMasonry = false,
        checkLandscapeThumbnail = false
    } = props;

    const {
        elementId,
        icon,
        iconType,
        iconSVG,
        title,
        second_title,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
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
        paginationMode,
        paginationPost,
        showNavText,
        enableBoxed,
        enableBoxShadow,
        columnWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        paginationWrapperAlign,
        paginationDisableSeparator,
        showMeta = true,
        showMetaDate = true,
        showMetaAuthor = true,
        showMetaComment = true,
        readmoreButtonDisabled = false,
        listIcon = '',
        listIconType = 'icon',
        listIconSVG = '',
        metaDateIcon = '',
        metaDateIconType = 'icon',
        metaDateIconSVG = '',
        metaCommentIcon = '',
        metaCommentIconType = 'icon',
        metaCommentIconSVG = '',
        renderedImageSizeMain,
        renderedImageSizeSecond,
        gutenversePreviewBlock = '',
        gutterWidth = 30,
        rowItemGap,
        headerHtmlTag,
        postTitleHtmlTag,
    } = attributes;

    useEffect(() => {
        if (isMasonry) {
            setTimeout(() => {
                setMasonryReload(!masonryReload);
            }, 300);
        }
    }, [
        gutterWidth,
        rowItemGap
    ]);

    const metaSettings = {
        meta_show: showMeta,
        meta_date: showMetaDate,
        meta_comment: showMetaComment,
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
    const device = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(
        elementId,
        attributes,
        (elementId, attributes) => {
            if (useDedicatedStyle) {
                return dedicatedStyle(
                    elementId,
                    attributes,
                );
            }
            return getBlockStyle(
                elementId,
                attributes,
                mainThumbnailClass,
                secondThumbnailClass,
            );
        },
        elementRef
    );

    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    const [blockWidth, getWidth] = useState(columnAttr.blockWidth);
    const [postData, getTrim] = useState([]);
    const [overlay, setOverlay] = useState(columnAttr.overlay || false);
    const [activeFilter, setActiveFilter] = useState(-100);
    const [activeType, setActiveType] = useState({ value: -100, label: 'all' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPrevTotalPagination, setNextPrevTotalPagination] = useState({
        next: false,
        prev: false,
        totalPage: 1,
    });
    const [forceReload, setForceReload] = useState(false);
    const [masonryReload, setMasonryReload] = useState(false);
    const [loadClass, setLoadClass] = useState('');
    const [postLoaded, setPostLoaded] = useState(0);
    const [postStart, setPostStart] = useState(0);
    const [postPaginationLoaded, setPostPaginationLoaded] = useState(paginationPost);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const ColumnBlock = columnAttr.block;
    const firstRender = useIsFirstRender();

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

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
        if (showNavText && paginationMode === 'nextprev' && !paginationWrapperAlign?.[device] && !paginationDisableSeparator) {
            let ovr = {
                ...attributes,
                paginationWrapperAlign: { ...paginationWrapperAlign },
                paginationDisableSeparator: true
            };
            ovr['paginationWrapperAlign'][device] = 'start';
            setAttributes(ovr);
        }
    }, [showNavText]);

    useEffect(() => {
        if (paginationPost > 0) {
            setPostPaginationLoaded(parseInt(paginationPost));
        } else {
            setAttributes({
                ...attributes,
                paginationPost: 5
            });
        }
    }, [paginationPost]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        getTrim([]);
        setIsLoaded(false);
        setPage(1);
        setForceReload(!forceReload);
    }, [
        paginationMode,
        postPaginationLoaded,
        activeFilter,
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
        if (columnWidth == 'auto') {
            if (deviceType === 'Desktop') {
                getWidth(getParentColumnWidth(getBlockRootClientId(props.clientId), getBlock));
            }
        } else {
            getWidth(columnWidth);
        }
    }, [
        columnWidth,
        deviceType
    ]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
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
            page,
            paginationPost: postPaginationLoaded || postLoaded,
            paginationMode: paginationMode === 'scrollload' ? 'loadmore' : paginationMode,
            postOffset: postStart,
            advancedResponse: true,
            checkLandscapeThumbnail,
        };
        if (activeFilter['value'] != -100) {
            switch (activeType) {
                case 'category':
                    attr.includeCategory = [activeFilter];
                    break;
                case 'tag':
                    attr.includeTag = [activeFilter];
                    break;
                case 'author':
                    attr.includeAuthor = [activeFilter];
                    break;
            }
        }
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            const { result = [], ...pagination } = JSON.parse(data);
            setNextPrevTotalPagination(pagination);
            if (paginationMode === 'loadmore' || paginationMode === 'scrollload') {
                result.length > 0 ? getTrim([...postData, ...result]) : null;
                return;
            }
            getTrim(result);
        }).finally(() => {
            setOverlay(false);
            setIsLoaded(true);
        });
    }, [page, forceReload]);

    useEffect(() => {
        if (firstRender) {
            return;
        }
        if (gutenversePreviewBlock === 'noContent') {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            return;
        }
        if (postData.length > 0) {
            const imageSizeMain = getImageSizeDetail(renderedImageSizeMain, defaultImageSizeMain);
            const imageSizeSecond = getImageSizeDetail(renderedImageSizeSecond, defaultImageSizeSecond);
            const allColumns = <ColumnBlock {...{
                blockWidth,
                excerptLength,
                excerptEllipsis,
                moduleOption,
                metaDateType,
                metaDateFormat,
                metaDateFormatCustom,
                postData,
                isLoadMore: (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
                numberPost: postLoaded,
                paginationPost: postPaginationLoaded,
                page,
                imageSizeMain,
                imageSizeSecond,
                readmoreButtonDisabled,
                listIcon,
                listIconType,
                listIconSVG,
                metaDateIcon,
                metaDateIconType,
                metaDateIconSVG,
                metaCommentIcon,
                metaCommentIconType,
                metaCommentIconSVG,
                attributes,
                gutterWidth,
                rowItemGap,
                postTitleHtmlTag,
            }} />;
            setBlock(allColumns);
        } else if (isLoaded) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
        }
        return () => setBlock(<ModuleSkeleton />);
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postData,
        renderedImageSizeMain,
        renderedImageSizeSecond,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        showMetaComment,
        readmoreButtonDisabled,
        listIcon,
        listIconType,
        listIconSVG,
        metaDateIcon,
        metaDateIconType,
        metaDateIconSVG,
        metaCommentIcon,
        metaCommentIconType,
        metaCommentIconSVG,
        gutenversePreviewBlock,
        masonryReload,
        postTitleHtmlTag,
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            `gvnews-block-${moduleName}`,
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const headerData = {
        icon,
        iconType,
        iconSVG,
        title,
        second_title,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
        headerHtmlTag,
        onSubCatChange: (value, type, label) => {
            setIsLoaded(false);
            setActiveFilter({ value, label });
            setActiveType(type);
            setLoadClass('');
            setOverlay(true);
        }
    };

    const paginationData = {
        paginationMode,
        showNavText,
        nextPrevTotalPagination,
        onPageChange: (amount, loadClass) => {
            const final = Math.max(page + amount, 1);
            setIsLoaded(false);
            setPage(final);
            setLoadClass(loadClass);
            if (paginationMode !== 'loadmore' && paginationMode !== 'scrollload') {
                setOverlay(true);
            }
        }
    };

    const theProps = {
        ...props,
        attributes: {
            ...attributes,
            mainThumbnailClass,
            secondThumbnailClass
        }
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={theProps} elementRef={elementRef} />
        {!freeModule && <InspectorControls>
            {applyFilters(
                'gutenverse.blocks-pro.upgrade-banner-professional',
                null,
                props
            )}
        </InspectorControls>}
        <div {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className={`gvnews_postblock_${moduleName} ${`gvnews_pagination_${paginationMode}`} subclass ${!isLoaded && (paginationMode !== 'loadmore' && paginationMode !== 'scrollload') ? 'loading' : 'loaded'} ${loadClass} gvnews_postblock gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 gvnews_postblock ${enableBoxed ? 'gvnews_pb_boxed' : ''} ${enableBoxed && enableBoxShadow ? 'gvnews_pb_boxed_shadow' : ''} ${isMasonry ? 'disable-fade-up' : ''}`}>
                    <HeaderModule {...headerData} />
                    <div className="gvnews_block_container">
                        {block}
                        {overlay && <ModuleOverlay />}
                    </div>
                    <PaginationModule {...paginationData} />
                </div>
            </div>
        </div>
    </>;
});

export default BlockModule;
