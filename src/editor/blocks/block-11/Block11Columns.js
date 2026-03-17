import ThumbModule from '../../part/thumbnail';
import { MetaModule3, MetaCategory } from '../../part/meta';

const Block11Columns = props => {
    const {
        postData,
        numberPost,
        paginationPost = numberPost,
        page,
        isLoadMore = false,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        imageSizeMain = {},
        postTitleHtmlTag = 'h3',
        overlayIconData = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;
    const PostTitleTag = postTitleHtmlTag;

    const RenderBlock1 = props=>{
        const { index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_md_card ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''}`}>
                <div className="gvnews_inner_post">
                    <ThumbModule size={715} cat={false} post={props.post} imageSize={imageSizeMain} overlayIconData={overlayIconData} />
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <PostTitleTag className="gvnews_post_title">
                            <a>{props.post.title && props.post.title.replace(/&#8217;/g, '\'')}</a>
                        </PostTitleTag>
                        {props.attr.option && !props.attr.option.meta_show && <MetaModule3 {...props}/>}
                    </div>
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

    return <BuildColumn1/>;
};

export default Block11Columns;