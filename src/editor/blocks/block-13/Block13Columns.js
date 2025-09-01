import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { withFormatName } from '../../utils/helper';

const Block13Columns = props => {
    const {postData, numberPost, paginationPost = numberPost, page = 1, isLoadMore = false, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth} = props;
    const postDataLen = postData.length;
    const loadValidAnim = postDataLen - paginationPost;

    const RenderBlock1 = props=>{
        const {post, attr, index = 'x'} = props;
        const block = [];
        if (1 == props.type) {
            block.push(
                <>
                    <ThumbModule size={715} cat={true} post={post}/>
                    <ContentModule title={true} meta={1} excerpt={true} read={true} post={post} attr={attr}/>
                </>
            );
        } else {
            const className = withFormatName(
                `gvnews_post gvnews_pl_md_1 ${isLoadMore && index >= loadValidAnim && index <= postDataLen && page > 1 ? `gvnews_ajax_loaded anim_${(index - loadValidAnim)}` : ''} ${!props?.post?.thumbnail?.url ? 'no_thumbnail' : ''}`,
                post
            );
            block.push(
                <div className={className}>
                    <ThumbModule size={715} cat={true} post={post}/>
                    <ContentModule title={true} meta={1} excerpt={true} read={true} post={post} attr={attr}/>
                </div>
            );
        }
        return block;
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format :metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };
        const rows = [];

        if (postData.length > 0) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
            }
        }
        const className = withFormatName('gvnews_post gvnews_pl_lg_1', postData[0]);
        return(
            <>
                <article className={className}>
                    <RenderBlock1 key={postData[0].id} attr={attr} type={1} post={postData[0]}/>
                </article>
                <div className="gvnews_posts_wrap">
                    <div className="gvnews_posts">
                        {rows}
                    </div>
                </div>
            </>
        );
    };

    const BuildColumn2 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };
        const rows = [];
        const rows2 = [];

        if (postData.length > 0) {
            for (let i = 1; i < postData.length; i++) {
                if ( i <= 2 ) {
                    rows.push(<RenderBlock1 index={0} key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                } else {
                    rows2.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                }
            }
        }
        const className = withFormatName('gvnews_post gvnews_pl_lg_1 col-sm-6', postData[0]);
        return(
            <>
                <div className="gvnews_posts gvnews-posts-row">
                    <article className={className}>
                        <ThumbModule size={1400} cat={true} post={postData[0]}/>
                        <ContentModule title={true} meta={1} excerpt={true} read={true} post={postData[0]} attr={attr}/>
                    </article>
                    <div className="gvnews_postsmall col-sm-6">
                        {rows}
                    </div>
                </div>
                <div className="gvnews_posts_wrap">
                    <div className="gvnews_posts">
                        {rows2}
                    </div>
                </div>
            </>
        );
    };

    const BuildColumn3 = ()=>{
        const attr = {
            option : moduleOption,
            length : excerptLength,
            elipsis : excerptEllipsis,
            date : {
                type : metaDateType,
                format : metaDateFormat,
                custom : metaDateFormatCustom,
            }
        };
        const rows = [];
        const rows2 = [];
        const rows3 = [];

        if (postData.length > 0) {
            for (let i = 1; i < postData.length; i++) {
                if ( i <= 2 ) {
                    rows.push(<RenderBlock1 index={0} key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                } else {
                    rows3.push(<RenderBlock1 index={i} key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                }
            }
        }
        const className = withFormatName('gvnews_post gvnews_pl_lg_1 col-sm-4', postData[0]);
        return(
            <>
                <div className="gvnews_posts gvnews-posts-row">
                    <article className={className}>
                        <ThumbModule size={1400} cat={true} post={postData[0]}/>
                        <ContentModule title={true} meta={1} excerpt={true} read={true} post={postData[0]} attr={attr}/>
                    </article>
                    <div className="gvnews_postsmall col-sm-4">
                        {rows}
                    </div>
                    <div className="gvnews_postsmall col-sm-4">
                        {rows2}
                    </div>
                </div>
                <div className="gvnews_posts_wrap">
                    <div className="gvnews_posts">
                        {rows3}
                    </div>
                </div>
            </>
        );
    };

    const RenderColumn = ()=>{
        if (blockWidth == 4) {
            return <BuildColumn1/>;
        } else if (blockWidth == 12) {
            return <BuildColumn3/>;
        } else {
            return <BuildColumn2/>;
        }
    };

    return  <RenderColumn/>;
};

export default Block13Columns;