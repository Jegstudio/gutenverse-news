import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';

const Block15Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page = 1, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormatCustom, metaDateFormat} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr, index = 'x'} = props;
        return (
            <article className={`gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!post?.thumbnail?.url ? 'no_thumbnail' : '' } gvnews_pl_md_box`}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={true} post={post}/>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
                </div>
            </article>
        );
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };
        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts_wrap">
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return <BuildColumn1 {...props}/>;
};

export default Block15Columns;