import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { MetaCategory, MetaModule1 } from '../../part/meta';
import { useEffect, useRef, useCallback } from '@wordpress/element';
import Shuffle from 'shufflejs';

const Block32Columns = (props) => {

    const {
        postData,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        blockWidth,
        numberPost,
        paginationPost = numberPost,
        page = 1,
        isLoadMore = false,
        readmoreButtonDisabled = false,
        imageSizeMain = {},
        rowItemGap,
        gutterWidth,
        attributes,
        postTitleHtmlTag = 'h3',
    } = props;

    const shuffleInstance = useRef(null);

    const masonryRef = useCallback((node) => {
        if (node) {
            shuffleInstance.current = new Shuffle(node, {
                itemSelector: '.gvnews_post',
                gutterWidth: gutterWidth ? parseInt(gutterWidth) : 30,
                speed: 0
            });
        } else {
            shuffleInstance.current?.destroy();
            shuffleInstance.current = null;
        }
    }, []);

    const onImageLoad = useCallback(() => {
        if (shuffleInstance.current) {
            shuffleInstance.current.layout();
        }
    }, []);

    useEffect(() => {
        if (shuffleInstance.current) {
            shuffleInstance.current.options.gutterWidth = gutterWidth ? parseInt(gutterWidth) : 30;
            shuffleInstance.current.resetItems();
            shuffleInstance.current.update();
        }
    }, [
        blockWidth,
        attributes,
        gutterWidth,
        postData,
        rowItemGap
    ]);

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;
    const PostTitleTag = postTitleHtmlTag;

    const RenderBlock1 = (props) => {
        const { post, attr, index = 'x' } = props;
        return (
            <article className={`gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="box_wrap">
                    <header className="gvnews_postblock_heading">
                        {<MetaCategory {...props} />}
                        {post.title && (
                            <PostTitleTag className="gvnews_post_title">
                                <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                            </PostTitleTag>
                        )}
                    </header>
                    {post.thumbnail.url && <ThumbModule size={1000} cat={false} post={post} imageSize={imageSizeMain} onLoad={onImageLoad} />}
                    <ContentModule cat={false} title={false} read={!readmoreButtonDisabled} excerpt={true} post={post} attr={attr} />
                    {attr.option && <MetaModule1 {...props} />}
                </div>
            </article>
        );
    };

    const BuildColumn1 = () => {
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

        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={i} attr={attr} post={postData[i]} width={blockWidth} />);
            }
        }

        return (
            <div className="gvnews_posts_wrap gvnews_posts_masonry">
                <div ref={masonryRef} className={'gvnews_posts gvnews_load_more_flag'}>{rows}</div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block32Columns;