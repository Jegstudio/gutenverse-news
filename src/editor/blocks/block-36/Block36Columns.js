import ThumbModule from '../../part/thumbnail';
import { ContentModule, PostExcerpt, PostTitle } from '../../part/post';
import { MetaModule1 } from "../../part/meta";

const Block36Columns = (props) => {
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
        imageSizeMain = {},
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = (props) => {
        const { post, attr, index = 'x' } = props;
        const { landscapeThumbnail } = post;
        if (landscapeThumbnail) {
            return (
                <article className={`gvnews_post gvnews_pl_md_5 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                    <div className="box_wrap">
                        <ThumbModule size={715} cat={true} post={post} imageSize={imageSizeMain} landscapeThumbnail={landscapeThumbnail} />
                        <ContentModule cat={false} title={true} meta={3} read={false} excerpt={true} post={post} attr={attr} />
                    </div>
                </article>
            );

        }
        return (
            <article className={`gvnews_post gvnews_pl_md_box format-standard ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="box_wrap">
                    <span className="gvnews_postformat_icon"></span>
                    <div className="gvnews_thumb" style={{ backgroundImage: `url(${post.thumbnail.url})` }}>
                        <div className="gvnews_post_category">
                            <span><a href='javascript:void(0);'>{post.category.name}</a></span>
                        </div>
                    </div>
                    <div className="gvnews_postblock_content">
                        {props.title && <PostTitle post={post} />}
                        <PostExcerpt post={post} attr={attr} />
                        <MetaModule1 post={post} attr={attr} />
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

export default Block36Columns;
