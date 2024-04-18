
import { __ } from '@wordpress/i18n';
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block20Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        if (1==props.type){
            return (
                <article className="gvnews_post gvnews_pl_sm">
                    <ThumbModule size={715} cat={false} post={post}/>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
                </article>
            );
        }else{
            return (
                <article className="gvnews_post gvnews_pl_xs">
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
                </article>
            );
        }
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
        let limit = blockWidth == 8 ? 2 : 3;
        let start = blockWidth == 4 ? 1 : 0;
        const rows = <RenderBlock1 key={postData[0].id} attr={attr} post={postData[0]} type={1}/>;
        const rows2 = [];
        if (postData) {
            for (let i = start; i < postData.length; i++) {
                if (blockWidth == 4) {
                    rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }else{
                    i < limit ? rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={1}/>) : rows2.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} type={2}/>);
                }
            }
        }

        if (blockWidth == 4){
            return(
                <div className="gvnews_posts">
                    {rows}
                    <div className="gvnews_postsmall">
                        {rows2}
                    </div>
                </div>
            );
        } else {
            return(
                <div className="gvnews_postsmall">
                    {rows2}
                </div>
            );
        }

    };

    return  <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block20Columns;