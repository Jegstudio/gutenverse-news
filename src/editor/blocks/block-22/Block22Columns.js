import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';

const Block22Columns = props => {
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
        imageSizeMain = {},
        postTitleHtmlTag = 'h3',
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <>
                <ThumbModule size={715} cat={true} post={post} imageSize={imageSizeMain} />
                <ContentModule title={true} meta={2} excerpt={false} post={post} attr={attr}/>
            </>
        );
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option: moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <article key={postData[i].id} className={`gvnews_post gvnews_pl_md_5 ${isLoadMore && i >= loadValidAnim && i <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(i - loadValidAnim)}` : ''}`}>
                        <RenderBlock1 attr={attr} post={postData[i]}/>
                    </article>
                );
            }
        }

        return(
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    return <BuildColumn1/>;
};

export default Block22Columns;
