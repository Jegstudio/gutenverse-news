import { PostTitle } from '../../part/post';
import { MetaModule2 } from '../../part/meta';
import { renderIcon } from 'gutenverse-core/helper';

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
        numberPost,
        paginationPost = numberPost,
        page = 1,
        isLoadMore = false,
        listIcon = '',
        listIconType = 'icon',
        listIconSVG = ''
    } = props;

    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = (props) => {
        const { index = 'x' } = props;
        const finalListIcon = (listIconType === 'svg' && !listIconSVG) ? '' : listIcon;
        return (
            <article className={`gvnews_post gvnews_pl_xs_4 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="gvnews_postblock_content">
                    {renderIcon(finalListIcon, listIconType, listIconSVG)}
                    <PostTitle {...props} />
                    <MetaModule2 {...props} />
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
