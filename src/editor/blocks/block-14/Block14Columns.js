
import ThumbModule from '../../part/thumbnail';
import { MetaModule3, MetaCategory } from '../../part/meta';
import { Fragment } from '@wordpress/element';

const Block14Columns = props => {
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
        imageSizeSecond = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props => {
        const { attr, post, index = 'x' } = props;
        const block = [];
        if (1 === props.type) {
            block.push(
                <Fragment key={post.id} >
                    <ThumbModule size={500} cat={false} post={post} imageSize={props.imageSize} />
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <h3 className="gvnews_post_title">
                            <a>{post.title && post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        {attr.option && !attr.option.meta_show && <MetaModule3 {...props} />}
                    </div>
                </Fragment>
            );
        } else {
            block.push(
                <article key={post.id} className={`gvnews_post gvnews_pl_md_1 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                    <ThumbModule size={500} cat={false} post={post} imageSize={props.imageSize} />
                    <div className="gvnews_postblock_content">
                        {<MetaCategory {...props} />}
                        <h3 className="gvnews_post_title">
                            <a>{post.title && post.title.replace(/&#8217;/g, '\'')}</a>
                        </h3>
                        {attr.option && !attr.option.meta_show && <MetaModule3 {...props} />}
                    </div>
                </article>
            );
        }
        return block;
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
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} type={2} post={postData[i]} imageSize={imageSizeSecond} />);
            }
        }

        return (
            <div className="gvnews_posts_wrap">
                <div className="gvnews_postbig">
                    <article className="gvnews_post gvnews_pl_lg_box">
                        <div className="box_wrap">
                            <RenderBlock1 key={postData[0].id} attr={attr} type={postData[0].id} post={postData[0]} imageSize={imageSizeMain} />
                        </div>
                    </article>
                </div>
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return <BuildColumn1 />;
};

export default Block14Columns;