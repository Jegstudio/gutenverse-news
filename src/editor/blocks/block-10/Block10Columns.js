
import { __ } from '@wordpress/i18n';
import ThumbModule from '../../part/thumbnail';
import { ContentModule } from '../../part/post';
import { MetaModule1 } from '../../part/meta';
import { ModuleSkeleton, ModuleOverlay } from '../../part/placeholder';

const Block10Columns = props => {
    const {postData, moduleOption, excerptLength, excerptEllipsis, metaDateType, metaDateFormat, metaDateFormatCustom, postBulk, overlay} = props;

    const RenderBlock1 = props=>{
        return (
            <article className="gvnews_post gvnews_pl_lg_4">
                <header className="gvnews_postblock_heading">
                    <h3 className="gvnews_post_title">
                        <a>{props.post.title.replace(/&#8217;/g, '\'')}</a>
                    </h3>
                    {props.attr.option && !props.attr.option.meta_show && <MetaModule1 {...props}/>}
                </header>
                <ThumbModule size={500} cat={true} post={props.post}/>
                <ContentModule title={false} meta={false} excerpt={true} read={true} post={props.post} attr={props.attr}/>
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
            <div className="gvnews_posts">
                {rows}
            </div>
        );
    };

    return <div className="gvnews_block_container gvnews_load_more_flag">
        { postData ? <BuildColumn1/> : postBulk ? <div className="gvnews_empty_module">{moduleOption.string && moduleOption.string.no_content}</div> : <ModuleSkeleton/> }
        { overlay && <ModuleOverlay/> }
    </div>;
};

export default Block10Columns;