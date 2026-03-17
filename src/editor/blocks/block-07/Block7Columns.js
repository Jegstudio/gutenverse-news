import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { applyFilters } from '@wordpress/hooks';

const Block7Columns = props => {
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
        readmoreButtonDisabled = false,
        postTitleHtmlTag = 'h3',
        overlayIconData = {},
        adsSettings = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;
    const PostTitleTag = postTitleHtmlTag;

    const RenderBlock1 = props => {
        const { index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_lg_6 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <PostTitleTag property="headline" className="gvnews_post_title">
                    <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                </PostTitleTag>
                <ThumbModule size={500} cat={false} post={props.post} imageSize={imageSizeMain} overlayIconData={overlayIconData} />
                <ContentModule title={false} meta={1} excerpt={true} read={!readmoreButtonDisabled} post={props.post} attr={props.attr} />
            </article>
        );
    };

    const BuildColumn1 = () => {
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
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} post={postData[i]} />);
            }
        }

        return (
            <div className="gvnews_posts">
                {applyFilters(
                    'gutenverse-news.modules.render',
                    rows,
                    ({ children }) => <article className="gvnews_post gvnews_pl_lg_6">{children}</article>,
                    adsSettings
                )}
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block7Columns;