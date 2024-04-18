
import { __ } from '@wordpress/i18n';
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block16Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_lg_5">
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={true} meta={1} excerpt={true} read={true} post={props.post} attr={props.attr}/>
            </article>
        );
    };

    const RenderBlock2 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_xs_2">
                <i className='fas fa-caret-right'></i>
                <ContentModule title={true} meta={false} excerpt={false} read={false} post={props.post} attr={props.attr}/>
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
            <div className="gvnews_posts_wrap">
                <div className="gvnews_postbig">
                    <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]}/>
                </div>
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return   <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block16Columns;