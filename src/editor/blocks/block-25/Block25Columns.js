import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { MetaModule1 } from '../../part/meta';
import { withFormatName } from '../../utils/helper';

const Block25Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page = 1, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr, index = 'x'} = props;
        const className = withFormatName(
            `gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`,
            post
        );
        return (
            <article className={className}>
                <div className="gvnews_postblock_heading">
                    {post.title && <h3 property="headline" className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>}
                    {attr.option && <MetaModule1 {...props}/>}
                </div>
                <ThumbModule size={500} cat={false} post={post}/>
                <ContentModule title={false} excerpt={true} read={true} post={post} attr={attr}/>
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
                rows.push(
                    <RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>
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

export default Block25Columns;
