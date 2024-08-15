
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block1Columns = props => {
    const {postData, moduleOption, blockWidth, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        return (
            <React.Fragment>
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={props.post} attr={props.attr}/>
            </React.Fragment>
        );
    };

    const RenderBlock2 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_sm">
                <ThumbModule size={715} cat={false} post={props.post}/>
                <ContentModule title={true} meta={2} excerpt={false} read={false} post={props.post} attr={props.attr}/>
            </article>
        );
    };

    const RenderBlock3 = props=>{
        return(
            <article className="gvnews_post gvnews_pl_xs_2">
                <i className='fas fa-caret-right'></i>
                <div className="gvnews_postblock_content">
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={props.post} attr={props.attr}/>
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
            }
        };
        const rows = [];

        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts">
                <article className="gvnews_post gvnews_pl_lg_1">
                    {postData && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>}
                </article>
                <div className="gvnews_postsmall">
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
            }
        };
        const rows = [];
        if (postData) {
            for (let i = 1; i < postData.length; i++) {
                rows.push(<RenderBlock2 key={postData[i]} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className={'gvnews_posts gvnews-posts-row'}>
                <article className={'gvnews_post gvnews_pl_lg_1 col-sm-6'}>
                    {postData && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>}
                </article>
                <div className={'gvnews_postsmall col-sm-6'}>
                    {rows}
                </div>
            </div>
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

        if (postData) {
            let limit =  Math.ceil( ( postData.length - 1 ) * 2 / 5) + 1;
            for (let i = 1; i < limit; i++) {
                rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
            for (let i = limit; i < postData.length; i++) {
                rows2.push(<RenderBlock3 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }
        return(
            <div className="gvnews_posts gvnews-posts-row">
                <article className="gvnews_post gvnews_pl_lg_1 col-sm-4">
                    {postData && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>}
                </article>
                <div className="gvnews_postsmall col-sm-4">
                    {rows}
                </div>
                <div className="gvnews_postsmall col-sm-4">
                    {rows2}
                </div>
            </div>
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

    return   <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <RenderColumn />: postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block1Columns;