import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';

const Block2Columns = props => {
    const {
        postData,
        numberPost,
        paginationPost = numberPost,
        page,
        isLoadMore = false,
        moduleOption,
        blockWidth,
        excerptLength,
        excerptEllipsis,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        imageSizeMain = {},
        imageSizeSecond = {},
        readmoreButtonDisabled = false,
        postTitleHtmlTag = 'h3',
        overlayIconData = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props => {
        return (
            <>
                <ThumbModule size={715} cat={true} post={props.post} imageSize={imageSizeMain} overlayIconData={overlayIconData} />
                <ContentModule title={true} meta={1} excerpt={true} read={!readmoreButtonDisabled} post={props.post} attr={props.attr}/>
            </>
        );
    };

    const RenderBlock2 = props => {
        const { index = 'x' } = props;
        return (
            <article className={`gvnews_post gvnews_pl_sm ${isLoadMore && index > loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''}`}>
                <ThumbModule size={715} cat={false} post={props.post} imageSize={imageSizeSecond} overlayIconData={overlayIconData} />
                <ContentModule title={true} meta={2} excerpt={false} read={false} post={props.post} attr={props.attr} />
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
                custom: metaDateFormatCustom
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 key={postData[i].id} index={i + 1} attr={attr} post={postData[i]} />);
            }
        }

        return (
            <>
                <article className="gvnews_post gvnews_pl_lg_1">
                    {postData.length > 0 && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} />}
                </article>
                <div className="gvnews_postsmall">
                    <div className="gvnews_posts">
                        {rows}
                    </div>
                </div>
            </>
        );
    };

    const BuildColumn2 = () => {
        const attr = {
            option: moduleOption,
            length: excerptLength,
            elipsis: excerptEllipsis,
            date: {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 key={postData[i].id} index={i + 1} attr={attr} post={postData[i]} imageSize={imageSizeSecond} />);
            }
        }

        return (
            <>
                <article className="gvnews_post gvnews_pl_lg_2">
                    {postData.length > 0 && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} imageSize={imageSizeMain} />}
                </article>
                <div className="gvnews_posts_wrap">
                    <div className="gvnews_posts">
                        {rows}
                    </div>
                </div>
            </>
        );
    };

    const RenderColumn = () => {
        if (blockWidth == 4) {
            return <BuildColumn1 />;
        } else if (blockWidth == 12) {
            return <BuildColumn2 />;
        } else {
            return <BuildColumn2 />;
        }
    };

    return <RenderColumn />;
};

export default Block2Columns;
