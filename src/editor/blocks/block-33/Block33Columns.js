import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';

const Block33Columns = (props) => {
    const {
        postData,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        blockWidth,
        numberPost,
        paginationPost = numberPost,
        page = 1,
        isLoadMore = false,
        readmoreButtonDisabled = false,
        renderedImageSizeMain,
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = (props) => {
        const { post, attr, index = 'x' } = props;
        return (
            <article className={`gvnews_post ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="box_wrap">
                    <ThumbModule size={1000} cat={true} post={post} imageSize={renderedImageSizeMain} />
                    <ContentModule cat={false} meta={2} title={true} read={!readmoreButtonDisabled} excerpt={true} post={post} attr={attr} />
                </div>
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
            },
        };

        const rows = [];

        if (postData.length > 0) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={i} attr={attr} post={postData[i]} width={blockWidth} />);
            }
        }

        return (
            <div className="gvnews_posts_wrap gvnews_posts_masonry">
                <div className={'gvnews_posts gvnews_load_more_flag'}>{rows}</div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block33Columns;
