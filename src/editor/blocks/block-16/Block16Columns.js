import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';

const Block16Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page = 1, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_lg_5">
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={props.post} attr={props.attr}/>
            </article>
        );
    };

    const RenderBlock2 = props=>{
        const { index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_xs_2 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <i className="fas fa-caret-right"></i>
                <ContentModule title={true} meta={false} excerpt={false} read={false} post={props.post} attr={props.attr}/>
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
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts_wrap">
                <div className="gvnews_postbig">
                    <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>
                </div>
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return <BuildColumn1/>;
};

export default Block16Columns;