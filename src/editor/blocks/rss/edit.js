import { compose } from '@wordpress/compose';
import { useState, useEffect, Fragment } from '@wordpress/element';
import { withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import HeaderModule from '../../part/header';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton } from '../../part/placeholder';
import { useRef } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import ThumbModule from '../../part/thumbnail';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useSelect } from '@wordpress/data';
import { getImageSizeDetail, getParentColumnWidth } from '../../utils/helper';
import PanelUpgradePro from '../../panels/panel-upgrade-pro';
import UpgradeProOverlay from '../../part/upgrade-pro-overlay';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseProActive } from '../../utils/helper';
import { CopyElementToolbar, InspectorControls } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const RssBlock = compose(
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
        gvnewsModule,
        columnWidth,
        icon,
        title,
        second_title,
        headerType,
        url_title,
        feedurl,
        blockType,
        thumb,
        fallback,
        fallbackimg,
        numberPost,
        excerptLength,
        excerptEllipsis,
        metaDateFormat,
        metaDateFormatCustom,
        enableBoxed,
        enableBoxShadow,
        metaDateType,
        headerHtmlTag,
        postTitleHtmlTag,
        renderedImageSizeMain,
        gutenversePreviewBlock = '',
    } = attributes;

    const elementRef = useRef(null);
    const deviceType = getDeviceType();
    const {
        getBlock,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, (elementId, attributes) => getBlockStyle(elementId, attributes, 'gvnews_pl_md_2'), elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [postData, setPostData] = useState([]);
    const [moduleOption, setModuleOption] = useState(false);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/module-option'),
        }).then((data) => {
            const parsedData = JSON.parse(data);
            setModuleOption(parsedData);
        });
    }, []);

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-rss-data'),
            method: 'POST',
            data: {
                attr: {
                    feedurl: feedurl,
                    numberPost: numberPost,
                    thumbnail: thumb,
                    excerpt_length: excerptLength,
                    fallimage: fallbackimg,
                    fallback: fallback,
                    thumbnail_size: blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3',
                }
            }
        }).then((data) => {
            setPostData(JSON.parse(data));
        });
    }, [
        feedurl,
        numberPost,
        thumb,
        excerptLength
    ]);

    const headerData = {
        icon,
        title,
        second_title,
        headerType,
        headerHtmlTag,
    };

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-rss',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [block, setBlock] = useState(false);
    const [blockWidth, getWidth] = useState(12);

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
        if (gutenversePreviewBlock === 'noContent') {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
            return;
        }
        if (postData.length) {
            const attr = {
                option: moduleOption,
                length: excerptLength,
                elipsis: excerptEllipsis,
                date: {
                    type: metaDateType,
                    format: metaDateFormat,
                    custom: metaDateFormatCustom,
                },
                titleTag: postTitleHtmlTag
            };
            const limit = postData.length < numberPost ? postData.length : numberPost;
            const imageSizeMain = getImageSizeDetail(renderedImageSizeMain, { height: 350, width: 250, dimension: 715 });
            const content = postData.map((post, index) => {
                if (index < limit) {
                    return <article key={index} className="gvnews_post gvnews_pl_md_2">
                        {post?.thumbnail?.url && <ThumbModule size={715} cat={false} post={post} imageSize={imageSizeMain} />}
                        <ContentModule title={true} meta={1} excerpt={true} read={false} post={post} attr={attr} />
                    </article>;
                }
            });
            setBlock(<div className={`gvnews_postblock_3 gvnews_postblock gvnews_module_hook gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 gvnews_postblock ${enableBoxed ? 'gvnews_pb_boxed' : ''}`}>
                <div className="gvnews_posts gvnews_block_container">
                    {content}
                </div>
            </div>);
        } else {
            setBlock(<div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div>);
        }
    }, [
        postData,
        moduleOption,
        blockWidth,
        excerptLength,
        excerptEllipsis,
        metaDateFormat,
        metaDateFormatCustom,
        postTitleHtmlTag,
        renderedImageSizeMain,
        gutenversePreviewBlock
    ]);
    const isDeprecated = !gutenverseProActive;

    return <>
        {isDeprecated ? (
            <PanelUpgradePro title="RSS" />
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
        <div  {...blockProps}>
            <div className={`gvnews-raw-wrapper gvnews-editor ${enableBoxed ? 'gvnews_pb_boxed' : ''} ${enableBoxed && enableBoxShadow ? 'gvnews_pb_boxed_shadow' : ''} ${isDeprecated ? 'gvnews-deprecated-block ' : ''} gvnews_postblock`}>
                <HeaderModule {...headerData} />
                {block ? block : <ModuleSkeleton />}
                {isDeprecated && <UpgradeProOverlay />}
            </div>
        </div>
    </>;
});

export default RssBlock;
