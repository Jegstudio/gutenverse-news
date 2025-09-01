import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { withFormatName } from '../../utils/helper';

const Block5Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const { post, index = 'x' } = props;
        const className = withFormatName(
            `gvnews_post gvnews_pl_lg_2 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`,
            post
        );
        return (
            <article className={className}>
                <ThumbModule size={715} cat={true} post={post}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={post} attr={props.attr}/>
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
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    return <BuildColumn1/>;
};

export default Block5Columns;