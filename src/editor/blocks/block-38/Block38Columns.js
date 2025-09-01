import { PostExcerpt, PostTitle } from '../../part/post';
import { MetaCategory, MetaModule3 } from '../../part/meta';
import { withFormatName } from '../../utils/helper';

const Block38Columns = (props) => {
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
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = (props) => {
        const { post, attr, index = 'x' } = props;
        const className = withFormatName(
            `gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`,
            post
        );
        return (
            <article className={className}>
                <div className="gvnews_thumb" style={{ backgroundImage: `url(${post.thumbnail.url})` }}></div>
                <div className="box_wrap">
                    <MetaCategory {...props} />
                    <div className="gvnews_postblock_content">
                        {post.title && <PostTitle post={post} />}
                        {post.excerpt && <PostExcerpt post={post} attr={attr} />}
                        {attr.option && <MetaModule3 {...props} />}
                    </div>
                    <div className="gvnews_readmore_arrow">
                        <a>
                            <i className="fa fa-long-arrow-right"></i>
                        </a>
                    </div>
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
            },
        };

        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={i} attr={attr} post={postData[i]} width={blockWidth} />);
            }
        }

        return (
            <div className="gvnews_posts_wrap">
                <div className={'gvnews_posts gvnews_load_more_flag'}>{rows}</div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block38Columns;
