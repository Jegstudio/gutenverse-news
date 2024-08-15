import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import PaginationModule from '../../part/pagination';
import HeaderModule from '../../part/header';
import Block8Columns from './Block8Columns';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const Block8Block = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
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

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(12);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);

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
        if (columnWidth == 'auto') {
            if (deviceType === 'Desktop') {
                getWidth(12);
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
        postBulk ? setOverlay(true) : null;
        let attr = {
            contentType,
            uniqueContent,
            includeOnly,
            postType,
            numberPost: loadPost,
            includePost,
            excludePost,
            includeCategory,
            excludeCategory,
            includeAuthor,
            includeTag,
            excludeTag,
            sortBy,
        };
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            getPost(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
            setOverlay(false);
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
        loadPost
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-block-8',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
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
    };

    const paginationData = {
        paginationMode,
        showNavText,
    };

    const [block, setBlock] = useState(false);
    useEffect(() => {
        setBlock(<Block8Columns {...{
            blockWidth,
            excerptLength,
            excerptEllipsis,
            moduleOption,
            postData,
            metaDateType,
            metaDateFormat,
            metaDateFormatCustom,
            overlay,
            postBulk
        }} />);
    }, [
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postBulk,
        overlay,
    ]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className={`gvnews_postblock_8 gvnews_postblock gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 gvnews_postblock ${enableBoxed ? 'gvnews_pb_boxed' : ''} ${enableBoxed && enableBoxShadow ? 'gvnews_pb_boxed_shadow' : ''}`}>
                    <HeaderModule {...headerData} />
                    {block ? block : 'loading'}
                    <PaginationModule {...paginationData} />
                </div>
            </div>
        </div>
    </>;
});

export default Block8Block;