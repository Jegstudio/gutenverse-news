
import { __ } from '@wordpress/i18n';
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block13Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;
    const RenderBlock1 = props=>{
        const {post, attr} = props;
        const block = [];
        if (1 == props.type) {
            block.push(
                <React.Fragment>
                    <ThumbModule size={715} cat={true} post={post}/>
                    <ContentModule title={true} meta={1} excerpt={true} read={true} post={post} attr={attr}/>
                </React.Fragment>
            );
        } else {
            block.push(
                <div className="gvnews_post gvnews_pl_md_1">
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

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
            }
        }

        return(
            <Fragment>
                <article className="gvnews_post gvnews_pl_lg_1">
                    <RenderBlock1 key={postData[0].id} attr={attr} type={1} post={postData[0]}/>
                </article>
                <div className="gvnews_posts_wrap">
                    <div className="gvnews_posts">
                        {rows}
                    </div>
                </div>
            </Fragment>
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

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                if ( i <= 2 ) {
                    rows.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                } else {
                    rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                }
            }
        }

        return(
            <React.Fragment>
                <div className="gvnews_posts gvnews-posts-row">
                    <article className="gvnews_post gvnews_pl_lg_1 col-sm-6">
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
            </React.Fragment>
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

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                if ( i <= 2 ) {
                    rows.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                } else if ( i <= 4 ) {
                    rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                } else {
                    rows3.push(<RenderBlock1 key={postData[i].id} attr={attr} type={2} post={postData[i]}/>);
                }
            }
        }

        return(
            <React.Fragment>
                <div className="gvnews_posts gvnews-posts-row">
                    <article className="gvnews_post gvnews_pl_lg_1 col-sm-4">
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
            </React.Fragment>
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

    return  <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <RenderColumn/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block13Columns;