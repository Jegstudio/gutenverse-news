import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { ModuleOverlay } from '../../part/placeholder';
import HeaderModule from '../../part/header';
import Block1Columns from '../block-1/Block1Columns';
import Block2Columns from '../block-2/Block2Columns';
import Block3Columns from '../block-3/Block3Columns';
import Block4Columns from '../block-4/Block4Columns';
import Block5Columns from '../block-5/Block5Columns';
import Block6Columns from '../block-6/Block6Columns';
import Block7Columns from '../block-7/Block7Columns';
import Block8Columns from '../block-8/Block8Columns';
import Block9Columns from '../block-9/Block9Columns';
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
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const PostRelated = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        postType,
        contentType,
        postOffset,
        excerptEllipsis,
        paginationMode,
        //header
        icon,
        title,
        secondTitle,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
        //general
        match,
        pagination,
        numberPost,
        templateType,
        excerptLength,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        showNavText
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const [postBulk, getPost] = useState(false);
    const [moduleOption, setModuleOption] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [loadPost, loadMore] = useState(15);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [postData, getTrim] = useState(false);
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [blockWidth, setBlocktWidth] = useState(12);
    const [overlay, setOverlay] = useState(false);
    const [currentPostId, setCurrentPostid] = useState(false);

    const headerData = {
        icon,
        title,
        secondTitle,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
    };

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
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
            if (parsedData.option.post_count) {
                setPostCount(parsedData.option.post_count.publish);
            }
        });
    }, []);

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

        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: {
                    postType: postType,
                    contentType: contentType,
                    includeTag: 'tag' === match && tags && tags.length ? tags.map((tag) => { return { value: tag }; }) : [],
                    includeCategory: 'category' === match && categories && categories.length ? categories.map((cat) => { return { value: cat }; }) : [],
                    numberPost: numberPost
                }
            },
        }).then((data) => {
            getPost(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, [
        numberPost,
        categories,
        tags,
        match
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-related',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
    });

    useEffect(() => {
        if (templateType) {
            let template;

            const columnData = {
                //header
                icon,
                title,
                secondTitle,
                headerType,
                headerCategory,
                headerAuthor,
                headerTag,
                headerDefault,
                //module data
                postData: postData ? postData.filter(item => {
                    //exclue current post
                    return currentPostId !== item.id;
                }) : postData,
                moduleOption,
                blockWidth,
                excerptLength,
                excerptEllipsis,
                metaDateType,
                metaDateFormat,
                metaDateFormatCustom,
                postBulk,
                overlay,
                //pagination data
                paginationMode,
                showNavText,
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
                    break; z;
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
        }
    }, [
        icon,
        title,
        secondTitle,
        headerType,
        headerCategory,
        headerAuthor,
        headerTag,
        headerDefault,
        postData,
        postBulk,
        overlay,
        //general
        match,
        pagination,
        numberPost,
        templateType,
        excerptEllipsis,
        excerptLength,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        paginationMode,
        showNavText
    ]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews_custom_related_wrapper">
                <div className={`${templateType.replace('template_', 'gvnews_postblock_')} gvnews_postblock gvnews_module_hook gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3`}>
                    <HeaderModule {...headerData} />
                    {content ? content : <ModuleOverlay />}
                </div>
            </div>
        </div>
    </>;
});

export default PostRelated;


