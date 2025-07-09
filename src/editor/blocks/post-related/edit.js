import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import HeaderModule from '../../part/header';
import Block1Columns from '../block-01/Block1Columns';
import Block2Columns from '../block-02/Block2Columns';
import Block3Columns from '../block-03/Block3Columns';
import Block4Columns from '../block-04/Block4Columns';
import Block5Columns from '../block-05/Block5Columns';
import Block6Columns from '../block-06/Block6Columns';
import Block7Columns from '../block-07/Block7Columns';
import Block8Columns from '../block-08/Block8Columns';
import Block9Columns from '../block-09/Block9Columns';
import Block10Columns from '../block-10/Block10Columns';
import Block11Columns from '../block-11/Block11Columns';
import Block12Columns from '../block-12/Block12Columns';
import Block13Columns from '../block-13/Block13Columns';
import Block14Columns from '../block-14/Block14Columns';
import Block15Columns from '../block-15/Block15Columns';
import Block16Columns from '../block-16/Block16Columns';
import Block17Columns from '../block-17/Block17Columns';
import Block18Columns from '../block-18/Block18Columns';
import Block19Columns from '../block-19/Block19Columns';
import Block20Columns from '../block-20/Block20Columns';
import Block21Columns from '../block-21/Block21Columns';
import Block22Columns from '../block-22/Block22Columns';
import Block23Columns from '../block-23/Block23Columns';
import Block24Columns from '../block-24/Block24Columns';
import Block25Columns from '../block-25/Block25Columns';
import Block26Columns from '../block-26/Block26Columns';
import Block27Columns from '../block-27/Block27Columns';
import { select, subscribe } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { CopyElementToolbar } from 'gutenverse-core/components';
import getBlockStyle from './styles/block-style';
import { getModuleOptions, getParentColumnWidth } from '../../utils/helper';
import PaginationModule from '../../part/pagination';


const moduleOption = getModuleOptions();

