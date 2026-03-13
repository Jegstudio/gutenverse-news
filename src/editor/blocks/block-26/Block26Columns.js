import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { RawHTML } from '@wordpress/element';
import { MetaModule3, MetaCategory, MetaAuthor, MetaComments} from '../../part/meta';

const Block26Columns = props => {
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
        overlayIconData = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;
    const PostTitleTag = postTitleHtmlTag;

    const RenderBlock1 = props=>{
        const {attr, post, index='x'} = props;
        return (
            <article className={`gvnews_post gvnews_pl_lg_9 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="gvnews_postblock_heading">
                    {<MetaCategory {...props} />}
                    {post.title && <PostTitleTag property="headline" className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </PostTitleTag>}
                    {attr.option && <MetaModule3 {...props}/>}
                </div>
                <ThumbModule size={500} cat={false} post={post} imageSize={imageSizeMain}  overlayIconData={overlayIconData} />
                <ContentModule title={false} excerpt={true} read={!readmoreButtonDisabled} post={post} attr={attr}/>
                <div className="gvnews_meta_footer">
                    {<MetaAuthor {...props} />}
                    {/* {blockWidth != 4 && <RawHTML key="html">{post.share}</RawHTML> } TODO: add social share icon on this module */}
                    {<MetaComments {...props} showText={true}/>}
                </div>
            </article>
        );
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
            }
        };

        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} />
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

export default Block26Columns;