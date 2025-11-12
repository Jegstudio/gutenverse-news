import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';

const Block30Columns = (props) => {
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
            <article className={`gvnews_post gvnews_pl_lg_7 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <ThumbModule cat={true} size={715} post={post} imageSize={renderedImageSizeMain} />
                <ContentModule meta={3} title={true} excerpt={true} read={!readmoreButtonDisabled} post={post} attr={attr} />
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

        return <div className={'gvnews_posts gvnews_load_more_flag'}>{rows}</div>;
    };

    return <BuildColumn1 />;
};

export default Block30Columns;
