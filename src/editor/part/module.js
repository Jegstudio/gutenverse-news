import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import PaginationModule from './pagination';
import HeaderModule from './header';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from '../control-panel/panel-styles/block-style';
import { useSelect } from '@wordpress/data';
import { getModuleOptions, getParentColumnWidth } from '../utils/helper';
import { ModuleSkeleton, ModuleOverlay } from './placeholder';

const moduleOption = getModuleOptions();

const BlockModule = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        moduleName,
        columnAttr,
        panelList,
    } = props;

    const {
        elementId,
        icon,
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
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

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
    const [loadClass, setLoadClass] = useState('');
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const ColumnBlock = columnAttr.block;
    const firstRender = useRef(true);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    useEffect(() => {
        if(firstRender.current) {
            return;
        }
        getTrim([]);
        setPage(1);
        setForceReload(!forceReload);
    }, [paginationMode, paginationPost, activeFilter]);


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
            page,
            paginationPost: paginationPost || numberPost,
            paginationMode: paginationMode === 'scrollload' ? 'loadmore' : paginationMode,
            postOffset,
            advancedResponse: true,
        };
        if (activeFilter['value'] != -100) {
            let incldOnly = true;
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
                default:
                    incldOnly = attr.includeOnly;
                    break;
            }
            attr.includeOnly = incldOnly;
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
            if( paginationMode === 'loadmore' || paginationMode === 'scrollload' ) {
                result.length > 0 ? getTrim([...postData, ...result]) : null;
                return;
            }
            getTrim(result);
        }).finally(() => {
            setOverlay(false);
            setIsLoaded(true);
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
        page,
        numberPost,
        postOffset,
        forceReload,
    ]);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (postData.length > 0) {
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
                numberPost,
                paginationPost,
                page,
            }} />;
            setBlock(allColumns);
        } else {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
        }
        return () => setBlock(<ModuleSkeleton />);
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postData,
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
        title,
        second_title,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
        onSubCatChange: (value, type, label) => {
            setIsLoaded(false);
            setActiveFilter({value, label});
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

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className={`gvnews_postblock_${moduleName} subclass ${!isLoaded && (paginationMode !== 'loadmore' && paginationMode !== 'scrollload') ? 'loading' : 'loaded'} ${loadClass} gvnews_postblock gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 gvnews_postblock ${enableBoxed ? 'gvnews_pb_boxed' : ''} ${enableBoxed && enableBoxShadow ? 'gvnews_pb_boxed_shadow' : ''}`}>
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