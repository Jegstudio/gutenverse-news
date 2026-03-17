import ThumbModule from '../../part/thumbnail';
import { ContentModule, PostTitle } from '../../part/post';
import { renderIcon } from 'gutenverse-core/helper';

const Block24Columns = props => {
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
        blockWidth,
        listIcon = '',
        listIconType = 'icon',
        listIconSVG = '',
        imageSizeMain = {},
        postTitleHtmlTag = 'h3',
        overlayIconData = {}
    } = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post} = props;
        return (
            <article className={`gvnews_post gvnews_pl_md_box ${!post.thumbnail.url && 'no_thumbnail'}`}>
                <div className="box_wrap">
                    <ThumbModule size={715} cat={false} post={post} imageSize={imageSizeMain}  overlayIconData={overlayIconData} />
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={props.attr}/>
                </div>
            </article>
        );
    };

    const RenderBlock2 = props=>{
        const {index='x'} = props;
        const finalListIcon = (listIconType === 'svg' && !listIconSVG) ? '' : listIcon;
        return (
            <article className={`gvnews_post gvnews_pl_xs_4 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''}`}>
                <div className="gvnews_postblock_content">
                    {renderIcon(finalListIcon, listIconType, listIconSVG)}
                    {props.post.title && <PostTitle post={props.post} attr={props.attr}/>}
                </div>
            </article>
        );
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];

        if (postData.length > 0) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                {postData.length > 0 ? <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/> : null}
                <div className="gvnews_postsmall gvnews_load_more_flag">
                    {rows}
                </div>
            </div>
        );
    };

    const BuildColumn2 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];
        const rows2 = [];

        const postDataLength = postData.length;

        if (postDataLength > 0) {
            const limit = postDataLength > 2 ? 2 : postDataLength;
            for (let i = 0; i < limit ; i++) {
                rows.push(<RenderBlock1 index={0} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        if(postDataLength>2){
            for (let i = 2; i < postDataLength; i++) {
                rows.push(<RenderBlock2 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className={'gvnews_posts'}>
                {rows}
                {rows2}
            </div>
        );
    };

    const BuildColumn3 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            },
            titleTag: postTitleHtmlTag
        };
        const rows = [];
        const rows2 = [];

        const postDataLength = postData.length;

        if (postDataLength > 0) {
            const limit = postDataLength > 3 ? 3 : postDataLength;
            for (let i = 0; i < limit ; i++) {
                rows.push(<RenderBlock1 index={0} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        if(postDataLength>3){
            for (let i = 3; i < postDataLength; i++) {
                rows.push(<RenderBlock2 index={i} key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className={'gvnews_posts gvnews_load_more_flag'}>
                {rows}
                {rows2}
            </div>
        );
    };

    const RenderColumn = ()=>{
        if (blockWidth == 4) {
            return <BuildColumn1/>;
        } else if (blockWidth == 8) {
            return <BuildColumn2/>;
        } else {
            return <BuildColumn3/>;
        }
    };

    return <RenderColumn/>;
};

export default Block24Columns;