const PostRelated = compose(
    withPartialRender,
    withPassRef
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
        postType,
        contentType,
        postOffset,
        excerptEllipsis,
        paginationMode,
        icon,
        title,
        second_title,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
        match,
        numberPost,
        templateType,
        excerptLength,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        showNavText,
        paginationPost,
        sortBy,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [postData, getTrim] = useState([]);
    const [content, setContent] = useState(<ModuleSkeleton />);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [blockWidth, setBlocktWidth] = useState(12);
    const [overlay, setOverlay] = useState(false);
    const [currentPostId, setCurrentPostid] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadClass, setLoadClass] = useState('');
    const [nextPrevTotalPagination, setNextPrevTotalPagination] = useState({
        next: false,
        prev: false,
        totalPage: 1,
    });
    const [forceReload, setForceReload] = useState(false);
    const firstRender = useRef(true);
    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

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
    }, [
        paginationMode,
        paginationPost,
        contentType,
        postType,
        numberPost,
        postOffset,
        sortBy,
    ]);

    useEffect(() => {
        const selectedCategories = select('core/editor').getEditedPostAttribute('categories');
        const selectedTags = select('core/editor').getEditedPostAttribute('tags');
        setCategories(selectedCategories);
        setTags(selectedTags);

        setCurrentPostid(wp.data.select('core/editor').getCurrentPostId());

        const unsubscribe = subscribe(() => {
            const updatedCategories = select('core/editor').getEditedPostAttribute('categories');
            setCategories(updatedCategories);
            const updatedTags = select('core/editor').getEditedPostAttribute('tags');
            setTags(updatedTags);
        });
        setForceReload(!forceReload);
        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        if(firstRender.current) {
            return;
        }
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: {
                    postType: postType,
                    contentType: contentType,
                    includeTag: 'tag' === match && tags && tags.length ? tags.map((tag) => { return { value: tag }; }) : [],
                    includeCategory: 'category' === match && categories && categories.length ? categories.map((cat) => { return { value: cat }; }) : [],
                    numberPost,
                    page,
                    paginationPost: paginationPost || numberPost,
                    paginationMode: paginationMode === 'scrollload' ? 'loadmore' : paginationMode,
                    advancedResponse: true,
                    sortBy
                }
            },
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
        page,
        forceReload
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gvnews-post-related',
            'gvnews-custom-related-wrapper',
            'gvnews-block',
            'gvnews-block-wrapper',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useEffect(() => {
        if (templateType) {
            if(firstRender.current) {
                firstRender.current = false;
                return;
            }
            if (postData.length > 0) {
                let template;

                const columnData = {
                    blockWidth,
                    excerptLength,
                    excerptEllipsis,
                    moduleOption,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    postData: postData.length > 0 ? postData.filter(item => {
                        return currentPostId !== item.id;
                    }) : postData,
                    isLoadMore: (paginationMode === 'loadmore' || paginationMode === 'scrollload'),
                    numberPost,
                    paginationPost,
                    page,
                };

                switch (templateType) {
                    case 'template_1':
                        template = <Block1Columns {...columnData} />;
                        break;
                    case 'template_2':
                        template = <Block2Columns {...columnData} />;
                        break;
                    case 'template_3':
                        template = <Block3Columns {...columnData} />;
                        break;
                    case 'template_4':
                        template = <Block4Columns {...columnData} />;
                        break;
                    case 'template_5':
                        template = <Block5Columns {...columnData} />;
                        break;
                    case 'template_6':
                        template = <Block6Columns {...columnData} />;
                        break;
                    case 'template_7':
                        template = <Block7Columns {...columnData} />;
                        break;
                    case 'template_8':
                        template = <Block8Columns {...columnData} />;
                        break;
                    case 'template_9':
                        template = <Block9Columns {...columnData} />;
                        break;
                    case 'template_10':
                        template = <Block10Columns {...columnData} />;
                        break;
                    case 'template_11':
                        template = <Block11Columns {...columnData} />;
                        break;
                    case 'template_12':
                        template = <Block12Columns {...columnData} />;
                        break;
                    case 'template_13':
                        template = <Block13Columns {...columnData} />;
                        break;
                    case 'template_14':
                        template = <Block14Columns {...columnData} />;
                        break;
                    case 'template_15':
                        template = <Block15Columns {...columnData} />;
                        break;
                    case 'template_16':
                        template = <Block16Columns {...columnData} />;
                        break;
                    case 'template_17':
                        template = <Block17Columns {...columnData} />;
                        break;
                    case 'template_18':
                        template = <Block18Columns {...columnData} />;
                        break;
                    case 'template_19':
                        template = <Block19Columns {...columnData} />;
                        break;
                    case 'template_20':
                        template = <Block20Columns {...columnData} />;
                        break;
                    case 'template_21':
                        template = <Block21Columns {...columnData} />;
                        break;
                    case 'template_22':
                        template = <Block22Columns {...columnData} />;
                        break;
                    case 'template_23':
                        template = <Block23Columns {...columnData} />;
                        break;
                    case 'template_24':
                        template = <Block24Columns {...columnData} />;
                        break;
                    case 'template_25':
                        template = <Block25Columns {...columnData} />;
                        break;
                    case 'template_26':
                        template = <Block26Columns {...columnData} />;
                        break;
                    case 'template_27':
                        template = <Block27Columns {...columnData} />;
                        break;
                }
                setContent(template);
            } else {
                setContent(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            }
            return () => setContent(<ModuleSkeleton />);
        }
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postData,
        templateType
    ]);

    const headerData = {
        icon,
        title,
        second_title,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
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
        <div  {...blockProps}>
            <div className={`${templateType.replace('template_', 'gvnews_postblock_')} subclass ${!isLoaded && (paginationMode !== 'loadmore' && paginationMode !== 'scrollload') ? 'loading' : 'loaded'} ${loadClass} gvnews_postblock gvnews_module_hook gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`}>
                <HeaderModule {...headerData} />
                <div className="gvnews_block_container">
                    {content}
                    {overlay && <ModuleOverlay />}
                </div>
                <PaginationModule {...paginationData} />
            </div>
        </div>
    </>;
});

export default PostRelated;


