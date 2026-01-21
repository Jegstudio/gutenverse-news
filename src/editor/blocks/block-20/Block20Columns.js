import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';

const Block20Columns = props => {
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
        blockWidth,
        imageSizeMain = {},
        postTitleHtmlTag = 'h3',
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr, index = 'x'} = props;
        if (1==props.type){
            return (
                <article className={`gvnews_post ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''} gvnews_pl_sm`}>
                    <ThumbModule size={715} cat={false} post={post} imageSize={imageSizeMain}/>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
                </article>
            );
        }else{
            return (
                <article className={`gvnews_post gvnews_pl_xs ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
                </article>
            );
        }
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
            },
            titleTag: postTitleHtmlTag
        };
        let limit = blockWidth == 8 ? 2 : 3;
        let start = blockWidth == 4 ? 1 : 0;
        const rows = <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} type={1}/>;
        const rows2 = [];
        if (postData.length > 0) {
            for (let i = start; i < postData.length; i++) {
                if (blockWidth == 4) {
                    rows2.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }else{
                    i < limit ? rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={1}/>) : rows2.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }
            }
        }

        if (blockWidth == 4){
            return(
                <div className="gvnews_posts">
                    {rows}
                    <div className="gvnews_postsmall">
                        {rows2}
                    </div>
                </div>
            );
        } else {
            return(
                <div className="gvnews_postsmall">
                    {rows2}
                </div>
            );
        }

    };

    return <BuildColumn1/>;
};

export default Block20Columns;