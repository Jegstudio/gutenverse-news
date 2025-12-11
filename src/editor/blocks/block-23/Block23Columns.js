import ThumbModule from '../../part/thumbnail';
import { MetaModule3 } from '../../part/meta';
import { PostTitle, PostExcerpt } from '../../part/post';

const Block23Columns = props => {
    const {
        postData,
        numberPost,
        paginationPost = numberPost,
        page = 1,
        isLoadMore = false,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        renderedImageSizeMain,
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <>
                <ThumbModule size={715} cat={true} post={post} imageSize={renderedImageSizeMain} />
                <div className="gvnews_postblock_content">
                    {post.title && <PostTitle post={post} />}
                    {post.excerpt && <PostExcerpt post={post} attr={attr}/>}
                    {attr.option && <MetaModule3 {...props} />}
                </div>
            </>
        );
    };

    const BuildColumn1 = ()=>{
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
                rows.push(
                    <article key={postData[i].id} className={`gvnews_post ${isLoadMore && i >= loadValidAnim && i <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(i - loadValidAnim)}` : ''} ${!postData[i]?.thumbnail?.url ? 'no_thumbnail' : ''} gvnews_pl_md_1`}>
                        <RenderBlock1 attr={attr} post={postData[i]}/>
                    </article>
                );
            }
        }

        return(
            <div className="gvnews_posts gvnews_load_more_flag">
                {rows}
            </div>
        );
    };

    return <BuildColumn1/>;
};

export default Block23Columns;
