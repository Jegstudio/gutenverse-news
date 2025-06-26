import { ContentModule } from '../../part/post';

const Block29Columns = (props) => {
    const {
        postData,
        moduleOption,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        blockWidth,
        showBorder,
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
        const { post, attr, index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_xs ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <ContentModule meta={showDate ? 2 : false} title={true} post={post} attr={attr} />
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
        const border = showBorder ? 'show_border' : '';
        return (
            <div className={'gvnews_posts ' + border}>
                <div className="gvnews_postsmall gvnews_load_more_flag">{rows}</div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block29Columns;
