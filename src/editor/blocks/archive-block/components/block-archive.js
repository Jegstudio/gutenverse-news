import { useState, useEffect, useRef } from '@wordpress/element';
import BlockWrapper from './block-wrapper';
import BlockColumns from './block-columns';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { getModuleOptions, getParentColumnWidth } from '../../../utils/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useSelect } from '@wordpress/data';
import { ModuleSkeleton } from '../../../part/placeholder';
import { useIsFirstRender } from 'gutenverse-core/hooks';

const BlockArchive = (props) => {
    const {
        blockType,
        numberPost,
        columnWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        setAttributes,
        attributes,
    } = props;

    const moduleOption = useRef(null);
    const postCount = useRef(0);
    const [blockWidth, getWidth] = useState(12);
    const [postData, getTrim] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [block, setBlock] = useState(<ModuleSkeleton />);
    const [postLoaded, setPostLoaded] = useState(0);
    const [postExcerptLength, setPostExcerptLength] = useState(0);
    const firstRender = useIsFirstRender();

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
        columnWidth,
        deviceType
    ]);

    useEffect(() => {
        if (moduleOption.current == null) {
            moduleOption.current = getModuleOptions();
            postCount.current = moduleOption.current.option.post_count.publish;
        }
    }, []);

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
        if (excerptLength >= 0) {
            setPostExcerptLength(parseInt(excerptLength));
        } else {
            setAttributes({
                ...attributes,
                excerptLength: 20
            });
        }
    }, [excerptLength]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setOverlay(true);
            apiFetch({
                path: addQueryArgs('/gvnews-client/v1/get-posts-archive'),
                method: 'POST',
                data: {
                    attr: {
                        numberPost: postLoaded,
                    },
                },
            }).then((data) => {
                getTrim(JSON.parse(data));
            }).finally(() => {
                setOverlay(false);
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [postLoaded]);

    useEffect(() => {
        if(firstRender) {
            return;
        }
        if(postData.length > 0) {
            setBlock(
                <BlockColumns
                    {...{
                        blockType,
                        blockWidth,
                        excerptLength: postExcerptLength,
                        excerptEllipsis,
                        moduleOption: moduleOption.current,
                        postData,
                        metaDateType,
                        metaDateFormat,
                        metaDateFormatCustom,
                    }}
                />
            );
        } else if(moduleOption.current) {
            setBlock(<div className="gvnews_empty_module">{moduleOption.current.string && moduleOption.current.string.no_content}</div>);
        }
    }, [
        blockType,
        blockWidth,
        postExcerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    ]);

    return <BlockWrapper {...{ ...props, block, overlay, blockWidth }} />;
};

export default BlockArchive;