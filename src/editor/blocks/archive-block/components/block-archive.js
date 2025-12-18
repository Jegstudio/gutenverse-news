import { useState, useEffect, useRef } from '@wordpress/element';
import BlockWrapper from './block-wrapper';
import BlockColumns from './block-columns';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { getModuleOptions, getParentColumnWidth } from '../../../utils/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useSelect } from '@wordpress/data';
const defaultOptions = getModuleOptions();


const BlockArchive = (props) => {
    const {
        blockType,
        postOffset = 0,
        numberPost,
        columnWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        showMetaComment,
        readmoreButtonDisabled,
        showNoContent
    } = props;

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
    const postCount = useRef(0);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(12);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(numberPost);
        let count = parseInt(postCount.current);
        if (postBulk && postBulk.length) {
            if (postBulk.slice(off, num + off).length) {
                if (postBulk.slice(off, num + off).length < num && loadPost <= count) {
                    loadMore(loadPost + 15);
                }
                getTrim(postBulk.slice(off, parseInt(num + off)));
            } else {
                count > off ? loadMore(loadPost + 15) : count != postCount.current ? loadMore(count) : null;
                getTrim(false);
            }
        } else {
            getTrim(false);
        }
    }, [blockType, numberPost, postBulk, postOffset]);

    const deviceType = getDeviceType();
    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
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
    ]);


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


        postBulk ? setOverlay(true) : null;
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
            method: 'POST',
            data: {
                attr: {
                    numberPost: loadPost,
                },
            },
        })
            .then((data) => {
                getPost(JSON.parse(data));
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setOverlay(false);
            });
    }, [loadPost]);

    useEffect(() => {
        if (!postData) {
            return;
        }
        if (showNoContent) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            return;
        }
        setBlock(
            <BlockColumns
                {...{
                    blockType,
                    blockWidth,
                    excerptLength,
                    excerptEllipsis,
                    moduleOption: moduleOption,
                    postData,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    postBulk,
                    overlay,
                    readmoreButtonDisabled
                }}
            />
        );
    }, [
        blockType,
        blockWidth,
        excerptLength,
        excerptEllipsis,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postBulk,
        overlay,
        showMeta,
        showMetaDate,
        showMetaAuthor,
        showMetaComment,
        readmoreButtonDisabled,
        showNoContent
    ]);

    return <BlockWrapper {...{ ...props, block, blockWidth }} />;
};

export default BlockArchive;