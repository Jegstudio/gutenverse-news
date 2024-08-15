import { Fragment }  from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block2Columns = props => {
    const {postData, moduleOption, blockWidth, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        return (
            <Fragment>
                <ThumbModule size={715} cat={true} post={props.post}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={props.post} attr={props.attr}/>
            </Fragment>
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
                rows.push(<RenderBlock2 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className={'gvnews_block_container'}>
                <article className={'gvnews_post gvnews_pl_lg_2'}>
                    {postData && <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>}
                </article>
                <div className={'gvnews_posts_wrap'}>
                    <div className="gvnews_posts gvnews_load_more_flag">
                        {rows}
                    </div>
                </div>
            </div>
        );
    };

    const RenderColumn = ()=>{
        if (blockWidth == 4) {
            return <BuildColumn1/>;
        } else if (blockWidth == 12) {
            return <BuildColumn2/>;
        } else {
            return <BuildColumn2/>;
        }
    };

    return <Fragment>
        { postData ? <RenderColumn/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </Fragment>;
};

export default Block2Columns;