import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { withFormatName } from '../../utils/helper';

const Block8Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page, isLoadMore = false,  moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const { index = 'x', post } = props;
        const className = withFormatName(
            `gvnews_post gvnews_pl_md_1 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`,
            post
        );
        return (
            <article className={className}>
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={true} meta={3} excerpt={false} read={false} post={post} attr={props.attr}/>
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

    return  <BuildColumn1/>;
};

export default Block8Columns;