
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { withFormatName } from '../../utils/helper';

const Block21Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page = 1, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <>
                {<ThumbModule size={715} cat={false} post={post} />}
                <ContentModule
                    title={true}
                    meta={2}
                    excerpt={false}
                    post={post}
                    attr={attr}
                />
            </>
        );
    };

    const  BuildColumn1 = ()=>{
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
                const className = withFormatName(
                    `gvnews_post gvnews_pl_sm ${isLoadMore && i >= loadValidAnim && i <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(i - loadValidAnim)}` : ''} ${!postData[i].thumbnail.url && 'no_thumbnail'}`,
                    postData[i]
                );
                rows.push(
                    <article
                        key={postData[i].id}
                        className={className}
                    >
                        <RenderBlock1 attr={attr} post={postData[i]} />
                    </article>
                );
            }
        }

        return <div className="gvnews_posts">{rows}</div>;
    };

    return <BuildColumn1 {...props} />;
};

export default Block21Columns;
