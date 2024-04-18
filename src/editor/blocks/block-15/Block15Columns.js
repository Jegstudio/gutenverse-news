
import { __ } from '@wordpress/i18n';
import { ContentModule } from '../../part/post';
import ThumbModule from '../../part/thumbnail';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block15Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormatCustom, metaDateFormat, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return (
            <article className="gvnews_post gvnews_pl_md_box">
                <div className="box_wrap">
                    <ThumbModule size={715} cat={true} post={post}/>
                    <ContentModule title={true} meta={2} excerpt={false} read={false} post={post} attr={attr}/>
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
            for (let i = 0; i < postData.length; i++) {
                rows.push(<RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]}/>);
            }
        }

        return(
            <div className="gvnews_posts_wrap">
                <div className="gvnews_posts">
                    {rows}
                </div>
            </div>
        );
    };

    return <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1 {...props}/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block15Columns;