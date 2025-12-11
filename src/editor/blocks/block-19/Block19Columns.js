import { MetaModule2} from '../../part/meta';
import ThumbModule from '../../part/thumbnail';

const Block19Columns = props => {
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
        renderedImageSizeMain = {},
        renderedImageSizeSecond = {},
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {attr, post, index = 'x'} = props;

        let PostMeta = ({imageSize}) => (
            <>
                <ThumbModule size={715} cat={false} post={post} imageSize={imageSize}/>
                <div className="gvnews_postblock_content">
                    <h3 className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                    {attr.option && !attr.option.meta_show && <MetaModule2 {...props}/>}
                </div>
            </>
        );

        if (1==props.type){
            return (
                <article className={`gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''} gvnews_pl_md_box`}>
                    <div className="box_wrap">
                        <PostMeta imageSize={renderedImageSizeMain}/>
                    </div>
                </article>
            );
        }else{
            return (
                <article className={`gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''} gvnews_pl_sm`}>
                    <PostMeta imageSize={renderedImageSizeSecond}/>
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
            }
        };
        const rows = [];
        if (postData.length > 0) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                {postData.length > 0 ? <RenderBlock1 index={0} key={postData[0].id} attr={attr} post={postData[0]} type={1}/> : null}
                <div className="gvnews_postsmall">
                    {rows}
                </div>
            </div>
        );
    };

    const BuildColumn2 = ()=>{
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
        let limit = blockWidth == 8 ? 2 : 3;

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                if (i < limit){
                    rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} type={1}/>);
                }else{
                    rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }
            }
        }

        return(
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    const RenderColumn = ()=>{
        return blockWidth == 4 ? <BuildColumn1/> : <BuildColumn2/>;
    };

    return <RenderColumn/>;
};

export default Block19Columns;