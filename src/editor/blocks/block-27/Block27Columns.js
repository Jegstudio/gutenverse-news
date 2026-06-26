import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';

const Block27Columns = props => {
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
        readmoreButtonDisabled = false,
        imageSizeMain = {},
        postTitleHtmlTag = 'h3',
        alwaysShowExcerpt = false,
        overlayIconData = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;
    const excerpt = blockWidth === '4' ? (false || alwaysShowExcerpt) : true;

    const RenderBlock1 = props=>{
        const {post, attr, index = 'x'} = props;
        return  <article className={`gvnews_post gvnews_pl_md_4 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
            <ThumbModule size={715} cat={false} post={post} imageSize={imageSizeMain}  overlayIconData={overlayIconData} />
            <ContentModule title={true} cat={true} meta={3} excerpt={excerpt} read={!readmoreButtonDisabled && excerpt} post={post} attr={attr}/>
        </article>;
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
            },
            titleTag: postTitleHtmlTag
        };

        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} width={blockWidth} />
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

export default Block27Columns;