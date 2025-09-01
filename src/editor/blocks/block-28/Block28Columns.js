import { PostTitle } from '../../part/post';
import { MetaModule2 } from '../../part/meta';
import { withFormatName } from '../../utils/helper';

const Block28Columns = (props) => {
    const {
        postData,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        blockWidth,
        showDate,
        showDateFormat,
        showDateFormatCustom,
        numberPost,
        paginationPost = numberPost,
        page = 1,
        isLoadMore = false,
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = (props) => {
        const { index = 'x', post } = props;
        const className = withFormatName(
            `gvnews_post gvnews_pl_xs_4 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`,
            post
        );
        return (
            <article className={className}>
                <div className="gvnews_postblock_content">
                    <i className="fas fa-caret-right"></i>
                    <PostTitle {...props} />
                    {showDate ? <MetaModule2 {...props} /> : ''}
                </div>
            </article>
        );
    };

    const BuildColumn1 = () => {
        const attr = {
            option: {
                ...moduleOption,
                option: {
                    ...moduleOption.option,
                    date_format: 'default' === showDateFormat ? showDateFormatCustom : moduleOption.option.date_format,
                    meta_date: showDate,
                    meta_comment: false,
                    meta_author: false,
                },
            },
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
            <div className="gvnews_posts">
                <div className="gvnews_postsmall gvnews_load_more_flag">{rows}</div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block28Columns;
