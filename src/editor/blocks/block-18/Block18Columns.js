
import { MetaModule1 } from '../../part/meta';

const Block18Columns = props => {
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
        imageSizeMain = {},
        blockWidth
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props => {
        const { post, attr, index = 'x' } = props;
        const thumb = post.thumbnail.url ? { src: post.thumbnail.url } : null;
        const size = imageSizeMain.dimension ? imageSizeMain.dimension : '715';

        return (
            <article className={`gvnews_post gvnews_pl_lg_8 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="gvnews_postblock_heading">
                    <h3 className="gvnews_post_title">
                        <a>{post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                </div>
                <div className="gvnews_postblock_content">
                    <div className="gvnews_thumb">
                        <a>
                            <div className={[`thumbnail-container size-${size}`]}>
                                <img
                                    {...thumb}
                                    style={{
                                        'objectFit': 'cover',
                                        'verticalAlign': 'middle',
                                        'maxHeight': '100%',
                                        'maxWidth': '100%'
                                    }}
                                    className="lazyloaded"
                                    height={imageSizeMain.height}
                                    width={imageSizeMain.width}
                                />
                                <div className="gvnews-thumb-overlay"></div>
                            </div>
                        </a>
                    </div>
                    {attr.option && !attr.option.meta_show && <MetaModule1 {...props} />}
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
                {rows}
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block18Columns;