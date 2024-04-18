
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block27Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, blockWidth, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        const {post, attr} = props;
        return  <article className={'gvnews_post gvnews_pl_md_4'}>
            <ThumbModule size={715} cat={false} post={post}/>
            <ContentModule title={true} cat={true} meta={3} excerpt={true} read={true} post={post} attr={attr}/>
        </article>;
    };

    const BuildColumn1 = ()=>{
        const attr = {
            option: moduleOption,
            length: excerptLength,
            elipsis: excerptEllipsis,
            date: {
                type: metaDateType,
                format: metaDateFormat,
                custom: metaDateFormatCustom,
            }
        };

        const rows = [];

        if (postData) {
            for (let i = 0; i < postData.length; i++) {
                rows.push(
                    <RenderBlock1 key={postData[i].id} attr={attr} post={postData[i]} width={blockWidth} />
                );
            }
        }

        return(
            <div className="gvnews_posts gvnews_load_more_flag">
                {rows}
            </div>
        );
    };

    return  <div className="gvnews_block_container">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block27Columns;
