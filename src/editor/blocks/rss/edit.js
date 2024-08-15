import { compose } from '@wordpress/compose';
import {  useState, useEffect, Fragment }  from '@wordpress/element';
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
import { RawHTML } from '@wordpress/element';
import HeaderModule from '../../part/header';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const RssBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
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
        metaDateType
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

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
                }
            }
        }).then((data) => {
            setPostData(JSON.parse(data));
        });
    }, [
        feedurl,
        numberPost
    ]);

    const headerData = {
        icon,
        title,
        second_title,
        headerType,
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
    });

    const [block, setBlock] = useState(false);
    const [blockWidth, getWidth] = useState(12);

    useEffect(() => {
        if (columnWidth == 'auto') {
            // todo add auto width detection?
            getWidth(12);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

    useEffect(() => {
        if (postData.length) {
            const attr = {
                option: moduleOption,
                length: excerptLength,
                elipsis: excerptEllipsis,
                date: {
                    type: metaDateType,
                    format: metaDateFormat,
                    custom: metaDateFormatCustom,
                }
            };
            const limit = postData.length < numberPost ? postData.length : numberPost;
            const content = postData.map((post, index) => {
                if (index < limit) {
                    return <article key={index} className="gvnews_post gvnews_pl_md_2">
                        <ContentModule title={true} meta={1} excerpt={true} read={true} post={post} attr={attr} />
                    </article>;
                }
            });
            setBlock(<div className={`gvnews_postblock_3 gvnews_postblock gvnews_module_hook gvnews_col_${blockWidth == 4 ? '1' : blockWidth == 8 ? '2' : '3'}o3 gvnews_postblock ${enableBoxed ? 'gvnews_pb_boxed' : ''}`}>
                <div className="gvnews_posts gvnews_block_container">
                    <div className="gvnews_post">
                        {content}
                    </div>
                </div>
            </div>);
        }
    }, [
        postData,
        moduleOption,
        blockWidth,
        excerptLength,
        excerptEllipsis,
        metaDateFormat,
        metaDateFormatCustom
    ]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps} ref={blockStyleRef}>
            <div className={`gvnews-raw-wrapper gvnews-editor ${enableBoxed ? 'gvnews_pb_boxed' : ''} ${enableBoxed && enableBoxShadow ? 'gvnews_pb_boxed_shadow' : ''}`}>
                <HeaderModule {...headerData} />
                {block ? block : <ModuleSkeleton />}
            </div>
        </div>
    </>;
});

export default RssBlock;
