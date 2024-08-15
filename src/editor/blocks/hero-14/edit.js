import { compose } from '@wordpress/compose';
import { useEffect, useState }  from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const Hero14Block = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        isSelected,
        setElementRef
    } = props;

    const {
        elementId,
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

    const [moduleOption, setModuleOption] = useState(false);
    const [postBulk, getPost] = useState(false);
    const [blockWidth, getWidth] = useState(8);
    const [postData, getTrim] = useState(false);
    const [loadPost, loadMore] = useState(15);
    const [postCount, setPostCount] = useState(0);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        let off = !isNaN(parseInt(postOffset)) ? parseInt(postOffset) : 0;
        let num = parseInt(8);
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
    }, [numberPost, postBulk, postOffset]);

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
            // todo add auto width detection?
            getWidth(12);
        } else {
            getWidth(columnWidth);
        }
    }, [columnWidth]);

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
                attr: attr,
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
        loadPost,
    ]);

    const blockProps = useBlockProps({
        className: classnames('gvnews-block',
            'gvnews-block-wrapper', 'gvnews-hero-14', elementId, animationClass, displayClass),
        ref: blockStyleRef
    });

    const moduleData = {
        blockWidth,
        excerptLength,
        excerptEllipsis,
        moduleOption,
        postData,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
    };

    function RenderBlock1(props) {
        return (
            <article className={'gvnews_post gvnews_pl_lg_7'}>
                <ThumbModule cat={true} size={715} post={props.post} />
                <ContentModule meta={3} title={true} excerpt={true} read={true} post={props.post} attr={props.attr} />
            </article>
        );
    }

    function RenderBlock2(props) {
        return (
            <article className={'gvnews_post gvnews_pl_sm_2'}>
                <ContentModule cat={true} meta={2} title={true} post={props.post} attr={props.attr} />
            </article>
        );
    }

    function RenderBlock3(props) {
        return (
            <article className={'gvnews_post gvnews_pl_md_box'}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={false} post={props.post} />
                    <ContentModule cat={false} meta={2} title={true} read={false} excerpt={false} post={props.post} attr={props.attr} />
                </div>
            </article>
        );
    }

    function BuildColumn3(props) {
        const attr = {
            option: props.moduleOption,
            length: props.excerptLength,
            elipsis: props.excerptEllipsis,
            date: {
                type: props.metaDateType,
                format: props.metaDateFormat,
                custom: props.metaDateFormatCustom,
            },
        };

        const rows = [];
        const rows2 = [];

        if (props.postData) {
            for (let i = 1; i < props.postData.length; i++) {
                if (i < 5) {
                    rows.push(<RenderBlock2 attr={attr} post={props.postData[i]} />);
                } else {
                    rows2.push(<RenderBlock3 attr={attr} post={props.postData[i]} />);
                }
            }
        }
        return (
            <>
                <div className="gvnews_postbig">{props.postData && <RenderBlock1 attr={attr} post={props.postData[0]} />}</div>
                <div className="gvnews_postsmall left">{rows}</div>
                <div className="gvnews_postsmall right">{rows2}</div>
            </>
        );
    }

    function RenderColumn(props) {
        return <BuildColumn3 {...props} />;
    }

    const [block, setBlock] = useState(false);
    useEffect(() => {
        setBlock(
            <>
                {postData ? (
                    <RenderColumn {...moduleData} />
                ) : postBulk ? (
                    <div className="gvnews_empty_module">{moduleOption.string.no_content}</div>
                ) : (
                    <ModuleSkeleton />
                )}
                {overlay && <ModuleOverlay />}
            </>
        );
    }, [blockWidth, moduleOption, postData, metaDateType, metaDateFormat, metaDateFormatCustom, overlay]);

    return (
        <>
            <PanelController panelList={panelList} {...props} />
            <div {...blockProps}>
                <div className="gvnews-raw-wrapper gvnews-editor">
                    <div className={'gvnews_heropost gvnews_heropost_14 gvnews_heropost_1 gvnews_postblock'}>
                        <div className="gvnews-element-overlay" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}></div>
                        {block ? block : 'loading'}
                    </div>
                </div>
            </div>
        </>
    );
});

export default Hero14Block;
