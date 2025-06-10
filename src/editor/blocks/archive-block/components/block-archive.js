import { useState, useEffect, useRef } from '@wordpress/element';
import BlockWrapper from './block-wrapper';
import BlockColumns from './block-columns';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { getModuleOptions } from '../../../utils/helper';

const BlockArchive = (props) => {
    const {
        blockType,
        postOffset = 0,
        numberPost,
        columnWidth,
        excerpLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    } = props;

    const moduleOption = useRef(null);
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

    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(12);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

    useEffect(() => {

        if (moduleOption.current == null) {
            moduleOption.current = getModuleOptions();
            postCount.current = moduleOption.current.option.post_count.publish;
        }

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
        setBlock(
            <BlockColumns
                {...{
                    blockType,
                    blockWidth,
                    excerpLength,
                    excerptEllipsis,
                    moduleOption: moduleOption.current,
                    postData,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    postBulk,
                    overlay,
                }}
            />
        );
    }, [
        blockType,
        blockWidth,
        excerpLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postBulk,
        overlay,
    ]);

    return <BlockWrapper {...{ ...props, block, blockWidth   }} />;
};

export default BlockArchive;